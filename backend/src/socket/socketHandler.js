let ioInstance;

const initSocket = (server) => {
  const { Server } = require("socket.io");

  ioInstance = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  ioInstance.on("connection", (socket) => {
    console.log("🔌 User Connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`✅ User ${userId} joined their room`);
    });

    socket.on("disconnect", () => {
      console.log("❌ User Disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized");
  }
  return ioInstance;
};

module.exports = { initSocket, getIO };