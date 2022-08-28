<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
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
        <FormWrapper label="Bird Planning"
          ><Form @submit="updatebird" :validation-schema="schema"
            ><div class="mt-[22px] lg:mt-[0px]">
              <div class="mt-6">
                <div class="grid grid-cols-2 gap-4 mr-[68px] px-4">
                  <p class="text-[10px] text-neutral-600">Date</p>
                  <p class="text-[10px] text-neutral-600">Title</p>
                </div>
              </div>
              <div v-if="!notfound">Not found any Activity</div>
              <div>
                <!-- // -->
                <div
                  class="w-full"
                  v-for="data in this.planning"
                  :key="data.id"
                  :data="data"
                >
                  <ActivityCard :data="data" />
                </div>
                <!-- // -->
              </div>
              <div
                class="w-full pt-4 grid grid-cols-2 gap-4"
                v-if="notfound && usesearch"
              >
                <div>
                  <router-link
                    :to="{
                      name: 'BirdActivityList',
                      query: { page: page - 1 }
                    }"
                    rel="prev"
                  >
                    <BaseButton v-if="page != 1"> Back </BaseButton>
                  </router-link>
                </div>
                <div class="gird justify-item-end">
                  <router-link
                    :to="{
                      name: 'BirdActivityList',
                      query: { page: page + 1 }
                    }"
                    rel="next"
                  >
                    <BaseButton v-if="hasNextPage">
                      Next
                    </BaseButton></router-link
                  >
                </div>
              </div>
              <div
                v-if="isOwner || isAdmin"
                class="grid grid-cols-1 gap-2 mt-4 lg:mt-4"
              >
                <BaseButton @click="addActivity">add</BaseButton>
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
import { Form } from 'vee-validate'
import ActivityCard from '@/components/activitycard/ActivityCard.vue'
import AuthService from '@/services/AuthService.js'
import { watchEffect } from '@vue/runtime-core'
import BirdService from '@/services/BirdService.js'
import PlanningService from '@/services/Planning/PlanningService.js'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import TextField from '@/components/textfield/BaseField.vue'
import PlanningSearchService from '@/services/Planning/PlanningSearchService.js'

export default {
  name: 'BirdActivityList',
  components: {
    AppLayout,
    FormWrapper,
    BaseButton,
    Form,
    ActivityCard,
    TextField,
    BaseSelect
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      notfound: true,
      usesearch: true,
      ROUTE_PATH,
      thiscurrentUser: store.getters.currentUser,
      farmownerid: store.getters.farminspect,
      totalEvents: 0,
      error: true,
      edit: false,
      today: false,
      planning: [],
      items: [{ message: 'Plan Status' }, { message: 'Label Tag' }]
    }
  },
  created() {
    if (AuthService.hasRoles('ROLE_ADMIN')) {
      console.log('this is admin')
      watchEffect(() => {
        BirdService.getAllBirdsAdmin(this.farmownerid, 6, this.page)
          .then((response) => {
            this.planning = response.data
            this.totalEvents = response.headers['x-total-count']
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      console.log('this is owner')
      watchEffect(() => {
        PlanningService.getPlanOwner(6, this.page)
          .then((response) => {
            this.planning = response.data
            this.totalEvents = response.headers['x-total-count']
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  },
  methods: {
    search(searchinfo) {
      if (AuthService.hasRoles('ROLE_ADMIN')) {
        if (this.searchfiller == 'Plan Status') {
          PlanningSearchService.searchPlanStatusAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.planning = response.data
              if (response.data.length == 0) {
                this.notfound = false
                this.usesearch = true
              } else if (searchinfo.searchinformation == '') {
                this.notfound = true
                this.usesearch = true
              } else {
                this.notfound = true
                this.usesearch = false
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Label Tag') {
          PlanningSearchService.searchPlanTagAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.planning = response.data
              if (response.data.length == 0) {
                this.notfound = false
                this.usesearch = true
              } else if (searchinfo.searchinformation == '') {
                this.notfound = true
                this.usesearch = true
              } else {
                this.notfound = true
                this.usesearch = false
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      } else {
        if (this.searchfiller == 'Plan Status') {
          PlanningSearchService.searchPlanStatus(searchinfo.searchinformation)
            .then((response) => {
              console.log(response.data)
              this.planning = response.data
              if (response.data.length == 0) {
                this.notfound = false
                this.usesearch = true
              } else if (searchinfo.searchinformation == '') {
                this.notfound = true
                this.usesearch = true
              } else {
                this.notfound = true
                this.usesearch = false
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
        if (this.searchfiller == 'Label Tag') {
          PlanningSearchService.searchPlanTag(searchinfo.searchinformation)
            .then((response) => {
              console.log(response.data)
              this.planning = response.data
              if (response.data.length == 0) {
                this.notfound = false
                this.usesearch = true
              } else if (searchinfo.searchinformation == '') {
                this.notfound = true
                this.usesearch = true
              } else {
                this.notfound = true
                this.usesearch = false
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },
    addActivity() {
      this.$router.push(`${ROUTE_PATH.BIRD_CREATEACTIVIT}`)
    }
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 6)
      return this.page < totalPages
    },
    isOwner() {
      return AuthService.hasRoles('ROLE_OWNER')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  }
}
</script>
<style scoped>
.iconcolor {
  color: black;
}
</style>
