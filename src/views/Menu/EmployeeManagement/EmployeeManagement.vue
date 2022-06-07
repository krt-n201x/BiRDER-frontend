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
        <EmployeeCard class="mb-4" />
        <EmployeeRegister />
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import EmployeeRegister from '@/components/employeecard/EmployeeRegister.vue'
import EmployeeCard from '@/components/employeecard/EmployeeCard.vue'

export default {
  name: 'HomeView',
  components: {
    AppLayout,
    EmployeeRegister,
    EmployeeCard
  },
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>
