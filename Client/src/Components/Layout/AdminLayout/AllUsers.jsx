import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { AuthContext } from "../../Authentication/Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import BrandedLoader from "../../Shared/BrandedLoader";

const PAGE_SIZE = 10;

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState({});
  const [page, setPage] = useState(1);

  const { user } = useContext(AuthContext);
  useDocumentTitle("All Users | Dashboard");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const url = searchQuery
        ? `/users?search=${encodeURIComponent(searchQuery)}`
        : "/users";
      const res = await axiosSecure.get(url);
      setUsers(res.data || []);
      setPage(1);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearchClick = () => {
    setSearchQuery(searchText.trim());
  };

  const updateRole = async (id, email, newRole) => {
    if (!newRole) {
      toast.error("Select a role first.");
      return;
    }
    if (!window.confirm(`Make ${email} a ${newRole}?`)) return;
    try {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
      if (res.data.modifiedCount > 0) {
        fetchUsers();
        toast.success(`${email} is now a ${newRole}.`);
      } else {
        toast(`${email} is already a ${newRole}.`);
      }
    } catch {
      toast.error("Failed to update role.");
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <span className="badge badge-success font-semibold">Admin</span>;
      case "vendor":
        return <span className="badge badge-info font-semibold">Vendor</span>;
      default:
        return <span className="badge badge-neutral font-semibold">User</span>;
    }
  };

  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return users.slice(start, start + PAGE_SIZE);
  }, [users, currentPage]);

  if (loading) {
    return <BrandedLoader label="Loading users..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-primary">
        Manage All Users
      </h2>
      <p className="text-center text-base sm:text-lg mb-6 text-base-content/70">
        Select a role and confirm the action. Showing 10 users per page.
      </p>

      <div className="max-w-md mx-auto mb-6 flex gap-2 items-center">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by name or email..."
          className="input input-bordered flex-grow"
        />
        <button onClick={handleSearchClick} className="btn btn-primary font-semibold">
          Search
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm bg-base-100">
        <table className="table w-full">
          <thead className="bg-base-200 text-sm sm:text-base text-base-content">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u, i) => {
              const isSelf = user?.email === u.email;
              const selected = selectedRoles[u._id] || u.role || "user";
              return (
                <tr key={u._id} className="hover:bg-base-200/60 transition-colors">
                  <td>{(currentPage - 1) * PAGE_SIZE + i + 1}</td>
                  <td className="whitespace-nowrap">{u.name}</td>
                  <td className="whitespace-nowrap">{u.email}</td>
                  <td>{getRoleBadge(u.role)}</td>
                  <td className="align-middle">
                    <div className="flex flex-col items-stretch justify-center gap-2 sm:flex-row sm:items-center">
                      <select
                        className="select select-bordered select-sm h-9 w-full min-w-0 sm:w-40"
                        value={selected}
                        onChange={(e) =>
                          setSelectedRoles((prev) => ({ ...prev, [u._id]: e.target.value }))
                        }
                      >
                        <option value="user" disabled={isSelf}>User</option>
                        <option value="vendor" disabled={isSelf}>Vendor</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        className="btn btn-sm btn-primary h-9 min-h-9 w-full shrink-0 px-3 sm:w-auto"
                        onClick={() => updateRole(u._id, u.email, selected)}
                        disabled={selected === u.role}
                      >
                        Confirm
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-base-content/70">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {users.length > PAGE_SIZE && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
    </div>
  );
};

export default AllUsers;
