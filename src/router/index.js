import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage/LoginPage.vue'
import RegisterPage from '../views/RegisterPage/RegisterPage.vue'
import EmployeeManagement from '../views/Menu/EmployeeManagement/EmployeeManagement.vue'
import EmployeeRegisterPage from '../views/Menu/EmployeeManagement/EmployeeRegisterPage.vue'
import NetWorkError from '../views/NetworkError.vue'
import NotFound from '../views/NotFound.vue'
import NotAuth from '@/views/NotAuth.vue'
import SelectManage from '../views/Menu/FarmManagement/SelectManage.vue'
import BirdDetail from '../views/Menu/BirdManagement/BirdDetail.vue'
import AccountSetting from '../views/Menu/AccountSetting/AccountSetting.vue'
import FarmManagement from '../views/Menu/FarmManagement/FarmManagement.vue'
import BirdRegisterPage from '../views/Menu/BirdManagement/BirdRegisterPage.vue'
import BirdManagement from '../views/Menu/BirdManagement/BirdManagement.vue'
import store from '@/store/index.js'
import DatabaseService from '@/services/DatabaseService.js'
import BirdService from '@/services/BirdService.js'
import BirdBreedingService from '@/services/Breeding/BreedingService.js'
import ComponentTest from '@/views/ComponentTest.vue'
import BirdActivityList from '@/views/Menu/BirdActivity/BirdActivityList.vue'
import BirdActivityCreate from '@/views/Menu/BirdActivity/BirdActivityCreate.vue'
import BirdBreeding from '@/views/Menu/Breeding/BirdBreedingList.vue'
import BirdBreedingDetails from '@/views/Menu/Breeding/BirdBreedingDetails.vue'
import BirdBreedingCreate from '@/views/Menu/Breeding/BirdBreedingCreate.vue'
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
    component: EmployeeManagement,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
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
    path: ROUTE_PATH.ACCOUNT_SETTING,
    name: 'AccountSetting',
    component: AccountSetting,
    beforeEnter: (to) => {
      return DatabaseService.getProfile(to.params.id)
        .then((response) => {
          store.dispatch('updateInformation', response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource'
            }
          } else if (error.response && error.response.status == 401) {
            return {
              name: '401Resource'
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    }
  },
  {
    path: ROUTE_PATH.BIRD_INFORMATION,
    name: 'BirdDetail',
    component: BirdDetail,
    beforeEnter: (to) => {
      return BirdService.getBirdDetail(to.params.id)
        .then((response) => {
          store.dispatch('updatebirdinformation', response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource'
            }
          } else if (error.response && error.response.status == 401) {
            return {
              name: '401Resource'
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    }
  },
  {
    path: ROUTE_PATH.BIRD_REGISTER,
    name: 'BirdRegisterPage',
    component: BirdRegisterPage
  },
  {
    path: ROUTE_PATH.BIRD_MANAGEMENT,
    name: 'BirdManagement',
    component: BirdManagement,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: ROUTE_PATH.SELECT_MANAGE,
    name: 'SelectManage',
    component: SelectManage
  },
  {
    path: ROUTE_PATH.FARM_MANAGEMENT,
    name: 'FarmManagement',
    component: FarmManagement
  },
  {
    path: ROUTE_PATH.BIRD_ACTIVITYLIST,
    name: 'BirdActivityList',
    component: BirdActivityList
  },
  {
    path: ROUTE_PATH.BIRD_CREATEACTIVIT,
    name: 'BirdActivityCreate',
    component: BirdActivityCreate
  },
  {
    path: ROUTE_PATH.BIRD_BREEDING,
    name: 'BirdBreeding',
    component: BirdBreeding
  },
  {
    path: ROUTE_PATH.BIRD_BREEDINGCREATE,
    name: 'BirdBreedingCreate',
    component: BirdBreedingCreate
  },
  {
    path: ROUTE_PATH.BIRD_BREEDINGDETAILS,
    name: 'BirdBreedingDetails',
    component: BirdBreedingDetails,
    beforeEnter: (to) => {
      return BirdBreedingService.getBirdBreedingDetail(to.params.id)
        .then((response) => {
          store.dispatch('updateBirdBreedingDetails', response.data)
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource'
            }
          } else if (error.response && error.response.status == 401) {
            return {
              name: '401Resource'
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    }
  },
  {
    path: '/401',
    name: '401Resource',
    component: NotAuth,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: ROUTE_PATH.NETWORK_ERROR,
    name: 'NetworkError',
    component: NetWorkError
  },
  {
    path: ROUTE_PATH.COMPONENT_TEST,
    name: 'ComponentTest',
    component: ComponentTest
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
