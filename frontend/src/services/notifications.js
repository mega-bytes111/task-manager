import axios from "axios";
import BASE_URL from "./api";

export const getNotifications = async (token) => {
  const res = await axios.get(`${BASE_URL}/api/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const markNotificationAsRead = async (id, token) => {
  await axios.put(`${BASE_URL}/api/notifications/${id}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};