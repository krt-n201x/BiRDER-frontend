<template>
  <div class="relative min-h-screen bg-primary-50 pb-4">
    <NavbarDesktop id="desktop" :currentuser="thiscurrentUser" />
    <NavbarMobile class="lg:hidden"
      ><button v-if="thiscurrentUser" @click="openmenu">
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
        <router-link
          :to="{
            name: 'AccountSetting',
            params: { id: thiscurrentUser.id }
          }"
        >
          <div
            class="flex justify-center py-4 hover:bg-primary-900 transition duration-300"
          >
            <fa icon="user" class="iconcolor h-6 pr-4" />
            <p class="text-white">ACCOUNT SETTING</p>
          </div>
        </router-link>
        <router-link :to="ROUTE_PATH.EMPLOYEE_MANAGEMENT">
          <div
            v-if="isOwner"
            class="flex justify-center py-4 hover:bg-primary-900 transition duration-300"
          >
            <fa icon="people-group" class="iconcolor h-6 pr-4" />
            <p class="text-white">EMPLOYEE MANAGEMENT</p>
          </div>
        </router-link>
        <router-link :to="ROUTE_PATH.FARM_MANAGEMENT">
          <div
            v-if="isAdmin"
            class="flex justify-center py-4 hover:bg-primary-900 transition duration-300"
          >
            <fa icon="people-roof" class="iconcolor h-6 pr-4" />
            <p class="text-white">FARM MANAGEMENT</p>
          </div>
        </router-link>
        <router-link :to="ROUTE_PATH.BIRD_MANAGEMENT">
          <div
            v-if="isOwner || isEmpl"
            class="flex justify-center py-4 hover:bg-primary-900 transition duration-300"
          >
            <fa icon="dove" class="iconcolor h-6 pr-4" />
            <p class="text-white">Bird MANAGEMENT</p>
          </div>
        </router-link>
      </div>
      <div class="mb-20">
        <SecondaryButton @click="logout">Log Out</SecondaryButton>
      </div>
    </div>
    <!-- -------- -->
  </div>
</template>

<script>
import store from '@/store/index.js'
import NavbarDesktop from '@/components/NavbarDesktop.vue'
import NavbarMobile from '@/components/NavbarMobile.vue'
import SecondaryButton from '@/components/button/SecondaryButton.vue'
import AuthService from '@/services/AuthService.js'
import ROUTE_PATH from '@/constants/router.js'

export default {
  name: 'AppLayout',
  components: {
    NavbarDesktop,
    NavbarMobile,
    SecondaryButton
  },
  props: {},
  data() {
    return {
      ROUTE_PATH,
      show: false,
      thiscurrentUser: store.getters.currentUser
    }
  },
  methods: {
    openmenu() {
      this.show = !this.show
    },
    logout() {
      AuthService.logout()
      this.$router.push(`${ROUTE_PATH.LOGIN_PAGE}`)
    }
  },
  computed: {
    isOwner() {
      return AuthService.hasRoles('ROLE_OWNER')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    },
    isEmpl() {
      return AuthService.hasRoles('ROLE_EMPLOYEE')
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
