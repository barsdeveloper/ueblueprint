class Primitive {
    toString() {
        return "Unimplemented for " + this.constructor.name
    }
}

class Integer extends Primitive {

    constructor(value) {
        super();
        // Using constructor equality and not instanceof in order to consider both primitives and objects
        if (value?.constructor === String) {
            value = Number(value);
        }
        if (value?.constructor === Number) {
            value = Math.round(value);
        }
        /** @type {number} */
        this.value = value;
    }

    valueOf() {
        this.value;
    }

    toString() {
        return this.value.toString()
    }
}

class TypeInitialization {

    static sanitize(value) {
        if (!(value instanceof Object)) {
            return value // Is already primitive
        }
        if (value instanceof Boolean || value instanceof Integer || value instanceof Number) {
            return value.valueOf()
        }
        if (value instanceof String) {
            return value.toString()
        }
        return value
    }

    /**
     * 
     * @param {typeof Object} type 
     * @param {boolean} showDefault 
     * @param {*} value
     */
    constructor(type, showDefault = true, value = undefined) {
        if (value === undefined) {
            value = TypeInitialization.sanitize(new type());
        }
        this.value = value;
        this.showDefault = showDefault;
        this.type = type;
    }
}

class Utility {
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    static getScale(element) {
        return getComputedStyle(element).getPropertyValue('--ueb-scale')
    }


    /**
     * Sets a value in an object
     * @param {String[]} keys The chained keys to access from object in order to set the value
     * @param {any} value Value to be set
     * @param {Object} target Object holding the data 
     * @param {Boolean} create Whether to create or not the key in case it doesn't exist
     * @returns {Boolean} Returns true on succes, false otherwise
     */
    static objectSet(target, keys, value, create = false) {
        if (keys.constructor != Array) {
            console.error("Expected keys to be an array.");
        }
        if (keys.length == 1) {
            if (create || keys[0] in target) {
                target[keys[0]] = value;
                return true
            }
        } else if (keys.length > 0) {
            return Utility.objectSet(target[keys[0]], keys.slice(1), value, create)
        }
        return false
    }


    /**
     * Gets a value from an object, gives defaultValue in case of failure
     * @param {Object} source Object holding the data 
     * @param {String[]} keys The chained keys to access from object in order to get the value
     * @param {any} defaultValue Value to return in case from doesn't have it
     * @returns {any} The value in from corresponding to the keys or defaultValue otherwise
     */
    static objectGet(source, keys, defaultValue = null) {
        if (keys.constructor != Array) {
            console.error("Expected keys to be an array.");
        }
        if (keys.length == 0 || !(keys[0] in source)) {
            return defaultValue
        }
        if (keys.length == 1) {
            return source[keys[0]]
        }
        return Utility.objectGet(source[keys[0]], keys.slice(1), defaultValue)
    }

    static equals(a, b) {
        a = TypeInitialization.sanitize(a);
        b = TypeInitialization.sanitize(b);
        return a === b
    }

    /**
     * 
     * @param {String} value 
     */
    static FirstCapital(value) {
        return value.charAt(0).toUpperCase() + value.substring(1)
    }

    static getType(value) {
        let constructor = value?.constructor;
        switch (constructor) {
            case TypeInitialization:
                return value.type
            case Function:
                return value
            default:
                return constructor
        }
    }
}

class Entity {
    constructor(options = {}) {
        /**
         * 
         * @param {String[]} prefix 
         * @param {Object} target 
         * @param {Object} properties 
         */
        const defineAllAttributes = (prefix, target, properties) => {
            let fullKey = prefix.concat("");
            const last = fullKey.length - 1;
            for (let property in properties) {
                fullKey[last] = property;
                // Not instanceof because all objects are instenceof Object, exact match needed
                if (properties[property]?.constructor === Object) {
                    target[property] = {};
                    defineAllAttributes(fullKey, target[property], properties[property]);
                    continue
                }
                /*
                 * The value can either be:
                 *     - Array: can contain multiple values, its property is assigned multiple times like (X=1, X=4, X="Hello World") 
                 *     - TypeInitialization: contains the maximum amount of information about the attribute.
                 *     - A type: the default value will be default constructed object without arguments.
                 *     - A proper value.
                 */
                const value = Utility.objectGet(options, fullKey);
                if (value !== null) {
                    target[property] = value;
                    continue
                }
                let defaultValue = properties[property];
                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        continue
                    }
                    defaultValue = defaultValue.value;
                }
                if (defaultValue instanceof Array) {
                    target[property] = [];
                    continue
                }
                if (defaultValue instanceof Function) {
                    defaultValue = TypeInitialization.sanitize(new defaultValue());
                }
                target[property] = defaultValue;
            }
        };
        defineAllAttributes([], this, this.getAttributes());
    }
}

