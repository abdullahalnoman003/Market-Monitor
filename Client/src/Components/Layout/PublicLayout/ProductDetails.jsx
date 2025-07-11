import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaRegBookmark } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useUserRole from "../../../Hooks/useUserRole";

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
  const axiosInstance = useAxios();
  const [chartData, setChartData] = useState([]);
  const [compareData, setCompareData] = useState([]);
  const [compareDate, setCompareDate] = useState("");
  const [compareSummary, setCompareSummary] = useState("");

  const [role] = useUserRole(user.email);
  const isAdminOrVendor = role === "admin" || role === "vendor";

  useEffect(() => {
    axiosInstance
      .get(`/product/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setChartData(res.data.prices || []);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axiosInstance
      .get(`/reviews/${id}`)
      .then((res) => setReviews(Array.isArray(res.data) ? res.data : []))
      .catch(() => setReviews([]));
  }, [id]);

  const handleAddToWatchlist = () => {
    if (!user || isAdminOrVendor) return;

    const data = {
      productId: product._id,
      userEmail: user.email,
      addedAt: new Date(),
    };

    axiosInstance
      .post("/watchlist", data)
      .then(() => Swal.fire("Added to watchlist!", "", "success"))
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Swal.fire(
            "Info",
            error.response.data.message || "Already in watchlist",
            "info"
          );
        } else {
          console.error(error);
          Swal.fire("Error", "Failed to add to watchlist", "error");
        }
      });
  };

  const handleBuyProduct = () => {
    axiosInstance
      .post("/create-payment", { productId: id })
      .then((res) => (window.location.href = res.data.url))
      .catch(() => Swal.fire("Error starting payment", "", "error"));
  };

  const handleSubmitReview = () => {
    if (!comment || !rating)
      return Swal.fire("Add both comment and rating", "", "warning");

    const reviewData = {
      productId: product._id,
      name: user.displayName,
      email: user.email,
      comment,
      rating,
      date: new Date().toISOString().split("T")[0],
    };

    axiosInstance.post("/reviews", reviewData).then((res) => {
      setReviews((prev) => [reviewData, ...prev]);
      setComment("");
      setRating(0);
      Swal.fire("Review submitted!", "", "success");
    });
  };

  const handleReviewDelete = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/delete-review/${reviewId}`)
          .then(() => {
            setReviews((prev) => prev.filter((r) => r._id !== reviewId));
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Could not delete review.", "error");
          });
      }
    });
  };
  const handleReviewUpdate = () => {
    if (!editedComment.trim()) return;
    axiosInstance
      .patch(`/update-review/${editingReviewId}`, { comment: editedComment })
      .then(() => {
        setReviews((prev) =>
          prev.map((r) =>
            r._id === editingReviewId ? { ...r, comment: editedComment } : r
          )
        );
        setEditingReviewId(null);
        setEditedComment("");
        Swal.fire("Success", "Review updated!", "success");
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update review", "error");
      });
  };
  const handleComparePrices = () => {
    if (!compareDate) return;

    const baseDatePrice = chartData.find((d) => d.date === compareDate);
    const latestPrice = chartData[chartData.length - 1]; // most recent

    if (baseDatePrice) {
      const diff = latestPrice.price - baseDatePrice.price;
      const changeText =
        diff > 0
          ? `🔺 Price increased by ৳${diff} since ${compareDate}`
          : diff < 0
          ? `🔻 Price decreased by ৳${Math.abs(diff)} since ${compareDate}`
          : `Price remained the same since ${compareDate}`;
      setCompareSummary(changeText);
      setCompareData(chartData); // show all data
    } else {
      Swal.fire("No data found for selected date","Select Another please","info");
    }
  };

  const handleReset = () => {
    setCompareData([]);
    setCompareDate("");
  };
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-4xl font-bold text-error mb-4">
          Product Not Found!
        </h2>
        <p className="text-lg">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline btn-primary mt-4"
        >
          Go Back
        </button>
      </div>
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
            <button onClick={handleBuyProduct} className="btn btn-primary">
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
        <h3 className="text-2xl font-semibold text-primary">
          💬 User Comments
        </h3>
        {reviews.map((r, i) => (
          <div key={i} className="bg-base-200 p-4 rounded-lg space-y-2">
            <p>
              <b>{r.name}</b> ({r.email}) - ⭐ {r.rating} on {r.date}
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
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-xl ${
                      star <= rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
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
        <h3 className="text-xl font-semibold mb-3 text-primary">
          📊 Price Comparison
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
            <Bar dataKey="price" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductDetails;
