<template>
  <AppLayout>
    <!-- grand oarent -->
    <div class="grid grid-cols-2 w-full gap-4 px-4">
      <div
        class="grid grid-cols-2 justify-items-center mt-[16px] lg:mt-[50px] gap-2"
      >
        <div class="w-full" v-if="this.bird.maleParentId != null">
          <div
            class="w-full"
            v-if="this.bird.maleParentId.maleParentId != null"
          >
            <FormWrapperForpedigree sex="M"
              ><PedigreeDatail :data="this.bird.maleParentId.maleParentId" />
            </FormWrapperForpedigree>
          </div>
        </div>
        <div class="w-full" v-if="this.bird.maleParentId != null">
          <div
            class="w-full"
            v-if="this.bird.maleParentId.femaleParentId != null"
          >
            <FormWrapperForpedigree sex="F"
              ><PedigreeDatail :data="this.bird.maleParentId.femaleParentId" />
            </FormWrapperForpedigree>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-2 justify-items-center mt-[16px] lg:mt-[50px] gap-4"
      >
        <div class="w-full" v-if="this.bird.femaleParentId != null">
          <div
            class="w-full"
            v-if="this.bird.femaleParentId.maleParentId != null"
          >
            <FormWrapperForpedigree sex="M"
              ><PedigreeDatail :data="this.bird.femaleParentId.maleParentId" />
            </FormWrapperForpedigree>
          </div>
        </div>
        <div class="w-full" v-if="this.bird.femaleParentId != null">
          <div
            class="w-full"
            v-if="this.bird.femaleParentId.femaleParentId != null"
          >
            <FormWrapperForpedigree sex="F"
              ><PedigreeDatail
                :data="this.bird.femaleParentId.femaleParentId"
              />
            </FormWrapperForpedigree>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="w-full" v-if="this.bird.maleParentId != null">
          <div
            class="w-full"
            v-if="this.bird.maleParentId.maleParentId != null"
          >
            <div class="grid grid-cols-2">
              <div class="w-full h-9 border-r-4 border-primary-200"></div>
              <div class="w-full h-9 border-b-4 border-primary-200"></div>
            </div>
          </div>
        </div>

        <div class="w-full" v-if="this.bird.maleParentId != null">
          <div
            class="w-full"
            v-if="this.bird.maleParentId.femaleParentId != null"
          >
            <div class="grid grid-cols-2">
              <div class="w-full h-9 border-b-4 border-primary-200"></div>
              <div class="w-full h-9 border-l-4 border-primary-200"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="w-full" v-if="this.bird.femaleParentId != null">
          <div
            class="w-full"
            v-if="this.bird.femaleParentId.maleParentId != null"
          >
            <div class="grid grid-cols-2">
              <div class="w-full h-9 border-r-4 border-primary-200"></div>
              <div class="w-full h-9 border-b-4 border-primary-200"></div>
            </div>
          </div>
        </div>

        <div class="w-full" v-if="this.bird.femaleParentId != null">
          <div
            class="w-full"
            v-if="this.bird.femaleParentId.femaleParentId != null"
          >
            <div class="grid grid-cols-2">
              <div class="w-full h-9 border-b-4 border-primary-200"></div>
              <div class="w-full h-9 border-l-4 border-primary-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- parent -->
    <div class="grid grid-cols-2 w-full gap-0 px-4">
      <div
        v-if="this.bird.maleParentId != null"
        class="grid justify-items-center w-full gap-2"
      >
        <div
          class="grid grid-cols-2"
          v-if="
            this.bird.maleParentId.femaleParentId != null ||
            this.bird.maleParentId.maleParentId != null
          "
        >
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
        <FormWrapperForpedigree sex="M"
          ><PedigreeDatail :data="this.bird.maleParentId" />
        </FormWrapperForpedigree>
        <div class="grid grid-cols-2 w-full">
          <div class="w-full h-9 border-r-4 border-primary-200"></div>
          <div class="w-full h-9 border-b-4 border-primary-200"></div>
        </div>
      </div>
      <div
        class="grid justify-items-center w-full gap-2"
        v-if="this.bird.femaleParentId != null"
      >
        <div
          class="grid grid-cols-2"
          v-if="
            this.bird.femaleParentId.femaleParentId != null ||
            this.bird.femaleParentId.maleParentId != null
          "
        >
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
        <FormWrapperForpedigree sex="F"
          ><PedigreeDatail :data="this.bird.femaleParentId" />
        </FormWrapperForpedigree>
        <div class="grid grid-cols-2 w-full">
          <div class="w-full h-9 border-b-4 border-primary-200"></div>
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 w-full gap-4 px-4">
      <div class="grid justify-items-center w-full gap-2">
        <div
          class="grid grid-cols-2"
          v-if="
            this.bird.maleParentId != null || this.bird.femaleParentId != null
          "
        >
          <div class="w-full h-9 border-l-4 border-primary-200"></div>
        </div>
        <FormWrapperForpedigree :sex="this.bird.sexOfBird"
          ><PedigreeDatail :data="this.bird" />
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
      bird: store.getters.birdinformation
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
