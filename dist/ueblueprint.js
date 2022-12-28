/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window,e$3=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$3=new WeakMap;class o$3{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$3&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$3.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$3=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$3?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$3?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$2=window,r$1=e$2.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$2.reactiveElementPolyfillSupport,n$2={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$2,reflect:!1,hasChanged:a$1};class d$1 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$2).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$2;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:d$1}),(null!==(s$2=e$2.reactiveElementVersions)&&void 0!==s$2?s$2:e$2.reactiveElementVersions=[]).push("1.4.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$2=window,s$1=i$2.trustedTypes,e$1=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1=`lit$${(Math.random()+"").slice(9)}$`,n$1="?"+o$1,l$1=`<${n$1}>`,h=document,r=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h.createTreeWalker(h,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a||d===f?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$1:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$1+y):s+o$1+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$1?e$1.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$1),i=t.length-1;if(i>0){l.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r());}}}else if(8===l.nodeType)if(l.data===n$1)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$1,t+1));)c.push({type:7,index:h}),t+=o$1.length-1;}h++;}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function P$1(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P$1(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P$1(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r()),this.O(r()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P$1(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P$1(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$1?s$1.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P$1(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P$1(this,t);}}const z=i$2.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t$1=i$2.litHtmlVersions)&&void 0!==t$1?t$1:i$2.litHtmlVersions=[]).push("2.4.0");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @typedef {import("./element/PinElement").default} PinElement
 * @typedef {import("lit").CSSResult} CSSResult
 */

class Configuration {
    static #pinColor = {
        "/Script/CoreUObject.Rotator": i$3`152, 171, 241`,
        "/Script/CoreUObject.Transform": i$3`241, 110, 1`,
        "/Script/CoreUObject.Vector": i$3`215, 202, 11`,
        "/Script/Engine.Actor": i$3`0, 168, 242`,
        "/Script/Engine.GameStateBase": i$3`0, 168, 242`,
        "/Script/Engine.Pawn": i$3`0, 168, 242`,
        "/Script/Engine.PlayerState": i$3`0, 168, 242`,
        "bool": i$3`117, 0, 0`,
        "byte": i$3`0, 110, 98`,
        "class": i$3`88, 0, 186`,
        "default": i$3`167, 167, 167`,
        "exec": i$3`240, 240, 240`,
        "int": i$3`32, 224, 173`,
        "name": i$3`203, 129, 252`,
        "real": i$3`50, 187, 0`,
        "string": i$3`213, 0, 176`,
        "wildcard": i$3`128, 120, 120`,
    }
    static alphaPattern = "repeating-conic-gradient(#7c8184 0% 25%, #c2c3c4 0% 50%) 50% / 10px 10px"
    static colorDragEventName = "ueb-color-drag"
    static colorPickEventName = "ueb-color-pick"
    static colorWindowEventName = "ueb-color-window"
    static defaultCommentHeight = 96
    static defaultCommentWidth = 400
    static deleteNodesKeyboardKey = "Delete"
    static distanceThreshold = 5 // px
    static dragEventName = "ueb-drag"
    static dragGeneralEventName = "ueb-drag-general"
    static editTextEventName = {
        begin: "ueb-edit-text-begin",
        end: "ueb-edit-text-end",
    }
    static enableZoomIn = ["LeftControl", "RightControl"] // Button to enable more than 0 (1:1) zoom
    static expandGridSize = 400
    static focusEventName = {
        begin: "blueprint-focus",
        end: "blueprint-unfocus",
    }
    static fontSize = i$3`12.5px`

    /**
     * @param {PinElement} pin
     * @return {CSSResult}
     */
    static getPinColor(pin) {
        if (!pin) {
            return Configuration.#pinColor["default"]
        }
        if (Configuration.#pinColor[pin.pinType]) {
            return Configuration.#pinColor[pin.pinType]
        }
        if (pin.entity.PinType.PinCategory == "struct" || pin.entity.PinType.PinCategory == "object") {
            switch (pin.entity.PinType.PinSubCategoryObject.type) {
                case "ScriptStruct":
                case "/Script/CoreUObject.ScriptStruct":
                    return i$3`0, 88, 200`
                default:
                    if (
                        pin.entity.PinType.PinSubCategoryObject.getName().endsWith("Actor")
                        || pin.entity.getDisplayName() === "Target"
                    ) {
                        return Configuration.#pinColor["/Script/Engine.Actor"]
                    }
            }
        }
        return Configuration.#pinColor["default"]
    }
    static gridAxisLineColor = i$3`black`
    static gridExpandThreshold = 0.25 // remaining size factor threshold to cause an expansion event
    static gridLineColor = i$3`#353535`
    static gridLineWidth = 1 // px
    static gridSet = 8
    static gridSetLineColor = i$3`#161616`
    static gridShrinkThreshold = 4 // exceding size factor threshold to cause a shrink event
    static gridSize = 16 // px
    static hexColorRegex = /^\s*#(?<r>[0-9a-fA-F]{2})(?<g>[0-9a-fA-F]{2})(?<b>[0-9a-fA-F]{2})([0-9a-fA-F]{2})?|#(?<rs>[0-9a-fA-F])(?<gs>[0-9a-fA-F])(?<bs>[0-9a-fA-F])\s*$/
    static keysSeparator = "+"
    static linkCurveHeight = 15 // px
    static linkCurveWidth = 80 // px
    static linkMinWidth = 100 // px
    /**
     * @param {Number} start
     * @param {Number} c1
     * @param {Number} c2
     */
    static linkRightSVGPath = (start, c1, c2) => {
        let end = 100 - start;
        return `M ${start} 0 C ${c1} 0, ${c2} 0, 50 50 S ${end - c1 + start} 100, ${end} 100`
    }
    static maxZoom = 7
    static minZoom = -12
    static mouseWheelFactor = 0.2
    static nodeDeleteEventName = "ueb-node-delete"
    static nodeDragGeneralEventName = "ueb-node-drag-general"
    static nodeDragEventName = "ueb-node-drag"
    static nodeName = (name, counter) => `${name}_${counter}`
    static nodeRadius = 8 // px
    static nodeReflowEventName = "ueb-node-reflow"
    static nodeType = {
        callFunction: "/Script/BlueprintGraph.K2Node_CallFunction",
        comment: "/Script/UnrealEd.EdGraphNode_Comment",
        commutativeAssociativeBinaryOperator: "/Script/BlueprintGraph.K2Node_CommutativeAssociativeBinaryOperator",
        doN: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N",
        dynamicCast: "/Script/BlueprintGraph.K2Node_DynamicCast",
        executionSequence: "/Script/BlueprintGraph.K2Node_ExecutionSequence",
        forEachElementInEnum: "/Script/BlueprintGraph.K2Node_ForEachElementInEnum",
        forEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoop",
        forEachLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoopWithBreak",
        forLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoop",
        forLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoopWithBreak",
        ifThenElse: "/Script/BlueprintGraph.K2Node_IfThenElse",
        knot: "/Script/BlueprintGraph.K2Node_Knot",
        macro: "/Script/BlueprintGraph.K2Node_MacroInstance",
        makeArray: "/Script/BlueprintGraph.K2Node_MakeArray",
        makeMap: "/Script/BlueprintGraph.K2Node_MakeMap",
        pawn: "/Script/Engine.Pawn",
        reverseForEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ReverseForEachLoop",
        select: "/Script/BlueprintGraph.K2Node_Select",
        variableGet: "/Script/BlueprintGraph.K2Node_VariableGet",
        variableSet: "/Script/BlueprintGraph.K2Node_VariableSet",
        whileLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:WhileLoop",
    }
    static selectAllKeyboardKey = "(bCtrl=True,Key=A)"
    static smoothScrollTime = 1000 // ms
    static trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end",
    }
    static windowApplyEventName = "ueb-window-apply"
    static windowCancelEventName = "ueb-window-cancel"
    static windowCloseEventName = "ueb-window-close"
    static ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta",
    ]
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
        "ArrowLeft": "Left",
        "ArrowUp": "Up",
        "ArrowRight": "Right",
        "ArrowDown": "Down",
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

/** @typedef {import("../Blueprint").default} Blueprint */

/** @template {HTMLElement} T */
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

    /** @type {Object} */
    options


    listenHandler = () => this.listenEvents()
    unlistenHandler = () => this.unlistenEvents()

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.consumeEvent ??= false;
        options.listenOnFocus ??= false;
        options.unlistenOnTextEdit ??= false;
        this.#target = target;
        this.#blueprint = blueprint;
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

/** @typedef {import("./IEntity").default} IEntity */

class CalculatedType {

    #f

    /** @param {Function} f */
    constructor(f) {
        this.#f = f;
    }

    /** @param {IEntity} entity */
    calculate(entity) {
        return this.#f(entity)
    }
}

class Observable {

    /** @type {Map<String, Object[]>} */
    #observers = new Map()

    /**
     * @param {String} property
     * @param {(value: any) => {}} observer
     */
    subscribe(property, observer) {
        let observers = this.#observers;
        if (observers.has(property)) {
            let propertyObservers = observers.get(property);
            if (propertyObservers.includes(observer)) {
                return false
            } else {
                propertyObservers.push(observer);
            }
        } else {
            let fromPrototype = false;
            let propertyDescriptor = Object.getOwnPropertyDescriptor(this, property);
            if (!propertyDescriptor) {
                fromPrototype = true;
                propertyDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), property) ?? {};
                if (!propertyDescriptor) {
                    return false
                }
            }
            observers.set(property, [observer]);
            const isValue = "value" in propertyDescriptor;
            const hasSetter = "set" in propertyDescriptor;
            if (!(isValue || hasSetter)) {
                throw new Error(`Property ${property} is not a value or a setter`)
            }
            // A Symbol so it does not show up in Object.getOwnPropertyNames()
            const storageKey = Symbol.for(property + "Storage");
            const valInfoKey = Symbol.for(property + "ValInfo");
            Object.defineProperties(
                fromPrototype ? Object.getPrototypeOf(this) : this,
                {
                    [storageKey]: {
                        configurable: true,
                        enumerable: false, // Non enumerable so it does not show up in for...in or Object.keys()
                        ...(isValue
                            ? {
                                value: this[property],
                                writable: true,
                            }
                            : {
                                get: propertyDescriptor.get,
                                set: propertyDescriptor.set,
                            }
                        )
                    },
                    [valInfoKey]: {
                        configurable: true,
                        enumerable: false,
                        value: [fromPrototype, isValue]
                    },
                    [property]: {
                        configurable: true,
                        ...(isValue && {
                            get() {
                                return this[storageKey]
                            }
                        }),
                        set(v) {
                            this[storageKey] = v;
                            observers.get(property).forEach(observer => {
                                observer(this[property]);
                            });
                        },
                    }
                }
            );
        }
        return true
    }

    /**
     * @param {String} property
     * @param {Object} observer
     */
    unsubscribe(property, observer) {
        let observers = this.#observers.get(property);
        if (!observers?.includes(observer)) {
            return false
        }
        observers.splice(observers.indexOf(observer), 1);
        if (observers.length == 0) {
            const storageKey = Symbol.for(property + "Storage");
            const valInfoKey = Symbol.for(property + "ValInfo");
            const fromPrototype = this[valInfoKey][0];
            this[valInfoKey][1];
            Object.defineProperty(
                fromPrototype ? Object.getPrototypeOf(this) : this,
                property,
                Object.getOwnPropertyDescriptor(fromPrototype ? Object.getPrototypeOf(this) : this, storageKey),
            );
            delete this[valInfoKey];
            delete this[storageKey];
        }
        return true
    }
}

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */
/**
 * @template {AnyValue} T
 * @typedef {import("./ISerializer").default<T>} ISerializer
 */

class SerializerFactory {

    /** @type {Map<AnyValueConstructor<AnyValue>, ISerializer<AnyValue>>} */
    static #serializers = new Map()

    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object);
    }

    /**
     * @template {AnyValue} T
     * @param {AnyValueConstructor<T>} entity
     */
    static getSerializer(entity) {
        return SerializerFactory.#serializers.get(entity)
    }
}

/**
 * @template T
 * @typedef {import("./TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

class UnionType {

    #types
    get types() {
        return this.#types
    }

    /** @param  {...AnyValueConstructor<any>} types */
    constructor(...types) {
        this.#types = types;
    }

    getFirstType() {
        return this.#types[0]
    }
}

/**
 * @typedef {IEntity | String | Number | Boolean | Array} AnyValue
 * @typedef {import("./IEntity").default} IEntity
 */
/**
 * @template {AnyValue} T
 * @typedef {import("./IEntity").IEntityConstructor<T>} IEntityConstructor
 */
/**
 * @template {AnyValue} T
 * @typedef {IEntityConstructor<T> | StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor | UnionType} AnyValueConstructor
 */

/** @template {AnyValue} T */
class TypeInitialization {

    /** @type {AnyValueConstructor<T>|AnyValueConstructor<T>[]} */
    #type
    get type() {
        return this.#type
    }
    set type(v) {
        this.#type = v;
    }

    #showDefault = true
    get showDefault() {
        return this.#showDefault
    }
    set showDefault(v) {
        this.#showDefault = v;
    }

    /** @type {T | T[] | String | (() => T) | (() => T[])} */
    #value
    get value() {
        return this.#value
    }
    set value(v) {
        this.#value = v;
    }

    /** @type {Boolean} */
    #serialized
    get serialized() {
        return this.#serialized
    }
    set serialized(v) {
        this.#serialized = v;
    }

    #ignored
    get ignored() {
        return this.#ignored
    }
    set ignored(v) {
        this.#ignored = v;
    }

    static isValueOfType(value, type) {
        return value != null && (value instanceof type || value.constructor === type)
    }

    static sanitize(value, targetType) {
        if (targetType === undefined) {
            targetType = value?.constructor;
        }
        if (targetType instanceof Array) {
            let type = targetType.find(t => TypeInitialization.isValueOfType(value, t));
            if (!type) {
                type = targetType[0];
            }
            targetType = type;
        }
        if (targetType && !TypeInitialization.isValueOfType(value, targetType)) {
            value = new targetType(value);
        }
        if (value instanceof Boolean || value instanceof Number || value instanceof String) {
            value = value.valueOf(); // Get the relative primitive value
        }
        return value
    }

    /**
     * @param {AnyValueConstructor<T>|AnyValueConstructor<T>[]} type
     * @param {Boolean} showDefault
     * @param {T | T[] | String | (() => T) | (() => T[])} value
     * @param {Boolean} serialized
     */
    constructor(type, showDefault = true, value = undefined, serialized = false, ignored = false) {
        if (value === undefined) {
            if (type instanceof Array) {
                value = [];
            } else {
                value = () => TypeInitialization.sanitize(new type());
            }
        }
        this.#type = type;
        this.#showDefault = showDefault;
        this.#value = value;
        this.#serialized = serialized;
        this.#ignored = ignored;
    }
}

