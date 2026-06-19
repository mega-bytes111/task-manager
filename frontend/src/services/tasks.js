import axios from "axios";
import BASE_URL from "./api";

export const getTasks = async (token) => {
  const res = await axios.get(`${BASE_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteTask = async (id, token) => {
  await axios.delete(`${BASE_URL}/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const completeTask = async (id, token) => {
  await axios.put(`${BASE_URL}/api/tasks/${id}`, { status: "completed" }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};