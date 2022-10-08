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
      v-if="isAdmin"
      class="h-full grid place-content-center grid-flow-row grid-rows-2 lg:grid-flow-col m-6 gap-x-20 gap-y-8"
    >
      <img
        src="../assets/logoBiRDER.png"
        class="max-h-[106px] lg:max-h-[331px]"
      />
    </div>
    <div
      v-if="isOwner || isEmpl"
      class="h-full grid place-content-center grid-flow-row grid-rows-2 lg:grid-flow-col m-6 gap-x-20 gap-y-8"
    >
      <FormWrapper label="Sex of Birds">
        <apexchart
          type="donut"
          width="100%"
          height="350"
          :options="chartOptions"
          :series="series"
        >
        </apexchart>
      </FormWrapper>
      <FormWrapper
        class="col-span-2 w-[265px] lg:w-auto"
        label="Status of Birds"
      >
        <apexchart
          type="bar"
          width="100%"
          height="350"
          :options="chartOptions3"
          :series="series3"
        >
        </apexchart>
      </FormWrapper>
      <FormWrapper label="Species of Birds">
        <apexchart
          type="bar"
          width="100%"
          height="350"
          :options="chartOptions2"
          :series="series2"
        ></apexchart>
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
import SpeciesService from '@/services/Species/SpeciesService'
import AuthService from '@/services/AuthService'
var M = store.getters.birdsM
var F = store.getters.birdsF
var U = store.getters.birdsU
var SpeciesName = store.getters.SpeciesName
var sM = store.getters.birdssM
var sF = store.getters.birdssF
var sU = store.getters.birdssU
var statuslist = [
  'Sold',
  'For sale',
  'Available',
  'Unavailable',
  'Paired',
  'Deceased',
  'Exchanged',
  'Lost',
  'Donated'
]
var tM = store.getters.birdstM
var tF = store.getters.birdstF
var tU = store.getters.birdstU
export default {
  name: 'HomeView',
  components: {
    AppLayout,
    BaseButton,
    SecondaryButton,
    FormWrapper
  },
  created() {
    if (
      AuthService.hasRoles('ROLE_OWNER') ||
      AuthService.hasRoles('ROLE_EMPLOYEE')
    ) {
      BirdService.getAllBirdWithoutPagination()
        .then((response) => {
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
      SpeciesService.getSpeciesAll()
        .then((response) => {
          this.SpeciesAll = response.data
          SpeciesName = []
          for (const data of this.SpeciesAll) {
            SpeciesName.push(data.speciesName)
          }
          store.dispatch('updateSpeciesName', SpeciesName)
          BirdService.getAllBirdWithoutPagination()
            .then((response) => {
              sM = []
              sF = []
              sU = []
              var temp = 0
              for (const data of this.SpeciesAll) {
                sM.push(0)
                sF.push(0)
                sU.push(0)
                for (const data2 of response.data) {
                  if (data2.birdSpeciesId.id == data.id) {
                    if (data2.sexOfBird == 'M') {
                      sM[temp] = sM[temp] + 1
                    }
                    if (data2.sexOfBird == 'F') {
                      sF[temp] = sF[temp] + 1
                    }
                    if (data2.sexOfBird == 'U') {
                      sU[temp] = sU[temp] + 1
                    }
                  }
                }
                temp = temp + 1
              }
              tM = []
              tF = []
              tU = []
              var temp2 = 0
              for (const data4 of statuslist) {
                tM.push(0)
                tF.push(0)
                tU.push(0)
                for (const data3 of response.data) {
                  if (data3.birdStatus == data4) {
                    if (data3.sexOfBird == 'M') {
                      tM[temp2] = tM[temp2] + 1
                    }
                    if (data3.sexOfBird == 'F') {
                      tF[temp2] = tF[temp2] + 1
                    }
                    if (data3.sexOfBird == 'U') {
                      tU[temp2] = tU[temp2] + 1
                    }
                  }
                }
                temp2 = temp2 + 1
              }
              store.dispatch('updatebirdstM', tM)
              store.dispatch('updatebirdstF', tF)
              store.dispatch('updatebirdstU', tU)
              store.dispatch('updatebirdssM', sM)
              store.dispatch('updatebirdssF', sF)
              store.dispatch('updatebirdssU', sU)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  data() {
    return {
      series3: [
        {
          name: 'Male',
          data: tM
        },
        {
          name: 'Female',
          data: tF
        },
        {
          name: 'Unknow',
          data: tU
        }
      ],
      chartOptions3: {
        chart: {
          id: 'Status of birds',
          type: 'bar',
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: false
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          categories: statuslist
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      series2: [
        {
          name: 'Male',
          data: sM
        },
        {
          name: 'Female',
          data: sF
        },
        {
          name: 'Unknow',
          data: sU
        }
      ],
      chartOptions2: {
        chart: {
          id: 'Species of birds',
          type: 'bar',
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: false
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          categories: SpeciesName
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        }
      },
      ROUTE_PATH,
      Birds: [],
      SpeciesAll: [],
      sex: {
        M: 0
      },
      thiscurrentUser: store.getters.currentUser,
      chartOptions: {
        chart: {
          width: 380,
          type: 'donut',
          id: 'Sex of birds'
        },
        fill: {
          type: 'gradient'
        },
        dataLabels: {
          enabled: true
        },
        labels: ['Male', 'Female', 'Unknown'],
        xaxis: {
          categories: ['Male', 'Female', 'Unknown']
        }
      },
      series: [M, F, U]
    }
  },
  computed: {
    isOwner() {
      return AuthService.hasRoles('ROLE_OWNER')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isEmpl() {
      return AuthService.hasRoles('ROLE_EMPLOYEE')
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
