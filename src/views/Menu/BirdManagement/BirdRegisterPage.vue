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
              <BaseSelectSpecies
                :options="this.SpeciesList"
                v-model="this.SpeciesSelect"
                label="Bird species"
                placeholder="Select Species"
              />
            </div>
            <div class="mb-4 grid grid-cols-1 lg:grid-cols-1 lg:gap-4">
              <div>
                <TextField
                  name="birdcolor"
                  label="Bird color"
                  type="text"
                  placeholder="Plese enter bird color"
                  required
                />
              </div>
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
            <div class="grid grid-cols-2 lg:gap-4">
              <BaseSelectBird
                :options="this.BirdListF"
                v-model="this.BirdListFSelected"
                label="Male parent code"
                placeholder="Select Bird"
              />
              <BaseSelectBird
                :options="this.BirdListM"
                v-model="this.BirdListMSelected"
                label="Female parent code"
                placeholder="Select Bird"
              />
            </div>
            <div>
              <TextField
                name="Pairing"
                label="Pairing code (this information can edit by Bird Breeding feature)"
                type="text"
                placeholder=""
                :disabled="true"
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
import BaseSelectBird from '@/components/dropdown/BaseSelectBird.vue'
import BaseSelectSpecies from '@/components/dropdown/BaseSelectSpecies.vue'
import 'vue-datepicker-next/index.css'
import store from '@/store'
import { watchEffect } from '@vue/runtime-core'
import BirdService from '@/services/BirdService.js'
import SpeciesService from '@/services/Species/SpeciesService.js'

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
    UploadImages,
    BaseSelectBird,
    BaseSelectSpecies
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
        .required('Bird name is required!'),
      birdcolor: yup
        .string()
        .min(1, 'The length shall be between 1-225')
        .max(225, 'The length shall be between 1-225')
        .required('Bird color is required!'),
      paringcode: yup
        .string()
        .matches(/^(|.{4,})$/, 'The length shall be between 4-15')
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
      BirdListF: [],
      BirdListFSelected: '',
      BirdListFSelectedfinal: '',
      BirdListM: [],
      BirdListMSelected: '',
      BirdListMSelectedfinal: '',
      SpeciesList: [],
      SpeciesSelect: '',
      SpeciesSelectfinal: '',
      disable: true,
      sex: [{ message: 'M' }, { message: 'F' }, { message: 'U' }]
    }
  },
  methods: {
    onChange() {
      console.log('wow')
    },
    registerbird(registerinfo) {
      if (this.BirdListFSelected != '' && this.BirdListFSelected != null) {
        watchEffect(() => {
          BirdService.getBirdDetail(this.BirdListFSelected)
            .then((response) => {
              this.BirdListFSelectedfinal = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        })
      } else {
        this.BirdListFSelectedfinal = null
      }
      if (this.BirdListMSelected != '' && this.BirdListMSelected != null) {
        watchEffect(() => {
          BirdService.getBirdDetail(this.BirdListMSelected)
            .then((response) => {
              this.BirdListMSelectedfinal = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        })
      } else {
        this.BirdListMSelectedfinal = null
      }
      if (this.SpeciesSelect != '') {
        watchEffect(() => {
          SpeciesService.getSpeciesDetail(this.SpeciesSelect)
            .then((response) => {
              console.log(response.data)
              this.SpeciesSelectfinal = response.data
            })
            .catch((error) => {
              console.log(error)
            })
        })
      }
      if (registerinfo.paringcode == '') {
        registerinfo.paringcode = null
      }
      if (registerinfo.birdtrecord == '') {
        registerinfo.birdtrecord = null
      }
      if (this.files.length == 0) {
        toast.error("Please upload bird's picture")
      } else if (this.birdstatus == '') {
        toast.error('Please select bird status')
      } else if (this.SpeciesSelect == '') {
        toast.error('Please select bird species')
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
              this.farmownerid,
              this.BirdListFSelectedfinal,
              this.BirdListMSelectedfinal,
              this.SpeciesSelectfinal
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
              this.imageUrls[0],
              this.BirdListFSelectedfinal,
              this.BirdListMSelectedfinal,
              this.SpeciesSelectfinal
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
  },
  created() {
    if (AuthService.hasRoles('ROLE_ADMIN')) {
      watchEffect(() => {
        BirdService.getBirdFemaleAdmin(0, this.farmownerid)
          .then((response) => {
            this.BirdListF = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
      watchEffect(() => {
        BirdService.getBirdMaleAdmin(0, this.farmownerid)
          .then((response) => {
            this.BirdListM = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
      watchEffect(() => {
        SpeciesService.getSpeciesAlladmin(this.farmownerid)
          .then((response) => {
            this.SpeciesList = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      watchEffect(() => {
        BirdService.getBirdFemale(0)
          .then((response) => {
            this.BirdListF = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
      watchEffect(() => {
        BirdService.getBirdMale(0)
          .then((response) => {
            this.BirdListM = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
      watchEffect(() => {
        SpeciesService.getSpeciesAll()
          .then((response) => {
            this.SpeciesList = response.data
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  }
}
</script>
