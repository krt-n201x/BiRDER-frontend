import apiClient from '@/services/AxiosClient.js'

export default {
  getAllBirdAdmin(affiliation) {
    return apiClient.get('/viewBirdList?affiliation=' + affiliation)
  },
  getBirdDetail(id) {
    return apiClient.get('/viewBirdDetail/' + id)
  }
}
