import API from "./axios";

export const loginUser = async (data) => {
  return await API.post("/auth/login", data);
};

export const registerUser = async (data) => {
  return await API.post("/auth/register", data);
};

export const changePassword = async (data) => {
  return await API.put("/auth/change-password", data);
};