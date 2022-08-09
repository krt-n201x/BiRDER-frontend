<template>
  <div class="w-full mt-1 flex flex-wrap gap-1">
    <ActivitySolidTag>Activity</ActivitySolidTag>
    <BreedSolidTag>Breed</BreedSolidTag>
    <FoodSolidTag>Food</FoodSolidTag>
    <HealthSolidTag>Health</HealthSolidTag>
    <TreadSolidTag>Tread</TreadSolidTag>
  </div>
</template>

<script>
import HealthSolidTag from '@/components/tag/solid/HealthTag.vue'
import ActivitySolidTag from '@/components/tag/solid/ActivityTag.vue'
import FoodSolidTag from '@/components/tag/solid/FoodTag.vue'
import TreadSolidTag from '@/components/tag/solid/TreadTag.vue'
import BreedSolidTag from '@/components/tag/solid/BreedTag.vue'

export default {
  name: 'TagGenerator',
  components: {
    HealthSolidTag,
    ActivitySolidTag,
    FoodSolidTag,
    TreadSolidTag,
    BreedSolidTag
  },
  props: {
    data: {
      type: String,
      required: false
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
