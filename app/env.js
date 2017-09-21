// The values in the configuration files "config/env/"
// will be overwritten by the values of "env.js" file
export default {
  app_env: 'testing', // development, production, testing
  global: {
    debug: true,
    maintenance: false,
    gapi: {
      apiKey: 'AIzaSyAks3ZH_qSivh8UhA0V94Cy_60Q_-W524Y',
      clientId: '311979767912-l8upval51s4evdt43gonavi99ucjbpkg.apps.googleusercontent.com'
    },
    personal_data: {
      app_title: 'BSA',
      logo_title: 'BSA Lab.',
      logo_icon: 'check_circle',
      logo_img: '/img/system/my-img_cr.jpg',
      my_img: '/img/system/my-img.jpg',
      copyright: '© 2017 Сергей Бескоровайный',
      designed_with: 'BSA Lab Studio',
      designed_with_url: 'http://bsa-git.github.io/',
      contact: {
        address: 'Черкассы, Украина, 18029',
        phone: '+380 98 002 9369',
        email: 'bs261257@gmail.com',
        website: 'http://bsa-git.github.io/'
      },
      twitter: {url: 'https://twitter.com/bsa2657', tag: '@bsa2657'},
      socials: {
        facebook: {url: 'https://www.facebook.com/profile.php?id=100010324420196', icon: 'fa-facebook'},
        twitter: {url: 'https://twitter.com/bsa2657', icon: 'fa-twitter'},
        google: {url: 'https://plus.google.com/110341449488589699610?rel=author', icon: 'fa-google-plus'},
        skype: {url: 'bsa_home', icon: 'fa-skype'}
      }
    }
  },
  production: {
    api: {
      base_url: 'http://real-production.com/api'
    }
  },
  development: {
    api: {
      base_url: 'http://real-development.com/api'
    }
  },
  testing: {
    api: {
      base_url: 'http://real-testing.com/api'
    }
  }
}
