<template>
  <section>
    <div class="jumbotron well text-center">
      <!-- Logo -->
      <home-logo></home-logo>
      <!-- Title -->
      <h1 class="title exotic--light">
        {{ name }}
      </h1>
      <h2 class="subtitle">
        {{ description }}
      </h2>
      <div class="links">
        <a href="https://developers.google.com/api-client-library/javascript/start/start-js" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/bsa-git/gapi-examples" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
  import HomeLogo from '~/components/home/logo.vue'

  export default {
    components: {
      HomeLogo
    },
    data: function () {
      return {
        name: 'Gapi Examples',
        description: 'Examples Google API'
      }
    }
  }
</script>
