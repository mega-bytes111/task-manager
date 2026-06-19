const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

const connectDB = require("./src/config/db");
const { protect } = require("./src/middleware/authMiddleware");

const notificationRoutes = require("./src/routes/notificationRoutes");
const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const { initSocket } = require("./src/socket/socketHandler");

dotenv.config();

// Global error handler (important for Render)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Basic Routes
app.get("/", (req, res) => {
  res.send("Task Manager API Running ✅");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Protected route accessed ✅", user: req.user });
});

// Database Connection (non-blocking)
connectDB().catch(err => {
  console.error("❌ Database connection failed:", err.message);
  console.log("⚠️ Server is running without DB connection");
});

// Create Server + Socket
const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI ? "✅ SET" : "❌ NOT SET"}`);
});