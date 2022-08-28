import apiClient from '@/services/AxiosClient.js'

export default {
  searchPlanStatus(searchinformation) {
    console.log(searchinformation)
    return apiClient.get('/searchPlannerList/?planStatus=' + searchinformation)
  },
  searchPlanTag(searchinformation) {
    console.log(searchinformation)
    return apiClient.get('/searchPlannerList/?labelTag=' + searchinformation)
  },
  //Admin
  searchPlanStatusAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchPlannerList/?planStatus=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  },
  searchPlanTagAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchPlannerList/?labelTag=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  }
}
