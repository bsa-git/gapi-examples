webpackJsonp([4],{GP9S:function(e,t,i){"use strict";var n=i("Dd8w"),o=i.n(n),a=i("NYxO"),s=i("WSyU");t.a={data:function(){return{title:"Method: people.get",description:"Provides information about a person by specifying a resource name",apiGoogle:null,isSignedIn:!1}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},fetch:function(e){var t=e.isClient,i=e.isStatic,n=e.config;t&&n.debug&&console.log("people-get.fetch - OK: ","isStatic="+i+";")},created:function(){if(!this.$isServer&&this.config.debug&&console.log("people-get.created - OK"),!this.$isServer){var e={debug:this.config.debug,apiKey:this.config.gapi.apiKey,clientId:this.config.gapi.clientId,discoveryDocs:this.config.gapi.services.people.discoveryDocs,scope:this.config.gapi.services.people.scopes.get};this.apiGoogle=new s.a(e)}},mounted:function(){this.$nextTick(function(){var e=this;this.config.debug&&console.log("people-get.mounted - OK"),this.isStatic?this.apiGoogle.loadGoogleAPI().then(function(){return e.config.debug&&console.log("loadGoogleAPI - OK"),e.apiGoogle.init()}).then(function(){e.config.debug&&console.log("apiGoogle.init - OK");var t=e.updateSigninStatus.bind(e);e.apiGoogle.listenSignedIn(t),e.updateSigninStatus(e.apiGoogle.isSignedIn())}):this.updateSigninStatus(!0)})},computed:o()({},Object(a.mapGetters)({config:"getConfig",google:"getGapi",isStatic:"isStatic"})),methods:{updateSigninStatus:function(e){this.config.debug&&console.log("updateSigninStatus - OK: ","isSignedIn="+e+"; "),this.isSignedIn=e,e&&this.$store.dispatch("receivePeopleMyNames")}}}},ODT2:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"container"},[i("div",{staticClass:"text-center"},[i("h2",[e._v(e._s(e.title))]),i("p",{staticClass:"lead"},[e._v(e._s(e.description))])]),e._m(0),i("div",{staticClass:"jumbotron text-center well"},[e.isSignedIn?i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){e.apiGoogle.handleSignoutClick(e.apiGoogle)}}},[e._v("\n      Sign Out\n    ")]):i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){e.apiGoogle.handleAuthClick(e.apiGoogle)}}},[e._v("Authorize\n    ")]),e.isSignedIn?i("div",{staticClass:"lead"},[e._v("Hellow "+e._s(e.google.people_my.names.givenName)+"!")]):e._e()])])},o=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bs-callout-info bs-callout"},[i("h4",[e._v("Method: people.get")]),i("p",[e._v("\n      Provides information about a person by specifying a resource name. Use "),i("code",[e._v("people/me")]),e._v(" to indicate the\n      authenticated user. "),i("br"),e._v(" The request throws a 400 error if 'personFields' is not specified.\n    ")]),i("h4",[e._v("HTTP request")]),i("p",[i("code",[e._v("GET https://people.googleapis.com/v1/{resourceName=people/*}")])]),i("p",[e._v("The URL uses "),i("a",{attrs:{href:"https://github.com/googleapis/googleapis/blob/master/google/api/http.proto",target:"_blank"}},[e._v("Google API HTTP annotation")]),e._v(" syntax.")]),i("p",{staticClass:"lead"},[e._v("Details can be found "),i("a",{attrs:{href:"https://developers.google.com/people/api/rest/v1/people/get",target:"_blank"}},[e._v("here")]),e._v(".")])])}],a={render:n,staticRenderFns:o};t.a=a},WSyU:function(e,t,i){"use strict";var n=i("//Fk"),o=i.n(n),a=i("Zrlr"),s=i.n(a),c=i("wxAW"),l=i.n(c),r=function(){function e(t){s()(this,e),this.name="load-google-api",this._callbackName="__googleApiOnLoadCallback",this._clientURL="https://apis.google.com/js/client.js?onload="+this._callbackName,this._apiKey=t.apiKey,this._clientId=t.clientId,this._discoveryDocs=t.discoveryDocs,this._scope=t.scope?t.scope.join(" "):"",this.error=null,this.debug=!!t.debug}return l()(e,[{key:"loadGoogleAPI",value:function(){var e=this;return new o.a(function(t,i){var n=document.createElement("script");n.src=e._clientURL,window[e._callbackName]=function(){t()},document.body.appendChild(n)})}},{key:"init",value:function(){var e=this,t=new o.a(function(e,t){window.gapi.load("client:auth2",e)}),i=new o.a(function(t,i){window.gapi.client.init({apiKey:e._apiKey,clientId:e._clientId,discoveryDocs:e._discoveryDocs,scope:e._scope}).then(t,function(t){e.error=t,console.error("Gapi.client.init - Error",t),alert("Error: "+t.error+"\n Details: "+t.details)})});return o.a.all([t,i])}},{key:"loadGapiClient",value:function(){return new o.a(function(e,t){window.gapi.load("client:auth2",e)})}},{key:"iniGapiClient",value:function(e){var t=this;return new o.a(function(i,n){window.gapi.client.init({apiKey:e.apiKey,clientId:e.clientId,discoveryDocs:e.discoveryDocs,scope:e.scope.join(" ")}).then(i,function(e){t.error=e,console.error("Gapi.client.init - Error",e),alert("Error: "+e.error+"\n Details: "+e.details)})})}},{key:"loadGmailApi",value:function(){return new o.a(function(e,t){window.gapi.client.load("gmail","v1",e)})}},{key:"isSignedIn",value:function(){return window.gapi.auth2.getAuthInstance().isSignedIn.get()}},{key:"listenSignedIn",value:function(e){this.debug&&console.log("listenSignedIn - OK"),window.gapi.auth2.getAuthInstance().isSignedIn.listen(e)}},{key:"handleAuthClick",value:function(e){e.debug&&console.log("handleAuthClick - OK"),window.gapi&&window.gapi.auth2.getAuthInstance().signIn()}},{key:"handleSignoutClick",value:function(e){e.debug&&console.log("handleSignoutClick - OK"),window.gapi&&window.gapi.auth2.getAuthInstance().signOut()}}]),e}();t.a=r},Zrlr:function(e,t,i){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},kkPB:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("GP9S"),o=i("ODT2"),a=i("VU/8"),s=a(n.a,o.a,null,null,null);t.default=s.exports},wxAW:function(e,t,i){"use strict";t.__esModule=!0;var n=i("C4MV"),o=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,o.default)(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}()}});
//# sourceMappingURL=people-get2.5fab394097c9e9bc1e09.js.map