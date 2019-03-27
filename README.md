# vuex-persist-plugin

[![Version](https://img.shields.io/npm/v/vuex-persist-plugin.svg)](https://www.npmjs.com/package/vuex-persist-plugin)
[![Downloads](https://img.shields.io/npm/dm/vuex-persist-plugin.svg)](https://npmcharts.com/compare/vuex-persist-plugin?minimal=true)
[![License](https://img.shields.io/npm/l/vuex-persist-plugin.svg)](https://www.npmjs.com/package/vuex-persist-plugin)

Persist and restore the Vuex state between browser reloads.

## Usage

```js
import Vue from 'vue'
import Vuex from 'vuex'
import vuexPersistPlugin from 'vuex-persist-plugin'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {},
  strict: true,
  plugins: [
    vuexPersistPlugin({
      modules: [
        'auth'
      ]
    })
  ]
})

new Vue({ store })
```

## License

[MIT](http://opensource.org/licenses/MIT)
