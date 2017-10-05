import _ from 'lodash'
import config from '~/config/env/index'

// --- Google Gmail API --- //

const getGmailMyMessages = function () {
  let myMessages = []
  // -------------------
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
      const id = response.messages[0].id
      const params = {'userId': 'me', 'id': id}
      if (config.debug) {
        console.log('api.gmail.users.messages.get - params: ', params)
      }
      const messageRequest = window.gapi.client.gmail.users.messages.get(params)
      messageRequest.execute(message => {
        myMessages.push(message)
        if (config.debug) {
          console.log('api.gmail.users.messages.get - Executed: ', message)
        }
      })

      /*
      _.forEach(response.messages, function (msg) {
        // Execute this request for 'gmail.users.messages.get'
        const messageRequest = window.gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': msg.id
        })
        messageRequest.execute(message => {
          myMessages.push(message)
          if (config.debug) {
            console.log('api.gmail.users.messages.get - Executed: ', `Message.id=${message.id}`)
          }
        })
      })
      */
      resolve(myMessages)
    })
  })
}

/*
const getGmailMyMessages = function () {
  // Execute this request for 'gmail.users.messages.list'
  const request = window.gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'labelIds': 'INBOX',
    'maxResults': 10
  })
  request.execute(function (response) {
    if (config.debug) {
      console.log('api.gmail.users.messages.list - Executed: ', `Messages=${response.messages};`)
    }
    _.forEach(response.messages, function (message) {
      // Execute this request for 'gmail.users.messages.get'
      const messageRequest = window.gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': message.id
      })
      messageRequest.execute(_appendMessageRow)
    })
  })
}

const getGmailMyMessages = function () {
  // Execute this request for 'gmail.users.messages.list'
  const request = window.gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'labelIds': 'INBOX',
    'maxResults': 10
  })
  return new Promise((resolve, reject) => {
    request.execute(resolve)
      .then(response => {
        if (config.debug) {
          console.log('api.gmail.users.messages.list - Executed: ', response.messages)
        }
        return new Promise((resolve, reject) => {
          let myMessages = []
          _.forEach(response.messages, function (msg) {
            // Execute this request for 'gmail.users.messages.get'
            const messageRequest = window.gapi.client.gmail.users.messages.get({
              'userId': 'me',
              'id': msg.id
            })
            messageRequest.execute(message => {
              myMessages.push(message)
              if (config.debug) {
                console.log('api.gmail.users.messages.get - Executed: ', message)
              }
            })
          })
          resolve(myMessages)
        })
      })
  })
}

const _appendMessageRow = function (message) {
  if (config.debug) {
    console.log('api.gmail.users.messages.get - Executed: ', `Message=${message};`)
  }
  return message
}
*/
export default {
  getGmailMyMessages
}
