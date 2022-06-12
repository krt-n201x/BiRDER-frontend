import { createStore } from 'vuex'

export default createStore({
  state: {
    farminspect: null,
    farmownerinspect: null,
    userinspect: null,
    currentLowUser: null,
    currentUser: JSON.parse(localStorage.getItem('user'))
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    },
    information(state) {
      return state.userinspect
    },
    farminspect(state) {
      return state.farminspect
    }
  },
  mutations: {
    updateCurrentUser(state, value) {
      state.currentUser = value
    },
    updateInformation(state, value) {
      state.userinspect = value
    },
    updateFarmInspect(state, value) {
      state.farminspect = value
    }
  },
  actions: {
    updateCurrentUser(context, value) {
      context.commit('updateCurrentUser', value)
    },
    updateInformation(context, value) {
      context.commit('updateInformation', value)
    },
    updateFarmInspect(context, value) {
      context.commit('updateFarmInspect', value)
    }
  },
  modules: {},
  flashMessage: '',
  event: null
})
