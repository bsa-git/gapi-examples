// Global values for application"
export default {
  debug: false,
  gapi: {
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    services: {
      auth: {
        test: {
          token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmN2RjZjY2YjUwZDZiZGExMTgwYjcwNjdlYzhhZTlhNDhjYzU2YTQifQ...',
          user: {
            id: '12345678901234567890',
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
          all: [
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
          list: [
            'https://www.googleapis.com/auth/gmail.readonly'
          ],
          send: [
            'https://www.googleapis.com/auth/gmail.send'
          ]
        }
      }
    }
  }
}
