(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{323:function(t,e,n){},350:function(t,e,n){"use strict";n(323)},357:function(t,e,n){"use strict";n.r(e);var o={name:"DefaultColors",data:function(){return{defaultColors:["#0885ff","#ff665e","#f69421","#1dcf2f","#00bd98","#00bcd4"]}},methods:{copy:function(t,e){try{var n=t.currentTarget,o=document.createElement("input");o.value=n.innerText,o.style.transform="translateX(10000000000000px)",document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),alert("复制成功")}catch(t){console.error(t)}}}},c=(n(350),n(40)),r=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"default-colors"},[n("p",[t._v("默认色系：")]),t._v(" "),n("div",{staticClass:"colors"},t._l(t.defaultColors,(function(e,o){return n("span",{key:"color"+o,staticClass:"color",style:{backgroundColor:e},on:{click:function(n){return t.copy(n,e)}}},[t._v("\n      "+t._s(e)+"\n    ")])})),0)])}),[],!1,null,"1fe7582b",null);e.default=r.exports}}]);