<template>
  <section class="weather-info">
    <h1>{{cityName}}</h1>
    <h2 v-if="isAGoodDay" class="weather-result">
      What a lovely day! Time to go out!
    </h2>
    <h2 v-else class="weather-result">
      What a bad day! Stay at home.
    </h2>
    <div class="temperature-info">
      <div class="temperature-info-value">{{temperature}}ºC</div>
      <img v-if="icon !== null" class="temperature-info-icon" v-bind:src="icon"/>
    </div>
    <div class="extra-info">
        <div class="extra-info-block" v-for="(info, index) in extraInfo" :key="index">
          <div class="extra-info-block-category">{{info.name}}</div>
          <p>{{info.value}}{{info.units}}</p>
        </div>
      </div>
  </section>
</template>

<script>
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
    icon: String,
    extraInfo: [Object],
    isAGoodDay: Boolean,
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
      width: 200px;
    }
    .temperature-info-value {
      font-size: 90px;
      font-weight: bold;
      line-height: 200px;
    }
  }
  .extra-info {
    font-family: 'Helvetica', sans-serif;
    font-weight: normal;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .extra-info-block {
      display: flex;
      flex-direction: column;
      .extra-info-block-category {
        font-weight: bold;
      }
    }
  }
  .weather-result {
    font-weight: normal;
  }
}
</style>
