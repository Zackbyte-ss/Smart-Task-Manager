export const loadTasks = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};