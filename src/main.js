import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/services/AxiosInterceptorSetup.js'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueApexCharts from 'vue3-apexcharts'
import JsonCSV from 'vue-json-csv'

library.add(fas, far)

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

createApp(App)
  .use(store)
  .use(router)
  .use(VueSweetalert2, options)
  .use(VueApexCharts)
  .use(Toast, {
    closeOnClick: false,
    timeout: 5000,
    pauseOnHover: false,
    hideProgressBar: true
  })
  .component('fa', FontAwesomeIcon)
  .component('downloadCsv', JsonCSV)
  .mount('#app')
