import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

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
        setProductDate(res.data.date ? new Date(res.data.date) : new Date());
        setPriceHistory(res.data.prices || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch product.");
        navigate(-1);
      })
      .finally(() => setLoading(false));
  }, [id, axiosInstance, navigate]);

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
          toast.success("Product updated successfully.");
          navigate(-1);
        } else {
          toast("No changes made.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Update failed.");
      });
  };

  if (loading) {
    return <BrandedLoader label="Loading product..." />;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-base-100 border border-base-300 rounded-xl shadow-sm my-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-primary">Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <input readOnly className="input input-bordered bg-base-200/40" value={user?.email || ""} />
          <input readOnly className="input input-bordered bg-base-200/40" value={user?.displayName || ""} />
        </div>

        <div>
          <label className="label font-semibold">Market Name</label>
          <input type="text" name="market_name" required className="input input-bordered w-full"
            defaultValue={product.market_name} />
        </div>

        <div>
          <label className="label font-semibold">Product Date</label><br />
          <DatePicker
            selected={productDate}
            onChange={(date) => setProductDate(date || new Date())}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div>
          <label className="label font-semibold">Market Description</label>
          <textarea name="market_description" className="textarea textarea-bordered w-full"
            defaultValue={product.market_description} required />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label font-semibold">Item Name</label>
            <input type="text" name="item_name" required className="input input-bordered w-full"
              defaultValue={product.item_name} />
          </div>
          <div>
            <label className="label font-semibold">Price per Unit</label>
            <input type="text" name="price_per_unit" required className="input input-bordered w-full"
              defaultValue={product.price_per_unit} />
          </div>
        </div>

        <div>
          <label className="label font-semibold">Product Image URL</label>
          <input type="text" name="product_image" required className="input input-bordered w-full"
            defaultValue={product.product_image} />
        </div>

        <div>
          <label className="label font-semibold">Edit Price History</label>
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
                <li key={`${entry.date}-${idx}`} className="flex justify-between items-center p-2 bg-base-200/40 border border-base-300 rounded-md">
                  <span>{entry.date} — {entry.price}</span>
                  <button type="button" className="btn btn-xs btn-ghost text-error" onClick={() => handleRemovePrice(idx)} aria-label="Remove price entry">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className="label font-semibold">Item Description</label>
          <textarea name="item_description" className="textarea textarea-bordered w-full"
            defaultValue={product.item_description} />
        </div>

        <div className="text-center mt-6">
          <button type="submit" className="btn btn-primary w-full">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
