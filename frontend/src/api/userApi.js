import API from "./axios";

export const getStores = async (params) => {
  return await API.get("/user/stores", { params });
};

export const submitRating = async (data) => {
  return await API.post("/user/rating", data);
};

export const updateRating = async (data) => {
  return await API.put("/user/rating", data);
};