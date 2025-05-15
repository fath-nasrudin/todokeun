import todoCore from "../model/todo.core.js";
import { createElement } from "../utils/dom.js";

function renderTaskItem(taskData) {
  const task = createElement("div", "task");

  const taskCheckbox = createElement("input");
  taskCheckbox.type = "radio";
  taskCheckbox.name = "task-checkbox";
  taskCheckbox.checked = taskData.isDone;
  task.appendChild(taskCheckbox);

  const taskBody = createElement("div", "task-body");
  task.append(taskBody);
  const taskFirstline = createElement("div", "task-firstline");
  taskBody.append(taskFirstline);
  const taskTitle = createElement("div", "task-title", taskData.name);
  taskFirstline.append(taskTitle);
  const taskActions = createElement("div", "task-actions");
  taskFirstline.append(taskActions);
  const taskEdit = createElement("div", "task-edit", "E");
  taskActions.append(taskEdit);
  const taskDelete = createElement("div", "task-delete", "D");
  taskActions.append(taskDelete);

  if (taskData.description) {
    const taskDescription = createElement(
      "div",
      "task-description",
      taskData.description
    );
    taskBody.append(taskDescription);
  }

  const taskFooter = createElement("div", "task-footer");
  taskBody.append(taskFooter);
  const taskDuedate = createElement("div", "task-duedate", taskData.dueDate);
  taskFooter.append(taskDuedate);
  const taskProject = createElement("div", "task-project", "OnWork");
  taskFooter.append(taskProject);

  return task;
}

function renderTaskForm(taskData = null) {
  const taskForm = createElement("form", "task-form");
  const inputTaskName = createElement("input", "task-form-name");
  inputTaskName.placeholder = "Task Name";
  if (taskData?.name) inputTaskName.value = taskData.name;
  taskForm.append(inputTaskName);

  const inputDescription = createElement("input", "task-form-description");
  inputDescription.placeholder = "Description";
  if (taskData?.description) inputDescription.value = taskData.description;
  taskForm.append(inputDescription);

  const taskFooter = createElement("div", "task-form-footer");
  taskForm.append(taskFooter);

  const selectProject = createElement("select", "task-form-select");
  taskFooter.append(selectProject);

  const projects = todoCore.project.getUserProjects();
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
    taskData ? "Edit" : "Create"
  );
  taskActions.append(saveButton);

  const cancelButton = createElement("button", "btn btn--secondary", "Cancel");
  taskActions.append(cancelButton);

  return taskForm;
}

function renderTasksSection(title, data) {
  const tasksSection = createElement("div", "tasks-section");

  const tasksSectionTitle = createElement("div", "tasks-section-title", title);
  tasksSection.appendChild(tasksSectionTitle);

  data.map((taskData) => {
    const taskItem = renderTaskItem(taskData);
    tasksSection.append(taskItem);
  });

  tasksSection.append(renderTaskForm());

  return tasksSection;
}

// data[0].title, data[0].tasks
export function renderTasksContainer(title, data, querySelector = "") {
  let tasksContainer;
  if (querySelector) {
    tasksContainer = document.querySelector(querySelector);
    tasksContainer.textContent = "";
  } else {
    tasksContainer = createElement("div", "tasks");
  }

  const tasksFilterTitle = createElement("div", "tasks-filter-title", title);
  tasksContainer.appendChild(tasksFilterTitle);

  //   is the data have sections?
  data.forEach((dataSection) => {
    const tasksSection = renderTasksSection(
      dataSection.title,
      dataSection.tasks
    );
    tasksContainer.appendChild(tasksSection);
  });

  return tasksContainer;
}
