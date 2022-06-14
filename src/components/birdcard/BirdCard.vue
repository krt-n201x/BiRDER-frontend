<template>
  <div
    class="w-[350px] h-[380px] px-7 grid place-content-center grid-cols-1 gap-2 rounded-[20px] bg-primary-900"
  >
    <img class="object-contain h-[200px] w-full" :src="data.birdImage" />
    <div class="grid grid-cols-2 lg:grid-cols-2">
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Cage No.</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.cageNumber }}
        </p>
      </div>
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Bird Code</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.birdCode }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-3 lg:grid-cols-3">
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Bird name</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.birdName }}
        </p>
      </div>
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Bird sex</p>
        <div v-if="data.sexOfBird == 'F'">
          <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
            Female
          </p>
        </div>
        <div v-if="data.sexOfBird == 'M'">
          <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
            Male
          </p>
        </div>
        <div v-if="data.sexOfBird == 'U'">
          <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
            Unknown
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1">
        <p class="text-white text-[10px] leading-[17px]">Bird Status</p>
        <p class="text-white text-[14px] lg:text-[16px] leading-[17px]">
          {{ data.birdStatus }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2" v-if="data.birdStatus != 'Unavailable'">
      <router-link
        :to="{
          name: 'BirdDetail',
          params: { id: data.id }
        }"
        ><ViewButton>View</ViewButton></router-link
      ><DeleteButton @click="DeleteAccount">Delete</DeleteButton>
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
  name: 'BirdCard',
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
        text: 'Are you sure to deleted this Bird?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          DatabaseService.deleteBird(this.data.id)
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
