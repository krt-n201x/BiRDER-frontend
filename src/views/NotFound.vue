<template>
  <AppLayout>
    <div></div>
  </AppLayout>
</template>
<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import store from '@/store/index.js'

export default {
  name: 'NetworkError',
  components: {
    AppLayout
  },
  data() {
    return {
      ROUTE_PATH,
      thiscurrentUser: store.getters.currentUser,
      error: true
    }
  },
  created() {
    this.$swal({
      icon: 'error',
      title: 'Page Not Found!',
      confirmButtonText: 'Ok, I Got it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
      }
    })
  }
}
</script>
