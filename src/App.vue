<template>
  <div id="app">
    <user-settings />
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
      :isAGoodDay="isAGoodDay"
    />
    <h2 v-else> No results for '{{weatherData.cityName}}', try with other city.</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserSettings from '@/components/UserSettings.vue';
import WeatherInfo from '@/components/WeatherInfo.vue';
import storage from '@/utils/storage';
import api from '@/services/api';

export default {
  name: 'App',
  components: {
    UserSettings,
    WeatherInfo,
  },
  data() {
    return {
      searchInput: '',
      results: false,
      loading: true,
      temperature: '',
      weatherData: {
        cityName: '',
        icon: null,
        extraInfo: {
          minTemperature: {
            value: '',
            name: 'Min Temperature',
            units: 'ºC',
          },
          maxTemperature: {
            value: '',
            name: 'Max Temperature',
            units: 'ºC',
          },
          wind: {
            value: '',
            name: 'Wind',
            units: 'km/h',
          },
          humidity: {
            value: '',
            name: 'Humidity',
            units: '%',
          },
        },
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
            const { extraInfo } = this.weatherData;
            this.results = true;
            this.searchInput = '';
            this.weatherData.cityName = name;
            this.weatherData.icon = api.getIcon(weatherResponseData.icon);
            this.weatherData.temperature = Math.round(main.temp);
            extraInfo.minTemperature.value = Math.round(main.temp_min);
            extraInfo.maxTemperature.value = Math.round(main.temp_max);
            extraInfo.wind.value = wind.speed;
            extraInfo.humidity.value = main.humidity;
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
  computed: {
    ...mapState(['userPreferences']),
    /**
     * Method to check if its a good day or not based
     * on the user preferences stored in vuex.
     */
    isAGoodDay() {
      const { extraInfo } = this.weatherData;
      const { value: minTempValue } = this.userPreferences.minTemp;
      const { value: maxTempValue } = this.userPreferences.maxTemp;
      const { value: maxWindValue } = this.userPreferences.maxWind;
      const { value: maxHumidityValue } = this.userPreferences.maxHumidity;

      return minTempValue <= this.weatherData.temperature
            && this.weatherData.temperature <= maxTempValue
            && extraInfo.wind.value <= maxWindValue
            && extraInfo.humidity.value <= maxHumidityValue;
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
@import url('https://fonts.googleapis.com/css?family=Montserrat');
@import url('https://fonts.googleapis.com/css?family=Helvetica');

#app {
  width: 480px;
  height: 410px;
  background: #52bacc;
  background: -webkit-linear-gradient(to bottom, #52bacc, #047AA5);
  background: linear-gradient(to bottom, #52bacc, #047AA5);
  background-repeat: no-repeat;
  font-family: "Montserrat", sans-serif;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  color: #eeefff;
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
