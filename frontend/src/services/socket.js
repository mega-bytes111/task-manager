import { io } from "socket.io-client";
const BASE_URL = "http://localhost:5000"; // backend ka url
const socket = io(BASE_URL, { autoConnect: false }); // manually connect karenge
export default socket;