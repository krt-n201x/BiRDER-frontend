<template>
  <button
    :type="type"
    class="bg-secondary-50 text-sm leading-[17px] text-primary-900 flex h-[40px] w-full items-center justify-center rounded-full hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-neutral-100"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: 'ViewButton',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (prop) => ['button', 'submit', 'reset'].includes(prop),
      required: false
    }
  }
}
</script>
