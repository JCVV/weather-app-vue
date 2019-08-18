import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userPreferences: {
      minTemp: {
        name: 'Low Temperature',
        value: 15,
        min: 0,
        max: 30,
        units: 'ºC',
      },
      maxTemp: {
        name: 'High Temperature',
        value: 30,
        min: 0,
        max: 50,
        units: 'ºC',
      },
      maxWind: {
        name: 'Max Wind Speed',
        value: 20,
        min: 0,
        max: 20,
        units: 'km/h',
      },
      maxHumidity: {
        name: 'Max Humidity',
        value: 20,
        min: 0,
        max: 100,
        units: '%',
      },
    },
  },
  mutations: {
    setUserPreference(state, payload) {
      const { index, value } = payload;

      state.userPreferences[index].value = value;
    },
    setAllUserPreferences(state, payload) {
      this.replaceState(payload);
    },
  },
  actions: {

  },
});
