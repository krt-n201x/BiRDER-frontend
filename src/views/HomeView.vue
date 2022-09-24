<template>
  <AppLayout>
    <div
      class="h-full grid place-content-center grid-flow-row lg:grid-flow-col m-6 gap-x-20 gap-y-8"
    >
      <div v-if="!thiscurrentUser">
        <img
          src="../assets/logoBiRDER.png"
          class="max-h-[106px] lg:max-h-[331px]"
        />
      </div>
      <div
        v-if="!thiscurrentUser"
        class="border-r-2 border-black my-10"
        id="desktop"
      ></div>
      <div
        v-if="!thiscurrentUser"
        class="grid justify-items-center content-center"
      >
        <p class="text-2xl lg:text-4xl leading-[17px] pb-4 lg:pb-6">
          BiRDER welcome!
        </p>
        <p
          v-if="!thiscurrentUser"
          class="text-base lg:text-2xl leading-[17px] pb-4 lg:pb-6"
        >
          Please login to the system
        </p>
        <router-link :to="ROUTE_PATH.LOGIN_PAGE">
          <BaseButton v-if="!thiscurrentUser" class="w-[200px]"
            >LOGIN</BaseButton
          >
        </router-link>
        <p
          v-if="!thiscurrentUser"
          class="text-base lg:text-2xl leading-[17px] py-4 lg:pb-6"
        >
          Or register
        </p>
        <router-link :to="ROUTE_PATH.REGISTER_PAGE">
          <SecondaryButton v-if="!thiscurrentUser" class="w-[200px]"
            >REGISTER</SecondaryButton
          >
        </router-link>
      </div>
    </div>
    <div
      class="h-full grid place-content-center grid-flow-row grid-rows-2 lg:grid-flow-col m-6 gap-x-20 gap-y-8"
    >
      <FormWrapper v-if="thiscurrentUser" label="Sex of Birds">
        <apexchart
          width="500"
          type="bar"
          :options="chartOptions"
          :series="series"
        >
        </apexchart>
      </FormWrapper>
      <FormWrapper
        class="col-span-2 w-[265px] lg:w-auto"
        v-if="thiscurrentUser"
        label="Sex of Birds"
      >
        <apexchart
          width="500"
          type="bar"
          :options="chartOptions"
          :series="series"
        >
        </apexchart>
      </FormWrapper>
      <FormWrapper v-if="thiscurrentUser" label="Sex of Birds">
        <apexchart
          width="500"
          type="bar"
          :options="chartOptions"
          :series="series"
        >
        </apexchart>
      </FormWrapper>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import ROUTE_PATH from '@/constants/router.js'
import store from '@/store/index.js'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import FormWrapper from '@/components/form/FormWrapper.vue'
import BirdService from '@/services/BirdService'
var M = store.getters.birdsM
var F = store.getters.birdsF
var U = store.getters.birdsU
export default {
  name: 'HomeView',
  components: {
    AppLayout,
    BaseButton,
    SecondaryButton,
    FormWrapper
  },
  created() {
    BirdService.getAllBirdWithoutPagination()
      .then((response) => {
        console.log(response.data)
        this.Birds = response.data
        M = 0
        F = 0
        U = 0
        for (const data of this.Birds) {
          if (data.sexOfBird == 'M') {
            M = M + 1
          }
          if (data.sexOfBird == 'F') {
            F = F + 1
          }
          if (data.sexOfBird == 'U') {
            U = U + 1
          }
        }
        store.dispatch('updatebirdsM', M)
        store.dispatch('updatebirdsF', F)
        store.dispatch('updatebirdsU', U)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    return {
      ROUTE_PATH,
      Birds: [],
      sex: {
        M: 0
      },
      thiscurrentUser: store.getters.currentUser,
      chartOptions: {
        chart: {
          id: 'Sex of birds'
        },
        xaxis: {
          categories: ['Male', 'Female', 'Unknown']
        }
      },
      series: [
        {
          name: 'Birds',
          data: [M, F, U]
        }
      ]
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 1026px) {
  #desktop {
    display: none;
  }
}
</style>
