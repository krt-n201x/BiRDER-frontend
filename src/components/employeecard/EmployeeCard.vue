<template>
  <router-link
    :to="ROUTE_PATH.EMPLOYEE_REGISTER"
    class="w-full h-[120px] lg:h-[72px] px-7 grid place-content-center grid-cols-1 lg:grid-cols-2 gap-2 rounded-[20px] bg-primary-900"
  >
    <div class="grid grid-cols-3">
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Name</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.fullName }}
        </p>
      </div>
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">User Name</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.username }}
        </p>
      </div>
      <div class="grid place-content-end">
        <div class="grid grid-cols-1">
          <p class="text-white text-[10px] leading-[17px]">Role</p>
          <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
            Role
          </p>
        </div>
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
export default {
  name: 'EmployeeCard',
  components: { DeleteButton, ViewButton },
  props: {
    data: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ROUTE_PATH
    }
  }
}
</script>
