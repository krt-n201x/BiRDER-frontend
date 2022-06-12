import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/services/AxiosInterceptorSetup.js'
import VueSimpleAlert from 'vue-simple-alert'

library.add(fas)

createApp(App)
  .use(store)
  .use(router)
  .use(VueSimpleAlert)
  .use(Toast, {
    closeOnClick: false,
    timeout: 5000,
    pauseOnHover: false,
    hideProgressBar: true
  })
  .component('fa', FontAwesomeIcon)
  .mount('#app')
