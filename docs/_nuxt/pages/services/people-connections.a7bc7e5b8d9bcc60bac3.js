webpackJsonp([3],{"9B9w":function(e,n,t){"use strict";var i=t("Dd8w"),o=t.n(i),s=t("NYxO"),a=t("WSyU");n.a={data:function(){return{title:"Method: people.connections.list",description:"Provides a list of the authenticated user's contacts",apiGoogle:null,isSignedIn:!1,myConnections:[]}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},created:function(){var e={debug:this.config.debug,apiKey:this.config.gapi.apiKey,clientId:this.config.gapi.clientId,discoveryDocs:this.config.gapi.services.people.discoveryDocs,scope:this.config.gapi.services.people.scopes.connections};this.apiGoogle=new a.a(e)},mounted:function(){this.$nextTick(function(){var e=this;this.apiGoogle.loadGoogleAPI().then(function(){return e.config.debug&&console.log("loadGoogleAPI - OK"),e.apiGoogle.init()}).then(function(){e.config.debug&&console.log("apiGoogle.init - OK");var n=e.updateSigninStatus.bind(e);e.apiGoogle.listenSignedIn(n),e.updateSigninStatus(e.apiGoogle.isSignedIn())})})},computed:o()({},Object(s.mapGetters)({config:"getConfig",gapi:"getGapi"})),methods:{updateSigninStatus:function(e){this.config.debug&&console.log("updateSigninStatus: ","isSignedIn="+e+"; "),this.isSignedIn=e,e&&this.listConnectionNames()},appendPre:function(e){var n=document.getElementById("content"),t=document.createTextNode(e+"\n");n.appendChild(t)},listConnectionNames:function(){var e=this;gapi.client.people.people.connections.list({resourceName:"people/me",pageSize:10,personFields:"names,emailAddresses"}).then(function(n){var t=n.result.connections;if(t.length>0)for(var i=0;i<t.length;i++){var o=t[i];o.names&&o.names.length>0?e.myConnections[i]=o.names[0].displayName:e.myConnections[i]="No display name found for connection."}else e.myConnections[0]="No upcoming events found."})}}}},TVN9:function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",[t("div",{staticClass:"text-center"},[t("h2",[e._v(e._s(e.title))]),t("p",{staticClass:"lead"},[e._v(e._s(e.description))])]),e._m(0),t("div",{staticClass:"jumbotron text-center"},[e.isSignedIn?t("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.apiGoogle.handleSignoutClick}},[e._v("Sign Out\n    ")]):t("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.apiGoogle.handleAuthClick}},[e._v("Authorize")]),e.isSignedIn?t("div",{staticClass:"lead",attrs:{id:"content"}},[t("p",{staticClass:"lead"},[e._v("Connections:")]),t("ul",e._l(e.myConnections,function(n){return t("li",[e._v(e._s(n))])}))]):e._e()])])},o=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"bs-callout-info bs-callout"},[t("h4",[e._v("Method: people.connections.list")]),t("p",[e._v("\n      Provides a list of the authenticated user's contacts merged with any connected profiles.\n      The request throws a 400 error if 'personFields' is not specified.\n    ")]),t("strong",[e._v("HTTP request")]),t("p",[t("code",[e._v("GET https://people.googleapis.com/v1/{resourceName=people/*}/connections")])]),t("p",[e._v("The URL uses "),t("a",{attrs:{href:"https://github.com/googleapis/googleapis/blob/master/google/api/http.proto",target:"_blank"}},[e._v("Google API HTTP annotation")]),e._v(" syntax.")]),t("p",{staticClass:"lead"},[e._v("Details can be found "),t("a",{attrs:{href:"https://developers.google.com/people/api/rest/v1/people.connections/list",target:"_blank"}},[e._v("here")]),e._v(".")])])}],s={render:i,staticRenderFns:o};n.a=s},WSyU:function(e,n,t){"use strict";var i=t("//Fk"),o=t.n(i),s=t("Zrlr"),a=t.n(s),c=t("wxAW"),l=t.n(c),r=function(){function e(n){a()(this,e),this._callbackName="__googleApiOnLoadCallback",this._clientURL="https://apis.google.com/js/client.js?onload="+this._callbackName,this._apiKey=n.apiKey,this._clientId=n.clientId,this._discoveryDocs=n.discoveryDocs,this._scope=n.scope.join(" "),this.name="load-google-api",this.error=null,this.debug=!!n.debug}return l()(e,[{key:"loadGoogleAPI",value:function(){var e=this;return new o.a(function(n,t){var i=document.createElement("script");i.src=e._clientURL,window[e._callbackName]=function(){n()},document.body.appendChild(i)})}},{key:"init",value:function(){var e=this,n=new o.a(function(e,n){window.gapi.load("client:auth2",e)}),t=new o.a(function(n,t){window.gapi.client.init({apiKey:e._apiKey,clientId:e._clientId,discoveryDocs:e._discoveryDocs,scope:e._scope}).then(n,function(n){e.error=n,console.error("Gapi.client.init - Error",n),alert("Error: "+n.error+"\n Details: "+n.details)})});return o.a.all([n,t])}},{key:"isSignedIn",value:function(){return window.gapi.auth2.getAuthInstance().isSignedIn.get()}},{key:"listenSignedIn",value:function(e){this.debug&&console.log("listenSignedIn - OK"),window.gapi.auth2.getAuthInstance().isSignedIn.listen(e)}},{key:"handleAuthClick",value:function(){console.log("handleAuthClick - OK"),window.gapi.auth2.getAuthInstance().signIn()}},{key:"handleSignoutClick",value:function(){console.log("handleSignoutClick - OK"),window.gapi.auth2.getAuthInstance().signOut()}}]),e}();n.a=r},Zrlr:function(e,n,t){"use strict";n.__esModule=!0,n.default=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}},gb4K:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t("9B9w"),o=t("TVN9"),s=t("VU/8"),a=s(i.a,o.a,null,null,null);n.default=a.exports},wxAW:function(e,n,t){"use strict";n.__esModule=!0;var i=t("C4MV"),o=function(e){return e&&e.__esModule?e:{default:e}}(i);n.default=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,o.default)(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}()}});
//# sourceMappingURL=people-connections.a7bc7e5b8d9bcc60bac3.js.map