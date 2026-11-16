import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddProduct = () => {
  useDocumentTitle("Add Products | Vendor");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [productDate, setProductDate] = useState(new Date());
  const [priceDate, setPriceDate] = useState(new Date());
  const [priceInput, setPriceInput] = useState("");
  const [priceHistory, setPriceHistory] = useState([]);

  const handleAddPrice = () => {
    if (!priceInput || isNaN(priceInput)) {
      toast.error("Please enter a valid price.");
      return;
    }

    const newEntry = {
      date: format(priceDate, "yyyy-MM-dd"),
      price: parseFloat(priceInput),
    };

    setPriceHistory((prev) => [...prev, newEntry]);
    setPriceInput("");
  };

  const handleRemovePrice = (index) => {
    setPriceHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newProduct = {
      vendor_email: user?.email,
      vendor_name: user?.displayName,
      market_name: form.market_name.value,
      market_description: form.market_description.value,
      date: format(productDate, "yyyy-MM-dd"),
      item_name: form.item_name.value,
      status: "pending",
      product_image: form.product_image.value,
      price_per_unit: form.price_per_unit.value,
      prices: priceHistory,
      item_description: form.item_description.value,
    };

    axiosSecure
      .post("/add-product", newProduct)
      .then((res) => {
        if (res?.data?.insertedId) {
          toast.success("Product added successfully.");
          form.reset();
          setProductDate(new Date());
          setPriceDate(new Date());
          setPriceHistory([]);
          setPriceInput("");
        } else {
          toast.error("Could not add product.");
        }
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-base-100 border border-base-300 rounded-xl shadow-sm my-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-primary">
        Add Market Product
      </h2>
      <p className="text-center mb-6 text-base-content/70">
        Submit daily price updates to help monitor your local market.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Vendor Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-200/40"
              value={user?.email || ""}
              readOnly
            />
          </div>
          <div>
            <label className="label font-semibold">Vendor Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-base-200/40"
              value={user?.displayName || ""}
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="label font-semibold">Market Name</label>
          <input
            type="text"
            name="market_name"
            className="input input-bordered w-full"
            required
            placeholder="e.g., Kawran Bazar"
          />
        </div>

        <div>
          <label className="label font-semibold">Product Date</label>
          <br />
          <DatePicker
            selected={productDate}
            onChange={(date) => setProductDate(date || new Date())}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label className="label font-semibold">Market Description</label>
          <textarea
            name="market_description"
            className="textarea textarea-bordered w-full"
            required
            placeholder="Where the market is located, established year, etc."
          ></textarea>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Item Name</label>
            <input
              type="text"
              name="item_name"
              className="input input-bordered w-full"
              required
              placeholder="e.g., Onion"
            />
          </div>
          <div>
            <label className="label font-semibold">Price per Unit</label>
            <input
              type="text"
              name="price_per_unit"
              className="input input-bordered w-full"
              required
              placeholder="e.g., 30/kg"
            />
          </div>
        </div>

        <div>
          <label className="label font-semibold">Product Image URL</label>
          <input
            type="text"
            name="product_image"
            className="input input-bordered w-full"
            required
            placeholder="Paste image URL here"
          />
        </div>

        <div>
          <label className="label font-semibold">Add Price History</label>
          <br />
          <DatePicker
            selected={priceDate}
            onChange={(date) => setPriceDate(date || new Date())}
            className="input input-bordered w-full mb-2"
            dateFormat="yyyy-MM-dd"
          />

          <div className="flex gap-2 mb-3">
            <input
              type="number"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter price for selected date"
            />
            <button
              type="button"
              className="btn btn-outline btn-primary"
              onClick={handleAddPrice}
            >
              Add
            </button>
          </div>

          {priceHistory.length > 0 && (
            <ul className="mt-3 space-y-2">
              {priceHistory.map((entry, idx) => (
                <li
                  key={`${entry.date}-${idx}`}
                  className="flex justify-between items-center p-2 bg-base-200/40 border border-base-300 rounded-md"
                >
                  <span>
                    {entry.date} — {entry.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemovePrice(idx)}
                    className="btn btn-xs btn-ghost text-error"
                    aria-label="Remove price entry"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="label font-semibold">Item Description</label>
          <textarea
            name="item_description"
            className="textarea textarea-bordered w-full"
            placeholder="Optional notes like freshness, quality, etc."
          ></textarea>
        </div>

        <div className="text-center mt-8">
          <button type="submit" className="btn btn-primary w-full">
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
