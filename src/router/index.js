import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage/LoginPage.vue'
import RegisterPage from '../views/RegisterPage/RegisterPage.vue'
import EmployeeManagement from '../views/Menu/EmployeeManagement/EmployeeManagement.vue'
import EmployeeRegisterPage from '../views/Menu/EmployeeManagement/EmployeeRegisterPage.vue'
import NetWorkError from '../views/NetworkError.vue'

import ROUTE_PATH from '../constants/router'

const routes = [
  {
    path: ROUTE_PATH.HOMEVIEW,
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: ROUTE_PATH.LOGIN_PAGE,
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: ROUTE_PATH.EMPLOYEE_MANAGEMENT,
    name: 'EmployeeManagement',
    component: EmployeeManagement
  },
  {
    path: ROUTE_PATH.EMPLOYEE_REGISTER,
    name: 'EmployeeRegisterPage',
    component: EmployeeRegisterPage
  },
  {
    path: ROUTE_PATH.REGISTER_PAGE,
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: ROUTE_PATH.NETWORK_ERROR,
    name: 'NetworkError',
    component: NetWorkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
