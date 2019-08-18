<template>
  <section class="weather-info">
      <h1>{{cityName}}</h1>
    <h1 class="weather-result" v-if="isAGoodDay">
      What a lovely day! Time to go out!
    </h1>
    <h1 class="weather-result" v-else>
      What a bad day. Stay at home.
    </h1>
    <div class="temperature-info">
      <div class="temperature-info-value">{{temperature}}ºC</div>
      <img class="temperature-info-icon" v-if="icon !== null" v-bind:src="icon"/>
    </div>
    <div class="extra-info">
        <div class="extra-info-block">
          <div>Humidity:</div>
          <div>{{humidity}}%</div>
        </div>
        <div class="extra-info-block">
          <div>Wind:</div>
          <div>{{wind}}km/h</div>
        </div>
        <div class="extra-info-block">
          <div>Max Temp:</div>
          <div>{{maxTemperature}}ºC</div>
        </div>
        <div class="extra-info-block">
          <div>Min Temp:</div>
          <div>{{minTemperature}}ºC</div>
        </div>
      </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
/**
 * Component to show the weather info.
 * It receives the weather info through the props
 * of the component.
 */
export default {
  name: 'WeatherInfo',
  props: {
    cityName: String,
    temperature: Number,
    maxTemperature: Number,
    minTemperature: Number,
    humidity: Number,
    wind: Number,
    icon: String,
  },
  computed: {
    ...mapState(['userPreferences']),
    /**
     * Method to check if its a good day or not based
     * on the user preferences stored in vuex.
     */
    isAGoodDay() {
      const { value: minTempValue } = this.userPreferences.minTemp;
      const { value: maxTempValue } = this.userPreferences.maxTemp;
      const { value: maxWindValue } = this.userPreferences.maxWind;
      const { value: maxHumidityValue } = this.userPreferences.maxHumidity;

      return minTempValue <= this.temperature
            && this.temperature <= maxTempValue
            && this.wind <= maxWindValue
            && this.humidity <= maxHumidityValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-info {
  height: 400px;
  .temperature-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .temperature-info-icon {
      width: 220px;
    }
    .temperature-info-value {
      font-size: 90px;
      font-weight: bold;
    }
  }
  .extra-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .extra-info-block {
      display: flex;
      flex-direction: column;
    }
  }
  .weather-result {
    clear: both;
  }
}
</style>
