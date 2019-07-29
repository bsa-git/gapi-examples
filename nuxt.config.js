module.exports = {
  srcDir: 'app/',
  router: {
    base: '/gapi-examples/', // /gapi-examples/ or '/'
    middleware: 'ini-app'
  },
  generate: {
    dir: 'docs'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Gapi Examples',
    meta: [
      { charset: 'utf-8' },
      { 'http-equi': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Examples Google API' },
      { name: 'author', content: 'bsa-git <bsa2657@yandex.ru>' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/favicon.ico' },
      // Bootstrap core CSS
      {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css', integrity: 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u', crossorigin: 'anonymous'},
      // Bootstrap theme
      {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css', integrity: 'sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp', crossorigin: 'anonymous'},
      // Custom style
      {rel: 'stylesheet', href: '/assets/css/style.css'}
    ],
    script: [
      // JQuery
      {src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'},
      // Bootstrap
      {src: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', integrity: 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa', crossorigin: 'anonymous'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    devtool: 'eval-source-map', // eval-source-map inline-source-map
    vendor: [
      'lodash'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    // {src: '~assets/css/style.css'}
  ]
}
