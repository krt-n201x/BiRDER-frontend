<template>
  <AppLayout>
    <div>
      <div class="grid justify-items-center mt-[16px] lg:mt-[50px]">
        <FormWrapper label="Bird Activity"
          ><Form @submit="updatebird" :validation-schema="schema"
            ><div class="mt-[22px] lg:mt-[0px]">
              <div class="mt-6">
                <div class="grid grid-cols-2 gap-4 mr-[68px] pb-4">
                  <p class="text-[10px] text-neutral-600">Date</p>
                  <p class="text-[10px] text-neutral-600">Title</p>
                </div>
              </div>
              <div>
                <!-- // -->
                <div class="flex gap-4 mb-4">
                  <p
                    class="w-full self-center text-sm font-normal leading-[17px]"
                  >
                    10/01/2022
                  </p>
                  <div class="w-full">
                    <p class="w-full text-sm font-normal leading-[17px]">
                      See Doctor at hospital
                    </p>
                    <div class="w-full mt-1 flex gap-1">
                      <BaseTag>Activity</BaseTag>
                      <BaseTag>Breed</BaseTag>
                      <BaseTag>Food</BaseTag>
                      <BaseTag>Health</BaseTag>
                      <BaseTag>Tread</BaseTag>
                    </div>
                  </div>
                  <div class="flex">
                    <fa
                      icon="circle-check"
                      class="self-center iconcolor h-4 pr-4"
                    />
                    <fa
                      icon="pen-to-square"
                      class="self-center iconcolor h-4"
                    />
                  </div>
                </div>
                <!-- // -->
                <!-- // -->
                <div class="flex gap-4">
                  <p
                    class="w-full self-center text-sm font-normal leading-[17px]"
                  >
                    10/01/2022
                  </p>
                  <div class="w-full">
                    <p class="w-full text-sm font-normal leading-[17px]">
                      See Doctor at hospital
                    </p>
                    <div class="w-full mt-1 flex gap-1">
                      <BaseTag>Activity</BaseTag>
                      <BaseTag>Breed</BaseTag>
                      <BaseTag>Food</BaseTag>
                      <BaseTag>Health</BaseTag>
                      <BaseTag>Tread</BaseTag>
                    </div>
                  </div>
                  <div class="flex">
                    <fa
                      icon="circle-check"
                      class="self-center iconcolor h-4 pr-4"
                    />
                    <fa
                      icon="pen-to-square"
                      class="self-center iconcolor h-4"
                    />
                  </div>
                </div>
                <!-- // -->
              </div>
              <div
                class="grid grid-cols-1 gap-2 mt-[22px] lg:mt-[36px]"
                v-if="!edit"
              >
                <BaseButton @click="editchange">add</BaseButton>
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
import BaseTag from '@/components/tag/BaseTag.vue'
import FormWrapper from '@/components/form/FormWrapper.vue'
import BaseButton from '@/components/button/BaseButton.vue'
import { Form } from 'vee-validate'

export default {
  name: 'NetworkError',
  components: {
    AppLayout,
    BaseTag,
    FormWrapper,
    BaseButton,
    Form
  },
  data() {
    return {
      ROUTE_PATH,
      thiscurrentUser: store.getters.currentUser,
      error: true,
      edit: false
    }
  },
  created() {}
}
</script>
<style scoped>
.iconcolor {
  color: black;
}
</style>
