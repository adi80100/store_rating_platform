import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { getDashboard } from "../api/adminApi.js";

function AdminDashboard() {

    const [dashboard,setDashboard] = useState({
        totalUsers:0,
        totalStores:0,
        totalRatings:0
    })


    
    const fetchDashboard = async () => {
    try {
        const res = await getDashboard();
        setDashboard(res.data.dashboard);
    } catch (error) {
  console.error(error);
    }
    };

    useEffect(()=>{fetchDashboard()},[])

  return (
    <AdminLayout>
   

          <h1 className="text-3xl font-bold mb-6">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold">
                Total Users
              </h2>

              <p className="text-3xl font-bold text-blue-600 mt-4">
                {dashboard.totalUsers}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold">
                Total Stores
              </h2>

              <p className="text-3xl font-bold text-green-600 mt-4">
                {dashboard.totalStores}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold">
                Total Ratings
              </h2>

              <p className="text-3xl font-bold text-red-600 mt-4">
                {dashboard.totalRatings}
              </p>
            </div>

          </div>

        
    </AdminLayout>
  );
}

export default AdminDashboard;