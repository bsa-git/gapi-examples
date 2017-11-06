import GMail from '~/plugins/gmail.class'

// --- Google Gmail API --- //
const getMyMessages = function () {
  // let arrPromises = []
  return new Promise((resolve, reject) => {
    const params = {
      userId: 'me',
      labelIds: 'INBOX',
      maxResults: 10
    }
    new GMail().getInbox(params)
      .then(function (allPromises) {
        resolve(allPromises)
      })
  })
}

export default {
  getMyMessages
}
