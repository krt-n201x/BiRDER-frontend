import { createStore } from 'vuex'

export default createStore({
  state: {
    currentLowUser: null,
    currentUser: null
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    }
  },
  mutations: {
    updateCurrentUser(state, value) {
      state.currentUser = value
    }
  },
  actions: {
    updateCurrentUser(context, value) {
      context.commit('updateCurrentUser', value)
    }
  },
  modules: {},
  flashMessage: '',
  event: null
})