/**
 * @typedef {import("./element/IElement").default} IElement
 * @typedef {import("./entity/IEntity").default} IEntity
 * @typedef {import("./entity/IEntity").EntityConstructor} EntityConstructor
 * @typedef {import("./entity/LinearColorEntity").default} LinearColorEntity
 * @typedef {import("./entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template T
 * @typedef {import("./entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

class Utility {

    static emptyObj = {}

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

    static sigmoid(x, curvature = 1.7) {
        return 1 / (1 + (x / (1 - x) ** -curvature))
    }

    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    /** @param {HTMLElement} element */
    static getScale(element) {
        // @ts-expect-error
        const scale = element.blueprint
            // @ts-expect-error
            ? element.blueprint.getScale()
            : getComputedStyle(element).getPropertyValue("--ueb-scale");
        return scale != "" ? parseFloat(scale) : 1
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static minDecimals(num, decimals = 1) {
        const powered = num * 10 ** decimals;
        if (Math.abs(powered % 1) > Number.EPSILON) {
            // More decimal digits than required
            return num.toString()
        }
        return num.toFixed(decimals)
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static roundDecimals(num, decimals = 1) {
        const power = 10 ** decimals;
        return Math.round(num * power) / power
    }

    /**
     * @param {Number} a
     * @param {Number} b
     */
    static approximatelyEqual(a, b) {
        return !(Math.abs(a - b) > Number.EPSILON)
    }

    /**
     * @param {Number[]} viewportLocation
     * @param {HTMLElement} movementElement
     */
    static convertLocation(viewportLocation, movementElement, ignoreScale = false) {
        const scaleCorrection = ignoreScale ? 1 : 1 / Utility.getScale(movementElement);
        const targetOffset = movementElement.getBoundingClientRect();
        let location = [
            Math.round((viewportLocation[0] - targetOffset.x) * scaleCorrection),
            Math.round((viewportLocation[1] - targetOffset.y) * scaleCorrection)
        ];
        return location
    }

    /**
     * @param {IEntity} entity
     * @param {String[]} keys
     * @param {any} propertyDefinition
     * @returns {Boolean}
     */
    static isSerialized(
        entity,
        keys,
        propertyDefinition = Utility.objectGet(/** @type {EntityConstructor} */(entity.constructor).attributes, keys)
    ) {
        if (propertyDefinition instanceof CalculatedType) {
            return Utility.isSerialized(entity, keys, propertyDefinition.calculate(entity))
        }
        if (propertyDefinition instanceof TypeInitialization) {
            if (propertyDefinition.serialized) {
                return true
            }
            return Utility.isSerialized(entity, keys, propertyDefinition.type)
        }
        return false
    }

    /** @param {String[]} keys */
    static objectGet(target, keys, defaultValue = undefined) {
        if (target === undefined) {
            return undefined
        }
        if (!(keys instanceof Array)) {
            throw new TypeError("Expected keys to be an array.")
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
     * @param {Boolean} create
     * @returns {Boolean}
     */
    static objectSet(target, keys, value, create = false, defaultDictType = Object) {
        if (!(keys instanceof Array)) {
            throw new TypeError("Expected keys to be an array.")
        }
        if (keys.length == 1) {
            if (create || keys[0] in target || target[keys[0]] === undefined) {
                target[keys[0]] = value;
                return true
            }
        } else if (keys.length > 0) {
            if (create && !(target[keys[0]] instanceof Object)) {
                target[keys[0]] = new defaultDictType();
            }
            return Utility.objectSet(target[keys[0]], keys.slice(1), value, create, defaultDictType)
        }
        return false
    }

    static equals(a, b) {
        a = TypeInitialization.sanitize(a);
        b = TypeInitialization.sanitize(b);
        if (a === b) {
            return true
        }
        if (a instanceof Array && b instanceof Array) {
            return a.length == b.length && !a.find((value, i) => !Utility.equals(value, b[i]))
        }
    }

    /**
     * @param {AnyValue | AnyValueConstructor<IEntity>} value
     * @returns {AnyValueConstructor<IEntity> | AnyValueConstructor<IEntity>[]}
     */
    static getType(value) {
        if (value === null) {
            return null
        }
        if (value instanceof TypeInitialization) {
            return Utility.getType(value.type)
        }
        if (value instanceof UnionType) {
            return value.types
        }
        if (value instanceof Function) {
            // value is already a constructor
            return value
        }
        return /** @type {AnyValueConstructor<IEntity>} */(value?.constructor)
    }

    /**
     * @param {Number[]} location
     * @param {Number} gridSize
     */
    static snapToGrid(location, gridSize) {
        if (gridSize === 1) {
            return location
        }
        return [
            gridSize * Math.round(location[0] / gridSize),
            gridSize * Math.round(location[1] / gridSize)
        ]
    }

    /**
     * @template T
     * @param {Array<T>} a
     * @param {Array<T>} b
     */
    static mergeArrays(a = [], b = []) {
        let result = [];
        for (let j = 0; j < b.length; ++j) {
            for (let i = 0; i < a.length; ++i) {
                if (a[i] == b[j]) {
                    // Found a corresponding element in the two arrays
                    result.push(
                        // Take and append all the elements skipped from a
                        ...a.splice(0, i),
                        // Take and append all the elements skippend from b
                        ...b.splice(0, j),
                        // Take and append the element in common
                        ...a.splice(0, 1)
                    );
                    j = 0;
                    i = 0;
                    b.shift();
                    break
                }
            }
        }
        // Append remaining the elements in the arrays and make it unique
        return [...(new Set(result.concat(...a, ...b)))]
    }

    /** @param {String} value */
    static escapeString(value, input = false) {
        return value
            .replaceAll('"', '\\"') // Escape "
            .replaceAll("\n", "\\n") // Replace newline with \n
    }

    /** @param {String} value */
    static unescapeString(value, input = false) {
        return value
            .replaceAll('\\"', '"')
            .replaceAll("\\n", "\n")
    }

    /** @param {String} value */
    static clearHTMLWhitespace(value) {
        return value
            .replaceAll("&nbsp;", "\u00A0") // whitespace
            .replaceAll("<br>", "\n") // newlines
            .replaceAll(/(\<!--.*?\-->)/g, "") // html comments
    }

    /** @param {String} value */
    static capitalFirstLetter(value) {
        if (value.length === 0) {
            return value
        }
        return value.charAt(0).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase()
    }

    /** @param {String} value */
    static formatStringName(value) {
        return value
            .trim()
            .replace(/^b/, "") // Remove leading b (for boolean values) or newlines
            .replaceAll(/^K2(?:Node|node)?_|(?<=[a-z])(?=[A-Z])|_|\s+/g, " ") // Insert a space between a lowercase and uppercase letter, instead of an underscore or multiple spaces
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

    /** @param {LinearColorEntity} value */
    static printLinearColor(value) {
        return `${Math.round(value.R.valueOf() * 255)}, ${Math.round(value.G.valueOf() * 255)}, ${Math.round(value.B.valueOf() * 255)}`
    }

    /**  @param {[Number, Number]} param0 */
    static getPolarCoordinates([x, y], positiveTheta = false) {
        let theta = Math.atan2(y, x);
        if (positiveTheta && theta < 0) {
            theta = 2 * Math.PI + theta;
        }
        return [
            Math.sqrt(x * x + y * y),
            theta,
        ]
    }

    /**  @param {[Number, Number]} param0 */
    static getCartesianCoordinates([r, theta]) {
        return [
            r * Math.cos(theta),
            r * Math.sin(theta)
        ]
    }

    /**
     * @param {Number} begin
     * @param {Number} end
     */
    static range(begin, end, step = 1) {
        return Array.from({ length: Math.ceil((end - begin) / step) }, (_, i) => begin + (i * step))
    }

    /**
     * @param {HTMLElement} element
     * @param {String} value
     */
    static paste(element, value) {
        const event = new ClipboardEvent("paste", {
            bubbles: true,
            cancelable: true,
        });
        event.clipboardData.setData("text", value);
        element.dispatchEvent(event);
    }

    static animate(from, to, intervalSeconds, callback, timingFunction = x => {
        const v = x ** 3.5;
        return v / (v + ((1 - x) ** 3.5))
    }) {
        const startTimestamp = performance.now();
        const doAnimation = currentTimestamp => {
            let delta = (currentTimestamp - startTimestamp) / intervalSeconds;
            if (Utility.approximatelyEqual(delta, 1) || delta > 1) {
                delta = 1;
            } else {
                requestAnimationFrame(doAnimation);
            }
            const currentValue = from + (to - from) * timingFunction(delta);
            callback(currentValue);
        };
        requestAnimationFrame(doAnimation);
    }
}

/** @typedef {typeof IEntity} EntityConstructor */
/**
 * @template {IEntity} T
 * @typedef {new (Object) => T} IEntityConstructor
 */

class IEntity extends Observable {

    static attributes = {}

    constructor(values = {}, suppressWarns = false) {
        super();
        /**
         * @param {Object} target
         * @param {Object} attributes
         * @param {Object} values
         * @param {String} prefix
         */
        const defineAllAttributes = (target, attributes, values = {}, prefix = "") => {
            const valuesPropertyNames = Object.getOwnPropertyNames(values);
            for (let attribute of Utility.mergeArrays(Object.getOwnPropertyNames(attributes), valuesPropertyNames)) {
                let value = Utility.objectGet(values, [attribute]);
                let defaultValue = attributes[attribute];
                let defaultType = Utility.getType(defaultValue);
                if (defaultValue instanceof CalculatedType) {
                    defaultValue = defaultValue.calculate(this);
                    defaultType = Utility.getType(defaultValue);
                }
                if (defaultValue != null && defaultValue === defaultType) {
                    defaultValue = new defaultType();
                }

                if (!suppressWarns) {
                    if (!(attribute in attributes)) {
                        console.warn(
                            `Attribute ${prefix}${attribute} in the serialized data is not defined in ${this.constructor.name}.attributes`
                        );
                    } else if (
                        valuesPropertyNames.length > 0
                        && !(attribute in values)
                        && defaultValue !== undefined
                        && !(defaultValue instanceof TypeInitialization && (!defaultValue.showDefault || defaultValue.ignored))
                    ) {
                        console.warn(
                            `${this.constructor.name} will add attribute ${prefix}${attribute} not defined in the serialized data`
                        );
                    }
                }

                // Not instanceof because all objects are instenceof Object, exact match needed
                // @ts-expect-error
                if (defaultType === Object) {
                    target[attribute] = {};
                    defineAllAttributes(target[attribute], attributes[attribute], values[attribute], attribute + ".");
                    continue
                }

                if (value !== undefined) {
                    // Remember value can still be null
                    if (
                        value?.constructor === String
                        && defaultValue instanceof TypeInitialization
                        && defaultValue.serialized
                        && defaultValue.type !== String
                    ) {
                        // @ts-expect-error
                        value = SerializerFactory.getSerializer(defaultValue.type).deserialize(value);
                    }
                    target[attribute] = TypeInitialization.sanitize(value, Utility.getType(defaultValue));
                    continue // We have a value, need nothing more
                }

                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        target[attribute] = undefined; // Declare undefined to preserve the order of attributes
                        continue
                    }
                    if (defaultValue.serialized) {
                        defaultValue = "";
                    } else {
                        defaultType = defaultValue.type;
                        defaultValue = defaultValue.value;
                        if (defaultValue instanceof Function) {
                            defaultValue = defaultValue();
                        }
                    }
                }
                if (defaultValue instanceof UnionType) {
                    defaultType = defaultValue.getFirstType();
                    defaultValue = TypeInitialization.sanitize(null, defaultType);
                }
                if (defaultValue instanceof Array) {
                    defaultValue = [];
                }
                target[attribute] = TypeInitialization.sanitize(defaultValue, defaultType);
            }
        };
        const attributes = /** @type {typeof IEntity} */(this.constructor).attributes;
        if (values.constructor !== Object && Object.getOwnPropertyNames(attributes).length === 1) {
            // Where there is just one attribute, option can be the value of that attribute
            values = {
                [Object.getOwnPropertyNames(attributes)[0]]: values
            };
        }
        defineAllAttributes(this, attributes, values);
    }

    unexpectedKeys() {
        // @ts-expect-error
        return Object.getOwnPropertyNames(this).length - Object.getOwnPropertyNames(this.constructor.attributes).length
    }
}

class ObjectReferenceEntity extends IEntity {

    static attributes = {
        type: String,
        path: String,
    }

    constructor(values = {}) {
        if (values.constructor !== Object) {
            values = {
                path: values
            };
        }
        super(values);
        /** @type {String} */ this.type;
        /** @type {String} */ this.path;
    }

    getName() {
        return this.path.match(/[^\.\/]+$/)?.[0] ?? ""
    }
}

class FunctionReferenceEntity extends IEntity {

    static attributes = {
        MemberParent: new TypeInitialization(ObjectReferenceEntity, false),
        MemberName: "",
    }

    constructor(values) {
        super(values);
        /** @type {ObjectReferenceEntity} */ this.MemberParent;
        /** @type {String} */ this.MemberName;
    }
}

class GuidEntity extends IEntity {

    static attributes = {
        value: String,
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

class IdentifierEntity extends IEntity {

    static attributes = {
        value: String,
    }

    static attributeConverter = {
        fromAttribute: (value, type) => new IdentifierEntity(value),
        toAttribute: (value, type) => value.toString()
    }

    constructor(values) {
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
        value: 0,
    }

    /** @param {Object | Number | String} values */
    constructor(values = 0) {
        super(values);
        /** @type {Number} */
        this.value = Math.round(this.value);
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}

class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"
    static attributes = {
        value: String,
    }

    constructor(values) {
        super(values);
        /** @type {String} */ this.value;
    }
}

class KeyBindingEntity extends IEntity {

    static attributes = {
        ActionName: "",
        bShift: false,
        bCtrl: false,
        bAlt: false,
        bCmd: false,
        Key: IdentifierEntity,
    }

    constructor(values = {}) {
        values.ActionName = values.ActionName ?? "";
        values.bShift = values.bShift ?? false;
        values.bCtrl = values.bCtrl ?? false;
        values.bAlt = values.bAlt ?? false;
        values.bCmd = values.bCmd ?? false;
        super(values);
        /** @type {String} */ this.ActionName;
        /** @type {Boolean} */ this.bShift;
        /** @type {Boolean} */ this.bCtrl;
        /** @type {Boolean} */ this.bAlt;
        /** @type {Boolean} */ this.bCmd;
        /** @type {IdentifierEntity} */ this.Key;
    }
}

class RealUnitEntity extends IEntity {

    static attributes = {
        value: 0,
    }

    /** @param {Object | Number | String} values */
    constructor(values = 0) {
        super(values);
        this.value = Utility.clamp(this.value, 0, 1);
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
        R: RealUnitEntity,
        G: RealUnitEntity,
        B: RealUnitEntity,
        A: new TypeInitialization(RealUnitEntity, true, () => new RealUnitEntity(1), false, false),
        H: new TypeInitialization(RealUnitEntity, true, undefined, false, true),
        S: new TypeInitialization(RealUnitEntity, true, undefined, false, true),
        V: new TypeInitialization(RealUnitEntity, true, undefined, false, true),
    }

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
        /** @type {RealUnitEntity} */ this.R;
        /** @type {RealUnitEntity} */ this.G;
        /** @type {RealUnitEntity} */ this.B;
        /** @type {RealUnitEntity} */ this.A;
        /** @type {RealUnitEntity} */ this.H;
        /** @type {RealUnitEntity} */ this.S;
        /** @type {RealUnitEntity} */ this.V;
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

    setFromWheelLocation([x, y], v, a) {
        const [r, theta] = Utility.getPolarCoordinates([x, y], true);
        this.setFromHSVA(1 - theta / (2 * Math.PI), r, v, a);
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
        this.A.value = (number & 0xFF) / 0xff;
        this.B.value = ((number >> 8) & 0xFF) / 0xff;
        this.G.value = ((number >> 16) & 0xFF) / 0xff;
        this.R.value = ((number >> 24) & 0xFF) / 0xff;
        this.#updateHSV();
    }

    /** @param {Number} number */
    setFromSRGBANumber(number) {
        this.A.value = (number & 0xFF) / 0xff;
        this.B.value = LinearColorEntity.sRGBtoLinear(((number >> 8) & 0xFF) / 0xff);
        this.G.value = LinearColorEntity.sRGBtoLinear(((number >> 16) & 0xFF) / 0xff);
        this.R.value = LinearColorEntity.sRGBtoLinear(((number >> 24) & 0xFF) / 0xff);
        this.#updateHSV();
    }

    toString() {
        return Utility.printLinearColor(this)
    }
}

class LocalizedTextEntity extends IEntity {

    static lookbehind = "NSLOCTEXT"
    static attributes = {
        namespace: String,
        key: String,
        value: String,
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

class MacroGraphReferenceEntity extends IEntity {

    static attributes = {
        MacroGraph: ObjectReferenceEntity,
        GraphBlueprint: ObjectReferenceEntity,
        GraphGuid: GuidEntity,
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

class PathSymbolEntity extends IEntity {

    static attributes = {
        value: String,
    }

    constructor(values) {
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
        objectName: PathSymbolEntity,
        pinGuid: GuidEntity,
    }

    constructor(values) {
        super(values);
        /** @type {PathSymbolEntity} */ this.objectName;
        /** @type {GuidEntity} */ this.pinGuid;
    }
}

class RotatorEntity extends IEntity {

    static attributes = {
        R: Number,
        P: Number,
        Y: Number,
    }

    constructor(values) {
        super(values);
        /** @type {Number} */ this.R;
        /** @type {Number} */ this.P;
        /** @type {Number} */ this.Y;
    }
}

class SimpleSerializationRotatorEntity extends RotatorEntity {
}

class Vector2DEntity extends IEntity {

    static attributes = {
        X: Number,
        Y: Number,
    }

    constructor(values) {
        super(values);
        /** @type {Number} */ this.X;
        /** @type {Number} */ this.Y;
    }
}

class SimpleSerializationVector2DEntity extends Vector2DEntity {
}

class VectorEntity extends IEntity {

    static attributes = {
        X: Number,
        Y: Number,
        Z: Number,
    }

    constructor(values) {
        super(values);
        /** @type {Number} */ this.X;
        /** @type {Number} */ this.Y;
        /** @type {Number} */ this.Z;
    }
}

class SimpleSerializationVectorEntity extends VectorEntity {
}

/** @typedef {import("./TypeInitialization").AnyValue} AnyValue */

/** @template {AnyValue} T */
class PinEntity extends IEntity {

    static #typeEntityMap = {
        "/Script/CoreUObject.LinearColor": LinearColorEntity,
        "/Script/CoreUObject.Rotator": RotatorEntity,
        "/Script/CoreUObject.Vector2D": Vector2DEntity,
        "/Script/CoreUObject.Vector": VectorEntity,
        "bool": Boolean,
        "exec": String,
        "int": IntegerEntity,
        "name": String,
        "real": Number,
        "string": String,
    }
    static #alternativeTypeEntityMap = {
        "/Script/CoreUObject.Vector2D": SimpleSerializationVector2DEntity,
        "/Script/CoreUObject.Vector": SimpleSerializationVectorEntity,
        "/Script/CoreUObject.Rotator": SimpleSerializationRotatorEntity,
    }
    static lookbehind = "Pin"
    static attributes = {
        PinId: GuidEntity,
        PinName: "",
        PinFriendlyName: new TypeInitialization(new UnionType(LocalizedTextEntity, String), false, null),
        PinToolTip: new TypeInitialization(String, false, ""),
        Direction: new TypeInitialization(String, false, ""),
        PinType: {
            PinCategory: "",
            PinSubCategory: "",
            PinSubCategoryObject: ObjectReferenceEntity,
            PinSubCategoryMemberReference: null,
            PinValueType: null,
            ContainerType: ObjectReferenceEntity,
            bIsReference: false,
            bIsConst: false,
            bIsWeakPointer: false,
            bIsUObjectWrapper: false,
            bSerializeAsSinglePrecisionFloat: false,
        },
        LinkedTo: new TypeInitialization([PinReferenceEntity], false),
        DefaultValue:
            new CalculatedType(
                /** @param {PinEntity} pinEntity */
                pinEntity => new TypeInitialization(
                    pinEntity.getEntityType(true) ?? String,
                    false,
                    undefined,
                    true
                )
            ),
        AutogeneratedDefaultValue: new TypeInitialization(String, false),
        DefaultObject: new TypeInitialization(ObjectReferenceEntity, false, null),
        PersistentGuid: GuidEntity,
        bHidden: false,
        bNotConnectable: false,
        bDefaultValueIsReadOnly: false,
        bDefaultValueIsIgnored: false,
        bAdvancedView: false,
        bOrphanedPin: false,
    }

    constructor(values = {}, suppressWarns = false) {
        super(values, suppressWarns);
        /** @type {GuidEntity} */ this.PinId;
        /** @type {String} */ this.PinName;
        /** @type {LocalizedTextEntity | String} */ this.PinFriendlyName;
        /** @type {String} */ this.PinToolTip;
        /** @type {String} */ this.Direction;
        /**
         * @type {{
         *     PinCategory: String,
         *     PinSubCategory: String,
         *     PinSubCategoryObject: ObjectReferenceEntity,
         *     PinSubCategoryMemberReference: any,
         *     PinValueType: String,
         *     ContainerType: ObjectReferenceEntity,
         *     bIsReference: Boolean,
         *     bIsConst: Boolean,
         *     bIsWeakPointer: Boolean,
         *     bIsUObjectWrapper: Boolean,
         *     bSerializeAsSinglePrecisionFloat: Boolean,
         * }}
         */ this.PinType;
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

    getType() {
        if (this.PinType.PinCategory == "struct" || this.PinType.PinCategory == "object") {
            return this.PinType.PinSubCategoryObject.path
        }
        return this.PinType.PinCategory
    }

    getEntityType(alternative = false) {
        const typeString = this.getType();
        const entity = PinEntity.#typeEntityMap[typeString];
        const alternativeEntity = PinEntity.#alternativeTypeEntityMap[typeString];
        return alternative && alternativeEntity !== undefined
            ? alternativeEntity
            : entity
    }

    getDisplayName() {
        let matchResult = null;
        if (
            this.PinToolTip
            // Match up until the first \n excluded or last character
            && (matchResult = this.PinToolTip.match(/\s*(.+?(?=\n)|.+\S)\s*/))
        ) {
            return Utility.formatStringName(matchResult[1])
        }
        return Utility.formatStringName(this.PinName)
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
            this.DefaultValue = new (this.getEntityType(true))();
        }
        return this.DefaultValue
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
     */
    linkTo(targetObjectName, targetPinEntity) {
        /** @type {PinReferenceEntity[]} */
        this.LinkedTo;
        const linkFound = this.LinkedTo?.find(pinReferenceEntity => {
            return pinReferenceEntity.objectName.toString() == targetObjectName
                && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        });
        if (!linkFound) {
            (this.LinkedTo ?? (this.LinkedTo = [])).push(new PinReferenceEntity({
                objectName: targetObjectName,
                pinGuid: targetPinEntity.PinId,
            }));
            return true
        }
        return false
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     */
    unlinkFrom(targetObjectName, targetPinEntity) {
        const indexElement = this.LinkedTo?.findIndex(pinReferenceEntity => {
            return pinReferenceEntity.objectName.toString() == targetObjectName
                && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        });
        if (indexElement >= 0) {
            if (this.LinkedTo.length == 1) {
                this.LinkedTo = undefined;
            } else {
                this.LinkedTo.splice(indexElement, 1);
            }
            return true
        }
        return false
    }

    getSubCategory() {
        return this.PinType.PinSubCategoryObject.path
    }
}

class SymbolEntity extends IEntity {

    static attributes = {
        value: String
    }

    constructor(values) {
        super(values);
        /** @type {String} */ this.value;
    }
}

class VariableReferenceEntity extends IEntity {

    static attributes = {
        MemberScope: new TypeInitialization(String, false),
        MemberName: String,
        MemberGuid: GuidEntity,
        bSelfContext: new TypeInitialization(Boolean, false, false)
    }

    constructor(values) {
        super(values);
        /** @type {String} */ this.MemberName;
        /** @type {GuidEntity} */ this.GuidEntity;
        /** @type {Boolean} */ this.bSelfContext;
    }
}

class ObjectEntity extends IEntity {

    static attributes = {
        Class: ObjectReferenceEntity,
        Name: "",
        bIsPureFunc: new TypeInitialization(Boolean, false, false),
        VariableReference: new TypeInitialization(VariableReferenceEntity, false, null),
        SelfContextInfo: new TypeInitialization(SymbolEntity, false, null),
        FunctionReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        EventReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        TargetType: new TypeInitialization(ObjectReferenceEntity, false, null),
        MacroGraphReference: new TypeInitialization(MacroGraphReferenceEntity, false, null),
        Enum: new TypeInitialization(ObjectReferenceEntity, false),
        CommentColor: new TypeInitialization(LinearColorEntity, false),
        bCommentBubbleVisible_InDetailsPanel: new TypeInitialization(Boolean, false),
        bColorCommentBubble: new TypeInitialization(Boolean, false, false),
        MoveMode: new TypeInitialization(SymbolEntity, false),
        NodePosX: IntegerEntity,
        NodePosY: IntegerEntity,
        NodeWidth: new TypeInitialization(IntegerEntity, false),
        NodeHeight: new TypeInitialization(IntegerEntity, false),
        bCommentBubblePinned: new TypeInitialization(Boolean, false),
        bCommentBubbleVisible: new TypeInitialization(Boolean, false),
        NodeComment: new TypeInitialization(String, false),
        AdvancedPinDisplay: new TypeInitialization(IdentifierEntity, false, null),
        EnabledState: new TypeInitialization(IdentifierEntity, false, null),
        NodeGuid: GuidEntity,
        ErrorType: new TypeInitialization(IntegerEntity, false),
        ErrorMsg: new TypeInitialization(String, false, ""),
        CustomProperties: [PinEntity],
    }

    static nameRegex = /^(\w+?)(?:_(\d+))?$/
    static sequencerScriptingNameRegex = /\/Script\/SequencerScripting\.MovieSceneScripting(.+)Channel/

    constructor(values, suppressWarns = false) {
        super(values, suppressWarns);
        /** @type {ObjectReferenceEntity} */ this.Class;
        /** @type {String} */ this.Name;
        /** @type {Boolean?} */ this.bIsPureFunc;
        /** @type {VariableReferenceEntity?} */ this.VariableReference;
        /** @type {FunctionReferenceEntity?} */ this.FunctionReference;
        /** @type {FunctionReferenceEntity?} */ this.EventReference;
        /** @type {ObjectReferenceEntity?} */ this.TargetType;
        /** @type {MacroGraphReferenceEntity?} */ this.MacroGraphReference;
        /** @type {ObjectReferenceEntity?} */ this.Enum;
        /** @type {LinearColorEntity?} */ this.CommentColor;
        /** @type {Boolean?} */ this.bCommentBubbleVisible_InDetailsPanel;
        /** @type {IntegerEntity} */ this.NodePosX;
        /** @type {IntegerEntity} */ this.NodePosY;
        /** @type {IntegerEntity?} */ this.NodeWidth;
        /** @type {IntegerEntity?} */ this.NodeHeight;
        /** @type {Boolean?} */ this.bCommentBubblePinned;
        /** @type {Boolean?} */ this.bCommentBubbleVisible;
        /** @type {String?} */ this.NodeComment;
        /** @type {IdentifierEntity?} */ this.AdvancedPinDisplay;
        /** @type {IdentifierEntity?} */ this.EnabledState;
        /** @type {GuidEntity} */ this.NodeGuid;
        /** @type {IntegerEntity?} */ this.ErrorType;
        /** @type {String?} */ this.ErrorMsg;
        /** @type {PinEntity[]} */ this.CustomProperties;
    }

    getClass() {
        return this.Class.path
    }

    getType() {
        let classValue = this.getClass();
        if (classValue === Configuration.nodeType.macro) {
            return this.MacroGraphReference.MacroGraph.path
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
        return this.NodeWidth ??
            this.getType() == Configuration.nodeType.comment ? Configuration.defaultCommentWidth : undefined
    }

    /** @param {Number} value */
    setNodeWidth(value) {
        if (!this.NodeWidth) {
            this.NodeWidth = new IntegerEntity();
        }
        this.NodeWidth.value = value;
    }

    getNodeHeight() {
        return this.NodeHeight ??
            this.getType() == Configuration.nodeType.comment ? Configuration.defaultCommentHeight : undefined
    }

    /** @param {Number} value */
    setNodeHeight(value) {
        if (!this.NodeHeight) {
            this.NodeHeight = new IntegerEntity();
        }
        this.NodeHeight.value = value;
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var parsimmon_umd_min = {exports: {}};

(function (module, exports) {
!function(n,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,function(){return function(n){var t={};function r(e){if(t[e])return t[e].exports;var u=t[e]={i:e,l:!1,exports:{}};return n[e].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e});},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0});},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){function e(n){if(!(this instanceof e))return new e(n);this._=n;}var u=e.prototype;function o(n,t){for(var r=0;r<n;r++)t(r);}function i(n,t,r){return function(n,t){o(t.length,function(r){n(t[r],r,t);});}(function(r,e,u){t=n(t,r,e,u);},r),t}function a(n,t){return i(function(t,r,e,u){return t.concat([n(r,e,u)])},[],t)}function f(n,t){var r={v:0,buf:t};return o(n,function(){var n;r={v:r.v<<1|(n=r.buf,n[0]>>7),buf:function(n){var t=i(function(n,t,r,e){return n.concat(r===e.length-1?Buffer.from([t,0]).readUInt16BE(0):e.readUInt16BE(r))},[],n);return Buffer.from(a(function(n){return (n<<1&65535)>>8},t))}(r.buf)};}),r}function c(){return "undefined"!=typeof Buffer}function s(){if(!c())throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")}function l(n){s();var t=i(function(n,t){return n+t},0,n);if(t%8!=0)throw new Error("The bits ["+n.join(", ")+"] add up to "+t+" which is not an even number of bytes; the total should be divisible by 8");var r,u=t/8,o=(r=function(n){return n>48},i(function(n,t){return n||(r(t)?t:n)},null,n));if(o)throw new Error(o+" bit range requested exceeds 48 bit (6 byte) Number max.");return new e(function(t,r){var e=u+r;return e>t.length?x(r,u.toString()+" bytes"):b(e,i(function(n,t){var r=f(t,n.buf);return {coll:n.coll.concat(r.v),buf:r.buf}},{coll:[],buf:t.slice(r,e)},n).coll)})}function h(n,t){return new e(function(r,e){return s(),e+t>r.length?x(e,t+" bytes for "+n):b(e+t,r.slice(e,e+t))})}function p(n,t){if("number"!=typeof(r=t)||Math.floor(r)!==r||t<0||t>6)throw new Error(n+" requires integer length in range [0, 6].");var r;}function d(n){return p("uintBE",n),h("uintBE("+n+")",n).map(function(t){return t.readUIntBE(0,n)})}function v(n){return p("uintLE",n),h("uintLE("+n+")",n).map(function(t){return t.readUIntLE(0,n)})}function g(n){return p("intBE",n),h("intBE("+n+")",n).map(function(t){return t.readIntBE(0,n)})}function m(n){return p("intLE",n),h("intLE("+n+")",n).map(function(t){return t.readIntLE(0,n)})}function y(n){return n instanceof e}function E(n){return "[object Array]"==={}.toString.call(n)}function w(n){return c()&&Buffer.isBuffer(n)}function b(n,t){return {status:!0,index:n,value:t,furthest:-1,expected:[]}}function x(n,t){return E(t)||(t=[t]),{status:!1,index:-1,value:null,furthest:n,expected:t}}function B(n,t){if(!t)return n;if(n.furthest>t.furthest)return n;var r=n.furthest===t.furthest?function(n,t){if(function(){if(void 0!==e._supportsSet)return e._supportsSet;var n="undefined"!=typeof Set;return e._supportsSet=n,n}()&&Array.from){for(var r=new Set(n),u=0;u<t.length;u++)r.add(t[u]);var o=Array.from(r);return o.sort(),o}for(var i={},a=0;a<n.length;a++)i[n[a]]=!0;for(var f=0;f<t.length;f++)i[t[f]]=!0;var c=[];for(var s in i)({}).hasOwnProperty.call(i,s)&&c.push(s);return c.sort(),c}(n.expected,t.expected):t.expected;return {status:n.status,index:n.index,value:n.value,furthest:t.furthest,expected:r}}var j={};function S(n,t){if(w(n))return {offset:t,line:-1,column:-1};n in j||(j[n]={});for(var r=j[n],e=0,u=0,o=0,i=t;i>=0;){if(i in r){e=r[i].line,0===o&&(o=r[i].lineStart);break}("\n"===n.charAt(i)||"\r"===n.charAt(i)&&"\n"!==n.charAt(i+1))&&(u++,0===o&&(o=i+1)),i--;}var a=e+u,f=t-o;return r[t]={line:a,lineStart:o},{offset:t,line:a+1,column:f+1}}function _(n){if(!y(n))throw new Error("not a parser: "+n)}function L(n,t){return "string"==typeof n?n.charAt(t):n[t]}function O(n){if("number"!=typeof n)throw new Error("not a number: "+n)}function k(n){if("function"!=typeof n)throw new Error("not a function: "+n)}function P(n){if("string"!=typeof n)throw new Error("not a string: "+n)}var q=2,A=3,I=8,F=5*I,M=4*I,z="  ";function R(n,t){return new Array(t+1).join(n)}function U(n,t,r){var e=t-n.length;return e<=0?n:R(r,e)+n}function W(n,t,r,e){return {from:n-t>0?n-t:0,to:n+r>e?e:n+r}}function D(n,t){var r,e,u,o,f,c=t.index,s=c.offset,l=1;if(s===n.length)return "Got the end of the input";if(w(n)){var h=s-s%I,p=s-h,d=W(h,F,M+I,n.length),v=a(function(n){return a(function(n){return U(n.toString(16),2,"0")},n)},function(n,t){var r=n.length,e=[],u=0;if(r<=t)return [n.slice()];for(var o=0;o<r;o++)e[u]||e.push([]),e[u].push(n[o]),(o+1)%t==0&&u++;return e}(n.slice(d.from,d.to).toJSON().data,I));o=function(n){return 0===n.from&&1===n.to?{from:n.from,to:n.to}:{from:n.from/I,to:Math.floor(n.to/I)}}(d),e=h/I,r=3*p,p>=4&&(r+=1),l=2,u=a(function(n){return n.length<=4?n.join(" "):n.slice(0,4).join(" ")+"  "+n.slice(4).join(" ")},v),(f=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(f=2);}else {var g=n.split(/\r\n|[\n\r\u2028\u2029]/);r=c.column-1,e=c.line-1,o=W(e,q,A,g.length),u=g.slice(o.from,o.to),f=o.to.toString().length;}var m=e-o.from;return w(n)&&(f=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(f=2),i(function(t,e,u){var i,a=u===m,c=a?"> ":z;return i=w(n)?U((8*(o.from+u)).toString(16),f,"0"):U((o.from+u+1).toString(),f," "),[].concat(t,[c+i+" | "+e],a?[z+R(" ",f)+" | "+U("",r," ")+R("^",l)]:[])},[],u).join("\n")}function N(n,t){return ["\n","-- PARSING FAILED "+R("-",50),"\n\n",D(n,t),"\n\n",(r=t.expected,1===r.length?"Expected:\n\n"+r[0]:"Expected one of the following: \n\n"+r.join(", ")),"\n"].join("");var r;}function G(n){return void 0!==n.flags?n.flags:[n.global?"g":"",n.ignoreCase?"i":"",n.multiline?"m":"",n.unicode?"u":"",n.sticky?"y":""].join("")}function C(){for(var n=[].slice.call(arguments),t=n.length,r=0;r<t;r+=1)_(n[r]);return e(function(r,e){for(var u,o=new Array(t),i=0;i<t;i+=1){if(!(u=B(n[i]._(r,e),u)).status)return u;o[i]=u.value,e=u.index;}return B(b(e,o),u)})}function J(){var n=[].slice.call(arguments);if(0===n.length)throw new Error("seqMap needs at least one argument");var t=n.pop();return k(t),C.apply(null,n).map(function(n){return t.apply(null,n)})}function T(){var n=[].slice.call(arguments),t=n.length;if(0===t)return Y("zero alternates");for(var r=0;r<t;r+=1)_(n[r]);return e(function(t,r){for(var e,u=0;u<n.length;u+=1)if((e=B(n[u]._(t,r),e)).status)return e;return e})}function V(n,t){return H(n,t).or(X([]))}function H(n,t){return _(n),_(t),J(n,t.then(n).many(),function(n,t){return [n].concat(t)})}function K(n){P(n);var t="'"+n+"'";return e(function(r,e){var u=e+n.length,o=r.slice(e,u);return o===n?b(u,o):x(e,t)})}function Q(n,t){!function(n){if(!(n instanceof RegExp))throw new Error("not a regexp: "+n);for(var t=G(n),r=0;r<t.length;r++){var e=t.charAt(r);if("i"!==e&&"m"!==e&&"u"!==e&&"s"!==e)throw new Error('unsupported regexp flag "'+e+'": '+n)}}(n),arguments.length>=2?O(t):t=0;var r=function(n){return RegExp("^(?:"+n.source+")",G(n))}(n),u=""+n;return e(function(n,e){var o=r.exec(n.slice(e));if(o){if(0<=t&&t<=o.length){var i=o[0],a=o[t];return b(e+i.length,a)}return x(e,"valid match group (0 to "+o.length+") in "+u)}return x(e,u)})}function X(n){return e(function(t,r){return b(r,n)})}function Y(n){return e(function(t,r){return x(r,n)})}function Z(n){if(y(n))return e(function(t,r){var e=n._(t,r);return e.index=r,e.value="",e});if("string"==typeof n)return Z(K(n));if(n instanceof RegExp)return Z(Q(n));throw new Error("not a string, regexp, or parser: "+n)}function $(n){return _(n),e(function(t,r){var e=n._(t,r),u=t.slice(r,e.index);return e.status?x(r,'not "'+u+'"'):b(r,null)})}function nn(n){return k(n),e(function(t,r){var e=L(t,r);return r<t.length&&n(e)?b(r+1,e):x(r,"a character/byte matching "+n)})}function tn(n,t){arguments.length<2&&(t=n,n=void 0);var r=e(function(n,e){return r._=t()._,r._(n,e)});return n?r.desc(n):r}function rn(){return Y("fantasy-land/empty")}u.parse=function(n){if("string"!=typeof n&&!w(n))throw new Error(".parse must be called with a string or Buffer as its argument");var t,r=this.skip(an)._(n,0);return t=r.status?{status:!0,value:r.value}:{status:!1,index:S(n,r.furthest),expected:r.expected},delete j[n],t},u.tryParse=function(n){var t=this.parse(n);if(t.status)return t.value;var r=N(n,t),e=new Error(r);throw e.type="ParsimmonError",e.result=t,e},u.assert=function(n,t){return this.chain(function(r){return n(r)?X(r):Y(t)})},u.or=function(n){return T(this,n)},u.trim=function(n){return this.wrap(n,n)},u.wrap=function(n,t){return J(n,this,t,function(n,t){return t})},u.thru=function(n){return n(this)},u.then=function(n){return _(n),C(this,n).map(function(n){return n[1]})},u.many=function(){var n=this;return e(function(t,r){for(var e=[],u=void 0;;){if(!(u=B(n._(t,r),u)).status)return B(b(r,e),u);if(r===u.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");r=u.index,e.push(u.value);}})},u.tieWith=function(n){return P(n),this.map(function(t){if(function(n){if(!E(n))throw new Error("not an array: "+n)}(t),t.length){P(t[0]);for(var r=t[0],e=1;e<t.length;e++)P(t[e]),r+=n+t[e];return r}return ""})},u.tie=function(){return this.tieWith("")},u.times=function(n,t){var r=this;return arguments.length<2&&(t=n),O(n),O(t),e(function(e,u){for(var o=[],i=void 0,a=void 0,f=0;f<n;f+=1){if(a=B(i=r._(e,u),a),!i.status)return a;u=i.index,o.push(i.value);}for(;f<t&&(a=B(i=r._(e,u),a),i.status);f+=1)u=i.index,o.push(i.value);return B(b(u,o),a)})},u.result=function(n){return this.map(function(){return n})},u.atMost=function(n){return this.times(0,n)},u.atLeast=function(n){return J(this.times(n),this.many(),function(n,t){return n.concat(t)})},u.map=function(n){k(n);var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(b(u.index,n(u.value)),u):u})},u.contramap=function(n){k(n);var t=this;return e(function(r,e){var u=t.parse(n(r.slice(e)));return u.status?b(e+r.length,u.value):u})},u.promap=function(n,t){return k(n),k(t),this.contramap(n).map(t)},u.skip=function(n){return C(this,n).map(function(n){return n[0]})},u.mark=function(){return J(en,this,en,function(n,t,r){return {start:n,value:t,end:r}})},u.node=function(n){return J(en,this,en,function(t,r,e){return {name:n,value:r,start:t,end:e}})},u.sepBy=function(n){return V(this,n)},u.sepBy1=function(n){return H(this,n)},u.lookahead=function(n){return this.skip(Z(n))},u.notFollowedBy=function(n){return this.skip($(n))},u.desc=function(n){E(n)||(n=[n]);var t=this;return e(function(r,e){var u=t._(r,e);return u.status||(u.expected=n),u})},u.fallback=function(n){return this.or(X(n))},u.ap=function(n){return J(n,this,function(n,t){return n(t)})},u.chain=function(n){var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(n(u.value)._(r,u.index),u):u})},u.concat=u.or,u.empty=rn,u.of=X,u["fantasy-land/ap"]=u.ap,u["fantasy-land/chain"]=u.chain,u["fantasy-land/concat"]=u.concat,u["fantasy-land/empty"]=u.empty,u["fantasy-land/of"]=u.of,u["fantasy-land/map"]=u.map;var en=e(function(n,t){return b(t,S(n,t))}),un=e(function(n,t){return t>=n.length?x(t,"any character/byte"):b(t+1,L(n,t))}),on=e(function(n,t){return b(n.length,n.slice(t))}),an=e(function(n,t){return t<n.length?x(t,"EOF"):b(t,null)}),fn=Q(/[0-9]/).desc("a digit"),cn=Q(/[0-9]*/).desc("optional digits"),sn=Q(/[a-z]/i).desc("a letter"),ln=Q(/[a-z]*/i).desc("optional letters"),hn=Q(/\s*/).desc("optional whitespace"),pn=Q(/\s+/).desc("whitespace"),dn=K("\r"),vn=K("\n"),gn=K("\r\n"),mn=T(gn,vn,dn).desc("newline"),yn=T(mn,an);e.all=on,e.alt=T,e.any=un,e.cr=dn,e.createLanguage=function(n){var t={};for(var r in n)({}).hasOwnProperty.call(n,r)&&function(r){t[r]=tn(function(){return n[r](t)});}(r);return t},e.crlf=gn,e.custom=function(n){return e(n(b,x))},e.digit=fn,e.digits=cn,e.empty=rn,e.end=yn,e.eof=an,e.fail=Y,e.formatError=N,e.index=en,e.isParser=y,e.lazy=tn,e.letter=sn,e.letters=ln,e.lf=vn,e.lookahead=Z,e.makeFailure=x,e.makeSuccess=b,e.newline=mn,e.noneOf=function(n){return nn(function(t){return n.indexOf(t)<0}).desc("none of '"+n+"'")},e.notFollowedBy=$,e.of=X,e.oneOf=function(n){for(var t=n.split(""),r=0;r<t.length;r++)t[r]="'"+t[r]+"'";return nn(function(t){return n.indexOf(t)>=0}).desc(t)},e.optWhitespace=hn,e.Parser=e,e.range=function(n,t){return nn(function(r){return n<=r&&r<=t}).desc(n+"-"+t)},e.regex=Q,e.regexp=Q,e.sepBy=V,e.sepBy1=H,e.seq=C,e.seqMap=J,e.seqObj=function(){for(var n,t={},r=0,u=(n=arguments,Array.prototype.slice.call(n)),o=u.length,i=0;i<o;i+=1){var a=u[i];if(!y(a)){if(E(a)&&2===a.length&&"string"==typeof a[0]&&y(a[1])){var f=a[0];if(Object.prototype.hasOwnProperty.call(t,f))throw new Error("seqObj: duplicate key "+f);t[f]=!0,r++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(0===r)throw new Error("seqObj expects at least one named parser, found zero");return e(function(n,t){for(var r,e={},i=0;i<o;i+=1){var a,f;if(E(u[i])?(a=u[i][0],f=u[i][1]):(a=null,f=u[i]),!(r=B(f._(n,t),r)).status)return r;a&&(e[a]=r.value),t=r.index;}return B(b(t,e),r)})},e.string=K,e.succeed=X,e.takeWhile=function(n){return k(n),e(function(t,r){for(var e=r;e<t.length&&n(L(t,e));)e++;return b(e,t.slice(r,e))})},e.test=nn,e.whitespace=pn,e["fantasy-land/empty"]=rn,e["fantasy-land/of"]=X,e.Binary={bitSeq:l,bitSeqObj:function(n){s();var t={},r=0,e=a(function(n){if(E(n)){var e=n;if(2!==e.length)throw new Error("["+e.join(", ")+"] should be length 2, got length "+e.length);if(P(e[0]),O(e[1]),Object.prototype.hasOwnProperty.call(t,e[0]))throw new Error("duplicate key in bitSeqObj: "+e[0]);return t[e[0]]=!0,r++,e}return O(n),[null,n]},n);if(r<1)throw new Error("bitSeqObj expects at least one named pair, got ["+n.join(", ")+"]");var u=a(function(n){return n[0]},e);return l(a(function(n){return n[1]},e)).map(function(n){return i(function(n,t){return null!==t[0]&&(n[t[0]]=t[1]),n},{},a(function(t,r){return [t,n[r]]},u))})},byte:function(n){if(s(),O(n),n>255)throw new Error("Value specified to byte constructor ("+n+"=0x"+n.toString(16)+") is larger in value than a single byte.");var t=(n>15?"0x":"0x0")+n.toString(16);return e(function(r,e){var u=L(r,e);return u===n?b(e+1,u):x(e,t)})},buffer:function(n){return h("buffer",n).map(function(n){return Buffer.from(n)})},encodedString:function(n,t){return h("string",t).map(function(t){return t.toString(n)})},uintBE:d,uint8BE:d(1),uint16BE:d(2),uint32BE:d(4),uintLE:v,uint8LE:v(1),uint16LE:v(2),uint32LE:v(4),intBE:g,int8BE:g(1),int16BE:g(2),int32BE:g(4),intLE:m,int8LE:m(1),int16LE:m(2),int32LE:m(4),floatBE:h("floatBE",4).map(function(n){return n.readFloatBE(0)}),floatLE:h("floatLE",4).map(function(n){return n.readFloatLE(0)}),doubleBE:h("doubleBE",8).map(function(n){return n.readDoubleBE(0)}),doubleLE:h("doubleLE",8).map(function(n){return n.readDoubleLE(0)})},n.exports=e;}])});
}(parsimmon_umd_min));

