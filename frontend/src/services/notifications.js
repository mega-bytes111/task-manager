import API from "../api/axios";

// ✅ Get all notifications
export const getNotifications = async (token) => {
  const { data } = await API.get("/api/notifications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ✅ Mark notification as read
export const markNotificationAsRead = async (id, token) => {
  const { data } = await API.put(
    `/api/notifications/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};