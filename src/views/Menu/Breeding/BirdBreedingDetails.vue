<template>
  <AppLayout>
    <div>
      <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mb-5">
          <div>
            <p
              class="font-bold text-lg w-full rounded-lg bg-white mb-4 pl-4 py-2"
            >
              Male Bird :
            </p>
            <BirdCardBreedingDetails :data="breedingdetails.haveMale" />
          </div>
          <div>
            <p
              class="font-bold text-lg w-full rounded-lg bg-white mb-4 pl-4 py-2"
            >
              Male Bird :
            </p>
            <BirdCardBreedingDetails :data="breedingdetails.haveFemale" />
          </div>
        </div>
        <FormWrapper label="Breeding Information"
          ><Form @submit="updatebird" :validation-schema="schema"
            ><div class="mt-[22px] lg:mt-[0px]">
              <div class="mt-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                  <div>
                    <TextField
                      name="breedingCageNumber"
                      label="Breeding CageNumber"
                      type="text"
                      placeholder="Plese enter cage number"
                      :message="this.breedingdetails.breedingCageNumber"
                      :disabled="!edit"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      name="breedingClutch"
                      label="Breeding Clutch"
                      type="text"
                      placeholder="Plese enter bird code"
                      :message="this.breedingdetails.breedingClutch"
                      :disabled="!edit"
                      required
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                  <BaseSelect
                    :options="this.status"
                    v-model="this.breedingdetails.breedingStatus"
                    label="Bird status"
                    placeholder="Select bird status"
                    :disabled="!edit"
                  />
                  <div class="h-full mt-2">
                    <p class="text-[10px] text-neutral-600">Breeding Date</p>
                    <DatePicker
                      name="dateofbirth"
                      v-model:value="breedingdetails.breedingDate"
                      value-type="format"
                      placeholder="Select date"
                      format="YYYY-MM-DD"
                      :disabled="!edit"
                    />
                  </div>
                </div>
              </div>
              <div
                class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]"
                v-if="edit"
              >
                <SecondaryButton @click="editchange">Cancel</SecondaryButton>
                <BaseButton type="submit">Save</BaseButton>
              </div>
              <div class="grid grid-cols-1 gap-2 mt-[22px]" v-if="edit">
                <DeleteButton @click="deletebreeding"
                  >Delete This Breeding</DeleteButton
                >
              </div>
              <div
                class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
                v-if="!edit"
              >
                <BaseButton @click="editchange" v-if="isOwner || isAdmin"
                  >edit</BaseButton
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
import { Form } from 'vee-validate'
import AuthService from '@/services/AuthService.js'
import BirdCardBreedingDetails from '@/components/birdcard/BirdCardBreedingDetails.vue'
import DatePicker from 'vue-datepicker-next'
import TextField from '@/components/textfield/BaseField.vue'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import BreedingService from '@/services/Breeding/BreedingService.js'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import DeleteButton from '@/components/button/DeleteButton.vue'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Register Failed!</h1>
    <span>The system cannot connect to database</span>
  </div>
)

export default {
  name: 'BirdBreedingDetails',
  components: {
    AppLayout,
    FormWrapper,
    BaseButton,
    Form,
    BirdCardBreedingDetails,
    DatePicker,
    TextField,
    BaseSelect,
    SecondaryButton,
    DeleteButton
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
      schema,
      status: [{ message: 'In progress' }, { message: 'Done' }]
    }
  },
  created() {},
  methods: {
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
        BreedingService.updateBirdBreedingOwner(this.breedingdetails)
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
          store.getters.farminspect
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
