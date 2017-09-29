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

      <button type="button" class="btn btn-primary" v-if="isSignedIn" @click="google.api.handleSignoutClick">Sign Out
      </button>
      <button type="button" class="btn btn-primary" v-else @click="google.api.handleAuthClick">Authorize</button>

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
        // apiGoogle: null,
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
    fetch ({store, isClient, config}) {
      if (config.debug) {
        console.log('people-get.fetch - OK.')
      }
      if (store.state.google.api === null) {
        store.commit('SET_GOOGLE_API', new ApiGoogle({debug: config.debug}))
      }

    },
    mounted: function () {
      this.$nextTick(function () {
        if (this.config.debug) {
          console.log('people-get.mounted - OK', this.google.api)
        }
//        if (this.google.api === null) {
//          this.$store.commit('SET_GOOGLE_API', new ApiGoogle({debug: this.config.debug}))
//        }
        // Load/Init Google API
        if (this.google.loadedClient) {
          this.runPeopleGet()
        } else {
          this.google.api.loadGoogleAPI()
            .then(() => {
              if (this.config.debug) {
                console.log('loadGoogleAPI - OK')
              }
              return this.google.api.loadGapiClient()
            })
            .then(() => {
              if (this.config.debug) {
                console.log('loadGapiClient - OK')
              }
              this.$store.commit('SET_LOADED_GOOGLE_CLIENT')
              this.runPeopleGet()
            })
        }
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
        return this.google.api.iniGapiClient({
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
            this.google.api.listenSignedIn(onSignedIn)
            this.updateSigninStatus(this.google.api.isSignedIn())
          })
      }
    }
  }
</script>
