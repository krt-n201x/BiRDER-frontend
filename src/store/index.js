import { createStore } from 'vuex'

export default createStore({
  state: {
    currentLowUser: null,
    currentUser: JSON.parse(localStorage.getItem('user'))
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
