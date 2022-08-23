<template>
  <AppLayout>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-center"
      >
        <div class="w-full mb-4">
          <Form @submit="search" :validation-schema="schema">
            <div
              class="grid grid-cols-1 lg:grid-cols-2 mb-4 bg-white p-4 rounded-lg"
            >
              <div
                class="flex justify-center items-end gap-4 mb-4 lg:mb-0 lg:mr-4"
              >
                <TextField
                  class="w-full mt-0 lg:mb-0"
                  label="Search"
                  name="searchinformation"
                  type="text"
                />
              </div>
              <div class="grid lg:grid-cols-2 gap-4 items-end">
                <BaseSelect
                  :options="this.items"
                  v-model="this.searchfiller"
                  label="Select fillter"
                  placeholder="Select Your Filter"
                />
                <BaseButton type="submit" @click="searchby">Search</BaseButton>
              </div>
            </div>
          </Form>
        </div>
        <FormWrapper label="Bird Breeding"
          ><Form @submit="updatebird" :validation-schema="schema"
            ><div class="mt-[22px] lg:mt-[0px]">
              <div class="mt-6">
                <div class="grid grid-cols-3 gap-4 mr-[165px] px-4">
                  <p class="text-[10px] text-neutral-600">Date</p>
                  <p class="text-[10px] text-neutral-600">Male</p>
                  <p class="text-[10px] text-neutral-600">Female</p>
                </div>
              </div>
              <div>
                <!-- // -->
                <div
                  class="w-full"
                  v-for="data in this.bird"
                  :key="data.id"
                  :data="data"
                >
                  <BreedingCard :data="data" />
                </div>
                <!-- // -->
              </div>
              <div class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]">
                <BaseButton @click="addBirdBreeding" v-if="isOwner || isAdmin"
                  >add</BaseButton
                >
              </div>
            </div>
          </Form>
        </FormWrapper>
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import store from '@/store/index.js'
import FormWrapper from '@/components/form/FormWrapper.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import TextField from '@/components/textfield/BaseField.vue'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import { Form } from 'vee-validate'
import AuthService from '@/services/AuthService.js'
import BreedingCard from '@/components/breeding/BreedingCard.vue'
import BreedingService from '@/services/Breeding/BreedingService.js'
import BreedingSearchService from '@/services/Breeding/BreedingSearchService.js'
import { watchEffect } from '@vue/runtime-core'
import * as yup from 'yup'
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
export default {
  name: 'BirdBreedingList',
  components: {
    AppLayout,
    FormWrapper,
    BaseButton,
    Form,
    BreedingCard,
    TextField,
    BaseSelect
  },
  data() {
    const schema = yup.object().shape({
      searchinformation: yup.string()
    })
    return {
      ROUTE_PATH,
      thiscurrentUser: store.getters.currentUser,
      farmownerid: store.getters.farminspect,
      bird: [],
      items: [
        { message: 'Breeding CageNumber' },
        { message: 'Breeding Status' },
        { message: 'Female Code' },
        { message: 'Male Code' }
      ],
      schema,
      searchfiller: ''
    }
  },
  created() {
    if (AuthService.hasRoles('ROLE_ADMIN')) {
      console.log('this is admin')
      watchEffect(() => {
        BreedingService.viewBreedingListAdmin(this.farmownerid)
          .then((response) => {
            this.bird = response.data
            for (const data of this.bird) {
              console.log(data.breedingDate)
              data.breedingDate = new Date(data.breedingDate)
              data.breedingDate =
                data.breedingDate.getDay() +
                ' ' +
                monthNames[data.breedingDate.getMonth()] +
                ' ' +
                data.breedingDate.getFullYear()
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      console.log('this is owner')
      watchEffect(() => {
        BreedingService.viewBreedingList()
          .then((response) => {
            this.bird = response.data
            for (const data of this.bird) {
              console.log(data.breedingDate)
              const a = data.breedingDate.split('T')
              data.breedingDate = a[0]
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  },
  methods: {
    search(searchinfo) {
      if (AuthService.hasRoles('ROLE_OWNER')) {
        if (this.searchfiller == 'Breeding CageNumber') {
          BreedingSearchService.searchBreedingbreedingCageNumber(searchinfo)
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Breeding Status') {
          BreedingSearchService.searchBreedingbreedingStatus(searchinfo)
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Female Code') {
          BreedingSearchService.searchBreedingfemaleCode(searchinfo)
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Male Code') {
          BreedingSearchService.searchBreedingmaleCode(searchinfo)
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
      } else {
        if (this.searchfiller == 'Breeding CageNumber') {
          BreedingSearchService.searchBreedingbreedingCageNumberAdmin(
            searchinfo,
            this.farmownerid
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Breeding Status') {
          BreedingSearchService.searchBreedingbreedingStatusAdmin(
            searchinfo,
            this.farmownerid
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Female Code') {
          BreedingSearchService.searchBreedingfemaleCodeAdmin(
            searchinfo,
            this.farmownerid
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Male Code') {
          BreedingSearchService.searchBreedingmaleCodeAdmin(
            searchinfo,
            this.farmownerid
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },
    addBirdBreeding() {
      this.$router.push(`${ROUTE_PATH.BIRD_BREEDINGCREATE}`)
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
.iconcolor {
  color: black;
}
</style>
