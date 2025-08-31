const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// In-memory storage
let tasks = [];
let idCounter = 1;

// ✅ Create Task
router.post("/", (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = new Task(idCounter++, title, description, status || "To Do");
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ Read All Tasks (with optional filtering & searching)
router.get("/", (req, res) => {
  let result = [...tasks];

  // Filtering by status
  if (req.query.status) {
    result = result.filter(
      (task) => task.status.toLowerCase() === req.query.status.toLowerCase()
    );
  }

  // Searching by title/description
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    result = result.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        task.description.toLowerCase().includes(searchTerm)
    );
  }

  res.json(result);
});

// ✅ Read Single Task by ID
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// ✅ Update Task
router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  const { title, description, status } = req.body;

  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (status) task.status = status;

  res.json(task);
});

// ✅ Delete Task
router.delete("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json({ message: "Task deleted successfully", deletedTask });
});

module.exports = router;
