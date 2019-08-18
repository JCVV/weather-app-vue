<template>
  <div id="app">
    <preferences />
    <form @submit.prevent="formSubmitted()">
      <input
        v-model="searchInput"
        class="city-input"
        type="text"
        id="searchInput"
        name="searchInput"
        placeholder="City Name"
      />
    </form>
    <section v-if="loading">
      <h1>Loading...</h1>
    </section>
    <weather-info
      v-else-if="results"
      v-bind="weatherData"
    />
    <h2 v-else> No results for '{{weatherData.cityName}}', try with other city.</h2>
  </div>
</template>

<script>
import Preferences from '@/components/Preferences.vue';
import WeatherInfo from '@/components/WeatherInfo.vue';
import storage from '@/utils/storage';
import api from '@/services/api';

export default {
  name: 'App',
  components: {
    Preferences,
    WeatherInfo,
  },
  data() {
    return {
      searchInput: '',
      results: false,
      loading: true,
      weatherData: {
        cityName: '',
        icon: null,
        temperature: '',
        humidity: '',
        wind: '',
        maxTemperature: '',
        minTemperature: '',
      },
    };
  },
  methods: {
    formSubmitted() {
      this.getWeatherInfo(this.searchInput);
    },
    getWeatherInfo(city) {
      this.loading = true;

      return api.getWeatherFromCity(city)
        .then((data) => {
          const {
            main,
            weather,
            wind,
            name,
            cod,
          } = data;

          if (cod === 200) {
            const weatherResponseData = weather[0];
            this.results = true;
            this.weatherData.temperature = Math.round(main.temp);
            this.weatherData.maxTemperature = Math.round(main.temp_max);
            this.weatherData.minTemperature = Math.round(main.temp_min);
            this.weatherData.icon = api.getIcon(weatherResponseData.icon);
            this.weatherData.humidity = main.humidity;
            this.weatherData.wind = wind.speed;
            this.weatherData.cityName = name;
            this.searchInput = '';
          } else {
            this.weatherData.cityName = city;
            this.results = false;
          }
        })
        .catch(() => {
          this.results = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  /**
   * Method to refresh the vuex store from the localStorage values.
   * It just needs to update updates the 'value' of each item from the store.
   * It doesn't update the name, min or max values so we can't use
   * the replaceState method.
   */
  created() {
    const userPreferences = storage.getPreferences();

    if (userPreferences) {
      Object.keys(userPreferences).forEach((index) => {
        this.$store.commit('setUserPreference', {
          index,
          value: parseInt(userPreferences[index].value, 10),
        });
      });
    }
  },
  /**
   * Method to obtain the city of the user using a geolocalization
   * service based on the IP.
   * It will show the user the weather info of his location the
   * first time he opens the app.
   */
  mounted() {
    api.getCityName()
      .then(city => this.getWeatherInfo(city));
  },
};
</script>

<style lang="scss">
body {
  background: #52bacc;
  background: -webkit-linear-gradient(to bottom, #52bacc, #047AA5);
  background: linear-gradient(to bottom, #52bacc, #047AA5);
  background-repeat: no-repeat;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  color: #eeefff;
  height: 420px;
  overflow: hidden;
  padding: 30px 150px;
  .city-input {
    width: 30%;
    text-align: center;
    padding: 0.25em 0.75em;
    font-size: 1.1em;
    border-radius: 5px;
  }
}

</style>
