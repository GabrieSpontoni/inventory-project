(window["webpackJsonpinvenctory-react"]=window["webpackJsonpinvenctory-react"]||[]).push([[19],{128:function(e,t,a){"use strict";function n(e){var t,a,r="";if("string"===typeof e||"number"===typeof e)r+=e;else if("object"===typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(a=n(e[t]))&&(r&&(r+=" "),r+=a);else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}t.a=function(){for(var e,t,a=0,r="";a<arguments.length;)(e=arguments[a++])&&(t=n(e))&&(r&&(r+=" "),r+=t);return r}},134:function(e,t,a){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return n}))},147:function(e,t,a){"use strict";var n=a(134),r=a(6),c=a(4),l=a(0),i=(a(7),a(128)),o=a(246),s=a(144),u=a(129),d=a(127),m=a(126),b=a(268),f=a(247);function v(e){return Object(b.a)("MuiCircularProgress",e)}Object(f.a)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var h,E,j,O,g,p,y,k,S=a(123),w=["className","color","disableShrink","size","style","thickness","value","variant"],x=Object(s.c)(g||(g=h||(h=Object(n.a)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),N=Object(s.c)(p||(p=E||(E=Object(n.a)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),_=Object(m.a)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],t["color".concat(Object(u.a)(a.color))]]}})((function(e){var t=e.ownerState,a=e.theme;return Object(c.a)({display:"inline-block"},"determinate"===t.variant&&{transition:a.transitions.create("transform")},"inherit"!==t.color&&{color:a.palette[t.color].main})}),(function(e){return"indeterminate"===e.ownerState.variant&&Object(s.b)(y||(y=j||(j=Object(n.a)(["\n      animation: "," 1.4s linear infinite;\n    "]))),x)})),D=Object(m.a)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(e,t){return t.svg}})({display:"block"}),P=Object(m.a)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(e,t){var a=e.ownerState;return[t.circle,t["circle".concat(Object(u.a)(a.variant))],a.disableShrink&&t.circleDisableShrink]}})((function(e){var t=e.ownerState,a=e.theme;return Object(c.a)({stroke:"currentColor"},"determinate"===t.variant&&{transition:a.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(e){var t=e.ownerState;return"indeterminate"===t.variant&&!t.disableShrink&&Object(s.b)(k||(k=O||(O=Object(n.a)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),N)})),C=l.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiCircularProgress"}),n=a.className,l=a.color,s=void 0===l?"primary":l,m=a.disableShrink,b=void 0!==m&&m,f=a.size,h=void 0===f?40:f,E=a.style,j=a.thickness,O=void 0===j?3.6:j,g=a.value,p=void 0===g?0:g,y=a.variant,k=void 0===y?"indeterminate":y,x=Object(r.a)(a,w),N=Object(c.a)({},a,{color:s,disableShrink:b,size:h,thickness:O,value:p,variant:k}),C=function(e){var t=e.classes,a=e.variant,n=e.color,r=e.disableShrink,c={root:["root",a,"color".concat(Object(u.a)(n))],svg:["svg"],circle:["circle","circle".concat(Object(u.a)(a)),r&&"circleDisableShrink"]};return Object(o.a)(c,v,t)}(N),M={},R={},A={};if("determinate"===k){var q=2*Math.PI*((44-O)/2);M.strokeDasharray=q.toFixed(3),A["aria-valuenow"]=Math.round(p),M.strokeDashoffset="".concat(((100-p)/100*q).toFixed(3),"px"),R.transform="rotate(-90deg)"}return Object(S.jsx)(_,Object(c.a)({className:Object(i.a)(C.root,n),style:Object(c.a)({width:h,height:h},R,E),ownerState:N,ref:t,role:"progressbar"},A,x,{children:Object(S.jsx)(D,{className:C.svg,ownerState:N,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44),children:Object(S.jsx)(P,{className:C.circle,style:M,ownerState:N,cx:44,cy:44,r:(44-O)/2,fill:"none",strokeWidth:O})})}))}));t.a=C},254:function(e,t,a){"use strict";a.r(t);var n=a(23),r=a(24),c=a(26),l=a(25),i=a(0),o=a.n(i),s=(a(96),a(68)),u=a(48),d=a(10),m=a(28),b=a(147);var f=function(){var e=Object(d.g)(),t=Object(i.useState)(null),a=Object(u.a)(t,2),n=a[0],r=a[1],c=Object(i.useState)(null),l=Object(u.a)(c,2),f=l[0],v=l[1],h=Object(i.useState)(null),E=Object(u.a)(h,2),j=E[0],O=E[1],g=Object(i.useState)(null),p=Object(u.a)(g,2),y=p[0],k=p[1],S=Object(i.useState)(null),w=Object(u.a)(S,2),x=w[0],N=w[1],_=Object(i.useState)(null),D=Object(u.a)(_,2),P=D[0],C=D[1],M=Object(i.useState)(!0),R=Object(u.a)(M,2),A=R[0],q=R[1],z=Object(i.useState)(0),T=Object(u.a)(z,2),B=T[0],F=T[1];return Object(i.useEffect)((function(){var e=!0,t=m.a.database().ref();return m.a.auth().onAuthStateChanged((function(a){a?(C(a.uid),t.child("usuarios/".concat(a.uid)).get().then((function(t){e&&(t.exists()?N(Object(s.a)({},t.val())):(console.log("No data available"),N({})))})).catch((function(e){console.error(e)}))):console.log("no user")})),function(){e=!1}}),[]),Object(i.useEffect)((function(){var e=!0;return x&&(m.a.database().ref().child("/filiais/".concat(x.id_filial,"/estoque/acoes/")).get().then((function(t){if(e){var a=[],n=0;t.forEach((function(e){"retirada"===e.val().tipo&&(a[e.key]=e.val(),"pendente"===e.val().status&&(n+=1))})),r(a),F(n)}})).catch((function(e){console.error(e)})),m.a.database().ref().child("/filiais/".concat(x.id_filial,"/estoque/produtos/")).get().then((function(t){if(e){var a=[];t.forEach((function(e){a[e.key]=e.val()})),v(a)}})),m.a.database().ref().child("/usuarios").get().then((function(t){if(e){var a=[];t.forEach((function(e){a[e.key]=e.val()})),O(a)}})),m.a.database().ref().child("/filiais/".concat(x.id_filial,"/obras/")).get().then((function(t){if(e){var a=[];t.forEach((function(e){a[e.key]=e.val()})),k(a)}}))),function(){e=!1}}),[x,P,B]),Object(i.useEffect)((function(){n&&f&&j&&y&&q(!1)}),[n,f,j,y]),o.a.createElement("div",null,A&&o.a.createElement(b.a,{style:{marginLeft:"50%",marginTop:"20%"}}),!A&&o.a.createElement("div",{className:"row "},o.a.createElement("div",{className:"col-sm-12 grid-margin"},o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("h5",null,"Retiradas Pendentes"),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-8 col-sm-12 col-xl-8 my-auto"},o.a.createElement("div",{className:"d-flex d-sm-block d-md-flex align-items-center"},o.a.createElement("h2",{className:"mb-0"},B)),o.a.createElement("h6",{className:"text-muted font-weight-normal"}," Total")),o.a.createElement("div",{className:"col-4 col-sm-12 col-xl-4 text-center text-xl-right"},o.a.createElement("i",{className:"icon-lg mdi mdi-package-variant-closed text-danger ml-auto"})))))),o.a.createElement("div",{className:"col-12 grid-margin"},o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("h4",{className:"card-title"},"Ultimas A\xe7\xf5es"),o.a.createElement("div",{className:"table-responsive"},o.a.createElement("table",{className:"table"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Usu\xe1rio"),o.a.createElement("th",null," Produto "),o.a.createElement("th",null," Obra "),o.a.createElement("th",null," Qt retirada "),o.a.createElement("th",null," Qt devolvida "),o.a.createElement("th",null," Data "),o.a.createElement("th",null," Hora "),o.a.createElement("th",null," Obs "),o.a.createElement("th",null," Fotos "),o.a.createElement("th",null," Status "))),o.a.createElement("tbody",null,n&&f&&j&&y&&Object.keys(n).reverse().map((function(t){return o.a.createElement("tr",{key:t},o.a.createElement("td",null,void 0!==j[n[t].id_usuario]?j[n[t].id_usuario].nome:n[t].id_usuario),o.a.createElement("td",null,void 0!==f[n[t].id_prod]?f[n[t].id_prod].categoria:n[t].id_prod),o.a.createElement("td",null,void 0!==y[n[t].id_obra]?y[n[t].id_obra].nome_obra:n[t].id_obra),o.a.createElement("td",null," ",n[t].quantidade_retirada," "),o.a.createElement("td",null," ",n[t].quantidade_devolvida," "),o.a.createElement("td",null," ",n[t].data," "),o.a.createElement("td",null," ",n[t].hora),o.a.createElement("td",null," ",n[t].obs),o.a.createElement("td",null,o.a.createElement("div",null,o.a.createElement("button",{type:"button",className:"btn btn-primary btn-icon-text",onClick:function(){return function(t){e.push("/dashboard/dashboard-photos/".concat(t))}(t)}},o.a.createElement("i",{className:"icon mdi mdi-image-multiple"})))),"pendente"===n[t].status&&o.a.createElement("td",null,o.a.createElement("div",{className:"btn btn-outline-warning btn-fw",style:{width:"100%",cursor:"default"}},"Devolver")),"devolvido"===n[t].status&&o.a.createElement("td",null,o.a.createElement("div",{className:"btn btn-outline-success btn-fw",style:{width:"100%",cursor:"default"}},"Devolvido")))}))))))))))};a.d(t,"Dashboard",(function(){return v}));var v=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return(e=t.call.apply(t,[this].concat(c))).transactionHistoryData={labels:["Paypal","Stripe","Cash"],datasets:[{data:[55,25,20],backgroundColor:["#111111","#00d25b","#ffab00"]}]},e.transactionHistoryOptions={responsive:!0,maintainAspectRatio:!0,segmentShowStroke:!1,cutoutPercentage:70,elements:{arc:{borderWidth:0}},legend:{display:!1},tooltips:{enabled:!0}},e.sliderSettings={infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1},e}return Object(r.a)(a,[{key:"toggleProBanner",value:function(){document.querySelector(".proBanner").classList.toggle("hide")}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"page-header"},o.a.createElement("h3",{className:"page-title"},o.a.createElement("strong",null,"Dashboard "),o.a.createElement("small",null," vers\xe3o 1.0"))),o.a.createElement(f,null))}}]),a}(i.Component);t.default=v}}]);
//# sourceMappingURL=19.294e2fb7.chunk.js.map