webpackJsonp([1],{"0N2w":function(t,a,s){a=t.exports=s("FZ+f")(!1),a.push([t.i,".navbar-brand{color:#fff!important}",""])},"8M9p":function(t,a,s){"use strict";function e(t){s("v0PJ")}var n=s("cD1h"),i=s("AJcO"),r=s("VU/8"),o=e,l=r(n.a,i.a,o,null,null);a.a=l.exports},"8WXt":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("CWpF"),n=s("ADLo"),i=s("VU/8"),r=i(e.a,n.a,null,null,null);a.default=r.exports},ADLo:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",[s("app-header"),s("div",{staticClass:"container theme-showcase",attrs:{role:"main"}},[s("nuxt")],1)],1)},n=[],i={render:e,staticRenderFns:n};a.a=i},AJcO:function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("nav",{staticClass:"navbar navbar-inverse navbar-fixed-top"},[s("div",{staticClass:"container"},[s("div",{staticClass:"navbar-header"},[t._m(0),s("nuxt-link",{staticClass:"navbar-brand exotic--dark",attrs:{to:"/"}},[t._v("BSA Lab")])],1),s("div",{staticClass:"navbar-collapse collapse",attrs:{id:"navbar"}},[s("ul",{staticClass:"nav navbar-nav"},[s("li",{class:{active:"index"==t.$route.name}},[s("nuxt-link",{attrs:{to:"/"}},[t._v("Home")])],1),s("li",{class:["dropdown",{active:t.isGroupMenu("services")}]},[t._m(1),s("ul",{staticClass:"dropdown-menu"},[s("li",{staticClass:"dropdown-header"},[t._v("Google People API")]),s("li",[s("nuxt-link",{attrs:{to:"/services/people-about"}},[t._v("About")]),s("nuxt-link",{attrs:{to:"/services/people-get"}},[t._v("My Information")]),s("nuxt-link",{attrs:{to:"/services/people-connections"}},[t._v("My Connections")])],1),s("li",{staticClass:"divider",attrs:{role:"separator"}}),s("li",{staticClass:"dropdown-header"},[t._v("Google Gmail API")]),s("li",[s("nuxt-link",{attrs:{to:"/services/gmail-about"}},[t._v("About")]),s("nuxt-link",{attrs:{to:"/services/gmail-display-inbox"}},[t._v("Display My Inbox")]),s("nuxt-link",{attrs:{to:"/services/gmail-send-message"}},[t._v("Send message")])],1)])]),s("li",{class:{active:"login"==t.$route.name}},[s("nuxt-link",{attrs:{to:"/login"}},[t._v(t._s(t.isAuth?"Logout":"Login"))])],1)])])])])},n=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("button",{staticClass:"navbar-toggle collapsed",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbar","aria-expanded":"false","aria-controls":"navbar"}},[s("span",{staticClass:"sr-only"},[t._v("Toggle navigation")]),s("span",{staticClass:"icon-bar"}),s("span",{staticClass:"icon-bar"}),s("span",{staticClass:"icon-bar"})])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("a",{staticClass:"dropdown-toggle",attrs:{href:"#","data-toggle":"dropdown",role:"button","aria-haspopup":"true","aria-expanded":"false"}},[t._v("Services "),s("span",{staticClass:"caret"})])}],i={render:e,staticRenderFns:n};a.a=i},CWpF:function(t,a,s){"use strict";var e=s("8M9p");a.a={components:{AppHeader:e.a},created:function(){this.$store.commit("SET_IS_CLIENT",!this.$isServer)}}},cD1h:function(t,a,s){"use strict";var e=s("Dd8w"),n=s.n(e),i=s("NYxO");a.a={methods:{isGroupMenu:function(t){switch(t){case"services":return"/services/people-about"===this.$route.path||"/services/people-get"===this.$route.path||"/services/people-connections"===this.$route.path||"/services/gmail-about"===this.$route.path||"/services/gmail-display-inbox"===this.$route.path||"/services/gmail-send-message"===this.$route.path;default:return!1}}},computed:n()({},Object(i.mapGetters)({isAuth:"isAuth"}))}},v0PJ:function(t,a,s){var e=s("0N2w");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);s("rjj0")("0d86c413",e,!0)}});
//# sourceMappingURL=default.e77f61716c4016480631.js.map