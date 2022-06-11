<template>
  <AppLayout>
    <div v-if="isAdmin" class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
      >
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Farm Owner
        </p>
        <div
          class="w-full"
          v-for="data in farmowner"
          :key="data.id"
          :data="data"
        >
          <EmployeeCard
            :data="data"
            class="mb-4"
            v-if="data.affiliation.id == this.farmownerid"
          />
        </div>
      </div>
    </div>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
      >
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Employee List
        </p>

        <div
          class="w-full"
          v-for="data in employee"
          :key="data.id"
          :data="data"
        >
          <EmployeeCard :data="data" class="mb-4" />
        </div>
        <EmployeeRegister v-if="isOwner" />
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import EmployeeRegister from '@/components/employeecard/EmployeeRegister.vue'
import EmployeeCard from '@/components/employeecard/EmployeeCard.vue'
import DatabaseService from '@/services/DatabaseService.js'
import AuthService from '@/services/AuthService.js'
import store from '@/store'

export default {
  name: 'EmployeeManagement',
  components: {
    AppLayout,
    EmployeeRegister,
    EmployeeCard
  },
  data() {
    return {
      ROUTE_PATH,
      employee: null,
      farmownerid: store.getters.farminspect,
      farmowner: null
    }
  },
  created() {
    if (AuthService.hasRoles('ROLE_OWNER')) {
      console.log('this is owner')
      DatabaseService.getAllEmp()
        .then((response) => {
          this.employee = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (AuthService.hasRoles('ROLE_ADMIN')) {
      console.log('this is admin')
      DatabaseService.getEmpInFarm(this.farmownerid)
        .then((response) => {
          this.employee = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      DatabaseService.getAllFarm()
        .then((response) => {
          this.farmowner = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    isOwner() {
      return AuthService.hasRoles('ROLE_OWNER')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  }
}
</script>