var Parsimmon = /*@__PURE__*/getDefaultExportFromCjs(parsimmon_umd_min.exports);

class UnknownKeysEntity extends IEntity {

    static attributes = {
        lookbehind: new TypeInitialization(String, false, "", false, true)
    }

    constructor(values) {
        super(values);
        /** @type {String} */ this.lookbehind;
    }
}

// @ts-nocheck

let P = Parsimmon;

class Grammar {

    /*   ---   Factory   ---   */

    /** @param {Grammar} r */
    static getGrammarForType(r, attributeType, defaultGrammar = r.AttributeAnyValue) {
        if (attributeType instanceof TypeInitialization) {
            let result = Grammar.getGrammarForType(r, attributeType.type, defaultGrammar);
            if (attributeType.serialized && !(attributeType.type instanceof String)) {
                result = result.wrap(P.string('"'), P.string('"'));
            }
            return result
        }
        switch (Utility.getType(attributeType)) {
            case Array:
                return P.seqMap(
                    P.string("("),
                    attributeType
                        .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                        .reduce((accum, cur) => !cur || accum === r.AttributeAnyValue
                            ? r.AttributeAnyValue
                            : accum.or(cur)
                        )
                        .trim(P.optWhitespace)
                        .sepBy(P.string(","))
                        .skip(P.regex(/,?\s*/)),
                    P.string(")"),
                    (_0, grammar, _2) => grammar
                )
            case Boolean:
                return r.Boolean
            case FunctionReferenceEntity:
                return r.FunctionReference
            case GuidEntity:
                return r.Guid
            case IdentifierEntity:
                return r.Identifier
            case IntegerEntity:
                return r.Integer
            case InvariantTextEntity:
                return r.InvariantText
            case LinearColorEntity:
                return r.LinearColor
            case LocalizedTextEntity:
                return r.LocalizedText
            case MacroGraphReferenceEntity:
                return r.MacroGraphReference
            case Number:
                return r.Number
            case ObjectReferenceEntity:
                return r.ObjectReference
            case PinEntity:
                return r.Pin
            case PinReferenceEntity:
                return r.PinReference
            case RealUnitEntity:
                return r.RealUnit
            case RotatorEntity:
                return r.Rotator
            case SimpleSerializationRotatorEntity:
                return r.SimpleSerializationRotator
            case SimpleSerializationVector2DEntity:
                return r.SimpleSerializationVector2D
            case SimpleSerializationVectorEntity:
                return r.SimpleSerializationVector
            case String:
                return r.String
            case SymbolEntity:
                return r.Symbol
            case UnionType:
                return attributeType.types
                    .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                    .reduce((accum, cur) => !cur || accum === r.AttributeAnyValue
                        ? r.AttributeAnyValue
                        : accum.or(cur))
            case VariableReferenceEntity:
                return r.VariableReference
            case Vector2DEntity:
                return r.Vector2D
            case VectorEntity:
                return r.Vector
            default:
                return defaultGrammar
        }
    }

    /** @param {Grammar} r */
    static ReferencePath = (r, referencePathGrammar) =>
        P.alt(
            referencePathGrammar,
            P.seq(
                P.string("/"),
                referencePathGrammar
                    .map(v => v.toString())
                    .sepBy1(P.string("."))
                    .tieWith(".")
                    .sepBy1(P.string(":"))
                    .tieWith(":")
            )
                .tie()
                .atLeast(2)
                .tie()
        )

