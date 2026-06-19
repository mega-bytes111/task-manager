import { useState } from "react";
import axios from "axios";
import BASE_URL from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiOutlineMail, HiLockClosed, HiUserCircle } from "react-icons/hi"; // <-- npm install react-icons

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      alert("Registration successful!");
      login(res.data.token, res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl p-10 rounded-2xl border border-gray-500/30 shadow-[0_6px_36px_rgba(30,200,130,0.14)] animate-glass"
        style={{ animation: 'glassFadeIn 1.17s' }}
      >
        <h2 className="text-4xl font-bold text-center mb-7 text-green-300 tracking-tight drop-shadow-lg">
          <span className="drop-shadow-md animate-pulse">📝</span> Register
        </h2>
        <div className="mb-4 flex items-center rounded bg-gray-700/80 px-4">
          <HiUserCircle className="text-green-300 text-xl mr-2" />
          <input
            type="text"
            placeholder="Name"
            className="bg-transparent flex-1 py-2 border-none text-white placeholder-gray-400 focus:outline-none focus:ring-0"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex items-center rounded bg-gray-700/80 px-4">
          <HiOutlineMail className="text-green-300 text-lg mr-2" />
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
          <HiLockClosed className="text-green-300 text-lg mr-2" />
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
          className="w-full font-bold rounded-lg bg-gradient-to-r from-green-400 to-emerald-300 hover:from-green-500 hover:to-emerald-400 text-slate-900 p-2.5 text-xl shadow-lg hover:shadow-green-300/60 transition-all duration-200 active:scale-98"
        >
          Register
        </button>
        {error && (
          <p className="mt-5 text-red-400 bg-black/40 rounded px-3 py-2 text-center shadow animate-error-pop" style={{animation: "errorPop 0.44s"}}>
            {error}
          </p>
        )}
        <p className="mt-8 text-gray-400 text-center text-base">
          Already have an account?{" "}
          <a href="/" className="text-green-300 hover:underline font-bold">Login</a>
        </p>
        <style>
          {`
            @keyframes glassFadeIn {
              0% { opacity: 0; transform: translateY(28px);}
              100% { opacity: 1; transform: translateY(0);}
            }
            @keyframes errorPop {
              0% { transform: scale(0.97); opacity: 0;}
              60% { transform: scale(1.08); opacity: 1;}
              100% { transform: scale(1);}
            }
            .animate-glass { animation: glassFadeIn 1s cubic-bezier(.38,.53,.56,1.04) both;}
            .animate-error-pop { animation: errorPop 0.41s;}
          `}
        </style>
      </form>
    </div>
  );
}