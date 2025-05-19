import { createElement } from "../utils/dom.js";
import todoCore from "../model/todo.core.js";

export function renderProjectForm(
  projectData = {},
  onSubmit = null,
  onCancel = null
) {
  const projectForm = createElement("form", "project-form");
  projectForm.method = "POST";
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // onSubmit action
    const formData = new FormData(projectForm);

    // edit
    projectData = {
      ...projectData,
      name: formData.get("name"),
      projectId: formData.get("projectId"),
    };

    onSubmit(projectData);
  });

  const inputProjectName = createElement("input", "project-form-name");
  inputProjectName.placeholder = "Project Name";
  inputProjectName.name = "name";
  if (projectData?.name) inputProjectName.value = projectData.name;
  projectForm.append(inputProjectName);

  const projectFooter = createElement("div", "project-form-footer");
  projectForm.append(projectFooter);

  const projectActions = createElement("div", "project-form-actions");
  projectFooter.append(projectActions);

  const saveButton = createElement(
    "button",
    "btn btn--primary",
    projectData.id ? "Edit" : "Create"
  );
  saveButton.type = "submit";
  projectActions.append(saveButton);

  const cancelButton = createElement("button", "btn btn--secondary", "Cancel");
  cancelButton.addEventListener("click", () => {
    if (onCancel) onCancel();
  });
  projectActions.append(cancelButton);

  return projectForm;
}
