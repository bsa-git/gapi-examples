// Global values for application"
export default {
  debug: false,
  gapi: {
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    clientId: 'xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
    services: {
      auth: {
        test: {
          token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjNmN2RjZjY2YjUwZDZiZGExMTgwYjcwNjdlYzhhZTlhNDhjYzU2YTQifQ.' +
          'eyJhenAiOiIzMTE5Nzk3Njc5MTItbDh1cHZhbDUxczRldmR0NDNnb25hdmk5OXVjamJwa2cuYXBwcy5nb29nbGV1c2VyY2' +
          '9udGVudC5jb20iLCJhdWQiOiIzMTE5Nzk3Njc5MTItbDh1cHZhbDUxczRldmR0NDNnb25hdmk5OXVjamJwa2cuYXBwcy5n' +
          'b29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAzNDE0NDk0ODg1ODk2OTk2MTAiLCJlbWFpbCI6ImJzMjYxMjU3QG' +
          'dtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidFJHYzc3dEVhb2J6WThWd3E2dWx5USIsImlz' +
          'cyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJqdGkiOiI2NDQxOTIxMzAwYjY0OGQ3ZmZmZWNjMGMxNWRhNmQwZjc2MGRmND' +
          'A2IiwiaWF0IjoxNTA4NzUwNTk5LCJleHAiOjE1MDg3NTQxOTksIm5hbWUiOiLQodC10YDQs9C10Lkg0JHQtdGB0LrQvtGA' +
          '0L7QstCw0LnQvdGL0LkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1YWWR6WlNLYj' +
          'Qxay9BQUFBQUFBQUFBSS9BQUFBQUFBQUFNcy9kMlItVWRWVWt2MC9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoi' +
          '0KHQtdGA0LPQtdC5IiwiZmFtaWx5X25hbWUiOiLQkdC10YHQutC-0YDQvtCy0LDQudC90YvQuSIsImxvY2FsZSI6InJ1In' +
          '0.Jap4y07R_b5m0noVx96Pkg3K3ss3h3Q9Gw7Z3PTpDYtIvQbO0Hwg04FkF3Nmz_Dpd3M0gc3wu4ePxOgyv6_rdtTWtewQ' +
          'Qf5MpHI-JQcLu83I94SXe-I9FwH4QCuAiMLoZGwSnkWCHjCLw_o-aZ-Ynlm9rWXuhyRMlbs-u8EJ3gXeR0eT6vw1P7NGIF' +
          '8YzQDzay8vMfKY-CKBbfcDnaP8IL46EWUDR-9QYsKHL-WQcynB7LAp0K-tCRI5z0VWDxIYdBXv_MvOf69f21wSTtIkXfXp' +
          '-ZH18xv8d-r0-t3BRTOWLGIknhB1HYN0FNmB58DoMaluVolMw5rqoNcP-_E5QA',
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
