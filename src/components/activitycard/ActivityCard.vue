<template>
  <div
    class="relative flex gap-4 py-4 px-4 hover:bg-neutral-50 transition duration-300"
  >
    <span v-if="today" class="absolute top-0 left-0 flex h-3 w-3">
      <span
        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
      ></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
    </span>
    <p class="w-full self-center text-sm font-normal leading-[17px]">
      {{ data.date }}
    </p>
    <div class="w-full">
      <p class="w-full text-sm font-normal leading-[17px]">{{ data.title }}</p>
      <div class="w-full mt-1 flex flex-wrap gap-1">
        <TagGenerator />
      </div>
    </div>
    <div class="flex">
      <IconGenerator />
      <fa icon="pen-to-square" class="self-center iconcolormore h-4" />
    </div>
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
import DatabaseService from '@/services/DatabaseService.js'
import TagGenerator from '@/components/activitycard/TagGenerator.vue'
import IconGenerator from './IconGenerator'
import { useToast } from 'vue-toastification'

const toast = useToast()
export default {
  name: 'ActivityCard',
  components: { TagGenerator, IconGenerator },
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
