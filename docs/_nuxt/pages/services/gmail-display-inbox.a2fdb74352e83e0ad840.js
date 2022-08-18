webpackJsonp([2],{OPnp:function(t,e,s){"use strict";var a=s("Dd8w"),i=s.n(a),o=s("NYxO");e.a={middleware:"authenticated",data:function(){return{title:"Method: Users.messages.list",description:"Lists the messages in the user's mailbox.",isShow:!1}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},mounted:function(){this.$nextTick(function(){var t=this;this.config.debug&&console.log("gmail-display-inbox.mounted - OK"),this.isTesting?(this.isShow=!0,this.$store.dispatch("receiveGmailMyMessages")):window.gapi.client.gmail?(this.isShow=!0,this.$store.dispatch("receiveGmailMyMessages")):this.apiGoogle.loadGmailApi().then(function(){t.config.debug&&console.log("loadGmailApi - OK"),t.isShow=!0,t.$store.dispatch("receiveGmailMyMessages")})})},computed:i()({},Object(o.mapGetters)({config:"getConfig",google:"getGoogleData",isTesting:"isTesting"}))}},TG11:function(t,e,s){"use strict";function a(t){s("afPe")}Object.defineProperty(e,"__esModule",{value:!0});var i=s("OPnp"),o=s("eAPO"),l=s("VU/8"),n=a,r=l(i.a,o.a,n,null,null);e.default=r.exports},afPe:function(t,e,s){var a=s("fBVM");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s("rjj0")("802f66d0",a,!0)},eAPO:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"container"},[s("div",{staticClass:"text-center"},[s("h2",[t._v(t._s(t.title))]),s("p",{staticClass:"lead"},[t._v(t._s(t.description))])]),t._m(0),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}]},[s("h1",[t._v("Gmail API demo")]),s("table",{staticClass:"table table-striped table-inbox"},[t._m(1),s("tbody",[t._l(t.google.gmail.inbox,function(e){return[s("tr",{key:e.id},[s("td",{domProps:{textContent:t._s(e.from)}}),s("td",[s("a",{attrs:{href:"#message-modal-"+e.id,"data-toggle":"modal",id:"message-link-"+e.id},domProps:{textContent:t._s(e.subject)}})]),s("td",[t._v(t._s(e.date))])])]})],2)]),t._l(t.google.gmail.inbox,function(e){return[s("div",{key:e.id,staticClass:"modal fade",attrs:{id:"message-modal-"+e.id,tabindex:"-1",role:"dialog","aria-labelledby":"myModalLabel"}},[s("div",{staticClass:"modal-dialog modal-lg"},[s("div",{staticClass:"modal-content"},[s("div",{staticClass:"modal-header"},[t._m(2,!0),s("h4",{staticClass:"modal-title",attrs:{id:"myModalLabel"}},[t._v(t._s(e.subject))])]),s("div",{staticClass:"modal-body"},[s("iframe",{attrs:{id:"message-iframe-"+e.id,srcdoc:e.body}})]),t._m(3,!0)])])])]})],2)])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bs-callout-info bs-callout"},[s("h4",[t._v("Method: Users.messages.list")]),s("p",[t._v("Lists the messages in the user's mailbox.")]),s("h4",[t._v("HTTP request")]),s("p",[s("code",[t._v("GET https://www.googleapis.com/gmail/v1/users/userId/messages")])]),s("p",{staticClass:"lead"},[t._v("\n      Details can be found "),s("a",{attrs:{href:"https://developers.google.com/gmail/api/v1/reference/users/messages/list",target:"_blank"}},[t._v("here")]),t._v(".\n    ")]),s("p",[t._v("This example was created on the basis of an "),s("a",{attrs:{href:"https://www.sitepoint.com/sending-emails-gmail-javascript-api/",target:"_blank"}},[t._v("article")]),t._v(" written by "),s("a",{attrs:{href:"https://www.sitepoint.com/author/jshields/",target:"_blank"}},[t._v("Jamie Shields")]),t._v(".")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("From")]),s("th",[t._v("Subject")]),s("th",[t._v("Date/Time")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-default",attrs:{type:"button","data-dismiss":"modal"}},[t._v("Close")])])}],o={render:a,staticRenderFns:i};e.a=o},fBVM:function(t,e,s){e=t.exports=s("FZ+f")(!1),e.push([t.i,"iframe{width:100%;border:0;min-height:80%;height:600px;display:-webkit-box;display:-ms-flexbox;display:flex}",""])}});
//# sourceMappingURL=gmail-display-inbox.a2fdb74352e83e0ad840.js.map