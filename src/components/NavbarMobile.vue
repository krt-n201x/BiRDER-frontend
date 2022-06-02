<template>
  <div class="static">
    <div
      class="h-[60px] px-7 flex items-center justify-center bg-primary-500 relative"
    >
      <div>
        <p class="text-2xl text-white">BiRDER</p>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarMobile',
  components: {}
}
</script>
