<template>
  <AppLayout>
    <div class="grid justify-items-center m-6">
      <div
        class="w-full max-w-[1078px] grid justify-items-center lg:justify-items-center"
      >
        <div class="w-full mb-4">
          <Form @submit="search" :validation-schema="schema">
            <div
              class="grid grid-cols-1 lg:grid-cols-2 mb-4 bg-white p-4 rounded-lg"
            >
              <div
                class="flex justify-center items-end gap-4 mb-4 lg:mb-0 lg:mr-4"
              >
                <TextField
                  class="w-full mt-0 lg:mb-0"
                  label="Search"
                  name="searchinformation"
                  type="text"
                />
              </div>
              <div class="grid lg:grid-cols-2 gap-4 items-end">
                <BaseSelect
                  :options="this.items"
                  v-model="this.searchfiller"
                  label="Select fillter"
                  placeholder="Select Your Filter"
                />
                <BaseButton type="submit" @click="searchby">Search</BaseButton>
              </div>
            </div>
          </Form>
        </div>
        <FormWrapper label="Bird Species"
          ><Form @submit="updatebird" :validation-schema="schema"
            ><div class="mt-[22px] lg:mt-[0px]">
              <div class="mt-6">
                <div class="grid grid-cols-3 gap-4 mr-[30px] px-4">
                  <p class="text-[10px] text-neutral-600">Species Name</p>
                  <p class="text-[10px] text-neutral-600">Family Name</p>
                  <p class="text-[10px] text-neutral-600">Species Color</p>
                </div>
              </div>
              <div v-if="!notfound">Not found any species</div>
              <div>
                <!-- // -->
                <div
                  class="w-full"
                  v-for="data in this.species"
                  :key="data.id"
                  :data="data"
                >
                  <SpeciesCard :data="data" />
                </div>
                <!-- // -->
              </div>
              <div class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]">
                <BaseButton @click="addBirdSpecies" v-if="isOwner || isAdmin"
                  >add</BaseButton
                >
              </div>
              <div
                class="w-full grid grid-cols-2 gap-4"
                v-if="notfound && usesearch"
              >
                <div>
                  <router-link
                    :to="{ name: 'BirdSpeciesList', query: { page: page - 1 } }"
                    rel="prev"
                  >
                    <BaseButton v-if="page != 1"> Back </BaseButton>
                  </router-link>
                </div>
                <div class="gird justify-item-end">
                  <router-link
                    :to="{ name: 'BirdSpeciesList', query: { page: page + 1 } }"
                    rel="next"
                  >
                    <BaseButton v-if="hasNextPage">
                      Next
                    </BaseButton></router-link
                  >
                </div>
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
import TextField from '@/components/textfield/BaseField.vue'
import BaseSelect from '@/components/dropdown/BaseSelect.vue'
import { Form } from 'vee-validate'
import AuthService from '@/services/AuthService.js'
import SpeciesService from '@/services/Species/SpeciesService.js'
import SpeciesCard from '@/components/species/SpeciesCards.vue'
import SpeciesSearchService from '@/services/Species/SpeciesSearchService.js'
import { watchEffect } from '@vue/runtime-core'
import * as yup from 'yup'

export default {
  name: 'BirdBreedingList',
  components: {
    AppLayout,
    FormWrapper,
    BaseButton,
    Form,
    SpeciesCard,
    TextField,
    BaseSelect
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  data() {
    const schema = yup.object().shape({
      searchinformation: yup.string()
    })
    return {
      ROUTE_PATH,
      thiscurrentUser: store.getters.currentUser,
      farmownerid: store.getters.farminspect,
      species: [],
      items: [{ message: 'Species Name' }],
      schema,
      searchfiller: '',
      totalEvents: 0,
      usesearch: true,
      notfound: true
    }
  },
  created() {
    if (AuthService.hasRoles('ROLE_ADMIN')) {
      console.log('this is admin')
      watchEffect(() => {
        SpeciesService.getSpeciesAdmin(this.farmownerid, 6, this.page)
          .then((response) => {
            this.species = response.data
            this.totalEvents = response.headers['x-total-count']
          })
          .catch((error) => {
            console.log(error)
          })
      })
    } else {
      console.log('this is owner')
      watchEffect(() => {
        SpeciesService.getSpeciesOwner(6, this.page)
          .then((response) => {
            this.species = response.data
            this.totalEvents = response.headers['x-total-count']
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }
  },
  methods: {
    search(searchinfo) {
      if (AuthService.hasRoles('ROLE_ADMIN')) {
        if (this.searchfiller == 'Species Name') {
          SpeciesSearchService.searchSpeciesNameAdmin(
            searchinfo.searchinformation,
            store.getters.farminspect
          )
            .then((response) => {
              console.log(response.data)
              this.species = response.data
              if (response.data.length == 0) {
                this.notfound = false
                this.usesearch = true
              } else if (searchinfo.searchinformation == '') {
                this.notfound = true
                this.usesearch = true
              } else {
                this.notfound = true
                this.usesearch = false
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      } else {
        if (this.searchfiller == 'Species Name') {
          SpeciesSearchService.searchSpeciesName(searchinfo.searchinformation)
            .then((response) => {
              console.log(response.data)
              this.species = response.data
              if (response.data.length == 0) {
                this.notfound = false
                this.usesearch = true
              } else if (searchinfo.searchinformation == '') {
                this.notfound = true
                this.usesearch = true
              } else {
                this.notfound = true
                this.usesearch = false
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    },
    addBirdSpecies() {
      this.$router.push(`${ROUTE_PATH.BIRD_SPECIES_CREATE}`)
    }
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 6)
      return this.page < totalPages
    },
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
