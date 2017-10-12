<template>
  <div>
    <!-- Header -->
    <app-header></app-header>
    <!-- Context -->
    <div class="container theme-showcase" role="main">
      <nuxt/>
    </div>
  </div>
</template>

<script>
  import AppHeader from '~/components/app/header.vue'
  export default {
    components: {
      AppHeader
    },
    created: function () {
      // Set sign isClient for store
      this.$store.commit('SET_IS_CLIENT', !this.$isServer)
    }
  }
</script>
