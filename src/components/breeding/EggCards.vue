<template>
  <div
    class="relative flex gap-4 py-4 px-4 hover:bg-neutral-50 transition duration-300"
  >
    <p class="w-full self-center text-sm font-normal leading-[17px]">
      {{ data.layDate }}
    </p>
    <div class="w-full self-center">
      <p class="w-full text-sm font-normal leading-[17px]">
        {{ data.eggType }}
      </p>
    </div>
    <div class="w-full flex gap-4 items-center">
      <p class="w-full text-sm font-normal leading-[17px]">
        {{ data.eggStatus }}
      </p>
    </div>
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
import DatabaseService from '@/services/DatabaseService.js'
import { useToast } from 'vue-toastification'

const toast = useToast()
export default {
  name: 'EggCards',
  components: {},
  props: {
    data: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      ROUTE_PATH,
      time: ''
    }
  },
  created() {},
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
