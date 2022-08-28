<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
      <FormWrapper label="Create Bird Species">
        <Form @submit="updateSpecies" :validation-schema="schema">
          <div class="mt-[22px] lg:mt-[36px]">
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <TextField
                  name="speciesName"
                  label="Species Name"
                  type="text"
                  placeholder="Plese enter species name"
                  :message="species.speciesName"
                  :disabled="!edit"
                  required
                />
              </div>
              <div>
                <TextField
                  name="familyName"
                  label="Family Name"
                  type="text"
                  placeholder="Plese enter family name"
                  :message="species.familyName"
                  :disabled="!edit"
                  required
                />
              </div>
            </div>
            <div class="grid grid-cols-1 lg:gap-4">
              <div>
                <TextField
                  name="speciesColor"
                  label="Species Color"
                  type="text"
                  placeholder="Plese enter species color"
                  :message="species.speciesColor"
                  :disabled="!edit"
                  required
                />
              </div>
            </div>
          </div>
          <div
            class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]"
            v-if="edit"
          >
            <SecondaryButton @click="cancel">Cancel</SecondaryButton>
            <BaseButton type="submit">Update</BaseButton>
          </div>
          <div class="grid grid-cols-1 gap-2 mt-[22px]" v-if="edit">
            <DeleteButton @click="DeleteSpecies">Delete Account</DeleteButton>
          </div>
          <div
            class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
            v-if="!edit"
          >
            <BaseButton v-if="isOwner || isAdmin" @click="editchange"
              >Edit</BaseButton
            >
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
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import ROUTE_PATH from '@/constants/router.js'
import AuthService from '@/services/AuthService.js'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import store from '@/store'
import SpeciesService from '@/services/Species/SpeciesService.js'
import DeleteButton from '@/components/button/DeleteButton.vue'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Network Error!</h1>
    <span>The system cannot connect to database</span>
  </div>
)

export default {
  name: 'BirdSpeciesDetail',
  components: {
    AppLayout,
    FormWrapper,
    TextField,
    BaseButton,
    SecondaryButton,
    Form,
    DeleteButton
  },
  data() {
    const schema = yup.object().shape({
      speciesName: yup
        .string()
        .min(1, 'The length shall be between 1-100')
        .max(100, 'The length shall be between 1-100')
        .required('Planning title is required!'),
      familyName: yup
        .string()
        .min(1, 'The length shall be between 1-100')
        .max(100, 'The length shall be between 1-100')
        .required('Planning title is required!'),
      speciesColor: yup
        .string()
        .min(1, 'The length shall be between 1-225')
        .max(225, 'The length shall be between 1-225')
        .required('Planning title is required!')
    })
    return {
      ROUTE_PATH,
      edit: false,
      schema,
      farmownerid: store.getters.farminspect,
      species: store.getters.speciesDetail,
      planstatus: [{ message: 'In progress' }, { message: 'Done' }]
    }
  },
  methods: {
    editchange() {
      this.edit = !this.edit
    },
    updateSpecies(data) {
      SpeciesService.updateSpecies(this.species.id, data)
        .then(() => {
          toast.success('Update Species Success!')
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
    },
    DeleteSpecies() {
      this.$swal({
        title: 'Deleted Species!',
        text: 'Are you sure to deleted this Species?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          SpeciesService.deleteSpecies(this.species.id)
            .then(() => {
              toast.success('Deleted Success!')
              this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
            })
            .catch((error) => {
              toast.error(error.response.data.message)
              console.log(error.response.data.message)
            })
        }
      })
    },
    cancel() {
      this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
    }
  },
  computed: {
    isOwner() {
      return AuthService.hasRoles('ROLE_OWNER')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  },
  created() {}
}
</script>
