import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const roleName = {
    admin: "Administrator",
    user: "User",
    owner: "Store Owner",
  }[role];

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");

      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md h-20 flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold text-slate-500">
        Store Rating Platform
      </h1>

      <div className="flex items-center gap-6">

        <div className="text-right">
          <p className="font-semibold text-gray-800">
            Welcome, {name}
          </p>

          <p className="text-sm text-gray-500">
            {roleName}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
          <Link
          to={`/${role}/change-password`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Change Password
        </Link>

        
        </div>

      </div>

    </nav>
  );
}

export default Navbar;