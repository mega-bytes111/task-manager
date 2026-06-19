const Task = require("../models/Task");
const Notification = require("../models/Notification");
const { getIO } = require("../socket/socketHandler");

// ✅ Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
    });

    const populatedTask = await task.populate([
      { path: "assignedTo", select: "name email" },
      { path: "createdBy", select: "name email" },
    ]);

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get My Tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.user._id },
        { assignedTo: req.user._id },
      ],
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Only creator can update
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const previousAssignedTo = task.assignedTo?.toString();

    // ✅ Update fields
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.assignedTo = req.body.assignedTo || task.assignedTo;

    const updatedTask = await task.save();

    // ✅ If assignedTo changed → create notification
    if (
      req.body.assignedTo &&
      req.body.assignedTo !== previousAssignedTo
    ) {
      const notification = await Notification.create({
        user: req.body.assignedTo,
        message: `You have been assigned a new task: ${task.title}`,
        relatedTask: task._id,
      });

      const io = getIO();

      io.to(req.body.assignedTo).emit("newNotification", {
        message: notification.message,
        taskId: task._id,
      });

      console.log("✅ Notification created & emitted");
    }

    // ✅ Populate user details
    const populatedTask = await updatedTask.populate([
      { path: "assignedTo", select: "name email" },
      { path: "createdBy", select: "name email" },
    ]);

    res.json(populatedTask);
  } catch (error) {
    console.error("❌ Update Task Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};