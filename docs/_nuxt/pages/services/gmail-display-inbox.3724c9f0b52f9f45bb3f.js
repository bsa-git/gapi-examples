webpackJsonp([4],{OPnp:function(i,e,t){"use strict";var n=t("Dd8w"),o=t.n(n),s=t("NYxO"),a=t("WSyU");e.a={data:function(){return{title:"Method: Users.messages.list",description:"Lists the messages in the user's mailbox.",apiGoogle:null,isSignedIn:!1}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},fetch:function(i){var e=i.isClient,t=i.isStatic;i.config.debug&&console.log("gmail-display-inbox.fetch - OK: ","isClient="+e+"; ","isStatic="+t+";"),e&&t&&location.reload(!0)},created:function(){if(this.config.debug&&console.log("gmail-display-inbox.created - OK: ","isServer="+this.$isServer),!this.$isServer){var i={debug:this.config.debug,apiKey:this.config.gapi.apiKey,clientId:this.config.gapi.clientId,discoveryDocs:this.config.gapi.services.gmail.discoveryDocs,scope:this.config.gapi.services.gmail.scopes["messages.list"]};this.apiGoogle=new a.a(i)}},mounted:function(){this.$nextTick(function(){var i=this;this.config.debug&&console.log("gmail-display-inbox.mounted - OK: ","isStatic="+this.config.isStatic),this.config.isStatic?this.apiGoogle.loadGoogleAPI().then(function(){return i.config.debug&&console.log("loadGoogleAPI - OK"),i.apiGoogle.init()}).then(function(){i.config.debug&&console.log("apiGoogle.init - OK");var e=i.updateSigninStatus.bind(i);i.apiGoogle.listenSignedIn(e),i.updateSigninStatus(i.apiGoogle.isSignedIn())}):this.updateSigninStatus(!0)})},computed:o()({},Object(s.mapGetters)({config:"getConfig",google:"getGapi"})),methods:{updateSigninStatus:function(i){var e=this;this.config.debug&&console.log("updateSigninStatus - OK: ","isSignedIn="+i+"; "),this.isSignedIn=i,i&&(this.config.isStatic?this.apiGoogle.loadGmailApi().then(function(){e.config.debug&&console.log("loadGmailApi - OK"),e.$store.dispatch("receiveGmailMyMessages")}):this.$store.dispatch("receiveGmailMyMessages"))}}}},TG11:function(i,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("OPnp"),o=t("eAPO"),s=t("VU/8"),a=s(n.a,o.a,null,null,null);e.default=a.exports},WSyU:function(i,e,t){"use strict";var n=t("//Fk"),o=t.n(n),s=t("Zrlr"),a=t.n(s),c=t("wxAW"),l=t.n(c),r=function(){function i(e){a()(this,i),this.name="load-google-api",this._callbackName="__googleApiOnLoadCallback",this._clientURL="https://apis.google.com/js/client.js?onload="+this._callbackName,this._apiKey=e.apiKey,this._clientId=e.clientId,this._discoveryDocs=e.discoveryDocs,this._scope=e.scope?e.scope.join(" "):"",this.error=null,this.debug=!!e.debug}return l()(i,[{key:"loadGoogleAPI",value:function(){var i=this;return new o.a(function(e,t){var n=document.createElement("script");n.src=i._clientURL,window[i._callbackName]=function(){e()},document.body.appendChild(n)})}},{key:"init",value:function(){var i=this,e=new o.a(function(i,e){window.gapi.load("client:auth2",i)}),t=new o.a(function(e,t){window.gapi.client.init({apiKey:i._apiKey,clientId:i._clientId,discoveryDocs:i._discoveryDocs,scope:i._scope}).then(e,function(e){i.error=e,console.error("Gapi.client.init - Error",e),alert("Error: "+e.error+"\n Details: "+e.details)})});return o.a.all([e,t])}},{key:"loadGapiClient",value:function(){return new o.a(function(i,e){window.gapi.load("client:auth2",i)})}},{key:"iniGapiClient",value:function(i){var e=this;return new o.a(function(t,n){window.gapi.client.init({apiKey:i.apiKey,clientId:i.clientId,discoveryDocs:i.discoveryDocs,scope:i.scope.join(" ")}).then(t,function(i){e.error=i,console.error("Gapi.client.init - Error",i),alert("Error: "+i.error+"\n Details: "+i.details)})})}},{key:"loadGmailApi",value:function(){return new o.a(function(i,e){window.gapi.client.load("gmail","v1",i)})}},{key:"isSignedIn",value:function(){return window.gapi.auth2.getAuthInstance().isSignedIn.get()}},{key:"listenSignedIn",value:function(i){this.debug&&console.log("listenSignedIn - OK"),window.gapi.auth2.getAuthInstance().isSignedIn.listen(i)}},{key:"handleAuthClick",value:function(i){i.debug&&console.log("handleAuthClick - OK"),window.gapi&&window.gapi.auth2.getAuthInstance().signIn()}},{key:"handleSignoutClick",value:function(i){i.debug&&console.log("handleSignoutClick - OK"),window.gapi&&window.gapi.auth2.getAuthInstance().signOut()}}]),i}();e.a=r},Zrlr:function(i,e,t){"use strict";e.__esModule=!0,e.default=function(i,e){if(!(i instanceof e))throw new TypeError("Cannot call a class as a function")}},eAPO:function(i,e,t){"use strict";var n=function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("section",[t("div",{staticClass:"text-center"},[t("h2",[i._v(i._s(i.title))]),t("p",{staticClass:"lead"},[i._v(i._s(i.description))])]),i._m(0),t("div",{staticClass:"jumbotron"},[i.isSignedIn?i._e():t("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){i.apiGoogle.handleAuthClick(i.apiGoogle)}}},[i._v("\n      Authorize\n    ")]),i.isSignedIn?t("div",{staticClass:"lead"},[i._v("Hellow "+i._s(i.google.people_my.names.givenName)+"!")]):i._e()])])},o=[function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("div",{staticClass:"bs-callout-info bs-callout"},[t("h4",[i._v("Method: Users.messages.list")]),t("p",[i._v("Lists the messages in the user's mailbox.")]),t("strong",[i._v("HTTP request")]),t("p",[t("code",[i._v("GET https://www.googleapis.com/gmail/v1/users/userId/messages")])])])}],s={render:n,staticRenderFns:o};e.a=s},wxAW:function(i,e,t){"use strict";e.__esModule=!0;var n=t("C4MV"),o=function(i){return i&&i.__esModule?i:{default:i}}(n);e.default=function(){function i(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,o.default)(i,n.key,n)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}()}});
//# sourceMappingURL=gmail-display-inbox.3724c9f0b52f9f45bb3f.js.map