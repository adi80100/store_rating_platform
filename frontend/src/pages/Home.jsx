import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-indigo-200 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-[500px] text-center">

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Store Rating Platform
        </h1>

        <p className="text-gray-600 mb-8">
          Rate stores, manage users, and monitor ratings with a role-based dashboard.
        </p>

        <div className="flex justify-center gap-4">

          <Link to="/login"
            className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Login
          </Link>

          <Link to="/register"
            className="bg-green-500 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            Register
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Home;