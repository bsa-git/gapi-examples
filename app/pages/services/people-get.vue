<template>
  <section class="container">
    <!-- Page Title and description -->
    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>
    <!-- Short description -->
    <div class="bs-callout-info bs-callout">
      <h4>Method: people.get</h4>
      <p>
        Provides information about a person by specifying a resource name. Use <code>people/me</code> to indicate the
        authenticated user. <br> The request throws a 400 error if 'personFields' is not specified.
      </p>
      <h4>HTTP request</h4>
      <p><code>GET https://people.googleapis.com/v1/{resourceName=people/*}</code></p>
      <p>The URL uses <a href="https://github.com/googleapis/googleapis/blob/master/google/api/http.proto"
                         target="_blank">Google API HTTP annotation</a> syntax.</p>

      <p class="lead">Details can be found <a href="https://developers.google.com/people/api/rest/v1/people/get"
                                              target="_blank">here</a>.</p>
    </div>
    <!-- Page content -->
    <div class="jumbotron text-center well">
      <!--
      <button type="button" class="btn btn-primary" v-if="isSignedIn" @click="apiGoogle.handleSignoutClick(apiGoogle)">
        Sign Out
      </button>
      <button type="button" class="btn btn-primary" v-else @click="apiGoogle.handleAuthClick(apiGoogle)">Authorize
      </button>
      -->
      <button type="button" class="btn btn-primary" @click="showPeopleMyNames">About Me</button>
      <div class="lead" v-show="isShow">Hellow {{ google.people_my.names.givenName }}!</div>

    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import ApiGoogle from '~/plugins/gapi.class'

  export default {
    data: function () {
      return {
        title: 'Method: people.get',
        description: 'Provides information about a person by specifying a resource name',
        isShow: false
      }
    },
    head () {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ]
      }
    },
    computed: {
      ...mapGetters({
        google: 'getGoogleData',
      })
    },
    methods: {
      showPeopleMyNames: function () {
        this.isShow = true
        this.$store.dispatch('receivePeopleMyNames')
      }
    }
  }
</script>
