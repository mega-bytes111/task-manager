import { useState } from "react";
import axios from "axios";
import BASE_URL from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiOutlineMail, HiLockClosed } from "react-icons/hi"; // npm install react-icons

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      alert("Login successful!");
      login(res.data.token, res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-slate-900 to-gray-950">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-gray-500/20 shadow-[0_6px_36px_rgba(78,197,140,0.14)] animate-glass"
        style={{ animation: 'glassFadeIn 1.1s' }}
      >
        <h2 className="text-4xl font-bold text-center mb-7 text-green-500 tracking-tight drop-shadow-lg">
          <span className="drop-shadow-md animate-pulse">🔐</span> Login
        </h2>
        <div className="mb-5 flex items-center rounded bg-gray-700/80 px-4">
          <HiOutlineMail className="text-green-400 text-lg mr-2" />
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent flex-1 py-2 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-8 flex items-center rounded bg-gray-700/80 px-4">
          <HiLockClosed className="text-green-400 text-lg mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent flex-1 py-2 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full font-bold rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-white p-2.5 text-xl shadow-lg hover:from-green-600 hover:to-green-500 hover:shadow-emerald-500/50 transition-all duration-200 active:scale-98"
        >
          Login
        </button>
        {error && (
          <p className="mt-5 text-red-400 bg-black/40 rounded px-3 py-2 text-center shadow animate-error-pop" style={{animation: "errorPop 0.44s"}}>
            {error}
          </p>
        )}
        <p className="mt-8 text-gray-400 text-center text-base">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-green-400 hover:underline font-bold">Register</a>
        </p>
        <style>
          {`
            @keyframes glassFadeIn {
              0% { opacity: 0; transform: translateY(24px);}
              100% { opacity: 1; transform: translateY(0);}
            }
            @keyframes errorPop {
              0% { transform: scale(0.96); opacity: 0;}
              60% { transform: scale(1.07); opacity: 1;}
              100% { transform: scale(1);}
            }
            .animate-glass { animation: glassFadeIn 0.95s cubic-bezier(.38,.53,.56,1.04) both;}
            .animate-error-pop { animation: errorPop 0.39s;}
          `}
        </style>
      </form>
    </div>
  );
}