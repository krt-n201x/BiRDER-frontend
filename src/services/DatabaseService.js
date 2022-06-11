import apiClient from '@/services/AxiosClient.js'

export default {
  getAllEmp() {
    return apiClient.get('/viewFarmEmployeeList')
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
    return apiClient.delete('/deleteAccount/' + id)
  }
}
