import _ from 'lodash'
import config from '~/config/env/index'

// --- Google Gmail API --- //

const getMyMessages = function () {
  let arrPromises = []
  return new Promise((resolve, reject) => {
    _getMyMessagesList()
      .then(list => {
        _.forEach(list, function (item) {
          arrPromises.push(_getMessageForId(item.id))
        })
        const allPromises = Promise.all(arrPromises)
        resolve(allPromises)
      })
  })
}

const _getMyMessagesList = function () {
  // Execute this request for 'gmail.users.messages.list'
  const request = window.gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'labelIds': 'INBOX',
    'maxResults': 10
  })
  return new Promise((resolve, reject) => {
    request.execute(function (response) {
      if (config.debug) {
        console.log('api.gmail.users.messages.list - Executed: ', response.messages)
      }
      resolve(response.messages)
    })
  })
}

const _getMessageForId = function (id) {
  let _message = {}
  // Execute this request for 'gmail.users.messages.get'
  const messageRequest = window.gapi.client.gmail.users.messages.get({
    'userId': 'me',
    'id': id
  })
  return new Promise((resolve, reject) => {
    messageRequest.execute(message => {
      // Parsing  message
      _message.id = message.id
      _message.from = _getHeader(message.payload.headers, 'From')
      _message.subject = _getHeader(message.payload.headers, 'Subject')
      _message.date = _getHeader(message.payload.headers, 'Date')
      _message.reply_to = _getHeader(message.payload.headers, 'Reply-to')
      _message.message_id = _getHeader(message.payload.headers, 'Message-ID')
      // _message.body = _getBody(message.payload)
      if (config.debug) {
        console.log('api.gmail.users.messages.get - Executed: ', _message)
      }
      resolve(_message)
    })
  })
}

const _getHeader = function (headers, index) {
  let headerValue = ''
  _.forEach(headers, function (header) {
    if (header.name.toLowerCase() === index.toLowerCase()) {
      headerValue = header.value
    }
  })
  return headerValue
}

const _getBody = function (message) {
  var encodedBody = ''
  if (typeof message.parts === 'undefined') {
    encodedBody = message.body.data
  } else {
    encodedBody = getHTMLPart(message.parts)
  }
  encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')
  try {
    const result = decodeURIComponent(_.escape(window.atob(encodedBody)))
    return result
  } catch (error) {
    console.error('apiGmail._getBody - Error', error)
  }
}

const getHTMLPart = function (arr) {
  for (let x = 0; x <= arr.length; x++) {
    if (typeof arr[x].parts === 'undefined') {
      if (arr[x].mimeType === 'text/html') {
        return arr[x].body.data
      }
    } else {
      return getHTMLPart(arr[x].parts)
    }
  }
  return ''
}

export default {
  getMyMessages
}
