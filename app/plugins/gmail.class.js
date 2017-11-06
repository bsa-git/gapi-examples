import _ from 'lodash'
import config from '~/config/env/index'
import Coder from '~/plugins/coder.class'

class GMail {
  /**
   * Constructor
   * @param options
   */
  constructor (options) {
    this._options = options || {}
  }

  /**
   * Send email
   * @param params
   * etc.{
      to: my@test.com,
      subject: Request for my resume from the employer,
      message: 'My Message!',
      callback: function () {
            ....
        }
   * }
   */
  send (params) {
    try {
      const headers = {
        'To': params.to,
        'Subject': params.subject,
        'Content-Type': 'text/html; charset="UTF-8"'
      }

      let email = ''
      _.forEach(headers, function (value, key) {
        email += `${key}: ${value}` + '\r\n'
      })

      email += '\r\n' + params.message
      const base64EncodedEmail = Coder.b64UrlEncodeUnicode(email)
      const sendRequest = window.gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
          'raw': base64EncodedEmail
        }
      })
      sendRequest.execute(params.callback)
    } catch (e) {
      throw e
    }
  }

  /**
   * Get inbox messages
   * @param params
   * etc. {
      userId: 'me',
      labelIds: 'INBOX',
      maxResults: 10
   * }
   * @return {Promise}
   */
  getInbox (params) {
    const self = this
    let arrPromises = []
    return new Promise((resolve, reject) => {
      this._getMyMessagesList(params)
        .then(list => {
          _.forEach(list, function (item) {
            arrPromises.push(self._getMessageForId(item.id, params.userId))
          })
          const allPromises = Promise.all(arrPromises)
          resolve(allPromises)
        })
    })
  }

  _getMyMessagesList (params) {
    // Execute this request for 'gmail.users.messages.list'
    const request = window.gapi.client.gmail.users.messages.list(params)
    return new Promise((resolve, reject) => {
      request.execute(function (response) {
        if (config.debug) {
          console.log('api.gmail.users.messages.list - Executed: ', response.messages)
        }
        resolve(response.messages)
      })
    })
  }

  _getMessageForId (id, userId) {
    const self = this
    let _message = {}
    // Execute this request for 'gmail.users.messages.get'
    const messageRequest = window.gapi.client.gmail.users.messages.get({
      'userId': userId,
      'id': id
    })
    return new Promise((resolve, reject) => {
      messageRequest.execute(message => {
        // Parsing  message
        _message.id = message.id
        _message.from = self._getHeader(message.payload.headers, 'From')
        _message.subject = self._getHeader(message.payload.headers, 'Subject')
        _message.date = self._getHeader(message.payload.headers, 'Date')
        _message.reply_to = self._getHeader(message.payload.headers, 'Reply-to')
        _message.message_id = self._getHeader(message.payload.headers, 'Message-ID')
        _message.body = self._getBody(message.payload)
        if (config.debug) {
          console.log('api.gmail.users.messages.get - Executed: ', _message)
        }
        resolve(_message)
      })
    })
  }

  _getHeader (headers, index) {
    let headerValue = ''
    _.forEach(headers, function (header) {
      if (header.name.toLowerCase() === index.toLowerCase()) {
        headerValue = header.value
      }
    })
    return headerValue
  }

  _getBody (message) {
    // const self = this
    var encodedBody = ''
    try {
      if (typeof message.parts === 'undefined') {
        encodedBody = message.body.data
      } else {
        encodedBody = this._getHTMLPart(message.parts)
      }
      return Coder.b64UrlDecodeUnicode(encodedBody)
    } catch (error) {
      console.error('apiGmail._getBody - Error', error)
      throw error
    }
  }

  _getHTMLPart (arr) {
    // const self = this
    for (let x = 0; x <= arr.length; x++) {
      if (typeof arr[x].parts === 'undefined') {
        if (arr[x].mimeType === 'text/html') {
          return arr[x].body.data
        }
      } else {
        return this._getHTMLPart(arr[x].parts)
      }
    }
    return ''
  }
}

export default GMail
