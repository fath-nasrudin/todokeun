import { renderTasksContainer } from "../components/tasks.js";
import todoCore from "../model/todo.core.js";

export function renderInboxPage() {
  const projectId = todoCore.project.getDefaultProjectId();
  const project = todoCore.project.getProjectById(projectId);

  const tasks = todoCore.task.getTasksByProjectId(project.id);
  renderTasksContainer(project.name, [{ tasks }], ".tasks");
}
