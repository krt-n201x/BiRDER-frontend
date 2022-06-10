<template>
  <div>
    <h1>Oopsie Daisy!</h1>
    <h3>The {{ resource }} you're looking for is not here</h3>
    <router-link :to="{ name: 'HomeView' }">Back to the home page</router-link>
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
