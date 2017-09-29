<template>
  <section>

    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>

    <div class="bs-callout-info bs-callout">
      <h4>Method: people.connections.list</h4>
      <p>
        Provides a list of the authenticated user's contacts merged with any connected profiles.
        The request throws a 400 error if 'personFields' is not specified.
      </p>
      <strong>HTTP request</strong>
      <p><code>GET https://people.googleapis.com/v1/{resourceName=people/*}/connections</code></p>
      <p>The URL uses <a href="https://github.com/googleapis/googleapis/blob/master/google/api/http.proto"
                         target="_blank">Google API HTTP annotation</a> syntax.</p>

      <p class="lead">Details can be found <a href="https://developers.google.com/people/api/rest/v1/people.connections/list"
                                              target="_blank">here</a>.</p>
    </div>

    <div class="jumbotron">
      <div text-center>
        <button type="button" class="btn btn-primary" v-if="isSignedIn" @click="google.api.handleSignoutClick">Sign Out</button>
        <button type="button" class="btn btn-primary" v-else @click="google.api.handleAuthClick">Authorize</button>
      </div>
      <div id="content" class="lead" v-if="isSignedIn">
        <p class="lead">Connections:</p>
        <ul>
          <li v-for="connection in google.people_my.connections">{{ connection }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ApiGoogle from '~/plugins/gapi.class'

  export default {
    data: function () {
      return {
        title: 'Method: people.connections.list',
        description: 'Provides a list of the authenticated user\'s contacts',
        apiGoogle: null,
        isSignedIn: false,
        myConnections: []
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
    fetch ({store, isClient, config }) {
      if (config.debug) {
        console.log('people-connections.fetch - OK.')
      }
      if (store.state.google.api === null) {
        store.commit('SET_GOOGLE_API', new ApiGoogle({debug: config.debug}))
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        if (this.config.debug) {
          console.log('people-connections.mounted - OK')
        }
        if (this.google.loadedClient) {
          this.runPeopleConnections()
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
              this.runPeopleConnections()
            })
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
          this.$store.dispatch('receivePeopleMyConnections')
        }
      },
      runPeopleConnections: function () {
        return this.google.api.iniGapiClient({
          apiKey: this.config.gapi.apiKey,
          clientId: this.config.gapi.clientId,
          discoveryDocs: this.config.gapi.services.people.discoveryDocs,
          scope: this.config.gapi.services.people.scopes.connections
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
