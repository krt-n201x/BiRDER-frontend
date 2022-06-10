<template>
  <AppLayout>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
      >
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Farm Owner List
        </p>

        <div
          class="w-full"
          v-for="data in employee"
          :key="data.id"
          :data="data"
        >
          <FarmOwnerCard :data="data" class="mb-4" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import FarmOwnerCard from '@/components/employeecard/FarmOwnerCard.vue'
import DatabaseService from '@/services/DatabaseService.js'

export default {
  name: 'FarmManagement',
  components: {
    AppLayout,
    FarmOwnerCard
  },
  data() {
    return {
      ROUTE_PATH,
      employee: null
    }
  },
  created() {
    DatabaseService.getAllFarm()
      .then((response) => {
        this.employee = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
