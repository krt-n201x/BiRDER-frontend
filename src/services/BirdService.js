import apiClient from '@/services/AxiosClient.js'

export default {
  getAllBird() {
    return apiClient.get('/viewBirdList')
  },
  getAllBirdWithoutPagination() {
    return apiClient.get('/getBirdListWithoutPaging')
  },
  getAllBirdWithoutPaginationAdmin(affiliation) {
    return apiClient.get(
      '/getBirdListWithoutPaging/?affiliation=' + affiliation
    )
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
  updatebirdOther(
    updateinfo,
    birthdate,
    birdstatus,
    birdsex,
    imageUrls,
    id,
    BirdListFSelectedfinal,
    BirdListMSelectedfinal,
    SpeciesSelectfinal,
    paringBirdId
  ) {
    console.log('father' + BirdListMSelectedfinal)
    return apiClient
      .post('/updateBirdDetail/' + id, {
        birdName: updateinfo.birdname,
        birdCode: updateinfo.birdcode,
        birdColor: updateinfo.birdcolor,
        cageNumber: updateinfo.cagenumber,
        maleParentId: BirdListMSelectedfinal,
        femaleParentId: BirdListFSelectedfinal,
        paringBirdId: paringBirdId,
        birdTreatmentRecord: updateinfo.birdtrecord,
        birdSpeciesId: SpeciesSelectfinal,
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
    affiliation,
    BirdListFSelectedfinal,
    BirdListMSelectedfinal,
    SpeciesSelectfinal,
    paringBirdId
  ) {
    return apiClient
      .post('/updateBirdDetail/' + id + '?affiliation=' + affiliation, {
        birdName: updateinfo.birdname,
        birdCode: updateinfo.birdcode,
        birdColor: updateinfo.birdcolor,
        cageNumber: updateinfo.cagenumber,
        maleParentId: BirdListMSelectedfinal,
        femaleParentId: BirdListFSelectedfinal,
        paringBirdId: paringBirdId,
        birdTreatmentRecord: updateinfo.birdtrecord,
        birdSpeciesId: SpeciesSelectfinal,
        dateOfBirth: birthdate,
        sexOfBird: birdsex,
        birdStatus: birdstatus,
        birdImage: imageUrls
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  getBirdPedigree(id) {
    console.log('bird pedigree = ' + id)
    return apiClient.get('/viewBirdBreedingPedigree/' + id)
  },
  getBirdFemale(id) {
    return apiClient.get('/getMaleOrFemaleBirdList/' + id + '?&sex=F')
  },
  getBirdMale(id) {
    return apiClient.get('/getMaleOrFemaleBirdList/' + id + '?&sex=M')
  },
  getBirdFemaleAdmin(id, affiliation) {
    return apiClient.get(
      '/getMaleOrFemaleBirdList/' + id + '?&sex=F&affiliation=' + affiliation
    )
  },
  getBirdMaleAdmin(id, affiliation) {
    return apiClient.get(
      '/getMaleOrFemaleBirdList/' + id + '?&sex=M&affiliation=' + affiliation
    )
  }
}
