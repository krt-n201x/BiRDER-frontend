<template>
  <div
    class="relative flex gap-4 py-4 px-4 hover:bg-neutral-50 transition duration-300"
  >
    <p class="w-full self-center text-sm font-normal leading-[17px]">
      {{ data.breedingDate }}
    </p>
    <div class="w-full self-center">
      <p class="w-full text-sm font-normal leading-[17px]">
        {{ data.haveMale.birdName }}
      </p>
    </div>
    <div class="w-full self-center">
      <p class="w-full text-sm font-normal leading-[17px]">
        {{ data.haveFemale.birdName }}
      </p>
    </div>
    <div
      v-if="data.breedingStatus == 'In progress'"
      class="flex gap-4 items-center"
    >
      <ViewButton class="w-[120px]"><p>in progress</p></ViewButton>
      <router-link
        :to="{
          name: 'BirdBreedingDetails',
          params: { id: data.id }
        }"
      >
        <fa icon="pen-to-square" class="self-center iconcolormore h-4" />
      </router-link>
    </div>
    <div v-if="data.breedingStatus == 'Done'" class="flex gap-4 items-center">
      <ViewButton class="w-[120px]"><p>Done</p></ViewButton>
      <router-link
        :to="{
          name: 'BirdBreedingDetails',
          params: { id: data.id }
        }"
      >
        <fa icon="pen-to-square" class="self-center iconcolormore h-4" />
      </router-link>
    </div>
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
import DatabaseService from '@/services/DatabaseService.js'
import ViewButton from '@/components/button/ViewButton.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
export default {
  name: 'BreedingCard',
  components: { ViewButton },
  props: {
    data: {
      type: String,
      required: false
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
        title: 'Deleted Bird!',
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

<style scoped>
.iconcolormore {
  color: black;
  cursor: pointer;
}
</style>
