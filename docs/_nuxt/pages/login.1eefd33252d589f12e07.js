webpackJsonp([2],{"+HMp":function(t,n,e){"use strict";var o=e("//Fk"),i=e.n(o),s=e("woOf"),a=e.n(s),l=e("pFYg"),c=e.n(l),u=e("Zrlr"),g=e.n(u),r=e("wxAW"),d=e.n(r),h=function(){function t(n){g()(this,t),this.debug=!!n.debug,this.directAccess=!1,this.gapiUrl="https://apis.google.com/js/platform.js",this.config=null,"object"===(void 0===n?"undefined":c()(n))&&(this.config=a()(n,{scope:"profile email https://www.googleapis.com/auth/plus.login"})),this.GoogleAuth=null,this.GoogleUser=null}return d()(t,[{key:"load",value:function(){var t=this;return new i.a(function(n,e){void 0===window.gapi?t._installClient().then(function(){return t.debug&&console.log("loadGoogleAPI - OK"),t._initClient()}).then(function(){t.debug&&console.log("apiGoogle.init - OK"),t.GoogleAuth=window.gapi.auth2.getAuthInstance(),t.GoogleUser=window.gapi.auth2.getAuthInstance().currentUser.get(),n()}):void 0!==window.gapi&&void 0===window.gapi.auth2&&t._initClient().then(function(){t.debug&&console.log("apiGoogle.init - OK"),t.GoogleAuth=window.gapi.auth2.getAuthInstance(),t.GoogleUser=window.gapi.auth2.getAuthInstance().currentUser.get(),n()})})}},{key:"directAccess",value:function(){this.directAccess=!0}},{key:"signIn",value:function(t,n){var e=this;this.directAccess?window.gapi.auth2.getAuthInstance().signIn().then(function(n){e.debug&&console.log("authGoogle.signIn - OK: ",n),t(n)},function(t){n(t)}):window.gapi.auth2.getAuthInstance().grantOfflineAccess({redirect_uri:"postmessage"}).then(function(n){e.debug&&console.log("authGoogle.signIn - OK: ",n),t(n.code)},function(t){n(t)})}},{key:"signOut",value:function(t,n){var e=this;window.gapi.auth2.getAuthInstance().signOut().then(function(){e.debug&&console.log("authGoogle.signOut - OK"),t()},function(t){n(t)})}},{key:"isSignedIn",value:function(){return window.gapi.auth2.getAuthInstance().isSignedIn.get()}},{key:"listenSignedIn",value:function(t){this.debug&&console.log("listenSignedIn - OK"),window.gapi.auth2.getAuthInstance().isSignedIn.listen(t)}},{key:"_installClient",value:function(){var t=this;return new i.a(function(n,e){var o=document.createElement("script");o.src=t.gapiUrl,o.onreadystatechange=o.onload=function(){o.readyState&&!/loaded|complete/.test(o.readyState)||setTimeout(function(){n()},500)},document.getElementsByTagName("head")[0].appendChild(o)})}},{key:"_initClient",value:function(){var t=this;return new i.a(function(n,e){window.gapi.load("auth2",function(){window.gapi.auth2.init(t.config),n()})})}}]),t}();n.a=h},"8jbd":function(t,n,e){"use strict";function o(t){e("gsXE")}Object.defineProperty(n,"__esModule",{value:!0});var i=e("uUzE"),s=e("xtWc"),a=e("VU/8"),l=o,c=a(i.a,s.a,l,null,null);n.default=c.exports},Bg4N:function(t,n,e){n=t.exports=e("FZ+f")(!1),n.push([t.i,".button--green{display:inline-block;border-radius:4px;border:1px solid #3b8070;color:#3b8070;text-decoration:none;padding:10px 30px}.button--green:hover{color:#fff;background-color:#3b8070}.button--grey{display:inline-block;border-radius:4px;border:1px solid #35495e;color:#35495e;text-decoration:none;padding:10px 30px;margin-left:15px}.button--grey:hover{color:#fff;background-color:#35495e}",""])},Zrlr:function(t,n,e){"use strict";n.__esModule=!0,n.default=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}},gsXE:function(t,n,e){var o=e("Bg4N");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e("rjj0")("7a48227f",o,!0)},uUzE:function(t,n,e){"use strict";var o=e("Dd8w"),i=e.n(o),s=e("NYxO"),a=e("+HMp");n.a={data:function(){return{title:"Login/Logout Google User",description:"Handling Google sign-in and sign-out.",authGoogle:null,loading:"",response:""}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}],link:[]}},created:function(){if(!this.$isServer&&this.config.debug&&console.log("login.created - OK"),!this.$isServer){var t={debug:this.config.debug,clientId:this.config.gapi.clientId};this.authGoogle=new a.a(t)}},mounted:function(){var t=this;this.config.debug&&console.log("login.mounted - OK"),this.isStatic&&this.authGoogle.load().then(function(){t.config.debug&&console.log("authGoogle.load - OK")})},computed:i()({},Object(s.mapGetters)({config:"getConfig",isAuth:"isAuth",isStatic:"isStatic"})),methods:{signIn:function(){var t=this;this.toggleLoading(),this.isStatic?window.setTimeout(function(){t.authGoogle.signIn(t.onSignInSuccess,t.onSignInError)},1e3):window.setTimeout(function(){t.onSignInSuccess(t.config.gapi.services.auth.testAuthorizationCode)},1e3)},signOut:function(){var t=this;this.toggleLoading(),this.isStatic?window.setTimeout(function(){t.authGoogle.signOut(t.onSignOutSuccess,t.onSignOutError)},1e3):window.setTimeout(function(){t.onSignOutSuccess()},1e3)},onSignInSuccess:function(t){this.toggleLoading(),this.resetResponse();var n=t.split("/"),e="";e+=n.length>1?n[1]:n[0],window.localStorage&&window.localStorage.setItem("token",e),this.$store.commit("SET_TOKEN",e);var o=this.authGoogle.googleUser.getBasicProfile();console.log("ID: "+o.getId()),console.log("Name: "+o.getName()),console.log("Image URL: "+o.getImageUrl()),console.log("Email: "+o.getEmail())},onSignInError:function(t){this.response="Failed to sign-in",console.log("GOOGLE SERVER - SIGN-IN ERROR",t)},onSignOutSuccess:function(){if(this.toggleLoading(),this.resetResponse(),window.localStorage){if(!this.$store.state.auth.token){var t=window.localStorage.getItem("token");this.$store.commit("SET_TOKEN",t)}window.localStorage.setItem("token",null)}this.$store.commit("SET_TOKEN",null)},onSignOutError:function(t){this.response="Failed to sign-out",console.log("GOOGLE SERVER - SIGN-OUT ERROR",t)},toggleLoading:function(){this.loading=""===this.loading?this.isAuth?"Logout":"Login":""},resetResponse:function(){this.response=""}}}},wxAW:function(t,n,e){"use strict";n.__esModule=!0;var o=e("C4MV"),i=function(t){return t&&t.__esModule?t:{default:t}}(o);n.default=function(){function t(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,i.default)(t,o.key,o)}}return function(n,e,o){return e&&t(n.prototype,e),o&&t(n,o),n}}()},xtWc:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("section",{staticClass:"container"},[e("div",{staticClass:"text-center"},[e("h2",[t._v(t._s(t.title))])]),t._m(0),e("div",{staticClass:"jumbotron well text-center"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"text-danger lead"},[e("p",[t._v(t._s(t.loading)+"...")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.response,expression:"response"}],staticClass:"text-danger lead"},[e("p",[t._v(t._s(t.response))])]),e("div",{staticClass:"auth-btns"},[t.isAuth?e("a",{staticClass:"button--grey",on:{click:t.signOut}},[e("span",{staticClass:"glyphicon glyphicon-log-out",attrs:{"aria-hidden":"true"}}),t._v("\n        Logout from Google")]):e("a",{staticClass:"button--green",on:{click:t.signIn}},[e("span",{staticClass:"glyphicon glyphicon-log-in",attrs:{"aria-hidden":"true"}}),t._v(" Login with Google")])])])])},i=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"bs-callout-info bs-callout"},[e("h4",[t._v("Get a Google Account")]),e("p",[t._v("To test Google services you need to have an Google Account.")]),e("p",[t._v("First, "),e("a",{attrs:{href:"https://www.google.com/accounts",target:"_blank"}},[t._v("sign up")]),t._v(" for a\n      Google Account if you do not already have one.\n    ")])])}],s={render:o,staticRenderFns:i};n.a=s}});
//# sourceMappingURL=login.1eefd33252d589f12e07.js.map