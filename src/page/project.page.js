import {
  renderTasksContainerWrapper,
  renderTasksFilterTitle,
  renderTasksSection,
} from "../components/tasks.js";
import todoCore from "../model/todo.core.js";
import { createElement } from "../utils/dom.js";
import { renderTaskForm } from "../components/task-form.js";

export function renderProjectPage(projectId) {
  // get data
  const project = todoCore.project.getProjectById(projectId);
  const tasks = todoCore.task.getTasksByProjectId(projectId);

  function onSubmit(data) {
    todoCore.task.createTask(data);
    renderProjectPage(projectId);
  }

  const taskForm = renderTaskForm({ projectId }, onSubmit);
  const tasksFilterTitle = renderTasksFilterTitle(project.name);
  const sections = [{ tasks }].map((section) =>
    renderTasksSection(null, section.tasks)
  );

  const tasksContainer = renderTasksContainerWrapper();
  tasksContainer.append(tasksFilterTitle, taskForm, ...sections);
}