class ObjectReference extends Primitive {

    /**
     * 
     * @param {String} type 
     * @param {String} path 
     */
    constructor(type, path) {
        super();
        this.type = type;
        this.path = path;
    }

    toString() {
        return (this.type ?? "") + (
            this.path
                ? this.type ? `'"${this.path}"'` : this.path
                : ""
        )
    }
}

class FunctionReferenceEntity extends Entity {
    static attributes = {
        MemberParent: ObjectReference,
        MemberName: ""
    }

    getAttributes() {
        return FunctionReferenceEntity.attributes
    }
}

class Guid extends Primitive {

    static generateGuid(random) {
        let values = new Uint32Array(4);
        if (random === true) {
            crypto.getRandomValues(values);
        }
        let result = "";
        values.forEach(n => {
            result += ('00000000' + n.toString(16).toUpperCase()).slice(-8);
        });
        return result
    }

    constructor(guid) {
        super();
        // Using constructor equality and not instanceof in order to consider both primitives and objects
        if (guid?.constructor === Boolean) {
            guid = Guid.generateGuid(guid == true);
        }
        if (guid instanceof Guid) {
            guid = guid.value;
        }
        this.value = guid;
    }

    toString() {
        return this.value.toString()
    }
}

class LocalizedTextEntity extends Primitive {

    /**
     * 
     * @param {String} namespace 
     * @param {String} key 
     * @param {String} value 
     */
    constructor(namespace, key, value) {
        super();
        this.namespace = namespace;
        this.key = key;
        this.value = value;
    }

    toString() {
        "NSLOCTEXT(" + `"${this.namespace}"` + ", " + `"${this.key}"` + ", " + `"${this.value}"` + ")";
    }

}

class PinReferenceEntity extends Entity {

    static attributes = {
        objectName: String,
        pinGuid: Guid
    }

    getAttributes() {
        return PinReferenceEntity.attributes
    }
}

class PinEntity extends Entity {

    static attributes = {
        PinId: Guid,
        PinName: "",
        PinFriendlyName: new TypeInitialization(LocalizedTextEntity, false, null),
        PinToolTip: "",
        Direction: new TypeInitialization(String, false, ""),
        PinType: {
            PinCategory: "",
            PinSubCategory: "",
            PinSubCategoryObject: ObjectReference,
            PinSubCategoryMemberReference: null,
            PinValueType: null,
            ContainerType: ObjectReference,
            bIsReference: false,
            bIsConst: false,
            bIsWeakPointer: false,
            bIsUObjectWrapper: false
        },
        LinkedTo: [PinReferenceEntity],
        DefaultValue: "",
        AutogeneratedDefaultValue: "",
        PersistentGuid: Guid,
        bHidden: false,
        bNotConnectable: false,
        bDefaultValueIsReadOnly: false,
        bDefaultValueIsIgnored: false,
        bAdvancedView: false,
        bOrphanedPin: false,
    }

    getAttributes() {
        return PinEntity.attributes
    }

    isOutput() {
        if (this.Direction === "EGPD_Output") {
            return true
        }
    }
}

class VariableReferenceEntity extends Entity {

    static attributes = {
        MemberName: String,
        MemberGuid: Guid,
        bSelfContext: false
    }

    getAttributes() {
        return VariableReferenceEntity.attributes
    }
}

class ObjectEntity extends Entity {

    static attributes = {
        Class: ObjectReference,
        Name: "",
        bIsPureFunc: new TypeInitialization(Boolean, false, false),
        VariableReference: new TypeInitialization(VariableReferenceEntity, false, null),
        FunctionReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        TargetType: new TypeInitialization(ObjectReference, false, null),
        NodePosX: 0,
        NodePosY: 0,
        NodeGuid: Guid,
        CustomProperties: [PinEntity]
    }

