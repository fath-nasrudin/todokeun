import { renderLeftbar } from "../components/leftbar.js";
import { renderMainbar } from "../components/mainbar.js";
import { router } from "../router/router.js";

window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);

const root = document.getElementById("root");
root.textContent = "";

root.append(renderLeftbar(), renderMainbar());
