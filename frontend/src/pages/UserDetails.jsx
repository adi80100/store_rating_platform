import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { getUserDetails } from "../api/adminApi";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getUserDetails(id);
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <AdminLayout>
        <h2 className="text-xl">Loading...</h2>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        User Details
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">

        <div className="space-y-6">

          <div>
            <p className="font-semibold">Name</p>
            <p>{user.name}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{user.email}</p>
          </div>

          <div>
            <p className="font-semibold">Address</p>
            <p>{user.address}</p>
          </div>

          <div>
            <p className="font-semibold">Role</p>
            <p className="capitalize">{user.role}</p>
          </div>

          {user.role === "owner" && (
            <div>
              <p className="font-semibold">
                Average Rating
              </p>

              <p>
               ⭐  {user.averageRating ?? "No Ratings Yet"}.0
              </p>
            </div>
          )}

        </div>

      </div>

    </AdminLayout>
  );
}

export default UserDetails;