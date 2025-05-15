import { getDefaultProject } from "./project.js";

const TASK_KEY = "tasks";
function loadTasks() {
  const raw = window.localStorage.getItem(TASK_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks) {
  window.localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
}

// get all tasks
export function getAllTasks() {
  return loadTasks();
}

export function getTasksByProjectId(projectId) {
  const tasks = loadTasks();
  return tasks.filter((task) => task.projectId === projectId);
}

// create task
export function createTask({
  name,
  projectId = null,
  isDone = false,
  dueDate = null,
}) {
  const tasks = loadTasks();

  const newTask = {
    id: crypto.randomUUID(),
    name,
    projectId: projectId ? projectId : getDefaultProject(),
    isDone,
    dueDate,
  };

  tasks.push(newTask);
  saveTasks(tasks);

  return newTask;
}

// update task
export function updateTask(id, data) {
  const tasks = loadTasks();
  const newTasks = tasks.map((task) => {
    if (task.id === id) {
      task.name = data.name ? data.name : task.name;
      task.dueDate = data.dueDate ? data.dueDate : task.dueDate;
      task.isDone = data.isDone ? data.isDone : task.isDone;
      task.projectId = data.projectId ? data.projectId : task.projectId;
    }
    return task;
  });
  saveTasks(newTasks);
}

// delete task
export function deleteTaskById(id, options = {}) {
  const tasks = loadTasks();
  const newTasks = tasks.filter((task) => task.id !== id);
  saveTasks(newTasks);
}

export function deleteTasksByProjectId(projectId, options = {}) {
  const tasks = loadTasks();
  const newTasks = tasks.filter((task) => task.projectId !== projectId);
  saveTasks(newTasks);
}
