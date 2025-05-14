import todoCore from "../model/todo.core.js";
import { createElement } from "../utils/dom.js";

// user project data
const projectItems = todoCore.project.getAllProjects();
const userProjects = {
  title: "Projects",
  items: projectItems,
};

const filters = {
  title: "",
  items: [{ name: "Today" }, { name: "Inbox" }],
};

function renderNavSection({ title, items }) {
  const navSection = createElement("div", "leftbar-nav");

  if (title) {
    navSection.append(createElement("div", "leftbar-nav-header", title));
  }

  items.forEach((item) => {
    const navItem = createElement("div", "leftbar-nav-item", item.name);
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
