// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Adjust path if needed

// --- GET /api/tasks --- Get all tasks ---
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // Sort by newest first
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- GET /api/tasks/:id --- Get task by ID ---
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err.message);
    // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

// --- POST /api/tasks --- Create new task ---
router.post('/', async (req, res) => {
  const { title, description, status } = req.body;

  // Basic validation
  if (!title) {
    return res.status(400).json({ msg: 'Title is required' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status // Will default to 'Todo' if not provided
    });

    const task = await newTask.save();
    res.status(201).json(task); // 201 Created status
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- PUT /api/tasks/:id --- Update task by ID ---
router.put('/:id', async (req, res) => {
  const { title, description, status } = req.body;

  // Build task object based on fields submitted
  const taskFields = {};
  if (title !== undefined) taskFields.title = title; // Allow empty string title if intended
  if (description !== undefined) taskFields.description = description;
  if (status) taskFields.status = status;

  // Add validation for status enum if needed
  if (status && !['Todo', 'In Progress', 'Done'].includes(status)) {
     return res.status(400).json({ msg: 'Invalid status value' });
  }

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Prevent updating title to empty if required
    if (taskFields.title === '') {
         return res.status(400).json({ msg: 'Title cannot be empty' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true, runValidators: true } // Return updated doc, run schema validators
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
     // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

// --- DELETE /api/tasks/:id --- Delete task by ID ---
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id); // Use findByIdAndDelete

    res.json({ msg: 'Task removed successfully' });
  } catch (err) {
    console.error(err.message);
     // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;