/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$4=new WeakMap;class o$4{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$4.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new o$4("string"==typeof t?t:t+"",void 0,s$3),i$3=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$4(n,t,s$3)},S$1=(s,n)=>{e$3?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$2=window,r$1=e$2.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$3=e$2.reactiveElementPolyfillSupport,n$3={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$3,reflect:!1,hasChanged:a$1},d$1="finalized";class u$1 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$3).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$3;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}u$1[d$1]=!0,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$3||o$3({ReactiveElement:u$1}),(null!==(s$2=e$2.reactiveElementVersions)&&void 0!==s$2?s$2:e$2.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$2=window,s$1=i$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2="$lit$",n$2=`lit$${(Math.random()+"").slice(9)}$`,l$1="?"+n$2,h=`<${l$1}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$1?e$1.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$2+s.slice(v)+n$2+w):s+n$2+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$2)||i.startsWith(n$2)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$2).split(n$2),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$2),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$1)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$2,t+1));)v.push({type:7,index:r}),t+=n$2.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$2.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$1=i$2.litHtmlVersions)&&void 0!==t$1?t$1:i$2.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o$1;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.3.3");

class Configuration {
    static nodeColors = {
        black: i$3`20, 20, 20`,
        blue: i$3`84, 122, 156`,
        darkBlue: i$3`32, 80, 128`,
        darkTurquoise: i$3`19, 100, 137`,
        gray: i$3`150,150,150`,
        green: i$3`95, 129, 90`,
        lime: i$3`150, 160, 30`,
        red: i$3`151, 33, 32`,
        turquoise: i$3`46, 104, 106`,
        violet: i$3`126, 28, 150`,
        yellow: i$3`148, 116, 24`,
    }
    static alphaPattern = "repeating-conic-gradient(#7c8184 0% 25%, #c2c3c4 0% 50%) 50% / 10px 10px"
    static colorDragEventName = "ueb-color-drag"
    static colorPickEventName = "ueb-color-pick"
    static colorWindowEventName = "ueb-color-window"
    static colorWindowName = "Color Picker"
    static defaultCommentHeight = 96
    static defaultCommentWidth = 400
    static distanceThreshold = 5 // px
    static dragEventName = "ueb-drag"
    static dragGeneralEventName = "ueb-drag-general"
    static edgeScrollThreshold = 50
    static editTextEventName = {
        begin: "ueb-edit-text-begin",
        end: "ueb-edit-text-end",
    }
    static expandGridSize = 400
    static focusEventName = {
        begin: "blueprint-focus",
        end: "blueprint-unfocus",
    }
    static fontSize = i$3`13px`
    static gridAxisLineColor = i$3`black`
    static gridExpandThreshold = 0.25 // remaining size factor threshold to cause an expansion event
    static gridLineColor = i$3`#353535`
    static gridLineWidth = 1 // px
    static gridSet = 8
    static gridSetLineColor = i$3`#161616`
    static gridShrinkThreshold = 4 // exceding size factor threshold to cause a shrink event
    static gridSize = 16 // px
    static hexColorRegex = /^\s*#(?<r>[0-9a-fA-F]{2})(?<g>[0-9a-fA-F]{2})(?<b>[0-9a-fA-F]{2})([0-9a-fA-F]{2})?|#(?<rs>[0-9a-fA-F])(?<gs>[0-9a-fA-F])(?<bs>[0-9a-fA-F])\s*$/
    static indentation = "   "
    static keysSeparator = /[\.\(\)]/
    static knotOffset = [-Configuration.gridSize, -0.5 * Configuration.gridSize]
    static lineTracePattern = /LineTrace(Single|Multi)(\w*)/
    static linkCurveHeight = 15 // px
    static linkCurveWidth = 80 // px
    static linkMinWidth = 100 // px
    static nameRegexSpaceReplacement = new RegExp(
        // Leading K2_ or K2Node_ is removed
        "^K2(?:[Nn]ode)?_"
        // End of a word (lower case followed by either upper case or number): "AlphaBravo" => "Alpha Bravo"
        + "|(?<=[a-z])(?=[A-Z0-9])"
        // End of upper case word (upper case followed by either word or number)
        + "|(?<=[A-Z])"
        + /* Except "UVs" */ "(?<!U(?=Vs(?![a-z])))"
        + /* Except V2, V3 */ "(?<!V(?=[23](?![0-9])))"
        + /* Except T2d */ "(?<!T(?=2d(?![a-z])))"
        + /* Except BT */ "(?<!BT)"
        + "(?=[A-Z][a-z]|[0-9])"
        // Number followed by a letter
        + "|(?<=[0-9])"
        + /* Except 2D, 3D */ "(?<![23](?=[dD](?![a-z])))"
        + "(?=[a-zA-Z])"
        // "Alpha__Bravo" => "Alpha Bravo"
        + "|\\s*_+\\s*"
        + "|\\s{2,}",
        "g"
    )
    /**
     * @param {Number} start
     * @param {Number} c1
     * @param {Number} c2
     */
    static linkRightSVGPath = (start, c1, c2) => {
        let end = 100 - start;
        return `M ${start} 0 C ${c1.toFixed(3)} 0, ${c2.toFixed(3)} 0, 50 50 S ${(end - c1 + start).toFixed(3)} 100, `
            + `${end.toFixed(3)} 100`
    }
    static maxZoom = 7
    static minZoom = -12
    static mouseClickButton = 0
    static mouseRightClickButton = 2
    static mouseWheelZoomThreshold = 80
    static nodeDragEventName = "ueb-node-drag"
    static nodeDragGeneralEventName = "ueb-node-drag-general"
    static nodeTitle = (name, counter) => `${name}_${counter}`
    static nodeRadius = 8 // px
    static nodeReflowEventName = "ueb-node-reflow"
    static paths = {
        actorBoundEvent: "/Script/BlueprintGraph.K2Node_ActorBoundEvent",
        addDelegate: "/Script/BlueprintGraph.K2Node_AddDelegate",
        ambientSound: "/Script/Engine.AmbientSound",
        asyncAction: "/Script/BlueprintGraph.K2Node_AsyncAction",
        blueprint: "/Script/Engine.Blueprint",
        blueprintGameplayTagLibrary: "/Script/GameplayTags.BlueprintGameplayTagLibrary",
        blueprintMapLibrary: "/Script/Engine.BlueprintMapLibrary",
        blueprintSetLibrary: "/Script/Engine.BlueprintSetLibrary",
        callArrayFunction: "/Script/BlueprintGraph.K2Node_CallArrayFunction",
        callDelegate: "/Script/BlueprintGraph.K2Node_CallDelegate",
        callFunction: "/Script/BlueprintGraph.K2Node_CallFunction",
        comment: "/Script/UnrealEd.EdGraphNode_Comment",
        commutativeAssociativeBinaryOperator: "/Script/BlueprintGraph.K2Node_CommutativeAssociativeBinaryOperator",
        componentBoundEvent: "/Script/BlueprintGraph.K2Node_ComponentBoundEvent",
        createDelegate: "/Script/BlueprintGraph.K2Node_CreateDelegate",
        customEvent: "/Script/BlueprintGraph.K2Node_CustomEvent",
        doN: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N",
        doOnce: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:DoOnce",
        dynamicCast: "/Script/BlueprintGraph.K2Node_DynamicCast",
        eAttachmentRule: "/Script/Engine.EAttachmentRule",
        edGraph: "/Script/Engine.EdGraph",
        eDrawDebugTrace: "/Script/Engine.EDrawDebugTrace",
        eMaterialSamplerType: "/Script/Engine.EMaterialSamplerType",
        enum: "/Script/CoreUObject.Enum",
        enumLiteral: "/Script/BlueprintGraph.K2Node_EnumLiteral",
        eSamplerSourceMode: "/Script/Engine.ESamplerSourceMode",
        eSearchCase: "/Script/CoreUObject.ESearchCase",
        eSearchDir: "/Script/CoreUObject.ESearchDir",
        eSpawnActorCollisionHandlingMethod: "/Script/Engine.ESpawnActorCollisionHandlingMethod",
        eTextureMipValueMode: "/Script/Engine.ETextureMipValueMode",
        eTraceTypeQuery: "/Script/Engine.ETraceTypeQuery",
        event: "/Script/BlueprintGraph.K2Node_Event",
        executionSequence: "/Script/BlueprintGraph.K2Node_ExecutionSequence",
        flipflop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:FlipFlop",
        forEachElementInEnum: "/Script/BlueprintGraph.K2Node_ForEachElementInEnum",
        forEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoop",
        forEachLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoopWithBreak",
        forLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoop",
        forLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoopWithBreak",
        functionEntry: "/Script/BlueprintGraph.K2Node_FunctionEntry",
        functionResult: "/Script/BlueprintGraph.K2Node_FunctionResult",
        gameplayTag: "/Script/GameplayTags.GameplayTag",
        getInputAxisKeyValue: "/Script/BlueprintGraph.K2Node_GetInputAxisKeyValue",
        ifThenElse: "/Script/BlueprintGraph.K2Node_IfThenElse",
        inputAxisKeyEvent: "/Script/BlueprintGraph.K2Node_InputAxisKeyEvent",
        inputDebugKey: "/Script/InputBlueprintNodes.K2Node_InputDebugKey",
        inputKey: "/Script/BlueprintGraph.K2Node_InputKey",
        inputVectorAxisEvent: "/Script/BlueprintGraph.K2Node_InputVectorAxisEvent",
        isValid: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:IsValid",
        kismetArrayLibrary: "/Script/Engine.KismetArrayLibrary",
        kismetMathLibrary: "/Script/Engine.KismetMathLibrary",
        knot: "/Script/BlueprintGraph.K2Node_Knot",
        linearColor: "/Script/CoreUObject.LinearColor",
        literal: "/Script/BlueprintGraph.K2Node_Literal",
        macro: "/Script/BlueprintGraph.K2Node_MacroInstance",
        makeArray: "/Script/BlueprintGraph.K2Node_MakeArray",
        makeMap: "/Script/BlueprintGraph.K2Node_MakeMap",
        makeSet: "/Script/BlueprintGraph.K2Node_MakeSet",
        makeStruct: "/Script/BlueprintGraph.K2Node_MakeStruct",
        materialExpressionComponentMask: "/Script/Engine.MaterialExpressionComponentMask",
        materialExpressionConstant: "/Script/Engine.MaterialExpressionConstant",
        materialExpressionConstant2Vector: "/Script/Engine.MaterialExpressionConstant2Vector",
        materialExpressionConstant3Vector: "/Script/Engine.MaterialExpressionConstant3Vector",
        materialExpressionConstant4Vector: "/Script/Engine.MaterialExpressionConstant4Vector",
        materialExpressionFunctionInput: "/Script/Engine.MaterialExpressionFunctionInput",
        materialExpressionLogarithm: "/Script/InterchangeImport.MaterialExpressionLogarithm",
        materialExpressionLogarithm10: "/Script/Engine.MaterialExpressionLogarithm10",
        materialExpressionLogarithm2: "/Script/Engine.MaterialExpressionLogarithm2",
        materialExpressionMaterialFunctionCall: "/Script/Engine.MaterialExpressionMaterialFunctionCall",
        materialExpressionSquareRoot: "/Script/Engine.MaterialExpressionSquareRoot",
        materialExpressionTextureCoordinate: "/Script/Engine.MaterialExpressionTextureCoordinate",
        materialExpressionTextureSample: "/Script/Engine.MaterialExpressionTextureSample",
        materialGraphNode: "/Script/UnrealEd.MaterialGraphNode",
        materialGraphNodeComment: "/Script/UnrealEd.MaterialGraphNode_Comment",
        multiGate: "/Script/BlueprintGraph.K2Node_MultiGate",
        niagaraClipboardContent: "/Script/NiagaraEditor.NiagaraClipboardContent",
        pawn: "/Script/Engine.Pawn",
        pcgEditorGraphNode: "/Script/PCGEditor.PCGEditorGraphNode",
        pcgEditorGraphNodeInput: "/Script/PCGEditor.PCGEditorGraphNodeInput",
        pcgEditorGraphNodeOutput: "/Script/PCGEditor.PCGEditorGraphNodeOutput",
        pcgHiGenGridSizeSettings: "/Script/PCG.PCGHiGenGridSizeSettings",
        pcgSubgraphSettings: "/Script/PCG.PCGSubgraphSettings",
        promotableOperator: "/Script/BlueprintGraph.K2Node_PromotableOperator",
        reverseForEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ReverseForEachLoop",
        rotator: "/Script/CoreUObject.Rotator",
        select: "/Script/BlueprintGraph.K2Node_Select",
        slateBlueprintLibrary: "/Script/UMG.SlateBlueprintLibrary",
        spawnActorFromClass: "/Script/BlueprintGraph.K2Node_SpawnActorFromClass",
        switchEnum: "/Script/BlueprintGraph.K2Node_SwitchEnum",
        switchGameplayTag: "/Script/GameplayTagsEditor.GameplayTagsK2Node_SwitchGameplayTag",
        switchInteger: "/Script/BlueprintGraph.K2Node_SwitchInteger",
        switchName: "/Script/BlueprintGraph.K2Node_SwitchName",
        switchString: "/Script/BlueprintGraph.K2Node_SwitchString",
        timeline: "/Script/BlueprintGraph.K2Node_Timeline",
        timeManagementBlueprintLibrary: "/Script/TimeManagement.TimeManagementBlueprintLibrary",
        transform: "/Script/CoreUObject.Transform",
        userDefinedEnum: "/Script/Engine.UserDefinedEnum",
        variableGet: "/Script/BlueprintGraph.K2Node_VariableGet",
        variableSet: "/Script/BlueprintGraph.K2Node_VariableSet",
        vector: "/Script/CoreUObject.Vector",
        vector2D: "/Script/CoreUObject.Vector2D",
        whileLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:WhileLoop",
    }
    static pinColor = {
        [this.paths.rotator]: i$3`157, 177, 251`,
        [this.paths.transform]: i$3`227, 103, 0`,
        [this.paths.vector]: i$3`251, 198, 34`,
        "Any": i$3`132, 132, 132`,
        "Any[]": i$3`132, 132, 132`,
        "blue": i$3`0, 0, 255`,
        "bool": i$3`147, 0, 0`,
        "byte": i$3`0, 109, 99`,
        "class": i$3`88, 0, 186`,
        "default": i$3`255, 255, 255`,
        "delegate": i$3`255, 56, 56`,
        "enum": i$3`0, 109, 99`,
        "exec": i$3`240, 240, 240`,
        "green": i$3`0, 255, 0`,
        "int": i$3`31, 224, 172`,
        "int64": i$3`169, 223, 172`,
        "interface": i$3`238, 252, 168`,
        "name": i$3`201, 128, 251`,
        "object": i$3`0, 167, 240`,
        "Param": i$3`255, 166, 39`,
        "Param[]": i$3`255, 166, 39`,
        "Point": i$3`63, 137, 255`,
        "Point[]": i$3`63, 137, 255`,
        "real": i$3`54, 208, 0`,
        "red": i$3`255, 0, 0`,
        "string": i$3`251, 0, 209`,
        "struct": i$3`0, 88, 201`,
        "Surface": i$3`69, 196, 126`,
        "Surface[]": i$3`69, 196, 126`,
        "text": i$3`226, 121, 167`,
        "Volume": i$3`230, 69, 188`,
        "Volume[]": i$3`230, 69, 188`,
        "wildcard": i$3`128, 120, 120`,
    }
    static pinColorMaterial = i$3`120, 120, 120`
    static pinInputWrapWidth = 143 // px
    static removeEventName = "ueb-element-delete"
    static scale = {
        [-12]: 0.133333,
        [-11]: 0.166666,
        [-10]: 0.2,
        [-9]: 0.233333,
        [-8]: 0.266666,
        [-7]: 0.3,
        [-6]: 0.333333,
        [-5]: 0.375,
        [-4]: 0.5,
        [-3]: 0.675,
        [-2]: 0.75,
        [-1]: 0.875,
        0: 1,
        1: 1.25,
        2: 1.375,
        3: 1.5,
        4: 1.675,
        5: 1.75,
        6: 1.875,
        7: 2,
    }
    static smoothScrollTime = 1000 // ms
    static stringEscapedCharacters = /['"\\]/g
    static subObjectAttributeNamePrefix = "#SubObject"
    /** @param {ObjectEntity} objectEntity */
    static subObjectAttributeNameFromEntity = (objectEntity, nameOnly = false) =>
        this.subObjectAttributeNamePrefix + (!nameOnly && objectEntity.Class ? `_${objectEntity.Class.type}` : "")
        + "_" + objectEntity.Name
    /** @param {ObjectReferenceEntity} objectReferenceEntity */
    static subObjectAttributeNameFromReference = (objectReferenceEntity, nameOnly = false) =>
        this.subObjectAttributeNamePrefix + (!nameOnly ? "_" + objectReferenceEntity.type : "")
        + "_" + objectReferenceEntity.path
    static subObjectAttributeNameFromName = name => this.subObjectAttributeNamePrefix + "_" + name
    static switchTargetPattern = /\/Script\/[\w\.\/\:]+K2Node_Switch([A-Z]\w+)+/
    static trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end",
    }
    static unescapedBackslash = /(?<=(?:[^\\]|^)(?:\\\\)*)\\(?!\\)/
    static windowApplyEventName = "ueb-window-apply"
    static windowApplyButtonText = "OK"
    static windowCancelEventName = "ueb-window-cancel"
    static windowCancelButtonText = "Cancel"
    static windowCloseEventName = "ueb-window-close"
    static CommonEnums = {
        [this.paths.eAttachmentRule]: [
            "KeepRelative",
            "KeepWorld",
            "SnapToTarget",
        ],
        [this.paths.eMaterialSamplerType]: [
            "Color",
            "Grayscale",
            "Alpha",
            "Normal",
            "Masks",
            "Distance Field Font",
            "Linear Color",
            "Linear Grayscale",
            "Data",
            "External",
            "Virtual Color",
            "Virtual Grayscale",
            "Virtual Alpha",
            "Virtual Normal",
            "Virtual Mask",
            "Virtual Linear Color",
            "Virtual Linear Grayscal",
        ],
        [this.paths.eSamplerSourceMode]: ["From texture asset", "Shared: Wrap", "Shared: Clamp", "Hidden"],
        [this.paths.eSpawnActorCollisionHandlingMethod]: [
            ["Undefined", "Default"],
            ["AlwaysSpawn", "Always Spawn, Ignore Collisions"],
            ["AdjustIfPossibleButAlwaysSpawn", "Try To Adjust Location, But Always Spawn"],
            ["AdjustIfPossibleButDontSpawnIfColliding", "Try To Adjust Location, Don't Spawn If Still Colliding"],
            ["DontSpawnIfColliding", "Do Not Spawn"],
        ],
        [this.paths.eSearchCase]: ["CaseSensitive", "IgnoreCase"],
        [this.paths.eSearchDir]: ["FromStart", "FromEnd"],
        [this.paths.eDrawDebugTrace]: ["None", "ForOneFrame", "ForDuration", "Persistent"],
        [this.paths.eTextureMipValueMode]: [
            "None (use computed mip level)",
            "MipLevel (absolute, 0 is full resolution)",
            "MipBias (relative to the computed mip level)",
            "Derivative (explicit derivative to compute mip level)",
        ],
        [this.paths.eTraceTypeQuery]: [["TraceTypeQuery1", "Visibility"], ["TraceTypeQuery2", "Camera"]]
    }
    static ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta",
    ]
    /** @type {["R", "G", "B", "A"]} */
    static rgba = ["R", "G", "B", "A"]
    static Keys = {
        /* UE name: JS name */
        "Backspace": "Backspace",
        "Tab": "Tab",
        "LeftControl": "ControlLeft",
        "RightControl": "ControlRight",
        "LeftShift": "ShiftLeft",
        "RightShift": "ShiftRight",
        "LeftAlt": "AltLeft",
        "RightAlt": "AltRight",
        "Enter": "Enter",
        "Pause": "Pause",
        "CapsLock": "CapsLock",
        "Escape": "Escape",
        "Space": "Space",
        "PageUp": "PageUp",
        "PageDown": "PageDown",
        "End": "End",
        "Home": "Home",
        "ArrowLeft": "ArrowLeft",
        "ArrowUp": "ArrowUp",
        "ArrowRight": "ArrowRight",
        "ArrowDown": "ArrowDown",
        "PrintScreen": "PrintScreen",
        "Insert": "Insert",
        "Delete": "Delete",
        "Zero": "Digit0",
        "One": "Digit1",
        "Two": "Digit2",
        "Three": "Digit3",
        "Four": "Digit4",
        "Five": "Digit5",
        "Six": "Digit6",
        "Seven": "Digit7",
        "Eight": "Digit8",
        "Nine": "Digit9",
        "A": "KeyA",
        "B": "KeyB",
        "C": "KeyC",
        "D": "KeyD",
        "E": "KeyE",
        "F": "KeyF",
        "G": "KeyG",
        "H": "KeyH",
        "I": "KeyI",
        "K": "KeyK",
        "L": "KeyL",
        "M": "KeyM",
        "N": "KeyN",
        "O": "KeyO",
        "P": "KeyP",
        "Q": "KeyQ",
        "R": "KeyR",
        "S": "KeyS",
        "T": "KeyT",
        "U": "KeyU",
        "V": "KeyV",
        "W": "KeyW",
        "X": "KeyX",
        "Y": "KeyY",
        "Z": "KeyZ",
        "NumPadZero": "Numpad0",
        "NumPadOne": "Numpad1",
        "NumPadTwo": "Numpad2",
        "NumPadThree": "Numpad3",
        "NumPadFour": "Numpad4",
        "NumPadFive": "Numpad5",
        "NumPadSix": "Numpad6",
        "NumPadSeven": "Numpad7",
        "NumPadEight": "Numpad8",
        "NumPadNine": "Numpad9",
        "Multiply": "NumpadMultiply",
        "Add": "NumpadAdd",
        "Subtract": "NumpadSubtract",
        "Decimal": "NumpadDecimal",
        "Divide": "NumpadDivide",
        "F1": "F1",
        "F2": "F2",
        "F3": "F3",
        "F4": "F4",
        "F5": "F5",
        "F6": "F6",
        "F7": "F7",
        "F8": "F8",
        "F9": "F9",
        "F10": "F10",
        "F11": "F11",
        "F12": "F12",
        "NumLock": "NumLock",
        "ScrollLock": "ScrollLock",
    }
}

class ComputedType {

    #f

    /** @param {Function} f */
    constructor(f) {
        this.#f = f;
    }

    /** @param {IEntity} entity */
    compute(entity) {
        return this.#f(entity)
    }
}

/**
 * @template T
 * @typedef {{
 *     type?: AttributeTypeDescription,
 *     default?: T,
 *     nullable?: Boolean,
 *     ignored?: Boolean,
 *     serialized?: Boolean,
 *     expected?: Boolean,
 *     inlined?: Boolean,
 *     quoted?: Boolean,
 *     silent?: Boolean,
 *     uninitialized?: Boolean,
 *     predicate?: (value: T) => Boolean,
 * }} AttributeInfoSource
 */

/** @template T */
class AttributeInfo {

    /** @typedef {keyof AttributeInfo<number>} AttributeKey */

    static #default = {
        nullable: false,
        ignored: false, // Never serialize or deserialize
        serialized: false, // Value is written and read as string
        expected: false, // Must be there
        inlined: false, // The key is a subobject or array and printed as inlined (A.B=123, A(0)=123)
        quoted: false, // Key is serialized with quotes
        silent: false, // Do not serialize if default
        uninitialized: false, // Do not initialize with default
    }

    /** @param {AttributeInfoSource<T>} source */
    constructor(source) {
        this.type = source.type ?? source.default?.constructor;
        this.default = source.default;
        this.nullable = source.nullable ?? source.default === null;
        this.ignored = source.ignored;
        this.serialized = source.serialized;
        this.expected = source.expected;
        this.inlined = source.inlined;
        this.quoted = source.quoted;
        this.silent = source.silent;
        this.uninitialized = source.uninitialized;
        this.predicate = source.predicate;
        if (this.type === Array && this.default instanceof Array && this.default.length > 0) {
            this.type = this.default
                .map(v => v.constructor)
                .reduce((acc, cur) => acc.includes(cur) ? acc : (acc.push(cur), acc), []);
        }
    }

    /**
     * @template {AttributeTypeDescription} D
     * @param {D} type
     * @returns {AttributeInfo<DescribedType<type>>}
     */
    static createType(type) {
        return new AttributeInfo({ type })
    }

    /** 
     * @template V
     * @param {V} value
     */
    static createValue(value) {
        return new AttributeInfo({ default: value })
    }

    /**
     * @param {IEntity | Object} source
     * @param {String} attribute
     * @param {AttributeKey} key
     */
    static hasAttribute(source, attribute, key, type = /** @type {EntityConstructor} */(source.constructor)) {
        const entity = /** @type {IEntity} */(source);
        const result = entity.attributes[attribute]?.[key];
        return /** @type {result} */(
            result
            ?? type?.attributes?.[attribute]?.[key]
            ?? AttributeInfo.#default[key]
        )
    }

    /**
     * @template {IEntity | Object} S
     * @template {EntityConstructor} C
     * @template {keyof C["attributes"]} A
     * @template {keyof C["attributes"][attribute]} K
     * @param {S} source
     * @param {A} attribute
     * @param {K} key
     * @param {C} type
     * @returns {C["attributes"][attribute][key]}
     */
    static getAttribute(source, attribute, key, type = /** @type {C} */(source.constructor)) {
        let result = source["attributes"]?.[attribute]?.[key];
        // Remember null is a valid asignment value for some attributes
        if (result !== undefined) {
            return result
        }
        result = /** @type {C["attributes"]} */(type?.attributes)?.[attribute]?.[key];
        if (result !== undefined) {
            return result
        }
        result = /** @type {C["attributes"][attribute]} */(AttributeInfo.#default)[key];
        if (result !== undefined) {
            return result
        }
    }

    /** @param {AttributeKey} key */
    get(key) {
        return this[key] ?? AttributeInfo.#default[key]
    }
}

/** @template {Attribute} T */
class MirroredEntity {

    static attributes = {
        type: new AttributeInfo({
            ignored: true,
        }),
        getter: new AttributeInfo({
            ignored: true,
        }),
    }

    /**
     * @param {ConstructorType<T>} type
     * @param {() => T} getter
     */
    constructor(type, getter = null) {
        this.type = type;
        this.getter = getter;
    }

    get() {
        return this.getter()
    }

    /** @returns {AttributeConstructor<Attribute>} */
    getTargetType() {
        const result = this.type;
        if (result instanceof MirroredEntity) {
            return result.getTargetType()
        }
        return result
    }
}

/** @template {any[]} T */
class Union {

    /** @type {T} */
    #values
    get values() {
        return this.#values
    }

    /** @param  {T} values */
    constructor(...values) {
        this.#values = values;
    }
}

class Utility {

    static booleanConverter = {
        fromAttribute: (value, type) => {
        },
        toAttribute: (value, type) => {
            if (value === true) {
                return "true"
            }
            if (value === false) {
                return "false"
            }
            return ""
        }
    }

    /** @param {Number} x */
    static sigmoid(x, curvature = 1.7) {
        return 1 / (1 + (x / (1 - x) ** -curvature))
    }

    /** @param {Number} x */
    static sigmoidPositive(x, curvature = 3.7, length = 1.1) {
        return 1 - Math.exp(-((x / length) ** curvature))
    }

    /** @param {Number} value */
    static clamp(value, min = -Infinity, max = Infinity) {
        return Math.min(Math.max(value, min), max)
    }

    /** @param {HTMLElement} element */
    static getScale(element) {
        // @ts-expect-error
        const scale = element.blueprint?.getScale() ?? getComputedStyle(element).getPropertyValue("--ueb-scale");
        return scale != "" ? parseFloat(scale) : 1
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static minDecimals(num, decimals = 1, epsilon = 1e-8) {
        const powered = num * 10 ** decimals;
        if (Math.abs(powered % 1) > epsilon) {
            // More decimal digits than required
            return num.toString()
        }
        return num.toFixed(decimals)
    }

    /** @param {String} value */
    static numberFromText(value = "") {
        value = value.toLowerCase();
        switch (value) {
            case "zero": return 0
            case "one": return 1
            case "two": return 2
            case "three": return 3
            case "four": return 4
            case "five": return 5
            case "six": return 6
            case "seven": return 7
            case "eight": return 8
            case "nine": return 9
        }
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static roundDecimals(num, decimals = 1) {
        const power = 10 ** decimals;
        return Math.round(num * power) / power
    }

    /** @param {Number} num */
    static printNumber(num) {
        if (num == Number.POSITIVE_INFINITY) {
            return "inf"
        } else if (num == Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        return Utility.minDecimals(num)
    }

    /** @param {Number} num */
    static printExponential(num) {
        if (num == Number.POSITIVE_INFINITY) {
            return "inf"
        } else if (num == Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        const int = Math.round(num);
        if (int >= 1000) {
            const exp = Math.floor(Math.log10(int));
            const dec = Math.round(num / 10 ** (exp - 2)) / 100;
            // Not using num.toExponential() because of the omitted leading 0 on the exponential
            return `${dec}e+${exp < 10 ? "0" : ""}${exp}`
        }
        const intPart = Math.floor(num);
        if (intPart == 0) {
            return num.toString()
        }
        return this.roundDecimals(num, Math.max(0, 3 - Math.floor(num).toString().length)).toString()
    }

    /**
     * @param {Number} a
     * @param {Number} b
     */
    static approximatelyEqual(a, b, epsilon = 1e-8) {
        return !(Math.abs(a - b) > epsilon)
    }

    /**
     * @param {Coordinates} viewportLocation
     * @param {HTMLElement} movementElement
     */
    static convertLocation(viewportLocation, movementElement, ignoreScale = false) {
        const scaleCorrection = ignoreScale ? 1 : 1 / Utility.getScale(movementElement);
        const bounding = movementElement.getBoundingClientRect();
        const location = /** @type {Coordinates} */([
            Math.round((viewportLocation[0] - bounding.x) * scaleCorrection),
            Math.round((viewportLocation[1] - bounding.y) * scaleCorrection)
        ]);
        return location
    }

    /**
     * @param {Attribute} entity
     * @param {String} key
     * @returns {Boolean}
     */
    static isSerialized(entity, key) {
        return entity["attributes"]?.[key]?.serialized
            ?? entity.constructor["attributes"]?.[key]?.serialized
            ?? false
    }

    /** @param {String[]} keys */
    static objectGet(target, keys, defaultValue = undefined) {
        if (target === undefined) {
            return undefined
        }
        if (!(keys instanceof Array)) {
            throw new TypeError("UEBlueprint: Expected keys to be an array")
        }
        if (keys.length == 0 || !(keys[0] in target) || target[keys[0]] === undefined) {
            return defaultValue
        }
        if (keys.length == 1) {
            return target[keys[0]]
        }
        return Utility.objectGet(target[keys[0]], keys.slice(1), defaultValue)
    }

    /**
     * @param {String[]} keys
     * @returns {Boolean}
     */
    static objectSet(target, keys, value, defaultDictType = Object) {
        if (!(keys instanceof Array)) {
            throw new TypeError("Expected keys to be an array.")
        }
        if (keys.length == 1) {
            if (keys[0] in target || target[keys[0]] === undefined) {
                target[keys[0]] = value;
                return true
            }
        } else if (keys.length > 0) {
            if (!(target[keys[0]] instanceof Object)) {
                target[keys[0]] = new defaultDictType();
            }
            return Utility.objectSet(target[keys[0]], keys.slice(1), value, defaultDictType)
        }
        return false
    }

    /**
     * @param {Attribute} a
     * @param {Attribute} b
     */
    static equals(a, b) {
        while (a instanceof MirroredEntity) {
            a = a.get();
        }
        while (b instanceof MirroredEntity) {
            b = b.get();
        }
        // Here we cannot check both instanceof IEntity because this would introduce a circular include dependency
        if (/** @type {IEntity?} */(a)?.equals && /** @type {IEntity?} */(b)?.equals) {
            return /** @type {IEntity} */(a).equals(/** @type {IEntity} */(b))
        }
        a = Utility.sanitize(a);
        b = Utility.sanitize(b);
        if (a?.constructor === BigInt && b?.constructor === Number) {
            b = BigInt(b);
        } else if (a?.constructor === Number && b?.constructor === BigInt) {
            a = BigInt(a);
        }
        if (a === b) {
            return true
        }
        if (a instanceof Array && b instanceof Array) {
            return a.length === b.length && a.every((value, i) => Utility.equals(value, b[i]))
        }
        return false
    }

    /**
     * @template {Attribute | AttributeTypeDescription} T
     * @param {T} value
     * @returns {AttributeConstructor<T>}
     */
    static getType(value) {
        if (value === null) {
            return null
        }
        if (value?.constructor === Object && /** @type {AttributeInformation} */(value)?.type instanceof Function) {
            return /** @type {AttributeInformation} */(value).type
        }
        return /** @type {AttributeConstructor<any>} */(value?.constructor)
    }

    /**
     * @template {Attribute} V
     * @template {AttributeConstructor<V>} C
     * @param {C} type
     * @returns {value is InstanceType<C>}
     */
    static isValueOfType(value, type, acceptNull = false) {
        if (type instanceof MirroredEntity) {
            type = type.getTargetType();
        }
        return (acceptNull && value === null) || value instanceof type || value?.constructor === type
    }

    /** @param {Attribute} value */
    static sanitize(value, targetType = /** @type {AttributeTypeDescription } */(value?.constructor)) {
        if (targetType instanceof Array) {
            targetType = targetType[0];
        }
        if (targetType instanceof ComputedType) {
            return value // The type is computed, can't say anything about it
        }
        if (targetType instanceof Union) {
            let type = targetType.values.find(t => Utility.isValueOfType(value, t, false));
            if (!type) {
                type = targetType.values[0];
            }
            targetType = type;
        }
        if (targetType instanceof MirroredEntity) {
            if (value instanceof MirroredEntity) {
                return value
            }
            return Utility.sanitize(value, targetType.getTargetType())
        }
        if (targetType && !Utility.isValueOfType(value, targetType, true)) {
            value = targetType === BigInt
                ? BigInt(/** @type {Number} */(value))
                : new /** @type {EntityConstructor} */(targetType)(value);
        }
        if (value instanceof Boolean || value instanceof Number || value instanceof String) {
            value = /** @type {TerminalAttribute} */(value.valueOf()); // Get the relative primitive value
        }
        return value
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} gridSize
     * @returns {Coordinates}
     */
    static snapToGrid(x, y, gridSize) {
        if (gridSize === 1) {
            return [x, y]
        }
        return [
            gridSize * Math.floor(x / gridSize),
            gridSize * Math.floor(y / gridSize)
        ]
    }

    /**
     * @template T
     * @param {Array<T>} a
     * @param {Array<T>} b
     * @param {(l: T, r: T) => Boolean} predicate
     */
    static mergeArrays(a = [], b = [], predicate = (l, r) => l == r) {
        let result = [];
        a = [...a];
        b = [...b];
        restart:
        while (true) {
            for (let j = 0; j < b.length; ++j) {
                for (let i = 0; i < a.length; ++i) {
                    if (predicate(a[i], b[j])) {
                        // Found an element in common in the two arrays
                        result.push(
                            // Take and append all the elements skipped from a
                            ...a.splice(0, i),
                            // Take and append all the elements skippend from b
                            ...b.splice(0, j),
                            // Take and append the element in common
                            ...a.splice(0, 1)
                        );
                        b.shift(); // Remove the same element from b
                        continue restart
                    }
                }
            }
            break restart
        }
        // Append remaining the elements in the arrays and make it unique
        return [...(new Set(result.concat(...a, ...b)))]
    }

    /** @param {String} value */
    static escapeString(value) {
        return value
            .replaceAll(new RegExp(`(${Configuration.stringEscapedCharacters.source})`, "g"), '\\$1')
            .replaceAll("\n", "\\n") // Replace newline with \n
            .replaceAll("\t", "\\t") // Replace tab with \t
    }

    /** @param {String} value */
    static unescapeString(value) {
        return value
            .replaceAll(new RegExp(Configuration.unescapedBackslash.source + "t", "g"), "\t") // Replace tab with \t
            .replaceAll(new RegExp(Configuration.unescapedBackslash.source + "n", "g"), "\n") // Replace newline with \n
            .replaceAll(new RegExp(`\\\\(${Configuration.stringEscapedCharacters.source})`, "g"), "$1")
    }

    /** @param {String} value */
    static clearHTMLWhitespace(value) {
        return value
            .replaceAll("&nbsp;", "\u00A0") // whitespace
            .replaceAll(/<br\s*\/>|<br>/g, "\n") // newlines
            .replaceAll(/(\<!--.*?\-->)/g, "") // html comments
    }

    /** @param {String} value */
    static encodeHTMLWhitespace(value) {
        return value.replaceAll(" ", "\u00A0")
    }

    /** @param {String} value */
    static capitalFirstLetter(value) {
        if (value.length === 0) {
            return value
        }
        return value.charAt(0).toUpperCase() + value.slice(1)
    }

    /** @param {String} value */
    static formatStringName(value = "") {
        return value
            // Remove leading b (for boolean values) or newlines
            .replace(/^\s*b(?=[A-Z])/, "")
            // Insert a space where needed, possibly removing unnecessary elading characters
            .replaceAll(Configuration.nameRegexSpaceReplacement, " ")
            .trim()
            .split(" ")
            .map(v => Utility.capitalFirstLetter(v))
            .join(" ")
    }

    /** @param {String} value */
    static getIdFromReference(value) {
        return value
            .replace(/(?:.+\.)?([^\.]+)$/, "$1")
            .replaceAll(/(?<=[a-z\d])(?=[A-Z])|(?<=[a-zA-Z])(?=\d)|(?<=[A-Z]{2})(?=[A-Z][a-z])/g, "-")
            .toLowerCase()
    }

    /** @param {String} pathValue */
    static getNameFromPath(pathValue) {
        return pathValue.match(/[^\.\/]+$/)?.[0] ?? ""
    }

    /** @param {LinearColorEntity} value */
    static printLinearColor(value) {
        return `${Math.round(value.R.valueOf() * 255)}, ${Math.round(value.G.valueOf() * 255)}, ${Math.round(value.B.valueOf() * 255)}`
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Coordinates}
     */
    static getPolarCoordinates(x, y, positiveTheta = false) {
        let theta = Math.atan2(y, x);
        if (positiveTheta && theta < 0) {
            theta = 2 * Math.PI + theta;
        }
        return [
            Math.sqrt(x * x + y * y),
            theta,
        ]
    }

    /**
     * @param {Number} r
     * @param {Number} theta
     * @returns {Coordinates}
     */
    static getCartesianCoordinates(r, theta) {
        return [
            r * Math.cos(theta),
            r * Math.sin(theta)
        ]
    }

    /**
     * @param {Number} begin
     * @param {Number} end
     */
    static range(begin = 0, end = 0, step = end >= begin ? 1 : -1) {
        return Array.from({ length: Math.ceil((end - begin) / step) }, (_, i) => begin + (i * step))
    }

    /** @param {String[]} words */
    static getFirstWordOrder(words) {
        return new RegExp(/\s*/.source + words.join(/[^\n]+\n\s*/.source) + /\s*/.source)
    }

    /**
     * @param {HTMLElement} element
     * @param {String} value
     */
    static paste(element, value) {
        const event = new ClipboardEvent("paste", {
            bubbles: true,
            cancelable: true,
            clipboardData: new DataTransfer(),
        });
        event.clipboardData.setData("text", value);
        element.dispatchEvent(event);
    }

    /** @param {Blueprint} blueprint */
    static async copy(blueprint) {
        const event = new ClipboardEvent("copy", {
            bubbles: true,
            cancelable: true,
            clipboardData: new DataTransfer(),
        });
        blueprint.dispatchEvent(event);
    }

    static animate(
        from,
        to,
        intervalSeconds,
        callback,
        acknowledgeRequestAnimationId = id => { },
        timingFunction = x => {
            const v = x ** 3.5;
            return v / (v + ((1 - x) ** 3.5))
        }
    ) {
        let startTimestamp;
        const doAnimation = currentTimestamp => {
            if (startTimestamp === undefined) {
                startTimestamp = currentTimestamp;
            }
            let delta = (currentTimestamp - startTimestamp) / intervalSeconds;
            if (Utility.approximatelyEqual(delta, 1) || delta > 1) {
                delta = 1;
            } else {
                acknowledgeRequestAnimationId(requestAnimationFrame(doAnimation));
            }
            const currentValue = from + (to - from) * timingFunction(delta);
            callback(currentValue);
        };
        acknowledgeRequestAnimationId(requestAnimationFrame(doAnimation));
    }
}

/**
 * @template {IEntity} EntityT
 * @template {ITemplate} TemplateT
 */
class IElement extends s {

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }
    set blueprint(v) {
        this.#blueprint = v;
    }

    /** @type {EntityT} */
    #entity
    get entity() {
        return this.#entity
    }
    set entity(entity) {
        this.#entity = entity;
    }

    /** @type {TemplateT} */
    #template
    get template() {
        return this.#template
    }

    isInitialized = false
    isSetup = false

    /** @type {IInput[]} */
    inputObjects = []

    /**
     * @param {EntityT} entity
     * @param {TemplateT} template
     */
    initialize(entity, template) {
        this.requestUpdate();
        this.#entity = entity;
        this.#template = template;
        this.#template.initialize(this);
        if (this.isConnected) {
            this.updateComplete.then(() => this.setup());
        }
        this.isInitialized = true;
    }

    connectedCallback() {
        super.connectedCallback();
        this.blueprint = /** @type {Blueprint} */(this.closest("ueb-blueprint"));
        if (this.isInitialized) {
            this.requestUpdate();
            this.updateComplete.then(() => this.setup());
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.isSetup) {
            this.updateComplete.then(() => this.cleanup());
        }
        this.acknowledgeDelete();
    }

    createRenderRoot() {
        return this
    }

    setup() {
        this.template.setup();
        this.isSetup = true;
    }

    cleanup() {
        this.template.cleanup();
        this.isSetup = false;
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        this.template.willUpdate(changedProperties);
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        this.template.update(changedProperties);
    }

    render() {
        return this.template.render()
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.template.firstUpdated(changedProperties);
        this.template.inputSetup();
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties);
        this.template.updated(changedProperties);
    }

    acknowledgeDelete() {
        let deleteEvent = new CustomEvent(Configuration.removeEventName);
        this.dispatchEvent(deleteEvent);
    }

    /** @param {IElement} element */
    isSameGraph(element) {
        return this.blueprint && this.blueprint == element?.blueprint
    }
}

/**
 * @template {IEntity} EntityT
 * @template {ITemplate} TemplateT
 * @extends {IElement<EntityT, TemplateT>}
 */
class IFromToPositionedElement extends IElement {

    static properties = {
        ...super.properties,
        fromX: {
            type: Number,
            attribute: false,
        },
        fromY: {
            type: Number,
            attribute: false,
        },
        toX: {
            type: Number,
            attribute: false,
        },
        toY: {
            type: Number,
            attribute: false,
        },
    }

    constructor() {
        super();
        this.fromX = 0;
        this.fromY = 0;
        this.toX = 0;
        this.toY = 0;
    }

    /** @param {Coordinates} param0 */
    setBothLocations([x, y]) {
        this.fromX = x;
        this.fromY = y;
        this.toX = x;
        this.toY = y;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addSourceLocation(x, y) {
        this.fromX += x;
        this.fromY += y;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addDestinationLocation(x, y) {
        this.toX += x;
        this.toY += y;
    }
}

class Shortcuts {
    static deleteNodes = "Delete"
    static duplicateNodes = "(bCtrl=True,Key=D)"
    static enableLinkDelete = "LeftAlt"
    static enableZoomIn = ["LeftControl", "RightControl"] // Button to enable more than 1:1 zoom
    static selectAllNodes = "(bCtrl=True,Key=A)"
}

class ElementFactory {

    /** @type {Map<String, AnyConstructor<IElement>>} */
    static #elementConstructors = new Map()

    /**
     * @param {String} tagName
     * @param {AnyConstructor<IElement>} entityConstructor
     */
    static registerElement(tagName, entityConstructor) {
        ElementFactory.#elementConstructors.set(tagName, entityConstructor);
    }

    /** @param {String} tagName */
    static getConstructor(tagName) {
        return ElementFactory.#elementConstructors.get(tagName)
    }
}

class Reply {

    /**
     * @template T
     * @param {Number} position
     * @param {T} value
     * @param {PathNode} bestPath
     * @returns {Result<T>}
     */
    static makeSuccess(position, value, bestPath = null, bestPosition = 0) {
        return {
            status: true,
            value: value,
            position: position,
            bestParser: bestPath,
            bestPosition: bestPosition,
        }
    }

    /**
     * @param {PathNode} bestPath
     * @returns {Result<null>}
     */
    static makeFailure(position = 0, bestPath = null, bestPosition = 0) {
        return {
            status: false,
            value: null,
            position,
            bestParser: bestPath,
            bestPosition: bestPosition,
        }
    }

    /** @param {Parsernostrum<Parser>} parsernostrum */
    static makeContext(parsernostrum = null, input = "") {
        return /** @type {Context} */({
            parsernostrum,
            input,
            highlighted: null,
        })
    }

    static makePathNode(parser, index = 0, previous = null) {
        return /** @type {PathNode} */({
            parent: previous,
            parser,
            index,
        })
    }
}

class Parser {

    static indentation = "    "
    static highlight = "Last valid parser"

    /** @type {(new (...args: any) => Parser) & typeof Parser} */
    Self

    /**
     * @param {String} target
     * @param {String} value
     */
    static appendBeforeHighlight(target, value) {
        if (target.endsWith(Parser.highlight)) {
            target = target.replace(/(?=(?:\n|^).+$)/, value);
        } else {
            target += value;
        }
        return target
    }

    /** @param {String} value */
    static lastRowLength(value, firstRowPadding = 0) {
        // This regex always matches and group 2 (content of the last row) is always there
        const match = value.match(/(?:\n|(^))([^\n]*)$/);
        // Group 1 tells wheter or not it matched the first row (last row is also first row)
        const additional = match[1] !== undefined ? firstRowPadding : 0;
        return match[2].length + additional
    }

    /**
     * @param {Context} context
     * @param {PathNode} path
     */
    isHighlighted(context, path) {
        if (context.highlighted instanceof Parser) {
            return context.highlighted === this
        }
        if (!context.highlighted || !path) {
            return false
        }
        let a, prevA, b, prevB;
        loop:
        for (
            a = path,
            b = /** @type {PathNode} */(context.highlighted);
            a && b;
            prevA = a, a = a.parent,
            prevB = b, b = b.parent
        ) {
            if (a.parser !== b.parser || a.index !== b.index) {
                if (!prevA || !prevB) {
                    return false // Starting nodes did not match
                }
                // Try to speculatevely walk the path in reverse to find matching nodes
                let nextA;
                let nextB;
                for (
                    nextA = a, nextB = b;
                    nextA || nextB;
                    nextA = nextA?.parent, nextB = nextB?.parent
                ) {
                    const aMatches = nextA?.parser === prevA.parser;
                    const bMatches = nextB?.parser === prevB.parser;
                    if (aMatches || bMatches) {
                        if (aMatches) {
                            prevA = nextA;
                        }
                        if (bMatches) {
                            prevB = nextB;
                        }
                        a = prevA;
                        b = prevB;
                        continue loop
                    }
                }
                return false
            }
        }
        return true
    }

    /** @param {PathNode?} path */
    isVisited(path) {
        if (!path) {
            return false
        }
        for (path = path.parent; path != null; path = path.parent) {
            if (path.parser === this) {
                return true
            }
        }
        return false
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @returns {Result<ParserValue<any>>}
     */
    parse(context, position, path) {
        return null
    }

    /** @param {PathNode} path */
    toString(context = Reply.makeContext(null, ""), indent = 0, path = null) {
        if (this.isVisited(path)) {
            return "<...>" // Recursive parser
        }
        const result = this.doToString(context, indent, path);
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        return `${this.constructor.name} does not implement toString()`
    }
}

/** @template {String} T */
class StringParser extends Parser {

    #value
    get value() {
        return this.#value
    }

    /** @param {T} value */
    constructor(value) {
        super();
        this.#value = value;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        const end = position + this.#value.length;
        const value = context.input.substring(position, end);
        const result = this.#value === value
            ? Reply.makeSuccess(end, this.#value, path, end)
            : Reply.makeFailure();
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        const inlined = this.value.replaceAll("\n", "\\n");
        let result = !this.value.match(/^[a-zA-Z]$/)
            ? `"${inlined.replaceAll('"', '\\"')}"`
            : inlined;
        if (this.isHighlighted(context, path)) {
            result += "\n" + Parser.indentation.repeat(indent) + "^".repeat(result.length) + " " + Parser.highlight;
        }
        return result
    }
}

class SuccessParser extends Parser {

    static instance = new SuccessParser()

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        return Reply.makeSuccess(position, "", path, 0)
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        return "<SUCCESS>"
            + (this.isHighlighted(context, path)
                ? `\n${Parser.indentation.repeat(indent)}^^^^^^^^^ ${Parser.highlight}`
                : ""
            )
    }
}

/** @template {Parser[]} T */
class AlternativeParser extends Parser {

    static highlightRegexp = new RegExp(
        // Matches the beginning of a row containing Parser.highlight only when after the first row of an alternative
        String.raw`(?<=[^\S\n]*\| .*\n)^(?=[^\S\n]*\^+ ${Parser.highlight}(?:\n|$))`,
        "m"
    )

    #parsers
    get parsers() {
        return this.#parsers
    }

    /** @param {T} parsers */
    constructor(...parsers) {
        super();
        this.#parsers = parsers;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        const result = Reply.makeSuccess(0, /** @type {ParserValue<T>} */(""));
        for (let i = 0; i < this.#parsers.length; ++i) {
            const outcome = this.#parsers[i].parse(
                context,
                position,
                { parent: path, parser: this.#parsers[i], index: i }
            );
            if (outcome.bestPosition > result.bestPosition) {
                result.bestParser = outcome.bestParser;
                result.bestPosition = outcome.bestPosition;
            }
            if (outcome.status) {
                result.value = outcome.value;
                result.position = outcome.position;
                return result
            }
        }
        result.status = false;
        result.value = null;
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        const indentation = Parser.indentation.repeat(indent);
        const deeperIndentation = Parser.indentation.repeat(indent + 1);
        if (this.#parsers.length === 2 && this.#parsers[1] instanceof SuccessParser) {
            let result = this.#parsers[0].toString(
                context,
                indent,
                { parent: path, parser: this.#parsers[0], index: 0 }
            );
            if (!(this.#parsers[0] instanceof StringParser)) {
                result = "<" + result + ">";
            }
            result += "?";
            return result
        }
        let serialized = this.#parsers
            .map((parser, index) => parser.toString(context, indent + 1, { parent: path, parser, index }))
            .join("\n" + deeperIndentation + "| ");
        if (context.highlighted) {
            serialized = serialized.replace(AlternativeParser.highlightRegexp, "  ");
        }
        let result = "ALT<\n"
            + (this.isHighlighted(context, path) ? `${indentation}^^^ ${Parser.highlight}\n` : "")
            + deeperIndentation + serialized
            + "\n" + indentation + ">";
        return result
    }
}

/**
 * @template {Parser} T
 * @template {(v: ParserValue<T>, input: String, position: Number) => Parsernostrum<Parser>} C
 */
class ChainedParser extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #fn

    /**
     * @param {T} parser
     * @param {C} chained
     */
    constructor(parser, chained) {
        super();
        this.#parser = parser;
        this.#fn = chained;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @returns {Result<ParserValue<UnwrapParser<ReturnType<C>>>>}
     */
    parse(context, position, path) {
        const outcome = this.#parser.parse(context, position, { parent: path, parser: this.#parser, index: 0 });
        if (!outcome.status) {
            // @ts-expect-error
            return outcome
        }
        // @ts-expect-error
        const result = this.#fn(outcome.value, context.input, outcome.position)
            .getParser()
            .parse(context, outcome.position);
        if (outcome.bestPosition > result.bestPosition) {
            result.bestParser = outcome.bestParser;
            result.bestPosition = outcome.bestPosition;
        }
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        const serialized = "chained<f()>";
        let result = this.#parser.toString(context, indent, { parent: path, parser: this.#parser, index: 0 });
        if (this.isHighlighted(context, path)) {
            result +=
                " => "
                + serialized
                + "\n"
                // Group 1 is the portion between the last newline and end or the whole text
                + Parser.indentation.repeat(indent)
                + " ".repeat(result.match(/(?:\n|^)([^\n]+)$/)?.[1].length + 4)
                + "^".repeat(serialized.length)
                + " "
                + Parser.highlight;
        } else {
            result = Parser.appendBeforeHighlight(result, " => " + serialized);
        }
        return result
    }
}

class FailureParser extends Parser {

    static instance = new FailureParser()

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        return Reply.makeFailure()
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        const result = "<FAILURE>" + (
            this.isHighlighted(context, path)
                ? `\n${Parser.indentation.repeat(indent)}^^^^^^^^^ ${Parser.highlight}`
                : ""
        );
        return result
    }
}

/** @template {Parser} T */
class LazyParser extends Parser {

    #parser

    /** @type {T} */
    #resolvedPraser

    /** @param {() => Parsernostrum<T>} parser */
    constructor(parser) {
        super();
        this.#parser = parser;
    }

    resolve() {
        if (!this.#resolvedPraser) {
            this.#resolvedPraser = this.#parser().getParser();
        }
        return this.#resolvedPraser
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        this.resolve();
        return this.#resolvedPraser.parse(context, position, { parent: path, parser: this.#resolvedPraser, index: 0 })
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        const childrenPath = { parent: path, parser: this.#resolvedPraser, index: 0 };
        if (this.isHighlighted(context, path)) {
            context.highlighted = context.highlighted instanceof Parser ? this.#resolvedPraser : childrenPath;
        }
        return this.resolve().toString(context, indent, childrenPath)
    }
}

/** @template {Parser} T */
class Lookahead extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #type
    get type() {
        return this.#type
    }

    /**
     * @readonly
     * @enum {String}
     */
    static Type = {
        NEGATIVE_AHEAD: "?!",
        NEGATIVE_BEHIND: "?<!",
        POSITIVE_AHEAD: "?=",
        POSITIVE_BEHIND: "?<=",
    }

    /**
     * @param {T} parser
     * @param {Type} type
     */
    constructor(parser, type) {
        super();
        this.#parser = parser;
        this.#type = type;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        let result = this.#parser.parse(context, position, { parent: path, parser: this.#parser, index: 0 });
        result = result.status == (this.#type === Lookahead.Type.POSITIVE_AHEAD)
            ? Reply.makeSuccess(position, "", path, position)
            : Reply.makeFailure();
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        let result = "("
            + this.#type
            + this.#parser.toString(context, indent, { parent: path, parser: this.#parser, index: 0 })
            + ")";
        if (this.isHighlighted(context, path)) {
            result = result.replace(
                /(\n)|$/,
                "\n"
                + Parser.indentation.repeat(indent)
                + "^".repeat(this.#type.length + 1)
                + " "
                + Parser.highlight
                + "$1"
            );
        }
        return result
    }
}

/** @template T */
class RegExpParser extends Parser {

    /** @type {RegExp} */
    #regexp
    get regexp() {
        return this.#regexp
    }
    /** @type {RegExp} */
    #anchoredRegexp
    #matchMapper

    static #createEscapeable = character => String.raw`[^${character}\\]*(?:\\.[^${character}\\]*)*`
    static #numberRegex = /[-\+]?(?:\d*\.)?\d+/
    static common = {
        number: new RegExp(this.#numberRegex.source + String.raw`(?!\.)`),
        numberInteger: /[\-\+]?\d+(?!\.\d)/,
        numberNatural: /\d+/,
        numberExponential: new RegExp(this.#numberRegex.source + String.raw`(?:[eE][\+\-]?\d+)?(?!\.)`),
        numberUnit: /\+?(?:0(?:\.\d+)?|1(?:\.0+)?)(?![\.\d])/,
        numberByte: /0*(?:25[0-5]|2[0-4]\d|1?\d?\d)(?!\d|\.)/,
        whitespace: /\s+/,
        whitespaceOpt: /\s*/,
        whitespaceInline: /[^\S\n]+/,
        whitespaceInlineOpt: /[^\S\n]*/,
        whitespaceMultiline: /\s*?\n\s*/,
        doubleQuotedString: new RegExp(`"(${this.#createEscapeable('"')})"`),
        singleQuotedString: new RegExp(`'(${this.#createEscapeable("'")})'`),
        backtickQuotedString: new RegExp("`(" + this.#createEscapeable("`") + ")`"),
    }


    /**
     * @param {RegExp} regexp
     * @param {(match: RegExpExecArray) => T} matchMapper
     */
    constructor(regexp, matchMapper) {
        super();
        this.#regexp = regexp;
        this.#anchoredRegexp = new RegExp(`^(?:${regexp.source})`, regexp.flags);
        this.#matchMapper = matchMapper;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        const match = this.#anchoredRegexp.exec(context.input.substring(position));
        if (match) {
            position += match[0].length;
        }
        const result = match
            ? Reply.makeSuccess(position, this.#matchMapper(match), path, position)
            : Reply.makeFailure();
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        let result = "/" + this.#regexp.source + "/";
        const shortname = Object
            .entries(RegExpParser.common)
            .find(([k, v]) => v.source === this.#regexp.source)?.[0];
        if (shortname) {
            result = "P." + shortname;
        }
        if (this.isHighlighted(context, path)) {
            result += "\n" + Parser.indentation.repeat(indent) + "^".repeat(result.length) + " " + Parser.highlight;
        }
        return result
    }
}

/**
 * @template {Parser} T
 * @template P
 */
class MapParser extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #mapper
    get mapper() {
        return this.#mapper
    }

    /**
     * @param {T} parser
     * @param {(v: ParserValue<P>) => P} mapper
     */
    constructor(parser, mapper) {
        super();
        this.#parser = parser;
        this.#mapper = mapper;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     * @returns {Result<P>}
     */
    parse(context, position, path) {
        const result = this.#parser.parse(context, position, { parent: path, parser: this.#parser, index: 0 });
        if (result.status) {
            result.value = this.#mapper(result.value);
        }
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        const childrenPath = { parent: path, parser: this.#parser, index: 0 };
        if (this.isHighlighted(context, path)) {
            context.highlighted = context.highlighted instanceof Parser ? this.#parser : childrenPath;
        }
        let result = this.#parser.toString(context, indent, childrenPath);
        if (this.#parser instanceof RegExpParser) {
            if (Object.values(RegExpParser.common).includes(this.#parser.regexp)) {
                if (
                    this.#parser.regexp === RegExpParser.common.numberInteger
                    && this.#mapper === /** @type {(v: any) => BigInt} */(BigInt)
                ) {
                    return "P.numberBigInteger"
                }
                return result
            }
        }
        let serializedMapper = this.#mapper.toString();
        if (serializedMapper.length > 60 || serializedMapper.includes("\n")) {
            serializedMapper = "(...) => { ... }";
        }
        serializedMapper = ` -> map<${serializedMapper}>`;
        result = Parser.appendBeforeHighlight(result, serializedMapper);
        return result
    }
}

/** @extends {RegExpParser<RegExpExecArray>} */
class RegExpArrayParser extends RegExpParser {

    /** @param {RegExpExecArray} match */
    static #mapper = match => match

    /** @param {RegExp} regexp */
    constructor(regexp) {
        super(regexp, RegExpArrayParser.#mapper);
    }
}

/** @extends {RegExpParser<String>} */
class RegExpValueParser extends RegExpParser {

    /** @param {RegExp} regexp */
    constructor(regexp, group = 0) {
        super(
            regexp,
            /** @param {RegExpExecArray} match */
            match => match[group]
        );
    }
}

/** @template {Parser[]} T */
class SequenceParser extends Parser {

    #parsers
    get parsers() {
        return this.#parsers
    }

    /** @param  {T} parsers */
    constructor(...parsers) {
        super();
        this.#parsers = parsers;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        const value = /** @type {ParserValue<T>} */(new Array(this.#parsers.length));
        const result = Reply.makeSuccess(position, value);
        for (let i = 0; i < this.#parsers.length; ++i) {
            const outcome = this.#parsers[i].parse(
                context,
                result.position,
                { parent: path, parser: this.#parsers[i], index: i }
            );
            if (outcome.bestPosition > result.bestPosition) {
                result.bestParser = outcome.bestParser;
                result.bestPosition = outcome.bestPosition;
            }
            if (!outcome.status) {
                result.status = false;
                result.value = null;
                break
            }
            result.value[i] = outcome.value;
            result.position = outcome.position;
        }
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        const indentation = Parser.indentation.repeat(indent);
        const deeperIndentation = Parser.indentation.repeat(indent + 1);
        const result = "SEQ<\n"
            + (this.isHighlighted(context, path) ? `${indentation}^^^ ${Parser.highlight}\n` : "")
            + this.#parsers
                .map((parser, index) => deeperIndentation + parser.toString(context, indent + 1, { parent: path, parser, index }))
                .join("\n")
            + "\n" + indentation + ">";
        return result
    }
}

/** @template {Parser} T */
class TimesParser extends Parser {

    #parser
    get parser() {
        return this.#parser
    }

    #min
    get min() {
        return this.#min
    }

    #max
    get max() {
        return this.#max
    }

    /** @param {T} parser */
    constructor(parser, min = 0, max = Number.POSITIVE_INFINITY) {
        super();
        if (min > max) {
            throw new Error("Min is greater than max")
        }
        this.#parser = parser;
        this.#min = min;
        this.#max = max;
    }

    /**
     * @param {Context} context
     * @param {Number} position
     * @param {PathNode} path
     */
    parse(context, position, path) {
        const value = /** @type {ParserValue<T>[]} */([]);
        const result = Reply.makeSuccess(position, value, path);
        for (let i = 0; i < this.#max; ++i) {
            const outcome = this.#parser.parse(
                context,
                result.position,
                { parent: path, parser: this.#parser, index: 0 }
            );
            if (outcome.bestPosition > result.bestPosition) {
                result.bestParser = outcome.bestParser;
                result.bestPosition = outcome.bestPosition;
            }
            if (!outcome.status) {
                if (i < this.#min) {
                    result.status = false;
                    result.value = null;
                }
                break
            }
            result.value.push(outcome.value);
            result.position = outcome.position;
        }
        return result
    }

    /**
     * @protected
     * @param {Context} context
     * @param {Number} indent
     * @param {PathNode} path
     */
    doToString(context, indent, path) {
        let result = this.parser.toString(context, indent, { parent: path, parser: this.parser, index: 0 });
        const serialized =
            this.#min === 0 && this.#max === 1 ? "?"
                : this.#min === 0 && this.#max === Number.POSITIVE_INFINITY ? "*"
                    : this.#min === 1 && this.#max === Number.POSITIVE_INFINITY ? "+"
                        : "{"
                        + this.#min
                        + (this.#min !== this.#max ? "," + this.#max : "")
                        + "}";
        if (this.isHighlighted(context, path)) {
            result +=
                serialized
                + "\n"
                + " ".repeat(Parser.lastRowLength(result, Parser.indentation.length * indent))
                + "^".repeat(serialized.length)
                + " "
                + Parser.highlight;
        } else {
            result = Parser.appendBeforeHighlight(result, serialized);
        }
        return result
    }
}

/** @template {Parser} T */
class Parsernostrum {

    #parser

    /** @type {(new (parser: Parser) => Parsernostrum<typeof parser>) & typeof Parsernostrum} */
    Self

    static lineColumnFromOffset(string, offset) {
        const lines = string.substring(0, offset).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        return { line, column }
    }
    /** @param {[any, ...any]|RegExpExecArray} param0 */
    static #firstElementGetter = ([v, _]) => v
    /** @param {[any, any, ...any]|RegExpExecArray} param0 */
    static #secondElementGetter = ([_, v]) => v
    static #arrayFlatter = ([first, rest]) => [first, ...rest]
    /**
     * @template T
     * @param {T} v
     * @returns {T extends Array ? String : T}
     */
    // @ts-expect-error
    static #joiner = v => v instanceof Array ? v.join("") : v
    static #createEscapeable = character => String.raw`[^${character}\\]*(?:\\.[^${character}\\]*)*`

    // Prefedined parsers

    /** Parser accepting any valid decimal, possibly signed number */
    static number = this.reg(RegExpParser.common.number).map(Number)

    /** Parser accepting any digits only number */
    static numberInteger = this.reg(RegExpParser.common.numberInteger).map(Number)

    /** Parser accepting any digits only number and returns a BigInt */
    static numberBigInteger = this.reg(this.numberInteger.getParser().parser.regexp).map(BigInt)

    /** Parser accepting any digits only number */
    static numberNatural = this.reg(RegExpParser.common.numberNatural).map(Number)

    /** Parser accepting any valid decimal, possibly signed, possibly in the exponential form number */
    static numberExponential = this.reg(RegExpParser.common.numberExponential).map(Number)

    /** Parser accepting any valid decimal number between 0 and 1 */
    static numberUnit = this.reg(RegExpParser.common.numberUnit).map(Number)

    /** Parser accepting any integer between 0 and 255 */
    static numberByte = this.reg(RegExpParser.common.numberByte).map(Number)

    /** Parser accepting whitespace */
    static whitespace = this.reg(RegExpParser.common.whitespace)

    /** Parser accepting whitespace */
    static whitespaceOpt = this.reg(RegExpParser.common.whitespaceOpt)

    /** Parser accepting whitespace that spans on a single line */
    static whitespaceInline = this.reg(RegExpParser.common.whitespaceInline)

    /** Parser accepting whitespace that spans on a single line */
    static whitespaceInlineOpt = this.reg(RegExpParser.common.whitespaceInlineOpt)

    /** Parser accepting whitespace that contains a list a newline */
    static whitespaceMultiline = this.reg(RegExpParser.common.whitespaceMultiline)

    /** Parser accepting a double quoted string and returns the content */
    static doubleQuotedString = this.reg(RegExpParser.common.doubleQuotedString, 1)

    /** Parser accepting a single quoted string and returns the content */
    static singleQuotedString = this.reg(RegExpParser.common.singleQuotedString, 1)

    /** Parser accepting a backtick quoted string and returns the content */
    static backtickQuotedString = this.reg(RegExpParser.common.backtickQuotedString, 1)

    /** @param {T} parser */
    constructor(parser, optimized = false) {
        this.#parser = parser;
    }

    getParser() {
        return this.#parser
    }

    /**
     * @param {String} input
     * @returns {Result<ParserValue<T>>}
     */
    run(input) {
        const result = this.#parser.parse(Reply.makeContext(this, input), 0, Reply.makePathNode(this.#parser));
        if (result.position !== input.length) {
            result.status = false;
        }
        return result
    }

    /**
     * @param {String} input
     * @throws {Error} when the parser fails to match
     */
    parse(input) {
        const result = this.run(input);
        if (!result.status) {
            const chunkLength = 60;
            const chunkRange = /** @type {[Number, Number]} */(
                [Math.ceil(chunkLength / 2), Math.floor(chunkLength / 2)]
            );
            const position = Parsernostrum.lineColumnFromOffset(input, result.bestPosition);
            let bestPosition = result.bestPosition;
            const inlineInput = input.replaceAll(
                /^(\s)+|\s{6,}|\s*?\n\s*/g,
                (m, startingSpace, offset) => {
                    let replaced = startingSpace ? "..." : " ... ";
                    if (offset <= result.bestPosition) {
                        if (result.bestPosition < offset + m.length) {
                            bestPosition -= result.bestPosition - offset;
                        } else {
                            bestPosition -= m.length - replaced.length;
                        }
                    }
                    return replaced
                }
            );
            const string = inlineInput.substring(0, chunkLength).trimEnd();
            const leadingWhitespaceLength = Math.min(
                input.substring(result.bestPosition - chunkRange[0]).match(/^\s*/)[0].length,
                chunkRange[0] - 1,
            );
            let offset = Math.min(bestPosition, chunkRange[0] - leadingWhitespaceLength);
            chunkRange[0] = Math.max(0, bestPosition - chunkRange[0]) + leadingWhitespaceLength;
            chunkRange[1] = Math.min(input.length, chunkRange[0] + chunkLength);
            let segment = inlineInput.substring(...chunkRange);
            if (chunkRange[0] > 0) {
                segment = "..." + segment;
                offset += 3;
            }
            if (chunkRange[1] < inlineInput.length - 1) {
                segment = segment + "...";
            }
            throw new Error(
                `Could not parse: ${string}\n\n`
                + `Input: ${segment}\n`
                + "       " + " ".repeat(offset)
                + `^ From here (line: ${position.line}, column: ${position.column}, offset: ${result.bestPosition})${result.bestPosition === input.length ? ", end of string" : ""}\n\n`
                + (result.bestParser ? "Last valid parser matched:" : "No parser matched:")
                + this.toString(1, true, result.bestParser)
                + "\n"
            )
        }
        return result.value
    }

    // Parsers

    /**
     * @template {String} S
     * @param {S} value
     */
    static str(value) {
        return new this(new StringParser(value))
    }

    /** @param {RegExp} value */
    static reg(value, group = 0) {
        return new this(new RegExpValueParser(value, group))
    }

    /** @param {RegExp} value */
    static regArray(value) {
        return new this(new RegExpArrayParser(value))
    }

    static success() {
        return new this(SuccessParser.instance)
    }

    static failure() {
        return new this(FailureParser.instance)
    }

    // Combinators

    /**
     * @template {[Parsernostrum<any>, Parsernostrum<any>, ...Parsernostrum<any>[]]} P
     * @param {P} parsers
     * @returns {Parsernostrum<SequenceParser<UnwrapParser<P>>>}
     */
    static seq(...parsers) {
        const results = new this(new SequenceParser(...parsers.map(p => p.getParser())));
        // @ts-expect-error
        return results
    }

    /**
     * @template {[Parsernostrum<any>, Parsernostrum<any>, ...Parsernostrum<any>[]]} P
     * @param {P} parsers
     * @returns {Parsernostrum<AlternativeParser<UnwrapParser<P>>>}
     */
    static alt(...parsers) {
        // @ts-expect-error
        return new this(new AlternativeParser(...parsers.map(p => p.getParser())))
    }

    /**
     * @template {Parsernostrum<any>} P
     * @param {P} parser
     */
    static lookahead(parser) {
        return new this(new Lookahead(parser.getParser(), Lookahead.Type.POSITIVE_AHEAD))
    }

    /**
     * @template {Parsernostrum<any>} P
     * @param {() => P} parser
     * @returns {Parsernostrum<LazyParser<UnwrapParser<P>>>}
     */
    static lazy(parser) {
        return new this(new LazyParser(parser))
    }

    /** @param {Number} min */
    times(min, max = min) {
        return new Parsernostrum(new TimesParser(this.#parser, min, max))
    }

    many() {
        return this.times(0, Number.POSITIVE_INFINITY)
    }

    /** @param {Number} n */
    atLeast(n) {
        return this.times(n, Number.POSITIVE_INFINITY)
    }

    /** @param {Number} n */
    atMost(n) {
        return this.times(0, n)
    }

    /** @returns {Parsernostrum<T?>} */
    opt() {
        // @ts-expect-error
        return Parsernostrum.alt(this, Parsernostrum.success())
    }

    /**
     * @template {Parsernostrum<Parser>} P
     * @param {P} separator
     */
    sepBy(separator, allowTrailing = false) {
        const results = Parsernostrum.seq(
            this,
            Parsernostrum.seq(separator, this).map(Parsernostrum.#secondElementGetter).many()
        )
            .map(Parsernostrum.#arrayFlatter);
        return results
    }

    skipSpace() {
        return Parsernostrum.seq(this, Parsernostrum.whitespaceOpt).map(Parsernostrum.#firstElementGetter)
    }

    /**
     * @template P
     * @param {(v: ParserValue<T>) => P} fn
     * @returns {Parsernostrum<MapParser<T, P>>}
     */
    map(fn) {
        // @ts-expect-error
        return new Parsernostrum(new MapParser(this.#parser, fn))
    }

    /**
     * @template {Parsernostrum<Parser>} P
     * @param {(v: ParserValue<T>, input: String, position: Number) => P} fn
     */
    chain(fn) {
        return new Parsernostrum(new ChainedParser(this.#parser, fn))
    }

    /**
     * @param {(v: ParserValue<T>, input: String, position: Number) => boolean} fn
     * @return {Parsernostrum<T>}
     */
    assert(fn) {
        // @ts-expect-error
        return this.chain((v, input, position) => fn(v, input, position)
            ? Parsernostrum.success().map(() => v)
            : Parsernostrum.failure()
        )
    }

    join(value = "") {
        return this.map(Parsernostrum.#joiner)
    }

    /** @param {Parsernostrum<Parser> | Parser | PathNode} highlight */
    toString(indent = 0, newline = false, highlight = null) {
        if (highlight instanceof Parsernostrum) {
            highlight = highlight.getParser();
        }
        const context = Reply.makeContext(this, "");
        context.highlighted = highlight;
        return (newline ? "\n" + Parser.indentation.repeat(indent) : "")
            + this.#parser.toString(context, indent, Reply.makePathNode(this.#parser))
    }
}

class SVGIcon {

    static arrayPin = x`
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0H0V4H4V0Z" fill="currentColor" />
            <path d="M10 0H6V4H10V0Z" fill="currentColor" />
            <path d="M16 0H12V4H16V0Z" fill="currentColor" />
            <path d="M4 6H0V10H4V6Z" fill="currentColor" />
            <path class="ueb-pin-tofill" d="M10 6H6V10H10V6Z" fill="black" />
            <path d="M16 6H12V10H16V6Z" fill="currentColor" />
            <path d="M4 12H0V16H4V12Z" fill="currentColor" />
            <path d="M10 12H6V16H10V12Z" fill="currentColor" />
            <path d="M16 12H12V16H16V12Z" fill="currentColor" />
        </svg>
    `

    static branchNode = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 2H6C5.44772 2 5 2.44772 5 3V13C5 13.5523 5.44772 14 6 14H11V12H7V4H11V2Z" fill="white" />
            <rect x="1" y="7" width="4" height="2" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6L15 3L11 0V6Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 16L15 13L11 10V16Z" fill="white" />
        </svg>
    `

    static breakStruct = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14L10 12L11 11L13 13L14 12L14 15L11 15L12 14Z" fill="white" />
            <path d="M13 3L11 5L10 4L12 2L11 1L14 1L14 4L13 3Z" fill="white" />
            <path d="M7.975 6H3.025C1.90662 6 1 6.90662 1 8.025V8.475C1 9.59338 1.90662 10.5 3.025 10.5H7.975C9.09338 10.5 10 9.59338 10 8.475V8.025C10 6.90662 9.09338 6 7.975 6Z" fill="white" />
        </svg>
    `

    static cast = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12L16 7.5L12 3V12Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11L4 7.5L0 4V11Z" fill="white" />
            <rect opacity="0.5" x="5" y="6" width="1" height="3" fill="white" />
            <rect opacity="0.5" x="7" y="6" width="1" height="3" fill="white" />
            <rect opacity="0.5" x="9" y="6" width="1" height="3" fill="white" />
            <rect x="9" y="6" width="3" height="3" fill="white" />
        </svg>
    `

    static close = x`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="2" x2="30" y2="30" stroke="currentColor" stroke-width="4" />
            <line x1="30" y1="2" x2="2" y2="30" stroke="currentColor" stroke-width="4" />
        </svg>
    `

    static convert = x`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path fill="#3e7fbc" d="M 4 0 H 16 V 32 H 4 L 0 28 V 4 Z" />
            <path fill="#bdd6ef" d="M 2 8 H 14 V 30 H 4 L 2 28 Z" />
            <path fill="#bc3e4a" d="M 16 0 H 28 L 32 4 V 28 L 28 32 H 16 Z" />
            <path fill="#efbdc1" d="M 18 8 H 30 V 27 L 27 30 H 18 Z" />
        </svg>
    `

    static correct = x`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path fill="#2da800" d="M 2 16 L 14 30 L 30 2 L 13 22 Z" />
        </svg>
    `

    static delegate = x`
        <svg viewBox="-2 -2 32 32" xmlns="http://www.w3.org/2000/svg">
            <rect class="ueb-pin-tofill" fill="black" width="28" height="28" rx="4" stroke="currentColor" stroke-width="5" />
        </svg>
    `

    static doN = x`
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M1 12V8H9V4L16 10L9 16V12H1Z" />
            <path fill="white" d="M7 6L6 6L4 2.66667V6H3V1H4L6 4.33333V1H7V6Z" />
        </svg>
    `

    static doOnce = x`
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12V8H9V4L16 10L9 16V12H1Z" fill="white" />
            <path d="M6 6H5L4.98752 2.42387L4 2.8642V1.893L5.89305 1H6V6Z" fill="white" />
            <rect x="4" y="5" width="3" height="1" fill="white" />
        </svg>
    `

    static enum = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M9 5V0H2V16H14V5H9ZM3.2 4.4L4.5 4H4.6V7H4V4.7L3.2 4.9V4.4ZM4.7 14.8C4.6 14.9 4.3 15 4 15C3.7 15 3.5 14.9 3.3 14.8C3.1 14.6 3 14.4 3 14.2H3.6C3.6 14.3 3.6 14.4 3.7 14.5C3.8 14.6 3.9 14.6 4 14.6C4.1 14.6 4.2 14.6 4.3 14.5C4.4 14.4 4.4 14.3 4.4 14.2C4.4 13.9 4.2 13.8 3.9 13.8H3.7V13.3H4C4.1 13.3 4.3 13.3 4.3 13.2C4.4 13.1 4.4 13 4.4 12.9C4.4 12.8 4.4 12.7 4.3 12.6C4.2 12.5 4.1 12.5 4 12.5C3.9 12.5 3.8 12.5 3.7 12.6C3.6 12.7 3.6 12.7 3.6 12.8H3C3 12.6 3 12.5 3.1 12.4C3.2 12.3 3.3 12.2 3.4 12.1C3.7 12 3.8 12 4 12C4.3 12 4.6 12.1 4.7 12.2C4.9 12.4 5 12.6 5 12.8C5 12.9 5 13.1 4.9 13.2C4.8 13.3 4.7 13.4 4.6 13.5C4.8 13.6 4.9 13.6 5 13.8C5 13.8 5 14 5 14.1C5 14.4 4.9 14.6 4.7 14.8ZM5.1 11H3.1V10.6L4.1 9.6C4.2 9.5 4.3 9.3 4.4 9.2C4.4 9.1 4.4 9 4.4 8.9C4.4 8.8 4.4 8.7 4.3 8.6C4.2 8.5 4.1 8.5 4 8.5C3.9 8.5 3.8 8.5 3.7 8.6C3.6 8.7 3.6 8.8 3.6 9H3C3 8.8 3 8.7 3.1 8.5C3.2 8.4 3.3 8.2 3.5 8.1C3.7 8 3.8 8 4 8C4.3 8 4.5 8.1 4.7 8.2C4.9 8.4 5 8.6 5 8.8C5 9 5 9.1 4.9 9.3C4.8 9.4 4.7 9.6 4.5 9.8L3.8 10.5H5.1V11ZM12 15H6V14H12V15ZM12 11H6V10H12V11ZM12 7H6V6H12V7Z" />
            <path d="M9 0H8L14 6V5L9 0Z" fill="white" />
        </svg>
    `

    static event = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.929031" y="8" width="10" height="10" rx="0.5" transform="rotate(-45 0.929031 8)" stroke="white" />
            <path d="M5 4.00024L8 1.00024V6.00024H3L5 4.00024Z" fill="white" />
            <path d="M6 13.0002L3 10.0002L8 10.0002L8 15.0002L6 13.0002Z" fill="white" />
            <path d="M4.53551 6.82854L4.53551 11.0712L0.999977 7.53564L4.53551 4.00011L4.53551 6.82854Z" fill="white" />
        </svg>
    `

    static execPin = x`
        <svg width="15" height="15" viewBox="-2 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="ueb-pin-tofill" stroke-width="1.25" stroke="white" fill="none"
                d="M 2 1 a 2 2 0 0 0 -2 2 v 10 a 2 2 0 0 0 2 2 h 4 a 2 2 0 0 0 1.519 -0.698 l 4.843 -5.651 a 1 1 0 0 0 0 -1.302 L 7.52 1.7 a 2 2 0 0 0 -1.519 -0.698 z" />
        </svg>
    `

    static expandIcon = x`
        <svg fill="currentColor" viewBox="4 4 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M 16.003 18.626 l 7.081 -7.081 L 25 13.46 l -8.997 8.998 -9.003 -9 1.917 -1.916 z" />
        </svg>
    `

    static flipflop = x`
        <svg  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L10 14" stroke="white" stroke-width="2" stroke-linecap="round" />
            <path d="M6 2L2 14" stroke="white" stroke-width="2" stroke-linecap="round" />
            <path d="M6 2L10 14" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" />
        </svg>
    `

    static forEachLoop = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C1.8 2 0 3.8 0 6V9C0 11.2 2 13 4 13H10V11H5C3.2 11 2 9.7 2 8V7C2 5.63882 2.76933 4.53408 4 4.14779V2ZM12 4C13.8 4 14 5.3 14 7V8C14 8.8 13.7 9.5 13.3 10L15.2 11.4C15.7 10.7 16 9.9 16 9V6C16 3.8 14.2 2 12 2V4Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L13 12L8 8V16Z" fill="white" />
            <rect x="5" y="1" width="1" height="4" fill="white" />
            <rect x="7" y="1" width="1" height="4" fill="white" />
            <rect x="9" y="1" width="1" height="4" fill="white" />
            <rect x="11" y="2" width="1" height="2" fill="white" />
        </svg>
    `

    static functionSymbol = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.72002 6.0699C9.88111 4.96527 10.299 3.9138 10.94 2.99991C10.94 2.99991 10.94 3.05991 10.94 3.08991C10.94 3.36573 11.0496 3.63026 11.2446 3.8253C11.4397 4.02033 11.7042 4.12991 11.98 4.12991C12.2558 4.12991 12.5204 4.02033 12.7154 3.8253C12.9105 3.63026 13.02 3.36573 13.02 3.08991C13.0204 2.90249 12.9681 2.71873 12.8691 2.5596C12.7701 2.40047 12.6283 2.27237 12.46 2.18991H12.37C11.8725 2.00961 11.3275 2.00961 10.83 2.18991C9.21002 2.63991 8.58002 4.99991 8.58002 4.99991L8.40002 5.1199H5.40002L5.15002 6.1199H8.27002L7.27002 11.4199C7.11348 12.0161 6.79062 12.5555 6.33911 12.9751C5.8876 13.3948 5.32607 13.6773 4.72002 13.7899C4.78153 13.655 4.81227 13.5081 4.81002 13.3599C4.81002 13.0735 4.69624 12.7988 4.4937 12.5962C4.29116 12.3937 4.01646 12.2799 3.73002 12.2799C3.44359 12.2799 3.16889 12.3937 2.96635 12.5962C2.76381 12.7988 2.65002 13.0735 2.65002 13.3599C2.66114 13.605 2.75692 13.8386 2.92104 14.021C3.08517 14.2033 3.30746 14.3231 3.55002 14.3599C7.91002 15.1999 8.55002 11.4499 8.55002 11.4499L9.55002 7.05991H12.55L12.8 6.05991H9.64002L9.72002 6.0699Z"
                fill="currentColor"
            />
        </svg>
    `

    static gamepad = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="m 15.2107 8.525 c -0.6619 -1.7207 -1.9856 -4.8978 -3.3094 -4.8978 c -1.9856 0 -1.9856 1.8532 -2.7799 1.8532 c -0.3971 0 -1.8532 0 -2.3827 0 c -0.7943 0 -0.7943 -1.8532 -2.6475 -1.8532 c -1.3238 0 -2.6475 3.0446 -3.3094 4.8978 c -1.059 3.3094 -1.1914 4.8979 1.1914 4.8979 c 2.6475 0 2.6475 -3.0445 5.9569 -3.0445 c 3.3094 0 3.4418 3.0445 5.9569 3.0445 c 2.5151 0 2.5151 -1.5885 1.3238 -4.8979 z m -8.472 0 h -1.3238 v 1.3238 h -1.3238 v -1.3238 h -1.3238 v -1.3238 h 1.3238 v -1.3238 h 1.3238 v 1.3238 h 1.3238 v 1.3238 z m 4.6331 1.5887 c -1.1914 0 -2.2504 -0.9268 -2.2504 -2.2505 c 0 -1.1913 0.9267 -2.2503 2.2504 -2.2503 c 1.3238 0 2.2504 0.9266 2.2504 2.2503 c 0 1.1915 -1.059 2.2505 -2.2504 2.2505 z m -0.0001 -2.9124 c -0.3971 0 -0.6619 0.2648 -0.6619 0.6619 c 0 0.3971 0.2648 0.6619 0.6619 0.6619 c 0.3971 0 0.6619 -0.2648 0.6619 -0.6619 c 0 -0.3971 -0.2648 -0.6619 -0.6619 -0.6619 z" />
        </svg>
    `

    static genericPin = x`
        <svg width="16" height="12" viewBox="0 0 42 32" xmlns="http://www.w3.org/2000/svg">
            <circle class="ueb-pin-tofill" cx="16" cy="16" r="13" fill="black" stroke="currentColor" stroke-width="5" />
            <path fill="currentColor" d="M 34 6 L 34 26 L 42 16 Z" />
        </svg>
    `

    static keyboard = x`
        <svg viewBox="0 -3 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M 1 10 H 15 c 0.2652 0 0.5195 -0.1054 0.707 -0.293 c 0.1875 -0.1875 0.293 -0.4418 0.293 -0.707 v -8 c 0 -0.2652 -0.1054 -0.5195 -0.293 -0.707 c -0.1875 -0.1875 -0.4418 -0.293 -0.707 -0.293 H 1 c -0.2652 0 -0.5195 0.1054 -0.707 0.293 c -0.1875 0.1875 -0.293 0.4418 -0.293 0.707 V 9 c 0 0.2652 0.1054 0.5195 0.293 0.707 c 0.1875 0.1875 0.4418 0.293 0.707 0.293 Z M 14 6 h -3 v -2 h 3 v 2 Z M 13 1 h 2 v 2 h -2 v -2 Z M 10 1 h 2 v 2 h -2 v -2 Z M 10 6 h -2 v -2 h 2 v 2 Z M 7 1 h 2 v 2 h -2 v -2 Z M 7 6 h -2 v -2 h 2 v 2 Z M 4 1 h 2 v 2 h -2 v -2 Z M 4 6 h -2 v -2 h 2 v 2 Z M 1 1 h 2 v 2 h -2 v -2 Z M 1 7 h 2 v 2 h -2 v -2 M 4 7 h 8 v 2 h -8 v -2 M 13 7 h 2 v 2 h -2 v -2 Z" />
        </svg>
    `

    static loop = x`
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <style>
                    .cls-1 {
                        fill: #fff;
                        fill-rule: evenodd;
                    }
                    .cls-2 {
                        fill: none;
                    }
                </style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_4" data-name="Layer 4">
                    <path class="cls-1" d="M16,2H4A4,4,0,0,0,0,6v4a4.14,4.14,0,0,0,4,4H9v5l8-6L9,7v5H4.5A2.36,2.36,0,0,1,2,9.5v-3A2.36,2.36,0,0,1,4.5,4h11A2.36,2.36,0,0,1,18,6.5V9a3,3,0,0,1-.69,2l1.88,1.41A4,4,0,0,0,20,10V6A4,4,0,0,0,16,2Z" />
                    <rect class="cls-2" width="20" height="20" />
                </g>
            </g>
        </svg>
    `

    static macro = x`
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.92L10 12.29L14.55 2.61C14.662 2.4259 14.8189 2.27332 15.0061 2.16661C15.1933 2.05989 15.4045 2.00256 15.62 2H19L18.66 2.89C18.66 2.89 17.17 3.04 17.11 3.63C17.05 4.22 16 15.34 15.93 16.13C15.86 16.92 17.33 17.13 17.33 17.13L17.17 17.99H13.84C13.7241 17.9764 13.612 17.9399 13.5103 17.8826C13.4086 17.8253 13.3194 17.7484 13.2477 17.6562C13.176 17.5641 13.1234 17.4586 13.0929 17.346C13.0624 17.2333 13.0546 17.1157 13.07 17L14.43 5.52L10 14.57C9.8 15.03 9.07 15.72 8.63 15.71H7.75L6.05 4.86L3.54 17.39C3.51941 17.5514 3.44327 17.7005 3.32465 17.8118C3.20603 17.9232 3.05235 17.9897 2.89 18H1L1.11 17.09C1.11 17.09 2.21 17.09 2.3 16.69C2.39 16.29 5.3 3.76 5.41 3.32C5.52 2.88 4.19 2.81 4.19 2.81L4.46 2H6.62C7.09 2 7.92 2.38 8 2.92Z" fill="white" />
        </svg>
    `

    static mapPin = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 0H0V4H4V0Z" fill="currentColor" />
            <path d="M4 6H0V10H4V6Z" fill="currentColor" />
            <path d="M4 12H0V16H4V12Z" fill="currentColor" />
            <path d="M16 0H6V4H16V0Z" fill="white" />
            <path d="M16 6H6V10H16V6Z" fill="white" />
            <path d="M16 12H6V16H16V12Z" fill="white" />
        </svg>
    `

    static makeArray = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H13V6H15V4Z" fill="white" />
            <path d="M15 7H13V9H15V7Z" fill="white" />
            <path d="M15 10H13V12H15V10Z" fill="white" />
            <path d="M12 4H10V6H12V4Z" fill="white" />
            <path d="M12 7H10V9H12V7Z" fill="white" />
            <path d="M12 10H10V12H12V10Z" fill="white" />
            <path d="M9 4H7V6H9V4Z" fill="white" />
            <path d="M9 7H7V9H9V7Z" fill="white" />
            <path d="M9 10H7V12H9V10Z" fill="white" />
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white" />
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white" />
        </svg>
    `

    static makeMap = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H10V6H15V4Z" fill="white" />
            <path d="M15 7H10V9H15V7Z" fill="white" />
            <path d="M15 10H10V12H15V10Z" fill="white" />
            <path d="M9 4H7V6H9V4Z" fill="white" />
            <path d="M9 7H7V9H9V7Z" fill="white" />
            <path d="M9 10H7V12H9V10Z" fill="white" />
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white" />
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white" />
        </svg>
    `

    static makeSet = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white" />
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white" />
            <path d="M6 8.00205V7.43062C6.40147 7.37088 6.79699 7.28299 7.18286 7.16777C7.30414 7.11578 7.40659 7.03462 7.47858 6.93348C7.57165 6.81021 7.63108 6.66933 7.65215 6.52205C7.6832 6.31181 7.69609 6.09976 7.69072 5.88777C7.67539 5.53753 7.70341 5.18685 7.77429 4.84205C7.81918 4.66059 7.92446 4.49533 8.07643 4.36777C8.26269 4.22923 8.48285 4.13138 8.71929 4.08205C9.01252 4.02392 9.31249 3.99706 9.61287 4.00205H9.85715V4.57348C9.66398 4.58307 9.47806 4.64211 9.32179 4.7435C9.16552 4.84489 9.04559 4.9843 8.97644 5.14491C8.92057 5.24999 8.89621 5.36613 8.90572 5.48205C8.90572 5.64205 8.90572 5.95062 8.86715 6.40205C8.85805 6.6136 8.81697 6.8231 8.74501 7.02491C8.69216 7.17345 8.60697 7.3113 8.49429 7.43062C8.33135 7.64 8.1415 7.83177 7.92858 8.00205" fill="white" />
            <path d="M7.92858 8.00195C8.14537 8.18165 8.33547 8.3852 8.49429 8.60767C8.60419 8.72229 8.6892 8.85404 8.74501 8.99624C8.81697 9.19805 8.85805 9.40755 8.86715 9.6191C8.89286 10.0724 8.90572 10.381 8.90572 10.5448C8.89679 10.6607 8.92112 10.7767 8.97644 10.882C9.05077 11.0375 9.17272 11.1714 9.32842 11.2683C9.48411 11.3653 9.66731 11.4215 9.85715 11.4305V12.002H9.61287C9.31086 12.0112 9.0087 11.9881 8.71286 11.9334C8.47744 11.8816 8.25788 11.784 8.07001 11.6477C7.91926 11.5193 7.81421 11.3543 7.76786 11.1734C7.69764 10.8285 7.66962 10.4779 7.68429 10.1277C7.69081 9.91186 7.67791 9.69593 7.64572 9.48195C7.62465 9.33468 7.56522 9.1938 7.47215 9.07052C7.40016 8.96939 7.29771 8.88822 7.17643 8.83624C6.79266 8.72131 6.3993 8.63342 6 8.57338V8.00195" fill="white" />
            <path d="M13.0712 8.00197C12.8582 7.83169 12.6684 7.63992 12.5054 7.43054C12.3942 7.31461 12.3091 7.18076 12.2547 7.03626C12.1828 6.83445 12.1417 6.62495 12.1326 6.4134C12.1326 5.96197 12.094 5.6534 12.094 5.4934C12.1058 5.37369 12.0814 5.25334 12.0233 5.14483C11.9541 4.98422 11.8342 4.84481 11.6779 4.74342C11.5217 4.64203 11.3357 4.58299 11.1426 4.5734V4.00197H11.3869C11.6889 3.99277 11.991 4.01579 12.2869 4.07054C12.5233 4.11987 12.7435 4.21772 12.9297 4.35626C13.0817 4.48382 13.187 4.64908 13.2319 4.83054C13.3027 5.17534 13.3308 5.52602 13.3154 5.87626C13.3094 6.09206 13.3223 6.30795 13.354 6.52197C13.3751 6.66925 13.4345 6.81013 13.5276 6.9334C13.5996 7.03454 13.702 7.1157 13.8233 7.16769C14.2071 7.28262 14.6004 7.37051 14.9997 7.43054V8.00197" fill="white" />
            <path d="M14.9997 8.00195V8.57338C14.5983 8.63312 14.2027 8.72102 13.8169 8.83624C13.6956 8.88822 13.5931 8.96939 13.5212 9.07052C13.4281 9.1938 13.3686 9.33468 13.3476 9.48195C13.3154 9.69593 13.3025 9.91186 13.309 10.1277C13.3237 10.4779 13.2957 10.8285 13.2254 11.1734C13.1791 11.3543 13.074 11.5193 12.9233 11.6477C12.7354 11.784 12.5159 11.8816 12.2804 11.9334C11.9846 11.9881 11.6824 12.0112 11.3804 12.002H11.1426V11.4305C11.3353 11.4196 11.5205 11.36 11.6765 11.2588C11.8325 11.1576 11.9528 11.0189 12.0233 10.8591C12.0786 10.7539 12.1029 10.6378 12.094 10.522C12.094 10.3543 12.1069 10.0458 12.1326 9.59624C12.1417 9.38469 12.1828 9.17519 12.2547 8.97338C12.3105 8.83119 12.3955 8.69943 12.5054 8.58481C12.666 8.37037 12.856 8.17457 13.0712 8.00195" fill="white" />
        </svg>
    `

    static makeStruct = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white" />
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white" />
            <path d="M12.975 6H8.025C6.90662 6 6 6.90662 6 8.025V8.475C6 9.59338 6.90662 10.5 8.025 10.5H12.975C14.0934 10.5 15 9.59338 15 8.475V8.025C15 6.90662 14.0934 6 12.975 6Z" fill="white" />
        </svg>
    `

    static mouse = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M8.85714 8.34043H14L13.9143 6.6383H8.85714V0H7.14286V6.6383H2.08571L2 8.34043H7.14286H8.85714Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.85714 0C11 0.595745 13.4 3.31915 13.9143 6.6383H8.85714V0ZM7.14286 0C5 0.595745 2.6 3.31915 2.08571 6.6383H7.14286V0ZM8.85714 8.34043H7.14286H2C2 12.5957 3.02857 16 8 16C12.9714 16 14 12.5957 14 8.34043H8.85714Z" fill="white" />
        </svg>
    `

    static node = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="15" rx="1" fill="white" fill-opacity="0.5" />
            <rect x="0.5" y="0.5" width="15" height="14" rx="0.5" stroke="white" />
            <rect x="1" width="14" height="5" fill="white" />
        </svg>
    `

    static operationPin = x`
        <svg width="14" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle class="ueb-pin-tostroke" cx="16" cy="16" r="14" stroke="currentColor" stroke-width="4" />
            <circle cx="16" cy="16" r="9.5" fill="#817a7a" />
        </svg>
    `

    static pcgStackPin = x`
        <svg width="18" height="22" viewBox="4 0 28 36" xmlns="http://www.w3.org/2000/svg">
            <path stroke="black" stroke-width="1" fill="rgba(var(--ueb-pin-color-rgb), 0.5)"  d="M25.8,32.2V17.5c0-1.7,1.3-3.1,3-3.1s3,1.3,3,3.1v14.7c0,1.8-1.3,3.2-3,3.2C27,35.5,25.8,34,25.8,32.2z" />
            <path stroke="black" stroke-width="1" fill="rgba(var(--ueb-pin-color-rgb), 0.75)" d="M18.8,30.1V11.8c0-2.4,1.8-4.3,4-4.3s4,1.9,4,4.3v18.4c0,2.4-1.8,4.3-4,4.3C20.5,34.5,18.8,32.5,18.8,30.1z" />
            <path stroke="black" stroke-width="1" fill="currentColor" d="M21.3,6.4v21.3c0,3.2-2.4,5.8-5.5,5.8s-5.5-2.5-5.5-5.8V6.3c0-3.2,2.4-5.8,5.5-5.8C18.8,0.5,21.2,3,21.3,6.4z" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="10.2" cy="9" r="6" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="10.2" cy="17" r="6" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="10.2" cy="25" r="6" />
        </svg>
    `

    static pcgPin = x`
        <svg class="ueb-pin-reflect-output" width="12" height="20" viewBox="8 0 20 36" xmlns="http://www.w3.org/2000/svg">
            <path stroke="black" stroke-width="1" fill="currentColor" d="M21.2,34.5c-3.1,0-5.5-2.6-5.5-5.8V7.3c0-3.3,2.4-5.8,5.5-5.8s5.5,2.6,5.5,5.8v21.3C26.8,31.9,24.3,34.5,21.2,34.5z" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="15.8" cy="10" r="6" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="15.8" cy="18" r="6" />
            <circle class="ueb-pin-tofill ueb-pin-tostroke" stroke="currentColor" stroke-width="1" cx="15.8" cy="26" r="6" />
        </svg>
    `

    static pcgParamPin = x`
        <svg class="ueb-pin-reflect-output" width="18" height="12" viewBox="8 8 19 21" xmlns="http://www.w3.org/2000/svg">
            <path class="ueb-pin-tofill" stroke="currentcolor" stroke-width="1" d="M8,18c-2.5,0-4.5-2-4.5-4.5S5.5,9,8,9h20c2.5,0,4.5,2,4.5,4.5S30.5,18,28,18H8z" />
            <path fill="currentColor" d="M31,27.5H13c-0.5,0-1-0.4-1-1v-4c0-0.5,0.4-1,1-1h18c0.5,0,1,0.4,1,1v4C32,27.1,31.6,27.5,31,27.5z" />
        </svg>
    `

    static pcgSpatialPin = x`
        <svg width="14" height="16" viewBox="5 4 28 28" xmlns="http://www.w3.org/2000/svg">
            <path stroke="#ffffff" stroke-width="1" fill="#808080" d="M20.5,33h-10c-2.8,0-5-2.2-5-5V8c0-2.8,2.2-5,5-5h10c2.8,0,5,2.2,5,5v20C25.5,30.8,23.3,33,20.5,33z" />
            <circle class="ueb-pin-tofill" stroke="#ffffff" stroke-width="1" fill="#202020" cx="23.7" cy="18" r="10" />
        </svg>
    `

    static plusCircle = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M8.00016 10.6667V5.33334M5.3335 8H10.6668M8.00016 1.33334C4.31826 1.33334 1.3335 4.3181 1.3335 8C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8C14.6668 4.3181 11.6821 1.33334 8.00016 1.33334Z" />
        </svg>
    `

    static questionMark = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 15C9.10456 15 10 14.1046 10 13C10 11.8954 9.10456 11 8 11C6.89544 11 6 11.8954 6 13C6 14.1046 6.89544 15 8 15Z" fill="white" />
            <path d="M5 4.86697C5.15 3.33619 6.5 2.26465 8 2.26465C9.65 2.26465 11 3.64235 11 5.3262C11 7.01005 8 7.92852 8 9.00006" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `

    static referencePin = x`
        <svg width="12" height="12" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <polygon class="ueb-pin-tofill" points="4 16 16 4 28 16 16 28" stroke="currentColor" stroke-width="5" />
        </svg>
    `

    static reject = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="red" stroke-width="2" stroke-miterlimit="10" d="M12.5 3.5L3.5 12.5" />
            <path fill="red" d="M8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2ZM8 0.5C3.9 0.5 0.5 3.9 0.5 8C0.5 12.1 3.9 15.5 8 15.5C12.1 15.5 15.5 12.1 15.5 8C15.5 3.9 12.1 0.5 8 0.5Z" />
        </svg>
    `

    static setPin = x`
        <svg width="16" height="16" viewBox="2 2 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7.99956V6.99956C1.62451 6.89501 2.23976 6.7412 2.84 6.53956C3.02865 6.44859 3.18802 6.30655 3.3 6.12956C3.44478 5.91383 3.53723 5.6673 3.57 5.40956C3.6183 5.04164 3.63836 4.67055 3.63 4.29956C3.60615 3.68664 3.64974 3.07296 3.76 2.46956C3.82982 2.152 3.99359 1.86279 4.23 1.63956C4.51974 1.39713 4.86221 1.22589 5.23 1.13956C5.68612 1.03782 6.15275 0.990826 6.62 0.999563H7V1.99956C6.69952 2.01634 6.4103 2.11967 6.16722 2.2971C5.92414 2.47453 5.73757 2.71849 5.63 2.99956C5.5431 3.18346 5.5052 3.3867 5.52 3.58956C5.52 3.86956 5.52 4.40956 5.46 5.19956C5.44584 5.56977 5.38194 5.9364 5.27 6.28956C5.18779 6.5495 5.05527 6.79074 4.88 6.99956C4.62654 7.36597 4.33121 7.70157 4 7.99956" fill="currentColor" />
            <path d="M4 7.99951C4.33723 8.31397 4.63295 8.67019 4.88 9.05951C5.05095 9.2601 5.18319 9.49067 5.27 9.73951C5.38194 10.0927 5.44584 10.4593 5.46 10.8295C5.5 11.6228 5.52 12.1628 5.52 12.4495C5.5061 12.6523 5.54395 12.8553 5.63 13.0395C5.74563 13.3117 5.93533 13.546 6.17752 13.7157C6.41972 13.8854 6.70468 13.9837 7 13.9995V14.9995H6.62C6.15021 15.0156 5.68019 14.9753 5.22 14.8795C4.85378 14.7889 4.51224 14.6181 4.22 14.3795C3.98551 14.1548 3.8221 13.8662 3.75 13.5495C3.64077 12.946 3.59718 12.3324 3.62 11.7195C3.63014 11.3418 3.61007 10.964 3.56 10.5895C3.52723 10.3318 3.43478 10.0852 3.29 9.86951C3.17802 9.69252 3.01865 9.55048 2.83 9.45951C2.23302 9.25838 1.62113 9.10457 1 8.99951V7.99951" fill="currentColor" />
            <path d="M12 7.99955C11.6688 7.70156 11.3735 7.36596 11.12 6.99955C10.947 6.79667 10.8146 6.56242 10.73 6.30955C10.6181 5.95638 10.5542 5.58976 10.54 5.21954C10.54 4.42954 10.48 3.88955 10.48 3.60955C10.4983 3.40004 10.4604 3.18944 10.37 2.99955C10.2624 2.71847 10.0759 2.47452 9.83278 2.29708C9.5897 2.11965 9.30048 2.01632 9 1.99955V0.999545H9.38C9.84979 0.983442 10.3198 1.02373 10.78 1.11955C11.1478 1.20587 11.4903 1.37711 11.78 1.61955C12.0164 1.84278 12.1802 2.13198 12.25 2.44955C12.3603 3.05294 12.4039 3.66662 12.38 4.27955C12.3706 4.6572 12.3907 5.03501 12.44 5.40954C12.4728 5.66728 12.5652 5.91382 12.71 6.12955C12.822 6.30653 12.9813 6.44858 13.17 6.53955C13.767 6.74067 14.3789 6.89448 15 6.99955V7.99955" fill="currentColor" />
            <path d="M15 7.99951V8.99951C14.3755 9.10406 13.7602 9.25787 13.16 9.45951C12.9713 9.55048 12.812 9.69252 12.7 9.86951C12.5552 10.0852 12.4628 10.3318 12.43 10.5895C12.3799 10.964 12.3599 11.3418 12.37 11.7195C12.3928 12.3324 12.3492 12.946 12.24 13.5495C12.1679 13.8662 12.0045 14.1548 11.77 14.3795C11.4778 14.6181 11.1362 14.7889 10.77 14.8795C10.3098 14.9753 9.83979 15.0156 9.37 14.9995H9V13.9995C9.2998 13.9803 9.58791 13.876 9.83056 13.6989C10.0732 13.5218 10.2603 13.2792 10.37 12.9995C10.456 12.8153 10.4939 12.6123 10.48 12.4095C10.48 12.1162 10.5 11.5762 10.54 10.7895C10.5542 10.4193 10.6181 10.0527 10.73 9.69951C10.8168 9.45067 10.9491 9.2201 11.12 9.01951C11.3698 8.64424 11.6654 8.30159 12 7.99951" fill="currentColor" />
        </svg>
    `

    static select = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="2" width="6" height="2" fill="white" />
            <rect x="10" y="7" width="3" height="2" fill="white" />
            <path d="M12 5L15 8L12 11V5Z" fill="white" />
            <rect x="1" y="7" width="8" height="2" fill="white" />
            <rect x="5" y="4" width="2" height="9" fill="white" />
            <rect x="1" y="12" width="6" height="2" fill="white" />
        </svg>
    `

    static sequence = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="5" height="2" fill="white" />
            <rect y="7" width="8" height="2" fill="white" />
            <rect x="3" y="4" width="2" height="9" fill="white" />
            <rect x="3" y="12" width="5" height="2" fill="white" />
            <rect x="10" y="2" width="6" height="2" fill="white" />
            <rect x="10" y="7" width="4" height="2" fill="white" />
            <rect x="10" y="12" width="2" height="2" fill="white" />
        </svg>
    `

    static sound = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 5H3L7 1V15L3 11H0V5Z" fill="white" />
            <path opacity="0.5" d="M9 1C13 2.7 15 5.4 15 8C15 10.6 13 13.3 9 15C11.5 12.8 12.7 10.4 12.7 8C12.7 5.6 11.5 3.2 9 1Z" fill="white" />
            <path opacity="0.5" d="M9 5C10.3 5.7 11 6.9 11 8C11 9.1 10.3 10.3 9 11C9.8 10 9.8 6 9 5Z" fill="white" />
        </svg>
    `

    static spawnActor = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.38 12.62L7 11.5L10.38 10.38L11.5 7L12.63 10.38L16 11.5L12.63 12.62L11.5 16L10.38 12.62Z" fill="white" />
            <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M4 14H2L3 10L0 14V16H10L9 14H4Z" fill="white" />
            <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M2 6C1.9996 7.10384 2.30372 8.1864 2.87889 9.12854C3.45406 10.0707 4.27798 10.8359 5.26 11.34L9 9L11.5 5L13.78 7.6C13.9251 7.07902 13.9991 6.54081 14 6C14 4.4087 13.3679 2.88258 12.2426 1.75736C11.1174 0.63214 9.5913 0 8 0C6.4087 0 4.88258 0.63214 3.75736 1.75736C2.63214 2.88258 2 4.4087 2 6V6Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.22005 0.810059H8.00005C6.62265 0.810056 5.30153 1.35654 4.32663 2.32957C3.35172 3.30259 2.8027 4.62266 2.80005 6.00006C2.79984 7.03987 3.11257 8.05567 3.69756 8.91532C4.28255 9.77497 5.11271 10.4387 6.08005 10.8201L7.17005 10.1401C6.16687 9.86642 5.28119 9.27116 4.64894 8.44562C4.01669 7.62008 3.6728 6.60989 3.67005 5.57006C3.66886 4.34318 4.14143 3.16323 4.98917 2.27635C5.83692 1.38948 6.99437 0.864185 8.22005 0.810059V0.810059Z" fill="white" />
            <path d="M10.0401 5.16001C10.7028 5.16001 11.2401 4.62275 11.2401 3.96001C11.2401 3.29727 10.7028 2.76001 10.0401 2.76001C9.37735 2.76001 8.84009 3.29727 8.84009 3.96001C8.84009 4.62275 9.37735 5.16001 10.0401 5.16001Z" fill="white" />
        </svg>
    `

    static switch = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="6" height="2" fill="white" />
            <rect y="7" width="9" height="2" fill="white" />
            <rect x="3" y="4" width="2" height="9" fill="white" />
            <rect x="3" y="12" width="6" height="2" fill="white" />
            <rect x="10" y="2" width="3" height="2" fill="white" />
            <path d="M12 0L15 3L12 6V0Z" fill="white" />
        </svg>
    `

    static timer = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.5C3.9 0.5 0.5 3.9 0.5 8C0.5 12.1 3.9 15.5 8 15.5C12.1 15.5 15.5 12.1 15.5 8C15.5 3.9 12.1 0.5 8 0.5ZM8 14.1C4.6 14.1 1.9 11.4 1.9 8C1.9 4.6 4.6 1.90002 8 1.90002C11.4 1.90002 14.1 4.6 14.1 8C14.1 11.4 11.4 14.1 8 14.1Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.60003 3.19995H7.40002V8.49994L10.5 11.4999L11.4 10.5999L8.60003 7.99994V3.19995Z" fill="white" />
        </svg>
    `

    static touchpad = x`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  fill="white" fill-rule="evenodd" clip-rule="evenodd" d="M13 0H3C2.4 0 2 0.4 2 1V15C2 15.6 2.4 16 3 16H13C13.6 16 14 15.6 14 15V1C14 0.4 13.6 0 13 0ZM8 15.5C7.2 15.5 6.5 14.8 6.5 14C6.5 13.2 7.2 12.5 8 12.5C8.8 12.5 9.5 13.2 9.5 14C9.5 14.8 8.8 15.5 8 15.5ZM13 12H3V1H13V12Z" />
            <path opacity="0.5" d="M13 1H3V12H13V1Z" fill="white" />
        </svg>
    `
}

class Serializable {

    static grammar = this.createGrammar()

    /** @protected */
    static createGrammar() {
        return /** @type {Parsernostrum<any>} */(Parsernostrum.failure())
    }
}

class SerializerFactory {

    static #serializers = new Map()

    /**
     * @template {AttributeConstructor<Attribute>} T
     * @param {T} type
     * @param {Serializer<T>} object
     */
    static registerSerializer(type, object) {
        SerializerFactory.#serializers.set(type, object);
    }

    /**
     * @template {AttributeConstructor<Attribute>} T
     * @param {T} type
     * @returns {Serializer<T>}
     */
    static getSerializer(type) {
        return SerializerFactory.#serializers.get(type)
    }
}

/** @abstract */
class IEntity extends Serializable {

    /** @type {{ [attribute: String]: AttributeInfo }} */
    static attributes = {
        attributes: new AttributeInfo({
            ignored: true,
        }),
        lookbehind: new AttributeInfo({
            default: /** @type {String | Union<String[]>} */(""),
            ignored: true,
            uninitialized: true,
        }),
    }

    constructor(values = {}, suppressWarns = false) {
        super();
        const Self = /** @type {typeof IEntity} */(this.constructor);
        /** @type {AttributeDeclarations?} */ this.attributes;
        /** @type {String} */ this.lookbehind;
        const valuesKeys = Object.keys(values);
        const attributesKeys = values.attributes
            ? Utility.mergeArrays(Object.keys(values.attributes), Object.keys(Self.attributes))
            : Object.keys(Self.attributes);
        const allAttributesKeys = Utility.mergeArrays(valuesKeys, attributesKeys);
        for (const key of allAttributesKeys) {
            let value = values[key];
            if (!suppressWarns && !(key in values)) {
                if (!(key in Self.attributes) && !key.startsWith(Configuration.subObjectAttributeNamePrefix)) {
                    const typeName = value instanceof Array ? `[${value[0]?.constructor.name}]` : value.constructor.name;
                    console.warn(
                        `UEBlueprint: Attribute ${key} (of type ${typeName}) in the serialized data is not defined in ${Self.name}.attributes`
                    );
                }
            }
            if (!(key in Self.attributes)) {
                // Remember attributeName can come from the values and be not defined in the attributes.
                // In that case just assign it and skip the rest.
                this[key] = value;
                continue
            }
            Self.attributes.lookbehind;
            const predicate = AttributeInfo.getAttribute(values, key, "predicate", Self);
            const assignAttribute = !predicate
                ? v => this[key] = v
                : v => {
                    Object.defineProperties(this, {
                        ["#" + key]: {
                            writable: true,
                            enumerable: false,
                        },
                        [key]: {
                            enumerable: true,
                            get() {
                                return this["#" + key]
                            },
                            set(v) {
                                if (!predicate(v)) {
                                    console.warn(
                                        `UEBlueprint: Tried to assign attribute ${key} to ${Self.name} not satisfying the predicate`
                                    );
                                    return
                                }
                                this["#" + key] = v;
                            }
                        },
                    });
                    this[key] = v;
                };

            let defaultValue = AttributeInfo.getAttribute(values, key, "default", Self);
            if (defaultValue instanceof Function) {
                defaultValue = defaultValue(this);
            }
            let defaultType = AttributeInfo.getAttribute(values, key, "type", Self);
            if (defaultType instanceof ComputedType) {
                defaultType = defaultType.compute(this);
            }
            if (defaultType instanceof Array) {
                defaultType = Array;
            }
            if (defaultType === undefined) {
                defaultType = Utility.getType(defaultValue);
            }

            if (value !== undefined) {
                // Remember value can still be null
                if (
                    value?.constructor === String
                    && AttributeInfo.getAttribute(values, key, "serialized", Self)
                    && defaultType !== String
                ) {
                    try {
                        value = SerializerFactory
                            .getSerializer(defaultType)
                            .read(/** @type {String} */(value));
                    } catch (e) {
                        assignAttribute(value);
                        continue
                    }
                }
                assignAttribute(Utility.sanitize(value, /** @type {AttributeConstructor<Attribute>} */(defaultType)));
                continue // We have a value, need nothing more
            }
            if (defaultValue !== undefined && !AttributeInfo.getAttribute(values, key, "uninitialized", Self)) {
                assignAttribute(defaultValue);
            }
        }
    }

    /** @param {AttributeTypeDescription} attributeType */
    static defaultValueProviderFromType(attributeType) {
        if (attributeType === Boolean) {
            return false
        } else if (attributeType === Number) {
            return 0
        } else if (attributeType === BigInt) {
            return 0n
        } else if (attributeType === String) {
            return ""
        } else if (attributeType === Array || attributeType instanceof Array) {
            return () => []
        } else if (attributeType instanceof Union) {
            return this.defaultValueProviderFromType(attributeType.values[0])
        } else if (attributeType instanceof MirroredEntity) {
            return () => new MirroredEntity(attributeType.type, attributeType.getter)
        } else if (attributeType instanceof ComputedType) {
            return undefined
        } else {
            return () => new /** @type {AnyConstructor<Attribute>} */(attributeType)()
        }
    }

    /**
     * @template {new (...args: any) => any} C
     * @param {C} type
     * @returns {value is InstanceType<C>}
     */
    static isValueOfType(value, type) {
        return value != null && (value instanceof type || value.constructor === type)
    }

    static defineAttributes(object, attributes) {
        Object.defineProperty(object, "attributes", {
            writable: true,
            configurable: false,
        });
        object.attributes = attributes;
    }

    /**
     * 
     * @param {String} attribute
     * @param {(v: any) => void} callback
     */
    listenAttribute(attribute, callback) {
        const descriptor = Object.getOwnPropertyDescriptor(this, attribute);
        const setter = descriptor.set;
        if (setter) {
            descriptor.set = v => {
                setter(v);
                callback(v);
            };
            Object.defineProperties(this, { [attribute]: descriptor });
        } else if (descriptor.value) {
            Object.defineProperties(this, {
                ["#" + attribute]: {
                    value: descriptor.value,
                    writable: true,
                    enumerable: false,
                },
                [attribute]: {
                    enumerable: true,
                    get() {
                        return this["#" + attribute]
                    },
                    set(v) {
                        this["#" + attribute] = v;
                        callback(v);
                    }
                },
            });
        }
    }

    getLookbehind() {
        let lookbehind = this.lookbehind ?? AttributeInfo.getAttribute(this, "lookbehind", "default");
        lookbehind = lookbehind instanceof Union ? lookbehind.values[0] : lookbehind;
        return lookbehind
    }

    unexpectedKeys() {
        return Object.keys(this).length - Object.keys(/** @type {typeof IEntity} */(this.constructor).attributes).length
    }

    /** @param {IEntity} other */
    equals(other) {
        const thisKeys = Object.keys(this);
        const otherKeys = Object.keys(other);
        if (thisKeys.length != otherKeys.length) {
            return false
        }
        for (const key of thisKeys) {
            if (this[key] instanceof IEntity && !this[key].equals(other[key])) {
                return false
            } else if (!Utility.equals(this[key], other[key])) {
                return false
            }
        }
        return true
    }
}

class Grammar {

    static separatedBy = (source, separator, min = 1) =>
        new RegExp(
            source + "(?:" + separator + source + ")"
            + (min === 1 ? "*" : min === 2 ? "+" : `{${min},}`)
        )

    static Regex = class {
        static HexDigit = /[0-9a-fA-F]/
        static InsideString = /(?:[^"\\]|\\.)*/
        static InsideSingleQuotedString = /(?:[^'\\]|\\.)*/
        static Integer = /[\-\+]?\d+(?!\d|\.)/
        static Number = /[-\+]?(?:\d*\.)?\d+(?!\d|\.)/
        static RealUnit = /\+?(?:0(?:\.\d+)?|1(?:\.0+)?)(?![\.\d])/ // A number between 0 and 1 included
        static Word = Grammar.separatedBy("[a-zA-Z]", "_")
        static Symbol = /[a-zA-Z_]\w*/
        static DotSeparatedSymbols = Grammar.separatedBy(this.Symbol.source, "\\.")
        static PathFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:]")
        static PathSpaceFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:\\ ]")
        static Path = new RegExp(`(?:\\/${this.PathFragment.source}){2,}`) // Multiple (2+) /PathFragment
    }

    /*   ---   Primitive   ---   */

    static null = Parsernostrum.reg(/\(\s*\)/).map(() => null)
    static true = Parsernostrum.reg(/true/i).map(() => true)
    static false = Parsernostrum.reg(/false/i).map(() => false)
    static boolean = Parsernostrum.regArray(/(true)|false/i).map(v => v[1] ? true : false)
    static number = Parsernostrum.regArray(
        new RegExp(`(${Parsernostrum.number.getParser().parser.regexp.source})|(\\+?inf)|(-inf)`)
    ).map(([_0, n, plusInf, minusInf]) => n ? Number(n) : plusInf ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY)
    static bigInt = Parsernostrum.reg(new RegExp(Parsernostrum.number.getParser().parser.regexp.source)).map(BigInt)
        .map(result =>
            result[2] !== undefined
                ? Number.POSITIVE_INFINITY
                : result[3] !== undefined
                    ? Number.NEGATIVE_INFINITY
                    : Number(result[1])
        )
    static naturalNumber = Parsernostrum.lazy(() => Parsernostrum.reg(/\d+/).map(Number))
    static string = Parsernostrum.doubleQuotedString.map(insideString => Utility.unescapeString(insideString))

    /*   ---   Fragment   ---   */

    static colorValue = Parsernostrum.numberByte
    static word = Parsernostrum.reg(Grammar.Regex.Word)
    static symbol = Parsernostrum.reg(Grammar.Regex.Symbol)
    static symbolQuoted = Parsernostrum.reg(new RegExp('"(' + Grammar.Regex.Symbol.source + ')"'), 1)
    static attributeName = Parsernostrum.reg(Grammar.Regex.DotSeparatedSymbols)
    static attributeNameQuoted = Parsernostrum.reg(new RegExp('"(' + Grammar.Regex.DotSeparatedSymbols.source + ')"'), 1)
    static guid = Parsernostrum.reg(new RegExp(`${Grammar.Regex.HexDigit.source}{32}`))
    static commaSeparation = Parsernostrum.reg(/\s*,\s*(?!\))/)
    static commaOrSpaceSeparation = Parsernostrum.reg(/\s*,\s*(?!\))|\s+/)
    static equalSeparation = Parsernostrum.reg(/\s*=\s*/)
    static hexColorChannel = Parsernostrum.reg(new RegExp(Grammar.Regex.HexDigit.source + "{2}"))

    /*   ---   Factory   ---   */

    /**
     * @template T
     * @param {AttributeInfo<T>} attribute
     * @returns {Parsernostrum<T>}
     */
    static grammarFor(attribute, type = attribute?.type, defaultGrammar = this.unknownValue) {
        let result = defaultGrammar;
        if (type instanceof Array) {
            if (attribute?.inlined) {
                return this.grammarFor(undefined, type[0])
            }
            result = Parsernostrum.seq(
                Parsernostrum.reg(/\(\s*/),
                this.grammarFor(undefined, type[0]).sepBy(this.commaSeparation).opt(),
                Parsernostrum.reg(/\s*(?:,\s*)?\)/),
            ).map(([_0, values, _3]) => values instanceof Array ? values : []);
        } else if (type instanceof Union) {
            result = type.values
                .map(v => this.grammarFor(undefined, v))
                .reduce((acc, cur) => !cur || cur === this.unknownValue || acc === this.unknownValue
                    ? this.unknownValue
                    : Parsernostrum.alt(acc, cur)
                );
        } else if (type instanceof MirroredEntity) {
            // @ts-expect-error
            return this.grammarFor(undefined, type.getTargetType())
                .map(v => new MirroredEntity(type.type, () => v))
        } else if (attribute?.constructor === Object) {
            result = this.grammarFor(undefined, type);
        } else {
            switch (type) {
                case Boolean:
                    result = this.boolean;
                    break
                case null:
                    result = this.null;
                    break
                case Number:
                    result = this.number;
                    break
                case BigInt:
                    result = this.bigInt;
                    break
                case String:
                    result = this.string;
                    break
                default:
                    if (/** @type {AttributeConstructor<any>} */(type)?.prototype instanceof Serializable) {
                        result = /** @type {typeof Serializable} */(type).grammar;
                    }
            }
        }
        if (attribute) {
            if (attribute.serialized && type.constructor !== String) {
                if (result == this.unknownValue) {
                    result = this.string;
                } else {
                    result = Parsernostrum.seq(Parsernostrum.str('"'), result, Parsernostrum.str('"'));
                }
            }
            if (attribute.nullable) {
                result = Parsernostrum.alt(result, this.null);
            }
        }
        return result
    }

    /**
     * @template {AttributeConstructor<Attribute>} T
     * @param {T} entityType
     * @param {String[]} key
     * @returns {AttributeInfo}
     */
    static getAttribute(entityType, key) {
        let result;
        let type;
        if (entityType instanceof Union) {
            for (let t of entityType.values) {
                if (result = this.getAttribute(t, key)) {
                    return result
                }
            }
        }
        if (entityType instanceof IEntity.constructor) {
            // @ts-expect-error
            result = entityType.attributes[key[0]];
            type = result?.type;
        } else if (entityType instanceof Array) {
            result = entityType[key[0]];
            type = result;
        }
        if (key.length > 1) {
            return this.getAttribute(type, key.slice(1))
        }
        return result
    }

    static createAttributeGrammar(
        entityType,
        attributeName = this.attributeName,
        valueSeparator = this.equalSeparation,
        handleObjectSet = (obj, k, v) => { }
    ) {
        return Parsernostrum.seq(
            attributeName,
            valueSeparator,
        ).chain(([attributeName, _1]) => {
            const attributeKey = attributeName.split(Configuration.keysSeparator);
            const attributeValue = this.getAttribute(entityType, attributeKey);
            return this
                .grammarFor(attributeValue)
                .map(attributeValue =>
                    values => {
                        handleObjectSet(values, attributeKey, attributeValue);
                        Utility.objectSet(values, attributeKey, attributeValue);
                    }
                )
        })
    }

    /**
     * @template {IEntity} T
     * @param {(new (...args: any) => T) & EntityConstructor} entityType
     * @param {Boolean | Number} acceptUnknownKeys Number to specify the limit or true, to let it be a reasonable value
     */
    static createEntityGrammar(entityType, acceptUnknownKeys = true, entriesSeparator = this.commaSeparation) {
        const lookbehind = entityType.attributes.lookbehind.default;
        return Parsernostrum.seq(
            Parsernostrum.reg(
                lookbehind instanceof Union
                    ? new RegExp(`(${lookbehind.values.reduce((acc, cur) => acc + "|" + cur)})\\s*\\(\\s*`)
                    : lookbehind.constructor == String && lookbehind.length > 0
                        ? new RegExp(`(${lookbehind})\\s*\\(\\s*`)
                        : /()\(\s*/,
                1
            ),
            this.createAttributeGrammar(entityType).sepBy(entriesSeparator),
            Parsernostrum.reg(/\s*(?:,\s*)?\)/), // trailing comma
        )
            .map(([lookbehind, attributes, _2]) => {
                let values = {};
                attributes.forEach(attributeSetter => attributeSetter(values));
                if (lookbehind.length) {
                    values.lookbehind = lookbehind;
                }
                return values
            })
            // Decide if we accept the entity or not. It is accepted if it doesn't have too many unexpected keys
            .chain(values => {
                let totalKeys = Object.keys(values);
                // Check missing values
                if (
                    Object.keys(/** @type {AttributeDeclarations} */(entityType.attributes))
                        .filter(key => entityType.attributes[key].expected)
                        .find(key => !totalKeys.includes(key) && (key))
                ) {
                    return Parsernostrum.failure()
                }
                const unknownKeys = Object.keys(values).filter(key => !(key in entityType.attributes)).length;
                if (!acceptUnknownKeys && unknownKeys > 0) {
                    return Parsernostrum.failure()
                }
                return Parsernostrum.success().map(() => new entityType(values))
            })
    }

    /*   ---   Entity   ---   */

    static unknownValue // Defined in initializeSerializerFactor to avoid circular include
}

var crypto;
if (typeof window === "undefined") {
    import('crypto').then(mod => crypto = mod.default).catch();
} else {
    crypto = window.crypto;
}

class GuidEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createValue(""),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.guid.map(v => new this(v))
    }

    static generateGuid(random = true) {
        let values = new Uint32Array(4);
        if (random === true) {
            crypto.getRandomValues(values);
        }
        let guid = "";
        values.forEach(n => {
            guid += ("0".repeat(8) + n.toString(16).toUpperCase()).slice(-8);
        });
        return new GuidEntity({ value: guid })
    }

    constructor(values) {
        if (!values) {
            values = GuidEntity.generateGuid().value;
        }
        if (values.constructor !== Object) {
            values = {
                value: values,
            };
        }
        super(values);
        /** @type {String} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

class ObjectReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        type: new AttributeInfo({
            default: "",
            serialized: true,
        }),
        path: new AttributeInfo({
            default: "",
            serialized: true,
        }),
    }
    static quoted = Parsernostrum.regArray(new RegExp(
        `'"(` + Grammar.Regex.InsideString.source + `)"'`
        + `|'(` + Grammar.Regex.InsideSingleQuotedString.source + `)'`
        + `|"(` + Grammar.Regex.InsideString.source + `)"`
    )).map(([_0, a, b, c]) => a ?? b ?? c)
    static path = this.quoted.getParser().parser.regexp.source + "|" + Grammar.Regex.Path.source
    static typeReference = Parsernostrum.reg(
        new RegExp(Grammar.Regex.Path.source + "|" + Grammar.symbol.getParser().regexp.source)
    )
    static fullReferenceGrammar = Parsernostrum.regArray(
        new RegExp(
            "(" + this.typeReference.getParser().regexp.source + ")"
            + /\s*/.source
            + "(?:" + this.quoted.getParser().parser.regexp.source + ")"
        )
    ).map(([_0, type, ...path]) => new this({ type, path: path.find(v => v) }))
    static fullReferenceSerializedGrammar = Parsernostrum.regArray(
        new RegExp(
            "(" + this.typeReference.getParser().regexp.source + ")"
            + /\s*/.source
            + `'(` + Grammar.Regex.InsideSingleQuotedString.source + `)'`
        )
    ).map(([_0, type, ...path]) => new this({ type, path: path.find(v => v) }))
    static typeReferenceGrammar = this.typeReference.map(v => new this({ type: v, path: "" }))
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.seq(
                Parsernostrum.str('"'),
                Parsernostrum.alt(
                    this.fullReferenceSerializedGrammar,
                    this.typeReferenceGrammar,
                ),
                Parsernostrum.str('"'),
            ).map(([_0, objectReference, _1]) => objectReference),
            this.fullReferenceGrammar.map(v => (Utility.objectSet(v, ["attributes", "type", "serialized"], false), v)),
            this.typeReferenceGrammar.map(v => (Utility.objectSet(v, ["attributes", "type", "serialized"], false), v)),
        )
    }

    constructor(values = {}) {
        if (values.constructor === String) {
            values = {
                path: values
            };
        }
        super(values);
        /** @type {String} */ this.type;
        /** @type {String} */ this.path;
    }

    static createNoneInstance() {
        return new ObjectReferenceEntity({ type: "None", path: "" })
    }

    getName() {
        return Utility.getNameFromPath(this.path.replace(/_C$/, ""))
    }

    toString() {
        return this.type + (this.path ? `'${this.path}'` : "")
    }
}

class FunctionReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberParent: AttributeInfo.createType(ObjectReferenceEntity),
        MemberName: AttributeInfo.createType(String),
        MemberGuid: AttributeInfo.createType(GuidEntity),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values) {
        super(values);
        /** @type {ObjectReferenceEntity} */ this.MemberParent;
        /** @type {String} */ this.MemberName;
        /** @type {GuidEntity} */ this.MemberGuid;
    }
}

class IdentifierEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createValue(""),
    }
    static attributeConverter = {
        fromAttribute: (value, type) => new IdentifierEntity(value),
        toAttribute: (value, type) => value.toString()
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.symbol.map(v => new this(v))
    }

    constructor(values) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            };
        }
        super(values);
        /** @type {String} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

class IntegerEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            default: 0,
            predicate: v => v % 1 == 0 && v > 1 << 31 && v < -(1 << 31),
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberInteger.map(v => new this(v))
    }

    /** @param {Number | Object} values */
    constructor(values = 0) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            };
        }
        values.value = Math.floor(values.value);
        if (values.value === -0) {
            values.value = 0;
        }
        super(values);
        /** @type {Number} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}

class ColorChannelEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createValue(0),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.number.map(value => new this(value))
    }

    constructor(values = 0) {
        if (values.constructor !== Object) {
            // @ts-expect-error
            values = {
                value: values,
            };
        }
        super(values);
        /** @type {Number} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toFixed(6)
    }
}

class LinearColorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        R: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            expected: true,
        }),
        G: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            expected: true,
        }),
        B: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            expected: true,
        }),
        A: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(1),
        }),
        H: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            ignored: true,
        }),
        S: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            ignored: true,
        }),
        V: new AttributeInfo({
            type: ColorChannelEntity,
            default: () => new ColorChannelEntity(),
            ignored: true,
        }),
    }
    static grammar = this.createGrammar()

    /** @param {Number} x */
    static linearToSRGB(x) {
        if (x <= 0) {
            return 0
        } else if (x >= 1) {
            return 1
        } else if (x < 0.0031308) {
            return x * 12.92
        } else {
            return Math.pow(x, 1 / 2.4) * 1.055 - 0.055
        }
    }

    /** @param {Number} x */
    static sRGBtoLinear(x) {
        if (x <= 0) {
            return 0
        } else if (x >= 1) {
            return 1
        } else if (x < 0.04045) {
            return x / 12.92
        } else {
            return Math.pow((x + 0.055) / 1.055, 2.4)
        }
    }

    static getWhite() {
        return new LinearColorEntity({
            R: 1,
            G: 1,
            B: 1,
        })
    }

    static createGrammar() {
        return Grammar.createEntityGrammar(this, false)
    }

    static getLinearColorFromHexGrammar() {
        return Parsernostrum.regArray(new RegExp(
            "#(" + Grammar.Regex.HexDigit.source + "{2})"
            + "(" + Grammar.Regex.HexDigit.source + "{2})"
            + "(" + Grammar.Regex.HexDigit.source + "{2})"
            + "(" + Grammar.Regex.HexDigit.source + "{2})?"
        )).map(([m, R, G, B, A]) => new this({
            R: parseInt(R, 16) / 255,
            G: parseInt(G, 16) / 255,
            B: parseInt(B, 16) / 255,
            A: parseInt(A ?? "FF", 16) / 255,
        }))
    }

    static getLinearColorRGBListGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.numberByte,
            Grammar.commaSeparation,
            Parsernostrum.numberByte,
            Grammar.commaSeparation,
            Parsernostrum.numberByte,
        ).map(([R, _1, G, _3, B]) => new this({
            R: R / 255,
            G: G / 255,
            B: B / 255,
            A: 1,
        }))
    }

    static getLinearColorRGBGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/rgb\s*\(\s*/),
            this.getLinearColorRGBListGrammar(),
            Parsernostrum.reg(/\s*\)/)
        ).map(([_0, linearColor, _2]) => linearColor)
    }

    static getLinearColorRGBAGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/rgba\s*\(\s*/),
            this.getLinearColorRGBListGrammar(),
            Parsernostrum.reg(/\s*\)/)
        ).map(([_0, linearColor, _2]) => linearColor)
    }

    static getLinearColorFromAnyFormat() {
        return Parsernostrum.alt(
            this.getLinearColorFromHexGrammar(),
            this.getLinearColorRGBAGrammar(),
            this.getLinearColorRGBGrammar(),
            this.getLinearColorRGBListGrammar(),
        )
    }

    constructor(values) {
        if (values instanceof Array) {
            values = {
                R: values[0] ?? 0,
                G: values[1] ?? 0,
                B: values[2] ?? 0,
                A: values[3] ?? 1,
            };
        }
        super(values);
        /** @type {ColorChannelEntity} */ this.R;
        /** @type {ColorChannelEntity} */ this.G;
        /** @type {ColorChannelEntity} */ this.B;
        /** @type {ColorChannelEntity} */ this.A;
        /** @type {ColorChannelEntity} */ this.H;
        /** @type {ColorChannelEntity} */ this.S;
        /** @type {ColorChannelEntity} */ this.V;
        this.#updateHSV();
    }

    #updateHSV() {
        const r = this.R.value;
        const g = this.G.value;
        const b = this.B.value;
        if (Utility.approximatelyEqual(r, g) && Utility.approximatelyEqual(r, b) && Utility.approximatelyEqual(g, b)) {
            this.S.value = 0;
            this.V.value = r;
            return
        }
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        let h;
        switch (max) {
            case min:
                h = 0;
                break
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break
            case g:
                h = (b - r) / d + 2;
                break
            case b:
                h = (r - g) / d + 4;
                break
        }
        h /= 6;
        this.H.value = h;
        this.S.value = max == 0 ? 0 : d / max;
        this.V.value = max;
    }

    /**
     * @param {Number} r
     * @param {Number} g
     * @param {Number} b
     * @param {Number} a
     */
    setFromRGBA(r, g, b, a = 1) {
        this.R.value = r;
        this.G.value = g;
        this.B.value = b;
        this.A.value = a;
        this.#updateHSV();
    }

    /**
     * @param {Number} h
     * @param {Number} s
     * @param {Number} v
     * @param {Number} a
     */
    setFromHSVA(h, s, v, a = 1) {
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        const values = [v, q, p, p, t, v];
        const [r, g, b] = [values[i % 6], values[(i + 4) % 6], values[(i + 2) % 6]];
        this.R.value = r;
        this.G.value = g;
        this.B.value = b;
        this.A.value = a;
        this.H.value = h;
        this.S.value = s;
        this.V.value = v;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} v
     * @param {Number} a
     */
    setFromWheelLocation(x, y, v, a) {
        const [r, theta] = Utility.getPolarCoordinates(x, y, true);
        this.setFromHSVA(1 - theta / (2 * Math.PI), r, v, a);
    }

    toDimmedColor(minV = 0) {
        const result = new LinearColorEntity();
        result.setFromRGBANumber(this.toNumber());
        result.setFromHSVA(
            result.H.value,
            result.S.value * 0.6,
            Math.pow(result.V.value + minV, 0.55) * 0.7
        );
        return result
    }

    toCSSRGBValues() {
        const r = Math.round(this.R.value * 255);
        const g = Math.round(this.G.value * 255);
        const b = Math.round(this.B.value * 255);
        return i$3`${r}, ${g}, ${b}`
    }

    toRGBA() {
        return [
            Math.round(this.R.value * 255),
            Math.round(this.G.value * 255),
            Math.round(this.B.value * 255),
            Math.round(this.A.value * 255),
        ]
    }

    toSRGBA() {
        return [
            Math.round(LinearColorEntity.linearToSRGB(this.R.value) * 255),
            Math.round(LinearColorEntity.linearToSRGB(this.G.value) * 255),
            Math.round(LinearColorEntity.linearToSRGB(this.B.value) * 255),
            Math.round(this.A.value * 255),
        ]
    }

    toRGBAString() {
        return this
            .toRGBA()
            .map(v => v.toString(16).toUpperCase().padStart(2, "0"))
            .join("")
    }

    toSRGBAString() {
        return this
            .toSRGBA()
            .map(v => v.toString(16).toUpperCase().padStart(2, "0"))
            .join("")
    }

    toHSVA() {
        return [this.H.value, this.S.value, this.V.value, this.A.value]
    }

    toNumber() {
        return (
            Math.round(this.R.value * 0xff) << 24)
            + (Math.round(this.G.value * 0xff) << 16)
            + (Math.round(this.B.value * 0xff) << 8)
            + Math.round(this.A.value * 0xff)
    }

    /** @param {Number} number */
    setFromRGBANumber(number) {
        this.A.value = (number & 0xff) / 0xff;
        this.B.value = ((number >> 8) & 0xff) / 0xff;
        this.G.value = ((number >> 16) & 0xff) / 0xff;
        this.R.value = ((number >> 24) & 0xff) / 0xff;
        this.#updateHSV();
    }

    /** @param {Number} number */
    setFromSRGBANumber(number) {
        this.A.value = (number & 0xff) / 0xff;
        this.B.value = LinearColorEntity.sRGBtoLinear(((number >> 8) & 0xff) / 0xff);
        this.G.value = LinearColorEntity.sRGBtoLinear(((number >> 16) & 0xff) / 0xff);
        this.R.value = LinearColorEntity.sRGBtoLinear(((number >> 24) & 0xff) / 0xff);
        this.#updateHSV();
    }

    /** @returns {[Number, Number, Number, Number]} */
    toArray() {
        return [this.R.value, this.G.value, this.B.value, this.A.value]
    }

    toString() {
        return Utility.printLinearColor(this)
    }
}

class MacroGraphReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MacroGraph: new AttributeInfo({
            type: ObjectReferenceEntity,
            default: () => new ObjectReferenceEntity(),
        }),
        GraphBlueprint: new AttributeInfo({
            type: ObjectReferenceEntity,
            default: () => new ObjectReferenceEntity(),
        }),
        GraphGuid: new AttributeInfo({
            type: GuidEntity,
            default: () => new GuidEntity(),
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values) {
        super(values);
        /** @type {ObjectReferenceEntity} */ this.MacroGraph;
        /** @type {ObjectReferenceEntity} */ this.GraphBlueprint;
        /** @type {GuidEntity} */ this.GuidEntity;
    }

    getMacroName() {
        const colonIndex = this.MacroGraph.path.search(":");
        return this.MacroGraph.path.substring(colonIndex + 1)
    }
}

class ByteEntity extends IntegerEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            ...super.attributes.value,
            predicate: v => v % 1 == 0 && v >= 0 && v < 1 << 8,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberByte.map(v => new this(v))
    }

    constructor(values = 0) {
        super(values);
    }
}

class SymbolEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createValue(""),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.symbol.map(v => new this(v))
    }

    /** @param {String | Object} values */
    constructor(values) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            };
        }
        super(values);
        /** @type {String} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

class EnumEntity extends SymbolEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.symbol.map(v => new this(v))
    }
}

class EnumDisplayValueEntity extends EnumEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.reg(Grammar.Regex.InsideString).map(v => new this(v))
    }
}

class InvariantTextEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createValue(""),
        lookbehind: new AttributeInfo({
            ...super.attributes.lookbehind,
            default: "INVTEXT",
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.seq(
                Parsernostrum.reg(new RegExp(`${this.attributes.lookbehind.default}\\s*\\(`)),
                Grammar.grammarFor(this.attributes.value),
                Parsernostrum.reg(/\s*\)/)
            )
                .map(([_0, value, _2]) => value),
            Parsernostrum.reg(new RegExp(this.attributes.lookbehind.default)) // InvariantTextEntity can not have arguments
                .map(() => "")
        ).map(value => new this(value))
    }

    constructor(values) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            };
        }
        super(values);
        /** @type {String} */ this.value;
    }
}

class LocalizedTextEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        namespace: AttributeInfo.createValue(""),
        key: AttributeInfo.createValue(""),
        value: AttributeInfo.createValue(""),
        lookbehind: new AttributeInfo({
            ...super.attributes.lookbehind,
            default: "NSLOCTEXT",
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.regArray(new RegExp(
            String.raw`${this.attributes.lookbehind.default}\s*\(`
            + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
            + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
            + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*`
            + String.raw`(?:,\s+)?`
            + String.raw`\)`,
            "m"
        )).map(matchResult => new this({
            namespace: Utility.unescapeString(matchResult[1]),
            key: Utility.unescapeString(matchResult[2]),
            value: Utility.unescapeString(matchResult[3]),
        }))
    }

    constructor(values) {
        super(values);
        /** @type {String} */ this.namespace;
        /** @type {String} */ this.key;
        /** @type {String} */ this.value;
    }

    toString() {
        return Utility.capitalFirstLetter(this.value)
    }
}

class FormatTextEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            type: [new Union(String, LocalizedTextEntity, InvariantTextEntity, FormatTextEntity)],
            default: [],
        }),
        lookbehind: /** @type {AttributeInfo<Union<String[]>>} */(new AttributeInfo({
            ...super.attributes.lookbehind,
            default: new Union("LOCGEN_FORMAT_NAMED", "LOCGEN_FORMAT_ORDERED"),
        })),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(
                // Resulting regex: /(LOCGEN_FORMAT_NAMED|LOCGEN_FORMAT_ORDERED)\s*/
                new RegExp(`(${this.attributes.lookbehind.default.values.reduce((acc, cur) => acc + "|" + cur)})\\s*`),
                1
            ),
            Grammar.grammarFor(this.attributes.value)
        )
            .map(([lookbehind, values]) => {
                const result = new this({
                    value: values,
                    lookbehind,
                });
                return result
            })
    }

    constructor(values) {
        super(values);
        /** @type {(String | LocalizedTextEntity | InvariantTextEntity | FormatTextEntity)[]} */ this.value;
    }

    toString() {
        const pattern = this.value?.[0]?.toString(); // The pattern is always the first element of the array
        if (!pattern) {
            return ""
        }
        const values = this.value.slice(1).map(v => v.toString());
        return this.lookbehind == "LOCGEN_FORMAT_NAMED"
            ? pattern.replaceAll(/\{([a-zA-Z]\w*)\}/g, (substring, arg) => {
                const argLocation = values.indexOf(arg) + 1;
                return argLocation > 0 && argLocation < values.length
                    ? values[argLocation]
                    : substring
            })
            : this.lookbehind == "LOCGEN_FORMAT_ORDERED"
                ? pattern.replaceAll(/\{(\d+)\}/g, (substring, arg) => {
                    const argValue = Number(arg);
                    return argValue < values.length
                        ? values[argValue]
                        : substring
                })
                : ""
    }
}

class Integer64Entity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            default: 0n,
            predicate: v => v >= -(1n << 63n) && v < 1n << 63n,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.numberBigInteger.map(v => new this(v))
    }

    /** @param {BigInt | Number | Object} values */
    constructor(values = 0) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            };
        }
        if (values.value === -0) {
            values.value = 0n;
        }
        super(values);
        /** @type {BigInt} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}

class PathSymbolEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: new AttributeInfo({
            default: "",
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.symbol.map(v => new this(v))
    }

    constructor(values) {
        if (values.constructor !== Object) {
            values = {
                value: values,
            };
        }
        super(values);
        /** @type {String} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

class PinReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        objectName: AttributeInfo.createType(PathSymbolEntity),
        pinGuid: AttributeInfo.createType(GuidEntity),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            PathSymbolEntity.createGrammar(),
            Parsernostrum.whitespace,
            GuidEntity.createGrammar()
        ).map(
            ([objectName, _1, pinGuid]) => new this({
                objectName: objectName,
                pinGuid: pinGuid,
            })
        )
    }

    constructor(values) {
        super(values);
        /** @type {PathSymbolEntity} */ this.objectName;
        /** @type {GuidEntity} */ this.pinGuid;
    }
}

class PinTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        PinCategory: AttributeInfo.createValue(""),
        PinSubCategory: AttributeInfo.createValue(""),
        PinSubCategoryObject: new AttributeInfo({
            type: ObjectReferenceEntity,
            default: () => ObjectReferenceEntity.createNoneInstance(),
        }),
        PinSubCategoryMemberReference: new AttributeInfo({
            type: FunctionReferenceEntity,
            default: null,
        }),
        PinValueType: new AttributeInfo({
            type: PinTypeEntity,
            default: null,
        }),
        ContainerType: AttributeInfo.createType(PathSymbolEntity),
        bIsReference: AttributeInfo.createValue(false),
        bIsConst: AttributeInfo.createValue(false),
        bIsWeakPointer: AttributeInfo.createValue(false),
        bIsUObjectWrapper: AttributeInfo.createValue(false),
        bSerializeAsSinglePrecisionFloat: AttributeInfo.createValue(false),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values = {}, suppressWarns = false) {
        super(values, suppressWarns);
        /** @type {String} */ this.PinCategory;
        /** @type {String} */ this.PinSubCategory;
        /** @type {ObjectReferenceEntity} */ this.PinSubCategoryObject;
        /** @type {FunctionReferenceEntity} */ this.PinSubCategoryMemberReference;
        /** @type {PinTypeEntity} */ this.PinValueType;
        /** @type {PathSymbolEntity} */ this.ContainerType;
        /** @type {Boolean} */ this.bIsReference;
        /** @type {Boolean} */ this.bIsConst;
        /** @type {Boolean} */ this.bIsWeakPointer;
        /** @type {Boolean} */ this.bIsUObjectWrapper;
        /** @type {Boolean} */ this.bIsUObjectWrapper;
        /** @type {Boolean} */ this.bSerializeAsSinglePrecisionFloat;
    }

    /** @param {PinTypeEntity} other */
    copyTypeFrom(other) {
        this.PinCategory = other.PinCategory;
        this.PinSubCategory = other.PinSubCategory;
        this.PinSubCategoryObject = other.PinSubCategoryObject;
        this.PinSubCategoryMemberReference = other.PinSubCategoryMemberReference;
        this.PinValueType = other.PinValueType;
        this.ContainerType = other.ContainerType;
        this.bIsReference = other.bIsReference;
        this.bIsConst = other.bIsConst;
        this.bIsWeakPointer = other.bIsWeakPointer;
        this.bIsUObjectWrapper = other.bIsUObjectWrapper;
        this.bSerializeAsSinglePrecisionFloat = other.bSerializeAsSinglePrecisionFloat;
    }
}

class Vector2DEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        Y: new AttributeInfo({
            default: 0,
            expected: true,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this, false)
    }

    constructor(values) {
        super(values);
        /** @type {Number} */ this.X;
        /** @type {Number} */ this.Y;
    }

    /** @returns {[Number, Number]} */
    toArray() {
        return [this.X, this.Y]
    }
}

class RBSerializationVector2DEntity extends Vector2DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                /X\s*=\s*/.source + "(?<x>" + Parsernostrum.number.getParser().parser.regexp.source + ")"
                + "\\s+"
                + /Y\s*=\s*/.source + "(?<y>" + Parsernostrum.number.getParser().parser.regexp.source + ")"
            )).map(({ groups: { x, y } }) => new this({
                X: Number(x),
                Y: Number(y),
            })),
            Vector2DEntity.createGrammar()
        )
    }
}

class RotatorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        R: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        P: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        Y: new AttributeInfo({
            default: 0,
            expected: true,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this, false)
    }

    constructor(values) {
        super(values);
        /** @type {Number} */ this.R;
        /** @type {Number} */ this.P;
        /** @type {Number} */ this.Y;
    }

    getRoll() {
        return this.R
    }

    getPitch() {
        return this.P
    }

    getYaw() {
        return this.Y
    }
}

class SimpleSerializationRotatorEntity extends RotatorEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source;
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                "(" + number + ")"
                + "\\s*,\\s*"
                + "(" + number + ")"
                + "\\s*,\\s*"
                + "(" + number + ")"
            )).map(([_, p, y, r]) => new this({
                R: Number(r),
                P: Number(p),
                Y: Number(y),
            })),
            RotatorEntity.createGrammar()
        )
    }
}

class SimpleSerializationVector2DEntity extends Vector2DEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source;
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                "(" + number + ")"
                + "\\s*,\\s*"
                + "(" + number + ")"
            )).map(([_, x, y]) => new this({
                X: Number(x),
                Y: Number(y),
            })),
            Vector2DEntity.createGrammar()
        )
    }
}

class VectorEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        X: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        Y: new AttributeInfo({
            default: 0,
            expected: true,
        }),
        Z: new AttributeInfo({
            default: 0,
            expected: true,
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(VectorEntity, false)
    }

    constructor(values) {
        super(values);
        /** @type {Number} */ this.X;
        /** @type {Number} */ this.Y;
        /** @type {Number} */ this.Z;
    }

    /** @returns {[Number, Number, Number]} */
    toArray() {
        return [this.X, this.Y, this.Z]
    }
}

class SimpleSerializationVectorEntity extends VectorEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        const number = Parsernostrum.number.getParser().parser.regexp.source;
        return Parsernostrum.alt(
            Parsernostrum.regArray(new RegExp(
                "(" + number + ")"
                + "\\s*,\\s*"
                + "(" + number + ")"
                + "\\s*,\\s*"
                + "(" + number + ")"
            ))
                .map(([_0, x, y, z]) => new this({
                    X: Number(x),
                    Y: Number(y),
                    Z: Number(z),
                })),
            VectorEntity.createGrammar()
        )
    }
}

/** @template {TerminalAttribute} T */
class PinEntity extends IEntity {

    static #typeEntityMap = {
        [Configuration.paths.linearColor]: LinearColorEntity,
        [Configuration.paths.rotator]: RotatorEntity,
        [Configuration.paths.vector]: VectorEntity,
        [Configuration.paths.vector2D]: Vector2DEntity,
        "bool": Boolean,
        "byte": ByteEntity,
        "enum": EnumEntity,
        "exec": String,
        "int": IntegerEntity,
        "int64": Integer64Entity,
        "name": String,
        "real": Number,
        "string": String,
    }
    static #alternativeTypeEntityMap = {
        "enum": EnumDisplayValueEntity,
        "rg": RBSerializationVector2DEntity,
        [Configuration.paths.rotator]: SimpleSerializationRotatorEntity,
        [Configuration.paths.vector]: SimpleSerializationVectorEntity,
        [Configuration.paths.vector2D]: SimpleSerializationVector2DEntity,
    }
    static attributes = {
        ...super.attributes,
        lookbehind: new AttributeInfo({
            default: "Pin",
            ignored: true,
        }),
        objectEntity: new AttributeInfo({
            ignored: true,
        }),
        pinIndex: new AttributeInfo({
            type: Number,
            ignored: true,
        }),
        PinId: new AttributeInfo({
            type: GuidEntity,
            default: () => new GuidEntity()
        }),
        PinName: AttributeInfo.createValue(""),
        PinFriendlyName: AttributeInfo.createType(new Union(LocalizedTextEntity, FormatTextEntity, String)),
        PinToolTip: AttributeInfo.createType(String),
        Direction: AttributeInfo.createType(String),
        PinType: new AttributeInfo({
            type: PinTypeEntity,
            default: () => new PinTypeEntity(),
            inlined: true,
        }),
        LinkedTo: AttributeInfo.createType([PinReferenceEntity]),
        SubPins: AttributeInfo.createType([PinReferenceEntity]),
        ParentPin: AttributeInfo.createType(PinReferenceEntity),
        DefaultValue: new AttributeInfo({
            type: new ComputedType(
                /** @param {PinEntity} pinEntity */
                pinEntity => pinEntity.getEntityType(true) ?? String
            ),
            serialized: true,
        }),
        AutogeneratedDefaultValue: AttributeInfo.createType(String),
        DefaultObject: AttributeInfo.createType(ObjectReferenceEntity),
        PersistentGuid: AttributeInfo.createType(GuidEntity),
        bHidden: AttributeInfo.createValue(false),
        bNotConnectable: AttributeInfo.createValue(false),
        bDefaultValueIsReadOnly: AttributeInfo.createValue(false),
        bDefaultValueIsIgnored: AttributeInfo.createValue(false),
        bAdvancedView: AttributeInfo.createValue(false),
        bOrphanedPin: AttributeInfo.createValue(false),
    }
    static grammar = this.createGrammar()

    #recomputesNodeTitleOnChange = false
    set recomputesNodeTitleOnChange(value) {
        this.#recomputesNodeTitleOnChange = value;
    }
    get recomputesNodeTitleOnChange() {
        return this.#recomputesNodeTitleOnChange
    }

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values = {}, suppressWarns = false) {
        super(values, suppressWarns);
        /** @type {ObjectEntity} */ this.objectEntity;
        /** @type {Number} */ this.pinIndex;
        /** @type {GuidEntity} */ this.PinId;
        /** @type {String} */ this.PinName;
        /** @type {LocalizedTextEntity | String} */ this.PinFriendlyName;
        /** @type {String} */ this.PinToolTip;
        /** @type {String} */ this.Direction;
        /** @type {PinTypeEntity} */ this.PinType;
        /** @type {PinReferenceEntity[]} */ this.LinkedTo;
        /** @type {T} */ this.DefaultValue;
        /** @type {String} */ this.AutogeneratedDefaultValue;
        /** @type {ObjectReferenceEntity} */ this.DefaultObject;
        /** @type {GuidEntity} */ this.PersistentGuid;
        /** @type {Boolean} */ this.bHidden;
        /** @type {Boolean} */ this.bNotConnectable;
        /** @type {Boolean} */ this.bDefaultValueIsReadOnly;
        /** @type {Boolean} */ this.bDefaultValueIsIgnored;
        /** @type {Boolean} */ this.bAdvancedView;
        /** @type {Boolean} */ this.bOrphanedPin;
    }

    /** @param {ObjectEntity} objectEntity */
    static fromLegacyObject(objectEntity) {
        return new PinEntity(objectEntity, true)
    }

    getType() {
        const category = this.PinType.PinCategory;
        if (category === "struct" || category === "object") {
            return this.PinType.PinSubCategoryObject.path
        }
        if (this.isEnum()) {
            return "enum"
        }
        if (this.objectEntity?.isPcg()) {
            const pcgSuboject = this.objectEntity.getPcgSubobject();
            const pinObjectReference = this.isInput()
                ? pcgSuboject.InputPins?.[this.pinIndex]
                : pcgSuboject.OutputPins?.[this.pinIndex];
            if (pinObjectReference) {
                /** @type {ObjectEntity} */
                const pinObject = pcgSuboject[Configuration.subObjectAttributeNameFromReference(pinObjectReference, true)];
                let allowedTypes = pinObject.Properties?.AllowedTypes?.toString() ?? "";
                if (allowedTypes == "") {
                    allowedTypes = this.PinType.PinCategory ?? "";
                    if (allowedTypes == "") {
                        allowedTypes = "Any";
                    }
                }
                if (allowedTypes) {
                    if (
                        pinObject.Properties.bAllowMultipleData !== false
                        && pinObject.Properties.bAllowMultipleConnections !== false
                    ) {
                        allowedTypes += "[]";
                    }
                    return allowedTypes
                }
            }
        }
        if (category === "optional") {
            switch (this.PinType.PinSubCategory) {
                case "red":
                    return "real"
                case "rg":
                    return "rg"
                case "rgb":
                    return Configuration.paths.vector
                case "rgba":
                    return Configuration.paths.linearColor
                default:
                    return this.PinType.PinSubCategory
            }
        }
        return category
    }

    getEntityType(alternative = false) {
        const typeString = this.getType();
        const entity = PinEntity.#typeEntityMap[typeString];
        const alternativeEntity = PinEntity.#alternativeTypeEntityMap[typeString];
        return alternative && alternativeEntity !== undefined
            ? alternativeEntity
            : entity
    }

    pinDisplayName() {
        let result = this.PinFriendlyName
            ? this.PinFriendlyName.toString()
            : Utility.formatStringName(this.PinName ?? "");
        let match;
        if (
            this.PinToolTip
            // Match up until the first \n excluded or last character
            && (match = this.PinToolTip.match(/\s*(.+?(?=\n)|.+\S)\s*/))
        ) {
            if (match[1].toLowerCase() === result.toLowerCase()) {
                return match[1] // In case they match, then keep the case of the PinToolTip
            }
        }
        return result
    }

    /** @param {PinEntity} other */
    copyTypeFrom(other) {
        this.PinType.PinCategory = other.PinType.PinCategory;
        this.PinType.PinSubCategory = other.PinType.PinSubCategory;
        this.PinType.PinSubCategoryObject = other.PinType.PinSubCategoryObject;
        this.PinType.PinSubCategoryMemberReference = other.PinType.PinSubCategoryMemberReference;
        this.PinType.PinValueType = other.PinType.PinValueType;
        this.PinType.ContainerType = other.PinType.ContainerType;
        this.PinType.bIsReference = other.PinType.bIsReference;
        this.PinType.bIsConst = other.PinType.bIsConst;
        this.PinType.bIsWeakPointer = other.PinType.bIsWeakPointer;
        this.PinType.bIsUObjectWrapper = other.PinType.bIsUObjectWrapper;
        this.PinType.bSerializeAsSinglePrecisionFloat = other.PinType.bSerializeAsSinglePrecisionFloat;
    }

    getDefaultValue(maybeCreate = false) {
        if (this.DefaultValue === undefined && maybeCreate) {
            // @ts-expect-error
            this.DefaultValue = new (this.getEntityType(true))();
        }
        return this.DefaultValue
    }

    isEnum() {
        const type = this.PinType.PinSubCategoryObject.type;
        return type === Configuration.paths.enum
            || type === Configuration.paths.userDefinedEnum
            || type.toLowerCase() === "enum"
    }

    isExecution() {
        return this.PinType.PinCategory === "exec"
    }

    isHidden() {
        return this.bHidden
    }

    isInput() {
        return !this.bHidden && this.Direction != "EGPD_Output"
    }

    isOutput() {
        return !this.bHidden && this.Direction == "EGPD_Output"
    }

    isLinked() {
        return this.LinkedTo?.length > 0 ?? false
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     * @returns true if it was not already linked to the tarket
     */
    linkTo(targetObjectName, targetPinEntity) {
        const linkFound = this.LinkedTo?.some(pinReferenceEntity =>
            pinReferenceEntity.objectName.toString() == targetObjectName
            && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        );
        if (!linkFound) {
            (this.LinkedTo ??= []).push(new PinReferenceEntity({
                objectName: targetObjectName,
                pinGuid: targetPinEntity.PinId,
            }));
            return true
        }
        return false // Already linked
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     * @returns true if it was linked to the target
     */
    unlinkFrom(targetObjectName, targetPinEntity) {
        const indexElement = this.LinkedTo?.findIndex(pinReferenceEntity => {
            return pinReferenceEntity.objectName.toString() == targetObjectName
                && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        });
        if (indexElement >= 0) {
            this.LinkedTo.splice(indexElement, 1);
            if (this.LinkedTo.length === 0 && PinEntity.attributes.LinkedTo.default === undefined) {
                this.LinkedTo = undefined;
            }
            return true
        }
        return false
    }

    getSubCategory() {
        return this.PinType.PinSubCategoryObject.path
    }

    /** @return {CSSResult} */
    pinColor() {
        if (this.PinType.PinCategory == "mask") {
            const result = Configuration.pinColor[this.PinType.PinSubCategory];
            if (result) {
                return result
            }
        } else if (this.PinType.PinCategory == "optional") {
            return Configuration.pinColorMaterial
        }
        return Configuration.pinColor[this.getType()]
            ?? Configuration.pinColor[this.PinType.PinCategory.toLowerCase()]
            ?? Configuration.pinColor["default"]
    }
}

class ScriptVariableEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ScriptVariable: AttributeInfo.createType(ObjectReferenceEntity),
        OriginalChangeId: AttributeInfo.createType(GuidEntity),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values = {}, suppressWarns = false) {
        super(values, suppressWarns);
        /** @type {ObjectReferenceEntity} */ this.ScriptVariable;
        /** @type {GuidEntity} */ this.OriginalChangeId;
    }
}

class UnknownPinEntity extends PinEntity {

    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(
                new RegExp(`(${Grammar.Regex.Symbol.source})\\s*\\(\\s*`),
                1
            ),
            Grammar.createAttributeGrammar(this).sepBy(Grammar.commaSeparation),
            Parsernostrum.reg(/\s*(?:,\s*)?\)/)
        ).map(([lookbehind, attributes, _2]) => {
            lookbehind ??= "";
            let values = {};
            if (lookbehind.length) {
                values.lookbehind = lookbehind;
            }
            attributes.forEach(attributeSetter => attributeSetter(values));
            return new this(values)
        })
    }

    constructor(values = {}) {
        super(values, true);
    }
}

class VariableReferenceEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        MemberScope: AttributeInfo.createType(String),
        MemberName: AttributeInfo.createValue(""),
        MemberGuid: AttributeInfo.createType(GuidEntity),
        bSelfContext: AttributeInfo.createType(Boolean),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this)
    }

    constructor(values) {
        super(values);
        /** @type {String} */ this.MemberName;
        /** @type {GuidEntity} */ this.GuidEntity;
        /** @type {Boolean} */ this.bSelfContext;
    }
}

class ObjectEntity extends IEntity {

    static #keyName = {
        "A_AccentGrave": "à",
        "Add": "Num +",
        "C_Cedille": "ç",
        "Decimal": "Num .",
        "Divide": "Num /",
        "E_AccentAigu": "é",
        "E_AccentGrave": "è",
        "F1": "F1", // Otherwise F and number will be separated
        "F10": "F10",
        "F11": "F11",
        "F12": "F12",
        "F2": "F2",
        "F3": "F3",
        "F4": "F4",
        "F5": "F5",
        "F6": "F6",
        "F7": "F7",
        "F8": "F8",
        "F9": "F9",
        "Gamepad_Special_Left_X": "Touchpad Button X Axis",
        "Gamepad_Special_Left_Y": "Touchpad Button Y Axis",
        "Mouse2D": "Mouse XY 2D-Axis",
        "Multiply": "Num *",
        "Section": "§",
        "Subtract": "Num -",
        "Tilde": "`",
    }
    static attributes = {
        ...super.attributes,
        Class: AttributeInfo.createType(ObjectReferenceEntity),
        Name: AttributeInfo.createType(String),
        Archetype: AttributeInfo.createType(ObjectReferenceEntity),
        ExportPath: AttributeInfo.createType(ObjectReferenceEntity),
        R: new AttributeInfo({
            type: new Union(Boolean, Number),
            default: false,
            silent: true,
        }),
        G: new AttributeInfo({
            type: new Union(Boolean, Number),
            default: false,
            silent: true,
        }),
        B: new AttributeInfo({
            type: new Union(Boolean, Number),
            default: false,
            silent: true,
        }),
        A: new AttributeInfo({
            type: new Union(Boolean, Number),
            default: false,
            silent: true,
        }),
        ObjectRef: AttributeInfo.createType(ObjectReferenceEntity),
        BlueprintElementType: AttributeInfo.createType(ObjectReferenceEntity),
        BlueprintElementInstance: AttributeInfo.createType(ObjectReferenceEntity),
        PinTags: new AttributeInfo({
            type: [null],
            inlined: true,
        }),
        PinNames: new AttributeInfo({
            type: [String],
            inlined: true,
        }),
        AxisKey: AttributeInfo.createType(SymbolEntity),
        InputAxisKey: AttributeInfo.createType(SymbolEntity),
        InputName: AttributeInfo.createType(String),
        InputType: AttributeInfo.createType(SymbolEntity),
        NumAdditionalInputs: AttributeInfo.createType(Number),
        bIsPureFunc: AttributeInfo.createType(Boolean),
        bIsConstFunc: AttributeInfo.createType(Boolean),
        bIsCaseSensitive: AttributeInfo.createType(Boolean),
        VariableReference: AttributeInfo.createType(VariableReferenceEntity),
        SelfContextInfo: AttributeInfo.createType(SymbolEntity),
        DelegatePropertyName: AttributeInfo.createType(String),
        DelegateOwnerClass: AttributeInfo.createType(ObjectReferenceEntity),
        ComponentPropertyName: AttributeInfo.createType(String),
        EventReference: AttributeInfo.createType(FunctionReferenceEntity),
        FunctionReference: AttributeInfo.createType(FunctionReferenceEntity),
        CustomFunctionName: AttributeInfo.createType(String),
        TargetType: AttributeInfo.createType(ObjectReferenceEntity),
        MacroGraphReference: AttributeInfo.createType(MacroGraphReferenceEntity),
        Enum: AttributeInfo.createType(ObjectReferenceEntity),
        EnumEntries: new AttributeInfo({
            type: [String],
            inlined: true,
        }),
        InputKey: AttributeInfo.createType(SymbolEntity),
        MaterialFunction: AttributeInfo.createType(ObjectReferenceEntity),
        bOverrideFunction: AttributeInfo.createType(Boolean),
        bInternalEvent: AttributeInfo.createType(Boolean),
        bConsumeInput: AttributeInfo.createType(Boolean),
        bExecuteWhenPaused: AttributeInfo.createType(Boolean),
        bOverrideParentBinding: AttributeInfo.createType(Boolean),
        bControl: AttributeInfo.createType(Boolean),
        bAlt: AttributeInfo.createType(Boolean),
        bShift: AttributeInfo.createType(Boolean),
        bCommand: AttributeInfo.createType(Boolean),
        CommentColor: AttributeInfo.createType(LinearColorEntity),
        bCommentBubbleVisible_InDetailsPanel: AttributeInfo.createType(Boolean),
        bColorCommentBubble: AttributeInfo.createType(Boolean),
        ProxyFactoryFunctionName: AttributeInfo.createType(String),
        ProxyFactoryClass: AttributeInfo.createType(ObjectReferenceEntity),
        ProxyClass: AttributeInfo.createType(ObjectReferenceEntity),
        StructType: AttributeInfo.createType(ObjectReferenceEntity),
        MaterialExpression: AttributeInfo.createType(ObjectReferenceEntity),
        MaterialExpressionComment: AttributeInfo.createType(ObjectReferenceEntity),
        MoveMode: AttributeInfo.createType(SymbolEntity),
        TimelineName: AttributeInfo.createType(String),
        TimelineGuid: AttributeInfo.createType(GuidEntity),
        SizeX: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        SizeY: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        Text: AttributeInfo.createType(new MirroredEntity(String)),
        MaterialExpressionEditorX: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        MaterialExpressionEditorY: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        NodeTitle: AttributeInfo.createType(String),
        NodeTitleColor: AttributeInfo.createType(LinearColorEntity),
        PositionX: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        PositionY: AttributeInfo.createType(new MirroredEntity(IntegerEntity)),
        SettingsInterface: AttributeInfo.createType(ObjectReferenceEntity),
        PCGNode: AttributeInfo.createType(ObjectReferenceEntity),
        HiGenGridSize: AttributeInfo.createType(SymbolEntity),
        Operation: AttributeInfo.createType(SymbolEntity),
        NodePosX: AttributeInfo.createType(IntegerEntity),
        NodePosY: AttributeInfo.createType(IntegerEntity),
        NodeHeight: AttributeInfo.createType(IntegerEntity),
        NodeWidth: AttributeInfo.createType(IntegerEntity),
        Graph: AttributeInfo.createType(ObjectReferenceEntity),
        SubgraphInstance: AttributeInfo.createType(String),
        InputPins: new AttributeInfo({
            type: [ObjectReferenceEntity],
            inlined: true,
        }),
        OutputPins: new AttributeInfo({
            type: [ObjectReferenceEntity],
            inlined: true,
        }),
        bExposeToLibrary: AttributeInfo.createType(Boolean),
        bCanRenameNode: AttributeInfo.createType(Boolean),
        bCommentBubblePinned: AttributeInfo.createType(Boolean),
        bCommentBubbleVisible: AttributeInfo.createType(Boolean),
        NodeComment: AttributeInfo.createType(String),
        AdvancedPinDisplay: AttributeInfo.createType(IdentifierEntity),
        DelegateReference: AttributeInfo.createType(VariableReferenceEntity),
        EnabledState: AttributeInfo.createType(IdentifierEntity),
        NodeGuid: AttributeInfo.createType(GuidEntity),
        ErrorType: AttributeInfo.createType(IntegerEntity),
        ErrorMsg: AttributeInfo.createType(String),
        ScriptVariables: new AttributeInfo({
            type: ScriptVariableEntity,
            inlined: true,
        }),
        Node: AttributeInfo.createType(new MirroredEntity(ObjectReferenceEntity)),
        ExportedNodes: AttributeInfo.createType(String),
        CustomProperties: AttributeInfo.createType([new Union(PinEntity, UnknownPinEntity)]),
    }
    static nameRegex = /^(\w+?)(?:_(\d+))?$/
    static sequencerScriptingNameRegex = /\/Script\/SequencerScripting\.MovieSceneScripting(.+)Channel/
    static customPropertyGrammar = Parsernostrum.seq(
        Parsernostrum.reg(/CustomProperties\s+/),
        Grammar.grammarFor(
            undefined,
            this.attributes.CustomProperties.type[0]
        ),
    ).map(([_0, pin]) => values => {
        if (!values.CustomProperties) {
            values.CustomProperties = [];
        }
        values.CustomProperties.push(pin);
    })
    static inlinedArrayEntryGrammar = Parsernostrum.seq(
        Parsernostrum.alt(
            Grammar.symbolQuoted.map(v => [v, true]),
            Grammar.symbol.map(v => [v, false]),
        ),
        Parsernostrum.reg(
            new RegExp(`\\s*\\(\\s*(\\d+)\\s*\\)\\s*\\=\\s*`),
            1
        ).map(Number)
    )
        .chain(
            /** @param {[[String, Boolean], Number]} param */
            ([[symbol, quoted], index]) =>
                Grammar.grammarFor(this.attributes[symbol])
                    .map(currentValue =>
                        values => {
                            (values[symbol] ??= [])[index] = currentValue;
                            Utility.objectSet(values, ["attributes", symbol, "quoted"], quoted);
                            if (!this.attributes[symbol]?.inlined) {
                                if (!values.attributes) {
                                    IEntity.defineAttributes(values, {});
                                }
                                Utility.objectSet(values, ["attributes", symbol, "type"], [currentValue.constructor]);
                                Utility.objectSet(values, ["attributes", symbol, "inlined"], true);
                            }
                        }
                    )
        )
    static grammar = this.createGrammar()

    static createSubObjectGrammar() {
        return Parsernostrum.lazy(() => this.grammar)
            .map(object =>
                values => values[Configuration.subObjectAttributeNameFromEntity(object)] = object
            )
    }

    static createGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.reg(/Begin\s+Object/),
            Parsernostrum.seq(
                Parsernostrum.whitespace,
                Parsernostrum.alt(
                    this.customPropertyGrammar,
                    Grammar.createAttributeGrammar(this),
                    Grammar.createAttributeGrammar(this, Grammar.attributeNameQuoted, undefined, (obj, k, v) =>
                        Utility.objectSet(obj, ["attributes", ...k, "quoted"], true)
                    ),
                    this.inlinedArrayEntryGrammar,
                    this.createSubObjectGrammar()
                )
            )
                .map(([_0, entry]) => entry)
                .many(),
            Parsernostrum.reg(/\s+End\s+Object/),
        )
            .map(([_0, attributes, _2]) => {
                const values = {};
                attributes.forEach(attributeSetter => attributeSetter(values));
                return new this(values)
            })
    }

    /** @param {String} value */
    static keyName(value) {
        /** @type {String} */
        let result = ObjectEntity.#keyName[value];
        if (result) {
            return result
        }
        result = Utility.numberFromText(value)?.toString();
        if (result) {
            return result
        }
        const match = value.match(/NumPad([a-zA-Z]+)/);
        if (match) {
            result = Utility.numberFromText(match[1]).toString();
            if (result) {
                return "Num " + result
            }
        }
    }

    static getMultipleObjectsGrammar() {
        return Parsernostrum.seq(
            Parsernostrum.whitespaceOpt,
            this.createGrammar(),
            Parsernostrum.seq(
                Parsernostrum.whitespace,
                this.createGrammar(),
            )
                .map(([_0, object]) => object)
                .many(),
            Parsernostrum.whitespaceOpt
        )
            .map(([_0, first, remaining, _4]) => [first, ...remaining])
    }

    /** @type {String} */
    #class

    constructor(values = {}, suppressWarns = false) {
        if ("NodePosX" in values !== "NodePosY" in values) {
            const entries = Object.entries(values);
            const [key, position] = "NodePosX" in values
                ? ["NodePosY", Object.keys(values).indexOf("NodePosX") + 1]
                : ["NodePosX", Object.keys(values).indexOf("NodePosY")];
            const entry = [key, new (AttributeInfo.getAttribute(values, key, "type", ObjectEntity))()];
            entries.splice(position, 0, entry);
            values = Object.fromEntries(entries);
        }
        super(values, suppressWarns);

        // Attributes not assigned a strong type in attributes because the names are too generic
        /** @type {Number | MirroredEntity<Boolean>} */ this.R;
        /** @type {Number | MirroredEntity<Boolean>} */ this.G;
        /** @type {Number | MirroredEntity<Boolean>} */ this.B;
        /** @type {Number | MirroredEntity<Boolean>} */ this.A;

        // Attributes
        /** @type {(PinEntity | UnknownPinEntity)[]} */ this.CustomProperties;
        /** @type {Boolean} */ this.bIsPureFunc;
        /** @type {FunctionReferenceEntity} */ this.ComponentPropertyName;
        /** @type {FunctionReferenceEntity} */ this.EventReference;
        /** @type {FunctionReferenceEntity} */ this.FunctionReference;
        /** @type {IdentifierEntity} */ this.AdvancedPinDisplay;
        /** @type {IdentifierEntity} */ this.EnabledState;
        /** @type {IntegerEntity} */ this.NodeHeight;
        /** @type {IntegerEntity} */ this.NodePosX;
        /** @type {IntegerEntity} */ this.NodePosY;
        /** @type {IntegerEntity} */ this.NodeWidth;
        /** @type {LinearColorEntity} */ this.CommentColor;
        /** @type {LinearColorEntity} */ this.NodeTitleColor;
        /** @type {MacroGraphReferenceEntity} */ this.MacroGraphReference;
        /** @type {MirroredEntity} */ this.MaterialExpressionEditorX;
        /** @type {MirroredEntity} */ this.MaterialExpressionEditorY;
        /** @type {MirroredEntity} */ this.SizeX;
        /** @type {MirroredEntity} */ this.SizeY;
        /** @type {MirroredEntity} */ this.Text;
        /** @type {MirroredEntity<IntegerEntity>} */ this.PositionX;
        /** @type {MirroredEntity<IntegerEntity>} */ this.PositionY;
        /** @type {MirroredEntity<ObjectReferenceEntity>} */ this.Node;
        /** @type {null[]} */ this.PinTags;
        /** @type {Number} */ this.NumAdditionalInputs;
        /** @type {ObjectReferenceEntity[]} */ this.InputPins;
        /** @type {ObjectReferenceEntity[]} */ this.OutputPins;
        /** @type {ObjectReferenceEntity} */ this.Archetype;
        /** @type {ObjectReferenceEntity} */ this.BlueprintElementInstance;
        /** @type {ObjectReferenceEntity} */ this.BlueprintElementType;
        /** @type {ObjectReferenceEntity} */ this.Class;
        /** @type {ObjectReferenceEntity} */ this.Enum;
        /** @type {ObjectReferenceEntity} */ this.ExportPath;
        /** @type {ObjectReferenceEntity} */ this.Graph;
        /** @type {ObjectReferenceEntity} */ this.MaterialExpression;
        /** @type {ObjectReferenceEntity} */ this.MaterialExpressionComment;
        /** @type {ObjectReferenceEntity} */ this.MaterialFunction;
        /** @type {ObjectReferenceEntity} */ this.ObjectRef;
        /** @type {ObjectReferenceEntity} */ this.PCGNode;
        /** @type {ObjectReferenceEntity} */ this.SettingsInterface;
        /** @type {ObjectReferenceEntity} */ this.StructType;
        /** @type {ObjectReferenceEntity} */ this.TargetType;
        /** @type {ScriptVariableEntity[]} */ this.ScriptVariables;
        /** @type {String[]} */ this.EnumEntries;
        /** @type {String[]} */ this.PinNames;
        /** @type {String} */ this.CustomFunctionName;
        /** @type {String} */ this.DelegatePropertyName;
        /** @type {String} */ this.ExportedNodes;
        /** @type {String} */ this.InputName;
        /** @type {String} */ this.Name;
        /** @type {String} */ this.NodeComment;
        /** @type {String} */ this.NodeTitle;
        /** @type {String} */ this.Operation;
        /** @type {String} */ this.ProxyFactoryFunctionName;
        /** @type {String} */ this.SubgraphInstance;
        /** @type {String} */ this.Text;
        /** @type {SymbolEntity} */ this.AxisKey;
        /** @type {SymbolEntity} */ this.HiGenGridSize;
        /** @type {SymbolEntity} */ this.InputAxisKey;
        /** @type {SymbolEntity} */ this.InputKey;
        /** @type {SymbolEntity} */ this.InputType;
        /** @type {VariableReferenceEntity} */ this.DelegateReference;
        /** @type {VariableReferenceEntity} */ this.VariableReference;

        // Legacy nodes pins
        if (this["Pins"] instanceof Array) {
            this["Pins"].forEach(
                /** @param {ObjectReferenceEntity} objectReference */
                objectReference => {
                    const pinObject = this[Configuration.subObjectAttributeNameFromReference(objectReference, true)];
                    if (pinObject) {
                        const pinEntity = PinEntity.fromLegacyObject(pinObject);
                        pinEntity.LinkedTo = [];
                        this.getCustomproperties(true).push(pinEntity);
                        Utility.objectSet(this, ["attributes", "CustomProperties", "ignored"], true);
                    }
                }
            );
        }
        /** @type {ObjectEntity} */
        const materialSubobject = this.getMaterialSubobject();
        if (materialSubobject) {
            const obj = materialSubobject;
            obj.SizeX !== undefined && (obj.SizeX.getter = () => this.NodeWidth);
            obj.SizeY && (obj.SizeY.getter = () => this.NodeHeight);
            obj.Text && (obj.Text.getter = () => this.NodeComment);
            obj.MaterialExpressionEditorX && (obj.MaterialExpressionEditorX.getter = () => this.NodePosX);
            obj.MaterialExpressionEditorY && (obj.MaterialExpressionEditorY.getter = () => this.NodePosY);
            if (this.getType() === Configuration.paths.materialExpressionComponentMask) {
                // The following attributes are too generic therefore not assigned a MirroredEntity
                const rgbaPins = Configuration.rgba.map(pinName =>
                    this.getPinEntities().find(pin => pin.PinName === pinName && (pin.recomputesNodeTitleOnChange = true))
                );
                obj.R = new MirroredEntity(Boolean, () => rgbaPins[0].DefaultValue);
                obj.G = new MirroredEntity(Boolean, () => rgbaPins[1].DefaultValue);
                obj.B = new MirroredEntity(Boolean, () => rgbaPins[2].DefaultValue);
                obj.A = new MirroredEntity(Boolean, () => rgbaPins[3].DefaultValue);
            }
        }
        /** @type {ObjectEntity} */
        const pcgObject = this.getPcgSubobject();
        if (pcgObject) {
            pcgObject.PositionX && (pcgObject.PositionX.getter = () => this.NodePosX);
            pcgObject.PositionY && (pcgObject.PositionY.getter = () => this.NodePosY);
            pcgObject.getSubobjects()
                .forEach(
                    /** @param {ObjectEntity} obj */
                    obj => {
                        if (obj.Node !== undefined) {
                            const nodeRef = obj.Node.get();
                            if (
                                nodeRef.type === this.PCGNode.type
                                && nodeRef.path === `${this.Name}.${this.PCGNode.path}`
                            ) {
                                obj.Node.getter = () => new ObjectReferenceEntity({
                                    type: this.PCGNode.type,
                                    path: `${this.Name}.${this.PCGNode.path}`,
                                });
                            }
                        }
                    }
                );

        }
        let inputIndex = 0;
        let outputIndex = 0;
        this.CustomProperties?.forEach((pinEntity, i) => {
            pinEntity.objectEntity = this;
            pinEntity.pinIndex = pinEntity.isInput()
                ? inputIndex++
                : pinEntity.isOutput()
                    ? outputIndex++
                    : i;
        });
    }

    getClass() {
        if (!this.#class) {
            this.#class = (this.Class?.path ? this.Class.path : this.Class?.type)
                ?? (this.ExportPath?.path ? this.ExportPath.path : this.ExportPath?.type)
                ?? "";
            if (this.#class && !this.#class.startsWith("/")) {
                // Old path names did not start with /Script or /Engine, check tests/resources/LegacyNodes.js
                let path = Object.values(Configuration.paths).find(path => path.endsWith("." + this.#class));
                if (path) {
                    this.#class = path;
                }
            }
        }
        return this.#class
    }

    getType() {
        let classValue = this.getClass();
        if (this.MacroGraphReference?.MacroGraph?.path) {
            return this.MacroGraphReference.MacroGraph.path
        }
        if (this.MaterialExpression) {
            return this.MaterialExpression.type
        }
        return classValue
    }

    getObjectName(dropCounter = false) {
        if (dropCounter) {
            return this.getNameAndCounter()[0]
        }
        return this.Name
    }

    /** @returns {[String, Number]} */
    getNameAndCounter() {
        const result = this.getObjectName(false).match(ObjectEntity.nameRegex);
        let name = "";
        let counter = null;
        if (result) {
            if (result.length > 1) {
                name = result[1];
            }
            if (result.length > 2) {
                counter = parseInt(result[2]);
            }
            return [name, counter]
        }
        return ["", 0]
    }

    getCounter() {
        return this.getNameAndCounter()[1]
    }

    getNodeWidth() {
        return this.NodeWidth
            ?? this.isComment() ? Configuration.defaultCommentWidth : undefined
    }

    /** @param {Number} value */
    setNodeWidth(value) {
        if (!this.NodeWidth) {
            this.NodeWidth = new IntegerEntity();
        }
        this.NodeWidth.value = value;
    }

    getNodeHeight() {
        return this.NodeHeight
            ?? this.isComment() ? Configuration.defaultCommentHeight : undefined
    }

    /** @param {Number} value */
    setNodeHeight(value) {
        if (!this.NodeHeight) {
            this.NodeHeight = new IntegerEntity();
        }
        this.NodeHeight.value = value;
    }

    getNodePosX() {
        return this.NodePosX?.value ?? 0
    }

    /** @param {Number} value */
    setNodePosX(value) {
        if (!this.NodePosX) {
            this.NodePosX = new IntegerEntity();
        }
        this.NodePosX.value = Math.round(value);
    }

    getNodePosY() {
        return this.NodePosY?.value ?? 0
    }

    /** @param {Number} value */
    setNodePosY(value) {
        if (!this.NodePosY) {
            this.NodePosY = new IntegerEntity();
        }
        this.NodePosY.value = Math.round(value);
    }

    getCustomproperties(canCreate = false) {
        if (canCreate && !this.CustomProperties) {
            this.CustomProperties = [];
        }
        return this.CustomProperties ?? []
    }

    /** @returns {PinEntity[]} */
    getPinEntities() {
        return this.getCustomproperties().filter(v => v.constructor === PinEntity)
    }

    /** @returns {ObjectEntity[]} */
    getSubobjects() {
        return Object.keys(this)
            .filter(k => k.startsWith(Configuration.subObjectAttributeNamePrefix))
            .flatMap(k => [this[k], .../** @type {ObjectEntity} */(this[k]).getSubobjects()])
    }

    switchTarget() {
        const switchMatch = this.getClass().match(Configuration.switchTargetPattern);
        if (switchMatch) {
            return switchMatch[1]
        }
    }

    isEvent() {
        switch (this.getClass()) {
            case Configuration.paths.actorBoundEvent:
            case Configuration.paths.componentBoundEvent:
            case Configuration.paths.customEvent:
            case Configuration.paths.event:
            case Configuration.paths.inputAxisKeyEvent:
            case Configuration.paths.inputVectorAxisEvent:
                return true
        }
        return false
    }

    isComment() {
        switch (this.getClass()) {
            case Configuration.paths.comment:
            case Configuration.paths.materialGraphNodeComment:
                return true
        }
        return false
    }

    isMaterial() {

        return this.getClass() === Configuration.paths.materialGraphNode
        // return [
        //     Configuration.paths.materialExpressionConstant,
        //     Configuration.paths.materialExpressionConstant2Vector,
        //     Configuration.paths.materialExpressionConstant3Vector,
        //     Configuration.paths.materialExpressionConstant4Vector,
        //     Configuration.paths.materialExpressionLogarithm,
        //     Configuration.paths.materialExpressionLogarithm10,
        //     Configuration.paths.materialExpressionLogarithm2,
        //     Configuration.paths.materialExpressionMaterialFunctionCall,
        //     Configuration.paths.materialExpressionSquareRoot,
        //     Configuration.paths.materialExpressionTextureCoordinate,
        //     Configuration.paths.materialExpressionTextureSample,
        //     Configuration.paths.materialGraphNode,
        //     Configuration.paths.materialGraphNodeComment,
        // ]
        //     .includes(this.getClass())
    }

    /** @return {ObjectEntity} */
    getMaterialSubobject() {
        const expression = this.MaterialExpression ?? this.MaterialExpressionComment;
        return expression
            ? this[Configuration.subObjectAttributeNameFromReference(expression, true)]
            : null
    }

    isPcg() {
        return this.getClass() === Configuration.paths.pcgEditorGraphNode
            || this.getPcgSubobject()
    }

    /** @return {ObjectEntity} */
    getPcgSubobject() {
        const node = this.PCGNode;
        return node
            ? this[Configuration.subObjectAttributeNameFromReference(node, true)]
            : null
    }

    /** @return {ObjectEntity} */
    getSettingsObject() {
        const settings = this.SettingsInterface;
        return settings
            ? this[Configuration.subObjectAttributeNameFromReference(settings, true)]
            : null
    }

    /** @return {ObjectEntity} */
    getSubgraphObject() {
        const node = this.SubgraphInstance;
        return node
            ? this[Configuration.subObjectAttributeNameFromName(node)]
            : null
    }

    isDevelopmentOnly() {
        const nodeClass = this.getClass();
        return this.EnabledState?.toString() === "DevelopmentOnly"
            || nodeClass.includes("Debug", Math.max(0, nodeClass.lastIndexOf(".")))
    }

    getHIDAttribute() {
        return this.InputKey ?? this.AxisKey ?? this.InputAxisKey
    }

    getDelegatePin() {
        return this.getCustomproperties().find(pin => pin.PinType.PinCategory === "delegate")
    }

    /** @returns {String} */
    nodeDisplayName() {
        let input;
        switch (this.getType()) {
            case Configuration.paths.asyncAction:
                if (this.ProxyFactoryFunctionName) {
                    return Utility.formatStringName(this.ProxyFactoryFunctionName)
                }
            case Configuration.paths.actorBoundEvent:
            case Configuration.paths.componentBoundEvent:
                return `${Utility.formatStringName(this.DelegatePropertyName)} (${this.ComponentPropertyName ?? "Unknown"})`
            case Configuration.paths.callDelegate:
                return `Call ${this.DelegateReference?.MemberName ?? "None"}`
            case Configuration.paths.createDelegate:
                return "Create Event"
            case Configuration.paths.customEvent:
                if (this.CustomFunctionName) {
                    return this.CustomFunctionName
                }
            case Configuration.paths.dynamicCast:
                if (!this.TargetType) {
                    return "Bad cast node" // Target type not found
                }
                return `Cast To ${this.TargetType?.getName()}`
            case Configuration.paths.enumLiteral:
                return `Literal enum ${this.Enum?.getName()}`
            case Configuration.paths.event:
                return `Event ${(this.EventReference?.MemberName ?? "").replace(/^Receive/, "")}`
            case Configuration.paths.executionSequence:
                return "Sequence"
            case Configuration.paths.forEachElementInEnum:
                return `For Each ${this.Enum?.getName()}`
            case Configuration.paths.forEachLoopWithBreak:
                return "For Each Loop with Break"
            case Configuration.paths.functionEntry:
                return this.FunctionReference?.MemberName === "UserConstructionScript"
                    ? "Construction Script"
                    : this.FunctionReference?.MemberName
            case Configuration.paths.functionResult:
                return "Return Node"
            case Configuration.paths.ifThenElse:
                return "Branch"
            case Configuration.paths.makeStruct:
                if (this.StructType) {
                    return `Make ${this.StructType.getName()}`
                }
            case Configuration.paths.materialExpressionComponentMask: {
                const materialObject = this.getMaterialSubobject();
                return `Mask ( ${Configuration.rgba
                    .filter(k => /** @type {MirroredEntity} */(materialObject[k]).get() === true)
                    .map(v => v + " ")
                    .join("")})`
            }
            case Configuration.paths.materialExpressionConstant:
                input ??= [this.getCustomproperties().find(pinEntity => pinEntity.PinName == "Value")?.DefaultValue];
            case Configuration.paths.materialExpressionConstant2Vector:
                input ??= [
                    this.getCustomproperties().find(pinEntity => pinEntity.PinName == "X")?.DefaultValue,
                    this.getCustomproperties().find(pinEntity => pinEntity.PinName == "Y")?.DefaultValue,
                ];
            case Configuration.paths.materialExpressionConstant3Vector:
                if (!input) {
                    /** @type {VectorEntity} */
                    const vector = this.getCustomproperties()
                        .find(pinEntity => pinEntity.PinName == "Constant")
                        ?.DefaultValue;
                    input = [vector.X, vector.Y, vector.Z];
                }
            case Configuration.paths.materialExpressionConstant4Vector:
                if (!input) {
                    /** @type {LinearColorEntity} */
                    const vector = this.getCustomproperties()
                        .find(pinEntity => pinEntity.PinName == "Constant")
                        ?.DefaultValue;
                    input = [vector.R, vector.G, vector.B, vector.A].map(v => v.valueOf());
                }
                if (input.length > 0) {
                    return input.map(v => Utility.printExponential(v)).reduce((acc, cur) => acc + "," + cur)
                }
                break
            case Configuration.paths.materialExpressionFunctionInput: {
                const materialObject = this.getMaterialSubobject();
                const inputName = materialObject?.InputName ?? "In";
                const inputType = materialObject?.InputType?.value.match(/^.+?_(\w+)$/)?.[1] ?? "Vector3";
                return `Input ${inputName} (${inputType})`
            }
            case Configuration.paths.materialExpressionLogarithm:
                return "Ln"
            case Configuration.paths.materialExpressionLogarithm10:
                return "Log10"
            case Configuration.paths.materialExpressionLogarithm2:
                return "Log2"
            case Configuration.paths.materialExpressionMaterialFunctionCall:
                const materialFunction = this.getMaterialSubobject()?.MaterialFunction;
                if (materialFunction) {
                    return materialFunction.getName()
                }
                break
            case Configuration.paths.materialExpressionSquareRoot:
                return "Sqrt"
            case Configuration.paths.pcgEditorGraphNodeInput:
                return "Input"
            case Configuration.paths.pcgEditorGraphNodeOutput:
                return "Output"
            case Configuration.paths.spawnActorFromClass:
                return `SpawnActor ${Utility.formatStringName(
                    this.getCustomproperties().find(pinEntity => pinEntity.getType() == "class")?.DefaultObject?.getName()
                    ?? "NONE"
                )}`
            case Configuration.paths.switchEnum:
                return `Switch on ${this.Enum?.getName() ?? "Enum"}`
            case Configuration.paths.switchInteger:
                return `Switch on Int`
            case Configuration.paths.variableGet:
                return ""
            case Configuration.paths.variableSet:
                return "SET"
        }
        let switchTarget = this.switchTarget();
        if (switchTarget) {
            if (switchTarget[0] !== "E") {
                switchTarget = Utility.formatStringName(switchTarget);
            }
            return `Switch on ${switchTarget}`
        }
        if (this.isComment()) {
            return this.NodeComment
        }
        const keyNameSymbol = this.getHIDAttribute();
        if (keyNameSymbol) {
            const keyName = keyNameSymbol.toString();
            let title = ObjectEntity.keyName(keyName) ?? Utility.formatStringName(keyName);
            if (this.getClass() === Configuration.paths.inputDebugKey) {
                title = "Debug Key " + title;
            } else if (this.getClass() === Configuration.paths.getInputAxisKeyValue) {
                title = "Get " + title;
            }
            return title
        }
        if (this.getClass() === Configuration.paths.macro) {
            return Utility.formatStringName(this.MacroGraphReference?.getMacroName())
        }
        if (this.isMaterial() && this.getMaterialSubobject()) {
            let result = this.getMaterialSubobject().nodeDisplayName();
            result = result.match(/Material Expression (.+)/)?.[1] ?? result;
            return result
        }
        if (this.isPcg() && this.getPcgSubobject()) {
            let pcgSubobject = this.getPcgSubobject();
            let result = pcgSubobject.NodeTitle ? pcgSubobject.NodeTitle : pcgSubobject.nodeDisplayName();
            return result
        }
        const subgraphObject = this.getSubgraphObject();
        if (subgraphObject) {
            return subgraphObject.Graph.getName()
        }
        const settingsObject = this.getSettingsObject();
        if (settingsObject) {
            if (settingsObject.ExportPath.type === Configuration.paths.pcgHiGenGridSizeSettings) {
                return `Grid Size: ${(
                    settingsObject.HiGenGridSize?.toString().match(/\d+/)?.[0]?.concat("00")
                    ?? settingsObject.HiGenGridSize?.toString().match(/^\w+$/)?.[0]
                ) ?? "256"}`
            }
            if (settingsObject.BlueprintElementInstance) {
                return Utility.formatStringName(settingsObject.BlueprintElementType.getName())
            }
            if (settingsObject.Operation) {
                const match = settingsObject.Name.match(/PCGMetadata(\w+)Settings_\d+/);
                if (match) {
                    return Utility.formatStringName(match[1] + ": " + settingsObject.Operation)
                }
            }
            const settingsSubgraphObject = settingsObject.getSubgraphObject();
            if (settingsSubgraphObject && settingsSubgraphObject.Graph) {
                return settingsSubgraphObject.Graph.getName()
            }
        }
        let memberName = this.FunctionReference?.MemberName;
        if (memberName) {
            const memberParent = this.FunctionReference.MemberParent?.path ?? "";
            switch (memberName) {
                case "AddKey":
                    let result = memberParent.match(ObjectEntity.sequencerScriptingNameRegex);
                    if (result) {
                        return `Add Key (${Utility.formatStringName(result[1])})`
                    }
                case "Concat_StrStr":
                    return "Append"
            }
            const memberNameTraceLineMatch = memberName.match(Configuration.lineTracePattern);
            if (memberNameTraceLineMatch) {
                return "Line Trace"
                    + (memberNameTraceLineMatch[1] === "Multi" ? " Multi " : " ")
                    + (memberNameTraceLineMatch[2] === ""
                        ? "By Channel"
                        : Utility.formatStringName(memberNameTraceLineMatch[2])
                    )
            }
            switch (memberParent) {
                case Configuration.paths.blueprintGameplayTagLibrary:
                case Configuration.paths.kismetMathLibrary:
                case Configuration.paths.slateBlueprintLibrary:
                case Configuration.paths.timeManagementBlueprintLibrary:
                    const leadingLetter = memberName.match(/[BF]([A-Z]\w+)/);
                    if (leadingLetter) {
                        // Some functions start with B or F (Like FCeil, FMax, BMin)
                        memberName = leadingLetter[1];
                    }
                    switch (memberName) {
                        case "Abs": return "ABS"
                        case "BooleanAND": return "AND"
                        case "BooleanNAND": return "NAND"
                        case "BooleanOR": return "OR"
                        case "Exp": return "e"
                        case "LineTraceSingle": return "Line Trace By Channel"
                        case "Max": return "MAX"
                        case "MaxInt64": return "MAX"
                        case "Min": return "MIN"
                        case "MinInt64": return "MIN"
                        case "Not_PreBool": return "NOT"
                        case "Sin": return "SIN"
                        case "Sqrt": return "SQRT"
                        case "Square": return "^2"
                        // Dot products not respecting MemberName pattern
                        case "CrossProduct2D": return "cross"
                        case "Vector4_CrossProduct3": return "cross3"
                        case "DotProduct2D":
                        case "Vector4_DotProduct":
                            return "dot"
                        case "Vector4_DotProduct3": return "dot3"
                    }
                    if (memberName.startsWith("Add_")) {
                        return "+"
                    }
                    if (memberName.startsWith("And_")) {
                        return "&"
                    }
                    if (memberName.startsWith("Conv_")) {
                        return "" // Conversion nodes do not have visible names
                    }
                    if (memberName.startsWith("Cross_")) {
                        return "cross"
                    }
                    if (memberName.startsWith("Divide_")) {
                        return String.fromCharCode(0x00f7)
                    }
                    if (memberName.startsWith("Dot_")) {
                        return "dot"
                    }
                    if (memberName.startsWith("EqualEqual_")) {
                        return "=="
                    }
                    if (memberName.startsWith("Greater_")) {
                        return ">"
                    }
                    if (memberName.startsWith("GreaterEqual_")) {
                        return ">="
                    }
                    if (memberName.startsWith("Less_")) {
                        return "<"
                    }
                    if (memberName.startsWith("LessEqual_")) {
                        return "<="
                    }
                    if (memberName.startsWith("Multiply_")) {
                        return String.fromCharCode(0x2a2f)
                    }
                    if (memberName.startsWith("Not_")) {
                        return "~"
                    }
                    if (memberName.startsWith("NotEqual_")) {
                        return "!="
                    }
                    if (memberName.startsWith("Or_")) {
                        return "|"
                    }
                    if (memberName.startsWith("Percent_")) {
                        return "%"
                    }
                    if (memberName.startsWith("Subtract_")) {
                        return "-"
                    }
                    if (memberName.startsWith("Xor_")) {
                        return "^"
                    }
                    break
                case Configuration.paths.blueprintSetLibrary:
                    {
                        const setOperationMatch = memberName.match(/Set_(\w+)/);
                        if (setOperationMatch) {
                            return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                        }
                    }
                    break
                case Configuration.paths.blueprintMapLibrary:
                    {
                        const setOperationMatch = memberName.match(/Map_(\w+)/);
                        if (setOperationMatch) {
                            return Utility.formatStringName(setOperationMatch[1]).toUpperCase()
                        }
                    }
                    break
                case Configuration.paths.kismetArrayLibrary:
                    {
                        const arrayOperationMath = memberName.match(/Array_(\w+)/);
                        if (arrayOperationMath) {
                            return arrayOperationMath[1].toUpperCase()
                        }
                    }
                    break
            }
            return Utility.formatStringName(memberName)
        }
        if (this.ObjectRef) {
            return this.ObjectRef.getName()
        }
        return Utility.formatStringName(this.getNameAndCounter()[0])
    }

    nodeColor() {
        switch (this.getType()) {
            case Configuration.paths.materialExpressionConstant2Vector:
            case Configuration.paths.materialExpressionConstant3Vector:
            case Configuration.paths.materialExpressionConstant4Vector:
                return Configuration.nodeColors.yellow
            case Configuration.paths.makeStruct:
                return Configuration.nodeColors.darkBlue
            case Configuration.paths.materialExpressionMaterialFunctionCall:
                return Configuration.nodeColors.blue
            case Configuration.paths.materialExpressionFunctionInput:
                return Configuration.nodeColors.red
            case Configuration.paths.materialExpressionTextureSample:
                return Configuration.nodeColors.darkTurquoise
            case Configuration.paths.materialExpressionTextureCoordinate:
                return Configuration.nodeColors.red
            case Configuration.paths.pcgEditorGraphNodeInput:
            case Configuration.paths.pcgEditorGraphNodeOutput:
                return Configuration.nodeColors.red
        }
        switch (this.getClass()) {
            case Configuration.paths.callFunction:
                return this.bIsPureFunc
                    ? Configuration.nodeColors.green
                    : Configuration.nodeColors.blue
            case Configuration.paths.dynamicCast:
                return Configuration.nodeColors.turquoise
            case Configuration.paths.inputDebugKey:
            case Configuration.paths.inputKey:
                return Configuration.nodeColors.red
            case Configuration.paths.createDelegate:
            case Configuration.paths.enumLiteral:
            case Configuration.paths.makeArray:
            case Configuration.paths.makeMap:
            case Configuration.paths.materialGraphNode:
            case Configuration.paths.select:
                return Configuration.nodeColors.green
            case Configuration.paths.executionSequence:
            case Configuration.paths.ifThenElse:
            case Configuration.paths.macro:
            case Configuration.paths.multiGate:
                return Configuration.nodeColors.gray
            case Configuration.paths.functionEntry:
            case Configuration.paths.functionResult:
                return Configuration.nodeColors.violet
            case Configuration.paths.timeline:
                return Configuration.nodeColors.yellow
        }
        if (this.switchTarget()) {
            return Configuration.nodeColors.lime
        }
        if (this.isEvent()) {
            return Configuration.nodeColors.red
        }
        if (this.isComment()) {
            return (this.CommentColor ? this.CommentColor : LinearColorEntity.getWhite())
                .toDimmedColor()
                .toCSSRGBValues()
        }
        const pcgSubobject = this.getPcgSubobject();
        if (pcgSubobject && pcgSubobject.NodeTitleColor) {
            return pcgSubobject.NodeTitleColor.toDimmedColor(0.1).toCSSRGBValues()
        }
        if (this.bIsPureFunc) {
            return Configuration.nodeColors.green
        }
        return Configuration.nodeColors.blue
    }

    nodeIcon() {
        if (this.isMaterial() || this.isPcg()) {
            return null
        }
        switch (this.getType()) {
            case Configuration.paths.addDelegate:
            case Configuration.paths.asyncAction:
            case Configuration.paths.callDelegate:
            case Configuration.paths.createDelegate:
            case Configuration.paths.functionEntry:
            case Configuration.paths.functionResult:
                return SVGIcon.node
            case Configuration.paths.customEvent: return SVGIcon.event
            case Configuration.paths.doN: return SVGIcon.doN
            case Configuration.paths.doOnce: return SVGIcon.doOnce
            case Configuration.paths.dynamicCast: return SVGIcon.cast
            case Configuration.paths.enumLiteral: return SVGIcon.enum
            case Configuration.paths.event: return SVGIcon.event
            case Configuration.paths.executionSequence:
            case Configuration.paths.multiGate:
                return SVGIcon.sequence
            case Configuration.paths.flipflop:
                return SVGIcon.flipflop
            case Configuration.paths.forEachElementInEnum:
            case Configuration.paths.forLoop:
            case Configuration.paths.forLoopWithBreak:
            case Configuration.paths.whileLoop:
                return SVGIcon.loop
            case Configuration.paths.forEachLoop:
            case Configuration.paths.forEachLoopWithBreak:
                return SVGIcon.forEachLoop
            case Configuration.paths.ifThenElse: return SVGIcon.branchNode
            case Configuration.paths.isValid: return SVGIcon.questionMark
            case Configuration.paths.makeArray: return SVGIcon.makeArray
            case Configuration.paths.makeMap: return SVGIcon.makeMap
            case Configuration.paths.makeSet: return SVGIcon.makeSet
            case Configuration.paths.makeStruct: return SVGIcon.makeStruct
            case Configuration.paths.select: return SVGIcon.select
            case Configuration.paths.spawnActorFromClass: return SVGIcon.spawnActor
            case Configuration.paths.timeline: return SVGIcon.timer
        }
        if (this.switchTarget()) {
            return SVGIcon.switch
        }
        if (this.nodeDisplayName().startsWith("Break")) {
            return SVGIcon.breakStruct
        }
        if (this.getClass() === Configuration.paths.macro) {
            return SVGIcon.macro
        }
        const hidValue = this.getHIDAttribute()?.toString();
        if (hidValue) {
            if (hidValue.includes("Mouse")) {
                return SVGIcon.mouse
            } else if (hidValue.includes("Gamepad_Special")) {
                return SVGIcon.keyboard // This is called Touchpad in UE
            } else if (hidValue.includes("Gamepad") || hidValue.includes("Steam")) {
                return SVGIcon.gamepad
            } else if (hidValue.includes("Touch")) {
                return SVGIcon.touchpad
            } else {
                return SVGIcon.keyboard
            }
        }
        if (this.getDelegatePin()) {
            return SVGIcon.event
        }
        if (this.ObjectRef?.type === Configuration.paths.ambientSound) {
            return SVGIcon.sound
        }
        return SVGIcon.functionSymbol
    }

    additionalPinInserter() {
        /** @type {() => PinEntity[]} */
        let pinEntities;
        /** @type {(pinEntity: PinEntity) => Number} */
        let pinIndexFromEntity;
        /** @type {(newPinIndex: Number, minIndex: Number, maxIndex: Number) => String} */
        let pinNameFromIndex;
        switch (this.getType()) {
            case Configuration.paths.commutativeAssociativeBinaryOperator:
            case Configuration.paths.promotableOperator:
                switch (this.FunctionReference?.MemberName) {
                    default:
                        if (
                            !this.FunctionReference?.MemberName?.startsWith("Add_")
                            && !this.FunctionReference?.MemberName?.startsWith("Subtract_")
                            && !this.FunctionReference?.MemberName?.startsWith("Multiply_")
                            && !this.FunctionReference?.MemberName?.startsWith("Divide_")
                        ) {
                            break
                        }
                    case "And_Int64Int64":
                    case "And_IntInt":
                    case "BMax":
                    case "BMin":
                    case "BooleanAND":
                    case "BooleanNAND":
                    case "BooleanOR":
                    case "Concat_StrStr":
                    case "FMax":
                    case "FMin":
                    case "Max":
                    case "MaxInt64":
                    case "Min":
                    case "MinInt64":
                    case "Or_Int64Int64":
                    case "Or_IntInt":

                        pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isInput());
                        pinIndexFromEntity ??= pinEntity =>
                            pinEntity.PinName.match(/^\s*([A-Z])\s*$/)?.[1]?.charCodeAt(0) - "A".charCodeAt(0);
                        pinNameFromIndex ??= (index, min = -1, max = -1) => {
                            const result = String.fromCharCode(index >= 0 ? index : max + "A".charCodeAt(0) + 1);
                            this.NumAdditionalInputs = pinEntities().length - 1;
                            return result
                        };
                        break
                }
                break
            case Configuration.paths.multiGate:
                pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isOutput());
                pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.match(/^\s*Out[_\s]+(\d+)\s*$/i)?.[1]);
                pinNameFromIndex ??= (index, min = -1, max = -1) =>
                    `Out ${index >= 0 ? index : min > 0 ? "Out 0" : max + 1}`;
                break
            case Configuration.paths.switchInteger:
                pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isOutput());
                pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.match(/^\s*(\d+)\s*$/)?.[1]);
                pinNameFromIndex ??= (index, min = -1, max = -1) => (index < 0 ? max + 1 : index).toString();
                break
            case Configuration.paths.switchGameplayTag:
                pinNameFromIndex ??= (index, min = -1, max = -1) => {
                    const result = `Case_${index >= 0 ? index : min > 0 ? "0" : max + 1}`;
                    this.PinNames ??= [];
                    this.PinNames.push(result);
                    delete this.PinTags[this.PinTags.length - 1];
                    this.PinTags[this.PinTags.length] = null;
                    return result
                };
            case Configuration.paths.switchName:
            case Configuration.paths.switchString:
                pinEntities ??= () => this.getPinEntities().filter(pinEntity => pinEntity.isOutput());
                pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.match(/^\s*Case[_\s]+(\d+)\s*$/i)?.[1]);
                pinNameFromIndex ??= (index, min = -1, max = -1) => {
                    const result = `Case_${index >= 0 ? index : min > 0 ? "0" : max + 1}`;
                    this.PinNames ??= [];
                    this.PinNames.push(result);
                    return result
                };
                break
        }
        if (pinEntities) {
            return () => {
                let min = Number.MAX_SAFE_INTEGER;
                let max = Number.MIN_SAFE_INTEGER;
                let values = [];
                const modelPin = pinEntities().reduce(
                    (acc, cur) => {
                        const value = pinIndexFromEntity(cur);
                        if (!isNaN(value)) {
                            values.push(value);
                            min = Math.min(value, min);
                            if (value > max) {
                                max = value;
                                return cur
                            }
                        } else if (acc === undefined) {
                            return cur
                        }
                        return acc
                    },
                    undefined
                );
                if (min === Number.MAX_SAFE_INTEGER || max === Number.MIN_SAFE_INTEGER) {
                    min = undefined;
                    max = undefined;
                }
                if (!modelPin) {
                    return null
                }
                values.sort((a, b) => a < b ? -1 : a === b ? 0 : 1);
                let prev = values[0];
                let index = values.findIndex(
                    // Search for a gap
                    value => {
                        const result = value - prev > 1;
                        prev = value;
                        return result
                    }
                );
                const newPin = new PinEntity(modelPin);
                newPin.PinId = GuidEntity.generateGuid();
                newPin.PinName = pinNameFromIndex(index, min, max);
                newPin.PinToolTip = undefined;
                this.getCustomproperties(true).push(newPin);
                return newPin
            }
        }
    }
}

class KnotEntity extends ObjectEntity {

    /**
     * @param {Object} values
     * @param {PinEntity} pinReferenceForType
     */
    constructor(values = {}, pinReferenceForType = undefined) {
        values.Class = new ObjectReferenceEntity(Configuration.paths.knot);
        values.Name = "K2Node_Knot";
        const inputPinEntity = new PinEntity(
            { PinName: "InputPin" },
            true
        );
        const outputPinEntity = new PinEntity(
            {
                PinName: "OutputPin",
                Direction: "EGPD_Output",
            },
            true
        );
        if (pinReferenceForType) {
            inputPinEntity.copyTypeFrom(pinReferenceForType);
            outputPinEntity.copyTypeFrom(pinReferenceForType);
        }
        values["CustomProperties"] = [inputPinEntity, outputPinEntity];
        super(values, true);
    }
}

/**
 * @typedef {{
 *     consumeEvent?: Boolean,
 *     listenOnFocus?: Boolean,
 *     unlistenOnTextEdit?: Boolean,
 * }} Options
 */

/** @template {Element} T */
class IInput {

    /** @type {T} */
    #target
    get target() {
        return this.#target
    }

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }

    consumeEvent

    /** @type {Object} */
    options


    listenHandler = () => this.listenEvents()
    unlistenHandler = () => this.unlistenEvents()

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.consumeEvent ??= false;
        options.listenOnFocus ??= false;
        options.unlistenOnTextEdit ??= false;
        this.#target = target;
        this.#blueprint = blueprint;
        this.consumeEvent = options.consumeEvent;
        this.options = options;
    }

    setup() {
        if (this.options.listenOnFocus) {
            this.blueprint.addEventListener(Configuration.focusEventName.begin, this.listenHandler);
            this.blueprint.addEventListener(Configuration.focusEventName.end, this.unlistenHandler);
        }
        if (this.options.unlistenOnTextEdit) {
            this.blueprint.addEventListener(Configuration.editTextEventName.begin, this.unlistenHandler);
            this.blueprint.addEventListener(Configuration.editTextEventName.end, this.listenHandler);
        }
        if (this.blueprint.focused) {
            this.listenEvents();
        }
    }

    cleanup() {
        this.unlistenEvents();
        this.blueprint.removeEventListener(Configuration.focusEventName.begin, this.listenHandler);
        this.blueprint.removeEventListener(Configuration.focusEventName.end, this.unlistenHandler);
        this.blueprint.removeEventListener(Configuration.editTextEventName.begin, this.unlistenHandler);
        this.blueprint.removeEventListener(Configuration.editTextEventName.end, this.listenHandler);
    }

    /* Subclasses will probabily override the following methods */
    listenEvents() {
    }

    unlistenEvents() {
    }
}

class KeyBindingEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ActionName: AttributeInfo.createValue(""),
        bShift: AttributeInfo.createValue(false),
        bCtrl: AttributeInfo.createValue(false),
        bAlt: AttributeInfo.createValue(false),
        bCmd: AttributeInfo.createValue(false),
        Key: AttributeInfo.createType(IdentifierEntity),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.alt(
            IdentifierEntity.grammar.map(identifier => new this({
                Key: identifier
            })),
            Grammar.createEntityGrammar(this)
        )
    }

    constructor(values = {}) {
        super(values, true);
        /** @type {String} */ this.ActionName;
        /** @type {Boolean} */ this.bShift;
        /** @type {Boolean} */ this.bCtrl;
        /** @type {Boolean} */ this.bAlt;
        /** @type {Boolean} */ this.bCmd;
        /** @type {IdentifierEntity} */ this.Key;
    }
}

/**
 * @typedef {import("../IInput.js").Options & {
 *     activationKeys?: String | KeyBindingEntity | (String | KeyBindingEntity)[],
 *     consumeEvent?: Boolean,
 *     listenOnFocus?: Boolean,
 *     unlistenOnTextEdit?: Boolean,
 * }} Options
 */

/**
 * @template {Element} T
 * @extends IInput<T>
 */
class KeyboardShortcut extends IInput {

    static #ignoreEvent =
        /** @param {KeyboardShortcut} self */
        self => { }

    /** @type {KeyBindingEntity[]} */
    #activationKeys

    pressedKey = ""

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(
        target,
        blueprint,
        options = {},
        onKeyDown = KeyboardShortcut.#ignoreEvent,
        onKeyUp = KeyboardShortcut.#ignoreEvent
    ) {
        options.activationKeys ??= [];
        options.consumeEvent ??= true;
        options.listenOnFocus ??= true;
        options.unlistenOnTextEdit ??= true; // No shortcuts when inside of a text field
        if (!(options.activationKeys instanceof Array)) {
            options.activationKeys = [options.activationKeys];
        }
        options.activationKeys = options.activationKeys.map(v => {
            if (v instanceof KeyBindingEntity) {
                return v
            }
            if (v.constructor === String) {
                const parsed = KeyBindingEntity.grammar.run(v);
                if (parsed.status) {
                    return parsed.value
                }
            }
            throw new Error("Unexpected key value")
        });

        super(target, blueprint, options);
        this.onKeyDown = onKeyDown;
        this.onKeyUp = onKeyUp;

        this.#activationKeys = this.options.activationKeys ?? [];

        const wantsShift = keyEntry => keyEntry.bShift || keyEntry.Key == "LeftShift" || keyEntry.Key == "RightShift";
        const wantsCtrl = keyEntry => keyEntry.bCtrl || keyEntry.Key == "LeftControl" || keyEntry.Key == "RightControl";
        const wantsAlt = keyEntry => keyEntry.bAlt || keyEntry.Key == "LeftAlt" || keyEntry.Key == "RightAlt";

        let self = this;
        /** @param {KeyboardEvent} e */
        this.keyDownHandler = e => {
            if (
                self.#activationKeys.some(keyEntry =>
                    wantsShift(keyEntry) == e.shiftKey
                    && wantsCtrl(keyEntry) == e.ctrlKey
                    && wantsAlt(keyEntry) == e.altKey
                    && Configuration.Keys[keyEntry.Key.value] == e.code
                )
            ) {
                if (this.consumeEvent) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
                this.pressedKey = e.code;
                self.fire();
                document.removeEventListener("keydown", self.keyDownHandler);
                document.addEventListener("keyup", self.keyUpHandler);
            }
        };

        /** @param {KeyboardEvent} e */
        this.keyUpHandler = e => {
            if (
                self.#activationKeys.some(keyEntry =>
                    keyEntry.bShift && e.key == "Shift"
                    || keyEntry.bCtrl && e.key == "Control"
                    || keyEntry.bAlt && e.key == "Alt"
                    || keyEntry.bCmd && e.key == "Meta"
                    || Configuration.Keys[keyEntry.Key.value] == e.code
                )
            ) {
                if (this.consumeEvent) {
                    e.stopImmediatePropagation();
                }
                self.unfire();
                this.pressedKey = "";
                document.removeEventListener("keyup", this.keyUpHandler);
                document.addEventListener("keydown", this.keyDownHandler);
            }
        };
    }

    listenEvents() {
        document.addEventListener("keydown", this.keyDownHandler);
    }

    unlistenEvents() {
        document.removeEventListener("keydown", this.keyDownHandler);
    }

    /* Subclasses can override */

    fire() {
        this.onKeyDown(this);
    }

    unfire() {
        this.onKeyUp(this);
    }
}

/**
 * @typedef {import("../IInput.js").Options & {
 *     ignoreTranslateCompensate?: Boolean,
 *     ignoreScale?: Boolean,
 *     movementSpace?: HTMLElement,
 *     enablerKey?: KeyboardShortcut,
 * }} Options
 */

/**
 * @template {Element} T
 * @extends {IInput<T>}
 */
class IPointing extends IInput {

    #location = /** @type {Coordinates} */([0, 0])
    get location() {
        return this.#location
    }

    /** @type {KeyboardShortcut?} */
    #enablerKey
    get enablerKey() {
        return this.#enablerKey
    }
    #enablerActivated = true
    get enablerActivated() {
        return this.#enablerActivated
    }

    /**
     * @param {T} target
     * @param {Blueprint} blueprint 
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.ignoreTranslateCompensate ??= false;
        options.ignoreScale ??= false;
        options.movementSpace ??= blueprint.getGridDOMElement() ?? document.documentElement;
        super(target, blueprint, options);
        /** @type {HTMLElement} */
        this.movementSpace = options.movementSpace;
        if (options.enablerKey) {
            this.#enablerKey = options.enablerKey;
            this.#enablerKey.onKeyDown = () => this.#enablerActivated = true;
            this.#enablerKey.onKeyUp = () => this.#enablerActivated = false;
            this.#enablerKey.consumeEvent = false;
            this.#enablerKey.listenEvents();
            this.#enablerActivated = false;
        }
    }

    /** @param {MouseEvent} mouseEvent */
    setLocationFromEvent(mouseEvent) {
        let location = Utility.convertLocation(
            [mouseEvent.clientX, mouseEvent.clientY],
            this.movementSpace,
            this.options.ignoreScale
        );
        location = this.options.ignoreTranslateCompensate
            ? location
            : this.blueprint.compensateTranslation(location[0], location[1]);
        this.#location = [...location];
        return this.#location
    }
}

/**
 * @typedef {import("./IMouseClickDrag.js").Options & {
* }} Options
*/

/**
 * @template {Element} T
 * @extends {IPointing<T>}
 */
class MouseClick extends IPointing {

    static #ignoreEvent =
        /** @param {MouseClick} self */
        self => { }

    /** @param {MouseEvent} e */
    #mouseDownHandler = e => {
        this.blueprint.setFocused(true);
        if (this.enablerKey && !this.enablerActivated) {
            return
        }
        switch (e.button) {
            case this.options.clickButton:
                // Either doesn't matter or consider the click only when clicking on the target, not descandants
                if (!this.options.strictTarget || e.target === e.currentTarget) {
                    if (this.consumeEvent) {
                        e.stopImmediatePropagation(); // Captured, don't call anyone else
                    }
                    // Attach the listeners
                    document.addEventListener("mouseup", this.#mouseUpHandler);
                    this.setLocationFromEvent(e);
                    this.clickedPosition[0] = this.location[0];
                    this.clickedPosition[1] = this.location[1];
                    this.blueprint.mousePosition[0] = this.location[0];
                    this.blueprint.mousePosition[1] = this.location[1];
                    this.clicked(this.clickedPosition);
                }
                break
            default:
                if (!this.options.exitAnyButton) {
                    this.#mouseUpHandler(e);
                }
                break
        }
    }

    /** @param {MouseEvent} e */
    #mouseUpHandler = e => {
        if (!this.options.exitAnyButton || e.button == this.options.clickButton) {
            if (this.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            // Remove the handlers of "mousemove" and "mouseup"
            document.removeEventListener("mouseup", this.#mouseUpHandler);
            this.unclicked();
        }
    }

    clickedPosition = [0, 0]

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(
        target,
        blueprint,
        options = {},
        onClick = MouseClick.#ignoreEvent,
        onUnclick = MouseClick.#ignoreEvent,
    ) {
        options.clickButton ??= Configuration.mouseClickButton;
        options.consumeEvent ??= true;
        options.exitAnyButton ??= true;
        options.strictTarget ??= false;
        super(target, blueprint, options);
        this.onClick = onClick;
        this.onUnclick = onUnclick;
        this.listenEvents();
    }

    listenEvents() {
        this.target.addEventListener("mousedown", this.#mouseDownHandler);
        if (this.options.clickButton === Configuration.mouseRightClickButton) {
            this.target.addEventListener("contextmenu", e => e.preventDefault());
        }
    }

    unlistenEvents() {
        this.target.removeEventListener("mousedown", this.#mouseDownHandler);
    }

    /* Subclasses will override the following methods */
    clicked(location) {
        this.onClick(this);
    }

    unclicked(location) {
        this.onUnclick(this);
    }
}

/**
 * @typedef {import("./IPointing.js").Options & {
 *     consumeEvent?: Boolean,
 *     strictTarget?: Boolean,
* }} Options
*/

/**
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
 */
class MouseDbClick extends IPointing {

    /** @param {Coordinates} location */
    static ignoreDbClick = location => { }

    /** @param {MouseEvent} e */
    #mouseDbClickHandler = e => {
        if (!this.options.strictTarget || e.target === e.currentTarget) {
            if (this.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            this.clickedPosition = this.setLocationFromEvent(e);
            this.blueprint.mousePosition = [...this.clickedPosition];
            this.dbclicked(this.clickedPosition);
        }
    }

    #onDbClick
    get onDbClick() {
        return this.#onDbClick
    }
    set onDbClick(value) {
        this.#onDbClick = value;
    }

    clickedPosition = /** @type {Coordinates} */([0, 0])

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}, onDbClick = MouseDbClick.ignoreDbClick) {
        options.consumeEvent ??= true;
        options.strictTarget ??= false;
        super(target, blueprint, options);
        this.#onDbClick = onDbClick;
        this.listenEvents();
    }

    listenEvents() {
        this.target.addEventListener("dblclick", this.#mouseDbClickHandler);
    }

    unlistenEvents() {
        this.target.removeEventListener("dblclick", this.#mouseDbClickHandler);
    }

    /* Subclasses will override the following method */
    /** @param {Coordinates} location */
    dbclicked(location) {
        this.onDbClick(location);
    }
}

/** @template {IElement} ElementT */
class ITemplate {

    /** @type {ElementT} */
    element

    get blueprint() {
        return this.element.blueprint
    }

    /** @type {IInput[]} */
    #inputObjects = []
    get inputObjects() {
        return this.#inputObjects
    }

    /** @param {ElementT} element */
    initialize(element) {
        this.element = element;
    }

    createInputObjects() {
        return /** @type {IInput[]} */([])
    }

    setup() {
        this.#inputObjects.forEach(v => v.setup());
    }

    cleanup() {
        this.#inputObjects.forEach(v => v.cleanup());
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
    }

    render() {
        return x``
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
    }

    inputSetup() {
        this.#inputObjects = this.createInputObjects();
    }
}

/**
 * @template {IFromToPositionedElement} T
 * @extends {ITemplate<T>}
 */
class IFromToPositionedTemplate extends ITemplate {

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        const [fromX, fromY, toX, toY] = [
            Math.round(this.element.fromX),
            Math.round(this.element.fromY),
            Math.round(this.element.toX),
            Math.round(this.element.toY),
        ];
        const [left, top, width, height] = [
            Math.min(fromX, toX),
            Math.min(fromY, toY),
            Math.abs(fromX - toX),
            Math.abs(fromY - toY),
        ];
        if (changedProperties.has("fromX") || changedProperties.has("toX")) {
            this.element.style.left = `${left}px`;
            this.element.style.width = `${width}px`;
        }
        if (changedProperties.has("fromY") || changedProperties.has("toY")) {
            this.element.style.top = `${top}px`;
            this.element.style.height = `${height}px`;
        }
    }
}

/** @extends {IFromToPositionedTemplate<LinkElement>} */
class LinkTemplate extends IFromToPositionedTemplate {

    /**
     * Returns a function providing the inverse multiplication y = a / x + q. The value of a and q are calculated using
     * the derivative of that function y' = -a / x^2 at the point p (x = p[0] and y = p[1]). This means
     * y'(p[0]) = m => -a / p[0]^2 = m => a = -m * p[0]^2. Now, in order to determine q we can use the starting
     * function: p[1] = a / p[0] + q => q = p[1] - a / p[0]
     * @param {Number} m slope
     * @param {Coordinates} p reference point
     */
    static decreasingValue(m, p) {
        const a = -m * p[0] ** 2;
        const q = p[1] - a / p[0];
        /** @param {Number} x */
        return x => a / x + q
    }

    /**
     * Returns a function providing a clamped line passing through two points. It is clamped after and before the
     * points. It is easier explained with the following ascii draw.
     *          b ______
     *           /
     *          /
     *         /
     *  ______/ a
     */
    static clampedLine(a, b) {
        if (a[0] > b[0]) {
            const temp = a;
            a = b;
            b = temp;
        }
        const m = (b[1] - a[1]) / (b[0] - a[0]);
        const q = a[1] - m * a[0];
        return x => x < a[0]
            ? a[1]
            : x > b[0]
                ? b[1]
                : m * x + q
    }

    static c1DecreasingValue = LinkTemplate.decreasingValue(-0.15, [100, 15])

    static c2DecreasingValue = LinkTemplate.decreasingValue(-0.05, [500, 130])

    static c2Clamped = LinkTemplate.clampedLine([0, 80], [200, 40])

    #uniqueId = `ueb-id-${Math.floor(Math.random() * 1E12)}`

    /** @param {Coordinates} location */
    #createKnot = location => {
        const knotEntity = new KnotEntity({}, this.element.source.entity);
        const knot = /** @type {NodeElementConstructor} */(ElementFactory.getConstructor("ueb-node"))
            .newObject(knotEntity);
        knot.setLocation(...this.blueprint.snapToGrid(...location));
        const knotTemplate = /** @type {KnotNodeTemplate} */(knot.template);
        this.blueprint.addGraphElement(knot); // Important: keep it before changing existing links
        const inputPin = this.element.getInputPin();
        const outputPin = this.element.getOutputPin();
        this.element.source = null;
        this.element.destination = null;
        const link = /** @type {LinkElementConstructor} */(ElementFactory.getConstructor("ueb-link"))
            .newObject(outputPin, knotTemplate.inputPin);
        this.blueprint.addGraphElement(link);
        this.element.source = knotTemplate.outputPin;
        this.element.destination = inputPin;
    }

    createInputObjects() {
        /** @type {HTMLElement} */
        const linkArea = this.element.querySelector(".ueb-link-area");
        return [
            ...super.createInputObjects(),
            new MouseDbClick(
                linkArea,
                this.blueprint,
                undefined,
                /** @param {Coordinates} location */
                location => {
                    location[0] += Configuration.knotOffset[0];
                    location[1] += Configuration.knotOffset[1];
                    location = Utility.snapToGrid(location[0], location[1], Configuration.gridSize);
                    this.#createKnot(location);
                },
            ),
            new MouseClick(
                linkArea,
                this.blueprint,
                {
                    enablerKey: new KeyboardShortcut(this.blueprint, this.blueprint, {
                        activationKeys: Shortcuts.enableLinkDelete,
                    })
                },
                () => this.blueprint.removeGraphElement(this.element),
            ),
        ]
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        const sourcePin = this.element.source;
        const destinationPin = this.element.destination;
        if (changedProperties.has("fromX") || changedProperties.has("toX")) {
            const from = this.element.fromX;
            const to = this.element.toX;
            const isSourceAKnot = sourcePin?.nodeElement.getType() == Configuration.paths.knot;
            const isDestinationAKnot = destinationPin?.nodeElement.getType() == Configuration.paths.knot;
            if (isSourceAKnot && (!destinationPin || isDestinationAKnot)) {
                if (sourcePin?.isInput() && to > from + Configuration.distanceThreshold) {
                    this.element.source = /** @type {KnotNodeTemplate} */(sourcePin.nodeElement.template).outputPin;
                } else if (sourcePin?.isOutput() && to < from - Configuration.distanceThreshold) {
                    this.element.source = /** @type {KnotNodeTemplate} */(sourcePin.nodeElement.template).inputPin;
                }
            }
            if (isDestinationAKnot && (!sourcePin || isSourceAKnot)) {
                if (destinationPin?.isInput() && to < from - Configuration.distanceThreshold) {
                    this.element.destination =
                        /** @type {KnotNodeTemplate} */(destinationPin.nodeElement.template).outputPin;
                } else if (destinationPin?.isOutput() && to > from + Configuration.distanceThreshold) {
                    this.element.destination =
                        /** @type {KnotNodeTemplate} */(destinationPin.nodeElement.template).inputPin;
                }
            }
        }
        const dx = Math.max(Math.abs(this.element.fromX - this.element.toX), 1);
        const dy = Math.max(Math.abs(this.element.fromY - this.element.toY), 1);
        const width = Math.max(dx, Configuration.linkMinWidth);
        // const height = Math.max(Math.abs(link.fromY - link.toY), 1)
        const fillRatio = dx / width;
        const xInverted = this.element.originatesFromInput
            ? this.element.fromX < this.element.toX
            : this.element.toX < this.element.fromX;
        this.element.startPixels = dx < width // If under minimum width
            ? (width - dx) / 2 // Start from half the empty space
            : 0; // Otherwise start from the beginning
        this.element.startPercentage = xInverted ? this.element.startPixels + fillRatio * 100 : this.element.startPixels;
        const c1 =
            this.element.startPercentage
            + (xInverted
                ? LinkTemplate.c1DecreasingValue(width)
                : 10
            )
            * fillRatio;
        const aspectRatio = dy / Math.max(30, dx);
        const c2 =
            LinkTemplate.c2Clamped(dx)
            * Utility.sigmoidPositive(fillRatio * 1.2 + aspectRatio * 0.5, 1.5, 1.8)
            + this.element.startPercentage;
        this.element.svgPathD = Configuration.linkRightSVGPath(this.element.startPercentage, c1, c2);
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("originatesFromInput")) {
            this.element.style.setProperty("--ueb-from-input", this.element.originatesFromInput ? "1" : "0");
        }
        const referencePin = this.element.source ?? this.element.destination;
        if (referencePin) {
            this.element.style.setProperty("--ueb-link-color-rgb", Utility.printLinearColor(referencePin.color));
        }
        this.element.style.setProperty("--ueb-y-reflected", `${this.element.fromY > this.element.toY ? 1 : 0}`);
        this.element.style.setProperty("--ueb-start-percentage", `${Math.round(this.element.startPercentage)}%`);
        this.element.style.setProperty("--ueb-link-start", `${Math.round(this.element.startPixels)}`);
    }

    render() {
        return x`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path id="${this.#uniqueId}" fill="none" vector-effect="non-scaling-stroke" d="${this.element.svgPathD}" />
                <use href="#${this.#uniqueId}" class="ueb-link-area" pointer-events="all" />
                <use href="#${this.#uniqueId}" class="ueb-link-path" pointer-events="none" />
            </svg>
            ${this.element.linkMessageIcon || this.element.linkMessageText ? x`
                <div class="ueb-link-message">
                    ${this.element.linkMessageIcon !== A ? x`
                        <span class="ueb-link-message-icon">${this.element.linkMessageIcon}</span>
                    ` : A}
                    ${this.element.linkMessageText !== A ? x`
                        <span class="ueb-link-message-text">${this.element.linkMessageText}</span>
                    ` : A}
                </div>
            ` : A}
        `
    }
}

/** @extends {IFromToPositionedElement<Object, LinkTemplate>} */
class LinkElement extends IFromToPositionedElement {

    static properties = {
        ...super.properties,
        dragging: {
            type: Boolean,
            attribute: "data-dragging",
            converter: Utility.booleanConverter,
            reflect: true,
        },
        originatesFromInput: {
            type: Boolean,
            attribute: false,
        },
        svgPathD: {
            type: String,
            attribute: false,
        },
        linkMessageIcon: {
            type: String,
            attribute: false,
        },
        linkMessageText: {
            type: String,
            attribute: false,
        },
    }

    /** @type {PinElement} */
    #source
    get source() {
        return this.#source
    }
    set source(pin) {
        this.#setPin(pin, false);
    }

    /** @type {PinElement} */
    #destination
    get destination() {
        return this.#destination
    }
    set destination(pin) {
        this.#setPin(pin, true);
    }

    #nodeDeleteHandler = () => this.remove()
    /** @param {UEBDragEvent} e */
    #nodeDragSourceHandler = e => this.addSourceLocation(...e.detail.value)
    /** @param {UEBDragEvent} e */
    #nodeDragDestinatonHandler = e => this.addDestinationLocation(...e.detail.value)
    #nodeReflowSourceHandler = e => this.setSourceLocation()
    #nodeReflowDestinatonHandler = e => this.setDestinationLocation()

    /** @type {TemplateResult | nothing} */
    linkMessageIcon = A
    /** @type {TemplateResult | nothing} */
    linkMessageText = A

    /** @type {SVGPathElement} */
    pathElement

    constructor() {
        super();
        this.dragging = false;
        this.originatesFromInput = false;
        this.startPercentage = 0;
        this.svgPathD = "";
        this.startPixels = 0;
    }

    /**
     * @param {PinElement} source
     * @param {PinElement?} destination
     */
    static newObject(source, destination) {
        const result = new LinkElement();
        result.initialize(source, destination);
        return result
    }

    /**
     * @param {PinElement} source
     * @param {PinElement?} destination
     */
    // @ts-expect-error
    initialize(source, destination) {
        super.initialize({}, new LinkTemplate());
        if (source) {
            this.source = source;
            if (!destination) {
                this.toX = this.fromX;
                this.toY = this.fromY;
            }
        }
        if (destination) {
            this.destination = destination;
            if (!source) {
                this.fromX = this.toX;
                this.fromY = this.toY;
            }
        }
    }

    /**
     * @param {PinElement} pin
     * @param {Boolean} isDestinationPin
     */
    #setPin(pin, isDestinationPin) {
        const getCurrentPin = () => isDestinationPin ? this.destination : this.source;
        if (getCurrentPin() == pin) {
            return
        }
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement();
            nodeElement.removeEventListener(Configuration.removeEventName, this.#nodeDeleteHandler);
            nodeElement.removeEventListener(
                Configuration.nodeDragEventName,
                isDestinationPin ? this.#nodeDragDestinatonHandler : this.#nodeDragSourceHandler
            );
            nodeElement.removeEventListener(
                Configuration.nodeReflowEventName,
                isDestinationPin ? this.#nodeReflowDestinatonHandler : this.#nodeReflowSourceHandler
            );
            this.#unlinkPins();
        }
        isDestinationPin
            ? this.#destination = pin
            : this.#source = pin;
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement();
            nodeElement.addEventListener(Configuration.removeEventName, this.#nodeDeleteHandler);
            nodeElement.addEventListener(
                Configuration.nodeDragEventName,
                isDestinationPin ? this.#nodeDragDestinatonHandler : this.#nodeDragSourceHandler
            );
            nodeElement.addEventListener(
                Configuration.nodeReflowEventName,
                isDestinationPin ? this.#nodeReflowDestinatonHandler : this.#nodeReflowSourceHandler
            );
            isDestinationPin
                ? this.setDestinationLocation()
                : (this.setSourceLocation(), this.originatesFromInput = this.source.isInput());
            this.#linkPins();
        }
    }

    #linkPins() {
        if (this.source && this.destination) {
            this.source.linkTo(this.destination);
            this.destination.linkTo(this.source);
        }
    }

    #unlinkPins() {
        if (this.source && this.destination) {
            this.source.unlinkFrom(this.destination, false);
            this.destination.unlinkFrom(this.source, false);
        }
    }

    cleanup() {
        super.cleanup();
        this.#unlinkPins();
        this.source = null;
        this.destination = null;
    }

    /** @param {Coordinates} location */
    setSourceLocation(location = null, canPostpone = true) {
        if (location == null) {
            const self = this;
            if (canPostpone && (!this.hasUpdated || !this.source.hasUpdated)) {
                Promise.all([this.updateComplete, this.source.updateComplete])
                    .then(() => self.setSourceLocation(null, false));
                return
            }
            location = this.source.template.getLinkLocation();
        }
        const [x, y] = location;
        this.fromX = x;
        this.fromY = y;
    }

    /** @param {Coordinates} location */
    setDestinationLocation(location = null, canPostpone = true) {
        if (location == null) {
            const self = this;
            if (canPostpone && (!this.hasUpdated || !this.destination.hasUpdated)) {
                Promise.all([this.updateComplete, this.destination.updateComplete])
                    .then(() => self.setDestinationLocation(null, false));
                return
            }
            location = this.destination.template.getLinkLocation();
        }
        this.toX = location[0];
        this.toY = location[1];
    }

    getInputPin() {
        if (this.source?.isInput()) {
            return this.source
        }
        return this.destination
    }

    /** @param {PinElement} pin */
    setInputPin(pin) {
        if (this.source?.isInput()) {
            this.source = pin;
        }
        this.destination = pin;
    }

    getOutputPin() {
        if (this.destination?.isOutput()) {
            return this.destination
        }
        return this.source
    }

    /** @param {PinElement} pin */
    setOutputPin(pin) {
        if (this.destination?.isOutput()) {
            this.destination = pin;
        }
        this.source = pin;
    }

    startDragging() {
        this.dragging = true;
    }

    finishDragging() {
        this.dragging = false;
    }

    removeMessage() {
        this.linkMessageIcon = A;
        this.linkMessageText = A;
    }

    setMessageConvertType() {
        this.linkMessageIcon = SVGIcon.convert;
        this.linkMessageText = x`Convert ${this.source.pinType} to ${this.destination.pinType}.`;
    }

    setMessageCorrect() {
        this.linkMessageIcon = SVGIcon.correct;
        this.linkMessageText = A;
    }

    setMessageReplace() {
        this.linkMessageIcon = SVGIcon.correct;
        this.linkMessageText = A;
    }

    setMessageDirectionsIncompatible() {
        this.linkMessageIcon = SVGIcon.reject;
        this.linkMessageText = x`Directions are not compatbile.`;
    }

    setMessagePlaceNode() {
        this.linkMessageIcon = A;
        this.linkMessageText = x`Place a new node.`;
    }

    setMessageReplaceLink() {
        this.linkMessageIcon = SVGIcon.correct;
        this.linkMessageText = x`Replace existing input connections.`;
    }

    setMessageReplaceOutputLink() {
        this.linkMessageIcon = SVGIcon.correct;
        this.linkMessageText = x`Replace existing output connections.`;
    }

    setMessageSameNode() {
        this.linkMessageIcon = SVGIcon.reject;
        this.linkMessageText = x`Both are on the same node.`;
    }

    /**
     * @param {PinElement} a
     * @param {PinElement} b
     */
    setMessageTypesIncompatible(a, b) {
        this.linkMessageIcon = SVGIcon.reject;
        this.linkMessageText =
            x`${Utility.capitalFirstLetter(a.pinType)} is not compatible with ${Utility.capitalFirstLetter(b.pinType)}.`;
    }
}

/**
 * @template {IEntity} T
 * @template {IDraggableTemplate} U
 * @extends {IElement<T, U>}
 */
class IDraggableElement extends IElement {

    static properties = {
        ...super.properties,
        locationX: {
            type: Number,
            attribute: false,
        },
        locationY: {
            type: Number,
            attribute: false,
        },
        sizeX: {
            type: Number,
            attribute: false,
        },
        sizeY: {
            type: Number,
            attribute: false,
        },
    }
    static dragEventName = Configuration.dragEventName
    static dragGeneralEventName = Configuration.dragGeneralEventName

    constructor() {
        super();
        this.locationX = 0;
        this.locationY = 0;
        this.sizeX = 0;
        this.sizeY = 0;
    }

    computeSizes() {
        const bounding = this.getBoundingClientRect();
        this.sizeX = this.blueprint.scaleCorrect(bounding.width);
        this.sizeY = this.blueprint.scaleCorrect(bounding.height);
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.computeSizes();
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    setLocation(x, y, acknowledge = true) {
        const dx = x - this.locationX;
        const dy = y - this.locationY;
        this.locationX = x;
        this.locationY = y;
        if (this.blueprint && acknowledge) {
            const dragLocalEvent = new CustomEvent(
                /** @type {typeof IDraggableElement} */(this.constructor).dragEventName,
                {
                    detail: {
                        value: [dx, dy],
                    },
                    bubbles: false,
                    cancelable: true,
                }
            );
            this.dispatchEvent(dragLocalEvent);
        }
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    addLocation(x, y, acknowledge = true) {
        this.setLocation(this.locationX + x, this.locationY + y, acknowledge);
    }

    /** @param {Coordinates} value */
    acknowledgeDrag(value) {
        const dragEvent = new CustomEvent(
            /** @type {typeof IDraggableElement} */(this.constructor).dragGeneralEventName,
            {
                detail: {
                    value: value
                },
                bubbles: true,
                cancelable: true
            }
        );
        this.dispatchEvent(dragEvent);
    }

    snapToGrid() {
        const snappedLocation = Utility.snapToGrid(this.locationX, this.locationY, Configuration.gridSize);
        if (this.locationX != snappedLocation[0] || this.locationY != snappedLocation[1]) {
            this.setLocation(snappedLocation[0], snappedLocation[1]);
        }
    }

    topBoundary(justSelectableArea = false) {
        return this.template.topBoundary(justSelectableArea)
    }

    rightBoundary(justSelectableArea = false) {
        return this.template.rightBoundary(justSelectableArea)
    }

    bottomBoundary(justSelectableArea = false) {
        return this.template.bottomBoundary(justSelectableArea)
    }

    leftBoundary(justSelectableArea = false) {
        return this.template.leftBoundary(justSelectableArea)
    }
}

/**
 * @typedef {import("./IPointing.js").Options & {
 *     clickButton?: Number,
 *     consumeEvent?: Boolean,
 *     draggableElement?: HTMLElement,
 *     exitAnyButton?: Boolean,
 *     moveEverywhere?: Boolean,
 *     movementSpace?: HTMLElement,
 *     repositionOnClick?: Boolean,
 *     scrollGraphEdge?: Boolean,
 *     strictTarget?: Boolean,
 *     stepSize?: Number,
 * }} Options
 */

/**
 * @template {IElement} T
 * @extends {IPointing<T>}
 */
class IMouseClickDrag extends IPointing {

    /** @param {MouseEvent} e  */
    #mouseDownHandler = e => {
        this.blueprint.setFocused(true);
        switch (e.button) {
            case this.options.clickButton:
                // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                if (!this.options.strictTarget || e.target == e.currentTarget) {
                    if (this.consumeEvent) {
                        e.stopImmediatePropagation(); // Captured, don't call anyone else
                    }
                    // Attach the listeners
                    this.#movementListenedElement.addEventListener("mousemove", this.#mouseStartedMovingHandler);
                    document.addEventListener("mouseup", this.#mouseUpHandler);
                    this.setLocationFromEvent(e);
                    this.clickedPosition[0] = this.location[0];
                    this.clickedPosition[1] = this.location[1];
                    this.blueprint.mousePosition[0] = this.location[0];
                    this.blueprint.mousePosition[1] = this.location[1];
                    if (this.target instanceof IDraggableElement) {
                        this.clickedOffset = [
                            this.clickedPosition[0] - this.target.locationX,
                            this.clickedPosition[1] - this.target.locationY,
                        ];
                    }
                    this.clicked(this.clickedPosition);
                }
                break
            default:
                if (!this.options.exitAnyButton) {
                    this.#mouseUpHandler(e);
                }
                break
        }
    }

    /** @param {MouseEvent} e  */
    #mouseStartedMovingHandler = e => {
        if (this.consumeEvent) {
            e.stopImmediatePropagation(); // Captured, don't call anyone else
        }
        // Delegate from now on to this.#mouseMoveHandler
        this.#movementListenedElement.removeEventListener("mousemove", this.#mouseStartedMovingHandler);
        this.#movementListenedElement.addEventListener("mousemove", this.#mouseMoveHandler);
        // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
        const dragEvent = this.getEvent(Configuration.trackingMouseEventName.begin);
        this.#trackingMouse = this.target.dispatchEvent(dragEvent) == false;
        this.setLocationFromEvent(e);
        // Do actual actions
        this.lastLocation = Utility.snapToGrid(this.clickedPosition[0], this.clickedPosition[1], this.stepSize);
        this.startDrag(this.location);
        this.started = true;
        this.#mouseMoveHandler(e);
    }

    /** @param {MouseEvent} e  */
    #mouseMoveHandler = e => {
        if (this.consumeEvent) {
            e.stopImmediatePropagation(); // Captured, don't call anyone else
        }
        const location = this.setLocationFromEvent(e);
        const movement = [e.movementX, e.movementY];
        this.dragTo(location, movement);
        if (this.#trackingMouse) {
            this.blueprint.mousePosition = location;
        }
        if (this.options.scrollGraphEdge) {
            const movementNorm = Math.sqrt(movement[0] * movement[0] + movement[1] * movement[1]);
            const threshold = this.blueprint.scaleCorrect(Configuration.edgeScrollThreshold);
            const leftThreshold = this.blueprint.template.gridLeftVisibilityBoundary() + threshold;
            const rightThreshold = this.blueprint.template.gridRightVisibilityBoundary() - threshold;
            let scrollX = 0;
            if (location[0] < leftThreshold) {
                scrollX = location[0] - leftThreshold;
            } else if (location[0] > rightThreshold) {
                scrollX = location[0] - rightThreshold;
            }
            const topThreshold = this.blueprint.template.gridTopVisibilityBoundary() + threshold;
            const bottomThreshold = this.blueprint.template.gridBottomVisibilityBoundary() - threshold;
            let scrollY = 0;
            if (location[1] < topThreshold) {
                scrollY = location[1] - topThreshold;
            } else if (location[1] > bottomThreshold) {
                scrollY = location[1] - bottomThreshold;
            }
            scrollX = Utility.clamp(this.blueprint.scaleCorrectReverse(scrollX) ** 3 * movementNorm * 0.6, -20, 20);
            scrollY = Utility.clamp(this.blueprint.scaleCorrectReverse(scrollY) ** 3 * movementNorm * 0.6, -20, 20);
            this.blueprint.scrollDelta(scrollX, scrollY);
        }
    }

    /** @param {MouseEvent} e  */
    #mouseUpHandler = e => {
        if (!this.options.exitAnyButton || e.button == this.options.clickButton) {
            if (this.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            // Remove the handlers of "mousemove" and "mouseup"
            this.#movementListenedElement.removeEventListener("mousemove", this.#mouseStartedMovingHandler);
            this.#movementListenedElement.removeEventListener("mousemove", this.#mouseMoveHandler);
            document.removeEventListener("mouseup", this.#mouseUpHandler);
            if (this.started) {
                this.endDrag();
            }
            this.unclicked();
            if (this.#trackingMouse) {
                const dragEvent = this.getEvent(Configuration.trackingMouseEventName.end);
                this.target.dispatchEvent(dragEvent);
                this.#trackingMouse = false;
            }
            this.started = false;
        }
    }

    #trackingMouse = false
    #movementListenedElement
    #draggableElement
    get draggableElement() {
        return this.#draggableElement
    }

    clickedOffset = /** @type {Coordinates} */([0, 0])
    clickedPosition = /** @type {Coordinates} */([0, 0])
    lastLocation = /** @type {Coordinates} */([0, 0])
    started = false
    stepSize = 1

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.clickButton ??= Configuration.mouseClickButton;
        options.consumeEvent ??= true;
        options.draggableElement ??= target;
        options.exitAnyButton ??= true;
        options.moveEverywhere ??= false;
        options.movementSpace ??= blueprint?.getGridDOMElement();
        options.repositionOnClick ??= false;
        options.scrollGraphEdge ??= false;
        options.strictTarget ??= false;
        super(target, blueprint, options);
        this.stepSize = Number(options.stepSize ?? Configuration.gridSize);
        this.#movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace;
        this.#draggableElement = /** @type {HTMLElement} */(this.options.draggableElement);

        this.listenEvents();
    }

    listenEvents() {
        super.listenEvents();
        this.#draggableElement.addEventListener("mousedown", this.#mouseDownHandler);
        if (this.options.clickButton === Configuration.mouseRightClickButton) {
            this.#draggableElement.addEventListener("contextmenu", e => e.preventDefault());
        }
    }

    unlistenEvents() {
        super.unlistenEvents();
        this.#draggableElement.removeEventListener("mousedown", this.#mouseDownHandler);
    }

    getEvent(eventName) {
        return new CustomEvent(eventName, {
            detail: {
                tracker: this
            },
            bubbles: true,
            cancelable: true
        })
    }

    /* Subclasses will override the following methods */
    clicked(location) {
    }

    startDrag(location) {
    }

    dragTo(location, offset) {
    }

    endDrag() {
    }

    unclicked(location) {
    }
}

/** @typedef {import("./IMouseClickDrag.js").Options} Options */

/**
 * @template {IDraggableElement} T
 * @extends {IMouseClickDrag<T>}
 */
class MouseMoveDraggable extends IMouseClickDrag {

    /** @param {Coordinates} location */
    clicked(location) {
        if (this.options.repositionOnClick) {
            this.target.setLocation(...(this.stepSize > 1
                ? Utility.snapToGrid(location[0], location[1], this.stepSize)
                : location
            ));
            this.clickedOffset = [0, 0];
        }
    }

    /**
     * @param {Coordinates} location
     * @param {Coordinates} offset
     */
    dragTo(location, offset) {
        const targetLocation = [
            this.target.locationX ?? this.lastLocation[0],
            this.target.locationY ?? this.lastLocation[1],
        ];
        const [adjustedLocation, adjustedTargetLocation] = this.stepSize > 1
            ? [
                Utility.snapToGrid(location[0], location[1], this.stepSize),
                Utility.snapToGrid(targetLocation[0], targetLocation[1], this.stepSize)
            ]
            : [location, targetLocation];
        offset = [
            adjustedLocation[0] - this.lastLocation[0],
            adjustedLocation[1] - this.lastLocation[1],
        ];
        if (offset[0] == 0 && offset[1] == 0) {
            return
        }
        // Make sure it snaps on the grid
        offset[0] += adjustedTargetLocation[0] - targetLocation[0];
        offset[1] += adjustedTargetLocation[1] - targetLocation[1];
        this.dragAction(adjustedLocation, offset);
        // Reassign the position of mouse
        this.lastLocation = adjustedLocation;
    }

    /**
     * @param {Coordinates} location
     * @param {Coordinates} offset
     */
    dragAction(location, offset) {
        this.target.setLocation(location[0] - this.clickedOffset[0], location[1] - this.clickedOffset[1]);
    }
}

/**
 * @typedef {import("./MouseMoveDraggable.js").Options & {
 *     onClicked?: () => void,
 *     onStartDrag?: () => void,
 *     onDrag?: (location: Coordinates, movement: Coordinates) => void,
 *     onEndDrag?: () => void,
* }} Options
*/

class MouseClickDrag extends MouseMoveDraggable {

    #onClicked
    #onStartDrag
    #onDrag
    #onEndDrag

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        super(target, blueprint, options);
        if (options.onClicked) {
            this.#onClicked = options.onClicked;
        }
        if (options.onStartDrag) {
            this.#onStartDrag = options.onStartDrag;
        }
        if (options.onDrag) {
            this.#onDrag = options.onDrag;
        }
        if (options.onEndDrag) {
            this.#onEndDrag = options.onEndDrag;
        }
    }

    /** @param {Coordinates} location */
    clicked(location) {
        super.clicked(location);
        this.#onClicked?.();
    }

    startDrag() {
        super.startDrag();
        this.#onStartDrag?.();
    }

    /**
     * @param {Coordinates} location
     * @param {Coordinates} movement
     */
    dragAction(location, movement) {
        this.#onDrag?.(location, movement);
    }

    endDrag() {
        super.endDrag();
        this.#onEndDrag?.();
    }
}

/** @typedef {import("./IMouseClickDrag.js").Options} Options */

/** @extends {MouseMoveDraggable<NodeElement>} */
class MouseMoveNodes extends MouseMoveDraggable {

    /**
     * @param {NodeElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        super(target, blueprint, options);
        this.draggableElement.classList.add("ueb-draggable");
    }

    startDrag() {
        if (!this.target.selected) {
            this.blueprint.unselectAll();
            this.target.setSelected(true);
        }
    }

    dragAction(location, offset) {
        this.target.acknowledgeDrag(offset);
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll();
            this.target.setSelected(true);
        } else {
            this.blueprint.getNodes(true).forEach(node =>
                node.boundComments
                    .filter(comment => !node.isInsideComment(comment))
                    .forEach(comment => node.unbindFromComment(comment))
            );
            this.blueprint.getCommentNodes().forEach(comment =>
                /** @type {CommentNodeTemplate} */(comment.template).manageNodesBind()
            );
        }
    }
}

/**
 * @template {IDraggableElement} T
 * @extends {ITemplate<T>}
 */
class IDraggableTemplate extends ITemplate {

    /** @returns {HTMLElement} */
    getDraggableElement() {
        return this.element
    }

    createDraggableObject() {
        const draggableElement = this.getDraggableElement();
        return new MouseMoveDraggable(this.element, this.blueprint, { draggableElement })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            this.createDraggableObject(),
            new KeyboardShortcut(
                this.element,
                this.blueprint,
                {
                    activationKeys: [
                        Configuration.Keys.ArrowUp,
                        Configuration.Keys.ArrowRight,
                        Configuration.Keys.ArrowDown,
                        Configuration.Keys.ArrowLeft,
                    ]
                },
                self => self.target.acknowledgeDrag([
                    self.pressedKey === Configuration.Keys.ArrowLeft
                        ? -Configuration.gridSize
                        : self.pressedKey === Configuration.Keys.ArrowRight
                            ? Configuration.gridSize
                            : 0,
                    self.pressedKey === Configuration.Keys.ArrowUp
                        ? -Configuration.gridSize
                        : self.pressedKey === Configuration.Keys.ArrowDown
                            ? Configuration.gridSize
                            : 0,
                ])
            )
        ]
    }

    topBoundary(justSelectableArea = false) {
        return this.element.locationY
    }

    rightBoundary(justSelectableArea = false) {
        return this.element.locationX + this.element.sizeX
    }

    bottomBoundary(justSelectableArea = false) {
        return this.element.locationY + this.element.sizeY
    }

    leftBoundary(justSelectableArea = false) {
        return this.element.locationX
    }

    centerInViewport() {
        const minMargin = Math.min(
            this.blueprint.template.viewportSize[0] / 10,
            this.blueprint.template.viewportSize[1] / 10
        );
        const dl = this.leftBoundary() - this.blueprint.template.gridLeftVisibilityBoundary();
        const dr = this.blueprint.template.gridRightVisibilityBoundary() - this.rightBoundary();
        let avgX = Math.max((dl + dr) / 2, minMargin);
        const dt = this.topBoundary() - this.blueprint.template.gridTopVisibilityBoundary();
        const db = this.blueprint.template.gridBottomVisibilityBoundary() - this.bottomBoundary();
        let avgY = Math.max((dt + db) / 2, minMargin);
        this.blueprint.scrollDelta(dl - avgX, dt - avgY, true);
    }
}

/**
 * @template {IDraggableElement} T
 * @extends {IDraggableTemplate<T>}
 */
class IDraggablePositionedTemplate extends IDraggableTemplate {

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("locationX")) {
            this.element.style.left = `${this.element.locationX}px`;
        }
        if (changedProperties.has("locationY")) {
            this.element.style.top = `${this.element.locationY}px`;
        }
    }
}

/**
 * @template {NodeElement} T
 * @extends {IDraggablePositionedTemplate<T>}
 */
class ISelectableDraggableTemplate extends IDraggablePositionedTemplate {

    /** @returns {HTMLElement} */
    getDraggableElement() {
        return this.element
    }

    createDraggableObject() {
        return /** @type {MouseMoveDraggable} */(new MouseMoveNodes(this.element, this.blueprint, {
            draggableElement: this.getDraggableElement(),
            scrollGraphEdge: true,
        }))
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        if (this.element.selected && !this.element.listeningDrag) {
            this.element.setSelected(true);
        }
    }
}

/** @extends {ISelectableDraggableTemplate<NodeElement>} */
class NodeTemplate extends ISelectableDraggableTemplate {

    static nodeStyleClasses = ["ueb-node-style-default"]

    #hasSubtitle = false

    /** @type {() => PinEntity} */
    pinInserter

    /** @type {HTMLElement} */
    inputContainer

    /** @type {HTMLElement} */
    outputContainer

    /** @type {PinElement} */
    pinElement

    addPinHandler = () => {
        const pin = this.pinInserter?.();
        if (pin) {
            if (this.defaultPin && this.defaultPin.isInput() === pin.isInput()) {
                this.defaultPin.before(this.createPinElement(pin));
            } else {
                (pin.isInput() ? this.inputContainer : this.outputContainer).appendChild(this.createPinElement(pin));
            }
            this.element.acknowledgeReflow();
        }
    }

    toggleAdvancedDisplayHandler = () => {
        this.element.toggleShowAdvancedPinDisplay();
        this.element.requestUpdate();
        this.element.updateComplete.then(() => this.element.acknowledgeReflow());
    }

    /** @param {PinEntity} pinEntity */
    createPinElement(pinEntity) {
        const pinElement = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
            .newObject(pinEntity, undefined, this.element);
        if (this.pinInserter && !this.defaultPin && pinElement.getPinName() === "Default") {
            this.defaultPin = pinElement;
            this.defaultPin.classList.add("ueb-node-variadic-default");
        }
        return pinElement
    }

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        this.element.classList.add(.../** @type {typeof NodeTemplate} */(this.constructor).nodeStyleClasses);
        this.element.style.setProperty("--ueb-node-color", this.getColor().cssText);
        this.pinInserter = this.element.entity.additionalPinInserter();
        if (this.pinInserter) {
            this.element.classList.add("ueb-node-is-variadic");
        }
    }

    getColor() {
        return this.element.entity.nodeColor()
    }

    render() {
        return x`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">${this.renderTop()}</div>
                    <div class="ueb-node-inputs"></div>
                    <div class="ueb-node-outputs"></div>
                    ${this.pinInserter ? x`
                        <div class="ueb-node-variadic" @click="${this.addPinHandler}">
                            Add pin ${SVGIcon.plusCircle}
                        </div>
                    `: A}
                    ${this.element.entity.isDevelopmentOnly() ? x`
                        <div class="ueb-node-developmentonly">
                            <span class="ueb-node-developmentonly-text">Development Only</span>
                        </div>
                    ` : A}
                    ${this.element.advancedPinDisplay ? x`
                        <div class="ueb-node-expansion" @click="${this.toggleAdvancedDisplayHandler}">
                            ${SVGIcon.expandIcon}
                        </div>
                    ` : A}
                </div>
            </div>
        `
    }

    renderNodeIcon() {
        return this.element.entity.nodeIcon()
    }

    renderNodeName() {
        return this.element.nodeDisplayName
    }

    renderTop() {
        const icon = this.renderNodeIcon();
        const name = this.renderNodeName();
        return x`
            <div class="ueb-node-name">
                ${icon ? x`
                    <div class="ueb-node-name-symbol">${icon}</div>
                ` : A}
                ${name ? x`
                    <div class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                        ${name}
                        ${this.#hasSubtitle && this.getTargetType().length > 0 ? x`
                            <div class="ueb-node-subtitle-text ueb-ellipsis-nowrap-text">
                                Target is ${Utility.formatStringName(this.getTargetType())}
                            </div>
                        `: A}
                    </div>
                ` : A}
            </div>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.inputContainer = this.element.querySelector(".ueb-node-inputs");
        this.outputContainer = this.element.querySelector(".ueb-node-outputs");
        this.setupPins();
        this.element.updateComplete.then(() => this.element.acknowledgeReflow());
    }

    setupPins() {
        this.element.nodeNameElement = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-name-text"));
        let hasInput = false;
        let hasOutput = false;
        for (const p of this.element.getPinElements()) {
            if (p === this.defaultPin) {
                continue
            }
            if (p.isInput()) {
                this.inputContainer.appendChild(p);
                hasInput = true;
            } else if (p.isOutput()) {
                this.outputContainer.appendChild(p);
                hasOutput = true;
            }
        }
        if (this.defaultPin) {
            (this.defaultPin.isInput() ? this.inputContainer : this.outputContainer).appendChild(this.defaultPin);
        }
        if (hasInput) {
            this.element.classList.add("ueb-node-has-inputs");
        }
        if (hasOutput) {
            this.element.classList.add("ueb-node-has-outputs");
        }
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden())
            .map(pinEntity => {
                this.#hasSubtitle = this.#hasSubtitle
                    || pinEntity.PinName === "self" && pinEntity.pinDisplayName() === "Target";
                return this.createPinElement(pinEntity)
            })
    }

    getTargetType() {
        return this.element.entity.FunctionReference?.MemberParent?.getName() ?? "Untitled"
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }

    linksChanged() { }
}

class IResizeableTemplate extends NodeTemplate {

    #THandler = document.createElement("div")
    #RHandler = document.createElement("div")
    #BHandler = document.createElement("div")
    #LHandler = document.createElement("div")
    #TRHandler = document.createElement("div")
    #BRHandler = document.createElement("div")
    #BLHandler = document.createElement("div")
    #TLHandler = document.createElement("div")

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        this.element.classList.add("ueb-resizeable");
        this.#THandler.classList.add("ueb-resizeable-top");
        this.#RHandler.classList.add("ueb-resizeable-right");
        this.#BHandler.classList.add("ueb-resizeable-bottom");
        this.#LHandler.classList.add("ueb-resizeable-left");
        this.#TRHandler.classList.add("ueb-resizeable-top-right");
        this.#BRHandler.classList.add("ueb-resizeable-bottom-right");
        this.#BLHandler.classList.add("ueb-resizeable-bottom-left");
        this.#TLHandler.classList.add("ueb-resizeable-top-left");
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        if (this.element.sizeX >= 0 && changedProperties.has("sizeX")) {
            this.element.style.width = `${this.element.sizeX}px`;
        }
        if (this.element.sizeY >= 0 && changedProperties.has("sizeY")) {
            this.element.style.height = `${this.element.sizeY}px`;
        }
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.element.append(
            this.#THandler,
            this.#RHandler,
            this.#BHandler,
            this.#LHandler,
            this.#TRHandler,
            this.#BRHandler,
            this.#BLHandler,
            this.#TLHandler
        );
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseClickDrag(this.#THandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[1] = location[1] - this.element.topBoundary();
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation(0, movement[1], false);
                    }
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#RHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary();
                    this.setSizeX(this.element.sizeX + movement[0]);
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#BHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[1] = location[1] - this.element.bottomBoundary();
                    this.setSizeY(this.element.sizeY + movement[1]);
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#LHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary();
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation(movement[0], 0, false);
                    }
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#TRHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary();
                    movement[1] = location[1] - this.element.topBoundary();
                    this.setSizeX(this.element.sizeX + movement[0]);
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation(0, movement[1], false);
                    }
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#BRHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary();
                    movement[1] = location[1] - this.element.bottomBoundary();
                    this.setSizeX(this.element.sizeX + movement[0]);
                    this.setSizeY(this.element.sizeY + movement[1]);
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#BLHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary();
                    movement[1] = location[1] - this.element.bottomBoundary();
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation(movement[0], 0, false);
                    }
                    this.setSizeY(this.element.sizeY + movement[1]);
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#TLHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary();
                    movement[1] = location[1] - this.element.topBoundary();
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation(movement[0], 0, false);
                    }
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation(0, movement[1], false);
                    }
                },
                onEndDrag: () => this.endResize(),
            }),
        ]
    }

    /** @param {Number} value */
    setSizeX(value) {
        this.element.setNodeWidth(value);
        return true
    }

    /** @param {Number} value */
    setSizeY(value) {
        this.element.setNodeHeight(value);
        return true
    }

    endResize() {
    }
}

class CommentNodeTemplate extends IResizeableTemplate {

    #selectableAreaHeight = 0

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        element.classList.add("ueb-node-style-comment", "ueb-node-resizeable");
        element.sizeX = 25 * Configuration.gridSize;
        element.sizeY = 6 * Configuration.gridSize;
        super.initialize(element); // Keep it at the end because it calls this.getColor() where this.#color must be initialized
    }

    /** @returns {HTMLElement} */
    getDraggableElement() {
        return this.element.querySelector(".ueb-node-top")
    }

    render() {
        return x`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top"
                        .innerText="${Utility.encodeHTMLWhitespace(this.element.entity.NodeComment)}">
                    </div>
                </div>
            </div>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        const bounding = this.getDraggableElement().getBoundingClientRect();
        this.#selectableAreaHeight = bounding.height;
    }

    manageNodesBind() {
        let nodes = this.blueprint.getNodes();
        for (let node of nodes) {
            if (
                node.topBoundary() >= this.element.topBoundary()
                && node.rightBoundary() <= this.element.rightBoundary()
                && node.bottomBoundary() <= this.element.bottomBoundary()
                && node.leftBoundary() >= this.element.leftBoundary()
            ) {
                node.bindToComment(this.element);
            } else {
                node.unbindFromComment(this.element);
            }
        }
    }

    /** @param {Number} value */
    setSizeX(value) {
        value = Math.round(value);
        if (value >= 2 * Configuration.gridSize) {
            this.element.setNodeWidth(value);
            return true
        }
        return false
    }

    /** @param {Number} value */
    setSizeY(value) {
        value = Math.round(value);
        if (value >= 2 * Configuration.gridSize) {
            this.element.setNodeHeight(value);
            return true
        }
        return false
    }

    endResize() {
        this.manageNodesBind();
    }

    topBoundary(justSelectableArea = false) {
        return this.element.locationY
    }

    rightBoundary(justSelectableArea = false) {
        return this.element.locationX + this.element.sizeX
    }

    bottomBoundary(justSelectableArea = false) {
        return justSelectableArea
            ? this.element.locationY + this.#selectableAreaHeight
            : super.bottomBoundary()
    }

    leftBoundary(justSelectableArea = false) {
        return this.element.locationX
    }
}

/**
 * @typedef {import("./IMouseClickDrag.js").Options & {
 *     scrollGraphEdge?: Boolean,
* }} Options
*/

/** @extends IMouseClickDrag<PinElement> */
class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    /** @type {PinElement} */
    #knotPin = null

    /** @param {MouseEvent} e */
    #mouseenterHandler = e => {
        if (!this.enteredPin) {
            this.linkValid = false;
            this.enteredPin = /** @type {PinElement} */(e.target);
            const a = this.link.source ?? this.target; // Remember target might have change
            const b = this.enteredPin;
            const outputPin = a.isOutput() ? a : b;
            if (
                a.nodeElement.getType() === Configuration.paths.knot
                || b.nodeElement.getType() === Configuration.paths.knot
            ) {
                // A knot can be linked to any pin, it doesn't matter the type or input/output direction
                this.link.setMessageCorrect();
                this.linkValid = true;
            } else if (a.getNodeElement() === b.getNodeElement()) {
                this.link.setMessageSameNode();
            } else if (a.isOutput() === b.isOutput()) {
                this.link.setMessageDirectionsIncompatible();
            } else if (this.blueprint.getLinks(a, b).length) {
                this.link.setMessageReplaceLink();
                this.linkValid = true;
            } else if (outputPin.entity.getType() === "exec" && outputPin.isLinked) {
                this.link.setMessageReplaceOutputLink();
                this.linkValid = true;
            } else if (
                (a.entity.PinType.PinCategory != "object" || b.entity.PinType.PinCategory != "object")
                && a.pinType != b.pinType
            ) {
                this.link.setMessageTypesIncompatible(a, b);
                this.linkValid = false;
            } else {
                this.link.setMessageCorrect();
                this.linkValid = true;
            }
        }
    }

    /** @param {MouseEvent} e */
    #mouseleaveHandler = e => {
        if (this.enteredPin == e.target) {
            this.enteredPin = null;
            this.linkValid = false;
            this.link?.setMessagePlaceNode();
        }
    }

    /** @type {LinkElement?} */
    link

    /** @type {PinElement?} */
    enteredPin

    linkValid = false

    /**
     * @param {PinElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.scrollGraphEdge ??= true;
        super(target, blueprint, options);
    }

    startDrag(location) {
        if (this.target.nodeElement.getType() == Configuration.paths.knot) {
            this.#knotPin = this.target;
        }
        /** @type {LinkElement} */
        this.link = /** @type {LinkElementConstructor} */(ElementFactory.getConstructor("ueb-link"))
            .newObject(this.target, null);
        this.blueprint.template.linksContainerElement.prepend(this.link);
        this.link.setMessagePlaceNode();
        this.#listenedPins = this.blueprint.querySelectorAll("ueb-pin");
        this.#listenedPins.forEach(pin => {
            if (pin != this.target) {
                pin.addEventListener("mouseenter", this.#mouseenterHandler);
                pin.addEventListener("mouseleave", this.#mouseleaveHandler);
            }
        });
        this.link.startDragging();
        this.link.setDestinationLocation(location);
    }

    dragTo(location, movement) {
        this.link.setDestinationLocation(location);
    }

    endDrag() {
        this.#listenedPins.forEach(pin => {
            pin.removeEventListener("mouseenter", this.#mouseenterHandler);
            pin.removeEventListener("mouseleave", this.#mouseleaveHandler);
        });
        this.#listenedPins = null;
        if (this.enteredPin && this.linkValid) {
            if (this.#knotPin) {
                const otherPin = this.#knotPin !== this.link.source ? this.link.source : this.enteredPin;
                // Knot pin direction correction
                if (this.#knotPin.isInput() && otherPin.isInput() || this.#knotPin.isOutput() && otherPin.isOutput()) {
                    const oppositePin = /** @type {KnotPinTemplate} */(this.#knotPin.template).getOppositePin();
                    if (this.#knotPin === this.link.source) {
                        this.link.source = oppositePin;
                    } else {
                        this.enteredPin = oppositePin;
                    }
                }
            } else if (this.enteredPin.nodeElement.getType() === Configuration.paths.knot) {
                this.enteredPin = /** @type {KnotPinTemplate} */(this.enteredPin.template).getOppositePin();
            }
            if (!this.link.source.getLinks().find(ref => ref.equals(this.enteredPin.createPinReference()))) {
                this.blueprint.addGraphElement(this.link);
                this.link.destination = this.enteredPin;
            } else {
                this.link.remove();
            }
        } else {
            this.link.remove();
        }
        this.enteredPin = null;
        this.link.removeMessage();
        this.link.finishDragging();
        this.link = null;
    }
}

class VariableManagementNodeTemplate extends NodeTemplate {

    #hasInput = false
    #hasOutput = false
    #displayName = ""

    static nodeStyleClasses = ["ueb-node-style-glass"]

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        this.#displayName = this.element.nodeDisplayName;
    }

    render() {
        return x`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    ${this.#displayName ? x`
                        <div class="ueb-node-top">
                            <div class="ueb-node-name">
                                <span class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                                    ${this.#displayName}
                                </span>
                            </div>
                        </div>
                    ` : A}
                    ${this.#hasInput ? x`
                        <div class="ueb-node-inputs"></div>
                    ` : A}
                    ${this.#hasOutput ? x`
                        <div class="ueb-node-outputs"></div>
                    ` : A}
                    ${this.pinInserter ? x`
                        <div class="ueb-node-variadic" @click="${this.addPinHandler}">
                            Add pin ${SVGIcon.plusCircle}
                        </div>
                    `: A}
                </div>
            </div>
        `
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden())
            .map(v => {
                this.#hasInput ||= v.isInput();
                this.#hasOutput ||= v.isOutput();
                const result = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
                    .newObject(v, undefined, this.element);
                return result
            })
    }
}

class VariableConversionNodeTemplate extends VariableManagementNodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-conversion"]
}

class VariableOperationNodeTemplate extends VariableManagementNodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-operation"]
}

/**
 * @template {TerminalAttribute} T
 * @typedef {import("../../element/PinElement.js").default<T>} PinElement
 */

/**
 * @template {TerminalAttribute} T
 * @extends ITemplate<PinElement<T>>
 */
class PinTemplate extends ITemplate {

    static canWrapInput = true

    /** @type {HTMLElement} */
    #iconElement
    get iconElement() {
        return this.#iconElement
    }

    /** @type {HTMLElement} */
    #wrapperElement
    get wrapperElement() {
        return this.#wrapperElement
    }

    isNameRendered = true

    /** @param {PinElement<T>} element */
    initialize(element) {
        super.initialize(element);
        if (this.element.nodeElement) {
            const nodeTemplate = this.element.nodeElement.template;
            this.isNameRendered = !(
                nodeTemplate instanceof VariableConversionNodeTemplate
                || nodeTemplate instanceof VariableOperationNodeTemplate
            );
        }
    }

    setup() {
        super.setup();
        this.element.nodeElement = this.element.closest("ueb-node");
        const nodeTemplate = this.element.nodeElement.template;
        if (
            nodeTemplate instanceof VariableConversionNodeTemplate
            || nodeTemplate instanceof VariableOperationNodeTemplate
        ) {
            this.isNameRendered = false;
            this.element.requestUpdate();
        }
    }

    /** @returns {IInput[]} */
    createInputObjects() {
        return [
            new MouseCreateLink(this.element, this.blueprint, {
                moveEverywhere: true,
                draggableElement: this.getClickableElement(),
            })
        ]
    }

    render() {
        const icon = x`<div class="ueb-pin-icon">${this.renderIcon()}</div>`;
        const content = x`
            <div class="ueb-pin-content">
                ${this.isNameRendered ? this.renderName() : A}
                ${this.isInputRendered() ? this.renderInput() : x``}
            </div>
        `;
        return x`
            <div class="ueb-pin-wrapper">
                ${this.element.isInput() ? x`${icon}${content}` : x`${content}${icon}`}
            </div>
        `
    }

    renderIcon() {
        if (this.element.nodeElement.entity.isPcg()) {
            switch (this.element.entity.getType()) {
                case "Any":
                    return SVGIcon.pcgPin
                case "Param":
                case "Param[]":
                    return SVGIcon.pcgParamPin
                case "Spatial":
                case "Spatial[]":
                    return SVGIcon.pcgSpatialPin
                case "Any[]":
                case "Point[]":
                case "Surface[]":
                case "Volume[]":
                    if (this.element.isOutput()) {
                        return SVGIcon.pcgPin
                    }
                case "Point":
                case "Surface":
                case "Volume":
                    return SVGIcon.pcgStackPin
            }
        }
        switch (this.element.entity.PinType?.ContainerType?.toString()) {
            case "Array": return SVGIcon.arrayPin
            case "Set": return SVGIcon.setPin
            case "Map": return SVGIcon.mapPin
        }
        if (this.element.entity.PinType?.PinCategory?.toLocaleLowerCase() === "delegate") {
            return SVGIcon.delegate
        }
        if (this.element.nodeElement?.template instanceof VariableOperationNodeTemplate) {
            return SVGIcon.operationPin
        }
        return SVGIcon.genericPin
    }

    renderName() {
        let name = this.element.getPinDisplayName();
        const nodeElement = this.element.nodeElement;
        const pinName = this.element.getPinName();
        if (
            nodeElement.getType() == Configuration.paths.makeStruct
            && pinName == nodeElement.entity.StructType.getName()
        ) {
            name = pinName;
        }
        return x`
            <span class="ueb-pin-name ueb-ellipsis-nowrap-text">${name}</span>
        `
    }

    isInputRendered() {
        return this.element.isInput()
            && !this.element.entity.bDefaultValueIsIgnored
            && !this.element.entity.PinType.bIsReference
    }

    renderInput() {
        return x``
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (this.element.isInput() && changedProperties.has("isLinked")) {
            // When connected, an input may drop its input fields which means the node has to reflow
            const node = this.element.nodeElement;
            this.element.requestUpdate();
            this.element.updateComplete.then(() => node.acknowledgeReflow());
        }
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.element.style.setProperty("--ueb-pin-color-rgb", this.element.entity.pinColor().cssText);
        this.#iconElement = this.element.querySelector(".ueb-pin-icon svg") ?? this.element;
        this.#wrapperElement = this.element.querySelector(".ueb-pin-wrapper");
    }

    getLinkLocation() {
        const rect = this.iconElement.getBoundingClientRect();
        const boundingLocation = [this.element.isInput() ? rect.left : rect.right + 1, (rect.top + rect.bottom) / 2];
        const location = Utility.convertLocation(boundingLocation, this.blueprint.template.gridElement);
        return this.blueprint.compensateTranslation(location[0], location[1])
    }

    getClickableElement() {
        return this.#wrapperElement ?? this.element
    }
}

/**
 * @template {TerminalAttribute} T
 * @extends PinTemplate<T>
 */
class MinimalPinTemplate extends PinTemplate {

    render() {
        return x`
            <div class="ueb-pin-wrapper">
                <div class="ueb-pin-icon">${this.renderIcon()}</div>
            </div>
        `
    }
}

class EventNodeTemplate extends NodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-event"]

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.element.querySelector(".ueb-node-top").appendChild(this.createDelegatePinElement());
    }

    renderTop() {
        const icon = this.renderNodeIcon();
        const name = this.renderNodeName();
        const customEvent = this.element.getType() === Configuration.paths.customEvent
            && (this.element.entity.CustomFunctionName || this.element.entity.FunctionReference.MemberParent);
        return x`
            <div class="ueb-node-name">
                ${icon ? x`
                    <div class="ueb-node-name-symbol">${icon}</div>
                ` : A}
                ${name ? x`
                    <div class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                        ${name}
                        ${customEvent ? x`
                            <div class="ueb-node-subtitle-text ueb-ellipsis-nowrap-text">
                                Custom Event
                            </div>
                        `: A}
                    </div>
                ` : A}
            </div>
        `
    }

    createDelegatePinElement() {
        const pin = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin")).newObject(
            this.element.getPinEntities().find(v => !v.isHidden() && v.PinType.PinCategory === "delegate"),
            new MinimalPinTemplate(),
            this.element
        );
        pin.template.isNameRendered = false;
        return pin
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden() && v.PinType.PinCategory !== "delegate")
            .map(pinEntity => /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
                .newObject(pinEntity, undefined, this.element)
            )
    }
}

/** @extends MinimalPinTemplate<KnotEntity> */
class KnotPinTemplate extends MinimalPinTemplate {

    render() {
        return this.element.isOutput() ? super.render() : x``
    }

    getOppositePin() {
        const nodeTemplate = /** @type {KnotNodeTemplate} */(this.element.nodeElement.template);
        return this.element.isOutput() ? nodeTemplate.inputPin : nodeTemplate.outputPin
    }

    getLinkLocation() {
        const rect = (
            this.element.isInput()
                ? /** @type {KnotNodeTemplate} */(this.element.nodeElement.template).outputPin.template
                : this
        )
            .iconElement.getBoundingClientRect();
        /** @type {Coordinates} */
        const boundingLocation = [this.element.isInput() ? rect.left : rect.right + 1, (rect.top + rect.bottom) / 2];
        const location = Utility.convertLocation(boundingLocation, this.blueprint.template.gridElement);
        return this.blueprint.compensateTranslation(location[0], location[1])
    }
}

class KnotNodeTemplate extends NodeTemplate {

    static #traversedPin = new Set()

    /** @type {Boolean?} */
    #chainDirection = null // The node is part of a chain connected to an input or output pin

    /** @type {PinElement} */
    #inputPin
    get inputPin() {
        return this.#inputPin
    }

    /** @type {PinElement} */
    #outputPin
    get outputPin() {
        return this.#outputPin
    }

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        this.element.classList.add("ueb-node-style-minimal");
    }

    /** @param {PinElement} startingPin */
    findDirectionaPin(startingPin) {
        if (
            startingPin.nodeElement.getType() !== Configuration.paths.knot
            || KnotNodeTemplate.#traversedPin.has(startingPin)
        ) {
            KnotNodeTemplate.#traversedPin.clear();
            return true
        }
        KnotNodeTemplate.#traversedPin.add(startingPin);
        for (let pin of startingPin.getLinks().map(l => this.blueprint.getPin(l))) {
            if (this.findDirectionaPin(pin)) {
                return true
            }
        }
        return false
    }

    render() {
        return x`
            <div class="ueb-node-border"></div>
        `
    }

    setupPins() {
        this.element.getPinElements().forEach(
            p => /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-border")).appendChild(p)
        );
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }

    createPinElements() {
        const entities = this.element.getPinEntities().filter(v => !v.isHidden());
        const inputEntity = entities[entities[0].isInput() ? 0 : 1];
        const outputEntity = entities[entities[0].isOutput() ? 0 : 1];
        const pinElementConstructor = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"));
        let result = [
            this.#inputPin = pinElementConstructor.newObject(inputEntity, new KnotPinTemplate(), this.element),
            this.#outputPin = pinElementConstructor.newObject(outputEntity, new KnotPinTemplate(), this.element),
        ];
        return result
    }

    linksChanged() {

    }
}

class VariableAccessNodeTemplate extends VariableManagementNodeTemplate {

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        if (element.getType() === Configuration.paths.variableGet) {
            this.element.classList.add("ueb-node-style-getter");
        } else if (element.getType() === Configuration.paths.variableSet) {
            this.element.classList.add("ueb-node-style-setter");
        }
    }

    setupPins() {
        super.setupPins();
        let outputPin = this.element.getPinElements().find(p => !p.entity.isHidden() && !p.entity.isExecution());
        this.element.style.setProperty("--ueb-node-color", outputPin.getColor().cssText);
    }
}

/**
 * @template {IEntity} EntityT
 * @template {ISelectableDraggableTemplate} TemplateT
 * @extends {IDraggableElement<EntityT, TemplateT>}
 */
class ISelectableDraggableElement extends IDraggableElement {

    static properties = {
        ...super.properties,
        selected: {
            type: Boolean,
            attribute: "data-selected",
            reflect: true,
            converter: Utility.booleanConverter,
        },
    }

    /** @param {UEBDragEvent} e */
    dragHandler = e => this.addLocation(...e.detail.value)

    constructor() {
        super();
        this.selected = false;
        this.listeningDrag = false;
    }

    setup() {
        super.setup();
        this.setSelected(this.selected);
    }

    cleanup() {
        super.cleanup();
        this.blueprint.removeEventListener(Configuration.nodeDragGeneralEventName, this.dragHandler);
    }

    setSelected(value = true) {
        this.selected = value;
        if (this.blueprint) {
            if (this.selected) {
                this.listeningDrag = true;
                this.blueprint.addEventListener(Configuration.nodeDragGeneralEventName, this.dragHandler);
            } else {
                this.blueprint.removeEventListener(Configuration.nodeDragGeneralEventName, this.dragHandler);
                this.listeningDrag = false;
            }
        }
    }
}

/** @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>} */
class NodeElement extends ISelectableDraggableElement {

    static properties = {
        ...ISelectableDraggableElement.properties,
        typePath: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
        nodeTitle: {
            type: String,
            attribute: "data-title",
            reflect: true,
        },
        advancedPinDisplay: {
            type: String,
            attribute: "data-advanced-display",
            converter: IdentifierEntity.attributeConverter,
            reflect: true,
        },
        enabledState: {
            type: String,
            attribute: "data-enabled-state",
            reflect: true,
        },
        nodeDisplayName: {
            type: String,
            attribute: false,
        },
        pureFunction: {
            type: Boolean,
            converter: Utility.booleanConverter,
            attribute: "data-pure-function",
            reflect: true,
        },
    }
    static dragEventName = Configuration.nodeDragEventName
    static dragGeneralEventName = Configuration.nodeDragGeneralEventName

    get blueprint() {
        return super.blueprint
    }
    set blueprint(v) {
        super.blueprint = v;
        this.#pins.forEach(p => p.blueprint = v);
    }

    /** @type {HTMLElement} */
    #nodeNameElement
    get nodeNameElement() {
        return this.#nodeNameElement
    }
    set nodeNameElement(value) {
        this.#nodeNameElement = value;
    }

    /** @type {PinElement[]} */
    #pins = []
    /** @type {NodeElement[]} */
    boundComments = []
    #commentDragged = false
    /** @param {UEBDragEvent} e */
    #commentDragHandler = e => {
        // If selected, it will already drag, also must check if under nested comments, it must drag just once
        if (!this.selected && !this.#commentDragged) {
            this.#commentDragged = true;
            this.requestUpdate();
            this.updateComplete.then(() => this.#commentDragged = false);
            this.addLocation(...e.detail.value);
        }
    }

    /**
     * @param {ObjectEntity} nodeEntity
     * @return {new () => NodeTemplate}
     */
    static getTypeTemplate(nodeEntity) {
        if (
            nodeEntity.getClass() === Configuration.paths.callFunction
            || nodeEntity.getClass() === Configuration.paths.commutativeAssociativeBinaryOperator
            || nodeEntity.getClass() === Configuration.paths.callArrayFunction
        ) {
            const memberParent = nodeEntity.FunctionReference?.MemberParent?.path ?? "";
            const memberName = nodeEntity.FunctionReference?.MemberName;
            if (
                memberName && (
                    memberParent === Configuration.paths.kismetMathLibrary
                    || memberParent === Configuration.paths.kismetArrayLibrary
                )) {
                if (memberName.startsWith("Conv_")) {
                    return VariableConversionNodeTemplate
                }
                if (
                    memberName.startsWith("And_")
                    || memberName.startsWith("Boolean") // Boolean logic operations
                    || memberName.startsWith("Cross_")
                    || memberName.startsWith("Dot_")
                    || memberName.startsWith("Not_")
                    || memberName.startsWith("Or_")
                    || memberName.startsWith("Percent_")
                    || memberName.startsWith("Xor_")
                ) {
                    return VariableOperationNodeTemplate
                }
                switch (memberName) {
                    case "Abs":
                    case "Array_Add":
                    case "Array_AddUnique":
                    case "Array_Identical":
                    case "BMax":
                    case "BMin":
                    case "CrossProduct2D":
                    case "DotProduct2D":
                    case "Exp":
                    case "FMax":
                    case "FMin":
                    case "GetPI":
                    case "Max":
                    case "MaxInt64":
                    case "Min":
                    case "MinInt64":
                    case "Sqrt":
                    case "Square":
                    case "Vector4_CrossProduct3":
                    case "Vector4_DotProduct":
                    case "Vector4_DotProduct3":
                    // Trigonometry
                    case "Acos":
                    case "Asin":
                    case "Cos":
                    case "DegAcos":
                    case "DegCos":
                    case "DegSin":
                    case "DegTan":
                    case "Sin":
                    case "Tan":
                        return VariableOperationNodeTemplate
                }
            }
            if (memberParent === Configuration.paths.blueprintSetLibrary) {
                return VariableOperationNodeTemplate
            }
            if (memberParent === Configuration.paths.blueprintMapLibrary) {
                return VariableOperationNodeTemplate
            }
        }
        switch (nodeEntity.getClass()) {
            case Configuration.paths.comment:
            case Configuration.paths.materialGraphNodeComment:
                return CommentNodeTemplate
            case Configuration.paths.createDelegate:
                return NodeTemplate
            case Configuration.paths.promotableOperator:
                return VariableOperationNodeTemplate
            case Configuration.paths.knot:
                return KnotNodeTemplate
            case Configuration.paths.literal:
            case Configuration.paths.variableGet:
            case Configuration.paths.variableSet:
                return VariableAccessNodeTemplate
        }
        if (nodeEntity.isEvent()) {
            return EventNodeTemplate
        }
        return NodeTemplate
    }

    /** @param {String} str */
    static fromSerializedObject(str) {
        str = str.trim();
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str);
        return NodeElement.newObject(/** @type {ObjectEntity} */(entity))
    }

    /**
     * @param {ObjectEntity} entity
     * @param {NodeTemplate} template
     */
    static newObject(entity = new ObjectEntity(), template = new (NodeElement.getTypeTemplate(entity))()) {
        const result = new NodeElement();
        result.initialize(entity, template);
        return result
    }

    initialize(entity = new ObjectEntity(), template = new (NodeElement.getTypeTemplate(entity))()) {
        this.typePath = entity.getType();
        this.nodeTitle = entity.getObjectName();
        this.advancedPinDisplay = entity.AdvancedPinDisplay?.toString();
        this.enabledState = entity.EnabledState;
        this.nodeDisplayName = entity.nodeDisplayName();
        this.pureFunction = entity.bIsPureFunc;
        this.dragLinkObjects = [];
        super.initialize(entity, template);
        this.#pins = this.template.createPinElements();
        super.setLocation(this.entity.getNodePosX(), this.entity.getNodePosY());
        if (this.entity.NodeWidth && this.entity.NodeHeight) {
            this.sizeX = this.entity.NodeWidth.value;
            this.sizeY = this.entity.NodeHeight.value;
        } else {
            this.updateComplete.then(() => this.computeSizes());
        }
        entity.listenAttribute("Name", v => {
            this.nodeTitle = entity.Name;
            this.nodeDisplayName = entity.nodeDisplayName();
        });
    }

    async getUpdateComplete() {
        let result = await super.getUpdateComplete();
        for (const pin of this.getPinElements()) {
            result &&= await pin.updateComplete;
        }
        return result
    }

    /** @param {NodeElement} commentNode */
    bindToComment(commentNode) {
        if (commentNode != this && !this.boundComments.includes(commentNode)) {
            commentNode.addEventListener(Configuration.nodeDragEventName, this.#commentDragHandler);
            this.boundComments.push(commentNode);
        }
    }

    /** @param {NodeElement} commentNode */
    unbindFromComment(commentNode) {
        const commentIndex = this.boundComments.indexOf(commentNode);
        if (commentIndex >= 0) {
            commentNode.removeEventListener(Configuration.nodeDragEventName, this.#commentDragHandler);
            this.boundComments[commentIndex] = this.boundComments[this.boundComments.length - 1];
            this.boundComments.pop();
        }
    }

    /** @param {NodeElement} commentNode */
    isInsideComment(commentNode) {
        return this.topBoundary() >= commentNode.topBoundary()
            && this.rightBoundary() <= commentNode.rightBoundary()
            && this.bottomBoundary() <= commentNode.bottomBoundary()
            && this.leftBoundary() >= commentNode.leftBoundary()
    }

    getType() {
        return this.entity.getType()
    }

    getNodeName() {
        return this.entity.getObjectName()
    }

    computeNodeDisplayName() {
        this.nodeDisplayName = this.entity.nodeDisplayName();
    }

    /** @param {Number} value */
    setNodeWidth(value) {
        this.entity.setNodeWidth(value);
        this.sizeX = value;
        this.acknowledgeReflow();
    }

    /** @param {Number} value */
    setNodeHeight(value) {
        this.entity.setNodeHeight(value);
        this.sizeY = value;
        this.acknowledgeReflow();
    }

    /** @param  {IElement[]} nodesWhitelist */
    sanitizeLinks(nodesWhitelist = []) {
        this.getPinElements().forEach(pin => pin.sanitizeLinks(nodesWhitelist));
    }

    /** @param {String} name */
    rename(name) {
        if (this.entity.Name == name) {
            return false
        }
        for (let sourcePinElement of this.getPinElements()) {
            for (let targetPinReference of sourcePinElement.getLinks()) {
                this.blueprint.getPin(targetPinReference).redirectLink(sourcePinElement, new PinReferenceEntity({
                    objectName: name,
                    pinGuid: sourcePinElement.entity.PinId,
                }));
            }
        }
        this.entity.Name = name;
        this.nodeTitle = this.entity.Name;
    }

    getPinElements() {
        return this.#pins
    }

    /** @returns {PinEntity[]} */
    getPinEntities() {
        return this.entity.getPinEntities()
    }

    setLocation(x = 0, y = 0, acknowledge = true) {
        this.entity.setNodePosX(x);
        this.entity.setNodePosY(y);
        super.setLocation(x, y, acknowledge);
    }

    acknowledgeReflow() {
        this.requestUpdate();
        this.updateComplete.then(() => this.computeSizes());
        let reflowEvent = new CustomEvent(Configuration.nodeReflowEventName);
        this.dispatchEvent(reflowEvent);
    }

    setShowAdvancedPinDisplay(value) {
        this.entity.AdvancedPinDisplay = new IdentifierEntity(value ? "Shown" : "Hidden");
        this.advancedPinDisplay = this.entity.AdvancedPinDisplay;
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay?.toString() != "Shown");
    }
}

class BlueprintEntity extends IEntity {

    /** @type {Map<String, Number>} */
    #objectEntitiesNameCounter = new Map()

    /** @type {ObjectEntity[]}" */
    #objectEntities = []
    get objectEntities() {
        return this.#objectEntities
    }

    /** @param {ObjectEntity} entity */
    getHomonymObjectEntity(entity) {
        const name = entity.getObjectName(false);
        return this.#objectEntities.find(entity => entity.getObjectName() == name)
    }

    /** @param {String} name */
    getFreeName(name) {
        name = name.replace(/_\d+$/, "");
        const counter = (this.#objectEntitiesNameCounter.get(name) ?? -1) + 1;
        return Configuration.nodeTitle(name, counter)
    }

    /** @param {ObjectEntity} entity */
    addObjectEntity(entity) {
        if (!this.#objectEntities.includes(entity)) {
            this.#objectEntities.push(entity);
            const [name, counter] = entity.getNameAndCounter();
            this.#objectEntitiesNameCounter.set(
                name,
                Math.max((this.#objectEntitiesNameCounter.get(name) ?? 0), counter)
            );
            return true
        }
        return false
    }

    /** @param {ObjectEntity} entity */
    removeObjectEntity(entity) {
        const index = this.#objectEntities.indexOf(entity);
        if (index >= 0) {
            const last = this.#objectEntities.pop();
            if (index < this.#objectEntities.length) {
                this.#objectEntities[index] = last;
            }
            return true
        }
        return false
    }

    /** @param {ObjectEntity} entity */
    merge(entity) {
        if (!entity.ScriptVariables || entity.ScriptVariables.length === 0) {
            return
        }
        if (!this.ScriptVariables || this.ScriptVariables.length === 0) {
            this.ScriptVariables = entity.ScriptVariables;
        }
        let scriptVariables = Utility.mergeArrays(
            this.ScriptVariables,
            entity.ScriptVariables,
            (l, r) => l.OriginalChangeId.value == r.OriginalChangeId.value
        );
        if (scriptVariables.length === this.ScriptVariables.length) {
            return
        }
        for (let i = 0; i < entity.ScriptVariables.length; ++i) {
            const current = entity.ScriptVariables[i];
            if (!this.ScriptVariables.some(v => v.OriginalChangeId.equals(current.OriginalChangeId))) ;
        }
    }
}

/** @template {AttributeConstructor<Attribute>} T */
class Serializer {

    /** @type {(v: String) => String} */
    static same = v => v

    /** @type {(entity: Attribute, serialized: String) => String} */
    static notWrapped = (entity, serialized) => serialized

    /** @type {(entity: Attribute, serialized: String) => String} */
    static bracketsWrapped = (entity, serialized) => `(${serialized})`

    /** @param {T} entityType */
    constructor(
        entityType,
        /** @type {(entity: ConstructedType<T>, serialized: String) => String} */
        wrap = (entity, serialized) => serialized,
        attributeSeparator = ",",
        trailingSeparator = false,
        attributeValueConjunctionSign = "=",
        attributeKeyPrinter = Serializer.same
    ) {
        this.entityType = entityType;
        this.wrap = wrap;
        this.attributeSeparator = attributeSeparator;
        this.trailingSeparator = trailingSeparator;
        this.attributeValueConjunctionSign = attributeValueConjunctionSign;
        this.attributeKeyPrinter = attributeKeyPrinter;
    }

    /**
     * @param {String} value
     * @returns {ConstructedType<T>}
     */
    read(value) {
        return this.doRead(value.trim())
    }

    /** @param {ConstructedType<T>} value */
    write(value, insideString = false) {
        return this.doWrite(value, insideString)
    }

    /**
     * @param {String} value
     * @returns {ConstructedType<T>}
     */
    doRead(value) {
        let grammar = Grammar.grammarFor(undefined, this.entityType);
        const parseResult = grammar.run(value);
        if (!parseResult.status) {
            throw new Error(
                this.entityType
                    ? `Error when trying to parse the entity ${this.entityType.prototype.constructor.name}`
                    : "Error when trying to parse null"
            )
        }
        return parseResult.value
    }

    /**
     * @param {ConstructedType<T>} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    doWrite(
        entity,
        insideString = false,
        indentation = "",
        wrap = this.wrap,
        attributeSeparator = this.attributeSeparator,
        trailingSeparator = this.trailingSeparator,
        attributeValueConjunctionSign = this.attributeValueConjunctionSign,
        attributeKeyPrinter = this.attributeKeyPrinter
    ) {
        let result = "";
        const keys = Object.keys(entity);
        let first = true;
        for (const key of keys) {
            const value = entity[key];
            if (value !== undefined && this.showProperty(entity, key)) {
                let keyValue = entity instanceof Array ? `(${key})` : key;
                if (AttributeInfo.getAttribute(entity, key, "quoted")) {
                    keyValue = `"${keyValue}"`;
                }
                const isSerialized = AttributeInfo.getAttribute(entity, key, "serialized");
                if (first) {
                    first = false;
                } else {
                    result += attributeSeparator;
                }
                if (AttributeInfo.getAttribute(entity, key, "inlined")) {
                    result += this.doWrite(
                        value,
                        insideString,
                        indentation,
                        Serializer.notWrapped,
                        attributeSeparator,
                        false,
                        attributeValueConjunctionSign,
                        AttributeInfo.getAttribute(entity, key, "type") instanceof Array
                            ? k => attributeKeyPrinter(`${keyValue}${k}`)
                            : k => attributeKeyPrinter(`${keyValue}.${k}`)
                    );
                    continue
                }
                const keyPrinted = attributeKeyPrinter(keyValue);
                const indentationPrinted = attributeSeparator.includes("\n") ? indentation : "";
                result += (
                    keyPrinted.length
                        ? (indentationPrinted + keyPrinted + this.attributeValueConjunctionSign)
                        : ""
                )
                    + (
                        isSerialized
                            ? `"${this.doWriteValue(value, true, indentation)}"`
                            : this.doWriteValue(value, insideString, indentation)
                    );
            }
        }
        if (trailingSeparator && result.length) {
            // append separator at the end if asked and there was printed content
            result += attributeSeparator;
        }
        return wrap(entity, result)
    }

    /** @param {Boolean} insideString */
    doWriteValue(value, insideString, indentation = "") {
        const type = Utility.getType(value);
        const serializer = SerializerFactory.getSerializer(type);
        if (!serializer) {
            throw new Error(
                `Unknown value type "${type.name}", a serializer must be registered in the SerializerFactory class, `
                + "check initializeSerializerFactory.js"
            )
        }
        return serializer.doWrite(value, insideString, indentation)
    }

    /**
     * @param {IEntity} entity
     * @param {String} key
     */
    showProperty(entity, key) {
        if (entity instanceof IEntity) {
            if (
                AttributeInfo.getAttribute(entity, key, "ignored")
                || AttributeInfo.getAttribute(entity, key, "silent") && Utility.equals(
                    AttributeInfo.getAttribute(entity, key, "default"),
                    entity[key]
                )
            ) {
                return false
            }
        }
        return true
    }
}

/** @extends Serializer<ObjectEntityConstructor> */
class ObjectSerializer extends Serializer {

    constructor(entityType = ObjectEntity) {
        super(entityType, undefined, "\n", true, undefined, Serializer.same);
    }

    showProperty(entity, key) {
        switch (key) {
            case "Class":
            case "Name":
            case "Archetype":
            case "ExportPath":
            case "CustomProperties":
                // Serielized separately, check doWrite()
                return false
        }
        return super.showProperty(entity, key)
    }

    /** @param {ObjectEntity} value */
    write(value, insideString = false) {
        return this.doWrite(value, insideString) + "\n"
    }

    /** @param {String} value */
    doRead(value) {
        return Grammar.grammarFor(undefined, this.entityType).parse(value)
    }

    /**
     * @param {String} value
     * @returns {ObjectEntity[]}
     */
    readMultiple(value) {
        return ObjectEntity.getMultipleObjectsGrammar().parse(value)
    }

    /**
     * @param {ObjectEntity} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    doWrite(
        entity,
        insideString,
        indentation = "",
        wrap = this.wrap,
        attributeSeparator = this.attributeSeparator,
        trailingSeparator = this.trailingSeparator,
        attributeValueConjunctionSign = this.attributeValueConjunctionSign,
        attributeKeyPrinter = this.attributeKeyPrinter,
    ) {
        const moreIndentation = indentation + Configuration.indentation;
        if (!(entity instanceof ObjectEntity)) {
            return super.doWrite(
                entity,
                insideString,
                indentation,
                wrap,
                attributeSeparator,
                trailingSeparator,
                attributeValueConjunctionSign,
                // @ts-expect-error
                key => entity[key] instanceof ObjectEntity ? "" : attributeKeyPrinter(key)
            )
        }
        let result = indentation + "Begin Object"
            + (entity.Class?.type || entity.Class?.path ? ` Class=${this.doWriteValue(entity.Class, insideString)}` : "")
            + (entity.Name ? ` Name=${this.doWriteValue(entity.Name, insideString)}` : "")
            + (entity.Archetype ? ` Archetype=${this.doWriteValue(entity.Archetype, insideString)}` : "")
            + (entity.ExportPath?.type || entity.ExportPath?.path ? ` ExportPath=${this.doWriteValue(entity.ExportPath, insideString)}` : "")
            + "\n"
            + super.doWrite(
                entity,
                insideString,
                moreIndentation,
                wrap,
                attributeSeparator,
                true,
                attributeValueConjunctionSign,
                key => entity[key] instanceof ObjectEntity ? "" : attributeKeyPrinter(key)
            )
            + (!AttributeInfo.getAttribute(entity, "CustomProperties", "ignored")
                ? entity.getCustomproperties().map(pin =>
                    moreIndentation
                    + attributeKeyPrinter("CustomProperties ")
                    + SerializerFactory.getSerializer(PinEntity).doWrite(pin, insideString)
                    + this.attributeSeparator
                ).join("")
                : ""
            )
            + indentation + "End Object";
        return result
    }
}

/**
 * @typedef {import("../IInput.js").Options & {
 *     listenOnFocus?: Boolean,
 *     unlistenOnTextEdit?: Boolean,
 * }} Options
 */

class Copy extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #copyHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true;
        options.unlistenOnTextEdit ??= true; // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options);
        let self = this;
        this.#copyHandler = () => self.copied();
    }

    listenEvents() {
        window.addEventListener("copy", this.#copyHandler);
    }

    unlistenEvents() {
        window.removeEventListener("copy", this.#copyHandler);
    }

    getSerializedText() {
        return this.blueprint
            .getNodes(true)
            .map(node => Copy.#serializer.write(node.entity, false))
            .join("")
    }

    copied() {
        const value = this.getSerializedText();
        navigator.clipboard.writeText(value);
        return value
    }
}

/**
 * @typedef {import("../IInput.js").Options & {
 *     listenOnFocus?: Boolean,
 *     unlistenOnTextEdit?: Boolean,
 * }} Options
 */

class Cut extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #cutHandler

    /**
     * @param {Element} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true;
        options.unlistenOnTextEdit ??= true; // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options);
        let self = this;
        this.#cutHandler = () => self.cut();
    }

    listenEvents() {
        window.addEventListener("cut", this.#cutHandler);
    }

    unlistenEvents() {
        window.removeEventListener("cut", this.#cutHandler);
    }

    getSerializedText() {
        return this.blueprint
            .getNodes(true)
            .map(node => Cut.#serializer.write(node.entity, false))
            .join("")
    }

    cut() {
        this.blueprint.template.getCopyInputObject().copied();
        this.blueprint.removeGraphElement(...this.blueprint.getNodes(true));
    }
}

/**
 * @typedef {import("../IInput.js").Options & {
 *     listenOnFocus?: Boolean,
 *     unlistenOnTextEdit?: Boolean,
 * }} Options
 */

class Paste extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #pasteHandle

    /**
     * @param {Element} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true;
        options.unlistenOnTextEdit ??= true; // No nodes paste if inside a text field, just text (default behavior)
        super(target, blueprint, options);
        let self = this;
        this.#pasteHandle = e => self.pasted(e.clipboardData.getData("Text"));
    }

    listenEvents() {
        window.addEventListener("paste", this.#pasteHandle);
    }

    unlistenEvents() {
        window.removeEventListener("paste", this.#pasteHandle);
    }

    /** @param {String} value */
    pasted(value) {
        let top = 0;
        let left = 0;
        let count = 0;
        let nodes = Paste.#serializer.readMultiple(value).map(entity => {
            let node = /** @type {NodeElementConstructor} */(ElementFactory.getConstructor("ueb-node"))
                .newObject(entity);
            top += node.locationY;
            left += node.locationX;
            ++count;
            return node
        });
        top /= count;
        left /= count;
        if (nodes.length > 0) {
            this.blueprint.unselectAll();
        }
        let mousePosition = this.blueprint.mousePosition;
        nodes.forEach(node => {
            node.addLocation(mousePosition[0] - left, mousePosition[1] - top);
            node.snapToGrid();
            node.setSelected(true);
        });
        this.blueprint.addGraphElement(...nodes);
        return true
    }
}

/**
 * @typedef {import("./IPointing.js").Options & {
 *     listenOnFocus?: Boolean,
 *     strictTarget?: Boolean,
 * }} Options
 */

class MouseWheel extends IPointing {

    /** @param {MouseWheel} self */
    static #ignoreEvent = self => { }

    #variation = 0
    get variation() {
        return this.#variation
    }

    /** @param {WheelEvent} e */
    #mouseWheelHandler = e => {
        if (this.enablerKey && !this.enablerActivated) {
            return
        }
        e.preventDefault();
        this.#variation = e.deltaY;
        this.setLocationFromEvent(e);
        this.wheel();
    }

    /** @param {WheelEvent} e */
    #mouseParentWheelHandler = e => e.preventDefault()

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(
        target,
        blueprint,
        options = {},
        onWheel = MouseWheel.#ignoreEvent,
    ) {
        options.listenOnFocus = true;
        options.strictTarget ??= false;
        super(target, blueprint, options);
        this.strictTarget = options.strictTarget;
        this.onWheel = onWheel;
    }

    listenEvents() {
        this.movementSpace.addEventListener("wheel", this.#mouseWheelHandler, false);
        this.movementSpace.parentElement?.addEventListener("wheel", this.#mouseParentWheelHandler);
    }

    unlistenEvents() {
        this.movementSpace.removeEventListener("wheel", this.#mouseWheelHandler, false);
        this.movementSpace.parentElement?.removeEventListener("wheel", this.#mouseParentWheelHandler);
    }

    /* Subclasses can override */
    wheel() {
        this.onWheel(this);
    }
}

class Zoom extends MouseWheel {

    #accumulatedVariation = 0

    #enableZoonIn = false
    get enableZoonIn() {
        return this.#enableZoonIn
    }
    set enableZoonIn(value) {
        if (value == this.#enableZoonIn) {
            return
        }
        this.#enableZoonIn = value;
    }

    wheel() {
        this.#accumulatedVariation += -this.variation;
        if (Math.abs(this.#accumulatedVariation) < Configuration.mouseWheelZoomThreshold) {
            return
        }
        let zoomLevel = this.blueprint.getZoom();
        if (!this.enableZoonIn && zoomLevel == 0 && this.#accumulatedVariation > 0) {
            return
        }
        zoomLevel += Math.sign(this.#accumulatedVariation);
        this.blueprint.setZoom(zoomLevel, this.location);
        this.#accumulatedVariation = 0;
    }
}

/**
 * @typedef {import("./KeyboardShortcut.js").Options & {
 *     activationKeys?: String | KeyBindingEntity | (String | KeyBindingEntity)[],
 * }} Options
 */

class KeyboardEnableZoom extends KeyboardShortcut {

    /** @type {Zoom} */
    #zoomInputObject

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Shortcuts.enableZoomIn;
        super(target, blueprint, options);
    }

    fire() {
        this.#zoomInputObject = this.blueprint.template.getZoomInputObject();
        this.#zoomInputObject.enableZoonIn = true;
    }

    unfire() {
        this.#zoomInputObject.enableZoonIn = false;
    }
}

class MouseScrollGraph extends IMouseClickDrag {

    startDrag() {
        this.blueprint.scrolling = true;
    }

    /**
     * @param {Coordinates} location
     * @param {Coordinates} movement
     */
    dragTo(location, movement) {
        this.blueprint.scrollDelta(-movement[0], -movement[1]);
    }

    endDrag() {
        this.blueprint.scrolling = false;
    }
}

/**
 * @typedef {import("./IPointing.js").Options & {
 *     listenOnFocus?: Boolean,
 * }} Options
 */

class MouseTracking extends IPointing {

    /** @type {IPointing} */
    #mouseTracker = null

    /** @param {MouseEvent} e */
    #mousemoveHandler = e => {
        e.preventDefault();
        this.setLocationFromEvent(e);
        this.blueprint.mousePosition = [...this.location];
    }

    /** @param {CustomEvent} e */
    #trackingMouseStolenHandler = e => {
        if (!this.#mouseTracker) {
            e.preventDefault();
            this.#mouseTracker = e.detail.tracker;
            this.unlistenMouseMove();
        }
    }

    /** @param {CustomEvent} e */
    #trackingMouseGaveBackHandler = e => {
        if (this.#mouseTracker == e.detail.tracker) {
            e.preventDefault();
            this.#mouseTracker = null;
            this.listenMouseMove();
        }
    }

    /**
     * @param {Element} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        super(target, blueprint, options);
    }

    listenMouseMove() {
        this.target.addEventListener("mousemove", this.#mousemoveHandler);
    }

    unlistenMouseMove() {
        this.target.removeEventListener("mousemove", this.#mousemoveHandler);
    }

    listenEvents() {
        this.listenMouseMove();
        this.blueprint.addEventListener(
            Configuration.trackingMouseEventName.begin,
            /** @type {(e: Event) => any} */(this.#trackingMouseStolenHandler));
        this.blueprint.addEventListener(
            Configuration.trackingMouseEventName.end,
            /** @type {(e: Event) => any} */(this.#trackingMouseGaveBackHandler));
    }

    unlistenEvents() {
        this.unlistenMouseMove();
        this.blueprint.removeEventListener(
            Configuration.trackingMouseEventName.begin,
            /** @type {(e: Event) => any} */(this.#trackingMouseStolenHandler));
        this.blueprint.removeEventListener(
            Configuration.trackingMouseEventName.end,
            /** @type {(e: Event) => any} */(this.#trackingMouseGaveBackHandler)
        );
    }
}

/**
 * @typedef {import("./IMouseClickDrag.js").Options & {
 *     scrollGraphEdge?: Boolean,
 * }} Options
 */

class Select extends IMouseClickDrag {

    constructor(target, blueprint, options = {}) {
        options.scrollGraphEdge ??= true;
        super(target, blueprint, options);
        this.selectorElement = this.blueprint.template.selectorElement;
    }

    startDrag() {
        this.selectorElement.beginSelect(this.clickedPosition);
    }

    /**
     * @param {Coordinates} location
     * @param {Coordinates} movement
     */
    dragTo(location, movement) {
        this.selectorElement.selectTo(location);
    }

    endDrag() {
        if (this.started) {
            this.selectorElement.endSelect();
        }
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll();
        }
    }
}

/**
 * @typedef {import("../IInput.js").Options & {
 *     listenOnFocus?: Boolean,
 * }} Options
 */

class Unfocus extends IInput {

    /** @param {MouseEvent} e */
    #clickHandler = e => this.clickedSomewhere(/** @type {HTMLElement} */(e.target))

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        super(target, blueprint, options);
        if (this.blueprint.focus) {
            document.addEventListener("click", this.#clickHandler);
        }
    }

    /** @param {HTMLElement} target */
    clickedSomewhere(target) {
        // If target is outside the blueprint grid
        if (!target.closest("ueb-blueprint")) {
            this.blueprint.setFocused(false);
        }
    }

    listenEvents() {
        document.addEventListener("click", this.#clickHandler);
    }

    unlistenEvents() {
        document.removeEventListener("click", this.#clickHandler);
    }
}

/** @extends ITemplate<Blueprint> */
class BlueprintTemplate extends ITemplate {

    static styleVariables = {
        "--ueb-font-size": `${Configuration.fontSize}`,
        "--ueb-grid-axis-line-color": `${Configuration.gridAxisLineColor}`,
        "--ueb-grid-expand": `${Configuration.expandGridSize}px`,
        "--ueb-grid-line-color": `${Configuration.gridLineColor}`,
        "--ueb-grid-line-width": `${Configuration.gridLineWidth}px`,
        "--ueb-grid-set-line-color": `${Configuration.gridSetLineColor}`,
        "--ueb-grid-set": `${Configuration.gridSet}`,
        "--ueb-grid-size": `${Configuration.gridSize}px`,
        "--ueb-link-min-width": `${Configuration.linkMinWidth}`,
        "--ueb-node-radius": `${Configuration.nodeRadius}px`,
    }

    #resizeObserver = new ResizeObserver(entries => {
        const size = entries.find(entry => entry.target === this.viewportElement)?.devicePixelContentBoxSize?.[0];
        if (size) {
            this.viewportSize[0] = size.inlineSize;
            this.viewportSize[1] = size.blockSize;
        }
    })

    /** @type {Copy} */
    #copyInputObject

    /** @type {Paste} */
    #pasteInputObject

    /** @type {Zoom} */
    #zoomInputObject

    /** @type {HTMLElement} */ headerElement
    /** @type {HTMLElement} */ overlayElement
    /** @type {HTMLElement} */ viewportElement
    /** @type {SelectorElement} */ selectorElement
    /** @type {HTMLElement} */ gridElement
    /** @type {HTMLElement} */ linksContainerElement
    /** @type {HTMLElement} */ nodesContainerElement
    viewportSize = [0, 0]

    /** @param {Blueprint} element */
    initialize(element) {
        super.initialize(element);
        this.element.style.cssText = Object.entries(BlueprintTemplate.styleVariables)
            .map(([k, v]) => `${k}:${v};`).join("");
        const htmlTemplate =  /** @type {HTMLTemplateElement} */(
            this.element.querySelector(":scope > template")
        )?.content.textContent;
        if (htmlTemplate) {
            this.element.requestUpdate();
            this.element.updateComplete.then(() => {
                this.blueprint.mousePosition = [
                    Math.round(this.viewportSize[0] / 2),
                    Math.round(this.viewportSize[1] / 2),
                ];
                this.getPasteInputObject().pasted(htmlTemplate);
                this.blueprint.unselectAll();
            });
        }
    }

    setup() {
        super.setup();
        this.#resizeObserver.observe(this.viewportElement, {
            box: "device-pixel-content-box",
        });
        const bounding = this.viewportElement.getBoundingClientRect();
        this.viewportSize[0] = bounding.width;
        this.viewportSize[1] = bounding.height;
        if (this.blueprint.nodes.length > 0) {
            this.blueprint.requestUpdate();
            this.blueprint.updateComplete.then(() => this.centerContentInViewport());
        }
    }

    cleanup() {
        super.cleanup();
        this.#resizeObserver.unobserve(this.viewportElement);
    }

    createInputObjects() {
        const gridElement = this.element.getGridDOMElement();
        this.#copyInputObject = new Copy(gridElement, this.blueprint);
        this.#pasteInputObject = new Paste(gridElement, this.blueprint);
        this.#zoomInputObject = new Zoom(gridElement, this.blueprint);
        return [
            ...super.createInputObjects(),
            this.#copyInputObject,
            this.#pasteInputObject,
            this.#zoomInputObject,
            new Cut(gridElement, this.blueprint),
            new KeyboardShortcut(gridElement, this.blueprint, {
                activationKeys: Shortcuts.duplicateNodes
            }, () =>
                this.blueprint.template.getPasteInputObject().pasted(
                    this.blueprint.template.getCopyInputObject().copied()
                )
            ),
            new KeyboardShortcut(gridElement, this.blueprint, {
                activationKeys: Shortcuts.deleteNodes
            }, () => this.blueprint.removeGraphElement(...this.blueprint.getNodes(true))),
            new KeyboardShortcut(gridElement, this.blueprint, {
                activationKeys: Shortcuts.selectAllNodes
            }, () => this.blueprint.selectAll()),
            new Select(gridElement, this.blueprint, {
                clickButton: Configuration.mouseClickButton,
                exitAnyButton: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(gridElement, this.blueprint, {
                clickButton: Configuration.mouseRightClickButton,
                exitAnyButton: false,
                moveEverywhere: true,
            }),
            new Unfocus(gridElement, this.blueprint),
            new MouseTracking(gridElement, this.blueprint),
            new KeyboardEnableZoom(gridElement, this.blueprint),
        ]
    }

    render() {
        return x`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">
                    Zoom ${this.blueprint.zoom == 0 ? "1:1" : (this.blueprint.zoom > 0 ? "+" : "") + this.blueprint.zoom}
                </div>
            </div>
            <div class="ueb-viewport-overlay"></div>
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x: ${Math.round(this.blueprint.translateX)}; --ueb-additional-y: ${Math.round(this.blueprint.translateY)}; --ueb-translate-x: ${Math.round(this.blueprint.translateX)}; --ueb-translate-y: ${Math.round(this.blueprint.translateY)};">
                    <div class="ueb-grid-content">
                        <div data-links></div>
                        <div data-nodes></div>
                        <ueb-selector></ueb-selector>
                    </div>
                </div>
            </div>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.headerElement = this.blueprint.querySelector('.ueb-viewport-header');
        this.overlayElement = this.blueprint.querySelector('.ueb-viewport-overlay');
        this.viewportElement = this.blueprint.querySelector('.ueb-viewport-body');
        this.selectorElement = this.blueprint.querySelector('ueb-selector');
        this.gridElement = this.viewportElement.querySelector(".ueb-grid");
        this.linksContainerElement = this.blueprint.querySelector("[data-links]");
        this.linksContainerElement.append(...this.blueprint.getLinks());
        this.nodesContainerElement = this.blueprint.querySelector("[data-nodes]");
        this.nodesContainerElement.append(...this.blueprint.getNodes());
        this.viewportElement.scroll(Configuration.expandGridSize, Configuration.expandGridSize);
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        if (this.headerElement && changedProperties.has("zoom")) {
            this.headerElement.classList.add("ueb-zoom-changed");
            this.headerElement.addEventListener(
                "animationend",
                () => this.headerElement.classList.remove("ueb-zoom-changed")
            );
        }
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has("scrollX") || changedProperties.has("scrollY")) {
            this.viewportElement.scroll(this.blueprint.scrollX, this.blueprint.scrollY);
        }
        if (changedProperties.has("zoom")) {
            this.blueprint.style.setProperty("--ueb-scale", this.blueprint.getScale());
            const previousZoom = changedProperties.get("zoom");
            const minZoom = Math.min(previousZoom, this.blueprint.zoom);
            const maxZoom = Math.max(previousZoom, this.blueprint.zoom);
            const classes = Utility.range(minZoom, maxZoom);
            const getClassName = v => `ueb-zoom-${v}`;
            if (previousZoom < this.blueprint.zoom) {
                this.blueprint.classList.remove(...classes.filter(v => v < 0).map(getClassName));
                this.blueprint.classList.add(...classes.filter(v => v > 0).map(getClassName));
            } else {
                this.blueprint.classList.remove(...classes.filter(v => v > 0).map(getClassName));
                this.blueprint.classList.add(...classes.filter(v => v < 0).map(getClassName));
            }
        }
    }

    getCommentNodes(justSelected = false) {
        return this.blueprint.querySelectorAll(
            `ueb-node[data-type="${Configuration.paths.comment}"]${justSelected ? '[data-selected="true"]' : ''}`
            + `, ueb-node[data-type="${Configuration.paths.materialGraphNodeComment}"]${justSelected ? '[data-selected="true"]' : ''}`
        )
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        return /** @type {PinElement} */(this.blueprint.querySelector(
            `ueb-node[data-title="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        ))
    }

    getCopyInputObject() {
        return this.#copyInputObject
    }

    getPasteInputObject() {
        return this.#pasteInputObject
    }

    getZoomInputObject() {
        return this.#zoomInputObject
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    isPointVisible(x, y) {
        return false
    }

    gridTopVisibilityBoundary() {
        return this.blueprint.scaleCorrect(this.blueprint.scrollY) - this.blueprint.translateY
    }

    gridRightVisibilityBoundary() {
        return this.gridLeftVisibilityBoundary() + this.blueprint.scaleCorrect(this.viewportSize[0])
    }

    gridBottomVisibilityBoundary() {
        return this.gridTopVisibilityBoundary() + this.blueprint.scaleCorrect(this.viewportSize[1])
    }

    gridLeftVisibilityBoundary() {
        return this.blueprint.scaleCorrect(this.blueprint.scrollX) - this.blueprint.translateX
    }

    centerViewport(x = 0, y = 0, smooth = true) {
        const centerX = this.gridLeftVisibilityBoundary() + this.blueprint.scaleCorrect(this.viewportSize[0] / 2);
        const centerY = this.gridTopVisibilityBoundary() + this.blueprint.scaleCorrect(this.viewportSize[1] / 2);
        this.blueprint.scrollDelta(
            this.blueprint.scaleCorrectReverse(x - centerX),
            this.blueprint.scaleCorrectReverse(y - centerY),
            smooth
        );
    }

    centerContentInViewport(smooth = true) {
        let avgX = 0;
        let avgY = 0;
        let minX = Number.MAX_SAFE_INTEGER;
        let maxX = Number.MIN_SAFE_INTEGER;
        let minY = Number.MAX_SAFE_INTEGER;
        let maxY = Number.MIN_SAFE_INTEGER;
        const nodes = this.blueprint.getNodes();
        for (const node of nodes) {
            avgX += node.leftBoundary() + node.rightBoundary();
            avgY += node.topBoundary() + node.bottomBoundary();
            minX = Math.min(minX, node.leftBoundary());
            maxX = Math.max(maxX, node.rightBoundary());
            minY = Math.min(minY, node.topBoundary());
            maxY = Math.max(maxY, node.bottomBoundary());
        }
        avgX = Math.round(maxX - minX <= this.viewportSize[0]
            ? (maxX + minX) / 2
            : avgX / (2 * nodes.length)
        );
        avgY = Math.round(maxY - minY <= this.viewportSize[1]
            ? (maxY + minY) / 2
            : avgY / (2 * nodes.length)
        );
        this.centerViewport(avgX, avgY, smooth);
    }
}

/** @extends {IElement<BlueprintEntity, BlueprintTemplate>} */
class Blueprint extends IElement {

    static properties = {
        selecting: {
            type: Boolean,
            attribute: "data-selecting",
            reflect: true,
            converter: Utility.booleanConverter,
        },
        scrolling: {
            type: Boolean,
            attribute: "data-scrolling",
            reflect: true,
            converter: Utility.booleanConverter,
        },
        focused: {
            type: Boolean,
            attribute: "data-focused",
            reflect: true,
            converter: Utility.booleanConverter,
        },
        zoom: {
            type: Number,
            attribute: "data-zoom",
            reflect: true,
        },
        scrollX: {
            type: Number,
            attribute: false,
        },
        scrollY: {
            type: Number,
            attribute: false,
        },
        additionalX: {
            type: Number,
            attribute: false,
        },
        additionalY: {
            type: Number,
            attribute: false,
        },
        translateX: {
            type: Number,
            attribute: false,
        },
        translateY: {
            type: Number,
            attribute: false,
        },
    }
    /** @param {NodeElement} node */
    static nodeBoundariesSupplier = node => {
        return {
            primaryInf: node.leftBoundary(true),
            primarySup: node.rightBoundary(true),
            // Counter intuitive here: the y (secondary axis is positive towards the bottom, therefore upper bound "sup" is bottom)
            secondaryInf: node.topBoundary(true),
            secondarySup: node.bottomBoundary(true),
        }
    }
    /** @type {(node: NodeElement, selected: Boolean) => void}} */
    static nodeSelectToggleFunction = (node, selected) => {
        node.setSelected(selected);
    }

    #xScrollingAnimationId = 0
    #yScrollingAnimationId = 0
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    /** @type {Map<String, NodeElement>} */
    nodesNames = new Map()
    /** @type {Coordinates} */
    mousePosition = [0, 0]
    waitingExpandUpdate = false

    constructor() {
        super();
        this.selecting = false;
        this.scrolling = false;
        this.focused = false;
        this.zoom = 0;
        this.scrollX = Configuration.expandGridSize;
        this.scrollY = Configuration.expandGridSize;
        this.translateX = Configuration.expandGridSize;
        this.translateY = Configuration.expandGridSize;
        super.initialize(new BlueprintEntity(), new BlueprintTemplate());
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }

    getGridDOMElement() {
        return this.template.gridElement
    }

    getScroll() {
        return [this.scrollX, this.scrollY]
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    setScroll(x, y) {
        this.scrollX = x;
        this.scrollY = y;
    }

    scrollDelta(x = 0, y = 0, smooth = false, scrollTime = Configuration.smoothScrollTime) {
        if (smooth) {
            let previousScrollDelta = [0, 0];
            if (this.#xScrollingAnimationId) {
                cancelAnimationFrame(this.#xScrollingAnimationId);
            }
            if (this.#yScrollingAnimationId) {
                cancelAnimationFrame(this.#yScrollingAnimationId);
            }
            Utility.animate(
                0,
                x,
                scrollTime,
                x => {
                    this.scrollDelta(x - previousScrollDelta[0], 0, false);
                    previousScrollDelta[0] = x;
                },
                id => this.#xScrollingAnimationId = id
            );
            Utility.animate(
                0,
                y,
                scrollTime,
                y => {
                    this.scrollDelta(0, y - previousScrollDelta[1], false);
                    previousScrollDelta[1] = y;
                },
                id => this.#yScrollingAnimationId = id
            );
        } else {
            const maxScroll = [2 * Configuration.expandGridSize, 2 * Configuration.expandGridSize];
            let currentScroll = this.getScroll();
            let finalScroll = [
                currentScroll[0] + x,
                currentScroll[1] + y
            ];
            let expand = [0, 0];
            for (let i = 0; i < 2; ++i) {
                if (finalScroll[i] < Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                    // Expand left/top
                    expand[i] = -1;
                } else if (
                    finalScroll[i]
                    > maxScroll[i] - Configuration.gridExpandThreshold * Configuration.expandGridSize
                ) {
                    // Expand right/bottom
                    expand[i] = 1;
                }
            }
            if (expand[0] != 0 || expand[1] != 0) {
                this.seamlessExpand(expand[0], expand[1]);
            }
            currentScroll = this.getScroll();
            finalScroll = [
                currentScroll[0] + x,
                currentScroll[1] + y
            ];
            this.setScroll(finalScroll[0], finalScroll[1]);
        }
    }

    scrollCenter(smooth = false) {
        const scroll = this.getScroll();
        const offset = [
            this.translateX - scroll[0],
            this.translateY - scroll[1]
        ];
        const targetOffset = this.getViewportSize().map(size => size / 2);
        const deltaOffset = [
            offset[0] - targetOffset[0],
            offset[1] - targetOffset[1]
        ];
        this.scrollDelta(deltaOffset[0], deltaOffset[1], smooth);
    }

    getViewportSize() {
        return [
            this.template.viewportElement.clientWidth,
            this.template.viewportElement.clientHeight,
        ]
    }

    getScrollMax() {
        return [
            this.template.viewportElement.scrollWidth - this.template.viewportElement.clientWidth,
            this.template.viewportElement.scrollHeight - this.template.viewportElement.clientHeight,
        ]
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    snapToGrid(x, y) {
        return Utility.snapToGrid(x, y, Configuration.gridSize)
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    seamlessExpand(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        let scale = this.getScale();
        {
            // If the expansion is towards the left or top, then scroll back to give the illusion that the content is in the same position and translate it accordingly
            [x, y] = [-x * Configuration.expandGridSize, -y * Configuration.expandGridSize];
            if (x != 0) {
                this.scrollX += x;
                x /= scale;
            }
            if (y != 0) {
                this.scrollY += y;
                y /= scale;
            }
        }
        this.translateX += x;
        this.translateY += y;
    }

    progressiveSnapToGrid(x) {
        return Configuration.expandGridSize * Math.round(x / Configuration.expandGridSize + 0.5 * Math.sign(x))
    }

    getZoom() {
        return this.zoom
    }

    setZoom(zoom, center) {
        zoom = Utility.clamp(zoom, Configuration.minZoom, Configuration.maxZoom);
        if (zoom == this.zoom) {
            return
        }
        let initialScale = this.getScale();
        this.zoom = zoom;

        if (center) {
            center[0] += this.translateX;
            center[1] += this.translateY;
            let relativeScale = this.getScale() / initialScale;
            let newCenter = [
                relativeScale * center[0],
                relativeScale * center[1],
            ];
            this.scrollDelta(
                (newCenter[0] - center[0]) * initialScale,
                (newCenter[1] - center[1]) * initialScale,
            );
        }
    }

    getScale() {
        return Configuration.scale[this.getZoom()]
    }

    /** @param {Number} value */
    scaleCorrect(value) {
        return value / this.getScale()
    }

    /** @param {Number} value */
    scaleCorrectReverse(value) {
        return value * this.getScale()
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {[Number, Number]}
     */
    compensateTranslation(x, y) {
        x -= this.translateX;
        y -= this.translateY;
        return [x, y]
    }

    getNodes(
        selected = false,
        [t, r, b, l] = [
            Number.MIN_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER,
        ]
    ) {
        let result = this.nodes;
        if (selected) {
            result = result.filter(n => n.selected);
        }
        if (
            t > Number.MIN_SAFE_INTEGER
            || r < Number.MAX_SAFE_INTEGER
            || b < Number.MAX_SAFE_INTEGER
            || l > Number.MIN_SAFE_INTEGER
        ) {
            result = result.filter(n => {
                return n.topBoundary() >= t && n.rightBoundary() <= r && n.bottomBoundary() <= b && n.leftBoundary() >= l
            });
        }
        return result
    }

    getCommentNodes(justSelected = false) {
        let result = /** @type {NodeElement[]} */([...this.template.getCommentNodes(justSelected)]);
        if (result.length === 0) {
            result = this.nodes.filter(n =>
                n.getType() === Configuration.paths.comment && (!justSelected || n.selected)
            );
        }
        return result
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        let result = this.template.getPin(pinReference);
        // Remember could be renamed in the meantime and DOM not yet updated
        if (!result || result.nodeElement.getNodeName() != pinReference.objectName.toString()) {
            // Slower fallback
            result = [... this.nodes
                .find(n => pinReference.objectName.toString() == n.getNodeName())
                ?.getPinElements() ?? []]
                .find(p => pinReference.pinGuid.toString() == p.getPinId().toString());
        }
        return result
    }

    /**
     * @param {PinElement?} a
     * @param {PinElement?} b
     */
    getLinks(a = null, b = null) {
        if ((a == null) != (b == null)) {
            const pin = a ?? b;
            return this.links.filter(link => link.source == pin || link.destination == pin)
        }
        if (a != null && b != null) {
            return this.links.filter(link =>
                link.source == a && link.destination == b
                || link.source == b && link.destination == a
            )
        }
        return this.links
    }

    /**
     * @param {PinElement} sourcePin
     * @param {PinElement} destinationPin
     */
    getLink(sourcePin, destinationPin, strictDirection = false) {
        return this.links.find(link =>
            link.source == sourcePin && link.destination == destinationPin
            || !strictDirection && link.source == destinationPin && link.destination == sourcePin
        )
    }

    selectAll() {
        this.getNodes().forEach(node => Blueprint.nodeSelectToggleFunction(node, true));
    }

    unselectAll() {
        this.getNodes().forEach(node => Blueprint.nodeSelectToggleFunction(node, false));
    }

    /** @param  {...IElement} graphElements */
    addGraphElement(...graphElements) {
        /** @param {CustomEvent} event */
        const removeEventHandler = event => {
            const target = event.currentTarget;
            target.removeEventListener(Configuration.removeEventName, removeEventHandler);
            const [graphElementsArray, entity] = target instanceof NodeElement
                ? [this.nodes, target.entity]
                : target instanceof LinkElement
                    ? [this.links]
                    : null;
            // @ts-expect-error
            const index = graphElementsArray?.indexOf(target);
            if (index >= 0) {
                const last = graphElementsArray.pop();
                if (index < graphElementsArray.length) {
                    graphElementsArray[index] = last;
                }
            }
            if (entity) {
                this.entity.removeObjectEntity(entity);
            }
        };
        for (const element of graphElements) {
            element.blueprint = this;
            if (element instanceof NodeElement && !this.nodes.includes(element)) {
                const name = element.entity.getObjectName();
                const homonym = this.entity.getHomonymObjectEntity(element.entity);
                if (homonym) {
                    homonym.Name = this.entity.getFreeName(name);
                }
                this.nodes.push(element);
                this.entity.addObjectEntity(element.entity);
                element.addEventListener(Configuration.removeEventName, removeEventHandler);
                this.template.nodesContainerElement?.appendChild(element);
            } else if (element instanceof LinkElement && !this.links.includes(element)) {
                this.links.push(element);
                element.addEventListener(Configuration.removeEventName, removeEventHandler);
                if (this.template.linksContainerElement && !this.template.linksContainerElement.contains(element)) {
                    this.template.linksContainerElement.appendChild(element);
                }
            }
        }
        graphElements.filter(element => element instanceof NodeElement).forEach(
            node => /** @type {NodeElement} */(node).sanitizeLinks(graphElements)
        );
        graphElements
            .filter(element => element instanceof NodeElement && element.getType() == Configuration.paths.comment)
            .forEach(element => element.updateComplete.then(() =>
                /** @type {CommentNodeTemplate} */(element.template).manageNodesBind()
            ));
    }

    /** @param  {...IElement} graphElements */
    removeGraphElement(...graphElements) {
        for (let element of graphElements) {
            if (element.closest("ueb-blueprint") !== this) {
                return
            }
            element.remove();
        }
    }

    setFocused(value = true) {
        if (this.focused == value) {
            return
        }
        let event = new CustomEvent(value ? Configuration.focusEventName.begin : Configuration.focusEventName.end);
        this.focused = value;
        if (!this.focused) {
            this.unselectAll();
        }
        this.dispatchEvent(event);
    }

    /** @param {Boolean} begin */
    acknowledgeEditText(begin) {
        const event = new CustomEvent(
            begin
                ? Configuration.editTextEventName.begin
                : Configuration.editTextEventName.end
        );
        this.dispatchEvent(event);
    }
}

customElements.define("ueb-blueprint", Blueprint);

/**
 * @template {IDraggableElement} T
 * @extends {IDraggableTemplate<T>}
 */
class IDraggableControlTemplate extends IDraggableTemplate {

    /** @type {(x: Number, y: Number) => void} */
    #locationChangeCallback
    get locationChangeCallback() {
        return this.#locationChangeCallback
    }
    set locationChangeCallback(callback) {
        this.#locationChangeCallback = callback;
    }

    movementSpace
    movementSpaceSize = [0, 0]

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.movementSpace = this.element.parentElement;
    }

    setup() {
        super.setup();
        const bounding = this.movementSpace.getBoundingClientRect();
        this.movementSpaceSize = [bounding.width, bounding.height];
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.blueprint, {
            draggableElement: this.movementSpace,
            ignoreTranslateCompensate: true,
            moveEverywhere: true,
            movementSpace: this.movementSpace,
            repositionOnClick: true,
            stepSize: 1,
        })
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Coordinates}
     */
    adjustLocation(x, y) {
        this.locationChangeCallback?.(x, y);
        return [x, y]
    }
}

/** @extends {IDraggableControlTemplate<ColorHandlerElement>} */
class ColorHandlerTemplate extends IDraggableControlTemplate {

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Coordinates}
     */
    adjustLocation(x, y) {
        const radius = Math.round(this.movementSpaceSize[0] / 2);
        x = x - radius;
        y = -(y - radius);
        let [r, theta] = Utility.getPolarCoordinates(x, y);
        r = Math.min(r, radius), [x, y] = Utility.getCartesianCoordinates(r, theta);
        this.locationChangeCallback?.(x / radius, y / radius);
        x = Math.round(x + radius);
        y = Math.round(-y + radius);
        return [x, y]
    }
}

/**
 * @template {IEntity} T
 * @template {IDraggableControlTemplate} U
 * @extends {IDraggableElement<T, U>}
 */
class IDraggableControlElement extends IDraggableElement {

    /** @type {WindowElement} */
    windowElement

    setup() {
        super.setup();
        this.windowElement = this.closest("ueb-window");
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    setLocation(x, y) {
        super.setLocation(...this.template.adjustLocation(x, y));
    }
}

/** @extends {IDraggableControlElement<Object, ColorHandlerTemplate>} */
class ColorHandlerElement extends IDraggableControlElement {

    constructor() {
        super();
        super.initialize({}, new ColorHandlerTemplate());
    }

    static newObject() {
        return new ColorHandlerElement()
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }
}

/** @extends {IDraggableControlTemplate<ColorHandlerElement>} */
class ColorSliderTemplate extends IDraggableControlTemplate {

    /**
     * @param {Number} x
     * @param {Number} y
     * @return {Coordinates}
     */
    adjustLocation(x, y) {
        x = Utility.clamp(x, 0, this.movementSpaceSize[0]);
        y = Utility.clamp(y, 0, this.movementSpaceSize[1]);
        this.locationChangeCallback?.(x / this.movementSpaceSize[0], 1 - y / this.movementSpaceSize[1]);
        return [x, y]
    }
}

/** @extends {IDraggableControlElement<Object, ColorSliderTemplate>} */
class ColorSliderElement extends IDraggableControlElement {

    constructor() {
        super();
        super.initialize({}, new ColorSliderTemplate());
    }

    static newObject() {
        return new ColorSliderElement()
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }
}

/**
* @template {IDraggableElement} T
* @extends {IMouseClickDrag<T>}
*/
class MouseIgnore extends IMouseClickDrag {

    constructor(target, blueprint, options = {}) {
        options.consumeEvent = true;
        super(target, blueprint, options);
    }
}

/** @extends {ITemplate<DropdownElement>} */
class DropdownTemplate extends ITemplate {

    /** @type {HTMLSelectElement} */
    #selectElement

    /** @type {HTMLSelectElement} */
    #referenceSelectElement

    #changeHandler = e => this.element.selectedOption = /** @type {HTMLSelectElement} */(e.target)
        .selectedOptions[0]
        .value

    render() {
        return x`
            <select class="ueb-pin-input-content" @change="${this.#changeHandler}">
                ${this.element.options.map(([k, v]) => x`
                    <option value="${k}" ?selected="${k === this.element.selectedOption}">${v}</option>
                `)}
            </select>
            <select style="visibility: hidden; position: fixed;">
                <option>${this.element.selectedOption}</option>
            </select>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.#selectElement = this.element.querySelector("select:first-child");
        this.#referenceSelectElement = this.element.querySelector("select:last-child");
        const event = new Event("input", { bubbles: true });
        this.#selectElement.dispatchEvent(event);
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties);
        const bounding = this.#referenceSelectElement.getBoundingClientRect();
        this.element.style.setProperty("--ueb-dropdown-width", bounding.width + "px");
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            // Prevents creating links when selecting text and other undesired mouse actions detection
            new MouseIgnore(this.element, this.blueprint),
        ]
    }

    setSelectedValue(value) {
        /** @type {HTMLOptionElement} */(this.element.querySelector(`option[value="${value}"]`)).defaultSelected = true;
    }

    getSelectedValue() {
        return this.#selectElement.value
    }
}

/** @extends {IElement<Object, DropdownTemplate>} */
class DropdownElement extends IElement {

    static properties = {
        ...super.properties,
        options: {
            type: Object,
        },
        selectedOption: {
            type: String,
        },
    }

    constructor() {
        super();
        super.initialize({}, new DropdownTemplate());
        this.options = /** @type {[String, String][]} */([]);
        this.selectedOption = "";
    }

    /** @param {[String, String][]} options */
    static newObject(options) {
        const result = new DropdownElement();
        return result
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }

    getValue() {
        return this.template.getSelectedValue()
    }
}

/** @extends {ITemplate<InputElement>} */
class InputTemplate extends ITemplate {

    #focusHandler = () => {
        this.blueprint.acknowledgeEditText(true);
        if (this.element.selectOnFocus) {
            getSelection().selectAllChildren(this.element);
        }
    }

    #focusoutHandler = () => {
        this.blueprint.acknowledgeEditText(false);
        getSelection().removeAllRanges(); // Deselect eventually selected text inside the input
    }

    /** @param {Event} e */
    #inputSingleLineHandler = e =>
        /** @type {HTMLElement} */(e.target).querySelectorAll("br").forEach(br => br.remove())

    /** @param {KeyboardEvent} e */
    #onKeydownBlurOnEnterHandler = e => {
        if (e.code == "Enter" && !e.shiftKey) {
            /** @type {HTMLElement} */(e.target).blur();
        }
    }

    /** @param {InputElement} element */
    initialize(element) {
        super.initialize(element);
        this.element.classList.add("ueb-pin-input-content");
        this.element.setAttribute("role", "textbox");
        this.element.contentEditable = "true";
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        const event = new Event("input", { bubbles: true });
        this.element.dispatchEvent(event);
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            // Prevents creating links when selecting text and other undesired mouse actions detection
            new MouseIgnore(this.element, this.blueprint),
        ]
    }

    setup() {
        super.setup();
        this.element.addEventListener("focus", this.#focusHandler);
        this.element.addEventListener("focusout", this.#focusoutHandler);
        if (this.element.singleLine) {
            this.element.addEventListener("input", this.#inputSingleLineHandler);
        }
        if (this.element.blurOnEnter) {
            this.element.addEventListener("keydown", this.#onKeydownBlurOnEnterHandler);
        }
    }

    cleanup() {
        super.cleanup();
        this.element.removeEventListener("focus", this.#focusHandler);
        this.element.removeEventListener("focusout", this.#focusoutHandler);
        this.element.removeEventListener("input", this.#inputSingleLineHandler);
        this.element.removeEventListener("keydown", this.#onKeydownBlurOnEnterHandler);
    }
}

/** @extends {IElement<Object, InputTemplate>} */
class InputElement extends IElement {

    static properties = {
        ...super.properties,
        singleLine: {
            type: Boolean,
            attribute: "data-single-line",
            converter: Utility.booleanConverter,
            reflect: true,
        },
        selectOnFocus: {
            type: Boolean,
            attribute: "data-select-focus",
            converter: Utility.booleanConverter,
            reflect: true,
        },
        blurOnEnter: {
            type: Boolean,
            attribute: "data-blur-enter",
            converter: Utility.booleanConverter,
            reflect: true,
        },
    }

    constructor() {
        super();
        this.singleLine = false;
        this.selectOnFocus = true;
        this.blurOnEnter = true;
        super.initialize({}, new InputTemplate());
    }

    static newObject() {
        return new InputElement()
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }
}

/** @extends PinTemplate<Boolean> */
class BoolPinTemplate extends PinTemplate {

    /** @type {HTMLInputElement?} */
    #input

    #onChangeHandler = () => this.element.setDefaultValue(this.#input.checked)

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.#input = this.element.querySelector(".ueb-pin-input");
    }

    setup() {
        super.setup();
        this.#input?.addEventListener("change", this.#onChangeHandler);
    }

    cleanup() {
        super.cleanup();
        this.#input?.removeEventListener("change", this.#onChangeHandler);
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseIgnore(this.#input, this.blueprint),
        ]
    }

    renderInput() {
        return x`
            <input type="checkbox" class="ueb-pin-input-wrapper ueb-pin-input" ?checked="${this.element.defaultValue === true}" />
        `
    }
}

/**
 * @template {TerminalAttribute} T
 * @extends PinTemplate<T>
 */
class IInputPinTemplate extends PinTemplate {

    static singleLineInput = false
    static selectOnFocus = true
    static saveEachInputChange = false // Otherwise save only on focus out

    /** @type {HTMLElement} */
    #inputWrapper
    get inputWrapper() {
        return this.#inputWrapper
    }

    /** @type {HTMLElement[]} */
    #inputContentElements

    /** @param {String} value */
    static stringFromInputToUE(value) {
        return value
            .replace(/(?=\n\s*)\n$/, "") // Remove trailing double newline
    }

    /** @param {String} value */
    static stringFromUEToInput(value) {
        return value
            .replaceAll(/(?:\r|(?<=(?:^|[^\\])(?:\\\\)*)\\r)(?=\n)/g, "") // Remove \r leftover from \r\n
            .replace(/(?<=\n\s*)$/, "\n") // Put back trailing double newline
    }

    #setInput = () => this.setInputs(this.getInputs(), true)
    /** @param {Event} event */
    #checkWrapHandler = event => this.#updateWrapClass(/** @type {HTMLElement} */(event.target))

    /** @param {HTMLElement}  inputElement*/
    #updateWrapClass(inputElement) {
        const width = this.blueprint.scaleCorrect(this.#inputWrapper.getBoundingClientRect().width) + this.nameWidth;
        const inputWrapped = this.element.classList.contains("ueb-pin-input-wrap");
        if (!inputWrapped && width > Configuration.pinInputWrapWidth) {
            this.element.classList.add("ueb-pin-input-wrap");
        } else if (inputWrapped && width <= Configuration.pinInputWrapWidth) {
            this.element.classList.remove("ueb-pin-input-wrap");
        }
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        const Self = /** @type {typeof IInputPinTemplate} */(this.constructor);
        if (Self.canWrapInput && this.isInputRendered()) {
            this.element.addEventListener("input", this.#checkWrapHandler);
            this.nameWidth = this.blueprint.scaleCorrect(
                this.element.querySelector(".ueb-pin-name")?.getBoundingClientRect().width ?? 0
            );
        }
        this.#inputWrapper = this.element.querySelector(".ueb-pin-input-wrapper");
        this.#inputContentElements = /** @type {HTMLElement[]} */([...this.element.querySelectorAll("ueb-input")]);
    }

    setup() {
        super.setup();
        const Self = /** @type {typeof IInputPinTemplate} */(this.constructor);
        if (Self.saveEachInputChange) {
            this.element.addEventListener("input", this.#setInput);
        } else {
            this.element.addEventListener("focusout", this.#setInput);
        }
        if (Self.canWrapInput && this.isInputRendered()) {
            this.element.addEventListener("input", this.#checkWrapHandler);
            this.element.nodeElement.addEventListener(Configuration.nodeReflowEventName, this.#checkWrapHandler);
        }
    }

    cleanup() {
        super.cleanup();
        this.element.nodeElement.removeEventListener(Configuration.nodeReflowEventName, this.#checkWrapHandler);
        this.element.removeEventListener("input", this.#checkWrapHandler);
        this.element.removeEventListener("input", this.#setInput);
        this.element.removeEventListener("focusout", this.#setInput);

    }

    getInput() {
        return this.getInputs().reduce((acc, cur) => acc + cur, "")
    }

    getInputs() {
        return this.#inputContentElements.map(element =>
            // Faster than innerText which causes reflow
            Utility.clearHTMLWhitespace(element.innerHTML)
        )
    }

    /** @param {String[]} values */
    setInputs(values = [], updateDefaultValue = true) {
        this.#inputContentElements.forEach(/** @type {typeof IInputPinTemplate } */(this.constructor).singleLineInput
            ? (elem, i) => elem.innerText = values[i]
            : (elem, i) => elem.innerText = values[i].replaceAll("\n", "")
        );
        if (updateDefaultValue) {
            this.setDefaultValue(values.map(v => IInputPinTemplate.stringFromInputToUE(v)), values);
        }
        this.element.requestUpdate();
        this.element.nodeElement.acknowledgeReflow();
    }

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(
            // @ts-expect-error
            values.join("")
        );
    }

    renderInput() {
        const Self = /** @type {typeof IInputPinTemplate} */(this.constructor);
        const singleLine = Self.singleLineInput;
        const selectOnFocus = Self.selectOnFocus;
        return x`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${singleLine}" .selectOnFocus="${selectOnFocus}"
                    .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.getDefaultValue()?.toString() ?? "")}">
                </ueb-input>
            </div>
        `
    }
}

/** @extends IInputPinTemplate<EnumEntity> */
class EnumPinTemplate extends IInputPinTemplate {

    static saveEachInputChange = true // Otherwise save only on focus out

    /** @type {DropdownElement} */
    #dropdownElement

    #dropdownEntries = []

    setup() {
        super.setup();
        const enumEntries = this.element.nodeElement.entity.EnumEntries;
        this.#dropdownEntries =
            enumEntries?.map(k => {
                if (k === "") {
                    k = "None";
                }
                return [
                    k,
                    this.element.nodeElement.getPinEntities().find(pinEntity => k === pinEntity.PinName)
                        ?.PinFriendlyName.toString()
                    ?? k
                ]
            })
            ?? Configuration.CommonEnums[this.element.entity.getSubCategory()]?.map(k =>
                k instanceof Array
                    ? k
                    : [k, Utility.formatStringName(k)]
            )
            ?? [];
        const defaultEntry = this.element.getDefaultValue().toString();
        if (!this.#dropdownEntries.find(([k, v]) => k === defaultEntry)) {
            this.#dropdownEntries.push([defaultEntry, Utility.formatStringName(defaultEntry)]);
        }
        this.element.requestUpdate();
    }

    renderInput() {
        this.element.nodeElement.entity;
        return x`
            <ueb-dropdown
                class="ueb-pin-input-wrapper ueb-pin-input"
                .options="${this.#dropdownEntries}"
                .selectedOption="${this.element.defaultValue.value}"
            >
            </ueb-dropdown>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.#dropdownElement = this.element.querySelector("ueb-dropdown");
    }

    getInputs() {
        return [this.#dropdownElement.getValue()]
    }
}

class ExecPinTemplate extends PinTemplate {

    renderIcon() {
        return SVGIcon.execPin
    }

    renderName() {
        let pinName = this.element.entity.PinName;
        if (this.element.entity.PinFriendlyName) {
            pinName = this.element.entity.PinFriendlyName.toString();
        } else if (pinName === "execute" || pinName === "then") {
            return x``
        }
        return x`<span class="ueb-pin-name ueb-ellipsis-nowrap-text">${this.element.getPinDisplayName()}</span>`
    }
}

/**
 * @template {TerminalAttribute} T
 * @extends IInputPinTemplate<T>
 */
class INumericPinTemplate extends IInputPinTemplate {

    static singleLineInput = true

    /** @param {String[]} values */
    setInputs(values = [], updateDefaultValue = false) {
        if (!values || values.length == 0) {
            values = [this.getInput()];
        }
        super.setInputs(values, false);
        if (updateDefaultValue) {
            let parsedValues = [];
            for (const value of values) {
                let num = parseFloat(value);
                if (isNaN(num)) {
                    num = 0;
                    updateDefaultValue = false;
                }
                parsedValues.push(num);
            }
            this.setDefaultValue(parsedValues, values);
        }
    }

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        this.element.setDefaultValue(/** @type {T} */(values[0]));
        this.element.requestUpdate();
    }
}

/** @extends INumericPinTemplate<Integer64Entity> */
class Int64PinTemplate extends INumericPinTemplate {

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        this.element.setDefaultValue(new Integer64Entity(values[0]));
        this.element.requestUpdate();
    }

    renderInput() {
        return x`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${true}" .innerText="${this.element.getDefaultValue()?.toString() ?? "0"}">
                </ueb-input>
            </div>
        `
    }
}

/** @extends INumericPinTemplate<IntegerEntity> */
class IntPinTemplate extends INumericPinTemplate {

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        this.element.setDefaultValue(new IntegerEntity(values[0]));
        this.element.requestUpdate();
    }

    renderInput() {
        return x`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${true}" .innerText="${this.element.getDefaultValue()?.toString() ?? "0"}">
                </ueb-input>
            </div>
        `
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i$1{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i="important",n=" !"+i,o=e(class extends i$1{constructor(t$1){var e;if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||(null===(e=t$1.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ht){this.ht=new Set;for(const t in r)this.ht.add(t);return this.render(r)}this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];if(null!=e){this.ht.add(t);const r="string"==typeof e&&e.endsWith(n);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?i:""):s[t]=e;}}return T}});

/** @extends {IDraggablePositionedTemplate<WindowElement>} */
class WindowTemplate extends IDraggablePositionedTemplate {

    toggleAdvancedDisplayHandler

    getDraggableElement() {
        return /** @type {WindowElement} */(this.element.querySelector(".ueb-window-top"))
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.blueprint, {
            draggableElement: this.getDraggableElement(),
            ignoreScale: true,
            ignoreTranslateCompensate: false,
            movementSpace: this.blueprint,
            stepSize: 1,
        })
    }

    setup() {
        const leftBoundary = this.blueprint.template.gridLeftVisibilityBoundary();
        const topBoundary = this.blueprint.template.gridTopVisibilityBoundary();
        this.element.locationX = this.blueprint.scaleCorrectReverse(this.blueprint.mousePosition[0] - leftBoundary);
        this.element.locationY = this.blueprint.scaleCorrectReverse(this.blueprint.mousePosition[1] - topBoundary);
        this.element.updateComplete.then(() => {
            const bounding = this.blueprint.getBoundingClientRect();
            if (this.element.locationX + this.element.sizeX > bounding.width) {
                this.element.locationX = bounding.width - this.element.sizeX;
            }
            this.element.locationX = Math.max(0, this.element.locationX);
            if (this.element.locationY + this.element.sizeY > bounding.height) {
                this.element.locationY = bounding.height - this.element.sizeY;
            }
            this.element.locationY = Math.max(0, this.element.locationY);
        });
    }

    render() {
        return x`
            <div class="ueb-window">
                <div class="ueb-window-top">
                    <div class="ueb-window-name ueb-ellipsis-nowrap-text">${this.renderWindowName()}</div>
                    <div class="ueb-window-close" @click="${() => this.element.remove()}">
                        ${SVGIcon.close}
                    </div>
                </div>
                <div class="ueb-window-content">
                    ${this.renderContent()}
                </div>
            </div>
        `
    }

    renderWindowName() {
        return x`Window`
    }

    renderContent() {
        return x``
    }

    apply() {
        this.element.dispatchEvent(new CustomEvent(Configuration.windowApplyEventName));
        this.element.remove();
    }

    cancel() {
        this.element.dispatchEvent(new CustomEvent(Configuration.windowCancelEventName));
        this.element.remove();
    }
}

class ColorPickerWindowTemplate extends WindowTemplate {

    /** @type {ColorHandlerElement} */ #wheelHandler
    /** @type {ColorSliderElement} */ #saturationSlider
    /** @type {ColorSliderElement} */ #valueSlider
    /** @type {ColorSliderElement} */ #rSlider
    /** @type {ColorSliderElement} */ #gSlider
    /** @type {ColorSliderElement} */ #bSlider
    /** @type {ColorSliderElement} */ #aSlider
    /** @type {ColorSliderElement} */ #hSlider
    /** @type {ColorSliderElement} */ #sSlider
    /** @type {ColorSliderElement} */ #vSlider

    #hexRGBHandler =
        /** @param {UIEvent} v */
        v => {
            // Faster than innerText which causes reflow
            const input = Utility.clearHTMLWhitespace(/** @type {HTMLElement} */(v.target).innerHTML);
            const RGBAValue = parseInt(input, 16);
            if (isNaN(RGBAValue)) {
                return
            }
            this.color.setFromRGBANumber(RGBAValue);
            this.element.requestUpdate();
        }

    #hexSRGBHandler =
        /** @param {UIEvent} v */
        v => {
            // Faster than innerText which causes reflow
            const input = Utility.clearHTMLWhitespace(/** @type {HTMLElement} */(v.target).innerHTML);
            const sRGBAValue = parseInt(input, 16);
            if (isNaN(sRGBAValue)) {
                return
            }
            this.color.setFromSRGBANumber(sRGBAValue);
            this.element.requestUpdate();
        }

    #doOnEnter =
        /** @param {(e: UIEvent) => void} action */
        action =>
            /** @param {KeyboardEvent} e */
            e => {
                if (e.code == "Enter") {
                    e.preventDefault();
                    action(e);
                }
            }

    #color = new LinearColorEntity()
    get color() {
        return this.#color
    }
    set color(value) {
        if (value.toNumber() == this.color?.toNumber()) {
            return
        }
        this.element.requestUpdate("color", this.#color);
        this.#color = value;
    }

    #fullColor = new LinearColorEntity()
    get fullColor() {
        return this.#fullColor
    }

    /** @type {LinearColorEntity} */
    #initialColor
    get initialColor() {
        return this.#initialColor
    }

    #tempColor = new LinearColorEntity()

    #colorHexReplace(channel, value, opaque = false) {
        const colorHex = this.color.toRGBAString();
        const result = `${colorHex.substring(0, 2 * channel)}${value}${colorHex.substring(2 + 2 * channel)}`;
        return opaque ? `${result.substring(0, 6)}FF` : result
    }


    /** @param {WindowElement} element */
    initialize(element) {
        super.initialize(element);
        this.#initialColor = this.element.windowOptions.getPinColor();
        this.color.setFromHSVA(
            this.initialColor.H.value,
            this.initialColor.S.value,
            this.initialColor.V.value,
            this.initialColor.A.value,
        );
        this.fullColor.setFromHSVA(this.color.H.value, 1, 1, 1);
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        this.#wheelHandler = this.element.querySelector(".ueb-color-picker-wheel ueb-color-handler");
        this.#saturationSlider = this.element.querySelector(".ueb-color-picker-saturation ueb-ui-slider");
        this.#valueSlider = this.element.querySelector(".ueb-color-picker-value ueb-ui-slider");
        this.#rSlider = this.element.querySelector(".ueb-color-picker-r ueb-ui-slider");
        this.#gSlider = this.element.querySelector(".ueb-color-picker-g ueb-ui-slider");
        this.#bSlider = this.element.querySelector(".ueb-color-picker-b ueb-ui-slider");
        this.#aSlider = this.element.querySelector(".ueb-color-picker-a ueb-ui-slider");
        this.#hSlider = this.element.querySelector(".ueb-color-picker-h ueb-ui-slider");
        this.#sSlider = this.element.querySelector(".ueb-color-picker-s ueb-ui-slider");
        this.#vSlider = this.element.querySelector(".ueb-color-picker-v ueb-ui-slider");
        this.#wheelHandler.template.locationChangeCallback =
            /**
             * @param {Number} x in the range [0, 1]
             * @param {Number} y in the range [0, 1]
             */
            (x, y) => {
                this.color.setFromWheelLocation(x, y, this.color.V.value, this.color.A.value);
                this.fullColor.setFromHSVA(this.color.H.value, 1, 1, 1);
                this.element.requestUpdate();
            };
        this.#saturationSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(this.color.H.value, y, this.color.V.value, this.color.A.value);
                this.element.requestUpdate();
            };
        this.#valueSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(this.color.H.value, this.color.S.value, y, this.color.A.value);
                this.element.requestUpdate();
            };
        this.#rSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromRGBA(x, this.color.G.value, this.color.B.value, this.color.A.value);
                this.element.requestUpdate();
            };
        this.#gSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromRGBA(this.color.R.value, x, this.color.B.value, this.color.A.value);
                this.element.requestUpdate();
            };
        this.#bSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromRGBA(this.color.R.value, this.color.G.value, x, this.color.A.value);
                this.element.requestUpdate();
            };
        this.#aSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromRGBA(this.color.R.value, this.color.G.value, this.color.B.value, x);
                this.element.requestUpdate();
            };
        this.#hSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(x, this.color.S.value, this.color.V.value, this.color.A.value);
                this.element.requestUpdate();
            };
        this.#sSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(this.color.H.value, x, this.color.V.value, this.color.A.value);
                this.element.requestUpdate();
            };
        this.#vSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(this.color.H.value, this.color.S.value, x, this.color.A.value);
                this.element.requestUpdate();
            };
    }

    /** @param {Number} channel */
    renderSlider(channel) {
        let channelLetter = "";
        let channelValue = 0;
        let background = "";
        const getCommonBackground = channel =>
            `linear-gradient(to right, #${this.#colorHexReplace(channel, '00', true)}, #${this.#colorHexReplace(channel, 'ff', true)})`;
        switch (channel) {
            case 0:
                channelLetter = "r";
                channelValue = this.color.R.value;
                background = getCommonBackground(channel);
                break
            case 1:
                channelLetter = "g";
                channelValue = this.color.G.value;
                background = getCommonBackground(channel);
                break
            case 2:
                channelLetter = "b";
                channelValue = this.color.B.value;
                background = getCommonBackground(channel);
                break
            case 3:
                channelLetter = "a";
                channelValue = this.color.A.value;
                background = `${Configuration.alphaPattern}, ${getCommonBackground(channel)}`;
                break
            case 4:
                channelLetter = "h";
                channelValue = this.color.H.value * 360;
                background = "linear-gradient(to right, #f00 0%, #ff0 16.666%, #0f0 33.333%, #0ff 50%, #00f 66.666%, #f0f 83.333%, #f00 100%)";
                break
            case 5:
                channelLetter = "s";
                channelValue = this.color.S.value;
                background = "linear-gradient("
                    + "to right,"
                    + `#${this.#tempColor.setFromHSVA(
                        this.color.H.value,
                        0,
                        this.color.V.value,
                        1
                    ), this.#tempColor.toRGBAString()},`
                    + `#${this.#tempColor.setFromHSVA(
                        this.color.H.value,
                        1,
                        this.color.V.value,
                        1,
                    ), this.#tempColor.toRGBAString()})`;
                break
            case 6:
                channelLetter = "v";
                channelValue = this.color.V.value;
                background = `linear-gradient(to right, #000, #${this.fullColor.toRGBAString()})`;
                break
        }
        background = `background: ${background};`;
        return x`
            <div class="ueb-color-picker-${channelLetter.toLowerCase()}">
                <span class="ueb-color-control-label">${channelLetter.toUpperCase()}</span>
                <div>
                    <div class="ueb-horizontal-slider">
                        <span class="ueb-horizontal-slider-text"
                            .innerText="${Utility.printNumber(Utility.roundDecimals(channelValue, 3))}">
                        </span>
                        <ueb-ui-slider></ueb-ui-slider>
                    </div>
                    <div class="ueb-color-picker-gradient" style="${background}"></div>
                </div>
            </div>
        `
    }

    renderContent() {
        const theta = this.color.H.value * 2 * Math.PI;
        const style = {
            "--ueb-color-r": this.color.R.toString(),
            "--ueb-color-g": this.color.G.toString(),
            "--ueb-color-b": this.color.B.toString(),
            "--ueb-color-a": this.color.A.toString(),
            "--ueb-color-h": this.color.H.toString(),
            "--ueb-color-s": this.color.S.toString(),
            "--ueb-color-v": this.color.V.toString(),
            "--ueb-color-wheel-x": `${(this.color.S.value * Math.cos(theta) * 0.5 + 0.5) * 100}%`,
            "--ueb-color-wheel-y": `${(this.color.S.value * Math.sin(theta) * 0.5 + 0.5) * 100}%`,
        };
        const colorRGB = this.color.toRGBAString();
        const colorSRGB = this.color.toSRGBAString();
        const fullColorHex = this.fullColor.toRGBAString();
        return x`
            <div class="ueb-color-picker" style="${o(style)}">
                <div class="ueb-color-picker-toolbar">
                    <div class="ueb-color-picker-theme"></div>
                    <div class="ueb-color-picker-srgb"></div>
                </div>
                <div class="ueb-color-picker-main">
                    <div class="ueb-color-picker-wheel">
                        <ueb-color-handler></ueb-color-handler>
                    </div>
                    <div class="ueb-color-picker-saturation ueb-vertical-slider"
                        style="background-color: #${fullColorHex}">
                        <ueb-ui-slider></ueb-ui-slider>
                    </div>
                    <div class="ueb-color-picker-value ueb-vertical-slider"
                        style="background-color: #${fullColorHex}">
                        <ueb-ui-slider></ueb-ui-slider>
                    </div>
                    <div class="ueb-color-picker-preview">
                        Old
                        <div class="ueb-color-picker-preview-old "
                            style="background: #${this.#initialColor.toRGBAString()}">
                        </div>
                        <div class="ueb-color-picker-preview-new">
                            <div class="ueb-color-picker-preview-1"
                                style="background: #${this.#colorHexReplace(3, "FF")}">
                            </div>
                            <div class="ueb-color-picker-preview-2"
                                style="background: ${`linear-gradient(#${colorRGB}, #${colorRGB}),${Configuration.alphaPattern}`}">
                            </div>
                        </div>
                        New
                    </div>
                </div>
                <div class="ueb-color-picker-advanced-toggle ueb-toggle-control">
                    Advanced
                </div>
                <div class="ueb-color-picker-advanced">
                    <div class="ueb-color-picker-column">
                        ${this.renderSlider(0)}
                        ${this.renderSlider(1)}
                        ${this.renderSlider(2)}
                        ${this.renderSlider(3)}
                    </div>
                    <div class="ueb-color-picker-column">
                        ${this.renderSlider(4)}
                        ${this.renderSlider(5)}
                        ${this.renderSlider(6)}
                        <div class="ueb-color-control">
                            <span class="ueb-color-control-label">Hex Linear</span>
                            <div class="ueb-color-picker-hex-linear ueb-text-input">
                                <ueb-input
                                    .innerText="${colorRGB}"
                                    @focusout="${this.#hexRGBHandler}"
                                    @keydown="${this.#doOnEnter(this.#hexRGBHandler)}">
                                </ueb-input>
                            </div>
                        </div>
                        <div class="ueb-color-control">
                             <span class="ueb-color-control-label">Hex sRGB</span>
                            <div class="ueb-color-picker-hex-srgb ueb-text-input">
                                <ueb-input
                                    .innerText="${colorSRGB}"
                                    @focusout="${this.#hexSRGBHandler}"
                                    @keydown="${this.#doOnEnter(this.#hexSRGBHandler)}">
                                </ueb-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ueb-buttons">
                    <div class="ueb-color-picker-ok ueb-button" @click="${() => this.apply()}">
                        ${Configuration.windowApplyButtonText}
                    </div>
                    <div class="ueb-color-picker-cancel ueb-button" @click="${() => this.cancel()}">
                        ${Configuration.windowCancelButtonText}
                    </div>
                </div>
            </div>
        `
    }

    renderWindowName() {
        return x`${Configuration.colorWindowName}`
    }
}

/** @extends PinTemplate<LinearColorEntity> */
class LinearColorPinTemplate extends PinTemplate {

    /** @type {WindowElement} */
    #window

    /** @param {MouseEvent} e */
    #launchColorPickerWindow = e => {
        e.preventDefault();
        this.blueprint.setFocused(true);
        /** @type {WindowElement} */
        this.#window = /** @type {WindowElementConstructor} */(ElementFactory.getConstructor("ueb-window"))
            .newObject({
                type: new ColorPickerWindowTemplate(),
                windowOptions: {
                    // The created window will use the following functions to get and set the color
                    getPinColor: () => this.element.defaultValue,
                    /** @param {LinearColorEntity} color */
                    setPinColor: color => this.element.setDefaultValue(color),
                },
            });
        this.blueprint.append(this.#window);
        const windowApplyHandler = () => {
            this.element.setDefaultValue(
                /** @type {ColorPickerWindowTemplate} */(this.#window.template).color
            );
        };
        const windowCloseHandler = () => {
            this.#window.removeEventListener(Configuration.windowApplyEventName, windowApplyHandler);
            this.#window.removeEventListener(Configuration.windowCloseEventName, windowCloseHandler);
            this.#window = null;
        };
        this.#window.addEventListener(Configuration.windowApplyEventName, windowApplyHandler);
        this.#window.addEventListener(Configuration.windowCloseEventName, windowCloseHandler);
    }

    renderInput() {
        return x`
            <span class="ueb-pin-input-wrapper ueb-pin-input" data-linear-color="${this.element.getDefaultValue()?.toString() ?? A}"
                @click="${this.#launchColorPickerWindow}"
                style="--ueb-linear-color: rgba(${this.element.getDefaultValue()?.toString() ?? A})">
            </span>
        `
    }
}

class NamePinTemplate extends IInputPinTemplate {

    static singleLineInput = true
}

/**
 * @template {Number} T
 * @extends INumericPinTemplate<T>
 */
class RealPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0]);
    }

    renderInput() {
        return x`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${true}"
                    .innerText="${Utility.printNumber(this.element.getDefaultValue() ?? 0)}">
                </ueb-input>
            </div>
        `
    }
}

class ReferencePinTemplate extends PinTemplate {

    renderIcon() {
        return SVGIcon.referencePin
    }
}

/** @extends INumericPinTemplate<RotatorEntity> */
class RotatorPinTemplate extends INumericPinTemplate {

    #getR() {
        return Utility.printNumber(this.element.getDefaultValue()?.R ?? 0)
    }

    #getP() {
        return Utility.printNumber(this.element.getDefaultValue()?.P ?? 0)
    }

    #getY() {
        return Utility.printNumber(this.element.getDefaultValue()?.Y ?? 0)
    }

    setDefaultValue(values = [], rawValues = values) {
        const rotator = this.element.getDefaultValue(true);
        if (!(rotator instanceof RotatorEntity)) {
            throw new TypeError("Expected DefaultValue to be a RotatorEntity")
        }
        rotator.R = values[0]; // Roll
        rotator.P = values[1]; // Pitch
        rotator.Y = values[2]; // Yaw
        this.element.requestUpdate("DefaultValue", rotator);
    }

    renderInput() {
        return x`
            <div class="ueb-pin-input-wrapper">
                <span class="ueb-pin-input-label">X</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getR()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Y</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getP()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Z</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getY()}"></ueb-input>
                </div>
            </div>
        `
    }
}

/** @extends IInputPinTemplate<String> */
class StringPinTemplate extends IInputPinTemplate {
}

/**
 * @extends INumericPinTemplate<Vector2DEntity>
 */
class VectorInputPinTemplate extends INumericPinTemplate {

    #getX() {
        return Utility.printNumber(this.element.getDefaultValue()?.X ?? 0)
    }

    #getY() {
        return Utility.printNumber(this.element.getDefaultValue()?.Y ?? 0)
    }

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values, rawValues) {
        const vector = this.element.getDefaultValue(true);
        if (!(vector instanceof Vector2DEntity)) {
            throw new TypeError("Expected DefaultValue to be a Vector2DEntity")
        }
        vector.X = values[0];
        vector.Y = values[1];
        this.element.requestUpdate("DefaultValue", vector);
    }

    renderInput() {
        return x`
            <div class="ueb-pin-input-wrapper">
                <span class="ueb-pin-input-label">X</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getX()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Y</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getY()}"></ueb-input>
                </div>
            </div>
        `
    }
}

/** @extends INumericPinTemplate<VectorEntity> */
class VectorPinTemplate extends INumericPinTemplate {

    #getX() {
        return Utility.printNumber(this.element.getDefaultValue()?.X ?? 0)
    }

    #getY() {
        return Utility.printNumber(this.element.getDefaultValue()?.Y ?? 0)
    }

    #getZ() {
        return Utility.printNumber(this.element.getDefaultValue()?.Z ?? 0)
    }

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values, rawValues) {
        const vector = this.element.getDefaultValue(true);
        if (!(vector instanceof VectorEntity)) {
            throw new TypeError("Expected DefaultValue to be a VectorEntity")
        }
        vector.X = values[0];
        vector.Y = values[1];
        vector.Z = values[2];
        this.element.requestUpdate("DefaultValue", vector);
    }

    renderInput() {
        return x`
            <div class="ueb-pin-input-wrapper">
                <span class="ueb-pin-input-label">X</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getX()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Y</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getY()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Z</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getZ()}"></ueb-input>
                </div>
            </div>
        `
    }
}

/**
 * @template {TerminalAttribute} T
 * @extends {IElement<PinEntity<T>, PinTemplate>}
 */
class PinElement extends IElement {

    static #inputPinTemplates = {
        "bool": BoolPinTemplate,
        "byte": IntPinTemplate,
        "enum": EnumPinTemplate,
        "int": IntPinTemplate,
        "int64": Int64PinTemplate,
        "MUTABLE_REFERENCE": ReferencePinTemplate,
        "name": NamePinTemplate,
        "rg": VectorInputPinTemplate,
        "real": RealPinTemplate,
        "string": StringPinTemplate,
        [Configuration.paths.linearColor]: LinearColorPinTemplate,
        [Configuration.paths.rotator]: RotatorPinTemplate,
        [Configuration.paths.vector]: VectorPinTemplate,
        [Configuration.paths.vector2D]: VectorInputPinTemplate,
    }

    static properties = {
        pinId: {
            type: GuidEntity,
            converter: {
                fromAttribute: (value, type) => value
                    ? GuidEntity.grammar.parse(value)
                    : null,
                toAttribute: (value, type) => /** @type {String} */(value?.toString()),
            },
            attribute: "data-id",
            reflect: true,
        },
        pinType: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
        advancedView: {
            type: String,
            attribute: "data-advanced-view",
            reflect: true,
        },
        color: {
            type: LinearColorEntity,
            converter: {
                fromAttribute: (value, type) => value
                    ? LinearColorEntity.getLinearColorFromAnyFormat().parse(value)
                    : null,
                toAttribute: (value, type) => value ? Utility.printLinearColor(value) : null,
            },
            attribute: "data-color",
            reflect: true,
        },
        defaultValue: {
            type: String,
            attribute: false,
        },
        isLinked: {
            type: Boolean,
            converter: Utility.booleanConverter,
            attribute: "data-linked",
            reflect: true,
        },
        pinDirection: {
            type: String,
            attribute: "data-direction",
            reflect: true,
        },
        connectable: {
            type: Boolean,
            converter: Utility.booleanConverter,
            attribute: "data-connectable",
            reflect: true,
        }
    }

    /** @type {NodeElement} */
    nodeElement

    /** @param {PinEntity<any>} pinEntity */
    static getTypeTemplate(pinEntity) {
        if (pinEntity.PinType.ContainerType?.toString() === "Array") {
            return PinTemplate
        }
        if (pinEntity.PinType.bIsReference && !pinEntity.PinType.bIsConst) {
            return PinElement.#inputPinTemplates["MUTABLE_REFERENCE"]
        }
        if (pinEntity.getType() === "exec") {
            return ExecPinTemplate
        }
        return (pinEntity.isInput() ? PinElement.#inputPinTemplates[pinEntity.getType()] : PinTemplate) ?? PinTemplate
    }

    static newObject(
        entity = new PinEntity(),
        template = /** @type {PinTemplate} */(new (PinElement.getTypeTemplate(entity))()),
        nodeElement = undefined
    ) {
        const result = new PinElement();
        result.initialize(entity, template, nodeElement);
        return result
    }

    initialize(
        entity = /** @type {PinEntity<T>} */(new PinEntity()),
        template = /** @type {PinTemplate} */(new (PinElement.getTypeTemplate(entity))()),
        nodeElement = undefined
    ) {
        this.nodeElement = nodeElement;
        this.advancedView = entity.bAdvancedView;
        this.isLinked = false;
        this.connectable = !entity.bNotConnectable;
        super.initialize(entity, template);
        this.pinType = this.entity.getType();
        this.defaultValue = this.entity.getDefaultValue();
        this.color = PinElement.properties.color.converter.fromAttribute(this.getColor().toString());
        this.pinDirection = entity.isInput() ? "input" : entity.isOutput() ? "output" : "hidden";
    }

    setup() {
        super.setup();
        this.nodeElement = this.closest("ueb-node");
    }

    createPinReference() {
        return new PinReferenceEntity({
            objectName: this.nodeElement.getNodeName(),
            pinGuid: this.getPinId(),
        })
    }

    /** @return {GuidEntity} */
    getPinId() {
        return this.entity.PinId
    }

    /** @returns {String} */
    getPinName() {
        return this.entity.PinName
    }

    getPinDisplayName() {
        return this.entity.pinDisplayName()
    }

    /** @return {CSSResult} */
    getColor() {
        return this.entity.pinColor()
    }

    isInput() {
        return this.entity.isInput()
    }

    isOutput() {
        return this.entity.isOutput()
    }

    getLinkLocation() {
        return this.template.getLinkLocation()
    }

    getNodeElement() {
        return this.nodeElement
    }

    getLinks() {
        return this.entity.LinkedTo ?? []
    }

    getDefaultValue(maybeCreate = false) {
        return this.defaultValue = this.entity.getDefaultValue(maybeCreate)
    }

    /** @param {T} value */
    setDefaultValue(value) {
        this.entity.DefaultValue = value;
        this.defaultValue = value;
        if (this.entity.recomputesNodeTitleOnChange) {
            this.nodeElement?.computeNodeDisplayName();
        }
    }

    /** @param  {IElement[]} nodesWhitelist */
    sanitizeLinks(nodesWhitelist = []) {
        this.entity.LinkedTo = this.entity.LinkedTo?.filter(pinReference => {
            let pin = this.blueprint.getPin(pinReference);
            if (pin) {
                if (nodesWhitelist.length && !nodesWhitelist.includes(pin.nodeElement)) {
                    return false
                }
                let link = this.blueprint.getLink(this, pin);
                if (!link) {
                    link = /** @type {LinkElementConstructor} */(ElementFactory.getConstructor("ueb-link"))
                        .newObject(this, pin);
                    this.blueprint.addGraphElement(link);
                }
            }
            return pin
        });
        this.isLinked = this.entity.isLinked();
    }

    /** @param {PinElement} targetPinElement */
    linkTo(targetPinElement) {
        const pinReference = this.createPinReference();
        if (
            this.isLinked
            && this.isOutput()
            && (this.pinType === "exec" || targetPinElement.pinType === "exec")
            && !this.getLinks().some(ref => pinReference.equals(ref))) {
            this.unlinkFromAll();
        }
        if (this.entity.linkTo(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked();
            this.nodeElement?.template.linksChanged();
            if (this.entity.recomputesNodeTitleOnChange) {
                this.nodeElement?.computeNodeDisplayName();
            }
        }
    }

    /** @param {PinElement} targetPinElement */
    unlinkFrom(targetPinElement, removeLink = true) {
        if (this.entity.unlinkFrom(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked();
            this.nodeElement?.template.linksChanged();
            if (removeLink) {
                this.blueprint.getLink(this, targetPinElement)?.remove(); // Might be called after the link is removed
            }
            if (this.entity.recomputesNodeTitleOnChange) {
                this.nodeElement?.computeNodeDisplayName();
            }
        }
    }

    unlinkFromAll() {
        const isLinked = this.getLinks().length;
        this.getLinks().map(ref => this.blueprint.getPin(ref)).forEach(pin => this.unlinkFrom(pin));
        if (isLinked) {
            this.nodeElement?.template.linksChanged();
        }
    }

    /**
     * @param {PinElement} originalPinElement
     * @param {PinReferenceEntity} newReference
     */
    redirectLink(originalPinElement, newReference) {
        const index = this.getLinks().findIndex(pinReference =>
            pinReference.objectName.toString() == originalPinElement.getNodeElement().getNodeName()
            && pinReference.pinGuid.valueOf() == originalPinElement.entity.PinId.valueOf()
        );
        if (index >= 0) {
            this.entity.LinkedTo[index] = newReference;
            return true
        }
        return false
    }
}

class OrderedIndexArray {

    /**
     * @param {(arrayElement: number) => number} comparisonValueSupplier
     * @param {number} value
     */
    constructor(comparisonValueSupplier = v => v, value = null) {
        this.array = new Uint32Array(value);
        this.comparisonValueSupplier = comparisonValueSupplier;
        this.length = 0;
        this.currentPosition = 0;
    }

    /** @param {number} index */
    get(index) {
        if (index >= 0 && index < this.length) {
            return this.array[index]
        }
        return null
    }

    getArray() {
        return this.array
    }

    /** @param {number} value */
    getPosition(value) {
        let l = 0;
        let r = this.length;
        while (l < r) {
            let m = Math.floor((l + r) / 2);
            if (this.comparisonValueSupplier(this.array[m]) < value) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l
    }

    reserve(length) {
        if (this.array.length < length) {
            let newArray = new Uint32Array(length);
            newArray.set(this.array);
            this.array = newArray;
        }
    }

    /** @param {number} element */
    insert(element, comparisonValue = null) {
        let position = this.getPosition(this.comparisonValueSupplier(element));
        if (
            position < this.currentPosition
            || comparisonValue != null && position == this.currentPosition && this.comparisonValueSupplier(element) < comparisonValue) {
            ++this.currentPosition;
        }
        this.shiftRight(position);
        this.array[position] = element;
        ++this.length;
        return position
    }

    /** @param {number} element */
    remove(element) {
        let position = this.getPosition(this.comparisonValueSupplier(element));
        if (this.array[position] == element) {
            this.removeAt(position);
        }
    }

    /** @param {number} position */
    removeAt(position) {
        if (position < this.currentPosition) {
            --this.currentPosition;
        }
        this.shiftLeft(position);
        --this.length;
        return position
    }

    getNext() {
        if (this.currentPosition >= 0 && this.currentPosition < this.length) {
            return this.get(this.currentPosition)
        }
        return null
    }

    getNextValue() {
        if (this.currentPosition >= 0 && this.currentPosition < this.length) {
            return this.comparisonValueSupplier(this.get(this.currentPosition))
        } else {
            return Number.MAX_SAFE_INTEGER
        }
    }

    getPrev() {
        if (this.currentPosition > 0) {
            return this.get(this.currentPosition - 1)
        }
        return null
    }

    getPrevValue() {
        if (this.currentPosition > 0) {
            return this.comparisonValueSupplier(this.get(this.currentPosition - 1))
        } else {
            return Number.MIN_SAFE_INTEGER
        }
    }

    shiftLeft(leftLimit, steps = 1) {
        this.array.set(this.array.subarray(leftLimit + steps), leftLimit);
    }

    shiftRight(leftLimit, steps = 1) {
        this.array.set(this.array.subarray(leftLimit, -steps), leftLimit + steps);
    }
}

/**
 * @typedef {typeof import("../Blueprint.js").default.nodeBoundariesSupplier} BoundariesFunction
 * @typedef {typeof import("../Blueprint.js").default.nodeSelectToggleFunction} SelectionFunction
 * @typedef {{
 *     primaryBoundary: Number,
 *     secondaryBoundary: Number,
 *     insertionPosition?: Number,
 *     rectangle: Number
 *     onSecondaryAxis: Boolean
 * }} Metadata
 */
class FastSelectionModel {

    /**
     * @param {Coordinates} initialPosition
     * @param {NodeElement[]} rectangles
     * @param {BoundariesFunction} boundariesFunc
     * @param {SelectionFunction} selectFunc
     */
    constructor(initialPosition, rectangles, boundariesFunc, selectFunc) {
        this.initialPosition = initialPosition;
        this.finalPosition = initialPosition;
        /** @type {Metadata[]} */
        this.metadata = new Array(rectangles.length);
        this.primaryOrder = new OrderedIndexArray((element) => this.metadata[element].primaryBoundary);
        this.secondaryOrder = new OrderedIndexArray((element) => this.metadata[element].secondaryBoundary);
        this.selectFunc = selectFunc;
        this.rectangles = rectangles;
        this.primaryOrder.reserve(this.rectangles.length);
        this.secondaryOrder.reserve(this.rectangles.length);

        rectangles.forEach((rect, index) => {
            /** @type {Metadata} */
            let rectangleMetadata = {
                primaryBoundary: this.initialPosition[0],
                secondaryBoundary: this.initialPosition[1],
                rectangle: index,
                onSecondaryAxis: false,
            };
            this.metadata[index] = rectangleMetadata;
            selectFunc(rect, false); // Initially deselected (Eventually)
            const rectangleBoundaries = boundariesFunc(rect);

            // Secondary axis first because it may be inserted in this.secondaryOrder during the primary axis check
            if (this.initialPosition[1] < rectangleBoundaries.secondaryInf) { // Initial position is before the rectangle
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondaryInf;
            } else if (rectangleBoundaries.secondarySup < this.initialPosition[1]) { // Initial position is after the rectangle
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondarySup;
            } else {
                rectangleMetadata.onSecondaryAxis = true;
            }

            if (this.initialPosition[0] < rectangleBoundaries.primaryInf) { // Initial position is before the rectangle
                rectangleMetadata.primaryBoundary = rectangleBoundaries.primaryInf;
                this.primaryOrder.insert(index);
            } else if (rectangleBoundaries.primarySup < this.initialPosition[0]) { // Initial position is after the rectangle
                rectangleMetadata.primaryBoundary = rectangleBoundaries.primarySup;
                this.primaryOrder.insert(index);
            } else { // Initial lays inside the rectangle (considering just this axis)
                // Secondary order depends on primary order, if primary boundaries are not satisfied, the element is not watched for secondary ones
                if (rectangleBoundaries.secondarySup < this.initialPosition[1] || this.initialPosition[1] < rectangleBoundaries.secondaryInf) {
                    this.secondaryOrder.insert(index);
                } else {
                    selectFunc(rect, true);
                }
            }
        });
        this.primaryOrder.currentPosition = this.primaryOrder.getPosition(this.initialPosition[0]);
        this.secondaryOrder.currentPosition = this.secondaryOrder.getPosition(this.initialPosition[1]);
        this.computeBoundaries();
    }

    computeBoundaries() {
        this.boundaries = {
            // Primary axis negative expanding
            primaryN: {
                v: this.primaryOrder.getPrevValue(),
                i: this.primaryOrder.getPrev()
            },
            primaryP: {
                v: this.primaryOrder.getNextValue(),
                i: this.primaryOrder.getNext()
            },
            // Secondary axis negative expanding
            secondaryN: {
                v: this.secondaryOrder.getPrevValue(),
                i: this.secondaryOrder.getPrev()
            },
            // Secondary axis positive expanding
            secondaryP: {
                v: this.secondaryOrder.getNextValue(),
                i: this.secondaryOrder.getNext()
            }
        };
    }

    selectTo(finalPosition) {
        const direction = [
            Math.sign(finalPosition[0] - this.initialPosition[0]),
            Math.sign(finalPosition[1] - this.initialPosition[1])
        ];
        const primaryBoundaryCrossed = (index, added) => {
            if (this.metadata[index].onSecondaryAxis) {
                this.selectFunc(this.rectangles[index], added);
            } else {
                if (added) {
                    this.secondaryOrder.insert(index, finalPosition[1]);
                    const secondaryBoundary = this.metadata[index].secondaryBoundary;
                    if (
                        // If inserted before the current position
                        Math.sign(finalPosition[1] - secondaryBoundary) == direction[1]
                        // And after initial position
                        && Math.sign(secondaryBoundary - this.initialPosition[1]) == direction[1]
                    ) {
                        // Secondary axis is already satisfied then
                        this.selectFunc(this.rectangles[index], true);
                    }
                } else {
                    this.selectFunc(this.rectangles[index], false);
                    this.secondaryOrder.remove(index);
                }
            }
            this.computeBoundaries();
            this.selectTo(finalPosition);
        };

        if (finalPosition[0] < this.boundaries.primaryN.v) {
            --this.primaryOrder.currentPosition;
            primaryBoundaryCrossed(
                this.boundaries.primaryN.i,
                this.initialPosition[0] > this.boundaries.primaryN.v && finalPosition[0] < this.initialPosition[0]);
        } else if (finalPosition[0] > this.boundaries.primaryP.v) {
            ++this.primaryOrder.currentPosition;
            primaryBoundaryCrossed(
                this.boundaries.primaryP.i,
                this.initialPosition[0] < this.boundaries.primaryP.v && this.initialPosition[0] < finalPosition[0]);
        }

        const secondaryBoundaryCrossed = (index, added) => {
            this.selectFunc(this.rectangles[index], added);
            this.computeBoundaries();
            this.selectTo(finalPosition);
        };

        if (finalPosition[1] < this.boundaries.secondaryN.v) {
            --this.secondaryOrder.currentPosition;
            secondaryBoundaryCrossed(
                this.boundaries.secondaryN.i,
                this.initialPosition[1] > this.boundaries.secondaryN.v && finalPosition[1] < this.initialPosition[1]);
        } else if (finalPosition[1] > this.boundaries.secondaryP.v) {
            ++this.secondaryOrder.currentPosition;
            secondaryBoundaryCrossed(
                this.boundaries.secondaryP.i,
                this.initialPosition[1] < this.boundaries.secondaryP.v && this.initialPosition[1] < finalPosition[1]);
        }
        this.finalPosition = finalPosition;
    }
}

/** @extends IFromToPositionedTemplate<SelectorElement> */
class SelectorTemplate extends IFromToPositionedTemplate {
}

/** @extends {IFromToPositionedElement<Object, SelectorTemplate>} */
class SelectorElement extends IFromToPositionedElement {

    /** @type {FastSelectionModel} */
    selectionModel = null

    constructor() {
        super();
        super.initialize({}, new SelectorTemplate());
    }

    static newObject() {
        return new SelectorElement()
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }

    /** @param {Coordinates} initialPosition */
    beginSelect(initialPosition) {
        const blueprintConstructor = /** @type {BlueprintConstructor} */(this.blueprint.constructor);
        this.blueprint.selecting = true;
        this.setBothLocations(initialPosition);
        this.selectionModel = new FastSelectionModel(
            initialPosition,
            this.blueprint.getNodes(),
            blueprintConstructor.nodeBoundariesSupplier,
            blueprintConstructor.nodeSelectToggleFunction
        );
    }

    /** @param {Coordinates} finalPosition */
    selectTo(finalPosition) {
        this.selectionModel.selectTo(finalPosition);
        this.toX = finalPosition[0];
        this.toY = finalPosition[1];
    }

    endSelect() {
        this.blueprint.selecting = false;
        this.selectionModel = null;
        this.fromX = 0;
        this.fromY = 0;
        this.toX = 0;
        this.toY = 0;
    }
}

/**
 * @template {WindowTemplate} T
 * @extends {IDraggableElement<Object, T>}
 */
class WindowElement extends IDraggableElement {

    static #typeTemplateMap = {
        "window": WindowTemplate,
        "color-picker": ColorPickerWindowTemplate,
    }

    static properties = {
        ...IDraggableElement.properties,
        type: {
            type: WindowTemplate,
            attribute: "data-type",
            reflect: true,
            converter: {
                fromAttribute: (value, type) => WindowElement.#typeTemplateMap[value],
                toAttribute: (value, type) =>
                    Object.entries(WindowElement.#typeTemplateMap).find(([k, v]) => value.constructor === v)?.[0],
            },
        },
    }

    static newObject(entity = {}, template = entity.type ?? new WindowTemplate()) {
        const result = new WindowElement();
        result.initialize(entity, template);
        return result
    }

    initialize(entity = {}, template = entity.type ?? new WindowTemplate()) {
        entity.windowOptions ??= {};
        this.type = entity.type;
        this.windowOptions = entity.windowOptions;
        super.initialize(entity, template);
    }

    computeSizes() {
        const bounding = this.getBoundingClientRect();
        this.sizeX = bounding.width;
        this.sizeY = bounding.height;
    }

    cleanup() {
        super.cleanup();
        this.acknowledgeClose();
    }

    acknowledgeClose() {
        let deleteEvent = new CustomEvent(Configuration.windowCloseEventName);
        this.dispatchEvent(deleteEvent);
    }
}

function defineElements() {
    const define = (tag, type) => {
        customElements.define(tag, type);
        ElementFactory.registerElement(tag, type);
    };
    define("ueb-color-handler", ColorHandlerElement);
    define("ueb-dropdown", DropdownElement);
    define("ueb-input", InputElement);
    define("ueb-link", LinkElement);
    define("ueb-node", NodeElement);
    define("ueb-pin", PinElement);
    define("ueb-selector", SelectorElement);
    define("ueb-ui-slider", ColorSliderElement);
    define("ueb-window", WindowElement);
}

class TerminalTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        TerminalCategory: AttributeInfo.createType(String),
        TerminalSubCategory: AttributeInfo.createType(String),
        bTerminalIsConst: AttributeInfo.createType(Boolean),
        bTerminalIsWeakPointer: AttributeInfo.createType(Boolean),
        bTerminalIsUObjectWrapper: AttributeInfo.createType(Boolean),
    }

    constructor(values) {
        super(values);
        /** @type {String} */ this.TerminalCategory;
        /** @type {String} */ this.TerminalSubCategory;
        /** @type {Boolean} */ this.bTerminalIsConst;
        /** @type {Boolean} */ this.bTerminalIsWeakPointer;
        /** @type {Boolean} */ this.bTerminalIsUObjectWrapper;
    }
}

class UnknownKeysEntity extends IEntity {


    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.seq(
            // Lookbehind
            Parsernostrum.reg(
                new RegExp(`(${Grammar.Regex.Path.source}|${Grammar.Regex.Symbol.source}\\s*)?\\(\\s*`),
                1
            ),
            Parsernostrum.seq(Grammar.attributeName, Grammar.equalSeparation).map(([attribute, equal]) => attribute)
                .chain(attributeName =>
                    Grammar.unknownValue.map(attributeValue =>
                        values => values[attributeName] = attributeValue
                    )
                )
                .sepBy(Grammar.commaSeparation),
            Parsernostrum.reg(/\s*(?:,\s*)?\)/),
        ).map(([lookbehind, attributes, _2]) => {
            lookbehind ??= "";
            let values = {};
            if (lookbehind.length) {
                values.lookbehind = lookbehind;
            }
            attributes.forEach(attributeSetter => attributeSetter(values));
            return new this(values)
        })
    }

    constructor(values) {
        super(values, true);
    }
}

/**
 * @template {AttributeConstructor<Attribute>} T
 * @extends {Serializer<T>}
 */
class CustomSerializer extends Serializer {

    #objectWriter

    /**
     * @param {(v: ConstructedType<T>, insideString: Boolean) => String} objectWriter
     * @param {T} entityType
     */
    constructor(objectWriter, entityType) {
        super(entityType);
        this.#objectWriter = objectWriter;
    }

    /**
     * @param {ConstructedType<T>} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    doWrite(entity, insideString, indentation = "") {
        let result = this.#objectWriter(entity, insideString);
        return result
    }
}

/**
 * @template {AttributeConstructor<Attribute>} T
 * @extends {Serializer<T>}
 */
class ToStringSerializer extends Serializer {

    /** @param {T} entityType */
    constructor(entityType) {
        super(entityType);
    }

    /**
     * @param {ConstructedType<T>} entity
     * @param {Boolean} insideString
     */
    doWrite(entity, insideString, indentation = "") {
        return !insideString && entity.constructor === String
            ? `"${Utility.escapeString(entity.toString())}"` // String will have quotes if not inside a string already
            : Utility.escapeString(entity.toString())
    }
}

Grammar.unknownValue =
    Parsernostrum.alt(
        // Remember to keep the order, otherwise parsing might fail
        Grammar.boolean,
        GuidEntity.createGrammar(),
        Parsernostrum.str("None").map(() => new ObjectReferenceEntity({ type: "None" })),
        Grammar.null,
        Grammar.number,
        ObjectReferenceEntity.fullReferenceGrammar,
        Grammar.string,
        LocalizedTextEntity.createGrammar(),
        InvariantTextEntity.createGrammar(),
        FormatTextEntity.createGrammar(),
        PinReferenceEntity.createGrammar(),
        VectorEntity.createGrammar(),
        RotatorEntity.createGrammar(),
        LinearColorEntity.createGrammar(),
        Vector2DEntity.createGrammar(),
        UnknownKeysEntity.createGrammar(),
        SymbolEntity.createGrammar(),
        Grammar.grammarFor(undefined, [PinReferenceEntity]),
        Grammar.grammarFor(undefined, [new Union(Number, String, SymbolEntity)]),
    );

function initializeSerializerFactory() {

    SerializerFactory.registerSerializer(
        null,
        new CustomSerializer(
            (nullValue, insideString) => "()",
            null
        )
    );

    SerializerFactory.registerSerializer(
        Array,
        new CustomSerializer(
            (array, insideString) =>
                `(${array
                    .map(v =>
                        SerializerFactory.getSerializer(Utility.getType(v)).write(v, insideString) + ","
                    )
                    .join("")
                })`,
            Array
        )
    );

    SerializerFactory.registerSerializer(
        BigInt,
        new ToStringSerializer(BigInt)
    );

    SerializerFactory.registerSerializer(
        Boolean,
        new CustomSerializer(
            /** @param {Boolean} boolean */
            (boolean, insideString) => boolean
                ? insideString
                    ? "true"
                    : "True"
                : insideString
                    ? "false"
                    : "False",
            Boolean
        )
    );

    SerializerFactory.registerSerializer(
        ByteEntity,
        new ToStringSerializer(ByteEntity)
    );

    SerializerFactory.registerSerializer(
        ColorChannelEntity,
        new ToStringSerializer(ColorChannelEntity)
    );

    SerializerFactory.registerSerializer(
        EnumDisplayValueEntity,
        new ToStringSerializer(EnumDisplayValueEntity)
    );

    SerializerFactory.registerSerializer(
        EnumEntity,
        new ToStringSerializer(EnumEntity)
    );

    SerializerFactory.registerSerializer(
        FormatTextEntity,
        new CustomSerializer(
            (v, insideString) => {
                let result = v.getLookbehind() + "("
                    + v.value.map(v =>
                        SerializerFactory.getSerializer(Utility.getType(v)).write(v, insideString)
                    ).join(", ")
                    + ")";
                return result
            },
            FormatTextEntity)
    );

    SerializerFactory.registerSerializer(
        FunctionReferenceEntity,
        new Serializer(FunctionReferenceEntity, Serializer.bracketsWrapped)
    );

    SerializerFactory.registerSerializer(
        GuidEntity,
        new ToStringSerializer(GuidEntity)
    );

    SerializerFactory.registerSerializer(
        IdentifierEntity,
        new ToStringSerializer(IdentifierEntity)
    );

    SerializerFactory.registerSerializer(
        Integer64Entity,
        new ToStringSerializer(Integer64Entity)
    );

    SerializerFactory.registerSerializer(
        IntegerEntity,
        new ToStringSerializer(IntegerEntity)
    );

    SerializerFactory.registerSerializer(
        InvariantTextEntity,
        new Serializer(InvariantTextEntity, (entity, v) => `${entity.getLookbehind()}(${v})`, ", ", false, "", () => "")
    );

    SerializerFactory.registerSerializer(
        KeyBindingEntity,
        new Serializer(KeyBindingEntity, Serializer.bracketsWrapped)
    );

    SerializerFactory.registerSerializer(
        LinearColorEntity,
        new Serializer(LinearColorEntity, Serializer.bracketsWrapped)
    );

    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new Serializer(LocalizedTextEntity, (entity, v) => `${entity.getLookbehind()}(${v})`, ", ", false, "", () => "")
    );

    SerializerFactory.registerSerializer(
        MacroGraphReferenceEntity,
        new Serializer(MacroGraphReferenceEntity, Serializer.bracketsWrapped)
    );

    SerializerFactory.registerSerializer(
        MirroredEntity,
        new CustomSerializer(
            (v, insideString) => SerializerFactory.getSerializer(v.getTargetType()).write(v.get(), insideString),
            MirroredEntity
        )
    );

    SerializerFactory.registerSerializer(
        Number,
        new ToStringSerializer(Number)
    );

    SerializerFactory.registerSerializer(
        ObjectEntity,
        new ObjectSerializer()
    );

    SerializerFactory.registerSerializer(
        ObjectReferenceEntity,
        new CustomSerializer(
            objectReference => {
                let type = objectReference.type ?? "";
                let name = objectReference.path ?? "";
                if (type && name && Utility.isSerialized(objectReference, "path")) {
                    name = `'${name}'`;
                }
                let result = type + name;
                if (Utility.isSerialized(objectReference, "type")) {
                    result = `"${result}"`;
                }
                return result
            },
            ObjectReferenceEntity
        )
    );

    SerializerFactory.registerSerializer(
        PathSymbolEntity,
        new ToStringSerializer(PathSymbolEntity)
    );

    SerializerFactory.registerSerializer(
        PinEntity,
        new Serializer(PinEntity, (entity, v) => `${entity.getLookbehind()} (${v})`, ",", true)
    );

    SerializerFactory.registerSerializer(
        PinReferenceEntity,
        new Serializer(PinReferenceEntity, undefined, " ", false, "", () => "")
    );

    SerializerFactory.registerSerializer(
        PinTypeEntity,
        new Serializer(PinTypeEntity)
    );

    SerializerFactory.registerSerializer(
        TerminalTypeEntity,
        new Serializer(TerminalTypeEntity, Serializer.bracketsWrapped)
    );

    SerializerFactory.registerSerializer(
        RBSerializationVector2DEntity,
        new CustomSerializer(
            (value, insideString) => `X=${value.X} Y=${value.Y}`,
            RBSerializationVector2DEntity
        )
    );

    SerializerFactory.registerSerializer(
        RotatorEntity,
        new Serializer(RotatorEntity, Serializer.bracketsWrapped)
    );

    SerializerFactory.registerSerializer(
        String,
        new CustomSerializer(
            (value, insideString) => insideString
                ? Utility.escapeString(value)
                : `"${Utility.escapeString(value)}"`,
            String
        )
    );

    SerializerFactory.registerSerializer(
        SimpleSerializationRotatorEntity,
        new CustomSerializer(
            (value, insideString) => `${value.P}, ${value.Y}, ${value.R}`,
            SimpleSerializationRotatorEntity
        )
    );

    SerializerFactory.registerSerializer(
        SimpleSerializationVector2DEntity,
        new CustomSerializer(
            (value, insideString) => `${value.X}, ${value.Y}`,
            SimpleSerializationVector2DEntity
        )
    );

    SerializerFactory.registerSerializer(
        SimpleSerializationVectorEntity,
        new CustomSerializer(
            (value, insideString) => `${value.X}, ${value.Y}, ${value.Z}`,
            SimpleSerializationVectorEntity
        )
    );

    SerializerFactory.registerSerializer(
        SymbolEntity,
        new ToStringSerializer(SymbolEntity)
    );

    SerializerFactory.registerSerializer(
        UnknownKeysEntity,
        new Serializer(UnknownKeysEntity, (entity, string) => `${entity.getLookbehind() ?? ""}(${string})`)
    );

    SerializerFactory.registerSerializer(
        VariableReferenceEntity,
        new Serializer(VariableReferenceEntity, Serializer.bracketsWrapped)
    );

    SerializerFactory.registerSerializer(
        Vector2DEntity,
        new Serializer(Vector2DEntity, Serializer.bracketsWrapped)
    );

    SerializerFactory.registerSerializer(
        VectorEntity,
        new Serializer(VectorEntity, Serializer.bracketsWrapped)
    );
}

initializeSerializerFactory();
defineElements();

export { Blueprint, Configuration, LinkElement, NodeElement, Utility };
