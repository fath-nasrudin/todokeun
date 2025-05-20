import todoCore from "../model/todo.core.js";
import { renderProjectPage } from "./project.page.js";

export function renderInboxPage() {
  const projectId = todoCore.project.getDefaultProjectId();
  renderProjectPage(projectId);
}
