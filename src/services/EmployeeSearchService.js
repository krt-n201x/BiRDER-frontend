import apiClient from '@/services/AxiosClient.js'

export default {
  searchEmpFullnameAdmin(fullName, affiliation) {
    return apiClient.get(
      '/searchFarmEmployeeList/?fullName=' +
        fullName +
        '&affiliation=' +
        affiliation
    )
  },
  searchEmpFullnameOwner(fullName) {
    return apiClient.get('/searchFarmEmployeeList/?fullName=' + fullName)
  },
  searchEmpUsernameAdmin(username, affiliation) {
    return apiClient.get(
      '/searchFarmEmployeeList/?username=' +
        username +
        '&affiliation=' +
        affiliation
    )
  },
  searchEmpUsernameOwner(username) {
    return apiClient.get('/searchFarmEmployeeList/?username=' + username)
  }
}
