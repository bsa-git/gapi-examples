webpackJsonp([2],{"+HMp":function(n,t,e){"use strict";var i=e("//Fk"),o=e.n(i),s=e("woOf"),c=e.n(s),a=e("pFYg"),r=e.n(a),u=e("Zrlr"),l=e.n(u),g=e("wxAW"),d=e.n(g),f=function(){function n(t){l()(this,n),this.debug=!!t.debug,this.directAccess=!1,this.gapiUrl="https://apis.google.com/js/api:client.js",this.config=null,"object"===(void 0===t?"undefined":r()(t))&&(this.config=c()(t,{scope:"profile email https://www.googleapis.com/auth/plus.login"}))}return d()(n,[{key:"load",value:function(){var n=this;return new o.a(function(t,e){void 0===window.gapi?n._installClient().then(function(){return n.debug&&console.log("loadGoogleAPI - OK"),n._initClient()}).then(function(){n.debug&&console.log("apiGoogle.init - OK"),t()}):void 0!==window.gapi&&void 0===window.gapi.auth2&&n._initClient().then(function(){n.debug&&console.log("apiGoogle.init - OK"),t()})})}},{key:"directAccess",value:function(){this.directAccess=!0}},{key:"signIn",value:function(n,t){this.directAccess?window.gapi.auth2.getAuthInstance().signIn().then(function(t){n(t)},function(n){t(n)}):window.gapi.auth2.getAuthInstance().grantOfflineAccess().then(function(t){n(t.code)},function(n){t(n)})}},{key:"signOut",value:function(n,t){window.gapi.auth2.getAuthInstance().signOut().then(function(){n()},function(n){t(n)})}},{key:"_installClient",value:function(){var n=this;return new o.a(function(t,e){var i=document.createElement("script");i.src=n.gapiUrl,i.onreadystatechange=i.onload=function(){i.readyState&&!/loaded|complete/.test(i.readyState)||setTimeout(function(){t()},500)},document.getElementsByTagName("head")[0].appendChild(i)})}},{key:"_initClient",value:function(){var n=this;return new o.a(function(t,e){window.gapi.load("auth2",function(){window.gapi.auth2.init(n.config),t()})})}}]),n}();t.a=f},"8jbd":function(n,t,e){"use strict";function i(n){e("gsXE")}Object.defineProperty(t,"__esModule",{value:!0});var o=e("uUzE"),s=e("xtWc"),c=e("VU/8"),a=i,r=c(o.a,s.a,a,null,null);t.default=r.exports},Bg4N:function(n,t,e){t=n.exports=e("FZ+f")(!1),t.push([n.i,".button--green{display:inline-block;border-radius:4px;border:1px solid #3b8070;color:#3b8070;text-decoration:none;padding:10px 30px}.button--green:hover{color:#fff;background-color:#3b8070}.button--grey{display:inline-block;border-radius:4px;border:1px solid #35495e;color:#35495e;text-decoration:none;padding:10px 30px;margin-left:15px}.button--grey:hover{color:#fff;background-color:#35495e}",""])},Zrlr:function(n,t,e){"use strict";t.__esModule=!0,t.default=function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}},gsXE:function(n,t,e){var i=e("Bg4N");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("7a48227f",i,!0)},uUzE:function(n,t,e){"use strict";var i=e("Dd8w"),o=e.n(i),s=e("NYxO"),c=e("+HMp");t.a={data:function(){return{title:"Login Google User",description:"Handling Google sign-in and sign-out.",authGoogle:null,loading:"",response:""}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}],link:[]}},created:function(){if(!this.$isServer&&this.config.debug&&console.log("login.created - OK"),!this.$isServer){var n={debug:this.config.debug,clientId:this.config.gapi.clientId};this.authGoogle=new c.a(n)}},mounted:function(){var n=this;this.config.debug&&console.log("login.mounted - OK: ","isStatic="+this.config.isStatic),this.config.isStatic&&this.authGoogle.load().then(function(){n.config.debug&&console.log("authGoogle.load - OK")})},computed:o()({},Object(s.mapGetters)({config:"getConfig",google:"getGapi"})),methods:{signIn:function(){this.authGoogle.signIn(this.onSignInSuccess,this.onSignInError)},onSignInSuccess:function(n){this.toggleLoading(),this.resetResponse(),this.config.debug&&console.log("onSignInSuccess - OK: ",n)},onSignInError:function(n){this.response="Failed to sign-in",console.log("GOOGLE SERVER - SIGN-IN ERROR",n)},toggleLoading:function(){this.loading=""===this.loading?"loading":""},resetResponse:function(){this.response=""}}}},wxAW:function(n,t,e){"use strict";t.__esModule=!0;var i=e("C4MV"),o=function(n){return n&&n.__esModule?n:{default:n}}(i);t.default=function(){function n(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),(0,o.default)(n,i.key,i)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}()},xtWc:function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("section",{staticClass:"container"},[e("div",{staticClass:"text-center"},[e("h2",[n._v(n._s(n.title))])]),e("div",{staticClass:"jumbotron well text-center"},[n.response?e("div",{staticClass:"text-danger lead"},[e("p",[n._v(n._s(n.response))])]):n._e(),e("a",{staticClass:"button--green",attrs:{href:"#"},on:{click:n.signIn}},[e("span",{staticClass:"glyphicon glyphicon-user",attrs:{"aria-hidden":"true"}}),n._v(" Sign in with Google")])])])},o=[],s={render:i,staticRenderFns:o};t.a=s}});
//# sourceMappingURL=login.1abd8b3f45535f3e2ea4.js.map