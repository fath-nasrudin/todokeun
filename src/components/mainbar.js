import { createElement } from "../utils/dom.js";
import { renderTasksContainer } from "./tasks.js";

export function renderMainbar() {
  const mainbar = createElement("div", "mainbar");

  // mainbar header
  const mainbarHeader = createElement("header", "mainbar-header");
  const brand = createElement("a", "brand", "Todokeun");
  brand.setAttribute("href", "/");
  mainbarHeader.append(brand);
  mainbar.append(mainbarHeader);

  const tasksContainer = renderTasksContainer("Home", [
    {
      tasks: [
        { name: "Mengerjakan PR", dueDate: "17 Mei 2025" },
        { name: "Mengerjakan PR", dueDate: "17 Mei 2025" },
        { name: "Mengerjakan PR", dueDate: "17 Mei 2025" },
        { name: "Mengerjakan PR", dueDate: "17 Mei 2025" },
        { name: "Mengerjakan PR", dueDate: "17 Mei 2025" },
      ],
    },
  ]);
  mainbar.appendChild(tasksContainer);
  return mainbar;
}
