import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import UserLayout from "../layouts/UserLayout";
import { getStores, submitRating, updateRating } from "../api/userApi";
import { toast } from "react-toastify";

function UserDashboard() {
  const [stores, setStores] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    address: "",
    sortBy: "name",
    order: "ASC",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [rating, setRating] = useState(1);

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

  const openModal = (store) => {
    setSelectedStore(store);
    setRating(store.userRating || 1);
    setShowModal(true);
  };

  const handleRating = async () => {
    try {
      if (selectedStore.userRating) {
        await updateRating({
          storeId: selectedStore.id,
          rating,
        });
      } else {
        await submitRating({
          storeId: selectedStore.id,
          rating,
        });
      }

      setShowModal(false);
      fetchStores();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-8">
        Store Ratings
      </h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Search Store Name"
            value={filters.name}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="address"
            placeholder="Search Address"
            value={filters.address}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={fetchStores}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>

              {/* Store Name */}
              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("name")}
              >
                Store Name {getSortIcon("name")}
              </th>

              {/* Address */}
              <th
                className="p-4 text-left cursor-pointer select-none"
                onClick={() => handleSort("address")}
              >
                Address {getSortIcon("address")}
              </th>

              {/* Overall Rating */}
              <th
                className="p-4 text-center cursor-pointer select-none"
                onClick={() => handleSort("overallRating")}
              >
                Overall Rating {getSortIcon("overallRating")}
              </th>

              <th className="p-4 text-center">
                Your Rating
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>
          </thead>

          <tbody>
            {stores.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No Stores Available
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
                    {store.address}
                  </td>

                  <td className="p-4 text-center">
                    {store.averageRating ?? "No Ratings"}
                  </td>

                  <td className="p-4 text-center">
                    {store.userRating ?? "-"}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => openModal(store)}
                      className={`px-4 py-2 rounded-lg text-white ${
                        store.userRating
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {store.userRating
                        ? "Update Rating"
                        : "Rate Store"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Rating Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96">

            <h2 className="text-2xl font-bold mb-6 text-center">
              {selectedStore.userRating
                ? "Update Rating"
                : "Rate Store"}
            </h2>

            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={35}
                  className={`cursor-pointer transition ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleRating}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </UserLayout>
  );
}

export default UserDashboard;