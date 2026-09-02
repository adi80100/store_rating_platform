import API from "./axios";

export const getDashboard = async () => {
  return await API.get("/admin/dashboard");
};

export const addUser = async (data) => {
  return await API.post("/admin/add-user", data);
};

export const getOwners = async () => {
  return await API.get("/admin/users?role=owner");
};

export const addStore = async (data) => {
  return await API.post("/admin/add-store", data);
};

export const getUsers = async (params) => {
  return await API.get("/admin/users", { params });
};

export const getStores = async (params) => {
  return await API.get("/admin/stores", { params });
};

export const getUserDetails = async (id) => {
  return await API.get(`/admin/user/${id}`);
};
