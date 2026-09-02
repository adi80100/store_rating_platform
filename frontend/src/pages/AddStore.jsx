import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { addStore, getOwners } from "../api/adminApi";
import { toast } from "react-toastify";

function AddStore() {

  const [owners, setOwners] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

    

    const fetchOwners = async () => {
        try {

        const res = await getOwners();

        setOwners(res.data.users);

        } catch (error) {
        console.log(error);
        }
    };
    useEffect(() => {
        fetchOwners();
    }, []);

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
    if(!formData.ownerId.trim()){
        toast.error("OwnerId is required");
        return;
    }
  

    try {

      const res = await addStore(formData);

    //   alert(res.data.message);
    toast.success(res.data.message);

      setFormData({
        name: "",
        email: "",
        address: "",
        ownerId: "",
      });

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Add Store
      </h1>

      <div className="bg-white shadow-md rounded-xl p-8 max-w-3xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Store Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Store Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="ownerId"
            value={formData.ownerId}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >

            <option value="">
              Select Store Owner
            </option>

            {
              owners.map((owner) => (
                <option
                  key={owner.id}
                  value={owner.id}
                >
                  {owner.name}
                </option>
              ))
            }

          </select>

          <div className="flex justify-center pt-2">
          <button type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
              Add Store
          </button>
        </div>

        </form>

      </div>

    </AdminLayout>
  );
}

export default AddStore;