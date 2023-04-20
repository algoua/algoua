"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[971],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=u(r),y=o,d=s["".concat(c,".").concat(y)]||s[y]||m[y]||a;return r?n.createElement(d,i(i({ref:t},p),{},{components:r})):n.createElement(d,i({ref:t},p))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=y;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:o,i[1]=l;for(var u=2;u<a;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},5857:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>d,contentTitle:()=>m,default:()=>v,frontMatter:()=>s,metadata:()=>y,toc:()=>f});var n=r(7462),o=r(7294),a=r(3905),i=r(2263),l=r(4996),c=r(9960);const u=e=>{let{subcategory:t,CategoryTag:r,idx:n}=e;return o.createElement("div",{key:n},o.createElement(r,null,t.label),o.createElement("ul",null,t.items.map(((e,t)=>"doc"===e.type?o.createElement("li",{key:t},o.createElement(c.Z,{to:(0,l.Z)(`/${e.id}`)},e.label)):"category"===e.type?o.createElement("li",{key:t},o.createElement(u,{idx:t,CategoryTag:"em",subcategory:e})):null))))},p=e=>{let{category:t}=e;const r=(0,i.Z)().siteConfig.customFields.sitemap;return o.createElement(o.Fragment,null,r[t].filter((e=>"category"===e.type)).map(((e,t)=>o.createElement("div",{key:t},o.createElement(u,{idx:t,CategoryTag:"h3",subcategory:e})))))},s={id:"index",title:"\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0438",slug:"/",description:"\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0456\u0447\u043d\u0456 \u043d\u0430\u0432\u0447\u0430\u043b\u044c\u043d\u0456 \u043c\u0430\u0442\u0435\u0440\u0456\u0430\u043b\u0438",keywords:["\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0438"]},m=void 0,y={unversionedId:"index",id:"index",title:"\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0438",description:"\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0456\u0447\u043d\u0456 \u043d\u0430\u0432\u0447\u0430\u043b\u044c\u043d\u0456 \u043c\u0430\u0442\u0435\u0440\u0456\u0430\u043b\u0438",source:"@site/docs/index.md",sourceDirName:".",slug:"/",permalink:"/",draft:!1,editUrl:"https://github.com/algoua/algoua/edit/main/docs/index.md",tags:[],version:"current",frontMatter:{id:"index",title:"\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0438",slug:"/",description:"\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0456\u0447\u043d\u0456 \u043d\u0430\u0432\u0447\u0430\u043b\u044c\u043d\u0456 \u043c\u0430\u0442\u0435\u0440\u0456\u0430\u043b\u0438",keywords:["\u0410\u043b\u0433\u043e\u0440\u0438\u0442\u043c\u0438"]},sidebar:"algorithms",next:{title:"\u0411\u0456\u043d\u0430\u0440\u043d\u0435 \u043f\u0456\u0434\u043d\u0435\u0441\u0435\u043d\u043d\u044f \u0443 \u0441\u0442\u0435\u043f\u0456\u043d\u044c",permalink:"/algorithms/algebra/binary_pow"}},d={},f=[],g={toc:f},b="wrapper";function v(e){let{components:t,...r}=e;return(0,a.kt)(b,(0,n.Z)({},g,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(p,{category:"algorithms",mdxType:"CategoryContents"}))}v.isMDXComponent=!0}}]);