<template>
  <AppLayout>
    <div>
      <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
        <FormWrapper label="Create Breeding"
          ><Form @submit="createbird" :validation-schema="schema"
            ><div class="mt-[22px] lg:mt-[0px]">
              <div class="mt-6">
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                  <div>
                    <BaseSelectBird
                      :options="this.maleList"
                      v-model="this.breedinginfo.maleListSelected"
                      label="Male Bird"
                      placeholder="Select male bird"
                    />
                  </div>
                  <div>
                    <BaseSelectBird
                      :options="this.femaleList"
                      v-model="this.breedinginfo.femaleListSelected"
                      label="Female Bird"
                      placeholder="Select female bird"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                  <div>
                    <TextField
                      name="breedingCageNumber"
                      label="Breeding CageNumber"
                      type="text"
                      placeholder="Plese enter cage number"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      name="breedingClutch"
                      label="Breeding Clutch"
                      type="text"
                      placeholder="Plese enter bird code"
                      required
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
                  <div class="h-full mt-2">
                    <p class="text-[10px] text-neutral-600">Breeding Date</p>
                    <DatePicker
                      name="dateofbirth"
                      v-model:value="this.breedinginfo.time"
                      value-type="format"
                      placeholder="Select date"
                      format="YYYY-MM-DD"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]">
                <BaseButton type="submit">Create</BaseButton>
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
import TextField from '@/components/textfield/BaseField.vue'
import BaseSelectBird from '@/components/dropdown/BaseSelectBird.vue'
import BreedingService from '@/services/Breeding/BreedingService.js'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import { watchEffect } from '@vue/runtime-core'
import BirdService from '@/services/BirdService.js'

const toast = useToast()
// const NetworkError = (
//   <div>
//     <h1>Register Failed!</h1>
//     <span>The system cannot connect to database</span>
//   </div>
// )

