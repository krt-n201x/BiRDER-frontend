<template>
  <AppLayout>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-center"
      >
        <div class="w-full mb-4">
          <Form @submit="search" :validation-schema="schema">
            <div class="grid grid-cols-1 gap-1 mb-4 bg-white p-4 rounded-lg">
              <div class="grid grid-cols-6 gap-2">
                <div
                  class="w-full h-[50px] rounded-tl-lg bg-primary-500 col-span-5 grid place-items-center"
                >
                  <p class="text-xl font-medium text-white">Bird Name</p>
                </div>
                <div
                  class="w-full h-[50px] rounded-tr-lg bg-primary-500 grid place-items-center"
                >
                  <input
                    type="checkbox"
                    @click="selectAll"
                    v-model="allSelected"
                  />
                </div>
              </div>
              <div
                class="grid grid-cols-6 gap-2"
                v-for="user in this.Birds"
                :key="user.id"
              >
                <div
                  class="w-full h-[50px] bg-primary-50 col-span-5 flex items-stretch pl-4"
                >
                  <p class="text-xl self-center font-medium text-black">
                    {{ user.birdName }}
                  </p>
                </div>
                <div
                  class="w-full h-[50px] bg-primary-50 grid place-items-center"
                >
                  <input type="checkbox" v-model="userIds" :value="user" />
                </div>
              </div>
              <download-csv
                :data="userIds"
                name="Bird.csv"
                class="w-full h-[50px] rounded-b-lg bg-primary-500 grid place-items-center hover:bg-primary-700 hover:cursor-pointer"
              >
                <p class="text-xl font-medium text-white">
                  Export Selected Bird
                </p>
              </download-csv>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import store from '@/store/index.js'
import BirdService from '@/services/BirdService'
import { Form } from 'vee-validate'
import AuthService from '@/services/AuthService.js'
import * as yup from 'yup'
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'ExportBird',
  components: {
    AppLayout,
    Form
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    const schema = yup.object().shape({
      searchinformation: yup.string()
    })
    return {
      ROUTE_PATH,
      thiscurrentUser: store.getters.currentUser,
      affiliation: store.getters.farminspect,
      schema,
      birdtemp: [],
      Birds: [],
      selected: [],
      allSelected: false,
      userIds: []
    }
  },
  created() {
    if (
      AuthService.hasRoles('ROLE_OWNER') ||
      AuthService.hasRoles('ROLE_EMPLOYEE')
    ) {
      watchEffect(() => {
        BirdService.getAllBirdWithoutPagination()
          .then((response) => {
            this.birdtemp = []
            for (const data of response.data) {
              if (data.maleParentId != null) {
                data.maleParentId = data.maleParentId.id
              }
              if (data.femaleParentId != null) {
                data.femaleParentId = data.femaleParentId.id
              }
              if (data.paringBirdId != null) {
                data.paringBirdId = data.paringBirdId.id
              }
              data.affiliation = data.affiliation.id
              data.birdSpeciesId = data.birdSpeciesId.speciesName
              this.birdtemp.push(data)
              console.log(this.birdtemp)
            }
            this.Birds = this.birdtemp
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
    if (AuthService.hasRoles('ROLE_ADMIN')) {
      watchEffect(() => {
        BirdService.getAllBirdWithoutPaginationAdmin(this.affiliation)
          .then((response) => {
            this.birdtemp = []
            for (const data of response.data) {
              if (data.maleParentId != null) {
                data.maleParentId = data.maleParentId.id
              }
              if (data.femaleParentId != null) {
                data.femaleParentId = data.femaleParentId.id
              }
              if (data.paringBirdId != null) {
                data.paringBirdId = data.paringBirdId.id
              }
              data.affiliation = data.affiliation.id
              data.birdSpeciesId = data.birdSpeciesId.speciesName
              this.birdtemp.push(data)
              console.log(this.birdtemp)
            }
            this.Birds = this.birdtemp
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  },
  methods: {
    selectAll: function () {
      this.userIds = []

      if (!this.allSelected) {
        for (const user in this.Birds) {
          this.userIds.push(this.Birds[user])
        }
      }
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
