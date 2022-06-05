<template>
  <AppLayout>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
      >
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Employee List
        </p>
        <EmployeeRegister />
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
// import BaseButton from '@/components/button/BaseButton.vue'
import ROUTE_PATH from '@/constants/router.js'
import EmployeeRegister from '@/components/employeecard/EmployeeRegister.vue'

export default {
  name: 'HomeView',
  components: {
    AppLayout,
    EmployeeRegister
    // BaseButton
  },
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>
