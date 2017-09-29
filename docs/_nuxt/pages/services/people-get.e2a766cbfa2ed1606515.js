webpackJsonp([4],{KEe9:function(e,t,i){"use strict";var o=i("Dd8w"),n=i.n(o),s=i("NYxO"),a=i("WSyU");t.a={data:function(){return{title:"Method: people.get",description:"Provides information about a person by specifying a resource name",isSignedIn:!1}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},fetch:function(e){var t=(e.store,e.isClient),i=e.config;t&&i.debug&&(console.log("people-get.fetch - OK."),location.reload(!0))},created:function(){!this.$isServer&&this.config.debug&&(console.log("people-get.created - OK"),this.$store.commit("SET_GOOGLE_API",new a.a({debug:this.config.debug})))},mounted:function(){this.$nextTick(function(){var e=this;this.config.debug&&console.log("people-get.mounted - OK"),this.google.loadedClient?this.runPeopleGet():this.google.api.loadGoogleAPI().then(function(){return e.config.debug&&console.log("loadGoogleAPI - OK"),e.google.api.loadGapiClient()}).then(function(){e.config.debug&&console.log("loadGapiClient - OK"),e.$store.commit("SET_LOADED_GOOGLE_CLIENT"),e.runPeopleGet()})})},computed:n()({},Object(s.mapGetters)({config:"getConfig",google:"getGapi"})),methods:{updateSigninStatus:function(e){this.config.debug&&console.log("updateSigninStatus - OK: ","isSignedIn="+e+"; "),this.isSignedIn=e,e&&this.$store.dispatch("receivePeopleMyNames")},runPeopleGet:function(){var e=this;return this.google.api.iniGapiClient({apiKey:this.config.gapi.apiKey,clientId:this.config.gapi.clientId,discoveryDocs:this.config.gapi.services.people.discoveryDocs,scope:this.config.gapi.services.people.scopes.get}).then(function(){e.config.debug&&console.log("iniGapiClient - OK");var t=e.updateSigninStatus.bind(e);e.google.api.listenSignedIn(t),e.updateSigninStatus(e.google.api.isSignedIn())})}}}},WmRc:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",[i("div",{staticClass:"text-center"},[i("h2",[e._v(e._s(e.title))]),i("p",{staticClass:"lead"},[e._v(e._s(e.description))])]),e._m(0),i("div",{staticClass:"jumbotron text-center"},[e.isSignedIn?i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.google.api.handleSignoutClick}},[e._v("Sign Out\n    ")]):i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.google.api.handleAuthClick}},[e._v("Authorize")]),e.isSignedIn?i("div",{staticClass:"lead"},[e._v("Hellow "+e._s(e.google.people_my.names.givenName)+"!")]):e._e()])])},n=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bs-callout-info bs-callout"},[i("h4",[e._v("Method: people.get")]),i("p",[e._v("\n      Provides information about a person by specifying a resource name. Use "),i("code",[e._v("people/me")]),e._v(" to indicate the\n      authenticated user. "),i("br"),e._v(" The request throws a 400 error if 'personFields' is not specified.\n    ")]),i("strong",[e._v("HTTP request")]),i("p",[i("code",[e._v("GET https://people.googleapis.com/v1/{resourceName=people/*}")])]),i("p",[e._v("The URL uses "),i("a",{attrs:{href:"https://github.com/googleapis/googleapis/blob/master/google/api/http.proto",target:"_blank"}},[e._v("Google API HTTP annotation")]),e._v(" syntax.")]),i("p",{staticClass:"lead"},[e._v("Details can be found "),i("a",{attrs:{href:"https://developers.google.com/people/api/rest/v1/people/get",target:"_blank"}},[e._v("here")]),e._v(".")])])}],s={render:o,staticRenderFns:n};t.a=s},"f/os":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("KEe9"),n=i("WmRc"),s=i("VU/8"),a=s(o.a,n.a,null,null,null);t.default=a.exports}});
//# sourceMappingURL=people-get.e2a766cbfa2ed1606515.js.map