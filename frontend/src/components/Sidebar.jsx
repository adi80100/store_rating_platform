import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-8">
        Admin
      </h2>

      <div className="space-y-4">

        <Link
          to="/admin/dashboard"
          className="block hover:text-blue-400"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/add-user"
          className="block hover:text-blue-400"
        >
          Add User
        </Link>

        <Link
          to="/admin/add-store"
          className="block hover:text-blue-400"
        >
          Add Store
        </Link>

        <Link
          to="/admin/users"
          className="block hover:text-blue-400"
        >
          Users
        </Link>

        <Link
          to="/admin/stores"
          className="block hover:text-blue-400">
          Stores
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;