<template>
  <AppLayout>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
      >
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Select Management Menu
        </p>
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4"
        >
          <MenuCard
            icon="people-group"
            label="Employee Management"
            @click="Empmanage"
          />
          <MenuCard icon="dove" label="Bird Management" @click="Birdmanage" />
          <MenuCard icon="clipboard" label="Bird Planning" @click="Activity" />
          <MenuCard icon="crow" label="Bird Breeding" @click="Breeding" />
          <MenuCard
            icon="feather-pointed"
            label="Bird Species"
            @click="Species"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import MenuCard from '@/components/menucard/MenuCard.vue'

export default {
  name: 'FarmManagement',
  components: {
    AppLayout,
    MenuCard
  },
  data() {
    return {
      ROUTE_PATH
    }
  },
  created() {},
  methods: {
    Empmanage() {
      this.$router.push(`${ROUTE_PATH.EMPLOYEE_MANAGEMENT}`)
    },
    Birdmanage() {
      this.$router.push(`${ROUTE_PATH.BIRD_MANAGEMENT}`)
    },
    Activity() {
      this.$router.push(`${ROUTE_PATH.BIRD_ACTIVITYLIST}`)
    },
    Breeding() {
      this.$router.push(`${ROUTE_PATH.BIRD_BREEDING}`)
    },
    Species() {
      this.$router.push(`${ROUTE_PATH.BIRD_SPECIES_LIST}`)
    }
  }
}
</script>
