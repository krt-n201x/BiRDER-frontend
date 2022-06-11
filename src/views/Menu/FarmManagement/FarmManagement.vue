<template>
  <AppLayout>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-start"
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
                />
                <BaseButton type="submit" @click="searchby">Search</BaseButton>
              </div>
            </div>
          </Form>
        </div>
        <p
          class="text-xl lg:text-2xl text-primary-900 leading-[17px] pb-4 lg:pb-6"
        >
          Farm Owner List
        </p>

        <div
          class="w-full"
          v-for="data in employee"
          :key="data.id"
          :data="data"
        >
          <FarmOwnerCard :data="data" class="mb-4" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import FarmOwnerCard from '@/components/employeecard/FarmOwnerCard.vue'
import DatabaseService from '@/services/DatabaseService.js'
import TextField from '@/components/textfield/BaseField.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'FarmManagement',
  components: {
    Form,
    AppLayout,
    FarmOwnerCard,
    TextField,
    BaseButton,
    BaseSelect
  },
  data() {
    const schema = yup.object().shape({
      searchinformation: yup.string()
    })
    return {
      ROUTE_PATH,
      employee: null,
      searchfiller: '',
      schema,
      items: [{ message: 'Full Name' }, { message: 'Username' }]
    }
  },
  created() {
    DatabaseService.getAllFarm()
      .then((response) => {
        console.log(response.data)
        this.employee = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {
    search(searchinfo) {
      if (this.searchfiller == 'Full Name') {
        DatabaseService.searchFarmFullname(searchinfo.searchinformation)
          .then((response) => {
            console.log(response.data)
            this.employee = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
      if (this.searchfiller == 'Username') {
        DatabaseService.searchFarmUsername(searchinfo.searchinformation)
          .then((response) => {
            console.log(response.data)
            this.employee = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
}
</script>
