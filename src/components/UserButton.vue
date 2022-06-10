<template>
  <div
    class="h-[40px] w-[198px] px-4 flex items-center bg-primary-50 rounded-[20px] absolute top-[9px] right-[16px]"
  >
    <div
      class="w-full flex justify-between hover:cursor-pointer"
      @click="openmenu"
    >
      <div class="flex items-center">
        <p class="text-primary-700 text-2xl leading-[17px]">
          {{ currentuser.username }}
        </p>
      </div>
      <div class="h-[28px] bg-primary-700 rounded-full flex items-center ml-4">
        <fa icon="user" class="iconcolor h-4 px-2 py-2" />
      </div>
    </div>
    <div class="absolute top-[41px] left-0" v-if="show">
      <router-link
        :to="{
          name: 'AccountSetting',
          params: { id: currentuser.id }
        }"
      >
        <p
          class="bg-white w-[198px] h-[32px] rounded-t-lg flex items-center pl-2 hover:bg-primary-100 hover:cursor-pointer transition duration-300"
        >
          ACCOUT SETTING
        </p>
      </router-link>
      <p
        @click="logout"
        class="bg-white mt-[2px] w-[198px] h-[32px] rounded-b-lg flex items-center pl-2 hover:bg-primary-100 hover:cursor-pointer transition duration-300"
      >
        LOG OUT
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService.js'
import ROUTE_PATH from '@/constants/router.js'

export default {
  name: 'UserButton',
  props: {
    currentuser: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ROUTE_PATH,
      show: false
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
  }
}
</script>
