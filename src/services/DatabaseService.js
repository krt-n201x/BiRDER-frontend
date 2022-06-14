import apiClient from '@/services/AxiosClient.js'

export default {
  getAllEmp() {
    return apiClient.get('/viewFarmEmployeeList')
  },
  getAllEmps(perPage, page) {
    return apiClient.get(
      '/viewFarmEmployeeList?_limit=' + perPage + '&_page=' + page
    )
  },
  searchFarmUsername(username) {
    return apiClient.get('/searchFarmList/?username=' + username)
  },
  searchFarmFullname(fullName) {
    return apiClient.get('/searchFarmList/?fullName=' + fullName)
  },
  getEmpInFarm(affiliation) {
    return apiClient.get('/viewFarmEmployeeList?affiliation=' + affiliation)
  },
  getEmpInFarms(affiliation, perPage, page) {
    return apiClient.get(
      '/viewFarmEmployeeList?affiliation=' +
        affiliation +
        '&_limit=' +
        perPage +
        '&_page=' +
        page
    )
  },
  getAllFarm() {
    return apiClient.get('/viewFarmList')
  },
  getProfile(id) {
    return apiClient.get('/viewProfileDetail/' + id)
  },
  updateUser(id, userinfo) {
    return apiClient.post(
      '/updateProfileDetail/' + id + '?newPassword&confirmPassword',
      {
        username: userinfo.username,
        password: '',
        email: userinfo.email,
        address: userinfo.address,
        phoneNumber: userinfo.phoneNumber,
        fullName: userinfo.fullName
      }
    )
  },
  updateUserPassword(id, userinfo, passwordinfo) {
    return apiClient.post(
      '/updateProfileDetail/' +
        id +
        '?newPassword=' +
        passwordinfo.newpassword +
        '&confirmPassword=' +
        passwordinfo.confirmnewpassword,
      {
        username: userinfo.username,
        password: passwordinfo.oldpassword,
        email: userinfo.email,
        address: userinfo.address,
        phoneNumber: userinfo.phoneNumber,
        fullName: userinfo.fullName
      }
    )
  },
  deleteUser(id) {
    return apiClient.post('/deleteAccount/' + id)
  },
  deleteBird(id) {
    return apiClient.post('/deleteBird/' + id)
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
