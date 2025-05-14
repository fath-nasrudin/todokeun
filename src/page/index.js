import { renderLeftbar } from "../components/leftbar.js";
import { renderMainbar } from "../components/mainbar.js";

const root = document.getElementById("root");
root.textContent = "";

root.append(renderLeftbar(), renderMainbar());
