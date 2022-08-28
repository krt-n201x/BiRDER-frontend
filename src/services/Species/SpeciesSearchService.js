import apiClient from '@/services/AxiosClient.js'

export default {
  searchSpeciesName(searchinformation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdSpeciesList/?speciesName=' + searchinformation
    )
  },
  //Admin
  searchSpeciesNameAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdSpeciesList/?speciesName=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  }
}
