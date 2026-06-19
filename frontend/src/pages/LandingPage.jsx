import { useNavigate } from "react-router-dom";
import { FaTasks, FaUserShield, FaBell, FaMobileAlt, FaCloud, FaRocket } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-cyan-900 flex items-center justify-center px-3 py-3 overflow-y-auto">
      <div className="w-full max-w-3xl py-9 px-4 md:px-11 bg-black/50 rounded-3xl shadow-2xl flex flex-col items-center animate-landing-fade select-none">
        <div className="mb-10 text-center">
          <span className="text-green-400 text-5xl font-bold tracking-tight drop-shadow-[0_4px_18px_rgba(34,197,94,.30)]">TaskCollab</span>
          <div className="mt-4 text-xl md:text-2xl font-medium text-gray-200 tracking-wide">Your Modern Team Task Manager</div>
          <p className="mt-2 text-gray-400 text-base md:text-lg max-w-lg mx-auto">
            Organize projects, assign tasks, and collaborate with instant notifications.
          </p>
        </div>
        {/* CTA BUTTONS */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center my-8 w-full">
          <button
            onClick={() => navigate("/login")}
            className="w-full md:w-auto bg-gradient-to-r from-green-400 to-green-600 font-bold text-white text-lg px-7 py-2.5 rounded-xl shadow-md hover:from-green-500 hover:to-green-700 transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="w-full md:w-auto bg-gradient-to-l from-cyan-500 to-emerald-400 font-bold text-white text-lg px-7 py-2.5 rounded-xl shadow-lg hover:from-cyan-600 hover:to-emerald-500 transition-all duration-200"
          >
            Register
          </button>
        </div>
        {/* ------- FEATURES: Section 1 ------- */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-7 mb-9">
          <div className="flex flex-col items-center bg-white/5 p-6 rounded-xl shadow-xl hover:scale-105 transition">
            <FaTasks className="text-green-400 text-3xl mb-3" />
            <div className="text-xl font-bold text-white mb-1">Simple Tasking</div>
            <p className="text-gray-300 text-center text-base mt-1">Create/share/assign/manage tasks in one click.</p>
          </div>
          <div className="flex flex-col items-center bg-white/5 p-6 rounded-xl shadow-xl hover:scale-105 transition">
            <FaBell className="text-yellow-300 text-3xl mb-3" />
            <div className="text-xl font-bold text-white mb-1">Real-time Notifications</div>
            <p className="text-gray-300 text-center text-base mt-1">Instant dashboard bell for assignments, completions & changes.</p>
          </div>
          <div className="flex flex-col items-center bg-white/5 p-6 rounded-xl shadow-xl hover:scale-105 transition">
            <FaUserShield className="text-cyan-400 text-3xl mb-3" />
            <div className="text-xl font-bold text-white mb-1">Secure & Modern</div>
            <p className="text-gray-300 text-center text-base mt-1">JWT-protected, fully secure & beautifully responsive dashboard.</p>
          </div>
        </div>
        {/* ------- FEATURES: Section 2 ------- */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
          <div className="flex flex-col items-center bg-white/5 p-6 rounded-xl shadow-xl hover:scale-105 transition">
            <FaCloud className="text-emerald-300 text-3xl mb-3" />
            <div className="text-xl font-bold text-white mb-1">Cloud Sync</div>
            <p className="text-gray-300 text-center text-base mt-1">All updates in real-time — works anywhere, any device.</p>
          </div>
          <div className="flex flex-col items-center bg-white/5 p-6 rounded-xl shadow-xl hover:scale-105 transition">
            <FaMobileAlt className="text-pink-300 text-3xl mb-3" />
            <div className="text-xl font-bold text-white mb-1">Mobile Friendly</div>
            <p className="text-gray-300 text-center text-base mt-1">Minimal, clean interface perfectly fits desktop & mobile.</p>
          </div>
          <div className="flex flex-col items-center bg-white/5 p-6 rounded-xl shadow-xl hover:scale-105 transition">
            <FaRocket className="text-orange-300 text-3xl mb-3" />
            <div className="text-xl font-bold text-white mb-1">Team Collaboration</div>
            <p className="text-gray-300 text-center text-base mt-1">Assign, complete, notification — work with your full team, in sync!</p>
          </div>
        </div>

        <div className="mt-11 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} TaskCollab • Built with React + Tailwind + Node.js
        </div>
        <style>
          {`
            @keyframes landingFade {
              0% {opacity: 0; transform: translateY(25px);}
              100% {opacity: 1; transform: translateY(0);}
            }
            .animate-landing-fade {
              animation: landingFade 1.15s cubic-bezier(.39,.575,.565,1) both;
            }
          `}
        </style>
      </div>
    </div>
  );
}