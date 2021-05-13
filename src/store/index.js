import Vue from 'vue'
import Vuex from 'vuex'
import clientStore from './clientStore';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clientStore
  }
})
