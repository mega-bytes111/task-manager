import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import BASE_URL from "../../services/api";

export default function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await axios.post(
        `${BASE_URL}/api/tasks`,
        { title, description: desc },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMsg("Task added!");
      setTitle("");
      setDesc("");
      onTaskAdded && onTaskAdded();
    } catch (err) {
      setMsg("Failed to add task");
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row md:items-end gap-4 mb-7"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="flex-1 min-w-[150px] max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-green-400 text-base font-semibold transition shadow"
        required
      />

      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Short Description"
        className="flex-1 min-w-[200px] max-w-2xl md:max-w-md h-12 md:h-11 px-4 py-2 rounded-lg bg-gray-800 text-white 
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-base transition resize-none shadow"
        rows={2}
        style={{ lineHeight: 1.4, fontSize: '1.15rem' }}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-tr from-green-500 to-emerald-400 hover:from-green-600 hover:to-green-500
                   text-white font-bold px-7 py-2 rounded-lg shadow-md text-base transition-all duration-150
                   active:scale-98"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>

      {msg && (
        <span className="ml-0 md:ml-2 text-emerald-400 font-semibold px-3 py-1">
          {msg}
        </span>
      )}
    </form>
  );
}