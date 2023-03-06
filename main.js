import "@unocss/reset/eric-meyer.css";
import "./style.css";
import MarginSetting from "./libs/MarginSetting";
import MarginButton from "./libs/MarginButton";
import Canvas from "./libs/Canvas";

const marginSetting = new MarginSetting();
let marginList = marginSetting.get();
const fileQuerySelector = "#file";
const canvasQuerySelector = "#canvas";
const marginButton = new MarginButton();
const canvas = new Canvas();

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.querySelector(fileQuerySelector);
  const listElements = marginButton.create(
    marginList,
    "#margin-size-list",
    marginSetting.set.bind(marginSetting),
    canvas.draw,
    fileQuerySelector,
    canvasQuerySelector
  );
  for (const li of listElements) {
    li.firstChild.addEventListener("click", (e) => {
      for (const l of listElements) {
        l.firstChild.classList.remove("active");
      }
      e.target.classList.add("active");
      const marginData = e.target.dataset.margin;
      const file = fileInput.files[0] ?? null;
      if (file) {
        canvas.draw(canvasQuerySelector, marginData, file);
      }
      marginList = marginSetting.set(marginData);
    });
  }
  fileInput.addEventListener("change", (e) => {
    const activeSetting = marginList.find((margin) => margin.active);
    const margin = activeSetting.value;
    canvas.draw(canvasQuerySelector, margin, e.target.files[0]);
  });
});
