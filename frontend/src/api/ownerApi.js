import API from "./axios";

export const getOwnerDashboard = async (params) => {
  return await API.get("/owner/dashboard", {
    params,
  });
};