    /** @param {Grammar} r */
    static createAttributeGrammar = (r, entityType, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
        r.AttributeName
            .skip(valueSeparator)
            .chain(attributeName => {
                // Once the attribute name is known, look into entityType.attributes to get its type
                const attributeKey = attributeName.split(".");
                const attribute = Utility.objectGet(entityType.attributes, attributeKey);
                let attributeValueGrammar = Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue);
                // Returns a setter function for the attribute
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                )
            })

    /** @param {Grammar} r */
    static createEntityGrammar = (r, entityType, limitUnknownKeys = false) =>
        P.seqMap(
            entityType.lookbehind
                ? P.seq(P.string(entityType.lookbehind), P.optWhitespace, P.string("("))
                : P.string("("),
            Grammar.createAttributeGrammar(r, entityType)
                .trim(P.optWhitespace) // Drop spaces around a attribute assignment
                .sepBy(P.string(",")) // Assignments are separated by comma
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma and maybe additional space
            P.string(")"),
            (_0, attributes, _2) => {
                let values = {};
                attributes.forEach(attributeSetter => attributeSetter(values));
                return values
            }
        )
            // Decide if we accept the entity or not. It is accepted if it doesn't have too many unexpected keys
            .chain(values => {
                if (limitUnknownKeys) {
                    let unexpectedKeysCount = 0;
                    let totalKeys = 0;
                    for (const key in values) {
                        unexpectedKeysCount += key in entityType.attributes ? 0 : 1;
                        ++totalKeys;
                    }
                    if (unexpectedKeysCount + 0.5 > Math.sqrt(totalKeys)) {
                        return P.fail()
                    }
                }
                return P.succeed().map(() => new entityType(values))
            })

    /*   ---   General   ---   */

    /** @param {Grammar} r */
    InlineWhitespace = r => P.regex(/[^\S\n]+/).desc("single line whitespace")

    /** @param {Grammar} r */
    InlineOptWhitespace = r => P.regex(/[^\S\n]*/).desc("single line optional whitespace")

    /** @param {Grammar} r */
    MultilineWhitespace = r => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")

    /** @param {Grammar} r */
    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(() => null).desc("null: ()")

    /** @param {Grammar} r */
    Boolean = r => P.alt(
        P.string("True"),
        P.string("true"),
        P.string("False"),
        P.string("false"),
    ).map(v => v.toLocaleLowerCase() === "true" ? true : false)
        .desc("either True or False")

    /** @param {Grammar} r */
    HexDigit = r => P.regex(/[0-9a-fA-f]/).desc("hexadecimal digit")

    /** @param {Grammar} r */
    Number = r => P.regex(/[-\+]?[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")

    /** @param {Grammar} r */
    RealNumber = r => P.regex(/[-\+]?[0-9]+\.[0-9]+/).map(Number).desc("a number written as real")

    /** @param {Grammar} r */
    RealUnit = r => P.regex(/\+?[0-9]+(?:\.[0-9]+)?/).map(Number).assert(v => v >= 0 && v <= 1).desc("a number between 0 and 1")

    /** @param {Grammar} r */
    NaturalNumber = r => P.regex(/0|[1-9]\d*/).map(Number).desc("a natural number")

    /** @param {Grammar} r */
    ColorNumber = r => r.NaturalNumber.assert(n => 0 <= n && n < 256, "the color must be between 0 and 256 excluded")

    /** @param {Grammar} r */
    Word = r => P.regex(/[a-zA-Z_]+/).desc("a word")

    /** @param {Grammar} r */
    String = r => P.regex(/(?:[^"\\]|\\.)*/).wrap(P.string('"'), P.string('"')).map(Utility.unescapeString)
        .desc('string (with possibility to escape the quote using \")')

    /** @param {Grammar} r */
    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc("dot-separated words")

    /*   ---   Entity   ---   */

    /** @param {Grammar} r */
    None = r => P.string("None").map(() => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")

    /** @param {Grammar} r */
    Integer = r => P.regex(/[\-\+]?[0-9]+/).map(v => new IntegerEntity(v)).desc("an integer")

    /** @param {Grammar} r */
    Guid = r => r.HexDigit.times(32).tie().map(v => new GuidEntity({ value: v })).desc("32 digit hexadecimal value")

    /** @param {Grammar} r */
    Identifier = r => P.regex(/\w+/).map(v => new IdentifierEntity(v))

    /** @param {Grammar} r */
    PathSymbol = r => P.regex(/[0-9\w]+/).map(v => new PathSymbolEntity({ value: v }))

    /** @param {Grammar} r */
    PathSymbolOptSpaces = r => P.regex(/[0-9\w]+(?: [0-9\w]+)+|[0-9\w]+/).map(v => new PathSymbolEntity({ value: v }))

    /** @param {Grammar} r */
    Symbol = r => P.regex(/\w+/).map(v => new SymbolEntity({ value: v }))

    /** @param {Grammar} r */
    ObjectReference = r => P.alt(
        r.None,
        ...[
            Grammar.ReferencePath(r, r.PathSymbolOptSpaces)
                .map(path => new ObjectReferenceEntity({ type: "", path: path }))
        ].flatMap(referencePath => [
            referencePath.wrap(P.string(`"`), P.string(`"`)),
            referencePath.wrap(P.string(`'"`), P.string(`"'`)),
        ]),
        P.seqMap(
            Grammar.ReferencePath(r, r.PathSymbolOptSpaces), // Goes into referenceType
            P.optWhitespace, // Goes into _1 (ignored)
            P.alt(...[Grammar.ReferencePath(r, r.PathSymbolOptSpaces)].flatMap(referencePath => [
                referencePath.wrap(P.string(`"`), P.string(`"`)),
                referencePath.wrap(P.string(`'"`), P.string(`"'`))
            ])), // Goes into referencePath
            (referenceType, _1, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        ),
        Grammar.ReferencePath(r, r.PathSymbol).map(path => new ObjectReferenceEntity({ type: "", path: path })),
        r.Word.map(type => new ObjectReferenceEntity({ type: type, path: "" })),
    )

    /** @param {Grammar} r */
    LocalizedText = r => P.seqMap(
        P.string(LocalizedTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")), // Goes into _0 (ignored)
        r.String.trim(P.optWhitespace), // Goes into namespace
        P.string(","), // Goes into _2 (ignored)
        r.String.trim(P.optWhitespace), // Goes into key
        P.string(","), // Goes into _4 (ignored)
        r.String.trim(P.optWhitespace), // Goes into value
        P.string(")"), // Goes into _6 (ignored)
        (_0, namespace, _2, key, _4, value, _6) => new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value
        })
    )

    /** @param {Grammar} r */
    InvariantText = r => r.String.trim(P.optWhitespace).wrap(
        P.string(InvariantTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")),
        P.string(")")
    )
        .map(value => new InvariantTextEntity({ value: value }))

    /** @param {Grammar} r */
    AttributeAnyValue = r => P.alt(
        // Remember to keep the order, otherwise parsing might fail
        r.Boolean,
        r.Guid,
        r.None,
        r.Null,
        r.Number,
        r.String,
        r.LocalizedText,
        r.InvariantText,
        r.PinReference,
        Grammar.createEntityGrammar(r, Vector2DEntity, true),
        Grammar.createEntityGrammar(r, VectorEntity, true),
        Grammar.createEntityGrammar(r, LinearColorEntity, true),
        r.UnknownKeys,
        r.ObjectReference,
        r.Symbol,
    )

    /** @param {Grammar} r */
    PinReference = r => P.seqMap(
        r.PathSymbol, // Goes into objectNAme
        P.whitespace, // Goes into _1 (ignored)
        r.Guid, // Goes into pinGuid
        (objectName, _1, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid,
        })
    )

    /** @param {Grammar} r */
    Vector2D = r => Grammar.createEntityGrammar(r, Vector2DEntity)

    /** @param {Grammar} r */
    Vector = r => Grammar.createEntityGrammar(r, VectorEntity)

    /** @param {Grammar} r */
    Rotator = r => Grammar.createEntityGrammar(r, RotatorEntity)

    /** @param {Grammar} r */
    SimpleSerializationRotator = r => P.seqMap(
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        (p, _1, y, _3, r) => new SimpleSerializationRotatorEntity({
            R: r,
            P: p,
            Y: y,
        })
    )

    /** @param {Grammar} r */
    SimpleSerializationVector2D = r => P.seqMap(
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        (x, _1, y) => new SimpleSerializationVector2DEntity({
            X: x,
            Y: y,
        })
    )

    /** @param {Grammar} r */
    SimpleSerializationVector = r => P.seqMap(
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        (x, _1, y, _3, z) => new SimpleSerializationVectorEntity({
            X: x,
            Y: y,
            Z: z,
        })
    )

    /** @param {Grammar} r */
    LinearColor = r => Grammar.createEntityGrammar(r, LinearColorEntity)

    /** @param {Grammar} r */
    FunctionReference = r => Grammar.createEntityGrammar(r, FunctionReferenceEntity)

    /** @param {Grammar} r */
    VariableReference = r => Grammar.createEntityGrammar(r, VariableReferenceEntity)

    /** @param {Grammar} r */
    MacroGraphReference = r => Grammar.createEntityGrammar(r, MacroGraphReferenceEntity)

    /** @param {Grammar} r */
    KeyBinding = r => P.alt(
        r.Identifier.map(identifier => new KeyBindingEntity({
            Key: identifier
        })),
        Grammar.createEntityGrammar(r, KeyBindingEntity)
    )

    /** @param {Grammar} r */
    Pin = r => Grammar.createEntityGrammar(r, PinEntity)

    /** @param {Grammar} r */
    CustomProperties = r =>
        P.string("CustomProperties")
            .then(P.whitespace)
            .then(r.Pin)
            .map(pin => entity => {
                /** @type {Array} */
                let properties = Utility.objectGet(entity, ["CustomProperties"], []);
                properties.push(pin);
                Utility.objectSet(entity, ["CustomProperties"], properties, true);
            })

    /** @param {Grammar} r */
    Object = r => P.seqMap(
        P.seq(P.string("Begin"), P.whitespace, P.string("Object"), P.whitespace),
        P
            .alt(
                r.CustomProperties,
                Grammar.createAttributeGrammar(r, ObjectEntity)
            )
            .sepBy1(P.whitespace),
        P.seq(r.MultilineWhitespace, P.string("End"), P.whitespace, P.string("Object")),
        (_0, attributes, _2) => {
            let values = {};
            attributes.forEach(attributeSetter => attributeSetter(values));
            return new ObjectEntity(values)
        }
    )

    /** @returns {Parsimmon.Parser<ObjectEntity[]>} */
    MultipleObject = r => r.Object.sepBy1(P.whitespace).trim(P.optWhitespace)

    /*   ---   Others   ---   */

    /** @param {Grammar} r */
    LinearColorFromHex = r => P
        .string("#")
        .then(r.HexDigit.times(2).tie().times(3, 4))
        .trim(P.optWhitespace)
        .map(([R, G, B, A]) => new LinearColorEntity({
            R: parseInt(R, 16) / 255,
            G: parseInt(G, 16) / 255,
            B: parseInt(B, 16) / 255,
            A: A ? parseInt(A, 16) / 255 : 1,
        }))

    /** @param {Grammar} r */
    LinearColorFromRGBList = r => P.seqMap(
        r.ColorNumber,
        P.string(",").skip(P.optWhitespace),
        r.ColorNumber,
        P.string(",").skip(P.optWhitespace),
        r.ColorNumber.map(Number),
        (R, _1, G, _3, B) => new LinearColorEntity({
            R: R / 255,
            G: G / 255,
            B: B / 255,
            A: 1,
        })
    )

    /** @param {Grammar} r */
    LinearColorFromRGB = r => P.string("rgb").then(
        r.LinearColorFromRGBList.wrap(
            P.regex(/\(\s*/),
            P.regex(/\s*\)/)
        )
    )

    /** @param {Grammar} r */
    LinearColorFromRGBA = r => P.string("rgba").then(
        P.seqMap(
            r.ColorNumber,
            P.string(",").skip(P.optWhitespace),
            r.ColorNumber,
            P.string(",").skip(P.optWhitespace),
            r.ColorNumber.map(Number),
            P.string(",").skip(P.optWhitespace),
            P.regex(/0?\.\d+|[01]/).map(Number),
            (R, _1, G, _3, B, _4, A) => new LinearColorEntity({
                R: R / 255,
                G: G / 255,
                B: B / 255,
                A: A,
            })
        ).wrap(
            P.regex(/\(\s*/),
            P.regex(/\s*\)/)
        )
    )

    /** @param {Grammar} r */
    LinearColorFromAnyColor = r => P.alt(
        r.LinearColorFromRGBList,
        r.LinearColorFromHex,
        r.LinearColorFromRGB,
        r.LinearColorFromRGBA,
    )

    /** @param {Grammar} r */
    UnknownKeys = r => P.seqMap(
        P.regex(/\w*\s*/).skip(P.string("(")),
        P.seqMap(
            r.AttributeName,
            P.string("=").trim(P.optWhitespace),
            r.AttributeAnyValue,
            (attributeName, separator, attributeValue) =>
                entity => Utility.objectSet(entity, attributeName.split("."), attributeValue, true)
        )
            .trim(P.optWhitespace)
            .sepBy(P.string(",")) // Assignments are separated by comma
            .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma and maybe additional space
        P.string(")"),
        (lookbehind, attributes, _2) => {
            let values = {};
            attributes.forEach(attributeSetter => attributeSetter(values));
            let result = new UnknownKeysEntity(values);
            if (lookbehind) {
                result.lookbehind = lookbehind;
            }
            return result
        }
    )
}

/**
 * @typedef {import("../entity/IEntity").EntityConstructor} EntityConstructor
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

/** @template {AnyValue} T */
class ISerializer {

    static grammar = Parsimmon.createLanguage(new Grammar())

    /** @param {AnyValueConstructor<T>} entityType */
    constructor(
        entityType,
        attributePrefix = "",
        attributeSeparator = ",",
        trailingSeparator = false,
        attributeValueConjunctionSign = "=",
        attributeKeyPrinter = k => k.join(".")
    ) {
        this.entityType = entityType;
        this.attributePrefix = attributePrefix;
        this.attributeSeparator = attributeSeparator;
        this.trailingSeparator = trailingSeparator;
        this.attributeValueConjunctionSign = attributeValueConjunctionSign;
        this.attributeKeyPrinter = attributeKeyPrinter;
    }

    /**
     * @param {String} value
     * @returns {T}
     */
    deserialize(value) {
        return this.read(value)
    }

    /** @param {T} object */
    serialize(object, insideString = false, entity = object) {
        return this.write(entity, object, insideString)
    }

    /**
     * @param {String} value
     * @returns {T}
     */
    read(value) {
        throw new Error("Not implemented")
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, object, insideString) {
        throw new Error("Not implemented")
    }

    /**
     * @param {AnyValue} value
     * @param {String[]} fullKey
     * @param {Boolean} insideString
     */
    writeValue(entity, value, fullKey, insideString) {
        const type = Utility.getType(value);
        const serializer = SerializerFactory.getSerializer(type);
        if (!serializer) {
            throw new Error(`Unknown value type "${type.name}", a serializer must be registered in the SerializerFactory class, check initializeSerializerFactory.js`)
        }
        return serializer.write(entity, value, insideString)
    }

    /**
     * @param {String[]} key
     * @param {Object} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    subWrite(entity, key, object, insideString) {
        let result = "";
        let fullKey = key.concat("");
        const last = fullKey.length - 1;
        for (const property of Object.getOwnPropertyNames(object)) {
            fullKey[last] = property;
            const value = object[property];
            if (value?.constructor === Object) {
                // Recursive call when finding an object
                result += (result.length ? this.attributeSeparator : "")
                    + this.subWrite(entity, fullKey, value, insideString);
            } else if (value !== undefined && this.showProperty(entity, object, fullKey, value)) {
                const isSerialized = Utility.isSerialized(entity, fullKey);
                result += (result.length ? this.attributeSeparator : "")
                    + this.attributePrefix
                    + this.attributeKeyPrinter(fullKey)
                    + this.attributeValueConjunctionSign
                    + (
                        isSerialized
                            ? `"${this.writeValue(entity, value, fullKey, true)}"`
                            : this.writeValue(entity, value, fullKey, insideString)
                    );
            }
        }
        if (this.trailingSeparator && result.length && fullKey.length === 1) {
            // append separator at the end if asked and there was printed content
            result += this.attributeSeparator;
        }
        return result
    }

    showProperty(entity, object, attributeKey, attributeValue) {
        // @ts-expect-error
        const attributes = /** @type {EntityConstructor} */(this.entityType).attributes;
        const attribute = Utility.objectGet(attributes, attributeKey);
        if (attribute instanceof TypeInitialization) {
            if (attribute.ignored) {
                return false
            }
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}

class ObjectSerializer extends ISerializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false);
    }

    showProperty(entity, object, attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately
                return false
        }
        return super.showProperty(entity, object, attributeKey, attributeValue)
    }

    /** @param {String} value */
    read(value) {
        const parseResult = ISerializer.grammar.Object.parse(value);
        if (!parseResult.status) {
            throw new Error("Error when trying to parse the object.")
        }
        return parseResult.value
    }

    /** @param {String} value */
    readMultiple(value) {
        const parseResult = ISerializer.grammar.MultipleObject.parse(value);
        if (!parseResult.status) {
            throw new Error("Error when trying to parse the object.")
        }
        return parseResult.value
    }

    /**
     * @param {ObjectEntity} object
     * @param {Boolean} insideString
     */
    write(entity, object, insideString) {
        let result = `Begin Object Class=${object.Class.path} Name=${this.writeValue(entity, object.Name, ["Name"], insideString)}
${this.subWrite(entity, [], object, insideString)
            + object
                .CustomProperties.map(pin =>
                    this.attributeSeparator
                    + this.attributePrefix
                    + "CustomProperties "
                    + SerializerFactory.getSerializer(PinEntity).serialize(pin)
                )
                .join("")}
End Object\n`;
        return result
    }
}

class Copy extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #copyHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus ??= true;
        options.unlistenOnTextEdit ??= true; // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options);
        let self = this;
        this.#copyHandler = _ => self.copied();
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
            .map(node => Copy.#serializer.serialize(node.entity, false))
            .join("")
    }

    copied() {
        const value = this.getSerializedText();
        navigator.clipboard.writeText(value);
    }
}

/**
 * @typedef {import("../element/IElement").default} IElement
 * @typedef {import("../input/IInput").default} IInput
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/** @template {IElement} T */
class ITemplate {

    /** @type {T} */
    element

    get blueprint() {
        return this.element.blueprint
    }

    /** @type {IInput[]} */
    #inputObjects = []
    get inputObjects() {
        return this.#inputObjects
    }

    /** @param {T} element */
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
        return y``
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

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends IInput<T>
 */
class IKeyboardShortcut extends IInput {

    /** @type {KeyBindingEntity[]} */
    #activationKeys

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activateAnyKey ??= false;
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
                const parsed = ISerializer.grammar.KeyBinding.parse(v);
                if (parsed.status) {
                    return parsed.value
                }
            }
            throw new Error("Unexpected key value")
        });

        super(target, blueprint, options);

        this.#activationKeys = this.options.activationKeys ?? [];

        const wantsShift = keyEntry => keyEntry.bShift || keyEntry.Key == "LeftShift" || keyEntry.Key == "RightShift";
        const wantsCtrl = keyEntry => keyEntry.bCtrl || keyEntry.Key == "LeftControl" || keyEntry.Key == "RightControl";
        const wantsAlt = keyEntry => keyEntry.bAlt || keyEntry.Key == "LeftAlt" || keyEntry.Key == "RightAlt";

        let self = this;
        /** @param {KeyboardEvent} e */
        this.keyDownHandler = e => {
            if (
                this.options.activateAnyKey
                || self.#activationKeys.some(keyEntry =>
                    wantsShift(keyEntry) == e.shiftKey
                    && wantsCtrl(keyEntry) == e.ctrlKey
                    && wantsAlt(keyEntry) == e.altKey
                    && Configuration.Keys[keyEntry.Key] == e.code
                )
            ) {
                if (options.consumeEvent) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
                self.fire();
                document.removeEventListener("keydown", self.keyDownHandler);
                document.addEventListener("keyup", self.keyUpHandler);
            }
        };

        /** @param {KeyboardEvent} e */
        this.keyUpHandler = e => {
            if (
                this.options.activateAnyKey
                || self.#activationKeys.some(keyEntry =>
                    keyEntry.bShift && e.key == "Shift"
                    || keyEntry.bCtrl && e.key == "Control"
                    || keyEntry.bAlt && e.key == "Alt"
                    || keyEntry.bCmd && e.key == "Meta"
                    || Configuration.Keys[keyEntry.Key] == e.code
                )
            ) {
                if (options.consumeEvent) {
                    e.stopImmediatePropagation();
                }
                self.unfire();
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

    // Subclasses will want to override

    fire() {
    }

    unfire() {
    }
}

class KeyboardCanc extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Configuration.deleteNodesKeyboardKey;
        super(target, blueprint, options);
    }

    fire() {
        this.blueprint.removeGraphElement(...this.blueprint.getNodes(true));
    }
}

/**
 * @template {HTMLElement} T
 * @extends {IInput<T>}
 */
class IPointing extends IInput {

    constructor(target, blueprint, options = {}) {
        options.ignoreTranslateCompensate ??= false;
        options.ignoreScale ??= false;
        options.movementSpace ??= blueprint.getGridDOMElement() ?? document.documentElement;
        super(target, blueprint, options);
        /** @type {HTMLElement} */
        this.movementSpace = options.movementSpace;
    }

    /** @param {MouseEvent} mouseEvent */
    locationFromEvent(mouseEvent) {
        const location = Utility.convertLocation(
            [mouseEvent.clientX, mouseEvent.clientY],
            this.movementSpace,
            this.options.ignoreScale
        );
        return this.options.ignoreTranslateCompensate
            ? location
            : this.blueprint.compensateTranslation(location)
    }
}

class IMouseWheel extends IPointing {

    #mouseWheelHandler =
        /** @param {WheelEvent} e */
        e => {
            e.preventDefault();
            const location = this.locationFromEvent(e);
            this.wheel(Math.sign(e.deltaY * Configuration.mouseWheelFactor), location);
        }

    #mouseParentWheelHandler =
        /** @param {WheelEvent} e */
        e => e.preventDefault()

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        options.strictTarget ??= false;
        super(target, blueprint, options);
        this.strictTarget = options.strictTarget;
    }

    listenEvents() {
        this.movementSpace.addEventListener("wheel", this.#mouseWheelHandler, false);
        this.movementSpace.parentElement?.addEventListener("wheel", this.#mouseParentWheelHandler);
    }

    unlistenEvents() {
        this.movementSpace.removeEventListener("wheel", this.#mouseWheelHandler, false);
        this.movementSpace.parentElement?.removeEventListener("wheel", this.#mouseParentWheelHandler);
    }

    /* Subclasses will override the following method */
    wheel(variation, location) {
    }
}

class Zoom extends IMouseWheel {

    #enableZoonIn = false

    get enableZoonIn() {
        return this.#enableZoonIn
    }

    set enableZoonIn(value) {
        value = Boolean(value);
        if (value == this.#enableZoonIn) {
            return
        }
        this.#enableZoonIn = value;
    }

    wheel(variation, location) {
        let zoomLevel = this.blueprint.getZoom();
        variation = -variation;
        if (!this.enableZoonIn && zoomLevel == 0 && variation > 0) {
            return
        }
        zoomLevel += variation;
        this.blueprint.setZoom(zoomLevel, location);
    }
}

class KeyboardEnableZoom extends IKeyboardShortcut {

    /** @type {Zoom} */
    #zoomInputObject

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Configuration.enableZoomIn;
        super(target, blueprint, options);
    }

    fire() {
        this.#zoomInputObject = this.blueprint.getInputObject(Zoom);
        this.#zoomInputObject.enableZoonIn = true;
    }

    unfire() {
        this.#zoomInputObject.enableZoonIn = false;
    }
}

/** @typedef {import("../../Blueprint").default} Blueprint */
class KeyboardSelectAll extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Configuration.selectAllKeyboardKey;
        super(target, blueprint, options);
    }

    fire() {
        this.blueprint.selectAll();
    }
}

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../input/IInput").default} IInput
 * @typedef {import("../template/ITemplate").default} ITemplate
 * @typedef {import("lit").PropertyDeclarations} PropertyDeclarations
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/**
 * @template {IEntity} T
 * @template {ITemplate} U
 */
class IElement extends s {

    /** @type {PropertyDeclarations} */
    static properties = {
    }

