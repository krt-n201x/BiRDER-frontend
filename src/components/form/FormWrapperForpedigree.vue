<template>
  <div
    class="relative rounded-lg bg-white lg:pt-3 pb-4 px-4 lg:min-h-[50px] w-[400px]"
  >
    <div
      id="desktop"
      v-if="sex == 'F'"
      class="absolute top-0 right-5 w-[20px] h-full bg-[#EB96EB]"
    ></div>
    <div
      id="desktop"
      v-if="sex == 'M'"
      class="absolute top-0 right-5 w-[20px] h-full bg-[#14AAF5]"
    ></div>
    <p
      class="flex justify-center lg:justify-start text-2xl lg:text-3xl leading-[17px] text-black"
    >
      {{ label }}
    </p>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FormWrapper',
  props: {
    label: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      required: true
    }
  }
}
</script>
