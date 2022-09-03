<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
      <FormWrapper label="Create Bird Species">
        <Form @submit="createSpecies" :validation-schema="schema">
          <div class="mt-[22px] lg:mt-[36px]">
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <TextField
                  name="speciesName"
                  label="Species Name"
                  type="text"
                  placeholder="Plese enter species name"
                  required
                />
              </div>
              <div>
                <TextField
                  name="familyName"
                  label="Family Name"
                  type="text"
                  placeholder="Plese enter family name"
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
                  required
                />
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
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import ROUTE_PATH from '@/constants/router.js'
import AuthService from '@/services/AuthService.js'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import store from '@/store'
import SpeciesService from '@/services/Species/SpeciesService.js'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Network Error!</h1>
    <span>The system cannot connect to database</span>
  </div>
)

export default {
  name: 'BirdSpeciesCreate',
  components: {
    AppLayout,
    FormWrapper,
    TextField,
    BaseButton,
    SecondaryButton,
    Form
  },
  data() {
    const schema = yup.object().shape({
      speciesName: yup
        .string()
        .min(1, 'The length shall be between 1-100')
        .max(100, 'The length shall be between 1-100')
        .required('Species Name is required!'),
      familyName: yup
        .string()
        .min(1, 'The length shall be between 1-100')
        .max(100, 'The length shall be between 1-100')
        .required('Family Name is required!'),
      speciesColor: yup
        .string()
        .min(1, 'The length shall be between 1-225')
        .max(225, 'The length shall be between 1-225')
        .required('Species Color is required!')
    })
    return {
      ROUTE_PATH,
      schema,
      farmownerid: store.getters.farminspect,
      planstatus: [{ message: 'In progress' }, { message: 'Done' }]
    }
  },
  methods: {
    createSpecies(data) {
      if (AuthService.hasRoles('ROLE_OWNER')) {
        SpeciesService.createSpecies(data)
          .then(() => {
            toast.success('Create Species Success!')
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
        SpeciesService.createSpeciesAdmin(data, this.farmownerid)
          .then(() => {
            toast.success('Create Species Success!')
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
    cancel() {
      this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
    }
  },
  created() {}
}
</script>
