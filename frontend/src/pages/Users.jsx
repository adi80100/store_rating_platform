import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { getUsers } from "../api/adminApi";

function Users() {

  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      const res = await getUsers(filters);

      setUsers(res.data.users);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    fetchUsers();
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Users
      </h1>

      {/* Filters */}

      <div className="bg-white p-6 rounded-xl shadow-md mb-8  ">

        <div className="grid grid-cols-4 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Search Name"
            value={filters.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="email"
            placeholder="Search Email"
            value={filters.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="address"
            placeholder="Search Address"
            value={filters.address}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="role"
            value={filters.role}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
            <option value="user">User</option>
          </select>

        </div>

        <div className="flex justify-center mt-3">
          <button
          onClick={handleSearch}
          className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Search
        </button>
        </div>

      </div>

      

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Address</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length===0 ?(

                <tr>
                <td colSpan="5" className="text-center py-6" >   No Users Found </td>
                </tr>)
                : (users.map((user) => (

                <tr
                  key={user.id}
                  className="border-t" >

                  <td className="p-4"> {user.name} </td>

                  <td className="p-4"> {user.email}  </td>

                  <td className="p-4"> {user.address}</td>

                  <td className="p-4 capitalize"> {user.role}</td>

                  <td className="p-4 text-center">

                    <Link to={`/admin/user/${user.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg" >
                      View
                    </Link>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}

export default Users;