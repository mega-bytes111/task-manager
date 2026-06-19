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

// ✅ Handle unhandled promise rejections (important for Render)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});

const app = express();

/* =========================
   ✅ PRODUCTION CORS CONFIG
========================= */

const allowedOrigins = [
  "https://task-manager-bkg3.onrender.com" // 👈 replace this
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

/* =========================
   ✅ ROUTES
========================= */

app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Basic Health Route
app.get("/", (req, res) => {
  res.send("Task Manager API Running ✅");
});

// ✅ Protected Test Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user
  });
});

/* =========================
   ✅ DATABASE CONNECTION
========================= */

connectDB().catch(err => {
  console.error("❌ Database connection failed:", err.message);
  console.log("⚠️ Server is running without DB connection");
});

/* =========================
   ✅ SERVER + SOCKET SETUP
========================= */

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGO_URI ? "✅ SET" : "❌ NOT SET"}`);
});