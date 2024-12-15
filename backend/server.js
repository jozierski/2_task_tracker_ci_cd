const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let tasks = []; // in memory task list

// GET /tasks for retriving all tasks
app.get("/tasks", (req, res) => res.json(tasks));

// POST /tasks for creating new tasks
app.post("/tasks", (req, res) => {
  const task = { id: tasks.length + 1, ...req.body, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id to update existing task by id
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((task) => task.id == id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).send("Task not found");
  }
});

// DELETE /tasks/:id to delete existing task by id
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id != id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));