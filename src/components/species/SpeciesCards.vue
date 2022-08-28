<template>
  <div
    class="relative flex gap-4 py-4 px-4 hover:bg-neutral-50 transition duration-300"
  >
    <p class="w-full self-center text-sm font-normal leading-[17px]">
      {{ data.speciesName }}
    </p>
    <div class="w-full self-center">
      <p class="w-full text-sm font-normal leading-[17px]">
        {{ data.familyName }}
      </p>
    </div>
    <div class="w-full self-center">
      <p class="w-full text-sm font-normal leading-[17px]">
        {{ data.speciesColor }}
      </p>
    </div>
    <div class="flex gap-4 items-center">
      <router-link
        :to="{
          name: 'BirdSpeciesDetail',
          params: { id: data.id }
        }"
      >
        <fa icon="pen-to-square" class="self-center iconcolormore h-4" />
      </router-link>
    </div>
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'

export default {
  name: 'SpeciesCards',
  components: {},
  props: {
    data: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      ROUTE_PATH
    }
  },
  methods: {}
}
</script>

<style scoped>
.iconcolormore {
  color: black;
  cursor: pointer;
}
</style>
