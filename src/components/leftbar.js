import todoCore from "../model/todo.core.js";
import { createElement } from "../utils/dom.js";
import { renderProjectForm } from "./project-form.js";

const filters = {
  title: "",
  items: [
    { name: "Today", target: "/today", disable: true },
    { name: "Inbox", target: "/inbox" },
  ],
};

function renderNavItem(itemData) {
  const navItem = createElement(
    "div",
    `leftbar-nav-item ${itemData.disable ? " disable" : ""}`
  );

  const editButton = createElement("button", "", "E");
  editButton.dataset.action = "edit";
  const deleteButton = createElement("button", "", "D");
  deleteButton.dataset.action = "delete";
  navItem.append(
    createElement("div", "leftbar-nav-item-title", itemData.name),
    editButton,
    deleteButton
  );

  navItem.dataset.target = itemData.target;

  navItem.addEventListener("click", () => {
    window.location.hash = itemData.target;
  });
  return navItem;
}

function renderNavSection({ title, items }) {
  const navSection = createElement("div", "leftbar-nav");

  if (title) {
    navSection.append(createElement("div", "leftbar-nav-header-title", title));
  }

  items.forEach((item) => {
    const navItem = renderNavItem(item);
    navSection.append(navItem);
  });

  return navSection;
}

function renderProjectNavSection() {
  // user project data
  let projectItems = todoCore.project.getUserProjects();
  projectItems = projectItems.map((project) => {
    const safeName = project.name.split(" ").join(" ");
    project.target = `/project/${safeName}--${project.id}`;
    return project;
  });

  const data = {
    title: "Projects",
    items: projectItems,
  };

  const NAV_ID = "nav-projects";
  let navSection;
  navSection = document.querySelector(`[data-id="${NAV_ID}"]`);
  if (navSection) {
    navSection.textContent = "";
  } else {
    navSection = createElement("div", "leftbar-nav");
    navSection.dataset.id = NAV_ID;
    navSection.addEventListener("click", (e) => {
      // handling edit
      const node = e.target;

      if (node.dataset.action === "edit") {
        const navItem = node.closest("[data-project-id]");

        // goal. ganti component nav item dengan key berupa project id dengan form
        navItem.innerHTML = "";
        const projectId = navItem.dataset.projectId;
        const project = todoCore.project.getProjectById(projectId);

        const onSubmit = (data) => {
          const updatedProject = todoCore.project.updateProject(
            projectId,
            data
          );

          navItem.innerHTML = "";
          navItem.append(renderNavItem(updatedProject));
        };

        const onCancel = () => {
          navItem.innerHTML = "";
          navItem.append(renderNavItem(project));
        };

        navItem.append(renderProjectForm(project, onSubmit, onCancel));
        // tampilkan form. ganti nav item ini pakai project form
      }

      // delete project
      if (node.dataset.action === "delete") {
        const navItem = node.closest("[data-project-id]");
        const projectId = navItem.dataset.projectId;
        todoCore.project.deleteProjectById(projectId);
        navItem.remove();
        window.location.hash = "#/inbox";
      }
    });
  }

  const navSectionHeader = createElement("div", "leftar-nav-header");

  navSection.append(
    createElement("div", "leftbar-nav-header-title", data.title)
  );

  const onSubmit = (data) => {
    todoCore.project.createProject(data);
    renderProjectNavSection();
  };
  const projectForm = renderProjectForm({}, onSubmit);

  const navItems = data.items.map((item) => {
    const navItemWrapper = createElement("div");
    navItemWrapper.dataset.projectId = item.id;
    navItemWrapper.dataset.key = item.id;
    const navItem = renderNavItem(item);
    navItemWrapper.append(navItem);
    return navItemWrapper;
  });

  navSection.append(navSectionHeader, projectForm, ...navItems);
  return navSection;
}

export function renderLeftbar() {
  const leftbar = createElement("div", "leftbar");

  const leftbarHeader = createElement("div", "leftbar-header");
  leftbarHeader.append(
    createElement("div", "", "User Account"),
    createElement("div", "", "X")
  );

  leftbar.append(
    leftbarHeader,
    renderNavSection(filters),
    renderProjectNavSection()
  );

  return leftbar;
}
