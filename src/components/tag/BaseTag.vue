<template>
  <button
    class="border-[1px] text-[8px] leading-[4px] border-neutral-700 text-neutral-700 flex h-auto px-2 pt-[5px] pb-[4px] w-auto items-center justify-center rounded-full hover:cursor-default disabled:cursor-not-allowed disabled:bg-neutral-100"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: 'BaseTag',
  props: {}
}
</script>
