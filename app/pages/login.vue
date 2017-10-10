<template>
  <section class="container">
    <!-- Page Title and description -->
    <div class="text-center">
      <h2>{{ title }}</h2>
      <!--<p class="lead">{{ description }}</p>-->
    </div>
    <!-- Page content -->
    <div class="jumbotron well text-center">
      <!-- Errors -->
      <div v-if="response" class="text-danger lead"><p>{{response}}</p></div>

      <!-- login Button -->
      <a href="#" v-on:click="signIn" class="button--green"><span class="glyphicon glyphicon-user"
                                                                  aria-hidden="true"></span> Sign in with Google</a>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import AuthGoogle from '~/plugins/gauth.class'

  export default {
    data: function () {
      return {
        title: 'Login Google User',
        description: 'Handling Google sign-in and sign-out.',
        authGoogle: null,
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
        console.log('login.mounted - OK: ', `isStatic=${this.config.isStatic}`)
      }
      // Load/Init Google API
      if (this.config.isStatic) {
        this.authGoogle.load()
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
        google: 'getGapi'
      })
    },
    methods: {
      signIn: function () {
        this.authGoogle.signIn(this.onSignInSuccess, this.onSignInError)
      },
      onSignInSuccess: function (authorizationCode) {
        this.toggleLoading()
        this.resetResponse()
        if (this.config.debug) {
          console.log('onSignInSuccess - OK: ', authorizationCode)
        }
        /*
        // Save to vuex
        var token = 'Bearer ' + data.token
        this.$store.commit('SET_USER', data.user_data)
        this.$store.commit('SET_TOKEN', token)

        // Save to local storage as well
        // ( or you can install the vuex-persistedstate plugin so that you won't have to do this step, only store to Vuex is sufficient )
        if (window.localStorage) {
          window.localStorage.setItem('user', JSON.stringify(data.user_data))
          window.localStorage.setItem('token', token)
        }

        // redirect to the dashboard
        this.$router.push({ name: 'home' })
        */
        /*
        this.$http.post('http://your-backend-server.com/auth/google', { code: authorizationCode, redirect_uri: 'postmessage' }).then(function (response) {
          if (response.body) {
            var data = response.body

            // Save to vuex
            var token = 'Bearer ' + data.token
            this.$store.commit('SET_USER', data.user_data)
            this.$store.commit('SET_TOKEN', token)

            // Save to local storage as well
            // ( or you can install the vuex-persistedstate plugin so that you won't have to do this step, only store to Vuex is sufficient )
            if (window.localStorage) {
              window.localStorage.setItem('user', JSON.stringify(data.user_data))
              window.localStorage.setItem('token', token)
            }

            // redirect to the dashboard
            this.$router.push({ name: 'home' })
          }
        }, function (response) {
          var data = response.body
          this.response = data.error
          console.log('BACKEND SERVER - SIGN-IN ERROR', data)
        })
        */
      },
      onSignInError: function (error) {
        this.response = 'Failed to sign-in'
        console.log('GOOGLE SERVER - SIGN-IN ERROR', error)
      },
      toggleLoading: function () {
        this.loading = (this.loading === '') ? 'loading' : ''
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
