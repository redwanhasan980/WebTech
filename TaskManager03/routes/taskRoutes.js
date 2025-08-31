const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);       // Create Task
router.get("/", getAllTasks);       // Get All Tasks
router.get("/:id", getTaskById);    // Get Single Task
router.put("/:id", updateTask);     // Update Task
router.delete("/:id", deleteTask);  // Delete Task

module.exports = router;
