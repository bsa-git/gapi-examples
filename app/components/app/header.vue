<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <nuxt-link class="navbar-brand exotic--dark" to="/">BSA Lab</nuxt-link>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li :class="{ 'active': $route.name == 'index' }">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li :class="['dropdown', {active: isGroupMenu('services')}]">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"
               role="button" aria-haspopup="true" aria-expanded="false">Services <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">People API</li>
              <li>
                <nuxt-link to="/services/people-about">About</nuxt-link>
                <nuxt-link to="/services/people-get">People.get</nuxt-link>
              </li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>
          <li :class="{ 'active': $route.name == 'bootstrap' }">
            <nuxt-link to="/bootstrap">Bootstrap</nuxt-link>
          </li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      isGroupMenu: function (item) {
        switch (item) {
          case 'services':
            return this.$route.path === '/services/people-get' ||
              this.$route.path === '/services/people-about'
          default:
            return false
        }
      }
    }
  }
</script>

<style>
  .navbar-brand {
    color: white !important;
  }
</style>