    getAttributes() {
        return ObjectEntity.attributes
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var parsimmon_umd_min = {exports: {}};

(function (module, exports) {
!function(n,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,function(){return function(n){var t={};function r(e){if(t[e])return t[e].exports;var u=t[e]={i:e,l:!1,exports:{}};return n[e].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e});},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0});},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){function e(n){if(!(this instanceof e))return new e(n);this._=n;}var u=e.prototype;function o(n,t){for(var r=0;r<n;r++)t(r);}function i(n,t,r){return function(n,t){o(t.length,function(r){n(t[r],r,t);});}(function(r,e,u){t=n(t,r,e,u);},r),t}function f(n,t){return i(function(t,r,e,u){return t.concat([n(r,e,u)])},[],t)}function a(n,t){var r={v:0,buf:t};return o(n,function(){var n;r={v:r.v<<1|(n=r.buf,n[0]>>7),buf:function(n){var t=i(function(n,t,r,e){return n.concat(r===e.length-1?Buffer.from([t,0]).readUInt16BE(0):e.readUInt16BE(r))},[],n);return Buffer.from(f(function(n){return (n<<1&65535)>>8},t))}(r.buf)};}),r}function c(){return "undefined"!=typeof Buffer}function s(){if(!c())throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")}function l(n){s();var t=i(function(n,t){return n+t},0,n);if(t%8!=0)throw new Error("The bits ["+n.join(", ")+"] add up to "+t+" which is not an even number of bytes; the total should be divisible by 8");var r,u=t/8,o=(r=function(n){return n>48},i(function(n,t){return n||(r(t)?t:n)},null,n));if(o)throw new Error(o+" bit range requested exceeds 48 bit (6 byte) Number max.");return new e(function(t,r){var e=u+r;return e>t.length?x(r,u.toString()+" bytes"):b(e,i(function(n,t){var r=a(t,n.buf);return {coll:n.coll.concat(r.v),buf:r.buf}},{coll:[],buf:t.slice(r,e)},n).coll)})}function p(n,t){return new e(function(r,e){return s(),e+t>r.length?x(e,t+" bytes for "+n):b(e+t,r.slice(e,e+t))})}function h(n,t){if("number"!=typeof(r=t)||Math.floor(r)!==r||t<0||t>6)throw new Error(n+" requires integer length in range [0, 6].");var r;}function d(n){return h("uintBE",n),p("uintBE("+n+")",n).map(function(t){return t.readUIntBE(0,n)})}function v(n){return h("uintLE",n),p("uintLE("+n+")",n).map(function(t){return t.readUIntLE(0,n)})}function g(n){return h("intBE",n),p("intBE("+n+")",n).map(function(t){return t.readIntBE(0,n)})}function m(n){return h("intLE",n),p("intLE("+n+")",n).map(function(t){return t.readIntLE(0,n)})}function y(n){return n instanceof e}function E(n){return "[object Array]"==={}.toString.call(n)}function w(n){return c()&&Buffer.isBuffer(n)}function b(n,t){return {status:!0,index:n,value:t,furthest:-1,expected:[]}}function x(n,t){return E(t)||(t=[t]),{status:!1,index:-1,value:null,furthest:n,expected:t}}function B(n,t){if(!t)return n;if(n.furthest>t.furthest)return n;var r=n.furthest===t.furthest?function(n,t){if(function(){if(void 0!==e._supportsSet)return e._supportsSet;var n="undefined"!=typeof Set;return e._supportsSet=n,n}()&&Array.from){for(var r=new Set(n),u=0;u<t.length;u++)r.add(t[u]);var o=Array.from(r);return o.sort(),o}for(var i={},f=0;f<n.length;f++)i[n[f]]=!0;for(var a=0;a<t.length;a++)i[t[a]]=!0;var c=[];for(var s in i)({}).hasOwnProperty.call(i,s)&&c.push(s);return c.sort(),c}(n.expected,t.expected):t.expected;return {status:n.status,index:n.index,value:n.value,furthest:t.furthest,expected:r}}var j={};function S(n,t){if(w(n))return {offset:t,line:-1,column:-1};n in j||(j[n]={});for(var r=j[n],e=0,u=0,o=0,i=t;i>=0;){if(i in r){e=r[i].line,0===o&&(o=r[i].lineStart);break}"\n"===n.charAt(i)&&(u++,0===o&&(o=i+1)),i--;}var f=e+u,a=t-o;return r[t]={line:f,lineStart:o},{offset:t,line:f+1,column:a+1}}function _(n){if(!y(n))throw new Error("not a parser: "+n)}function L(n,t){return "string"==typeof n?n.charAt(t):n[t]}function O(n){if("number"!=typeof n)throw new Error("not a number: "+n)}function k(n){if("function"!=typeof n)throw new Error("not a function: "+n)}function P(n){if("string"!=typeof n)throw new Error("not a string: "+n)}var q=2,A=3,I=8,F=5*I,M=4*I,z="  ";function R(n,t){return new Array(t+1).join(n)}function U(n,t,r){var e=t-n.length;return e<=0?n:R(r,e)+n}function W(n,t,r,e){return {from:n-t>0?n-t:0,to:n+r>e?e:n+r}}function D(n,t){var r,e,u,o,a,c=t.index,s=c.offset,l=1;if(s===n.length)return "Got the end of the input";if(w(n)){var p=s-s%I,h=s-p,d=W(p,F,M+I,n.length),v=f(function(n){return f(function(n){return U(n.toString(16),2,"0")},n)},function(n,t){var r=n.length,e=[],u=0;if(r<=t)return [n.slice()];for(var o=0;o<r;o++)e[u]||e.push([]),e[u].push(n[o]),(o+1)%t==0&&u++;return e}(n.slice(d.from,d.to).toJSON().data,I));o=function(n){return 0===n.from&&1===n.to?{from:n.from,to:n.to}:{from:n.from/I,to:Math.floor(n.to/I)}}(d),e=p/I,r=3*h,h>=4&&(r+=1),l=2,u=f(function(n){return n.length<=4?n.join(" "):n.slice(0,4).join(" ")+"  "+n.slice(4).join(" ")},v),(a=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(a=2);}else {var g=n.split(/\r\n|[\n\r\u2028\u2029]/);r=c.column-1,e=c.line-1,o=W(e,q,A,g.length),u=g.slice(o.from,o.to),a=o.to.toString().length;}var m=e-o.from;return w(n)&&(a=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(a=2),i(function(t,e,u){var i,f=u===m,c=f?"> ":z;return i=w(n)?U((8*(o.from+u)).toString(16),a,"0"):U((o.from+u+1).toString(),a," "),[].concat(t,[c+i+" | "+e],f?[z+R(" ",a)+" | "+U("",r," ")+R("^",l)]:[])},[],u).join("\n")}function N(n,t){return ["\n","-- PARSING FAILED "+R("-",50),"\n\n",D(n,t),"\n\n",(r=t.expected,1===r.length?"Expected:\n\n"+r[0]:"Expected one of the following: \n\n"+r.join(", ")),"\n"].join("");var r;}function G(n){return void 0!==n.flags?n.flags:[n.global?"g":"",n.ignoreCase?"i":"",n.multiline?"m":"",n.unicode?"u":"",n.sticky?"y":""].join("")}function C(){for(var n=[].slice.call(arguments),t=n.length,r=0;r<t;r+=1)_(n[r]);return e(function(r,e){for(var u,o=new Array(t),i=0;i<t;i+=1){if(!(u=B(n[i]._(r,e),u)).status)return u;o[i]=u.value,e=u.index;}return B(b(e,o),u)})}function J(){var n=[].slice.call(arguments);if(0===n.length)throw new Error("seqMap needs at least one argument");var t=n.pop();return k(t),C.apply(null,n).map(function(n){return t.apply(null,n)})}function T(){var n=[].slice.call(arguments),t=n.length;if(0===t)return Y("zero alternates");for(var r=0;r<t;r+=1)_(n[r]);return e(function(t,r){for(var e,u=0;u<n.length;u+=1)if((e=B(n[u]._(t,r),e)).status)return e;return e})}function V(n,t){return H(n,t).or(X([]))}function H(n,t){return _(n),_(t),J(n,t.then(n).many(),function(n,t){return [n].concat(t)})}function K(n){P(n);var t="'"+n+"'";return e(function(r,e){var u=e+n.length,o=r.slice(e,u);return o===n?b(u,o):x(e,t)})}function Q(n,t){!function(n){if(!(n instanceof RegExp))throw new Error("not a regexp: "+n);for(var t=G(n),r=0;r<t.length;r++){var e=t.charAt(r);if("i"!==e&&"m"!==e&&"u"!==e&&"s"!==e)throw new Error('unsupported regexp flag "'+e+'": '+n)}}(n),arguments.length>=2?O(t):t=0;var r=function(n){return RegExp("^(?:"+n.source+")",G(n))}(n),u=""+n;return e(function(n,e){var o=r.exec(n.slice(e));if(o){if(0<=t&&t<=o.length){var i=o[0],f=o[t];return b(e+i.length,f)}return x(e,"valid match group (0 to "+o.length+") in "+u)}return x(e,u)})}function X(n){return e(function(t,r){return b(r,n)})}function Y(n){return e(function(t,r){return x(r,n)})}function Z(n){if(y(n))return e(function(t,r){var e=n._(t,r);return e.index=r,e.value="",e});if("string"==typeof n)return Z(K(n));if(n instanceof RegExp)return Z(Q(n));throw new Error("not a string, regexp, or parser: "+n)}function $(n){return _(n),e(function(t,r){var e=n._(t,r),u=t.slice(r,e.index);return e.status?x(r,'not "'+u+'"'):b(r,null)})}function nn(n){return k(n),e(function(t,r){var e=L(t,r);return r<t.length&&n(e)?b(r+1,e):x(r,"a character/byte matching "+n)})}function tn(n,t){arguments.length<2&&(t=n,n=void 0);var r=e(function(n,e){return r._=t()._,r._(n,e)});return n?r.desc(n):r}function rn(){return Y("fantasy-land/empty")}u.parse=function(n){if("string"!=typeof n&&!w(n))throw new Error(".parse must be called with a string or Buffer as its argument");var t,r=this.skip(fn)._(n,0);return t=r.status?{status:!0,value:r.value}:{status:!1,index:S(n,r.furthest),expected:r.expected},delete j[n],t},u.tryParse=function(n){var t=this.parse(n);if(t.status)return t.value;var r=N(n,t),e=new Error(r);throw e.type="ParsimmonError",e.result=t,e},u.assert=function(n,t){return this.chain(function(r){return n(r)?X(r):Y(t)})},u.or=function(n){return T(this,n)},u.trim=function(n){return this.wrap(n,n)},u.wrap=function(n,t){return J(n,this,t,function(n,t){return t})},u.thru=function(n){return n(this)},u.then=function(n){return _(n),C(this,n).map(function(n){return n[1]})},u.many=function(){var n=this;return e(function(t,r){for(var e=[],u=void 0;;){if(!(u=B(n._(t,r),u)).status)return B(b(r,e),u);if(r===u.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");r=u.index,e.push(u.value);}})},u.tieWith=function(n){return P(n),this.map(function(t){if(function(n){if(!E(n))throw new Error("not an array: "+n)}(t),t.length){P(t[0]);for(var r=t[0],e=1;e<t.length;e++)P(t[e]),r+=n+t[e];return r}return ""})},u.tie=function(){return this.tieWith("")},u.times=function(n,t){var r=this;return arguments.length<2&&(t=n),O(n),O(t),e(function(e,u){for(var o=[],i=void 0,f=void 0,a=0;a<n;a+=1){if(f=B(i=r._(e,u),f),!i.status)return f;u=i.index,o.push(i.value);}for(;a<t&&(f=B(i=r._(e,u),f),i.status);a+=1)u=i.index,o.push(i.value);return B(b(u,o),f)})},u.result=function(n){return this.map(function(){return n})},u.atMost=function(n){return this.times(0,n)},u.atLeast=function(n){return J(this.times(n),this.many(),function(n,t){return n.concat(t)})},u.map=function(n){k(n);var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(b(u.index,n(u.value)),u):u})},u.contramap=function(n){k(n);var t=this;return e(function(r,e){var u=t.parse(n(r.slice(e)));return u.status?b(e+r.length,u.value):u})},u.promap=function(n,t){return k(n),k(t),this.contramap(n).map(t)},u.skip=function(n){return C(this,n).map(function(n){return n[0]})},u.mark=function(){return J(en,this,en,function(n,t,r){return {start:n,value:t,end:r}})},u.node=function(n){return J(en,this,en,function(t,r,e){return {name:n,value:r,start:t,end:e}})},u.sepBy=function(n){return V(this,n)},u.sepBy1=function(n){return H(this,n)},u.lookahead=function(n){return this.skip(Z(n))},u.notFollowedBy=function(n){return this.skip($(n))},u.desc=function(n){E(n)||(n=[n]);var t=this;return e(function(r,e){var u=t._(r,e);return u.status||(u.expected=n),u})},u.fallback=function(n){return this.or(X(n))},u.ap=function(n){return J(n,this,function(n,t){return n(t)})},u.chain=function(n){var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(n(u.value)._(r,u.index),u):u})},u.concat=u.or,u.empty=rn,u.of=X,u["fantasy-land/ap"]=u.ap,u["fantasy-land/chain"]=u.chain,u["fantasy-land/concat"]=u.concat,u["fantasy-land/empty"]=u.empty,u["fantasy-land/of"]=u.of,u["fantasy-land/map"]=u.map;var en=e(function(n,t){return b(t,S(n,t))}),un=e(function(n,t){return t>=n.length?x(t,"any character/byte"):b(t+1,L(n,t))}),on=e(function(n,t){return b(n.length,n.slice(t))}),fn=e(function(n,t){return t<n.length?x(t,"EOF"):b(t,null)}),an=Q(/[0-9]/).desc("a digit"),cn=Q(/[0-9]*/).desc("optional digits"),sn=Q(/[a-z]/i).desc("a letter"),ln=Q(/[a-z]*/i).desc("optional letters"),pn=Q(/\s*/).desc("optional whitespace"),hn=Q(/\s+/).desc("whitespace"),dn=K("\r"),vn=K("\n"),gn=K("\r\n"),mn=T(gn,vn,dn).desc("newline"),yn=T(mn,fn);e.all=on,e.alt=T,e.any=un,e.cr=dn,e.createLanguage=function(n){var t={};for(var r in n)({}).hasOwnProperty.call(n,r)&&function(r){t[r]=tn(function(){return n[r](t)});}(r);return t},e.crlf=gn,e.custom=function(n){return e(n(b,x))},e.digit=an,e.digits=cn,e.empty=rn,e.end=yn,e.eof=fn,e.fail=Y,e.formatError=N,e.index=en,e.isParser=y,e.lazy=tn,e.letter=sn,e.letters=ln,e.lf=vn,e.lookahead=Z,e.makeFailure=x,e.makeSuccess=b,e.newline=mn,e.noneOf=function(n){return nn(function(t){return n.indexOf(t)<0}).desc("none of '"+n+"'")},e.notFollowedBy=$,e.of=X,e.oneOf=function(n){for(var t=n.split(""),r=0;r<t.length;r++)t[r]="'"+t[r]+"'";return nn(function(t){return n.indexOf(t)>=0}).desc(t)},e.optWhitespace=pn,e.Parser=e,e.range=function(n,t){return nn(function(r){return n<=r&&r<=t}).desc(n+"-"+t)},e.regex=Q,e.regexp=Q,e.sepBy=V,e.sepBy1=H,e.seq=C,e.seqMap=J,e.seqObj=function(){for(var n,t={},r=0,u=(n=arguments,Array.prototype.slice.call(n)),o=u.length,i=0;i<o;i+=1){var f=u[i];if(!y(f)){if(E(f)&&2===f.length&&"string"==typeof f[0]&&y(f[1])){var a=f[0];if(Object.prototype.hasOwnProperty.call(t,a))throw new Error("seqObj: duplicate key "+a);t[a]=!0,r++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(0===r)throw new Error("seqObj expects at least one named parser, found zero");return e(function(n,t){for(var r,e={},i=0;i<o;i+=1){var f,a;if(E(u[i])?(f=u[i][0],a=u[i][1]):(f=null,a=u[i]),!(r=B(a._(n,t),r)).status)return r;f&&(e[f]=r.value),t=r.index;}return B(b(t,e),r)})},e.string=K,e.succeed=X,e.takeWhile=function(n){return k(n),e(function(t,r){for(var e=r;e<t.length&&n(L(t,e));)e++;return b(e,t.slice(r,e))})},e.test=nn,e.whitespace=hn,e["fantasy-land/empty"]=rn,e["fantasy-land/of"]=X,e.Binary={bitSeq:l,bitSeqObj:function(n){s();var t={},r=0,e=f(function(n){if(E(n)){var e=n;if(2!==e.length)throw new Error("["+e.join(", ")+"] should be length 2, got length "+e.length);if(P(e[0]),O(e[1]),Object.prototype.hasOwnProperty.call(t,e[0]))throw new Error("duplicate key in bitSeqObj: "+e[0]);return t[e[0]]=!0,r++,e}return O(n),[null,n]},n);if(r<1)throw new Error("bitSeqObj expects at least one named pair, got ["+n.join(", ")+"]");var u=f(function(n){return n[0]},e);return l(f(function(n){return n[1]},e)).map(function(n){return i(function(n,t){return null!==t[0]&&(n[t[0]]=t[1]),n},{},f(function(t,r){return [t,n[r]]},u))})},byte:function(n){if(s(),O(n),n>255)throw new Error("Value specified to byte constructor ("+n+"=0x"+n.toString(16)+") is larger in value than a single byte.");var t=(n>15?"0x":"0x0")+n.toString(16);return e(function(r,e){var u=L(r,e);return u===n?b(e+1,u):x(e,t)})},buffer:function(n){return p("buffer",n).map(function(n){return Buffer.from(n)})},encodedString:function(n,t){return p("string",t).map(function(t){return t.toString(n)})},uintBE:d,uint8BE:d(1),uint16BE:d(2),uint32BE:d(4),uintLE:v,uint8LE:v(1),uint16LE:v(2),uint32LE:v(4),intBE:g,int8BE:g(1),int16BE:g(2),int32BE:g(4),intLE:m,int8LE:m(1),int16LE:m(2),int32LE:m(4),floatBE:p("floatBE",4).map(function(n){return n.readFloatBE(0)}),floatLE:p("floatLE",4).map(function(n){return n.readFloatLE(0)}),doubleBE:p("doubleBE",8).map(function(n){return n.readDoubleBE(0)}),doubleLE:p("doubleLE",8).map(function(n){return n.readDoubleLE(0)})},n.exports=e;}])});
}(parsimmon_umd_min));

