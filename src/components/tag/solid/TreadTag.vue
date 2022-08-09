<template>
  <button
    class="border-[1px] text-[8px] leading-[4px] border-[#3FA700] bg-[#3FA700] text-white flex h-auto px-2 pt-[5px] pb-[4px] w-auto items-center justify-center rounded-full hover:cursor-default disabled:cursor-not-allowed disabled:bg-neutral-100"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: 'TreadTag',
  props: {}
}
</script>
