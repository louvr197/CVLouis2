import "./style.css";
import { renderNav } from "./components/nav.js";
import { renderFooter } from "./components/footer.js";
// import { dataHandler } from "./components/dataHandler.js";
import data from "./data.json";
import { renderDataToDOM } from "./components/dataHandler.js";

document.addEventListener("DOMContentLoaded", () => {
  renderDataToDOM(data);
});
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
// console.log(data);
document.querySelector("#app").innerHTML = `

${renderNav()}
<div id="cv"></div>
${renderFooter()}
`;

document.getElementById("cv").innerHTML = data
  .map((datum) => dataHandler(datum))
  .join("");
