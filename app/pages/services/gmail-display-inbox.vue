<template>
  <section class="container">
    <!-- Page Title and description -->
    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>
    <!-- Short description -->
    <div class="bs-callout-info bs-callout">
      <h4>Method: Users.messages.list</h4>
      <p>Lists the messages in the user's mailbox.</p>
      <h4>HTTP request</h4>
      <p><code>GET https://www.googleapis.com/gmail/v1/users/userId/messages</code></p>
      <p class="lead">
        Details can be found <a href="https://developers.google.com/gmail/api/v1/reference/users/messages/list"
                                target="_blank">here</a>.
      </p>
      <p>This example was created on the basis of an <a
        href="https://www.sitepoint.com/sending-emails-gmail-javascript-api/" target="_blank">article</a> written by <a
        href="https://www.sitepoint.com/author/jshields/" target="_blank">Jamie Shields</a>.</p>
    </div>
    <!-- Page content -->
    <button type="button" class="btn btn-primary" v-if="!isSignedIn" @click="apiGoogle.handleAuthClick(apiGoogle)">
      Authorize
    </button>
    <div v-if="isSignedIn">
      <h1>Gmail API demo</h1>
      <!-- Inbox message list  -->
      <table class="table table-striped table-inbox">
        <thead>
        <tr>
          <th>From</th>
          <th>Subject</th>
          <th>Date/Time</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="message in google.gmail.inbox">
          <tr :key="message.id">
            <td v-text="message.from"></td>
            <td><a :href="`#message-modal-${message.id}`" data-toggle="modal" :id="`message-link-${message.id}`"
                   v-text="message.subject"></a></td>
            <td>{{ message.date }}</td>
          </tr>
        </template>
        </tbody>
      </table>
      <!-- Modal window for message body -->
      <template v-for="message in google.gmail.inbox">
        <div class="modal fade" :id="`message-modal-${message.id}`" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" :key="message.id">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">{{ message.subject }}</h4>
              </div>
              <div class="modal-body">
                <iframe :id="`message-iframe-${message.id}`" :srcdoc="message.body"></iframe>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </template>
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

<style>
  iframe {
    width: 100%;
    border: 0;
    min-height: 80%;
    height: 600px;
    display: flex;
  }
</style>
