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
    this.gapiUrl = 'https://apis.google.com/js/api:client.js'
    // Config
    this.config = null
    if (typeof params === 'object') {
      this.config = Object.assign(params, {scope: 'profile email https://www.googleapis.com/auth/plus.login'})
    }
  }

  load () {
    return new Promise(function (resolve, reject) {
      if (window.gapi === undefined) {
        this._installClient().then(function () {
          if (this.debug) {
            console.log('loadGoogleAPI - OK')
          }
          return this._initClient()
        }).then(function () {
          if (this.debug) {
            console.log('apiGoogle.init - OK')
          }
          resolve()
        })
      } else if (window.gapi !== undefined && window.gapi.auth2 === undefined) {
        this._initClient().then(function () {
          if (this.debug) {
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
    if (this.directAccess) {
      window.gapi.auth2.getAuthInstance().signIn().then(function (googleUser) {
        successCallback(googleUser)
      }, function (error) {
        errorCallback(error)
      })
    } else {
      window.gapi.auth2.getAuthInstance().grantOfflineAccess({'redirect_uri': 'postmessage'}).then(function (response) {
        successCallback(response.code)
      }, function (error) {
        errorCallback(error)
      })
    }
  }

  signOut (successCallback, errorCallback) {
    window.gapi.auth2.getAuthInstance().signOut().then(function () {
      successCallback()
    }, function (error) {
      errorCallback(error)
    })
  }

  _installClient () {
    return new Promise(function (resolve, reject) {
      const script = document.createElement('script')
      script.src = this.gapiUrl
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
    return new Promise(function (resolve, reject) {
      window.gapi.load('auth2', function () {
        window.gapi.auth2.init(this.config)
        resolve()
      })
    })
  }
}

export default AuthGoogle
