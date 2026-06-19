import API from "../api/axios";

// ✅ Get all tasks
export const getTasks = async (token) => {
  const { data } = await API.get("/api/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ✅ Delete task
export const deleteTask = async (id, token) => {
  const { data } = await API.delete(`/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// ✅ Mark task as completed
export const completeTask = async (id, token) => {
  const { data } = await API.put(
    `/api/tasks/${id}`,
    { status: "completed" },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};