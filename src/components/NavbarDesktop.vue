<template>
  <div class="h-[60px] px-7 flex items-center bg-primary-500 relative">
    <div class="mr-8">
      <router-link :to="ROUTE_PATH.HOME_VIEW">
        <p class="text-2xl text-white">BiRDER</p>
      </router-link>
    </div>

    <div v-if="currentuser" class="mr-8">
      <p class="text-2xl text-white">|</p>
    </div>
    <div v-if="currentuser" class="mr-8">
      <router-link :to="ROUTE_PATH.HOME_VIEW">
        <button class="text-2xl text-white font-light">Home</button>
      </router-link>
    </div>
    <div v-if="isOwner" class="mr-8 h-full flex items-center">
      <router-link :to="ROUTE_PATH.EMPLOYEE_MANAGEMENT">
        <button class="text-2xl text-white font-light">
          Employee Management
        </button>
      </router-link>
    </div>
    <div v-if="isAdmin" class="mr-8 h-full flex items-center">
      <router-link :to="ROUTE_PATH.FARM_MANAGEMENT">
        <button class="text-2xl text-white font-light">Farm Management</button>
      </router-link>
    </div>
    <UserButton :currentuser="currentuser" v-if="currentuser" />
  </div>
</template>

<script>
import ROUTE_PATH from '@/constants/router.js'
import UserButton from '@/components/UserButton.vue'
import AuthService from '@/services/AuthService.js'

export default {
  name: 'NavbarDesktop',
  components: { UserButton },
  props: {
    currentuser: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ROUTE_PATH
    }
  },
  computed: {
    isOwner() {
      return AuthService.hasRoles('ROLE_OWNER')
    },
    isAdmin() {
      return AuthService.hasRoles('ROLE_ADMIN')
    }
  }
}
</script>
