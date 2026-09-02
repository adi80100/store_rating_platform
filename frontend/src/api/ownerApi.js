import API from "./axios";

export const getOwnerDashboard = async () => {
  return await API.get("/owner/dashboard");
};