import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../api/authApi.js";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

    
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, address, password } = formData;


  if (!name.trim()) {
    toast.error("Name is required");
    return;
  }

  if (!email.trim()) {
    toast.error("Email is required");
    return;
  }

  if (!address.trim()) {
    toast.error("Address is required");
    return;
  }

  if (!password.trim()) {
    toast.error("Password is required");
    return;
  }


  if (name.trim().length < 20 || name.trim().length > 60) {
    toast.error("Name must be between 20 and 60 characters");
    return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    toast.error("Invalid email");
    return;
  }


  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be 8-16 characters with one uppercase and one special character"
    );
    return;
  }


  if (address.trim().length > 400) {
    toast.error("Address cannot exceed 400 characters");
    return;
  }

  const cleanedData = {
  name: name.trim(),
  email: email.trim(),
  address: address.trim(),
  password,
};

try {
  await registerUser(cleanedData);

  toast.success("Registration Successful");

  navigate("/login");
} catch (error) {
    toast.error(
      error.response?.data?.message || "Registration Failed"
    );
  }
};



  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-lg rounded-xl w-[500px] p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Enter Email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Enter Address"
              rows="3"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Enter Password"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;