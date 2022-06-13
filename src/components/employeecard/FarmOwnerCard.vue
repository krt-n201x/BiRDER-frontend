<template>
  <div
    class="w-full h-[150px] lg:h-[72px] px-7 grid place-content-center grid-cols-1 lg:grid-cols-2 gap-2 rounded-[20px] bg-primary-900"
  >
    <div class="grid grid-cols-4">
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Farm Owner</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.fullName }}
        </p>
      </div>
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Username</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.username }}
        </p>
      </div>
      <div class="grid grid-cols-1">
        <p
          class="text-white text-[10px] leading-[17px] grid place-content-center lg:place-content-start"
        >
          Total <br class="lg:hidden" />
          Employee
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
          Total <br class="lg:hidden" />
          Bird
        </p>
        <p
          class="text-white text-[14px] lg:text-[16px] leading-[17px] grid place-content-center lg:place-content-start"
        >
          {{ data.affiliation.id }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div></div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div></div>
        <ViewButton @click="viewfarm">View</ViewButton>
        <!-- <DeleteButton>Delete</DeleteButton> -->
      </div>
    </div>
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
// import DeleteButton from '@/components/button/DeleteButton.vue'
import ViewButton from '@/components/button/ViewButton.vue'
import DatabaseService from '@/services/DatabaseService.js'
import Store from '@/store'

export default {
  name: 'FarmOwnerCard',
  components: {
    // DeleteButton,
    ViewButton
  },
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
  },
  methods: {
    viewfarm() {
      Store.dispatch('updateFarmInspect', this.data.affiliation.id)
      this.$router.push(`${ROUTE_PATH.EMPLOYEE_MANAGEMENT}`)
    }
  }
}
</script>
