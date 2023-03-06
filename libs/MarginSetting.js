export default class MarginSettings {
  configKey = "marginSettings";
  storage = window.localStorage;
  get() {
    const defaultSettings = [
      {
        label: "None",
        value: 0,
        active: true,
      },
      {
        label: "2%",
        value: 0.02,
        active: false,
      },
      {
        label: "5%",
        value: 0.05,
        active: false,
      },
      {
        label: "10%",
        value: 0.1,
        active: false,
      },
    ];

    const marginSettings = JSON.parse(this.storage.getItem(this.configKey));
    if (typeof marginSettings !== "object" || marginSettings === null) {
      this.storage.setItem(this.configKey, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    return marginSettings;
  }

  set(margin) {
    if (margin === null) return;
    const settings = JSON.parse(this.storage.getItem(this.configKey));
    for (const key in settings) {
      settings[key].active = settings[key].value === parseFloat(margin);
    }

    this.storage.setItem(this.configKey, JSON.stringify(settings));

    return settings;
  }
}
