<template>
  <label
    for="activity"
    class="border-[1px] text-[8px] leading-[4px] border-secondary-700 bg-secondary-700 text-white flex h-auto px-2 pt-[5px] pb-[4px] w-auto items-center justify-center rounded-full hover:cursor-default disabled:cursor-not-allowed disabled:bg-neutral-100"
  >
    <slot />
  </label>
</template>
<script>
export default {
  name: 'ActivityTag',
  props: {}
}
</script>
