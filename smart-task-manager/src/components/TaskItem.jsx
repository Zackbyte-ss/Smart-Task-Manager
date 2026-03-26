// TaskItem.jsx
function TaskItem({ task, deleteTask, updateTask }) {
  const toggleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  return (
    <div className={`task ${task.priority.toLowerCase()}`}>
      <h3 style={{ textDecoration: task.completed ? "line-through" : "" }}>
        {task.title}
      </h3>

      <p>{task.category} | {task.dueDate}</p>

      <button onClick={toggleComplete}>
        {task.completed ? "Undo" : "Done"}
      </button>

      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;