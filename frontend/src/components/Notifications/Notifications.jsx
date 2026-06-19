import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNotifications, markNotificationAsRead } from "../../services/notifications";
import socket from "../../services/socket";

// JWT token se user id nikalne ka helper
function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || payload._id || payload.userId;
  } catch {
    return null;
  }
}

export default function Notifications() {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  // Fetch notifications on token change (login, reload etc.)
  useEffect(() => {
    if (!token) return;
    getNotifications(token).then((data) => setNotifications(data));
  }, [token]);

  // Real-time: Setup socket connection and join room
  useEffect(() => {
    if (!token) return;

    // Clean previous event listeners if any!
    socket.off("newNotification");

    socket.connect();
    const userId = getUserIdFromToken(token);
    if (userId) {
      socket.emit("join", userId);
    }

    // Listen for newNotification from backend
    socket.on("newNotification", (data) => {
      // Show alert for demo (optional)
      // alert("🔔 New Notification: " + data.message);
      setNotifications((prev) => [
        {
          _id: data._id ?? Date.now(), // backend _id ya fallback
          message: data.message,
          isRead: false,
          relatedTask: { title: data.taskTitle || "Assigned task" }
        },
        ...prev,
      ]);
    });

    // Clean up on unmount
    return () => {
      socket.off("newNotification");
      socket.disconnect();
    };
  }, [token]);

  // Unread notifications calculate
  const unread = notifications.filter((n) => !n.isRead);

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id, token);
    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div style={{ position: "relative", display: "inline-block", marginLeft: 20 }}>
      <span
        style={{ cursor: "pointer", fontSize: "2rem" }}
        onClick={() => setOpen((v) => !v)}
        title="Notifications"
      >
        🔔
        {unread.length > 0 && (
          <span style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "1rem"
          }}>
            {unread.length}
          </span>
        )}
      </span>
      {open && (
        <div style={{
          position: "absolute", top: "120%", right: 0,
          background: "#222", color: "#fff", border: "1px solid #444",
          borderRadius: "6px", minWidth: "250px", zIndex: 10, padding: "8px"
        }}>
          <b>Notifications</b>
          <ul>
            {notifications.length === 0 && <li>No notifications</li>}
            {notifications.map((note) => (
              <li key={note._id}
                  style={{ marginBottom: 6, opacity: note.isRead ? 0.5 : 1 }}>
                <span>
                  {note.message}
                  {note.relatedTask?.title &&
                    <span style={{ fontWeight: "bold" }}> [{note.relatedTask.title}]</span>
                  }
                </span>
                {!note.isRead &&
                  <button style={{ marginLeft: 5 }}
                          onClick={() => handleMarkAsRead(note._id)}>
                    Mark as read
                  </button>
                }
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}