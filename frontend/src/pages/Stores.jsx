import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getStores } from "../api/adminApi";

function Stores() {
  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    sortBy: "name",
    order: "ASC",
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await getStores(filters);
      setStores(res.data.stores);
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
    fetchStores();
  };

  // Sorting
  const handleSort = (field) => {
    const newOrder =
      filters.sortBy === field && filters.order === "ASC"
        ? "DESC"
        : "ASC";

    const updatedFilters = {
      ...filters,
      sortBy: field,
      order: newOrder,
    };

    setFilters(updatedFilters);

    fetchStoresWithSort(updatedFilters);
  };

  const fetchStoresWithSort = async (updatedFilters) => {
    try {
      const res = await getStores(updatedFilters);
      setStores(res.data.stores);
    } catch (error) {
      console.log(error);
    }
  };

  const getSortIcon = (field) => {
    if (filters.sortBy !== field) {
      return "↕";
    }

    return filters.order === "ASC" ? "↑" : "↓";
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">
        Stores
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-3 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={filters.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="email"
            placeholder="Store Email"
            value={filters.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="address"
            placeholder="Store Address"
            value={filters.address}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>

              {/* Name */}
              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                Name {getSortIcon("name")}
              </th>

              {/* Email */}
              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("email")}
              >
                Email {getSortIcon("email")}
              </th>

              {/* Address */}
              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("address")}
              >
                Address {getSortIcon("address")}
              </th>

              {/* Rating */}
              <th
                className="p-4 text-center cursor-pointer select-none"
                onClick={() => handleSort("rating")}
              >
                Average Rating {getSortIcon("rating")}
              </th>

            </tr>
          </thead>

          <tbody>
            {stores.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6"
                >
                  No Stores Found
                </td>
              </tr>
            ) : (
              stores.map((store) => (
                <tr
                  key={store.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">
                    {store.name}
                  </td>

                  <td className="p-4">
                    {store.email}
                  </td>

                  <td className="p-4">
                    {store.address}
                  </td>

                  <td className="p-4 text-center">
                    {store.rating > 0 ? (
                      <span className="font-semibold text-green-600">
                        ⭐{" "}
                        {Number.isInteger(store.rating)
                          ? `${store.rating}.0`
                          : store.rating}
                      </span>
                    ) : (
                      <span className="text-gray-500">
                        No Ratings
                      </span>
                    )}
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

export default Stores;