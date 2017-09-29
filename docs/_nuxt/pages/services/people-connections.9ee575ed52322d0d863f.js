webpackJsonp([5],{"9B9w":function(e,t,n){"use strict";var o=n("Dd8w"),i=n.n(o),s=n("Xxa5"),a=n.n(s),c=n("exGp"),l=n.n(c),r=n("NYxO"),p=n("WSyU");t.a={data:function(){return{title:"Method: people.connections.list",description:"Provides a list of the authenticated user's contacts",apiGoogle:null,isSignedIn:!1,myConnections:[]}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},fetch:function(){function e(e){return t.apply(this,arguments)}var t=l()(a.a.mark(function e(t){var n=t.store,o=t.isClient,i=t.config;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o&&null===n.state.google.api&&(i.debug&&o&&console.log("people-connections.fetch - OK."),n.commit("SET_GOOGLE_API",new p.a({debug:i.debug})));case 1:case"end":return e.stop()}},e,this)}));return e}(),mounted:function(){this.$nextTick(function(){var e=this;this.config.debug&&console.log("people-connections.mounted - OK"),this.google.loadedClient?this.runPeopleConnections():this.google.api.loadGoogleAPI().then(function(){return e.config.debug&&console.log("loadGoogleAPI - OK"),e.google.api.loadGapiClient()}).then(function(){e.config.debug&&console.log("loadGapiClient - OK"),e.$store.commit("SET_LOADED_GOOGLE_CLIENT"),e.runPeopleConnections()})})},computed:i()({},Object(r.mapGetters)({config:"getConfig",google:"getGapi"})),methods:{updateSigninStatus:function(e){this.config.debug&&console.log("updateSigninStatus - OK: ","isSignedIn="+e+"; "),this.isSignedIn=e,e&&this.$store.dispatch("receivePeopleMyConnections")},runPeopleConnections:function(){var e=this;return this.google.api.iniGapiClient({apiKey:this.config.gapi.apiKey,clientId:this.config.gapi.clientId,discoveryDocs:this.config.gapi.services.people.discoveryDocs,scope:this.config.gapi.services.people.scopes.connections}).then(function(){e.config.debug&&console.log("iniGapiClient - OK");var t=e.updateSigninStatus.bind(e);e.google.api.listenSignedIn(t),e.updateSigninStatus(e.google.api.isSignedIn())})}}}},TVN9:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("div",{staticClass:"text-center"},[n("h2",[e._v(e._s(e.title))]),n("p",{staticClass:"lead"},[e._v(e._s(e.description))])]),e._m(0),n("div",{staticClass:"jumbotron"},[n("div",{attrs:{"text-center":""}},[e.isSignedIn?n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.google.api.handleSignoutClick}},[e._v("Sign Out")]):n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.google.api.handleAuthClick}},[e._v("Authorize")])]),e.isSignedIn?n("div",{staticClass:"lead",attrs:{id:"content"}},[n("p",{staticClass:"lead"},[e._v("Connections:")]),n("ul",e._l(e.google.people_my.connections,function(t){return n("li",[e._v(e._s(t))])}))]):e._e()])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bs-callout-info bs-callout"},[n("h4",[e._v("Method: people.connections.list")]),n("p",[e._v("\n      Provides a list of the authenticated user's contacts merged with any connected profiles.\n      The request throws a 400 error if 'personFields' is not specified.\n    ")]),n("strong",[e._v("HTTP request")]),n("p",[n("code",[e._v("GET https://people.googleapis.com/v1/{resourceName=people/*}/connections")])]),n("p",[e._v("The URL uses "),n("a",{attrs:{href:"https://github.com/googleapis/googleapis/blob/master/google/api/http.proto",target:"_blank"}},[e._v("Google API HTTP annotation")]),e._v(" syntax.")]),n("p",{staticClass:"lead"},[e._v("Details can be found "),n("a",{attrs:{href:"https://developers.google.com/people/api/rest/v1/people.connections/list",target:"_blank"}},[e._v("here")]),e._v(".")])])}],s={render:o,staticRenderFns:i};t.a=s},gb4K:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("9B9w"),i=n("TVN9"),s=n("VU/8"),a=s(o.a,i.a,null,null,null);t.default=a.exports}});
//# sourceMappingURL=people-connections.9ee575ed52322d0d863f.js.map