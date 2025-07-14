import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const AddProduct = () => {
  useDocumentTitle("Add Products | Vendor")
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [productDate, setProductDate] = useState(new Date()); // for product
  const [priceDate, setPriceDate] = useState(new Date()); // for price history
  const [priceInput, setPriceInput] = useState("");
  const [priceHistory, setPriceHistory] = useState([]);

  const handleAddPrice = () => {
    if (!priceInput || isNaN(priceInput)) {
      return Swal.fire("Invalid", "Please enter a valid price!", "warning");
    }

    const newEntry = {
      date: format(priceDate, "yyyy-MM-dd"),
      price: parseFloat(priceInput),
    };

    setPriceHistory([...priceHistory, newEntry]);
    setPriceInput("");
  };

  const handleRemovePrice = (index) => {
    const updated = [...priceHistory];
    updated.splice(index, 1);
    setPriceHistory(updated);
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

    axiosInstance
      .post("/add-product", newProduct)
      .then((res) => {
        if (res?.data?.insertedId) {
          Swal.fire({
            icon: "success",
            title: "✅ Success!",
            text: "Product added successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          form.reset();
          setPriceHistory([]);
          setPriceInput("");
        } else {
          Swal.fire("❌ Failed!", "Could not add product.", "error");
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.message || "Something went wrong", "error");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-xl shadow-md shadow-primary my-10">
      <h2 className="text-3xl font-bold text-center mb-4 text-primary">
        🛒 Add Market Product
      </h2>
      <p className="text-center mb-6 font-medium">
        Submit daily price updates to help monitor your local market.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vendor Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">📧 Vendor Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-100"
              value={user?.email || ""}
              readOnly
            />
          </div>
          <div>
            <label className="label font-semibold">🧑‍🌾 Vendor Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-base-100"
              value={user?.displayName || ""}
              readOnly
            />
          </div>
        </div>

        {/* Market Info */}
        <div>
          <label className="label font-semibold">🏪 Market Name</label>
          <input
            type="text"
            name="market_name"
            className="input input-bordered w-full"
            required
            placeholder="e.g., Kawran Bazar"
          />
        </div>

        <div>
          <label className="label font-semibold">📅 Product Date</label>
          <br /><DatePicker
            selected={productDate}
            onChange={(date) => setProductDate(date)}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label className="label font-semibold">📝 Market Description</label>
          <textarea
            name="market_description"
            className="textarea textarea-bordered w-full"
            required
            placeholder="Where the market is located, established year, etc."
          ></textarea>
        </div>

        {/* Item Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">🥦 Item Name</label>
            <input
              type="text"
              name="item_name"
              className="input input-bordered w-full"
              required
              placeholder="e.g., Onion"
            />
          </div>
          <div>
            <label className="label font-semibold">💵 Price per Unit</label>
            <input
              type="text"
              name="price_per_unit"
              className="input input-bordered w-full"
              required
              placeholder="e.g., ৳30/kg"
            />
          </div>
        </div>

        <div>
          <label className="label font-semibold">🖼️ Product Image URL</label>
          <input
            type="text"
            name="product_image"
            className="input input-bordered w-full"
            required
            placeholder="Paste image URL here"
          />
        </div>

        {/* Price History */}
        <div>
          <label className="label font-semibold">💵 Add Price History</label>
          <br />
          <DatePicker
            selected={priceDate}
            onChange={(date) => setPriceDate(date)}
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
              ➕ Add
            </button>
          </div>

          {priceHistory.length > 0 && (
            <ul className="mt-3 space-y-2">
              {priceHistory.map((entry, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center p-2 bg-base-100 border rounded-md"
                >
                  <span>
                    📅 {entry.date} — ৳{entry.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemovePrice(idx)}
                    className="btn btn-xs btn-error"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="label font-semibold">📝 Item Description</label>
          <textarea
            name="item_description"
            className="textarea textarea-bordered w-full"
            placeholder="Optional notes like freshness, quality, etc."
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center mt-8">
          <button type="submit" className="btn btn-primary w-full text-lg">
            ✅ Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
