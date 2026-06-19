import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTasks, deleteTask, completeTask } from "../../services/tasks";

export default function TaskList({ refresh }) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTasks(token)
      .then((data) => setTasks(data))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, [token, refresh]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this task?")) {
      await deleteTask(id, token);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    }
  };

  const handleComplete = async (id) => {
    await completeTask(id, token);
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, status: "completed" } : t
      )
    );
  };

  if (loading) return <p className="text-center text-gray-400 py-6">Loading tasks...</p>;
  if (!tasks.length) return <p className="text-center text-gray-400 py-5">No tasks yet.</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task._id}
          className="bg-gray-900/70 border border-slate-800 rounded-2xl px-7 py-5 mb-7 shadow-md 
            flex flex-col gap-1 transition hover:scale-[1.012] hover:shadow-emerald-800/30"
        >
          <span className="text-xl font-bold text-gray-200 mb-1 flex items-center gap-1">
            {task.title}
            {task.status === "completed" && (
              <span className="ml-2 text-lg text-green-400 font-normal">✓</span>
            )}
          </span>

          {task.description && (
            <span className="text-base text-gray-400 mb-3 ml-1">{task.description}</span>
          )}

          <div className="mt-2 flex flex-wrap gap-4 items-center">
            <span 
              className={`text-sm uppercase font-semibold tracking-wide 
                ${task.status === "completed" ? "text-green-400" : "text-yellow-400"}`}>
              {task.status}
            </span>
            {task.status !== "completed" && (
              <button
                onClick={() => handleComplete(task._id)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-4 py-1.5 rounded transition
                  font-bold shadow-sm active:scale-95"
              >
                Mark Complete
              </button>
            )}
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-600/70 hover:bg-red-700 text-white px-4 py-1.5 rounded font-bold text-sm transition
                shadow-sm active:scale-95 ml-auto"
            >
              ❌ Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}