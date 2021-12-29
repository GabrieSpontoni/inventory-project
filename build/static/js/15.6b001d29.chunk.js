(window["webpackJsonpinvenctory-react"]=window["webpackJsonpinvenctory-react"]||[]).push([[15],{134:function(e,t,a){"use strict";function r(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}a.d(t,"a",(function(){return r}))},148:function(e,t,a){"use strict";var r=a(134),n=a(6),c=a(4),i=a(0),o=(a(7),a(128)),s=a(246),l=a(144),u=a(129),d=a(127),f=a(126),b=a(265),v=a(247);function h(e){return Object(b.a)("MuiCircularProgress",e)}Object(v.a)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m,j,O,p,g,k,y,x,S=a(123),w=["className","color","disableShrink","size","style","thickness","value","variant"],E=Object(l.c)(g||(g=m||(m=Object(r.a)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),P=Object(l.c)(k||(k=j||(j=Object(r.a)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),C=Object(f.a)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],t["color".concat(Object(u.a)(a.color))]]}})((function(e){var t=e.ownerState,a=e.theme;return Object(c.a)({display:"inline-block"},"determinate"===t.variant&&{transition:a.transitions.create("transform")},"inherit"!==t.color&&{color:a.palette[t.color].main})}),(function(e){return"indeterminate"===e.ownerState.variant&&Object(l.b)(y||(y=O||(O=Object(r.a)(["\n      animation: "," 1.4s linear infinite;\n    "]))),E)})),D=Object(f.a)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(e,t){return t.svg}})({display:"block"}),N=Object(f.a)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(e,t){var a=e.ownerState;return[t.circle,t["circle".concat(Object(u.a)(a.variant))],a.disableShrink&&t.circleDisableShrink]}})((function(e){var t=e.ownerState,a=e.theme;return Object(c.a)({stroke:"currentColor"},"determinate"===t.variant&&{transition:a.transitions.create("stroke-dashoffset")},"indeterminate"===t.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(e){var t=e.ownerState;return"indeterminate"===t.variant&&!t.disableShrink&&Object(l.b)(x||(x=p||(p=Object(r.a)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),P)})),M=i.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiCircularProgress"}),r=a.className,i=a.color,l=void 0===i?"primary":i,f=a.disableShrink,b=void 0!==f&&f,v=a.size,m=void 0===v?40:v,j=a.style,O=a.thickness,p=void 0===O?3.6:O,g=a.value,k=void 0===g?0:g,y=a.variant,x=void 0===y?"indeterminate":y,E=Object(n.a)(a,w),P=Object(c.a)({},a,{color:l,disableShrink:b,size:m,thickness:p,value:k,variant:x}),M=function(e){var t=e.classes,a=e.variant,r=e.color,n=e.disableShrink,c={root:["root",a,"color".concat(Object(u.a)(r))],svg:["svg"],circle:["circle","circle".concat(Object(u.a)(a)),n&&"circleDisableShrink"]};return Object(s.a)(c,h,t)}(P),R={},z={},A={};if("determinate"===x){var F=2*Math.PI*((44-p)/2);R.strokeDasharray=F.toFixed(3),A["aria-valuenow"]=Math.round(k),R.strokeDashoffset="".concat(((100-k)/100*F).toFixed(3),"px"),z.transform="rotate(-90deg)"}return Object(S.jsx)(C,Object(c.a)({className:Object(o.a)(M.root,r),style:Object(c.a)({width:m,height:m},z,j),ownerState:P,ref:t,role:"progressbar"},A,E,{children:Object(S.jsx)(D,{className:M.svg,ownerState:P,viewBox:"".concat(22," ").concat(22," ").concat(44," ").concat(44),children:Object(S.jsx)(N,{className:M.circle,style:R,ownerState:P,cx:44,cy:44,r:(44-p)/2,fill:"none",strokeWidth:p})})}))}));t.a=M},219:function(e,t,a){},255:function(e,t,a){"use strict";a.r(t);var r=a(23),n=a(24),c=a(26),i=a(25),o=a(0),s=a.n(o),l=(a(96),a(133)),u=a(68),d=a(48),f=a(10),b=a(148),v=(a(136),a(28));a(219);function h(){var e=Object(f.h)().idProd,t=Object(o.useState)([]),a=Object(d.a)(t,2),r=a[0],n=a[1],c=Object(o.useState)([]),i=Object(d.a)(c,2),h=i[0],m=i[1],j=Object(o.useState)(null),O=Object(d.a)(j,2),p=O[0],g=O[1],k=Object(o.useState)(!0),y=Object(d.a)(k,2),x=y[0],S=y[1];return Object(o.useEffect)((function(){var e=!0,t=v.a.database().ref();return v.a.auth().onAuthStateChanged((function(a){a?t.child("usuarios/".concat(a.uid)).get().then((function(t){e&&(t.exists()?g(Object(u.a)({},t.val())):(console.log("No data available"),g({})))})).catch((function(e){console.error(e)})):console.log("no user")})),function(){e=!1}}),[]),Object(o.useEffect)((function(){var t=!0,a=v.a.storage();if(p){var r=a.ref("/filiais/".concat(p.id_filial,"/acoes/").concat(e,"/"));console.log(),r.listAll().then((function(e){if(0===e.items.length&&S(!1),t){var a=[];e.items.forEach((function(t,r){a.push(e.items[r].name),t.getDownloadURL().then((function(e){m((function(t){return[].concat(Object(l.a)(t),[e])}))}))})),n(a)}})).catch((function(e){console.log(e)}))}return function(){t=!1}}),[e,p]),s.a.createElement("div",null,0===h.length&&x&&s.a.createElement(b.a,null),0===h.length&&!x&&s.a.createElement("div",null,"Este produto n\xe3o possui fotos"),s.a.createElement("div",{className:"row"},h.length>0&&Object.keys(h).map((function(e){return s.a.createElement("div",{key:e},s.a.createElement("div",{className:"card",style:{height:"400px",width:"300px",marginRight:"50px",marginTop:"50px",display:"flex"}},s.a.createElement("div",{className:"card-body"},s.a.createElement("img",{src:h[e],alt:"",style:{width:"100%",height:"100%",borderRadius:"8px"}})),s.a.createElement("div",{className:"card-footer",style:{display:"inline-block"}},r[e])))}))))}a.d(t,"DashboardPhotos",(function(){return m}));var m=function(e){Object(c.a)(a,e);var t=Object(i.a)(a);function a(){return Object(r.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(h,null))}}]),a}(o.Component);t.default=m}}]);
//# sourceMappingURL=15.6b001d29.chunk.js.map