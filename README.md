# Weather app using Vue

#### A basic SPA that shows the weather info of any place.

- City detection using an API that returns the city based on the IP.
- Persistence of the user preferences between different sessions using the localStorage.
- Error handling when the api fails or the city doesn't exist.
- Animation in the settings modal
- It uses Vuex to store the user preferences. When I started coding this app the user preferences values were used in different components. But after some refactor in the WeatherInfo.vue component (I wanted to make it more versatile to include new weather values without having to modify it) Vuex doesn't seem to be as necessary as before... Anyway, it helped me to understand how Vuex works :)
- Sass as the style preprocessor.
- The result is available in the following url via gh-pages:
	https://jcvv.github.io/weather-app-vue/

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
