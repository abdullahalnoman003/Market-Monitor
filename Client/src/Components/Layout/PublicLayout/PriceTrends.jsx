import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FaBoxOpen } from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

const PriceTrends = () => {
  useDocumentTitle("Price Trends | Dashboard");
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const userEmail = user?.email;

  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ["watchlist", userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist?userEmail=${userEmail}`);
      return res.data;
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!selectedProductId) {
        setSelectedProductData(null);
        return;
      }
      try {
        const res = await axiosInstance.get(`/product/${selectedProductId}`);
        setSelectedProductData(res.data);
      } catch (err) {
        console.error("Failed to fetch product data:", err);
      }
    };

    fetchProduct();
  }, [selectedProductId, axiosInstance]);

  if (isLoading) {
    return <BrandedLoader label="Loading price trends..." />;
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="surface-card p-4 sm:p-5">
          <h2 className="mb-4 text-center text-xl font-bold text-base-content">Watchlisted Products</h2>

          {watchlist.length === 0 ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center space-y-3 px-2 text-center">
              <FaBoxOpen className="text-4xl text-primary/40" />
              <h3 className="text-base font-semibold text-base-content">No watchlisted products</h3>
              <p className="text-sm text-base-content/70">
                Add products to your watchlist to compare their price trends here.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {watchlist.map((item) => (
                <li key={item._id}>
                  <button
                    type="button"
                    className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                      selectedProductId === item.productId
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-base-300 bg-base-100 hover:bg-base-200"
                    }`}
                    onClick={() => setSelectedProductId(item.productId)}
                  >
                    {item.productName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="surface-card flex min-h-[420px] flex-col p-4 sm:p-6">
          {!selectedProductData ? (
            <div className="flex flex-1 items-center justify-center text-center">
              <p className="text-base font-medium text-base-content/70">
                Select a product to view price trends.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-base-content sm:text-2xl">
                  {selectedProductData.item_name} — Price Trends
                </h2>
                <p className="text-sm text-base-content/60">
                  Track historical price changes for this product.
                </p>
              </div>

              {selectedProductData.prices?.length > 0 ? (
                <div className="h-[320px] w-full sm:h-[380px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedProductData.prices}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--color-base-300)" />
                      <XAxis dataKey="date" stroke="currentColor" tick={{ fontSize: 12 }} />
                      <YAxis stroke="currentColor" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="var(--color-primary)" strokeWidth={2.5} activeDot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-sm text-base-content/70">No price data available for this product.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceTrends;
