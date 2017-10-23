<template>
  <section class="container">
    <!-- Page Title and description -->
    <div class="text-center">
      <h2>{{ title }}</h2>
      <!--<p class="lead">{{ description }}</p>-->
    </div>
    <!-- Short description -->
    <div class="bs-callout-info bs-callout">
      <h4>Get a Google Account</h4>
      <p>To test Google services you need to have an Google Account.</p>
      <p>First, <a href="https://www.google.com/accounts" target="_blank">sign up</a> for a
        Google Account if you do not already have one.
      </p>
    </div>
    <!-- Page content -->
    <div class="jumbotron well text-center">
      <!-- Loading -->
      <div v-show="loading" class="text-danger lead"><p>{{loading}}...</p></div>
      <!-- Errors -->
      <div v-show="response" class="text-danger lead"><p>{{response}}</p></div>

      <!-- login Buttons -->
      <div class="auth-btns">
        <div v-if="isAuth">
          <p>You are currently signed in and have granted access to this app.</p>
          <br/>
          <a class="button--grey" v-on:click="signOut"><span class="glyphicon glyphicon-log-out"
                                                             aria-hidden="true"></span>
            Sign out</a>
          <a class="button--grey" v-on:click="disconnect"><span class="glyphicon glyphicon-remove"
                                                                aria-hidden="true"></span> Revoke access</a>
          <a class="button--grey" v-on:click="addScope"><span class="glyphicon glyphicon-plus"
                                                              aria-hidden="true"></span> Add scope</a>
        </div>
        <div v-else>
          <p>You have not authorized this app or you are signed out.</p>
          <br/>
          <a class="button--green" v-on:click="signIn"><span class="glyphicon glyphicon-log-in"
                                                             aria-hidden="true"></span> Sign In/Authorize</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import _ from 'lodash'
  import { mapGetters } from 'vuex'
  import AuthGoogle from '~/plugins/gauth.class'

  export default {
    data: function () {
      return {
        title: 'Login/Logout Google User',
        description: 'Handling Google sign-in and sign-out.',
        loading: '',
        response: ''
      }
    },
    head () {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
        link: []
      }
    },
    created: function () {
      if (!this.$isServer && this.config.debug) {
        console.log('login.created - OK')
      }
      if (!this.$isServer && (this.authGoogle === null)) {
        const params = {
          debug: this.config.debug
        }
        this.$store.commit('SET_GOOGLE_API', new AuthGoogle(params))
      }
    },
    mounted: function () {
      if (this.config.debug) {
        console.log('login.mounted - OK')
      }
      // Load/Init Google API
      if (this.isStatic) {
        const people = this.config.gapi.services.people
        const gmail = this.config.gapi.services.gmail
        const discoveryDocs = _.concat(people.discoveryDocs, gmail.discoveryDocs)
        const scope = _.concat(people.scopes['get'], people.scopes['connections'], gmail.scopes['messages.list.send']).join(' ')
        const params = {
          apiKey: this.config.gapi.apiKey,
          clientId: this.config.gapi.clientId,
          discoveryDocs: discoveryDocs,
          scope: scope
        }
        // this.authGoogle.loadAuth(params)
        this.authGoogle.loadClient(params)
          .then(() => {
            if (this.config.debug) {
              console.log('authGoogle.load - OK')
            }
            // Synchronization of the real state of signed in with Google
            // with the internal state of the signed in in store.
            // Sometimes such synchronization may result in the issuing of an error due to the prohibition
            // of the appearance of pop-up windows. Whatever happens, you need to allow the appearance
            // of a pop-up window, because while the connection to Google
            if (this.authGoogle.isSignedIn() !== this.isAuth) {
              this.signIn()
            }
          })
      } else {

      }
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        isAuth: 'isAuth',
        authGoogle: 'getGapi',
        isStatic: 'isStatic'
      })
    },
    methods: {
      signIn: function () {
        const self = this
        this.toggleLoading()
        if (this.isStatic) {
          window.setTimeout(function () {
            self.authGoogle.signIn(self.onSignInSuccess, self.onSignInError)
          }, 1000)
        } else {
          window.setTimeout(function () {
            self.onSignInSuccess(self.config.gapi.services.auth.test)
          }, 1000)
        }
      },
      signOut: function () {
        const self = this
        this.toggleLoading()
        if (this.isStatic) {
          window.setTimeout(function () {
            self.authGoogle.signOut(self.onSignOutSuccess, self.onSignOutError)
          }, 1000)
        } else {
          window.setTimeout(function () {
            self.onSignOutSuccess()
          }, 1000)
        }
      },
      disconnect: function () {
        const self = this
        if (this.isStatic) {
          window.setTimeout(function () {
            self.authGoogle.disconnect()
            self.onDisconnect()
          }, 1000)
        } else {
          window.setTimeout(function () {
            self.onDisconnect()
          }, 1000)
        }
      },
      addScope: function () {
        const self = this
        if (this.isStatic) {
          window.setTimeout(function () {
            self.authGoogle.addScope('https://www.googleapis.com/auth/drive', self.onAddScopeSuccess, self.onAddScopeError)
              .then(function () {

              })
          }, 1000)
        } else {
          window.setTimeout(function () {
            self.onAddScopeSuccess(self.config.gapi.services.auth.test.user)
          }, 1000)
        }
      },
      onSignInSuccess: function (googleUser) {
        let userInfo = {}
        let idToken = ''
        // -------------------
        this.toggleLoading()
        this.resetResponse()
        if (this.isStatic) {
          // Get UserId Token
          idToken = googleUser.getAuthResponse().id_token
          // Get UserInfo
          const profile = googleUser.getBasicProfile()
          userInfo.id = profile.getId()
          userInfo.fullName = profile.getName()
          userInfo.givenName = profile.getGivenName()
          userInfo.familyName = profile.getFamilyName()
          userInfo.imageURL = profile.getImageUrl()
          userInfo.email = profile.getEmail()
        } else {
          idToken = googleUser.token
          userInfo = googleUser.user
        }

        // Save to vuex
        this.$store.commit('SET_TOKEN', idToken)
        this.$store.commit('SET_USER', userInfo)

        if (this.config.debug) {
          console.log('CurrentUser.info: ', userInfo)
          console.log('CurrentUser.token: ' + idToken)
        }

        // redirect to the home
        this.$router.push('/')
      },
      onSignInError: function (error) {
        this.toggleLoading()

        this.response = 'Failed to sign-in'
        console.log('GOOGLE SERVER - SIGN-IN ERROR', error)
      },
      onSignOutSuccess: function () {
        this.toggleLoading()
        this.resetResponse()

        // Save to vuex
        this.$store.commit('SET_TOKEN', null)
        this.$store.commit('SET_USER', null)

        // redirect to the home
        this.$router.push('/')
      },
      onSignOutError: function (error) {
        this.toggleLoading()

        this.response = 'Failed to sign-out'
        console.log('GOOGLE SERVER - SIGN-OUT ERROR', error)

        // redirect to the home
        this.$router.push('/')
      },
      onDisconnect: function () {
        // Save to vuex
        this.$store.commit('SET_TOKEN', null)
        this.$store.commit('SET_USER', null)

        // redirect to the home
        this.$router.push('/')
      },
      onAddScopeSuccess: function (googleUser) {
        if (this.isStatic) {
          this.response = `Success to add-scope for UserId=${googleUser.getId()}`
        } else {
          this.response = `Success to add-scope for UserId=${googleUser.id}`
        }
      },
      onAddScopeError: function (error) {
        this.response = 'Failed to add-scope'
        console.log('GOOGLE SERVER - ADD-SCOPE ERROR', error)
      },

      toggleLoading: function () {
        this.loading = (this.loading === '') ? this.isAuth ? 'Logout' : 'Login' : ''
      },
      resetResponse: function () {
        this.response = ''
      }
    }
  }
</script>

<style>
  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>
