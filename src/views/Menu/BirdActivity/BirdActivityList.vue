<template>
  <AppLayout>
    <div>
      <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
        <FormWrapper label="Bird Activity"
          ><Form @submit="updatebird" :validation-schema="schema"
            ><div class="mt-[22px] lg:mt-[0px]">
              <div class="mt-6">
                <div class="grid grid-cols-2 gap-4 mr-[68px] px-4">
                  <p class="text-[10px] text-neutral-600">Date</p>
                  <p class="text-[10px] text-neutral-600">Title</p>
                </div>
              </div>
              <div>
                <!-- // -->
                <div
                  class="w-full"
                  v-for="data in this.activity"
                  :key="data.id"
                  :data="data"
                >
                  <ActivityCard :data="data" />
                </div>
                <!-- // -->
              </div>
              <div
                class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
                v-if="!edit"
              >
                <BaseButton @click="addActivity">add</BaseButton>
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
import ActivityCard from '@/components/activitycard/ActivityCard.vue'
export default {
  name: 'BirdActivityList',
  components: {
    AppLayout,
    FormWrapper,
    BaseButton,
    Form,
    ActivityCard
  },
  data() {
    return {
      ROUTE_PATH,
      thiscurrentUser: store.getters.currentUser,
      error: true,
      edit: false,
      today: false,
      activity: {
        data1: {
          id: 1,
          title: 'Example',
          date: '06/08/2022'
        },
        data2: {
          id: 2,
          title: 'Example2',
          date: '20/20/2022'
        }
      }
    }
  },
  created() {},
  methods: {
    addActivity() {
      this.$router.push(`${ROUTE_PATH.BIRD_CREATEACTIVIT}`)
    }
  }
}
</script>
<style scoped>
.iconcolor {
  color: black;
}
</style>
