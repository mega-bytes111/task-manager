import { io } from "socket.io-client";

// ✅ Backend URL from Vite environment
const BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Create socket instance
const socket = io(BASE_URL, {
  autoConnect: false,
  transports: ["websocket"], // better for production
});

export default socket;