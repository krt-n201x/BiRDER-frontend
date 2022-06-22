import apiClient from '@/services/AxiosClient.js'

export default {
  searchBirdNameOther(searchinformation) {
    console.log(searchinformation)
    return apiClient.get('/searchBirdList?birdName=' + searchinformation)
  },
  searchBirdCodeOther(searchinformation) {
    console.log(searchinformation)
    return apiClient.get('/searchBirdList/?birdCode=' + searchinformation)
  },
  searchBirdSpeciesOther(searchinformation) {
    console.log(searchinformation)
    return apiClient.get('/searchBirdList/?birdSpecies=' + searchinformation)
  },
  searchBirdStatusOther(searchinformation) {
    console.log(searchinformation)
    return apiClient.get('/searchBirdList/?birdStatus=' + searchinformation)
  },
  //Admin
  searchBirdNameAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdList/?birdName=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  },
  searchBirdCodeAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdList/?birdCode=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  },
  searchBirdSpeciesAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdList/?birdSpecies=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  },
  searchBirdStatusAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdList/?birdStatus=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  }
}
