import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  // fetch all tasks from backend with GET
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();
    setTasks(data);
  };

  // add tesk with POST
  const addTask = async () => {
    if (!taskText) return;
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: taskText }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  // toggle completed status of task
  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    const updatedTask = await response.json();
    setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
  };

  // delete task with DELETE
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Task Tracker</h1>
      <i style={{ display: "block", marginBottom: "20px" }}>v0.1</i>
      <input
        type="text"
        placeholder="Add a task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;