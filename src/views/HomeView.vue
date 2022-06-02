<template>
  <AppLayout>
    <div
      class="h-full grid place-content-center grid-flow-row lg:grid-flow-col m-6 gap-x-20 gap-y-8"
    >
      <div>
        <img
          src="../assets/logoBiRDER.png"
          class="max-h-[106px] lg:max-h-[331px]"
        />
      </div>
      <div class="border-r-2 border-black my-10" id="desktop"></div>
      <div class="grid justify-items-center content-center">
        <p class="text-2xl lg:text-4xl leading-[17px] pb-4 lg:pb-6">
          BiRDER welcome!
        </p>
        <p class="text-base lg:text-2xl leading-[17px] pb-4 lg:pb-6">
          Please login to the system
        </p>
        <router-link :to="ROUTE_PATH.LOGIN_PAGE">
          <BaseButton class="w-[200px]">LOGIN</BaseButton>
        </router-link>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import ROUTE_PATH from '@/constants/router.js'

export default {
  name: 'HomeView',
  components: {
    AppLayout,
    BaseButton
  },
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 1026px) {
  #desktop {
    display: none;
  }
}
</style>
