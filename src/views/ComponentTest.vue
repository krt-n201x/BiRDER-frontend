<template>
  <AppLayout>
    <div class="grid grid-cols-2 w-full gap-4 px-4">
      <div class="flex justify-items-center mt-[16px] lg:mt-[50px] gap-2">
        <FormWrapperForpedigree sex="M"
          ><PedigreeDatail />
        </FormWrapperForpedigree>
        <FormWrapperForpedigree sex="F"
          ><PedigreeDatail />
        </FormWrapperForpedigree>
      </div>
      <div class="flex justify-items-center mt-[16px] lg:mt-[50px] gap-4">
        <FormWrapperForpedigree sex="M"
          ><PedigreeDatail />
        </FormWrapperForpedigree>
        <FormWrapperForpedigree sex="F"
          ><PedigreeDatail />
        </FormWrapperForpedigree>
      </div>
      <div class="grid grid-cols-2">
        <div class="grid grid-cols-2">
          <div class="w-full h-9 border-r-4 border-primary-200"></div>
          <div class="w-full h-9 border-b-4 border-primary-200"></div>
        </div>
        <div class="grid grid-cols-2">
          <div class="w-full h-9 border-b-4 border-primary-200"></div>
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="grid grid-cols-2">
          <div class="w-full h-9 border-r-4 border-primary-200"></div>
          <div class="w-full h-9 border-b-4 border-primary-200"></div>
        </div>
        <div class="grid grid-cols-2">
          <div class="w-full h-9 border-b-4 border-primary-200"></div>
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 w-full gap-0 px-4">
      <div class="grid justify-items-center w-full gap-2">
        <div class="grid grid-cols-2">
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
        <FormWrapperForpedigree sex="M"
          ><PedigreeDatail />
        </FormWrapperForpedigree>
        <div class="grid grid-cols-2 w-full">
          <div class="w-full h-9 border-r-4 border-primary-200"></div>
          <div class="w-full h-9 border-b-4 border-primary-200"></div>
        </div>
      </div>
      <div class="grid justify-items-center w-full gap-2">
        <div class="grid grid-cols-2">
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
        <FormWrapperForpedigree sex="F"
          ><PedigreeDatail />
        </FormWrapperForpedigree>
        <div class="grid grid-cols-2 w-full">
          <div class="w-full h-9 border-b-4 border-primary-200"></div>
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 w-full gap-4 px-4">
      <div class="grid justify-items-center w-full gap-2">
        <div class="grid grid-cols-2">
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
        <FormWrapperForpedigree sex="M"
          ><PedigreeDatail />
        </FormWrapperForpedigree>
      </div>
    </div>
  </AppLayout>
</template>
<script>
import AppLayout from '@/layout/AppLayout.vue'
import ROUTE_PATH from '@/constants/router.js'
import store from '@/store/index.js'
import FormWrapperForpedigree from '@/components/form/FormWrapperForpedigree.vue'
import PedigreeDatail from '@/components/pedigree/PedigreeDetail.vue'
export default {
  name: 'NetworkError',
  components: {
    AppLayout,
    FormWrapperForpedigree,
    PedigreeDatail
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
  created() {}
}
</script>
<style scoped>
.iconcolor {
  color: black;
}
</style>
