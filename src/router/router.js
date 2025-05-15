import { renderInboxPage } from "../page/inbox.page.js";
import { renderProjectPage } from "../page/project.page.js";

export function router() {
  if (!window.location.hash) window.location.hash = "#/inbox";
  let hash = window.location.hash;
  const splittedHash = hash.split("/");
  const route = splittedHash[1];
  const param = splittedHash[2];

  if (route === "project" && param) {
    const [projectName, projectId] = param.split("--");
    renderProjectPage(projectId);
  } else if (route === "inbox") {
    renderInboxPage();
  }
}
