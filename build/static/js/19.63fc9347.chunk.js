(window["webpackJsonpinvenctory-react"]=window["webpackJsonpinvenctory-react"]||[]).push([[19],{134:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},146:function(e,t,a){"use strict";var n=a(134),r=a(6),c=a(4),i=a(0),o=(a(7),a(127)),l=a(246),s=a(144),u=a(129),d=a(128),m=a(126),b=a(265),f=a(247);function v(e){return Object(b.a)("MuiCircularProgress",e)}Object(f.a)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var h,p,E,j,O,g,k,y,x=a(123),S=["className","color","disableShrink","size","style","thickness","value","variant"],w=Object(s.c)(O||(O=h||(h=Object(n.a)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),C=Object(s.c)(g||(g=p||(p=Object(n.a)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),N=Object(m.a)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],t["color".concat(Object(u.a)(a.color))]]}})((function(e){var t=e.ownerState,a=e.theme;return Object(c.a)({display:"inline-block"},"determinate"===t.variant&&{transition:a.transitions.create("transform")},"inherit"!==t.color&&{color:a.palette[t.color].main})}),(function(e){return"indeterminate"===e.ownerState.variant&&Object(s.b)(k||(k=E||(E=Object(n.a)(["\n      animation: "," 1.4s linear infinite;\n    "]))),w)})),P=Object(m.a)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(e,t){return t.svg}})({display:"block"}),D=Object(m.a)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(e,t){var a=e.ownerState;return[t.circle,t["circle".concat(Object(u.a)(a.variant))],a.disableShrink&&t.circleDisableShrink]}})((function(e){var t=e.ownerState,a=e.theme;return Object(c.a)({stroke:"currentColor"},"determinate"===t.variant&&{transition:a.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(e){var t=e.ownerState;return"indeterminate"===t.variant&&!t.disableShrink&&Object(s.b)(y||(y=j||(j=Object(n.a)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),C)})),_=i.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiCircularProgress"}),n=a.className,i=a.color,s=void 0===i?"primary":i,m=a.disableShrink,b=void 0!==m&&m,f=a.size,h=void 0===f?40:f,p=a.style,E=a.thickness,j=void 0===E?3.6:E,O=a.value,g=void 0===O?0:O,k=a.variant,y=void 0===k?"indeterminate":k,w=Object(r.a)(a,S),C=Object(c.a)({},a,{color:s,disableShrink:b,size:h,thickness:j,value:g,variant:y}),_=function(e){var t=e.classes,a=e.variant,n=e.color,r=e.disableShrink,c={root:["root",a,"color".concat(Object(u.a)(n))],svg:["svg"],circle:["circle","circle".concat(Object(u.a)(a)),r&&"circleDisableShrink"]};return Object(l.a)(c,v,t)}(C),M={},R={},z={};if("determinate"===y){var A=2*Math.PI*((44-j)/2);M.strokeDasharray=A.toFixed(3),z["aria-valuenow"]=Math.round(g),M.strokeDashoffset="".concat(((100-g)/100*A).toFixed(3),"px"),R.transform="rotate(-90deg)"}return Object(x.jsx)(N,Object(c.a)({className:Object(o.a)(_.root,n),style:Object(c.a)({width:h,height:h},R,p),ownerState:C,ref:t,role:"progressbar"},z,w,{children:Object(x.jsx)(P,{className:_.svg,ownerState:C,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44),children:Object(x.jsx)(D,{className:_.circle,style:M,ownerState:C,cx:44,cy:44,r:(44-j)/2,fill:"none",strokeWidth:j})})}))}));t.a=_},259:function(e,t,a){"use strict";a.r(t);var n=a(23),r=a(24),c=a(26),i=a(25),o=a(0),l=a.n(o),s=a(68),u=a(48),d=a(229),m=a(223),b=a(93),f=a(10),v=a(136),h=a(146),p=(a(135),a(28));var E=function(){var e=Object(f.g)(),t=Object(o.useState)(null),a=Object(u.a)(t,2),n=a[0],r=a[1],c=Object(o.useState)(null),i=Object(u.a)(c,2),E=i[0],j=i[1],O=Object(o.useState)(null),g=Object(u.a)(O,2),k=g[0],y=g[1],x=Object(o.useState)(!1),S=Object(u.a)(x,2),w=S[0],C=S[1],N=Object(o.useState)(null),P=Object(u.a)(N,2),D=P[0],_=P[1],M=Object(o.useState)(null),R=Object(u.a)(M,2),z=R[0],A=R[1],q=Object(o.useState)(!0),L=Object(u.a)(q,2),T=L[0],B=L[1];Object(o.useEffect)((function(){var e=!0,t=p.a.database().ref();return p.a.auth().onAuthStateChanged((function(a){a?t.child("usuarios/".concat(a.uid)).get().then((function(t){e&&(t.exists()?j(Object(s.a)({},t.val())):(console.log("No data available"),j({})))})).catch((function(e){console.error(e)})):console.log("no user")})),function(){e=!1}}),[]),Object(o.useEffect)((function(){var e=!0;return E&&(p.a.database().ref("/filiais/".concat(E.id_filial,"/estoque/produtos/")).orderByChild("tipo").once("value",(function(t){if(e){var a=[];t.forEach((function(e){a[e.key]=e.val()})),r(a)}})),p.a.database().ref("/usuarios/").once("value",(function(t){if(e){var a=[];t.forEach((function(e){a[e.key]=e.val()})),y(a)}}))),function(){e=!1}}),[E]),Object(o.useEffect)((function(){n&&k&&E&&B(!1)}),[n,k,E]);var F=function(){return C(!1)};return l.a.createElement("div",{className:"row "},T&&l.a.createElement(h.a,{style:{marginLeft:"50%",marginTop:"20%"}}),!T&&("dev"===E.tipo_atual||"diretor"===E.tipo_atual||"administrador"===E.tipo_atual)&&l.a.createElement("div",{className:"col-12 grid-margin"},l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h4",{className:"card-title"},"Produtos"),l.a.createElement("div",{className:"table-responsive"},l.a.createElement("table",{className:"table"},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null," Cadastrado por "),l.a.createElement("th",null," Categoria "),l.a.createElement("th",null," Tipo "),l.a.createElement("th",null," Quantidade inicial "),l.a.createElement("th",null," Quantidade atual "),l.a.createElement("th",null," Descri\xe7\xe3o "),l.a.createElement("th",null," Hora do Cadastro "),l.a.createElement("th",null," Data do Cadastro "),l.a.createElement("th",null," "))),l.a.createElement("tbody",null,n&&k&&Object.keys(n).map((function(t){return l.a.createElement("tr",{key:t},l.a.createElement("td",null,void 0!==k[n[t].id_usuario]?k[n[t].id_usuario].nome.split(" ").slice(0,2).join(" "):n[t].id_usuario),l.a.createElement("td",null," ",n[t].categoria," "),l.a.createElement("td",null," ",n[t].tipo," "),l.a.createElement("td",null," ",n[t].qt_inicial),l.a.createElement("td",null," ",n[t].qt_atual),l.a.createElement("td",null," ",n[t].descricao),l.a.createElement("td",null," ",n[t].hora),l.a.createElement("td",null," ",n[t].data),l.a.createElement("td",{style:{display:"flex"}},l.a.createElement("button",{style:{display:"flex"},type:"button",className:"btn btn-primary btn-icon-text",onClick:function(){!function(t){e.push("/management/products-list-photos/".concat(t))}(t)}},l.a.createElement("i",{className:"icon mdi mdi-image-multiple"})),l.a.createElement("button",{style:{display:"flex"},type:"button",className:"btn btn-warning btn-icon-text",onClick:function(){!function(t){e.push("/management/products-list-edit/".concat(t))}(t)}},l.a.createElement("i",{className:"icon mdi mdi-pencil"})),l.a.createElement("button",{style:{display:"flex"},type:"button",className:"btn btn-danger btn-icon-text",onClick:function(){!function(e){C(!0),_(n[e]),A(e)}(t)}},l.a.createElement("i",{className:"icon mdi mdi mdi-delete"}))))})))),D&&l.a.createElement(d.a,{show:w,onHide:F},l.a.createElement(d.a.Body,null,l.a.createElement(m.a,{variant:"danger"},l.a.createElement(m.a.Heading,null,"TEM CERTEZA?"),l.a.createElement("p",null,"Ao excluir este produto a opera\xe7\xe3o n\xe3o poder\xe1 ser desfeita. Produto: ",D.categoria),l.a.createElement("hr",null))),l.a.createElement(d.a.Footer,null,l.a.createElement(b.a,{variant:"danger",onClick:F},"Cancelar"),l.a.createElement(b.a,{variant:"success",onClick:function(){!function(){C(!1);var e=p.a.storage().ref();p.a.database().ref("/filiais/".concat(E.id_filial,"/estoque/produtos/").concat(z)).remove().then((function(){v.b.loading("Excluindo dados",{theme:"dark",position:"top-center"}),e.child("filiais/".concat(E.id_filial,"/produtos/").concat(z)).listAll().then((function(t){console.log(t.items.length),0===t.items.length&&window.location.reload();var a=1;t.items.forEach((function(n){e.child(n.fullPath).delete().then((function(){a!==t.items.length?a+=1:window.location.reload(),console.log("deleted : ".concat(n.name))}))}))}))}))}()}},"Confirmar"))),l.a.createElement(v.a,null))))))};a.d(t,"ProductsList",(function(){return j}));var j=function(e){Object(c.a)(a,e);var t=Object(i.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"page-header"},l.a.createElement("h3",{className:"page-title"}," Listar Produtos "),l.a.createElement("nav",{"aria-label":"breadcrumb"},l.a.createElement("ol",{className:"breadcrumb"},l.a.createElement("li",{className:"breadcrumb-item"},l.a.createElement("a",{href:"!#",onClick:function(e){return e.preventDefault()}},"Administra\xe7\xe3o")),l.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Listar Produtos")))),l.a.createElement(E,null))}}]),a}(o.Component);t.default=j}}]);
//# sourceMappingURL=19.63fc9347.chunk.js.map