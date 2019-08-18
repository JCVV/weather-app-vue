const LOCAL_STORAGE_KEY = 'weather_preferences';

export default {
  setPreferences(preferences) {
    const preferencesString = JSON.stringify(preferences);

    localStorage.setItem(LOCAL_STORAGE_KEY, preferencesString);
  },
  getPreferences() {
    const preferencesString = localStorage.getItem(LOCAL_STORAGE_KEY);

    return JSON.parse(preferencesString);
  },
};
