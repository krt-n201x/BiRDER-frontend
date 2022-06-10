<template>
  <router-link
    :to="ROUTE_PATH.EMPLOYEE_REGISTER"
    class="w-full h-[120px] lg:h-[72px] px-7 grid place-content-center grid-cols-1 lg:grid-cols-2 gap-2 rounded-[20px] bg-primary-900"
  >
    <div class="grid grid-cols-3">
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Farm Owner</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.fullName }}
        </p>
      </div>
      <div class="grid grid-cols-1">
        <p
          class="text-white text-[10px] leading-[17px] grid place-content-center lg:place-content-start"
        >
          Total Employee
        </p>

        <p
          class="text-white text-[14px] lg:text-[16px] leading-[17px] grid place-content-center lg:place-content-start"
        >
          {{ totalEmp }}
        </p>
      </div>
      <div class="grid grid-cols-1">
        <p
          class="text-white text-[10px] leading-[17px] grid place-content-center lg:place-content-start"
        >
          Total Bird
        </p>
        <p
          class="text-white text-[14px] lg:text-[16px] leading-[17px] grid place-content-center lg:place-content-start"
        >
          {{ data.username }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div></div>
      <div class="grid grid-cols-2 gap-2">
        <ViewButton>View</ViewButton><DeleteButton>Delete</DeleteButton>
      </div>
    </div>
  </router-link>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
import DeleteButton from '@/components/button/DeleteButton.vue'
import ViewButton from '@/components/button/ViewButton.vue'
import DatabaseService from '@/services/DatabaseService.js'

export default {
  name: 'FarmOwnerCard',
  components: { DeleteButton, ViewButton },
  props: {
    data: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ROUTE_PATH,
      employee: null,
      totalEmp: null
    }
  },
  created() {
    DatabaseService.getEmpInFarm(this.data.affiliation.id)
      .then((response) => {
        this.employee = response.data
        this.totalEmp = this.employee.length
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
