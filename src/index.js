import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'

export default function vuexPersistPlugin ({ modules }) {
  modules || (modules = [])

  const restore = (moduleName, store) => {
    const state = cloneDeep(store.state)
    const stateForModule = JSON.parse(window.localStorage.getItem(`store/${moduleName}`))
    if (stateForModule) {
      state[moduleName] = stateForModule
      store.replaceState(state)
    }
  }

  return function (store) {
    // inject registerModule to restore state
    const registerModule = Vuex.Store.prototype.registerModule
    Vuex.Store.prototype.registerModule = function () {
      registerModule.apply(this, arguments)
      restore(arguments[0], store)
    }

    // restore state
    modules.forEach(moduleName => {
      restore(moduleName, store)
    })

    // subscribe
    store.subscribe((mutation, state) => {
      // persist state
      modules.forEach(moduleName => {
        if (moduleName in state && state[moduleName]) {
          window.localStorage.setItem(`store/${moduleName}`, JSON.stringify(state[moduleName]))
        }
      })
    })
  }
}
