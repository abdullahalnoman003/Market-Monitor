import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxios from "../../../Hooks/useAxios";

const ManageWatchlist = () => {
  useDocumentTitle("Manage Watchlist | Dashboard");
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: watchlist = [], isLoading } = useQuery({
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/watchlist", {
        params: { userEmail: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/delete-watchlist/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["watchlist", user?.email]);
      Swal.fire("Deleted!", "Item removed from your watchlist.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to remove from watchlist.", "error");
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item from watchlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-base">
        <div className="text-center space-y-3">
          <span className="loading loading-bars loading-lg text-primary"></span>
          <p className="text-xl font-semibold ">Please Wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-primary">
        Manage Watchlist
      </h2>
      <p className="text-center mb-8 text-base sm:text-lg">
        View and manage all your watchlisted items.
      </p>

      <div className="overflow-x-auto shadow-md shadow-primary rounded-lg">
        <table className="table w-full">
          <thead className="bg-accent text-white text-sm sm:text-base">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Market Name</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((item, index) => (
              <tr key={item._id} className="hover:bg-base-200 transition-all">
                <td>{index + 1}</td>
                <td className="whitespace-nowrap">{item.productName}</td>
                <td className="whitespace-nowrap">{item.market}</td>
                <td>{item.date}</td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/product/${item.productId}`)}
                      className="btn btn-xs btn-primary "
                    >
                      View Item
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="btn btn-xs "
                    >
                      ❌ Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {watchlist.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-lg font-bold">
                  No items in your watchlist. <br />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center my-15"> <button
        onClick={() => navigate("/all-products")}
        className="btn hover:btn-primary text-center btn-accent"
      >
        ➕ Add Products
      </button></div>
      
    </div>
  );
};

export default ManageWatchlist;
