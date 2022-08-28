import apiClient from '@/services/AxiosClient.js'

export default {
  getSpeciesOwner(perPage, page) {
    return apiClient.get(
      '/viewBirdSpeciesList/?_limit=' + perPage + '&_page=' + page
    )
  },
  getSpeciesAdmin(affiliation, perPage, page) {
    return apiClient.get(
      '/viewBirdSpeciesList/?affiliation=' +
        affiliation +
        '&_limit=' +
        perPage +
        '&_page=' +
        page
    )
  },
  createSpecies(details) {
    console.log('start create by')
    console.log(details)
    return apiClient.post('/createBirdSpeciesDetail/', {
      speciesName: details.speciesName,
      familyName: details.familyName,
      speciesColor: details.speciesColor
    })
  },
  createSpeciesAdmin(details, affiliation) {
    console.log('start create by')
    console.log(details)
    return apiClient.post(
      '/createBirdSpeciesDetail/?affiliation=' + affiliation,
      {
        speciesName: details.speciesName,
        familyName: details.familyName,
        speciesColor: details.speciesColor
      }
    )
  },
  getSpeciesDetail(id) {
    return apiClient.get('/viewBirdSpeciesDetail/' + id)
  },
  updateSpecies(id, details) {
    console.log(id, details)
    return apiClient.post('/updateBirdSpeciesDetail/' + id, {
      speciesName: details.speciesName,
      familyName: details.familyName,
      speciesColor: details.speciesColor
    })
  },
  deleteSpecies(id) {
    return apiClient.post('/deleteBirdSpecies/' + id)
  }
}
