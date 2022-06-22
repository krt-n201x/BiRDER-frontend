import apiClient from '@/services/AxiosClient.js'

export default {
  getAllBird() {
    return apiClient.get('/viewBirdList')
  },
  getAllBirds(perPage, page) {
    return apiClient.get('/viewBirdList?_limit=' + perPage + '&_page=' + page)
  },
  getAllBirdAdmin(affiliation) {
    return apiClient.get('/viewBirdList?affiliation=' + affiliation)
  },
  getAllBirdsAdmin(affiliation, perPage, page) {
    return apiClient.get(
      '/viewBirdList?affiliation=' +
        affiliation +
        '&_limit=' +
        perPage +
        '&_page=' +
        page
    )
  },
  getBirdDetail(id) {
    return apiClient.get('/viewBirdDetail/' + id)
  },
  updatebirdOther(updateinfo, birthdate, birdstatus, birdsex, imageUrls, id) {
    return apiClient
      .post('/updateBirdDetail/' + id, {
        birdName: updateinfo.birdname,
        birdCode: updateinfo.birdcode,
        birdColor: updateinfo.birdcolor,
        cageNumber: updateinfo.cagenumber,
        maleParentId: updateinfo.maleparentcode,
        femaleParentId: updateinfo.femaleparentcode,
        paringBirdId: updateinfo.paringcode,
        birdTreatmentRecord: updateinfo.birdtrecord,
        birdSpecies: updateinfo.birdspecies,
        dateOfBirth: birthdate,
        sexOfBird: birdsex,
        birdStatus: birdstatus,
        birdImage: imageUrls
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  updatebirdAdmin(
    updateinfo,
    birthdate,
    birdstatus,
    birdsex,
    imageUrls,
    id,
    affiliation
  ) {
    return apiClient
      .post('/updateBirdDetail/' + id + '?affiliation=' + affiliation, {
        birdName: updateinfo.birdname,
        birdCode: updateinfo.birdcode,
        birdColor: updateinfo.birdcolor,
        cageNumber: updateinfo.cagenumber,
        maleParentId: updateinfo.maleparentcode,
        femaleParentId: updateinfo.femaleparentcode,
        paringBirdId: updateinfo.paringcode,
        birdTreatmentRecord: updateinfo.birdtrecord,
        birdSpecies: updateinfo.birdspecies,
        dateOfBirth: birthdate,
        sexOfBird: birdsex,
        birdStatus: birdstatus,
        birdImage: imageUrls
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  }
}
