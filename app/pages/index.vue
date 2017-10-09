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

<style>
  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>
