import { createStore } from 'vuex'

export default createStore({
  state: {
    farminspect: null,
    farmownerinspect: null,
    userinspect: null,
    birdinspect: null,
    birdbreedingdetails: [],
    planningdetail: null,
    currentLowUser: null,
    speciesDetail: [],
    egginspect: null,
    birdsM: 0,
    birdsF: 0,
    birdsU: 0,
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
    },
    birdinformation(state) {
      return state.birdinspect
    },
    birdbreedingdetails(state) {
      return state.birdbreedingdetails
    },
    planningdetail(state) {
      return state.planningdetail
    },
    speciesDetail(state) {
      return state.speciesDetail
    },
    egginspect(state) {
      return state.egginspect
    },
    birdsM(state) {
      return state.birdsM
    },
    birdsF(state) {
      return state.birdsF
    },
    birdsU(state) {
      return state.birdsU
    }
  },
  mutations: {
    updateCurrentUser(state, value) {
      state.currentUser = value
    },
    updateInformation(state, value) {
      state.userinspect = value
    },
    updatebirdinformation(state, value) {
      state.birdinspect = value
    },
    updateFarmInspect(state, value) {
      state.farminspect = value
    },
    updateBirdBreedingDetails(state, value) {
      state.birdbreedingdetails = value
    },
    updatePlanningDetail(state, value) {
      state.planningdetail = value
    },
    updatespeciesDetail(state, value) {
      state.speciesDetail = value
    },
    updateegginspect(state, value) {
      state.egginspect = value
    },
    updatebirdsM(state, value) {
      state.birdsM = value
    },
    updatebirdsF(state, value) {
      state.birdsF = value
    },
    updatebirdsU(state, value) {
      state.birdsU = value
    }
  },
  actions: {
    updateCurrentUser(context, value) {
      context.commit('updateCurrentUser', value)
    },
    updateInformation(context, value) {
      context.commit('updateInformation', value)
    },
    updatebirdinformation(context, value) {
      context.commit('updatebirdinformation', value)
    },
    updateFarmInspect(context, value) {
      context.commit('updateFarmInspect', value)
    },
    updateBirdBreedingDetails(context, value) {
      context.commit('updateBirdBreedingDetails', value)
    },
    updatePlanningDetail(context, value) {
      context.commit('updatePlanningDetail', value)
    },
    updatespeciesDetail(context, value) {
      context.commit('updatespeciesDetail', value)
    },
    updateegginspect(context, value) {
      context.commit('updateegginspect', value)
    },
    updatebirdsM(context, value) {
      context.commit('updatebirdsM', value)
    },
    updatebirdsF(context, value) {
      context.commit('updatebirdsF', value)
    },
    updatebirdsU(context, value) {
      context.commit('updatebirdsU', value)
    }
  },
  modules: {},
  flashMessage: '',
  event: null
})
