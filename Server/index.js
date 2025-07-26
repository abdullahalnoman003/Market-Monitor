require("dotenv").config();
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ko3ml0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Firebase Authorization......................
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const verifyFireBaseToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({
      message:
        "Wait! Who are you?  You have no permission to see the data boss! 😉",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  } catch (error) {
    return res.status(401).send({
      message: "Unauthorized Access! You can not get the data Boss :)",
    });
  }
};

async function run() {
  try {
    // Database collecction creation

    const UserCollection = client.db("MarketDB").collection("UserInfo");
    const ProductCollection = client.db("MarketDB").collection("ProductInfo");
    const AdCollection = client.db("MarketDB").collection("AdInfo");
    const RevCollection = client.db("MarketDB").collection("Review");
    const WatchCollection = client.db("MarketDB").collection("WatchList");
    const OrderCollection = client.db("MarketDB").collection("OrderList");
    const OfferCollection = client.db("MarketDB").collection("OfferList");

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<Verify Admin >>>>>>>>>>>>>>>>>>
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await UserCollection.findOne({ email });
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ message: "Forbidden: Hey you are Not an admin" });
      }
      next();
    };
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<Verify Admin >>>>>>>>>>>>>>>>>>
    const verifyVendor = async (req, res, next) => {
      const email = req.decoded.email;
      const user = await UserCollection.findOne({ email });
      if (user?.role !== "vendor") {
        return res
          .status(403)
          .send({ message: "Forbidden: Hey you are Not an Vendor" });
      }
      next();
    };

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<   USER APIS here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // GET user role by email
    app.get("/users/role/:email", async (req, res) => {
      const email = req.params.email;
      const user = await UserCollection.findOne({ email });
      if (user) {
        return res.send({ role: user.role });
      } else {
        return res.status(404).send({ message: "User not found" });
      }
    });

    app.get("/users", verifyFireBaseToken, verifyAdmin, async (req, res) => {
      try {
        const search = req.query.search?.trim() || "";

        let query = {};
        if (search) {
          query = {
            $or: [
              { name: { $regex: new RegExp(search, "i") } },
              { email: { $regex: new RegExp(search, "i") } },
            ],
          };
        }

        const users = await UserCollection.find(query).toArray();
        res.send(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Failed to fetch users" });
      }
    });

    // app.get("/users", verifyFireBaseToken, verifyAdmin, async (req, res) => {
    //   const User = await UserCollection.find().toArray();
    //   res.send(User);
    // });

    app.patch("/users/update", async (req, res) => {
      const email = req.query.email;
      const { name } = req.body;
      const result = await UserCollection.updateOne(
        { email: email },
        { $set: { name } }
      );
      res.send(result);
    });

    app.patch(
      "/users/role/:id",
      verifyFireBaseToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const { role } = req.body;
        const result = await UserCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { role } }
        );
        res.send(result);
      }
    );

    // ------------------------------------------------------Add user to database
    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      try {
        const existingUser = await UserCollection.findOne({
          email: userInfo.email,
        });
        if (existingUser) {
          return res.status(200).send({ message: "User already exists" });
        }
        const result = await UserCollection.insertOne(userInfo);
        res.status(201).send(result);
      } catch (err) {
        console.error("DB error:", err);
        res.status(500).send({ error: "Failed to save user" });
      }
    });

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PRODUCTS APIS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    app.get("/product/:id", async (req, res) => {
      const { id } = req.params;
      const prod = await ProductCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(prod);
    });
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>> HOME LAYOUT >>>>>>>>>>>>>>>>>>>>>>>>>>>>

    app.get("/home-products", async (req, res) => {
      try {
        const approvedProducts = await ProductCollection.find({
          status: "approved",
        })
          .sort({ date: -1 })
          .limit(6)
          .toArray();

        res.send(approvedProducts);
      } catch (error) {
        console.error("Failed to fetch home products:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });
    // --------------------------- ADDing PRoduct
    app.post(
      "/add-product",
      verifyFireBaseToken,
      verifyVendor,
      async (req, res) => {
        const productData = req.body;
        const result = await ProductCollection.insertOne(productData);
        res.send(result);
      }
    );
    // -----------------------------------------Updating Products ----
    app.put("/update-product/:id", verifyFireBaseToken, async (req, res) => {
      const { id } = req.params;
      const updatedProduct = req.body;
      const result = await ProductCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedProduct }
      );
      res.send(result);
    });
    // -------------------------------------- Delete Products---------------------
    app.delete(
      "/delete-product/:id",
      verifyFireBaseToken,
      verifyVendor,
      async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const result = await ProductCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      }
    );
    //--------------------------------------------// private route used in vendors specific product
    app.get(
      "/my-products",
      verifyFireBaseToken,
      verifyVendor,
      async (req, res) => {
        const email = req.query.email;
        const prod = await ProductCollection.find({
          vendor_email: email,
        }).toArray();
        res.send(prod);
      }
    );

    // --------------------------------------------------all Product API in the public route
    app.get("/all-products/v1", async (req, res) => {
      try {
        const { sort, start, end, page = 1, limit = 6 } = req.query;

        const filter = {};
        if (start || end) {
          filter.date = {};
          if (start) filter.date.$gte = start;
          if (end) filter.date.$lte = end;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitVal = parseInt(limit);

        let cursor = ProductCollection.find(filter);

        if (sort === "asc") cursor = cursor.sort({ price_per_unit: 1 });
        else if (sort === "desc") cursor = cursor.sort({ price_per_unit: -1 });

        const totalCount = await ProductCollection.countDocuments(filter);

        const products = await cursor.skip(skip).limit(limitVal).toArray();

        res.json({
          products,
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limitVal),
          totalItems: totalCount,
        });
      } catch (err) {
        console.error("all-products route error:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
      }
    });

    app.delete(
      "/product/:id",
      verifyFireBaseToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const result = await ProductCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      }
    );

    app.patch(
      "/product/status/:id",
      verifyFireBaseToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const { id } = req.params;
          const { status, rejectionReason, rejectionFeedback } = req.body;

          const updateFields = { status };
          if (status === "rejected") {
            updateFields.rejectionReason = rejectionReason;
            updateFields.rejectionFeedback = rejectionFeedback;
          } else {
            updateFields.rejectionReason = "";
            updateFields.rejectionFeedback = "";
          }

          const updatedProduct = await ProductCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
          );

          if (updatedProduct.modifiedCount > 0) {
            res
              .status(200)
              .send({ message: "Status updated", result: updatedProduct });
          } else {
            res.status(400).send({ message: "Failed to update status" });
          }
        } catch (error) {
          res
            .status(500)
            .send({ message: "Server error", error: error.message });
        }
      }
    );

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Special Offer by Admin <<<<<<<<<<<<<<<<<<
    app.get("/special", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const total = await OfferCollection.countDocuments();
        const offers = await OfferCollection.find()
          .skip(skip)
          .limit(limit)
          .toArray();

        res.json({ offers, totalPages: Math.ceil(total / limit) });
      } catch (err) {
        console.error("Special route error:", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get(
      "/all-products",
      verifyFireBaseToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const { sort, start, end } = req.query;
          const filter = {};
          if (start || end) {
            filter.date = {};
            if (start) filter.date.$gte = start;
            if (end) filter.date.$lte = end;
          }
          let cursor = ProductCollection.find(filter);
          if (sort === "asc") cursor = cursor.sort({ price_per_unit: 1 });
          else if (sort === "desc")
            cursor = cursor.sort({ price_per_unit: -1 });
          const products = await cursor.toArray();
          res.json(products);
        } catch (err) {
          console.error("all-products route error:", err);
          res
            .status(500)
            .json({ error: err.message || "Internal Server Error" });
        }
      }
    );
    app.post("/special", async (req, res) => {
      const OfferData = req.body;
      const result = await OfferCollection.insertOne(OfferData);
      res.send(result);
    });
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ADvertisements APIS >>>>>>>>>>>>>>>>>>>>>>>>>

    app.get("/advertisement", async (req, res) => {
      const ad = await AdCollection.find().toArray();
      res.send(ad);
    });

    // ---------------------------------------- To update the advertisement status

    app.patch(
      "/advertisement/status/:id",
      verifyFireBaseToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const { status, rejectionReason, rejectionFeedback } = req.body;

        const updatedAd = await AdCollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              status: status,
              rejectionReason: rejectionReason,
              rejectionFeedback: rejectionFeedback,
            },
          }
        );

        if (updatedAd.modifiedCount > 0) {
          res.status(200).send(updatedAd);
        } else {
          res.status(400).send({ message: "Failed to update status" });
        }
      }
    );

    //----------------------------------------------- To delete the advertisement
    app.delete(
      "/advertisement/:id",
      verifyFireBaseToken,
      verifyAdmin,
      async (req, res) => {
        const { id } = req.params;
        const result = await AdCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      }
    );

    app.get("/my-advertisements/:id", async (req, res) => {
      const { id } = req.params;
      const prod = await AdCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(prod);
    });
    /// ------------------------Get all data form advertisements database
    app.get("/my-advertisements", async (req, res) => {
      const email = req.query.email;
      const prod = await AdCollection.find({
        vendor_email: email,
      }).toArray();
      res.send(prod);
    });
    // _--------------------------------- Add advertisements to database
    app.post(
      "/advertisements",
      verifyFireBaseToken,
      verifyVendor,
      async (req, res) => {
        const AdData = req.body;
        const result = await AdCollection.insertOne(AdData);
        res.send(result);
      }
    );

    //--------------------------------  User Specific advertisements
    app.put("/my-advertisements/:id", verifyFireBaseToken, async (req, res) => {
      const { id } = req.params;
      const updatedProduct = req.body;
      const result = await AdCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedProduct }
      );
      res.send(result);
    });
    // ------------------------------ Delete Advertisements
    app.delete(
      "/advertisements/:id",
      verifyFireBaseToken,
      verifyVendor,
      async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const result = await AdCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      }
    );
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Review APIS >>>>>>>>>>>>>>>>>>>>>>>

    app.get("/reviews/:id", verifyFireBaseToken, async (req, res) => {
      const { id } = req.params;
      const reviewsData = await RevCollection.find({ productId: id })
        .sort({ created_at: -1 })
        .toArray();

      res.send(reviewsData);
    });
    app.post("/reviews", verifyFireBaseToken, async (req, res) => {
      const RevData = req.body;
      const result = await RevCollection.insertOne(RevData);
      res.send(result);
    });
    app.delete("/delete-review/:id", verifyFireBaseToken, async (req, res) => {
      const id = req.params.id;
      const result = await RevCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });
    app.patch("/update-review/:id", verifyFireBaseToken, async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const { comment } = req.body;
      const result = await RevCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { comment: comment } }
      );
      console.log(result);
      res.send(result);
    });
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> watch list >>>>>>>>>>>>>>>>>>>>>>>>>>>

    app.get("/watchlist", verifyFireBaseToken, async (req, res) => {
      try {
        const email = req.query.userEmail;
        const userWlist = await WatchCollection.find({
          userEmail: email,
        }).toArray();
        res.send(userWlist);
      } catch (error) {
        console.error("Watchlist fetch error:", error);
        res.status(500).send({ message: "Failed to fetch watchlist" });
      }
    });

    app.post("/watchlist", verifyFireBaseToken, async (req, res) => {
      const watchData = req.body; // here chekingh if duplicate or not
      const exists = await WatchCollection.findOne({
        userEmail: watchData.userEmail,
        productId: watchData.productId,
      });
      if (exists) {
        return res.status(400).send({ message: "Already in watchlist" });
      }
      const result = await WatchCollection.insertOne(watchData);
      res.send(result);
    });
    app.delete(
      "/delete-watchlist/:id",
      verifyFireBaseToken,
      async (req, res) => {
        const id = req.params.id;
        const result = await WatchCollection.deleteOne({
          _id: new ObjectId(id),
        });
        res.send(result);
      }
    );

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Stripe
    app.post("/create-payment-intent", async (req, res) => {
      const { amountInCents } = req.body;

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error("Payment Intent Error:", error);
        res.status(500).send({ error: error.message });
      }
    });

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Orders
    app.post("/orders", async (req, res) => {
      try {
        const order = req.body;
        const result = await OrderCollection.insertOne(order);
        res.send(result);
      } catch (error) {
        console.error("Order Save Error:", error);
        res.status(500).send({ message: "Failed to save order" });
      }
    });
    app.get("/orders", verifyFireBaseToken, async (req, res) => {
      try {
        const email = req.query.buyerEmail;
        const OrderList = await OrderCollection.find({
          buyerEmail: email,
        }).toArray();
        res.send(OrderList);
      } catch (error) {
        console.error("OrderList fetch error:", error);
        res.status(500).send({ message: "Failed to fetch OrderList" });
      }
    });
    app.get("/admin/order", async (req, res) => {
      try {
        const search = req.query.search?.trim() || "";
        let query = {};
        if (search) {
          query = {
            $or: [
              { buyerName: { $regex: new RegExp(search, "i") } },
              { buyerEmail: { $regex: new RegExp(search, "i") } },
            ],
          };
        }
        const results = await OrderCollection.find(query).toArray();
        res.send(results);
      } catch (error) {
        res.status(500).send({ message: "Failed to fetch orders" });
      }
    });

    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Connection to MongoDB>>>>>>>>>>>>>>>
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(`Market Monitor Server is running==>>`);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
