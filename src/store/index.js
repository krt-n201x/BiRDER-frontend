import { createStore } from 'vuex'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  flashMessage: '',
  event: null,
  currentLowUser: localStorage.getItem('lowuser'),
  currentUser: JSON.parse(localStorage.getItem('user'))
})
