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

      <div class="lead" v-if="isSignedIn">{{ myName }}</div>

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
        isSignedIn: false,
        myName: ''
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
        scope: this.config.gapi.services.people.scope
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
            this.updateSigninStatus(this.apiGoogle.isSignedIn())
            this.apiGoogle.listenSignedIn(this.updateSigninStatus.bind(this))
          })
          .catch(error => {

            alert(`Error: ${error.error}\n Details: ${error.details}`) // Error
          })
      })
    },
    computed: {
      ...mapGetters({
        config: 'getConfig'
      })
    },
    methods: {
      updateSigninStatus: isSignedIn => {
        if (this.config.debug) {
          console.log('updateSigninStatus: ', `isSignedIn=${isSignedIn}; `)
        }
        this.isSignedIn = isSignedIn
        if (isSignedIn) {
          this.makeApiCall()
        }
      },
      makeApiCall: () => {
        const self = this
        window.gapi.client.people.people.get({
          'resourceName': 'people/me',
          'requestMask.includeField': 'person.names'
          // 'personFields': 'names'
        }).then((resp) => {
          const name = resp.result.names[0].givenName
          self.myName = 'Hello, ' + name + '!'
          if (this.config.debug) {
            console.log('people.get - OK. ', `Hello, ${name}!`)
          }
        }, (error) => {
          if (this.config.debug) {
            console.log('people.get - Error. ', `Error: ${error}`)
            alert(error)
          }
        })
      }
    }
  }
</script>
