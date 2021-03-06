<template>
  <section class="container">
    <!-- Page Title and description -->
    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>
    <!-- Short description -->
    <div class="bs-callout-info bs-callout">
      <h4>Method: Users.messages: send</h4>
      <div class="alert alert-info"><span class="glyphicon glyphicon-star" aria-hidden="true"></span> <strong
        class="text-primary">Requires authorization</strong></div>
      <p>Sends the specified message to the recipients in the To, Cc, and Bcc headers.</p>
      <p>This method supports an <strong>/upload</strong>
        URI and accepts uploaded media with the following characteristics:</p>
      <ul>
        <li><strong>Maximum file size:</strong> 35MB</li>
        <li><strong>Accepted Media MIME types:</strong>
          <code>message/rfc822</code>
        </li>
      </ul>
      <h4>HTTP request</h4>
      <p>This method provides media upload functionality through two separate URIs. For more details, see the document
        on <a href="https://developers.google.com/gmail/api/guides/uploads" target="_blank">media upload</a>.</p>
      <ul>
        <li>Upload URI, for media upload requests:
          <code>POST https://www.googleapis.com/upload/gmail/v1/users/<span class="text-primary"><strong>userId</strong></span>/messages/send</code>
        </li>
        <li>Metadata URI, for metadata-only requests:
          <code>POST https://www.googleapis.com/gmail/v1/users/<span class="text-primary"><strong>userId</strong></span>/messages/send</code>
        </li>
      </ul>
      <p class="lead">
        Details can be found <a href="https://developers.google.com/gmail/api/v1/reference/users/messages/send"
                                target="_blank">here</a>.</p>
      <p>This example was created on the basis of an <a
        href="https://www.sitepoint.com/sending-emails-gmail-javascript-api/" target="_blank">article</a> written by <a
        href="https://www.sitepoint.com/author/jshields/" target="_blank">Jamie Shields</a>.</p>
    </div>
    <!-- Page content -->
    <div v-show="isShow">
      <h1>Gmail API Send message</h1>
      <!-- Send message button  -->
      <a href="#compose-modal" data-toggle="modal" id="compose-button"
         class="btn btn-primary pull-right">Send Email</a>
      <!-- Send message form  -->
      <div class="modal fade" id="compose-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title">Compose</h4>
            </div>
            <form v-on:submit.prevent="sendEmail">
              <div class="modal-body">
                <div class="form-group">
                  <input v-model.trim="toEmail" type="email" class="form-control" id="compose-to" placeholder="To"
                         required/>
                </div>

                <div class="form-group">
                  <input v-model.trim="subjectEmail" type="text" class="form-control" id="compose-subject"
                         placeholder="Subject" required/>
                </div>

                <div class="form-group">
                        <textarea v-model.trim="textEmail" class="form-control" id="compose-message"
                                  placeholder="Message"
                                  rows="10"
                                  required></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" id="send-button" :class="['btn', 'btn-primary', { disabled: disabled }]">Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GMail from '~/plugins/gmail.class'

  export default {
    middleware: 'authenticated',
    data: function () {
      return {
        title: 'Method: Users.messages.send',
        description: 'Sends the specified message to the recipients in the To, Cc, and Bcc headers.',
        toEmail: '',
        subjectEmail: '',
        textEmail: '',
        disabled: false,
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
    mounted: function () {
      this.$nextTick(function () {
        if (this.config.debug) {
          console.log('gmail-send-message.mounted - OK')
        }
        if (!this.isTesting) {
          if (window.gapi.client.gmail) {
            this.isShow = true
          } else { // Load Gmail Api
            this.apiGoogle.loadGmailApi()
              .then(() => {
                if (this.config.debug) {
                  console.log('loadGmailApi - OK')
                }
                this.isShow = true
              })
          }
        } else {
          this.isShow = true
        }
      })
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        apiGoogle: 'getGapi',
        google: 'getGoogleData',
        isTesting: 'isTesting',
        auth: 'getAuth'
      })
    },
    methods: {
      sendEmail: function () {
        this.disabled = true
        if (!this.isTesting) {
          const params = {
            userId: 'me',
            to: this.toEmail,
            subject: this.subjectEmail,
            message: `<h4><i>Sender: ${this.auth.user.fullName}</i></h4><h3>Message:</h3><p><strong>${this.textEmail}</strong></p>`,
            callback: this.composeTidy
          }
          new GMail().send(params)
        } else {
          window.setTimeout(() => {
            alert(`SendEmail - OK:\n toEmail="${this.toEmail}";\n subjectEmail="${this.subjectEmail}";\n textEmail="${this.textEmail}";`)
            this.composeTidy()
          }, 2000)
        }
      },
      composeTidy: function () {
        // Hide windows
        window.$('#compose-modal').modal('hide')

        if (this.config.debug) {
          console.log('SendEmail - OK: ', `toEmail="${this.toEmail}"; `, `subjectEmail="${this.subjectEmail}"; `, `textEmail="${this.textEmail}";`)
        }
        // Clear form fields
        this.toEmail = ''
        this.subjectEmail = ''
        this.textEmail = ''
        // Set disabled = false
        this.disabled = false
      }
    }
  }
</script>
