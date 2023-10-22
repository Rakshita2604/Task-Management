const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      // Add other task properties here
    });
    const savedTask = await task.save();
    // Emit a real-time event here to notify clients about the new task.
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task
router.patch('/:taskId', async (req, res) => {
  try {
    const updatedTask = await Task.updateOne(
      { _id: req.params.taskId },
      { $set: req.body }
    );
    // Emit a real-time event here to notify clients about the updated task.
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:taskId', async (req, res) => {
  try {
    const removedTask = await Task.remove({ _id: req.params.taskId });
    // Emit a real-time event here to notify clients about the deleted task.
    res.status(200).json(removedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
