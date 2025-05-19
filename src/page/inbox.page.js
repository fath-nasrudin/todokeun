import { renderTaskForm } from "../components/task-form.js";
import {
  renderTasksContainer,
  renderTasksContainerWrapper,
  renderTasksFilterTitle,
  renderTasksSection,
} from "../components/tasks.js";
import todoCore from "../model/todo.core.js";

export function renderInboxPage() {
  const projectId = todoCore.project.getDefaultProjectId();
  const project = todoCore.project.getProjectById(projectId);

  const tasks = todoCore.task.getTasksByProjectId(project.id);
  function onSubmit(data) {
    todoCore.task.createTask(data);
    renderProjectPage(projectId);
  }

  const taskForm = renderTaskForm({}, onSubmit);
  const tasksFilterTitle = renderTasksFilterTitle(project.name);
  const sections = [{ tasks }].map((section) =>
    renderTasksSection(null, section.tasks)
  );

  const tasksContainer = renderTasksContainerWrapper();
  tasksContainer.append(tasksFilterTitle, taskForm, ...sections);
}
