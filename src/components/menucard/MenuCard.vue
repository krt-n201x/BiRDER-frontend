<template>
  <div
    class="w-[250px] h-[250px] grid place-content-center justify-items-center grid-cols-1 lg:grid-cols-1 gap-6 rounded-[20px] bg-primary-500"
  >
    <div
      class="bg-primary-50 grid place-content-center justify-items-center w-[230px] h-[230px] rounded-[20px]"
    >
      <div
        class="bg-primary-500 grid place-content-center justify-items-center w-[220px] h-[220px] rounded-[20px]"
      >
        <div class="grid justify-items-center pb-4">
          <fa :icon="icon" class="iconcolor h-[60px]" />
        </div>
        <div class="grid justify-items-center">
          <p class="text-white text-[20px] font-bold break-words text-center">
            {{ label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
import Store from '@/store'

export default {
  name: 'FarmOwnerCard',
  components: {},
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
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
    viewfarm() {
      Store.dispatch('updateFarmInspect', this.data.affiliation.id)
      this.$router.push(`${ROUTE_PATH.SELECT_MANAGE}`)
    }
  }
}
</script>
