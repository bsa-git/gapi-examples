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
  import { mapGetters } from 'vuex'

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
    computed: {
      ...mapGetters({
        config: 'getConfig',
        isAuth: 'isAuth',
        authGoogle: 'getGapi',
        isTesting: 'isTesting'
      })
    },
    methods: {
      signIn: function () {
        const self = this
        this.toggleLoading()
        if (!this.isTesting) {
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
        if (!this.isTesting) {
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
        if (!this.isTesting) {
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
        if (!this.isTesting) {
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
        // -------------------
        this.toggleLoading()
        this.resetResponse()
        // Get UserInfo
        if (!this.isTesting) {
          userInfo = this.authGoogle.getCurrentUserInfo()
        } else {
          userInfo = googleUser.user
          userInfo.token = googleUser.token
        }

        // Save to vuex
        this.$store.commit('SET_TOKEN', userInfo.token)
        this.$store.commit('SET_USER', userInfo)

        if (this.config.debug) {
          console.log('CurrentUser.info: ', userInfo)
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
        if (!this.isTesting) {
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
