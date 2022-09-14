import apiClient from '@/services/AxiosClient.js'

export default {
  viewBreedingList() {
    return apiClient.get('/viewBirdBreedingList')
  },
  viewBreedingListAdmin(affiliation) {
    return apiClient.get('/viewBirdBreedingList/?affiliation=' + affiliation)
  },
  getBirdBreedingDetail(id) {
    return apiClient.get('/viewBirdBreedingDetail/' + id)
  },
  updateBirdBreedingOwner(details, egg) {
    console.log(details)
    return apiClient
      .post('/updateBirdBreedingDetail/' + details.id, {
        breedingCageNumber: details.breedingCageNumber,
        breedingClutch: details.breedingClutch,
        breedingDate: details.breedingDate,
        breedingStatus: details.breedingStatus,
        haveMale: details.haveMale,
        haveFemale: details.haveFemale,
        haveEggs: egg
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  updateBirdBreedingAdmin(details, affiliation, egg) {
    console.log(details)
    return apiClient
      .post(
        '/updateBirdBreedingDetail/' +
          details.id +
          '?affiliation=' +
          affiliation,
        {
          breedingCageNumber: details.breedingCageNumber,
          breedingClutch: details.breedingClutch,
          breedingDate: details.breedingDate,
          breedingStatus: details.breedingStatus,
          haveMale: details.haveMale,
          haveFemale: details.haveFemale,
          haveEggs: egg
        }
      )
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  deleteBreeding(id) {
    return apiClient.post('/deleteBirdBreeding/' + id)
  },
  getBirdFemaleListOwner() {
    return apiClient.get(
      '/getMaleOrFemaleBirdListForBreeding/?affiliation=&sex=F'
    )
  },
  getBirdFemaleListAdmin(affiliation) {
    return apiClient.get(
      '/getMaleOrFemaleBirdListForBreeding/?affiliation=' +
        affiliation +
        '&sex=F'
    )
  },
  getBirdMaleListOwner() {
    return apiClient.get(
      '/getMaleOrFemaleBirdListForBreeding/?affiliation=&sex=M'
    )
  },
  getBirdMaleListAdmin(affiliation) {
    return apiClient.get(
      '/getMaleOrFemaleBirdListForBreeding/?affiliation=' +
        affiliation +
        '&sex=M'
    )
  },
  getpedigree(id) {
    return apiClient.get('/viewBirdBreedingPedigree/' + id)
  },
  createBreedingOwner(details) {
    console.log('start create by')
    console.log(details)
    console.log(details.maleListSelected.birdSpeciesId)
    return apiClient.post('/createBirdBreedingDetail/', {
      breedingCageNumber: details.breedingCageNumber,
      breedingClutch: details.breedingClutch,
      breedingDate: details.time,
      breedingStatus: 'In progress',
      haveMale: details.maleListSelected,
      haveFemale: details.femaleListSelected,
      haveEggs: []
    })
  },
  createBreedingAdmin(details, affiliation) {
    console.log('start create by')
    console.log(details)
    console.log(details.maleListSelected.birdSpeciesId)
    return apiClient.post(
      '/createBirdBreedingDetail/?affiliation=' + affiliation,
      {
        breedingCageNumber: details.breedingCageNumber,
        breedingClutch: details.breedingClutch,
        breedingDate: details.time,
        breedingStatus: 'In progress',
        haveMale: details.maleListSelected,
        haveFemale: details.femaleListSelected,
        haveEggs: []
      }
    )
  }
}
