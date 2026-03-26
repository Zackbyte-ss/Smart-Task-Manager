import { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("Task required");

    const newTask = {
      id: Date.now(),
      title,
      category,
      priority,
      dueDate,
      completed: false,
    };

    addTask(newTask);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option>Work</option>
        <option>Study</option>
        <option>Personal</option>
      </select>

      <select onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button>Add</button>
    </form>
  );
}

export default TaskForm;