webpackJsonp([2],{"+HMp":function(t,e,o){"use strict";var n=o("//Fk"),i=o.n(n),s=o("woOf"),c=o.n(s),a=o("pFYg"),r=o.n(a),u=o("Zrlr"),l=o.n(u),g=o("wxAW"),d=o.n(g),h=function(){function t(e){l()(this,t),this.debug=!!e.debug,this.directAccess=!1,this.gapiUrl="https://apis.google.com/js/platform.js",this.config=null,"object"===(void 0===e?"undefined":r()(e))&&(this.config=c()(e,{scope:"profile email https://www.googleapis.com/auth/plus.login"})),this.auth2=null,this.currentUser=null}return d()(t,[{key:"load",value:function(){var t=this;return new i.a(function(e,o){void 0===window.gapi?t._loadGoogleApis().then(function(){return t.debug&&console.log("loadGoogleAPI - OK"),t._initAuth()}).then(function(){t.debug&&console.log("apiGoogle.init - OK"),e()}):void 0!==window.gapi&&void 0===window.gapi.auth2&&t._initAuth().then(function(){t.debug&&console.log("apiGoogle.init - OK"),e()})})}},{key:"setDirectAccess",value:function(t){this.directAccess=t}},{key:"signIn",value:function(t,e){var o=this;this.directAccess?this.auth2.signIn().then(function(e){o.debug&&console.log("GoogleAuth.signIn - OK"),t(e)},function(t){e(t)}):this.auth2.grantOfflineAccess({redirect_uri:"postmessage"}).then(function(e){o.debug&&console.log("GoogleAuth.grantOfflineAccess - OK"),t(e.code)},function(t){e(t)})}},{key:"signOut",value:function(t,e){var o=this;this.auth2.signOut().then(function(){o.debug&&console.log("GoogleAuth.signOut - OK"),t()},function(t){e(t)})}},{key:"addScope",value:function(t,e,o){var n=this;return new i.a(function(i,s){var c=new this.auth2.SigninOptionsBuilder;c.setScope(t),this.currentUser.grant(c).then(function(t){n.debug&&console.log("GoogleAuth.addScope - OK:",t),e(t),i()},function(t){console.log("GoogleAuth.addScope - Error:",t),o(t)})})}},{key:"disconnect",value:function(){this.auth2.disconnect(),this.debug&&console.log("GoogleAuth.disconnect - OK")}},{key:"isSignedIn",value:function(){return this.auth2.isSignedIn.get()}},{key:"listenSignedIn",value:function(t){this.auth2.isSignedIn.listen(t),this.debug&&console.log("listenSignedIn - OK")}},{key:"listenCurrentUser",value:function(t){this.auth2.currentUser.listen(t),this.debug&&console.log("listenCurrentUser - OK")}},{key:"isCurrentUser",value:function(){return!!this.currentUser.getId()}},{key:"_loadGoogleApis",value:function(){var t=this;return new i.a(function(e,o){var n=document.createElement("script");n.src=t.gapiUrl,n.onreadystatechange=n.onload=function(){n.readyState&&!/loaded|complete/.test(n.readyState)||setTimeout(function(){e()},500)},document.getElementsByTagName("head")[0].appendChild(n)})}},{key:"_initAuth",value:function(){var t=this;return new i.a(function(e,o){window.gapi.load("auth2",function(){t.auth2=window.gapi.auth2.init(t.config),t.listenCurrentUser(function(e){t.currentUser=e}),e()})})}}]),t}();e.a=h},"8jbd":function(t,e,o){"use strict";function n(t){o("gsXE")}Object.defineProperty(e,"__esModule",{value:!0});var i=o("uUzE"),s=o("xtWc"),c=o("VU/8"),a=n,r=c(i.a,s.a,a,null,null);e.default=r.exports},Bg4N:function(t,e,o){e=t.exports=o("FZ+f")(!1),e.push([t.i,".button--green{display:inline-block;border-radius:4px;border:1px solid #3b8070;color:#3b8070;text-decoration:none;padding:10px 30px}.button--green:hover{color:#fff;background-color:#3b8070}.button--grey{display:inline-block;border-radius:4px;border:1px solid #35495e;color:#35495e;text-decoration:none;padding:10px 30px;margin-left:15px}.button--grey:hover{color:#fff;background-color:#35495e}",""])},Zrlr:function(t,e,o){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},gsXE:function(t,e,o){var n=o("Bg4N");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o("rjj0")("7a48227f",n,!0)},uUzE:function(t,e,o){"use strict";var n=o("Dd8w"),i=o.n(n),s=o("NYxO"),c=o("+HMp");e.a={data:function(){return{title:"Login/Logout Google User",description:"Handling Google sign-in and sign-out.",authGoogle:null,loading:"",response:""}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}],link:[]}},created:function(){if(!this.$isServer&&this.config.debug&&console.log("login.created - OK"),!this.$isServer){var t={debug:this.config.debug,clientId:this.config.gapi.clientId};this.authGoogle=new c.a(t)}},mounted:function(){var t=this;this.config.debug&&console.log("login.mounted - OK"),this.isStatic&&this.authGoogle.load().then(function(){t.config.debug&&(console.log("authGoogle.load - OK"),t.authGoogle.setDirectAccess(!0))})},computed:i()({},Object(s.mapGetters)({config:"getConfig",isAuth:"isAuth",isStatic:"isStatic"})),methods:{signIn:function(){var t=this;this.toggleLoading(),this.isStatic?window.setTimeout(function(){t.authGoogle.signIn(t.onSignInSuccess,t.onSignInError)},1e3):window.setTimeout(function(){t.onSignInSuccess(t.config.gapi.services.auth.testAuthorizationCode)},1e3)},signOut:function(){var t=this;this.toggleLoading(),this.isStatic?window.setTimeout(function(){t.authGoogle.signOut(t.onSignOutSuccess,t.onSignOutError)},1e3):window.setTimeout(function(){t.onSignOutSuccess()},1e3)},disconnect:function(){var t=this;this.isStatic?window.setTimeout(function(){t.authGoogle.disconnect(),t.onDisconnect()},1e3):window.setTimeout(function(){t.onDisconnect()},1e3)},addScope:function(){var t=this;this.isStatic?window.setTimeout(function(){t.authGoogle.addScope("https://www.googleapis.com/auth/drive",t.onAddScopeSuccess,t.onAddScopeError)},1e3):window.setTimeout(function(){t.onAddScopeSuccess("AddScopeSuccess")},1e3)},onSignInSuccess:function(t){this.toggleLoading(),this.resetResponse();var e=t.getId();if(window.localStorage&&window.localStorage.setItem("token",e),this.$store.commit("SET_TOKEN",e),this.authGoogle.isCurrentUser()){var o=this.authGoogle.currentUser.getAuthResponse().id_token;console.log("CurrentUser - Token: "+o);var n=this.authGoogle.currentUser.getBasicProfile();console.log("ID: "+n.getId()),console.log("Full Name: "+n.getName()),console.log("Given Name: "+n.getGivenName()),console.log("Family Name: "+n.getFamilyName()),console.log("Image URL: "+n.getImageUrl()),console.log("Email: "+n.getEmail())}},onSignInError:function(t){this.response="Failed to sign-in",console.log("GOOGLE SERVER - SIGN-IN ERROR",t)},onSignOutSuccess:function(){if(this.toggleLoading(),this.resetResponse(),window.localStorage){if(!this.$store.state.auth.token){var t=window.localStorage.getItem("token");this.$store.commit("SET_TOKEN",t)}window.localStorage.setItem("token",null)}this.$store.commit("SET_TOKEN",null)},onSignOutError:function(t){this.response="Failed to sign-out",console.log("GOOGLE SERVER - SIGN-OUT ERROR",t)},onDisconnect:function(){if(window.localStorage){if(!this.$store.state.auth.token){var t=window.localStorage.getItem("token");this.$store.commit("SET_TOKEN",t)}window.localStorage.setItem("token",null)}this.$store.commit("SET_TOKEN",null)},onAddScopeSuccess:function(t){this.response=t},onAddScopeError:function(t){this.response="Failed to add-scope",console.log("GOOGLE SERVER - ADD-SCOPE ERROR",t)},onCurrentUser:function(t){if(this.config.debug&&(console.log("authGoogle.CurrentUser.id:",t.getId()),t.getId())){var e=t.getBasicProfile();console.log("CurrentUser - ID: "+e.getId()),console.log("CurrentUser - Name: "+e.getName()),console.log("CurrentUser - Image URL: "+e.getImageUrl()),console.log("CurrentUser - Email: "+e.getEmail())}},toggleLoading:function(){this.loading=""===this.loading?this.isAuth?"Logout":"Login":""},resetResponse:function(){this.response=""}}}},wxAW:function(t,e,o){"use strict";e.__esModule=!0;var n=o("C4MV"),i=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,i.default)(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}()},xtWc:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"container"},[o("div",{staticClass:"text-center"},[o("h2",[t._v(t._s(t.title))])]),t._m(0),o("div",{staticClass:"jumbotron well text-center"},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"text-danger lead"},[o("p",[t._v(t._s(t.loading)+"...")])]),o("div",{directives:[{name:"show",rawName:"v-show",value:t.response,expression:"response"}],staticClass:"text-danger lead"},[o("p",[t._v(t._s(t.response))])]),o("div",{staticClass:"auth-btns"},[t.isAuth?o("div",[o("p",[t._v("You are currently signed in and have granted access to this app.")]),o("br"),o("a",{staticClass:"button--grey",on:{click:t.signOut}},[o("span",{staticClass:"glyphicon glyphicon-log-out",attrs:{"aria-hidden":"true"}}),t._v("\n          Sign out")]),o("a",{staticClass:"button--grey",on:{click:t.disconnect}},[o("span",{staticClass:"glyphicon glyphicon-remove-circle",attrs:{"aria-hidden":"true"}}),t._v(" Revoke access")]),o("a",{staticClass:"button--grey",on:{click:t.addScope}},[o("span",{staticClass:"glyphicon glyphicon-plus",attrs:{"aria-hidden":"true"}}),t._v(" Add scope")])]):o("div",[o("p",[t._v("You have not authorized this app or you are signed out.")]),o("br"),o("a",{staticClass:"button--green",on:{click:t.signIn}},[o("span",{staticClass:"glyphicon glyphicon-log-in",attrs:{"aria-hidden":"true"}}),t._v(" Sign In/Authorize")])])])])])},i=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"bs-callout-info bs-callout"},[o("h4",[t._v("Get a Google Account")]),o("p",[t._v("To test Google services you need to have an Google Account.")]),o("p",[t._v("First, "),o("a",{attrs:{href:"https://www.google.com/accounts",target:"_blank"}},[t._v("sign up")]),t._v(" for a\n      Google Account if you do not already have one.\n    ")])])}],s={render:n,staticRenderFns:i};e.a=s}});
//# sourceMappingURL=login.b082ae4489b3aaba49fe.js.map