(window["webpackJsonpinvenctory-react"]=window["webpackJsonpinvenctory-react"]||[]).push([[24],{252:function(e,a,t){"use strict";t.r(a);var n=t(23),c=t(24),l=t(26),o=t(25),r=t(0),i=t.n(r),u=t(68),s=t(48),m=t(28),d=t(138);t(136);function b(){var e=Object(r.useState)({}),a=Object(s.a)(e,2),t=a[0],n=a[1],c=Object(r.useState)({}),l=Object(s.a)(c,2),o=l[0],b=l[1];Object(r.useEffect)((function(){var e=m.a.database().ref();return e.child("/usuarios").get().then((function(e){e.exists()?n(Object(u.a)({},e.val())):(console.log("No data available"),n({}))})).catch((function(e){console.error(e)})),m.a.auth().onAuthStateChanged((function(a){a?e.child("usuarios/".concat(a.uid)).get().then((function(e){e.exists()?b(Object(u.a)({},e.val())):(console.log("No data available"),b({}))})).catch((function(e){console.error(e)})):console.log("no user")})),function(){n({}),b({})}}),[]);return i.a.createElement("div",{className:"row "},i.a.createElement("div",{className:"col-12 grid-margin"},i.a.createElement("div",{className:"card"},i.a.createElement("div",{className:"card-body"},i.a.createElement("h4",null,"Solicita\xe7\xf5es de acesso (colaboradores)"),o&&i.a.createElement("div",{className:"table-responsive"},i.a.createElement("table",{className:"table"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null," Nome do Funcion\xe1rio "),i.a.createElement("th",null," Tipo de requisi\xe7\xe3o "),i.a.createElement("th",null," Email "),i.a.createElement("th",null," "))),i.a.createElement("tbody",null,Object.keys(t).reverse().slice().map((function(e){return"novo"===t[e].tipo_atual&&"colaborador"===t[e].tipo_requisicao?i.a.createElement("tr",{key:e},i.a.createElement("td",null," ",t[e].nome," "),i.a.createElement("td",null," ",t[e].tipo_requisicao," "),i.a.createElement("td",null," ",t[e].email," "),i.a.createElement("td",null,i.a.createElement("div",{className:"template-demo"},i.a.createElement("button",{type:"button",className:"btn btn-outline-success btn-fw",onClick:function(){return function(e,a){var t={data_criacao:e.data_criacao,email:e.email,hora_criacao:e.hora_criacao,id_filial:e.id_filial,nome:e.nome,tipo_atual:e.tipo_requisicao,tipo_requisicao:e.tipo_requisicao},n={};n["usuarios/"+a]=t,m.a.database().ref().update(n).then((function(){window.location.reload()})).catch((function(){d.b.error("Algo deu errado",{theme:"dark"})}))}(t[e],e)}},"Aceitar"),i.a.createElement("button",{type:"button",className:"btn btn-outline-danger btn-fw",onClick:function(){return t[e],void console.log(o)}},"Recusar"),i.a.createElement(d.a,{limit:3})))):null})))))))))}function E(){var e=Object(r.useState)({}),a=Object(s.a)(e,2),t=a[0],n=a[1],c=Object(r.useState)({}),l=Object(s.a)(c,2),o=l[0],b=l[1];Object(r.useEffect)((function(){var e=m.a.database().ref();return e.child("/usuarios").get().then((function(e){e.exists()?n(Object(u.a)({},e.val())):(console.log("No data available"),n({}))})).catch((function(e){console.error(e)})),m.a.auth().onAuthStateChanged((function(a){a?e.child("usuarios/".concat(a.uid)).get().then((function(e){e.exists()?b(Object(u.a)({},e.val())):(console.log("No data available"),b({}))})).catch((function(e){console.error(e)})):console.log("no user")})),function(){n({}),b({})}}),[]);return i.a.createElement("div",{className:"row "},i.a.createElement("div",{className:"col-12 grid-margin"},i.a.createElement("div",{className:"card"},i.a.createElement("div",{className:"card-body"},i.a.createElement("h4",null,"Solicita\xe7\xf5es de acesso (administradores)"),i.a.createElement("div",{className:"table-responsive"},i.a.createElement("table",{className:"table"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",null," Nome do Funcion\xe1rio "),i.a.createElement("th",null," Tipo de requisi\xe7\xe3o "),i.a.createElement("th",null," Email "),i.a.createElement("th",null," "))),i.a.createElement("tbody",null,Object.keys(t).reverse().slice().map((function(e){return"novo"===t[e].tipo_atual&&"administrador"===t[e].tipo_requisicao?i.a.createElement("tr",{key:e},i.a.createElement("td",null," ",t[e].nome," "),i.a.createElement("td",null," ",t[e].tipo_requisicao," "),i.a.createElement("td",null," ",t[e].email," "),i.a.createElement("td",null,i.a.createElement("div",{className:"template-demo"},i.a.createElement("button",{type:"button",className:"btn btn-outline-success btn-fw",onClick:function(){return function(e,a){var t={data_criacao:e.data_criacao,email:e.email,hora_criacao:e.hora_criacao,id_filial:e.id_filial,nome:e.nome,tipo_atual:e.tipo_requisicao,tipo_requisicao:e.tipo_requisicao},n={};n["usuarios/"+a]=t,m.a.database().ref().update(n).then((function(){window.location.reload()})).catch((function(){d.b.error("Algo deu errado",{theme:"dark"})}))}(t[e],e)}},"Aceitar"),i.a.createElement("button",{type:"button",className:"btn btn-outline-danger btn-fw",onClick:function(){return t[e],void console.log(o)}},"Recusar"),i.a.createElement(d.a,{limit:3})))):null})))))))))}var f=function(){var e=i.a.useState(null),a=Object(s.a)(e,2),t=a[0],n=a[1];return Object(r.useEffect)((function(){var e=m.a.database().ref(),a=!0;return m.a.auth().onAuthStateChanged((function(t){t?e.child("usuarios/".concat(t.uid)).get().then((function(e){a&&(e.exists()?n(Object(u.a)({},e.val())):(console.log("No data available"),n({})))})).catch((function(e){console.error(e)})):console.log("no user")})),function(){a=!1}}),[]),i.a.createElement("div",null,t&&("administrador"===t.tipo_atual||"diretor"===t.tipo_atual||"dev"===t.tipo_atual)&&i.a.createElement(b,null),t&&("diretor"===t.tipo_atual||"dev"===t.tipo_atual)&&i.a.createElement(E,null))};t.d(a,"ReleaseAccess",(function(){return v}));var v=function(e){Object(l.a)(t,e);var a=Object(o.a)(t);function t(){return Object(n.a)(this,t),a.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"page-header"},i.a.createElement("h3",{className:"page-title"}," Liberar acessos "),i.a.createElement("nav",{"aria-label":"breadcrumb"},i.a.createElement("ol",{className:"breadcrumb"},i.a.createElement("li",{className:"breadcrumb-item"},i.a.createElement("a",{href:"!#",onClick:function(e){return e.preventDefault()}},"Administra\xe7\xe3o")),i.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Liberar acessos ao sistema")))),i.a.createElement(f,null))}}]),t}(r.Component);a.default=v}}]);
//# sourceMappingURL=24.e4456619.chunk.js.map