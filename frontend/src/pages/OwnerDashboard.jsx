import { useEffect, useState } from "react";
import { getOwnerDashboard } from "../api/ownerApi";
import OwnerLayout from "../layouts/OwnerLayout.jsx";

function OwnerDashboard() {
  const [store, setStore] = useState(null);
  const [users, setUsers] = useState([]);

  const [sort, setSort] = useState({
    sortBy: "name",
    order: "ASC",
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async (sortParams = sort) => {
    try {
      const res = await getOwnerDashboard(sortParams);

      setStore(res.data.store);
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  // Sorting
  const handleSort = (field) => {
    const newOrder =
      sort.sortBy === field && sort.order === "ASC"
        ? "DESC"
        : "ASC";

    const updatedSort = {
      sortBy: field,
      order: newOrder,
    };

    setSort(updatedSort);
    fetchDashboard(updatedSort);
  };

  const getSortIcon = (field) => {
    if (sort.sortBy !== field) {
      return "↕";
    }

    return sort.order === "ASC" ? "↑" : "↓";
  };

  return (
    <OwnerLayout>
      <h1 className="text-3xl font-bold mb-8">
        Store Owner Dashboard
      </h1>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold">
            Store Name
          </h2>

          <p className="text-2xl font-bold mt-4">
            {store?.name}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold">
            Average Rating
          </h2>

          <p className="text-2xl font-bold mt-4 text-yellow-500">
            ⭐ {store?.averageRating ?? 0}
          </p>
        </div>

      </div>

      {/* Users Who Rated */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              {/* User Name */}
              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                User Name {getSortIcon("name")}
              </th>

              {/* Email */}
              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("email")}
              >
                Email {getSortIcon("email")}
              </th>

              {/* Rating */}
              <th
                className="p-4 text-center cursor-pointer select-none"
                onClick={() => handleSort("rating")}
              >
                Rating {getSortIcon("rating")}
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td
                  colSpan="3"
                  className="text-center p-8"
                >
                  No Ratings Yet
                </td>
              </tr>

            ) : (

              users.map((user, index) => (

                <tr
                  key={index}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4 text-center">
                    ⭐ {user.rating}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </OwnerLayout>
  );
}

export default OwnerDashboard;