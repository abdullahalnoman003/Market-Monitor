import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [productDate, setProductDate] = useState(new Date());
  const [priceDate, setPriceDate] = useState(new Date());
  const [priceInput, setPriceInput] = useState("");
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setProductDate(new Date(res.data.date));
        setPriceHistory(res.data.prices || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch product!", "error");
        navigate("/dashboard/vendor");
      });
  }, [id, axiosInstance, navigate]);

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

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProduct = {
      market_name: form.market_name.value,
      market_description: form.market_description.value,
      date: format(productDate, "yyyy-MM-dd"),
      item_name: form.item_name.value,
      product_image: form.product_image.value,
      price_per_unit: form.price_per_unit.value,
      prices: priceHistory,
      item_description: form.item_description.value,
    };

    axiosSecure
      .put(`/update-product/${id}`, updatedProduct)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("✅ Updated!", "Product updated successfully!", "success");
          navigate(-1);
        } else {
          Swal.fire("ℹ️ Notice", "No changes made.", "info");
        }
      })
      .catch((err) => {
        Swal.fire("❌ Error", "Update failed!", "error");
        console.error(err);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center rounded-xl mt-8">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-primary">
            Fetching product info...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-xl shadow-md my-10">
      <h2 className="text-3xl font-bold text-center mb-4 text-primary">✏️ Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input readOnly className="input input-bordered bg-base-100" value={user?.email} />
          <input readOnly className="input input-bordered bg-base-100" value={user?.displayName} />
        </div>

        <div>
          <label className="label font-semibold">🏪 Market Name</label>
          <input type="text" name="market_name" required className="input input-bordered w-full"
            defaultValue={product.market_name} />
        </div>

        <div>
          <label className="label font-semibold">📅 Product Date</label><br />
          <DatePicker
            selected={productDate}
            onChange={setProductDate}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label className="label font-semibold">📝 Market Description</label>
          <textarea name="market_description" className="textarea textarea-bordered w-full"
            defaultValue={product.market_description} required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">🥦 Item Name</label>
            <input type="text" name="item_name" required className="input input-bordered w-full"
              defaultValue={product.item_name} />
          </div>
          <div>
            <label className="label font-semibold">💵 Price per Unit</label>
            <input type="text" name="price_per_unit" required className="input input-bordered w-full"
              defaultValue={product.price_per_unit} />
          </div>
        </div>

        <div>
          <label className="label font-semibold">🖼️ Product Image URL</label>
          <input type="text" name="product_image" required className="input input-bordered w-full"
            defaultValue={product.product_image} />
        </div>

        {/* Price History Editor */}
        <div>
          <label className="label font-semibold">💵 Edit Price History</label>
          <DatePicker
            selected={priceDate}
            onChange={setPriceDate}
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
                <li key={idx} className="flex justify-between items-center p-2 bg-base-100 border rounded-md">
                  <span>📅 {entry.date} — ৳{entry.price}</span>
                  <button type="button" className="btn btn-xs " onClick={() => handleRemovePrice(idx)}>
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="label font-semibold">📝 Item Description</label>
          <textarea name="item_description" className="textarea textarea-bordered w-full"
            defaultValue={product.item_description} />
        </div>

        <div className="text-center mt-6">
          <button type="submit" className="btn btn-success w-full text-lg">🔄 Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
