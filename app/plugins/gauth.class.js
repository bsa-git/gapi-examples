class AuthGoogle {
  /**
   * Constructor
   * Creates an instance of AuthGoogle.
   * @param {Object} An object of param settings.
   *
   * @memberOf AuthGoogle
   */
  constructor (params) {
    this.debug = !!params.debug
    this.directAccess = false
    this.gapiUrl = 'https://apis.google.com/js/platform.js' // 'https://apis.google.com/js/api:client.js'
    // Config
    this.config = null
    if (typeof params === 'object') {
      this.config = Object.assign(params, {scope: 'profile email https://www.googleapis.com/auth/plus.login'})
    }
  }

  load () {
    const self = this
    return new Promise(function (resolve, reject) {
      if (window.gapi === undefined) {
        self._installClient().then(function () {
          if (self.debug) {
            console.log('loadGoogleAPI - OK')
          }
          return self._initClient()
        }).then(function () {
          if (self.debug) {
            console.log('apiGoogle.init - OK')
          }
          resolve()
        })
      } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
        self._initClient().then(function () {
          if (self.debug) {
            console.log('apiGoogle.init - OK')
          }
          resolve()
        })
      }
    })
  }

  directAccess () {
    this.directAccess = true
  }

  signIn (successCallback, errorCallback) {
    const self = this
    if (this.directAccess) {
      window.gapi.auth2.getAuthInstance().signIn().then(function (googleUser) {
        if (self.debug) {
          console.log('authGoogle.signIn - OK: ', googleUser)
        }
        successCallback(googleUser)
      }, function (error) {
        errorCallback(error)
      })
    } else {
      window.gapi.auth2.getAuthInstance().grantOfflineAccess({'redirect_uri': 'postmessage'}).then(function (response) {
        if (self.debug) {
          console.log('authGoogle.signIn - OK: ', response)
        }
        successCallback(response.code)
      }, function (error) {
        errorCallback(error)
      })
    }
  }

  signOut (successCallback, errorCallback) {
    const self = this
    window.gapi.auth2.getAuthInstance().signOut().then(function () {
      if (self.debug) {
        console.log('authGoogle.signOut - OK')
      }
      successCallback()
    }, function (error) {
      errorCallback(error)
    })
  }

  isSignedIn () {
    return window.gapi.auth2.getAuthInstance().isSignedIn.get()
  }

  listenSignedIn (onSigninStatus) {
    // Listen for sign-in state changes.
    if (this.debug) {
      console.log('listenSignedIn - OK')
    }
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(onSigninStatus)
  }

  _installClient () {
    const self = this
    return new Promise(function (resolve, reject) {
      const script = document.createElement('script')
      script.src = self.gapiUrl
      script.onreadystatechange = script.onload = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          setTimeout(function () {
            resolve()
          }, 500)
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }

  _initClient () {
    const self = this
    return new Promise(function (resolve, reject) {
      window.gapi.load('auth2', function () {
        window.gapi.auth2.init(self.config)
        resolve()
      })
    })
  }
}

export default AuthGoogle