    #nextUpdatedCallbacks = []

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }
    set blueprint(v) {
        this.#blueprint = v;
    }

    /** @type {T} */
    #entity
    get entity() {
        return this.#entity
    }
    set entity(entity) {
        this.#entity = entity;
    }

    /** @type {U} */
    #template
    get template() {
        return this.#template
    }

    isInitialized = false
    isSetup = false

    /** @type {IInput[]} */
    inputObjects = []

    /**
     * @param {T} entity
     * @param {U} template
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
    }

    createRenderRoot() {
        return this
    }

    /** @param {PropertyValues} changedProperties */
    shouldUpdate(changedProperties) {
        return this.isInitialized && this.isConnected
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
        // Remember the array might change while iterating
        for (const f of this.#nextUpdatedCallbacks) {
            f(changedProperties);
        }
        this.#nextUpdatedCallbacks = [];
    }

    addNextUpdatedCallbacks(callback, requestUpdate = false) {
        this.#nextUpdatedCallbacks.push(callback);
        if (requestUpdate) {
            this.requestUpdate();
        }
    }

    /** @param {IElement} element */
    isSameGraph(element) {
        return this.blueprint && this.blueprint == element?.blueprint
    }

    /**
     * @template {IInput} V
     * @param {new (...args: any[]) => V} type
     */
    getInputObject(type) {
        return /** @type {V} */(this.template.inputObjects.find(object => object.constructor == type))
    }
}

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../template/IDraggableTemplate").default} IDraggableTemplate
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

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
        const scaleCorrection = 1 / this.blueprint.getScale();
        const bounding = this.getBoundingClientRect();
        this.sizeX = bounding.width * scaleCorrection;
        this.sizeY = bounding.height * scaleCorrection;
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.computeSizes();
    }

    /** @param {Number[]} param0 */
    setLocation([x, y], acknowledge = true) {
        const d = [x - this.locationX, y - this.locationY];
        this.locationX = x;
        this.locationY = y;
        if (this.blueprint && acknowledge) {
            const dragLocalEvent = new CustomEvent(
                /** @type {typeof IDraggableElement} */(this.constructor).dragEventName,
                {
                    detail: {
                        value: d,
                    },
                    bubbles: false,
                    cancelable: true,
                }
            );
            this.dispatchEvent(dragLocalEvent);
        }
    }

    /** @param {Number[]} param0 */
    addLocation([x, y], acknowledge = true) {
        this.setLocation([this.locationX + x, this.locationY + y], acknowledge);
    }

    /** @param {Number[]} value */
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
        const snappedLocation = Utility.snapToGrid([this.locationX, this.locationY], Configuration.gridSize);
        if (this.locationX != snappedLocation[0] || this.locationY != snappedLocation[1]) {
            this.setLocation(snappedLocation);
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
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/IElement").default} IElement
 */

/**
 * @template {IElement} T
 * @extends {IPointing<T>}
 */
class IMouseClickDrag extends IPointing {

    #mouseDownHandler =
        /** @param {MouseEvent} e  */
        e => {
            this.blueprint.setFocused(true);
            switch (e.button) {
                case this.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (!this.options.strictTarget || e.target == e.currentTarget) {
                        if (this.options.consumeEvent) {
                            e.stopImmediatePropagation(); // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        this.#movementListenedElement.addEventListener("mousemove", this.#mouseStartedMovingHandler);
                        document.addEventListener("mouseup", this.#mouseUpHandler);
                        this.clickedPosition = this.locationFromEvent(e);
                        this.blueprint.mousePosition[0] = this.clickedPosition[0];
                        this.blueprint.mousePosition[1] = this.clickedPosition[1];
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

    #mouseStartedMovingHandler =
        /** @param {MouseEvent} e  */
        e => {
            if (this.options.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            // Delegate from now on to this.#mouseMoveHandler
            this.#movementListenedElement.removeEventListener("mousemove", this.#mouseStartedMovingHandler);
            this.#movementListenedElement.addEventListener("mousemove", this.#mouseMoveHandler);
            // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
            const dragEvent = this.getEvent(Configuration.trackingMouseEventName.begin);
            this.#trackingMouse = this.target.dispatchEvent(dragEvent) == false;
            const location = this.locationFromEvent(e);
            // Do actual actions
            this.lastLocation = Utility.snapToGrid(this.clickedPosition, this.stepSize);
            this.startDrag(location);
            this.started = true;
        }

    #mouseMoveHandler =
        /** @param {MouseEvent} e  */
        e => {
            if (this.options.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            const location = this.locationFromEvent(e);
            const movement = [e.movementX, e.movementY];
            this.dragTo(location, movement);
            if (this.#trackingMouse) {
                this.blueprint.mousePosition = this.locationFromEvent(e);
            }
        }

    #mouseUpHandler =
        /** @param {MouseEvent} e  */
        e => {
            if (!this.options.exitAnyButton || e.button == this.options.clickButton) {
                if (this.options.consumeEvent) {
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

    clickedOffset = [0, 0]
    clickedPosition = [0, 0]
    lastLocation = [0, 0]
    started = false
    stepSize = 1

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0;
        options.consumeEvent ??= true;
        options.draggableElement ??= target;
        options.exitAnyButton ??= true;
        options.moveEverywhere ??= false;
        options.movementSpace ??= blueprint?.getGridDOMElement();
        options.repositionOnClick ??= false;
        options.strictTarget ??= false;
        super(target, blueprint, options);
        this.stepSize = parseInt(options?.stepSize ?? Configuration.gridSize);
        this.#movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace;
        this.#draggableElement = /** @type {HTMLElement} */(this.options.draggableElement);

        this.listenEvents();
    }

    listenEvents() {
        super.listenEvents();
        this.#draggableElement.addEventListener("mousedown", this.#mouseDownHandler);
        if (this.options.clickButton == 2) {
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

class MouseScrollGraph extends IMouseClickDrag {

    startDrag() {
        this.blueprint.scrolling = true;
    }

    dragTo(location, movement) {
        this.blueprint.scrollDelta([-movement[0], -movement[1]]);
    }

    endDrag() {
        this.blueprint.scrolling = false;
    }
}

class MouseTracking extends IPointing {

    /** @type {IPointing} */
    #mouseTracker = null

    /** @type {(e: MouseEvent) => void} */
    #mousemoveHandler

    /** @type {(e: CustomEvent) => void} */
    #trackingMouseStolenHandler

    /** @type {(e: CustomEvent) => void} */
    #trackingMouseGaveBackHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        super(target, blueprint, options);

        let self = this;

        this.#mousemoveHandler = e => {
            e.preventDefault();
            self.blueprint.mousePosition = self.locationFromEvent(e);
        };

        this.#trackingMouseStolenHandler = e => {
            if (!self.#mouseTracker) {
                e.preventDefault();
                this.#mouseTracker = e.detail.tracker;
                self.unlistenMouseMove();
            }
        };

        this.#trackingMouseGaveBackHandler = e => {
            if (self.#mouseTracker == e.detail.tracker) {
                e.preventDefault();
                self.#mouseTracker = null;
                self.listenMouseMove();
            }
        };
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
 * @typedef {import("./IElement").default} IElement
 * @typedef {new (...args) => IElement} ElementConstructor
 */

class ElementFactory {

    /** @type {Map<String, ElementConstructor>} */
    static #elementConstructors = new Map()

    /**
     * @param {String} tagName
     * @param {ElementConstructor} entityConstructor
     */
    static registerElement(tagName, entityConstructor) {
        ElementFactory.#elementConstructors.set(tagName, entityConstructor);
    }

    /** @param {String} tagName */
    static getConstructor(tagName) {
        return ElementFactory.#elementConstructors.get(tagName)
    }
}

/**
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../element/NodeElement").NodeElementConstructor} NodeElementConstructor
 */

class Paste extends IInput {

    static #serializer = new ObjectSerializer()

    /** @type {(e: ClipboardEvent) => void} */
    #pasteHandle

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

    pasted(value) {
        let top = 0;
        let left = 0;
        let count = 0;
        let nodes = Paste.#serializer.readMultiple(value).map(entity => {
            /** @type {NodeElement} */
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
            const locationOffset = [
                mousePosition[0] - left,
                mousePosition[1] - top,
            ];
            node.addLocation(locationOffset);
            node.snapToGrid();
            node.setSelected(true);
        });
        this.blueprint.addGraphElement(...nodes);
        return true
    }
}

class Select extends IMouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.selectorElement = this.blueprint.template.selectorElement;
    }

    startDrag() {
        this.selectorElement.beginSelect(this.clickedPosition);
    }

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

class Unfocus extends IInput {

    /** @type {(e: MouseEvent) => void} */
    #clickHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        super(target, blueprint, options);

        let self = this;
        this.#clickHandler = e => self.clickedSomewhere(/** @type {HTMLElement} */(e.target));
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

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../element/SelectorElement").default} SelectorElement
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

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
    }

    setup() {
        super.setup();
        this.#resizeObserver.observe(this.viewportElement, {
            box: "device-pixel-content-box",
        });
        const bounding = this.viewportElement.getBoundingClientRect();
        this.viewportSize[0] = bounding.width;
        this.viewportSize[1] = bounding.height;
    }

    cleanup() {
        super.cleanup();
        this.#resizeObserver.unobserve(this.viewportElement);
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new Copy(this.element.getGridDOMElement(), this.element),
            new Paste(this.element.getGridDOMElement(), this.element),
            new KeyboardCanc(this.element.getGridDOMElement(), this.element),
            new KeyboardSelectAll(this.element.getGridDOMElement(), this.element),
            new Zoom(this.element.getGridDOMElement(), this.element),
            new Select(this.element.getGridDOMElement(), this.element, {
                clickButton: 0,
                exitAnyButton: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(this.element.getGridDOMElement(), this.element, {
                clickButton: 2,
                exitAnyButton: false,
                moveEverywhere: true,
            }),
            new Unfocus(this.element.getGridDOMElement(), this.element),
            new MouseTracking(this.element.getGridDOMElement(), this.element),
            new KeyboardEnableZoom(this.element.getGridDOMElement(), this.element),
        ]
    }

    render() {
        return y`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">
                    Zoom ${this.element.zoom == 0 ? "1:1" : (this.element.zoom > 0 ? "+" : "") + this.element.zoom}
                </div>
            </div>
            <div class="ueb-viewport-overlay"></div>
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x: ${Math.round(this.element.translateX)}; --ueb-additional-y: ${Math.round(this.element.translateY)}; --ueb-translate-x: ${Math.round(this.element.translateX)}; --ueb-translate-y: ${Math.round(this.element.translateY)};">
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
        this.headerElement = this.element.querySelector('.ueb-viewport-header');
        this.overlayElement = this.element.querySelector('.ueb-viewport-overlay');
        this.viewportElement = this.element.querySelector('.ueb-viewport-body');
        this.selectorElement = this.element.querySelector('ueb-selector');
        this.gridElement = this.viewportElement.querySelector(".ueb-grid");
        this.linksContainerElement = this.element.querySelector("[data-links]");
        this.linksContainerElement.append(...this.element.getLinks());
        this.nodesContainerElement = this.element.querySelector("[data-nodes]");
        this.nodesContainerElement.append(...this.element.getNodes());
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
            this.viewportElement.scroll(this.element.scrollX, this.element.scrollY);
        }
        if (changedProperties.has("zoom")) {
            const previousZoom = changedProperties.get("zoom");
            const minZoom = Math.min(previousZoom, this.element.zoom);
            const maxZoom = Math.max(previousZoom, this.element.zoom);
            const classes = Utility.range(minZoom, maxZoom);
            const getClassName = v => `ueb-zoom-${v}`;
            if (previousZoom < this.element.zoom) {
                this.element.classList.remove(...classes.filter(v => v < 0).map(getClassName));
                this.element.classList.add(...classes.filter(v => v > 0).map(getClassName));
            } else {
                this.element.classList.remove(...classes.filter(v => v > 0).map(getClassName));
                this.element.classList.add(...classes.filter(v => v < 0).map(getClassName));
            }
        }
    }

    getCommentNodes(justSelected = false) {
        return this.element.querySelectorAll(
            `ueb-node[data-type="${Configuration.nodeType.comment}"]${justSelected ? '[data-selected="true"]' : ''}`
        )
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        return /** @type {PinElement} */(this.element.querySelector(
            `ueb-node[data-name="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        ))
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    isPointVisible(x, y) {
        return false
    }

    gridTopVisibilityBoundary() {
        return this.blueprint.scrollY - this.blueprint.translateY
    }

    gridRightVisibilityBoundary() {
        return this.gridLeftVisibilityBoundary() + this.viewportSize[0]
    }

    gridBottomVisibilityBoundary() {
        return this.gridTopVisibilityBoundary() + this.viewportSize[1]
    }

    gridLeftVisibilityBoundary() {
        return this.blueprint.scrollX - this.blueprint.translateX
    }
}

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../template/ITemplate").default} ITemplate
 */

/**
 * @template {IEntity} T
 * @template {ITemplate} U
 * @extends {IElement<T, U>}
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

    /** @param {Number[]} param0 */
    setBothLocations([x, y]) {
        this.fromX = x;
        this.fromY = y;
        this.toX = x;
        this.toY = y;
    }

    /** @param {Number[]} offset */
    addSourceLocation([offsetX, offsetY]) {
        this.fromX += offsetX;
        this.fromY += offsetY;
    }

    /** @param {Number[]} offset */
    addDestinationLocation([offsetX, offsetY]) {
        this.toX += offsetX;
        this.toY += offsetY;
    }
}

/**
 * @typedef {import("../element/IFromToPositionedElement").default} IFromToPositionedElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

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

class KnotEntity extends ObjectEntity {

    /**
     * @param {Object} options
     * @param {PinEntity} pinReferenceForType
     */
    constructor(options = {}, pinReferenceForType = undefined) {
        super(options, true);
        this.Class = new ObjectReferenceEntity("/Script/BlueprintGraph.K2Node_Knot");
        this.Name = "K2Node_Knot";
        const inputPinEntity = new PinEntity(
            {
                PinName: "InputPin",
            },
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
        this.CustomProperties = [inputPinEntity, outputPinEntity];
    }
}

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
 */
class MouseDbClick extends IPointing {

    static ignoreDbClick =
        /** @param {Number[]} location */
        location => { }

    #mouseDbClickHandler =
        /** @param {MouseEvent} e */
        e => {
            if (!this.options.strictTarget || e.target === e.currentTarget) {
                if (this.options.consumeEvent) {
                    e.stopImmediatePropagation(); // Captured, don't call anyone else
                }
                this.clickedPosition = this.locationFromEvent(e);
                this.blueprint.mousePosition[0] = this.clickedPosition[0];
                this.blueprint.mousePosition[1] = this.clickedPosition[1];
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

    clickedPosition = [0, 0]

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
    dbclicked(location) {
        this.onDbClick(location);
    }
}

/**
 * @typedef {import("../element/LinkElement").default} LinkElement
 * @typedef {import("../element/LinkElement").LinkElementConstructor} LinkElementConstructor
 * @typedef {import("../element/NodeElement").NodeElementConstructor} NodeElementConstructor
 * @typedef {import("./node/KnotNodeTemplate").default} KnotNodeTemplate
 * @typedef {import("lit").PropertyValues} PropertyValues
 */


/** @extends {IFromToPositionedTemplate<LinkElement>} */
class LinkTemplate extends IFromToPositionedTemplate {

    /**
     * Returns a function providing the inverse multiplication y = a / x + q. The value of a and q are calculated using
     * the derivative of that function y' = -a / x^2 at the point p (x = p[0] and y = p[1]). This means
     * y'(p[0]) = m => -a / p[0]^2 = m => a = -m * p[0]^2. Now, in order to determine q we can use the starting
     * function: p[1] = a / p[0] + q => q = p[1] - a / p[0]
     * @param {Number} m slope
     * @param {Number[]} p reference point
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

    static c2DecreasingValue = LinkTemplate.decreasingValue(-0.06, [500, 130])

    static c2Clamped = LinkTemplate.clampedLine([0, 100], [200, 30])

    /** @type {(location: Number[]) => void} */
    #createKnot = location => {
        const knotEntity = new KnotEntity({}, this.element.sourcePin.entity);
        const knot = /** @type {NodeElementConstructor} */(ElementFactory.getConstructor("ueb-node"))
            .newObject(knotEntity);
        knot.setLocation(this.blueprint.snapToGrid(location));
        this.blueprint.addGraphElement(knot); // Important: keep it before changing existing links
        const link = /** @type {LinkElementConstructor} */(ElementFactory.getConstructor("ueb-link"))
            .newObject(
                /** @type {KnotNodeTemplate} */(knot.template).outputPin,
                this.element.destinationPin
            );
        this.element.destinationPin = /** @type {KnotNodeTemplate} */(knot.template).inputPin;
        this.blueprint.addGraphElement(link);
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseDbClick(
                this.element.querySelector(".ueb-link-area"),
                this.blueprint,
                undefined,
                (location) => this.#createKnot(location)
            )
        ]
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        const sourcePin = this.element.sourcePin;
        const destinationPin = this.element.destinationPin;
        if (changedProperties.has("fromX") || changedProperties.has("toX")) {
            const isSourceAKnot = sourcePin?.nodeElement.getType() == Configuration.nodeType.knot;
            const isDestinationAKnot = destinationPin?.nodeElement.getType() == Configuration.nodeType.knot;
            if (isSourceAKnot && (!destinationPin || isDestinationAKnot)) {
                if (sourcePin?.isInput() && this.element.toX > this.element.fromX + Configuration.distanceThreshold) {
                    this.element.sourcePin = /** @type {KnotNodeTemplate} */(sourcePin.nodeElement.template).outputPin;
                } else if (sourcePin?.isOutput() && this.element.toX < this.element.fromX - Configuration.distanceThreshold) {
                    this.element.sourcePin = /** @type {KnotNodeTemplate} */(sourcePin.nodeElement.template).inputPin;
                }
            }
            if (isDestinationAKnot && (!sourcePin || isSourceAKnot)) {
                if (destinationPin?.isInput() && this.element.toX < this.element.fromX + Configuration.distanceThreshold) {
                    this.element.destinationPin = /** @type {KnotNodeTemplate} */(destinationPin.nodeElement.template).outputPin;
                } else if (destinationPin?.isOutput() && this.element.toX > this.element.fromX - Configuration.distanceThreshold) {
                    this.element.destinationPin = /** @type {KnotNodeTemplate} */(destinationPin.nodeElement.template).inputPin;
                }
            }
        }
        const dx = Math.max(Math.abs(this.element.fromX - this.element.toX), 1);
        Math.max(Math.abs(this.element.fromY - this.element.toY), 1);
        const width = Math.max(dx, Configuration.linkMinWidth);
        // const height = Math.max(Math.abs(link.fromY - link.toY), 1)
        const fillRatio = dx / width;
        // const aspectRatio = width / height
        const xInverted = this.element.originatesFromInput
            ? this.element.fromX < this.element.toX
            : this.element.toX < this.element.fromX;
        this.element.startPixels = dx < width // If under minimum width
            ? (width - dx) / 2 // Start from half the empty space
            : 0; // Otherwise start from the beginning
        this.element.startPercentage = xInverted ? this.element.startPixels + fillRatio * 100 : this.element.startPixels;
        const c1
            = this.element.startPercentage
            + (xInverted
                ? LinkTemplate.c1DecreasingValue(width)
                : 10
            )
            * fillRatio;
        let c2 = LinkTemplate.c2Clamped(xInverted ? -dx : dx) + this.element.startPercentage;
        c2 = Math.min(c2, LinkTemplate.c2DecreasingValue(width));
        this.element.svgPathD = Configuration.linkRightSVGPath(this.element.startPercentage, c1, c2);
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("originatesFromInput")) {
            this.element.style.setProperty("--ueb-from-input", this.element.originatesFromInput ? "1" : "0");
        }
        const referencePin = this.element.sourcePin ?? this.element.destinationPin;
        if (referencePin) {
            this.element.style.setProperty("--ueb-link-color-rgb", Utility.printLinearColor(referencePin.color));
        }
        this.element.style.setProperty("--ueb-y-reflected", `${this.element.fromY > this.element.toY ? 1 : 0}`);
        this.element.style.setProperty("--ueb-start-percentage", `${Math.round(this.element.startPercentage)}%`);
        this.element.style.setProperty("--ueb-link-start", `${Math.round(this.element.startPixels)}`);
    }

    render() {
        const uniqueId = `ueb-id-${Math.floor(Math.random() * 1E12)}`;
        return y`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <g class="ueb-link-area">
                    <path id="${uniqueId}" fill="none" vector-effect="non-scaling-stroke" d="${this.element.svgPathD}" />
                    <use href="#${uniqueId}" pointer-events="stroke" stroke-width="20" />
                </g>
            </svg>
            ${this.element.linkMessageIcon || this.element.linkMessageText ? y`
                <div class="ueb-link-message">
                    ${this.element.linkMessageIcon !== b ? y`
                        <span class="ueb-link-message-icon">${this.element.linkMessageIcon}</span>
                    ` : b}
                    ${this.element.linkMessageText !== b ? y`
                        <span class="ueb-link-message-text">${this.element.linkMessageText}</span>
                    ` : b}
                </div>
            ` : b}
        `
    }
}

class SVGIcon {

    static branchNode = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 2H6C5.44772 2 5 2.44772 5 3V13C5 13.5523 5.44772 14 6 14H11V12H7V4H11V2Z" fill="white" />
            <rect x="1" y="7" width="4" height="2" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 6L15 3L11 0V6Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 16L15 13L11 10V16Z" fill="white" />
        </svg>
    `

    static breakStruct = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 14L10 12L11 11L13 13L14 12L14 15L11 15L12 14Z" fill="white"/>
            <path d="M13 3L11 5L10 4L12 2L11 1L14 1L14 4L13 3Z" fill="white"/>
            <path d="M7.975 6H3.025C1.90662 6 1 6.90662 1 8.025V8.475C1 9.59338 1.90662 10.5 3.025 10.5H7.975C9.09338 10.5 10 9.59338 10 8.475V8.025C10 6.90662 9.09338 6 7.975 6Z" fill="white"/>
        </svg>
    `

    static cast = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 12L16 7.5L12 3V12Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11L4 7.5L0 4V11Z" fill="white"/>
            <rect opacity="0.5" x="5" y="6" width="1" height="3" fill="white"/>
            <rect opacity="0.5" x="7" y="6" width="1" height="3" fill="white"/>
            <rect opacity="0.5" x="9" y="6" width="1" height="3" fill="white"/>
            <rect x="9" y="6" width="3" height="3" fill="white"/>
        </svg>
    `

    static close = y`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="2" x2="30" y2="30" stroke="currentColor" stroke-width="4" />
            <line x1="30" y1="2" x2="2" y2="30" stroke="currentColor" stroke-width="4" />
        </svg>
    `

    static correct = y`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path fill="#2da800" d="M 2 16 L 14 30 L 30 2 L 13 22 Z" />
        </svg>
    `

    static doN = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 12V8H9V4L16 10L9 16V12H1Z" fill="white"/>
            <path d="M7 6L6 6L4 2.66667V6H3V1H4L6 4.33333V1H7V6Z" fill="white"/>
        </svg>
    `

    static execPin = y`
        <svg viewBox="-2 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path class="ueb-pin-tofill" stroke-width="1.25" stroke="white" fill="none"
                d="M 2 1 a 2 2 0 0 0 -2 2 v 10 a 2 2 0 0 0 2 2 h 4 a 2 2 0 0 0 1.519 -0.698 l 4.843 -5.651 a 1 1 0 0 0 0 -1.302 L 7.52 1.7 a 2 2 0 0 0 -1.519 -0.698 z" />
        </svg>
    `

    static expandIcon = y`
        <svg fill="currentColor" viewBox="4 4 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M 16.003 18.626 l 7.081 -7.081 L 25 13.46 l -8.997 8.998 -9.003 -9 1.917 -1.916 z" />
        </svg>
    `

    static forEachLoop = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C1.8 2 0 3.8 0 6V9C0 11.2 2 13 4 13H10V11H5C3.2 11 2 9.7 2 8V7C2 5.63882 2.76933 4.53408 4 4.14779V2ZM12 4C13.8 4 14 5.3 14 7V8C14 8.8 13.7 9.5 13.3 10L15.2 11.4C15.7 10.7 16 9.9 16 9V6C16 3.8 14.2 2 12 2V4Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16L13 12L8 8V16Z" fill="white" />
            <rect x="5" y="1" width="1" height="4" fill="white" />
            <rect x="7" y="1" width="1" height="4" fill="white" />
            <rect x="9" y="1" width="1" height="4" fill="white" />
            <rect x="11" y="2" width="1" height="2" fill="white" />
        </svg>
    `

    static functionSymbol = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.72002 6.0699C9.88111 4.96527 10.299 3.9138 10.94 2.99991C10.94 2.99991 10.94 3.05991 10.94 3.08991C10.94 3.36573 11.0496 3.63026 11.2446 3.8253C11.4397 4.02033 11.7042 4.12991 11.98 4.12991C12.2558 4.12991 12.5204 4.02033 12.7154 3.8253C12.9105 3.63026 13.02 3.36573 13.02 3.08991C13.0204 2.90249 12.9681 2.71873 12.8691 2.5596C12.7701 2.40047 12.6283 2.27237 12.46 2.18991H12.37C11.8725 2.00961 11.3275 2.00961 10.83 2.18991C9.21002 2.63991 8.58002 4.99991 8.58002 4.99991L8.40002 5.1199H5.40002L5.15002 6.1199H8.27002L7.27002 11.4199C7.11348 12.0161 6.79062 12.5555 6.33911 12.9751C5.8876 13.3948 5.32607 13.6773 4.72002 13.7899C4.78153 13.655 4.81227 13.5081 4.81002 13.3599C4.81002 13.0735 4.69624 12.7988 4.4937 12.5962C4.29116 12.3937 4.01646 12.2799 3.73002 12.2799C3.44359 12.2799 3.16889 12.3937 2.96635 12.5962C2.76381 12.7988 2.65002 13.0735 2.65002 13.3599C2.66114 13.605 2.75692 13.8386 2.92104 14.021C3.08517 14.2033 3.30746 14.3231 3.55002 14.3599C7.91002 15.1999 8.55002 11.4499 8.55002 11.4499L9.55002 7.05991H12.55L12.8 6.05991H9.64002L9.72002 6.0699Z"
                fill="currentColor"
            />
        </svg>
    `

    static genericPin = y`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle class="ueb-pin-tofill" cx="16" cy="16" r="14" fill="black" stroke="currentColor" stroke-width="5" />
            <path d="M 34 6 L 34 26 L 42 16 Z" fill="currentColor" />
        </svg>
    `

    static loop = y`
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

    static macro = y`
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2.92L10 12.29L14.55 2.61C14.662 2.4259 14.8189 2.27332 15.0061 2.16661C15.1933 2.05989 15.4045 2.00256 15.62 2H19L18.66 2.89C18.66 2.89 17.17 3.04 17.11 3.63C17.05 4.22 16 15.34 15.93 16.13C15.86 16.92 17.33 17.13 17.33 17.13L17.17 17.99H13.84C13.7241 17.9764 13.612 17.9399 13.5103 17.8826C13.4086 17.8253 13.3194 17.7484 13.2477 17.6562C13.176 17.5641 13.1234 17.4586 13.0929 17.346C13.0624 17.2333 13.0546 17.1157 13.07 17L14.43 5.52L10 14.57C9.8 15.03 9.07 15.72 8.63 15.71H7.75L6.05 4.86L3.54 17.39C3.51941 17.5514 3.44327 17.7005 3.32465 17.8118C3.20603 17.9232 3.05235 17.9897 2.89 18H1L1.11 17.09C1.11 17.09 2.21 17.09 2.3 16.69C2.39 16.29 5.3 3.76 5.41 3.32C5.52 2.88 4.19 2.81 4.19 2.81L4.46 2H6.62C7.09 2 7.92 2.38 8 2.92Z" fill="white"/>
        </svg>
    `

    static makeArray = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H13V6H15V4Z" fill="white"/>
            <path d="M15 7H13V9H15V7Z" fill="white"/>
            <path d="M15 10H13V12H15V10Z" fill="white"/>
            <path d="M12 4H10V6H12V4Z" fill="white"/>
            <path d="M12 7H10V9H12V7Z" fill="white"/>
            <path d="M12 10H10V12H12V10Z" fill="white"/>
            <path d="M9 4H7V6H9V4Z" fill="white"/>
            <path d="M9 7H7V9H9V7Z" fill="white"/>
            <path d="M9 10H7V12H9V10Z" fill="white"/>
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white"/>
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white"/>
        </svg>
    `

    static makeMap = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4H10V6H15V4Z" fill="white"/>
            <path d="M15 7H10V9H15V7Z" fill="white"/>
            <path d="M15 10H10V12H15V10Z" fill="white"/>
            <path d="M9 4H7V6H9V4Z" fill="white"/>
            <path d="M9 7H7V9H9V7Z" fill="white"/>
            <path d="M9 10H7V12H9V10Z" fill="white"/>
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white"/>
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white"/>
        </svg>
    `

    static makeStruct = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L1 1.99995L2 1L4 3L5 1.99995L5 5L2 5L3 4Z" fill="white"/>
            <path d="M4 13L1.99995 15L1 14L3 12L1.99995 11L5 11L5 14L4 13Z" fill="white"/>
            <path d="M12.975 6H8.025C6.90662 6 6 6.90662 6 8.025V8.475C6 9.59338 6.90662 10.5 8.025 10.5H12.975C14.0934 10.5 15 9.59338 15 8.475V8.025C15 6.90662 14.0934 6 12.975 6Z" fill="white"/>
        </svg>
    `

    static referencePin = y`
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <polygon class="ueb-pin-tofill" points="4 16 16 4 28 16 16 28" stroke="currentColor" stroke-width="5" />
        </svg>
    `

    static reject = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="red" stroke-width="2" stroke-miterlimit="10" d="M12.5 3.5L3.5 12.5" />
            <path fill="red" d="M8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2ZM8 0.5C3.9 0.5 0.5 3.9 0.5 8C0.5 12.1 3.9 15.5 8 15.5C12.1 15.5 15.5 12.1 15.5 8C15.5 3.9 12.1 0.5 8 0.5Z" />
        </svg>
    `

    static select = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="2" width="6" height="2" fill="white"/>
            <rect x="10" y="7" width="3" height="2" fill="white"/>
            <path d="M12 5L15 8L12 11V5Z" fill="white"/>
            <rect x="1" y="7" width="8" height="2" fill="white"/>
            <rect x="5" y="4" width="2" height="9" fill="white"/>
            <rect x="1" y="12" width="6" height="2" fill="white"/>
        </svg>
    `

    static sequence = y`
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="5" height="2" fill="white"/>
            <rect y="7" width="8" height="2" fill="white"/>
            <rect x="3" y="4" width="2" height="9" fill="white"/>
            <rect x="3" y="12" width="5" height="2" fill="white"/>
            <rect x="10" y="2" width="6" height="2" fill="white"/>
            <rect x="10" y="7" width="4" height="2" fill="white"/>
            <rect x="10" y="12" width="2" height="2" fill="white"/>
        </svg>
    `
}

/**
 * @typedef {import("./PinElement").default} PinElement
 * @typedef {import("lit").TemplateResult<1>} TemplateResult
 * @typedef {typeof LinkElement} LinkElementConstructor
 */

/** @extends {IFromToPositionedElement<Object, LinkTemplate>} */
class LinkElement extends IFromToPositionedElement {

    static properties = {
        ...super.properties,
        source: {
            type: String,
            reflect: true,
        },
        destination: {
            type: String,
            reflect: true,
        },
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
    #sourcePin
    get sourcePin() {
        return this.#sourcePin
    }
    set sourcePin(pin) {
        this.#setPin(pin, false);
    }

    /** @type {PinElement} */
    #destinationPin
    get destinationPin() {
        return this.#destinationPin
    }
    set destinationPin(pin) {
        this.#setPin(pin, true);
    }

    #nodeDeleteHandler = () => this.remove()
    #nodeDragSourceHandler = e => this.addSourceLocation(e.detail.value)
    #nodeDragDestinatonHandler = e => this.addDestinationLocation(e.detail.value)
    #nodeReflowSourceHandler = e => this.setSourceLocation()
    #nodeReflowDestinatonHandler = e => this.setDestinationLocation()

    /** @type {TemplateResult | nothing} */
    linkMessageIcon = b
    /** @type {TemplateResult | nothing} */
    linkMessageText = b

    /** @type {SVGPathElement} */
    pathElement

    constructor() {
        super();
        this.source = null;
        this.destination = null;
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
    initialize(source, destination) {
        super.initialize({}, new LinkTemplate());
        if (source) {
            this.sourcePin = source;
            if (!destination) {
                this.toX = this.fromX;
                this.toY = this.fromY;
            }
        }
        if (destination) {
            this.destinationPin = destination;
            if (!source) {
                this.fromX = this.toX;
                this.fromY = this.toY;
            }
        }
        this.#linkPins();
    }

    /**
     * @param {PinElement} pin
     * @param {Boolean} isDestinationPin
     */
    #setPin(pin, isDestinationPin) {
        const getCurrentPin = () => isDestinationPin ? this.destinationPin : this.sourcePin;
        if (getCurrentPin() == pin) {
            return
        }
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement();
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler);
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
            ? this.#destinationPin = pin
            : this.#sourcePin = pin;
        if (getCurrentPin()) {
            const nodeElement = getCurrentPin().getNodeElement();
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler);
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
                : (this.setSourceLocation(), this.originatesFromInput = this.sourcePin.isInput());
            this.#linkPins();
        }
    }

    #linkPins() {
        if (this.sourcePin && this.destinationPin) {
            this.sourcePin.linkTo(this.destinationPin);
            this.destinationPin.linkTo(this.sourcePin);
        }
    }

    #unlinkPins() {
        if (this.sourcePin && this.destinationPin) {
            this.sourcePin.unlinkFrom(this.destinationPin);
            this.destinationPin.unlinkFrom(this.sourcePin);
        }
    }

    cleanup() {
        super.cleanup();
        this.#unlinkPins();
        this.sourcePin = null;
        this.destinationPin = null;
    }

    /** @param {Number[]?} location */
    setSourceLocation(location = null) {
        if (location == null) {
            const self = this;
            if (!this.hasUpdated || !this.sourcePin.hasUpdated) {
                Promise.all([this.updateComplete, this.sourcePin.updateComplete]).then(() => self.setSourceLocation());
                return
            }
            location = this.sourcePin.template.getLinkLocation();
        }
        const [x, y] = location;
        this.fromX = x;
        this.fromY = y;
    }

    /** @param {Number[]?} location */
    setDestinationLocation(location = null) {
        if (location == null) {
            const self = this;
            if (!this.hasUpdated || !this.destinationPin.hasUpdated) {
                Promise.all([this.updateComplete, this.destinationPin.updateComplete])
                    .then(() => self.setDestinationLocation());
                return
            }
            location = this.destinationPin.template.getLinkLocation();
        }
        this.toX = location[0];
        this.toY = location[1];
    }

    startDragging() {
        this.dragging = true;
    }

    finishDragging() {
        this.dragging = false;
    }

    removeMessage() {
        this.linkMessageIcon = "";
        this.linkMessageText = "";
    }

    setMessageConvertType() {
        this.linkMessageIcon = "ueb-icon-conver-type";
        this.linkMessageText = `Convert ${this.sourcePin.pinType} to ${this.destinationPin.pinType}.`;
    }

    setMessageCorrect() {
        this.linkMessageIcon = SVGIcon.correct;
        this.linkMessageText = b;
    }

    setMessageReplace() {
        this.linkMessageIcon = SVGIcon.correct;
        this.linkMessageText = b;
    }

    setMessageDirectionsIncompatible() {
        this.linkMessageIcon = SVGIcon.reject;
        this.linkMessageText = y`Directions are not compatbile.`;
    }

    setMessagePlaceNode() {
        this.linkMessageIcon = "ueb-icon-place-node";
        this.linkMessageText = y`Place a new node.`;
    }

    setMessageReplaceLink() {
        this.linkMessageIcon = SVGIcon.correct;
        this.linkMessageText = y`Replace existing input connections.`;
    }

    setMessageSameNode() {
        this.linkMessageIcon = SVGIcon.reject;
        this.linkMessageText = y`Both are on the same node.`;
    }

    setMEssagetypesIncompatible() {
        this.linkMessageIcon = SVGIcon.reject;
        this.linkMessageText = y`${this.sourcePin.pinType} is not compatible with ${this.destinationPin.pinType}.`;
    }
}

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {IDraggableElement} T
 * @extends {IMouseClickDrag<T>}
 */
class MouseMoveDraggable extends IMouseClickDrag {

    clicked(location) {
        if (this.options.repositionOnClick) {
            this.target.setLocation(this.stepSize > 1
                ? Utility.snapToGrid(location, this.stepSize)
                : location
            );
            this.clickedOffset = [0, 0];
        }
    }

    dragTo(location, offset) {
        const targetLocation = [
            this.target.locationX ?? this.lastLocation[0],
            this.target.locationY ?? this.lastLocation[1],
        ];
        const [adjustedLocation, adjustedTargetLocation] = this.stepSize > 1
            ? [Utility.snapToGrid(location, this.stepSize), Utility.snapToGrid(targetLocation, this.stepSize)]
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

    dragAction(location, offset) {
        this.target.setLocation([
            location[0] - this.clickedOffset[0],
            location[1] - this.clickedOffset[1],
        ]);
    }
}

/** @typedef {import("../../Blueprint").default} Blueprint */

class MouseClickDrag extends MouseMoveDraggable {

    #onClicked
    #onStartDrag
    #onDrag
    #onEndDrag

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
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

    clicked() {
        super.clicked();
        this.#onClicked?.();
    }

    startDrag() {
        super.startDrag();
        this.#onStartDrag?.();
    }

    dragAction(location, movement) {
        this.#onDrag?.(location, movement);
    }

    endDrag() {
        super.endDrag();
        this.#onEndDrag?.();
    }
}

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {IDraggableElement} T
 * @extends {ITemplate<T>}
 */
class IDraggableTemplate extends ITemplate {

    getDraggableElement() {
        return /** @type {Element} */(this.element)
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.blueprint, {
            draggableElement: this.getDraggableElement(),
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            this.createDraggableObject(),
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
        const delta = [dl - avgX, dt - avgY];
        this.blueprint.scrollDelta(delta, true);
    }
}

/**
 * @typedef {import("../element/IDraggableElement").default} IDraggableElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

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
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../template/node/CommentNodeTemplate").default} CommentNodeTemplate
 */

/** @extends {MouseMoveDraggable<NodeElement>} */
class MouseMoveNodes extends MouseMoveDraggable {

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
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 * @typedef {import("../input/mouse/MouseMoveDraggable").default} MouseMoveDraggable
 */

/**
 * @template {NodeElement} T
 * @extends {IDraggablePositionedTemplate<T>}
 */
class ISelectableDraggableTemplate extends IDraggablePositionedTemplate {

    getDraggableElement() {
        return /** @type {Element} */(this.element)
    }

    createDraggableObject() {
        return /** @type {MouseMoveDraggable} */(new MouseMoveNodes(this.element, this.blueprint, {
            draggableElement: this.getDraggableElement(),
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

/**
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../element/PinElement").default} PinElement
 * @typedef {import("../../element/PinElement").PinElementConstructor} PinElementConstructor
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/** @extends {ISelectableDraggableTemplate<NodeElement>} */
class NodeTemplate extends ISelectableDraggableTemplate {

    static #nodeIcon = {
        [Configuration.nodeType.doN]: SVGIcon.doN,
        [Configuration.nodeType.dynamicCast]: SVGIcon.cast,
        [Configuration.nodeType.executionSequence]: SVGIcon.sequence,
        [Configuration.nodeType.forEachElementInEnum]: SVGIcon.loop,
        [Configuration.nodeType.forEachLoop]: SVGIcon.forEachLoop,
        [Configuration.nodeType.forEachLoopWithBreak]: SVGIcon.forEachLoop,
        [Configuration.nodeType.forLoop]: SVGIcon.loop,
        [Configuration.nodeType.forLoopWithBreak]: SVGIcon.loop,
        [Configuration.nodeType.ifThenElse]: SVGIcon.branchNode,
        [Configuration.nodeType.makeArray]: SVGIcon.makeArray,
        [Configuration.nodeType.makeMap]: SVGIcon.makeMap,
        [Configuration.nodeType.select]: SVGIcon.select,
        [Configuration.nodeType.whileLoop]: SVGIcon.loop,
        default: SVGIcon.functionSymbol
    }

    #hasTargetInputNode = false

    toggleAdvancedDisplayHandler = () => {
        this.element.toggleShowAdvancedPinDisplay();
        this.element.addNextUpdatedCallbacks(() => this.element.acknowledgeReflow(), true);
    }

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        this.element.style.setProperty("--ueb-node-color", this.getColor().cssText);
    }

    getColor() {
        const functionColor = i$3`84, 122, 156`;
        const pureFunctionColor = i$3`95, 129, 90`;
        switch (this.element.entity.getClass()) {
            case Configuration.nodeType.callFunction:
                return this.element.entity.bIsPureFunc
                    ? pureFunctionColor
                    : functionColor
            case Configuration.nodeType.makeArray:
            case Configuration.nodeType.makeMap:
            case Configuration.nodeType.select:
                return pureFunctionColor
            case Configuration.nodeType.macro:
            case Configuration.nodeType.executionSequence:
                return i$3`150,150,150`
            case Configuration.nodeType.dynamicCast:
                return i$3`46, 104, 106`

        }
        return functionColor
    }

    render() {
        const icon = this.renderNodeIcon();
        const name = this.renderNodeName();
        return y`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">
                        <div class="ueb-node-name">
                            ${icon ? y`
                                <div class="ueb-node-name-symbol">${icon}</div>
                            ` : b}
                            ${name ? y`
                                <div class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                                    ${name}
                                    ${this.#hasTargetInputNode && this.element.entity.FunctionReference.MemberParent ? y`
                                        <div class="ueb-node-subtitle-text ueb-ellipsis-nowrap-text">
                                            Target is ${Utility.formatStringName(this.element.entity.FunctionReference.MemberParent.getName())}
                                        </div>
                                    `: b}
                                </div>
                            ` : b}
                        </div>
                    </div>
                    <div class="ueb-node-content">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
                    ${this.element.enabledState?.toString() == "DevelopmentOnly" ? y`
                        <div class="ueb-node-developmentonly">
                            <span class="ueb-node-developmentonly-text">Development Only</span>
                        </div>
                    ` : b}
                    ${this.element.advancedPinDisplay ? y`
                        <div class="ueb-node-expansion" @click="${this.toggleAdvancedDisplayHandler}">
                            ${SVGIcon.expandIcon}
                        </div>
                    ` : b}
                </div>
            </div>
        `
    }

    renderNodeIcon() {
        let icon = NodeTemplate.#nodeIcon[this.element.getType()];
        if (icon) {
            return icon
        }
        if (this.element.getNodeDisplayName().startsWith("Break")) {
            return SVGIcon.breakStruct
        }
        if (this.element.entity.getClass() === Configuration.nodeType.macro) {
            return SVGIcon.macro
        }
        return NodeTemplate.#nodeIcon.default
    }

    renderNodeName() {
        return this.element.getNodeDisplayName()
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.setupPins();
        this.element.updateComplete.then(() => this.element.acknowledgeReflow());
    }

    setupPins() {
        const inputContainer = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-inputs"));
        const outputContainer = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-outputs"));
        this.element.nodeNameElement = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-name-text"));
        this.element.getPinElements().forEach(p => {
            if (p.isInput()) {
                inputContainer.appendChild(p);
            } else if (p.isOutput()) {
                outputContainer.appendChild(p);
            }
        });
    }

    createPinElements() {
        return this.element.getPinEntities()
            .filter(v => !v.isHidden())
            .map(pinEntity => {
                if (!this.#hasTargetInputNode && pinEntity.getDisplayName() == "Target") {
                    this.#hasTargetInputNode = true;
                }
                let pinElement = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
                    .newObject(pinEntity, undefined, this.element);
                return pinElement
            })
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

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

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
                        this.element.addLocation([0, movement[1]], false);
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
                        this.element.addLocation([movement[0], 0], false);
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
                        this.element.addLocation([0, movement[1]], false);
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
                        this.element.addLocation([movement[0], 0], false);
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
                        this.element.addLocation([movement[0], 0], false);
                    }
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation([0, movement[1]], false);
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

/**
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../element/PinElement").default} PinElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

class CommentNodeTemplate extends IResizeableTemplate {

    #color = LinearColorEntity.getWhite()
    #selectableAreaHeight = 0

    /** @param {NodeElement} element */
    initialize(element) {
        if (element.entity.CommentColor) {
            this.#color.setFromRGBANumber(element.entity.CommentColor.toNumber());
            this.#color.setFromHSVA(
                this.#color.H.value,
                this.#color.S.value,
                Math.pow(this.#color.V.value, 0.45) * 0.67
            );
        }
        element.classList.add("ueb-node-style-comment", "ueb-node-resizeable");
        element.sizeX = 25 * Configuration.gridSize;
        element.sizeY = 6 * Configuration.gridSize;
        super.initialize(element); // Keep it at the end because it calls this.getColor() where this.#color must be initialized
    }

    getColor() {
        return i$3`${Math.round(this.#color.R.value * 255)}, ${Math.round(this.#color.G.value * 255)}, ${Math.round(this.#color.B.value * 255)}`
    }

    getDraggableElement() {
        return this.element.querySelector(".ueb-node-top")
    }

    render() {
        return y`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">
                        ${this.element.entity.NodeComment}
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
        if (value >= Configuration.gridSet * Configuration.gridSize) {
            this.element.setNodeWidth(value);
            return true
        }
        return false
    }

    /** @param {Number} value */
    setSizeY(value) {
        value = Math.round(value);
        if (value >= 3 * Configuration.gridSize) {
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
 * @typedef {import("../template/ISelectableDraggableTemplate").default} ISelectableDraggableTemplate
 * @typedef {import("../entity/IEntity").default} IEntity
 */

/**
 * @template {IEntity} T
 * @template {ISelectableDraggableTemplate} U
 * @extends {IDraggableElement<T, U>}
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

    dragHandler = e => this.addLocation(e.detail.value)

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

/**
 * @typedef {import("../../element/LinkElement").default} LinkElement
 * @typedef {import("../../element/LinkElement").LinkElementConstructor} LinkElementConstructor
 * @typedef {import("../../element/PinElement").default} PinElement
 * @typedef {import("../../template/node/KnotNodeTemplate").default} KnotNodeTemplate
 */

/** @extends IMouseClickDrag<PinElement> */
class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    /** @type {PinElement} */
    #knotPin = null

    #mouseenterHandler =
        /** @param {MouseEvent} e */
        e => {
            if (!this.enteredPin) {
                this.linkValid = false;
                this.enteredPin = /** @type {PinElement} */(e.target);
                const a = this.link.sourcePin ?? this.target; // Remember target might have change
                const b = this.enteredPin;
                if (
                    a.nodeElement.getType() == Configuration.nodeType.knot
                    || b.nodeElement.getType() == Configuration.nodeType.knot
                ) {
                    // A knot can be linked to any pin, it doesn't matter the type or input/output direction
                    this.link.setMessageCorrect();
                    this.linkValid = true;
                } else if (a.getNodeElement() == b.getNodeElement()) {
                    this.link.setMessageSameNode();
                } else if (a.isOutput() == b.isOutput()) {
                    this.link.setMessageDirectionsIncompatible();
                } else if (a.isOutput() == b.isOutput()) {
                    this.link.setMessageDirectionsIncompatible();
                } else if (this.blueprint.getLinks([a, b]).length) {
                    this.link.setMessageReplaceLink();
                    this.linkValid = true;
                } else {
                    this.link.setMessageCorrect();
                    this.linkValid = true;
                }
            }
        }

    #mouseleaveHandler =
        /** @param {MouseEvent} e */
        e => {
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

    startDrag(location) {
        if (this.target.nodeElement.getType() == Configuration.nodeType.knot) {
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
                const clickableElement = pin.template.getClickableElement();
                clickableElement.addEventListener("mouseenter", this.#mouseenterHandler);
                clickableElement.addEventListener("mouseleave", this.#mouseleaveHandler);
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
        if (this.enteredPin && this.linkValid) {
            if (this.#knotPin) {
                const otherPin = this.#knotPin !== this.link.sourcePin ? this.link.sourcePin : this.enteredPin;
                // Knot pin direction correction
                if (this.#knotPin.isInput() && otherPin.isInput() || this.#knotPin.isOutput() && otherPin.isOutput()) {
                    const oppositePin = this.#knotPin.isInput()
                        ? /** @type {KnotNodeTemplate} */(this.#knotPin.nodeElement.template).outputPin
                        : /** @type {KnotNodeTemplate} */(this.#knotPin.nodeElement.template).inputPin;
                    if (this.#knotPin === this.link.sourcePin) {
                        this.link.sourcePin = oppositePin;
                    } else {
                        this.enteredPin = oppositePin;
                    }
                }
            }
            this.blueprint.addGraphElement(this.link);
            this.link.destinationPin = this.enteredPin;
            this.link.removeMessage();
            this.link.finishDragging();
        } else {
            this.link.finishDragging();
            this.link.remove();
        }
        this.enteredPin = null;
        this.link = null;
        this.#listenedPins = null;
    }
}

/**
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../element/PinElement").PinElementConstructor} PinElementConstructor
 */

class VariableManagementNodeTemplate extends NodeTemplate {

    #hasInput = false
    #hasOutput = false
    #displayName = ""

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        this.element.classList.add("ueb-node-style-glass");
        this.#displayName = this.element.getNodeDisplayName();
    }

    render() {
        return y`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    ${this.#displayName ? y`
                        <div class="ueb-node-top">
                            <div class="ueb-node-name">
                                <span class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                                    ${this.#displayName}
                                </span>
                            </div>
                        </div>
                    ` : b}
                    <div class="ueb-node-content">
                        ${this.#hasInput ? y`
                            <div class="ueb-node-inputs"></div>
                        ` : b}
                        ${this.#hasOutput ? y`
                            <div class="ueb-node-outputs"></div>
                        ` : b}
                    </div>
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

/** @typedef {import("../../element/NodeElement").default} NodeElement */

class VariableConversionNodeTemplate extends VariableManagementNodeTemplate {


    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        this.element.classList.add("ueb-node-style-conversion");
    }
}

/** @typedef {import("../../element/NodeElement").default} NodeElement */

class VariableOperationNodeTemplate extends VariableManagementNodeTemplate {


    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        this.element.classList.add("ueb-node-style-operation");
    }
}

/**
 * @typedef {import("../../input/IInput").default} IInput
 * @typedef {import("lit").PropertyValues} PropertyValues
 */
/**
 * @template T
 * @typedef {import("../../element/PinElement").default<T>} PinElement
 */

/**
 * @template T
 * @extends ITemplate<PinElement<T>>
 */
class PinTemplate extends ITemplate {

    /** @type {HTMLElement} */
    #iconElement
    get iconElement() {
        return this.#iconElement
    }

    isNameRendered = true

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
            new MouseCreateLink(this.getClickableElement(), this.blueprint, {
                moveEverywhere: true,
            })
        ]
    }

    render() {
        const icon = y`<div class="ueb-pin-icon">${this.renderIcon()}</div>`;
        const content = y`
            <div class="ueb-pin-content">
                ${this.isNameRendered ? this.renderName() : b}
                ${this.element.isInput() && !this.element.entity.bDefaultValueIsIgnored ? this.renderInput() : y``}
            </div>
        `;
        return y`
            <div class="ueb-pin-wrapper">
                ${this.element.isInput() ? y`${icon}${content}` : y`${content}${icon}`}
            </div>
        `
    }

    renderIcon() {
        return SVGIcon.genericPin
    }

    renderName() {
        return y`
            <span class="ueb-pin-name">${this.element.getPinDisplayName()}</span>
        `
    }

    renderInput() {
        return y``
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (this.element.isInput() && changedProperties.has("isLinked")) {
            // When connected, an input may drop its input fields which means the node has to reflow
            const node = this.element.nodeElement;
            node.addNextUpdatedCallbacks(() => node.acknowledgeReflow());
            node.requestUpdate();
        }
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.element.style.setProperty("--ueb-pin-color-rgb", Configuration.getPinColor(this.element).cssText);
        this.#iconElement = this.element.querySelector(".ueb-pin-icon svg") ?? this.element;
    }

    getLinkLocation() {
        const rect = this.iconElement.getBoundingClientRect();
        const location = Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            this.blueprint.template.gridElement
        );
        return this.blueprint.compensateTranslation(location)
    }

    getClickableElement() {
        return this.element
    }
}

/** @typedef {import("../node/KnotNodeTemplate").default} KnotNodeTemplate */

class KnotPinTemplate extends PinTemplate {

    render() {
        return this.element.isOutput() ? y`<div class="ueb-pin-icon">${this.renderIcon()}</div>` : y``
    }

    getLinkLocation() {
        const rect = (
            this.element.isInput()
                ? /** @type {KnotNodeTemplate} */(this.element.nodeElement.template).outputPin.template
                : this
        )
            .iconElement.getBoundingClientRect();
        const location = Utility.convertLocation(
            [
                this.element.isInput() ? rect.left + 1 : rect.right + 2,
                (rect.top + rect.bottom) / 2,
            ],
            this.blueprint.template.gridElement
        );
        return this.blueprint.compensateTranslation(location)
    }
}

/**
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../element/PinElement").default} PinElement
 * @typedef {import("../../element/PinElement").PinElementConstructor} PinElementConstructor
 */

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
            startingPin.nodeElement.getType() !== Configuration.nodeType.knot
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
        return y`
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

/** @typedef {import("../../element/NodeElement").default} NodeElement */

class VariableAccessNodeTemplate extends VariableManagementNodeTemplate {

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element);
        if (element.getType() === Configuration.nodeType.variableGet) {
            this.element.classList.add("ueb-node-style-getter");
        } else if (element.getType() === Configuration.nodeType.variableSet) {
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
 * @typedef {import("./IElement").default} IElement
 * @typedef {import("./PinElement").default} PinElement
 * @typedef {typeof NodeElement} NodeElementConstructor
 */

/** @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>} */
class NodeElement extends ISelectableDraggableElement {

    static #typeTemplateMap = {
    }

    static properties = {
        ...ISelectableDraggableElement.properties,
        typePath: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
        nodeName: {
            type: String,
            attribute: "data-name",
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
    #commentDragHandler = e => {
        // If selected, it will already drag, also must check if under nested comments, it must drag just once
        if (!this.selected && !this.#commentDragged) {
            this.#commentDragged = true;
            this.addNextUpdatedCallbacks(() => this.#commentDragged = false);
            this.addLocation(e.detail.value);
        }
    }

    /**
     * @param {ObjectEntity} nodeEntity
     * @return {new () => NodeTemplate}
     */
    static getTypeTemplate(nodeEntity) {
        if (
            nodeEntity.getClass() === Configuration.nodeType.callFunction
            || nodeEntity.getClass() === Configuration.nodeType.commutativeAssociativeBinaryOperator
        ) {
            if (nodeEntity.FunctionReference.MemberParent.path === "/Script/Engine.KismetMathLibrary") {
                if (nodeEntity.FunctionReference.MemberName?.startsWith("Conv_")) {
                    return VariableConversionNodeTemplate
                }
                if (nodeEntity.FunctionReference.MemberName?.startsWith("Percent_")) {
                    return VariableOperationNodeTemplate
                }
                switch (nodeEntity.FunctionReference.MemberName) {
                    case "Abs":
                    case "BMax":
                    case "BMin":
                    case "Exp":
                    case "FMax":
                    case "FMin":
                    case "Max":
                    case "MaxInt64":
                    case "Min":
                    case "MinInt64":
                        return VariableOperationNodeTemplate
                }
            }
        }
        switch (nodeEntity.getClass()) {
            case Configuration.nodeType.comment: return CommentNodeTemplate
            case Configuration.nodeType.knot: return KnotNodeTemplate
            case Configuration.nodeType.variableGet: return VariableAccessNodeTemplate
            case Configuration.nodeType.variableSet: return VariableAccessNodeTemplate
        }
        return NodeTemplate
    }

    /** @param {String} str */
    static fromSerializedObject(str) {
        str = str.trim();
        let entity = SerializerFactory.getSerializer(ObjectEntity).deserialize(str);
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
        super.initialize(entity, template);
        this.#pins = this.template.createPinElements();
        this.typePath = this.entity.getType();
        this.nodeName = this.entity.getObjectName();
        this.advancedPinDisplay = this.entity.AdvancedPinDisplay?.toString();
        this.enabledState = this.entity.EnabledState;
        this.nodeDisplayName = this.getNodeDisplayName();
        this.pureFunction = this.entity.bIsPureFunc;
        this.dragLinkObjects = [];
        super.setLocation([this.entity.NodePosX.value, this.entity.NodePosY.value]);
        this.entity.subscribe("AdvancedPinDisplay", value => this.advancedPinDisplay = value);
        this.entity.subscribe("Name", value => this.nodeName = value);
        if (this.entity.NodeWidth && this.entity.NodeHeight) {
            this.sizeX = this.entity.NodeWidth.value;
            this.sizeY = this.entity.NodeHeight.value;
        } else {
            this.updateComplete.then(() => this.computeSizes());
        }
    }

    getUpdateComplete() {
        return Promise.all([
            super.getUpdateComplete(),
            ...this.getPinElements().map(pin => pin.updateComplete)
        ]).then(() => true)
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

    cleanup() {
        super.cleanup();
        this.acknowledgeDelete();
    }

    getType() {
        return this.entity.getType()
    }

    getNodeName() {
        return this.entity.getObjectName()
    }

    getNodeDisplayName() {
        switch (this.getType()) {
            case Configuration.nodeType.callFunction:
            case Configuration.nodeType.commutativeAssociativeBinaryOperator:
                if (this.entity.FunctionReference.MemberName == "AddKey") {
                    let result = this.entity.FunctionReference.MemberParent.path.match(
                        ObjectEntity.sequencerScriptingNameRegex
                    );
                    if (result) {
                        return `Add Key (${Utility.formatStringName(result[1])})`
                    }
                }
                let memberName = this.entity.FunctionReference.MemberName;
                if (this.entity.FunctionReference.MemberParent.path == "/Script/Engine.KismetMathLibrary") {
                    if (memberName.startsWith("Conv_")) {
                        return "" // Conversio  nodes do not have visible names
                    }
                    if (memberName.startsWith("Percent_")) {
                        return "%"
                    }
                    const leadingLetter = memberName.match(/[BF]([A-Z]\w+)/);
                    if (leadingLetter) {
                        // Some functions start with B or F (Like FCeil, FMax, BMin)
                        memberName = leadingLetter[1];
                    }
                    switch (memberName) {
                        case "Abs": return "ABS"
                        case "Exp": return "e"
                        case "Max": return "MAX"
                        case "MaxInt64": return "MAX"
                        case "Min": return "MIN"
                        case "MinInt64": return "MIN"
                    }
                }
                return Utility.formatStringName(memberName)
            case Configuration.nodeType.dynamicCast:
                return `Cast To ${this.entity.TargetType.getName()}`
            case Configuration.nodeType.executionSequence:
                return "Sequence"
            case Configuration.nodeType.ifThenElse:
                return "Branch"
            case Configuration.nodeType.forEachElementInEnum:
                return `For Each ${this.entity.Enum.getName()}`
            case Configuration.nodeType.forEachLoopWithBreak:
                return "For Each Loop with Break"
            case Configuration.nodeType.variableGet:
                return ""
            case Configuration.nodeType.variableSet:
                return "SET"
            default:
                if (this.entity.getClass() === Configuration.nodeType.macro) {
                    return Utility.formatStringName(this.entity.MacroGraphReference.getMacroName())
                } else {
                    return Utility.formatStringName(this.entity.getNameAndCounter()[0])
                }
        }
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
    }

    getPinElements() {
        return this.#pins
    }

    /** @returns {PinEntity[]} */
    getPinEntities() {
        return this.entity.CustomProperties.filter(v => v instanceof PinEntity)
    }

    setLocation(value = [0, 0], acknowledge = true) {
        this.entity.NodePosX.value = value[0];
        this.entity.NodePosY.value = value[1];
        super.setLocation(value, acknowledge);
    }

    acknowledgeDelete() {
        let deleteEvent = new CustomEvent(Configuration.nodeDeleteEventName);
        this.dispatchEvent(deleteEvent);
    }

    acknowledgeReflow() {
        this.addNextUpdatedCallbacks(() => this.computeSizes(), true);
        let reflowEvent = new CustomEvent(Configuration.nodeReflowEventName);
        this.dispatchEvent(reflowEvent);
    }

    setShowAdvancedPinDisplay(value) {
        this.entity.AdvancedPinDisplay = new IdentifierEntity(value ? "Shown" : "Hidden");
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay?.toString() != "Shown");
    }
}

/**
 * @typedef {import("./element/PinElement").default} PinElement
 * @typedef {import("./entity/GuidEntity").default} GuidEntity
 * @typedef {import("./entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {import("./template/node/CommentNodeTemplate").default} CommentNodeTemplate
 * @typedef {import("lit").PropertyValues} PropertyValues
 * @typedef {{
 *     primaryInf: Number,
 *     primarySup: Number,
 *     secondaryInf: Number,
 *     secondarySup: Number,
 * }} BoundariesInfo
 */

/** @extends {IElement<Object, BlueprintTemplate>} */
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

    #avoidScrolling = false
    /** @type {Map<String, Number>} */
    #nodeNameCounter = new Map()
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    /** @type {Number[]} */
    mousePosition = [0, 0]
    waitingExpandUpdate = false
    /** @param {NodeElement} node */
    nodeBoundariesSupplier = node => {
        return /** @type {BoundariesInfo} */ {
            primaryInf: node.leftBoundary(true),
            primarySup: node.rightBoundary(true),
            // Counter intuitive here: the y (secondary axis is positive towards the bottom, therefore upper bound "sup" is bottom)
            secondaryInf: node.topBoundary(true),
            secondarySup: node.bottomBoundary(true),
        }
    }
    /** @type {(node: NodeElement, selected: Boolean) => void}} */
    nodeSelectToggleFunction = (node, selected) => {
        node.setSelected(selected);
    }

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
        super.initialize({}, new BlueprintTemplate());
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

    /** @param {Number[]} param0 */
    setScroll([x, y]) {
        this.scrollX = x;
        this.scrollY = y;
    }

    /** @param {Number[]} delta */
    scrollDelta(delta, smooth = false) {
        if (smooth) {
            let previousScrollDelta = [0, 0];
            Utility.animate(0, delta[0], Configuration.smoothScrollTime, x => {
                this.scrollDelta([x - previousScrollDelta[0], 0], false);
                previousScrollDelta[0] = x;
            });
            Utility.animate(0, delta[1], Configuration.smoothScrollTime, y => {
                this.scrollDelta([0, y - previousScrollDelta[1]], false);
                previousScrollDelta[1] = y;
            });
        } else {
            const maxScroll = [2 * Configuration.expandGridSize, 2 * Configuration.expandGridSize];
            let currentScroll = this.getScroll();
            let finalScroll = [
                currentScroll[0] + delta[0],
                currentScroll[1] + delta[1]
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
                this.seamlessExpand(expand);
            }
            currentScroll = this.getScroll();
            finalScroll = [
                currentScroll[0] + delta[0],
                currentScroll[1] + delta[1]
            ];
            this.setScroll(finalScroll);
        }
    }

    scrollCenter() {
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
        this.scrollDelta(deltaOffset, true);
    }

    getViewportSize() {
        return [
            this.template.viewportElement.clientWidth,
            this.template.viewportElement.clientHeight
        ]
    }

    getScrollMax() {
        return [
            this.template.viewportElement.scrollWidth - this.template.viewportElement.clientWidth,
            this.template.viewportElement.scrollHeight - this.template.viewportElement.clientHeight
        ]
    }

    snapToGrid(location) {
        return Utility.snapToGrid(location, Configuration.gridSize)
    }

    /** @param {Number[]} param0 */
    seamlessExpand([x, y]) {
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
            requestAnimationFrame(_ => {
                center[0] += this.translateX;
                center[1] += this.translateY;
                let relativeScale = this.getScale() / initialScale;
                let newCenter = [
                    relativeScale * center[0],
                    relativeScale * center[1],
                ];
                this.scrollDelta([
                    (newCenter[0] - center[0]) * initialScale,
                    (newCenter[1] - center[1]) * initialScale,
                ]);
            });
        }
    }

    getScale() {
        return parseFloat(getComputedStyle(this.template.gridElement).getPropertyValue("--ueb-scale"))
    }

    /** @param {Number[]} param0 */
    compensateTranslation([x, y]) {
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
                n.getType() === Configuration.nodeType.comment && (!justSelected || n.selected)
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
     * Returns the list of links in this blueprint.
     * @returns {LinkElement[]} Nodes
     */
    getLinks([a, b] = []) {
        if (a == null != b == null) {
            const pin = a ?? b;
            return this.links.filter(link => link.sourcePin == pin || link.destinationPin == pin)
        }
        if (a != null && b != null) {
            return this.links.filter(link =>
                link.sourcePin == a && link.destinationPin == b
                || link.sourcePin == b && link.destinationPin == a
            )
        }
        return this.links
    }

    /**
     * @param {PinElement} sourcePin
     * @param {PinElement} destinationPin
     */
    getLink(sourcePin, destinationPin, ignoreDirection = false) {
        return this.links.find(link =>
            link.sourcePin == sourcePin && link.destinationPin == destinationPin
            || ignoreDirection && link.sourcePin == destinationPin && link.destinationPin == sourcePin
        )
    }

    selectAll() {
        this.getNodes().forEach(node => this.nodeSelectToggleFunction(node, true));
    }

    unselectAll() {
        this.getNodes().forEach(node => this.nodeSelectToggleFunction(node, false));
    }

    /** @param  {...IElement} graphElements */
    addGraphElement(...graphElements) {
        for (let element of graphElements) {
            element.blueprint = this;
            if (element instanceof NodeElement && !this.nodes.includes(element)) {
                const nodeName = element.entity.getObjectName();
                const homonymNode = this.nodes.find(node => node.entity.getObjectName() == nodeName);
                if (homonymNode) {
                    // Inserted node keeps tha name and the homonym nodes is renamed
                    let name = homonymNode.entity.getObjectName(true);
                    this.#nodeNameCounter[name] = this.#nodeNameCounter[name] ?? -1;
                    do {
                        ++this.#nodeNameCounter[name];
                    } while (this.nodes.find(node =>
                        node.entity.getObjectName() == Configuration.nodeName(name, this.#nodeNameCounter[name])
                    ))
                    homonymNode.rename(Configuration.nodeName(name, this.#nodeNameCounter[name]));
                }
                this.nodes.push(element);
                this.template.nodesContainerElement?.appendChild(element);
            } else if (element instanceof LinkElement && !this.links.includes(element)) {
                this.links.push(element);
                if (this.template.linksContainerElement && !this.template.linksContainerElement.contains(element)) {
                    this.template.linksContainerElement.appendChild(element);
                }
            }
        }
        graphElements.filter(element => element instanceof NodeElement).forEach(
            node => /** @type {NodeElement} */(node).sanitizeLinks(graphElements)
        );
        graphElements
            .filter(element => element instanceof NodeElement && element.getType() == Configuration.nodeType.comment)
            .forEach(element => element.updateComplete.then(() =>
                /** @type {CommentNodeTemplate} */(element.template).manageNodesBind()
            ));
    }

    /** @param  {...IElement} graphElements */
    removeGraphElement(...graphElements) {
        for (let element of graphElements) {
            if (element.closest("ueb-blueprint") == this) {
                element.remove();
                let elementsArray = element instanceof NodeElement
                    ? this.nodes
                    : element instanceof LinkElement
                        ? this.links
                        : null;
                elementsArray?.splice(
                    elementsArray.findIndex(v => v === element),
                    1
                );
            }
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
 * @typedef {import("../element/IDraggableElement").default} IDraggableElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

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

    /**  @param {[Number, Number]} param0 */
    adjustLocation([x, y]) {
        this.locationChangeCallback?.(x, y);
        return [x, y]
    }
}

/** @typedef {import("../element/ColorHandlerElement").default} ColorHandlerElement */

/** @extends {IDraggableControlTemplate<ColorHandlerElement>} */
class ColorHandlerTemplate extends IDraggableControlTemplate {

    /**  @param {[Number, Number]} param0 */
    adjustLocation([x, y]) {
        const radius = Math.round(this.movementSpaceSize[0] / 2);
        x = x - radius;
        y = -(y - radius);
        let [r, theta] = Utility.getPolarCoordinates([x, y]);
        r = Math.min(r, radius), [x, y] = Utility.getCartesianCoordinates([r, theta]);
        this.locationChangeCallback?.(x / radius, y / radius);
        x = Math.round(x + radius);
        y = Math.round(-y + radius);
        return [x, y]
    }
}

/**
 * @typedef {import("../element/WindowElement").default} WindowElement
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../template/IDraggableControlTemplate").default} IDraggableControlTemplate
 */

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

    /** @param {Number[]} param0 */
    setLocation([x, y]) {
        super.setLocation(this.template.adjustLocation([x, y]));
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

/** @typedef {import("../element/ColorHandlerElement").default} ColorHandlerElement */

/** @extends {IDraggableControlTemplate<ColorHandlerElement>} */
class ColorSliderTemplate extends IDraggableControlTemplate {

    /**  @param {[Number, Number]} param0 */
    adjustLocation([x, y]) {
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

/** @typedef {import ("../../element/InputElement").default} InputElement */

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
        document.getSelection()?.removeAllRanges(); // Deselect eventually selected text inside the input
    }
    #inputSingleLineHandler =
        /** @param {InputEvent} e */
        e =>  /** @type {HTMLElement} */(e.target).querySelectorAll("br").forEach(br => br.remove())
    #onKeydownBlurOnEnterHandler =
        /** @param {KeyboardEvent} e */
        e => {
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

/**
 * @typedef {import("../../element/IDraggableElement").default} IDraggableElement
 */

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

/** @typedef {import("lit").PropertyValues} PropertyValues */

/** @extends PinTemplate<Boolean> */
class BoolInputPinTemplate extends PinTemplate {

    /** @type {HTMLInputElement?} */
    #input

    #onChangeHandler = _ => this.element.setDefaultValue(this.#input.checked)

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
        return y`
            <input type="checkbox" class="ueb-pin-input" ?checked="${this.element.defaultValue}" />
        `
    }
}

/** @typedef {import("../../element/PinElement").default} PinElement */

class ExecPinTemplate extends PinTemplate {

    renderIcon() {
        return SVGIcon.execPin
    }

    renderName() {
        let pinName = this.element.entity.PinName;
        if (this.element.entity.PinFriendlyName) {
            pinName = this.element.entity.PinFriendlyName.toString();
        } else if (pinName === "execute" || pinName === "then") {
            return y``
        }
        return y`${Utility.formatStringName(pinName)}`
    }
}

/** @typedef {import("lit").PropertyValues} PropertyValues */

/**
 * @template T
 * @typedef {import("../../element/PinElement").default<T>} PinElement
 */

/**
 * @template T
 * @extends PinTemplate<T>
 */
class IInputPinTemplate extends PinTemplate {

    static singleLineInput = false
    static selectOnFocus = true

    /** @type {HTMLElement[]} */
    #inputContentElements
    get inputContentElements() {
        return this.#inputContentElements
    }

    /** @param {String} value */
    static stringFromInputToUE(value) {
        return value
            .replace(/(?=\n\s*)\n$/, "") // Remove trailing double newline
            .replaceAll("\n", "\\r\n") // Replace newline with \r\n (default newline in UE)
    }

    /** @param {String} value */
    static stringFromUEToInput(value) {
        return value
            .replaceAll(/(?:\r|(?<=(?:^|[^\\])(?:\\\\)*)\\r)(?=\n)/g, "") // Remove \r leftover from \r\n
            .replace(/(?<=\n\s*)$/, "\n") // Put back trailing double newline
    }

    #onFocusOutHandler = () => this.setInputs(this.getInputs(), true)

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.#inputContentElements = /** @type {HTMLElement[]} */([...this.element.querySelectorAll("ueb-input")]);
    }

    setup() {
        super.setup();
        this.#inputContentElements.forEach(element => {
            element.addEventListener("focusout", this.#onFocusOutHandler);
        });
    }

    cleanup() {
        super.cleanup();
        this.#inputContentElements.forEach(element => {
            element.removeEventListener("focusout", this.#onFocusOutHandler);
        });
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            ...this.#inputContentElements.map(elem => new MouseIgnore(elem, this.blueprint)),
        ]
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
        this.element.addNextUpdatedCallbacks(() => this.element.nodeElement.acknowledgeReflow());
    }

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(
            // @ts-expect-error
            values.join("")
        );
    }

    renderInput() {
        const singleLine = /** @type {typeof IInputPinTemplate} */(this.constructor).singleLineInput;
        const selectOnFocus = /** @type {typeof IInputPinTemplate} */(this.constructor).selectOnFocus;
        return y`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${singleLine}" .selectOnFocus="${selectOnFocus}"
                    .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.DefaultValue.toString())}">
                </ueb-input>
            </div>
        `
    }
}

/**
 * @template T
 * @extends IInputPinTemplate<T>
 */
class INumericPinTemplate extends IInputPinTemplate {

    static singleLineInput = true

    /** @param {String[]} values */
    setInputs(values = [], updateDefaultValue = false) {
        if (!values || values.length == 0) {
            values = [this.getInput()];
        }
        let parsedValues = [];
        for (const value of values) {
            let num = parseFloat(value);
            if (isNaN(num)) {
                num = 0;
                updateDefaultValue = false;
            }
            parsedValues.push(num);
        }
        super.setInputs(values, false);
        this.setDefaultValue(parsedValues, values);
    }

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        this.element.setDefaultValue(/** @type {T} */(values[0]));
    }
}

/** @typedef {import("../../entity/IntegerEntity").default} IntEntity */

/** @extends INumericInputPinTemplate<IntEntity> */
class IntInputPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        const integer = this.element.getDefaultValue(true);
        if (!(integer instanceof IntegerEntity)) {
            throw new TypeError("Expected DefaultValue to be a IntegerEntity")
        }
        integer.value = values[0];
        this.element.requestUpdate("DefaultValue", integer);
    }

    renderInput() {
        return y`
            <div class="ueb-pin-input">
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
 */const i=e(class extends i$1{constructor(t$1){var e;if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||(null===(e=t$1.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.vt){this.vt=new Set;for(const t in r)this.vt.add(t);return this.render(r)}this.vt.forEach((t=>{null==r[t]&&(this.vt.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];null!=e&&(this.vt.add(t),t.includes("-")?s.setProperty(t,e):s[t]=e);}return x}});

/** @typedef {import("../element/WindowElement").default} WindowElement */

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

    render() {
        return y`
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
        return y`Window`
    }

    renderContent() {
        return y``
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

/**
 * @typedef {import("../element/WindowElement").default} WindowElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

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
                this.color.setFromWheelLocation([x, y], this.color.V.value, this.color.A.value);
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
        return y`
            <div class="ueb-color-picker-${channelLetter.toLowerCase()}">
                <span class="ueb-color-control-label">${channelLetter.toUpperCase()}</span>
                <div>
                    <div class="ueb-horizontal-slider">
                        <span class="ueb-horizontal-slider-text"
                            .innerText="${Utility.minDecimals(Utility.roundDecimals(channelValue, 3))}">
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
        return y`
            <div class="ueb-color-picker" style="${i(style)}">
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
                    <div class="ueb-color-picker-ok ueb-button" @click="${() => this.apply()}">OK</div>
                    <div class="ueb-color-picker-cancel ueb-button" @click="${() => this.cancel()}">Cancel</div>
                </div>
            </div>
        `
    }

    renderWindowName() {
        return y`Color Picker`
    }
}

/**
 * @typedef {import("../../element/WindowElement").default} WindowElement
 * @typedef {import("../../element/WindowElement").WindowElementConstructor} WindowElementConstructor
 * @typedef {import("../../entity/LinearColorEntity").default} LinearColorEntity
 */

/** @extends PinTemplate<LinearColorEntity> */
class LinearColorInputPinTemplate extends PinTemplate {

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
        return y`
            <span class="ueb-pin-input" data-linear-color="${this.element.defaultValue.toString()}"
                @click="${this.#launchColorPickerWindow}"
                style="--ueb-linear-color: rgba(${this.element.defaultValue.toString()})">
            </span>
        `
    }
}

/** @typedef {import("../../element/PinElement").default} PinElement */

class NameInputPinTemplate extends IInputPinTemplate {

    static singleLineInput = true
}

/**
 * @template {Number} T
 * @extends INumericPinTemplate<T>
 */
class RealInputPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0]);
    }

    renderInput() {
        return y`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${true}"
                    .innerText="${IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.entity.DefaultValue ?? 0))}">
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

/** @typedef {import("../../entity/RotatorEntity").default} Rotator */

/** @extends INumericPinTemplate<Rotator> */
class RotatorInputPinTemplate extends INumericPinTemplate {

    #getR() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.R ?? 0))
    }

    #getP() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.P ?? 0))
    }

    #getY() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.Y ?? 0))
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
        return y`
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
class StringInputPinTemplate extends IInputPinTemplate {
}

/** @typedef {import("../../entity/LinearColorEntity").default} LinearColorEntity */

/**
 * @extends INumericPinTemplate<Vector2DEntity>
 */
class VectorInputPinTemplate extends INumericPinTemplate {

    #getX() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.X ?? 0))
    }

    #getY() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.Y ?? 0))
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
        return y`
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

/** @typedef {import("../../entity/LinearColorEntity").default} LinearColorEntity */

/**
 * @extends INumericPinTemplate<VectorEntity>
 */
class VectorPinTemplate extends INumericPinTemplate {

    #getX() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.X ?? 0))
    }

    #getY() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.Y ?? 0))
    }

    #getZ() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.Z ?? 0))
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
        return y`
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
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 * @typedef {import("./LinkElement").LinkElementConstructor} LinkElementConstructor
 * @typedef {import("./NodeElement").default} NodeElement
 * @typedef {import("lit").CSSResult} CSSResult
 * @typedef {typeof PinElement} PinElementConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {IElement<PinEntity<T>, PinTemplate>}
 */
class PinElement extends IElement {

    static #inputPinTemplates = {
        "/Script/CoreUObject.LinearColor": LinearColorInputPinTemplate,
        "/Script/CoreUObject.Rotator": RotatorInputPinTemplate,
        "/Script/CoreUObject.Vector2D": VectorInputPinTemplate,
        "/Script/CoreUObject.Vector": VectorPinTemplate,
        "bool": BoolInputPinTemplate,
        "int": IntInputPinTemplate,
        "MUTABLE_REFERENCE": ReferencePinTemplate,
        "name": NameInputPinTemplate,
        "real": RealInputPinTemplate,
        "string": StringInputPinTemplate,
    }

    static properties = {
        pinId: {
            type: GuidEntity,
            converter: {
                fromAttribute: (value, type) => value
                    ? ISerializer.grammar.Guid.parse(value).value
                    : null,
                toAttribute: (value, type) => value?.toString(),
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
                    ? ISerializer.grammar.LinearColorFromAnyColor.parse(value).value
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
    }

    /** @type {NodeElement} */
    nodeElement

    /**
     * @param {PinEntity<any>} pinEntity
     * @return {new () => PinTemplate}
     */
    static getTypeTemplate(pinEntity) {
        if (pinEntity.PinType.bIsReference && !pinEntity.PinType.bIsConst) {
            return PinElement.#inputPinTemplates["MUTABLE_REFERENCE"]
        }
        if (pinEntity.getType() === "exec") {
            return ExecPinTemplate
        }
        let result;
        if (pinEntity.isInput()) {
            result = PinElement.#inputPinTemplates[pinEntity.getType()];
        }
        return result ?? PinTemplate
    }

    static newObject(
        entity = new PinEntity(),
        template = new (PinElement.getTypeTemplate(entity))(),
        nodeElement = undefined
    ) {
        const result = new PinElement();
        result.initialize(entity, template, nodeElement);
        return result
    }

    initialize(
        entity = /** @type {PinEntity<T>} */(new PinEntity()),
        template = new (PinElement.getTypeTemplate(entity))(),
        nodeElement = undefined
    ) {
        super.initialize(entity, template);
        this.pinId = this.entity.PinId;
        this.pinType = this.entity.getType();
        this.advancedView = this.entity.bAdvancedView;
        this.defaultValue = this.entity.getDefaultValue();
        this.color = PinElement.properties.color.converter.fromAttribute(this.getColor().toString());
        this.isLinked = false;
        this.pinDirection = entity.isInput() ? "input" : entity.isOutput() ? "output" : "hidden";
        this.nodeElement = /** @type {NodeElement} */(nodeElement);

        // this.entity.subscribe("DefaultValue", value => this.defaultValue = value.toString())
        this.entity.subscribe("PinToolTip", value => {
            let matchResult = value.match(/\s*(.+?(?=\n)|.+\S)\s*/);
            if (matchResult) {
                return Utility.formatStringName(matchResult[1])
            }
            return Utility.formatStringName(this.entity.PinName)
        });
    }

    setup() {
        super.setup();
        this.nodeElement = this.closest("ueb-node");
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
        return this.entity.getDisplayName()
    }

    /** @return {CSSResult} */
    getColor() {
        return Configuration.getPinColor(this)
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
    }

    /** @param  {IElement[]} nodesWhitelist */
    sanitizeLinks(nodesWhitelist = []) {
        this.entity.LinkedTo = this.getLinks().filter(pinReference => {
            let pin = this.blueprint.getPin(pinReference);
            if (pin) {
                if (nodesWhitelist.length && !nodesWhitelist.includes(pin.nodeElement)) {
                    return false
                }
                let link = this.blueprint.getLink(this, pin, true);
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
        if (this.entity.linkTo(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked();
            this.nodeElement?.template.linksChanged();
        }
    }

    /** @param {PinElement} targetPinElement */
    unlinkFrom(targetPinElement) {
        if (this.entity.unlinkFrom(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity)) {
            this.isLinked = this.entity.isLinked();
            this.nodeElement?.template.linksChanged();
        }
    }

    /**
     * @param {PinElement} originalPinElement
     * @param {PinReferenceEntity} newReference
     */
    redirectLink(originalPinElement, newReference) {
        const index = this.entity.LinkedTo.findIndex(pinReference =>
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
 * @typedef {import("../Blueprint").BoundariesInfo} BoundariesInfo
 * @typedef {{
 *     primaryBoundary: Number,
 *     secondaryBoundary: Number,
 *     insertionPosition?: Number,
 *     rectangle: Number
 *     onSecondaryAxis: Boolean
 * }} Metadata
 * @typedef {any} Rectangle
 */
class FastSelectionModel {

    /**
     * @param {Number[]} initialPosition
     * @param {Rectangle[]} rectangles
     * @param {(rect: Rectangle) => BoundariesInfo} boundariesFunc
     * @param {(rect: Rectangle, selected: Boolean) => void} selectFunc
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
                rectangle: index, // used to move both expandings inside the this.metadata array
                onSecondaryAxis: false
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

/** @typedef {import("../element/SelectorElement").default} SelectorElement */

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

    /** @param {Number[]} initialPosition */
    beginSelect(initialPosition) {
        this.blueprint.selecting = true;
        this.setBothLocations(initialPosition);
        this.selectionModel = new FastSelectionModel(
            initialPosition,
            this.blueprint.getNodes(),
            this.blueprint.nodeBoundariesSupplier,
            this.blueprint.nodeSelectToggleFunction
        );
    }

    /** @param {Number[]} finalPosition */
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

/** @typedef {typeof WindowElement} WindowElementConstructor */

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

    setup() {
        super.setup();
        this.locationX = this.blueprint.mousePosition[0];
        this.locationY = this.blueprint.mousePosition[1];
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
    customElements.define("ueb-color-handler", ColorHandlerElement);
    ElementFactory.registerElement("ueb-color-handler", ColorHandlerElement);
    customElements.define("ueb-input", InputElement);
    ElementFactory.registerElement("ueb-input", InputElement);
    customElements.define("ueb-link", LinkElement);
    ElementFactory.registerElement("ueb-link", LinkElement);
    customElements.define("ueb-node", NodeElement);
    ElementFactory.registerElement("ueb-node", NodeElement);
    customElements.define("ueb-pin", PinElement);
    ElementFactory.registerElement("ueb-pin", PinElement);
    customElements.define("ueb-selector", SelectorElement);
    ElementFactory.registerElement("ueb-selector", SelectorElement);
    customElements.define("ueb-ui-slider", ColorSliderElement);
    ElementFactory.registerElement("ueb-ui-slider", ColorSliderElement);
    customElements.define("ueb-window", WindowElement);
    ElementFactory.registerElement("ueb-window", WindowElement);
}

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends ISerializer<T>
 */
class GeneralSerializer extends ISerializer {

    /**
     * @param {(value: String, entity: T) => String} wrap
     * @param {AnyValueConstructor<T>} entityType
     */
    constructor(wrap, entityType, attributePrefix, attributeSeparator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        wrap = wrap ?? (v => `(${v})`);
        super(entityType, attributePrefix, attributeSeparator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter);
        this.wrap = wrap;
    }

    /**
     * @param {String} value
     * @returns {T}
     */
    read(value) {
        // @ts-expect-error
        let grammar = Grammar.getGrammarForType(ISerializer.grammar, this.entityType);
        const parseResult = grammar.parse(value);
        if (!parseResult.status) {
            // @ts-expect-error
            throw new Error(`Error when trying to parse the entity ${this.entityType.prototype.constructor.name}.`)
        }
        return parseResult.value
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, object, insideString = false) {
        let result = this.wrap(this.subWrite(entity, [], object, insideString), object);
        return result
    }
}

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

/**
 * @template {AnyValue} T
 * @extends {GeneralSerializer<T>}
 */
class CustomSerializer extends GeneralSerializer {

    #objectWriter

    /**
     * @param {(v: T, insideString: Boolean) => String} objectWriter
     * @param {AnyValueConstructor<T>} entityType
     */
    constructor(objectWriter, entityType) {
        super(undefined, entityType);
        this.#objectWriter = objectWriter;
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     * @returns {String}
     */
    write(entity, object, insideString = false) {
        let result = this.#objectWriter(object, insideString);
        return result
    }
}

/** @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */
/**
 * @template {AnyValue} T
 * @extends {GeneralSerializer<T>}
 */
class ToStringSerializer extends GeneralSerializer {

    /** @param {AnyValueConstructor<T>} entityType */
    constructor(entityType) {
        super(undefined, entityType);
    }

    /**
     * @param {T} object
     * @param {Boolean} insideString
     */
    write(entity, object, insideString) {
        return !insideString && object.constructor === String
            ? `"${Utility.escapeString(object.toString())}"` // String will have quotes if not inside a string already
            : Utility.escapeString(object.toString())
    }
}

function initializeSerializerFactory() {

    const bracketsWrapped = v => `(${v})`;

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
            /** @param {Array} array */
            (array, insideString) =>
                `(${array
                    .map(v =>
                        // @ts-expect-error
                        SerializerFactory.getSerializer(Utility.getType(v)).serialize(v, insideString) + ","
                    )
                    .join("")
                })`,
            Array
        )
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
        FunctionReferenceEntity,
        new GeneralSerializer(bracketsWrapped, FunctionReferenceEntity)
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
        IntegerEntity,
        new ToStringSerializer(IntegerEntity)
    );

    SerializerFactory.registerSerializer(
        InvariantTextEntity,
        new GeneralSerializer(v => `${InvariantTextEntity.lookbehind}(${v})`, InvariantTextEntity, "", ", ", false, "", _ => "")
    );

    SerializerFactory.registerSerializer(
        KeyBindingEntity,
        new GeneralSerializer(bracketsWrapped, KeyBindingEntity)
    );

    SerializerFactory.registerSerializer(
        LinearColorEntity,
        new GeneralSerializer(bracketsWrapped, LinearColorEntity)
    );

    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new GeneralSerializer(v => `${LocalizedTextEntity.lookbehind}(${v})`, LocalizedTextEntity, "", ", ", false, "", _ => "")
    );

    SerializerFactory.registerSerializer(
        MacroGraphReferenceEntity,
        new GeneralSerializer(bracketsWrapped, MacroGraphReferenceEntity)
    );

    SerializerFactory.registerSerializer(
        Number,
        new CustomSerializer(
            /** @param {Number} value */
            value => value.toString(),
            Number
        )
    );

    SerializerFactory.registerSerializer(
        ObjectEntity,
        new ObjectSerializer()
    );

    SerializerFactory.registerSerializer(
        ObjectReferenceEntity,
        new CustomSerializer(
            objectReference => (objectReference.type ?? "") + (
                objectReference.path
                    ? objectReference.type ? `'"${objectReference.path}"'` : `"${objectReference.path}"`
                    : ""
            ),
            ObjectReferenceEntity
        )
    );

    SerializerFactory.registerSerializer(
        PathSymbolEntity,
        new ToStringSerializer(PathSymbolEntity)
    );

    SerializerFactory.registerSerializer(
        PinEntity,
        new GeneralSerializer(v => `${PinEntity.lookbehind} (${v})`, PinEntity, "", ",", true)
    );

    SerializerFactory.registerSerializer(
        PinReferenceEntity,
        new GeneralSerializer(v => v, PinReferenceEntity, "", " ", false, "", _ => "")
    );

    SerializerFactory.registerSerializer(
        RealUnitEntity,
        new ToStringSerializer(RealUnitEntity)
    );

    SerializerFactory.registerSerializer(
        RotatorEntity,
        new GeneralSerializer(bracketsWrapped, RotatorEntity)
    );

    SerializerFactory.registerSerializer(
        String,
        new CustomSerializer(
            (value, insideString) => insideString
                // @ts-expect-error
                ? Utility.escapeString(value)
                // @ts-expect-error
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
        new GeneralSerializer((string, entity) => `${entity.lookbehind ?? ""}(${string})`, UnknownKeysEntity)
    );

    SerializerFactory.registerSerializer(
        VariableReferenceEntity,
        new GeneralSerializer(bracketsWrapped, VariableReferenceEntity)
    );

    SerializerFactory.registerSerializer(
        Vector2DEntity,
        new GeneralSerializer(bracketsWrapped, Vector2DEntity)
    );

    SerializerFactory.registerSerializer(
        VectorEntity,
        new GeneralSerializer(bracketsWrapped, VectorEntity)
    );
}

initializeSerializerFactory();
defineElements();

export { Blueprint, Configuration, LinkElement, NodeElement, Utility };
