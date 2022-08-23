import apiClient from '@/services/AxiosClient.js'

export default {
  searchBreedingbreedingCageNumber(searchinformation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdBreedingList/?breedingCageNumber=' + searchinformation
    )
  },
  searchBreedingbreedingStatus(searchinformation) {
    console.log('search by status')
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdBreedingList/?breedingStatus=' + searchinformation
    )
  },
  searchBreedingfemaleCode(searchinformation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdBreedingList/?femaleCode=' + searchinformation
    )
  },
  searchBreedingmaleCode(searchinformation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdBreedingList/?maleCode=' + searchinformation
    )
  },
  //Admin
  searchBreedingbreedingCageNumberAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdBreedingList/?breedingCageNumber=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  },
  searchBreedingbreedingStatusAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    console.log('search by status')
    return apiClient.get(
      '/searchBirdBreedingList/?breedingStatus=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  },
  searchBreedingfemaleCodeAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdBreedingList/?femaleCode=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  },
  searchBreedingmaleCodeAdmin(searchinformation, affiliation) {
    console.log(searchinformation)
    return apiClient.get(
      '/searchBirdBreedingList/?maleCode=' +
        searchinformation +
        '&affiliation=' +
        affiliation
    )
  }
}
