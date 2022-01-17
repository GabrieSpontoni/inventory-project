(window["webpackJsonpinvenctory-react"]=window["webpackJsonpinvenctory-react"]||[]).push([[21],{134:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},147:function(e,t,a){"use strict";var n=a(134),r=a(6),c=a(4),o=a(0),i=(a(7),a(128)),l=a(246),s=a(144),u=a(129),d=a(127),m=a(126),b=a(268),f=a(247);function v(e){return Object(b.a)("MuiCircularProgress",e)}Object(f.a)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var h,j,O,E,p,k,y,g,S=a(123),w=["className","color","disableShrink","size","style","thickness","value","variant"],x=Object(s.c)(p||(p=h||(h=Object(n.a)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),N=Object(s.c)(k||(k=j||(j=Object(n.a)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),C=Object(m.a)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],t["color".concat(Object(u.a)(a.color))]]}})((function(e){var t=e.ownerState,a=e.theme;return Object(c.a)({display:"inline-block"},"determinate"===t.variant&&{transition:a.transitions.create("transform")},"inherit"!==t.color&&{color:a.palette[t.color].main})}),(function(e){return"indeterminate"===e.ownerState.variant&&Object(s.b)(y||(y=O||(O=Object(n.a)(["\n      animation: "," 1.4s linear infinite;\n    "]))),x)})),P=Object(m.a)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(e,t){return t.svg}})({display:"block"}),_=Object(m.a)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(e,t){var a=e.ownerState;return[t.circle,t["circle".concat(Object(u.a)(a.variant))],a.disableShrink&&t.circleDisableShrink]}})((function(e){var t=e.ownerState,a=e.theme;return Object(c.a)({stroke:"currentColor"},"determinate"===t.variant&&{transition:a.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(e){var t=e.ownerState;return"indeterminate"===t.variant&&!t.disableShrink&&Object(s.b)(g||(g=E||(E=Object(n.a)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),N)})),D=o.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiCircularProgress"}),n=a.className,o=a.color,s=void 0===o?"primary":o,m=a.disableShrink,b=void 0!==m&&m,f=a.size,h=void 0===f?40:f,j=a.style,O=a.thickness,E=void 0===O?3.6:O,p=a.value,k=void 0===p?0:p,y=a.variant,g=void 0===y?"indeterminate":y,x=Object(r.a)(a,w),N=Object(c.a)({},a,{color:s,disableShrink:b,size:h,thickness:E,value:k,variant:g}),D=function(e){var t=e.classes,a=e.variant,n=e.color,r=e.disableShrink,c={root:["root",a,"color".concat(Object(u.a)(n))],svg:["svg"],circle:["circle","circle".concat(Object(u.a)(a)),r&&"circleDisableShrink"]};return Object(l.a)(c,v,t)}(N),M={},R={},z={};if("determinate"===g){var F=2*Math.PI*((44-E)/2);M.strokeDasharray=F.toFixed(3),z["aria-valuenow"]=Math.round(k),M.strokeDashoffset="".concat(((100-k)/100*F).toFixed(3),"px"),R.transform="rotate(-90deg)"}return Object(S.jsx)(C,Object(c.a)({className:Object(i.a)(D.root,n),style:Object(c.a)({width:h,height:h},R,j),ownerState:N,ref:t,role:"progressbar"},z,x,{children:Object(S.jsx)(P,{className:D.svg,ownerState:N,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44),children:Object(S.jsx)(_,{className:D.circle,style:M,ownerState:N,cx:44,cy:44,r:(44-E)/2,fill:"none",strokeWidth:E})})}))}));t.a=D},262:function(e,t,a){"use strict";a.r(t);var n=a(23),r=a(24),c=a(26),o=a(25),i=a(0),l=a.n(i),s=(a(96),a(68)),u=a(48),d=a(10),m=a(147),b=(a(136),a(28));var f=function(){var e=Object(d.g)(),t=Object(i.useState)(null),a=Object(u.a)(t,2),n=a[0],r=a[1],c=Object(i.useState)(null),o=Object(u.a)(c,2),f=o[0],v=o[1],h=Object(i.useState)(null),j=Object(u.a)(h,2),O=j[0],E=j[1],p=Object(i.useState)(!0),k=Object(u.a)(p,2),y=k[0],g=k[1];return Object(i.useEffect)((function(){var e=!0,t=b.a.database().ref();return b.a.auth().onAuthStateChanged((function(a){a?t.child("usuarios/".concat(a.uid)).get().then((function(t){e&&(t.exists()?v(Object(s.a)({},t.val())):(console.log("No data available"),v({})))})).catch((function(e){console.error(e)})):console.log("no user")})),function(){e=!1}}),[]),Object(i.useEffect)((function(){var e=!0;return f&&(b.a.database().ref("/filiais/".concat(f.id_filial,"/obras/")).once("value",(function(t){if(e){var a=[];t.forEach((function(e){a[e.key]=e.val()})),r(a)}})),b.a.database().ref("/usuarios/").once("value",(function(t){if(e){var a=[];t.forEach((function(e){a[e.key]=e.val()})),E(a)}}))),function(){e=!1}}),[f]),Object(i.useEffect)((function(){n&&O&&f&&g(!1)}),[n,O,f]),l.a.createElement("div",{className:"row "},y&&l.a.createElement(m.a,{style:{marginLeft:"50%",marginTop:"20%"}}),!y&&("dev"===f.tipo_atual||"diretor"===f.tipo_atual||"administrador"===f.tipo_atual)&&l.a.createElement("div",{className:"col-12 grid-margin"},l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h4",{className:"card-title"},"Produtos"),l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",{className:"table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null," Usu\xe1rio "),l.a.createElement("th",null," Nome da Obra "),l.a.createElement("th",null," Endere\xe7o "),l.a.createElement("th",null," Cidade "),l.a.createElement("th",null," Respons\xe1vel "),l.a.createElement("th",null," Telefone "),l.a.createElement("th",null," Email "),l.a.createElement("th",null," Hora do Cadastro "),l.a.createElement("th",null," Data do Cadastro "),l.a.createElement("th",null," "))),l.a.createElement("tbody",null,n&&O&&Object.keys(n).map((function(t){return console.log(n),l.a.createElement("tr",{key:t},l.a.createElement("td",null,void 0!==O[n[t].id_usuario]?O[n[t].id_usuario].nome.split(" ").slice(0,2).join(" "):n[t].id_usuario),l.a.createElement("td",null," ",n[t].nome_obra," "),l.a.createElement("td",null," ",n[t].endereco_obra," "),l.a.createElement("td",null," ",n[t].cidade_obra),l.a.createElement("td",null," ",n[t].responsavel),l.a.createElement("td",null," ",n[t].telefone),l.a.createElement("td",null," ",n[t].email),l.a.createElement("td",null," ",n[t].hora),l.a.createElement("td",null," ",n[t].data),l.a.createElement("td",{style:{display:"flex"}},l.a.createElement("button",{style:{display:"flex"},type:"button",className:"btn btn-warning btn-icon-text",onClick:function(){!function(t){e.push("/management/constructions-list-edit/".concat(t))}(t)}},l.a.createElement("i",{className:"icon mdi mdi-pencil"}))))})))))))))};a.d(t,"NewConstructions",(function(){return v}));var v=function(e){Object(c.a)(a,e);var t=Object(o.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(f,null))}}]),a}(i.Component);t.default=v}}]);
//# sourceMappingURL=21.34892109.chunk.js.map