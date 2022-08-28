<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
      <FormWrapper label="Create Bird Planning">
        <Form @submit="createPlanning" :validation-schema="schema">
          <div class="mt-[22px] lg:mt-[36px]">
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div class="h-full mt-4">
                <p class="text-[10px] text-neutral-600">Planning Date</p>
                <DatePicker
                  name="dateOfPlan"
                  v-model:value="info.date"
                  value-type="format"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                />
              </div>
              <div class="h-full mt-4">
                <p class="text-[10px] text-neutral-600">Planning Time</p>
                <DatePicker
                  name="dateofbirth"
                  v-model:value="info.time"
                  value-type="format"
                  placeholder="Select date"
                  type="time"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 lg:gap-4">
              <div>
                <TextField
                  name="title"
                  label="Title"
                  type="text"
                  placeholder="Plese enter title"
                  required
                />
              </div>
            </div>
            <div class="grid grid-cols-2 lg:gap-4">
              <BaseSelectBird
                :options="this.BirdList"
                v-model="this.info.birdselected"
                label="Bird selected"
                placeholder="Select Bird"
              />
              <BaseSelect
                :options="this.planstatus"
                v-model="this.info.selectplanstatus"
                label="Plan status"
                placeholder="Select plan status"
              />
            </div>
            <div>
              <AreaField
                name="description"
                label="Description"
                type="text"
                placeholder="Enter your Description"
              />
            </div>
            <div>
              <p class="text-[10px] text-neutral-600">Planning Tag</p>
              <div class="flex gap-1">
                <input
                  type="radio"
                  id="activity"
                  value="Activity"
                  v-model="info.planTag"
                />
                <label for="activity"
                  ><p class="text-[16px] pr-4">Activity</p></label
                >
                <input
                  type="radio"
                  id="breed"
                  value="Breed"
                  v-model="info.planTag"
                />
                <label for="breed"><p class="text-[16px] pr-4">Breed</p></label>
                <input
                  type="radio"
                  id="food"
                  value="Food"
                  v-model="info.planTag"
                />
                <label for="food"><p class="text-[16px] pr-4">Food</p></label>
                <input
                  type="radio"
                  id="health"
                  value="Health"
                  v-model="info.planTag"
                />
                <label for="health"
                  ><p class="text-[16px] pr-4">Health</p></label
                >
                <input
                  type="radio"
                  id="trade"
                  value="Trade"
                  v-model="info.planTag"
                />
                <label for="trade"><p class="text-[16px] pr-4">Trade</p></label>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]">
            <SecondaryButton @click="cancel">Cancel</SecondaryButton>
            <BaseButton type="submit">Create</BaseButton>
          </div>
        </Form>
      </FormWrapper>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '@/layout/AppLayout.vue'
import FormWrapper from '@/components/form/FormWrapper.vue'
import TextField from '@/components/textfield/BaseField.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import AreaField from '@/components/textfield/AreaField.vue'
import ROUTE_PATH from '@/constants/router.js'
import AuthService from '@/services/AuthService.js'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import store from '@/store'
import { watchEffect } from '@vue/runtime-core'
import BirdService from '@/services/BirdService.js'
import BaseSelectBird from '@/components/dropdown/BaseSelectBird.vue'
import PlanningService from '@/services/Planning/PlanningService'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Network Error!</h1>
    <span>The system cannot connect to database</span>
  </div>
)

export default {
  name: 'BirdActivityCreate',
  components: {
    AppLayout,
    FormWrapper,
    TextField,
    BaseButton,
    SecondaryButton,
    Form,
    DatePicker,
    BaseSelect,
    AreaField,
    BaseSelectBird
  },
  data() {
    const schema = yup.object().shape({
      title: yup
        .string()
        .min(1, 'The length shall be between 1-25')
        .max(25, 'The length shall be between 1-25')
        .required('Planning title is required!'),
      description: yup.string()
    })
    return {
      ROUTE_PATH,
      schema,
      BirdList: [],
      birdselecteddetail: null,
      info: {
        time: null,
        date: null,
        birdselected: '',
        planTag: '',
        selectplanstatus: ''
      },
      farmownerid: store.getters.farminspect,
      planstatus: [{ message: 'In progress' }, { message: 'Done' }]
    }
  },
  methods: {
    createPlanning(data) {
      if (this.info.selectplanstatus == '') {
        toast.error('Please Select planstatus')
      } else if (this.info.date == '' || this.info.date == null) {
        toast.error('Please select date')
      } else if (this.info.time == '' || this.info.time == null) {
        this.info.time = '00:00:00'
      } else {
        console.log(this.info.birdselected)
        if (this.info.birdselected == '') {
          if (AuthService.hasRoles('ROLE_OWNER')) {
            PlanningService.createPlanningOwner(
              data,
              this.info,
              this.birdselecteddetail
            )
              .then(() => {
                toast.success('Create Planning Success!')
                this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
              })
              .catch((error) => {
                if (error.message == 'Network Error') {
                  toast.error(NetworkError)
                } else {
                  toast.error(error.response.data.message)
                }
                console.log(error)
              })
          } else {
            PlanningService.createPlanningOwnerAdmin(
              this.farmownerid,
              data,
              this.info,
              this.birdselecteddetail
            )
              .then(() => {
                toast.success('Create Planning Success!')
                this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
              })
              .catch((error) => {
                if (error.message == 'Network Error') {
                  toast.error(NetworkError)
                } else {
                  toast.error(error.response.data.message)
                }
                console.log(error)
              })
          }
        } else {
          BirdService.getBirdDetail(this.info.birdselected)
            .then((response) => {
              this.birdselecteddetail = response.data
              if (AuthService.hasRoles('ROLE_OWNER')) {
                PlanningService.createPlanningOwner(
                  data,
                  this.info,
                  this.birdselecteddetail
                )
                  .then(() => {
                    toast.success('Create Planning Success!')
                    this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
                  })
                  .catch((error) => {
                    if (error.message == 'Network Error') {
                      toast.error(NetworkError)
                    } else {
                      toast.error(error.response.data.message)
                    }
                    console.log(error)
                  })
              } else {
                PlanningService.createPlanningOwnerAdmin(
                  this.farmownerid,
                  data,
                  this.info,
                  this.birdselecteddetail
                )
                  .then(() => {
                    toast.success('Create Planning Success!')
                    this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
                  })
                  .catch((error) => {
                    if (error.message == 'Network Error') {
                      toast.error(NetworkError)
                    } else {
                      toast.error(error.response.data.message)
                    }
                    console.log(error)
                  })
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },
    cancel() {
      this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
    },
    handleImages(files) {
      console.log(files)
      this.files = files
    }
  },
  created() {
    if (AuthService.hasRoles('ROLE_OWNER')) {
      watchEffect(() => {
        BirdService.getAllBirdWithoutPagination()
          .then((response) => {
            this.BirdList = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      watchEffect(() => {
        BirdService.getAllBirdWithoutPaginationAdmin(this.farmownerid)
          .then((response) => {
            this.BirdList = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  }
}
</script>
