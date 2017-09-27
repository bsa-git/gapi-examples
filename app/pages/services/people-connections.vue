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

      <div id="content" class="lead" v-if="isSignedIn"></div>

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
    created: function () {
      // Create apiGoogle data
      const options = {
        debug: this.config.debug,
        apiKey: this.config.gapi.apiKey,
        clientId: this.config.gapi.clientId,
        discoveryDocs: this.config.gapi.services.people.discoveryDocs,
        scope: this.config.gapi.services.people.scopes.connections
      }
      this.apiGoogle = new ApiGoogle(options)
    },
    mounted: function () {
      this.$nextTick(function () {
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
        gapi: 'getGapi'
      })
    },
    methods: {
      updateSigninStatus: function (isSignedIn) {
        if (this.config.debug) {
          console.log('updateSigninStatus: ', `isSignedIn=${isSignedIn}; `)
        }
        this.isSignedIn = isSignedIn
        if (isSignedIn) {
          // this.$store.dispatch('receivePeopleMyNames')
          this.listConnectionNames()
        }
      },
      appendPre: function (message) {
        const pre = document.getElementById('content')
        const textContent = document.createTextNode(message + '\n')
        pre.appendChild(textContent)
      },
      listConnectionNames: function () {
        gapi.client.people.people.connections.list({
          'resourceName': 'people/me',
          'pageSize': 10,
          'personFields': 'names,emailAddresses',
        }).then(function (response) {
          const connections = response.result.connections
          this.appendPre('Connections:')

          if (connections.length > 0) {
            for (i = 0; i < connections.length; i++) {
              const person = connections[i]
              if (person.names && person.names.length > 0) {
                this.appendPre(person.names[0].displayName)
              } else {
                this.appendPre('No display name found for connection.')
              }
            }
          } else {
            this.appendPre('No upcoming events found.')
          }
        })
      }
    }
  }
</script>
