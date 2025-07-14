import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import useAxios from "../../../Hooks/useAxios";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";

const MyProducts = () => {
  useDocumentTitle("My Products | Vendor")
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosInstance
      .get(`/my-products?email=${user.email}`)
      .then((res) => {
        setProducts(res.data || []);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, axiosInstance]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4ade80",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete(`/delete-product/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              setProducts(products.filter((p) => p._id !== id));
              Swal.fire("Deleted!", "Your product has been deleted.", "success");
            }
          })
          .catch((error) => {
            Swal.fire("Oops...", "Something went wrong!", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="h-80 w-full min-h-screen flex items-center justify-center rounded-xl mt-8">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold text-yellow-800">
            Loading Your Products...
          </p>
        </div>
      </div>
    );
  }

  return (
  <div className="max-w-7xl mx-auto px-4 py-10">
    <h2 className="text-4xl font-bold text-center mb-8 text-primary">
      🛒 My Products
    </h2>

    {products.length === 0 ? (
      <div className="text-center mt-16 space-y-5">
        <p className="text-xl font-medium ">
          You haven’t added any products yet.
        </p>
        <button
          onClick={() => navigate("/dashboard/vendor/add-product")}
          className="btn btn-primary btn-lg"
        >
          ➕ Add Product
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className=" min-h-fit card bg-base-100 shadow-primary shadow-lg hover:shadow-xl border border-primary transition duration-300 hover:scale-[1.015]"
          >
            <figure className="p-5">
              <img
                src={product.product_image}
                alt={product.item_name}
                className="rounded-xl h-48 object-cover w-full border border-primary"
              />
            </figure>
            <div className="card-body px-6">
              <h3 className="card-title text-xl font-semibold text-primary">
                🥦 {product.item_name}
              </h3>

              <p className="text-info">
                <b>📍 Market:</b> {product.market_name}
              </p>

              <p className="text-error">
                <b>💰 Price/Unit:</b> {product.price_per_unit} /-
              </p>

              <p className="">
                <b>📅 Added:</b> {product.date}
              </p>

              <div>
                <span
                  className={`badge  px-3 py-1 ${
                    product.status === "approved"
                      ? "badge-success"
                      : product.status === "pending"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {product.status.toUpperCase()}
                </span>
              </div>

              {product.prices?.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold text-sm  mb-2">
                    📊 Recent Price History:
                  </p>
                  <ul className="text-sm space-y-1">
                    {product.prices.slice(0, 3).map((entry, idx) => (
                      <li key={idx}>
                        📅 <span className="font-medium">{entry.date}</span> — ৳
                        {entry.price}
                      </li>
                    ))}
                    {product.prices.length > 3 && (
                      <li className="text-gray-400 italic">...more</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="card-actions justify-end mt-4">
                <button
                  data-tooltip-id="edit-tooltip"
                  data-tooltip-content="Edit Product"
                  onClick={() => navigate(`/dashboard/vendor/update-product/${product._id}`)}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  <FaEdit className="mr-1" /> Edit
                  <Tooltip id="edit-tooltip" place="bottom" />
                </button>
                <button
                  data-tooltip-id="delete-tooltip"
                  data-tooltip-content="Delete Product"
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  <FaTrash className="mr-1" /> Delete
                  <Tooltip id="delete-tooltip" place="bottom" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default MyProducts;