var Parsimmon = /*@__PURE__*/getDefaultExportFromCjs(parsimmon_umd_min.exports);

let P = Parsimmon;

class Grammar {
    // General
    InlineWhitespace = _ => P.regex(/[^\S\n]+/).desc("inline whitespace")
    InlineOptWhitespace = _ => P.regex(/[^\S\n]*/).desc("inline optional whitespace")
    WhitespaceNewline = _ => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")
    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(_ => null).desc("null: ()")
    None = _ => P.string("None").map(_ => new ObjectReference("None", "")).desc("none")
    Boolean = _ => P.alt(P.string("True"), P.string("False")).map(v => v === "True" ? true : false).desc("either True or False")
    Number = _ => P.regex(/[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")
    Integer = _ => P.regex(/[0-9]+/).map(v => new Integer(v)).desc("an integer")
    String = _ => P.regex(/(?:[^"\\]|\\")*/).wrap(P.string('"'), P.string('"')).desc('string (with possibility to escape the quote using \")')
    Word = _ => P.regex(/[a-zA-Z]+/).desc("a word")
    Guid = _ => P.regex(/[0-9a-zA-Z]{32}/).map(v => new Guid(v)).desc("32 digit hexadecimal (accepts all the letters for safety) value")
    PathSymbol = _ => P.regex(/[0-9a-zA-Z_]+/)
    ReferencePath = r => P.seq(P.string("/"), r.PathSymbol.sepBy1(P.string(".")).tieWith("."))
        .tie()
        .atLeast(2)
        .tie()
        .desc('a path (words with possibly underscore, separated by ".", separated by "/")')
    Reference = r => P.alt(
        r.None,
        r.ReferencePath.map(path => new ObjectReference("", path)),
        P.seqMap(
            r.Word,
            P.optWhitespace,
            P.alt(P.string(`"`), P.string(`'"`)).chain(
                result => r.ReferencePath.skip(
                    P.string(result.split("").reverse().join(""))
                )
            ),
            (referenceType, _, referencePath) => new ObjectReference(referenceType, referencePath)
        )
    )
    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc('words separated by ""')
    AttributeAnyValue = r => P.alt(r.Null, r.None, r.Boolean, r.Number, r.Integer, r.String, r.Guid, r.Reference, r.LocalizedText)
    LocalizedText = r => P.seqMap(
        P.string("NSLOCTEXT").skip(P.optWhitespace).skip(P.string("(")),
        r.String.trim(P.optWhitespace), // namespace
        P.string(","),
        r.String.trim(P.optWhitespace), // key
        P.string(","),
        r.String.trim(P.optWhitespace), // value
        P.string(")"),
        (_, namespace, __, key, ___, value, ____) => new LocalizedTextEntity(namespace, key, value)
    )
    PinReference = r => P.seqMap(
        r.PathSymbol,
        P.whitespace,
        r.Guid,
        (objectName, _, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid
        })
    )
    static getGrammarForType(r, attributeType, defaultGrammar) {
        switch (Utility.getType(attributeType)) {
            case Boolean:
                return r.Boolean
            case Number:
                return r.Number
            case Integer:
                return r.Integer
            case String:
                return r.String
            case Guid:
                return r.Guid
            case ObjectReference:
                return r.Reference
            case LocalizedTextEntity:
                return r.LocalizedText
            case PinReferenceEntity:
                return r.PinReference
            case FunctionReferenceEntity:
                return r.FunctionReference
            case PinEntity:
                return r.Pin
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
            default:
                return defaultGrammar
        }
    }
    // Meta grammar
    static CreateAttributeGrammar = (r, attributeGrammar, attributeSupplier, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
        attributeGrammar.skip(valueSeparator)
            .chain(attributeName => {
                const attributeKey = attributeName.split(".");
                const attribute = attributeSupplier(attributeKey);
                let attributeValueGrammar = Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue);
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                ) // returns attributeSetter:  a function called with an object as argument that will set the correct attribute value
            })
    // Meta grammar
    static CreateMultiAttributeGrammar = (r, keyGrammar, entityType, attributeSupplier) =>
        /**
         * Basically this creates a parser that looks for a string like 'Key (A=False,B="Something",)'
         * Then it populates an object of type EntityType with the attribute values found inside the parentheses.
         */
        P.seqMap(
            P.seq(keyGrammar, P.optWhitespace, P.string("(")),
            Grammar.CreateAttributeGrammar(r, r.AttributeName, attributeSupplier)
                .trim(P.optWhitespace)
                .sepBy(P.string(","))
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma
            P.string(')'),
            (_, attributes, __) => {
                let result = new entityType();
                attributes.forEach(attributeSetter => attributeSetter(result));
                return result
            })
    FunctionReference = r => Grammar.CreateMultiAttributeGrammar(
        r,
        P.succeed(),
        FunctionReferenceEntity,
        attributeKey => Utility.objectGet(FunctionReferenceEntity.attributes, attributeKey)
    )
    Pin = r => Grammar.CreateMultiAttributeGrammar(
        r,
        P.string("Pin"),
        PinEntity,
        attributeKey => Utility.objectGet(PinEntity.attributes, attributeKey)
    )
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

    Object = r => P.seqMap(
        P.seq(P.string("Begin"), P.whitespace, P.string("Object"), P.whitespace),
        P.alt(
            r.CustomProperties,
            Grammar.CreateAttributeGrammar(r, r.AttributeName, attributeKey => Utility.objectGet(ObjectEntity.attributes, attributeKey))
        )
            .sepBy1(P.whitespace),
        P.seq(r.WhitespaceNewline, P.string("End"), P.whitespace, P.string("Object")),
        (_, attributes, __) => {
            let result = new ObjectEntity();
            attributes.forEach(attributeSetter => attributeSetter(result));
            return result
        }
    )
    MultipleObject = r => r.Object.sepBy1(P.whitespace).trim(P.optWhitespace)
}

class SerializerFactory {

