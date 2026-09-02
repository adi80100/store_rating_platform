import { useEffect, useState } from "react";
import { getOwnerDashboard } from "../api/ownerApi";
import OwnerLayout from "../layouts/OwnerLayout.jsx";

function OwnerDashboard() {

  const [store, setStore] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const res = await getOwnerDashboard();

      setStore(res.data.store);
      setUsers(res.data.users);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OwnerLayout>

      <h1 className="text-3xl font-bold mb-8">
        Store Owner Dashboard
      </h1>



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



      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                User Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-center">
                Rating
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>
                <td colSpan="3"className="text-center p-8"> No Ratings Yet </td>   
             </tr>

            ) : (

              users.map((user, index) => (

                <tr
                  key={index}
                  className="border-t"
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