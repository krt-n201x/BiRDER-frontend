import apiClient from '@/services/AxiosClient.js'

export default {
  getPlanOwner(perPage, page) {
    return apiClient.get(
      '/viewPlannerList/?_limit=' + perPage + '&_page=' + page
    )
  },
  getPlanAdmin(affiliation, perPage, page) {
    return apiClient.get(
      '/viewPlannerList/?affiliation=' +
        affiliation +
        '&_limit=' +
        perPage +
        '&_page=' +
        page
    )
  },
  getPlanDetail(id) {
    return apiClient.get('/viewPlannerDetail/' + id)
  },
  updatePaln(data) {
    return apiClient
      .post('/updatePlannerDetail/' + data.id, {
        affiliation: data.affiliation,
        id: data.id,
        title: data.title,
        description: data.description,
        dateOfPlan: data.dateOfPlan,
        timeOfPlan: data.timeOfPlan,
        planStatus: data.planStatus,
        labelTag: data.labelTag,
        birdId: data.birdId
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  createPlanningOwner(data, info, birdselecteddetail) {
    console.log(data, info, birdselecteddetail)
    return apiClient
      .post('/createPlannerDetail/', {
        title: data.title,
        description: data.description,
        dateOfPlan: info.date,
        timeOfPlan: info.time,
        planStatus: info.selectplanstatus,
        labelTag: info.planTag,
        birdId: birdselecteddetail
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  createPlanningOwnerAdmin(affiliation, data, info, birdselecteddetail) {
    console.log(info.birdselecteddetail)
    return apiClient
      .post('/createPlannerDetail/?affiliation=' + affiliation, {
        title: data.title,
        description: data.description,
        dateOfPlan: info.date,
        timeOfPlan: info.time,
        planStatus: info.selectplanstatus,
        labelTag: info.planTag,
        birdId: birdselecteddetail
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  UpdatePlanningOwner(data, info, birdselecteddetail, id) {
    console.log(data, info, birdselecteddetail)
    return apiClient
      .post('/updatePlannerDetail/' + id, {
        title: data.title,
        description: data.description,
        dateOfPlan: info.date,
        timeOfPlan: info.time,
        planStatus: info.selectplanstatus,
        labelTag: info.planTag,
        birdId: birdselecteddetail
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  deletePlanning(id) {
    return apiClient.post('/deletePlanner/' + id)
  }
}
