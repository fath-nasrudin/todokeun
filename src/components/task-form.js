import { createElement } from "../utils/dom.js";
import todoCore from "../model/todo.core.js";

export function renderTaskForm(
  taskData = {},
  onSubmit = null,
  onCancel = null
) {
  const taskForm = createElement("form", "task-form");
  taskForm.method = "POST";
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // onSubmit action
    const formData = new FormData(taskForm);

    // edit
    taskData = {
      ...taskData,
      name: formData.get("name"),
      projectId: formData.get("projectId"),
    };

    // if name is empty, dont allow to submit
    if (!taskData.name) return;

    onSubmit(taskData);
  });

  const inputTaskName = createElement("input", "task-form-name");
  inputTaskName.placeholder = "Task Name";
  inputTaskName.name = "name";
  if (taskData?.name) inputTaskName.value = taskData.name;
  taskForm.append(inputTaskName);

  const inputDescription = createElement("input", "task-form-description");
  inputDescription.placeholder = "Description";
  inputDescription.name = "description";

  if (taskData?.description) inputDescription.value = taskData.description;
  taskForm.append(inputDescription);

  const taskFooter = createElement("div", "task-form-footer");
  taskForm.append(taskFooter);

  const selectProject = createElement("select", "task-form-select");
  taskFooter.append(selectProject);
  selectProject.name = "projectId";

  const projects = todoCore.project.getAllProjects();
  projects.forEach((p) => {
    const item = createElement("option", "task-form-option", p.name);
    item.value = p.id;
    if (taskData?.projectId) {
      if (p.id === taskData.projectId) {
        item.selected = true;
      }
    }

    selectProject.append(item);
  });

  const taskActions = createElement("div", "task-form-actions");
  taskFooter.append(taskActions);

  const saveButton = createElement(
    "button",
    "btn btn--primary",
    taskData.id ? "Edit" : "Create"
  );
  saveButton.type = "submit";
  taskActions.append(saveButton);

  const cancelButton = createElement("button", "btn btn--secondary", "Cancel");
  cancelButton.addEventListener("click", () => {
    if (onCancel) onCancel();
  });
  taskActions.append(cancelButton);

  return taskForm;
}
