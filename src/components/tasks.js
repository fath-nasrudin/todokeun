import todoCore from "../model/todo.core.js";
import { createElement } from "../utils/dom.js";
import { renderTaskForm } from "./task-form.js";

function renderTaskItem(taskData, options = {}) {
  // first, look the component in the ui, of not found, create new component
  let taskWrapper = document.querySelector(`[data-id="${taskData.id}"]`);
  if (!taskWrapper) {
    taskWrapper = createElement("div");
    taskWrapper.dataset.id = taskData.id;
  } else {
    taskWrapper.textContent = "";
  }

  if (options.type === "form") {
    function onSubmit(data) {
      const newTaskData = todoCore.task.updateTask(taskData.id, data);
      renderTaskItem(newTaskData);
    }

    function onCancel() {
      renderTaskItem(taskData);
    }

    taskWrapper.append(renderTaskForm(taskData, onSubmit, onCancel));
    return;
  }

  const task = createElement("div", `task${taskData.isDone ? " done" : ""}`);
  taskWrapper.append(task);

  const taskCheckbox = createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.name = "task-checkbox";
  taskCheckbox.checked = taskData.isDone;
  taskCheckbox.addEventListener("change", () => {
    const task = taskCheckbox.closest(".task");
    task.classList.toggle("done");

    todoCore.task.updateTask(taskData.id, { isDone: taskCheckbox.checked });
  });
  task.appendChild(taskCheckbox);

  const taskBody = createElement("div", "task-body");
  task.append(taskBody);
  const taskFirstline = createElement("div", "task-firstline");
  taskBody.append(taskFirstline);
  const taskTitle = createElement("div", "task-title", taskData.name);
  taskFirstline.append(taskTitle);
  const taskActions = createElement("div", "task-actions");
  taskFirstline.append(taskActions);
  const taskEdit = createElement("button", "task-edit", "E");
  taskActions.append(taskEdit);
  taskEdit.addEventListener("click", () => {
    renderTaskItem(taskData, { type: "form" });
  });

  const taskDelete = createElement("button", "task-delete", "D");
  taskDelete.addEventListener("click", () => {
    todoCore.task.deleteTaskById(taskData.id);
    taskWrapper.remove();
  });
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

  return taskWrapper;
}

export function renderTasksFilterTitle(title) {
  const tasksFilterTitle = createElement("div", "tasks-filter-title", title);
  return tasksFilterTitle;
}

export function renderTasksSection(title, data) {
  const tasksSection = createElement("div", "tasks-section");

  const tasksSectionTitle = createElement("div", "tasks-section-title", title);
  tasksSection.appendChild(tasksSectionTitle);

  data.map((taskData) => {
    const taskItem = renderTaskItem(taskData);
    tasksSection.append(taskItem);
  });

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

export function renderTasksContainerWrapper(querySelector = ".tasks") {
  let tasksContainer = document.querySelector(".tasks");
  if (tasksContainer) {
    tasksContainer.textContent = "";
  } else {
    tasksContainer = createElement("div", "tasks");
  }

  return tasksContainer;
}
