import { renderTasksContainer } from "../components/tasks.js";
import todoCore from "../model/todo.core.js";

export function renderProjectPage(projectId) {
  // get data
  const project = todoCore.project.getProjectById(projectId);
  const tasks = todoCore.task.getTasksByProjectId(projectId);

  renderTasksContainer(project.name, [{ tasks }], ".tasks");
}
