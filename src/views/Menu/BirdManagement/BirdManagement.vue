<template>
  <AppLayout>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
      >
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Bird List
        </p>
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
                  placeholder="Select Your Fillter"
                />
                <BaseButton type="submit" @click="searchby">Search</BaseButton>
              </div>
            </div>
          </Form>
        </div>
        <div v-if="notfound">Not found any birds</div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div
            class="w-full"
            v-for="data in Otherstatus"
            :key="data.id"
            :data="data"
          >
            <BirdCard :data="data" v-if="data.birdStatus" />
          </div>
          <BirdRegister v-if="!isAdmin" />
        </div>
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Unavailable Bird
        </p>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div
            class="w-full"
            v-for="data in Unavailable"
            :key="data.id"
            :data="data"
          >
            <BirdCard :data="data" v-if="data.birdStatus" />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import BirdRegister from '@/components/birdcard/BirdRegister.vue'
import BirdCard from '@/components/birdcard/BirdCard.vue'
import DatabaseService from '@/services/DatabaseService.js'
import BirdService from '@/services/BirdService.js'
import BirdSearchService from '@/services/BirdSearchService.js'
import AuthService from '@/services/AuthService.js'
import TextField from '@/components/textfield/BaseField.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import store from '@/store'

export default {
  name: 'BirdManagement',
  components: {
    AppLayout,
    BirdRegister,
    BirdCard,
    TextField,
    BaseButton,
    BaseSelect,
    Form
  },
  data() {
    const schema = yup.object().shape({
      searchinformation: yup.string()
    })
    return {
      ROUTE_PATH,
      bird: [],
      farmownerid: store.getters.farminspect,
      farmowner: null,
      schema,
      notfound: false,
      searchfiller: '',
      items: [
        { message: 'Bird Name' },
        { message: 'Bird Code' },
        { message: 'Bird Species' },
        { message: 'Bird Status' }
      ]
    }
  },
  created() {
    if (AuthService.hasRoles('ROLE_ADMIN')) {
      console.log('this is admin')
      BirdService.getAllBirdAdmin(this.farmownerid)
        .then((response) => {
          this.bird = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      console.log('this is owner')
      DatabaseService.getAllBird()
        .then((response) => {
          this.bird = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    isOwner() {
      return AuthService.hasRoles('ROLE_OWNER')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    Unavailable: function () {
      return this.bird.filter(function (item) {
        return item.birdStatus == 'Unavailable'
      })
    },
    Otherstatus: function () {
      return this.bird.filter(function (item) {
        return item.birdStatus != 'Unavailable'
      })
    }
  },
  methods: {
    search(searchinfo) {
      if (AuthService.hasRoles('ROLE_ADMIN')) {
        if (this.searchfiller == 'Bird Name') {
          BirdSearchService.searchBirdNameAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
              this.notfound = false
              if (response.data.length == 0) {
                this.notfound = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Bird Code') {
          BirdSearchService.searchBirdCodeAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
              this.notfound = false
              if (response.data.length == 0) {
                this.notfound = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Bird Species') {
          BirdSearchService.searchBirdSpeciesAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
              this.notfound = false
              if (response.data.length == 0) {
                this.notfound = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Bird Status') {
          BirdSearchService.searchBirdStatusAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
              this.notfound = false
              if (response.data.length == 0) {
                this.notfound = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      } else {
        if (this.searchfiller == 'Bird Name') {
          console.log(this.searchfiller + searchinfo.searchinformation)
          BirdSearchService.searchBirdNameOther(searchinfo.searchinformation)
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
              this.notfound = false
              if (response.data.length == 0) {
                this.notfound = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Bird Code') {
          BirdSearchService.searchBirdCodeOther(searchinfo.searchinformation)
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
              this.notfound = false
              if (response.data.length == 0) {
                this.notfound = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Bird Species') {
          BirdSearchService.searchBirdSpeciesOther(searchinfo.searchinformation)
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
              this.notfound = false
              if (response.data.length == 0) {
                this.notfound = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Bird Status') {
          BirdSearchService.searchBirdStatusOther(searchinfo.searchinformation)
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
              this.notfound = false
              if (response.data.length == 0) {
                this.notfound = true
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    }
  }
}
</script>
