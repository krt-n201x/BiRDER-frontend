<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
      <FormWrapper label="Register Bird">
        <Form @submit="registerbird" :validation-schema="schema">
          <div class="mt-[22px] lg:mt-[36px]">
            <div>
              <UploadImages
                :max="1"
                maxError="Allow to upload only 1 picture"
                @changed="handleImages"
              />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <TextField
                  name="cagenumber"
                  label="Cage number"
                  type="text"
                  placeholder="Plese enter cage number"
                  required
                />
              </div>
              <div>
                <TextField
                  name="birdcode"
                  label="Bird Code"
                  type="text"
                  placeholder="Plese enter bird code"
                  required
                />
              </div>
            </div>
            <div class="mb-4 grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <TextField
                  name="birdname"
                  label="Bird Name"
                  type="text"
                  placeholder="Plese enter bird name"
                  required
                />
              </div>
              <div class="h-full mt-4">
                <p class="text-[10px] text-neutral-600">Date of birth</p>
                <DatePicker
                  name="dateofbirth"
                  v-model:value="time1"
                  value-type="format"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                />
              </div>
            </div>
            <div>
              <TextField
                name="birdspecies"
                label="Bird species"
                type="text"
                placeholder="Plese enter birds pecies"
                required
              />
            </div>
            <div>
              <TextField
                name="birdcolor"
                label="Bird color"
                type="text"
                placeholder="Plese enter bird color"
                required
              />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <BaseSelect
                :options="this.sex"
                v-model="this.birdsex"
                label="Sex of bird"
                placeholder="Select sex of bird"
              />
              <BaseSelect
                :options="this.status"
                v-model="this.birdstatus"
                label="Bird status"
                placeholder="Select bird status"
              />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <TextField
                name="maleparentcode"
                label="Male Parent Code"
                type="text"
                placeholder="Enter male parent code"
              />
              <TextField
                name="femaleparentcode"
                label="Female Parent Code"
                type="text"
                placeholder="Enter female parent code"
              />
            </div>
            <div>
              <TextField
                name="paringcode"
                label="Paring code"
                type="text"
                placeholder="Enter paring code"
              />
            </div>
            <div>
              <AreaField
                name="birdtrecord"
                label="Bird treatment history record"
                type="text"
                placeholder="Enter your bird treatment history record"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]">
            <SecondaryButton @click="cancel">Cancel</SecondaryButton>
            <BaseButton type="submit">Register</BaseButton>
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
import DatabaseService from '@/services/DatabaseService.js'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import DatePicker from 'vue-datepicker-next'
import UploadImages from 'vue-upload-drop-images'
import 'vue-datepicker-next/index.css'
import store from '@/store'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Register Failed!</h1>
    <span>The system cannot connect to database</span>
  </div>
)

export default {
  name: 'BirdRegisterPage',
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
    UploadImages
  },
  data() {
    const schema = yup.object().shape({
      cagenumber: yup
        .string()
        .min(1, 'The length shall be between 1-25')
        .max(25, 'The length shall be between 1-25')
        .required('Cage number is required!'),
      birdcode: yup
        .string()
        .min(4, 'The length shall be between 4-15')
        .max(15, 'The length shall be between 4-15')
        .required('Bird code is required!'),
      birdname: yup
        .string()
        .min(1, 'The length shall be between 1-25')
        .max(25, 'The length shall be between 1-25')
        .required('Bird code is required!'),
      birdspecies: yup
        .string()
        .min(4, 'The length shall be between 4-50')
        .max(50, 'The length shall be between 4-50')
        .required('Bird species is required!'),
      birdcolor: yup
        .string()
        .min(4, 'The length shall be between 4-100')
        .max(100, 'The length shall be between 4-100')
        .required('Bird species is required!'),
      maleparentcode: yup
        .string()
        .min(4, 'The length shall be between 4-15')
        .max(15, 'The length shall be between 4-15'),
      femaleparentcode: yup
        .string()
        .min(4, 'The length shall be between 4-15')
        .max(15, 'The length shall be between 4-15'),
      paringcode: yup
        .string()
        .min(4, 'The length shall be between 4-15')
        .max(15, 'The length shall be between 4-15'),
      birdtrecord: yup.string().max(1000, 'The max with 1000 character')
    })
    return {
      time1: null,
      files: [],
      imageUrls: [],
      ROUTE_PATH,
      schema,
      birdstatus: '',
      birdsex: '',
      farmownerid: store.getters.farminspect,
      status: [
        { message: 'Sold' },
        { message: 'For sale' },
        { message: 'Available' },
        { message: 'Unavailable' },
        { message: 'Paired' },
        { message: 'Deceased' },
        { message: 'Exchanged' },
        { message: 'Lost' },
        { message: 'Donated' }
      ],
      sex: [{ message: 'M' }, { message: 'F' }, { message: 'U' }]
    }
  },
  methods: {
    registerbird(registerinfo) {
      if (this.files.length == 0) {
        toast.error("Please upload bird's picture")
      } else if (this.birdstatus == '') {
        toast.error('Please select bird status')
      } else if (this.birdsex == '') {
        toast.error('Please select bird sex')
      } else if (this.time1 == '' || this.time1 == null) {
        toast.error('Please select birth date')
      } else {
        Promise.all(
          this.files.map((file) => {
            return DatabaseService.uploadFile(file)
          })
        ).then((response) => {
          console.log(response.map((r) => r.data))
          console.log('finish upload file')
          this.imageUrls = response.map((r) => r.data)
          if (AuthService.hasRoles('ROLE_ADMIN')) {
            AuthService.createBirdAdmin(
              registerinfo,
              this.time1,
              this.birdstatus,
              this.birdsex,
              this.imageUrls[0],
              this.farmownerid
            )
              .then(() => {
                toast.success('Create Bird Success!')
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
            AuthService.createBird(
              registerinfo,
              this.time1,
              this.birdstatus,
              this.birdsex,
              this.imageUrls[0]
            )
              .then(() => {
                toast.success('Create Bird Success!')
                this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
              })
              .catch((error) => {
                if (error.message == 'Network Error') {
                  toast.error(NetworkError)
                } else {
                  toast.error(error.response.data.message)
                  this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
                }
                console.log(error)
              })
          }
        })
      }
    },
    cancel() {
      this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
    },
    handleImages(files) {
      console.log(files)
      this.files = files
    }
  }
}
</script>
