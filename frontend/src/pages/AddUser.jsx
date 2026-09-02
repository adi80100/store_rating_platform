import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { addUser } from "../api/adminApi";
import { toast } from "react-toastify";

function AddUser() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user",
  });

    
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
        toast.error("Name is required");
        return;
    }

    if (!formData.email.trim()) {
        toast.error("Email is required");
        return;
    }
    if (!formData.address.trim()) {
        toast.error("Address is required");
        return;
    }

    if (!formData.password.trim()) {
        toast.error("Password is required");
        return;
    }
    if(!formData.role.trim()){
        toast.error("Role is required");
        return;
    }

    try {

      const res = await addUser(formData);

      toast.success(res.data.message);

      setFormData({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "user",
      });

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Add User
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="user">User</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-center pt-2">
          <button type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
              Add User
          </button>
        </div>

        </form>

      </div>

    </AdminLayout>
  );
}

export default AddUser;