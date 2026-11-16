import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

const PAGE_SIZE = 10;

const MyProducts = () => {
  useDocumentTitle("My Products | Vendor");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedActions, setSelectedActions] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axiosSecure
      .get(`/my-products?email=${user.email}`)
      .then((res) => {
        setProducts(res.data || []);
        setPage(1);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        toast.error("Failed to load products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, axiosSecure]);

  const handleConfirm = async (product) => {
    const action = selectedActions[product._id] || "";
    if (!action) {
      toast.error("Select an action first.");
      return;
    }
    if (action === "edit") {
      navigate(`/dashboard/vendor/update-product/${product._id}`);
      return;
    }
    if (action === "delete") {
      if (!window.confirm("Delete this product permanently?")) return;
      try {
        const res = await axiosSecure.delete(`/delete-product/${product._id}`);
        if (res.data.deletedCount) {
          setProducts((prev) => prev.filter((p) => p._id !== product._id));
          toast.success("Product deleted.");
        } else {
          toast.error("Could not delete product.");
        }
      } catch {
        toast.error("Something went wrong while deleting.");
      }
    }
  };

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, currentPage]);

  if (loading) {
    return <BrandedLoader label="Loading your products..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-primary">
        My Products
      </h2>
      <p className="text-center text-base-content/70 mb-8">Select an action and confirm. Showing 10 products per page.</p>

      {products.length === 0 ? (
        <div className="surface-card text-center min-h-[50vh] flex flex-col items-center justify-center space-y-5 p-8">
          <p className="text-lg font-medium text-base-content/80">
            You haven&apos;t added any products yet.
          </p>
          <button
            onClick={() => navigate("/dashboard/vendor/add-product")}
            className="btn btn-primary"
          >
            Add Product
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 border border-base-300/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <figure className="p-4">
                  <img
                    src={product.product_image}
                    alt={product.item_name}
                    className="rounded-lg h-48 object-cover w-full border border-base-300"
                  />
                </figure>
                <div className="card-body px-5 pt-0">
                  <h3 className="card-title text-lg font-semibold text-base-content line-clamp-1">
                    {product.item_name}
                  </h3>
                  <p className="text-sm text-base-content/80"><b>Market:</b> {product.market_name}</p>
                  <p className="text-sm text-base-content/80"><b>Price/Unit:</b> {product.price_per_unit}</p>
                  <p className="text-sm text-base-content/70"><b>Added:</b> {product.date}</p>
                  <div className="mt-1">
                    <span
                      className={`badge px-3 py-1 ${
                        product.status === "approved"
                          ? "badge-success"
                          : product.status === "pending"
                          ? "badge-warning"
                          : "badge-error"
                      }`}
                    >
                      {String(product.status || "").toUpperCase()}
                    </span>
                  </div>
                  {product.status === "rejected" && product.rejectionReason && (
                    <p className="text-error text-sm mt-1">Reason: {product.rejectionReason}</p>
                  )}
                  {product.prices?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold text-sm mb-2">Recent Price History:</p>
                      <ul className="text-sm space-y-1 text-base-content/80">
                        {product.prices.slice(0, 3).map((entry, idx) => (
                          <li key={idx}>{entry.date} — {entry.price}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                    <select
                      className="select select-bordered select-sm h-9 w-full min-w-0 sm:flex-1"
                      value={selectedActions[product._id] || ""}
                      onChange={(e) =>
                        setSelectedActions((prev) => ({ ...prev, [product._id]: e.target.value }))
                      }
                    >
                      <option value="">Select action</option>
                      <option value="edit">Edit</option>
                      <option value="delete">Delete</option>
                    </select>
                    <button className="btn btn-sm btn-primary h-9 min-h-9 w-full shrink-0 px-3 sm:w-auto" onClick={() => handleConfirm(product)}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length > PAGE_SIZE && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="rounded-md border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyProducts;
