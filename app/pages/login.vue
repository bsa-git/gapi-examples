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
          <br />
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
          <br />
          <a class="button--green" v-on:click="signIn"><span class="glyphicon glyphicon-log-in"
                                                                    aria-hidden="true"></span> Sign In/Authorize</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AuthGoogle from '~/plugins/gauth.class'

  export default {
    data: function () {
      return {
        title: 'Login/Logout Google User',
        description: 'Handling Google sign-in and sign-out.',
        // authGoogle: null,
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
      if (!this.$isServer) {
        const params = {
          debug: this.config.debug,
          clientId: this.config.gapi.clientId
        }
        this.authGoogle = new AuthGoogle(params)
      }
    },
    mounted: function () {
      if (this.config.debug) {
        console.log('login.mounted - OK')
      }
      // Load/Init Google API
      if (this.isStatic) {
        this.authGoogle.loadAuth()
          .then(() => {
            if (this.config.debug) {
              console.log('authGoogle.load - OK')
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
            self.onSignInSuccess(self.config.gapi.services.auth.testAuthorizationCode)
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
            self.onAddScopeSuccess('AddScopeSuccess')
          }, 1000)
        }
      },
      onSignInSuccess: function (googleUser) {
        this.toggleLoading()
        this.resetResponse()

        // Get UserId
        const user_id = googleUser.getId()

        // Save to local storage as well
        if (window.localStorage) {
          window.localStorage.setItem('token', user_id)
        }

        // Save to vuex
        this.$store.commit('SET_TOKEN', user_id)

        // Get UserId Token and UserInfo
        if (this.authGoogle.isCurrentUser()) {
          const id_token = this.authGoogle.currentUser.getAuthResponse().id_token
          console.log('CurrentUser - Token: ' + id_token)
          const profile = this.authGoogle.currentUser.getBasicProfile()
          console.log('ID: ' + profile.getId())
          console.log('Full Name: ' + profile.getName())
          console.log('Given Name: ' + profile.getGivenName())
          console.log('Family Name: ' + profile.getFamilyName())
          console.log('Image URL: ' + profile.getImageUrl())
          console.log('Email: ' + profile.getEmail())
        }
      },
      onSignInError: function (error) {
        this.response = 'Failed to sign-in'
        console.log('GOOGLE SERVER - SIGN-IN ERROR', error)
      },
      onSignOutSuccess: function () {
        this.toggleLoading()
        this.resetResponse()

        // Save to local storage as well
        if (window.localStorage) {
          // Synchronize local storage and vuex
          if (!this.$store.state.auth.token) {
            const token = window.localStorage.getItem('token')
            this.$store.commit('SET_TOKEN', token)
          }
          window.localStorage.setItem('token', null)
        }

        // Save to vuex
        this.$store.commit('SET_TOKEN', null)

        // redirect to the dashboard
        // this.$router.push({ name: 'home' })
      },
      onSignOutError: function (error) {
        this.response = 'Failed to sign-out'
        console.log('GOOGLE SERVER - SIGN-OUT ERROR', error)
      },
      onDisconnect: function () {
        // this.toggleLoading()
        // this.resetResponse()

        // Save to local storage as well
        if (window.localStorage) {
          // Synchronize local storage and vuex
          if (!this.$store.state.auth.token) {
            const token = window.localStorage.getItem('token')
            this.$store.commit('SET_TOKEN', token)
          }
          window.localStorage.setItem('token', null)
        }

        // Save to vuex
        this.$store.commit('SET_TOKEN', null)
      },
      onAddScopeSuccess: function (googleUser) {
        // Get UserId
        const user_id = googleUser.getId()
        this.response = `Success to add-scope for UserId=${user_id}`
      },
      onAddScopeError: function (error) {
        this.response = 'Failed to add-scope'
        console.log('GOOGLE SERVER - ADD-SCOPE ERROR', error)
      },
      onCurrentUser: function (currentUser) {
        if (this.config.debug) {
          console.log('authGoogle.CurrentUser.id:', currentUser.getId())
          if (currentUser.getId()) {
            const profile = currentUser.getBasicProfile()
            console.log('CurrentUser - ID: ' + profile.getId())
            console.log('CurrentUser - Name: ' + profile.getName())
            console.log('CurrentUser - Image URL: ' + profile.getImageUrl())
            console.log('CurrentUser - Email: ' + profile.getEmail())
          }
        }
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
