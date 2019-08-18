# Weather app using Vue

#### A basic SPA that shows the weather info of any place.

The first time that the user opens the app a service is called to know the user's city based on the IP.
It uses vuex to store the user preferences about the weather.
The user settings is stored in localStorage and when the app opens it reads the localStorage to rehydrate the vuex state.

The config settings modal (top-left) uses the vuex transitions to open/close.

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
