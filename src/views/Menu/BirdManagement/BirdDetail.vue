<template>
  <AppLayout>
    <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
      <FormWrapper label="Bird Detail" class="relative"
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
              <BaseSelectSpecies
                :options="this.SpeciesList"
                v-model="this.SpeciesSelect"
                label="Bird species"
                placeholder="Select Species"
                :disabled="!edit"
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
            <div class="grid grid-cols-2 lg:gap-4">
              <BaseSelectBird
                :options="this.BirdListF"
                v-model="this.BirdListFSelected"
                label="Male parent code"
                placeholder="Select Bird"
                :disabled="!edit"
              />
              <BaseSelectBird
                :options="this.BirdListM"
                v-model="this.BirdListMSelected"
                label="Female parent code"
                placeholder="Select Bird"
                :disabled="!edit"
              />
            </div>
            <div>
              <TextField
                name="Pairing"
                label="Pairing code (this information can edit by Bird Breeding feature)"
                type="text"
                placeholder=""
                :message="this.paringBirdId"
                :disabled="true"
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
              <SecondaryButton @click="cancel">Cancel</SecondaryButton>
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
          <div class="absolute top-9 right-4 w-[150px]">
            <router-link
              :to="{
                name: 'BirdPedigree',
                params: { id: this.bird.id }
              }"
            >
              <BaseButton>View Pedigree</BaseButton>
            </router-link>
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
import BaseSelectSpecies from '@/components/dropdown/BaseSelectSpecies.vue'
import { watchEffect } from '@vue/runtime-core'
import SpeciesService from '@/services/Species/SpeciesService.js'
import BaseSelectBird from '@/components/dropdown/BaseSelectBird.vue'

const toast = useToast()
const NetworkError = (
  <div>
    <h1>Network Error!</h1>
    <span>The system cannot connect to database</span>
  </div>
)
export default {
  name: 'BirdPedigree',
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
    DeleteButton,
    BaseSelectSpecies,
    BaseSelectBird
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
      farmownerid: store.getters.farminspect,
      BirdListF: [],
      BirdListFSelected: '',
      BirdListFSelectedfinal: '',
      BirdListM: [],
      BirdListMSelected: '',
      BirdListMSelectedfinal: '',
      SpeciesList: [],
      SpeciesSelect: '',
      SpeciesSelectfinal: ''
    }
  },
  created() {
    if (this.bird.paringBirdId != null) {
      this.paringBirdId =
        this.bird.paringBirdId.birdCode + ' ' + this.bird.paringBirdId.birdName
      console.log(this.paringBirdId)
    }
    if (AuthService.hasRoles('ROLE_ADMIN')) {
      watchEffect(() => {
        BirdService.getBirdFemaleAdmin(this.bird.id, this.farmownerid)
          .then((response) => {
            this.BirdListF = response.data
            if (this.bird.femaleParentId != null) {
              this.BirdListFSelected = this.bird.femaleParentId.id
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
      watchEffect(() => {
        BirdService.getBirdMaleAdmin(this.bird.id, this.farmownerid)
          .then((response) => {
            this.BirdListM = response.data
            if (this.bird.maleParentId != null) {
              this.BirdListMSelected = this.bird.maleParentId.id
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
      watchEffect(() => {
        SpeciesService.getSpeciesAlladmin(this.farmownerid)
          .then((response) => {
            this.SpeciesList = response.data
            this.SpeciesSelect = this.bird.birdSpeciesId.id
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      watchEffect(() => {
        BirdService.getBirdFemale(this.bird.id)
          .then((response) => {
            this.BirdListF = response.data
            if (this.bird.femaleParentId != null) {
              this.BirdListFSelected = this.bird.femaleParentId.id
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
      watchEffect(() => {
        BirdService.getBirdMale(this.bird.id)
          .then((response) => {
            this.BirdListM = response.data
            if (this.bird.maleParentId != null) {
              this.BirdListMSelected = this.bird.maleParentId.id
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
      watchEffect(() => {
        SpeciesService.getSpeciesAll()
          .then((response) => {
            this.SpeciesList = response.data
            this.SpeciesSelect = this.bird.birdSpeciesId.id
          })
          .catch((error) => {
            console.log(error)
          })
      })
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
      if (updateinfo.birdtrecord == '') {
        updateinfo.birdtrecord = null
      }
      if (this.birdstatus == '') {
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
              this.farmownerid,
              this.BirdListFSelectedfinal,
              this.BirdListMSelectedfinal,
              this.SpeciesSelectfinal,
              this.bird.paringBirdId
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
            console.log('father insert: 2:' + this.BirdListMSelectedfinal)
            BirdService.updatebirdOther(
              updateinfo,
              this.time1,
              this.birdstatus,
              this.birdsex,
              this.imageUrlspath,
              this.bird.id,
              this.BirdListFSelectedfinal,
              this.BirdListMSelectedfinal,
              this.SpeciesSelectfinal,
              this.bird.paringBirdId
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