export default {
  name: 'BirdBreedingCreate',
  components: {
    AppLayout,
    FormWrapper,
    BaseButton,
    Form,
    DatePicker,
    TextField,
    BaseSelectBird
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
      schema,
      femaleList: [],
      maleList: [],
      breedinginfo: {
        femaleListSelected: [],
        maleListSelected: [],
        breedingCageNumber: '',
        breedingClutch: '',
        time: ''
      },
      maleParent: [],
      femaleParent: [],
      inbreedingTemp: [],
      status: [{ message: 'In progress' }, { message: 'Done' }]
    }
  },
  created() {
    if (AuthService.hasRoles('ROLE_OWNER')) {
      watchEffect(() => {
        BreedingService.getBirdFemaleListOwner()
          .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].birdStatus == 'Available') {
                this.femaleList.push(response.data[i])
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      watchEffect(() => {
        BreedingService.getBirdFemaleListAdmin(store.getters.farminspect)
          .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].birdStatus == 'Available') {
                this.femaleList.push(response.data[i])
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
    if (AuthService.hasRoles('ROLE_OWNER')) {
      watchEffect(() => {
        BreedingService.getBirdMaleListOwner()
          .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].birdStatus == 'Available') {
                this.maleList.push(response.data[i])
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      watchEffect(() => {
        BreedingService.getBirdMaleListAdmin(store.getters.farminspect)
          .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].birdStatus == 'Available') {
                this.maleList.push(response.data[i])
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  },
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
    createbird(createinfo) {
      if (
        this.breedinginfo.time == '' ||
        this.breedinginfo.femaleListSelected.length == 0 ||
        this.breedinginfo.maleListSelected.length == 0
      ) {
        toast.error('Please fill all information first')
      } else {
        this.maleParent = []
        this.femaleParent = []
        this.inbreedingTemp = []
        this.breedinginfo.breedingCageNumber = createinfo.breedingCageNumber
        this.breedinginfo.breedingClutch = createinfo.breedingClutch
        //get female pedigree
        BreedingService.getpedigree(this.breedinginfo.femaleListSelected)
          .then((response) => {
            console.log('get female')
            this.femaleParent.push(response.data.id)
            if (response.data.maleParentId != null) {
              this.femaleParent.push(response.data.maleParentId.id)
              if (response.data.maleParentId.femaleParentId != null) {
                this.femaleParent.push(
                  response.data.maleParentId.femaleParentId.id
                )
              }
              if (response.data.maleParentId.maleParentId != null) {
                this.femaleParent.push(
                  response.data.maleParentId.maleParentId.id
                )
              }
            }
            if (response.data.femaleParentId != null) {
              this.femaleParent.push(response.data.femaleParentId.id)
              if (response.data.femaleParentId.femaleParentId != null) {
                this.femaleParent.push(
                  response.data.femaleParentId.femaleParentId.id
                )
              }
              if (response.data.femaleParentId.maleParentId != null) {
                this.femaleParent.push(
                  response.data.femaleParentId.maleParentId.id
                )
              }
            }
            //get male pedigree
            BreedingService.getpedigree(this.breedinginfo.maleListSelected)
              .then((response) => {
                console.log('get male')
                this.maleParent.push(response.data.id)
                if (response.data.maleParentId != null) {
                  this.maleParent.push(response.data.maleParentId.id)
                  if (response.data.maleParentId.femaleParentId != null) {
                    this.maleParent.push(
                      response.data.maleParentId.femaleParentId.id
                    )
                  }
                  if (response.data.maleParentId.maleParentId != null) {
                    this.maleParent.push(
                      response.data.maleParentId.maleParentId.id
                    )
                  }
                }
                if (response.data.femaleParentId != null) {
                  this.maleParent.push(response.data.femaleParentId.id)
                  if (response.data.femaleParentId.femaleParentId != null) {
                    this.maleParent.push(
                      response.data.femaleParentId.femaleParentId.id
                    )
                  }
                  if (response.data.femaleParentId.maleParentId != null) {
                    this.maleParent.push(
                      response.data.femaleParentId.maleParentId.id
                    )
                  }
                }
                console.log('start process')
                for (var i = 0; i < this.maleParent.length; i++) {
                  for (var j = 0; j < this.femaleList.length; j++) {
                    if (this.maleParent[i] == this.femaleParent[j]) {
                      this.inbreedingTemp.push(this.femaleParent[j])
                    }
                  }
                }
                if (this.inbreedingTemp.length > 0) {
                  this.$swal({
                    icon: 'warning',
                    title: 'Inbreeding warning!',
                    text: 'This breeding is Inbreeding!, Do you still want to do this breeding?',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, do it',
                    cancelButtonText: 'No, cancel',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      BirdService.getBirdDetail(
                        this.breedinginfo.maleListSelected
                      )
                        .then((response) => {
                          this.breedinginfo.maleListSelected = response.data
                          BirdService.getBirdDetail(
                            this.breedinginfo.femaleListSelected
                          )
                            .then((response) => {
                              this.breedinginfo.femaleListSelected =
                                response.data
                              if (AuthService.hasRoles('ROLE_OWNER')) {
                                BreedingService.createBreedingOwner(
                                  this.breedinginfo
                                )
                                  .then(() => {
                                    toast.success('Create Breeding Success!')
                                    this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
                                  })
                                  .catch((error) => {
                                    console.log(error)
                                  })
                              } else {
                                BreedingService.createBreedingAdmin(
                                  this.breedinginfo,
                                  store.getters.farminspect
                                )
                                  .then(() => {
                                    toast.success('Create Breeding Success!')
                                    this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
                                  })
                                  .catch((error) => {
                                    console.log(error)
                                  })
                              }
                            })
                            .catch((error) => {
                              console.log(error)
                            })
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    }
                  })
                } else {
                  BirdService.getBirdDetail(this.breedinginfo.maleListSelected)
                    .then((response) => {
                      this.breedinginfo.maleListSelected = response.data
                      BirdService.getBirdDetail(
                        this.breedinginfo.femaleListSelected
                      )
                        .then((response) => {
                          this.breedinginfo.femaleListSelected = response.data
                          if (AuthService.hasRoles('ROLE_OWNER')) {
                            BreedingService.createBreedingOwner(
                              this.breedinginfo
                            )
                              .then(() => {
                                toast.success('Create Breeding Success!')
                                this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
                              })
                              .catch((error) => {
                                console.log(error)
                              })
                          } else {
                            BreedingService.createBreedingAdmin(
                              this.breedinginfo,
                              store.getters.farminspect
                            )
                              .then(() => {
                                toast.success('Create Breeding Success!')
                                this.$router.push(`${ROUTE_PATH.HOME_VIEW}`)
                              })
                              .catch((error) => {
                                console.log(error)
                              })
                          }
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                }
              })
              .catch((error) => {
                console.log(error)
              })
          })
          .catch((error) => {
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
