<template>
  <router-link
    :to="ROUTE_PATH.EMPLOYEE_REGISTER"
    class="w-full h-[52px] px-7 grid place-content-center rounded-[20px] bg-primary-200"
  >
    <fa icon="circle-plus" class="iconcolor h-5 pr-4" />
  </router-link>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
export default {
  name: 'EmployeeRegister',
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>
<style scoped>
.iconcolor {
  color: #16537b;
}
</style>
