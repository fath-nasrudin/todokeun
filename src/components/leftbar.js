import todoCore from "../model/todo.core.js";
import { createElement } from "../utils/dom.js";

// user project data
let projectItems = todoCore.project.getAllProjects();
projectItems = projectItems.map((project) => {
  const safeName = project.name.split(" ").join(" ");
  project.target = `/project/${safeName}--${project.id}`;
  return project;
});
const userProjects = {
  title: "Projects",
  items: projectItems,
};

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
    navSection.append(createElement("div", "leftbar-nav-header", title));
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
    renderNavSection(userProjects)
  );

  return leftbar;
}
