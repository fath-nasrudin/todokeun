import { renderInboxPage } from "../page/inbox.page.js";
import { renderProjectPage } from "../page/project.page.js";

function setActiveTab() {
  if (!window.location.hash) window.location.hash = "#/inbox";
  let hash = window.location.hash.slice(1);
  const splittedHash = hash.split("/");
  const route = splittedHash[1];
  const param = splittedHash[2];

  const navItems = document.querySelectorAll(".leftbar-nav-item");
  navItems.forEach((item) => {
    item.classList.remove("active");
    if (hash === item.dataset.target) {
      item.classList.add("active");
    }
  });
  // reset all active tab
  // make new active tab
  // get the data from the hash
}

export function router() {
  if (!window.location.hash) window.location.hash = "#/inbox";
  let hash = window.location.hash;
  const splittedHash = hash.split("/");
  const route = splittedHash[1];
  const param = splittedHash[2];

  setActiveTab();

  if (route === "project" && param) {
    const [projectName, projectId] = param.split("--");
    renderProjectPage(projectId);
  } else if (route === "inbox") {
    renderInboxPage();
  }
}
