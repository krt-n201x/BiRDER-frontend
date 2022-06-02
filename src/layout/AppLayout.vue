<template>
  <div class="relative min-h-screen bg-primary-50 pb-4">
    <NavbarDesktop id="desktop" />
    <NavbarMobile class="lg:hidden"
      ><button @click="openmenu">
        <fa
          icon="bars"
          class="absolute top-[18px] left-[16px] iconcolor h-6"
        /></button
    ></NavbarMobile>
    <slot></slot>
    <!-- navbarmenu -->
    <div
      v-if="show"
      class="absolute top-[60px] bg-primary-500 min-h-screen w-full px-4 flex flex-col justify-between lg:hidden"
    >
      <div>
        <div
          class="flex justify-center py-4 hover:bg-primary-900 transition duration-300"
        >
          <fa icon="user" class="iconcolor h-6 pr-4" />
          <p class="text-white">ACCOUNT SETTING</p>
        </div>
        <div
          class="flex justify-center py-4 hover:bg-primary-900 transition duration-300"
        >
          <fa icon="people-group" class="iconcolor h-6 pr-4" />
          <p class="text-white">EMPLOYEE MANAGEMENT</p>
        </div>
      </div>
      <div class="mb-20">
        <SecondaryButton @click="logout">Log Out</SecondaryButton>
      </div>
    </div>
    <!-- -------- -->
  </div>
</template>

<script>
import NavbarDesktop from '@/components/NavbarDesktop.vue'
import NavbarMobile from '@/components/NavbarMobile.vue'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import AuthService from '@/services/AuthService.js'

export default {
  name: 'AppLayout',
  inject: ['Store'],
  computed: {
    currentUser() {
      return localStorage.getItem('lowuser')
    }
  },
  components: {
    NavbarDesktop,
    NavbarMobile,
    SecondaryButton
  },
  props: {},
  data() {
    return {
      show: false
    }
  },
  methods: {
    openmenu() {
      this.show = !this.show
    },
    logout() {
      AuthService.logout()
      this.$router.go('/ ')
    }
  }
}
</script>
<style>
@media only screen and (max-width: 1026px) {
  #desktop {
    display: none;
  }
}
.iconcolor {
  color: white;
}
</style>
