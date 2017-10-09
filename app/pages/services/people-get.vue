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

      <button type="button" class="btn btn-primary" v-if="isSignedIn" @click="apiGoogle.handleSignoutClick(apiGoogle)">
        Sign Out
      </button>
      <button type="button" class="btn btn-primary" v-else @click="apiGoogle.handleAuthClick(apiGoogle)">Authorize
      </button>

      <div class="lead" v-if="isSignedIn">Hellow {{ google.people_my.names.givenName }}!</div>

    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ApiGoogle from '~/plugins/gapi.class'

  export default {
    data: function () {
      return {
        title: 'Method: people.get',
        description: 'Provides information about a person by specifying a resource name',
        apiGoogle: null,
        isSignedIn: false
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
    fetch ({isClient, isStatic, config}) {
      if (isClient && config.debug) {
        console.log('people-get.fetch - OK: ', `isStatic=${isStatic};`)
      }
      if (isClient && isStatic) {
        // Force reloading the current page from the server
        // It is necessary that you can earn a downloadable Google service API
        location.reload(true)
      }
    },
    created: function () {
      if (!this.$isServer && this.config.debug) {
        console.log('people-get.created - OK')
      }
      if (!this.$isServer) {
        const params = {
          debug: this.config.debug,
          apiKey: this.config.gapi.apiKey,
          clientId: this.config.gapi.clientId,
          discoveryDocs: this.config.gapi.services.people.discoveryDocs,
          scope: this.config.gapi.services.people.scopes.get
        }
        this.apiGoogle = new ApiGoogle(params)
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        if (this.config.debug) {
          console.log('people-get.mounted - OK: ', `isStatic=${this.config.isStatic}`)
        }
        // Load/Init Google API
        if (this.config.isStatic) {
          this.apiGoogle.loadGoogleAPI()
            .then(() => {
              if (this.config.debug) {
                console.log('loadGoogleAPI - OK')
              }
              return this.apiGoogle.init()
            })
            .then(() => {
              if (this.config.debug) {
                console.log('apiGoogle.init - OK')
              }
              let onSignedIn = this.updateSigninStatus.bind(this)
              this.apiGoogle.listenSignedIn(onSignedIn)
              this.updateSigninStatus(this.apiGoogle.isSignedIn())
            })
        } else {
          this.updateSigninStatus(true)
        }
      })
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        google: 'getGapi'
      })
    },
    methods: {
      updateSigninStatus: function (isSignedIn) {
        if (this.config.debug) {
          console.log('updateSigninStatus - OK: ', `isSignedIn=${isSignedIn}; `)
        }
        this.isSignedIn = isSignedIn
        if (isSignedIn) {
          this.$store.dispatch('receivePeopleMyNames')
        }
      }
    }
  }
</script>
