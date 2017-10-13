webpackJsonp([6],{"6geR":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{staticClass:"container"},[i("div",{staticClass:"text-center"},[i("h2",[e._v(e._s(e.title))]),i("p",{staticClass:"lead"},[e._v(e._s(e.description))])]),e._m(0),e.isSignedIn?e._e():i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(t){e.apiGoogle.handleAuthClick(e.apiGoogle)}}},[e._v("\n    Authorize\n  ")]),e.isSignedIn?i("div",[i("h1",[e._v("Gmail API Send message")]),i("a",{staticClass:"btn btn-primary pull-right",attrs:{href:"#compose-modal","data-toggle":"modal",id:"compose-button"}},[e._v("Send Email")]),i("div",{staticClass:"modal fade",attrs:{id:"compose-modal",tabindex:"-1",role:"dialog"}},[i("div",{staticClass:"modal-dialog modal-lg"},[i("div",{staticClass:"modal-content"},[e._m(1),i("form",{on:{submit:function(t){t.preventDefault(),e.sendEmail(t)}}},[i("div",{staticClass:"modal-body"},[i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.toEmail,expression:"toEmail",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"email",id:"compose-to",placeholder:"To",required:""},domProps:{value:e.toEmail},on:{input:function(t){t.target.composing||(e.toEmail=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.subjectEmail,expression:"subjectEmail",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{type:"text",id:"compose-subject",placeholder:"Subject",required:""},domProps:{value:e.subjectEmail},on:{input:function(t){t.target.composing||(e.subjectEmail=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})]),i("div",{staticClass:"form-group"},[i("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.textEmail,expression:"textEmail",modifiers:{trim:!0}}],staticClass:"form-control",attrs:{id:"compose-message",placeholder:"Message",rows:"10",required:""},domProps:{value:e.textEmail},on:{input:function(t){t.target.composing||(e.textEmail=t.target.value.trim())},blur:function(t){e.$forceUpdate()}}})])]),i("div",{staticClass:"modal-footer"},[i("button",{staticClass:"btn btn-default",attrs:{type:"button","data-dismiss":"modal"}},[e._v("Close")]),i("button",{class:["btn","btn-primary",{disabled:e.disabled}],attrs:{type:"submit",id:"send-button"}},[e._v("Send\n              ")])])])])])])]):e._e()])},s=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bs-callout-info bs-callout"},[i("h4",[e._v("Method: Users.messages: send")]),i("div",{staticClass:"alert alert-info"},[i("span",{staticClass:"glyphicon glyphicon-star",attrs:{"aria-hidden":"true"}}),i("strong",{staticClass:"text-primary"},[e._v("Requires authorization")])]),i("p",[e._v("Sends the specified message to the recipients in the To, Cc, and Bcc headers.")]),i("p",[e._v("This method supports an "),i("strong",[e._v("/upload")]),e._v("\n      URI and accepts uploaded media with the following characteristics:")]),i("ul",[i("li",[i("strong",[e._v("Maximum file size:")]),e._v(" 35MB")]),i("li",[i("strong",[e._v("Accepted Media MIME types:")]),i("code",[e._v("message/rfc822")])])]),i("h4",[e._v("HTTP request")]),i("p",[e._v("This method provides media upload functionality through two separate URIs. For more details, see the document\n      on "),i("a",{attrs:{href:"https://developers.google.com/gmail/api/guides/uploads",target:"_blank"}},[e._v("media upload")]),e._v(".")]),i("ul",[i("li",[e._v("Upload URI, for media upload requests:\n        "),i("code",[e._v("POST https://www.googleapis.com/upload/gmail/v1/users/"),i("span",{staticClass:"text-primary"},[i("strong",[e._v("userId")])]),e._v("/messages/send")])]),i("li",[e._v("Metadata URI, for metadata-only requests:\n        "),i("code",[e._v("POST https://www.googleapis.com/gmail/v1/users/"),i("span",{staticClass:"text-primary"},[i("strong",[e._v("userId")])]),e._v("/messages/send")])])]),i("p",{staticClass:"lead"},[e._v("\n      Details can be found "),i("a",{attrs:{href:"https://developers.google.com/gmail/api/v1/reference/users/messages/send",target:"_blank"}},[e._v("here")]),e._v(".")]),i("p",[e._v("This example was created on the basis of an "),i("a",{attrs:{href:"https://www.sitepoint.com/sending-emails-gmail-javascript-api/",target:"_blank"}},[e._v("article")]),e._v(" written by "),i("a",{attrs:{href:"https://www.sitepoint.com/author/jshields/",target:"_blank"}},[e._v("Jamie Shields")]),e._v(".")])])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"modal-header"},[i("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[i("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])]),i("h4",{staticClass:"modal-title"},[e._v("Compose")])])}],n={render:a,staticRenderFns:s};t.a=n},LeJU:function(e,t,i){"use strict";var a=i("Dd8w"),s=i.n(a),n=i("NYxO"),o=i("M4fF"),l=i.n(o),r=i("WSyU");t.a={data:function(){return{title:"Method: Users.messages.send",description:"Sends the specified message to the recipients in the To, Cc, and Bcc headers.",apiGoogle:null,isSignedIn:!1,toEmail:"",subjectEmail:"",textEmail:"",disabled:!1}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},fetch:function(e){var t=e.isClient,i=e.isStatic,a=e.config;t&&a.debug&&console.log("gmail-send-message.fetch - OK: ","isStatic="+i+";"),t&&i&&location.reload(!0)},created:function(){if(!this.$isServer&&this.config.debug&&console.log("gmail-send-message.created - OK"),!this.$isServer){var e={debug:this.config.debug,apiKey:this.config.gapi.apiKey,clientId:this.config.gapi.clientId,discoveryDocs:this.config.gapi.services.gmail.discoveryDocs,scope:this.config.gapi.services.gmail.scopes["messages.list.send"]};this.apiGoogle=new r.a(e)}},mounted:function(){this.$nextTick(function(){var e=this;this.config.debug&&console.log("gmail-send-message.mounted - OK"),this.isStatic?this.apiGoogle.loadGoogleAPI().then(function(){return e.config.debug&&console.log("loadGoogleAPI - OK"),e.apiGoogle.init()}).then(function(){e.config.debug&&console.log("apiGoogle.init - OK");var t=e.updateSigninStatus.bind(e);e.apiGoogle.listenSignedIn(t),e.updateSigninStatus(e.apiGoogle.isSignedIn())}):this.updateSigninStatus(!0)})},computed:s()({},Object(n.mapGetters)({config:"getConfig",google:"getGapi",isStatic:"isStatic"})),methods:{updateSigninStatus:function(e){var t=this;this.config.debug&&console.log("updateSigninStatus - OK: ","isSignedIn="+e+"; "),this.isSignedIn=e,e&&this.isStatic&&this.apiGoogle.loadGmailApi().then(function(){t.config.debug&&console.log("loadGmailApi - OK")})},sendEmail:function(){return this.disabled=!0,this.sendMessage({To:this.toEmail,Subject:this.subjectEmail},this.textEmail,this.composeTidy),!1},composeTidy:function(){window.$("#compose-modal").modal("hide"),this.config.debug&&console.log("SendEmail - OK: ",'toEmail="'+this.toEmail+'"; ','subjectEmail="'+this.subjectEmail+'"; ','textEmail="'+this.textEmail+'";'),this.toEmail="",this.subjectEmail="",this.textEmail="",this.disabled=!1},sendMessage:function(e,t,i){var a=this,s="";if(l.a.forEach(e,function(e,t){s+=t+": "+e+"\r\n"}),s+="\r\n"+t,this.isStatic){window.gapi.client.gmail.users.messages.send({userId:"me",resource:{raw:window.btoa(s).replace(/\+/g,"-").replace(/\//g,"_")}}).execute(i)}else window.setTimeout(function(){alert('SendEmail - OK:\n toEmail="'+a.toEmail+'";\n subjectEmail="'+a.subjectEmail+'";\n textEmail="'+a.textEmail+'";'),i()},2e3)}}}},WSyU:function(e,t,i){"use strict";var a=i("//Fk"),s=i.n(a),n=i("Zrlr"),o=i.n(n),l=i("wxAW"),r=i.n(l),c=function(){function e(t){o()(this,e),this.name="load-google-api",this._callbackName="__googleApiOnLoadCallback",this._clientURL="https://apis.google.com/js/client.js?onload="+this._callbackName,this._apiKey=t.apiKey,this._clientId=t.clientId,this._discoveryDocs=t.discoveryDocs,this._scope=t.scope?t.scope.join(" "):"",this.error=null,this.debug=!!t.debug}return r()(e,[{key:"loadGoogleAPI",value:function(){var e=this;return new s.a(function(t,i){var a=document.createElement("script");a.src=e._clientURL,window[e._callbackName]=function(){t()},document.body.appendChild(a)})}},{key:"init",value:function(){var e=this,t=new s.a(function(e,t){window.gapi.load("client:auth2",e)}),i=new s.a(function(t,i){window.gapi.client.init({apiKey:e._apiKey,clientId:e._clientId,discoveryDocs:e._discoveryDocs,scope:e._scope}).then(t,function(t){e.error=t,console.error("Gapi.client.init - Error",t),alert("Error: "+t.error+"\n Details: "+t.details)})});return s.a.all([t,i])}},{key:"loadGapiClient",value:function(){return new s.a(function(e,t){window.gapi.load("client:auth2",e)})}},{key:"iniGapiClient",value:function(e){var t=this;return new s.a(function(i,a){window.gapi.client.init({apiKey:e.apiKey,clientId:e.clientId,discoveryDocs:e.discoveryDocs,scope:e.scope.join(" ")}).then(i,function(e){t.error=e,console.error("Gapi.client.init - Error",e),alert("Error: "+e.error+"\n Details: "+e.details)})})}},{key:"loadGmailApi",value:function(){return new s.a(function(e,t){window.gapi.client.load("gmail","v1",e)})}},{key:"isSignedIn",value:function(){return window.gapi.auth2.getAuthInstance().isSignedIn.get()}},{key:"listenSignedIn",value:function(e){this.debug&&console.log("listenSignedIn - OK"),window.gapi.auth2.getAuthInstance().isSignedIn.listen(e)}},{key:"handleAuthClick",value:function(e){e.debug&&console.log("handleAuthClick - OK"),window.gapi&&window.gapi.auth2.getAuthInstance().signIn()}},{key:"handleSignoutClick",value:function(e){e.debug&&console.log("handleSignoutClick - OK"),window.gapi&&window.gapi.auth2.getAuthInstance().signOut()}}]),e}();t.a=c},Zrlr:function(e,t,i){"use strict";t.__esModule=!0,t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},sY1g:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("LeJU"),s=i("6geR"),n=i("VU/8"),o=n(a.a,s.a,null,null,null);t.default=o.exports},wxAW:function(e,t,i){"use strict";t.__esModule=!0;var a=i("C4MV"),s=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),(0,s.default)(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}()}});
//# sourceMappingURL=gmail-send-message.be51baf352350796e75a.js.map