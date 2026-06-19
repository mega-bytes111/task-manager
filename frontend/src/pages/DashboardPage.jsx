import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TaskList from "../components/Tasks/TaskList";
import AddTask from "../components/Tasks/AddTask";
import Notifications from "../components/Notifications/Notifications";

export default function DashboardPage() {
  const { token, logout, userName } = useAuth();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const initials = userName ? userName.trim().split(" ").map(x => x[0]).join("").slice(0,2).toUpperCase() : "U";

  const handleTaskAdded = () => setRefresh(r => !r);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-900 px-2 py-7">
      <div className="max-w-3xl mx-auto">

        {/* Dashboard header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 px-6 py-4 rounded-xl bg-black/40 shadow-xl ring-1 ring-slate-700 animate-dashboard-fade">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center bg-gradient-to-tr from-green-400 to-emerald-600 text-white w-14 h-14 rounded-full text-2xl font-bold shadow-xl select-none border-4 border-emerald-500/30">
              {initials}
            </span>
            <div>
              <div className="text-lg text-gray-300">Welcome back,</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-400">{userName || "User"} 👋</h2>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <Notifications />
            <button
              onClick={logout}
              className="ml-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg
                transition-all duration-150"
            >Logout</button>
          </div>
        </div>

        {/* Add Task */}
        <div className="mb-8">
          <AddTask onTaskAdded={handleTaskAdded} />
        </div>

        {/* Task list section */}
        <div className="bg-slate-800/80 border border-slate-700/50 p-7 rounded-xl shadow-2xl min-h-[230px] animate-dashboard-fade">
          <TaskList refresh={refresh} />
        </div>
      </div>
      <style>
        {`
          @keyframes dashboardFade {
            0% {opacity: 0;transform: translateY(45px);}
            100% {opacity: 1;transform: translateY(0);}
          }
          .animate-dashboard-fade {
            animation: dashboardFade 1s cubic-bezier(.39,.575,.565,1.000) both;
          }
        `}
      </style>
    </div>
  );
}