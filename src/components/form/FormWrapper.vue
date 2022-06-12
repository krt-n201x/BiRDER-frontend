<template>
  <div
    class="relative rounded-lg bg-white pt-9 pb-4 px-4 lg:min-h-[50px] w-[265px] lg:w-[598px]"
  >
    <div
      id="desktop"
      class="absolute top-[28px] left-0 w-2 h-12 bg-primary-900"
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
    }
  }
}
</script>
