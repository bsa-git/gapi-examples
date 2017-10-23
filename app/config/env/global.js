// Global values for application"
export default {
  debug: false,
  gapi: {
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    services: {
      auth: {
        test: {
          token: 'B-VjETW7nmlWtYDgP5jMLqg-OVO6VZP9LQfECJkjtyw',
          user: {
            id: '1234567890',
            fullName: 'Molly King',
            givenName: 'Molly',
            familyName: 'King',
            imageURL: 'https://test.com/images/user.jpg',
            email: 'user@test.com'
          }
        }
      },
      people: {
        discoveryDocs: [
          'https://people.googleapis.com/$discovery/rest?version=v1'
        ],
        scopes: {
          get: ['profile'],
          connections: ['https://www.googleapis.com/auth/contacts.readonly']
        }
      },
      gmail: {
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
        ],
        scopes: {
          'all': [
            'https://mail.google.com/',
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.compose',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/gmail.insert',
            'https://www.googleapis.com/auth/gmail.labels',
            'https://www.googleapis.com/auth/gmail.modify',
            'https://www.googleapis.com/auth/gmail.metadata',
            'https://www.googleapis.com/auth/gmail.settings.basic',
            'https://www.googleapis.com/auth/gmail.settings.sharing'
          ],
          'messages.list.send': [
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/gmail.send'
          ]
        }
      }
    }
  }
}