    static #serializers = new Map()

    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object);
    }

    static getSerializer(entity) {
        return SerializerFactory.#serializers.get(Utility.getType(entity))
    }
}

class Serializer {

    static grammar = Parsimmon.createLanguage(new Grammar())

    constructor(entityType, prefix = "", separator = ",", trailingSeparator = false) {
        this.entityType = entityType;
        this.prefix = prefix;
        this.separator = separator;
        this.trailingSeparator = trailingSeparator;
    }

    writeValue(value) {
        if (value === null) {
            return "()"
        }
        switch (value?.constructor) {
            case Function:
                return this.writeValue(value())
            case Boolean:
                return Utility.FirstCapital(value.toString())
            case Number:
                return value.toString()
            case String:
                return `"${value}"`
        }
        if (value instanceof Entity) {
            return SerializerFactory.getSerializer(Utility.getType(value)).write(value)
        }
        if (value instanceof Primitive) {
            return value.toString()
        }
    }

    subWrite(key, object) {
        let result = "";
        let fullKey = key.concat("");
        const last = fullKey.length - 1;
        for (const property in object) {
            fullKey[last] = property;
            const value = object[property];
            if (object[property]?.constructor === Object) {
                // Recursive call when finding an object
                result += this.subWrite(fullKey, value, this.prefix, this.separator);
            } else if (this.showProperty(fullKey, value)) {
                result += (result.length ? this.separator : "") + this.prefix + fullKey.join(".") + "=" + this.writeValue(value);
            }
        }
        if (this.trailingSeparator && result.length) {
            // append separator at the end if asked and there was printed content
            result += this.separator;
        }
        return result
    }

