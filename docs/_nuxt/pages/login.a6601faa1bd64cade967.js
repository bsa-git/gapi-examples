webpackJsonp([2],{"+HMp":function(t,e,n){"use strict";var o=n("//Fk"),i=n.n(o),s=n("woOf"),a=n.n(s),c=n("pFYg"),r=n.n(c),u=n("Zrlr"),l=n.n(u),g=n("wxAW"),d=n.n(g),h=function(){function t(e){l()(this,t),this.debug=!!e.debug,this.directAccess=!0,this.gapiUrl="https://apis.google.com/js/platform.js",this.config=null,"object"===(void 0===e?"undefined":r()(e))&&(this.config=a()(e,{scope:"profile email https://www.googleapis.com/auth/plus.login"})),this.auth2=null,this.currentUser=null}return d()(t,[{key:"loadAuth",value:function(){var t=this;return new i.a(function(e,n){void 0===window.gapi?t._loadGoogleApi().then(function(){return t.debug&&console.log("loadGoogleAPI - OK"),t._initAuth()}).then(function(){t.debug&&console.log("googleAuth.init - OK"),e()}):void 0!==window.gapi&&void 0===window.gapi.auth2&&t._initAuth().then(function(){t.debug&&console.log("googleAuth.init - OK"),e()})})}},{key:"loadClient",value:function(t){var e=this;return new i.a(function(n,o){void 0===window.gapi?e._loadGoogleApi().then(function(){return e.debug&&console.log("loadGoogleAPI - OK"),e._initClient()}).then(function(){e.debug&&console.log("googleClient.init - OK"),n()}):e._initClient(t).then(function(){e.debug&&console.log("googleClient.init - OK"),n()})})}},{key:"setDirectAccess",value:function(t){this.directAccess=t}},{key:"signIn",value:function(t,e){var n=this;this.directAccess?this.auth2.signIn().then(function(e){n.debug&&console.log("GoogleAuth.signIn - OK"),t(e)},function(t){e(t)}):this.auth2.grantOfflineAccess({redirect_uri:"postmessage"}).then(function(e){n.debug&&console.log("GoogleAuth.grantOfflineAccess - OK"),t(e.code)},function(t){e(t)})}},{key:"signOut",value:function(t,e){var n=this;this.auth2.signOut().then(function(){n.debug&&console.log("GoogleAuth.signOut - OK"),t()},function(t){e(t)})}},{key:"addScope",value:function(t,e,n){var o=this;return new i.a(function(i,s){var a=new window.gapi.auth2.SigninOptionsBuilder;a.setScope(t),o.currentUser.grant(a).then(function(t){o.debug&&console.log("GoogleAuth.addScope - OK"),e(t),i()},function(t){console.log("GoogleAuth.addScope - Error:",t),n(t)})})}},{key:"disconnect",value:function(){this.auth2.disconnect(),this.debug&&console.log("GoogleAuth.disconnect - OK")}},{key:"isSignedIn",value:function(){return this.auth2.isSignedIn.get()}},{key:"listenSignedIn",value:function(t){this.auth2.isSignedIn.listen(t),this.debug&&console.log("listenSignedIn - OK")}},{key:"listenCurrentUser",value:function(t){this.auth2.currentUser.listen(t),this.debug&&console.log("listenCurrentUser - OK")}},{key:"isCurrentUser",value:function(){return!!this.currentUser.getId()}},{key:"_loadGoogleApi",value:function(){var t=this;return new i.a(function(e,n){var o=document.createElement("script");o.src=t.gapiUrl,o.onreadystatechange=o.onload=function(){o.readyState&&!/loaded|complete/.test(o.readyState)||setTimeout(function(){e()},500)},document.getElementsByTagName("head")[0].appendChild(o)})}},{key:"_initAuth",value:function(){var t=this;return new i.a(function(e,n){window.gapi.load("auth2",function(){var n=this;t.auth2=window.gapi.auth2.init(t.config),t.auth2.then(function(){t.listenCurrentUser(function(e){t.currentUser=e}),e()},function(t){n.error=t,console.error("gapi.auth2.init - Error",t),alert("gapi.auth2.init - Error: "+t.error+"\n Details: "+t.details)})})})}},{key:"_initClient",value:function(t){var e=this;return new i.a(function(n,o){var i=function(){var o=this;window.gapi.client.init({apiKey:t.apiKey,clientId:t.clientId,discoveryDocs:t.discoveryDocs,scope:t.scope?t.scope.join(" "):""}).then(function(){e.auth2=window.gapi.auth2.getAuthInstance(),e.listenCurrentUser(function(t){e.currentUser=t}),n()},function(t){o.error=t,console.error("gapi.client.init - Error",t),alert("gapi.client.init - Error: "+t.error+"\n Details: "+t.details)})};if(void 0===window.gapi.client){var s=void 0===window.gapi.auth2?"client:auth2":"client";window.gapi.load(s,i)}else i()})}}]),t}();e.a=h},"8jbd":function(t,e,n){"use strict";function o(t){n("gsXE")}Object.defineProperty(e,"__esModule",{value:!0});var i=n("uUzE"),s=n("xtWc"),a=n("VU/8"),c=o,r=a(i.a,s.a,c,null,null);e.default=r.exports},Bg4N:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,".button--green{display:inline-block;border-radius:4px;border:1px solid #3b8070;color:#3b8070;text-decoration:none;padding:10px 30px}.button--green:hover{color:#fff;background-color:#3b8070}.button--grey{display:inline-block;border-radius:4px;border:1px solid #35495e;color:#35495e;text-decoration:none;padding:10px 30px;margin-left:15px}.button--grey:hover{color:#fff;background-color:#35495e}",""])},Zrlr:function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},gsXE:function(t,e,n){var o=n("Bg4N");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n("rjj0")("7a48227f",o,!0)},uUzE:function(t,e,n){"use strict";var o=n("Dd8w"),i=n.n(o),s=n("NYxO"),a=n("+HMp");e.a={data:function(){return{title:"Login/Logout Google User",description:"Handling Google sign-in and sign-out.",loading:"",response:""}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}],link:[]}},created:function(){if(!this.$isServer&&this.config.debug&&console.log("login.created - OK"),!this.$isServer){var t={debug:this.config.debug,clientId:this.config.gapi.clientId};this.authGoogle=new a.a(t)}},mounted:function(){var t=this;this.config.debug&&console.log("login.mounted - OK"),this.isStatic&&this.authGoogle.loadAuth().then(function(){t.config.debug&&console.log("authGoogle.load - OK")})},computed:i()({},Object(s.mapGetters)({config:"getConfig",isAuth:"isAuth",authGoogle:"getGapi",isStatic:"isStatic"})),methods:{signIn:function(){var t=this;this.toggleLoading(),this.isStatic?window.setTimeout(function(){t.authGoogle.signIn(t.onSignInSuccess,t.onSignInError)},1e3):window.setTimeout(function(){t.onSignInSuccess(t.config.gapi.services.auth.testAuthorizationCode)},1e3)},signOut:function(){var t=this;this.toggleLoading(),this.isStatic?window.setTimeout(function(){t.authGoogle.signOut(t.onSignOutSuccess,t.onSignOutError)},1e3):window.setTimeout(function(){t.onSignOutSuccess()},1e3)},disconnect:function(){var t=this;this.isStatic?window.setTimeout(function(){t.authGoogle.disconnect(),t.onDisconnect()},1e3):window.setTimeout(function(){t.onDisconnect()},1e3)},addScope:function(){var t=this;this.isStatic?window.setTimeout(function(){t.authGoogle.addScope("https://www.googleapis.com/auth/drive",t.onAddScopeSuccess,t.onAddScopeError).then(function(){})},1e3):window.setTimeout(function(){t.onAddScopeSuccess("AddScopeSuccess")},1e3)},onSignInSuccess:function(t){this.toggleLoading(),this.resetResponse();var e=t.getId();if(window.localStorage&&window.localStorage.setItem("token",e),this.$store.commit("SET_TOKEN",e),this.authGoogle.isCurrentUser()){var n=this.authGoogle.currentUser.getAuthResponse().id_token;console.log("CurrentUser - Token: "+n);var o=this.authGoogle.currentUser.getBasicProfile();console.log("ID: "+o.getId()),console.log("Full Name: "+o.getName()),console.log("Given Name: "+o.getGivenName()),console.log("Family Name: "+o.getFamilyName()),console.log("Image URL: "+o.getImageUrl()),console.log("Email: "+o.getEmail())}},onSignInError:function(t){this.response="Failed to sign-in",console.log("GOOGLE SERVER - SIGN-IN ERROR",t)},onSignOutSuccess:function(){if(this.toggleLoading(),this.resetResponse(),window.localStorage){if(!this.$store.state.auth.token){var t=window.localStorage.getItem("token");this.$store.commit("SET_TOKEN",t)}window.localStorage.setItem("token",null)}this.$store.commit("SET_TOKEN",null)},onSignOutError:function(t){this.response="Failed to sign-out",console.log("GOOGLE SERVER - SIGN-OUT ERROR",t)},onDisconnect:function(){if(window.localStorage){if(!this.$store.state.auth.token){var t=window.localStorage.getItem("token");this.$store.commit("SET_TOKEN",t)}window.localStorage.setItem("token",null)}this.$store.commit("SET_TOKEN",null)},onAddScopeSuccess:function(t){var e=t.getId();this.response="Success to add-scope for UserId="+e},onAddScopeError:function(t){this.response="Failed to add-scope",console.log("GOOGLE SERVER - ADD-SCOPE ERROR",t)},onCurrentUser:function(t){if(this.config.debug&&(console.log("authGoogle.CurrentUser.id:",t.getId()),t.getId())){var e=t.getBasicProfile();console.log("CurrentUser - ID: "+e.getId()),console.log("CurrentUser - Name: "+e.getName()),console.log("CurrentUser - Image URL: "+e.getImageUrl()),console.log("CurrentUser - Email: "+e.getEmail())}},toggleLoading:function(){this.loading=""===this.loading?this.isAuth?"Logout":"Login":""},resetResponse:function(){this.response=""}}}},wxAW:function(t,e,n){"use strict";e.__esModule=!0;var o=n("C4MV"),i=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,i.default)(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}()},xtWc:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"container"},[n("div",{staticClass:"text-center"},[n("h2",[t._v(t._s(t.title))])]),t._m(0),n("div",{staticClass:"jumbotron well text-center"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"text-danger lead"},[n("p",[t._v(t._s(t.loading)+"...")])]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.response,expression:"response"}],staticClass:"text-danger lead"},[n("p",[t._v(t._s(t.response))])]),n("div",{staticClass:"auth-btns"},[t.isAuth?n("div",[n("p",[t._v("You are currently signed in and have granted access to this app.")]),n("br"),n("a",{staticClass:"button--grey",on:{click:t.signOut}},[n("span",{staticClass:"glyphicon glyphicon-log-out",attrs:{"aria-hidden":"true"}}),t._v("\n          Sign out")]),n("a",{staticClass:"button--grey",on:{click:t.disconnect}},[n("span",{staticClass:"glyphicon glyphicon-remove",attrs:{"aria-hidden":"true"}}),t._v(" Revoke access")]),n("a",{staticClass:"button--grey",on:{click:t.addScope}},[n("span",{staticClass:"glyphicon glyphicon-plus",attrs:{"aria-hidden":"true"}}),t._v(" Add scope")])]):n("div",[n("p",[t._v("You have not authorized this app or you are signed out.")]),n("br"),n("a",{staticClass:"button--green",on:{click:t.signIn}},[n("span",{staticClass:"glyphicon glyphicon-log-in",attrs:{"aria-hidden":"true"}}),t._v(" Sign In/Authorize")])])])])])},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bs-callout-info bs-callout"},[n("h4",[t._v("Get a Google Account")]),n("p",[t._v("To test Google services you need to have an Google Account.")]),n("p",[t._v("First, "),n("a",{attrs:{href:"https://www.google.com/accounts",target:"_blank"}},[t._v("sign up")]),t._v(" for a\n      Google Account if you do not already have one.\n    ")])])}],s={render:o,staticRenderFns:i};e.a=s}});
//# sourceMappingURL=login.a6601faa1bd64cade967.js.map