<template>
  <fa
    v-if="progress == 'inprogress'"
    icon="circle-check"
    class="self-center iconcolor h-4 pr-4"
    @click="donethisact"
  />
  <fa
    v-if="progress == 'done'"
    icon="circle-check"
    class="self-center iconcolordone h-4 pr-4"
  />
</template>

<script>
// import { useToast } from 'vue-toastification'

// const toast = useToast()
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
      progress: 'done'
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
      }).then(() => {
        // if (result.isConfirmed) {
        //   DatabaseService.deleteBird(this.data.id)
        //     .then(() => {
        //       toast.success('Deleted Success!')
        //       this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
        //     })
        //     .catch((error) => {
        //       toast.error('Deleted Falis!')
        //       console.log(error)
        //     })
        // }
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
  color: #45b400;
}
.iconcolordone {
  color: #3fa700;
}
</style>
