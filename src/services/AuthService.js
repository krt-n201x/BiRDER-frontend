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
          Store.currentUser = response.data.user
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
    Store.currentUser = null
    Store.currentLowUser = null
  },
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }
}
