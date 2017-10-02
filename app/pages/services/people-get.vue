<template>
  <section>

    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>

    <div class="bs-callout-info bs-callout">
      <h4>Method: people.get</h4>
      <p>
        Provides information about a person by specifying a resource name. Use <code>people/me</code> to indicate the
        authenticated user. <br> The request throws a 400 error if 'personFields' is not specified.
      </p>
      <strong>HTTP request</strong>
      <p><code>GET https://people.googleapis.com/v1/{resourceName=people/*}</code></p>
      <p>The URL uses <a href="https://github.com/googleapis/googleapis/blob/master/google/api/http.proto"
                         target="_blank">Google API HTTP annotation</a> syntax.</p>

      <p class="lead">Details can be found <a href="https://developers.google.com/people/api/rest/v1/people/get"
                                              target="_blank">here</a>.</p>
    </div>

    <div class="jumbotron text-center">

      <button type="button" class="btn btn-primary" v-if="isSignedIn" @click="apiGoogle.handleSignoutClick">Sign Out
      </button>
      <button type="button" class="btn btn-primary" v-else @click="apiGoogle.handleAuthClick">Authorize</button>

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
    fetch ({isClient}) {
      if (isClient) {
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
//        this.$store.commit('SET_GOOGLE_API', new ApiGoogle({debug: this.config.debug}))
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        if (this.config.debug) {
          console.log('people-get.mounted - OK')
        }
        // Load/Init Google API
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

        /*
        if (this.google.loadedClient) {
          this.runPeopleGet()
        } else {
          this.apiGoogle.loadGoogleAPI()
            .then(() => {
              if (this.config.debug) {
                console.log('loadGoogleAPI - OK')
              }
              return this.apiGoogle.loadGapiClient()
            })
            .then(() => {
              if (this.config.debug) {
                console.log('loadGapiClient - OK')
              }
              this.$store.commit('SET_LOADED_GOOGLE_CLIENT')
              this.runPeopleGet()
            })
        }
        */
      })
    },
    computed: {
      ...
        mapGetters({
          config: 'getConfig',
          google: 'getGapi'
        })
    }
    ,
    methods: {
      updateSigninStatus: function (isSignedIn) {
        if (this.config.debug) {
          console.log('updateSigninStatus - OK: ', `isSignedIn=${isSignedIn}; `)
        }
        this.isSignedIn = isSignedIn
        if (isSignedIn) {
          this.$store.dispatch('receivePeopleMyNames')
        }
      },
      runPeopleGet: function () {
        return this.apiGoogle.iniGapiClient({
          apiKey: this.config.gapi.apiKey,
          clientId: this.config.gapi.clientId,
          discoveryDocs: this.config.gapi.services.people.discoveryDocs,
          scope: this.config.gapi.services.people.scopes.get
        })
          .then(() => {
            if (this.config.debug) {
              console.log('iniGapiClient - OK')
            }
            let onSignedIn = this.updateSigninStatus.bind(this)
            this.apiGoogle.listenSignedIn(onSignedIn)
            this.updateSigninStatus(this.apiGoogle.isSignedIn())
          })
      }
    }
  }
</script>
