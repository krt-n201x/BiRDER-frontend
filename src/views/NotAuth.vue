<template>
  <div>
    <h1>Oopsie Daisy!</h1>
    <h3>You are not authorized to watch this page</h3>
    <router-link :to="{ name: 'LoginPage' }"
      ><Button
        label="Login"
        class="p-button-secondary"
        id="login"
        font-awesome-icon
        icon="sign-out-alt"
    /></router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  }
}
</script>
<style>
#login {
  align-content: center;
  align-items: center;
  padding-left: 0px;
  padding-right: 8px;
}
</style>
