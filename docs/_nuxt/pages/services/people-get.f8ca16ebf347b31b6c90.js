webpackJsonp([2],{KEe9:function(e,t,n){"use strict";var i=n("Dd8w"),o=n.n(i),a=n("NYxO"),s=n("WSyU"),l=this;t.a={data:function(){return{title:"Method: people.get",description:"Provides information about a person by specifying a resource name",apiGoogle:null,isSignedIn:!1,myName:""}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},created:function(){var e={debug:this.config.debug,apiKey:this.config.gapi.apiKey,clientId:this.config.gapi.clientId,discoveryDocs:this.config.gapi.services.people.discoveryDocs,scope:this.config.gapi.services.people.scope};this.apiGoogle=new s.a(e)},mounted:function(){this.$nextTick(function(){var e=this;this.apiGoogle.loadGoogleAPI().then(function(){return e.config.debug&&console.log("loadGoogleAPI - OK"),e.apiGoogle.init()}).then(function(){e.config.debug&&console.log("apiGoogle.init - OK"),e.updateSigninStatus(e.apiGoogle.isSignedIn()),e.apiGoogle.listenSignedIn(e.updateSigninStatus.bind(e))})})},computed:o()({},Object(a.mapGetters)({config:"getConfig"})),methods:{updateSigninStatus:function(e){console.log("updateSigninStatus: ","config="+l.config+"!"),console.log("updateSigninStatus: ","isSignedIn="+e+"; "),l.isSignedIn=e,e&&l.makeApiCall()},makeApiCall:function(){var e=l;window.gapi.client.people.people.get({resourceName:"people/me","requestMask.includeField":"person.names"}).then(function(t){var n=t.result.names[0].givenName;e.myName="Hello, "+n+"!",console.log("makeApiCall: ","config="+e.config+"!"),console.log("people.get - OK. ","Hello, "+n+"!")},function(e){console.log("people.get - Error. ","Error: "+e),alert(e)})}}}},WSyU:function(e,t,n){"use strict";var i=n("//Fk"),o=n.n(i),a=n("Zrlr"),s=n.n(a),l=n("wxAW"),c=n.n(l),r=function(){function e(t){s()(this,e),this._callbackName="__googleApiOnLoadCallback",this._clientURL="https://apis.google.com/js/client.js?onload="+this._callbackName,this._apiKey=t.apiKey,this._clientId=t.clientId,this._discoveryDocs=t.discoveryDocs,this._scope=t.scope.join(" "),this.name="load-google-api",this.error=null,this.debug=!!t.debug}return c()(e,[{key:"loadGoogleAPI",value:function(){var e=this;return new o.a(function(t,n){var i=document.createElement("script");i.src=e._clientURL,window[e._callbackName]=function(){t()},document.body.appendChild(i)})}},{key:"init",value:function(){var e=this,t=new o.a(function(e,t){window.gapi.load("client:auth2",e)}),n=new o.a(function(t,n){window.gapi.client.init({apiKey:e._apiKey,clientId:e._clientId,discoveryDocs:e._discoveryDocs,scope:e._scope}).then(t,function(t){e.error=t,console.error("Gapi.client.init - Error",t),alert("Error: "+t.error+"\n Details: "+t.details)})});return o.a.all([t,n])}},{key:"isSignedIn",value:function(){var e=window.gapi.auth2.getAuthInstance().isSignedIn.get();return this.debug&&console.log("isSignedIn: ",e+"; "),e}},{key:"listenSignedIn",value:function(e){this.debug&&console.log("listenSignedIn - OK"),window.gapi.auth2.getAuthInstance().isSignedIn.listen(e)}},{key:"handleAuthClick",value:function(){console.log("handleAuthClick - OK"),window.gapi.auth2.getAuthInstance().signIn()}},{key:"handleSignoutClick",value:function(){console.log("handleSignoutClick - OK"),window.gapi.auth2.getAuthInstance().signOut()}}]),e}();t.a=r},WmRc:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("div",{staticClass:"text-center"},[n("h2",[e._v(e._s(e.title))]),n("p",{staticClass:"lead"},[e._v(e._s(e.description))])]),e._m(0),n("div",{staticClass:"jumbotron text-center"},[e.isSignedIn?n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.apiGoogle.handleSignoutClick}},[e._v("Sign Out\n    ")]):n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.apiGoogle.handleAuthClick}},[e._v("Authorize")]),e.isSignedIn?n("div",{staticClass:"lead"},[e._v(e._s(e.myName))]):e._e()])])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bs-callout-info bs-callout"},[n("h4",[e._v("Method: people.get")]),n("p",[e._v("\n      Provides information about a person by specifying a resource name. Use "),n("code",[e._v("people/me")]),e._v(" to indicate the\n      authenticated user. "),n("br"),e._v(" The request throws a 400 error if 'personFields' is not specified.\n    ")]),n("strong",[e._v("HTTP request")]),n("p",[n("code",[e._v("GET https://people.googleapis.com/v1/{resourceName=people/*}")])]),n("p",[e._v("The URL uses "),n("a",{attrs:{href:"https://github.com/googleapis/googleapis/blob/master/google/api/http.proto",target:"_blank"}},[e._v("Google API HTTP annotation")]),e._v(" syntax.")]),n("p",{staticClass:"lead"},[e._v("Details can be found "),n("a",{attrs:{href:"https://developers.google.com/people/api/rest/v1/people/get",target:"_blank"}},[e._v("here")]),e._v(".")])])}],a={render:i,staticRenderFns:o};t.a=a},Zrlr:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},"f/os":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("KEe9"),o=n("WmRc"),a=n("VU/8"),s=a(i.a,o.a,null,null,null);t.default=s.exports},wxAW:function(e,t,n){"use strict";t.__esModule=!0;var i=n("C4MV"),o=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,o.default)(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}()}});
//# sourceMappingURL=people-get.f8ca16ebf347b31b6c90.js.map