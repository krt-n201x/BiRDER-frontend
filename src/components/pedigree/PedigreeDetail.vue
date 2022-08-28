<template>
  <Form @submit="updatebird" :validation-schema="schema"
    ><div class="mt-[22px] lg:mt-[0px]">
      <div class="mt-6">
        <div class="grid grid-cols-4 gap-4 px-4">
          <p class="text-[10px] text-neutral-600">Bird Code</p>
          <p class="text-[10px] text-neutral-600">Name</p>
          <p class="text-[10px] text-neutral-600">date of birth</p>
          <p class="text-[10px] text-neutral-600">sex</p>
        </div>
      </div>
      <div
        class="relative flex gap-4 py-4 px-4 hover:bg-neutral-50 transition duration-300"
      >
        <!-- // -->
        <p class="w-full self-center text-sm font-normal leading-[17px]">
          {{ this.data.birdCode }}
        </p>
        <p class="w-full self-center text-sm font-normal leading-[17px]">
          {{ this.data.birdName }}
        </p>
        <p class="w-full self-center text-sm font-normal leading-[17px]">
          {{ this.time }}
        </p>
        <p class="w-full self-center text-sm font-normal leading-[17px]">
          {{ this.sex }}
        </p>
        <!-- // -->
      </div>
    </div>
  </Form>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
import { Form } from 'vee-validate'

export default {
  name: 'PedigreeDetail',
  components: { Form },
  props: {
    data: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      time: '',
      sex: '',
      ROUTE_PATH
    }
  },
  methods: {},
  created() {
    console.log(this.data.dateOfBirth)
    const a = this.data.dateOfBirth.split('T')
    this.time = a[0]
    if (this.data.sexOfBird == 'M') {
      this.sex = 'Male'
    }
    if (this.data.sexOfBird == 'F') {
      this.sex = 'Female'
    }
  }
}
</script>

<style scoped>
.iconcolormore {
  color: black;
  cursor: pointer;
}
</style>
