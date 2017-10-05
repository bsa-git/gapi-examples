<template>
  <section>

    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>

    <div class="bs-callout-info bs-callout">
      <h4>Method: Users.messages.list</h4>
      <p>Lists the messages in the user's mailbox.</p>
      <strong>HTTP request</strong>
      <p><code>GET https://www.googleapis.com/gmail/v1/users/userId/messages</code></p>
    </div>

    <div class="jumbotron">

      <button type="button" class="btn btn-primary" v-if="!isSignedIn" @click="apiGoogle.handleAuthClick(apiGoogle)">
        Authorize
      </button>

      <div class="lead" v-if="isSignedIn">My Inbox:</div>

    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ApiGoogle from '~/plugins/gapi.class'

  export default {
    data: function () {
      return {
        title: 'Method: Users.messages.list',
        description: 'Lists the messages in the user\'s mailbox.',
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
        console.log('gmail-display-inbox.fetch - OK: ', `isStatic=${isStatic};`)
      }
      if (isClient && isStatic) {
        // Force reloading the current page from the server
        // It is necessary that you can earn a downloadable Google service API
        location.reload(true)
      }
    },
    created: function () {
      if (!this.$isServer && this.config.debug) {
        console.log('gmail-display-inbox.created - OK')
      }
      if (!this.$isServer) {
        const params = {
          debug: this.config.debug,
          apiKey: this.config.gapi.apiKey,
          clientId: this.config.gapi.clientId,
          discoveryDocs: this.config.gapi.services.gmail.discoveryDocs,
          scope: this.config.gapi.services.gmail.scopes['messages.list.send']
        }
        this.apiGoogle = new ApiGoogle(params)
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        if (this.config.debug) {
          console.log('gmail-display-inbox.mounted - OK: ', `isStatic=${this.config.isStatic}`)
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
          if (this.config.isStatic) {
            this.apiGoogle.loadGmailApi()
              .then(() => {
                if (this.config.debug) {
                  console.log('loadGmailApi - OK')
                }
                this.$store.dispatch('receiveGmailMyMessages')
              })
          } else {
            this.$store.dispatch('receiveGmailMyMessages')
          }
        }
      }
    }
  }
</script>
