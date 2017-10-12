webpackJsonp([3],{OPnp:function(e,t,i){"use strict";var n=i("Dd8w"),a=i.n(n),s=i("NYxO"),o=i("WSyU");t.a={data:function(){return{title:"Method: Users.messages.list",description:"Lists the messages in the user's mailbox.",apiGoogle:null,isSignedIn:!1}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},fetch:function(e){var t=e.isClient,i=e.isStatic,n=e.config;t&&n.debug&&console.log("gmail-display-inbox.fetch - OK: ","isStatic="+i+";"),t&&i&&location.reload(!0)},created:function(){if(!this.$isServer&&this.config.debug&&console.log("gmail-display-inbox.created - OK"),!this.$isServer){var e={debug:this.config.debug,apiKey:this.config.gapi.apiKey,clientId:this.config.gapi.clientId,discoveryDocs:this.config.gapi.services.gmail.discoveryDocs,scope:this.config.gapi.services.gmail.scopes["messages.list.send"]};this.apiGoogle=new o.a(e)}},mounted:function(){this.$nextTick(function(){var e=this;this.config.debug&&console.log("gmail-display-inbox.mounted - OK"),this.isStatic?this.apiGoogle.loadGoogleAPI().then(function(){return e.config.debug&&console.log("loadGoogleAPI - OK"),e.apiGoogle.init()}).then(function(){e.config.debug&&console.log("apiGoogle.init - OK");var t=e.updateSigninStatus.bind(e);e.apiGoogle.listenSignedIn(t),e.updateSigninStatus(e.apiGoogle.isSignedIn())}):this.updateSigninStatus(!0)})},computed:a()({},Object(s.mapGetters)({config:"getConfig",google:"getGapi",isStatic:"isStatic"})),methods:{updateSigninStatus:function(e){var t=this;this.config.debug&&console.log("updateSigninStatus - OK: ","isSignedIn="+e+"; "),this.isSignedIn=e,e&&(this.isStatic?this.apiGoogle.loadGmailApi().then(function(){t.config.debug&&console.log("loadGmailApi - OK"),t.$store.dispatch("receiveGmailMyMessages")}):this.$store.dispatch("receiveGmailMyMessages"))}}}},TG11:function(e,t,i){"use strict";function n(e){i("afPe")}Object.defineProperty(t,"__esModule",{value:!0});var a=i("OPnp"),s=i("eAPO"),o=i("VU/8"),l=n,c=o(a.a,s.a,l,null,null);t.default=c.exports},WSyU:function(e,t,i){"use strict";var n=i("//Fk"),a=i.n(n),s=i("Zrlr"),o=i.n(s),l=i("wxAW"),c=i.n(l),r=function(){function e(t){o()(this,e),this.name="load-google-api",this._callbackName="__googleApiOnLoadCallback",this._clientURL="https://apis.google.com/js/client.js?onload="+this._callbackName,this._apiKey=t.apiKey,this._clientId=t.clientId,this._discoveryDocs=t.discoveryDocs,this._scope=t.scope?t.scope.join(" "):"",this.error=null,this.debug=!!t.debug}return c()(e,[{key:"loadGoogleAPI",value:function(){var e=this;return new a.a(function(t,i){var n=document.createElement("script");n.src=e._clientURL,window[e._callbackName]=function(){t()},document.body.appendChild(n)})}},{key:"init",value:function(){var e=this,t=new a.a(function(e,t){window.gapi.load("client:auth2",e)}),i=new a.a(function(t,i){window.gapi.client.init({apiKey:e._apiKey,clientId:e._clientId,discoveryDocs:e._discoveryDocs,scope:e._scope}).then(t,function(t){e.error=t,console.error("Gapi.client.init - Error",t),alert("Error: "+t.error+"\n Details: "+t.details)})});return a.a.all([t,i])}},{key:"loadGapiClient",value:function(){return new a.a(function(e,t){window.gapi.load("client:auth2",e)})}},{key:"iniGapiClient",value:function(e){var t=this;return new a.a(function(i,n){window.gapi.client.init({apiKey:e.apiKey,clientId:e.clientId,discoveryDocs:e.discoveryDocs,scope:e.scope.join(" ")}).then(i,function(e){t.error=e,console.error("Gapi.client.init - Error",e),alert("Error: "+e.error+"\n Details: "+e.details)})})}},{key:"loadGmailApi",value:function(){return new a.a(function(e,t){window.gapi.client.load("gmail","v1",e)})}},{key:"isSignedIn",value:function(){return window.gapi.auth2.getAuthInstance().isSignedIn.get()}},{key:"listenSignedIn",value:function(e){this.debug&&console.log("listenSignedIn - OK"),window.gapi.auth2.getAuthInstance().isSignedIn.listen(e)}},{key:"handleAuthClick",value:function(e){e.debug&&console.log("handleAuthClick - OK"),window.gapi&&window.gapi.auth2.getAuthInstance().signIn()}},{key:"handleSignoutClick",value:function(e){e.debug&&console.log("handleSignoutClick - OK"),window.gapi&&window.gapi.auth2.getAuthInstance().signOut()}}]),e}();t.a=r},Zrlr:function(e,t,i){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},afPe:function(e,t,i){var n=i("fBVM");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i("rjj0")("802f66d0",n,!0)},eAPO:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"container"},[i("div",{staticClass:"text-center"},[i("h2",[e._v(e._s(e.title))]),i("p",{staticClass:"lead"},[e._v(e._s(e.description))])]),e._m(0),e.isSignedIn?e._e():i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){e.apiGoogle.handleAuthClick(e.apiGoogle)}}},[e._v("\n    Authorize\n  ")]),e.isSignedIn?i("div",[i("h1",[e._v("Gmail API demo")]),i("table",{staticClass:"table table-striped table-inbox"},[e._m(1),i("tbody",[e._l(e.google.gmail.inbox,function(t){return[i("tr",{key:t.id},[i("td",{domProps:{textContent:e._s(t.from)}}),i("td",[i("a",{attrs:{href:"#message-modal-"+t.id,"data-toggle":"modal",id:"message-link-"+t.id},domProps:{textContent:e._s(t.subject)}})]),i("td",[e._v(e._s(t.date))])])]})],2)]),e._l(e.google.gmail.inbox,function(t){return[i("div",{key:t.id,staticClass:"modal fade",attrs:{id:"message-modal-"+t.id,tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel"}},[i("div",{staticClass:"modal-dialog modal-lg"},[i("div",{staticClass:"modal-content"},[i("div",{staticClass:"modal-header"},[e._m(2,!0),i("h4",{staticClass:"modal-title",attrs:{id:"myModalLabel"}},[e._v(e._s(t.subject))])]),i("div",{staticClass:"modal-body"},[i("iframe",{attrs:{id:"message-iframe-"+t.id,srcdoc:t.body}})]),e._m(3,!0)])])])]})],2):e._e()])},a=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bs-callout-info bs-callout"},[i("h4",[e._v("Method: Users.messages.list")]),i("p",[e._v("Lists the messages in the user's mailbox.")]),i("h4",[e._v("HTTP request")]),i("p",[i("code",[e._v("GET https://www.googleapis.com/gmail/v1/users/userId/messages")])]),i("p",{staticClass:"lead"},[e._v("\n      Details can be found "),i("a",{attrs:{href:"https://developers.google.com/gmail/api/v1/reference/users/messages/list",target:"_blank"}},[e._v("here")]),e._v(".\n    ")]),i("p",[e._v("This example was created on the basis of an "),i("a",{attrs:{href:"https://www.sitepoint.com/sending-emails-gmail-javascript-api/",target:"_blank"}},[e._v("article")]),e._v(" written by "),i("a",{attrs:{href:"https://www.sitepoint.com/author/jshields/",target:"_blank"}},[e._v("Jamie Shields")]),e._v(".")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("thead",[i("tr",[i("th",[e._v("From")]),i("th",[e._v("Subject")]),i("th",[e._v("Date/Time")])])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[i("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"modal-footer"},[i("button",{staticClass:"btn btn-default",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")])])}],s={render:n,staticRenderFns:a};t.a=s},fBVM:function(e,t,i){t=e.exports=i("FZ+f")(!1),t.push([e.i,"iframe{width:100%;border:0;min-height:80%;height:600px;display:-webkit-box;display:-ms-flexbox;display:flex}",""])},wxAW:function(e,t,i){"use strict";t.__esModule=!0;var n=i("C4MV"),a=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,a.default)(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}()}});
//# sourceMappingURL=gmail-display-inbox.6bb81c37db551e8ea8e0.js.map