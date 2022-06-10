import apiClient from '@/services/AxiosClient.js'

export default {
  getAllEmp() {
    return apiClient.get('/viewFarmEmployeeList')
  },
  getEmpInFarm(affiliation) {
    return apiClient.get('/viewFarmEmployeeList?affiliation=' + affiliation)
  },
  getAllFarm() {
    return apiClient.get('/viewFarmList')
  },
  getProfile(id) {
    return apiClient.get('/viewProfileDetail/' + id)
  }
}
