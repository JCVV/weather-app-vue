// ?q=London&appid=fbe3ed9cc813fd7de1b68994d595b3e8';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = 'fbe3ed9cc813fd7de1b68994d595b3e8';
const UNITS = 'metric';

const IPINFO_URL = 'https://ipinfo.io/geo';
const IPINFO_TOKEN = '5720d9369e2d41';

export default {
  fetchUrl(url) {
    return fetch(url)
      .then(response => response.json());
  },
  /**
   * Method to obtain the weather info from a city.
   * @param {String} city City name to retrieve the weather info from.
   */
  getWeatherFromCity(city) {
    const url = `${WEATHER_URL}?q=${city}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

    return this.fetchUrl(url);
  },
  /**
   * Method to obtain the weather info from latitude and longitude.
   * @param {Number} lat
   * @param {Number} lon
   */
  getWeatherFromCoords(lat, lon) {
    const url = `${WEATHER_URL}?lat=${lat}&lon=${lon}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

    return this.fetchUrl(url);
  },

  getCityName() {
    const url = `${IPINFO_URL}?token=${IPINFO_TOKEN}`;

    return this.fetchUrl(url)
      .then(({ city }) => city);
  },

  getIcon(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  },
};
