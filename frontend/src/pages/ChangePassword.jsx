import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../api/authApi.js";

function ChangePassword() {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.oldPassword.trim()) {
      toast.error("Old password is required");
      return;
    }

    if (!formData.newPassword.trim()) {
      toast.error("New password is required");
      return;
    }


    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/; 
    if (!passwordRegex.test(newPassword)) { 
        toast.error( "New password must be 8-16 characters with at least one uppercase letter and one special character" );
        return;
    }

    try {
      setLoading(true);

      const res = await changePassword(formData);

      toast.success(res.data.message);

      setFormData({
        oldPassword: "",
        newPassword: "",
      });

    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-8">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>
          <label className="block mb-2 font-medium">
            Old Password
          </label>

          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            New Password
          </label>

          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white ${
            loading
              ? "bg-gray-500"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </form>

    </div>
  );
}

export default ChangePassword;