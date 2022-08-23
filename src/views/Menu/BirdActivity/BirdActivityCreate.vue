<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
      <FormWrapper label="Bird Detail"
        ><Form @submit="updatebird" :validation-schema="schema"
          ><div class="mt-[22px] lg:mt-[36px]">
            <div v-if="!edit"><img :src="this.bird.birdImage" /></div>
            <div v-if="edit">
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
                  :message="this.bird.cageNumber"
                  :disabled="!edit"
                  required
                />
              </div>
              <div>
                <TextField
                  name="birdcode"
                  label="Bird Code"
                  type="text"
                  placeholder="Plese enter bird code"
                  :message="this.bird.birdCode"
                  :disabled="!edit"
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
                  :message="this.bird.birdName"
                  :disabled="!edit"
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
                  :disabled="!edit"
                />
              </div>
            </div>
            <div>
              <TextField
                name="birdspecies"
                label="Bird species"
                type="text"
                placeholder="Plese enter birds pecies"
                :message="this.bird.birdSpecies"
                :disabled="!edit"
                required
              />
            </div>
            <div>
              <TextField
                name="birdcolor"
                label="Bird color"
                type="text"
                placeholder="Plese enter bird color"
                :message="this.bird.birdColor"
                :disabled="!edit"
                required
              />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <BaseSelect
                :options="this.sex"
                v-model="this.birdsex"
                label="Sex of bird"
                placeholder="Select sex of bird"
                :disabled="!edit"
              />
              <BaseSelect
                :options="this.status"
                v-model="this.birdstatus"
                label="Bird status"
                placeholder="Select bird status"
                :disabled="!edit"
              />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <TextField
                name="maleparentcode"
                label="Male Parent Code"
                type="text"
                placeholder="Enter male parent code"
                :message="this.maleParentId"
                :disabled="!edit"
              />
              <TextField
                name="femaleparentcode"
                label="Female Parent Code"
                type="text"
                placeholder="Enter female parent code"
                :message="this.femaleParentId"
                :disabled="!edit"
              />
            </div>
            <div>
              <TextField
                name="paringcode"
                label="Paring code"
                type="text"
                placeholder="Enter paring code"
                :message="this.paringBirdId"
                :disabled="!edit"
              />
            </div>
            <div>
              <AreaField
                name="birdtrecord"
                label="Bird treatment history record"
                type="text"
                placeholder="Enter your bird treatment history record"
                :message="this.bird.birdTreatmentRecord"
                :disabled="!edit"
              />
            </div>
            <div
              class="grid grid-cols-2 gap-2 mt-[22px] lg:mt-[36px]"
              v-if="edit"
            >
              <SecondaryButton @click="cancelChange">Cancel</SecondaryButton>
              <BaseButton type="submit">Save</BaseButton>
            </div>
            <div class="grid grid-cols-1 gap-2 mt-[22px]" v-if="edit">
              <DeleteButton @click="DeleteBird">Delete Account</DeleteButton>
            </div>
            <div
              class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
              v-if="!edit"
            >
              <BaseButton @click="editchange">Edit</BaseButton>
            </div>
          </div>
        </Form>
      </FormWrapper>
    </div>
  </AppLayout>
</template>

