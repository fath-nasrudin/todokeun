import { deleteTasksByProjectId } from "./task.js";

const PROJECT_KEY = "projects";
const DEFAULT_PROJECT_KEY = "default_project";

function loadProjects() {
  const raw = window.localStorage.getItem(PROJECT_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveProjects(projects) {
  window.localStorage.setItem(PROJECT_KEY, JSON.stringify(projects));
}

export function getDefaultProject() {
  const defaultProjectId = window.localStorage.getItem(DEFAULT_PROJECT_KEY);
  if (!defaultProjectId) {
    const newDefaultProjectId = createProject({ name: "Inbox" }).id;
    window.localStorage.setItem(DEFAULT_PROJECT_KEY, newDefaultProjectId);
    return newDefaultProjectId;
  }
  return defaultProjectId;
}

export function getDefaultProjectId() {
  return getDefaultProject();
}

export function getAllProjects() {
  return loadProjects();
}

export function getUserProjects() {
  const projects = loadProjects();
  return projects.filter((p) => p.id !== getDefaultProjectId());
}

export function getProjectById(projectId) {
  const projects = loadProjects();
  return projects.find((project) => project.id === projectId);
}

export function createProject({ name }) {
  const projects = loadProjects();
  const newProject = {
    id: crypto.randomUUID(),
    name,
  };
  projects.push(newProject);
  saveProjects(projects);

  return newProject;
}

export function updateProject(id, data) {
  const projects = loadProjects();
  const newProjects = projects.map((project) => {
    if (project.id === id) {
      project.name = data.name ? data.name : project.name;
    }
    return project;
  });
  saveProjects(newProjects);
}

export function deleteProjectById(id, options = {}) {
  const projects = loadProjects();
  const newProjects = projects.filter((project) => project.id !== id);
  saveProjects(newProjects);

  // delete tasks related to the project
  deleteTasksByProjectId(id);
}
