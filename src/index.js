import Vuex from 'vuex'
import cloneDeep from 'lodash.clonedeep'

export default function vuexPersistPlugin ({
  modules,
  storageKeyPrefix = 'store/'
}) {
  modules || (modules = [])

  const restore = (moduleName, store) => {
    // restore module state from localStorage
    const state = cloneDeep(store.state)
    const stateForModule = JSON.parse(window.localStorage.getItem(`${storageKeyPrefix}${moduleName}`))
    if (stateForModule) {
      state[moduleName] = stateForModule
      store.replaceState(state)
    }
  }

  return function (store) {
    // inject `registerModule` to restore state
    const registerModuleOld = Vuex.Store.prototype.registerModule
    Vuex.Store.prototype.registerModule = function (path, rawModule, options) {
      registerModuleOld.apply(this, [path, rawModule, options])

      // restore state from localStorage after module registration
      const moduleName = typeof path === 'string' ? path : path.join('/')
      if (modules.indexOf(moduleName) !== -1) {
        restore(moduleName, store);
      }
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
          window.localStorage.setItem(`${storageKeyPrefix}${moduleName}`, JSON.stringify(state[moduleName]))
        }
      })
    })
  }
}