    showProperty(attributeKey, attributeValue) {
        const attributes = this.entityType.attributes;
        const attribute = Utility.objectGet(attributes, attributeKey);
        if (attribute instanceof TypeInitialization) {
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}

class GeneralSerializer extends Serializer {

    constructor(keyword = "", entityType, prefix = "", separator = ",", trailingSeparator = false) {
        super(entityType, prefix, separator, trailingSeparator);
        this.keyword = keyword;
    }

    read(value) {
        let grammar = Grammar.getGrammarForType(Serializer.grammar, this.entityType);
        const parseResult = grammar.parse(value);
        if (!parseResult.status) {
            console.error("Error when trying to parse the entity " + this.entityType.prototype.constructor.name);
            return parseResult
        }
        return parseResult.value
    }

    write(object) {
        let result = `${this.key ?? ""}(${this.subWrite([], object)})`;
        return result
    }
}

class ObjectSerializer extends Serializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false);
    }

    showProperty(attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately
                return false
        }
        return super.showProperty(attributeKey, attributeValue)
    }

    read(value) {
        const parseResult = Serializer.grammar.Object.parse(value);
        if (!parseResult.status) {
            console.error("Error when trying to parse the object.");
            return parseResult
        }
        return parseResult.value
    }

    /**
     * 
     * @param {ObjectEntity} object 
     * @returns 
     */
    write(object) {
        let result = `Begin Object Class=${object.Class} Name=${object.Name}
${this.subWrite([], object)
            + object
                .CustomProperties.map(pin => this.separator + this.prefix + "CustomProperties " + SerializerFactory.getSerializer(PinEntity).write(pin))
                .join("")}
End Object`;
        return result
    }
}

SerializerFactory.registerSerializer(ObjectEntity, new ObjectSerializer());
SerializerFactory.registerSerializer(PinEntity, new GeneralSerializer("Pin ", PinEntity, "", ",", true));
SerializerFactory.registerSerializer(FunctionReferenceEntity, new GeneralSerializer("", FunctionReferenceEntity, "", ",", false));

export { ObjectEntity, SerializerFactory };
