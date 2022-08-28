<template>
  <fa
    v-if="this.data.planStatus == 'In progress'"
    icon="circle-check"
    class="self-center iconcolor h-4 pr-4"
    @click="donethisact"
  />
  <fa
    v-if="this.data.planStatus == 'Done'"
    icon="circle-check"
    class="self-center iconcolordone h-4 pr-4 cursor-pointer"
    @click="undonethisact"
  />
</template>

<script>
import { useToast } from 'vue-toastification'
import PlanningService from '@/services/Planning/PlanningService.js'
import ROUTE_PATH from '@/constants/router.js'

const toast = useToast()
export default {
  name: 'IconGenerator',
  components: {},
  props: {
    data: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      progress: 'Done',
      info: []
    }
  },
  methods: {
    donethisact() {
      this.$swal({
        title: 'Done this activity!',
        text: 'Are you sure to done this activity?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, done it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.info = this.data
          this.info.planStatus = this.progress
          PlanningService.updatePaln(this.info)
            .then(() => {
              toast.success('Update Success!')
              this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
            })
            .catch((error) => {
              toast.error('Update Falis!')
              console.log(error)
            })
        }
      })
    },
    undonethisact() {
      this.$swal({
        title: 'Undone this activity!',
        text: 'Are you sure to Undone this activity?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, do it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.info = this.data
          this.info.planStatus = 'In progress'
          PlanningService.updatePaln(this.info)
            .then(() => {
              toast.success('Update Success!')
              this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
            })
            .catch((error) => {
              toast.error('Update Falis!')
              console.log(error)
            })
        }
      })
    }
  }
}
</script>
<style scoped>
.iconcolor {
  cursor: pointer;
  color: white;
  stroke-width: 30;
  stroke: black;
  transition: 0.3s;
}
.iconcolor:hover {
  stroke: #45b400;
  stroke-width: 0;
  color: #45b400;
}
.iconcolordone {
  color: #3fa700;
}
</style>
