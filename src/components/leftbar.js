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

function renderNavSection({ title, items }) {
  const navSection = createElement("div", "leftbar-nav");

  if (title) {
    navSection.append(createElement("div", "leftbar-nav-header-title", title));
  }

  items.forEach((item) => {
    const navItem = createElement(
      "div",
      `leftbar-nav-item ${item.disable ? " disable" : ""}`,
      item.name
    );
    navItem.dataset.target = item.target;

    navItem.addEventListener("click", () => {
      window.location.hash = item.target;
    });
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
    const navItem = createElement(
      "div",
      `leftbar-nav-item ${item.disable ? " disable" : ""}`,
      item.name
    );
    navItem.dataset.target = item.target;

    navItem.addEventListener("click", () => {
      window.location.hash = item.target;
    });
    return navItem;
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
