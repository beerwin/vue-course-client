import Vue from 'vue'
import Vuex from 'vuex'
import clientListStore from './clientListStore';
import clientStore from './clientStore.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clientListStore: clientListStore,
    clientStore: clientStore
  }
})