<script>
import store from '@/store/index.js'
import AppLayout from '@/layout/AppLayout.vue'
import FormWrapper from '@/components/form/FormWrapper.vue'
import UploadImages from 'vue-upload-drop-images'
import TextField from '@/components/textfield/BaseField.vue'
import DatePicker from 'vue-datepicker-next'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import AreaField from '@/components/textfield/AreaField.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import DeleteButton from '@/components/button/DeleteButton.vue'
import DatabaseService from '@/services/DatabaseService.js'
import AuthService from '@/services/AuthService.js'
import ROUTE_PATH from '@/constants/router.js'
import BirdService from '@/services/BirdService.js'
import { useToast } from 'vue-toastification'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Register Failed!</h1>
    <span>The system cannot connect to database</span>
  </div>
)
export default {
  name: 'BirdActivityCreate',
  components: {
    AppLayout,
    FormWrapper,
    UploadImages,
    TextField,
    DatePicker,
    Form,
    BaseSelect,
    AreaField,
    BaseButton,
    SecondaryButton,
    DeleteButton
  },
  data() {
    const schema = yup.object().shape({
      cagenumber: yup
        .string()
        .min(1, 'The length shall be between 1-25')
        .max(25, 'The length shall be between 1-25')
        .required('Cage number is required!')
        .nullable(true),
      birdcode: yup
        .string()
        .min(4, 'The length shall be between 4-15')
        .max(15, 'The length shall be between 4-15')
        .required('Bird code is required!')
        .nullable(true),
      birdname: yup
        .string()
        .min(1, 'The length shall be between 1-25')
        .max(25, 'The length shall be between 1-25')
        .required('Bird name is required!')
        .nullable(true),
      birdspecies: yup
        .string()
        .min(4, 'The length shall be between 4-50')
        .max(50, 'The length shall be between 4-50')
        .required('Bird species is required!')
        .nullable(true),
      birdcolor: yup
        .string()
        .min(4, 'The length shall be between 4-100')
        .max(100, 'The length shall be between 4-100')
        .required('Bird species is required!')
        .nullable(true),
      maleparentcode: yup
        .string()
        .matches(/^(|.{4,})$/, 'The length shall be between 4-15')
        .max(15, 'The length shall be between 4-15')
        .nullable(true),
      femaleparentcode: yup
        .string()
        .matches(/^(|.{4,})$/, 'The length shall be between 4-15')
        .max(15, 'The length shall be between 4-15')
        .nullable(true),
      paringcode: yup
        .string()
        .matches(/^(|.{4,})$/, 'The length shall be between 4-15')
        .max(15, 'The length shall be between 4-15')
        .nullable(true),
      birdtrecord: yup.string().max(1000, 'The max with 1000 character')
    })
    return {
      time1: store.getters.birdinformation.dateOfBirth,
      edit: false,
      schema,
      files: [],
      imageUrls: [],
      maleParentId: null,
      femaleParentId: null,
      paringBirdId: null,
      birdstatus: store.getters.birdinformation.birdStatus,
      birdsex: store.getters.birdinformation.sexOfBird,
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
      sex: [{ message: 'M' }, { message: 'F' }, { message: 'U' }],
      bird: store.getters.birdinformation,
      ROUTE_PATH,
      imageUrlspath: store.getters.birdinformation.birdImage,
      farmownerid: store.getters.farminspect
    }
  },
  created() {
    if (store.getters.birdinformation.maleParentId != null) {
      this.maleParentId = store.getters.birdinformation.maleParentId.birdCode
    }
    if (store.getters.birdinformation.femaleParentId != null) {
      this.femaleParentId =
        store.getters.birdinformation.femaleParentId.birdCode
    }
    if (store.getters.birdinformation.paringBirdId != null) {
      this.paringBirdId = store.getters.birdinformation.paringBirdId
    }
  },
  methods: {
    editchange() {
      this.edit = !this.edit
    },
    DeleteBird() {
      this.$swal({
        title: 'Deleted Brid!',
        text: 'Are you sure to deleted this Bird?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          DatabaseService.deleteBird(store.getters.birdinformation.id)
            .then(() => {
              toast.success('Deleted Success!')
              this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
            })
            .catch((error) => {
              toast.error('Deleted Falis!')
              console.log(error)
            })
        }
      })
    },
    updatebird(updateinfo) {
      if (updateinfo.maleparentcode == '') {
        updateinfo.maleparentcode = null
      }
      if (updateinfo.femaleparentcode == '') {
        updateinfo.femaleparentcode = null
      }
      if (updateinfo.paringcode == '') {
        updateinfo.paringcode = null
      }
      if (updateinfo.birdtrecord == '') {
        updateinfo.birdtrecord = null
      }
      if (this.birdstatus == '') {
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
          if (this.imageUrls.length == 1) {
            this.imageUrlspath = this.imageUrls[0]
          } else {
            console.log('do not have new img')
          }
          if (AuthService.hasRoles('ROLE_ADMIN')) {
            console.log(updateinfo)
            BirdService.updatebirdAdmin(
              updateinfo,
              this.time1,
              this.birdstatus,
              this.birdsex,
              this.imageUrlspath,
              this.bird.id,
              this.farmownerid
            )
              .then(() => {
                toast.success('Update Bird Success!')
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
            console.log(updateinfo)
            BirdService.updatebirdOther(
              updateinfo,
              this.time1,
              this.birdstatus,
              this.birdsex,
              this.imageUrlspath,
              this.bird.id
            )
              .then(() => {
                toast.success('Update Bird Success!')
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
