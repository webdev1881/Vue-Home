import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    error: null
  },
  actions: {
    async fetchCur(  ) {   
      const res = await fetch(`https://old.bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)      
      return await res.json()
    }
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },

  getters: {
    error: s => s.error
  },


  modules: { auth, info }
})
