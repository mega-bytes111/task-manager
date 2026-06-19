const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const notificationRoutes = require("./src/routes/notificationRoutes");

const connectDB = require("./src/config/db");
const { protect } = require("./src/middleware/authMiddleware");

const authRoutes = require("./src/routes/authRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

// ✅ NEW: Import socket initializer
const { initSocket } = require("./src/socket/socketHandler");

dotenv.config();

// ✅ Connect Database
connectDB();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Basic Route
app.get("/", (req, res) => {
  res.send("Task Manager API Running ✅");
});

// ✅ Protected Test Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user,
  });
});

// ✅ Create HTTP Server
const server = http.createServer(app);

// ✅ Initialize Socket (NEW WAY)
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});