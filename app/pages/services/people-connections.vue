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

      <p class="lead">Details can be found <a
        href="https://developers.google.com/people/api/rest/v1/people.connections/list"
        target="_blank">here</a>.</p>
    </div>

    <div class="jumbotron">
      <div text-center>
        <button type="button" class="btn btn-primary" v-if="isSignedIn" @click="apiGoogle.handleSignoutClick">Sign Out
        </button>
        <button type="button" class="btn btn-primary" v-else @click="apiGoogle.handleAuthClick">Authorize</button>
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
      if (isClient) {
        // Force reloading the current page from the server
        // It is necessary that you can earn a downloadable Google service API
        location.reload(true)
      }
    },
    created: function () {
      if (!this.$isServer && this.config.debug) {
        console.log('people-connections.created - OK')
      }
      if (!this.$isServer) {
        const params = {
          debug: this.config.debug,
          apiKey: this.config.gapi.apiKey,
          clientId: this.config.gapi.clientId,
          discoveryDocs: this.config.gapi.services.people.discoveryDocs,
          scope: this.config.gapi.services.people.scopes.connections
        }
        this.apiGoogle = new ApiGoogle(params)
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        if (this.config.debug) {
          console.log('people-connections.mounted - OK')
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
      }
    }
  }
</script>
