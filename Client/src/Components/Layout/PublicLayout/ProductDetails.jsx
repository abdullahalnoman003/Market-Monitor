import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegBookmark, FaComments, FaChartBar, FaStar } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useUserRole from "../../../Hooks/useUserRole";
import ProductNotFound from "../../Error/ProductNotFound";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { DetailsSkeleton } from "../../Shared/Skeletons";

const ProductDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const [chartData, setChartData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [compareDate, setCompareDate] = useState("");
  const [compareSummary, setCompareSummary] = useState("");

  const [role] = useUserRole(user.email);
  const isAdminOrVendor = role === "admin" || role === "vendor";
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .get(`/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setChartData(res.data.prices || []);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id, axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get(`/reviews/${id}`)
      .then((res) => setReviews(Array.isArray(res.data) ? res.data : []))
      .catch(() => setReviews([]));
  }, [id, axiosSecure]);

  const handleAddToWatchlist = () => {
    if (!user || isAdminOrVendor) return;

    const data = {
      productId: product._id,
      productName: product.item_name,
      market: product.market_name,
      date: product.date,
      userEmail: user.email,
      addedAt: new Date(),
    };

    axiosSecure
      .post("/watchlist", data)
      .then(() => toast.success("Added to watchlist."))
      .catch((error) => {
        if (error.response?.status === 400) {
          toast(error.response.data.message || "Already in watchlist");
        } else {
          console.error(error);
          toast.error("Failed to add to watchlist.");
        }
      });
  };

  const handleBuyProduct = (id) => {
    navigate(`/payment/${id}`)
  };

  const handleSubmitReview = () => {
    if (!comment || !rating) return toast.error("Please add both a comment and a rating.");

    const reviewData = {
      productId: product._id,
      name: user.displayName,
      email: user.email,
      comment,
      rating,
      date: new Date().toISOString().split("T")[0],
    };

    axiosSecure
      .post("/reviews", reviewData)
      .then(() => {
        setReviews((prev) => [reviewData, ...prev]);
        setComment("");
        setRating(0);
        toast.success("Review submitted.");
      })
      .catch(() => toast.error("Failed to submit review."));
  };

  const handleReviewDelete = (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    axiosSecure
      .delete(`/delete-review/${reviewId}`)
      .then(() => {
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
        toast.success("Review deleted.");
      })
      .catch(() => {
        toast.error("Could not delete review.");
      });
  };
  const handleReviewUpdate = () => {
    if (!editedComment.trim()) return;
    axiosSecure
      .patch(`/update-review/${editingReviewId}`, { comment: editedComment })
      .then(() => {
        setReviews((prev) =>
          prev.map((r) => (r._id === editingReviewId ? { ...r, comment: editedComment } : r))
        );
        setEditingReviewId(null);
        setEditedComment("");
        toast.success("Review updated.");
      })
      .catch(() => {
        toast.error("Failed to update review.");
      });
  };
  const handleComparePrices = () => {
    if (!compareDate) return;

    const baseDatePrice = chartData.find((d) => d.date === compareDate);
    const latestPrice = chartData[chartData.length - 1];

    if (baseDatePrice && latestPrice) {
      const diff = latestPrice.price - baseDatePrice.price;
      const changeText =
        diff > 0
          ? `Price increased by ৳${diff} since ${compareDate}`
          : diff < 0
          ? `Price decreased by ৳${Math.abs(diff)} since ${compareDate}`
          : `Price remained the same since ${compareDate}`;
      setCompareSummary(changeText);
      setCompareData(chartData);
    } else {
      toast("No data found for selected date. Please choose another date.");
    }
  };

  const handleReset = () => {
    setCompareData([]);
    setCompareDate("");
  };
  if (loading) {
    return <DetailsSkeleton />;
  }

  if (!product) {
    return (
      <ProductNotFound></ProductNotFound>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 my-10 space-y-10">
      <div className="grid md:grid-cols-2 gap-8 bg-base-100 p-6 rounded-xl shadow">
        <img
          src={product.product_image}
          alt={product.item_name}
          className="w-full h-80 object-cover rounded"
        />
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-primary">
            {product.item_name}
          </h2>
          <p>
            <b>Market:</b> {product.market_name}
          </p>
          <p>
            <b>Date:</b> {product.date}
          </p>
          <p>
            <b>Price:</b> ৳{product.price_per_unit}/kg
          </p>
          <p>
            <b>Vendor:</b> {product.vendor_name}
          </p>
          <p>
            <b>Description:</b> {product.item_description}
          </p>
          <ul className="list-disc ml-5">
            {product.related_items?.map((item, i) => (
              <li key={i}>
                {item.name} - ৳{item.price}/kg
              </li>
            ))}
          </ul>
          <div className="flex gap-4 mt-4">
            <button onClick={()=>handleBuyProduct(product._id)} className="btn btn-primary">
              <FaCartPlus /> Buy Product
            </button>
            <button
              onClick={handleAddToWatchlist}
              className="btn btn-outline btn-warning"
              disabled={isAdminOrVendor}
            >
              <FaRegBookmark /> Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-2xl font-semibold text-primary">
          <FaComments /> User Reviews
        </h3>
        {reviews.map((r, i) => (
          <div key={i} className="bg-base-200 p-4 rounded-lg space-y-2">
            <p>
              <b>{r.name}</b> ({r.email}) - <span className="inline-flex items-center gap-1"><FaStar className="text-warning" /> {r.rating}</span> on {r.date}
            </p>
            <p>{r.comment}</p>
            {editingReviewId === r._id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReviewUpdate();
                }}
                className="mt-2 space-y-2"
              >
                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  className="textarea textarea-bordered w-full"
                />
                <button type="submit" className="btn btn-sm btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingReviewId(null);
                    setEditedComment("");
                  }}
                  className="btn btn-sm btn-ghost"
                >
                  Cancel
                </button>
              </form>
            )}

            {user?.email === r.email && (
              <div className="flex gap-2 mt-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => {
                    setEditingReviewId(r._id);
                    setEditedComment(r.comment);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleReviewDelete(r._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}

        {user && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitReview();
            }}
            className="space-y-3"
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Write your review..."
            />
            <div className="flex justify-between items-center">
              <div>
                Rating:
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-xl ${star <= rating ? "text-warning" : "text-base-content/30"}`}
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button type="submit" className="btn btn-success btn-sm">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-primary flex items-center gap-2">
          <FaChartBar /> Price Comparison
        </h3>

        {/* Date Input + Buttons */}
        <div className="flex gap-3 mb-3">
          <input
            type="date"
            className="input input-bordered"
            value={compareDate}
            onChange={(e) => setCompareDate(e.target.value)}
          />
          <button className="btn btn-sm btn-info" onClick={handleComparePrices}>
            Compare
          </button>
          {compareData.length > 0 && (
            <button className="btn btn-sm btn-outline" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>

        {/* Price Difference Summary */}
        {compareSummary && (
          <p className="text-sm mb-3 text-warning font-medium">
            {compareSummary}
          </p>
        )}

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={compareData.length ? compareData : chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
                    <Bar dataKey="price" fill="var(--color-primary)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductDetails;
