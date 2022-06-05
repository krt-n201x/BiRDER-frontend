<template>
  <div class="h-[60px] px-7 flex items-center bg-primary-500">
    <div class="mr-8">
      <p class="text-2xl text-white">BiRDER</p>
    </div>

    <div v-if="currentuser" class="mr-8">
      <p class="text-2xl text-white">|</p>
    </div>
    <div v-if="currentuser" class="mr-8">
      <button class="text-2xl text-white font-light">Home</button>
    </div>
    <div v-if="currentuser" class="mr-8 h-full flex items-center">
      <button class="text-2xl text-white font-light">
        Employee Management
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarDesktop',
  props: {
    currentuser: {
      type: String,
      required: true
    }
  }
}
</script>
