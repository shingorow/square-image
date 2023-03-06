export default class SettingButtons {
  create(settingList, listQuery, action = () => {}) {
    const listElement = document.querySelector(listQuery);
    while (listElement.lastChild) {
      listElement.removeChild(listElement.lastChild);
    }
    const listElements = [];
    for (const setting of settingList) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.dataset.margin = setting.value;
      button.textContent = setting.label;
      if (setting.active) button.classList.add("active");
      li.appendChild(button);

      listElement.appendChild(li);
      listElements.push(li);
    }

    return listElements;
  }
}
