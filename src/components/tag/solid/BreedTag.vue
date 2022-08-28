<template>
  <button
    class="border-[1px] text-[8px] leading-[4px] border-[#246EF3] bg-[#246EF3] text-white flex h-auto px-2 pt-[5px] pb-[4px] w-auto items-center justify-center rounded-full hover:cursor-default disabled:cursor-not-allowed disabled:bg-neutral-100"
  >
    <slot />
  </button>
</template>
<script>
export default {
  name: 'BreedTag',
  props: {}
}
</script>
