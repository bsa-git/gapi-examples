webpackJsonp([8],{KEe9:function(e,t,s){"use strict";var o=s("Dd8w"),a=s.n(o),i=s("NYxO");t.a={middleware:"authenticated",data:function(){return{title:"Method: people.get",description:"Provides information about a person by specifying a resource name",isShow:!1}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},computed:a()({},Object(i.mapGetters)({google:"getGoogleData"})),methods:{showPeopleMyNames:function(){this.isShow=!0,this.$store.dispatch("receivePeopleMyNames")}}}},WmRc:function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",{staticClass:"container"},[s("div",{staticClass:"text-center"},[s("h2",[e._v(e._s(e.title))]),s("p",{staticClass:"lead"},[e._v(e._s(e.description))])]),e._m(0),s("div",{staticClass:"jumbotron text-center well"},[s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:e.showPeopleMyNames}},[e._v("About Me")]),s("div",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticClass:"lead"},[e._v("Hellow "+e._s(e.google.people_my.names.givenName)+"!")])])])},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"bs-callout-info bs-callout"},[s("h4",[e._v("Method: people.get")]),s("p",[e._v("\n      Provides information about a person by specifying a resource name. Use "),s("code",[e._v("people/me")]),e._v(" to indicate the\n      authenticated user. "),s("br"),e._v(" The request throws a 400 error if 'personFields' is not specified.\n    ")]),s("h4",[e._v("HTTP request")]),s("p",[s("code",[e._v("GET https://people.googleapis.com/v1/{resourceName=people/*}")])]),s("p",[e._v("The URL uses "),s("a",{attrs:{href:"https://github.com/googleapis/googleapis/blob/master/google/api/http.proto",target:"_blank"}},[e._v("Google API HTTP annotation")]),e._v(" syntax.")]),s("p",{staticClass:"lead"},[e._v("Details can be found "),s("a",{attrs:{href:"https://developers.google.com/people/api/rest/v1/people/get",target:"_blank"}},[e._v("here")]),e._v(".")])])}],i={render:o,staticRenderFns:a};t.a=i},"f/os":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("KEe9"),a=s("WmRc"),i=s("VU/8"),n=i(o.a,a.a,null,null,null);t.default=n.exports}});
//# sourceMappingURL=people-get.e2385296a58cb8628700.js.map