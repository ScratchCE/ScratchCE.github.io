const be=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}};be();function E(){}function le(e){return e()}function oe(){return Object.create(null)}function F(e){e.forEach(le)}function we(e){return typeof e=="function"}function ce(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let J;function ye(e,t){return J||(J=document.createElement("a")),J.href=t,e===J.href}function ve(e){return Object.keys(e).length===0}function k(e,t){e.appendChild(t)}function C(e,t,n){e.insertBefore(t,n||null)}function T(e){e.parentNode.removeChild(e)}function b(e){return document.createElement(e)}function K(e){return document.createTextNode(e)}function Z(){return K(" ")}function H(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function m(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ke(e){return Array.from(e.childNodes)}function ie(e,t){e.value=t==null?"":t}function W(e,t,n){e.classList[n?"add":"remove"](t)}function Se(e,t,{bubbles:n=!1,cancelable:r=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(e,n,r,t),i}let q;function X(e){q=e}function ue(){if(!q)throw new Error("Function called outside component initialization");return q}function je(e){ue().$$.on_mount.push(e)}function ze(){const e=ue();return(t,n,{cancelable:r=!1}={})=>{const i=e.$$.callbacks[t];if(i){const o=Se(t,n,{cancelable:r});return i.slice().forEach(l=>{l.call(e,o)}),!o.defaultPrevented}return!0}}const Y=[],M=[],Q=[],te=[],Te=Promise.resolve();let ne=!1;function xe(){ne||(ne=!0,Te.then(fe))}function re(e){Q.push(e)}function N(e){te.push(e)}const ee=new Set;let B=0;function fe(){const e=q;do{for(;B<Y.length;){const t=Y[B];B++,X(t),Ee(t.$$)}for(X(null),Y.length=0,B=0;M.length;)M.pop()();for(let t=0;t<Q.length;t+=1){const n=Q[t];ee.has(n)||(ee.add(n),n())}Q.length=0}while(Y.length);for(;te.length;)te.pop()();ne=!1,ee.clear(),X(e)}function Ee(e){if(e.fragment!==null){e.update(),F(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(re)}}const V=new Set;let Ce;function de(e,t){e&&e.i&&(V.delete(e),e.i(t))}function Le(e,t,n,r){if(e&&e.o){if(V.has(e))return;V.add(e),Ce.c.push(()=>{V.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}}function U(e,t,n){const r=e.$$.props[t];r!==void 0&&(e.$$.bound[r]=n,n(e.$$.ctx[r]))}function Pe(e){e&&e.c()}function he(e,t,n,r){const{fragment:i,on_mount:o,on_destroy:l,after_update:u}=e.$$;i&&i.m(t,n),r||re(()=>{const p=o.map(le).filter(we);l?l.push(...p):F(p),e.$$.on_mount=[]}),u.forEach(re)}function pe(e,t){const n=e.$$;n.fragment!==null&&(F(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Re(e,t){e.$$.dirty[0]===-1&&(Y.push(e),xe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function me(e,t,n,r,i,o,l,u=[-1]){const p=q;X(e);const c=e.$$={fragment:null,ctx:null,props:o,update:E,not_equal:i,bound:oe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(p?p.$$.context:[])),callbacks:oe(),dirty:u,skip_bound:!1,root:t.target||p.$$.root};l&&l(c.root);let g=!1;if(c.ctx=n?n(e,t.props||{},(h,w,...x)=>{const f=x.length?x[0]:w;return c.ctx&&i(c.ctx[h],c.ctx[h]=f)&&(!c.skip_bound&&c.bound[h]&&c.bound[h](f),g&&Re(e,h)),w}):[],c.update(),g=!0,F(c.before_update),c.fragment=r?r(c.ctx):!1,t.target){if(t.hydrate){const h=ke(t.target);c.fragment&&c.fragment.l(h),h.forEach(T)}else c.fragment&&c.fragment.c();t.intro&&de(e.$$.fragment),he(e,t.target,t.anchor,t.customElement),fe()}X(p)}class ge{$destroy(){pe(this,1),this.$destroy=E}$on(t,n){const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const i=r.indexOf(n);i!==-1&&r.splice(i,1)}}$set(t){this.$$set&&!ve(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function Me(e){let t,n,r,i;return{c(){t=b("div"),n=b("div"),r=b("iframe"),m(r,"title",""),m(r,"scrolling","no"),m(r,"width","482"),m(r,"height","406"),ye(r.src,i="about:blank")||m(r,"src",i),m(r,"class","svelte-19fn9ge"),W(r,"fill-screen",["fullscreen","editor","fullscreen-editor"].includes(e[0])),m(n,"id","scratch-gui"),m(n,"class","svelte-19fn9ge"),W(n,"show",e[1]==="ok")},m(o,l){C(o,t,l),k(t,n),k(n,r),e[10](r)},p(o,[l]){l&1&&W(r,"fill-screen",["fullscreen","editor","fullscreen-editor"].includes(o[0])),l&2&&W(n,"show",o[1]==="ok")},i:E,o:E,d(o){o&&T(t),e[10](null)}}}function Ie(e,t,n){let{id:r=0}=t,{editor:i=!1}=t,{params:o={}}=t,{serverUrl:l}=t,{projectStatus:u="notloaded"}=t,{reduxTarget:p=null}=t,{reduxStore:c=null}=t,{playerMode:g="player"}=t,{projectTitle:h=""}=t,w=!1;if(!l)throw new Error("The server URL must be defined!");const x=ze();let f,d,R,I,O;je(async()=>{R=l,I=`${R}/projects`,O=`${R}/assets`,await a(),d=f.contentWindow,f.addEventListener("load",async()=>{const s=async function(){n(4,p=d.ReduxTarget),n(5,c=d.ReduxStore);const L=c,P=p;S(480,360);const z=L.getState().scratchGui;z.customStageSize&&z.customStageSize.width&&z.customStageSize.height&&S(z.customStageSize.width,z.customStageSize.height),z.mode&&_(z.mode),z.projectTitle&&n(3,h=z.projectTitle),P.addEventListener("statechanged",G=>{const A=G.detail.action;switch(x("reduxevent",G.detail),console.log(G.detail),A.type){case"tw/custom-stage-size/SET":console.log("gui frame:",f),S(A.width,A.height),x("stagesize",{width:A.width,action:f.height});break;case"scratch-gui/mode/SET_FULL_SCREEN":case"scratch-gui/mode/SET_PLAYER":_(G.detail.next.scratchGui.mode);break;case"projectTitle/SET_PROJECT_TITLE":w=!0,n(3,h=A.title);break}})};d.addEventListener("reduxtargetadded",s),d.ReduxTarget&&s()})});async function D(s){if(w){w=!1;return}!d||(await a(s),d.location.hash="#"+r)}function y(s){if(w){w=!1;return}!c||c.dispatch({type:"projectTitle/SET_PROJECT_TITLE",title:s})}function v(s){if(w){w=!1;return}!c||(c.dispatch({type:"scratch-gui/mode/SET_PLAYER",isPlayerOnly:s==="player"||s==="fullscreen"||s==="fullscreen-editor"}),c.dispatch({type:"scratch-gui/mode/SET_FULL_SCREEN",isFullScreen:s==="fullscreen"||s==="fullscreen-editor"}))}function _(s){w=!0,n(0,g=s?s.isPlayerOnly?s.isFullScreen?"fullscreen":"player":s.isFullScreen?"fullscreen-editor":"editor":"player")}async function a(s=r){if(n(1,u="loading"),s===0)return n(1,u="notloaded"),j(!1),!1;if(Number(s))try{return(await fetch(`${I}/${s}/exists`)).ok?(n(1,u="ok"),j(!0),d&&(d.location.hash="#"+s),!0):(n(1,u="noproject"),j(!1),!1)}catch{try{if((await fetch(`${R}`)).ok)return n(1,u="projectunavailable"),j(!1),!1}catch(P){return console.log(P),n(1,u="unavailable"),j(!1),!1}}else return j(!1),!1;return n(1,u="unavailable"),j(!1),!1}function S(s,L){f.setAttribute("width",Math.max(s+2,482)),f.setAttribute("height",L+2+44),x("framesize",{width:f.width,height:f.height})}function j(s){if(s){if(f.src==="about:blank"){const L=new URLSearchParams;L.set("project_host",I),L.set("asset_host",O);for(const z in o)L.set(z,o[z]);let P=L.toString();P=P===""?"":"?"+P,n(2,f.src="/src/lib/gui/"+(i?"editor.html":"index.html")+P+"#"+r,f)}d&&(d.location.hash="#"+r)}else n(2,f.src="about:blank",f)}function _e(s){M[s?"unshift":"push"](()=>{f=s,n(2,f)})}return e.$$set=s=>{"id"in s&&n(6,r=s.id),"editor"in s&&n(7,i=s.editor),"params"in s&&n(8,o=s.params),"serverUrl"in s&&n(9,l=s.serverUrl),"projectStatus"in s&&n(1,u=s.projectStatus),"reduxTarget"in s&&n(4,p=s.reduxTarget),"reduxStore"in s&&n(5,c=s.reduxStore),"playerMode"in s&&n(0,g=s.playerMode),"projectTitle"in s&&n(3,h=s.projectTitle)},e.$$.update=()=>{e.$$.dirty&1&&v(g),e.$$.dirty&8&&y(h),e.$$.dirty&64&&D(r)},[g,u,f,h,p,c,r,i,o,l,_e]}class Oe extends ge{constructor(t){super(),me(this,t,Ie,Me,ce,{id:6,editor:7,params:8,serverUrl:9,projectStatus:1,reduxTarget:4,reduxStore:5,playerMode:0,projectTitle:3})}}function Fe(e){let t,n,r,i,o,l,u,p,c;return{c(){t=b("div"),n=b("div"),r=b("button"),r.textContent="Create",i=Z(),o=b("input"),l=Z(),u=b("button"),u.textContent="See inside",m(r,"class","svelte-1w6hzkw"),m(o,"class","title-input svelte-1w6hzkw"),m(o,"type","text"),m(o,"placeholder","Project title here"),m(u,"class","svelte-1w6hzkw"),m(n,"class","controls svelte-1w6hzkw"),m(t,"class","controls-container svelte-1w6hzkw")},m(g,h){C(g,t,h),k(t,n),k(n,r),k(n,i),k(n,o),ie(o,e[0]),k(n,l),k(n,u),p||(c=[H(r,"click",e[5]),H(o,"input",e[6]),H(u,"click",e[7])],p=!0)},p(g,h){h&1&&o.value!==g[0]&&ie(o,g[0])},d(g){g&&T(t),p=!1,F(c)}}}function Ae(e){let t;return{c(){t=b("p"),t.textContent="Loading..."},m(n,r){C(n,t,r)},p:E,d(n){n&&T(t)}}}function Ne(e){let t;return{c(){t=b("p"),t.textContent="Somehow, we couldn't reach the project API but the servers work. What?"},m(n,r){C(n,t,r)},p:E,d(n){n&&T(t)}}}function Ue(e){let t;return{c(){t=b("p"),t.textContent="The project you tried to load doesn't exist."},m(n,r){C(n,t,r)},p:E,d(n){n&&T(t)}}}function Ye(e){let t,n,r,i,o;return{c(){t=b("p"),n=K("Couldn't reach servers. They are probably down or the browser is blocking the requests. Try visiting "),r=b("a"),i=K($),o=K(" in your browser and allowing the page to load."),m(r,"href",$)},m(l,u){C(l,t,u),k(t,n),k(t,r),k(r,i),k(t,o)},p:E,d(l){l&&T(t)}}}function He(e){let t;return{c(){t=b("p"),t.textContent="Invalid project ID!"},m(n,r){C(n,t,r)},p:E,d(n){n&&T(t)}}}function Xe(e){let t;return{c(){t=b("p"),t.textContent="Creating project..."},m(n,r){C(n,t,r)},p:E,d(n){n&&T(t)}}}function qe(e){let t;return{c(){t=b("p"),t.textContent="Load a project ID!"},m(n,r){C(n,t,r)},p:E,d(n){n&&T(t)}}}function se(e){let t,n,r,i;return{c(){t=b("input"),m(t,"class","id-input svelte-1w6hzkw"),m(t,"type","number"),m(t,"placeholder","123"),t.value=n=e[4]||""},m(o,l){C(o,t,l),r||(i=[H(t,"keypress",Ge),H(t,"change",e[13])],r=!0)},p(o,l){l&16&&n!==(n=o[4]||"")&&t.value!==n&&(t.value=n)},d(o){o&&T(t),r=!1,F(i)}}}function De(e){let t,n,r,i,o,l,u,p,c,g,h,w;function x(a,S){if(a[2]==="notloaded")return qe;if(a[2]==="creating")return Xe;if(a[2]==="invalidid")return He;if(a[2]==="unavailable")return Ye;if(a[2]==="noproject")return Ue;if(a[2]==="projectunavailable")return Ne;if(a[2]==="loading")return Ae;if(a[2]==="ok")return Fe}let f=x(e),d=f&&f(e);function R(a){e[8](a)}function I(a){e[9](a)}function O(a){e[10](a)}function D(a){e[11](a)}function y(a){e[12](a)}let v={serverUrl:$};e[4]!==void 0&&(v.id=e[4]),e[1]!==void 0&&(v.reduxStore=e[1]),e[0]!==void 0&&(v.projectTitle=e[0]),e[2]!==void 0&&(v.projectStatus=e[2]),e[3]!==void 0&&(v.playerMode=e[3]),o=new Oe({props:v}),M.push(()=>U(o,"id",R)),M.push(()=>U(o,"reduxStore",I)),M.push(()=>U(o,"projectTitle",O)),M.push(()=>U(o,"projectStatus",D)),M.push(()=>U(o,"playerMode",y));let _=!(e[2]==="loading"||e[2]==="creating")&&se(e);return{c(){t=b("main"),n=b("div"),d&&d.c(),r=Z(),i=b("div"),Pe(o.$$.fragment),h=Z(),_&&_.c(),m(i,"class","player"),m(n,"class","anarchy-player"),m(t,"class","svelte-1w6hzkw")},m(a,S){C(a,t,S),k(t,n),d&&d.m(n,null),k(n,r),k(n,i),he(o,i,null),k(n,h),_&&_.m(n,null),w=!0},p(a,[S]){f===(f=x(a))&&d?d.p(a,S):(d&&d.d(1),d=f&&f(a),d&&(d.c(),d.m(n,r)));const j={};!l&&S&16&&(l=!0,j.id=a[4],N(()=>l=!1)),!u&&S&2&&(u=!0,j.reduxStore=a[1],N(()=>u=!1)),!p&&S&1&&(p=!0,j.projectTitle=a[0],N(()=>p=!1)),!c&&S&4&&(c=!0,j.projectStatus=a[2],N(()=>c=!1)),!g&&S&8&&(g=!0,j.playerMode=a[3],N(()=>g=!1)),o.$set(j),a[2]==="loading"||a[2]==="creating"?_&&(_.d(1),_=null):_?_.p(a,S):(_=se(a),_.c(),_.m(n,null))},i(a){w||(de(o.$$.fragment,a),w=!0)},o(a){Le(o.$$.fragment,a),w=!1},d(a){a&&T(t),d&&d.d(),pe(o),_&&_.d()}}}const $="https://5.187.229.143:443",Ge=e=>{const t=e.metaKey||e.key.length!==1||/[+e0-9-]/.test(e.key);return t||e.preventDefault(),t};function Je(e,t,n){let r,i,o,l,u=0;const p='{"targets":[{"isStage":true,"name":"Stage","variables":{},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"14e46ec3e2ba471c2adfe8f119052307","name":"","bitmapResolution":1,"md5ext":"14e46ec3e2ba471c2adfe8f119052307.svg","dataFormat":"svg","rotationCenterX":0,"rotationCenterY":0}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Communicat","variables":{},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"b551df3ba49e6475928309214f51bd94","name":"Communicat-a","bitmapResolution":1,"md5ext":"b551df3ba49e6475928309214f51bd94.svg","dataFormat":"svg","rotationCenterX":48.20865451049096,"rotationCenterY":49.61842375318162},{"assetId":"b62c61a6c0384f71872990115d93eea8","name":"Communicat-b","bitmapResolution":1,"md5ext":"b62c61a6c0384f71872990115d93eea8.svg","dataFormat":"svg","rotationCenterX":46.1326061009419,"rotationCenterY":52.471372930065456},{"assetId":"814a2e4591c4eab9e832b88d16d3988d","name":"Communicat-c","bitmapResolution":1,"md5ext":"814a2e4591c4eab9e832b88d16d3988d.svg","dataFormat":"svg","rotationCenterX":55.23697676581517,"rotationCenterY":29.391930273437737},{"assetId":"78ed5bb0fefd8984546468e1a1ebb1b6","name":"Communicat-d","bitmapResolution":1,"md5ext":"78ed5bb0fefd8984546468e1a1ebb1b6.svg","dataFormat":"svg","rotationCenterX":48.44891835577772,"rotationCenterY":41.586213103483544}],"sounds":[{"assetId":"83c36d806dc92327b9e7049a565c6bff","name":"Meow","dataFormat":"wav","rate":48000,"sampleCount":40682,"md5ext":"83c36d806dc92327b9e7049a565c6bff.wav"}],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"stretch":100,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}}';window.addEventListener("hashchange",c);async function c(){location.hash==="#create"?g():n(4,u=Number(location.hash.substring(1))||0)}c();async function g(){n(2,o="creating");const y=await fetch(`${$}/projects/`,{method:"POST",headers:{"Content-Type":"application/json"},body:p}),v=await y.text();if(!y.ok)throw n(2,o="unavailable"),v;let _=JSON.parse(v);return window.location.hash="#"+_["content-name"],_}const h=()=>{location.hash="#create"};function w(){r=this.value,n(0,r)}const x=()=>{n(3,l="editor")};function f(y){u=y,n(4,u)}function d(y){i=y,n(1,i)}function R(y){r=y,n(0,r)}function I(y){o=y,n(2,o)}function O(y){l=y,n(3,l)}return[r,i,o,l,u,h,w,x,f,d,R,I,O,y=>{const v=Number(y.target.value);!v&&v!==0||(window.location.hash="#"+v,n(4,u=v))}]}class We extends ge{constructor(t){super(),me(this,t,Je,De,ce,{})}}const ae=document.getElementById("app");function Be(e,t={}){ae.innerHTML="";let n=new e({target:ae,...t});return console.info("mounted",e.name.substring(6,e.name.length-1)+";","options:",t),n}Be(We);
