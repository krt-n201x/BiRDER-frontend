<template>
  <div class="static">
    <div
      class="h-[60px] px-7 flex items-center justify-center bg-primary-500 relative"
    >
      <div>
        <router-link :to="ROUTE_PATH.HOME_VIEW">
          <p class="text-2xl text-white">BiRDER</p>
        </router-link>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'

export default {
  name: 'NavbarMobile',
  components: {},
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>
