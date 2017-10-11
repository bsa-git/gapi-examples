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
          <li v-if="isAuth" :class="['dropdown', {active: isGroupMenu('services')}]">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"
               role="button" aria-haspopup="true" aria-expanded="false">Services <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">Google People API</li>
              <li>
                <nuxt-link to="/services/people-about">About</nuxt-link>
                <nuxt-link to="/services/people-get">My Information</nuxt-link>
                <nuxt-link to="/services/people-connections">My Connections</nuxt-link>
              </li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header">Google Gmail API</li>
              <li>
                <nuxt-link to="/services/gmail-about">About</nuxt-link>
                <nuxt-link to="/services/gmail-display-inbox">Display My Inbox</nuxt-link>
                <nuxt-link to="/services/gmail-send-message">Send message</nuxt-link>
              </li>
            </ul>
          </li>
          <li :class="{ 'active': $route.name == 'login' }">
            <nuxt-link to="/login">{{ isAuth? 'Logout':'Login' }}</nuxt-link>
          </li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    methods: {
      isGroupMenu: function (item) {
        switch (item) {
          case 'services':
            return this.$route.path === '/services/people-about' ||
              this.$route.path === '/services/people-get' ||
              this.$route.path === '/services/people-connections' ||
              this.$route.path === '/services/gmail-about' ||
              this.$route.path === '/services/gmail-display-inbox' ||
              this.$route.path === '/services/gmail-send-message'
          default:
            return false
        }
      }
    },
    computed: {
      ...mapGetters({
        isAuth: 'isAuth'
      })
    }
  }
</script>

<style>
  .navbar-brand {
    color: white !important;
  }
</style>
