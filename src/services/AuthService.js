import apiClient from '@/services/AxiosClient.js'
import Store from '@/store'

export default {
  login(user) {
    return apiClient
      .post('/auth', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        if (JSON.stringify(response.data.user) != null) {
          localStorage.setItem('user', JSON.stringify(response.data.user))
          Store.dispatch('updateCurrentUser', response.data.user)
        } else {
          localStorage.setItem('lowuser', user.username)
          Store.currentLowUser = user.username
        }
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('lowuser')
    Store.dispatch('updateCurrentUser', null)
  },
  registeruser(user) {
    return apiClient
      .post('/registers', {
        username: user.username,
        password: user.password,
        email: user.email,
        address: user.address,
        phoneNumber: user.phone,
        fullName: user.fullname
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  registeremployee(user) {
    return apiClient
      .post('/registers_farm_employee', {
        username: user.username,
        password: user.password,
        email: user.email,
        address: user.address,
        phoneNumber: user.phone,
        fullName: user.fullname
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  createBird(
    registerinfo,
    time,
    birdstatus,
    birdsex,
    imageUrls,
    BirdListFSelected,
    BirdListMSelected,
    SpeciesSelect
  ) {
    return apiClient
      .post('/createBirdDetail', {
        birdName: registerinfo.birdname,
        birdCode: registerinfo.birdcode,
        birdColor: registerinfo.birdcolor,
        cageNumber: registerinfo.cagenumber,
        maleParentId: BirdListMSelected,
        femaleParentId: BirdListFSelected,
        paringBirdId: registerinfo.paringcode,
        birdTreatmentRecord: registerinfo.birdtrecord,
        birdSpecies: registerinfo.birdspecies,
        dateOfBirth: time,
        sexOfBird: birdsex,
        birdStatus: birdstatus,
        birdImage: imageUrls,
        birdSpeciesId: SpeciesSelect
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  createBirdAdmin(
    registerinfo,
    time,
    birdstatus,
    birdsex,
    imageUrls,
    affiliation,
    BirdListFSelected,
    BirdListMSelected,
    SpeciesSelect
  ) {
    return apiClient
      .post('/createBirdDetail?affiliation=' + affiliation, {
        birdName: registerinfo.birdname,
        birdCode: registerinfo.birdcode,
        birdColor: registerinfo.birdcolor,
        cageNumber: registerinfo.cagenumber,
        maleParentId: BirdListMSelected,
        femaleParentId: BirdListFSelected,
        paringBirdId: registerinfo.paringcode,
        birdTreatmentRecord: registerinfo.birdtrecord,
        birdSpecies: registerinfo.birdspecies,
        dateOfBirth: time,
        sexOfBird: birdsex,
        birdStatus: birdstatus,
        birdImage: imageUrls,
        birdSpeciesId: SpeciesSelect
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  hasRoles(roles) {
    if (Store.getters.currentUser && roles) {
      let containRoles = Store.getters.currentUser.authorities.filter(
        (authority) => roles.includes(authority)
      )
      if (containRoles.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
