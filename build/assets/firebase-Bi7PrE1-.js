import{_ as Ra,a as $m,b as $c}from"./tslib-DMafyLhP.js";import{o as Gm}from"./idb-BXWtuYvb.js";var Gc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qh=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},zm=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],u=r[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|u&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Yh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,u=o?r[s+1]:0,c=s+2<r.length,h=c?r[s+2]:0,f=i>>2,p=(i&3)<<4|u>>4;let _=(u&15)<<2|h>>6,w=h&63;c||(w=64,o||(_=64)),n.push(t[f],t[p],t[_],t[w])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Qh(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):zm(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],u=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const p=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||u==null||h==null||p==null)throw new Km;const _=i<<2|u>>4;if(n.push(_),h!==64){const w=u<<4&240|h>>2;if(n.push(w),p!==64){const C=h<<6&192|p;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Km extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Hm=function(r){const e=Qh(r);return Yh.encodeByteArray(e,!0)},gi=function(r){return Hm(r).replace(/\./g,"")},Jh=function(r){try{return Yh.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wm(){if(typeof self<"u")return self;if(typeof window<"u"||typeof window<"u")return window;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qm=()=>Wm().__FIREBASE_DEFAULTS__,Ym=()=>{if(typeof process>"u"||typeof Gc>"u")return;const r=Gc.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Jm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Jh(r[1]);return e&&JSON.parse(e)},Ui=()=>{try{return Qm()||Ym()||Jm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Xh=r=>{var e,t;return(t=(e=Ui())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},ba=r=>{const e=Xh(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Zh=()=>{var r;return(r=Ui())===null||r===void 0?void 0:r.config},ed=r=>{var e;return(e=Ui())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function td(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},r);return[gi(JSON.stringify(t)),gi(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zm(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_e())}function eg(){var r;const e=(r=Ui())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(window.process)==="[object process]"}catch{return!1}}function tg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ng(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function rg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function sg(){const r=_e();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function nd(){return!eg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function rd(){try{return typeof indexedDB=="object"}catch{return!1}}function ig(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const og="FirebaseError";class He extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=og,Object.setPrototypeOf(this,He.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,hs.prototype.create)}}class hs{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?ag(i,n):"Error",u=`${this.serviceName}: ${o} (${s}).`;return new He(s,u,n)}}function ag(r,e){return r.replace(ug,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const ug=/\{\$([^}]+)}/g;function cg(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function ln(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(zc(i)&&zc(o)){if(!ln(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function zc(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ds(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function lg(r,e){const t=new hg(r,e);return t.subscribe.bind(t)}class hg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");dg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=xo),s.error===void 0&&(s.error=xo),s.complete===void 0&&(s.complete=xo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function dg(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function xo(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(r){return r&&r._delegate?r._delegate:r}class rt{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Xm;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(mg(e))try{this.getOrInitializeService({instanceIdentifier:en})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=en){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=en){return this.instances.has(e)}getOptions(e=en){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&o.resolve(s)}return s}onInit(e,t){var n;const s=this.normalizeInstanceIdentifier(t),i=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:pg(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=en){return this.component?this.component.multipleInstances?e:en:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function pg(r){return r===en?void 0:r}function mg(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gg{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new fg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(Q||(Q={}));const _g={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},yg=Q.INFO,Ig={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},Tg=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=Ig[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Sa{constructor(e){this.name=e,this._logLevel=yg,this._logHandler=Tg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?_g[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Eg(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Eg(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ko="@firebase/app",Kc="0.10.15";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new Sa("@firebase/app"),wg="@firebase/app-compat",Ag="@firebase/analytics-compat",Rg="@firebase/analytics",bg="@firebase/app-check-compat",Sg="@firebase/app-check",Pg="@firebase/auth",Cg="@firebase/auth-compat",kg="@firebase/database",Dg="@firebase/data-connect",Vg="@firebase/database-compat",Ng="@firebase/functions",xg="@firebase/functions-compat",Og="@firebase/installations",Mg="@firebase/installations-compat",Lg="@firebase/messaging",Fg="@firebase/messaging-compat",Ug="@firebase/performance",Bg="@firebase/performance-compat",qg="@firebase/remote-config",jg="@firebase/remote-config-compat",$g="@firebase/storage",Gg="@firebase/storage-compat",zg="@firebase/firestore",Kg="@firebase/vertexai",Hg="@firebase/firestore-compat",Wg="firebase",Qg="11.0.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ho="[DEFAULT]",Yg={[Ko]:"fire-core",[wg]:"fire-core-compat",[Rg]:"fire-analytics",[Ag]:"fire-analytics-compat",[Sg]:"fire-app-check",[bg]:"fire-app-check-compat",[Pg]:"fire-auth",[Cg]:"fire-auth-compat",[kg]:"fire-rtdb",[Dg]:"fire-data-connect",[Vg]:"fire-rtdb-compat",[Ng]:"fire-fn",[xg]:"fire-fn-compat",[Og]:"fire-iid",[Mg]:"fire-iid-compat",[Lg]:"fire-fcm",[Fg]:"fire-fcm-compat",[Ug]:"fire-perf",[Bg]:"fire-perf-compat",[qg]:"fire-rc",[jg]:"fire-rc-compat",[$g]:"fire-gcs",[Gg]:"fire-gcs-compat",[zg]:"fire-fst",[Hg]:"fire-fst-compat",[Kg]:"fire-vertex","fire-js":"fire-js",[Wg]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=new Map,Jg=new Map,Wo=new Map;function Hc(r,e){try{r.container.addComponent(e)}catch(t){mt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function gt(r){const e=r.name;if(Wo.has(e))return mt.debug(`There were multiple attempts to register component ${e}.`),!1;Wo.set(e,r);for(const t of _i.values())Hc(t,r);for(const t of Jg.values())Hc(t,r);return!0}function En(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Lt(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ut=new hs("app","Firebase",Xg);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new rt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ut.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=Qg;function e_(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:Ho,automaticDataCollectionEnabled:!1},e),s=n.name;if(typeof s!="string"||!s)throw Ut.create("bad-app-name",{appName:String(s)});if(t||(t=Zh()),!t)throw Ut.create("no-options");const i=_i.get(s);if(i){if(ln(t,i.options)&&ln(n,i.config))return i;throw Ut.create("duplicate-app",{appName:s})}const o=new gg(s);for(const c of Wo.values())o.addComponent(c);const u=new Zg(t,n,o);return _i.set(s,u),u}function fs(r=Ho){const e=_i.get(r);if(!e&&r===Ho&&Zh())return e_();if(!e)throw Ut.create("no-app",{appName:r});return e}function qe(r,e,t){var n;let s=(n=Yg[r])!==null&&n!==void 0?n:r;t&&(s+=`-${t}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const u=[`Unable to register library "${s}" with version "${e}":`];i&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&u.push("and"),o&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),mt.warn(u.join(" "));return}gt(new rt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t_="firebase-heartbeat-database",n_=1,Jr="firebase-heartbeat-store";let Oo=null;function sd(){return Oo||(Oo=Gm(t_,n_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Jr)}catch(t){console.warn(t)}}}}).catch(r=>{throw Ut.create("idb-open",{originalErrorMessage:r.message})})),Oo}async function r_(r){try{const t=(await sd()).transaction(Jr),n=await t.objectStore(Jr).get(id(r));return await t.done,n}catch(e){if(e instanceof He)mt.warn(e.message);else{const t=Ut.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});mt.warn(t.message)}}}async function Wc(r,e){try{const n=(await sd()).transaction(Jr,"readwrite");await n.objectStore(Jr).put(e,id(r)),await n.done}catch(t){if(t instanceof He)mt.warn(t.message);else{const n=Ut.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});mt.warn(n.message)}}}function id(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_=1024,i_=30*24*60*60*1e3;class o_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new u_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Qc();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const u=new Date(o.date).valueOf();return Date.now()-u<=i_}),this._storage.overwrite(this._heartbeatsCache))}catch(n){mt.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Qc(),{heartbeatsToSend:n,unsentEntries:s}=a_(this._heartbeatsCache.heartbeats),i=gi(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return mt.warn(t),""}}}function Qc(){return new Date().toISOString().substring(0,10)}function a_(r,e=s_){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Yc(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Yc(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class u_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return rd()?ig().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await r_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Yc(r){return gi(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function c_(r){gt(new rt("platform-logger",e=>new vg(e),"PRIVATE")),gt(new rt("heartbeat",e=>new o_(e),"PRIVATE")),qe(Ko,Kc,r),qe(Ko,Kc,"esm2017"),qe("fire-js","")}c_("");var l_="firebase",h_="11.0.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe(l_,h_,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const d_="type.googleapis.com/google.protobuf.Int64Value",f_="type.googleapis.com/google.protobuf.UInt64Value";function od(r,e){const t={};for(const n in r)r.hasOwnProperty(n)&&(t[n]=e(r[n]));return t}function Qo(r){if(r==null)return null;if(r instanceof Number&&(r=r.valueOf()),typeof r=="number"&&isFinite(r)||r===!0||r===!1||Object.prototype.toString.call(r)==="[object String]")return r;if(r instanceof Date)return r.toISOString();if(Array.isArray(r))return r.map(e=>Qo(e));if(typeof r=="function"||typeof r=="object")return od(r,e=>Qo(e));throw new Error("Data cannot be encoded in JSON: "+r)}function yi(r){if(r==null)return r;if(r["@type"])switch(r["@type"]){case d_:case f_:{const e=Number(r.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+r);return e}default:throw new Error("Data cannot be decoded from JSON: "+r)}return Array.isArray(r)?r.map(e=>yi(e)):typeof r=="function"||typeof r=="object"?od(r,e=>yi(e)):r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pa="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class Bt extends He{constructor(e,t,n){super(`${Pa}/${e}`,t||""),this.details=n,Object.setPrototypeOf(this,Bt.prototype)}}function p_(r){if(r>=200&&r<300)return"ok";switch(r){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function m_(r,e){let t=p_(r),n=t,s;try{const i=e&&e.error;if(i){const o=i.status;if(typeof o=="string"){if(!Jc[o])return new Bt("internal","internal");t=Jc[o],n=o}const u=i.message;typeof u=="string"&&(n=u),s=i.details,s!==void 0&&(s=yi(s))}}catch{}return t==="ok"?null:new Bt(t,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{constructor(e,t,n){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=t.getImmediate({optional:!0}),this.auth||e.get().then(s=>this.auth=s,()=>{}),this.messaging||t.get().then(s=>this.messaging=s,()=>{}),this.appCheck||n.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.appCheck){const t=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return t.error?null:t.token}return null}async getContext(e){const t=await this.getAuthToken(),n=await this.getMessagingToken(),s=await this.getAppCheckToken(e);return{authToken:t,messagingToken:n,appCheckToken:s}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yo="us-central1";function __(r){let e=null;return{promise:new Promise((t,n)=>{e=setTimeout(()=>{n(new Bt("deadline-exceeded","deadline-exceeded"))},r)}),cancel:()=>{e&&clearTimeout(e)}}}class y_{constructor(e,t,n,s,i=Yo){this.app=e,this.emulatorOrigin=null,this.contextProvider=new g_(t,n,s),this.cancelAllRequests=new Promise(o=>{this.deleteService=()=>Promise.resolve(o())});try{const o=new URL(i);this.customDomain=o.origin+(o.pathname==="/"?"":o.pathname),this.region=Yo}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){const t=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${t}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${t}.cloudfunctions.net/${e}`}}function I_(r,e,t){r.emulatorOrigin=`http://${e}:${t}`}function T_(r,e,t){return n=>E_(r,e,n,{})}async function v_(r,e,t){t["Content-Type"]="application/json";let n;try{n=await fetch(r,{method:"POST",body:JSON.stringify(e),headers:t})}catch{return{status:0,json:null}}let s=null;try{s=await n.json()}catch{}return{status:n.status,json:s}}function E_(r,e,t,n){const s=r._url(e);return w_(r,s,t,n)}async function w_(r,e,t,n){t=Qo(t);const s={data:t},i={},o=await r.contextProvider.getContext(n.limitedUseAppCheckTokens);o.authToken&&(i.Authorization="Bearer "+o.authToken),o.messagingToken&&(i["Firebase-Instance-ID-Token"]=o.messagingToken),o.appCheckToken!==null&&(i["X-Firebase-AppCheck"]=o.appCheckToken);const u=n.timeout||7e4,c=__(u),h=await Promise.race([v_(e,s,i),c.promise,r.cancelAllRequests]);if(c.cancel(),!h)throw new Bt("cancelled","Firebase Functions instance was deleted.");const f=m_(h.status,h.json);if(f)throw f;if(!h.json)throw new Bt("internal","Response is not valid JSON object.");let p=h.json.data;if(typeof p>"u"&&(p=h.json.result),typeof p>"u")throw new Bt("internal","Response is missing data field.");return{data:yi(p)}}const Xc="@firebase/functions",Zc="0.11.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A_="auth-internal",R_="app-check-internal",b_="messaging-internal";function S_(r){const e=(t,{instanceIdentifier:n})=>{const s=t.getProvider("app").getImmediate(),i=t.getProvider(A_),o=t.getProvider(b_),u=t.getProvider(R_);return new y_(s,i,o,u,n)};gt(new rt(Pa,e,"PUBLIC").setMultipleInstances(!0)),qe(Xc,Zc,r),qe(Xc,Zc,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FA(r=fs(),e=Yo){const n=En(ee(r),Pa).getImmediate({identifier:e}),s=ba("functions");return s&&P_(n,...s),n}function P_(r,e,t){I_(ee(r),e,t)}function UA(r,e,t){return T_(ee(r),e)}S_();function ad(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const C_=ad,ud=new hs("auth","Firebase",ad());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii=new Sa("@firebase/auth");function k_(r,...e){Ii.logLevel<=Q.WARN&&Ii.warn(`Auth (${wn}): ${r}`,...e)}function ni(r,...e){Ii.logLevel<=Q.ERROR&&Ii.error(`Auth (${wn}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(r,...e){throw Ca(r,...e)}function et(r,...e){return Ca(r,...e)}function cd(r,e,t){const n=Object.assign(Object.assign({},C_()),{[e]:t});return new hs("auth","Firebase",n).create(e,{appName:r.name})}function an(r){return cd(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ca(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return ud.create(r,...e)}function G(r,e,...t){if(!r)throw Ca(e,...t)}function lt(r){const e="INTERNAL ASSERTION FAILED: "+r;throw ni(e),new Error(e)}function yt(r,e){r||lt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function D_(){return el()==="http:"||el()==="https:"}function el(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(D_()||ng()||"connection"in navigator)?navigator.onLine:!0}function N_(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ps{constructor(e,t){this.shortDelay=e,this.longDelay=t,yt(t>e,"Short delay should be less than long delay!"),this.isMobile=Zm()||rg()}get(){return V_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ka(r,e){yt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;lt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;lt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;lt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const O_=new ps(3e4,6e4);function Da(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function or(r,e,t,n,s={}){return hd(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const u=ds(Object.assign({key:r.config.apiKey},o)).slice(1),c=await r._getAdditionalHeaders();c["Content-Type"]="application/json",r.languageCode&&(c["X-Firebase-Locale"]=r.languageCode);const h=Object.assign({method:e,headers:c},i);return tg()||(h.referrerPolicy="no-referrer"),ld.fetch()(dd(r,r.config.apiHost,t,u),h)})}async function hd(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},x_),e);try{const s=new L_(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Hs(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const u=i.ok?o.errorMessage:o.error.message,[c,h]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Hs(r,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Hs(r,"email-already-in-use",o);if(c==="USER_DISABLED")throw Hs(r,"user-disabled",o);const f=n[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw cd(r,f,h);_t(r,f)}}catch(s){if(s instanceof He)throw s;_t(r,"network-request-failed",{message:String(s)})}}async function M_(r,e,t,n,s={}){const i=await or(r,e,t,n,s);return"mfaPendingCredential"in i&&_t(r,"multi-factor-auth-required",{_serverResponse:i}),i}function dd(r,e,t,n){const s=`${e}${t}?${n}`;return r.config.emulator?ka(r.config,s):`${r.config.apiScheme}://${s}`}class L_{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(et(this.auth,"network-request-failed")),O_.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Hs(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=et(r,e,n);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function F_(r,e){return or(r,"POST","/v1/accounts:delete",e)}async function fd(r,e){return or(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function U_(r,e=!1){const t=ee(r),n=await t.getIdToken(e),s=Va(n);G(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:Gr(Mo(s.auth_time)),issuedAtTime:Gr(Mo(s.iat)),expirationTime:Gr(Mo(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Mo(r){return Number(r)*1e3}function Va(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return ni("JWT malformed, contained fewer than 3 sections"),null;try{const s=Jh(t);return s?JSON.parse(s):(ni("Failed to decode base64 JWT payload"),null)}catch(s){return ni("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function tl(r){const e=Va(r);return G(e,"internal-error"),G(typeof e.exp<"u","internal-error"),G(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xr(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof He&&B_(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function B_({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Gr(this.lastLoginAt),this.creationTime=Gr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ti(r){var e;const t=r.auth,n=await r.getIdToken(),s=await Xr(r,fd(t,{idToken:n}));G(s==null?void 0:s.users.length,t,"internal-error");const i=s.users[0];r._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?pd(i.providerUserInfo):[],u=$_(r.providerData,o),c=r.isAnonymous,h=!(r.email&&i.passwordHash)&&!(u!=null&&u.length),f=c?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:u,metadata:new Xo(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(r,p)}async function j_(r){const e=ee(r);await Ti(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function $_(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function pd(r){return r.map(e=>{var{providerId:t}=e,n=Ra(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G_(r,e){const t=await hd(r,{},async()=>{const n=ds({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=dd(r,s,"/v1/token",`key=${i}`),u=await r._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",ld.fetch()(o,{method:"POST",headers:u,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function z_(r,e){return or(r,"POST","/v2/accounts:revokeToken",Da(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){G(e.idToken,"internal-error"),G(typeof e.idToken<"u","internal-error"),G(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):tl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){G(e.length!==0,"internal-error");const t=tl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(G(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await G_(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new Kn;return n&&(G(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(G(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(G(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Kn,this.toJSON())}_performRefresh(){return lt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(r,e){G(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class ht{constructor(e){var{uid:t,auth:n,stsTokenManager:s}=e,i=Ra(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new q_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Xo(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Xr(this,this.stsTokenManager.getToken(this.auth,e));return G(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return U_(this,e)}reload(){return j_(this)}_assign(e){this!==e&&(G(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ht(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){G(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Ti(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Lt(this.auth.app))return Promise.reject(an(this.auth));const e=await this.getIdToken();return await Xr(this,F_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,s,i,o,u,c,h,f;const p=(n=t.displayName)!==null&&n!==void 0?n:void 0,_=(s=t.email)!==null&&s!==void 0?s:void 0,w=(i=t.phoneNumber)!==null&&i!==void 0?i:void 0,C=(o=t.photoURL)!==null&&o!==void 0?o:void 0,V=(u=t.tenantId)!==null&&u!==void 0?u:void 0,k=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,q=(h=t.createdAt)!==null&&h!==void 0?h:void 0,B=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:M,emailVerified:j,isAnonymous:W,providerData:z,stsTokenManager:T}=t;G(M&&T,e,"internal-error");const g=Kn.fromJSON(this.name,T);G(typeof M=="string",e,"internal-error"),Pt(p,e.name),Pt(_,e.name),G(typeof j=="boolean",e,"internal-error"),G(typeof W=="boolean",e,"internal-error"),Pt(w,e.name),Pt(C,e.name),Pt(V,e.name),Pt(k,e.name),Pt(q,e.name),Pt(B,e.name);const y=new ht({uid:M,auth:e,email:_,emailVerified:j,displayName:p,isAnonymous:W,photoURL:C,phoneNumber:w,tenantId:V,stsTokenManager:g,createdAt:q,lastLoginAt:B});return z&&Array.isArray(z)&&(y.providerData=z.map(v=>Object.assign({},v))),k&&(y._redirectEventId=k),y}static async _fromIdTokenResponse(e,t,n=!1){const s=new Kn;s.updateFromServerResponse(t);const i=new ht({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Ti(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];G(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?pd(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),u=new Kn;u.updateFromIdToken(n);const c=new ht({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Xo(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl=new Map;function dt(r){yt(r instanceof Function,"Expected a class definition");let e=nl.get(r);return e?(yt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,nl.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}md.type="NONE";const rl=md;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ri(r,e,t){return`firebase:${r}:${e}:${t}`}class Hn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=ri(this.userKey,s.apiKey,i),this.fullPersistenceKey=ri("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ht._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Hn(dt(rl),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||dt(rl);const o=ri(n,e.config.apiKey,e.name);let u=null;for(const h of t)try{const f=await h._get(o);if(f){const p=ht._fromJSON(e,f);h!==i&&(u=p),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new Hn(i,e,n):(i=c[0],u&&await i._set(o,u.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Hn(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Id(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(gd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(vd(e))return"Blackberry";if(Ed(e))return"Webos";if(_d(e))return"Safari";if((e.includes("chrome/")||yd(e))&&!e.includes("edge/"))return"Chrome";if(Td(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function gd(r=_e()){return/firefox\//i.test(r)}function _d(r=_e()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function yd(r=_e()){return/crios\//i.test(r)}function Id(r=_e()){return/iemobile/i.test(r)}function Td(r=_e()){return/android/i.test(r)}function vd(r=_e()){return/blackberry/i.test(r)}function Ed(r=_e()){return/webos/i.test(r)}function Na(r=_e()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function K_(r=_e()){var e;return Na(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function H_(){return sg()&&document.documentMode===10}function wd(r=_e()){return Na(r)||Td(r)||Ed(r)||vd(r)||/windows phone/i.test(r)||Id(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(r,e=[]){let t;switch(r){case"Browser":t=sl(_e());break;case"Worker":t=`${sl(_e())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${wn}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,u)=>{try{const c=e(i);o(c)}catch(c){u(c)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q_(r,e={}){return or(r,"GET","/v2/passwordPolicy",Da(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y_=6;class J_{constructor(e){var t,n,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Y_,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,s,i,o,u;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(n=c.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(u=c.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),c}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X_{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new il(this),this.idTokenSubscription=new il(this),this.beforeStateQueue=new W_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ud,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=dt(t)),this._initializationPromise=this.queue(async()=>{var n,s;if(!this._deleted&&(this.persistenceManager=await Hn.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await fd(this,{idToken:e}),n=await ht._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Lt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(u,u))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let s=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===u)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return G(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ti(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=N_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Lt(this.app))return Promise.reject(an(this));const t=e?ee(e):null;return t&&G(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&G(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Lt(this.app)?Promise.reject(an(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Lt(this.app)?Promise.reject(an(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Q_(this),t=new J_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new hs("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await z_(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&dt(e)||this._popupRedirectResolver;G(t,this,"argument-error"),this.redirectPersistenceManager=await Hn.create(this,[dt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(G(u,this,"internal-error"),u.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,n,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return G(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ad(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&k_(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function xa(r){return ee(r)}class il{constructor(e){this.auth=e,this.observer=null,this.addObserver=lg(t=>this.observer=t)}get next(){return G(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Oa={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Z_(r){Oa=r}function ey(r){return Oa.loadJS(r)}function ty(){return Oa.gapiScript}function ny(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ry(r,e){const t=En(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(ln(i,e??{}))return s;_t(s,"already-initialized")}return t.initialize({options:e})}function sy(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(dt);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function iy(r,e,t){const n=xa(r);G(n._canInitEmulator,n,"emulator-config-failed"),G(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=Rd(e),{host:o,port:u}=oy(e),c=u===null?"":`:${u}`;n.config.emulator={url:`${i}//${o}${c}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:o,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),ay()}function Rd(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function oy(r){const e=Rd(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:ol(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:ol(o)}}}function ol(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function ay(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return lt("not implemented")}_getIdTokenResponse(e){return lt("not implemented")}_linkToIdToken(e,t){return lt("not implemented")}_getReauthenticationResolver(e){return lt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wn(r,e){return M_(r,"POST","/v1/accounts:signInWithIdp",Da(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy="http://localhost";class hn extends bd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new hn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):_t("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s}=t,i=Ra(t,["providerId","signInMethod"]);if(!n||!s)return null;const o=new hn(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Wn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Wn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Wn(e,t)}buildRequest(){const e={requestUri:uy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ds(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ms extends Sd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends ms{constructor(){super("facebook.com")}static credential(e){return hn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dt.credential(e.oauthAccessToken)}catch{return null}}}Dt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt extends ms{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return hn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Vt.credential(t,n)}catch{return null}}}Vt.GOOGLE_SIGN_IN_METHOD="google.com";Vt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt extends ms{constructor(){super("github.com")}static credential(e){return hn._fromParams({providerId:Nt.PROVIDER_ID,signInMethod:Nt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Nt.credentialFromTaggedObject(e)}static credentialFromError(e){return Nt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Nt.credential(e.oauthAccessToken)}catch{return null}}}Nt.GITHUB_SIGN_IN_METHOD="github.com";Nt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt extends ms{constructor(){super("twitter.com")}static credential(e,t){return hn._fromParams({providerId:xt.PROVIDER_ID,signInMethod:xt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return xt.credentialFromTaggedObject(e)}static credentialFromError(e){return xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return xt.credential(t,n)}catch{return null}}}xt.TWITTER_SIGN_IN_METHOD="twitter.com";xt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await ht._fromIdTokenResponse(e,n,s),o=al(n);return new Yn({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=al(n);return new Yn({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function al(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi extends He{constructor(e,t,n,s){var i;super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,vi.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new vi(e,t,n,s)}}function Pd(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?vi._fromErrorAndOperation(r,i,e,n):i})}async function cy(r,e,t=!1){const n=await Xr(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Yn._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ly(r,e,t=!1){const{auth:n}=r;if(Lt(n.app))return Promise.reject(an(n));const s="reauthenticate";try{const i=await Xr(r,Pd(n,s,e,r),t);G(i.idToken,n,"internal-error");const o=Va(i.idToken);G(o,n,"internal-error");const{sub:u}=o;return G(r.uid===u,n,"user-mismatch"),Yn._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&_t(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hy(r,e,t=!1){if(Lt(r.app))return Promise.reject(an(r));const n="signIn",s=await Pd(r,n,e),i=await Yn._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}function dy(r,e,t,n){return ee(r).onIdTokenChanged(e,t,n)}function fy(r,e,t){return ee(r).beforeAuthStateChanged(e,t)}const Ei="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ei,"1"),this.storage.removeItem(Ei),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py=1e3,my=10;class kd extends Cd{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=wd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,u,c)=>{this.notifyListeners(o,c)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);H_()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,my):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},py)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}kd.type="LOCAL";const gy=kd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd extends Cd{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Dd.type="SESSION";const Vd=Dd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _y(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new Bi(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const u=Array.from(o).map(async h=>h(t.origin,i)),c=await _y(u);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Bi.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ma(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((u,c)=>{const h=Ma("",20);s.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(p){const _=p;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(_.data.response);break;default:clearTimeout(f),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(){return window}function Iy(r){tt().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(){return typeof tt().WorkerGlobalScope<"u"&&typeof tt().importScripts=="function"}async function Ty(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function vy(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function Ey(){return Nd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd="firebaseLocalStorageDb",wy=1,wi="firebaseLocalStorage",Od="fbase_key";class gs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function qi(r,e){return r.transaction([wi],e?"readwrite":"readonly").objectStore(wi)}function Ay(){const r=indexedDB.deleteDatabase(xd);return new gs(r).toPromise()}function Zo(){const r=indexedDB.open(xd,wy);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(wi,{keyPath:Od})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(wi)?e(n):(n.close(),await Ay(),e(await Zo()))})})}async function ul(r,e,t){const n=qi(r,!0).put({[Od]:e,value:t});return new gs(n).toPromise()}async function Ry(r,e){const t=qi(r,!1).get(e),n=await new gs(t).toPromise();return n===void 0?null:n.value}function cl(r,e){const t=qi(r,!0).delete(e);return new gs(t).toPromise()}const by=800,Sy=3;class Md{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Zo(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>Sy)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Nd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Bi._getInstance(Ey()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ty(),!this.activeServiceWorker)return;this.sender=new yy(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||vy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Zo();return await ul(e,Ei,"1"),await cl(e,Ei),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ul(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>Ry(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>cl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=qi(s,!1).getAll();return new gs(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),by)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Md.type="LOCAL";const Py=Md;new ps(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cy(r,e){return e?dt(e):(G(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La extends bd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Wn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Wn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Wn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ky(r){return hy(r.auth,new La(r),r.bypassAuthState)}function Dy(r){const{auth:e,user:t}=r;return G(t,e,"internal-error"),ly(t,new La(r),r.bypassAuthState)}async function Vy(r){const{auth:e,user:t}=r;return G(t,e,"internal-error"),cy(t,new La(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:u}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ky;case"linkViaPopup":case"linkViaRedirect":return Vy;case"reauthViaPopup":case"reauthViaRedirect":return Dy;default:_t(this.auth,"internal-error")}}resolve(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=new ps(2e3,1e4);class $n extends Ld{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,$n.currentPopupAction&&$n.currentPopupAction.cancel(),$n.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return G(e,this.auth,"internal-error"),e}async onExecution(){yt(this.filter.length===1,"Popup operations only handle one event");const e=Ma();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(et(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(et(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$n.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(et(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Ny.get())};e()}}$n.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xy="pendingRedirect",si=new Map;class Oy extends Ld{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=si.get(this.auth._key());if(!e){try{const n=await My(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}si.set(this.auth._key(),e)}return this.bypassAuthState||si.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function My(r,e){const t=Uy(e),n=Fy(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function Ly(r,e){si.set(r._key(),e)}function Fy(r){return dt(r._redirectPersistence)}function Uy(r){return ri(xy,r.config.apiKey,r.name)}async function By(r,e,t=!1){if(Lt(r.app))return Promise.reject(an(r));const n=xa(r),s=Cy(n,e),o=await new Oy(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qy=10*60*1e3;class jy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!$y(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Fd(e)){const s=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(et(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=qy&&this.cachedEventUids.clear(),this.cachedEventUids.has(ll(e))}saveEventToCache(e){this.cachedEventUids.add(ll(e)),this.lastProcessedEventTime=Date.now()}}function ll(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function Fd({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function $y(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Fd(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gy(r,e={}){return or(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zy=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ky=/^https?/;async function Hy(r){if(r.config.emulator)return;const{authorizedDomains:e}=await Gy(r);for(const t of e)try{if(Wy(t))return}catch{}_t(r,"unauthorized-domain")}function Wy(r){const e=Jo(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!Ky.test(t))return!1;if(zy.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qy=new ps(3e4,6e4);function hl(){const r=tt().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function Yy(r){return new Promise((e,t)=>{var n,s,i;function o(){hl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{hl(),t(et(r,"network-request-failed"))},timeout:Qy.get()})}if(!((s=(n=tt().gapi)===null||n===void 0?void 0:n.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=tt().gapi)===null||i===void 0)&&i.load)o();else{const u=ny("iframefcb");return tt()[u]=()=>{gapi.load?o():t(et(r,"network-request-failed"))},ey(`${ty()}?onload=${u}`).catch(c=>t(c))}}).catch(e=>{throw ii=null,e})}let ii=null;function Jy(r){return ii=ii||Yy(r),ii}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xy=new ps(5e3,15e3),Zy="__/auth/iframe",eI="emulator/auth/iframe",tI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},nI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function rI(r){const e=r.config;G(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?ka(e,eI):`https://${r.config.authDomain}/${Zy}`,n={apiKey:e.apiKey,appName:r.name,v:wn},s=nI.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${ds(n).slice(1)}`}async function sI(r){const e=await Jy(r),t=tt().gapi;return G(t,r,"internal-error"),e.open({where:document.body,url:rI(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:tI,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=et(r,"network-request-failed"),u=tt().setTimeout(()=>{i(o)},Xy.get());function c(){tt().clearTimeout(u),s(n)}n.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},oI=500,aI=600,uI="_blank",cI="http://localhost";class dl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function lI(r,e,t,n=oI,s=aI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let u="";const c=Object.assign(Object.assign({},iI),{width:n.toString(),height:s.toString(),top:i,left:o}),h=_e().toLowerCase();t&&(u=yd(h)?uI:t),gd(h)&&(e=e||cI,c.scrollbars="yes");const f=Object.entries(c).reduce((_,[w,C])=>`${_}${w}=${C},`,"");if(K_(h)&&u!=="_self")return hI(e||"",u),new dl(null);const p=window.open(e||"",u,f);G(p,r,"popup-blocked");try{p.focus()}catch{}return new dl(p)}function hI(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI="__/auth/handler",fI="emulator/auth/handler",pI=encodeURIComponent("fac");async function fl(r,e,t,n,s,i){G(r.config.authDomain,r,"auth-domain-config-required"),G(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:wn,eventId:s};if(e instanceof Sd){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",cg(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof ms){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const u=o;for(const f of Object.keys(u))u[f]===void 0&&delete u[f];const c=await r._getAppCheckToken(),h=c?`#${pI}=${encodeURIComponent(c)}`:"";return`${mI(r)}?${ds(u).slice(1)}${h}`}function mI({config:r}){return r.emulator?ka(r,fI):`https://${r.authDomain}/${dI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="webStorageSupport";class gI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Vd,this._completeRedirectFn=By,this._overrideRedirectResult=Ly}async _openPopup(e,t,n,s){var i;yt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await fl(e,t,n,Jo(),s);return lI(e,o,Ma())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await fl(e,t,n,Jo(),s);return Iy(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(yt(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await sI(e),n=new jy(e);return t.register("authEvent",s=>(G(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Lo,{type:Lo},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Lo];o!==void 0&&t(!!o),_t(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Hy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return wd()||_d()||Na()}}const _I=gI;var pl="@firebase/auth",ml="1.8.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){G(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function II(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function TI(r){gt(new rt("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=n.options;G(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const c={apiKey:o,authDomain:u,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ad(r)},h=new X_(n,s,i,c);return sy(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),gt(new rt("auth-internal",e=>{const t=xa(e.getProvider("auth").getImmediate());return(n=>new yI(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),qe(pl,ml,II(r)),qe(pl,ml,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vI=5*60,EI=ed("authIdTokenMaxAge")||vI;let gl=null;const wI=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>EI)return;const s=t==null?void 0:t.token;gl!==s&&(gl=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function BA(r=fs()){const e=En(r,"auth");if(e.isInitialized())return e.getImmediate();const t=ry(r,{popupRedirectResolver:_I,persistence:[Py,gy,Vd]}),n=ed("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=wI(i.toString());fy(t,o,()=>o(t.currentUser)),dy(t,u=>o(u))}}const s=Xh("auth");return s&&iy(t,`http://${s}`),t}function AI(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}Z_({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=et("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",AI().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});TI("Browser");var _l=typeof globalThis<"u"?globalThis:typeof window<"u"||typeof window<"u"?window:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var un,Ud;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,g){function y(){}y.prototype=g.prototype,T.D=g.prototype,T.prototype=new y,T.prototype.constructor=T,T.C=function(v,E,b){for(var I=Array(arguments.length-2),it=2;it<arguments.length;it++)I[it-2]=arguments[it];return g.prototype[E].apply(v,I)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,g,y){y||(y=0);var v=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)v[E]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(E=0;16>E;++E)v[E]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=T.g[0],y=T.g[1],E=T.g[2];var b=T.g[3],I=g+(b^y&(E^b))+v[0]+3614090360&4294967295;g=y+(I<<7&4294967295|I>>>25),I=b+(E^g&(y^E))+v[1]+3905402710&4294967295,b=g+(I<<12&4294967295|I>>>20),I=E+(y^b&(g^y))+v[2]+606105819&4294967295,E=b+(I<<17&4294967295|I>>>15),I=y+(g^E&(b^g))+v[3]+3250441966&4294967295,y=E+(I<<22&4294967295|I>>>10),I=g+(b^y&(E^b))+v[4]+4118548399&4294967295,g=y+(I<<7&4294967295|I>>>25),I=b+(E^g&(y^E))+v[5]+1200080426&4294967295,b=g+(I<<12&4294967295|I>>>20),I=E+(y^b&(g^y))+v[6]+2821735955&4294967295,E=b+(I<<17&4294967295|I>>>15),I=y+(g^E&(b^g))+v[7]+4249261313&4294967295,y=E+(I<<22&4294967295|I>>>10),I=g+(b^y&(E^b))+v[8]+1770035416&4294967295,g=y+(I<<7&4294967295|I>>>25),I=b+(E^g&(y^E))+v[9]+2336552879&4294967295,b=g+(I<<12&4294967295|I>>>20),I=E+(y^b&(g^y))+v[10]+4294925233&4294967295,E=b+(I<<17&4294967295|I>>>15),I=y+(g^E&(b^g))+v[11]+2304563134&4294967295,y=E+(I<<22&4294967295|I>>>10),I=g+(b^y&(E^b))+v[12]+1804603682&4294967295,g=y+(I<<7&4294967295|I>>>25),I=b+(E^g&(y^E))+v[13]+4254626195&4294967295,b=g+(I<<12&4294967295|I>>>20),I=E+(y^b&(g^y))+v[14]+2792965006&4294967295,E=b+(I<<17&4294967295|I>>>15),I=y+(g^E&(b^g))+v[15]+1236535329&4294967295,y=E+(I<<22&4294967295|I>>>10),I=g+(E^b&(y^E))+v[1]+4129170786&4294967295,g=y+(I<<5&4294967295|I>>>27),I=b+(y^E&(g^y))+v[6]+3225465664&4294967295,b=g+(I<<9&4294967295|I>>>23),I=E+(g^y&(b^g))+v[11]+643717713&4294967295,E=b+(I<<14&4294967295|I>>>18),I=y+(b^g&(E^b))+v[0]+3921069994&4294967295,y=E+(I<<20&4294967295|I>>>12),I=g+(E^b&(y^E))+v[5]+3593408605&4294967295,g=y+(I<<5&4294967295|I>>>27),I=b+(y^E&(g^y))+v[10]+38016083&4294967295,b=g+(I<<9&4294967295|I>>>23),I=E+(g^y&(b^g))+v[15]+3634488961&4294967295,E=b+(I<<14&4294967295|I>>>18),I=y+(b^g&(E^b))+v[4]+3889429448&4294967295,y=E+(I<<20&4294967295|I>>>12),I=g+(E^b&(y^E))+v[9]+568446438&4294967295,g=y+(I<<5&4294967295|I>>>27),I=b+(y^E&(g^y))+v[14]+3275163606&4294967295,b=g+(I<<9&4294967295|I>>>23),I=E+(g^y&(b^g))+v[3]+4107603335&4294967295,E=b+(I<<14&4294967295|I>>>18),I=y+(b^g&(E^b))+v[8]+1163531501&4294967295,y=E+(I<<20&4294967295|I>>>12),I=g+(E^b&(y^E))+v[13]+2850285829&4294967295,g=y+(I<<5&4294967295|I>>>27),I=b+(y^E&(g^y))+v[2]+4243563512&4294967295,b=g+(I<<9&4294967295|I>>>23),I=E+(g^y&(b^g))+v[7]+1735328473&4294967295,E=b+(I<<14&4294967295|I>>>18),I=y+(b^g&(E^b))+v[12]+2368359562&4294967295,y=E+(I<<20&4294967295|I>>>12),I=g+(y^E^b)+v[5]+4294588738&4294967295,g=y+(I<<4&4294967295|I>>>28),I=b+(g^y^E)+v[8]+2272392833&4294967295,b=g+(I<<11&4294967295|I>>>21),I=E+(b^g^y)+v[11]+1839030562&4294967295,E=b+(I<<16&4294967295|I>>>16),I=y+(E^b^g)+v[14]+4259657740&4294967295,y=E+(I<<23&4294967295|I>>>9),I=g+(y^E^b)+v[1]+2763975236&4294967295,g=y+(I<<4&4294967295|I>>>28),I=b+(g^y^E)+v[4]+1272893353&4294967295,b=g+(I<<11&4294967295|I>>>21),I=E+(b^g^y)+v[7]+4139469664&4294967295,E=b+(I<<16&4294967295|I>>>16),I=y+(E^b^g)+v[10]+3200236656&4294967295,y=E+(I<<23&4294967295|I>>>9),I=g+(y^E^b)+v[13]+681279174&4294967295,g=y+(I<<4&4294967295|I>>>28),I=b+(g^y^E)+v[0]+3936430074&4294967295,b=g+(I<<11&4294967295|I>>>21),I=E+(b^g^y)+v[3]+3572445317&4294967295,E=b+(I<<16&4294967295|I>>>16),I=y+(E^b^g)+v[6]+76029189&4294967295,y=E+(I<<23&4294967295|I>>>9),I=g+(y^E^b)+v[9]+3654602809&4294967295,g=y+(I<<4&4294967295|I>>>28),I=b+(g^y^E)+v[12]+3873151461&4294967295,b=g+(I<<11&4294967295|I>>>21),I=E+(b^g^y)+v[15]+530742520&4294967295,E=b+(I<<16&4294967295|I>>>16),I=y+(E^b^g)+v[2]+3299628645&4294967295,y=E+(I<<23&4294967295|I>>>9),I=g+(E^(y|~b))+v[0]+4096336452&4294967295,g=y+(I<<6&4294967295|I>>>26),I=b+(y^(g|~E))+v[7]+1126891415&4294967295,b=g+(I<<10&4294967295|I>>>22),I=E+(g^(b|~y))+v[14]+2878612391&4294967295,E=b+(I<<15&4294967295|I>>>17),I=y+(b^(E|~g))+v[5]+4237533241&4294967295,y=E+(I<<21&4294967295|I>>>11),I=g+(E^(y|~b))+v[12]+1700485571&4294967295,g=y+(I<<6&4294967295|I>>>26),I=b+(y^(g|~E))+v[3]+2399980690&4294967295,b=g+(I<<10&4294967295|I>>>22),I=E+(g^(b|~y))+v[10]+4293915773&4294967295,E=b+(I<<15&4294967295|I>>>17),I=y+(b^(E|~g))+v[1]+2240044497&4294967295,y=E+(I<<21&4294967295|I>>>11),I=g+(E^(y|~b))+v[8]+1873313359&4294967295,g=y+(I<<6&4294967295|I>>>26),I=b+(y^(g|~E))+v[15]+4264355552&4294967295,b=g+(I<<10&4294967295|I>>>22),I=E+(g^(b|~y))+v[6]+2734768916&4294967295,E=b+(I<<15&4294967295|I>>>17),I=y+(b^(E|~g))+v[13]+1309151649&4294967295,y=E+(I<<21&4294967295|I>>>11),I=g+(E^(y|~b))+v[4]+4149444226&4294967295,g=y+(I<<6&4294967295|I>>>26),I=b+(y^(g|~E))+v[11]+3174756917&4294967295,b=g+(I<<10&4294967295|I>>>22),I=E+(g^(b|~y))+v[2]+718787259&4294967295,E=b+(I<<15&4294967295|I>>>17),I=y+(b^(E|~g))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+g&4294967295,T.g[1]=T.g[1]+(E+(I<<21&4294967295|I>>>11))&4294967295,T.g[2]=T.g[2]+E&4294967295,T.g[3]=T.g[3]+b&4294967295}n.prototype.u=function(T,g){g===void 0&&(g=T.length);for(var y=g-this.blockSize,v=this.B,E=this.h,b=0;b<g;){if(E==0)for(;b<=y;)s(this,T,b),b+=this.blockSize;if(typeof T=="string"){for(;b<g;)if(v[E++]=T.charCodeAt(b++),E==this.blockSize){s(this,v),E=0;break}}else for(;b<g;)if(v[E++]=T[b++],E==this.blockSize){s(this,v),E=0;break}}this.h=E,this.o+=g},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var g=1;g<T.length-8;++g)T[g]=0;var y=8*this.o;for(g=T.length-8;g<T.length;++g)T[g]=y&255,y/=256;for(this.u(T),T=Array(16),g=y=0;4>g;++g)for(var v=0;32>v;v+=8)T[y++]=this.g[g]>>>v&255;return T};function i(T,g){var y=u;return Object.prototype.hasOwnProperty.call(y,T)?y[T]:y[T]=g(T)}function o(T,g){this.h=g;for(var y=[],v=!0,E=T.length-1;0<=E;E--){var b=T[E]|0;v&&b==g||(y[E]=b,v=!1)}this.g=y}var u={};function c(T){return-128<=T&&128>T?i(T,function(g){return new o([g|0],0>g?-1:0)}):new o([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return p;if(0>T)return k(h(-T));for(var g=[],y=1,v=0;T>=y;v++)g[v]=T/y|0,y*=4294967296;return new o(g,0)}function f(T,g){if(T.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(T.charAt(0)=="-")return k(f(T.substring(1),g));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(g,8)),v=p,E=0;E<T.length;E+=8){var b=Math.min(8,T.length-E),I=parseInt(T.substring(E,E+b),g);8>b?(b=h(Math.pow(g,b)),v=v.j(b).add(h(I))):(v=v.j(y),v=v.add(h(I)))}return v}var p=c(0),_=c(1),w=c(16777216);r=o.prototype,r.m=function(){if(V(this))return-k(this).m();for(var T=0,g=1,y=0;y<this.g.length;y++){var v=this.i(y);T+=(0<=v?v:4294967296+v)*g,g*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(V(this))return"-"+k(this).toString(T);for(var g=h(Math.pow(T,6)),y=this,v="";;){var E=j(y,g).g;y=q(y,E.j(g));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(T);if(y=E,C(y))return b+v;for(;6>b.length;)b="0"+b;v=b+v}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(var g=0;g<T.g.length;g++)if(T.g[g]!=0)return!1;return!0}function V(T){return T.h==-1}r.l=function(T){return T=q(this,T),V(T)?-1:C(T)?0:1};function k(T){for(var g=T.g.length,y=[],v=0;v<g;v++)y[v]=~T.g[v];return new o(y,~T.h).add(_)}r.abs=function(){return V(this)?k(this):this},r.add=function(T){for(var g=Math.max(this.g.length,T.g.length),y=[],v=0,E=0;E<=g;E++){var b=v+(this.i(E)&65535)+(T.i(E)&65535),I=(b>>>16)+(this.i(E)>>>16)+(T.i(E)>>>16);v=I>>>16,b&=65535,I&=65535,y[E]=I<<16|b}return new o(y,y[y.length-1]&-2147483648?-1:0)};function q(T,g){return T.add(k(g))}r.j=function(T){if(C(this)||C(T))return p;if(V(this))return V(T)?k(this).j(k(T)):k(k(this).j(T));if(V(T))return k(this.j(k(T)));if(0>this.l(w)&&0>T.l(w))return h(this.m()*T.m());for(var g=this.g.length+T.g.length,y=[],v=0;v<2*g;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var E=0;E<T.g.length;E++){var b=this.i(v)>>>16,I=this.i(v)&65535,it=T.i(E)>>>16,_r=T.i(E)&65535;y[2*v+2*E]+=I*_r,B(y,2*v+2*E),y[2*v+2*E+1]+=b*_r,B(y,2*v+2*E+1),y[2*v+2*E+1]+=I*it,B(y,2*v+2*E+1),y[2*v+2*E+2]+=b*it,B(y,2*v+2*E+2)}for(v=0;v<g;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=g;v<2*g;v++)y[v]=0;return new o(y,0)};function B(T,g){for(;(T[g]&65535)!=T[g];)T[g+1]+=T[g]>>>16,T[g]&=65535,g++}function M(T,g){this.g=T,this.h=g}function j(T,g){if(C(g))throw Error("division by zero");if(C(T))return new M(p,p);if(V(T))return g=j(k(T),g),new M(k(g.g),k(g.h));if(V(g))return g=j(T,k(g)),new M(k(g.g),g.h);if(30<T.g.length){if(V(T)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var y=_,v=g;0>=v.l(T);)y=W(y),v=W(v);var E=z(y,1),b=z(v,1);for(v=z(v,2),y=z(y,2);!C(v);){var I=b.add(v);0>=I.l(T)&&(E=E.add(y),b=I),v=z(v,1),y=z(y,1)}return g=q(T,E.j(g)),new M(E,g)}for(E=p;0<=T.l(g);){for(y=Math.max(1,Math.floor(T.m()/g.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),b=h(y),I=b.j(g);V(I)||0<I.l(T);)y-=v,b=h(y),I=b.j(g);C(b)&&(b=_),E=E.add(b),T=q(T,I)}return new M(E,T)}r.A=function(T){return j(this,T).h},r.and=function(T){for(var g=Math.max(this.g.length,T.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)&T.i(v);return new o(y,this.h&T.h)},r.or=function(T){for(var g=Math.max(this.g.length,T.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)|T.i(v);return new o(y,this.h|T.h)},r.xor=function(T){for(var g=Math.max(this.g.length,T.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)^T.i(v);return new o(y,this.h^T.h)};function W(T){for(var g=T.g.length+1,y=[],v=0;v<g;v++)y[v]=T.i(v)<<1|T.i(v-1)>>>31;return new o(y,T.h)}function z(T,g){var y=g>>5;g%=32;for(var v=T.g.length-y,E=[],b=0;b<v;b++)E[b]=0<g?T.i(b+y)>>>g|T.i(b+y+1)<<32-g:T.i(b+y);return new o(E,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Ud=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,un=o}).apply(typeof _l<"u"?_l:typeof self<"u"?self:typeof window<"u"?window:{});var Ws=typeof globalThis<"u"?globalThis:typeof window<"u"||typeof window<"u"?window:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bd,Br,qd,oi,ea,jd,$d,Gd;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,d){return a==Array.prototype||a==Object.prototype||(a[l]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ws=="object"&&Ws];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var m=0;m<a.length-1;m++){var R=a[m];if(!(R in d))break e;d=d[R]}a=a[a.length-1],m=d[a],l=l(m),l!=m&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}function i(a,l){a instanceof String&&(a+="");var d=0,m=!1,R={next:function(){if(!m&&d<a.length){var S=d++;return{value:l(S,a[S]),done:!1}}return m=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}s("Array.prototype.values",function(a){return a||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},u=this||self;function c(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function h(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,d){return a.call.apply(a.bind,arguments)}function p(a,l,d){if(!a)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,m),a.apply(l,R)}}return function(){return a.apply(l,arguments)}}function _(a,l,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,_.apply(null,arguments)}function w(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function C(a,l){function d(){}d.prototype=l.prototype,a.aa=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(m,R,S){for(var x=Array(arguments.length-2),re=2;re<arguments.length;re++)x[re-2]=arguments[re];return l.prototype[R].apply(m,x)}}function V(a){const l=a.length;if(0<l){const d=Array(l);for(let m=0;m<l;m++)d[m]=a[m];return d}return[]}function k(a,l){for(let d=1;d<arguments.length;d++){const m=arguments[d];if(c(m)){const R=a.length||0,S=m.length||0;a.length=R+S;for(let x=0;x<S;x++)a[R+x]=m[x]}else a.push(m)}}class q{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function B(a){return/^[\s\xa0]*$/.test(a)}function M(){var a=u.navigator;return a&&(a=a.userAgent)?a:""}function j(a){return j[" "](a),a}j[" "]=function(){};var W=M().indexOf("Gecko")!=-1&&!(M().toLowerCase().indexOf("webkit")!=-1&&M().indexOf("Edge")==-1)&&!(M().indexOf("Trident")!=-1||M().indexOf("MSIE")!=-1)&&M().indexOf("Edge")==-1;function z(a,l,d){for(const m in a)l.call(d,a[m],m,a)}function T(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function g(a){const l={};for(const d in a)l[d]=a[d];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(a,l){let d,m;for(let R=1;R<arguments.length;R++){m=arguments[R];for(d in m)a[d]=m[d];for(let S=0;S<y.length;S++)d=y[S],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function E(a){var l=1;a=a.split(":");const d=[];for(;0<l&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function b(a){u.setTimeout(()=>{throw a},0)}function I(){var a=co;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class it{constructor(){this.h=this.g=null}add(l,d){const m=_r.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var _r=new q(()=>new um,a=>a.reset());class um{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let yr,Ir=!1,co=new it,$u=()=>{const a=u.Promise.resolve(void 0);yr=()=>{a.then(cm)}};var cm=()=>{for(var a;a=I();){try{a.h.call(a.g)}catch(d){b(d)}var l=_r;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}Ir=!1};function At(){this.s=this.s,this.C=this.C}At.prototype.s=!1,At.prototype.ma=function(){this.s||(this.s=!0,this.N())},At.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function be(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}be.prototype.h=function(){this.defaultPrevented=!0};var lm=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};u.addEventListener("test",d,l),u.removeEventListener("test",d,l)}catch{}return a}();function Tr(a,l){if(be.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(W){e:{try{j(l.nodeName);var R=!0;break e}catch{}R=!1}R||(l=null)}}else d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:hm[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Tr.aa.h.call(this)}}C(Tr,be);var hm={2:"touch",3:"pen",4:"mouse"};Tr.prototype.h=function(){Tr.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Ps="closure_listenable_"+(1e6*Math.random()|0),dm=0;function fm(a,l,d,m,R){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=R,this.key=++dm,this.da=this.fa=!1}function Cs(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function ks(a){this.src=a,this.g={},this.h=0}ks.prototype.add=function(a,l,d,m,R){var S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);var x=ho(a,l,m,R);return-1<x?(l=a[x],d||(l.fa=!1)):(l=new fm(l,this.src,S,!!m,R),l.fa=d,a.push(l)),l};function lo(a,l){var d=l.type;if(d in a.g){var m=a.g[d],R=Array.prototype.indexOf.call(m,l,void 0),S;(S=0<=R)&&Array.prototype.splice.call(m,R,1),S&&(Cs(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ho(a,l,d,m){for(var R=0;R<a.length;++R){var S=a[R];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==m)return R}return-1}var fo="closure_lm_"+(1e6*Math.random()|0),po={};function Gu(a,l,d,m,R){if(Array.isArray(l)){for(var S=0;S<l.length;S++)Gu(a,l[S],d,m,R);return null}return d=Hu(d),a&&a[Ps]?a.K(l,d,h(m)?!!m.capture:!1,R):pm(a,l,d,!1,m,R)}function pm(a,l,d,m,R,S){if(!l)throw Error("Invalid event type");var x=h(R)?!!R.capture:!!R,re=go(a);if(re||(a[fo]=re=new ks(a)),d=re.add(l,d,m,x,S),d.proxy)return d;if(m=mm(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)lm||(R=x),R===void 0&&(R=!1),a.addEventListener(l.toString(),m,R);else if(a.attachEvent)a.attachEvent(Ku(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function mm(){function a(d){return l.call(a.src,a.listener,d)}const l=gm;return a}function zu(a,l,d,m,R){if(Array.isArray(l))for(var S=0;S<l.length;S++)zu(a,l[S],d,m,R);else m=h(m)?!!m.capture:!!m,d=Hu(d),a&&a[Ps]?(a=a.i,l=String(l).toString(),l in a.g&&(S=a.g[l],d=ho(S,d,m,R),-1<d&&(Cs(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete a.g[l],a.h--)))):a&&(a=go(a))&&(l=a.g[l.toString()],a=-1,l&&(a=ho(l,d,m,R)),(d=-1<a?l[a]:null)&&mo(d))}function mo(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[Ps])lo(l.i,a);else{var d=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(d,m,a.capture):l.detachEvent?l.detachEvent(Ku(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=go(l))?(lo(d,a),d.h==0&&(d.src=null,l[fo]=null)):Cs(a)}}}function Ku(a){return a in po?po[a]:po[a]="on"+a}function gm(a,l){if(a.da)a=!0;else{l=new Tr(l,this);var d=a.listener,m=a.ha||a.src;a.fa&&mo(a),a=d.call(m,l)}return a}function go(a){return a=a[fo],a instanceof ks?a:null}var _o="__closure_events_fn_"+(1e9*Math.random()>>>0);function Hu(a){return typeof a=="function"?a:(a[_o]||(a[_o]=function(l){return a.handleEvent(l)}),a[_o])}function Se(){At.call(this),this.i=new ks(this),this.M=this,this.F=null}C(Se,At),Se.prototype[Ps]=!0,Se.prototype.removeEventListener=function(a,l,d,m){zu(this,a,l,d,m)};function xe(a,l){var d,m=a.F;if(m)for(d=[];m;m=m.F)d.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new be(l,a);else if(l instanceof be)l.target=l.target||a;else{var R=l;l=new be(m,a),v(l,R)}if(R=!0,d)for(var S=d.length-1;0<=S;S--){var x=l.g=d[S];R=Ds(x,m,!0,l)&&R}if(x=l.g=a,R=Ds(x,m,!0,l)&&R,R=Ds(x,m,!1,l)&&R,d)for(S=0;S<d.length;S++)x=l.g=d[S],R=Ds(x,m,!1,l)&&R}Se.prototype.N=function(){if(Se.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var d=a.g[l],m=0;m<d.length;m++)Cs(d[m]);delete a.g[l],a.h--}}this.F=null},Se.prototype.K=function(a,l,d,m){return this.i.add(String(a),l,!1,d,m)},Se.prototype.L=function(a,l,d,m){return this.i.add(String(a),l,!0,d,m)};function Ds(a,l,d,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var R=!0,S=0;S<l.length;++S){var x=l[S];if(x&&!x.da&&x.capture==d){var re=x.listener,ve=x.ha||x.src;x.fa&&lo(a.i,x),R=re.call(ve,m)!==!1&&R}}return R&&!m.defaultPrevented}function Wu(a,l,d){if(typeof a=="function")d&&(a=_(a,d));else if(a&&typeof a.handleEvent=="function")a=_(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(a,l||0)}function Qu(a){a.g=Wu(()=>{a.g=null,a.i&&(a.i=!1,Qu(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class _m extends At{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Qu(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function vr(a){At.call(this),this.h=a,this.g={}}C(vr,At);var Yu=[];function Ju(a){z(a.g,function(l,d){this.g.hasOwnProperty(d)&&mo(l)},a),a.g={}}vr.prototype.N=function(){vr.aa.N.call(this),Ju(this)},vr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var yo=u.JSON.stringify,ym=u.JSON.parse,Im=class{stringify(a){return u.JSON.stringify(a,void 0)}parse(a){return u.JSON.parse(a,void 0)}};function Io(){}Io.prototype.h=null;function Xu(a){return a.h||(a.h=a.i())}function Zu(){}var Er={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function To(){be.call(this,"d")}C(To,be);function vo(){be.call(this,"c")}C(vo,be);var Qt={},ec=null;function Vs(){return ec=ec||new Se}Qt.La="serverreachability";function tc(a){be.call(this,Qt.La,a)}C(tc,be);function wr(a){const l=Vs();xe(l,new tc(l))}Qt.STAT_EVENT="statevent";function nc(a,l){be.call(this,Qt.STAT_EVENT,a),this.stat=l}C(nc,be);function Oe(a){const l=Vs();xe(l,new nc(l,a))}Qt.Ma="timingevent";function rc(a,l){be.call(this,Qt.Ma,a),this.size=l}C(rc,be);function Ar(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){a()},l)}function Rr(){this.g=!0}Rr.prototype.xa=function(){this.g=!1};function Tm(a,l,d,m,R,S){a.info(function(){if(a.g)if(S)for(var x="",re=S.split("&"),ve=0;ve<re.length;ve++){var X=re[ve].split("=");if(1<X.length){var Pe=X[0];X=X[1];var Ce=Pe.split("_");x=2<=Ce.length&&Ce[1]=="type"?x+(Pe+"="+X+"&"):x+(Pe+"=redacted&")}}else x=null;else x=S;return"XMLHTTP REQ ("+m+") [attempt "+R+"]: "+l+`
`+d+`
`+x})}function vm(a,l,d,m,R,S,x){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+R+"]: "+l+`
`+d+`
`+S+" "+x})}function Cn(a,l,d,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+wm(a,d)+(m?" "+m:"")})}function Em(a,l){a.info(function(){return"TIMEOUT: "+l})}Rr.prototype.info=function(){};function wm(a,l){if(!a.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var m=d[a];if(!(2>m.length)){var R=m[1];if(Array.isArray(R)&&!(1>R.length)){var S=R[0];if(S!="noop"&&S!="stop"&&S!="close")for(var x=1;x<R.length;x++)R[x]=""}}}}return yo(d)}catch{return l}}var Ns={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},sc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Eo;function xs(){}C(xs,Io),xs.prototype.g=function(){return new XMLHttpRequest},xs.prototype.i=function(){return{}},Eo=new xs;function Rt(a,l,d,m){this.j=a,this.i=l,this.l=d,this.R=m||1,this.U=new vr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new ic}function ic(){this.i=null,this.g="",this.h=!1}var oc={},wo={};function Ao(a,l,d){a.L=1,a.v=Fs(ot(l)),a.m=d,a.P=!0,ac(a,null)}function ac(a,l){a.F=Date.now(),Os(a),a.A=ot(a.v);var d=a.A,m=a.R;Array.isArray(m)||(m=[String(m)]),vc(d.i,"t",m),a.C=0,d=a.j.J,a.h=new ic,a.g=Uc(a.j,d?l:null,!a.m),0<a.O&&(a.M=new _m(_(a.Y,a,a.g),a.O)),l=a.U,d=a.g,m=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(Yu[0]=R.toString()),R=Yu);for(var S=0;S<R.length;S++){var x=Gu(d,R[S],m||l.handleEvent,!1,l.h||l);if(!x)break;l.g[x.key]=x}l=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),wr(),Tm(a.i,a.u,a.A,a.l,a.R,a.m)}Rt.prototype.ca=function(a){a=a.target;const l=this.M;l&&at(a)==3?l.j():this.Y(a)},Rt.prototype.Y=function(a){try{if(a==this.g)e:{const Ce=at(this.g);var l=this.g.Ba();const Vn=this.g.Z();if(!(3>Ce)&&(Ce!=3||this.g&&(this.h.h||this.g.oa()||Pc(this.g)))){this.J||Ce!=4||l==7||(l==8||0>=Vn?wr(3):wr(2)),Ro(this);var d=this.g.Z();this.X=d;t:if(uc(this)){var m=Pc(this.g);a="";var R=m.length,S=at(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Yt(this),br(this);var x="";break t}this.h.i=new u.TextDecoder}for(l=0;l<R;l++)this.h.h=!0,a+=this.h.i.decode(m[l],{stream:!(S&&l==R-1)});m.length=0,this.h.g+=a,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=d==200,vm(this.i,this.u,this.A,this.l,this.R,Ce,d),this.o){if(this.T&&!this.K){t:{if(this.g){var re,ve=this.g;if((re=ve.g?ve.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(re)){var X=re;break t}}X=null}if(d=X)Cn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,bo(this,d);else{this.o=!1,this.s=3,Oe(12),Yt(this),br(this);break e}}if(this.P){d=!0;let We;for(;!this.J&&this.C<x.length;)if(We=Am(this,x),We==wo){Ce==4&&(this.s=4,Oe(14),d=!1),Cn(this.i,this.l,null,"[Incomplete Response]");break}else if(We==oc){this.s=4,Oe(15),Cn(this.i,this.l,x,"[Invalid Chunk]"),d=!1;break}else Cn(this.i,this.l,We,null),bo(this,We);if(uc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ce!=4||x.length!=0||this.h.h||(this.s=1,Oe(16),d=!1),this.o=this.o&&d,!d)Cn(this.i,this.l,x,"[Invalid Chunked Response]"),Yt(this),br(this);else if(0<x.length&&!this.W){this.W=!0;var Pe=this.j;Pe.g==this&&Pe.ba&&!Pe.M&&(Pe.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),Vo(Pe),Pe.M=!0,Oe(11))}}else Cn(this.i,this.l,x,null),bo(this,x);Ce==4&&Yt(this),this.o&&!this.J&&(Ce==4?Oc(this.j,this):(this.o=!1,Os(this)))}else qm(this.g),d==400&&0<x.indexOf("Unknown SID")?(this.s=3,Oe(12)):(this.s=0,Oe(13)),Yt(this),br(this)}}}catch{}finally{}};function uc(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Am(a,l){var d=a.C,m=l.indexOf(`
`,d);return m==-1?wo:(d=Number(l.substring(d,m)),isNaN(d)?oc:(m+=1,m+d>l.length?wo:(l=l.slice(m,m+d),a.C=m+d,l)))}Rt.prototype.cancel=function(){this.J=!0,Yt(this)};function Os(a){a.S=Date.now()+a.I,cc(a,a.I)}function cc(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ar(_(a.ba,a),l)}function Ro(a){a.B&&(u.clearTimeout(a.B),a.B=null)}Rt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Em(this.i,this.A),this.L!=2&&(wr(),Oe(17)),Yt(this),this.s=2,br(this)):cc(this,this.S-a)};function br(a){a.j.G==0||a.J||Oc(a.j,a)}function Yt(a){Ro(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,Ju(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function bo(a,l){try{var d=a.j;if(d.G!=0&&(d.g==a||So(d.h,a))){if(!a.K&&So(d.h,a)&&d.G==3){try{var m=d.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var R=m;if(R[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Gs(d),js(d);else break e;Do(d),Oe(18)}}else d.za=R[1],0<d.za-d.T&&37500>R[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ar(_(d.Za,d),6e3));if(1>=dc(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Xt(d,11)}else if((a.K||d.g==a)&&Gs(d),!B(l))for(R=d.Da.g.parse(l),l=0;l<R.length;l++){let X=R[l];if(d.T=X[0],X=X[1],d.G==2)if(X[0]=="c"){d.K=X[1],d.ia=X[2];const Pe=X[3];Pe!=null&&(d.la=Pe,d.j.info("VER="+d.la));const Ce=X[4];Ce!=null&&(d.Aa=Ce,d.j.info("SVER="+d.Aa));const Vn=X[5];Vn!=null&&typeof Vn=="number"&&0<Vn&&(m=1.5*Vn,d.L=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const We=a.g;if(We){const Ks=We.g?We.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ks){var S=m.h;S.g||Ks.indexOf("spdy")==-1&&Ks.indexOf("quic")==-1&&Ks.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Po(S,S.h),S.h=null))}if(m.D){const No=We.g?We.g.getResponseHeader("X-HTTP-Session-Id"):null;No&&(m.ya=No,se(m.I,m.D,No))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),m=d;var x=a;if(m.qa=Fc(m,m.J?m.ia:null,m.W),x.K){fc(m.h,x);var re=x,ve=m.L;ve&&(re.I=ve),re.B&&(Ro(re),Os(re)),m.g=x}else Nc(m);0<d.i.length&&$s(d)}else X[0]!="stop"&&X[0]!="close"||Xt(d,7);else d.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?Xt(d,7):ko(d):X[0]!="noop"&&d.l&&d.l.ta(X),d.v=0)}}wr(4)}catch{}}var Rm=class{constructor(a,l){this.g=a,this.map=l}};function lc(a){this.l=a||10,u.PerformanceNavigationTiming?(a=u.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function hc(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function dc(a){return a.h?1:a.g?a.g.size:0}function So(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Po(a,l){a.g?a.g.add(l):a.h=l}function fc(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}lc.prototype.cancel=function(){if(this.i=pc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function pc(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.D);return l}return V(a.i)}function bm(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var l=[],d=a.length,m=0;m<d;m++)l.push(a[m]);return l}l=[],d=0;for(m in a)l[d++]=a[m];return l}function Sm(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var l=[];a=a.length;for(var d=0;d<a;d++)l.push(d);return l}l=[],d=0;for(const m in a)l[d++]=m;return l}}}function mc(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var d=Sm(a),m=bm(a),R=m.length,S=0;S<R;S++)l.call(void 0,m[S],d&&d[S],a)}var gc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Pm(a,l){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var m=a[d].indexOf("="),R=null;if(0<=m){var S=a[d].substring(0,m);R=a[d].substring(m+1)}else S=a[d];l(S,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Jt(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Jt){this.h=a.h,Ms(this,a.j),this.o=a.o,this.g=a.g,Ls(this,a.s),this.l=a.l;var l=a.i,d=new Cr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),_c(this,d),this.m=a.m}else a&&(l=String(a).match(gc))?(this.h=!1,Ms(this,l[1]||"",!0),this.o=Sr(l[2]||""),this.g=Sr(l[3]||"",!0),Ls(this,l[4]),this.l=Sr(l[5]||"",!0),_c(this,l[6]||"",!0),this.m=Sr(l[7]||"")):(this.h=!1,this.i=new Cr(null,this.h))}Jt.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Pr(l,yc,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Pr(l,yc,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Pr(d,d.charAt(0)=="/"?Dm:km,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Pr(d,Nm)),a.join("")};function ot(a){return new Jt(a)}function Ms(a,l,d){a.j=d?Sr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Ls(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function _c(a,l,d){l instanceof Cr?(a.i=l,xm(a.i,a.h)):(d||(l=Pr(l,Vm)),a.i=new Cr(l,a.h))}function se(a,l,d){a.i.set(l,d)}function Fs(a){return se(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Sr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Pr(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Cm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Cm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var yc=/[#\/\?@]/g,km=/[#\?:]/g,Dm=/[#\?]/g,Vm=/[#\?@]/g,Nm=/#/g;function Cr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function bt(a){a.g||(a.g=new Map,a.h=0,a.i&&Pm(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Cr.prototype,r.add=function(a,l){bt(this),this.i=null,a=kn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function Ic(a,l){bt(a),l=kn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function Tc(a,l){return bt(a),l=kn(a,l),a.g.has(l)}r.forEach=function(a,l){bt(this),this.g.forEach(function(d,m){d.forEach(function(R){a.call(l,R,m,this)},this)},this)},r.na=function(){bt(this);const a=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let m=0;m<l.length;m++){const R=a[m];for(let S=0;S<R.length;S++)d.push(l[m])}return d},r.V=function(a){bt(this);let l=[];if(typeof a=="string")Tc(this,a)&&(l=l.concat(this.g.get(kn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)l=l.concat(a[d])}return l},r.set=function(a,l){return bt(this),this.i=null,a=kn(this,a),Tc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function vc(a,l,d){Ic(a,l),0<d.length&&(a.i=null,a.g.set(kn(a,l),V(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var m=l[d];const S=encodeURIComponent(String(m)),x=this.V(m);for(m=0;m<x.length;m++){var R=S;x[m]!==""&&(R+="="+encodeURIComponent(String(x[m]))),a.push(R)}}return this.i=a.join("&")};function kn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function xm(a,l){l&&!a.j&&(bt(a),a.i=null,a.g.forEach(function(d,m){var R=m.toLowerCase();m!=R&&(Ic(this,m),vc(this,R,d))},a)),a.j=l}function Om(a,l){const d=new Rr;if(u.Image){const m=new Image;m.onload=w(St,d,"TestLoadImage: loaded",!0,l,m),m.onerror=w(St,d,"TestLoadImage: error",!1,l,m),m.onabort=w(St,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=w(St,d,"TestLoadImage: timeout",!1,l,m),u.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function Mm(a,l){const d=new Rr,m=new AbortController,R=setTimeout(()=>{m.abort(),St(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(S=>{clearTimeout(R),S.ok?St(d,"TestPingServer: ok",!0,l):St(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(R),St(d,"TestPingServer: error",!1,l)})}function St(a,l,d,m,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),m(d)}catch{}}function Lm(){this.g=new Im}function Fm(a,l,d){const m=d||"";try{mc(a,function(R,S){let x=R;h(R)&&(x=yo(R)),l.push(m+S+"="+encodeURIComponent(x))})}catch(R){throw l.push(m+"type="+encodeURIComponent("_badmap")),R}}function Us(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Us,Io),Us.prototype.g=function(){return new Bs(this.l,this.j)},Us.prototype.i=function(a){return function(){return a}}({});function Bs(a,l){Se.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Bs,Se),r=Bs.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,Dr(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,kr(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Dr(this)),this.g&&(this.readyState=3,Dr(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Ec(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Ec(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?kr(this):Dr(this),this.readyState==3&&Ec(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,kr(this))},r.Qa=function(a){this.g&&(this.response=a,kr(this))},r.ga=function(){this.g&&kr(this)};function kr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Dr(a)}r.setRequestHeader=function(a,l){this.u.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function Dr(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Bs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function wc(a){let l="";return z(a,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Co(a,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=wc(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):se(a,l,d))}function pe(a){Se.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(pe,Se);var Um=/^https?$/i,Bm=["POST","PUT"];r=pe.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Eo.g(),this.v=this.o?Xu(this.o):Xu(Eo),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(S){Ac(this,S);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var R in m)d.set(R,m[R]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const S of m.keys())d.set(S,m.get(S));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),R=u.FormData&&a instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Bm,l,void 0))||m||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,x]of d)this.g.setRequestHeader(S,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Sc(this),this.u=!0,this.g.send(a),this.u=!1}catch(S){Ac(this,S)}};function Ac(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,Rc(a),qs(a)}function Rc(a){a.A||(a.A=!0,xe(a,"complete"),xe(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,xe(this,"complete"),xe(this,"abort"),qs(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),qs(this,!0)),pe.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?bc(this):this.bb())},r.bb=function(){bc(this)};function bc(a){if(a.h&&typeof o<"u"&&(!a.v[1]||at(a)!=4||a.Z()!=2)){if(a.u&&at(a)==4)Wu(a.Ea,0,a);else if(xe(a,"readystatechange"),at(a)==4){a.h=!1;try{const x=a.Z();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=x===0){var R=String(a.D).match(gc)[1]||null;!R&&u.self&&u.self.location&&(R=u.self.location.protocol.slice(0,-1)),m=!Um.test(R?R.toLowerCase():"")}d=m}if(d)xe(a,"complete"),xe(a,"success");else{a.m=6;try{var S=2<at(a)?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.Z()+"]",Rc(a)}}finally{qs(a)}}}}function qs(a,l){if(a.g){Sc(a);const d=a.g,m=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||xe(a,"ready");try{d.onreadystatechange=m}catch{}}}function Sc(a){a.I&&(u.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function at(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<at(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),ym(l)}};function Pc(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function qm(a){const l={};a=(a.g&&2<=at(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(B(a[m]))continue;var d=E(a[m]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[R]||[];l[R]=S,S.push(d)}T(l,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Vr(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Cc(a){this.Aa=0,this.i=[],this.j=new Rr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Vr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Vr("baseRetryDelayMs",5e3,a),this.cb=Vr("retryDelaySeedMs",1e4,a),this.Wa=Vr("forwardChannelMaxRetries",2,a),this.wa=Vr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new lc(a&&a.concurrentRequestLimit),this.Da=new Lm,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Cc.prototype,r.la=8,r.G=1,r.connect=function(a,l,d,m){Oe(0),this.W=a,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.I=Fc(this,null,this.W),$s(this)};function ko(a){if(kc(a),a.G==3){var l=a.U++,d=ot(a.I);if(se(d,"SID",a.K),se(d,"RID",l),se(d,"TYPE","terminate"),Nr(a,d),l=new Rt(a,a.j,l),l.L=2,l.v=Fs(ot(d)),d=!1,u.navigator&&u.navigator.sendBeacon)try{d=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&u.Image&&(new Image().src=l.v,d=!0),d||(l.g=Uc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Os(l)}Lc(a)}function js(a){a.g&&(Vo(a),a.g.cancel(),a.g=null)}function kc(a){js(a),a.u&&(u.clearTimeout(a.u),a.u=null),Gs(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&u.clearTimeout(a.s),a.s=null)}function $s(a){if(!hc(a.h)&&!a.s){a.s=!0;var l=a.Ga;yr||$u(),Ir||(yr(),Ir=!0),co.add(l,a),a.B=0}}function jm(a,l){return dc(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ar(_(a.Ga,a,l),Mc(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new Rt(this,this.j,a);let S=this.o;if(this.S&&(S?(S=g(S),v(S,this.S)):S=this.S),this.m!==null||this.O||(R.H=S,S=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Vc(this,R,l),d=ot(this.I),se(d,"RID",a),se(d,"CVER",22),this.D&&se(d,"X-HTTP-Session-Id",this.D),Nr(this,d),S&&(this.O?l="headers="+encodeURIComponent(String(wc(S)))+"&"+l:this.m&&Co(d,this.m,S)),Po(this.h,R),this.Ua&&se(d,"TYPE","init"),this.P?(se(d,"$req",l),se(d,"SID","null"),R.T=!0,Ao(R,d,null)):Ao(R,d,l),this.G=2}}else this.G==3&&(a?Dc(this,a):this.i.length==0||hc(this.h)||Dc(this))};function Dc(a,l){var d;l?d=l.l:d=a.U++;const m=ot(a.I);se(m,"SID",a.K),se(m,"RID",d),se(m,"AID",a.T),Nr(a,m),a.m&&a.o&&Co(m,a.m,a.o),d=new Rt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),l&&(a.i=l.D.concat(a.i)),l=Vc(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Po(a.h,d),Ao(d,m,l)}function Nr(a,l){a.H&&z(a.H,function(d,m){se(l,m,d)}),a.l&&mc({},function(d,m){se(l,m,d)})}function Vc(a,l,d){d=Math.min(a.i.length,d);var m=a.l?_(a.l.Na,a.l,a):null;e:{var R=a.i;let S=-1;for(;;){const x=["count="+d];S==-1?0<d?(S=R[0].g,x.push("ofs="+S)):S=0:x.push("ofs="+S);let re=!0;for(let ve=0;ve<d;ve++){let X=R[ve].g;const Pe=R[ve].map;if(X-=S,0>X)S=Math.max(0,R[ve].g-100),re=!1;else try{Fm(Pe,x,"req"+X+"_")}catch{m&&m(Pe)}}if(re){m=x.join("&");break e}}}return a=a.i.splice(0,d),l.D=a,m}function Nc(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;yr||$u(),Ir||(yr(),Ir=!0),co.add(l,a),a.v=0}}function Do(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ar(_(a.Fa,a),Mc(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,xc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ar(_(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Oe(10),js(this),xc(this))};function Vo(a){a.A!=null&&(u.clearTimeout(a.A),a.A=null)}function xc(a){a.g=new Rt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=ot(a.qa);se(l,"RID","rpc"),se(l,"SID",a.K),se(l,"AID",a.T),se(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&se(l,"TO",a.ja),se(l,"TYPE","xmlhttp"),Nr(a,l),a.m&&a.o&&Co(l,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Fs(ot(l)),d.m=null,d.P=!0,ac(d,a)}r.Za=function(){this.C!=null&&(this.C=null,js(this),Do(this),Oe(19))};function Gs(a){a.C!=null&&(u.clearTimeout(a.C),a.C=null)}function Oc(a,l){var d=null;if(a.g==l){Gs(a),Vo(a),a.g=null;var m=2}else if(So(a.h,l))d=l.D,fc(a.h,l),m=1;else return;if(a.G!=0){if(l.o)if(m==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var R=a.B;m=Vs(),xe(m,new rc(m,d)),$s(a)}else Nc(a);else if(R=l.s,R==3||R==0&&0<l.X||!(m==1&&jm(a,l)||m==2&&Do(a)))switch(d&&0<d.length&&(l=a.h,l.i=l.i.concat(d)),R){case 1:Xt(a,5);break;case 4:Xt(a,10);break;case 3:Xt(a,6);break;default:Xt(a,2)}}}function Mc(a,l){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*l}function Xt(a,l){if(a.j.info("Error code "+l),l==2){var d=_(a.fb,a),m=a.Xa;const R=!m;m=new Jt(m||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Ms(m,"https"),Fs(m),R?Om(m.toString(),d):Mm(m.toString(),d)}else Oe(2);a.G=0,a.l&&a.l.sa(l),Lc(a),kc(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Oe(2)):(this.j.info("Failed to ping google.com"),Oe(1))};function Lc(a){if(a.G=0,a.ka=[],a.l){const l=pc(a.h);(l.length!=0||a.i.length!=0)&&(k(a.ka,l),k(a.ka,a.i),a.h.i.length=0,V(a.i),a.i.length=0),a.l.ra()}}function Fc(a,l,d){var m=d instanceof Jt?ot(d):new Jt(d);if(m.g!="")l&&(m.g=l+"."+m.g),Ls(m,m.s);else{var R=u.location;m=R.protocol,l=l?l+"."+R.hostname:R.hostname,R=+R.port;var S=new Jt(null);m&&Ms(S,m),l&&(S.g=l),R&&Ls(S,R),d&&(S.l=d),m=S}return d=a.D,l=a.ya,d&&l&&se(m,d,l),se(m,"VER",a.la),Nr(a,m),m}function Uc(a,l,d){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new pe(new Us({eb:d})):new pe(a.pa),l.Ha(a.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Bc(){}r=Bc.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function zs(){}zs.prototype.g=function(a,l){return new je(a,l)};function je(a,l){Se.call(this),this.g=new Cc(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!B(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!B(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Dn(this)}C(je,Se),je.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},je.prototype.close=function(){ko(this.g)},je.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=yo(a),a=d);l.i.push(new Rm(l.Ya++,a)),l.G==3&&$s(l)},je.prototype.N=function(){this.g.l=null,delete this.j,ko(this.g),delete this.g,je.aa.N.call(this)};function qc(a){To.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}C(qc,To);function jc(){vo.call(this),this.status=1}C(jc,vo);function Dn(a){this.g=a}C(Dn,Bc),Dn.prototype.ua=function(){xe(this.g,"a")},Dn.prototype.ta=function(a){xe(this.g,new qc(a))},Dn.prototype.sa=function(a){xe(this.g,new jc)},Dn.prototype.ra=function(){xe(this.g,"b")},zs.prototype.createWebChannel=zs.prototype.g,je.prototype.send=je.prototype.o,je.prototype.open=je.prototype.m,je.prototype.close=je.prototype.close,Gd=function(){return new zs},$d=function(){return Vs()},jd=Qt,ea={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ns.NO_ERROR=0,Ns.TIMEOUT=8,Ns.HTTP_ERROR=6,oi=Ns,sc.COMPLETE="complete",qd=sc,Zu.EventType=Er,Er.OPEN="a",Er.CLOSE="b",Er.ERROR="c",Er.MESSAGE="d",Se.prototype.listen=Se.prototype.K,Br=Zu,pe.prototype.listenOnce=pe.prototype.L,pe.prototype.getLastError=pe.prototype.Ka,pe.prototype.getLastErrorCode=pe.prototype.Ba,pe.prototype.getStatus=pe.prototype.Z,pe.prototype.getResponseJson=pe.prototype.Oa,pe.prototype.getResponseText=pe.prototype.oa,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Ha,Bd=pe}).apply(typeof Ws<"u"?Ws:typeof self<"u"?self:typeof window<"u"?window:{});const yl="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ee.UNAUTHENTICATED=new Ee(null),Ee.GOOGLE_CREDENTIALS=new Ee("google-credentials-uid"),Ee.FIRST_PARTY=new Ee("first-party-uid"),Ee.MOCK_USER=new Ee("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ar="11.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dn=new Sa("@firebase/firestore");function Fn(){return dn.logLevel}function D(r,...e){if(dn.logLevel<=Q.DEBUG){const t=e.map(Fa);dn.debug(`Firestore (${ar}): ${r}`,...t)}}function Le(r,...e){if(dn.logLevel<=Q.ERROR){const t=e.map(Fa);dn.error(`Firestore (${ar}): ${r}`,...t)}}function Jn(r,...e){if(dn.logLevel<=Q.WARN){const t=e.map(Fa);dn.warn(`Firestore (${ar}): ${r}`,...t)}}function Fa(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(r="Unexpected state"){const e=`FIRESTORE (${ar}) INTERNAL ASSERTION FAILED: `+r;throw Le(e),new Error(e)}function F(r,e){r||L()}function $(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class N extends He{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class RI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ee.UNAUTHENTICATED))}shutdown(){}}class bI{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class SI{constructor(e){this.t=e,this.currentUser=Ee.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0);let n=this.i;const s=c=>this.i!==n?(n=this.i,t(c)):Promise.resolve();let i=new Qe;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Qe,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},u=c=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>u(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Qe)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string"),new zd(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string"),new Ee(e)}}class PI{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=Ee.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class CI{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new PI(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ee.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class kI{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class DI{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){F(this.o===void 0);const n=i=>{i.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,D("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>n(i))};const s=i=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(F(typeof t.token=="string"),this.R=t.token,new kI(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VI(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const s=VI(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%e.length))}return n}}function K(r,e){return r<e?-1:r>e?1:0}function Xn(r,e,t){return r.length===e.length&&r.every((n,s)=>t(n,e[s]))}function Hd(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new N(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new N(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return de.fromMillis(Date.now())}static fromDate(e){return de.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new de(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.timestamp=e}static fromTimestamp(e){return new U(e)}static min(){return new U(new de(0,0))}static max(){return new U(new de(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,t,n){t===void 0?t=0:t>e.length&&L(),n===void 0?n=e.length-t:n>e.length-t&&L(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Zr.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Zr?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=e.get(s),o=t.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Z extends Zr{construct(e,t,n){return new Z(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new N(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(s=>s.length>0))}return new Z(t)}static emptyPath(){return new Z([])}}const NI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends Zr{construct(e,t,n){return new he(e,t,n)}static isValidIdentifier(e){return NI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new he(["__name__"])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new N(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new N(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,s+=2}else u==="`"?(o=!o,s++):u!=="."||o?(n+=u,s++):(i(),s++)}if(i(),o)throw new N(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(Z.fromString(e))}static fromName(e){return new O(Z.fromString(e).popFirst(5))}static empty(){return new O(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new Z(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function ta(r){return r.fields.find(e=>e.kind===2)}function tn(r){return r.fields.filter(e=>e.kind!==2)}Ai.UNKNOWN_ID=-1;class ai{constructor(e,t){this.fieldPath=e,this.kind=t}}class es{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new es(0,Ge.min())}}function xI(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=U.fromTimestamp(n===1e9?new de(t+1,0):new de(t,n));return new Ge(s,O.empty(),e)}function Wd(r){return new Ge(r.readTime,r.key,-1)}class Ge{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Ge(U.min(),O.empty(),-1)}static max(){return new Ge(U.max(),O.empty(),-1)}}function Ua(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(r.documentKey,e.documentKey),t!==0?t:K(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qd="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Yd{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function An(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Qd)throw r;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):A.reject(t)}static resolve(e){return new A((t,n)=>{t(e)})}static reject(e){return new A((t,n)=>{n(e)})}static waitFor(e){return new A((t,n)=>{let s=0,i=0,o=!1;e.forEach(u=>{++s,u.next(()=>{++i,o&&i===s&&t()},c=>n(c))}),o=!0,i===s&&t()})}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next(s=>s?A.resolve(s):n());return t}static forEach(e,t){const n=[];return e.forEach((s,i)=>{n.push(t.call(this,s,i))}),this.waitFor(n)}static mapArray(e,t){return new A((n,s)=>{const i=e.length,o=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;t(e[h]).next(f=>{o[h]=f,++u,u===i&&n(o)},f=>s(f))}})}static doWhile(e,t){return new A((n,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new Qe,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new zr(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const s=Ba(n.target.error);this.V.reject(new zr(e,s))}}static open(e,t,n,s){try{return new ji(t,e.transaction(s,n))}catch(i){throw new zr(t,i)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(D("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new MI(t)}}class qt{constructor(e,t,n){this.name=e,this.version=t,this.p=n,qt.S(_e())===12.2&&Le("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return D("SimpleDb","Removing database:",e),nn(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!rd())return!1;if(qt.v())return!0;const e=_e(),t=qt.S(e),n=0<t&&t<10,s=Jd(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(D("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new zr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new N(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new N(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new zr(e,o))},s.onupgradeneeded=i=>{D("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.p.O(o,s.transaction,i.oldVersion,this.version).next(()=>{D("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.M(e);const u=ji.open(this.db,e,i?"readonly":"readwrite",n),c=s(u).next(h=>(u.g(),h)).catch(h=>(u.abort(h),A.reject(h))).toPromise();return c.catch(()=>{}),await u.m,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&o<3;if(D("SimpleDb","Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Jd(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class OI{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return nn(this.B.delete())}}class zr extends N{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Kt(r){return r.name==="IndexedDbTransactionError"}class MI{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(D("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(D("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),nn(n)}add(e){return D("SimpleDb","ADD",this.store.name,e,e),nn(this.store.add(e))}get(e){return nn(this.store.get(e)).next(t=>(t===void 0&&(t=null),D("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return D("SimpleDb","DELETE",this.store.name,e),nn(this.store.delete(e))}count(){return D("SimpleDb","COUNT",this.store.name),nn(this.store.count())}U(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A((o,u)=>{i.onerror=c=>{u(c.target.error)},i.onsuccess=c=>{o(c.target.result)}})}{const i=this.cursor(n),o=[];return this.W(i,(u,c)=>{o.push(c)}).next(()=>o)}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}})}j(e,t){D("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const s=this.cursor(n);return this.W(s,(i,o,u)=>u.delete())}J(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.W(s,t)}Y(e){const t=this.cursor({});return new A((n,s)=>{t.onerror=i=>{const o=Ba(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(u=>{u?o.continue():n()}):n()}})}W(e,t){const n=[];return new A((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const u=o.target.result;if(!u)return void s();const c=new OI(u),h=t(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch(p=>(c.done(),A.reject(p)));n.push(f)}c.isDone?s():c.K===null?u.continue():u.continue(c.K)}}).next(()=>A.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function nn(r){return new A((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Ba(n.target.error);t(s)}})}let Il=!1;function Ba(r){const e=qt.S(_e());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new N("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Il||(Il=!0,setTimeout(()=>{throw n},0)),n}}return r}class LI{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){D("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{D("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Kt(t)?D("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await An(t)}await this.X(6e4)})}}class FI{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){const n=new Set;let s=t,i=!0;return A.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return D("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,s).next(u=>{s-=u,n.add(o)});i=!1})).next(()=>t-s)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(s,i)).next(u=>(D("IndexBackfiller",`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(e,t,u))).next(()=>o.size)}))}re(e,t){let n=e;return t.changes.forEach((s,i)=>{const o=Wd(i);Ua(o,n)>0&&(n=o)}),new Ge(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}ze.oe=-1;function _s(r){return r==null}function ts(r){return r===0&&1/r==-1/0}function UI(r){return typeof r=="number"&&Number.isInteger(r)&&!ts(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Tl(e)),e=BI(r.get(t),e);return Tl(e)}function BI(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case"":t+="";break;default:t+=i}}return t}function Tl(r){return r+""}function Je(r){const e=r.length;if(F(e>=2),e===2)return F(r.charAt(0)===""&&r.charAt(1)===""),Z.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf("",i);switch((o<0||o>t)&&L(),r.charAt(o+1)){case"":const u=r.substring(i,o);let c;s.length===0?c=u:(s+=u,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:L()}i=o+2}return new Z(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ui(r,e){return[r,Ve(e)]}function Xd(r,e,t){return[r,Ve(e),t]}const qI={},jI=["prefixPath","collectionGroup","readTime","documentId"],$I=["prefixPath","collectionGroup","documentId"],GI=["collectionGroup","readTime","prefixPath","documentId"],zI=["canonicalId","targetId"],KI=["targetId","path"],HI=["path","targetId"],WI=["collectionId","parent"],QI=["indexId","uid"],YI=["uid","sequenceNumber"],JI=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],XI=["indexId","uid","orderedDocumentKey"],ZI=["userId","collectionPath","documentId"],eT=["userId","collectionPath","largestBatchId"],tT=["userId","collectionGroup","largestBatchId"],Zd=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],nT=[...Zd,"documentOverlays"],ef=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],tf=ef,qa=[...tf,"indexConfiguration","indexState","indexEntries"],rT=qa,sT=[...qa,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na extends Yd{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function ye(r,e){const t=$(r);return qt.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Ht(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function nf(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t){this.comparator=e,this.root=t||we.EMPTY}insert(e,t){return new ce(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,we.BLACK,null,null))}remove(e){return new ce(this.comparator,this.root.remove(e,this.comparator).copy(null,null,we.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Qs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Qs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Qs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Qs(this.root,e,this.comparator,!0)}}class Qs{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class we{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??we.RED,this.left=s??we.EMPTY,this.right=i??we.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new we(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return we.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return we.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,we.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,we.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();const e=this.left.check();if(e!==this.right.check())throw L();return e+(this.isRed()?0:1)}}we.EMPTY=null,we.RED=!0,we.BLACK=!1;we.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(e,t,n,s,i){return this}insert(e,t,n){return new we(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e){this.comparator=e,this.data=new ce(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new wl(this.data.getIterator())}getIteratorFrom(e){return new wl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof ne)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ne(this.comparator);return t.data=e,t}}class wl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Nn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new Be([])}unionWith(e){let t=new ne(he.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Be(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Xn(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new rf("Invalid base64 string: "+i):i}}(e);return new ge(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ge.EMPTY_BYTE_STRING=new ge("");const iT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function It(r){if(F(!!r),typeof r=="string"){let e=0;const t=iT.exec(r);if(F(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:oe(r.seconds),nanos:oe(r.nanos)}}function oe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Tt(r){return typeof r=="string"?ge.fromBase64String(r):ge.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ja(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function $i(r){const e=r.mapValue.fields.__previous_value__;return ja(e)?$i(e):e}function ns(r){const e=It(r.mapValue.fields.__local_write_time__.timestampValue);return new de(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e,t,n,s,i,o,u,c,h){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h}}class fn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new fn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof fn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},ci={nullValue:"NULL_VALUE"};function $t(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?ja(r)?4:sf(r)?9007199254740991:Gi(r)?10:11:L()}function st(r,e){if(r===e)return!0;const t=$t(r);if(t!==$t(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return ns(r).isEqual(ns(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=It(s.timestampValue),u=It(i.timestampValue);return o.seconds===u.seconds&&o.nanos===u.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(s,i){return Tt(s.bytesValue).isEqual(Tt(i.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(s,i){return oe(s.geoPointValue.latitude)===oe(i.geoPointValue.latitude)&&oe(s.geoPointValue.longitude)===oe(i.geoPointValue.longitude)}(r,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return oe(s.integerValue)===oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=oe(s.doubleValue),u=oe(i.doubleValue);return o===u?ts(o)===ts(u):isNaN(o)&&isNaN(u)}return!1}(r,e);case 9:return Xn(r.arrayValue.values||[],e.arrayValue.values||[],st);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},u=i.mapValue.fields||{};if(El(o)!==El(u))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(u[c]===void 0||!st(o[c],u[c])))return!1;return!0}(r,e);default:return L()}}function rs(r,e){return(r.values||[]).find(t=>st(t,e))!==void 0}function Gt(r,e){if(r===e)return 0;const t=$t(r),n=$t(e);if(t!==n)return K(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(r.booleanValue,e.booleanValue);case 2:return function(i,o){const u=oe(i.integerValue||i.doubleValue),c=oe(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1}(r,e);case 3:return Al(r.timestampValue,e.timestampValue);case 4:return Al(ns(r),ns(e));case 5:return K(r.stringValue,e.stringValue);case 6:return function(i,o){const u=Tt(i),c=Tt(o);return u.compareTo(c)}(r.bytesValue,e.bytesValue);case 7:return function(i,o){const u=i.split("/"),c=o.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=K(u[h],c[h]);if(f!==0)return f}return K(u.length,c.length)}(r.referenceValue,e.referenceValue);case 8:return function(i,o){const u=K(oe(i.latitude),oe(o.latitude));return u!==0?u:K(oe(i.longitude),oe(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Rl(r.arrayValue,e.arrayValue);case 10:return function(i,o){var u,c,h,f;const p=i.fields||{},_=o.fields||{},w=(u=p.value)===null||u===void 0?void 0:u.arrayValue,C=(c=_.value)===null||c===void 0?void 0:c.arrayValue,V=K(((h=w==null?void 0:w.values)===null||h===void 0?void 0:h.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:Rl(w,C)}(r.mapValue,e.mapValue);case 11:return function(i,o){if(i===Ft.mapValue&&o===Ft.mapValue)return 0;if(i===Ft.mapValue)return 1;if(o===Ft.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const _=K(c[p],f[p]);if(_!==0)return _;const w=Gt(u[c[p]],h[f[p]]);if(w!==0)return w}return K(c.length,f.length)}(r.mapValue,e.mapValue);default:throw L()}}function Al(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return K(r,e);const t=It(r),n=It(e),s=K(t.seconds,n.seconds);return s!==0?s:K(t.nanos,n.nanos)}function Rl(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Gt(t[s],n[s]);if(i)return i}return K(t.length,n.length)}function Zn(r){return ra(r)}function ra(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=It(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return Tt(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return O.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=ra(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${ra(t.fields[o])}`;return s+"}"}(r.mapValue):L()}function li(r){switch($t(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=$i(r);return e?16+li(e):16;case 5:return 2*r.stringValue.length;case 6:return Tt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+li(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Ht(n.fields,(i,o)=>{s+=i.length+li(o)}),s}(r.mapValue);default:throw L()}}function ss(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function sa(r){return!!r&&"integerValue"in r}function is(r){return!!r&&"arrayValue"in r}function bl(r){return!!r&&"nullValue"in r}function Sl(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function hi(r){return!!r&&"mapValue"in r}function Gi(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Kr(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return Ht(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Kr(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Kr(r.arrayValue.values[t]);return e}return Object.assign({},r)}function sf(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const of={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function aT(r){return"nullValue"in r?ci:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?ss(fn.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Gi(r)?of:{mapValue:{}}:L()}function uT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?ss(fn.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?of:"mapValue"in r?Gi(r)?{mapValue:{}}:Ft:L()}function Pl(r,e){const t=Gt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Cl(r,e){const t=Gt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.value=e}static empty(){return new Ae({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!hi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Kr(t)}setAll(e){let t=he.emptyPath(),n={},s=[];e.forEach((o,u)=>{if(!t.isImmediateParentOf(u)){const c=this.getFieldsMap(t);this.applyChanges(c,n,s),n={},s=[],t=u.popLast()}o?n[u.lastSegment()]=Kr(o):s.push(u.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());hi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return st(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];hi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Ht(t,(s,i)=>e[s]=i);for(const s of n)delete e[s]}clone(){return new Ae(Kr(this.value))}}function af(r){const e=[];return Ht(r.fields,(t,n)=>{const s=new he([t]);if(hi(n)){const i=af(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new Be(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,t,n,s,i,o,u){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=u}static newInvalidDocument(e){return new ae(e,0,U.min(),U.min(),U.min(),Ae.empty(),0)}static newFoundDocument(e,t,n,s){return new ae(e,1,t,U.min(),n,s,0)}static newNoDocument(e,t){return new ae(e,2,t,U.min(),U.min(),Ae.empty(),0)}static newUnknownDocument(e,t){return new ae(e,3,t,U.min(),U.min(),Ae.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ae.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ae.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ae&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ae(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e,t){this.position=e,this.inclusive=t}}function kl(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=O.comparator(O.fromName(o.referenceValue),t.key):n=Gt(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Dl(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!st(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e,t="asc"){this.field=e,this.dir=t}}function cT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uf{}class Y extends uf{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new lT(e,t,n):t==="array-contains"?new fT(e,n):t==="in"?new pf(e,n):t==="not-in"?new pT(e,n):t==="array-contains-any"?new mT(e,n):new Y(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new hT(e,n):new dT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Gt(t,this.value)):t!==null&&$t(this.value)===$t(t)&&this.matchesComparison(Gt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class te extends uf{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new te(e,t)}matches(e){return tr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function tr(r){return r.op==="and"}function ia(r){return r.op==="or"}function $a(r){return cf(r)&&tr(r)}function cf(r){for(const e of r.filters)if(e instanceof te)return!1;return!0}function oa(r){if(r instanceof Y)return r.field.canonicalString()+r.op.toString()+Zn(r.value);if($a(r))return r.filters.map(e=>oa(e)).join(",");{const e=r.filters.map(t=>oa(t)).join(",");return`${r.op}(${e})`}}function lf(r,e){return r instanceof Y?function(n,s){return s instanceof Y&&n.op===s.op&&n.field.isEqual(s.field)&&st(n.value,s.value)}(r,e):r instanceof te?function(n,s){return s instanceof te&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,o,u)=>i&&lf(o,s.filters[u]),!0):!1}(r,e):void L()}function hf(r,e){const t=r.filters.concat(e);return te.create(t,r.op)}function df(r){return r instanceof Y?function(t){return`${t.field.canonicalString()} ${t.op} ${Zn(t.value)}`}(r):r instanceof te?function(t){return t.op.toString()+" {"+t.getFilters().map(df).join(" ,")+"}"}(r):"Filter"}class lT extends Y{constructor(e,t,n){super(e,t,n),this.key=O.fromName(n.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class hT extends Y{constructor(e,t){super(e,"in",t),this.keys=ff("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class dT extends Y{constructor(e,t){super(e,"not-in",t),this.keys=ff("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ff(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>O.fromName(n.referenceValue))}class fT extends Y{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return is(t)&&rs(t.arrayValue,this.value)}}class pf extends Y{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&rs(this.value.arrayValue,t)}}class pT extends Y{constructor(e,t){super(e,"not-in",t)}matches(e){if(rs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!rs(this.value.arrayValue,t)}}class mT extends Y{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!is(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>rs(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(e,t=null,n=[],s=[],i=null,o=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=u,this.ue=null}}function aa(r,e=null,t=[],n=[],s=null,i=null,o=null){return new gT(r,e,t,n,s,i,o)}function pn(r){const e=$(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>oa(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),_s(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>Zn(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>Zn(n)).join(",")),e.ue=t}return e.ue}function ys(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!cT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!lf(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Dl(r.startAt,e.startAt)&&Dl(r.endAt,e.endAt)}function Ri(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function bi(r,e){return r.filters.filter(t=>t instanceof Y&&t.field.isEqual(e))}function Vl(r,e,t){let n=ci,s=!0;for(const i of bi(r,e)){let o=ci,u=!0;switch(i.op){case"<":case"<=":o=aT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,u=!1;break;case"!=":case"not-in":o=ci}Pl({value:n,inclusive:s},{value:o,inclusive:u})<0&&(n=o,s=u)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Pl({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function Nl(r,e,t){let n=Ft,s=!0;for(const i of bi(r,e)){let o=Ft,u=!0;switch(i.op){case">=":case">":o=uT(i.value),u=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,u=!1;break;case"!=":case"not-in":o=Ft}Cl({value:n,inclusive:s},{value:o,inclusive:u})>0&&(n=o,s=u)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Cl({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e,t=null,n=[],s=[],i=null,o="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=u,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function _T(r,e,t,n,s,i,o,u){return new ur(r,e,t,n,s,i,o,u)}function Is(r){return new ur(r)}function xl(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function mf(r){return r.collectionGroup!==null}function Hr(r){const e=$(r);if(e.ce===null){e.ce=[];const t=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new ne(he.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(u=u.add(h.field))})}),u})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.ce.push(new os(i,n))}),t.has(he.keyField().canonicalString())||e.ce.push(new os(he.keyField(),n))}return e.ce}function Ke(r){const e=$(r);return e.le||(e.le=yT(e,Hr(r))),e.le}function yT(r,e){if(r.limitType==="F")return aa(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new os(s.field,i)});const t=r.endAt?new er(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new er(r.startAt.position,r.startAt.inclusive):null;return aa(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function ua(r,e){const t=r.filters.concat([e]);return new ur(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function Si(r,e,t){return new ur(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function zi(r,e){return ys(Ke(r),Ke(e))&&r.limitType===e.limitType}function gf(r){return`${pn(Ke(r))}|lt:${r.limitType}`}function Un(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(s=>df(s)).join(", ")}]`),_s(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>Zn(s)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>Zn(s)).join(",")),`Target(${n})`}(Ke(r))}; limitType=${r.limitType})`}function Ts(r,e){return e.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):O.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,e)&&function(n,s){for(const i of Hr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,e)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,e)&&function(n,s){return!(n.startAt&&!function(o,u,c){const h=kl(o,u,c);return o.inclusive?h<=0:h<0}(n.startAt,Hr(n),s)||n.endAt&&!function(o,u,c){const h=kl(o,u,c);return o.inclusive?h>=0:h>0}(n.endAt,Hr(n),s))}(r,e)}function IT(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function _f(r){return(e,t)=>{let n=!1;for(const s of Hr(r)){const i=TT(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function TT(r,e,t){const n=r.field.isKeyField()?O.comparator(e.key,t.key):function(i,o,u){const c=o.data.field(i),h=u.data.field(i);return c!==null&&h!==null?Gt(c,h):L()}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Ht(this.inner,(t,n)=>{for(const[s,i]of n)e(s,i)})}isEmpty(){return nf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vT=new ce(O.comparator);function $e(){return vT}const yf=new ce(O.comparator);function qr(...r){let e=yf;for(const t of r)e=e.insert(t.key,t);return e}function If(r){let e=yf;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Xe(){return Wr()}function Tf(){return Wr()}function Wr(){return new vt(r=>r.toString(),(r,e)=>r.isEqual(e))}const ET=new ce(O.comparator),wT=new ne(O.comparator);function H(...r){let e=wT;for(const t of r)e=e.add(t);return e}const AT=new ne(K);function RT(){return AT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ts(e)?"-0":e}}function vf(r){return{integerValue:""+r}}function Ef(r,e){return UI(e)?vf(e):Ga(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(){this._=void 0}}function bT(r,e,t){return r instanceof nr?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&ja(i)&&(i=$i(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(t,e):r instanceof mn?Af(r,e):r instanceof gn?Rf(r,e):function(s,i){const o=wf(s,i),u=Ol(o)+Ol(s.Pe);return sa(o)&&sa(s.Pe)?vf(u):Ga(s.serializer,u)}(r,e)}function ST(r,e,t){return r instanceof mn?Af(r,e):r instanceof gn?Rf(r,e):t}function wf(r,e){return r instanceof rr?function(n){return sa(n)||function(i){return!!i&&"doubleValue"in i}(n)}(e)?e:{integerValue:0}:null}class nr extends Ki{}class mn extends Ki{constructor(e){super(),this.elements=e}}function Af(r,e){const t=bf(e);for(const n of r.elements)t.some(s=>st(s,n))||t.push(n);return{arrayValue:{values:t}}}class gn extends Ki{constructor(e){super(),this.elements=e}}function Rf(r,e){let t=bf(e);for(const n of r.elements)t=t.filter(s=>!st(s,n));return{arrayValue:{values:t}}}class rr extends Ki{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Ol(r){return oe(r.integerValue||r.doubleValue)}function bf(r){return is(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,t){this.field=e,this.transform=t}}function PT(r,e){return r.field.isEqual(e.field)&&function(n,s){return n instanceof mn&&s instanceof mn||n instanceof gn&&s instanceof gn?Xn(n.elements,s.elements,st):n instanceof rr&&s instanceof rr?st(n.Pe,s.Pe):n instanceof nr&&s instanceof nr}(r.transform,e.transform)}class CT{constructor(e,t){this.version=e,this.transformResults=t}}class ue{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ue}static exists(e){return new ue(void 0,e)}static updateTime(e){return new ue(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function di(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Hi{}function Sf(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new lr(r.key,ue.none()):new cr(r.key,r.data,ue.none());{const t=r.data,n=Ae.empty();let s=new ne(he.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new Et(r.key,n,new Be(s.toArray()),ue.none())}}function kT(r,e,t){r instanceof cr?function(s,i,o){const u=s.value.clone(),c=Ll(s.fieldTransforms,i,o.transformResults);u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):r instanceof Et?function(s,i,o){if(!di(s.precondition,i))return void i.convertToUnknownDocument(o.version);const u=Ll(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Pf(s)),c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Qr(r,e,t,n){return r instanceof cr?function(i,o,u,c){if(!di(i.precondition,o))return u;const h=i.value.clone(),f=Fl(i.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof Et?function(i,o,u,c){if(!di(i.precondition,o))return u;const h=Fl(i.fieldTransforms,c,o),f=o.data;return f.setAll(Pf(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(r,e,t,n):function(i,o,u){return di(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u}(r,e,t)}function DT(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=wf(n.transform,s||null);i!=null&&(t===null&&(t=Ae.empty()),t.set(n.field,i))}return t||null}function Ml(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Xn(n,s,(i,o)=>PT(i,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class cr extends Hi{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Et extends Hi{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Pf(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function Ll(r,e,t){const n=new Map;F(r.length===t.length);for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,u=e.data.field(i.field);n.set(i.field,ST(o,u,t[s]))}return n}function Fl(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,bT(i,o,e))}return n}class lr extends Hi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class za extends Hi{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&kT(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Qr(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Qr(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Tf();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let u=this.applyToLocalView(o,i.mutatedFields);u=t.has(s.key)?null:u;const c=Sf(o,u);c!==null&&n.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(U.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),H())}isEqual(e){return this.batchId===e.batchId&&Xn(this.mutations,e.mutations,(t,n)=>Ml(t,n))&&Xn(this.baseMutations,e.baseMutations,(t,n)=>Ml(t,n))}}class Ha{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){F(e.mutations.length===n.length);let s=function(){return ET}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new Ha(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wa{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var me,J;function Cf(r){switch(r){default:return L();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function kf(r){if(r===void 0)return Le("GRPC error has no .code"),P.UNKNOWN;switch(r){case me.OK:return P.OK;case me.CANCELLED:return P.CANCELLED;case me.UNKNOWN:return P.UNKNOWN;case me.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case me.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case me.INTERNAL:return P.INTERNAL;case me.UNAVAILABLE:return P.UNAVAILABLE;case me.UNAUTHENTICATED:return P.UNAUTHENTICATED;case me.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case me.NOT_FOUND:return P.NOT_FOUND;case me.ALREADY_EXISTS:return P.ALREADY_EXISTS;case me.PERMISSION_DENIED:return P.PERMISSION_DENIED;case me.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case me.ABORTED:return P.ABORTED;case me.OUT_OF_RANGE:return P.OUT_OF_RANGE;case me.UNIMPLEMENTED:return P.UNIMPLEMENTED;case me.DATA_LOSS:return P.DATA_LOSS;default:return L()}}(J=me||(me={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NT(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xT=new un([4294967295,4294967295],0);function Ul(r){const e=NT().encode(r),t=new Ud;return t.update(e),new Uint8Array(t.digest())}function Bl(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new un([t,n],0),new un([s,i],0)]}class Qa{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new jr(`Invalid padding: ${t}`);if(n<0)throw new jr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new jr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new jr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=un.fromNumber(this.Ie)}Ee(e,t,n){let s=e.add(t.multiply(un.fromNumber(n)));return s.compare(xT)===1&&(s=new un([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Ul(e),[n,s]=Bl(t);for(let i=0;i<this.hashCount;i++){const o=this.Ee(n,s,i);if(!this.de(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Qa(i,s,t);return n.forEach(u=>o.insert(u)),o}insert(e){if(this.Ie===0)return;const t=Ul(e),[n,s]=Bl(t);for(let i=0;i<this.hashCount;i++){const o=this.Ee(n,s,i);this.Ae(o)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class jr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Es.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Wi(U.min(),s,new ce(K),$e(),H())}}class Es{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Es(n,t,H(),H(),H())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fi{constructor(e,t,n,s){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=s}}class Df{constructor(e,t){this.targetId=e,this.me=t}}class Vf{constructor(e,t,n=ge.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class ql{constructor(){this.fe=0,this.ge=$l(),this.pe=ge.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=H(),t=H(),n=H();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:L()}}),new Es(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=$l()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,F(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class OT{constructor(e){this.Le=e,this.Be=new Map,this.ke=$e(),this.qe=jl(),this.Qe=new ce(K)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:L()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((n,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,n=e.me.count,s=this.Je(t);if(s){const i=s.target;if(Ri(i))if(n===0){const o=new O(i.path);this.Ue(t,o,ae.newNoDocument(o,U.min()))}else F(n===1);else{const o=this.Ye(t);if(o!==n){const u=this.Ze(e),c=u?this.Xe(u,e,o):1;if(c!==0){this.je(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,u;try{o=Tt(n).toUint8Array()}catch(c){if(c instanceof rf)return Jn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new Qa(o,s,i)}catch(c){return Jn(c instanceof jr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.Ie===0?null:u}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let s=0;return n.forEach(i=>{const o=this.Le.tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.Ue(t,i,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((i,o)=>{const u=this.Je(o);if(u){if(i.current&&Ri(u.target)){const c=new O(u.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,ae.newNoDocument(c,e))}i.be&&(t.set(o,i.ve()),i.Ce())}});let n=H();this.qe.forEach((i,o)=>{let u=!0;o.forEachWhile(c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Wi(e,t,this.Qe,this.ke,n);return this.ke=$e(),this.qe=jl(),this.Qe=new ce(K),s}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new ql,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ne(K),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||D("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new ql),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function jl(){return new ce(O.comparator)}function $l(){return new ce(O.comparator)}const MT={asc:"ASCENDING",desc:"DESCENDING"},LT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},FT={and:"AND",or:"OR"};class UT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ca(r,e){return r.useProto3Json||_s(e)?e:{value:e}}function sr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Nf(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function BT(r,e){return sr(r,e.toTimestamp())}function Te(r){return F(!!r),U.fromTimestamp(function(t){const n=It(t);return new de(n.seconds,n.nanos)}(r))}function Ya(r,e){return la(r,e).canonicalString()}function la(r,e){const t=function(s){return new Z(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?t:t.child(e)}function xf(r){const e=Z.fromString(r);return F($f(e)),e}function as(r,e){return Ya(r.databaseId,e.path)}function pt(r,e){const t=xf(e);if(t.get(1)!==r.databaseId.projectId)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new N(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new O(Lf(t))}function Of(r,e){return Ya(r.databaseId,e)}function Mf(r){const e=xf(r);return e.length===4?Z.emptyPath():Lf(e)}function ha(r){return new Z(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Lf(r){return F(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Gl(r,e,t){return{name:as(r,e),fields:t.value.mapValue.fields}}function qT(r,e,t){const n=pt(r,e.name),s=Te(e.updateTime),i=e.createTime?Te(e.createTime):U.min(),o=new Ae({mapValue:{fields:e.fields}}),u=ae.newFoundDocument(n,s,i,o);return t&&u.setHasCommittedMutations(),t?u.setHasCommittedMutations():u}function jT(r,e){return"found"in e?function(n,s){F(!!s.found),s.found.name,s.found.updateTime;const i=pt(n,s.found.name),o=Te(s.found.updateTime),u=s.found.createTime?Te(s.found.createTime):U.min(),c=new Ae({mapValue:{fields:s.found.fields}});return ae.newFoundDocument(i,o,u,c)}(r,e):"missing"in e?function(n,s){F(!!s.missing),F(!!s.readTime);const i=pt(n,s.missing),o=Te(s.readTime);return ae.newNoDocument(i,o)}(r,e):L()}function $T(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:L()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string"),ge.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array),ge.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,u=o&&function(h){const f=h.code===void 0?P.UNKNOWN:kf(h.code);return new N(f,h.message||"")}(o);t=new Vf(n,s,i,u||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=pt(r,n.document.name),i=Te(n.document.updateTime),o=n.document.createTime?Te(n.document.createTime):U.min(),u=new Ae({mapValue:{fields:n.document.fields}}),c=ae.newFoundDocument(s,i,o,u),h=n.targetIds||[],f=n.removedTargetIds||[];t=new fi(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=pt(r,n.document),i=n.readTime?Te(n.readTime):U.min(),o=ae.newNoDocument(s,i),u=n.removedTargetIds||[];t=new fi([],u,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=pt(r,n.document),i=n.removedTargetIds||[];t=new fi([],i,s,null)}else{if(!("filter"in e))return L();{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new VT(s,i),u=n.targetId;t=new Df(u,o)}}return t}function us(r,e){let t;if(e instanceof cr)t={update:Gl(r,e.key,e.value)};else if(e instanceof lr)t={delete:as(r,e.key)};else if(e instanceof Et)t={update:Gl(r,e.key,e.data),updateMask:QT(e.fieldMask)};else{if(!(e instanceof za))return L();t={verify:as(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(i,o){const u=o.transform;if(u instanceof nr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof mn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof gn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof rr)return{fieldPath:o.field.canonicalString(),increment:u.Pe};throw L()}(0,n))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:BT(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:L()}(r,e.precondition)),t}function da(r,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?ue.updateTime(Te(i.updateTime)):i.exists!==void 0?ue.exists(i.exists):ue.none()}(e.currentDocument):ue.none(),n=e.updateTransforms?e.updateTransforms.map(s=>function(o,u){let c=null;if("setToServerValue"in u)F(u.setToServerValue==="REQUEST_TIME"),c=new nr;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new mn(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new gn(f)}else"increment"in u?c=new rr(o,u.increment):L();const h=he.fromServerFormat(u.fieldPath);return new vs(h,c)}(r,s)):[];if(e.update){e.update.name;const s=pt(r,e.update.name),i=new Ae({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(c){const h=c.fieldPaths||[];return new Be(h.map(f=>he.fromServerFormat(f)))}(e.updateMask);return new Et(s,i,o,t,n)}return new cr(s,i,t,n)}if(e.delete){const s=pt(r,e.delete);return new lr(s,t)}if(e.verify){const s=pt(r,e.verify);return new za(s,t)}return L()}function GT(r,e){return r&&r.length>0?(F(e!==void 0),r.map(t=>function(s,i){let o=s.updateTime?Te(s.updateTime):Te(i);return o.isEqual(U.min())&&(o=Te(i)),new CT(o,s.transformResults||[])}(t,e))):[]}function Ff(r,e){return{documents:[Of(r,e.path)]}}function Uf(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Of(r,s);const i=function(h){if(h.length!==0)return jf(te.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(f=>function(_){return{field:Bn(_.field),direction:KT(_.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const u=ca(r,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:s}}function Bf(r){let e=Mf(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){F(n===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const _=qf(p);return _ instanceof te&&$a(_)?_.getFilters():[_]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(_=>function(C){return new os(qn(C.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(_))}(t.orderBy));let u=null;t.limit&&(u=function(p){let _;return _=typeof p=="object"?p.value:p,_s(_)?null:_}(t.limit));let c=null;t.startAt&&(c=function(p){const _=!!p.before,w=p.values||[];return new er(w,_)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const _=!p.before,w=p.values||[];return new er(w,_)}(t.endAt)),_T(e,s,o,i,u,"F",c,h)}function zT(r,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function qf(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=qn(t.unaryFilter.field);return Y.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=qn(t.unaryFilter.field);return Y.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=qn(t.unaryFilter.field);return Y.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=qn(t.unaryFilter.field);return Y.create(o,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(t){return Y.create(qn(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return te.create(t.compositeFilter.filters.map(n=>qf(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L()}}(t.compositeFilter.op))}(r):L()}function KT(r){return MT[r]}function HT(r){return LT[r]}function WT(r){return FT[r]}function Bn(r){return{fieldPath:r.canonicalString()}}function qn(r){return he.fromServerFormat(r.fieldPath)}function jf(r){return r instanceof Y?function(t){if(t.op==="=="){if(Sl(t.value))return{unaryFilter:{field:Bn(t.field),op:"IS_NAN"}};if(bl(t.value))return{unaryFilter:{field:Bn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Sl(t.value))return{unaryFilter:{field:Bn(t.field),op:"IS_NOT_NAN"}};if(bl(t.value))return{unaryFilter:{field:Bn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Bn(t.field),op:HT(t.op),value:t.value}}}(r):r instanceof te?function(t){const n=t.getFilters().map(s=>jf(s));return n.length===1?n[0]:{compositeFilter:{op:WT(t.op),filters:n}}}(r):L()}function QT(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function $f(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e,t,n,s,i=U.min(),o=U.min(),u=ge.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new ft(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ft(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(e){this.ct=e}}function YT(r,e){let t;if(e.document)t=qT(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=O.fromSegments(e.noDocument.path),s=yn(e.noDocument.readTime);t=ae.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L();{const n=O.fromSegments(e.unknownDocument.path),s=yn(e.unknownDocument.version);t=ae.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime(function(s){const i=new de(s[0],s[1]);return U.fromTimestamp(i)}(e.readTime)),t}function zl(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Pi(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(i,o){return{name:as(i,o.key),fields:o.data.value.mapValue.fields,updateTime:sr(i,o.version.toTimestamp()),createTime:sr(i,o.createTime.toTimestamp())}}(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:_n(e.version)};else{if(!e.isUnknownDocument())return L();n.unknownDocument={path:t.path.toArray(),version:_n(e.version)}}return n}function Pi(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function _n(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function yn(r){const e=new de(r.seconds,r.nanoseconds);return U.fromTimestamp(e)}function rn(r,e){const t=(e.baseMutations||[]).map(i=>da(r.ct,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const u=e.mutations[i+1];o.updateTransforms=u.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map(i=>da(r.ct,i)),s=de.fromMillis(e.localWriteTimeMs);return new Ka(e.batchId,s,t,n)}function $r(r){const e=yn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?yn(r.lastLimboFreeSnapshotVersion):U.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){return F(i.documents.length===1),Ke(Is(Mf(i.documents[0])))}(r.query):function(i){return Ke(Bf(i))}(r.query),new ft(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,ge.fromBase64String(r.resumeToken))}function zf(r,e){const t=_n(e.snapshotVersion),n=_n(e.lastLimboFreeSnapshotVersion);let s;s=Ri(e.target)?Ff(r.ct,e.target):Uf(r.ct,e.target)._t;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:pn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Kf(r){const e=Bf({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Si(e,e.limit,"L"):e}function Fo(r,e){return new Wa(e.largestBatchId,da(r.ct,e.overlayMutation))}function Kl(r,e){const t=e.path.lastSegment();return[r,Ve(e.path.popLast()),t]}function Hl(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:_n(n.readTime),documentKey:Ve(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{getBundleMetadata(e,t){return Wl(e).get(t).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:yn(i.createTime),version:i.version}}(n)})}saveBundleMetadata(e,t){return Wl(e).put(function(s){return{bundleId:s.id,createTime:_n(Te(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return Ql(e).get(t).next(n=>{if(n)return function(i){return{name:i.name,query:Kf(i.bundledQuery),readTime:yn(i.readTime)}}(n)})}saveNamedQuery(e,t){return Ql(e).put(function(s){return{name:s.name,readTime:_n(Te(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function Wl(r){return ye(r,"bundles")}function Ql(r){return ye(r,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new Qi(e,n)}getOverlay(e,t){return xr(e).get(Kl(this.userId,t)).next(n=>n?Fo(this.serializer,n):null)}getOverlays(e,t){const n=Xe();return A.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){const s=[];return n.forEach((i,o)=>{const u=new Wa(t,o);s.push(this.ht(e,u))}),A.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach(o=>s.add(Ve(o.getCollectionPath())));const i=[];return s.forEach(o=>{const u=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(xr(e).j("collectionPathOverlayIndex",u))}),A.waitFor(i)}getOverlaysForCollection(e,t,n){const s=Xe(),i=Ve(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return xr(e).U("collectionPathOverlayIndex",o).next(u=>{for(const c of u){const h=Fo(this.serializer,c);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,n,s){const i=Xe();let o;const u=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return xr(e).J({index:"collectionGroupOverlayIndex",range:u},(c,h,f)=>{const p=Fo(this.serializer,h);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()}).next(()=>i)}ht(e,t){return xr(e).put(function(s,i,o){const[u,c,h]=Kl(i,o.mutation.key);return{userId:i,collectionPath:c,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:us(s.ct,o.mutation)}}(this.serializer,this.userId,t))}}function xr(r){return ye(r,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XT{Pt(e){return ye(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?ge.fromUint8Array(n):ge.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(oe(e.integerValue));else if("doubleValue"in e){const n=oe(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),ts(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=It(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(Tt(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?sf(e)?this.dt(t,Number.MAX_SAFE_INTEGER):Gi(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):L()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const s of Object.keys(n))this.Vt(s,t),this.Tt(n[s],t)}wt(e,t){var n,s;const i=e.fields||{};this.dt(t,53);const o="value",u=((s=(n=i[o].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.length)||0;this.dt(t,15),t.At(oe(u)),this.Vt(o,t),this.Tt(i[o],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const s of n)this.Tt(s,t)}yt(e,t){this.dt(t,37),O.fromName(e).path.forEach(n=>{this.dt(t,60),this.Dt(n,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}}sn.vt=new sn;function ZT(r){if(r===0)return 8;let e=0;return r>>4==0&&(e+=4,r<<=4),r>>6==0&&(e+=2,r<<=2),r>>7==0&&(e+=1),e}function Yl(r){const e=64-function(n){let s=0;for(let i=0;i<8;++i){const o=ZT(255&n[i]);if(s+=o,o!==8)break}return s}(r);return Math.ceil(e/8)}class ev{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const s=t.codePointAt(0);this.Ft(240|s>>>18),this.Ft(128|63&s>>>12),this.Ft(128|63&s>>>6),this.Ft(128|63&s)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const s=t.codePointAt(0);this.Ot(240|s>>>18),this.Ot(128|63&s>>>12),this.Ot(128|63&s>>>6),this.Ot(128|63&s)}}this.Nt()}kt(e){const t=this.qt(e),n=Yl(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}Kt(e){const t=this.qt(e),n=Yl(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class tv{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class nv{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class Or{constructor(){this.jt=new ev,this.Ht=new tv(this.jt),this.Jt=new nv(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,t,n,s){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=s}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new on(this.indexId,this.documentKey,this.arrayValue,n)}}function Ct(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=Jl(r.arrayValue,e.arrayValue),t!==0?t:(t=Jl(r.directionalValue,e.directionalValue),t!==0?t:O.comparator(r.documentKey,e.documentKey)))}function Jl(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e){this.Xt=new ne((t,n)=>he.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(F(e.collectionGroup===this.collectionId),this.nn)return!1;const t=ta(e);if(t!==void 0&&!this.sn(t))return!1;const n=tn(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.sn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Xt.size>0){const u=this.Xt.getIterator().getNext();if(!s.has(u.field.canonicalString())){const c=n[i];if(!this.on(u,c)||!this._n(this.en[o++],c))return!1}++i}for(;i<n.length;++i){const u=n[i];if(o>=this.en.length||!this._n(this.en[o++],u))return!1}return!0}an(){if(this.nn)return null;let e=new ne(he.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new ai(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new ai(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new ai(n.field,n.dir==="asc"?0:1)));return new Ai(Ai.UNKNOWN_ID,this.collectionId,t,es.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hf(r){var e,t;if(F(r instanceof Y||r instanceof te),r instanceof Y){if(r instanceof pf){const s=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(i=>Y.create(r.field,"==",i)))||[];return te.create(s,"or")}return r}const n=r.filters.map(s=>Hf(s));return te.create(n,r.op)}function rv(r){if(r.getFilters().length===0)return[];const e=ma(Hf(r));return F(Wf(e)),fa(e)||pa(e)?[e]:e.getFilters()}function fa(r){return r instanceof Y}function pa(r){return r instanceof te&&$a(r)}function Wf(r){return fa(r)||pa(r)||function(t){if(t instanceof te&&ia(t)){for(const n of t.getFilters())if(!fa(n)&&!pa(n))return!1;return!0}return!1}(r)}function ma(r){if(F(r instanceof Y||r instanceof te),r instanceof Y)return r;if(r.filters.length===1)return ma(r.filters[0]);const e=r.filters.map(n=>ma(n));let t=te.create(e,r.op);return t=Ci(t),Wf(t)?t:(F(t instanceof te),F(tr(t)),F(t.filters.length>1),t.filters.reduce((n,s)=>Ja(n,s)))}function Ja(r,e){let t;return F(r instanceof Y||r instanceof te),F(e instanceof Y||e instanceof te),t=r instanceof Y?e instanceof Y?function(s,i){return te.create([s,i],"and")}(r,e):Zl(r,e):e instanceof Y?Zl(e,r):function(s,i){if(F(s.filters.length>0&&i.filters.length>0),tr(s)&&tr(i))return hf(s,i.getFilters());const o=ia(s)?s:i,u=ia(s)?i:s,c=o.filters.map(h=>Ja(h,u));return te.create(c,"or")}(r,e),Ci(t)}function Zl(r,e){if(tr(e))return hf(e,r.getFilters());{const t=e.filters.map(n=>Ja(r,n));return te.create(t,"or")}}function Ci(r){if(F(r instanceof Y||r instanceof te),r instanceof Y)return r;const e=r.getFilters();if(e.length===1)return Ci(e[0]);if(cf(r))return r;const t=e.map(s=>Ci(s)),n=[];return t.forEach(s=>{s instanceof Y?n.push(s):s instanceof te&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:te.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sv{constructor(){this.un=new Xa}addToCollectionParentIndex(e,t){return this.un.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(Ge.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(Ge.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Xa{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new ne(Z.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new ne(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys=new Uint8Array(0);class iv{constructor(e,t){this.databaseId=t,this.cn=new Xa,this.ln=new vt(n=>pn(n),(n,s)=>ys(n,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});const i={collectionId:n,parent:Ve(s)};return eh(e).put(i)}return A.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[Hd(t),""],!1,!0);return eh(e).U(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;n.push(Je(o.parent))}return n})}addFieldIndex(e,t){const n=Mr(e),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(c=>[c.fieldPath.canonicalString(),c.kind])}}(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=On(e);return i.next(u=>{o.put(Hl(u,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=Mr(e),s=On(e),i=xn(e);return n.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Mr(e),n=xn(e),s=On(e);return t.j().next(()=>n.j()).next(()=>s.j())}createTargetIndexes(e,t){return A.forEach(this.hn(t),n=>this.getIndexType(e,n).next(s=>{if(s===0||s===1){const i=new Xl(n).an();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const n=xn(e);let s=!0;const i=new Map;return A.forEach(this.hn(t),o=>this.Pn(e,o).next(u=>{s&&(s=!!u),i.set(o,u)})).next(()=>{if(s){let o=H();const u=[];return A.forEach(i,(c,h)=>{D("IndexedDbIndexManager",`Using index ${function(M){return`id=${M.indexId}|cg=${M.collectionGroup}|f=${M.fields.map(j=>`${j.fieldPath}:${j.kind}`).join(",")}`}(c)} to execute ${pn(t)}`);const f=function(M,j){const W=ta(j);if(W===void 0)return null;for(const z of bi(M,W.fieldPath))switch(z.op){case"array-contains-any":return z.value.arrayValue.values||[];case"array-contains":return[z.value]}return null}(h,c),p=function(M,j){const W=new Map;for(const z of tn(j))for(const T of bi(M,z.fieldPath))switch(T.op){case"==":case"in":W.set(z.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return W.set(z.fieldPath.canonicalString(),T.value),Array.from(W.values())}return null}(h,c),_=function(M,j){const W=[];let z=!0;for(const T of tn(j)){const g=T.kind===0?Vl(M,T.fieldPath,M.startAt):Nl(M,T.fieldPath,M.startAt);W.push(g.value),z&&(z=g.inclusive)}return new er(W,z)}(h,c),w=function(M,j){const W=[];let z=!0;for(const T of tn(j)){const g=T.kind===0?Nl(M,T.fieldPath,M.endAt):Vl(M,T.fieldPath,M.endAt);W.push(g.value),z&&(z=g.inclusive)}return new er(W,z)}(h,c),C=this.In(c,h,_),V=this.In(c,h,w),k=this.Tn(c,h,p),q=this.En(c.indexId,f,C,_.inclusive,V,w.inclusive,k);return A.forEach(q,B=>n.G(B,t.limit).next(M=>{M.forEach(j=>{const W=O.fromSegments(j.documentKey);o.has(W)||(o=o.add(W),u.push(W))})}))}).next(()=>u)}return A.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=rv(te.create(e.filters,"and")).map(n=>aa(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,n,s,i,o,u){const c=(t!=null?t.length:1)*Math.max(n.length,i.length),h=c/(t!=null?t.length:1),f=[];for(let p=0;p<c;++p){const _=t?this.dn(t[p/h]):Ys,w=this.An(e,_,n[p%h],s),C=this.Rn(e,_,i[p%h],o),V=u.map(k=>this.An(e,_,k,!0));f.push(...this.createRange(w,C,V))}return f}An(e,t,n,s){const i=new on(e,O.empty(),t,n);return s?i:i.Zt()}Rn(e,t,n,s){const i=new on(e,O.empty(),t,n);return s?i.Zt():i}Pn(e,t){const n=new Xl(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const u of i)n.rn(u)&&(!o||u.fields.length>o.fields.length)&&(o=u);return o})}getIndexType(e,t){let n=2;const s=this.hn(t);return A.forEach(s,i=>this.Pn(e,i).next(o=>{o?n!==0&&o.fields.length<function(c){let h=new ne(he.comparator),f=!1;for(const p of c.filters)for(const _ of p.getFlattenedFilters())_.field.isKeyField()||(_.op==="array-contains"||_.op==="array-contains-any"?f=!0:h=h.add(_.field));for(const p of c.orderBy)p.field.isKeyField()||(h=h.add(p.field));return h.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&n===2?1:n)}Vn(e,t){const n=new Or;for(const s of tn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.Yt(s.kind);sn.vt.It(i,o)}return n.zt()}dn(e){const t=new Or;return sn.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new Or;return sn.vt.It(ss(this.databaseId,t),n.Yt(function(i){const o=tn(i);return o.length===0?0:o[o.length-1].kind}(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let s=[];s.push(new Or);let i=0;for(const o of tn(e)){const u=n[i++];for(const c of s)if(this.fn(t,o.fieldPath)&&is(u))s=this.gn(s,o,u);else{const h=c.Yt(o.kind);sn.vt.It(u,h)}}return this.pn(s)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const u of s){const c=new Or;c.seed(u.zt()),sn.vt.It(o,c.Yt(t.kind)),i.push(c)}return i}fn(e,t){return!!e.filters.find(n=>n instanceof Y&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=Mr(e),s=On(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(i=>{const o=[];return A.forEach(i,u=>s.get([u.indexId,this.uid]).next(c=>{o.push(function(f,p){const _=p?new es(p.sequenceNumber,new Ge(yn(p.readTime),new O(Je(p.documentKey)),p.largestBatchId)):es.empty(),w=f.fields.map(([C,V])=>new ai(he.fromServerFormat(C),V));return new Ai(f.indexId,f.collectionGroup,w,_)}(u,c))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:K(n.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const s=Mr(e),i=On(e);return this.yn(e).next(o=>s.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(u=>A.forEach(u,c=>i.put(Hl(c.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,(s,i)=>{const o=n.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),A.forEach(u,c=>this.wn(e,s,c).next(h=>{const f=this.Sn(i,c);return h.isEqual(f)?A.resolve():this.bn(e,i,c,h,f)}))))})}Dn(e,t,n,s){return xn(e).put({indexId:s.indexId,uid:this.uid,arrayValue:s.arrayValue,directionalValue:s.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,s){return xn(e).delete([s.indexId,this.uid,s.arrayValue,s.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const s=xn(e);let i=new ne(Ct);return s.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},(o,u)=>{i=i.add(new on(n.indexId,t,u.arrayValue,u.directionalValue))}).next(()=>i)}Sn(e,t){let n=new ne(Ct);const s=this.Vn(t,e);if(s==null)return n;const i=ta(t);if(i!=null){const o=e.data.field(i.fieldPath);if(is(o))for(const u of o.arrayValue.values||[])n=n.add(new on(t.indexId,e.key,this.dn(u),s))}else n=n.add(new on(t.indexId,e.key,Ys,s));return n}bn(e,t,n,s,i){D("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const o=[];return function(c,h,f,p,_){const w=c.getIterator(),C=h.getIterator();let V=Nn(w),k=Nn(C);for(;V||k;){let q=!1,B=!1;if(V&&k){const M=f(V,k);M<0?B=!0:M>0&&(q=!0)}else V!=null?B=!0:q=!0;q?(p(k),k=Nn(C)):B?(_(V),V=Nn(w)):(V=Nn(w),k=Nn(C))}}(s,i,Ct,u=>{o.push(this.Dn(e,t,n,u))},u=>{o.push(this.vn(e,t,n,u))}),A.waitFor(o)}yn(e){let t=1;return On(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,u)=>Ct(o,u)).filter((o,u,c)=>!u||Ct(o,c[u-1])!==0);const s=[];s.push(e);for(const o of n){const u=Ct(o,e),c=Ct(o,t);if(u===0)s[0]=e.Zt();else if(u>0&&c<0)s.push(o),s.push(o.Zt());else if(c>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Cn(s[o],s[o+1]))return[];const u=[s[o].indexId,this.uid,s[o].arrayValue,s[o].directionalValue,Ys,[]],c=[s[o+1].indexId,this.uid,s[o+1].arrayValue,s[o+1].directionalValue,Ys,[]];i.push(IDBKeyRange.bound(u,c))}return i}Cn(e,t){return Ct(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(th)}getMinOffset(e,t){return A.mapArray(this.hn(t),n=>this.Pn(e,n).next(s=>s||L())).next(th)}}function eh(r){return ye(r,"collectionParents")}function xn(r){return ye(r,"indexEntries")}function Mr(r){return ye(r,"indexConfiguration")}function On(r){return ye(r,"indexState")}function th(r){F(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Ua(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Ge(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class De{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new De(e,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qf(r,e,t){const n=r.store("mutations"),s=r.store("documentMutations"),i=[],o=IDBKeyRange.only(t.batchId);let u=0;const c=n.J({range:o},(f,p,_)=>(u++,_.delete()));i.push(c.next(()=>{F(u===1)}));const h=[];for(const f of t.mutations){const p=Xd(e,f.key.path,t.batchId);i.push(s.delete(p)),h.push(f.key)}return A.waitFor(i).next(()=>h)}function ki(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw L();e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */De.DEFAULT_COLLECTION_PERCENTILE=10,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,De.DEFAULT=new De(41943040,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),De.DISABLED=new De(-1,0,0);class Yi{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Fn={}}static lt(e,t,n,s){F(e.uid!=="");const i=e.isAuthenticated()?e.uid:"";return new Yi(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return kt(e).J({index:"userMutationsIndex",range:n},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,s){const i=jn(e),o=kt(e);return o.add({}).next(u=>{F(typeof u=="number");const c=new Ka(u,t,n,s),h=function(w,C,V){const k=V.baseMutations.map(B=>us(w.ct,B)),q=V.mutations.map(B=>us(w.ct,B));return{userId:C,batchId:V.batchId,localWriteTimeMs:V.localWriteTime.toMillis(),baseMutations:k,mutations:q}}(this.serializer,this.userId,c),f=[];let p=new ne((_,w)=>K(_.canonicalString(),w.canonicalString()));for(const _ of s){const w=Xd(this.userId,_.key.path,u);p=p.add(_.key.path.popLast()),f.push(o.put(h)),f.push(i.put(w,qI))}return p.forEach(_=>{f.push(this.indexManager.addToCollectionParentIndex(e,_))}),e.addOnCommittedListener(()=>{this.Fn[u]=c.keys()}),A.waitFor(f).next(()=>c)})}lookupMutationBatch(e,t){return kt(e).get(t).next(n=>n?(F(n.userId===this.userId),rn(this.serializer,n)):null)}Mn(e,t){return this.Fn[t]?A.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const s=n.keys();return this.Fn[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return kt(e).J({index:"userMutationsIndex",range:s},(o,u,c)=>{u.userId===this.userId&&(F(u.batchId>=n),i=rn(this.serializer,u)),c.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return kt(e).J({index:"userMutationsIndex",range:t,reverse:!0},(s,i,o)=>{n=i.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return kt(e).U("userMutationsIndex",t).next(n=>n.map(s=>rn(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=ui(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return jn(e).J({range:s},(o,u,c)=>{const[h,f,p]=o,_=Je(f);if(h===this.userId&&t.path.isEqual(_))return kt(e).get(p).next(w=>{if(!w)throw L();F(w.userId===this.userId),i.push(rn(this.serializer,w))});c.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(K);const s=[];return t.forEach(i=>{const o=ui(this.userId,i.path),u=IDBKeyRange.lowerBound(o),c=jn(e).J({range:u},(h,f,p)=>{const[_,w,C]=h,V=Je(w);_===this.userId&&i.path.isEqual(V)?n=n.add(C):p.done()});s.push(c)}),A.waitFor(s).next(()=>this.xn(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=ui(this.userId,n),o=IDBKeyRange.lowerBound(i);let u=new ne(K);return jn(e).J({range:o},(c,h,f)=>{const[p,_,w]=c,C=Je(_);p===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(w)):f.done()}).next(()=>this.xn(e,u))}xn(e,t){const n=[],s=[];return t.forEach(i=>{s.push(kt(e).get(i).next(o=>{if(o===null)throw L();F(o.userId===this.userId),n.push(rn(this.serializer,o))}))}),A.waitFor(s).next(()=>n)}removeMutationBatch(e,t){return Qf(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),A.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return jn(e).J({range:n},(i,o,u)=>{if(i[0]===this.userId){const c=Je(i[1]);s.push(c)}else u.done()}).next(()=>{F(s.length===0)})})}containsKey(e,t){return Yf(e,this.userId,t)}Nn(e){return Jf(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}}function Yf(r,e,t){const n=ui(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return jn(r).J({range:i,H:!0},(u,c,h)=>{const[f,p,_]=u;f===e&&p===s&&(o=!0),h.done()}).next(()=>o)}function kt(r){return ye(r,"mutations")}function jn(r){return ye(r,"documentMutations")}function Jf(r){return ye(r,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new In(0)}static kn(){return new In(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{const n=new In(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>U.fromTimestamp(new de(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.qn(e).next(s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Qn(e,s)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Mn(e).delete(t.targetId)).next(()=>this.qn(e)).next(n=>(F(n.targetCount>0),n.targetCount-=1,this.Qn(e,n)))}removeTargets(e,t,n){let s=0;const i=[];return Mn(e).J((o,u)=>{const c=$r(u);c.sequenceNumber<=t&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(e,c)))}).next(()=>A.waitFor(i)).next(()=>s)}forEachTarget(e,t){return Mn(e).J((n,s)=>{const i=$r(s);t(i)})}qn(e){return rh(e).get("targetGlobalKey").next(t=>(F(t!==null),t))}Qn(e,t){return rh(e).put("targetGlobalKey",t)}Kn(e,t){return Mn(e).put(zf(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){const n=pn(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return Mn(e).J({range:s,index:"queryTargetsIndex"},(o,u,c)=>{const h=$r(u);ys(t,h.target)&&(i=h,c.done())}).next(()=>i)}addMatchingKeys(e,t,n){const s=[],i=Ot(e);return t.forEach(o=>{const u=Ve(o.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(e,n,o))}),A.waitFor(s)}removeMatchingKeys(e,t,n){const s=Ot(e);return A.forEach(t,i=>{const o=Ve(i.path);return A.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])})}removeMatchingKeysForTargetId(e,t){const n=Ot(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Ot(e);let i=H();return s.J({range:n,H:!0},(o,u,c)=>{const h=Je(o[1]),f=new O(h);i=i.add(f)}).next(()=>i)}containsKey(e,t){const n=Ve(t.path),s=IDBKeyRange.bound([n],[Hd(n)],!1,!0);let i=0;return Ot(e).J({index:"documentTargetsIndex",H:!0,range:s},([o,u],c,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}ot(e,t){return Mn(e).get(t).next(n=>n?$r(n):null)}}function Mn(r){return ye(r,"targets")}function rh(r){return ye(r,"targetGlobal")}function Ot(r){return ye(r,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sh([r,e],[t,n]){const s=K(r,t);return s===0?K(e,n):s}class av{constructor(e){this.Un=e,this.buffer=new ne(sh),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();sh(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Xf{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){D("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Kt(t)?D("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await An(t)}await this.Hn(3e5)})}}class uv{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return A.resolve(ze.oe);const n=new av(t);return this.Jn.forEachTarget(e,s=>n.zn(s.sequenceNumber)).next(()=>this.Jn.Zn(e,s=>n.zn(s))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(nh)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),nh):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,s,i,o,u,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(n=p,u=Date.now(),this.removeTargets(e,n,t))).next(p=>(i=p,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(p=>(h=Date.now(),Fn()<=Q.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(u-o)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function Zf(r,e){return new uv(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cv{constructor(e,t){this.db=e,this.garbageCollector=Zf(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(n,s)=>t(s))}addReference(e,t,n){return Js(e,n)}removeReference(e,t,n){return Js(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Js(e,t)}nr(e,t){return function(s,i){let o=!1;return Jf(s).Y(u=>Yf(s,u,i).next(c=>(c&&(o=!0),A.resolve(!c)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.tr(e,(o,u)=>{if(u<=t){const c=this.nr(e,o).next(h=>{if(!h)return i++,n.getEntry(e,o).next(()=>(n.removeEntry(o,U.min()),Ot(e).delete(function(p){return[0,Ve(p.path)]}(o))))});s.push(c)}}).next(()=>A.waitFor(s)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Js(e,t)}tr(e,t){const n=Ot(e);let s,i=ze.oe;return n.J({index:"documentTargetsIndex"},([o,u],{path:c,sequenceNumber:h})=>{o===0?(i!==ze.oe&&t(new O(Je(s)),i),i=h,s=c):i=ze.oe}).next(()=>{i!==ze.oe&&t(new O(Je(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Js(r,e){return Ot(r).put(function(n,s){return{targetId:0,path:Ve(n.path),sequenceNumber:s}}(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ep{constructor(){this.changes=new vt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ae.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lv{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Zt(e).put(n)}removeEntry(e,t,n){return Zt(e).delete(function(i,o){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Pi(o),u[u.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.rr(e,n)))}getEntry(e,t){let n=ae.newInvalidDocument(t);return Zt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Lr(t))},(s,i)=>{n=this.ir(t,i)}).next(()=>n)}sr(e,t){let n={size:0,document:ae.newInvalidDocument(t)};return Zt(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Lr(t))},(s,i)=>{n={document:this.ir(t,i),size:ki(i)}}).next(()=>n)}getEntries(e,t){let n=$e();return this._r(e,t,(s,i)=>{const o=this.ir(s,i);n=n.insert(s,o)}).next(()=>n)}ar(e,t){let n=$e(),s=new ce(O.comparator);return this._r(e,t,(i,o)=>{const u=this.ir(i,o);n=n.insert(i,u),s=s.insert(i,ki(o))}).next(()=>({documents:n,ur:s}))}_r(e,t,n){if(t.isEmpty())return A.resolve();let s=new ne(ah);t.forEach(c=>s=s.add(c));const i=IDBKeyRange.bound(Lr(s.first()),Lr(s.last())),o=s.getIterator();let u=o.getNext();return Zt(e).J({index:"documentKeyIndex",range:i},(c,h,f)=>{const p=O.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&ah(u,p)<0;)n(u,null),u=o.getNext();u&&u.isEqual(p)&&(n(u,h),u=o.hasNext()?o.getNext():null),u?f.$(Lr(u)):f.done()}).next(()=>{for(;u;)n(u,null),u=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,s,i){const o=t.path,u=[o.popLast().toArray(),o.lastSegment(),Pi(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Zt(e).U(IDBKeyRange.bound(u,c,!0)).next(h=>{i==null||i.incrementDocumentReadCount(h.length);let f=$e();for(const p of h){const _=this.ir(O.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);_.isFoundDocument()&&(Ts(t,_)||s.has(_.key))&&(f=f.insert(_.key,_))}return f})}getAllFromCollectionGroup(e,t,n,s){let i=$e();const o=oh(t,n),u=oh(t,Ge.max());return Zt(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,u,!0)},(c,h,f)=>{const p=this.ir(O.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(p.key,p),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new hv(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return ih(e).get("remoteDocumentGlobalKey").next(t=>(F(!!t),t))}rr(e,t){return ih(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=YT(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(U.min())))return n}return ae.newInvalidDocument(e)}}function tp(r){return new lv(r)}class hv extends ep{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new vt(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(e){const t=[];let n=0,s=new ne((i,o)=>K(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const u=this.lr.get(i);if(t.push(this.cr.removeEntry(e,i,u.readTime)),o.isValidDocument()){const c=zl(this.cr.serializer,o);s=s.add(i.path.popLast());const h=ki(c);n+=h-u.size,t.push(this.cr.addEntry(e,i,c))}else if(n-=u.size,this.trackRemovals){const c=zl(this.cr.serializer,o.convertToNoDocument(U.min()));t.push(this.cr.addEntry(e,i,c))}}),s.forEach(i=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.cr.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:n,ur:s})=>(s.forEach((i,o)=>{this.lr.set(i,{size:o,readTime:n.get(i).readTime})}),n))}}function ih(r){return ye(r,"remoteDocumentGlobal")}function Zt(r){return ye(r,"remoteDocumentsV14")}function Lr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function oh(r,e){const t=e.documentKey.path.toArray();return[r,Pi(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function ah(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=K(t[i],n[i]),s)return s;return s=K(t.length,n.length),s||(s=K(t[t.length-2],n[n.length-2]),s||K(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dv{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class np{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(n!==null&&Qr(n.mutation,s,Be.empty(),de.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,H()).next(()=>n))}getLocalViewOfDocuments(e,t,n=H()){const s=Xe();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(i=>{let o=qr();return i.forEach((u,c)=>{o=o.insert(u,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=Xe();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,H()))}populateOverlays(e,t,n){const s=[];return n.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,u)=>{t.set(o,u)})})}computeViews(e,t,n,s){let i=$e();const o=Wr(),u=function(){return Wr()}();return t.forEach((c,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Et)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Qr(f.mutation,h,f.mutation.getFieldMask(),de.now())):o.set(h.key,Be.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var p;return u.set(h,new dv(f,(p=o.get(h))!==null&&p!==void 0?p:null))}),u))}recalculateAndSaveOverlays(e,t){const n=Wr();let s=new ce((o,u)=>o-u),i=H();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const u of o)u.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=n.get(c)||Be.empty();f=u.applyToLocalView(h,f),n.set(c,f);const p=(s.get(u.batchId)||H()).add(c);s=s.insert(u.batchId,p)})}).next(()=>{const o=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,p=Tf();f.forEach(_=>{if(!i.has(_)){const w=Sf(t.get(_),n.get(_));w!==null&&p.set(_,w),i=i.add(_)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return A.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,s){return function(o){return O.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):mf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):A.resolve(Xe());let u=-1,c=i;return o.next(h=>A.forEach(h,(f,p)=>(u<p.largestBatchId&&(u=p.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next(_=>{c=c.insert(f,_)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,H())).next(f=>({batchId:u,changes:If(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next(n=>{let s=qr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=qr();return this.indexManager.getCollectionParents(e,i).next(u=>A.forEach(u,c=>{const h=function(p,_){return new ur(_,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next(f=>{f.forEach((p,_)=>{o=o.insert(p,_)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s))).next(o=>{i.forEach((c,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,ae.newInvalidDocument(f)))});let u=qr();return o.forEach((c,h)=>{const f=i.get(c);f!==void 0&&Qr(f.mutation,h,Be.empty(),de.now()),Ts(t,h)&&(u=u.insert(c,h))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return A.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Te(s.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:Kf(s.bundledQuery),readTime:Te(s.readTime)}}(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pv{constructor(){this.overlays=new ce(O.comparator),this.Ir=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Xe();return A.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((s,i)=>{this.ht(e,t,i)}),A.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Ir.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const s=Xe(),i=t.length+1,o=new O(t.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new ce((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Xe(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=Xe(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>u.set(h,f)),!(u.size()>=s)););return A.resolve(u)}ht(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(n.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new Wa(t,n));let i=this.Ir.get(t);i===void 0&&(i=H(),this.Ir.set(t,i)),this.Ir.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mv{constructor(){this.sessionToken=ge.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(){this.Tr=new ne(Ie.Er),this.dr=new ne(Ie.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new Ie(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Vr(new Ie(e,t))}mr(e,t){e.forEach(n=>this.removeReference(n,t))}gr(e){const t=new O(new Z([])),n=new Ie(t,e),s=new Ie(t,e+1),i=[];return this.dr.forEachInRange([n,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new O(new Z([])),n=new Ie(t,e),s=new Ie(t,e+1);let i=H();return this.dr.forEachInRange([n,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Ie(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Ie{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return O.comparator(e.key,t.key)||K(e.wr,t.wr)}static Ar(e,t){return K(e.wr,t.wr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ne(Ie.Er)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Ka(i,t,n,s);this.mutationQueue.push(o);for(const u of s)this.br=this.br.add(new Ie(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.vr(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Ie(t,0),s=new Ie(t,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([n,s],o=>{const u=this.Dr(o.wr);i.push(u)}),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(K);return t.forEach(s=>{const i=new Ie(s,0),o=new Ie(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],u=>{n=n.add(u.wr)})}),A.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;O.isDocumentKey(i)||(i=i.child(""));const o=new Ie(new O(i),0);let u=new ne(K);return this.br.forEachWhile(c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.wr)),!0)},o),A.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach(n=>{const s=this.Dr(n);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){F(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return A.forEach(t.mutations,s=>{const i=new Ie(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=n})}On(e){}containsKey(e,t){const n=new Ie(t,0),s=this.br.firstAfterOrEqual(n);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _v{constructor(e){this.Mr=e,this.docs=function(){return new ce(O.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():ae.newInvalidDocument(t))}getEntries(e,t){let n=$e();return t.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ae.newInvalidDocument(s))}),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=$e();const o=t.path,u=new O(o.child("")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Ua(Wd(f),n)<=0||(s.has(f.key)||Ts(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,t,n,s){L()}Or(e,t){return A.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new yv(this)}getSize(e){return A.resolve(this.size)}}class yv extends ep{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(n)}),A.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iv{constructor(e){this.persistence=e,this.Nr=new vt(t=>pn(t),ys),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Za,this.targetCount=0,this.kr=In.Bn()}forEachTarget(e,t){return this.Nr.forEach((n,s)=>t(s)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),A.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new In(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.Kn(t),A.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.Nr.forEach((o,u)=>{u.sequenceNumber<=t&&n.get(u.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),A.waitFor(i).next(()=>s)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu{constructor(e,t){this.qr={},this.overlays={},this.Qr=new ze(0),this.Kr=!1,this.Kr=!0,this.$r=new mv,this.referenceDelegate=e(this),this.Ur=new Iv(this),this.indexManager=new sv,this.remoteDocumentCache=function(s){return new _v(s)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new Gf(t),this.Gr=new fv(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new pv,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new gv(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){D("MemoryPersistence","Starting transaction:",e);const s=new Tv(this.Qr.next());return this.referenceDelegate.zr(),n(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,t){return A.or(Object.values(this.qr).map(n=>()=>n.containsKey(e,t)))}}class Tv extends Yd{constructor(e){super(),this.currentSequenceNumber=e}}class Ji{constructor(e){this.persistence=e,this.Jr=new Za,this.Yr=null}static Zr(e){return new Ji(e)}get Xr(){if(this.Yr)return this.Yr;throw L()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),A.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>n.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Xr,n=>{const s=O.fromPath(n);return this.ei(e,s).next(i=>{i||t.removeEntry(s,U.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return A.or([()=>A.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}class Di{constructor(e,t){this.persistence=e,this.ti=new vt(n=>Ve(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=Zf(this,t)}static Zr(e,t){return new Di(e,t)}zr(){}jr(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}Yn(e){const t=this.er(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}Zn(e,t){return A.forEach(this.ti,(n,s)=>this.nr(e,n,s).next(i=>i?A.resolve():t(s)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.Or(e,o=>this.nr(e,o,t).next(u=>{u||(n++,i.removeEntry(o,U.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.ti.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.ti.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.ti.set(t,e.currentSequenceNumber),A.resolve()}Wr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=li(e.data.value)),t}nr(e,t,n){return A.or([()=>this.persistence.Hr(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.ti.get(t);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e){this.serializer=e}O(e,t,n,s){const i=new ji("createOrUpgrade",t);n<1&&s>=1&&(function(c){c.createObjectStore("owner")}(e),function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",vl,{unique:!0}),c.createObjectStore("documentMutations")}(e),uh(e),function(c){c.createObjectStore("remoteDocuments")}(e));let o=A.resolve();return n<3&&s>=3&&(n!==0&&(function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")}(e),uh(e)),o=o.next(()=>function(c){const h=c.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return h.put("targetGlobalKey",f)}(i))),n<4&&s>=4&&(n!==0&&(o=o.next(()=>function(c,h){return h.store("mutations").U().next(f=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",vl,{unique:!0});const p=h.store("mutations"),_=f.map(w=>p.put(w));return A.waitFor(_)})}(e,i))),o=o.next(()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),n<5&&s>=5&&(o=o.next(()=>this.ni(i))),n<6&&s>=6&&(o=o.next(()=>(function(c){c.createObjectStore("remoteDocumentGlobal")}(e),this.ri(i)))),n<7&&s>=7&&(o=o.next(()=>this.ii(i))),n<8&&s>=8&&(o=o.next(()=>this.si(e,i))),n<9&&s>=9&&(o=o.next(()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&s>=10&&(o=o.next(()=>this.oi(i))),n<11&&s>=11&&(o=o.next(()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(c){c.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&s>=12&&(o=o.next(()=>{(function(c){const h=c.createObjectStore("documentOverlays",{keyPath:ZI});h.createIndex("collectionPathOverlayIndex",eT,{unique:!1}),h.createIndex("collectionGroupOverlayIndex",tT,{unique:!1})})(e)})),n<13&&s>=13&&(o=o.next(()=>function(c){const h=c.createObjectStore("remoteDocumentsV14",{keyPath:jI});h.createIndex("documentKeyIndex",$I),h.createIndex("collectionGroupIndex",GI)}(e)).next(()=>this._i(e,i)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&s>=14&&(o=o.next(()=>this.ai(e,i))),n<15&&s>=15&&(o=o.next(()=>function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:QI}).createIndex("sequenceNumberIndex",YI,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:JI}).createIndex("documentKeyIndex",XI,{unique:!1})}(e))),n<16&&s>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),n<17&&s>=17&&(o=o.next(()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((n,s)=>{t+=ki(s)}).next(()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(s=>A.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,-1],[i.userId,i.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next(u=>A.forEach(u,c=>{F(c.userId===i.userId);const h=rn(this.serializer,c);return Qf(e,i.userId,h).next(()=>{})}))}))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(s=>{const i=[];return n.J((o,u)=>{const c=new Z(o),h=function(p){return[0,Ve(p)]}(c);i.push(t.get(h).next(f=>f?A.resolve():(p=>t.put({targetId:0,path:Ve(p),sequenceNumber:s.highestListenSequenceNumber}))(c)))}).next(()=>A.waitFor(i))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:WI});const n=t.store("collectionParents"),s=new Xa,i=o=>{if(s.add(o)){const u=o.lastSegment(),c=o.popLast();return n.put({collectionId:u,parent:Ve(c)})}};return t.store("remoteDocuments").J({H:!0},(o,u)=>{const c=new Z(o);return i(c.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,u,c],h)=>{const f=Je(u);return i(f.popLast())}))}oi(e){const t=e.store("targets");return t.J((n,s)=>{const i=$r(s),o=zf(this.serializer,i);return t.put(o)})}_i(e,t){const n=t.store("remoteDocuments"),s=[];return n.J((i,o)=>{const u=t.store("remoteDocumentsV14"),c=function(p){return p.document?new O(Z.fromString(p.document.name).popFirst(5)):p.noDocument?O.fromSegments(p.noDocument.path):p.unknownDocument?O.fromSegments(p.unknownDocument.path):L()}(o).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(u.put(h))}).next(()=>A.waitFor(s))}ai(e,t){const n=t.store("mutations"),s=tp(this.serializer),i=new eu(Ji.Zr,this.serializer.ct);return n.U().next(o=>{const u=new Map;return o.forEach(c=>{var h;let f=(h=u.get(c.userId))!==null&&h!==void 0?h:H();rn(this.serializer,c).keys().forEach(p=>f=f.add(p)),u.set(c.userId,f)}),A.forEach(u,(c,h)=>{const f=new Ee(h),p=Qi.lt(this.serializer,f),_=i.getIndexManager(f),w=Yi.lt(f,this.serializer,_,i.referenceDelegate);return new np(s,w,p,_).recalculateAndSaveOverlaysForDocumentKeys(new na(t,ze.oe),c).next()})})}}function uh(r){r.createObjectStore("targetDocuments",{keyPath:KI}).createIndex("documentTargetsIndex",HI,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",zI,{unique:!0}),r.createObjectStore("targetGlobal")}const Uo="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class tu{constructor(e,t,n,s,i,o,u,c,h,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=i,this.window=o,this.document=u,this.ci=h,this.li=f,this.hi=p,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=_=>Promise.resolve(),!tu.D())throw new N(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new cv(this,s),this.Ai=t+"main",this.serializer=new Gf(c),this.Ri=new qt(this.Ai,this.hi,new vv(this.serializer)),this.$r=new XT,this.Ur=new ov(this.referenceDelegate,this.serializer),this.remoteDocumentCache=tp(this.serializer),this.Gr=new JT,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&Le("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,Uo);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new ze(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Xs(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(Kt(e))return D("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return D("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return Fr(e).get("owner").next(t=>A.resolve(this.vi(t)))}Ci(e){return Xs(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=ye(t,"clientMetadata");return n.U().next(s=>{const i=this.xi(s,18e5),o=s.filter(u=>i.indexOf(u)===-1);return A.forEach(o,u=>n.delete(u.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?A.resolve(!0):Fr(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new N(P.FAILED_PRECONDITION,Uo);return!1}}return!(!this.networkEnabled||!this.inForeground)||Xs(e).U().next(n=>this.xi(n,5e3).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||o&&u)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&D("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{const t=new na(e,ze.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>Xs(e).U().next(t=>this.xi(t,18e5).map(n=>n.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Yi.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new iv(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Qi.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){D("IndexedDbPersistence","Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(c){return c===17?sT:c===16?rT:c===15?qa:c===14?tf:c===13?ef:c===12?nT:c===11?Zd:void L()}(this.hi);let o;return this.Ri.runTransaction(e,s,i,u=>(o=new na(u,this.Qr?this.Qr.next():ze.oe),t==="readwrite-primary"?this.wi(o).next(c=>!!c||this.Si(o)).next(c=>{if(!c)throw Le(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new N(P.FAILED_PRECONDITION,Qd);return n(o)}).next(c=>this.Di(o).next(()=>c)):this.Ki(o).next(()=>n(o)))).then(u=>(o.raiseOnCommittedEvent(),u))}Ki(e){return Fr(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new N(P.FAILED_PRECONDITION,Uo)})}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Fr(e).put("owner",t)}static D(){return qt.D()}bi(e){const t=Fr(e);return t.get("owner").next(n=>this.vi(n)?(D("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):A.resolve())}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Le(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;nd()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return D("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Le("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Le("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Fr(r){return ye(r,"owner")}function Xs(r){return ye(r,"clientMetadata")}function Ev(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=s}static Wi(e,t){let n=H(),s=H();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new nu(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wv{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return nd()?8:Jd(_e())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.Yi(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,t,s,n).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new wv;return this.Xi(e,t,o).next(u=>{if(i.result=u,this.zi)return this.es(e,t,o,u.size)})}).next(()=>i.result)}es(e,t,n,s){return n.documentReadCount<this.ji?(Fn()<=Q.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Un(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),A.resolve()):(Fn()<=Q.DEBUG&&D("QueryEngine","Query:",Un(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Hi*s?(Fn()<=Q.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Un(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ke(t))):A.resolve())}Yi(e,t){if(xl(t))return A.resolve(null);let n=Ke(t);return this.indexManager.getIndexType(e,n).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Si(t,null,"F"),n=Ke(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(i=>{const o=H(...i);return this.Ji.getDocuments(e,o).next(u=>this.indexManager.getMinOffset(e,n).next(c=>{const h=this.ts(t,u);return this.ns(t,h,o,c.readTime)?this.Yi(e,Si(t,null,"F")):this.rs(e,h,t,c)}))})))}Zi(e,t,n,s){return xl(t)||s.isEqual(U.min())?A.resolve(null):this.Ji.getDocuments(e,n).next(i=>{const o=this.ts(t,i);return this.ns(t,o,n,s)?A.resolve(null):(Fn()<=Q.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Un(t)),this.rs(e,o,t,xI(s,-1)).next(u=>u))})}ts(e,t){let n=new ne(_f(e));return t.forEach((s,i)=>{Ts(e,i)&&(n=n.add(i))}),n}ns(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,t,n){return Fn()<=Q.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Un(t)),this.Ji.getDocumentsMatchingQuery(e,t,Ge.min(),n)}rs(e,t,n,s){return this.Ji.getDocumentsMatchingQuery(e,n,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(e,t,n,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new ce(K),this._s=new vt(i=>pn(i),ys),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new np(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function sp(r,e,t,n){return new Av(r,e,t,n)}async function ip(r,e){const t=$(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,t.ls(e),t.mutationQueue.getAllMutationBatches(n))).next(i=>{const o=[],u=[];let c=H();for(const h of s){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(n,c).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:u}))})})}function Rv(r,e){const t=$(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=e.batch.keys(),i=t.cs.newChangeBuffer({trackRemovals:!0});return function(u,c,h,f){const p=h.batch,_=p.keys();let w=A.resolve();return _.forEach(C=>{w=w.next(()=>f.getEntry(c,C)).next(V=>{const k=h.docVersions.get(C);F(k!==null),V.version.compareTo(k)<0&&(p.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),f.addEntry(V)))})}),w.next(()=>u.mutationQueue.removeMutationBatch(c,p))}(t,n,e,i).next(()=>i.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let c=H();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(n,s))})}function op(r){const e=$(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function bv(r,e){const t=$(r),n=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const u=[];e.targetChanges.forEach((f,p)=>{const _=s.get(p);if(!_)return;u.push(t.Ur.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.Ur.addMatchingKeys(i,f.addedDocuments,p)));let w=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?w=w.withResumeToken(ge.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(f.resumeToken,n)),s=s.insert(p,w),function(V,k,q){return V.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=3e8?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0}(_,w,f)&&u.push(t.Ur.updateTargetData(i,w))});let c=$e(),h=H();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),u.push(Sv(i,o,e.documentUpdates).next(f=>{c=f.Ps,h=f.Is})),!n.isEqual(U.min())){const f=t.Ur.getLastRemoteSnapshotVersion(i).next(p=>t.Ur.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(f)}return A.waitFor(u).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(t.os=s,i))}function Sv(r,e,t){let n=H(),s=H();return t.forEach(i=>n=n.add(i)),e.getEntries(r,n).next(i=>{let o=$e();return t.forEach((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(U.min())?(e.removeEntry(u,c.readTime),o=o.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(u,c)):D("LocalStore","Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)}),{Ps:o,Is:s}})}function Pv(r,e){const t=$(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function Cv(r,e){const t=$(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return t.Ur.getTargetData(n,e).next(i=>i?(s=i,A.resolve(s)):t.Ur.allocateTargetId(n).next(o=>(s=new ft(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=t.os.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n})}async function ga(r,e,t){const n=$(r),s=n.os.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,o=>n.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!Kt(o))throw o;D("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.os=n.os.remove(e),n._s.delete(s.target)}function ch(r,e,t){const n=$(r);let s=U.min(),i=H();return n.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,f){const p=$(c),_=p._s.get(f);return _!==void 0?A.resolve(p.os.get(_)):p.Ur.getTargetData(h,f)}(n,o,Ke(e)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(o,u.targetId).next(c=>{i=c})}).next(()=>n.ss.getDocumentsMatchingQuery(o,e,t?s:U.min(),t?i:H())).next(u=>(kv(n,IT(e),u),{documents:u,Ts:i})))}function kv(r,e,t){let n=r.us.get(e)||U.min();t.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.us.set(e,n)}class lh{constructor(){this.activeTargetIds=RT()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ap{constructor(){this.so=new lh,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new lh,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dv{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){D("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){D("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Zs=null;function Bo(){return Zs===null?Zs=function(){return 268435456+Math.round(2147483648*Math.random())}():Zs++,"0x"+Zs.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nv{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="WebChannelConnection";class xv extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(t,n,s,i,o){const u=Bo(),c=this.xo(t,n.toUriEncodedString());D("RestConnection",`Sending RPC '${t}' ${u}:`,c,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(t,c,h,s).then(f=>(D("RestConnection",`Received RPC '${t}' ${u}: `,f),f),f=>{throw Jn("RestConnection",`RPC '${t}' ${u} failed with error: `,f,"url: ",c,"request:",s),f})}Lo(t,n,s,i,o,u){return this.Mo(t,n,s,i,o)}Oo(t,n,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ar}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,o)=>t[o]=i),s&&s.headers.forEach((i,o)=>t[o]=i)}xo(t,n){const s=Vv[t];return`${this.Do}/v1/${n}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,s){const i=Bo();return new Promise((o,u)=>{const c=new Bd;c.setWithCredentials(!0),c.listenOnce(qd.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case oi.NO_ERROR:const f=c.getResponseJson();D(ke,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(f)),o(f);break;case oi.TIMEOUT:D(ke,`RPC '${e}' ${i} timed out`),u(new N(P.DEADLINE_EXCEEDED,"Request time out"));break;case oi.HTTP_ERROR:const p=c.getStatus();if(D(ke,`RPC '${e}' ${i} failed with status:`,p,"response text:",c.getResponseText()),p>0){let _=c.getResponseJson();Array.isArray(_)&&(_=_[0]);const w=_==null?void 0:_.error;if(w&&w.status&&w.message){const C=function(k){const q=k.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(q)>=0?q:P.UNKNOWN}(w.status);u(new N(C,w.message))}else u(new N(P.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new N(P.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{D(ke,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);D(ke,`RPC '${e}' ${i} sending request:`,s),c.send(t,"POST",h,n,15)})}Bo(e,t,n){const s=Bo(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Gd(),u=$d(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const f=i.join("");D(ke,`Creating RPC '${e}' stream ${s}: ${f}`,c);const p=o.createWebChannel(f,c);let _=!1,w=!1;const C=new Nv({Io:k=>{w?D(ke,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(_||(D(ke,`Opening RPC '${e}' stream ${s} transport.`),p.open(),_=!0),D(ke,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},To:()=>p.close()}),V=(k,q,B)=>{k.listen(q,M=>{try{B(M)}catch(j){setTimeout(()=>{throw j},0)}})};return V(p,Br.EventType.OPEN,()=>{w||(D(ke,`RPC '${e}' stream ${s} transport opened.`),C.yo())}),V(p,Br.EventType.CLOSE,()=>{w||(w=!0,D(ke,`RPC '${e}' stream ${s} transport closed`),C.So())}),V(p,Br.EventType.ERROR,k=>{w||(w=!0,Jn(ke,`RPC '${e}' stream ${s} transport errored:`,k),C.So(new N(P.UNAVAILABLE,"The operation could not be completed")))}),V(p,Br.EventType.MESSAGE,k=>{var q;if(!w){const B=k.data[0];F(!!B);const M=B,j=M.error||((q=M[0])===null||q===void 0?void 0:q.error);if(j){D(ke,`RPC '${e}' stream ${s} received error:`,j);const W=j.status;let z=function(y){const v=me[y];if(v!==void 0)return kf(v)}(W),T=j.message;z===void 0&&(z=P.INTERNAL,T="Unknown error status: "+W+" with message "+j.message),w=!0,C.So(new N(z,T)),p.close()}else D(ke,`RPC '${e}' stream ${s} received:`,B),C.bo(B)}}),V(u,jd.STAT_EVENT,k=>{k.stat===ea.PROXY?D(ke,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===ea.NOPROXY&&D(ke,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.wo()},0),C}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ov(){return typeof window<"u"?window:null}function pi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(r){return new UT(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,t,n=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-n);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class up{constructor(e,t,n,s,i,o,u,c){this.ui=e,this.Ho=n,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new ru(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(Le(t.toString()),Le("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.Yo===t&&this.P_(n,s)},n=>{e(()=>{const s=new N(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(s)})})}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{n(()=>this.I_(s))}),this.stream.onMessage(s=>{n(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return D("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(D("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Mv extends up{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=$T(this.serializer,e),n=function(i){if(!("targetChange"in i))return U.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?U.min():o.readTime?Te(o.readTime):U.min()}(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=ha(this.serializer),t.addTarget=function(i,o){let u;const c=o.target;if(u=Ri(c)?{documents:Ff(i,c)}:{query:Uf(i,c)._t},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=Nf(i,o.resumeToken);const h=ca(i,o.expectedCount);h!==null&&(u.expectedCount=h)}else if(o.snapshotVersion.compareTo(U.min())>0){u.readTime=sr(i,o.snapshotVersion.toTimestamp());const h=ca(i,o.expectedCount);h!==null&&(u.expectedCount=h)}return u}(this.serializer,e);const n=zT(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=ha(this.serializer),t.removeTarget=e,this.a_(t)}}class Lv extends up{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return F(!!e.streamToken),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){F(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=GT(e.writeResults,e.commitTime),n=Te(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=ha(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>us(this.serializer,n))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fv extends class{}{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,la(t,n),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new N(P.UNKNOWN,i.toString())})}Lo(e,t,n,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.Lo(e,la(t,n),s,o,u,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new N(P.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Uv{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Le(t),this.D_=!1):D("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bv{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{n.enqueueAndForget(async()=>{Rn(this)&&(D("RemoteStore","Restarting streams for network reachability change."),await async function(c){const h=$(c);h.L_.add(4),await ws(h),h.q_.set("Unknown"),h.L_.delete(4),await Zi(h)}(this))})}),this.q_=new Uv(n,s)}}async function Zi(r){if(Rn(r))for(const e of r.B_)await e(!0)}async function ws(r){for(const e of r.B_)await e(!1)}function cp(r,e){const t=$(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),au(t)?ou(t):hr(t).r_()&&iu(t,e))}function su(r,e){const t=$(r),n=hr(t);t.N_.delete(e),n.r_()&&lp(t,e),t.N_.size===0&&(n.r_()?n.o_():Rn(t)&&t.q_.set("Unknown"))}function iu(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}hr(r).A_(e)}function lp(r,e){r.Q_.xe(e),hr(r).R_(e)}function ou(r){r.Q_=new OT({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),hr(r).start(),r.q_.v_()}function au(r){return Rn(r)&&!hr(r).n_()&&r.N_.size>0}function Rn(r){return $(r).L_.size===0}function hp(r){r.Q_=void 0}async function qv(r){r.q_.set("Online")}async function jv(r){r.N_.forEach((e,t)=>{iu(r,e)})}async function $v(r,e){hp(r),au(r)?(r.q_.M_(e),ou(r)):r.q_.set("Unknown")}async function Gv(r,e,t){if(r.q_.set("Online"),e instanceof Vf&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const u of i.targetIds)s.N_.has(u)&&(await s.remoteSyncer.rejectListen(u,o),s.N_.delete(u),s.Q_.removeTarget(u))}(r,e)}catch(n){D("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Vi(r,n)}else if(e instanceof fi?r.Q_.Ke(e):e instanceof Df?r.Q_.He(e):r.Q_.We(e),!t.isEqual(U.min()))try{const n=await op(r.localStore);t.compareTo(n)>=0&&await function(i,o){const u=i.Q_.rt(o);return u.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=i.N_.get(h);f&&i.N_.set(h,f.withResumeToken(c.resumeToken,o))}}),u.targetMismatches.forEach((c,h)=>{const f=i.N_.get(c);if(!f)return;i.N_.set(c,f.withResumeToken(ge.EMPTY_BYTE_STRING,f.snapshotVersion)),lp(i,c);const p=new ft(f.target,c,h,f.sequenceNumber);iu(i,p)}),i.remoteSyncer.applyRemoteEvent(u)}(r,t)}catch(n){D("RemoteStore","Failed to raise snapshot:",n),await Vi(r,n)}}async function Vi(r,e,t){if(!Kt(e))throw e;r.L_.add(1),await ws(r),r.q_.set("Offline"),t||(t=()=>op(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{D("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await Zi(r)})}function dp(r,e){return e().catch(t=>Vi(r,t,e))}async function As(r){const e=$(r),t=zt(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;zv(e);)try{const s=await Pv(e.localStore,n);if(s===null){e.O_.length===0&&t.o_();break}n=s.batchId,Kv(e,s)}catch(s){await Vi(e,s)}fp(e)&&pp(e)}function zv(r){return Rn(r)&&r.O_.length<10}function Kv(r,e){r.O_.push(e);const t=zt(r);t.r_()&&t.V_&&t.m_(e.mutations)}function fp(r){return Rn(r)&&!zt(r).n_()&&r.O_.length>0}function pp(r){zt(r).start()}async function Hv(r){zt(r).p_()}async function Wv(r){const e=zt(r);for(const t of r.O_)e.m_(t.mutations)}async function Qv(r,e,t){const n=r.O_.shift(),s=Ha.from(n,e,t);await dp(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await As(r)}async function Yv(r,e){e&&zt(r).V_&&await async function(n,s){if(function(o){return Cf(o)&&o!==P.ABORTED}(s.code)){const i=n.O_.shift();zt(n).s_(),await dp(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await As(n)}}(r,e),fp(r)&&pp(r)}async function dh(r,e){const t=$(r);t.asyncQueue.verifyOperationInProgress(),D("RemoteStore","RemoteStore received new credentials");const n=Rn(t);t.L_.add(3),await ws(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Zi(t)}async function Jv(r,e){const t=$(r);e?(t.L_.delete(2),await Zi(t)):e||(t.L_.add(2),await ws(t),t.q_.set("Unknown"))}function hr(r){return r.K_||(r.K_=function(t,n,s){const i=$(t);return i.w_(),new Mv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Eo:qv.bind(null,r),Ro:jv.bind(null,r),mo:$v.bind(null,r),d_:Gv.bind(null,r)}),r.B_.push(async e=>{e?(r.K_.s_(),au(r)?ou(r):r.q_.set("Unknown")):(await r.K_.stop(),hp(r))})),r.K_}function zt(r){return r.U_||(r.U_=function(t,n,s){const i=$(t);return i.w_(),new Lv(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Hv.bind(null,r),mo:Yv.bind(null,r),f_:Wv.bind(null,r),g_:Qv.bind(null,r)}),r.B_.push(async e=>{e?(r.U_.s_(),await As(r)):(await r.U_.stop(),r.O_.length>0&&(D("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Qe,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,u=new uu(e,t,o,s,i);return u.start(n),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new N(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function cu(r,e){if(Le("AsyncQueue",`${e}: ${r}`),Kt(r))return new N(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qn{constructor(e){this.comparator=e?(t,n)=>e(t,n)||O.comparator(t.key,n.key):(t,n)=>O.comparator(t.key,n.key),this.keyedMap=qr(),this.sortedSet=new ce(this.comparator)}static emptySet(e){return new Qn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Qn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Qn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fh{constructor(){this.W_=new ce(O.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):L():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,n)=>{e.push(n)}),e}}class ir{constructor(e,t,n,s,i,o,u,c,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach(u=>{o.push({type:0,doc:u})}),new ir(e,t,Qn.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&zi(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xv{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class Zv{constructor(){this.queries=ph(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const s=$(t),i=s.queries;s.queries=ph(),i.forEach((o,u)=>{for(const c of u.j_)c.onError(n)})})(this,new N(P.ABORTED,"Firestore shutting down"))}}function ph(){return new vt(r=>gf(r),zi)}async function lu(r,e){const t=$(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.H_()&&e.J_()&&(n=2):(i=new Xv,n=e.J_()?0:1);try{switch(n){case 0:i.z_=await t.onListen(s,!0);break;case 1:i.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const u=cu(o,`Initialization of query '${Un(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.j_.push(e),e.Z_(t.onlineState),i.z_&&e.X_(i.z_)&&du(t)}async function hu(r,e){const t=$(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function eE(r,e){const t=$(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const u of o.j_)u.X_(s)&&(n=!0);o.z_=s}}n&&du(t)}function tE(r,e,t){const n=$(r),s=n.queries.get(e);if(s)for(const i of s.j_)i.onError(t);n.queries.delete(e)}function du(r){r.Y_.forEach(e=>{e.next()})}var _a,mh;(mh=_a||(_a={})).ea="default",mh.Cache="cache";class fu{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new ir(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=ir.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==_a.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mp{constructor(e){this.key=e}}class gp{constructor(e){this.key=e}}class nE{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=H(),this.mutatedKeys=H(),this.Aa=_f(e),this.Ra=new Qn(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new fh,s=t?t.Ra:this.Ra;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,u=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const _=s.get(f),w=Ts(this.query,p)?p:null,C=!!_&&this.mutatedKeys.has(_.key),V=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let k=!1;_&&w?_.data.isEqual(w.data)?C!==V&&(n.track({type:3,doc:w}),k=!0):this.ga(_,w)||(n.track({type:2,doc:w}),k=!0,(c&&this.Aa(w,c)>0||h&&this.Aa(w,h)<0)&&(u=!0)):!_&&w?(n.track({type:0,doc:w}),k=!0):_&&!w&&(n.track({type:1,doc:_}),k=!0,(c||h)&&(u=!0)),k&&(w?(o=o.add(w),i=V?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{Ra:o,fa:n,ns:u,mutatedKeys:i}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((f,p)=>function(w,C){const V=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return V(w)-V(C)}(f.type,p.type)||this.Aa(f.doc,p.doc)),this.pa(n),s=s!=null&&s;const u=t&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,h=c!==this.Ea;return this.Ea=c,o.length!==0||h?{snapshot:new ir(this.query,e.Ra,i,o,e.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new fh,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=H(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});const t=[];return e.forEach(n=>{this.da.has(n)||t.push(new gp(n))}),this.da.forEach(n=>{e.has(n)||t.push(new mp(n))}),t}ba(e){this.Ta=e.Ts,this.da=H();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return ir.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class rE{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class sE{constructor(e){this.key=e,this.va=!1}}class iE{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new vt(u=>gf(u),zi),this.Ma=new Map,this.xa=new Set,this.Oa=new ce(O.comparator),this.Na=new Map,this.La=new Za,this.Ba={},this.ka=new Map,this.qa=In.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function oE(r,e,t=!0){const n=Ep(r);let s;const i=n.Fa.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await _p(n,e,t,!0),s}async function aE(r,e){const t=Ep(r);await _p(t,e,!0,!1)}async function _p(r,e,t,n){const s=await Cv(r.localStore,Ke(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let u;return n&&(u=await uE(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&cp(r.remoteStore,s),u}async function uE(r,e,t,n,s){r.Ka=(p,_,w)=>async function(V,k,q,B){let M=k.view.ma(q);M.ns&&(M=await ch(V.localStore,k.query,!1).then(({documents:T})=>k.view.ma(T,M)));const j=B&&B.targetChanges.get(k.targetId),W=B&&B.targetMismatches.get(k.targetId)!=null,z=k.view.applyChanges(M,V.isPrimaryClient,j,W);return _h(V,k.targetId,z.wa),z.snapshot}(r,p,_,w);const i=await ch(r.localStore,e,!0),o=new nE(e,i.Ts),u=o.ma(i.documents),c=Es.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(u,r.isPrimaryClient,c);_h(r,t,h.wa);const f=new rE(e,t,o);return r.Fa.set(e,f),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),h.snapshot}async function cE(r,e,t){const n=$(r),s=n.Fa.get(e),i=n.Ma.get(s.targetId);if(i.length>1)return n.Ma.set(s.targetId,i.filter(o=>!zi(o,e))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await ga(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),t&&su(n.remoteStore,s.targetId),ya(n,s.targetId)}).catch(An)):(ya(n,s.targetId),await ga(n.localStore,s.targetId,!0))}async function lE(r,e){const t=$(r),n=t.Fa.get(e),s=t.Ma.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),su(t.remoteStore,n.targetId))}async function hE(r,e,t){const n=wp(r);try{const s=await function(o,u){const c=$(o),h=de.now(),f=u.reduce((w,C)=>w.add(C.key),H());let p,_;return c.persistence.runTransaction("Locally write mutations","readwrite",w=>{let C=$e(),V=H();return c.cs.getEntries(w,f).next(k=>{C=k,C.forEach((q,B)=>{B.isValidDocument()||(V=V.add(q))})}).next(()=>c.localDocuments.getOverlayedDocuments(w,C)).next(k=>{p=k;const q=[];for(const B of u){const M=DT(B,p.get(B.key).overlayedDocument);M!=null&&q.push(new Et(B.key,M,af(M.value.mapValue),ue.exists(!0)))}return c.mutationQueue.addMutationBatch(w,h,q,u)}).next(k=>{_=k;const q=k.applyToLocalDocumentSet(p,V);return c.documentOverlayCache.saveOverlays(w,k.batchId,q)})}).then(()=>({batchId:_.batchId,changes:If(p)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),function(o,u,c){let h=o.Ba[o.currentUser.toKey()];h||(h=new ce(K)),h=h.insert(u,c),o.Ba[o.currentUser.toKey()]=h}(n,s.batchId,t),await Rs(n,s.changes),await As(n.remoteStore)}catch(s){const i=cu(s,"Failed to persist write");t.reject(i)}}async function yp(r,e){const t=$(r);try{const n=await bv(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.Na.get(i);o&&(F(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?F(o.va):s.removedDocuments.size>0&&(F(o.va),o.va=!1))}),await Rs(t,n,e)}catch(n){await An(n)}}function gh(r,e,t){const n=$(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Fa.forEach((i,o)=>{const u=o.view.Z_(e);u.snapshot&&s.push(u.snapshot)}),function(o,u){const c=$(o);c.onlineState=u;let h=!1;c.queries.forEach((f,p)=>{for(const _ of p.j_)_.Z_(u)&&(h=!0)}),h&&du(c)}(n.eventManager,e),s.length&&n.Ca.d_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function dE(r,e,t){const n=$(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Na.get(e),i=s&&s.key;if(i){let o=new ce(O.comparator);o=o.insert(i,ae.newNoDocument(i,U.min()));const u=H().add(i),c=new Wi(U.min(),new Map,new ce(K),o,u);await yp(n,c),n.Oa=n.Oa.remove(i),n.Na.delete(e),pu(n)}else await ga(n.localStore,e,!1).then(()=>ya(n,e,t)).catch(An)}async function fE(r,e){const t=$(r),n=e.batch.batchId;try{const s=await Rv(t.localStore,e);Tp(t,n,null),Ip(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Rs(t,s)}catch(s){await An(s)}}async function pE(r,e,t){const n=$(r);try{const s=await function(o,u){const c=$(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next(p=>(F(p!==null),f=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(n.localStore,e);Tp(n,e,t),Ip(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Rs(n,s)}catch(s){await An(s)}}function Ip(r,e){(r.ka.get(e)||[]).forEach(t=>{t.resolve()}),r.ka.delete(e)}function Tp(r,e,t){const n=$(r);let s=n.Ba[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.Ba[n.currentUser.toKey()]=s}}function ya(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach(n=>{r.La.containsKey(n)||vp(r,n)})}function vp(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(su(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),pu(r))}function _h(r,e,t){for(const n of t)n instanceof mp?(r.La.addReference(n.key,e),mE(r,n)):n instanceof gp?(D("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||vp(r,n.key)):L()}function mE(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(D("SyncEngine","New document in limbo: "+t),r.xa.add(n),pu(r))}function pu(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new O(Z.fromString(e)),n=r.qa.next();r.Na.set(n,new sE(t)),r.Oa=r.Oa.insert(t,n),cp(r.remoteStore,new ft(Ke(Is(t.path)),n,"TargetPurposeLimboResolution",ze.oe))}}async function Rs(r,e,t){const n=$(r),s=[],i=[],o=[];n.Fa.isEmpty()||(n.Fa.forEach((u,c)=>{o.push(n.Ka(c,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=nu.Wi(c.targetId,h);i.push(p)}}))}),await Promise.all(o),n.Ca.d_(s),await async function(c,h){const f=$(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>A.forEach(h,_=>A.forEach(_.$i,w=>f.persistence.referenceDelegate.addReference(p,_.targetId,w)).next(()=>A.forEach(_.Ui,w=>f.persistence.referenceDelegate.removeReference(p,_.targetId,w)))))}catch(p){if(!Kt(p))throw p;D("LocalStore","Failed to update sequence numbers: "+p)}for(const p of h){const _=p.targetId;if(!p.fromCache){const w=f.os.get(_),C=w.snapshotVersion,V=w.withLastLimboFreeSnapshotVersion(C);f.os=f.os.insert(_,V)}}}(n.localStore,i))}async function gE(r,e){const t=$(r);if(!t.currentUser.isEqual(e)){D("SyncEngine","User change. New user:",e.toKey());const n=await ip(t.localStore,e);t.currentUser=e,function(i,o){i.ka.forEach(u=>{u.forEach(c=>{c.reject(new N(P.CANCELLED,o))})}),i.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Rs(t,n.hs)}}function _E(r,e){const t=$(r),n=t.Na.get(e);if(n&&n.va)return H().add(n.key);{let s=H();const i=t.Ma.get(e);if(!i)return s;for(const o of i){const u=t.Fa.get(o);s=s.unionWith(u.view.Va)}return s}}function Ep(r){const e=$(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=yp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=_E.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=dE.bind(null,e),e.Ca.d_=eE.bind(null,e.eventManager),e.Ca.$a=tE.bind(null,e.eventManager),e}function wp(r){const e=$(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=fE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=pE.bind(null,e),e}class cs{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Xi(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return sp(this.persistence,new rp,e.initialUser,this.serializer)}Ga(e){return new eu(Ji.Zr,this.serializer)}Wa(e){return new ap}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}cs.provider={build:()=>new cs};class yE extends cs{constructor(e){super(),this.cacheSizeBytes=e}ja(e,t){F(this.persistence.referenceDelegate instanceof Di);const n=this.persistence.referenceDelegate.garbageCollector;return new Xf(n,e.asyncQueue,t)}Ga(e){const t=this.cacheSizeBytes!==void 0?De.withCacheSize(this.cacheSizeBytes):De.DEFAULT;return new eu(n=>Di.Zr(n,t),this.serializer)}}class IE extends cs{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await wp(this.Ja.syncEngine),await As(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return sp(this.persistence,new rp,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Xf(n,e.asyncQueue,t)}Ha(e,t){const n=new FI(t,this.persistence);return new LI(e.asyncQueue,n)}Ga(e){const t=Ev(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?De.withCacheSize(this.cacheSizeBytes):De.DEFAULT;return new tu(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Ov(),pi(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new ap}}class Ni{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>gh(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=gE.bind(null,this.syncEngine),await Jv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Zv}()}createDatastore(e){const t=Xi(e.databaseInfo.databaseId),n=function(i){return new xv(i)}(e.databaseInfo);return function(i,o,u,c){return new Fv(i,o,u,c)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,s,i,o,u){return new Bv(n,s,i,o,u)}(this.localStore,this.datastore,e.asyncQueue,t=>gh(this.syncEngine,t,0),function(){return hh.D()?new hh:new Dv}())}createSyncEngine(e,t){return function(s,i,o,u,c,h,f){const p=new iE(s,i,o,u,c,h);return f&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=$(s);D("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await ws(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ni.provider={build:()=>new Ni};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Le("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new N(P.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const t=await async function(s,i){const o=$(s),u={documents:i.map(p=>as(o.serializer,p))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,Z.emptyPath(),u,i.length),h=new Map;c.forEach(p=>{const _=jT(o.serializer,p);h.set(_.key.toString(),_)});const f=[];return i.forEach(p=>{const _=h.get(p.toString());F(!!_),f.push(_)}),f}(this.datastore,e);return t.forEach(n=>this.recordVersion(n)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(n){this.lastTransactionError=n}this.writtenDocs.add(e.toString())}delete(e){this.write(new lr(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,n)=>{const s=O.fromPath(n);this.mutations.push(new za(s,this.precondition(s)))}),await async function(n,s){const i=$(n),o={writes:s.map(u=>us(i.serializer,u))};await i.Mo("Commit",i.serializer.databaseId,Z.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw L();t=U.min()}const n=this.readVersions.get(e.key.toString());if(n){if(!t.isEqual(n))throw new N(P.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(U.min())?ue.exists(!1):ue.updateTime(t):ue.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(U.min()))throw new N(P.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ue.updateTime(t)}return ue.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vE{constructor(e,t,n,s,i){this.asyncQueue=e,this.datastore=t,this.options=n,this.updateFunction=s,this.deferred=i,this._u=n.maxAttempts,this.t_=new ru(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new TE(this.datastore),t=this.cu(e);t&&t.then(n=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(n)}).catch(s=>{this.lu(s)}))}).catch(n=>{this.lu(n)})})}cu(e){try{const t=this.updateFunction(e);return!_s(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Cf(t)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EE{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=Ee.UNAUTHENTICATED,this.clientId=Kd.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async o=>{D("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(D("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Qe;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=cu(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function qo(r,e){r.asyncQueue.verifyOperationInProgress(),D("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await ip(e.localStore,s),n=s)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function yh(r,e){r.asyncQueue.verifyOperationInProgress();const t=await wE(r);D("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>dh(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>dh(e.remoteStore,s)),r._onlineComponents=e}async function wE(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){D("FirestoreClient","Using user provided OfflineComponentProvider");try{await qo(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Jn("Error using user provided cache. Falling back to memory cache: "+t),await qo(r,new cs)}}else D("FirestoreClient","Using default OfflineComponentProvider"),await qo(r,new yE(void 0));return r._offlineComponents}async function gu(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(D("FirestoreClient","Using user provided OnlineComponentProvider"),await yh(r,r._uninitializedComponentsProvider._online)):(D("FirestoreClient","Using default OnlineComponentProvider"),await yh(r,new Ni))),r._onlineComponents}function AE(r){return gu(r).then(e=>e.syncEngine)}function RE(r){return gu(r).then(e=>e.datastore)}async function xi(r){const e=await gu(r),t=e.eventManager;return t.onListen=oE.bind(null,e.syncEngine),t.onUnlisten=cE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=aE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=lE.bind(null,e.syncEngine),t}function bE(r,e,t={}){const n=new Qe;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,u,c,h){const f=new mu({next:_=>{f.Za(),o.enqueueAndForget(()=>hu(i,p));const w=_.docs.has(u);!w&&_.fromCache?h.reject(new N(P.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&_.fromCache&&c&&c.source==="server"?h.reject(new N(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new fu(Is(u.path),f,{includeMetadataChanges:!0,_a:!0});return lu(i,p)}(await xi(r),r.asyncQueue,e,t,n)),n.promise}function SE(r,e,t={}){const n=new Qe;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,u,c,h){const f=new mu({next:_=>{f.Za(),o.enqueueAndForget(()=>hu(i,p)),_.fromCache&&c.source==="server"?h.reject(new N(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),p=new fu(u,f,{includeMetadataChanges:!0,_a:!0});return lu(i,p)}(await xi(r),r.asyncQueue,e,t,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ap(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rp(r,e,t){if(!t)throw new N(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function PE(r,e,t,n){if(e===!0&&n===!0)throw new N(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Th(r){if(!O.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function vh(r){if(O.isDocumentKey(r))throw new N(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function eo(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":L()}function Ne(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new N(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=eo(r);throw new N(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}function CE(r,e){if(e<=0)throw new N(P.INVALID_ARGUMENT,`Function ${r}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new N(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}PE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ap((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new N(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class to{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Eh({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new N(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new N(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Eh(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new RI;switch(n.type){case"firstParty":return new CI(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new N(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Ih.get(t);n&&(D("ComponentProvider","Removing Datastore"),Ih.delete(t),n.terminate())}(this),Promise.resolve()}}function kE(r,e,t,n={}){var s;const i=(r=Ne(r,to))._getSettings(),o=`${e}:${t}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&Jn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),n.mockUserToken){let u,c;if(typeof n.mockUserToken=="string")u=n.mockUserToken,c=Ee.MOCK_USER;else{u=td(n.mockUserToken,(s=r._app)===null||s===void 0?void 0:s.options.projectId);const h=n.mockUserToken.sub||n.mockUserToken.user_id;if(!h)throw new N(P.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Ee(h)}r._authCredentials=new bI(new zd(u,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new wt(this.firestore,e,this._query)}}class Re{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new jt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Re(this.firestore,e,this._key)}}class jt extends wt{constructor(e,t,n){super(e,t,Is(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Re(this.firestore,null,new O(e))}withConverter(e){return new jt(this.firestore,e,this._path)}}function GA(r,e,...t){if(r=ee(r),Rp("collection","path",e),r instanceof to){const n=Z.fromString(e,...t);return vh(n),new jt(r,null,n)}{if(!(r instanceof Re||r instanceof jt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Z.fromString(e,...t));return vh(n),new jt(r.firestore,null,n)}}function DE(r,e,...t){if(r=ee(r),arguments.length===1&&(e=Kd.newId()),Rp("doc","path",e),r instanceof to){const n=Z.fromString(e,...t);return Th(n),new Re(r,null,new O(n))}{if(!(r instanceof Re||r instanceof jt))throw new N(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Z.fromString(e,...t));return Th(n),new Re(r.firestore,r instanceof jt?r.converter:null,new O(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new ru(this,"async_queue_retry"),this.Vu=()=>{const n=pi();n&&D("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=pi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=pi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new Qe;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Kt(e))throw e;D("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(n=>{this.Eu=n,this.du=!1;const s=function(o){let u=o.message||"";return o.stack&&(u=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),u}(n);throw Le("INTERNAL UNHANDLED ERROR: ",s),n}).then(n=>(this.du=!1,n))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=uu.createAndSchedule(this,e,t,n,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&L()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function Ah(r){return function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1}(r,["next","error","complete"])}class Ye extends to{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new wh,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new wh(e),this._firestoreClient=void 0,await e}}}function zA(r,e,t){t||(t="(default)");const n=En(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(ln(i,e))return s;throw new N(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new N(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new N(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function KA(r,e){const t=fs(),n="(default)",s=En(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=ba("firestore");i&&kE(s,...i)}return s}function dr(r){if(r._terminated)throw new N(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||VE(r),r._firestoreClient}function VE(r){var e,t,n;const s=r._freezeSettings(),i=function(u,c,h,f){return new oT(u,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Ap(f.experimentalLongPollingOptions),f.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new EE(r._authCredentials,r._appCheckCredentials,r._queue,i,r._componentsProvider&&function(u){const c=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(c),_online:c}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Tn(ge.fromBase64String(e))}catch(t){throw new N(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Tn(ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new N(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new N(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new N(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NE=/^__.*__$/;class xE{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new Et(e,this.data,this.fieldMask,t,this.fieldTransforms):new cr(e,this.data,t,this.fieldTransforms)}}class bp{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Et(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Sp(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}class no{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new no(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:n,xu:!1});return s.Ou(e),s}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:n,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Oi(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Sp(this.Cu)&&NE.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class OE{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Xi(e)}Qu(e,t,n,s=!1){return new no({Cu:e,methodName:t,qu:n,path:he.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function pr(r){const e=r._freezeSettings(),t=Xi(r._databaseId);return new OE(r._databaseId,!!e.ignoreUndefinedProperties,t)}function ro(r,e,t,n,s,i={}){const o=r.Qu(i.merge||i.mergeFields?2:0,e,t,s);Ru("Data must be an object, but it was:",o,n);const u=Cp(n,o);let c,h;if(i.merge)c=new Be(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const _=Ia(e,p,t);if(!o.contains(_))throw new N(P.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);Dp(f,_)||f.push(_)}c=new Be(f),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new xE(new Ae(u),c,h)}class so extends bn{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof so}}function Pp(r,e,t){return new no({Cu:3,qu:e.settings.qu,methodName:r._methodName,xu:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Iu extends bn{_toFieldTransform(e){return new vs(e.path,new nr)}isEqual(e){return e instanceof Iu}}class Tu extends bn{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Pp(this,e,!0),n=this.Ku.map(i=>Sn(i,t)),s=new mn(n);return new vs(e.path,s)}isEqual(e){return e instanceof Tu&&ln(this.Ku,e.Ku)}}class vu extends bn{constructor(e,t){super(e),this.Ku=t}_toFieldTransform(e){const t=Pp(this,e,!0),n=this.Ku.map(i=>Sn(i,t)),s=new gn(n);return new vs(e.path,s)}isEqual(e){return e instanceof vu&&ln(this.Ku,e.Ku)}}class Eu extends bn{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new rr(e.serializer,Ef(e.serializer,this.$u));return new vs(e.path,t)}isEqual(e){return e instanceof Eu&&this.$u===e.$u}}function wu(r,e,t,n){const s=r.Qu(1,e,t);Ru("Data must be an object, but it was:",s,n);const i=[],o=Ae.empty();Ht(n,(c,h)=>{const f=bu(e,c,t);h=ee(h);const p=s.Nu(f);if(h instanceof so)i.push(f);else{const _=Sn(h,p);_!=null&&(i.push(f),o.set(f,_))}});const u=new Be(i);return new bp(o,u,s.fieldTransforms)}function Au(r,e,t,n,s,i){const o=r.Qu(1,e,t),u=[Ia(e,n,t)],c=[s];if(i.length%2!=0)throw new N(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)u.push(Ia(e,i[_])),c.push(i[_+1]);const h=[],f=Ae.empty();for(let _=u.length-1;_>=0;--_)if(!Dp(h,u[_])){const w=u[_];let C=c[_];C=ee(C);const V=o.Nu(w);if(C instanceof so)h.push(w);else{const k=Sn(C,V);k!=null&&(h.push(w),f.set(w,k))}}const p=new Be(h);return new bp(f,p,o.fieldTransforms)}function ME(r,e,t,n=!1){return Sn(t,r.Qu(n?4:3,e))}function Sn(r,e){if(kp(r=ee(r)))return Ru("Unsupported field value:",e,r),Cp(r,e);if(r instanceof bn)return function(n,s){if(!Sp(s.Cu))throw s.Bu(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(n,s){const i=[];let o=0;for(const u of n){let c=Sn(u,s.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(r,e)}return function(n,s){if((n=ee(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Ef(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=de.fromDate(n);return{timestampValue:sr(s.serializer,i)}}if(n instanceof de){const i=new de(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:sr(s.serializer,i)}}if(n instanceof _u)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Tn)return{bytesValue:Nf(s.serializer,n._byteString)};if(n instanceof Re){const i=s.databaseId,o=n.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Ya(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof yu)return function(o,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw u.Bu("VectorValues must only contain numeric values.");return Ga(u.serializer,c)})}}}}}}(n,s);throw s.Bu(`Unsupported field value: ${eo(n)}`)}(r,e)}function Cp(r,e){const t={};return nf(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ht(r,(n,s)=>{const i=Sn(s,e.Mu(n));i!=null&&(t[n]=i)}),{mapValue:{fields:t}}}function kp(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof de||r instanceof _u||r instanceof Tn||r instanceof Re||r instanceof bn||r instanceof yu)}function Ru(r,e,t){if(!kp(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const n=eo(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function Ia(r,e,t){if((e=ee(e))instanceof fr)return e._internalPath;if(typeof e=="string")return bu(r,e);throw Oi("Field path arguments must be of type string or ",r,!1,void 0,t)}const LE=new RegExp("[~\\*/\\[\\]]");function bu(r,e,t){if(e.search(LE)>=0)throw Oi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new fr(...e.split("."))._internalPath}catch{throw Oi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Oi(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${n}`),o&&(c+=` in document ${s}`),c+=")"),new N(P.INVALID_ARGUMENT,u+r+c)}function Dp(r,e){return r.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new FE(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(io("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class FE extends Mi{data(){return super.data()}}function io(r,e){return typeof e=="string"?bu(r,e):e instanceof fr?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vp(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new N(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Su{}class Pu extends Su{}function HA(r,e,...t){let n=[];e instanceof Su&&n.push(e),n=n.concat(t),function(i){const o=i.filter(c=>c instanceof mr).length,u=i.filter(c=>c instanceof bs).length;if(o>1||o>0&&u>0)throw new N(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const s of n)r=s._apply(r);return r}class bs extends Pu{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new bs(e,t,n)}_apply(e){const t=this._parse(e);return Np(e._query,t),new wt(e.firestore,e.converter,ua(e._query,t))}_parse(e){const t=pr(e.firestore);return function(i,o,u,c,h,f,p){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new N(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){bh(p,f);const w=[];for(const C of p)w.push(Rh(c,i,C));_={arrayValue:{values:w}}}else _=Rh(c,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||bh(p,f),_=ME(u,o,p,f==="in"||f==="not-in");return Y.create(h,f,_)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function WA(r,e,t){const n=e,s=io("where",r);return bs._create(s,n,t)}class mr extends Su{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new mr(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:te.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,i){let o=s;const u=i.getFlattenedFilters();for(const c of u)Np(o,c),o=ua(o,c)}(e._query,t),new wt(e.firestore,e.converter,ua(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function QA(...r){return r.forEach(e=>xp("or",e)),mr._create("or",r)}function YA(...r){return r.forEach(e=>xp("and",e)),mr._create("and",r)}class Cu extends Pu{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Cu(e,t)}_apply(e){const t=function(s,i,o){if(s.startAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new N(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new os(i,o)}(e._query,this._field,this._direction);return new wt(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new ur(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function JA(r,e="asc"){const t=e,n=io("orderBy",r);return Cu._create(n,t)}class ku extends Pu{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new ku(e,t,n)}_apply(e){return new wt(e.firestore,e.converter,Si(e._query,this._limit,this._limitType))}}function XA(r){return CE("limit",r),ku._create("limit",r,"F")}function Rh(r,e,t){if(typeof(t=ee(t))=="string"){if(t==="")throw new N(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!mf(e)&&t.indexOf("/")!==-1)throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(Z.fromString(t));if(!O.isDocumentKey(n))throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return ss(r,new O(n))}if(t instanceof Re)return ss(r,t._key);throw new N(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${eo(t)}.`)}function bh(r,e){if(!Array.isArray(r)||r.length===0)throw new N(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Np(r,e){const t=function(s,i){for(const o of s)for(const u of o.getFlattenedFilters())if(i.indexOf(u.op)>=0)return u.op;return null}(r.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new N(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}function xp(r,e){if(!(e instanceof bs||e instanceof mr))throw new N(P.INVALID_ARGUMENT,`Function ${r}() requires AppliableConstraints created with a call to 'where(...)', 'or(...)', or 'and(...)'.`)}class Op{convertValue(e,t="none"){switch($t(e)){case 0:return null;case 1:return e.booleanValue;case 2:return oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Tt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Ht(e,(s,i)=>{n[s]=this.convertValue(i,t)}),n}convertVectorValue(e){var t,n,s;const i=(s=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map(o=>oe(o.doubleValue));return new yu(i)}convertGeoPoint(e){return new _u(oe(e.latitude),oe(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=$i(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ns(e));default:return null}}convertTimestamp(e){const t=It(e);return new de(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Z.fromString(e);F($f(n));const s=new fn(n.get(1),n.get(3)),i=new O(n.popFirst(5));return s.isEqual(t)||Le(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oo(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class UE extends Op{constructor(e){super(),this.firestore=e}convertBytes(e){return new Tn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Du extends Mi{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new mi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(io("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class mi extends Du{data(e={}){return super.data(e)}}class Mp{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Gn(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new mi(this._firestore,this._userDataWriter,n.key,n,new Gn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new N(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(u=>{const c=new mi(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Gn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const c=new mi(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Gn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),f=o.indexOf(u.doc.key)),{type:BE(u.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function BE(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZA(r){r=Ne(r,Re);const e=Ne(r.firestore,Ye);return bE(dr(e),r._key).then(t=>Lp(e,r,t))}class ao extends Op{constructor(e){super(),this.firestore=e}convertBytes(e){return new Tn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}}function eR(r){r=Ne(r,wt);const e=Ne(r.firestore,Ye),t=dr(e),n=new ao(e);return Vp(r._query),SE(t,r._query).then(s=>new Mp(e,n,r,s))}function tR(r,e,t){r=Ne(r,Re);const n=Ne(r.firestore,Ye),s=oo(r.converter,e,t);return Ss(n,[ro(pr(n),"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,ue.none())])}function nR(r,e,t,...n){r=Ne(r,Re);const s=Ne(r.firestore,Ye),i=pr(s);let o;return o=typeof(e=ee(e))=="string"||e instanceof fr?Au(i,"updateDoc",r._key,e,t,n):wu(i,"updateDoc",r._key,e),Ss(s,[o.toMutation(r._key,ue.exists(!0))])}function rR(r){return Ss(Ne(r.firestore,Ye),[new lr(r._key,ue.none())])}function sR(r,e){const t=Ne(r.firestore,Ye),n=DE(r),s=oo(r.converter,e);return Ss(t,[ro(pr(r.firestore),"addDoc",n._key,s,r.converter!==null,{}).toMutation(n._key,ue.exists(!1))]).then(()=>n)}function iR(r,...e){var t,n,s;r=ee(r);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Ah(e[o])||(i=e[o],o++);const u={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(Ah(e[o])){const p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(n=p.error)===null||n===void 0?void 0:n.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let c,h,f;if(r instanceof Re)h=Ne(r.firestore,Ye),f=Is(r._key.path),c={next:p=>{e[o]&&e[o](Lp(h,r,p))},error:e[o+1],complete:e[o+2]};else{const p=Ne(r,wt);h=Ne(p.firestore,Ye),f=p._query;const _=new ao(h);c={next:w=>{e[o]&&e[o](new Mp(h,_,p,w))},error:e[o+1],complete:e[o+2]},Vp(r._query)}return function(_,w,C,V){const k=new mu(V),q=new fu(w,k,C);return _.asyncQueue.enqueueAndForget(async()=>lu(await xi(_),q)),()=>{k.Za(),_.asyncQueue.enqueueAndForget(async()=>hu(await xi(_),q))}}(dr(h),f,u,c)}function Ss(r,e){return function(n,s){const i=new Qe;return n.asyncQueue.enqueueAndForget(async()=>hE(await AE(n),s,i)),i.promise}(dr(r),e)}function Lp(r,e,t){const n=t.docs.get(e._key),s=new ao(r);return new Du(r,s,e._key,n,new Gn(t.hasPendingWrites,t.fromCache),e.converter)}class qE{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=$E(),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function oR(r){return new qE(r)}class jE{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ni.provider,this._offlineComponentProvider={build:t=>new IE(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}function $E(r){return new jE(void 0)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GE={maxAttempts:5};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=pr(e)}set(e,t,n){this._verifyNotCommitted();const s=Mt(e,this._firestore),i=oo(s.converter,t,n),o=ro(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,n);return this._mutations.push(o.toMutation(s._key,ue.none())),this}update(e,t,n,...s){this._verifyNotCommitted();const i=Mt(e,this._firestore);let o;return o=typeof(t=ee(t))=="string"||t instanceof fr?Au(this._dataReader,"WriteBatch.update",i._key,t,n,s):wu(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,ue.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Mt(e,this._firestore);return this._mutations=this._mutations.concat(new lr(t._key,ue.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new N(P.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Mt(r,e){if((r=ee(r)).firestore!==e)throw new N(P.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE extends class{constructor(t,n){this._firestore=t,this._transaction=n,this._dataReader=pr(t)}get(t){const n=Mt(t,this._firestore),s=new UE(this._firestore);return this._transaction.lookup([n._key]).then(i=>{if(!i||i.length!==1)return L();const o=i[0];if(o.isFoundDocument())return new Mi(this._firestore,s,o.key,o,n.converter);if(o.isNoDocument())return new Mi(this._firestore,s,n._key,null,n.converter);throw L()})}set(t,n,s){const i=Mt(t,this._firestore),o=oo(i.converter,n,s),u=ro(this._dataReader,"Transaction.set",i._key,o,i.converter!==null,s);return this._transaction.set(i._key,u),this}update(t,n,s,...i){const o=Mt(t,this._firestore);let u;return u=typeof(n=ee(n))=="string"||n instanceof fr?Au(this._dataReader,"Transaction.update",o._key,n,s,i):wu(this._dataReader,"Transaction.update",o._key,n),this._transaction.update(o._key,u),this}delete(t){const n=Mt(t,this._firestore);return this._transaction.delete(n._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=Mt(e,this._firestore),n=new ao(this._firestore);return super.get(e).then(s=>new Du(this._firestore,n,t._key,s._document,new Gn(!1,!1),t.converter))}}function uR(r,e,t){r=Ne(r,Ye);const n=Object.assign(Object.assign({},GE),t);return function(i){if(i.maxAttempts<1)throw new N(P.INVALID_ARGUMENT,"Max attempts must be at least 1")}(n),function(i,o,u){const c=new Qe;return i.asyncQueue.enqueueAndForget(async()=>{const h=await RE(i);new vE(i.asyncQueue,h,u,o,c).au()}),c.promise}(dr(r),s=>e(new KE(r,s)),n)}function cR(){return new Iu("serverTimestamp")}function lR(...r){return new Tu("arrayUnion",r)}function hR(...r){return new vu("arrayRemove",r)}function dR(r){return new Eu("increment",r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fR(r){return dr(r=Ne(r,Ye)),new zE(r,e=>Ss(r,e))}(function(e,t=!0){(function(s){ar=s})(wn),gt(new rt("firestore",(n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),u=new Ye(new SI(n.getProvider("auth-internal")),new DI(n.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new N(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new fn(h.options.projectId,f)}(o,s),o);return i=Object.assign({useFetchStreams:t},i),u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),qe(yl,"4.7.4",e),qe(yl,"4.7.4","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fp="firebasestorage.googleapis.com",Up="storageBucket",HE=2*60*1e3,WE=10*60*1e3,QE=1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe extends He{constructor(e,t,n=0){super(jo(e),`Firebase Storage: ${t} (${jo(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,fe.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return jo(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ie;(function(r){r.UNKNOWN="unknown",r.OBJECT_NOT_FOUND="object-not-found",r.BUCKET_NOT_FOUND="bucket-not-found",r.PROJECT_NOT_FOUND="project-not-found",r.QUOTA_EXCEEDED="quota-exceeded",r.UNAUTHENTICATED="unauthenticated",r.UNAUTHORIZED="unauthorized",r.UNAUTHORIZED_APP="unauthorized-app",r.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",r.INVALID_CHECKSUM="invalid-checksum",r.CANCELED="canceled",r.INVALID_EVENT_NAME="invalid-event-name",r.INVALID_URL="invalid-url",r.INVALID_DEFAULT_BUCKET="invalid-default-bucket",r.NO_DEFAULT_BUCKET="no-default-bucket",r.CANNOT_SLICE_BLOB="cannot-slice-blob",r.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",r.NO_DOWNLOAD_URL="no-download-url",r.INVALID_ARGUMENT="invalid-argument",r.INVALID_ARGUMENT_COUNT="invalid-argument-count",r.APP_DELETED="app-deleted",r.INVALID_ROOT_OPERATION="invalid-root-operation",r.INVALID_FORMAT="invalid-format",r.INTERNAL_ERROR="internal-error",r.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ie||(ie={}));function jo(r){return"storage/"+r}function Vu(){const r="An unknown error occurred, please check the error payload for server response.";return new fe(ie.UNKNOWN,r)}function YE(r){return new fe(ie.OBJECT_NOT_FOUND,"Object '"+r+"' does not exist.")}function JE(r){return new fe(ie.QUOTA_EXCEEDED,"Quota for bucket '"+r+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function XE(){const r="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new fe(ie.UNAUTHENTICATED,r)}function ZE(){return new fe(ie.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function ew(r){return new fe(ie.UNAUTHORIZED,"User does not have permission to access '"+r+"'.")}function Bp(){return new fe(ie.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function qp(){return new fe(ie.CANCELED,"User canceled the upload/download.")}function tw(r){return new fe(ie.INVALID_URL,"Invalid URL '"+r+"'.")}function nw(r){return new fe(ie.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+r+"'.")}function rw(){return new fe(ie.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Up+"' property when initializing the app?")}function jp(){return new fe(ie.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function sw(){return new fe(ie.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function iw(){return new fe(ie.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function ow(r){return new fe(ie.UNSUPPORTED_ENVIRONMENT,`${r} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Ta(r){return new fe(ie.INVALID_ARGUMENT,r)}function $p(){return new fe(ie.APP_DELETED,"The Firebase app was deleted.")}function aw(r){return new fe(ie.INVALID_ROOT_OPERATION,"The operation '"+r+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Yr(r,e){return new fe(ie.INVALID_FORMAT,"String does not match format '"+r+"': "+e)}function Ur(r){throw new fe(ie.INTERNAL_ERROR,"Internal error: "+r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=Fe.makeFromUrl(e,t)}catch{return new Fe(e,"")}if(n.path==="")return n;throw nw(e)}static makeFromUrl(e,t){let n=null;const s="([A-Za-z0-9.\\-_]+)";function i(j){j.path.charAt(j.path.length-1)==="/"&&(j.path_=j.path_.slice(0,-1))}const o="(/(.*))?$",u=new RegExp("^gs://"+s+o,"i"),c={bucket:1,path:3};function h(j){j.path_=decodeURIComponent(j.path)}const f="v[A-Za-z0-9_]+",p=t.replace(/[.]/g,"\\."),_="(/([^?#]*).*)?$",w=new RegExp(`^https?://${p}/${f}/b/${s}/o${_}`,"i"),C={bucket:1,path:3},V=t===Fp?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",q=new RegExp(`^https?://${V}/${s}/${k}`,"i"),M=[{regex:u,indices:c,postModify:i},{regex:w,indices:C,postModify:h},{regex:q,indices:{bucket:1,path:2},postModify:h}];for(let j=0;j<M.length;j++){const W=M[j],z=W.regex.exec(e);if(z){const T=z[W.indices.bucket];let g=z[W.indices.path];g||(g=""),n=new Fe(T,g),W.postModify(n);break}}if(n==null)throw tw(e);return n}}class uw{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cw(r,e,t){let n=1,s=null,i=null,o=!1,u=0;function c(){return u===2}let h=!1;function f(...k){h||(h=!0,e.apply(null,k))}function p(k){s=setTimeout(()=>{s=null,r(w,c())},k)}function _(){i&&clearTimeout(i)}function w(k,...q){if(h){_();return}if(k){_(),f.call(null,k,...q);return}if(c()||o){_(),f.call(null,k,...q);return}n<64&&(n*=2);let M;u===1?(u=2,M=0):M=(n+Math.random())*1e3,p(M)}let C=!1;function V(k){C||(C=!0,_(),!h&&(s!==null?(k||(u=2),clearTimeout(s),p(0)):k||(u=1)))}return p(0),i=setTimeout(()=>{o=!0,V(!0)},t),V}function lw(r){r(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hw(r){return r!==void 0}function dw(r){return typeof r=="function"}function fw(r){return typeof r=="object"&&!Array.isArray(r)}function uo(r){return typeof r=="string"||r instanceof String}function Sh(r){return Nu()&&r instanceof Blob}function Nu(){return typeof Blob<"u"}function va(r,e,t,n){if(n<e)throw Ta(`Invalid value for '${r}'. Expected ${e} or greater.`);if(n>t)throw Ta(`Invalid value for '${r}'. Expected ${t} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pn(r,e,t){let n=e;return t==null&&(n=`https://${e}`),`${t}://${n}/v0${r}`}function Gp(r){const e=encodeURIComponent;let t="?";for(const n in r)if(r.hasOwnProperty(n)){const s=e(n)+"="+e(r[n]);t=t+s+"&"}return t=t.slice(0,-1),t}var cn;(function(r){r[r.NO_ERROR=0]="NO_ERROR",r[r.NETWORK_ERROR=1]="NETWORK_ERROR",r[r.ABORT=2]="ABORT"})(cn||(cn={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zp(r,e){const t=r>=500&&r<600,s=[408,429].indexOf(r)!==-1,i=e.indexOf(r)!==-1;return t||s||i}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw{constructor(e,t,n,s,i,o,u,c,h,f,p,_=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=s,this.successCodes_=i,this.additionalRetryCodes_=o,this.callback_=u,this.errorCallback_=c,this.timeout_=h,this.progressCallback_=f,this.connectionFactory_=p,this.retry=_,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((w,C)=>{this.resolve_=w,this.reject_=C,this.start_()})}start_(){const e=(n,s)=>{if(s){n(!1,new ei(!1,null,!0));return}const i=this.connectionFactory_();this.pendingConnection_=i;const o=u=>{const c=u.loaded,h=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,h)};this.progressCallback_!==null&&i.addUploadProgressListener(o),i.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&i.removeUploadProgressListener(o),this.pendingConnection_=null;const u=i.getErrorCode()===cn.NO_ERROR,c=i.getStatus();if(!u||zp(c,this.additionalRetryCodes_)&&this.retry){const f=i.getErrorCode()===cn.ABORT;n(!1,new ei(!1,null,f));return}const h=this.successCodes_.indexOf(c)!==-1;n(!0,new ei(h,i))})},t=(n,s)=>{const i=this.resolve_,o=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const c=this.callback_(u,u.getResponse());hw(c)?i(c):i()}catch(c){o(c)}else if(u!==null){const c=Vu();c.serverResponse=u.getErrorText(),this.errorCallback_?o(this.errorCallback_(u,c)):o(c)}else if(s.canceled){const c=this.appDelete_?$p():qp();o(c)}else{const c=Bp();o(c)}};this.canceled_?t(!1,new ei(!1,null,!0)):this.backoffId_=cw(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&lw(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class ei{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function mw(r,e){e!==null&&e.length>0&&(r.Authorization="Firebase "+e)}function gw(r,e){r["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function _w(r,e){e&&(r["X-Firebase-GMPID"]=e)}function yw(r,e){e!==null&&(r["X-Firebase-AppCheck"]=e)}function Iw(r,e,t,n,s,i,o=!0){const u=Gp(r.urlParams),c=r.url+u,h=Object.assign({},r.headers);return _w(h,e),mw(h,t),gw(h,i),yw(h,n),new pw(c,r.method,h,r.body,r.successCodes,r.additionalRetryCodes,r.handler,r.errorHandler,r.timeout,r.progressCallback,s,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tw(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function vw(...r){const e=Tw();if(e!==void 0){const t=new e;for(let n=0;n<r.length;n++)t.append(r[n]);return t.getBlob()}else{if(Nu())return new Blob(r);throw new fe(ie.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Ew(r,e,t){return r.webkitSlice?r.webkitSlice(e,t):r.mozSlice?r.mozSlice(e,t):r.slice?r.slice(e,t):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ww(r){if(typeof atob>"u")throw ow("base-64");return atob(r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ze={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class $o{constructor(e,t){this.data=e,this.contentType=t||null}}function Aw(r,e){switch(r){case Ze.RAW:return new $o(Kp(e));case Ze.BASE64:case Ze.BASE64URL:return new $o(Hp(r,e));case Ze.DATA_URL:return new $o(bw(e),Sw(e))}throw Vu()}function Kp(r){const e=[];for(let t=0;t<r.length;t++){let n=r.charCodeAt(t);if(n<=127)e.push(n);else if(n<=2047)e.push(192|n>>6,128|n&63);else if((n&64512)===55296)if(!(t<r.length-1&&(r.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const i=n,o=r.charCodeAt(++t);n=65536|(i&1023)<<10|o&1023,e.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|n&63)}else(n&64512)===56320?e.push(239,191,189):e.push(224|n>>12,128|n>>6&63,128|n&63)}return new Uint8Array(e)}function Rw(r){let e;try{e=decodeURIComponent(r)}catch{throw Yr(Ze.DATA_URL,"Malformed data URL.")}return Kp(e)}function Hp(r,e){switch(r){case Ze.BASE64:{const s=e.indexOf("-")!==-1,i=e.indexOf("_")!==-1;if(s||i)throw Yr(r,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Ze.BASE64URL:{const s=e.indexOf("+")!==-1,i=e.indexOf("/")!==-1;if(s||i)throw Yr(r,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=ww(e)}catch(s){throw s.message.includes("polyfill")?s:Yr(r,"Invalid character found")}const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}class Wp{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw Yr(Ze.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const n=t[1]||null;n!=null&&(this.base64=Pw(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}function bw(r){const e=new Wp(r);return e.base64?Hp(Ze.BASE64,e.rest):Rw(e.rest)}function Sw(r){return new Wp(r).contentType}function Pw(r,e){return r.length>=e.length?r.substring(r.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t){let n=0,s="";Sh(e)?(this.data_=e,n=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Sh(this.data_)){const n=this.data_,s=Ew(n,e,t);return s===null?null:new ut(s)}else{const n=new Uint8Array(this.data_.buffer,e,t-e);return new ut(n,!0)}}static getBlob(...e){if(Nu()){const t=e.map(n=>n instanceof ut?n.data_:n);return new ut(vw.apply(null,t))}else{const t=e.map(o=>uo(o)?Aw(Ze.RAW,o).data:o.data_);let n=0;t.forEach(o=>{n+=o.byteLength});const s=new Uint8Array(n);let i=0;return t.forEach(o=>{for(let u=0;u<o.length;u++)s[i++]=o[u]}),new ut(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xu(r){let e;try{e=JSON.parse(r)}catch{return null}return fw(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cw(r){if(r.length===0)return null;const e=r.lastIndexOf("/");return e===-1?"":r.slice(0,e)}function kw(r,e){const t=e.split("/").filter(n=>n.length>0).join("/");return r.length===0?t:r+"/"+t}function Qp(r){const e=r.lastIndexOf("/",r.length-2);return e===-1?r:r.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dw(r,e){return e}class Me{constructor(e,t,n,s){this.server=e,this.local=t||e,this.writable=!!n,this.xform=s||Dw}}let ti=null;function Vw(r){return!uo(r)||r.length<2?r:Qp(r)}function Ou(){if(ti)return ti;const r=[];r.push(new Me("bucket")),r.push(new Me("generation")),r.push(new Me("metageneration")),r.push(new Me("name","fullPath",!0));function e(i,o){return Vw(o)}const t=new Me("name");t.xform=e,r.push(t);function n(i,o){return o!==void 0?Number(o):o}const s=new Me("size");return s.xform=n,r.push(s),r.push(new Me("timeCreated")),r.push(new Me("updated")),r.push(new Me("md5Hash",null,!0)),r.push(new Me("cacheControl",null,!0)),r.push(new Me("contentDisposition",null,!0)),r.push(new Me("contentEncoding",null,!0)),r.push(new Me("contentLanguage",null,!0)),r.push(new Me("contentType",null,!0)),r.push(new Me("metadata","customMetadata",!0)),ti=r,ti}function Nw(r,e){function t(){const n=r.bucket,s=r.fullPath,i=new Fe(n,s);return e._makeStorageReference(i)}Object.defineProperty(r,"ref",{get:t})}function xw(r,e,t){const n={};n.type="file";const s=t.length;for(let i=0;i<s;i++){const o=t[i];n[o.local]=o.xform(n,e[o.server])}return Nw(n,r),n}function Yp(r,e,t){const n=xu(e);return n===null?null:xw(r,n,t)}function Ow(r,e,t,n){const s=xu(e);if(s===null||!uo(s.downloadTokens))return null;const i=s.downloadTokens;if(i.length===0)return null;const o=encodeURIComponent;return i.split(",").map(h=>{const f=r.bucket,p=r.fullPath,_="/b/"+o(f)+"/o/"+o(p),w=Pn(_,t,n),C=Gp({alt:"media",token:h});return w+C})[0]}function Jp(r,e){const t={},n=e.length;for(let s=0;s<n;s++){const i=e[s];i.writable&&(t[i.server]=r[i.local])}return JSON.stringify(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ph="prefixes",Ch="items";function Mw(r,e,t){const n={prefixes:[],items:[],nextPageToken:t.nextPageToken};if(t[Ph])for(const s of t[Ph]){const i=s.replace(/\/$/,""),o=r._makeStorageReference(new Fe(e,i));n.prefixes.push(o)}if(t[Ch])for(const s of t[Ch]){const i=r._makeStorageReference(new Fe(e,s.name));n.items.push(i)}return n}function Lw(r,e,t){const n=xu(t);return n===null?null:Mw(r,e,n)}class Wt{constructor(e,t,n,s){this.url=e,this.method=t,this.handler=n,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(r){if(!r)throw Vu()}function Mu(r,e){function t(n,s){const i=Yp(r,s,e);return nt(i!==null),i}return t}function Fw(r,e){function t(n,s){const i=Lw(r,e,s);return nt(i!==null),i}return t}function Uw(r,e){function t(n,s){const i=Yp(r,s,e);return nt(i!==null),Ow(i,s,r.host,r._protocol)}return t}function gr(r){function e(t,n){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=ZE():s=XE():t.getStatus()===402?s=JE(r.bucket):t.getStatus()===403?s=ew(r.path):s=n,s.status=t.getStatus(),s.serverResponse=n.serverResponse,s}return e}function Lu(r){const e=gr(r);function t(n,s){let i=e(n,s);return n.getStatus()===404&&(i=YE(r.path)),i.serverResponse=s.serverResponse,i}return t}function Bw(r,e,t){const n=e.fullServerUrl(),s=Pn(n,r.host,r._protocol),i="GET",o=r.maxOperationRetryTime,u=new Wt(s,i,Mu(r,t),o);return u.errorHandler=Lu(e),u}function qw(r,e,t,n,s){const i={};e.isRoot?i.prefix="":i.prefix=e.path+"/",t.length>0&&(i.delimiter=t),n&&(i.pageToken=n),s&&(i.maxResults=s);const o=e.bucketOnlyServerUrl(),u=Pn(o,r.host,r._protocol),c="GET",h=r.maxOperationRetryTime,f=new Wt(u,c,Fw(r,e.bucket),h);return f.urlParams=i,f.errorHandler=gr(e),f}function jw(r,e,t){const n=e.fullServerUrl(),s=Pn(n,r.host,r._protocol),i="GET",o=r.maxOperationRetryTime,u=new Wt(s,i,Uw(r,t),o);return u.errorHandler=Lu(e),u}function $w(r,e){const t=e.fullServerUrl(),n=Pn(t,r.host,r._protocol),s="DELETE",i=r.maxOperationRetryTime;function o(c,h){}const u=new Wt(n,s,o,i);return u.successCodes=[200,204],u.errorHandler=Lu(e),u}function Gw(r,e){return r&&r.contentType||e&&e.type()||"application/octet-stream"}function Xp(r,e,t){const n=Object.assign({},t);return n.fullPath=r.path,n.size=e.size(),n.contentType||(n.contentType=Gw(null,e)),n}function Zp(r,e,t,n,s){const i=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function u(){let M="";for(let j=0;j<2;j++)M=M+Math.random().toString().slice(2);return M}const c=u();o["Content-Type"]="multipart/related; boundary="+c;const h=Xp(e,n,s),f=Jp(h,t),p="--"+c+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+c+`\r
Content-Type: `+h.contentType+`\r
\r
`,_=`\r
--`+c+"--",w=ut.getBlob(p,n,_);if(w===null)throw jp();const C={name:h.fullPath},V=Pn(i,r.host,r._protocol),k="POST",q=r.maxUploadRetryTime,B=new Wt(V,k,Mu(r,t),q);return B.urlParams=C,B.headers=o,B.body=w.uploadData(),B.errorHandler=gr(e),B}class Li{constructor(e,t,n,s){this.current=e,this.total=t,this.finalized=!!n,this.metadata=s||null}}function Fu(r,e){let t=null;try{t=r.getResponseHeader("X-Goog-Upload-Status")}catch{nt(!1)}return nt(!!t&&(e||["active"]).indexOf(t)!==-1),t}function zw(r,e,t,n,s){const i=e.bucketOnlyServerUrl(),o=Xp(e,n,s),u={name:o.fullPath},c=Pn(i,r.host,r._protocol),h="POST",f={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${n.size()}`,"X-Goog-Upload-Header-Content-Type":o.contentType,"Content-Type":"application/json; charset=utf-8"},p=Jp(o,t),_=r.maxUploadRetryTime;function w(V){Fu(V);let k;try{k=V.getResponseHeader("X-Goog-Upload-URL")}catch{nt(!1)}return nt(uo(k)),k}const C=new Wt(c,h,w,_);return C.urlParams=u,C.headers=f,C.body=p,C.errorHandler=gr(e),C}function Kw(r,e,t,n){const s={"X-Goog-Upload-Command":"query"};function i(h){const f=Fu(h,["active","final"]);let p=null;try{p=h.getResponseHeader("X-Goog-Upload-Size-Received")}catch{nt(!1)}p||nt(!1);const _=Number(p);return nt(!isNaN(_)),new Li(_,n.size(),f==="final")}const o="POST",u=r.maxUploadRetryTime,c=new Wt(t,o,i,u);return c.headers=s,c.errorHandler=gr(e),c}const kh=256*1024;function Hw(r,e,t,n,s,i,o,u){const c=new Li(0,0);if(o?(c.current=o.current,c.total=o.total):(c.current=0,c.total=n.size()),n.size()!==c.total)throw sw();const h=c.total-c.current;let f=h;s>0&&(f=Math.min(f,s));const p=c.current,_=p+f;let w="";f===0?w="finalize":h===f?w="upload, finalize":w="upload";const C={"X-Goog-Upload-Command":w,"X-Goog-Upload-Offset":`${c.current}`},V=n.slice(p,_);if(V===null)throw jp();function k(j,W){const z=Fu(j,["active","final"]),T=c.current+f,g=n.size();let y;return z==="final"?y=Mu(e,i)(j,W):y=null,new Li(T,g,z==="final",y)}const q="POST",B=e.maxUploadRetryTime,M=new Wt(t,q,k,B);return M.headers=C,M.body=V.uploadData(),M.progressCallback=u||null,M.errorHandler=gr(r),M}const Ue={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Go(r){switch(r){case"running":case"pausing":case"canceling":return Ue.RUNNING;case"paused":return Ue.PAUSED;case"success":return Ue.SUCCESS;case"canceled":return Ue.CANCELED;case"error":return Ue.ERROR;default:return Ue.ERROR}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e,t,n){if(dw(e)||t!=null||n!=null)this.next=e,this.error=t??void 0,this.complete=n??void 0;else{const i=e;this.next=i.next,this.error=i.error,this.complete=i.complete}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(r){return(...e)=>{Promise.resolve().then(()=>r(...e))}}class Qw{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=cn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=cn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=cn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,s){if(this.sent_)throw Ur("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(const i in s)s.hasOwnProperty(i)&&this.xhr_.setRequestHeader(i,s[i].toString());return n!==void 0?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Ur("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Ur("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Ur("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Ur("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class Yw extends Qw{initXhr(){this.xhr_.responseType="text"}}function ct(){return new Yw}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(e,t,n=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=n,this._mappings=Ou(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=s=>{if(this._request=void 0,this._chunkMultiplier=1,s._codeEquals(ie.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{const i=this.isExponentialBackoffExpired();if(zp(s.status,[]))if(i)s=Bp();else{this.sleepTime=Math.max(this.sleepTime*2,QE),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=s,this._transition("error")}},this._metadataErrorHandler=s=>{this._request=void 0,s._codeEquals(ie.CANCELED)?this.completeTransitions_():(this._error=s,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((s,i)=>{this._resolve=s,this._reject=i,this._start()}),this._promise.then(null,()=>{})}isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}_makeProgressCallback(){const e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,n])=>{switch(this._state){case"running":e(t,n);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{const n=zw(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,ct,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._uploadUrl=i,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){const e=this._uploadUrl;this._resolveToken((t,n)=>{const s=Kw(this._ref.storage,this._ref._location,e,this._blob),i=this._ref.storage._makeRequest(s,ct,t,n);this._request=i,i.getPromise().then(o=>{o=o,this._request=void 0,this._updateProgress(o.current),this._needToFetchStatus=!1,o.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){const e=kh*this._chunkMultiplier,t=new Li(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((s,i)=>{let o;try{o=Hw(this._ref._location,this._ref.storage,n,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(c){this._error=c,this._transition("error");return}const u=this._ref.storage._makeRequest(o,ct,s,i,!1);this._request=u,u.getPromise().then(c=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(c.current),c.finalized?(this._metadata=c.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){kh*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{const n=Bw(this._ref.storage,this._ref._location,this._mappings),s=this._ref.storage._makeRequest(n,ct,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{const n=Zp(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),s=this._ref.storage._makeRequest(n,ct,e,t);this._request=s,s.getPromise().then(i=>{this._request=void 0,this._metadata=i,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){const t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":const t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=qp(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){const e=Go(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,n,s){const i=new Ww(t||void 0,n||void 0,s||void 0);return this._addObserver(i),()=>{this._removeObserver(i)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){const t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(Go(this._state)){case Ue.SUCCESS:Ln(this._resolve.bind(null,this.snapshot))();break;case Ue.CANCELED:case Ue.ERROR:const t=this._reject;Ln(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(Go(this._state)){case Ue.RUNNING:case Ue.PAUSED:e.next&&Ln(e.next.bind(e,this.snapshot))();break;case Ue.SUCCESS:e.complete&&Ln(e.complete.bind(e))();break;case Ue.CANCELED:case Ue.ERROR:e.error&&Ln(e.error.bind(e,this._error))();break;default:e.error&&Ln(e.error.bind(e,this._error))()}}resume(){const e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){const e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){const e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(e,t){this._service=e,t instanceof Fe?this._location=t:this._location=Fe.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new vn(e,t)}get root(){const e=new Fe(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Qp(this._location.path)}get storage(){return this._service}get parent(){const e=Cw(this._location.path);if(e===null)return null;const t=new Fe(this._location.bucket,e);return new vn(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw aw(e)}}function Xw(r,e,t){r._throwIfRoot("uploadBytes");const n=Zp(r.storage,r._location,Ou(),new ut(e,!0),t);return r.storage.makeRequestWithTokens(n,ct).then(s=>({metadata:s,ref:r}))}function Zw(r,e,t){return r._throwIfRoot("uploadBytesResumable"),new Jw(r,new ut(e),t)}function eA(r){const e={prefixes:[],items:[]};return em(r,e).then(()=>e)}async function em(r,e,t){const s=await tA(r,{pageToken:t});e.prefixes.push(...s.prefixes),e.items.push(...s.items),s.nextPageToken!=null&&await em(r,e,s.nextPageToken)}function tA(r,e){e!=null&&typeof e.maxResults=="number"&&va("options.maxResults",1,1e3,e.maxResults);const t=e||{},n=qw(r.storage,r._location,"/",t.pageToken,t.maxResults);return r.storage.makeRequestWithTokens(n,ct)}function nA(r){r._throwIfRoot("getDownloadURL");const e=jw(r.storage,r._location,Ou());return r.storage.makeRequestWithTokens(e,ct).then(t=>{if(t===null)throw iw();return t})}function rA(r){r._throwIfRoot("deleteObject");const e=$w(r.storage,r._location);return r.storage.makeRequestWithTokens(e,ct)}function sA(r,e){const t=kw(r._location.path,e),n=new Fe(r._location.bucket,t);return new vn(r.storage,n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iA(r){return/^[A-Za-z]+:\/\//.test(r)}function oA(r,e){return new vn(r,e)}function tm(r,e){if(r instanceof Uu){const t=r;if(t._bucket==null)throw rw();const n=new vn(t,t._bucket);return e!=null?tm(n,e):n}else return e!==void 0?sA(r,e):r}function aA(r,e){if(e&&iA(e)){if(r instanceof Uu)return oA(r,e);throw Ta("To use ref(service, url), the first argument must be a Storage instance.")}else return tm(r,e)}function Dh(r,e){const t=e==null?void 0:e[Up];return t==null?null:Fe.makeFromBucketSpec(t,r)}function uA(r,e,t,n={}){r.host=`${e}:${t}`,r._protocol="http";const{mockUserToken:s}=n;s&&(r._overrideAuthToken=typeof s=="string"?s:td(s,r.app.options.projectId))}class Uu{constructor(e,t,n,s,i){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=s,this._firebaseVersion=i,this._bucket=null,this._host=Fp,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=HE,this._maxUploadRetryTime=WE,this._requests=new Set,s!=null?this._bucket=Fe.makeFromBucketSpec(s,this._host):this._bucket=Dh(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Fe.makeFromBucketSpec(this._url,e):this._bucket=Dh(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){va("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){va("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new vn(this,e)}_makeRequest(e,t,n,s,i=!0){if(this._deleted)return new uw($p());{const o=Iw(e,this._appId,n,s,t,this._firebaseVersion,i);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){const[n,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,s).getPromise()}}const Vh="@firebase/storage",Nh="0.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm="storage";function pR(r,e,t){return r=ee(r),Xw(r,e,t)}function mR(r,e,t){return r=ee(r),Zw(r,e,t)}function gR(r){return r=ee(r),eA(r)}function _R(r){return r=ee(r),nA(r)}function yR(r){return r=ee(r),rA(r)}function IR(r,e){return r=ee(r),aA(r,e)}function TR(r=fs(),e){r=ee(r);const n=En(r,nm).getImmediate({identifier:e}),s=ba("storage");return s&&cA(n,...s),n}function cA(r,e,t,n={}){uA(r,e,t,n)}function lA(r,{instanceIdentifier:e}){const t=r.getProvider("app").getImmediate(),n=r.getProvider("auth-internal"),s=r.getProvider("app-check-internal");return new Uu(t,n,s,e,wn)}function hA(){gt(new rt(nm,lA,"PUBLIC").setMultipleInstances(!0)),qe(Vh,Nh,""),qe(Vh,Nh,"esm2017")}hA();var xh="@firebase/vertexai",Ea="1.0.0";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu="vertexAI",rm="us-central1",dA="https://firebasevertexai.googleapis.com",fA="v1beta",Oh=Ea,pA="gl-js";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(e,t,n,s){var i;this.app=e,this.options=s;const o=n==null?void 0:n.getImmediate({optional:!0}),u=t==null?void 0:t.getImmediate({optional:!0});this.auth=u||null,this.appCheck=o||null,this.location=((i=this.options)===null||i===void 0?void 0:i.location)||rm}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le extends He{constructor(e,t,n){const s=Bu,i="VertexAI",o=`${s}/${e}`,u=`${i}: ${t} (${o})`;super(e,u),this.code=e,this.customErrorData=n,Error.captureStackTrace&&Error.captureStackTrace(this,le),Object.setPrototypeOf(this,le.prototype),this.toString=()=>u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ls;(function(r){r.GENERATE_CONTENT="generateContent",r.STREAM_GENERATE_CONTENT="streamGenerateContent",r.COUNT_TOKENS="countTokens"})(ls||(ls={}));class sm{constructor(e,t,n,s,i){this.model=e,this.task=t,this.apiSettings=n,this.stream=s,this.requestOptions=i}toString(){var e;const t=fA;let s=`${((e=this.requestOptions)===null||e===void 0?void 0:e.baseUrl)||dA}/${t}`;return s+=`/projects/${this.apiSettings.project}`,s+=`/locations/${this.apiSettings.location}`,s+=`/${this.model}`,s+=`:${this.task}`,this.stream&&(s+="?alt=sse"),s}get fullModelString(){let e=`projects/${this.apiSettings.project}`;return e+=`/locations/${this.apiSettings.location}`,e+=`/${this.model}`,e}}function gA(){const r=[];return r.push(`${pA}/${Oh}`),r.push(`fire/${Oh}`),r.join(" ")}async function _A(r){const e=new Headers;if(e.append("Content-Type","application/json"),e.append("x-goog-api-client",gA()),e.append("x-goog-api-key",r.apiSettings.apiKey),r.apiSettings.getAppCheckToken){const t=await r.apiSettings.getAppCheckToken();t&&!t.error&&e.append("X-Firebase-AppCheck",t.token)}if(r.apiSettings.getAuthToken){const t=await r.apiSettings.getAuthToken();t&&e.append("Authorization",`Firebase ${t.accessToken}`)}return e}async function yA(r,e,t,n,s,i){const o=new sm(r,e,t,n,i);return{url:o.toString(),fetchOptions:Object.assign(Object.assign({},IA(i)),{method:"POST",headers:await _A(o),body:s})}}async function qu(r,e,t,n,s,i){const o=new sm(r,e,t,n,i);let u;try{const c=await yA(r,e,t,n,s,i);if(u=await fetch(c.url,c.fetchOptions),!u.ok){let h="",f;try{const p=await u.json();h=p.error.message,p.error.details&&(h+=` ${JSON.stringify(p.error.details)}`,f=p.error.details)}catch{}throw u.status===403&&f.some(p=>p.reason==="SERVICE_DISABLED")&&f.some(p=>{var _,w;return(w=(_=p.links)===null||_===void 0?void 0:_[0])===null||w===void 0?void 0:w.description.includes("Google developers console API activation")})?new le("api-not-enabled",`The Vertex AI in Firebase SDK requires the Vertex AI in Firebase
          API ('firebasevertexai.googleapis.com') to be enabled in your
          Firebase project. Enable this API by visiting the Firebase Console
          at https://console.firebase.google.com/project/${o.apiSettings.project}/genai/
          and clicking "Get started". If you enabled this API recently,
          wait a few minutes for the action to propagate to our systems and
          then retry.`,{status:u.status,statusText:u.statusText,errorDetails:f}):new le("fetch-error",`Error fetching from ${o}: [${u.status} ${u.statusText}] ${h}`,{status:u.status,statusText:u.statusText,errorDetails:f})}}catch(c){let h=c;throw c.code!=="fetch-error"&&c.code!=="api-not-enabled"&&c instanceof Error&&(h=new le("error",`Error fetching from ${o.toString()}: ${c.message}`),h.stack=c.stack),h}return u}function IA(r){const e={};let t=18e4;r!=null&&r.timeout&&(r==null?void 0:r.timeout)>=0&&(t=r.timeout);const n=new AbortController,s=n.signal;return setTimeout(()=>n.abort(),t),e.signal=s,e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh=["user","model","function","system"];var Lh;(function(r){r.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",r.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",r.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",r.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(Lh||(Lh={}));var Fh;(function(r){r.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",r.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",r.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",r.BLOCK_NONE="BLOCK_NONE"})(Fh||(Fh={}));var Uh;(function(r){r.SEVERITY="SEVERITY",r.PROBABILITY="PROBABILITY"})(Uh||(Uh={}));var Bh;(function(r){r.NEGLIGIBLE="NEGLIGIBLE",r.LOW="LOW",r.MEDIUM="MEDIUM",r.HIGH="HIGH"})(Bh||(Bh={}));var qh;(function(r){r.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",r.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",r.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",r.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"})(qh||(qh={}));var jh;(function(r){r.SAFETY="SAFETY",r.OTHER="OTHER"})(jh||(jh={}));var Fi;(function(r){r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.OTHER="OTHER"})(Fi||(Fi={}));var $h;(function(r){r.AUTO="AUTO",r.ANY="ANY",r.NONE="NONE"})($h||($h={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Gh;(function(r){r.STRING="string",r.NUMBER="number",r.INTEGER="integer",r.BOOLEAN="boolean",r.ARRAY="array",r.OBJECT="object"})(Gh||(Gh={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ju(r){return r.candidates&&!r.candidates[0].hasOwnProperty("index")&&(r.candidates[0].index=0),TA(r)}function TA(r){return r.text=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),wa(r.candidates[0]))throw new le("response-error",`Response error: ${zn(r)}. Response body stored in error.response`,{response:r});return vA(r)}else if(r.promptFeedback)throw new le("response-error",`Text not available. ${zn(r)}`,{response:r});return""},r.functionCalls=()=>{if(r.candidates&&r.candidates.length>0){if(r.candidates.length>1&&console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),wa(r.candidates[0]))throw new le("response-error",`Response error: ${zn(r)}. Response body stored in error.response`,{response:r});return EA(r)}else if(r.promptFeedback)throw new le("response-error",`Function call not available. ${zn(r)}`,{response:r})},r}function vA(r){var e,t,n,s;const i=[];if(!((t=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||t===void 0)&&t.parts)for(const o of(s=(n=r.candidates)===null||n===void 0?void 0:n[0].content)===null||s===void 0?void 0:s.parts)o.text&&i.push(o.text);return i.length>0?i.join(""):""}function EA(r){var e,t,n,s;const i=[];if(!((t=(e=r.candidates)===null||e===void 0?void 0:e[0].content)===null||t===void 0)&&t.parts)for(const o of(s=(n=r.candidates)===null||n===void 0?void 0:n[0].content)===null||s===void 0?void 0:s.parts)o.functionCall&&i.push(o.functionCall);if(i.length>0)return i}const wA=[Fi.RECITATION,Fi.SAFETY];function wa(r){return!!r.finishReason&&wA.includes(r.finishReason)}function zn(r){var e,t,n;let s="";if((!r.candidates||r.candidates.length===0)&&r.promptFeedback)s+="Response was blocked",!((e=r.promptFeedback)===null||e===void 0)&&e.blockReason&&(s+=` due to ${r.promptFeedback.blockReason}`),!((t=r.promptFeedback)===null||t===void 0)&&t.blockReasonMessage&&(s+=`: ${r.promptFeedback.blockReasonMessage}`);else if(!((n=r.candidates)===null||n===void 0)&&n[0]){const i=r.candidates[0];wa(i)&&(s+=`Candidate was blocked due to ${i.finishReason}`,i.finishMessage&&(s+=`: ${i.finishMessage}`))}return s}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zh=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function AA(r){const e=r.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),t=SA(e),[n,s]=t.tee();return{stream:bA(n),response:RA(s)}}async function RA(r){const e=[],t=r.getReader();for(;;){const{done:n,value:s}=await t.read();if(n)return ju(PA(e));e.push(s)}}function bA(r){return $m(this,arguments,function*(){const t=r.getReader();for(;;){const{value:n,done:s}=yield $c(t.read());if(s)break;const i=ju(n);yield yield $c(i)}})}function SA(r){const e=r.getReader();return new ReadableStream({start(n){let s="";return i();function i(){return e.read().then(({value:o,done:u})=>{if(u){if(s.trim()){n.error(new le("parse-failed","Failed to parse stream"));return}n.close();return}s+=o;let c=s.match(zh),h;for(;c;){try{h=JSON.parse(c[1])}catch{n.error(new le("parse-failed",`Error parsing JSON response: "${c[1]}`));return}n.enqueue(h),s=s.substring(c[0].length),c=s.match(zh)}return i()})}}})}function PA(r){const e=r[r.length-1],t={promptFeedback:e==null?void 0:e.promptFeedback};for(const n of r)if(n.candidates)for(const s of n.candidates){const i=s.index||0;if(t.candidates||(t.candidates=[]),t.candidates[i]||(t.candidates[i]={index:s.index}),t.candidates[i].citationMetadata=s.citationMetadata,t.candidates[i].finishReason=s.finishReason,t.candidates[i].finishMessage=s.finishMessage,t.candidates[i].safetyRatings=s.safetyRatings,s.content&&s.content.parts){t.candidates[i].content||(t.candidates[i].content={role:s.content.role||"user",parts:[]});const o={};for(const u of s.content.parts)u.text&&(o.text=u.text),u.functionCall&&(o.functionCall=u.functionCall),Object.keys(o).length===0&&(o.text=""),t.candidates[i].content.parts.push(o)}}return t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function im(r,e,t,n){const s=await qu(e,ls.STREAM_GENERATE_CONTENT,r,!0,JSON.stringify(t),n);return AA(s)}async function om(r,e,t,n){const i=await(await qu(e,ls.GENERATE_CONTENT,r,!1,JSON.stringify(t),n)).json();return{response:ju(i)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(r){if(r!=null){if(typeof r=="string")return{role:"system",parts:[{text:r}]};if(r.text)return{role:"system",parts:[r]};if(r.parts)return r.role?r:{role:"system",parts:r.parts}}}function Aa(r){let e=[];if(typeof r=="string")e=[{text:r}];else for(const t of r)typeof t=="string"?e.push({text:t}):e.push(t);return CA(e)}function CA(r){const e={role:"user",parts:[]},t={role:"function",parts:[]};let n=!1,s=!1;for(const i of r)"functionResponse"in i?(t.parts.push(i),s=!0):(e.parts.push(i),n=!0);if(n&&s)throw new le("invalid-content","Within a single message, FunctionResponse cannot be mixed with other type of Part in the request for sending chat message.");if(!n&&!s)throw new le("invalid-content","No Content is provided for sending chat message.");return n?e:t}function zo(r){let e;return r.contents?e=r:e={contents:[Aa(r)]},r.systemInstruction&&(e.systemInstruction=am(r.systemInstruction)),e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kh=["text","inlineData","functionCall","functionResponse"],kA={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall"],system:["text"]},Hh={user:["model"],function:["model"],model:["user","function"],system:[]};function DA(r){let e=null;for(const t of r){const{role:n,parts:s}=t;if(!e&&n!=="user")throw new le("invalid-content",`First Content should be with role 'user', got ${n}`);if(!Mh.includes(n))throw new le("invalid-content",`Each item should include role field. Got ${n} but valid roles are: ${JSON.stringify(Mh)}`);if(!Array.isArray(s))throw new le("invalid-content","Content should have 'parts' but property with an array of Parts");if(s.length===0)throw new le("invalid-content","Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0};for(const u of s)for(const c of Kh)c in u&&(i[c]+=1);const o=kA[n];for(const u of Kh)if(!o.includes(u)&&i[u]>0)throw new le("invalid-content",`Content with role '${n}' can't contain '${u}' part`);if(e&&!Hh[n].includes(e.role))throw new le("invalid-content",`Content with role '${n} can't follow '${e.role}'. Valid previous roles: ${JSON.stringify(Hh)}`);e=t}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh="SILENT_ERROR";class VA{constructor(e,t,n,s){this.model=t,this.params=n,this.requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiSettings=e,n!=null&&n.history&&(DA(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e){var t,n,s,i,o;await this._sendPromise;const u=Aa(e),c={safetySettings:(t=this.params)===null||t===void 0?void 0:t.safetySettings,generationConfig:(n=this.params)===null||n===void 0?void 0:n.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(i=this.params)===null||i===void 0?void 0:i.toolConfig,systemInstruction:(o=this.params)===null||o===void 0?void 0:o.systemInstruction,contents:[...this._history,u]};let h={};return this._sendPromise=this._sendPromise.then(()=>om(this._apiSettings,this.model,c,this.requestOptions)).then(f=>{var p,_;if(f.response.candidates&&f.response.candidates.length>0){this._history.push(u);const w={parts:((p=f.response.candidates)===null||p===void 0?void 0:p[0].content.parts)||[],role:((_=f.response.candidates)===null||_===void 0?void 0:_[0].content.role)||"model"};this._history.push(w)}else{const w=zn(f.response);w&&console.warn(`sendMessage() was unsuccessful. ${w}. Inspect response object for details.`)}h=f}),await this._sendPromise,h}async sendMessageStream(e){var t,n,s,i,o;await this._sendPromise;const u=Aa(e),c={safetySettings:(t=this.params)===null||t===void 0?void 0:t.safetySettings,generationConfig:(n=this.params)===null||n===void 0?void 0:n.generationConfig,tools:(s=this.params)===null||s===void 0?void 0:s.tools,toolConfig:(i=this.params)===null||i===void 0?void 0:i.toolConfig,systemInstruction:(o=this.params)===null||o===void 0?void 0:o.systemInstruction,contents:[...this._history,u]},h=im(this._apiSettings,this.model,c,this.requestOptions);return this._sendPromise=this._sendPromise.then(()=>h).catch(f=>{throw new Error(Wh)}).then(f=>f.response).then(f=>{if(f.candidates&&f.candidates.length>0){this._history.push(u);const p=Object.assign({},f.candidates[0].content);p.role||(p.role="model"),this._history.push(p)}else{const p=zn(f);p&&console.warn(`sendMessageStream() was unsuccessful. ${p}. Inspect response object for details.`)}}).catch(f=>{f.message!==Wh&&console.error(f)}),h}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NA(r,e,t,n){return(await qu(e,ls.COUNT_TOKENS,r,!1,JSON.stringify(t),n)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xA{constructor(e,t,n){var s,i,o,u;if(!((i=(s=e.app)===null||s===void 0?void 0:s.options)===null||i===void 0)&&i.apiKey)if(!((u=(o=e.app)===null||o===void 0?void 0:o.options)===null||u===void 0)&&u.projectId)this._apiSettings={apiKey:e.app.options.apiKey,project:e.app.options.projectId,location:e.location},e.appCheck&&(this._apiSettings.getAppCheckToken=()=>e.appCheck.getToken()),e.auth&&(this._apiSettings.getAuthToken=()=>e.auth.getToken());else throw new le("no-project-id",'The "projectId" field is empty in the local Firebase config. Firebase VertexAI requires this field to contain a valid project ID.');else throw new le("no-api-key",'The "apiKey" field is empty in the local Firebase config. Firebase VertexAI requires this field to contain a valid API key.');t.model.includes("/")?t.model.startsWith("models/")?this.model=`publishers/google/${t.model}`:this.model=t.model:this.model=`publishers/google/models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=am(t.systemInstruction),this.requestOptions=n||{}}async generateContent(e){const t=zo(e);return om(this._apiSettings,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction},t),this.requestOptions)}async generateContentStream(e){const t=zo(e);return im(this._apiSettings,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction},t),this.requestOptions)}startChat(e){return new VA(this._apiSettings,this.model,Object.assign({tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction},e),this.requestOptions)}async countTokens(e){const t=zo(e);return NA(this._apiSettings,this.model,t)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vR(r=fs(),e){return r=ee(r),En(r,Bu).getImmediate({identifier:rm})}function ER(r,e,t){if(!e.model)throw new le("no-model","Must provide a model name. Example: getGenerativeModel({ model: 'my-model-name' })");return new xA(r,e,t)}function OA(){gt(new rt(Bu,(r,{instanceIdentifier:e})=>{const t=r.getProvider("app").getImmediate(),n=r.getProvider("auth-internal"),s=r.getProvider("app-check-internal");return new mA(t,n,s,{location:e})},"PUBLIC").setMultipleInstances(!0)),qe(xh,Ea),qe(xh,Ea,"esm2017")}OA();export{IR as A,mR as B,_R as C,Re as D,yR as E,YA as F,QA as G,dR as H,pR as I,UA as J,cg as K,sR as L,KA as M,gR as N,de as T,zA as a,BA as b,FA as c,vR as d,ER as e,$E as f,TR as g,DE as h,e_ as i,lR as j,hR as k,GA as l,eR as m,rR as n,iR as o,oR as p,HA as q,uR as r,cR as s,ZA as t,nR as u,WA as v,fR as w,tR as x,JA as y,XA as z};
//# sourceMappingURL=firebase-Bi7PrE1-.js.map
