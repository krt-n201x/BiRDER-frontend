<template>
  <div
    class="w-full h-[120px] lg:h-[72px] px-7 grid place-content-center grid-cols-1 lg:grid-cols-2 gap-2 rounded-[20px] bg-primary-900"
  >
    <div class="grid grid-cols-3">
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Full Name</p>
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
      <!-- <div class="grid place-content-end">
        <div class="grid grid-cols-1">
          <p class="text-white text-[10px] leading-[17px]">Role</p>
          <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
            Role
          </p>
        </div>
      </div> -->
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div></div>
      <div class="grid grid-cols-2 gap-2">
        <router-link
          :to="{
            name: 'AccountSetting',
            params: { id: data.id }
          }"
          ><ViewButton>View</ViewButton></router-link
        ><DeleteButton @click="DeleteAccount">Delete</DeleteButton>
      </div>
    </div>
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
import DeleteButton from '@/components/button/DeleteButton.vue'
import ViewButton from '@/components/button/ViewButton.vue'
import DatabaseService from '@/services/DatabaseService.js'
import { useToast } from 'vue-toastification'

const toast = useToast()
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
  },
  methods: {
    DeleteAccount() {
      this.$swal({
        title: 'Deleted User!',
        text: 'Are you sure to deleted this user?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          DatabaseService.deleteUser(this.data.id)
            .then(() => {
              toast.success('Deleted Success!')
              this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
            })
            .catch((error) => {
              toast.error('Deleted Falis!')
              console.log(error)
            })
        }
      })
    }
  }
}
</script>
