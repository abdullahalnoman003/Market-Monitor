import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import useAxios from "../../../Hooks/useAxios";
import { AuthContext } from "../../Authentication/Context/AuthContext";

const AllUsers = () => {
  const axiosInstance = useAxios();
  const [users, setUsers] = useState([]);
  useDocumentTitle("All Users | Dashboard");

  const {user} = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const updateRole = async (id, email, newRole) => {
    Swal.fire({
      title: `Change Role?`,
      text: `Are you sure you want to make ${email} a ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, make ${newRole}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .patch(`/users/role/${id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              fetchUsers();
              Swal.fire("Success", `${email} is now a ${newRole}.`, "success");
            } else {
              Swal.fire("Info", `${email} is already a ${newRole}.`, "info");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update role", "error");
          });
      }
    });
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <span className="badge badge-success font-bold shadow-md hover:shadow-primary transition-all transform-3d  ">Admin</span>;
      case "vendor":
        return <span className="badge badge-info font-bold shadow-md hover:shadow-primary transition-all transform-3d">Vendor</span>;
      default:
        return <span className="badge badge-neutral font-bold shadow-md hover:shadow-primary transition-all transform-3d">User</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 text-primary">
        👤 Manage All Users
      </h2>
      <p className="text-center text-base sm:text-lg  mb-8">
        Assign roles: <b>User</b>, <b>Admin</b>, or <b>Vendor</b> to any registered user.
      </p>

      <div className="overflow-x-auto rounded-lg shadow-md shadow-primary">
        <table className="table w-full">
          <thead className="bg-accent  text-sm sm:text-base">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className="hover:bg-base-200 transition-all">
                <td>{i + 1}</td>
                <td className="whitespace-nowrap">{u.name}</td>
                <td className="whitespace-nowrap">{u.email}</td>
                <td>{getRoleBadge(u.role)}</td>
                <td>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => updateRole(u._id, u.email, "admin")}
                      className="btn btn-xs btn-success "
                    >
                      Admin
                    </button>
                    <button
                      onClick={() => updateRole(u._id, u.email, "vendor")}
                      className="btn btn-xs btn-info "
                      disabled={user.email===u.email}
                    >
                      Vendor
                    </button>
                    <button
                      onClick={() => updateRole(u._id, u.email, "user")}
                      className="btn btn-xs btn-neutral disabled:"
                      disabled={user.email===u.email}
                    >
                      User
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-lg ">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
