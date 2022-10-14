/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$2=Symbol(),n$3=new WeakMap;class s$3{constructor(t,n,s){if(this._$cssResult$=!0,s!==e$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=n;}get styleSheet(){let e=this.o;const s=this.t;if(t$1&&void 0===e){const t=void 0!==s&&1===s.length;t&&(e=n$3.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&n$3.set(s,e));}return e}toString(){return this.cssText}}const o$3=t=>new s$3("string"==typeof t?t:t+"",void 0,e$2),r$2=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,t,e$2)},i$1=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$1=window.trustedTypes,r$1=e$1?e$1.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$2={toAttribute(t,i){switch(i){case Boolean:t=t?r$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$2=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:o$2,reflect:!1,hasChanged:n$2};class a$1 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;null!==(i=this.h)&&void 0!==i||(this.h=[]),this.h.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e,r;const h=this.constructor._$Ep(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$2.toAttribute)(i,s.type);this._$El=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$El=null;}}_$AK(t,i){var s,e;const r=this.constructor,h=r._$Ev.get(t);if(void 0!==h&&this._$El!==h){const t=r.getPropertyOptions(h),n=t.converter,l=null!==(e=null!==(s=null==n?void 0:n.fromAttribute)&&void 0!==s?s:"function"==typeof n?n:null)&&void 0!==e?e:o$2.fromAttribute;this._$El=h,this[h]=l(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.3.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;const i=globalThis.trustedTypes,s$1=i?i.createPolicy("lit-html",{createHTML:t=>t}):void 0,e=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+e,n$1=`<${o$1}>`,l$1=document,h=(t="")=>l$1.createComment(t),r=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d=Array.isArray,u=t=>d(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,a=/>/g,f=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),_=/'/g,g=/"/g,m=/^(?:script|style|textarea|title)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p(1),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),x=new WeakMap,T=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A=l$1.createTreeWalker(l$1,129,null,!1),E=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v:void 0!==u[1]?d=a:void 0!==u[2]?(m.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?g:_):d===g||d===_?d=f:d===v||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$1:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e+y):s+e+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$1?s$1.createHTML(u):u,l]};class C{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,s);if(this.el=C.createElement(v,n),A.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(m.test(l.tagName)){const t=l.textContent.split(e),s=t.length-1;if(s>0){l.textContent=i?i.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$1)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e,t+1));)c.push({type:7,index:r}),t+=e.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P$1(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P$1(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$C_=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$C_}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P$1(this,t,i),r(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.T(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.T(t);}j(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.j(t));}T(t){this._$AH!==w&&r(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=x.get(t.strings);return void 0===i&&x.set(t.strings,i=new C(t)),i}S(t){d(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.j(h()),this.j(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$C_=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P$1(this,t,i,0),n=!r(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P$1(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.P(t);}P(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}P(t){this.element[this.name]=t===w?void 0:t;}}const R=i?i.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}P(t){t&&t!==w?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P$1(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P$1(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.2.7");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l,o;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=T(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.2");

class Configuration {
    static colorDragEventName = "ueb-color-drag"
    static colorPickEventName = "ueb-color-pick"
    static colorWindowEventName = "ueb-color-window"
    static deleteNodesKeyboardKey = "Delete"
    static dragGeneralEventName = "ueb-drag-general"
    static dragEventName = "ueb-drag"
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
    static fontSize = r$2`12.5px`
    static gridAxisLineColor = r$2`black`
    static gridExpandThreshold = 0.25 // remaining size factor threshold to cause an expansion event
    static gridLineColor = r$2`#353535`
    static gridLineWidth = 1 // pixel
    static gridSet = 8
    static gridSetLineColor = r$2`#161616`
    static gridShrinkThreshold = 4 // exceding size factor threshold to cause a shrink event
    static gridSize = 16 // pixel
    static hexColorRegex = /^\s*#(?<r>[0-9a-fA-F]{2})(?<g>[0-9a-fA-F]{2})(?<b>[0-9a-fA-F]{2})([0-9a-fA-F]{2})?|#(?<rs>[0-9a-fA-F])(?<gs>[0-9a-fA-F])(?<bs>[0-9a-fA-F])\s*$/
    static keysSeparator = "+"
    static linkCurveHeight = 15 // pixel
    static linkCurveWidth = 80 // pixel
    static linkMinWidth = 100 // pixel
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
    static nodeRadius = 8 // in pixel
    static nodeReflowEventName = "ueb-node-reflow"
    static pinColor = {
        "/Script/CoreUObject.LinearColor": r$2`3, 76, 168`,
        "/Script/CoreUObject.Rotator": r$2`152, 171, 241`,
        "/Script/CoreUObject.Transform": r$2`241, 110, 1`,
        "/Script/CoreUObject.Vector": r$2`215, 202, 11`,
        "bool": r$2`117, 0, 0`,
        "default": r$2`167, 167, 167`,
        "exec": r$2`167, 167, 167`,
        "name": r$2`203, 129, 252`,
        "real": r$2`50, 187, 0`,
        "string": r$2`213, 0, 176`,
    }
    static selectAllKeyboardKey = "(bCtrl=True,Key=A)"
    static trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end",
    }
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

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options) {
        this.#target = target;
        this.#blueprint = blueprint;
        options.consumeEvent ??= false;
        options.listenOnFocus ??= false;
        options.unlistenOnTextEdit ??= false;
        this.options = options;
        let self = this;
        this.listenHandler = _ => self.listenEvents();
        this.unlistenHandler = _ => self.unlistenEvents();
        if (this.options.listenOnFocus) {
            this.blueprint.addEventListener(Configuration.focusEventName.begin, this.listenHandler);
            this.blueprint.addEventListener(Configuration.focusEventName.end, this.unlistenHandler);
        }
        if (this.options.unlistenOnTextEdit) {
            this.blueprint.addEventListener(Configuration.editTextEventName.begin, this.unlistenHandler);
            this.blueprint.addEventListener(Configuration.editTextEventName.end, this.listenHandler);
        }
    }

    unlistenDOMElement() {
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
 * @typedef {import("./IEntity").default} IEntity
 * @typedef {IEntity | String | Number | Boolean | Array} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("./IEntity").IEntityConstructor<T>} IEntityConstructor
 */
/**
 * @template {AnyValue} T
 * @typedef {IEntityConstructor<T> | StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor} AnyValueConstructor
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

    /** @type {T | T[] | String} */
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

    static sanitize(value, targetType) {
        if (targetType === undefined) {
            targetType = value?.constructor;
        }
        if (
            targetType
            // value is not of type targetType
            && !(value?.constructor === targetType || value instanceof targetType)
        ) {
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
     * @param {T | T[] | String} value
     * @param {Boolean} serialized
     */
    constructor(type, showDefault = true, value = undefined, serialized = false) {
        if (value === undefined) {
            if (type instanceof Array) {
                value = [];
            } else if (serialized) {
                value = "";
            } else {
                value = TypeInitialization.sanitize(new type());
            }
        }
        this.#type = type;
        this.#showDefault = showDefault;
        this.#value = value;
        this.#serialized = serialized;
    }
}

/**
 * @typedef {import("./element/IElement").default} IElement
 * @typedef {import("./entity/IEntity").default} IEntity
 * @typedef {import("./entity/LinearColorEntity").default} LinearColorEntity
 * @typedef {import("./entity/TypeInitialization").AnyValue} AnyValue 
 */
/**
 * @template T
 * @typedef {import("./entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor 
 */

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

    static sigmoid(x, curvature = 1.7) {
        return 1 / (1 + (x / (1 - x) ** -curvature))
    }

    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    /** @param {HTMLElement} element */
    static getScale(element) {
        const scale = getComputedStyle(element).getPropertyValue("--ueb-scale");
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
     * @param {Number[]} viewportLocation
     * @param {HTMLElement} movementElement
     */
    static convertLocation(viewportLocation, movementElement) {
        const scaleCorrection = 1 / Utility.getScale(movementElement);
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
        // @ts-expect-error
        propertyDefinition = Utility.objectGet(entity.constructor.attributes, keys)
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
     * @returns {AnyValueConstructor<IEntity>} 
     */
    static getType(value) {
        if (value === null) {
            return null
        }
        if (value instanceof TypeInitialization) {
            return Utility.getType(value.type)
        }
        if (value instanceof Function) {
            // value is already a constructor
            return value
        }
        /** @ts-expect-error */
        return value?.constructor
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
    static formatStringName(value) {
        return value
            .trim()
            .replace(/^b/, "") // Remove leading b (for boolean values) or newlines
            .replaceAll(/(?<=[a-z])(?=[A-Z])|_|\s+/g, " ") // Insert a space between a lowercase and uppercase letter, instead of an underscore or multiple spaces
    }

    /** @param {String} value */
    static getIdFromReference(value) {
        return value
            .replace(/(?:.+\.)?([^\.]+)$/, "$1")
            .replaceAll(/(?<=[a-z\d])(?=[A-Z])|(?<=[a-zA-Z])(?=\d)|(?<=[A-Z]{2})(?=[A-Z][a-z])/g, "-")
            .toLocaleLowerCase()
    }

    /** @param {LinearColorEntity} value */
    static printLinearColor(value) {
        return `${Math.round(value.R.valueOf() * 255)}, ${Math.round(value.G.valueOf() * 255)}, ${Math.round(value.B.valueOf() * 255)}`
    }

    /**  @param {[Number, Number]} param0 */
    static getPolarCoordinates([x, y]) {
        return [
            Math.sqrt(x * x + y * y),
            Math.atan2(y, x),
        ]
    }

    /**  @param {[Number, Number]} param0 */
    static getCartesianCoordinates([r, theta]) {
        return [
            r * Math.cos(theta),
            r * Math.sin(theta)
        ]
    }
}

/**
 * @template {IEntity} T
 * @typedef {new (Object) => T} IEntityConstructor
 */

class IEntity extends Observable {

    static attributes = {}

    constructor(values) {
        super();
        /**
         * @param {Object} target
         * @param {Object} properties
         * @param {Object} values
         * @param {String} prefix
         */
        const defineAllAttributes = (target, properties, values, prefix = "") => {
            for (let property of Utility.mergeArrays(
                Object.getOwnPropertyNames(properties),
                Object.getOwnPropertyNames(values ?? {})
            )) {
                let value = Utility.objectGet(values, [property]);
                let defaultValue = properties[property];
                let defaultType = Utility.getType(defaultValue);
                if (defaultValue instanceof CalculatedType) {
                    defaultValue = defaultValue.calculate(this);
                    defaultType = Utility.getType(defaultValue);
                }

                if (!(property in properties)) {
                    console.warn(
                        `Property ${prefix}${property} in the serialized data is not defined in ${this.constructor.name}.properties`
                    );
                } else if (
                    !(property in values)
                    && defaultValue !== undefined
                    && !(defaultValue instanceof TypeInitialization && !defaultValue.showDefault)
                ) {
                    console.warn(
                        `${this.constructor.name}.properties will add property ${prefix}${property} not defined in the serialized data`
                    );
                }

                // Not instanceof because all objects are instenceof Object, exact match needed
                // @ts-expect-error
                if (defaultType === Object) {
                    target[property] = {};
                    defineAllAttributes(target[property], properties[property], values[property], property + ".");
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
                    target[property] = TypeInitialization.sanitize(value, Utility.getType(defaultValue));
                    continue // We have a value, need nothing more
                }

                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        target[property] = undefined; // Declare undefined to preserve the order of attributes
                        continue
                    }
                    if (defaultValue.serialized) {
                        defaultValue = "";
                    } else {
                        // @ts-expect-error
                        defaultType = defaultValue.type;
                        defaultValue = defaultValue.value;
                    }
                }
                if (defaultValue instanceof Array) {
                    defaultValue = [];
                }
                target[property] = TypeInitialization.sanitize(defaultValue, defaultType);
            }
        };
        // @ts-expect-error
        const attributes = this.constructor.attributes;
        if (values.constructor !== Object && Object.getOwnPropertyNames(attributes).length == 1) {
            // Where there is just one attribute, option can be the value of that attribute
            values = {
                [Object.getOwnPropertyNames(attributes)[0]]: values
            };
        }
        defineAllAttributes(this, attributes, values);
    }
}

class ObjectReferenceEntity extends IEntity {

    static attributes = {
        type: String,
        path: String,
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.type;
        /** @type {String} */ this.path;
    }
}

class FunctionReferenceEntity extends IEntity {

    static attributes = {
        MemberParent: ObjectReferenceEntity,
        MemberName: "",
    }

    constructor(options = {}) {
        super(options);
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

    constructor(options = {}) {
        super(options);
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

    constructor(options = {}) {
        super(options);
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
        value: Number,
    }

    /** @param {Object | Number | String} options */
    constructor(options = 0) {
        super(options);
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

    constructor(options = {}) {
        super(options);
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

    constructor(options = {}) {
        options.ActionName = options.ActionName ?? "";
        options.bShift = options.bShift ?? false;
        options.bCtrl = options.bCtrl ?? false;
        options.bAlt = options.bAlt ?? false;
        options.bCmd = options.bCmd ?? false;
        super(options);
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
        value: Number,
    }

    /** @param {Object | Number | String} options */
    constructor(options = 0) {
        super(options);
        /** @type {Number} */
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
        A: new RealUnitEntity(1),
    }

    static fromWheelLocation([x, y], radius) {
        x -= radius;
        y -= radius;
        const [r, theta] = Utility.getPolarCoordinates([x, y]);
        return LinearColorEntity.fromHSV([-theta, r])
    }

    /** @param {Number[]} param0 */
    static fromHSV([h, s, v, a = 1]) {
        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);
        const values = [v, q, p, p, t, v];
        const [r, g, b] = [values[i % 6], values[(i + 4) % 6], values[(i + 2) % 6]];
        return new LinearColorEntity({
            R: r,
            G: g,
            B: b,
            A: a,
        })
    }

    constructor(options = {}) {
        super(options);
        /** @type {RealUnitEntity} */ this.R;
        /** @type {RealUnitEntity} */ this.G;
        /** @type {RealUnitEntity} */ this.B;
        /** @type {RealUnitEntity} */ this.A;
    }

    toRGBA() {
        return [this.R.value * 255, this.G.value * 255, this.B.value * 255, this.A.value * 255]
    }

    toHSV() {
        const [r, g, b, a] = this.toRGBA();
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const d = max - min;
        let h;
        const s = (max == 0 ? 0 : d / max);
        const v = max / 255;
        switch (max) {
            case min:
                h = 0;
                break
            case r:
                h = (g - b) + d * (g < b ? 6 : 0);
                break
            case g:
                h = (b - r) + d * 2;
                break
            case b:
                h = (r - g) + d * 4;
                break
        }
        h /= 6 * d;
        return [h, s, v]
    }

    toNumber() {
        return (this.R.value * 0xff << 3 * 0x8) + (this.G.value * 0xff << 2 * 0x8) + (this.B.value * 0xff << 0x8) + this.A.value
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

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.namespace;
        /** @type {String} */ this.key;
        /** @type {String} */ this.value;
    }
}

class PathSymbolEntity extends IEntity {

    static attributes = {
        value: String,
    }

    constructor(options = {}) {
        super(options);
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

    constructor(options = {}) {
        super(options);
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

    constructor(values = {}) {
        super(values);
        /** @type {Number} */ this.R;
        /** @type {Number} */ this.P;
        /** @type {Number} */ this.Y;
    }
}

class SimpleSerializationRotatorEntity extends RotatorEntity {
}

class VectorEntity extends IEntity {

    static attributes = {
        X: Number,
        Y: Number,
        Z: Number,
    }

    constructor(options = {}) {
        super(options);
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
        "/Script/CoreUObject.Vector": VectorEntity,
        "bool": Boolean,
        "exec": String,
        "name": String,
        "real": Number,
        "string": String,
    }
    static #alternativeTypeEntityMap = {
        "/Script/CoreUObject.Vector": SimpleSerializationVectorEntity,
        "/Script/CoreUObject.Rotator": SimpleSerializationRotatorEntity,
    }
    static lookbehind = "Pin"
    static attributes = {
        PinId: GuidEntity,
        PinName: "",
        PinFriendlyName: new TypeInitialization(LocalizedTextEntity, false, null),
        PinToolTip: "",
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
                    PinEntity.getEntityType(pinEntity.getType(), true) ?? String,
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

    static getEntityType(typeString, alternative = false) {
        const [entity, alternativeEntity] = [this.#typeEntityMap[typeString], this.#alternativeTypeEntityMap[typeString]];
        return alternative && alternativeEntity !== undefined
            ? alternativeEntity
            : entity
    }

    constructor(options = {}) {
        super(options);
        /** @type {GuidEntity} */ this.PinId;
        /** @type {String} */ this.PinName;
        /** @type {LocalizedTextEntity} */ this.PinFriendlyName;
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
        if (this.PinType.PinCategory == "struct") {
            return this.PinType.PinSubCategoryObject.path
        }
        return this.PinType.PinCategory
    }

    getDefaultValue() {
        return this.DefaultValue
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

class VariableReferenceEntity extends IEntity {

    static attributes = {
        MemberName: String,
        MemberGuid: GuidEntity,
        bSelfContext: false,
    }
}

class ObjectEntity extends IEntity {

    static attributes = {
        Class: ObjectReferenceEntity,
        Name: "",
        bIsPureFunc: new TypeInitialization(Boolean, false, false),
        VariableReference: new TypeInitialization(VariableReferenceEntity, false, null),
        FunctionReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        EventReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        TargetType: new TypeInitialization(ObjectReferenceEntity, false, null),
        NodePosX: IntegerEntity,
        NodePosY: IntegerEntity,
        AdvancedPinDisplay: new TypeInitialization(IdentifierEntity, false, null),
        EnabledState: new TypeInitialization(IdentifierEntity, false, null),
        NodeGuid: GuidEntity,
        ErrorType: new TypeInitialization(IntegerEntity, false),
        ErrorMsg: new TypeInitialization(String, false, ""),
        CustomProperties: [PinEntity],
    }

    static nameRegex = /(\w+)_(\d+)/

    constructor(options = {}) {
        super(options);
        /** @type {ObjectReferenceEntity} */ this.Class;
        /** @type {String} */ this.Name;
        /** @type {Boolean?} */ this.bIsPureFunc;
        /** @type {VariableReferenceEntity?} */ this.VariableReference;
        /** @type {FunctionReferenceEntity?} */ this.FunctionReference;
        /** @type {FunctionReferenceEntity?} */ this.EventReference;
        /** @type {ObjectReferenceEntity?} */ this.TargetType;
        /** @type {IntegerEntity} */ this.NodePosX;
        /** @type {IntegerEntity} */ this.NodePosY;
        /** @type {IdentifierEntity?} */ this.AdvancedPinDisplay;
        /** @type {IdentifierEntity?} */ this.EnabledState;
        /** @type {GuidEntity} */ this.NodeGuid;
        /** @type {IntegerEntity?} */ this.ErrorType;
        /** @type {String?} */ this.ErrorMsg;
        /** @type {PinEntity[]} */ this.CustomProperties;
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
        if (result && result.length == 3) {
            return [result[1], parseInt(result[2])]
        }
        return ["", 0]
    }

    getDisplayName() {
        let name = this.FunctionReference?.MemberName;
        if (name) {
            name = Utility.formatStringName(name);
            return name
        }
        name = Utility.formatStringName(this.getNameAndCounter()[0]);
        return name
    }

    getCounter() {
        return this.getNameAndCounter()[1]
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
                        .reduce((accum, cur) =>
                            !cur || accum === r.AttributeAnyValue
                                ? r.AttributeAnyValue
                                : accum.or(cur)
                        )
                        .trim(P.optWhitespace)
                        .sepBy(P.string(","))
                        .skip(P.regex(/,?\s*/)),
                    P.string(")"),
                    (_, grammar, __) => grammar
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
            case Number:
                return r.Number
            case ObjectReferenceEntity:
                return r.Reference
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
            case SimpleSerializationVectorEntity:
                return r.SimpleSerializationVector
            case String:
                return r.String
            case VectorEntity:
                return r.Vector
            default:
                return defaultGrammar
        }
    }

    /** @param {Grammar} r */
    static createPropertyGrammar = (r, entityType, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
        r.AttributeName.skip(valueSeparator)
            .chain(attributeName => {
                // Once the property name is known, look into entityType.properties to get its type 
                const attributeKey = attributeName.split(".");
                const attribute = Utility.objectGet(entityType.attributes, attributeKey);
                let attributeValueGrammar = Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue);
                // Returns a setter function for the property
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                )
            })

    /** @param {Grammar} r */
    static createEntityGrammar = (r, entityType) =>
        P.seqMap(
            entityType.lookbehind
                ? P.seq(P.string(entityType.lookbehind), P.optWhitespace, P.string("("))
                : P.string("("),
            Grammar.createPropertyGrammar(r, entityType)
                .trim(P.optWhitespace) // Drop spaces around a property assignment
                .sepBy(P.string(",")) // Assignments are separated by comma
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma and maybe additional space
            P.string(')'),
            (_0, attributes, _2) => {
                let values = {};
                attributes.forEach(attributeSetter => attributeSetter(values));
                return new entityType(values)
            }
        )

    /*   ---   General   ---   */

    /** @param {Grammar} r */
    InlineWhitespace = r => P.regex(/[^\S\n]+/).desc("inline whitespace")

    /** @param {Grammar} r */
    InlineOptWhitespace = r => P.regex(/[^\S\n]*/).desc("inline optional whitespace")

    /** @param {Grammar} r */
    MultilineWhitespace = r => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")

    /** @param {Grammar} r */
    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(_ => null).desc("null: ()")

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
    Word = r => P.regex(/[a-zA-Z]+/).desc("a word")

    /** @param {Grammar} r */
    String = r => P.regex(/(?:[^"\\]|\\.)*/).wrap(P.string('"'), P.string('"')).map(Utility.unescapeString)
        .desc('string (with possibility to escape the quote using \")')

    /** @param {Grammar} r */
    ReferencePath = r => P.seq(
        P.string("/"),
        r.PathSymbol
            .map(v => v.toString())
            .sepBy1(P.string("."))
            .tieWith(".")
    )
        .tie()
        .atLeast(2)
        .tie()
        .desc('a path (words with possibly underscore, separated by ".", separated by "/")')

    /** @param {Grammar} r */
    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc('words separated by ""')

    /*   ---   Entity   ---   */

    /** @param {Grammar} r */
    None = r => P.string("None").map(_ => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")

    /** @param {Grammar} r */
    Integer = r => P.regex(/[\-\+]?[0-9]+/).map(v => new IntegerEntity(v)).desc("an integer")

    /** @param {Grammar} r */
    Guid = r => r.HexDigit.times(32).tie().map(v => new GuidEntity({ value: v })).desc("32 digit hexadecimal value")

    /** @param {Grammar} r */
    Identifier = r => P.regex(/\w+/).map(v => new IdentifierEntity(v))

    /** @param {Grammar} r */
    PathSymbol = r => P.regex(/[0-9\w]+/).map(v => new PathSymbolEntity({ value: v }))

    /** @param {Grammar} r */
    Reference = r => P.alt(
        r.None,
        ...[r.ReferencePath.map(path => new ObjectReferenceEntity({ type: "", path: path }))]
            .flatMap(referencePath => [
                referencePath, // Version having just path
                referencePath.trim(P.string('"')) // Version having path surround with double quotes
            ]),
        P.seqMap(
            r.Word, // Goes into referenceType
            P.optWhitespace, // Goes into _1 (ignored)
            P.alt(...[r.ReferencePath].flatMap(referencePath => [
                referencePath.wrap(P.string(`"`), P.string(`"`)),
                referencePath.wrap(P.string(`'"`), P.string(`"'`))
            ])), // Goes into referencePath
            (referenceType, _1, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        ),
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
        r.Null,
        r.None,
        r.Boolean,
        r.Number,
        r.Integer,
        r.String,
        r.Guid,
        r.LocalizedText,
        r.InvariantText,
        r.Reference,
        r.Vector,
        r.LinearColor,
    )

    /** @param {Grammar} r */
    PinReference = r => P.seqMap(
        r.PathSymbol, // Goes into objectNAme
        P.whitespace, // Goes into _ (ignored)
        r.Guid, // Goes into pinGuid
        (objectName, _, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid,
        })
    )

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
                Grammar.createPropertyGrammar(r, ObjectEntity)
            )
            .sepBy1(P.whitespace),
        P.seq(r.MultilineWhitespace, P.string("End"), P.whitespace, P.string("Object")),
        (_, attributes, __) => {
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
        (R, _, G, __, B) => new LinearColorEntity({
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
            (R, _, G, __, B, ___, A) => new LinearColorEntity({
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
}

/**
 * @typedef {import("../entity/TypeInitialization").AnyValue} AnyValue
 */
/**
 * @template {AnyValue} T
 * @typedef {import("../entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

/** @template {AnyValue} T */
class ISerializer {

    // @ts-expect-error
    static grammar = Parsimmon.createLanguage(new Grammar())

    /** @param {AnyValueConstructor<T>} entityType */
    constructor(
        entityType,
        prefix = "",
        separator = ",",
        trailingSeparator = false,
        attributeValueConjunctionSign = "=",
        attributeKeyPrinter = k => k.join(".")
    ) {
        this.entityType = entityType;
        this.prefix = prefix;
        this.separator = separator;
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
        const serializer = SerializerFactory.getSerializer(Utility.getType(value));
        if (!serializer) {
            throw new Error("Unknown value type, a serializer must be registered in the SerializerFactory class")
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
                result += (result.length ? this.separator : "")
                    + this.subWrite(entity, fullKey, value, insideString);
            } else if (value !== undefined && this.showProperty(entity, object, fullKey, value)) {
                const isSerialized = Utility.isSerialized(entity, fullKey);
                result += (result.length ? this.separator : "")
                    + this.prefix
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
            result += this.separator;
        }
        return result
    }

    showProperty(entity, object, attributeKey, attributeValue) {
        // @ts-expect-error
        const attributes = this.entityType.attributes;
        const attribute = Utility.objectGet(attributes, attributeKey);
        if (attribute instanceof TypeInitialization) {
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
                    this.separator
                    + this.prefix
                    + "CustomProperties "
                    + SerializerFactory.getSerializer(PinEntity).serialize(pin)
                )
                .join("")}
End Object\n`;
        return result
    }
}

class Copy extends IInput {

    /** @type {(e: ClipboardEvent) => void} */
    #copyHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        options.unlistenOnTextEdit = true; // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options);
        this.serializer = new ObjectSerializer();
        let self = this;
        this.#copyHandler = _ => self.copied();
    }

    listenEvents() {
        document.body.addEventListener("copy", this.#copyHandler);
    }

    unlistenEvents() {
        document.body.removeEventListener("copy", this.#copyHandler);
    }

    copied() {
        const value = this.blueprint.getNodes(true).map(node => this.serializer.serialize(node.entity, false)).join("\n\n");
        navigator.clipboard.writeText(value);
    }
}

/**
 * @typedef {import("../element/IElement").default} IElement
 * @typedef {import("../input/IInput").default} IInput
 */

/** @template {IElement} T */
class ITemplate {

    static styles = r$2``

    /** @type {T} */
    element

    /** @type {IInput[]} */
    #inputObjects = []
    get inputObjects() {
        return this.#inputObjects
    }

    /** @param {T} element */
    constructed(element) {
        this.element = element;
    }

    connectedCallback() {
    }

    /** @param {Map} changedProperties */
    willUpdate(changedProperties) {
    }

    /** @param {Map} changedProperties */
    update(changedProperties) {
    }

    render() {
        return $``
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
    }

    /** @param {Map} changedProperties */
    updated(changedProperties) {
    }

    inputSetup() {
        this.#inputObjects = this.createInputObjects();
    }

    cleanup() {
        this.#inputObjects.forEach(v => v.unlistenDOMElement());
    }

    /** @returns {IInput[]} */
    createInputObjects() {
        return []
    }
}

class IKeyboardShortcut extends IInput {

    /** @type {KeyBindingEntity[]} */
    #activationKeys

    constructor(target, blueprint, options = {}) {
        options.activateAnyKey ??= false;
        options.activationKeys ??= [];
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
                // @ts-expect-error
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

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends {IInput<T>}
 */
class IPointing extends IInput {

    constructor(target, blueprint, options) {
        options.ignoreTranslateCompensate ??= false;
        options.movementSpace ??= blueprint?.getGridDOMElement() ?? document.documentElement;
        super(target, blueprint, options);
        this.movementSpace = options.movementSpace;
    }

    /** @param {MouseEvent} mouseEvent */
    locationFromEvent(mouseEvent) {
        const location = Utility.convertLocation(
            [mouseEvent.clientX, mouseEvent.clientY],
            this.movementSpace
        );
        return this.options.ignoreTranslateCompensate
            ? location
            : this.blueprint.compensateTranslation(location)
    }
}

class IMouseWheel extends IPointing {

    /** @type {(e: WheelEvent) => void} */
    #mouseWheelHandler

    /** @type {(e: WheelEvent) => void} */
    #mouseParentWheelHandler

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options) {
        options.listenOnFocus = true;
        super(target, blueprint, options);
        this.looseTarget = options?.looseTarget ?? true;
        let self = this;

        this.#mouseWheelHandler = e => {
            e.preventDefault();
            const location = self.locationFromEvent(e);
            self.wheel(Math.sign(e.deltaY * Configuration.mouseWheelFactor), location);
        };
        this.#mouseParentWheelHandler = e => e.preventDefault();

        if (this.blueprint.focused) {
            this.movementSpace.addEventListener("wheel", this.#mouseWheelHandler, false);
        }
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
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {IDraggableElement} T
 * @extends {IPointing<T>}
 */
class IMouseClickDrag extends IPointing {

    /** @type {(e: MouseEvent) => void} */
    #mouseDownHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseStartedMovingHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseMoveHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseUpHandler

    #trackingMouse = false
    #movementListenedElement
    #draggableElement

    started = false
    stepSize = 1
    clickedPosition = [0, 0]
    clickedOffset = [0, 0]
    mouseLocation = [0, 0]

    /**
     * 
     * @param {T} target 
     * @param {Blueprint} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0;
        options.consumeEvent ??= true;
        options.draggableElement ??= target;
        options.exitAnyButton ??= true;
        options.looseTarget ??= false;
        options.moveEverywhere ??= false;
        options.movementSpace ??= blueprint?.getGridDOMElement();
        options.repositionClickOffset ??= false;
        super(target, blueprint, options);
        this.stepSize = parseInt(options?.stepSize ?? Configuration.gridSize);

        this.#movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace;
        this.#draggableElement = this.options.draggableElement;
        let self = this;

        this.#mouseDownHandler = e => {
            self.blueprint.setFocused(true);
            switch (e.button) {
                case self.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.options.looseTarget || e.target == e.currentTarget) {
                        if (self.options.consumeEvent) {
                            e.stopImmediatePropagation(); // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        self.#movementListenedElement.addEventListener("mousemove", self.#mouseStartedMovingHandler);
                        document.addEventListener("mouseup", self.#mouseUpHandler);
                        self.clickedPosition = self.locationFromEvent(e);
                        self.clickedOffset = [
                            self.clickedPosition[0] - self.target.locationX,
                            self.clickedPosition[1] - self.target.locationY,
                        ];
                        self.clicked(self.clickedPosition);
                    }
                    break
                default:
                    if (!self.options.exitAnyButton) {
                        self.#mouseUpHandler(e);
                    }
                    break
            }
        };

        this.#mouseStartedMovingHandler = e => {
            if (self.options.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            // Delegate from now on to self.#mouseMoveHandler
            self.#movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler);
            self.#movementListenedElement.addEventListener("mousemove", self.#mouseMoveHandler);
            // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
            const dragEvent = self.getEvent(Configuration.trackingMouseEventName.begin);
            self.#trackingMouse = self.target.dispatchEvent(dragEvent) == false;
            const location = self.locationFromEvent(e);
            // Do actual actions
            this.mouseLocation = Utility.snapToGrid(this.clickedPosition, this.stepSize);
            self.startDrag(location);
            self.started = true;
        };

        this.#mouseMoveHandler = e => {
            if (self.options.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            const location = self.locationFromEvent(e);
            const movement = [e.movementX, e.movementY];
            self.dragTo(location, movement);
            if (self.#trackingMouse) {
                self.blueprint.mousePosition = self.locationFromEvent(e);
            }
        };

        this.#mouseUpHandler = e => {
            if (!self.options.exitAnyButton || e.button == self.options.clickButton) {
                if (self.options.consumeEvent) {
                    e.stopImmediatePropagation(); // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                self.#movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler);
                self.#movementListenedElement.removeEventListener("mousemove", self.#mouseMoveHandler);
                document.removeEventListener("mouseup", self.#mouseUpHandler);
                if (self.started) {
                    self.endDrag();
                }
                self.unclicked();
                if (self.#trackingMouse) {
                    const dragEvent = self.getEvent(Configuration.trackingMouseEventName.end);
                    self.target.dispatchEvent(dragEvent);
                    self.#trackingMouse = false;
                }
                self.started = false;
            }
        };

        this.listenEvents();
    }

    listenEvents() {
        this.#draggableElement.addEventListener("mousedown", this.#mouseDownHandler);
        if (this.options.clickButton == 2) {
            this.#draggableElement.addEventListener("contextmenu", e => e.preventDefault());
        }
    }

    unlistenEvents() {
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
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../input/IInput").default} IInput
 * @typedef {import("../template/ITemplate").default} ITemplate
 */

/**
 * @template {IEntity} T
 * @template {ITemplate} U
 */
class IElement extends s {

    /** @type {import("lit").PropertyDeclarations} */
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

    /** @type {IInput[]} */
    inputObjects = []

    /**
     * @param {T} entity
     * @param {U} template
     */
    constructor(entity, template) {
        super();
        this.#entity = entity;
        this.#template = template;
        this.inputObjects = [];
        this.#template.constructed(this);
    }

    createRenderRoot() {
        return this
    }

    connectedCallback() {
        super.connectedCallback();
        this.blueprint = /** @type {Blueprint} */ this.closest("ueb-blueprint");
        this.template.connectedCallback();
    }

    /** @param {Map} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        this.template.willUpdate(changedProperties);
    }

    /** @param {Map} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        this.template.update(changedProperties);
    }

    render() {
        return this.template.render()
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.template.firstUpdated(changedProperties);
        this.template.inputSetup();
    }

    /** @param {Map<String, String>} */
    updated(changedProperties) {
        super.updated(changedProperties);
        this.template.updated(changedProperties);
        this.#nextUpdatedCallbacks.forEach(f => f(changedProperties));
        this.#nextUpdatedCallbacks = [];
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.template.cleanup();
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
        return /** @type {V} */ (this.template.inputObjects.find(object => object.constructor == type))
    }
}

/**
 * @typedef {import("../template/IDraggableTemplate").default} IDraggableTemplate
 * @typedef {import("../entity/IEntity").default} IEntity
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
    }
    static dragEventName = Configuration.dragEventName
    static dragGeneralEventName = Configuration.dragGeneralEventName

    constructor(...args) {
        // @ts-expect-error
        super(...args);
        this.locationX = 0;
        this.locationY = 0;
    }

    /** @param {Number[]} param0 */
    setLocation([x, y]) {
        const d = [x - this.locationX, y - this.locationY];
        this.locationX = x;
        this.locationY = y;
        if (this.blueprint) {
            // @ts-expect-error
            const dragLocalEvent = new CustomEvent(this.constructor.dragEventName, {
                detail: {
                    value: d,
                },
                bubbles: false,
                cancelable: true
            });
            this.dispatchEvent(dragLocalEvent);
        }
    }

    /** @param {Number[]} param0 */
    addLocation([x, y]) {
        this.setLocation([this.locationX + x, this.locationY + y]);
    }

    /** @param {Number[]} value */
    dispatchDragEvent(value) {
        // @ts-expect-error
        const dragEvent = new CustomEvent(this.constructor.dragGeneralEventName, {
            detail: {
                value: value
            },
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(dragEvent);
    }

    snapToGrid() {
        const snappedLocation = Utility.snapToGrid([this.locationX, this.locationY], Configuration.gridSize);
        if (this.locationX != snappedLocation[0] || this.locationY != snappedLocation[1]) {
            this.setLocation(snappedLocation);
        }
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

    constructor(...args) {
        super(...args);
        this.selected = false;
        this.listeningDrag = false;
        let self = this;
        this.dragHandler = e => self.addLocation(e.detail.value);
    }

    connectedCallback() {
        super.connectedCallback();
        this.setSelected(this.selected);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
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
        initialPositionX: {
            type: Number,
            attribute: false,
        },
        initialPositionY: {
            type: Number,
            attribute: false,
        },
        finaPositionX: {
            type: Number,
            attribute: false,
        },
        finaPositionY: {
            type: Number,
            attribute: false,
        },
    }

    constructor(...args) {
        // @ts-expect-error
        super(...args);
        this.initialPositionX = 0;
        this.initialPositionY = 0;
        this.finaPositionX = 0;
        this.finaPositionY = 0;
    }

    /** @param {Number[]} param0 */
    setBothLocations([x, y]) {
        this.initialPositionX = x;
        this.initialPositionY = y;
        this.finaPositionX = x;
        this.finaPositionY = y;
    }

    /** @param {Number[]} offset */
    addSourceLocation([offsetX, offsetY]) {
        this.initialPositionX += offsetX;
        this.initialPositionY += offsetY;
    }

    /** @param {Number[]} offset */
    addDestinationLocation([offsetX, offsetY]) {
        this.finaPositionX += offsetX;
        this.finaPositionY += offsetY;
    }
}

/** @typedef {import("../element/IFromToPositionedElement").default} IFromToPositionedElement */

/**
 * @template {IFromToPositionedElement} T
 * @extends {ITemplate<T>}
 */
class IFromToPositionedTemplate extends ITemplate {

    /** @param {Map} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("initialPositionX")) {
            this.element.style.setProperty("--ueb-from-x", `${this.element.initialPositionX}`);
        }
        if (changedProperties.has("initialPositionY")) {
            this.element.style.setProperty("--ueb-from-y", `${this.element.initialPositionY}`);
        }
        if (changedProperties.has("finaPositionX")) {
            this.element.style.setProperty("--ueb-to-x", `${this.element.finaPositionX}`);
        }
        if (changedProperties.has("finaPositionY")) {
            this.element.style.setProperty("--ueb-to-y", `${this.element.finaPositionY}`);
        }
    }

}

/** @typedef {import("../element/LinkElement").default} LinkElement */


/** @extends {IFromToPositionedTemplate<LinkElement>} */
class LinkTemplate extends IFromToPositionedTemplate {

    /**
     * Returns a function performing the inverse multiplication y = a / x + q. The value of a and q are calculated using
     * the derivative of that function y' = -a / x^2 at the point p (x = p[0] and y = p[1]). This means
     * y'(p[0]) = m => -a / p[0]^2 = m => a = -m * p[0]^2. Now, in order to determine q we can use the starting
     * function: p[1] = a / p[0] + q => q = p[1] - a / p[0]
     * @param {Number} m slope
     * @param {Number[]} p reference point
     * @returns Maximum value
     */
    static decreasingValue(m, p) {
        const a = -m * p[0] ** 2;
        const q = p[1] - a / p[0];
        return x => a / x + q
    }

    /**
     * Returns a function performing a clamped line passing through two points. It is clamped after and before the
     * points. It is easier explained with an example.
     *            b ______
     *             /
     *            /
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

    /**
     * @param {Map} changedProperties
     */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        const dx = Math.max(Math.abs(this.element.initialPositionX - this.element.finaPositionX), 1);
        const width = Math.max(dx, Configuration.linkMinWidth);
        // const height = Math.max(Math.abs(link.initialPositionY - link.finaPositionY), 1)
        const fillRatio = dx / width;
        // const aspectRatio = width / height
        const xInverted = this.element.originatesFromInput
            ? this.element.initialPositionX < this.element.finaPositionX
            : this.element.finaPositionX < this.element.initialPositionX;
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

    /**
     * @param {Map} changedProperties
     */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("originatesFromInput")) {
            this.element.style.setProperty("--ueb-from-input", this.element.originatesFromInput ? "1" : "0");
        }
        const referencePin = this.element.sourcePin ?? this.element.destinationPin;
        if (referencePin) {
            this.element.style.setProperty("--ueb-link-color-rgb", Utility.printLinearColor(referencePin.color));
        }
        this.element.style.setProperty("--ueb-link-start", `${Math.round(this.element.startPixels)}`);
        this.element.style.setProperty("--ueb-start-percentage", `${Math.round(this.element.startPercentage)}%`);
    }

    render() {
        const uniqueId = "ueb-id-" + Math.floor(Math.random() * 1E12);
        return $`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <g>
                    <path id="${uniqueId}" fill="none" vector-effect="non-scaling-stroke" d="${this.element.svgPathD}" />
                    <use href="#${uniqueId}" pointer-events="stroke" stroke-width="10" />
                </g>
            </svg>
            ${this.element.linkMessageIcon != "" || this.element.linkMessageText != "" ? $`
            <div class="ueb-link-message">
                <span class="${this.element.linkMessageIcon}"></span>
                <span class="ueb-link-message-text">${this.element.linkMessageText}</span>
            </div>
            ` : $``}
        `
    }
}

/** @typedef {import("./PinElement").default} PinElement */

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

    #nodeDeleteHandler
    #nodeDragSourceHandler
    #nodeDragDestinatonHandler
    #nodeReflowSourceHandler
    #nodeReflowDestinatonHandler
    /** @type {SVGPathElement} */
    pathElement

    /**
     * @param {PinElement} source
     * @param {PinElement?} destination
     */
    constructor(source, destination) {
        super({}, new LinkTemplate());
        const self = this;
        this.#nodeDeleteHandler = () => self.remove();
        this.#nodeDragSourceHandler = e => self.addSourceLocation(e.detail.value);
        this.#nodeDragDestinatonHandler = e => self.addDestinationLocation(e.detail.value);
        this.#nodeReflowSourceHandler = e => self.setSourceLocation();
        this.#nodeReflowDestinatonHandler = e => self.setDestinationLocation();
        this.source = null;
        this.destination = null;
        this.dragging = false;
        this.originatesFromInput = false;
        this.startPercentage = 0;
        this.svgPathD = "";
        this.startPixels = 0;
        this.linkMessageIcon = "";
        this.linkMessageText = "";
        if (source) {
            this.sourcePin = source;
            if (!destination) {
                this.finaPositionX = this.initialPositionX;
                this.finaPositionY = this.initialPositionY;
            }
        }
        if (destination) {
            this.destinationPin = destination;
            if (!source) {
                this.initialPositionX = this.finaPositionX;
                this.initialPositionY = this.finaPositionY;
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

    disconnectedCallback() {
        super.disconnectedCallback();
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
        this.initialPositionX = x;
        this.initialPositionY = y;
    }

    /** @param {Number[]?} location */
    setDestinationLocation(location = null) {
        if (location == null) {
            const self = this;
            if (!this.hasUpdated || !this.destinationPin.hasUpdated) {
                Promise.all([this.updateComplete, this.destinationPin.updateComplete]).then(() => self.setDestinationLocation());
                return
            }
            location = this.destinationPin.template.getLinkLocation();
        }
        this.finaPositionX = location[0];
        this.finaPositionY = location[1];
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
        this.linkMessageIcon = "ueb-icon-correct";
        this.linkMessageText = "";
    }

    setMessageDirectionsIncompatible() {
        this.linkMessageIcon = "ueb-icon-directions-incompatible";
        this.linkMessageText = "Directions are not compatbile.";
    }

    setMessagePlaceNode() {
        this.linkMessageIcon = "ueb-icon-place-node";
        this.linkMessageText = "Place a new node.";
    }

    setMessageReplaceLink() {
        this.linkMessageIcon = "ueb-icon-replace-link";
        this.linkMessageText = "Replace existing input connections.";
    }

    setMessageSameNode() {
        this.linkMessageIcon = "ueb-icon-same-node";
        this.linkMessageText = "Both are on the same node.";
    }

    setMEssagetypesIncompatible() {
        this.linkMessageIcon = "ueb-icon-types-incompatible";
        this.linkMessageText = `${this.sourcePin.pinType} is not compatible with ${this.destinationPin.pinType}.`;
    }
}

customElements.define("ueb-link", LinkElement);

/** @typedef {import("../../element/PinElement").default} PinElement */

/** @extends IMouseClickDrag<PinElement> */
class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    /** @type {(e: MouseEvent) => void} */
    #mouseenterHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseleaveHandler

    /** @type {LinkElement?} */
    link

    /** @type {PinElement?} */
    enteredPin

    linkValid = false

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        let self = this;
        this.#mouseenterHandler = e => {
            if (!self.enteredPin) {
                self.linkValid = false;
                self.enteredPin = /** @type {PinElement} */ (e.target);
                const a = self.enteredPin;
                const b = self.target;
                if (a.getNodeElement() == b.getNodeElement()) {
                    self.link.setMessageSameNode();
                } else if (a.isOutput() == b.isOutput()) {
                    self.link.setMessageDirectionsIncompatible();
                } else if (a.isOutput() == b.isOutput()) {
                    self.link.setMessageDirectionsIncompatible();
                } else if (self.blueprint.getLinks([a, b]).length) {
                    self.link.setMessageReplaceLink();
                    self.linkValid = true;
                } else {
                    self.link.setMessageCorrect();
                    self.linkValid = true;
                }
            }
        };
        this.#mouseleaveHandler = e => {
            if (self.enteredPin == e.target) {
                self.enteredPin = null;
                self.linkValid = false;
                self.link?.setMessagePlaceNode();
            }
        };
    }

    startDrag(location) {
        this.link = new LinkElement(this.target, null);
        this.blueprint.linksContainerElement.prepend(this.link);
        this.link.setMessagePlaceNode();
        this.#listenedPins = this.blueprint.querySelectorAll("ueb-pin");
        this.#listenedPins.forEach(pin => {
            if (pin != this.target) {
                pin.getClickableElement().addEventListener("mouseenter", this.#mouseenterHandler);
                pin.getClickableElement().addEventListener("mouseleave", this.#mouseleaveHandler);
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
 * @typedef {import("../input/IInput").default} IInput
 */
/**
 * @template T
 * @typedef {import("../element/PinElement").default<T>} PinElement
 */

/**
 * @template T
 * @extends ITemplate<PinElement<T>>
 */
class PinTemplate extends ITemplate {

    connectedCallback() {
        super.connectedCallback();
        this.element.nodeElement = this.element.closest("ueb-node");
    }

    /** @returns {IInput[]} */
    createInputObjects() {
        return [
            new MouseCreateLink(this.element.clickableElement, this.element.blueprint, {
                moveEverywhere: true,
                looseTarget: true,
            })
        ]
    }

    render() {
        const icon = $`
            <div class="ueb-pin-icon">
                ${this.renderIcon()}
            </div>
        `;
        const content = $`
            <div class="ueb-pin-content">
                <span class="ueb-pin-name ">${this.element.getPinDisplayName()}</span>
                ${this.renderInput()}
            </div>
        `;
        return $`
            <div class="ueb-pin-wrapper">
                ${this.element.isInput() ? $`${icon}${content}` : $`${content}${icon}`}
            </div>
        `
    }

    renderIcon() {
        return $`
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle class="ueb-pin-tofill" cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="5" />
                <path d="M 34 6 L 34 26 L 42 16 Z" fill="currentColor" />
            </svg>
        `
    }

    renderInput() {
        return $``
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.element.dataset.id = this.element.GetPinIdValue();
        this.element.clickableElement = this.element;
    }

    getLinkLocation() {
        const rect = this.element.querySelector(".ueb-pin-icon").getBoundingClientRect();
        const location = Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            this.element.blueprint.gridElement
        );
        return this.element.blueprint.compensateTranslation(location)
    }
}

/**
 * @extends PinTemplate<Boolean>
 */
class BoolPinTemplate extends PinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.#input = this.element.querySelector(".ueb-pin-input");
        let self = this;
        this.onChangeHandler = _ => this.element.setDefaultValue(self.#input.checked ? true : false);
        this.#input.addEventListener("change", this.onChangeHandler);
    }

    cleanup() {
        super.cleanup();
        this.#input.removeEventListener("change", this.onChangeHandler);
    }

    getInputs() {
        return [this.#input.checked ? "true" : "false"]
    }

    /**
     * @param {Boolean[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        this.element.setDefaultValue(values[0]);
    }

    renderInput() {
        if (this.element.isInput()) {
            return $`
                <input type="checkbox" class="ueb-pin-input" checked="${this.element.defaultValue ? "" : w}" />
            `
        }
        return super.renderInput()
    }
}

/** @typedef {import("../element/PinElement").default} PinElement */

class ExecPinTemplate extends PinTemplate {

    renderIcon() {
        return $`
            <svg viewBox="-2 0 16 16">
                <path class="ueb-pin-tofill" stroke-width="1.25" stroke="white" fill="none"
                    d="M 2 1 a 2 2 0 0 0 -2 2 v 10 a 2 2 0 0 0 2 2 h 4 a 2 2 0 0 0 1.519 -0.698 l 4.843 -5.651 a 1 1 0 0 0 0 -1.302 L 7.52 1.7 a 2 2 0 0 0 -1.519 -0.698 z" />
            </svg>
        `
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
        if (this.options.repositionClickOffset) {
            this.target.setLocation(this.stepSize > 1
                ? Utility.snapToGrid(location, this.stepSize)
                : location
            );
            this.clickedOffset = [0, 0];
        }
    }

    dragTo(location, offset) {
        const targetLocation = [this.target.locationX, this.target.locationY];
        const [adjustedLocation, adjustedTargetLocation] = this.stepSize > 1
            ? [Utility.snapToGrid(location, this.stepSize), Utility.snapToGrid(targetLocation, this.stepSize)]
            : [location, targetLocation];
        offset = [
            adjustedLocation[0] - this.mouseLocation[0],
            adjustedLocation[1] - this.mouseLocation[1]
        ];
        if (offset[0] == 0 && offset[1] == 0) {
            return
        }
        // Make sure it snaps on the grid
        offset[0] += adjustedTargetLocation[0] - this.target.locationX;
        offset[1] += adjustedTargetLocation[1] - this.target.locationY;
        this.dragAction(adjustedLocation, offset);
        // Reassign the position of mouse
        this.mouseLocation = adjustedLocation;
    }

    dragAction(location, offset) {
        this.target.setLocation([
            location[0] - this.clickedOffset[0],
            location[1] - this.clickedOffset[1]
        ]);
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
        return this.element
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
            looseTarget: true,
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            this.createDraggableObject(),
        ]
    }

    /** @param {Map} changedProperties */
    update(changedProperties) {
        super.update(changedProperties);
        if (changedProperties.has("locationX")) {
            this.element.style.setProperty("--ueb-position-x", `${this.element.locationX}`);
        }
        if (changedProperties.has("locationY")) {
            this.element.style.setProperty("--ueb-position-y", `${this.element.locationY}`);
        }
    }
}

/** @typedef {import("../element/ColorHandlerElement").default} ColorHandlerElement */

/** @extends {IDraggableTemplate<ColorHandlerElement>} */
class ColorHandlerTemplate extends IDraggableTemplate {

    #locationChangeCallback

    connectedCallback() {
        super.connectedCallback();
        this.window = this.element.closest("ueb-window");
        this.movementSpace = this.element.parentElement;
        const bounding = this.movementSpace.getBoundingClientRect();
        this.movementSpaceSize = [bounding.width, bounding.height];
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.element.parentElement,
            ignoreTranslateCompensate: true,
            looseTarget: true,
            moveEverywhere: true,
            movementSpace: this.element.parentElement,
            repositionClickOffset: true,
            stepSize: 1,
        })
    }

    /**  @param {[Number, Number]} param0 */
    adjustLocation([x, y]) {
        const radius = Math.round(this.movementSpaceSize[0] / 2);
        x = x - radius;
        y = -(y - radius);
        let [r, theta] = Utility.getPolarCoordinates([x, y]);
        r = Math.min(r, radius), [x, y] = Utility.getCartesianCoordinates([r, theta]);
        x = Math.round(x + radius);
        y = Math.round(-y + radius);
        this.#locationChangeCallback?.([x, y]);
        return [x, y]
    }

    setLocationChangeCallback(callback) {
        this.#locationChangeCallback = callback;
    }
}

/** @typedef {import("../template/ColorPickerWindowTemplate").default} ColorPickerWindowTemplate */
/**
 * @template T
 * @typedef {import("./WindowElement").default<T>} WindowElement
 */

/** @extends {IDraggableElement<Object, ColorHandlerTemplate>} */
class ColorHandlerElement extends IDraggableElement {

    /** @type {WindowElement<ColorPickerWindowTemplate>} */
    windowElement

    constructor() {
        super({}, new ColorHandlerTemplate());
    }

    connectedCallback() {
        super.connectedCallback();
        this.windowElement = this.closest("ueb-window");
    }

    /** @param {Number[]} param0 */
    setLocation([x, y]) {
        super.setLocation(this.template.adjustLocation([x, y]));
    }

    computeColor() {
        return new LinearColorEntity()
    }
}

customElements.define("ueb-color-handler", ColorHandlerElement);

/** @typedef {import("../element/WindowElement").default} WindowElement */

/** @extends {IDraggableTemplate<WindowElement>} */
class WindowTemplate extends IDraggableTemplate {

    static windowName = $`Window`

    toggleAdvancedDisplayHandler

    getDraggableElement() {
        return /** @type {WindowElement} */(this.element.querySelector(".ueb-window-top"))
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
            ignoreTranslateCompensate: true,
            looseTarget: true,
            movementSpace: this.element.blueprint,
            stepSize: 1,
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            this.createDraggableObject(),
        ]
    }

    render() {
        return $`
            <div class="ueb-window">
                <div class="ueb-window-top">
                    <div class="ueb-window-name ueb-ellipsis-nowrap-text">${
                         // @ts-expect-error
                         this.constructor.windowName}</div>
                    <div class="ueb-window-close">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <line x1="2" y1="2" x2="30" y2="30" stroke="currentColor" stroke-width="4" />
                            <line x1="30" y1="2" x2="2" y2="30" stroke="currentColor" stroke-width="4" />
                        </svg>
                    </div>
                </div>
                <div class="ueb-window-content">
                    ${this.renderContent()}
                </div>
            </div>
        `
    }

    renderContent() {
        return $``
    }
}

/** @typedef {import("../element/WindowElement").default} WindowElement */

class ColorPickerWindowTemplate extends WindowTemplate {

    static windowName = $`Color Picker`

    /** @type {LinearColorEntity} */
    #color
    get color() {
        return this.#color
    }
    /** @param {LinearColorEntity} value */
    set color(value) {
        if (value.toNumber() == this.color?.toNumber()) {
            return
        }
        this.element.requestUpdate("color", this.#color);
        this.#color = value;
    }

    connectedCallback() {
        super.connectedCallback();
        this.color = this.element.windowOptions.getPinColor();
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        const wheelHandler = new ColorHandlerElement();
        new ColorHandlerElement();
        wheelHandler.template.setLocationChangeCallback(([x, y]) => {
            this.color = LinearColorEntity.fromWheelLocation(x, y);
        });
        this.element.querySelector(".ueb-color-picker-wheel").appendChild(new ColorHandlerElement());

    }

    renderContent() {
        return $`
            <div class="ueb-color-picker"
                .style="--ueb-color-r: ${this.color.R}; --ueb-color-g: ${this.color.G}; --ueb-color-b: ${this.color.B}; --ueb-color-a: ${this.color.A};">
                <div class="ueb-color-picker-toolbar">
                    <div class="ueb-color-picker-theme"></div>
                    <div class="ueb-color-picker-srgb"></div>
                </div>
                <div class="ueb-color-picker-main">
                    <div class="ueb-color-picker-wheel"></div>
                    <div class="ueb-color-picker-saturation"></div>
                    <div class="ueb-color-picker-value"></div>
                    <div class="ueb-color-picker-preview">
                        <div class="ueb-color-picker-preview-old"></div>
                        <div class="ueb-color-picker-preview-new"></div>
                    </div>
                </div>
                <div class="ueb-color-picker-advanced-toggle"></div>
                <div class="ueb-color-picker-advanced">
                    <div class="ueb-color-picker-r"></div>
                    <div class="ueb-color-picker-g"></div>
                    <div class="ueb-color-picker-b"></div>
                    <div class="ueb-color-picker-a"></div>
                    <div class="ueb-color-picker-h"></div>
                    <div class="ueb-color-picker-s"></div>
                    <div class="ueb-color-picker-v"></div>
                    <div class="ueb-color-picker-hex-linear"></div>
                    <div class="ueb-color-picker-hex-srgb"></div>
                </div>
                <div class="ueb-color-picker-ok"></div>
                <div class="ueb-color-picker-cancel"></div>
            </div>
        `
    }

    cleanup() {
        this.element.blueprint.removeEventListener(Configuration.colorWindowEventName, this.colorWindowHandler);
    }
}

/** @typedef {import("../../element/PinElement").default} PinElement */

/** @extends IMouseClickDrag<PinElement> */
class MouseIgnore extends IMouseClickDrag {

    constructor(target, blueprint, options = {}) {
        options.consumeEvent = true;
        super(target, blueprint, options);
    }
}

/**
 * @template T
 * @typedef {import("../element/PinElement").default<T>} PinElement
 */

/**
 * @template T
 * @extends PinTemplate<T>
 */
class IInputPinTemplate extends PinTemplate {

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

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.#inputContentElements = /** @type {HTMLElement[]} */([...this.element.querySelectorAll(".ueb-pin-input-content")]);
        if (this.#inputContentElements.length) {
            this.setInputs(this.getInputs(), false);
            let self = this;
            this.onFocusHandler = _ => this.element.blueprint.dispatchEditTextEvent(true);
            this.onFocusOutHandler = e => {
                e.preventDefault();
                document.getSelection()?.removeAllRanges(); // Deselect text inside the input
                self.setInputs(this.getInputs(), true);
                this.element.blueprint.dispatchEditTextEvent(false);
            };
            this.#inputContentElements.forEach(element => {
                element.addEventListener("focus", this.onFocusHandler);
                element.addEventListener("focusout", this.onFocusOutHandler);
            });
        }
    }

    cleanup() {
        super.cleanup();
        this.#inputContentElements.forEach(element => {
            element.removeEventListener("focus", this.onFocusHandler);
            element.removeEventListener("focusout", this.onFocusOutHandler);
        });
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            ...this.#inputContentElements.map(elem => new MouseIgnore(elem, this.element.blueprint))
        ]
    }

    getInput() {
        return this.getInputs().reduce((acc, cur) => acc + cur, "")
    }

    getInputs() {
        return this.#inputContentElements.map(element =>
            // Faster than innerText which causes reflow
            element.innerHTML
                .replaceAll("&nbsp;", "\u00A0")
                .replaceAll("<br>", "\n")
        )
    }

    /** @param {String[]?} values */
    setInputs(values = [], updateDefaultValue = true) {
        this.#inputContentElements.forEach(
            (elem, i) => elem.innerText = values[i]
        );
        if (updateDefaultValue) {
            this.setDefaultValue(values.map(v => IInputPinTemplate.stringFromInputToUE(v)), values);
        }
    }

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values.reduce((acc, cur) => acc + cur, ""));
    }

    renderInput() {
        if (this.element.isInput()) {
            return $`
                <div class="ueb-pin-input">
                    <span class="ueb-pin-input-content" role="textbox" contenteditable="true"
                        .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.DefaultValue.toString())}"></span>
                </div>
            `
        }
        return $``
    }
}

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
 */
class IMouseClick extends IPointing {

    /** @type {(e: MouseEvent) => void} */
    #mouseDownHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseUpHandler

    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0;
        options.consumeEvent ??= true;
        options.exitAnyButton ??= true;
        options.looseTarget ??= false;
        super(target, blueprint, options);
        this.clickedPosition = [0, 0];
        let self = this;

        this.#mouseDownHandler = e => {
            self.blueprint.setFocused(true);
            switch (e.button) {
                case self.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the target, not descandants
                    if (self.options.looseTarget || e.target == e.currentTarget) {
                        if (self.options.consumeEvent) {
                            e.stopImmediatePropagation(); // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        document.addEventListener("mouseup", self.#mouseUpHandler);
                        self.clickedPosition = self.locationFromEvent(e);
                        self.clicked(self.clickedPosition);
                    }
                    break
                default:
                    if (!self.options.exitAnyButton) {
                        self.#mouseUpHandler(e);
                    }
                    break
            }
        };

        this.#mouseUpHandler = e => {
            if (!self.options.exitAnyButton || e.button == self.options.clickButton) {
                if (self.options.consumeEvent) {
                    e.stopImmediatePropagation(); // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                document.removeEventListener("mouseup", self.#mouseUpHandler);
                self.unclicked();
            }
        };

        this.listenEvents();
    }

    listenEvents() {
        this.target.addEventListener("mousedown", this.#mouseDownHandler);
        if (this.options.clickButton == 2) {
            this.target.addEventListener("contextmenu", e => e.preventDefault());
        }
    }

    unlistenEvents() {
        this.target.removeEventListener("mousedown", this.#mouseDownHandler);
    }

    /* Subclasses will override the following methods */
    clicked(location) {
    }

    unclicked(location) {
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
                    Object.entries(WindowElement.#typeTemplateMap).find(([k, v]) => value == v)[0]
            },
        },
    }

    constructor(options = {}) {
        if (options.type.constructor == String) {
            options.type = WindowElement.#typeTemplateMap[options.type];
        }
        options.type ??= WindowTemplate;
        options.windowOptions ??= {};
        super({}, new options.type());
        this.type = options.type;
        this.windowOptions = options.windowOptions;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispatchCloseEvent();
    }

    dispatchCloseEvent(value) {
        let deleteEvent = new CustomEvent(Configuration.windowCloseEventName, {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(deleteEvent);
    }
}

customElements.define("ueb-window", WindowElement);

/**
 * @template {HTMLElement} T
 * @extends {IMouseClick<T>}
 */
class MouseOpenWindow extends IMouseClick {

    #window

    clicked(location) {
    }

    unclicked(location) {
        this.#window = new WindowElement({
            type: this.options.windowType,
            windowOptions: this.options.windowOptions,
        });
        this.blueprint.append(this.#window);
    }
}

/**
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity
 */

class LinearColorPinTemplate extends IInputPinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.#input = this.element.querySelector(".ueb-pin-input");
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseOpenWindow(this.#input, this.element.blueprint, {
                moveEverywhere: true,
                looseTarget: true,
                windowType: ColorPickerWindowTemplate,
                windowOptions: {
                    // The created window will use the following functions to get and set the color
                    getPinColor: () => this.element.defaultValue,
                    /** @param {LinearColorEntity} color */
                    setPinColor: color => this.element.setDefaultValue(color),
                },
            })
        ]
    }

    getInputs() {
        return [this.#input.dataset.linearColor]
    }

    /** @param {String[]} value */
    setInputs(value = []) {
    }

    renderInput() {
        if (this.element.isInput()) {
            return $`
                <span class="ueb-pin-input" data-linear-color="${this.element.defaultValue.toString()}"
                    .style="--ueb-linear-color:rgba(${this.element.defaultValue.toString()})">
                </span>
            `
        }
        return super.renderInput()
    }
}

/** @typedef {import("../element/PinElement").default} PinElement */

class NamePinTemplate extends IInputPinTemplate {

    /** @type {(e : InputEvent) => void} */
    onInputHandler

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.onInputHandler = e => {
            e.stopPropagation();
            if (
                e.inputType == "insertParagraph"
                || e.inputType == "insertLineBreak"
                || (e.inputType == "insertFromPaste" && /** @type {HTMLElement} */(e.target).innerText.includes("\n"))
            ) {
                /** @type {HTMLElement} */(e.target).blur(); // Loose focus in case it tries to insert newline
                this.inputContentElements.forEach(element => element.innerText = element.innerText.replaceAll("\n", ""));
            }
        };
        this.inputContentElements.forEach(element => {
            element.addEventListener("input", /** @type {(e : Event) => void} */(this.onInputHandler));
        });
    }

    cleanup() {
        super.cleanup();
        this.inputContentElements.forEach(element => {
            element.removeEventListener("input", /** @type {(e : Event) => void} */(this.onInputHandler));
        });
    }

    getInputs() {
        return this.inputContentElements.map(element => element.textContent) // textContent for performance reason
    }

    /** @param {String[]} values */
    setInputs(values = [], updateDefaultValue = true) {
        values = values.map(value => value.replaceAll("\n", "")); // get rid of the new lines
        super.setInputs(values, updateDefaultValue);
    }
}

/**
 * @template T
 * @extends IInputPinTemplate<T>
 */
class INumericPinTemplate extends IInputPinTemplate {

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

/**
 * @template {Number} T
 * @extends INumericPinTemplate<T>
 */
class RealPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0]);
    }

    renderInput() {
        if (this.element.isInput()) {
            return $`
                <div class="ueb-pin-input">
                    <span class="ueb-pin-input-content" role="textbox" contenteditable="true"
                        .innerText="${
                            IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.entity.DefaultValue))
                        }"></span>
                </div>
            `
        }
        return $``
    }
}

class ReferencePinTemplate extends PinTemplate {

    renderIcon() {
        return $`
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <polygon class="ueb-pin-tofill" points="4 16 16 4 28 16 16 28" stroke="currentColor" stroke-width="5" />
            </svg>
        `
    }
}

/** @typedef {import("../entity/RotatorEntity").default} Rotator */

/** @extends INumericPinTemplate<Rotator> */
class RotatorPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        if (!(this.element.entity.DefaultValue instanceof RotatorEntity)) {
            throw new TypeError("Expected DefaultValue to be a VectorEntity")
        }
        let rotator = this.element.entity.DefaultValue;
        rotator.R = values[0]; // Roll
        rotator.P = values[1]; // Pitch
        rotator.Y = values[2]; // Yaw
    }

    renderInput() {
        if (this.element.isInput()) {
            return $`
                <div class="ueb-pin-input-wrapper">
                    <span class="ueb-pin-input-label">X</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-x" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.getDefaultValue().R.toString())}"></span>
                    </div>
                    <span class="ueb-pin-input-label">Y</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-y" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.getDefaultValue().P.toString())}"></span>
                    </div>
                    <span class="ueb-pin-input-label">Z</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-z" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.getDefaultValue().Y.toString())}"></span>
                    </div>
                </div>
            `
        }
        return $``
    }
}

/** @extends IInputPinTemplate<String> */
class StringPinTemplate extends IInputPinTemplate {
}

/** @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity */

/**
 * @template {VectorEntity} T
 * @extends INumericPinTemplate<T>
 */
class VectorPinTemplate extends INumericPinTemplate {

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values, rawValues) {
        if (!(this.element.entity.DefaultValue instanceof VectorEntity)) {
            throw new TypeError("Expected DefaultValue to be a VectorEntity")
        }
        let vector = this.element.entity.DefaultValue;
        vector.X = values[0];
        vector.Y = values[1];
        vector.Z = values[2];
    }

    renderInput() {
        if (this.element.isInput()) {
            return $`
                <div class="ueb-pin-input-wrapper">
                    <span class="ueb-pin-input-label">X</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-x" role="textbox" contenteditable="true" .innerText="${IInputPinTemplate
                                    .stringFromUEToInput(Utility.minDecimals(this.element.entity.getDefaultValue().X))
                                }"></span>
                    </div>
                    <span class="ueb-pin-input-label">Y</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-y" role="textbox" contenteditable="true" .innerText="${IInputPinTemplate
                                    .stringFromUEToInput(Utility.minDecimals(this.element.entity.getDefaultValue().Y))
                                }"></span>
                    </div>
                    <span class="ueb-pin-input-label">Z</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-z" role="textbox" contenteditable="true" .innerText="${IInputPinTemplate
                                    .stringFromUEToInput(Utility.minDecimals(this.element.entity.getDefaultValue().Z))
                                }"></span>
                    </div>
                </div>
            `
        }
        return $``
    }
}

/**
 * @typedef {import("../entity/GuidEntity").default} GuidEntity
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {import("./NodeElement").default} NodeElement
 */
/**
 * @template T
 * @typedef {import("../entity/PinEntity").default<T>} PinEntity
 */

/**
 * @template T
 * @extends {IElement<PinEntity<T>, PinTemplate>}
 */
class PinElement extends IElement {

    static #typeTemplateMap = {
        "/Script/CoreUObject.LinearColor": LinearColorPinTemplate,
        "/Script/CoreUObject.Rotator": RotatorPinTemplate,
        "/Script/CoreUObject.Vector": VectorPinTemplate,
        "bool": BoolPinTemplate,
        "exec": ExecPinTemplate,
        "MUTABLE_REFERENCE": ReferencePinTemplate,
        "name": NamePinTemplate,
        "real": RealPinTemplate,
        "string": StringPinTemplate,
    }

    static properties = {
        advancedView: {
            type: String,
            attribute: "data-advanced-view",
            reflect: true,
        },
        color: {
            type: LinearColorEntity,
            converter: {
                fromAttribute: (value, type) => {
                    // @ts-expect-error
                    return value ? ISerializer.grammar.LinearColorFromAnyColor.parse(value).value : null
                },
                toAttribute: (value, type) => {
                    return value ? Utility.printLinearColor(value) : null
                },
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
        pinType: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
        pinDirection: {
            type: String,
            attribute: "data-direction",
            reflect: true,
        },
    }

    /**
     * @param {PinEntity<any>} pinEntity
     * @return {new () => PinTemplate}
     */
    static getTypeTemplate(pinEntity) {
        let result = PinElement.#typeTemplateMap[
            pinEntity.PinType.bIsReference && !pinEntity.PinType.bIsConst
                ? "MUTABLE_REFERENCE"
                : pinEntity.getType()
        ];
        return result ?? PinTemplate
    }

    /** @type {NodeElement} */
    nodeElement

    /** @type {HTMLElement} */
    clickableElement

    connections = 0

    /** @param {PinEntity<T>} entity */
    constructor(entity) {
        super(
            entity,
            new (PinElement.getTypeTemplate(entity))()
        );
        this.advancedView = entity.bAdvancedView;
        this.defaultValue = entity.getDefaultValue();
        this.pinType = this.entity.getType();
        // @ts-expect-error
        this.color = this.constructor.properties.color.converter.fromAttribute(Configuration.pinColor[this.pinType]?.toString());
        this.isLinked = false;
        this.pinDirection = entity.isInput() ? "input" : entity.isOutput() ? "output" : "hidden";

        // this.entity.subscribe("DefaultValue", value => this.defaultValue = value.toString())
        this.entity.subscribe("PinToolTip", value => {
            let matchResult = value.match(/\s*(.+?(?=\n)|.+\S)\s*/);
            if (matchResult) {
                return Utility.formatStringName(matchResult[1])
            }
            return Utility.formatStringName(this.entity.PinName)
        });
    }

    /** @return {GuidEntity} */
    GetPinId() {
        return this.entity.PinId
    }

    /** @return {String} */
    GetPinIdValue() {
        return this.GetPinId().value
    }

    /** @returns {String} */
    getPinName() {
        return this.entity.PinName
    }

    getPinDisplayName() {
        let matchResult = null;
        if (
            this.entity.PinToolTip
            // Match up until the first \n excluded or last character
            && (matchResult = this.entity.PinToolTip.match(/\s*(.+?(?=\n)|.+\S)\s*/))
        ) {
            return Utility.formatStringName(matchResult[1])
        }
        return Utility.formatStringName(this.entity.PinName)
    }

    isInput() {
        return this.entity.isInput()
    }

    isOutput() {
        return this.entity.isOutput()
    }

    getClickableElement() {
        return this.clickableElement
    }

    getLinkLocation() {
        return this.template.getLinkLocation()
    }

    /** @returns {NodeElement} */
    getNodeElement() {
        return this.nodeElement
    }

    getLinks() {
        return this.entity.LinkedTo ?? []
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
                    this.blueprint.addGraphElement(new LinkElement(this, pin));
                }
            }
            return pin
        });
    }

    /** @param {PinElement} targetPinElement */
    linkTo(targetPinElement) {
        this.entity.linkTo(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity);
        this.isLinked = this.entity.isLinked();
    }

    /** @param {PinElement} targetPinElement */
    unlinkFrom(targetPinElement) {
        this.entity.unlinkFrom(targetPinElement.getNodeElement().getNodeName(), targetPinElement.entity);
        this.isLinked = this.entity.isLinked();
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

customElements.define("ueb-pin", PinElement);

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 */

/** @extends {MouseMoveDraggable<ISelectableDraggableElement>} */
class MouseMoveNodes extends MouseMoveDraggable {

    startDrag() {
        if (!this.target.selected) {
            this.blueprint.unselectAll();
            this.target.setSelected(true);
        }
    }

    dragAction(location, offset) {
        this.target.dispatchDragEvent(offset);
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll();
            this.target.setSelected(true);
        }
    }
}

/**
 * @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 * @typedef {import("../input/mouse/MouseMoveDraggable").default} MouseMoveDraggable
 */

/**
 * @template {ISelectableDraggableElement} T
 * @extends {IDraggableTemplate<T>}
 */
class ISelectableDraggableTemplate extends IDraggableTemplate {

    getDraggableElement() {
        return this.element
    }

    createDraggableObject() {
        return /** @type {MouseMoveDraggable} */ (new MouseMoveNodes(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
            looseTarget: true,
        }))
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        if (this.element.selected && !this.element.listeningDrag) {
            this.element.setSelected(true);
        }
    }
}

/** @typedef {import("../element/NodeElement").default} NodeElement */

class NodeTemplate extends ISelectableDraggableTemplate {

    toggleAdvancedDisplayHandler

    render() {
        return $`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">
                        <div class="ueb-node-name">
                            <span class="ueb-node-name-symbol">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.72002 6.0699C9.88111 4.96527 10.299 3.9138 10.94 2.99991C10.94 2.99991 10.94 3.05991 10.94 3.08991C10.94 3.36573 11.0496 3.63026 11.2446 3.8253C11.4397 4.02033 11.7042 4.12991 11.98 4.12991C12.2558 4.12991 12.5204 4.02033 12.7154 3.8253C12.9105 3.63026 13.02 3.36573 13.02 3.08991C13.0204 2.90249 12.9681 2.71873 12.8691 2.5596C12.7701 2.40047 12.6283 2.27237 12.46 2.18991H12.37C11.8725 2.00961 11.3275 2.00961 10.83 2.18991C9.21002 2.63991 8.58002 4.99991 8.58002 4.99991L8.40002 5.1199H5.40002L5.15002 6.1199H8.27002L7.27002 11.4199C7.11348 12.0161 6.79062 12.5555 6.33911 12.9751C5.8876 13.3948 5.32607 13.6773 4.72002 13.7899C4.78153 13.655 4.81227 13.5081 4.81002 13.3599C4.81002 13.0735 4.69624 12.7988 4.4937 12.5962C4.29116 12.3937 4.01646 12.2799 3.73002 12.2799C3.44359 12.2799 3.16889 12.3937 2.96635 12.5962C2.76381 12.7988 2.65002 13.0735 2.65002 13.3599C2.66114 13.605 2.75692 13.8386 2.92104 14.021C3.08517 14.2033 3.30746 14.3231 3.55002 14.3599C7.91002 15.1999 8.55002 11.4499 8.55002 11.4499L9.55002 7.05991H12.55L12.8 6.05991H9.64002L9.72002 6.0699Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                            <span class="ueb-node-name-text ueb-ellipsis-nowrap-text">
                                ${this.element.nodeDisplayName}
                            </span>
                        </div>
                    </div>
                    <div class="ueb-node-content">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
                    ${this.element.enabledState?.toString() == "DevelopmentOnly" ? $`
                    <div class="ueb-node-developmentonly">Development Only</div>
                    ` : w}
                    ${this.element.advancedPinDisplay ? $`
                    <div class="ueb-node-expansion" @click="${this.toggleAdvancedDisplayHandler}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="ueb-node-expansion-icon" viewBox="4 4 24 24">
                            <path d="M 16.003 18.626 l 7.081 -7.081 L 25 13.46 l -8.997 8.998 -9.003 -9 1.917 -1.916 z" />
                        </svg>
                    </div>
                    ` : w}
                </div>
            </div>
        `
    }

    /** @param {Map} changedProperties */
    async firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        const inputContainer = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-inputs"));
        const outputContainer = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-outputs"));
        Promise.all(this.element.getPinElements().map(n => n.updateComplete)).then(() => this.element.dispatchReflowEvent());
        this.element.getPinElements().forEach(p => {
            if (p.isInput()) {
                inputContainer.appendChild(p);
            } else if (p.isOutput()) {
                outputContainer.appendChild(p);
            }
        });
        this.toggleAdvancedDisplayHandler = _ => {
            this.element.toggleShowAdvancedPinDisplay();
            this.element.addNextUpdatedCallbacks(() => this.element.dispatchReflowEvent(), true);
        };
        this.element.nodeNameElement = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-name-text"));
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }
}

/** @typedef {import("./IElement").default} IElement */

/** @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>} */
class NodeElement extends ISelectableDraggableElement {

    static properties = {
        ...ISelectableDraggableElement.properties,
        name: {
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
        }
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

    #pins

    /** @param {ObjectEntity} entity */
    constructor(entity) {
        super(entity, new NodeTemplate());
        this.#pins = this.getPinEntities().filter(v => !v.isHidden()).map(v => new PinElement(v));
        this.#pins.forEach(pin => pin.nodeElement = this);
        this.name = entity.getObjectName();
        this.advancedPinDisplay = entity.AdvancedPinDisplay?.toString();
        this.enabledState = entity.EnabledState;
        this.nodeDisplayName = entity.getDisplayName();
        this.pureFunction = entity.bIsPureFunc;
        this.dragLinkObjects = [];
        super.setLocation([this.entity.NodePosX.value, this.entity.NodePosY.value]);
        this.entity.subscribe("AdvancedPinDisplay", value => this.advancedPinDisplay = value);
        this.entity.subscribe("Name", value => this.name = value);
    }

    /** @param {String} str */
    static fromSerializedObject(str) {
        str = str.trim();
        let entity = SerializerFactory.getSerializer(ObjectEntity).deserialize(str);
        // @ts-expect-error
        return new NodeElement(entity)
    }

    connectedCallback() {
        this.getAttribute("type")?.trim();
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispatchDeleteEvent();
    }

    getNodeName() {
        return this.entity.getObjectName()
    }

    getNodeDisplayName() {
        return this.entity.getDisplayName()
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

    setLocation(value = [0, 0]) {
        let nodeType = this.entity.NodePosX.constructor;
        // @ts-expect-error
        this.entity.NodePosX = new nodeType(value[0]);
        // @ts-expect-error
        this.entity.NodePosY = new nodeType(value[1]);
        super.setLocation(value);
    }

    dispatchDeleteEvent(value) {
        let deleteEvent = new CustomEvent(Configuration.nodeDeleteEventName, {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(deleteEvent);
    }

    dispatchReflowEvent() {
        let reflowEvent = new CustomEvent(Configuration.nodeReflowEventName, {
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(reflowEvent);
    }

    setShowAdvancedPinDisplay(value) {
        this.entity.AdvancedPinDisplay = new IdentifierEntity(value ? "Shown" : "Hidden");
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay?.toString() != "Shown");
    }
}

customElements.define("ueb-node", NodeElement);

class Paste extends IInput {

    /** @type {(e: ClipboardEvent) => void} */
    #pasteHandle

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        options.unlistenOnTextEdit = true; // No nodes paste if inside a text field, just text (default behavior)
        super(target, blueprint, options);
        this.serializer = new ObjectSerializer();
        let self = this;
        this.#pasteHandle = e => self.pasted(e.clipboardData.getData("Text"));
    }

    listenEvents() {
        document.body.addEventListener("paste", this.#pasteHandle);
    }

    unlistenEvents() {
        document.body.removeEventListener("paste", this.#pasteHandle);
    }

    pasted(value) {
        let top = 0;
        let left = 0;
        let count = 0;
        let nodes = this.serializer.readMultiple(value).map(entity => {
            let node = new NodeElement(entity);
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
        this.selectorElement = this.blueprint.selectorElement;
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

    constructor() {
        super({}, new SelectorTemplate());
        this.selectionModel = null;
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
        /** @type {FastSelectionModel} */ (this.selectionModel)
            .selectTo(finalPosition);
        this.finaPositionX = finalPosition[0];
        this.finaPositionY = finalPosition[1];
    }

    endSelect() {
        this.blueprint.selecting = false;
        this.selectionModel = null;
        this.initialPositionX = 0;
        this.initialPositionY = 0;
        this.finaPositionX = 0;
        this.finaPositionY = 0;
    }
}

customElements.define("ueb-selector", SelectorElement);

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
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 */

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
        ...Object.entries(Configuration.pinColor)
            .map(([k, v]) => ({
                [`--ueb-pin-color-${Utility.getIdFromReference(k)}`]: v.toString()
            }))
            .reduce((acc, cur) => ({
                ...acc,
                ...cur,
            }), {}),
    }

    /** @param {Blueprint} element */
    constructed(element) {
        super.constructed(element);
        this.element.style.cssText = Object.entries(BlueprintTemplate.styleVariables).map(([k, v]) => `${k}:${v};`).join("");
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new Copy(this.element.getGridDOMElement(), this.element),
            new Paste(this.element.getGridDOMElement(), this.element),
            new KeyboardCanc(this.element.getGridDOMElement(), this.element),
            new KeyboardSelectAll(this.element.getGridDOMElement(), this.element),
            new Zoom(this.element.getGridDOMElement(), this.element, {
                looseTarget: true,
            }),
            new Select(this.element.getGridDOMElement(), this.element, {
                clickButton: 0,
                exitAnyButton: true,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(this.element.getGridDOMElement(), this.element, {
                clickButton: 2,
                exitAnyButton: false,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new Unfocus(this.element.getGridDOMElement(), this.element),
            new MouseTracking(this.element.getGridDOMElement(), this.element),
            new KeyboardEnableZoom(this.element.getGridDOMElement(), this.element),
        ]
    }

    render() {
        return $`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
            <div class="ueb-viewport-overlay"></div>
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    .style="--ueb-additional-x: ${this.element}; --ueb-additional-y: ${this.element.translateY}; --ueb-translate-x: ${this.element.translateX}; --ueb-translate-y: ${this.element.translateY};">
                    <div class="ueb-grid-content">
                        <div data-links></div>
                        <div data-nodes></div>
                    </div>
                </div>
            </div>
        `
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.element.headerElement = /** @type {HTMLElement} */(this.element.querySelector('.ueb-viewport-header'));
        this.element.overlayElement = /** @type {HTMLElement} */(this.element.querySelector('.ueb-viewport-overlay'));
        this.element.viewportElement = /** @type {HTMLElement} */(this.element.querySelector('.ueb-viewport-body'));
        this.element.selectorElement = new SelectorElement();
        this.element.querySelector(".ueb-grid-content")?.append(this.element.selectorElement);
        this.element.gridElement = /** @type {HTMLElement} */(this.element.viewportElement.querySelector(".ueb-grid"));
        this.element.linksContainerElement = /** @type {HTMLElement} */(this.element.querySelector("[data-links]"));
        this.element.linksContainerElement.append(...this.element.getLinks());
        this.element.nodesContainerElement = /** @type {HTMLElement} */(this.element.querySelector("[data-nodes]"));
        this.element.nodesContainerElement.append(...this.element.getNodes());
        this.element.viewportElement.scroll(Configuration.expandGridSize, Configuration.expandGridSize);
    }


    /** @param {Map} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has("scrollX") || changedProperties.has("scrollY")) {
            this.element.viewportElement.scroll(this.element.scrollX, this.element.scrollY);
        }
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        return /** @type {PinElement} */(this.element.querySelector(
            `ueb-node[data-name="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        ))
    }
}

/**
 * @typedef {import("./element/PinElement").default} PinElement
 * @typedef {import("./entity/GuidEntity").default} GuidEntity
 * @typedef {import("./entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {{
 *     primaryInf: Number,
 *     primarySup: Number,
 *     secondaryInf: Number,
 *     secondarySup: Number
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

    static styles = BlueprintTemplate.styles

    /** @type {Map<String, Number>} */
    #nodeNameCounter = new Map()
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    /** @type {Number[]} */
    mousePosition = [0, 0]
    /** @type {HTMLElement} */
    gridElement
    /** @type {HTMLElement} */
    viewportElement
    /** @type {HTMLElement} */
    overlayElement
    /** @type {SelectorElement} */
    selectorElement
    /** @type {HTMLElement} */
    linksContainerElement
    /** @type {HTMLElement} */
    nodesContainerElement
    /** @type {HTMLElement} */
    headerElement
    focused = false
    nodeBoundariesSupplier = node => {
        let rect = node.getBoundingClientRect();
        let gridRect = this.nodesContainerElement.getBoundingClientRect();
        const scaleCorrection = 1 / this.getScale();
        return /** @type {BoundariesInfo} */ {
            primaryInf: (rect.left - gridRect.left) * scaleCorrection,
            primarySup: (rect.right - gridRect.right) * scaleCorrection,
            // Counter intuitive here: the y (secondary axis is positive towards the bottom, therefore upper bound "sup" is bottom)
            secondaryInf: (rect.top - gridRect.top) * scaleCorrection,
            secondarySup: (rect.bottom - gridRect.bottom) * scaleCorrection
        }
    }
    /** @type {(node: NodeElement, selected: Boolean) => void}} */
    nodeSelectToggleFunction = (node, selected) => {
        node.setSelected(selected);
    }

    /** @param {Configuration} settings */
    constructor(settings = new Configuration()) {
        super({}, new BlueprintTemplate());
        this.selecting = false;
        this.scrolling = false;
        this.focused = false;
        this.zoom = 0;
        this.scrollX = Configuration.expandGridSize;
        this.scrollY = Configuration.expandGridSize;
        this.translateX = Configuration.expandGridSize;
        this.translateY = Configuration.expandGridSize;
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    getScroll() {
        return [this.scrollX, this.scrollY]
    }

    /** @param {Number[]} param0 */
    setScroll([x, y], smooth = false) {
        this.scrollX = x;
        this.scrollY = y;
    }

    /** @param {Number[]} delta */
    scrollDelta(delta, smooth = false) {
        const maxScroll = [2 * Configuration.expandGridSize, 2 * Configuration.expandGridSize];
        let currentScroll = this.getScroll();
        let finalScroll = [
            currentScroll[0] + delta[0],
            currentScroll[1] + delta[1]
        ];
        let expand = [0, 0];
        for (let i = 0; i < 2; ++i) {
            if (delta[i] < 0 && finalScroll[i] < Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                // Expand left/top
                expand[i] = -1;
            } else if (delta[i] > 0 && finalScroll[i]
                > maxScroll[i] - Configuration.gridExpandThreshold * Configuration.expandGridSize) {
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
        this.setScroll(finalScroll, smooth);
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
            this.viewportElement.clientWidth,
            this.viewportElement.clientHeight
        ]
    }

    /**
     * Get the scroll limits
     * @return {Array} The horizonal and vertical maximum scroll limits
     */
    getScrollMax() {
        return [
            this.viewportElement.scrollWidth - this.viewportElement.clientWidth,
            this.viewportElement.scrollHeight - this.viewportElement.clientHeight
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
                    relativeScale * center[1]
                ];
                this.scrollDelta([
                    (newCenter[0] - center[0]) * initialScale,
                    (newCenter[1] - center[1]) * initialScale
                ]);
            });
        }
    }

    getScale() {
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue("--ueb-scale"))
    }

    /** @param {Number[]} param0 */
    compensateTranslation([x, y]) {
        x -= this.translateX;
        y -= this.translateY;
        return [x, y]
    }

    getNodes(selected = false) {
        if (selected) {
            return this.nodes.filter(
                node => node.selected
            )
        } else {
            return this.nodes
        }
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        let result = this.template.getPin(pinReference);
        if (result
            // Make sure it wasn't renamed in the meantime
            && result.nodeElement.getNodeName() == pinReference.objectName.toString()) {
            return result
        }
        // Slower fallback
        return [... this.nodes
            .find(n => pinReference.objectName.toString() == n.getNodeName())
            ?.getPinElements() ?? []]
            .find(p => pinReference.pinGuid.toString() == p.GetPinIdValue())
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
                this.nodesContainerElement?.appendChild(element);
            } else if (element instanceof LinkElement && !this.links.includes(element)) {
                this.links.push(element);
                if (this.linksContainerElement && !this.linksContainerElement.contains(element)) {
                    this.linksContainerElement.appendChild(element);
                }
            }
        }
        graphElements.filter(element => element instanceof NodeElement).forEach(
            node => /** @type {NodeElement} */(node).sanitizeLinks(graphElements)
        );
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
        let event = new CustomEvent(value ? "blueprint-focus" : "blueprint-unfocus");
        this.focused = value;
        if (!this.focused) {
            this.unselectAll();
        }
        this.dispatchEvent(event);
    }

    dispatchEditTextEvent(value) {
        const event = new CustomEvent(
            value
                ? Configuration.editTextEventName.begin
                : Configuration.editTextEventName.end
        );
        this.dispatchEvent(event);
    }
}

customElements.define("ueb-blueprint", Blueprint);

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

    /** @param {AnyValueConstructor<T>} entityType */
    constructor(wrap, entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        wrap = wrap ?? (v => `(${v})`);
        super(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter);
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
        let result = this.wrap(this.subWrite(entity, [], object, insideString));
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
        SimpleSerializationVectorEntity,
        new CustomSerializer(
            (value, insideString) => `${value.X}, ${value.Y}, ${value.Z}`,
            SimpleSerializationVectorEntity
        )
    );

    SerializerFactory.registerSerializer(
        VectorEntity,
        new GeneralSerializer(bracketsWrapped, VectorEntity)
    );
}

initializeSerializerFactory();

export { Blueprint, Configuration, LinkElement, NodeElement };
