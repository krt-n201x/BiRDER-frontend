<template>
  <AppLayout>
    <div v-if="isAdmin" class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
      >
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Farm Owner
        </p>
        <div
          class="w-full"
          v-for="data in farmowner"
          :key="data.id"
          :data="data"
        >
          <EmployeeCard
            :data="data"
            class="mb-4"
            v-if="data.affiliation.id == this.farmownerid"
          />
        </div>
      </div>
    </div>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
      >
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Employee List
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
        <div v-if="!notfound">Not found any employee</div>
        <EmployeeRegister class="mb-4" v-if="isOwner" />
        <div
          class="w-full"
          v-for="data in employee"
          :key="data.id"
          :data="data"
        >
          <EmployeeCard :data="data" class="mb-4" />
        </div>
        <div class="w-full grid grid-cols-2 gap-4" v-if="notfound && usesearch">
          <div>
            <router-link
              :to="{ name: 'EmployeeManagement', query: { page: page - 1 } }"
              rel="prev"
            >
              <BaseButton v-if="page != 1"> Back </BaseButton>
            </router-link>
          </div>
          <div class="gird justify-item-end">
            <router-link
              :to="{ name: 'EmployeeManagement', query: { page: page + 1 } }"
              rel="next"
            >
              <BaseButton v-if="hasNextPage"> Next </BaseButton></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import EmployeeRegister from '@/components/employeecard/EmployeeRegister.vue'
import EmployeeCard from '@/components/employeecard/EmployeeCard.vue'
import DatabaseService from '@/services/DatabaseService.js'
import EmployeeSearchService from '@/services/EmployeeSearchService.js'
import AuthService from '@/services/AuthService.js'
import TextField from '@/components/textfield/BaseField.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import store from '@/store'
import { watchEffect } from '@vue/runtime-core'

export default {
  name: 'EmployeeManagement',
  components: {
    AppLayout,
    EmployeeRegister,
    EmployeeCard,
    TextField,
    BaseButton,
    BaseSelect,
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
      employee: null,
      farmownerid: store.getters.farminspect,
      farmowner: null,
      schema,
      notfound: true,
      searchfiller: '',
      items: [{ message: 'Full Name' }, { message: 'Username' }],
      totalEvents: 0,
      usesearch: true
    }
  },
  created() {
    if (AuthService.hasRoles('ROLE_OWNER')) {
      console.log('this is owner')
      watchEffect(() => {
        DatabaseService.getAllEmps(6, this.page)
          .then((response) => {
            this.employee = response.data
            this.totalEvents = response.headers['x-total-count']
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else if (AuthService.hasRoles('ROLE_ADMIN')) {
      console.log('this is admin')
      watchEffect(() => {
        DatabaseService.getEmpInFarms(this.farmownerid, 6, this.page)
          .then((response) => {
            this.employee = response.data
            this.totalEvents = response.headers['x-total-count']
          })
          .catch((error) => {
            console.log(error)
          })
        DatabaseService.getAllFarm()
          .then((response) => {
            this.farmowner = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
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
  },
  methods: {
    search(searchinfo) {
      if (AuthService.hasRoles('ROLE_ADMIN')) {
        if (this.searchfiller == 'Full Name') {
          EmployeeSearchService.searchEmpFullnameAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
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
        if (this.searchfiller == 'Username') {
          EmployeeSearchService.searchEmpUsernameAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
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
      if (AuthService.hasRoles('ROLE_OWNER')) {
        if (this.searchfiller == 'Full Name') {
          EmployeeSearchService.searchEmpFullnameOwner(
            searchinfo.searchinformation
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
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
        if (this.searchfiller == 'Username') {
          EmployeeSearchService.searchEmpUsernameOwner(
            searchinfo.searchinformation
          )
            .then((response) => {
              console.log(response.data)
              this.bird = response.data
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
    }
  }
}
</script>
