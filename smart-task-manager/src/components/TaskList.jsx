// TaskList.jsx
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, updateTask }) {
  if (!tasks.length) return <p>No tasks found</p>;

  return tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      deleteTask={deleteTask}
      updateTask={updateTask}
    />
  ));
}

export default TaskList;