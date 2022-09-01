<template>
  <AppLayout>
    <div>
      <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
        <FormWrapper label="Egg edit information"
          ><Form :validation-schema="schema"
            ><div class="mt-[22px] lg:mt-[0px]">
              <div class="mt-6">
                <div class="grid grid-cols-1 lg:grid-cols-1 lg:gap-4">
                  <BaseSelect
                    :options="this.eggtype"
                    v-model="this.eggselected.eggType"
                    label="Egg Type"
                    placeholder="Select Egg type"
                  />
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                  <BaseSelect
                    :options="this.eggstatus"
                    v-model="this.eggselected.eggStatus"
                    label="Egg Status"
                    placeholder="Select Egg Status"
                  />
                  <div class="h-full mt-2">
                    <p class="text-[10px] text-neutral-600">lay date</p>
                    <DatePicker
                      name="dateofbirth"
                      v-model:value="this.eggselected.layDate"
                      value-type="format"
                      placeholder="Select date"
                      format="YYYY-MM-DD"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]">
                <BaseButton @click="saveegg" type="submit">save</BaseButton>
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
import AuthService from '@/services/AuthService.js'
import DatePicker from 'vue-datepicker-next'
import BreedingService from '@/services/Breeding/BreedingService.js'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Network Error!</h1>
    <span>The system cannot connect to database</span>
  </div>
)

export default {
  name: 'EggEdit',
  components: {
    AppLayout,
    FormWrapper,
    BaseButton,
    Form,
    DatePicker,
    BaseSelect
  },
  data() {
    const schema = yup.object().shape({
      breedingCageNumber: yup
        .string()
        .min(1, 'The length shall be between 1-25')
        .max(25, 'The length shall be between 1-25')
        .required('Breeding CageNumber is required!')
        .nullable(true),
      breedingClutch: yup
        .string()
        .min(1, 'The length shall be between 1-25')
        .max(25, 'The length shall be between 1-25')
        .required('Breeding Clutch is required!')
        .nullable(true)
    })
    return {
      ROUTE_PATH,
      thiscurrentUser: store.getters.currentUser,
      farmownerid: store.getters.farminspect,
      breedingdetails: store.getters.birdbreedingdetails,
      edit: false,
      editEggstat: false,
      schema,
      eggselected: {
        eggType: '',
        eggStatus: '',
        layDate: ''
      },
      egg: store.getters.birdbreedingdetails.haveEggs,
      status: [{ message: 'In progress' }, { message: 'Done' }],
      eggtype: [
        { message: 'unknown' },
        { message: 'empty' },
        { message: 'fertilized' }
      ],
      eggstatus: [
        { message: 'unknown' },
        { message: 'broken' },
        { message: 'empty' },
        { message: 'abandoned' },
        { message: 'eliminated' },
        { message: 'dead in shell' },
        { message: 'in development' },
        { message: 'hatched' },
        { message: 'missing' }
      ]
    }
  },
  created() {
    for (const data of this.egg) {
      if (store.getters.egginspect == data.id) {
        this.eggselected.eggType = data.eggType
        this.eggselected.eggStatus = data.eggStatus
        this.eggselected.layDate = data.layDate
      }
    }
  },
  methods: {
    updateEgg() {
      if (AuthService.hasRoles('ROLE_OWNER')) {
        BreedingService.updateBirdBreedingOwner(this.breedingdetails, this.egg)
          .then(() => {
            toast.success('Update Bird Breeding Success!')
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
        BreedingService.updateBirdBreedingAdmin(
          this.breedingdetails,
          store.getters.farminspect,
          this.egg
        )
          .then(() => {
            toast.success('Update Bird Breeding Success!')
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
    },
    editEgg() {
      this.editEggstat = !this.editEggstat
    },
    deleteEgg(id) {
      var i = []
      for (const data of this.egg) {
        if (data.id != id) {
          i.push(data)
        }
      }
      this.egg = i
      console.log(i)
    },
    saveegg() {
      if (
        this.eggselected.eggType == '' ||
        this.eggselected.eggStatus == '' ||
        this.eggselected.layDate == ''
      ) {
        toast.error('Please fill all information first')
      } else {
        var a = []
        for (const data of this.egg) {
          if (store.getters.egginspect == data.id) {
            data.eggType = this.eggselected.eggType
            data.eggStatus = this.eggselected.eggStatus
            data.layDate = this.eggselected.layDate
          }
          a.push(data)
        }
        this.egg = a
        this.updateEgg()
      }
    },
    deletebreeding() {
      this.$swal({
        icon: 'warning',
        title: 'Deleted Breeding!',
        text: 'Are you sure to deleted this breeding?',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            icon: 'warning',
            title: 'Deleted Egg!',
            text: 'If you delete this breeding you will also delete all of your egg for this breeding, Still want to delete it?',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'No, cancel',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              console.log('deleted')
              BreedingService.deleteBreeding(this.breedingdetails.id)
                .then(() => {
                  toast.success('Delete Success!')
                  this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
                })
                .catch((error) => {
                  toast.error('Deleted Falis!')
                  console.log(error)
                })
            }
          })
        }
      })
    },
    editchange() {
      this.edit = !this.edit
    },
    cancel() {
      this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
    },
    updatebird(updateinfo) {
      console.log(updateinfo)
      this.breedingdetails.breedingCageNumber = updateinfo.breedingCageNumber
      this.breedingdetails.breedingClutch = updateinfo.breedingClutch
      if (AuthService.hasRoles('ROLE_OWNER')) {
        BreedingService.updateBirdBreedingOwner(this.breedingdetails, this.egg)
          .then(() => {
            toast.success('Update Bird Breeding Success!')
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
        BreedingService.updateBirdBreedingAdmin(
          this.breedingdetails,
          store.getters.farminspect,
          this.egg
        )
          .then(() => {
            toast.success('Update Bird Breeding Success!')
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
