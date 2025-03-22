const ig=()=>{};var Uu={};/**
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
 */const zd={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const D=function(n,e){if(!n)throw ai(e)},ai=function(n){return new Error("Firebase Database ("+zd.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const Gd=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},sg=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],l=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},ol={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,l=o?n[s+1]:0,c=s+2<n.length,h=c?n[s+2]:0,f=r>>2,p=(r&3)<<4|l>>4;let m=(l&15)<<2|h>>6,A=h&63;c||(A=64,o||(m=64)),i.push(t[f],t[p],t[m],t[A])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Gd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):sg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],l=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||l==null||h==null||p==null)throw new rg;const m=r<<2|l>>4;if(i.push(m),h!==64){const A=l<<4&240|h>>2;if(i.push(A),p!==64){const S=h<<6&192|p;i.push(S)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class rg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Kd=function(n){const e=Gd(n);return ol.encodeByteArray(e,!0)},_r=function(n){return Kd(n).replace(/\./g,"")},mr=function(n){try{return ol.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function og(n){return Qd(void 0,n)}function Qd(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!ag(t)||(n[t]=Qd(n[t],e[t]));return n}function ag(n){return n!=="__proto__"}/**
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
 */function lg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const cg=()=>lg().__FIREBASE_DEFAULTS__,ug=()=>{if(typeof process>"u"||typeof Uu>"u")return;const n=Uu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},hg=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&mr(n[1]);return e&&JSON.parse(e)},Qr=()=>{try{return ig()||cg()||ug()||hg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Yd=n=>{var e,t;return(t=(e=Qr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Xd=n=>{const e=Yd(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Jd=()=>{var n;return(n=Qr())===null||n===void 0?void 0:n.config},Zd=n=>{var e;return(e=Qr())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class _s{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function ef(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[_r(JSON.stringify(t)),_r(JSON.stringify(o)),""].join(".")}/**
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
 */function xe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function al(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(xe())}function dg(){var n;const e=(n=Qr())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function fg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function pg(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function tf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _g(){const n=xe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function mg(){return zd.NODE_ADMIN===!0}function gg(){return!dg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function yg(){try{return typeof indexedDB=="object"}catch{return!1}}function vg(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const Eg="FirebaseError";class Rt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Eg,Object.setPrototypeOf(this,Rt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ms.prototype.create)}}class ms{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Tg(r,i):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Rt(s,l,i)}}function Tg(n,e){return n.replace(Ig,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Ig=/\{\$([^}]+)}/g;/**
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
 */function Ji(n){return JSON.parse(n)}function we(n){return JSON.stringify(n)}/**
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
 */const nf=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Ji(mr(r[0])||""),t=Ji(mr(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},wg=function(n){const e=nf(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Ag=function(n){const e=nf(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function ut(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Gn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function va(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function gr(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ht(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Bu(r)&&Bu(o)){if(!Ht(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Bu(n){return n!==null&&typeof n=="object"}/**
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
 */function li(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
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
 */class Cg{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)i[p]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let p=0;p<16;p++)i[p]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let p=16;p<80;p++){const m=i[p-3]^i[p-8]^i[p-14]^i[p-16];i[p]=(m<<1|m>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],l=this.chain_[3],c=this.chain_[4],h,f;for(let p=0;p<80;p++){p<40?p<20?(h=l^r&(o^l),f=1518500249):(h=r^o^l,f=1859775393):p<60?(h=r&o|l&(r|o),f=2400959708):(h=r^o^l,f=3395469782);const m=(s<<5|s>>>27)+h+c+f+i[p]&4294967295;c=l,l=o,o=(r<<30|r>>>2)&4294967295,r=s,s=m}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Rg(n,e){const t=new Sg(n,e);return t.subscribe.bind(t)}class Sg{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");bg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=ta),s.error===void 0&&(s.error=ta),s.complete===void 0&&(s.complete=ta);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function bg(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ta(){}function Yr(n,e){return`${n} failed: ${e} argument `}/**
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
 */const Pg=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,D(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Xr=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function he(n){return n&&n._delegate?n._delegate:n}class zt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const hn="[DEFAULT]";/**
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
 */class kg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new _s;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Dg(e))try{this.getOrInitializeService({instanceIdentifier:hn})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=hn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=hn){return this.instances.has(e)}getOptions(e=hn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(r);i===l&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Ng(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=hn){return this.component?this.component.multipleInstances?e:hn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Ng(n){return n===hn?void 0:n}function Dg(n){return n.instantiationMode==="EAGER"}/**
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
 */class Og{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new kg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var G;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(G||(G={}));const Vg={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},Mg=G.INFO,xg={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},Lg=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=xg[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Jr{constructor(e){this.name=e,this._logLevel=Mg,this._logHandler=Lg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Vg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}}const Fg=(n,e)=>e.some(t=>n instanceof t);let qu,Wu;function Ug(){return qu||(qu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bg(){return Wu||(Wu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const sf=new WeakMap,Ea=new WeakMap,rf=new WeakMap,na=new WeakMap,ll=new WeakMap;function qg(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Ft(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&sf.set(t,n)}).catch(()=>{}),ll.set(e,n),e}function Wg(n){if(Ea.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ea.set(n,e)}let Ta={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ea.get(n);if(e==="objectStoreNames")return n.objectStoreNames||rf.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ft(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jg(n){Ta=n(Ta)}function $g(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(ia(this),e,...t);return rf.set(i,e.sort?e.sort():[e]),Ft(i)}:Bg().includes(n)?function(...e){return n.apply(ia(this),e),Ft(sf.get(this))}:function(...e){return Ft(n.apply(ia(this),e))}}function Hg(n){return typeof n=="function"?$g(n):(n instanceof IDBTransaction&&Wg(n),Fg(n,Ug())?new Proxy(n,Ta):n)}function Ft(n){if(n instanceof IDBRequest)return qg(n);if(na.has(n))return na.get(n);const e=Hg(n);return e!==n&&(na.set(n,e),ll.set(e,n)),e}const ia=n=>ll.get(n);function zg(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),l=Ft(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Ft(o.result),c.oldVersion,c.newVersion,Ft(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const Gg=["get","getKey","getAll","getAllKeys","count"],Kg=["put","add","delete","clear"],sa=new Map;function ju(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(sa.get(e))return sa.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Kg.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Gg.includes(t)))return;const r=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return i&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),s&&c.done]))[0]};return sa.set(e,r),r}jg(n=>({...n,get:(e,t,i)=>ju(e,t)||n.get(e,t,i),has:(e,t)=>!!ju(e,t)||n.has(e,t)}));/**
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
 */class Qg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Yg(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Yg(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ia="@firebase/app",$u="0.11.3";/**
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
 */const Et=new Jr("@firebase/app"),Xg="@firebase/app-compat",Jg="@firebase/analytics-compat",Zg="@firebase/analytics",ey="@firebase/app-check-compat",ty="@firebase/app-check",ny="@firebase/auth",iy="@firebase/auth-compat",sy="@firebase/database",ry="@firebase/data-connect",oy="@firebase/database-compat",ay="@firebase/functions",ly="@firebase/functions-compat",cy="@firebase/installations",uy="@firebase/installations-compat",hy="@firebase/messaging",dy="@firebase/messaging-compat",fy="@firebase/performance",py="@firebase/performance-compat",_y="@firebase/remote-config",my="@firebase/remote-config-compat",gy="@firebase/storage",yy="@firebase/storage-compat",vy="@firebase/firestore",Ey="@firebase/vertexai",Ty="@firebase/firestore-compat",Iy="firebase",wy="11.5.0";/**
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
 */const wa="[DEFAULT]",Ay={[Ia]:"fire-core",[Xg]:"fire-core-compat",[Zg]:"fire-analytics",[Jg]:"fire-analytics-compat",[ty]:"fire-app-check",[ey]:"fire-app-check-compat",[ny]:"fire-auth",[iy]:"fire-auth-compat",[sy]:"fire-rtdb",[ry]:"fire-data-connect",[oy]:"fire-rtdb-compat",[ay]:"fire-fn",[ly]:"fire-fn-compat",[cy]:"fire-iid",[uy]:"fire-iid-compat",[hy]:"fire-fcm",[dy]:"fire-fcm-compat",[fy]:"fire-perf",[py]:"fire-perf-compat",[_y]:"fire-rc",[my]:"fire-rc-compat",[gy]:"fire-gcs",[yy]:"fire-gcs-compat",[vy]:"fire-fst",[Ty]:"fire-fst-compat",[Ey]:"fire-vertex","fire-js":"fire-js",[Iy]:"fire-js-all"};/**
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
 */const yr=new Map,Cy=new Map,Aa=new Map;function Hu(n,e){try{n.container.addComponent(e)}catch(t){Et.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function mn(n){const e=n.name;if(Aa.has(e))return Et.debug(`There were multiple attempts to register component ${e}.`),!1;Aa.set(e,n);for(const t of yr.values())Hu(t,n);for(const t of Cy.values())Hu(t,n);return!0}function Zr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ye(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Ry={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ut=new ms("app","Firebase",Ry);/**
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
 */class Sy{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new zt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ut.create("app-deleted",{appName:this._name})}}/**
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
 */const An=wy;function by(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:wa,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw Ut.create("bad-app-name",{appName:String(s)});if(t||(t=Jd()),!t)throw Ut.create("no-options");const r=yr.get(s);if(r){if(Ht(t,r.options)&&Ht(i,r.config))return r;throw Ut.create("duplicate-app",{appName:s})}const o=new Og(s);for(const c of Aa.values())o.addComponent(c);const l=new Sy(t,i,o);return yr.set(s,l),l}function cl(n=wa){const e=yr.get(n);if(!e&&n===wa&&Jd())return by();if(!e)throw Ut.create("no-app",{appName:n});return e}function st(n,e,t){var i;let s=(i=Ay[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const l=[`Unable to register library "${s}" with version "${e}":`];r&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Et.warn(l.join(" "));return}mn(new zt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Py="firebase-heartbeat-database",ky=1,Zi="firebase-heartbeat-store";let ra=null;function of(){return ra||(ra=zg(Py,ky,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Zi)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ut.create("idb-open",{originalErrorMessage:n.message})})),ra}async function Ny(n){try{const t=(await of()).transaction(Zi),i=await t.objectStore(Zi).get(af(n));return await t.done,i}catch(e){if(e instanceof Rt)Et.warn(e.message);else{const t=Ut.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Et.warn(t.message)}}}async function zu(n,e){try{const i=(await of()).transaction(Zi,"readwrite");await i.objectStore(Zi).put(e,af(n)),await i.done}catch(t){if(t instanceof Rt)Et.warn(t.message);else{const i=Ut.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Et.warn(i.message)}}}function af(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Dy=1024,Oy=30;class Vy{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new xy(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Gu();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats.length>Oy){const o=Ly(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Et.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Gu(),{heartbeatsToSend:i,unsentEntries:s}=My(this._heartbeatsCache.heartbeats),r=_r(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return Et.warn(t),""}}}function Gu(){return new Date().toISOString().substring(0,10)}function My(n,e=Dy){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Ku(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ku(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class xy{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return yg()?vg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ny(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return zu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return zu(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ku(n){return _r(JSON.stringify({version:2,heartbeats:n})).length}function Ly(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Fy(n){mn(new zt("platform-logger",e=>new Qg(e),"PRIVATE")),mn(new zt("heartbeat",e=>new Vy(e),"PRIVATE")),st(Ia,$u,n),st(Ia,$u,"esm2017"),st("fire-js","")}Fy("");var Uy="firebase",By="11.5.0";/**
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
 */st(Uy,By,"app");function ul(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function lf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const qy=lf,cf=new ms("auth","Firebase",lf());/**
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
 */const vr=new Jr("@firebase/auth");function Wy(n,...e){vr.logLevel<=G.WARN&&vr.warn(`Auth (${An}): ${n}`,...e)}function sr(n,...e){vr.logLevel<=G.ERROR&&vr.error(`Auth (${An}): ${n}`,...e)}/**
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
 */function Tt(n,...e){throw hl(n,...e)}function rt(n,...e){return hl(n,...e)}function uf(n,e,t){const i=Object.assign(Object.assign({},qy()),{[e]:t});return new ms("auth","Firebase",i).create(e,{appName:n.name})}function _n(n){return uf(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function hl(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return cf.create(n,...e)}function U(n,e,...t){if(!n)throw hl(e,...t)}function _t(n){const e="INTERNAL ASSERTION FAILED: "+n;throw sr(e),new Error(e)}function It(n,e){n||_t(e)}/**
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
 */function Ca(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function jy(){return Qu()==="http:"||Qu()==="https:"}function Qu(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function $y(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(jy()||pg()||"connection"in navigator)?navigator.onLine:!0}function Hy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class gs{constructor(e,t){this.shortDelay=e,this.longDelay=t,It(t>e,"Short delay should be less than long delay!"),this.isMobile=al()||tf()}get(){return $y()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function dl(n,e){It(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class hf{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;_t("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;_t("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;_t("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const zy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Gy=new gs(3e4,6e4);function fl(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function ci(n,e,t,i,s={}){return df(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const l=li(Object.assign({key:n.config.apiKey},o)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:c},r);return fg()||(h.referrerPolicy="no-referrer"),hf.fetch()(ff(n,n.config.apiHost,t,l),h)})}async function df(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},zy),e);try{const s=new Qy(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Qs(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const l=r.ok?o.errorMessage:o.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Qs(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Qs(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Qs(n,"user-disabled",o);const f=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw uf(n,f,h);Tt(n,f)}}catch(s){if(s instanceof Rt)throw s;Tt(n,"network-request-failed",{message:String(s)})}}async function Ky(n,e,t,i,s={}){const r=await ci(n,e,t,i,s);return"mfaPendingCredential"in r&&Tt(n,"multi-factor-auth-required",{_serverResponse:r}),r}function ff(n,e,t,i){const s=`${e}${t}?${i}`;return n.config.emulator?dl(n.config,s):`${n.config.apiScheme}://${s}`}class Qy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(rt(this.auth,"network-request-failed")),Gy.get())})}}function Qs(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=rt(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */async function Yy(n,e){return ci(n,"POST","/v1/accounts:delete",e)}async function pf(n,e){return ci(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Wi(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Xy(n,e=!1){const t=he(n),i=await t.getIdToken(e),s=pl(i);U(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:Wi(oa(s.auth_time)),issuedAtTime:Wi(oa(s.iat)),expirationTime:Wi(oa(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function oa(n){return Number(n)*1e3}function pl(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return sr("JWT malformed, contained fewer than 3 sections"),null;try{const s=mr(t);return s?JSON.parse(s):(sr("Failed to decode base64 JWT payload"),null)}catch(s){return sr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Yu(n){const e=pl(n);return U(e,"internal-error"),U(typeof e.exp<"u","internal-error"),U(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function es(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Rt&&Jy(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Jy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Zy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Ra{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Wi(this.lastLoginAt),this.creationTime=Wi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Er(n){var e;const t=n.auth,i=await n.getIdToken(),s=await es(n,pf(t,{idToken:i}));U(s==null?void 0:s.users.length,t,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?_f(r.providerUserInfo):[],l=tv(n.providerData,o),c=n.isAnonymous,h=!(n.email&&r.passwordHash)&&!(l!=null&&l.length),f=c?h:!1,p={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:l,metadata:new Ra(r.createdAt,r.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function ev(n){const e=he(n);await Er(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function tv(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function _f(n){return n.map(e=>{var{providerId:t}=e,i=ul(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function nv(n,e){const t=await df(n,{},async()=>{const i=li({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=ff(n,s,"/v1/token",`key=${r}`),l=await n._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",hf.fetch()(o,{method:"POST",headers:l,body:i})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function iv(n,e){return ci(n,"POST","/v2/accounts:revokeToken",fl(n,e))}/**
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
 */class Bn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){U(e.idToken,"internal-error"),U(typeof e.idToken<"u","internal-error"),U(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Yu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){U(e.length!==0,"internal-error");const t=Yu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(U(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await nv(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Bn;return i&&(U(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(U(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(U(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Bn,this.toJSON())}_performRefresh(){return _t("not implemented")}}/**
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
 */function Nt(n,e){U(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class mt{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,r=ul(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Zy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new Ra(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await es(this,this.stsTokenManager.getToken(this.auth,e));return U(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Xy(this,e)}reload(){return ev(this)}_assign(e){this!==e&&(U(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new mt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){U(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Er(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ye(this.auth.app))return Promise.reject(_n(this.auth));const e=await this.getIdToken();return await es(this,Yy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,r,o,l,c,h,f;const p=(i=t.displayName)!==null&&i!==void 0?i:void 0,m=(s=t.email)!==null&&s!==void 0?s:void 0,A=(r=t.phoneNumber)!==null&&r!==void 0?r:void 0,S=(o=t.photoURL)!==null&&o!==void 0?o:void 0,N=(l=t.tenantId)!==null&&l!==void 0?l:void 0,k=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,j=(h=t.createdAt)!==null&&h!==void 0?h:void 0,z=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:Q,emailVerified:ae,isAnonymous:Ge,providerData:de,stsTokenManager:T}=t;U(Q&&T,e,"internal-error");const g=Bn.fromJSON(this.name,T);U(typeof Q=="string",e,"internal-error"),Nt(p,e.name),Nt(m,e.name),U(typeof ae=="boolean",e,"internal-error"),U(typeof Ge=="boolean",e,"internal-error"),Nt(A,e.name),Nt(S,e.name),Nt(N,e.name),Nt(k,e.name),Nt(j,e.name),Nt(z,e.name);const v=new mt({uid:Q,auth:e,email:m,emailVerified:ae,displayName:p,isAnonymous:Ge,photoURL:S,phoneNumber:A,tenantId:N,stsTokenManager:g,createdAt:j,lastLoginAt:z});return de&&Array.isArray(de)&&(v.providerData=de.map(E=>Object.assign({},E))),k&&(v._redirectEventId=k),v}static async _fromIdTokenResponse(e,t,i=!1){const s=new Bn;s.updateFromServerResponse(t);const r=new mt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Er(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];U(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?_f(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),l=new Bn;l.updateFromIdToken(i);const c=new mt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Ra(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(c,h),c}}/**
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
 */const Xu=new Map;function gt(n){It(n instanceof Function,"Expected a class definition");let e=Xu.get(n);return e?(It(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Xu.set(n,e),e)}/**
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
 */class mf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}mf.type="NONE";const Ju=mf;/**
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
 */function rr(n,e,t){return`firebase:${n}:${e}:${t}`}class qn{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=rr(this.userKey,s.apiKey,r),this.fullPersistenceKey=rr("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?mt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new qn(gt(Ju),e,i);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let r=s[0]||gt(Ju);const o=rr(i,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(o);if(f){const p=mt._fromJSON(e,f);h!==r&&(l=p),r=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new qn(r,e,i):(r=c[0],l&&await r._set(o,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==r)try{await h._remove(o)}catch{}})),new qn(r,e,i))}}/**
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
 */function Zu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ef(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(gf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(If(e))return"Blackberry";if(wf(e))return"Webos";if(yf(e))return"Safari";if((e.includes("chrome/")||vf(e))&&!e.includes("edge/"))return"Chrome";if(Tf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function gf(n=xe()){return/firefox\//i.test(n)}function yf(n=xe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function vf(n=xe()){return/crios\//i.test(n)}function Ef(n=xe()){return/iemobile/i.test(n)}function Tf(n=xe()){return/android/i.test(n)}function If(n=xe()){return/blackberry/i.test(n)}function wf(n=xe()){return/webos/i.test(n)}function _l(n=xe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function sv(n=xe()){var e;return _l(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function rv(){return _g()&&document.documentMode===10}function Af(n=xe()){return _l(n)||Tf(n)||wf(n)||If(n)||/windows phone/i.test(n)||Ef(n)}/**
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
 */function Cf(n,e=[]){let t;switch(n){case"Browser":t=Zu(xe());break;case"Worker":t=`${Zu(xe())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${An}/${i}`}/**
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
 */class ov{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,l)=>{try{const c=e(r);o(c)}catch(c){l(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
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
 */async function av(n,e={}){return ci(n,"GET","/v2/passwordPolicy",fl(n,e))}/**
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
 */const lv=6;class cv{constructor(e){var t,i,s,r;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:lv,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(r=e.forceUpgradeOnSignin)!==null&&r!==void 0?r:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,r,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(i=c.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(r=c.containsUppercaseLetter)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class uv{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new eh(this),this.idTokenSubscription=new eh(this),this.beforeStateQueue=new ov(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=cf,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=gt(t)),this._initializationPromise=this.queue(async()=>{var i,s;if(!this._deleted&&(this.persistenceManager=await qn.create(this,e),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await pf(this,{idToken:e}),i=await mt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ye(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return U(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Er(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Hy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ye(this.app))return Promise.reject(_n(this));const t=e?he(e):null;return t&&U(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&U(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ye(this.app)?Promise.reject(_n(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ye(this.app)?Promise.reject(_n(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(gt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await av(this),t=new cv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ms("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await iv(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&gt(e)||this._popupRedirectResolver;U(t,this,"argument-error"),this.redirectPersistenceManager=await qn.create(this,[gt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(U(l,this,"internal-error"),l.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return U(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Cf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(Ye(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Wy(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function ml(n){return he(n)}class eh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Rg(t=>this.observer=t)}get next(){return U(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let gl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function hv(n){gl=n}function dv(n){return gl.loadJS(n)}function fv(){return gl.gapiScript}function pv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function _v(n,e){const t=Zr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Ht(r,e??{}))return s;Tt(s,"already-initialized")}return t.initialize({options:e})}function mv(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(gt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function gv(n,e,t){const i=ml(n);U(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Rf(e),{host:o,port:l}=yv(e),c=l===null?"":`:${l}`,h={url:`${r}//${o}${c}/`},f=Object.freeze({host:o,port:l,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){U(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),U(Ht(h,i.config.emulator)&&Ht(f,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=h,i.emulatorConfig=f,i.settings.appVerificationDisabledForTesting=!0,vv()}function Rf(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function yv(n){const e=Rf(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:th(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:th(o)}}}function th(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function vv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Sf{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return _t("not implemented")}_getIdTokenResponse(e){return _t("not implemented")}_linkToIdToken(e,t){return _t("not implemented")}_getReauthenticationResolver(e){return _t("not implemented")}}/**
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
 */async function Wn(n,e){return Ky(n,"POST","/v1/accounts:signInWithIdp",fl(n,e))}/**
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
 */const Ev="http://localhost";class gn extends Sf{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new gn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Tt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,r=ul(t,["providerId","signInMethod"]);if(!i||!s)return null;const o=new gn(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Wn(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Wn(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Wn(e,t)}buildRequest(){const e={requestUri:Ev,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=li(t)}return e}}/**
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
 */class bf{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ys extends bf{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Dt extends ys{constructor(){super("facebook.com")}static credential(e){return gn._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Dt.credentialFromTaggedObject(e)}static credentialFromError(e){return Dt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Dt.credential(e.oauthAccessToken)}catch{return null}}}Dt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Dt.PROVIDER_ID="facebook.com";/**
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
 */class Ot extends ys{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return gn._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ot.credentialFromTaggedObject(e)}static credentialFromError(e){return Ot.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Ot.credential(t,i)}catch{return null}}}Ot.GOOGLE_SIGN_IN_METHOD="google.com";Ot.PROVIDER_ID="google.com";/**
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
 */class Vt extends ys{constructor(){super("github.com")}static credential(e){return gn._fromParams({providerId:Vt.PROVIDER_ID,signInMethod:Vt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Vt.credentialFromTaggedObject(e)}static credentialFromError(e){return Vt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Vt.credential(e.oauthAccessToken)}catch{return null}}}Vt.GITHUB_SIGN_IN_METHOD="github.com";Vt.PROVIDER_ID="github.com";/**
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
 */class Mt extends ys{constructor(){super("twitter.com")}static credential(e,t){return gn._fromParams({providerId:Mt.PROVIDER_ID,signInMethod:Mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Mt.credentialFromTaggedObject(e)}static credentialFromError(e){return Mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Mt.credential(t,i)}catch{return null}}}Mt.TWITTER_SIGN_IN_METHOD="twitter.com";Mt.PROVIDER_ID="twitter.com";/**
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
 */class Kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await mt._fromIdTokenResponse(e,i,s),o=nh(i);return new Kn({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=nh(i);return new Kn({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function nh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Tr extends Rt{constructor(e,t,i,s){var r;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Tr.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Tr(e,t,i,s)}}function Pf(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Tr._fromErrorAndOperation(n,r,e,i):r})}async function Tv(n,e,t=!1){const i=await es(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Kn._forOperation(n,"link",i)}/**
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
 */async function Iv(n,e,t=!1){const{auth:i}=n;if(Ye(i.app))return Promise.reject(_n(i));const s="reauthenticate";try{const r=await es(n,Pf(i,s,e,n),t);U(r.idToken,i,"internal-error");const o=pl(r.idToken);U(o,i,"internal-error");const{sub:l}=o;return U(n.uid===l,i,"user-mismatch"),Kn._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&Tt(i,"user-mismatch"),r}}/**
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
 */async function wv(n,e,t=!1){if(Ye(n.app))return Promise.reject(_n(n));const i="signIn",s=await Pf(n,i,e),r=await Kn._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function Av(n,e,t,i){return he(n).onIdTokenChanged(e,t,i)}function Cv(n,e,t){return he(n).beforeAuthStateChanged(e,t)}function dS(n,e,t,i){return he(n).onAuthStateChanged(e,t,i)}const Ir="__sak";/**
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
 */class kf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ir,"1"),this.storage.removeItem(Ir),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Rv=1e3,Sv=10;class Nf extends kf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Af(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);rv()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Sv):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Rv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Nf.type="LOCAL";const bv=Nf;/**
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
 */class Df extends kf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Df.type="SESSION";const Of=Df;/**
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
 */function Pv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class eo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new eo(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const l=Array.from(o).map(async h=>h(t.origin,r)),c=await Pv(l);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}eo.receivers=[];/**
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
 */function yl(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class kv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((l,c)=>{const h=yl("",20);s.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),l(m.data.response);break;default:clearTimeout(f),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function ot(){return window}function Nv(n){ot().location.href=n}/**
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
 */function Vf(){return typeof ot().WorkerGlobalScope<"u"&&typeof ot().importScripts=="function"}async function Dv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Ov(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Vv(){return Vf()?self:null}/**
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
 */const Mf="firebaseLocalStorageDb",Mv=1,wr="firebaseLocalStorage",xf="fbase_key";class vs{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function to(n,e){return n.transaction([wr],e?"readwrite":"readonly").objectStore(wr)}function xv(){const n=indexedDB.deleteDatabase(Mf);return new vs(n).toPromise()}function Sa(){const n=indexedDB.open(Mf,Mv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(wr,{keyPath:xf})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(wr)?e(i):(i.close(),await xv(),e(await Sa()))})})}async function ih(n,e,t){const i=to(n,!0).put({[xf]:e,value:t});return new vs(i).toPromise()}async function Lv(n,e){const t=to(n,!1).get(e),i=await new vs(t).toPromise();return i===void 0?null:i.value}function sh(n,e){const t=to(n,!0).delete(e);return new vs(t).toPromise()}const Fv=800,Uv=3;class Lf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Sa(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Uv)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Vf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=eo._getInstance(Vv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Dv(),!this.activeServiceWorker)return;this.sender=new kv(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Ov()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Sa();return await ih(e,Ir,"1"),await sh(e,Ir),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>ih(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>Lv(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>sh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=to(s,!1).getAll();return new vs(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Fv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Lf.type="LOCAL";const Bv=Lf;new gs(3e4,6e4);/**
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
 */function qv(n,e){return e?gt(e):(U(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class vl extends Sf{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Wn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Wn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Wn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Wv(n){return wv(n.auth,new vl(n),n.bypassAuthState)}function jv(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),Iv(t,new vl(n),n.bypassAuthState)}async function $v(n){const{auth:e,user:t}=n;return U(t,e,"internal-error"),Tv(t,new vl(n),n.bypassAuthState)}/**
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
 */class Ff{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Wv;case"linkViaPopup":case"linkViaRedirect":return $v;case"reauthViaPopup":case"reauthViaRedirect":return jv;default:Tt(this.auth,"internal-error")}}resolve(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){It(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Hv=new gs(2e3,1e4);class Fn extends Ff{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Fn.currentPopupAction&&Fn.currentPopupAction.cancel(),Fn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return U(e,this.auth,"internal-error"),e}async onExecution(){It(this.filter.length===1,"Popup operations only handle one event");const e=yl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Fn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Hv.get())};e()}}Fn.currentPopupAction=null;/**
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
 */const zv="pendingRedirect",or=new Map;class Gv extends Ff{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=or.get(this.auth._key());if(!e){try{const i=await Kv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}or.set(this.auth._key(),e)}return this.bypassAuthState||or.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Kv(n,e){const t=Xv(e),i=Yv(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function Qv(n,e){or.set(n._key(),e)}function Yv(n){return gt(n._redirectPersistence)}function Xv(n){return rr(zv,n.config.apiKey,n.name)}async function Jv(n,e,t=!1){if(Ye(n.app))return Promise.reject(_n(n));const i=ml(n),s=qv(i,e),o=await new Gv(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const Zv=10*60*1e3;class eE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!tE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Uf(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(rt(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Zv&&this.cachedEventUids.clear(),this.cachedEventUids.has(rh(e))}saveEventToCache(e){this.cachedEventUids.add(rh(e)),this.lastProcessedEventTime=Date.now()}}function rh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Uf({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function tE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Uf(n);default:return!1}}/**
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
 */async function nE(n,e={}){return ci(n,"GET","/v1/projects",e)}/**
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
 */const iE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,sE=/^https?/;async function rE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await nE(n);for(const t of e)try{if(oE(t))return}catch{}Tt(n,"unauthorized-domain")}function oE(n){const e=Ca(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!sE.test(t))return!1;if(iE.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const aE=new gs(3e4,6e4);function oh(){const n=ot().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function lE(n){return new Promise((e,t)=>{var i,s,r;function o(){oh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{oh(),t(rt(n,"network-request-failed"))},timeout:aE.get()})}if(!((s=(i=ot().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=ot().gapi)===null||r===void 0)&&r.load)o();else{const l=pv("iframefcb");return ot()[l]=()=>{gapi.load?o():t(rt(n,"network-request-failed"))},dv(`${fv()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw ar=null,e})}let ar=null;function cE(n){return ar=ar||lE(n),ar}/**
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
 */const uE=new gs(5e3,15e3),hE="__/auth/iframe",dE="emulator/auth/iframe",fE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},pE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function _E(n){const e=n.config;U(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?dl(e,dE):`https://${n.config.authDomain}/${hE}`,i={apiKey:e.apiKey,appName:n.name,v:An},s=pE.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${li(i).slice(1)}`}async function mE(n){const e=await cE(n),t=ot().gapi;return U(t,n,"internal-error"),e.open({where:document.body,url:_E(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:fE,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=rt(n,"network-request-failed"),l=ot().setTimeout(()=>{r(o)},uE.get());function c(){ot().clearTimeout(l),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const gE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},yE=500,vE=600,EE="_blank",TE="http://localhost";class ah{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function IE(n,e,t,i=yE,s=vE){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let l="";const c=Object.assign(Object.assign({},gE),{width:i.toString(),height:s.toString(),top:r,left:o}),h=xe().toLowerCase();t&&(l=vf(h)?EE:t),gf(h)&&(e=e||TE,c.scrollbars="yes");const f=Object.entries(c).reduce((m,[A,S])=>`${m}${A}=${S},`,"");if(sv(h)&&l!=="_self")return wE(e||"",l),new ah(null);const p=window.open(e||"",l,f);U(p,n,"popup-blocked");try{p.focus()}catch{}return new ah(p)}function wE(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const AE="__/auth/handler",CE="emulator/auth/handler",RE=encodeURIComponent("fac");async function lh(n,e,t,i,s,r){U(n.config.authDomain,n,"auth-domain-config-required"),U(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:An,eventId:s};if(e instanceof bf){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",va(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof ys){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const c=await n._getAppCheckToken(),h=c?`#${RE}=${encodeURIComponent(c)}`:"";return`${SE(n)}?${li(l).slice(1)}${h}`}function SE({config:n}){return n.emulator?dl(n,CE):`https://${n.authDomain}/${AE}`}/**
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
 */const aa="webStorageSupport";class bE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Of,this._completeRedirectFn=Jv,this._overrideRedirectResult=Qv}async _openPopup(e,t,i,s){var r;It((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=await lh(e,t,i,Ca(),s);return IE(e,o,yl())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await lh(e,t,i,Ca(),s);return Nv(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(It(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await mE(e),i=new eE(e);return t.register("authEvent",s=>(U(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(aa,{type:aa},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[aa];o!==void 0&&t(!!o),Tt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=rE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Af()||yf()||_l()}}const PE=bE;var ch="@firebase/auth",uh="1.9.1";/**
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
 */class kE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){U(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function NE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function DE(n){mn(new zt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=i.options;U(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Cf(n)},h=new uv(i,s,r,c);return mv(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),mn(new zt("auth-internal",e=>{const t=ml(e.getProvider("auth").getImmediate());return(i=>new kE(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),st(ch,uh,NE(n)),st(ch,uh,"esm2017")}/**
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
 */const OE=5*60,VE=Zd("authIdTokenMaxAge")||OE;let hh=null;const ME=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>VE)return;const s=t==null?void 0:t.token;hh!==s&&(hh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function fS(n=cl()){const e=Zr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=_v(n,{popupRedirectResolver:PE,persistence:[Bv,bv,Of]}),i=Zd("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=ME(r.toString());Cv(t,o,()=>o(t.currentUser)),Av(t,l=>o(l))}}const s=Yd("auth");return s&&gv(t,`http://${s}`),t}function xE(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}hv({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=rt("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",xE().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});DE("Browser");var dh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Bt,Bf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,g){function v(){}v.prototype=g.prototype,T.D=g.prototype,T.prototype=new v,T.prototype.constructor=T,T.C=function(E,I,C){for(var y=Array(arguments.length-2),ht=2;ht<arguments.length;ht++)y[ht-2]=arguments[ht];return g.prototype[I].apply(E,y)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,g,v){v||(v=0);var E=Array(16);if(typeof g=="string")for(var I=0;16>I;++I)E[I]=g.charCodeAt(v++)|g.charCodeAt(v++)<<8|g.charCodeAt(v++)<<16|g.charCodeAt(v++)<<24;else for(I=0;16>I;++I)E[I]=g[v++]|g[v++]<<8|g[v++]<<16|g[v++]<<24;g=T.g[0],v=T.g[1],I=T.g[2];var C=T.g[3],y=g+(C^v&(I^C))+E[0]+3614090360&4294967295;g=v+(y<<7&4294967295|y>>>25),y=C+(I^g&(v^I))+E[1]+3905402710&4294967295,C=g+(y<<12&4294967295|y>>>20),y=I+(v^C&(g^v))+E[2]+606105819&4294967295,I=C+(y<<17&4294967295|y>>>15),y=v+(g^I&(C^g))+E[3]+3250441966&4294967295,v=I+(y<<22&4294967295|y>>>10),y=g+(C^v&(I^C))+E[4]+4118548399&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(I^g&(v^I))+E[5]+1200080426&4294967295,C=g+(y<<12&4294967295|y>>>20),y=I+(v^C&(g^v))+E[6]+2821735955&4294967295,I=C+(y<<17&4294967295|y>>>15),y=v+(g^I&(C^g))+E[7]+4249261313&4294967295,v=I+(y<<22&4294967295|y>>>10),y=g+(C^v&(I^C))+E[8]+1770035416&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(I^g&(v^I))+E[9]+2336552879&4294967295,C=g+(y<<12&4294967295|y>>>20),y=I+(v^C&(g^v))+E[10]+4294925233&4294967295,I=C+(y<<17&4294967295|y>>>15),y=v+(g^I&(C^g))+E[11]+2304563134&4294967295,v=I+(y<<22&4294967295|y>>>10),y=g+(C^v&(I^C))+E[12]+1804603682&4294967295,g=v+(y<<7&4294967295|y>>>25),y=C+(I^g&(v^I))+E[13]+4254626195&4294967295,C=g+(y<<12&4294967295|y>>>20),y=I+(v^C&(g^v))+E[14]+2792965006&4294967295,I=C+(y<<17&4294967295|y>>>15),y=v+(g^I&(C^g))+E[15]+1236535329&4294967295,v=I+(y<<22&4294967295|y>>>10),y=g+(I^C&(v^I))+E[1]+4129170786&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^I&(g^v))+E[6]+3225465664&4294967295,C=g+(y<<9&4294967295|y>>>23),y=I+(g^v&(C^g))+E[11]+643717713&4294967295,I=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(I^C))+E[0]+3921069994&4294967295,v=I+(y<<20&4294967295|y>>>12),y=g+(I^C&(v^I))+E[5]+3593408605&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^I&(g^v))+E[10]+38016083&4294967295,C=g+(y<<9&4294967295|y>>>23),y=I+(g^v&(C^g))+E[15]+3634488961&4294967295,I=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(I^C))+E[4]+3889429448&4294967295,v=I+(y<<20&4294967295|y>>>12),y=g+(I^C&(v^I))+E[9]+568446438&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^I&(g^v))+E[14]+3275163606&4294967295,C=g+(y<<9&4294967295|y>>>23),y=I+(g^v&(C^g))+E[3]+4107603335&4294967295,I=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(I^C))+E[8]+1163531501&4294967295,v=I+(y<<20&4294967295|y>>>12),y=g+(I^C&(v^I))+E[13]+2850285829&4294967295,g=v+(y<<5&4294967295|y>>>27),y=C+(v^I&(g^v))+E[2]+4243563512&4294967295,C=g+(y<<9&4294967295|y>>>23),y=I+(g^v&(C^g))+E[7]+1735328473&4294967295,I=C+(y<<14&4294967295|y>>>18),y=v+(C^g&(I^C))+E[12]+2368359562&4294967295,v=I+(y<<20&4294967295|y>>>12),y=g+(v^I^C)+E[5]+4294588738&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^I)+E[8]+2272392833&4294967295,C=g+(y<<11&4294967295|y>>>21),y=I+(C^g^v)+E[11]+1839030562&4294967295,I=C+(y<<16&4294967295|y>>>16),y=v+(I^C^g)+E[14]+4259657740&4294967295,v=I+(y<<23&4294967295|y>>>9),y=g+(v^I^C)+E[1]+2763975236&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^I)+E[4]+1272893353&4294967295,C=g+(y<<11&4294967295|y>>>21),y=I+(C^g^v)+E[7]+4139469664&4294967295,I=C+(y<<16&4294967295|y>>>16),y=v+(I^C^g)+E[10]+3200236656&4294967295,v=I+(y<<23&4294967295|y>>>9),y=g+(v^I^C)+E[13]+681279174&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^I)+E[0]+3936430074&4294967295,C=g+(y<<11&4294967295|y>>>21),y=I+(C^g^v)+E[3]+3572445317&4294967295,I=C+(y<<16&4294967295|y>>>16),y=v+(I^C^g)+E[6]+76029189&4294967295,v=I+(y<<23&4294967295|y>>>9),y=g+(v^I^C)+E[9]+3654602809&4294967295,g=v+(y<<4&4294967295|y>>>28),y=C+(g^v^I)+E[12]+3873151461&4294967295,C=g+(y<<11&4294967295|y>>>21),y=I+(C^g^v)+E[15]+530742520&4294967295,I=C+(y<<16&4294967295|y>>>16),y=v+(I^C^g)+E[2]+3299628645&4294967295,v=I+(y<<23&4294967295|y>>>9),y=g+(I^(v|~C))+E[0]+4096336452&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~I))+E[7]+1126891415&4294967295,C=g+(y<<10&4294967295|y>>>22),y=I+(g^(C|~v))+E[14]+2878612391&4294967295,I=C+(y<<15&4294967295|y>>>17),y=v+(C^(I|~g))+E[5]+4237533241&4294967295,v=I+(y<<21&4294967295|y>>>11),y=g+(I^(v|~C))+E[12]+1700485571&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~I))+E[3]+2399980690&4294967295,C=g+(y<<10&4294967295|y>>>22),y=I+(g^(C|~v))+E[10]+4293915773&4294967295,I=C+(y<<15&4294967295|y>>>17),y=v+(C^(I|~g))+E[1]+2240044497&4294967295,v=I+(y<<21&4294967295|y>>>11),y=g+(I^(v|~C))+E[8]+1873313359&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~I))+E[15]+4264355552&4294967295,C=g+(y<<10&4294967295|y>>>22),y=I+(g^(C|~v))+E[6]+2734768916&4294967295,I=C+(y<<15&4294967295|y>>>17),y=v+(C^(I|~g))+E[13]+1309151649&4294967295,v=I+(y<<21&4294967295|y>>>11),y=g+(I^(v|~C))+E[4]+4149444226&4294967295,g=v+(y<<6&4294967295|y>>>26),y=C+(v^(g|~I))+E[11]+3174756917&4294967295,C=g+(y<<10&4294967295|y>>>22),y=I+(g^(C|~v))+E[2]+718787259&4294967295,I=C+(y<<15&4294967295|y>>>17),y=v+(C^(I|~g))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+g&4294967295,T.g[1]=T.g[1]+(I+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+I&4294967295,T.g[3]=T.g[3]+C&4294967295}i.prototype.u=function(T,g){g===void 0&&(g=T.length);for(var v=g-this.blockSize,E=this.B,I=this.h,C=0;C<g;){if(I==0)for(;C<=v;)s(this,T,C),C+=this.blockSize;if(typeof T=="string"){for(;C<g;)if(E[I++]=T.charCodeAt(C++),I==this.blockSize){s(this,E),I=0;break}}else for(;C<g;)if(E[I++]=T[C++],I==this.blockSize){s(this,E),I=0;break}}this.h=I,this.o+=g},i.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var g=1;g<T.length-8;++g)T[g]=0;var v=8*this.o;for(g=T.length-8;g<T.length;++g)T[g]=v&255,v/=256;for(this.u(T),T=Array(16),g=v=0;4>g;++g)for(var E=0;32>E;E+=8)T[v++]=this.g[g]>>>E&255;return T};function r(T,g){var v=l;return Object.prototype.hasOwnProperty.call(v,T)?v[T]:v[T]=g(T)}function o(T,g){this.h=g;for(var v=[],E=!0,I=T.length-1;0<=I;I--){var C=T[I]|0;E&&C==g||(v[I]=C,E=!1)}this.g=v}var l={};function c(T){return-128<=T&&128>T?r(T,function(g){return new o([g|0],0>g?-1:0)}):new o([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return p;if(0>T)return k(h(-T));for(var g=[],v=1,E=0;T>=v;E++)g[E]=T/v|0,v*=4294967296;return new o(g,0)}function f(T,g){if(T.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(T.charAt(0)=="-")return k(f(T.substring(1),g));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(g,8)),E=p,I=0;I<T.length;I+=8){var C=Math.min(8,T.length-I),y=parseInt(T.substring(I,I+C),g);8>C?(C=h(Math.pow(g,C)),E=E.j(C).add(h(y))):(E=E.j(v),E=E.add(h(y)))}return E}var p=c(0),m=c(1),A=c(16777216);n=o.prototype,n.m=function(){if(N(this))return-k(this).m();for(var T=0,g=1,v=0;v<this.g.length;v++){var E=this.i(v);T+=(0<=E?E:4294967296+E)*g,g*=4294967296}return T},n.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(S(this))return"0";if(N(this))return"-"+k(this).toString(T);for(var g=h(Math.pow(T,6)),v=this,E="";;){var I=ae(v,g).g;v=j(v,I.j(g));var C=((0<v.g.length?v.g[0]:v.h)>>>0).toString(T);if(v=I,S(v))return C+E;for(;6>C.length;)C="0"+C;E=C+E}},n.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function S(T){if(T.h!=0)return!1;for(var g=0;g<T.g.length;g++)if(T.g[g]!=0)return!1;return!0}function N(T){return T.h==-1}n.l=function(T){return T=j(this,T),N(T)?-1:S(T)?0:1};function k(T){for(var g=T.g.length,v=[],E=0;E<g;E++)v[E]=~T.g[E];return new o(v,~T.h).add(m)}n.abs=function(){return N(this)?k(this):this},n.add=function(T){for(var g=Math.max(this.g.length,T.g.length),v=[],E=0,I=0;I<=g;I++){var C=E+(this.i(I)&65535)+(T.i(I)&65535),y=(C>>>16)+(this.i(I)>>>16)+(T.i(I)>>>16);E=y>>>16,C&=65535,y&=65535,v[I]=y<<16|C}return new o(v,v[v.length-1]&-2147483648?-1:0)};function j(T,g){return T.add(k(g))}n.j=function(T){if(S(this)||S(T))return p;if(N(this))return N(T)?k(this).j(k(T)):k(k(this).j(T));if(N(T))return k(this.j(k(T)));if(0>this.l(A)&&0>T.l(A))return h(this.m()*T.m());for(var g=this.g.length+T.g.length,v=[],E=0;E<2*g;E++)v[E]=0;for(E=0;E<this.g.length;E++)for(var I=0;I<T.g.length;I++){var C=this.i(E)>>>16,y=this.i(E)&65535,ht=T.i(I)>>>16,yi=T.i(I)&65535;v[2*E+2*I]+=y*yi,z(v,2*E+2*I),v[2*E+2*I+1]+=C*yi,z(v,2*E+2*I+1),v[2*E+2*I+1]+=y*ht,z(v,2*E+2*I+1),v[2*E+2*I+2]+=C*ht,z(v,2*E+2*I+2)}for(E=0;E<g;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=g;E<2*g;E++)v[E]=0;return new o(v,0)};function z(T,g){for(;(T[g]&65535)!=T[g];)T[g+1]+=T[g]>>>16,T[g]&=65535,g++}function Q(T,g){this.g=T,this.h=g}function ae(T,g){if(S(g))throw Error("division by zero");if(S(T))return new Q(p,p);if(N(T))return g=ae(k(T),g),new Q(k(g.g),k(g.h));if(N(g))return g=ae(T,k(g)),new Q(k(g.g),g.h);if(30<T.g.length){if(N(T)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var v=m,E=g;0>=E.l(T);)v=Ge(v),E=Ge(E);var I=de(v,1),C=de(E,1);for(E=de(E,2),v=de(v,2);!S(E);){var y=C.add(E);0>=y.l(T)&&(I=I.add(v),C=y),E=de(E,1),v=de(v,1)}return g=j(T,I.j(g)),new Q(I,g)}for(I=p;0<=T.l(g);){for(v=Math.max(1,Math.floor(T.m()/g.m())),E=Math.ceil(Math.log(v)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),C=h(v),y=C.j(g);N(y)||0<y.l(T);)v-=E,C=h(v),y=C.j(g);S(C)&&(C=m),I=I.add(C),T=j(T,y)}return new Q(I,T)}n.A=function(T){return ae(this,T).h},n.and=function(T){for(var g=Math.max(this.g.length,T.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)&T.i(E);return new o(v,this.h&T.h)},n.or=function(T){for(var g=Math.max(this.g.length,T.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)|T.i(E);return new o(v,this.h|T.h)},n.xor=function(T){for(var g=Math.max(this.g.length,T.g.length),v=[],E=0;E<g;E++)v[E]=this.i(E)^T.i(E);return new o(v,this.h^T.h)};function Ge(T){for(var g=T.g.length+1,v=[],E=0;E<g;E++)v[E]=T.i(E)<<1|T.i(E-1)>>>31;return new o(v,T.h)}function de(T,g){var v=g>>5;g%=32;for(var E=T.g.length-v,I=[],C=0;C<E;C++)I[C]=0<g?T.i(C+v)>>>g|T.i(C+v+1)<<32-g:T.i(C+v);return new o(I,T.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,Bf=i,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Bt=o}).apply(typeof dh<"u"?dh:typeof self<"u"?self:typeof window<"u"?window:{});var Ys=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qf,Ui,Wf,lr,ba,jf,$f,Hf;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,d){return a==Array.prototype||a==Object.prototype||(a[u]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ys=="object"&&Ys];for(var u=0;u<a.length;++u){var d=a[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var i=t(this);function s(a,u){if(u)e:{var d=i;a=a.split(".");for(var _=0;_<a.length-1;_++){var w=a[_];if(!(w in d))break e;d=d[w]}a=a[a.length-1],_=d[a],u=u(_),u!=_&&u!=null&&e(d,a,{configurable:!0,writable:!0,value:u})}}function r(a,u){a instanceof String&&(a+="");var d=0,_=!1,w={next:function(){if(!_&&d<a.length){var R=d++;return{value:u(R,a[R]),done:!1}}return _=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(a){return a||function(){return r(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function f(a,u,d){return a.call.apply(a.bind,arguments)}function p(a,u,d){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,_),a.apply(u,w)}}return function(){return a.apply(u,arguments)}}function m(a,u,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,m.apply(null,arguments)}function A(a,u){var d=Array.prototype.slice.call(arguments,1);return function(){var _=d.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function S(a,u){function d(){}d.prototype=u.prototype,a.aa=u.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(_,w,R){for(var O=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)O[ne-2]=arguments[ne];return u.prototype[w].apply(_,O)}}function N(a){const u=a.length;if(0<u){const d=Array(u);for(let _=0;_<u;_++)d[_]=a[_];return d}return[]}function k(a,u){for(let d=1;d<arguments.length;d++){const _=arguments[d];if(c(_)){const w=a.length||0,R=_.length||0;a.length=w+R;for(let O=0;O<R;O++)a[w+O]=_[O]}else a.push(_)}}class j{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function z(a){return/^[\s\xa0]*$/.test(a)}function Q(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function ae(a){return ae[" "](a),a}ae[" "]=function(){};var Ge=Q().indexOf("Gecko")!=-1&&!(Q().toLowerCase().indexOf("webkit")!=-1&&Q().indexOf("Edge")==-1)&&!(Q().indexOf("Trident")!=-1||Q().indexOf("MSIE")!=-1)&&Q().indexOf("Edge")==-1;function de(a,u,d){for(const _ in a)u.call(d,a[_],_,a)}function T(a,u){for(const d in a)u.call(void 0,a[d],d,a)}function g(a){const u={};for(const d in a)u[d]=a[d];return u}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(a,u){let d,_;for(let w=1;w<arguments.length;w++){_=arguments[w];for(d in _)a[d]=_[d];for(let R=0;R<v.length;R++)d=v[R],Object.prototype.hasOwnProperty.call(_,d)&&(a[d]=_[d])}}function I(a){var u=1;a=a.split(":");const d=[];for(;0<u&&a.length;)d.push(a.shift()),u--;return a.length&&d.push(a.join(":")),d}function C(a){l.setTimeout(()=>{throw a},0)}function y(){var a=No;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class ht{constructor(){this.h=this.g=null}add(u,d){const _=yi.get();_.set(u,d),this.h?this.h.next=_:this.g=_,this.h=_}}var yi=new j(()=>new Im,a=>a.reset());class Im{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let vi,Ei=!1,No=new ht,Uc=()=>{const a=l.Promise.resolve(void 0);vi=()=>{a.then(wm)}};var wm=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){C(d)}var u=yi;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}Ei=!1};function St(){this.s=this.s,this.C=this.C}St.prototype.s=!1,St.prototype.ma=function(){this.s||(this.s=!0,this.N())},St.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Pe(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}Pe.prototype.h=function(){this.defaultPrevented=!0};var Am=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,u),l.removeEventListener("test",d,u)}catch{}return a}();function Ti(a,u){if(Pe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(Ge){e:{try{ae(u.nodeName);var w=!0;break e}catch{}w=!1}w||(u=null)}}else d=="mouseover"?u=a.fromElement:d=="mouseout"&&(u=a.toElement);this.relatedTarget=u,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Cm[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Ti.aa.h.call(this)}}S(Ti,Pe);var Cm={2:"touch",3:"pen",4:"mouse"};Ti.prototype.h=function(){Ti.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ks="closure_listenable_"+(1e6*Math.random()|0),Rm=0;function Sm(a,u,d,_,w){this.listener=a,this.proxy=null,this.src=u,this.type=d,this.capture=!!_,this.ha=w,this.key=++Rm,this.da=this.fa=!1}function Ns(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ds(a){this.src=a,this.g={},this.h=0}Ds.prototype.add=function(a,u,d,_,w){var R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);var O=Oo(a,u,_,w);return-1<O?(u=a[O],d||(u.fa=!1)):(u=new Sm(u,this.src,R,!!_,w),u.fa=d,a.push(u)),u};function Do(a,u){var d=u.type;if(d in a.g){var _=a.g[d],w=Array.prototype.indexOf.call(_,u,void 0),R;(R=0<=w)&&Array.prototype.splice.call(_,w,1),R&&(Ns(u),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Oo(a,u,d,_){for(var w=0;w<a.length;++w){var R=a[w];if(!R.da&&R.listener==u&&R.capture==!!d&&R.ha==_)return w}return-1}var Vo="closure_lm_"+(1e6*Math.random()|0),Mo={};function Bc(a,u,d,_,w){if(Array.isArray(u)){for(var R=0;R<u.length;R++)Bc(a,u[R],d,_,w);return null}return d=jc(d),a&&a[ks]?a.K(u,d,h(_)?!!_.capture:!1,w):bm(a,u,d,!1,_,w)}function bm(a,u,d,_,w,R){if(!u)throw Error("Invalid event type");var O=h(w)?!!w.capture:!!w,ne=Lo(a);if(ne||(a[Vo]=ne=new Ds(a)),d=ne.add(u,d,_,O,R),d.proxy)return d;if(_=Pm(),d.proxy=_,_.src=a,_.listener=d,a.addEventListener)Am||(w=O),w===void 0&&(w=!1),a.addEventListener(u.toString(),_,w);else if(a.attachEvent)a.attachEvent(Wc(u.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Pm(){function a(d){return u.call(a.src,a.listener,d)}const u=km;return a}function qc(a,u,d,_,w){if(Array.isArray(u))for(var R=0;R<u.length;R++)qc(a,u[R],d,_,w);else _=h(_)?!!_.capture:!!_,d=jc(d),a&&a[ks]?(a=a.i,u=String(u).toString(),u in a.g&&(R=a.g[u],d=Oo(R,d,_,w),-1<d&&(Ns(R[d]),Array.prototype.splice.call(R,d,1),R.length==0&&(delete a.g[u],a.h--)))):a&&(a=Lo(a))&&(u=a.g[u.toString()],a=-1,u&&(a=Oo(u,d,_,w)),(d=-1<a?u[a]:null)&&xo(d))}function xo(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[ks])Do(u.i,a);else{var d=a.type,_=a.proxy;u.removeEventListener?u.removeEventListener(d,_,a.capture):u.detachEvent?u.detachEvent(Wc(d),_):u.addListener&&u.removeListener&&u.removeListener(_),(d=Lo(u))?(Do(d,a),d.h==0&&(d.src=null,u[Vo]=null)):Ns(a)}}}function Wc(a){return a in Mo?Mo[a]:Mo[a]="on"+a}function km(a,u){if(a.da)a=!0;else{u=new Ti(u,this);var d=a.listener,_=a.ha||a.src;a.fa&&xo(a),a=d.call(_,u)}return a}function Lo(a){return a=a[Vo],a instanceof Ds?a:null}var Fo="__closure_events_fn_"+(1e9*Math.random()>>>0);function jc(a){return typeof a=="function"?a:(a[Fo]||(a[Fo]=function(u){return a.handleEvent(u)}),a[Fo])}function ke(){St.call(this),this.i=new Ds(this),this.M=this,this.F=null}S(ke,St),ke.prototype[ks]=!0,ke.prototype.removeEventListener=function(a,u,d,_){qc(this,a,u,d,_)};function Le(a,u){var d,_=a.F;if(_)for(d=[];_;_=_.F)d.push(_);if(a=a.M,_=u.type||u,typeof u=="string")u=new Pe(u,a);else if(u instanceof Pe)u.target=u.target||a;else{var w=u;u=new Pe(_,a),E(u,w)}if(w=!0,d)for(var R=d.length-1;0<=R;R--){var O=u.g=d[R];w=Os(O,_,!0,u)&&w}if(O=u.g=a,w=Os(O,_,!0,u)&&w,w=Os(O,_,!1,u)&&w,d)for(R=0;R<d.length;R++)O=u.g=d[R],w=Os(O,_,!1,u)&&w}ke.prototype.N=function(){if(ke.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var d=a.g[u],_=0;_<d.length;_++)Ns(d[_]);delete a.g[u],a.h--}}this.F=null},ke.prototype.K=function(a,u,d,_){return this.i.add(String(a),u,!1,d,_)},ke.prototype.L=function(a,u,d,_){return this.i.add(String(a),u,!0,d,_)};function Os(a,u,d,_){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var w=!0,R=0;R<u.length;++R){var O=u[R];if(O&&!O.da&&O.capture==d){var ne=O.listener,Ae=O.ha||O.src;O.fa&&Do(a.i,O),w=ne.call(Ae,_)!==!1&&w}}return w&&!_.defaultPrevented}function $c(a,u,d){if(typeof a=="function")d&&(a=m(a,d));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(a,u||0)}function Hc(a){a.g=$c(()=>{a.g=null,a.i&&(a.i=!1,Hc(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class Nm extends St{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Hc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ii(a){St.call(this),this.h=a,this.g={}}S(Ii,St);var zc=[];function Gc(a){de(a.g,function(u,d){this.g.hasOwnProperty(d)&&xo(u)},a),a.g={}}Ii.prototype.N=function(){Ii.aa.N.call(this),Gc(this)},Ii.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Uo=l.JSON.stringify,Dm=l.JSON.parse,Om=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Bo(){}Bo.prototype.h=null;function Kc(a){return a.h||(a.h=a.i())}function Qc(){}var wi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function qo(){Pe.call(this,"d")}S(qo,Pe);function Wo(){Pe.call(this,"c")}S(Wo,Pe);var an={},Yc=null;function Vs(){return Yc=Yc||new ke}an.La="serverreachability";function Xc(a){Pe.call(this,an.La,a)}S(Xc,Pe);function Ai(a){const u=Vs();Le(u,new Xc(u))}an.STAT_EVENT="statevent";function Jc(a,u){Pe.call(this,an.STAT_EVENT,a),this.stat=u}S(Jc,Pe);function Fe(a){const u=Vs();Le(u,new Jc(u,a))}an.Ma="timingevent";function Zc(a,u){Pe.call(this,an.Ma,a),this.size=u}S(Zc,Pe);function Ci(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},u)}function Ri(){this.g=!0}Ri.prototype.xa=function(){this.g=!1};function Vm(a,u,d,_,w,R){a.info(function(){if(a.g)if(R)for(var O="",ne=R.split("&"),Ae=0;Ae<ne.length;Ae++){var J=ne[Ae].split("=");if(1<J.length){var Ne=J[0];J=J[1];var De=Ne.split("_");O=2<=De.length&&De[1]=="type"?O+(Ne+"="+J+"&"):O+(Ne+"=redacted&")}}else O=null;else O=R;return"XMLHTTP REQ ("+_+") [attempt "+w+"]: "+u+`
`+d+`
`+O})}function Mm(a,u,d,_,w,R,O){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+w+"]: "+u+`
`+d+`
`+R+" "+O})}function Pn(a,u,d,_){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+Lm(a,d)+(_?" "+_:"")})}function xm(a,u){a.info(function(){return"TIMEOUT: "+u})}Ri.prototype.info=function(){};function Lm(a,u){if(!a.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var _=d[a];if(!(2>_.length)){var w=_[1];if(Array.isArray(w)&&!(1>w.length)){var R=w[0];if(R!="noop"&&R!="stop"&&R!="close")for(var O=1;O<w.length;O++)w[O]=""}}}}return Uo(d)}catch{return u}}var Ms={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},jo;function xs(){}S(xs,Bo),xs.prototype.g=function(){return new XMLHttpRequest},xs.prototype.i=function(){return{}},jo=new xs;function bt(a,u,d,_){this.j=a,this.i=u,this.l=d,this.R=_||1,this.U=new Ii(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new tu}function tu(){this.i=null,this.g="",this.h=!1}var nu={},$o={};function Ho(a,u,d){a.L=1,a.v=Bs(dt(u)),a.m=d,a.P=!0,iu(a,null)}function iu(a,u){a.F=Date.now(),Ls(a),a.A=dt(a.v);var d=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),gu(d.i,"t",_),a.C=0,d=a.j.J,a.h=new tu,a.g=Mu(a.j,d?u:null,!a.m),0<a.O&&(a.M=new Nm(m(a.Y,a,a.g),a.O)),u=a.U,d=a.g,_=a.ca;var w="readystatechange";Array.isArray(w)||(w&&(zc[0]=w.toString()),w=zc);for(var R=0;R<w.length;R++){var O=Bc(d,w[R],_||u.handleEvent,!1,u.h||u);if(!O)break;u.g[O.key]=O}u=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),Ai(),Vm(a.i,a.u,a.A,a.l,a.R,a.m)}bt.prototype.ca=function(a){a=a.target;const u=this.M;u&&ft(a)==3?u.j():this.Y(a)},bt.prototype.Y=function(a){try{if(a==this.g)e:{const De=ft(this.g);var u=this.g.Ba();const Dn=this.g.Z();if(!(3>De)&&(De!=3||this.g&&(this.h.h||this.g.oa()||Au(this.g)))){this.J||De!=4||u==7||(u==8||0>=Dn?Ai(3):Ai(2)),zo(this);var d=this.g.Z();this.X=d;t:if(su(this)){var _=Au(this.g);a="";var w=_.length,R=ft(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ln(this),Si(this);var O="";break t}this.h.i=new l.TextDecoder}for(u=0;u<w;u++)this.h.h=!0,a+=this.h.i.decode(_[u],{stream:!(R&&u==w-1)});_.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Mm(this.i,this.u,this.A,this.l,this.R,De,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,Ae=this.g;if((ne=Ae.g?Ae.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!z(ne)){var J=ne;break t}}J=null}if(d=J)Pn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Go(this,d);else{this.o=!1,this.s=3,Fe(12),ln(this),Si(this);break e}}if(this.P){d=!0;let Qe;for(;!this.J&&this.C<O.length;)if(Qe=Fm(this,O),Qe==$o){De==4&&(this.s=4,Fe(14),d=!1),Pn(this.i,this.l,null,"[Incomplete Response]");break}else if(Qe==nu){this.s=4,Fe(15),Pn(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else Pn(this.i,this.l,Qe,null),Go(this,Qe);if(su(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),De!=4||O.length!=0||this.h.h||(this.s=1,Fe(16),d=!1),this.o=this.o&&d,!d)Pn(this.i,this.l,O,"[Invalid Chunked Response]"),ln(this),Si(this);else if(0<O.length&&!this.W){this.W=!0;var Ne=this.j;Ne.g==this&&Ne.ba&&!Ne.M&&(Ne.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),Zo(Ne),Ne.M=!0,Fe(11))}}else Pn(this.i,this.l,O,null),Go(this,O);De==4&&ln(this),this.o&&!this.J&&(De==4?Nu(this.j,this):(this.o=!1,Ls(this)))}else tg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Fe(12)):(this.s=0,Fe(13)),ln(this),Si(this)}}}catch{}finally{}};function su(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Fm(a,u){var d=a.C,_=u.indexOf(`
`,d);return _==-1?$o:(d=Number(u.substring(d,_)),isNaN(d)?nu:(_+=1,_+d>u.length?$o:(u=u.slice(_,_+d),a.C=_+d,u)))}bt.prototype.cancel=function(){this.J=!0,ln(this)};function Ls(a){a.S=Date.now()+a.I,ru(a,a.I)}function ru(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ci(m(a.ba,a),u)}function zo(a){a.B&&(l.clearTimeout(a.B),a.B=null)}bt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(xm(this.i,this.A),this.L!=2&&(Ai(),Fe(17)),ln(this),this.s=2,Si(this)):ru(this,this.S-a)};function Si(a){a.j.G==0||a.J||Nu(a.j,a)}function ln(a){zo(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Gc(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function Go(a,u){try{var d=a.j;if(d.G!=0&&(d.g==a||Ko(d.h,a))){if(!a.K&&Ko(d.h,a)&&d.G==3){try{var _=d.Da.g.parse(u)}catch{_=null}if(Array.isArray(_)&&_.length==3){var w=_;if(w[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)zs(d),$s(d);else break e;Jo(d),Fe(18)}}else d.za=w[1],0<d.za-d.T&&37500>w[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ci(m(d.Za,d),6e3));if(1>=lu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else un(d,11)}else if((a.K||d.g==a)&&zs(d),!z(u))for(w=d.Da.g.parse(u),u=0;u<w.length;u++){let J=w[u];if(d.T=J[0],J=J[1],d.G==2)if(J[0]=="c"){d.K=J[1],d.ia=J[2];const Ne=J[3];Ne!=null&&(d.la=Ne,d.j.info("VER="+d.la));const De=J[4];De!=null&&(d.Aa=De,d.j.info("SVER="+d.Aa));const Dn=J[5];Dn!=null&&typeof Dn=="number"&&0<Dn&&(_=1.5*Dn,d.L=_,d.j.info("backChannelRequestTimeoutMs_="+_)),_=d;const Qe=a.g;if(Qe){const Ks=Qe.g?Qe.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ks){var R=_.h;R.g||Ks.indexOf("spdy")==-1&&Ks.indexOf("quic")==-1&&Ks.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Qo(R,R.h),R.h=null))}if(_.D){const ea=Qe.g?Qe.g.getResponseHeader("X-HTTP-Session-Id"):null;ea&&(_.ya=ea,re(_.I,_.D,ea))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),_=d;var O=a;if(_.qa=Vu(_,_.J?_.ia:null,_.W),O.K){cu(_.h,O);var ne=O,Ae=_.L;Ae&&(ne.I=Ae),ne.B&&(zo(ne),Ls(ne)),_.g=O}else Pu(_);0<d.i.length&&Hs(d)}else J[0]!="stop"&&J[0]!="close"||un(d,7);else d.G==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?un(d,7):Xo(d):J[0]!="noop"&&d.l&&d.l.ta(J),d.v=0)}}Ai(4)}catch{}}var Um=class{constructor(a,u){this.g=a,this.map=u}};function ou(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function au(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function lu(a){return a.h?1:a.g?a.g.size:0}function Ko(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function Qo(a,u){a.g?a.g.add(u):a.h=u}function cu(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}ou.prototype.cancel=function(){if(this.i=uu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function uu(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const d of a.g.values())u=u.concat(d.D);return u}return N(a.i)}function Bm(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var u=[],d=a.length,_=0;_<d;_++)u.push(a[_]);return u}u=[],d=0;for(_ in a)u[d++]=a[_];return u}function qm(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var u=[];a=a.length;for(var d=0;d<a;d++)u.push(d);return u}u=[],d=0;for(const _ in a)u[d++]=_;return u}}}function hu(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var d=qm(a),_=Bm(a),w=_.length,R=0;R<w;R++)u.call(void 0,_[R],d&&d[R],a)}var du=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Wm(a,u){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var _=a[d].indexOf("="),w=null;if(0<=_){var R=a[d].substring(0,_);w=a[d].substring(_+1)}else R=a[d];u(R,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function cn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof cn){this.h=a.h,Fs(this,a.j),this.o=a.o,this.g=a.g,Us(this,a.s),this.l=a.l;var u=a.i,d=new ki;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),fu(this,d),this.m=a.m}else a&&(u=String(a).match(du))?(this.h=!1,Fs(this,u[1]||"",!0),this.o=bi(u[2]||""),this.g=bi(u[3]||"",!0),Us(this,u[4]),this.l=bi(u[5]||"",!0),fu(this,u[6]||"",!0),this.m=bi(u[7]||"")):(this.h=!1,this.i=new ki(null,this.h))}cn.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Pi(u,pu,!0),":");var d=this.g;return(d||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Pi(u,pu,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Pi(d,d.charAt(0)=="/"?Hm:$m,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Pi(d,Gm)),a.join("")};function dt(a){return new cn(a)}function Fs(a,u,d){a.j=d?bi(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Us(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function fu(a,u,d){u instanceof ki?(a.i=u,Km(a.i,a.h)):(d||(u=Pi(u,zm)),a.i=new ki(u,a.h))}function re(a,u,d){a.i.set(u,d)}function Bs(a){return re(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function bi(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Pi(a,u,d){return typeof a=="string"?(a=encodeURI(a).replace(u,jm),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function jm(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var pu=/[#\/\?@]/g,$m=/[#\?:]/g,Hm=/[#\?]/g,zm=/[#\?@]/g,Gm=/#/g;function ki(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Pt(a){a.g||(a.g=new Map,a.h=0,a.i&&Wm(a.i,function(u,d){a.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=ki.prototype,n.add=function(a,u){Pt(this),this.i=null,a=kn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(u),this.h+=1,this};function _u(a,u){Pt(a),u=kn(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function mu(a,u){return Pt(a),u=kn(a,u),a.g.has(u)}n.forEach=function(a,u){Pt(this),this.g.forEach(function(d,_){d.forEach(function(w){a.call(u,w,_,this)},this)},this)},n.na=function(){Pt(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let _=0;_<u.length;_++){const w=a[_];for(let R=0;R<w.length;R++)d.push(u[_])}return d},n.V=function(a){Pt(this);let u=[];if(typeof a=="string")mu(this,a)&&(u=u.concat(this.g.get(kn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)u=u.concat(a[d])}return u},n.set=function(a,u){return Pt(this),this.i=null,a=kn(this,a),mu(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function gu(a,u,d){_u(a,u),0<d.length&&(a.i=null,a.g.set(kn(a,u),N(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var _=u[d];const R=encodeURIComponent(String(_)),O=this.V(_);for(_=0;_<O.length;_++){var w=R;O[_]!==""&&(w+="="+encodeURIComponent(String(O[_]))),a.push(w)}}return this.i=a.join("&")};function kn(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function Km(a,u){u&&!a.j&&(Pt(a),a.i=null,a.g.forEach(function(d,_){var w=_.toLowerCase();_!=w&&(_u(this,_),gu(this,w,d))},a)),a.j=u}function Qm(a,u){const d=new Ri;if(l.Image){const _=new Image;_.onload=A(kt,d,"TestLoadImage: loaded",!0,u,_),_.onerror=A(kt,d,"TestLoadImage: error",!1,u,_),_.onabort=A(kt,d,"TestLoadImage: abort",!1,u,_),_.ontimeout=A(kt,d,"TestLoadImage: timeout",!1,u,_),l.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else u(!1)}function Ym(a,u){const d=new Ri,_=new AbortController,w=setTimeout(()=>{_.abort(),kt(d,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:_.signal}).then(R=>{clearTimeout(w),R.ok?kt(d,"TestPingServer: ok",!0,u):kt(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(w),kt(d,"TestPingServer: error",!1,u)})}function kt(a,u,d,_,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),_(d)}catch{}}function Xm(){this.g=new Om}function Jm(a,u,d){const _=d||"";try{hu(a,function(w,R){let O=w;h(w)&&(O=Uo(w)),u.push(_+R+"="+encodeURIComponent(O))})}catch(w){throw u.push(_+"type="+encodeURIComponent("_badmap")),w}}function qs(a){this.l=a.Ub||null,this.j=a.eb||!1}S(qs,Bo),qs.prototype.g=function(){return new Ws(this.l,this.j)},qs.prototype.i=function(a){return function(){return a}}({});function Ws(a,u){ke.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(Ws,ke),n=Ws.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Di(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ni(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Di(this)),this.g&&(this.readyState=3,Di(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;yu(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function yu(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Ni(this):Di(this),this.readyState==3&&yu(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ni(this))},n.Qa=function(a){this.g&&(this.response=a,Ni(this))},n.ga=function(){this.g&&Ni(this)};function Ni(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Di(a)}n.setRequestHeader=function(a,u){this.u.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=u.next();return a.join(`\r
`)};function Di(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ws.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function vu(a){let u="";return de(a,function(d,_){u+=_,u+=":",u+=d,u+=`\r
`}),u}function Yo(a,u,d){e:{for(_ in d){var _=!1;break e}_=!0}_||(d=vu(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):re(a,u,d))}function le(a){ke.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(le,ke);var Zm=/^https?$/i,eg=["POST","PUT"];n=le.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,u,d,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():jo.g(),this.v=this.o?Kc(this.o):Kc(jo),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(R){Eu(this,R);return}if(a=d||"",d=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var w in _)d.set(w,_[w]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const R of _.keys())d.set(R,_.get(R));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),w=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(eg,u,void 0))||_||w||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of d)this.g.setRequestHeader(R,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{wu(this),this.u=!0,this.g.send(a),this.u=!1}catch(R){Eu(this,R)}};function Eu(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,Tu(a),js(a)}function Tu(a){a.A||(a.A=!0,Le(a,"complete"),Le(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Le(this,"complete"),Le(this,"abort"),js(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),js(this,!0)),le.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Iu(this):this.bb())},n.bb=function(){Iu(this)};function Iu(a){if(a.h&&typeof o<"u"&&(!a.v[1]||ft(a)!=4||a.Z()!=2)){if(a.u&&ft(a)==4)$c(a.Ea,0,a);else if(Le(a,"readystatechange"),ft(a)==4){a.h=!1;try{const O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var _;if(_=O===0){var w=String(a.D).match(du)[1]||null;!w&&l.self&&l.self.location&&(w=l.self.location.protocol.slice(0,-1)),_=!Zm.test(w?w.toLowerCase():"")}d=_}if(d)Le(a,"complete"),Le(a,"success");else{a.m=6;try{var R=2<ft(a)?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.Z()+"]",Tu(a)}}finally{js(a)}}}}function js(a,u){if(a.g){wu(a);const d=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Le(a,"ready");try{d.onreadystatechange=_}catch{}}}function wu(a){a.I&&(l.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function ft(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<ft(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),Dm(u)}};function Au(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function tg(a){const u={};a=(a.g&&2<=ft(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(z(a[_]))continue;var d=I(a[_]);const w=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=u[w]||[];u[w]=R,R.push(d)}T(u,function(_){return _.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Oi(a,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||u}function Cu(a){this.Aa=0,this.i=[],this.j=new Ri,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Oi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Oi("baseRetryDelayMs",5e3,a),this.cb=Oi("retryDelaySeedMs",1e4,a),this.Wa=Oi("forwardChannelMaxRetries",2,a),this.wa=Oi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new ou(a&&a.concurrentRequestLimit),this.Da=new Xm,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Cu.prototype,n.la=8,n.G=1,n.connect=function(a,u,d,_){Fe(0),this.W=a,this.H=u||{},d&&_!==void 0&&(this.H.OSID=d,this.H.OAID=_),this.F=this.X,this.I=Vu(this,null,this.W),Hs(this)};function Xo(a){if(Ru(a),a.G==3){var u=a.U++,d=dt(a.I);if(re(d,"SID",a.K),re(d,"RID",u),re(d,"TYPE","terminate"),Vi(a,d),u=new bt(a,a.j,u),u.L=2,u.v=Bs(dt(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=u.v,d=!0),d||(u.g=Mu(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ls(u)}Ou(a)}function $s(a){a.g&&(Zo(a),a.g.cancel(),a.g=null)}function Ru(a){$s(a),a.u&&(l.clearTimeout(a.u),a.u=null),zs(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Hs(a){if(!au(a.h)&&!a.s){a.s=!0;var u=a.Ga;vi||Uc(),Ei||(vi(),Ei=!0),No.add(u,a),a.B=0}}function ng(a,u){return lu(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ci(m(a.Ga,a,u),Du(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const w=new bt(this,this.j,a);let R=this.o;if(this.S&&(R?(R=g(R),E(R,this.S)):R=this.S),this.m!==null||this.O||(w.H=R,R=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var _=this.i[d];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(u+=_,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=bu(this,w,u),d=dt(this.I),re(d,"RID",a),re(d,"CVER",22),this.D&&re(d,"X-HTTP-Session-Id",this.D),Vi(this,d),R&&(this.O?u="headers="+encodeURIComponent(String(vu(R)))+"&"+u:this.m&&Yo(d,this.m,R)),Qo(this.h,w),this.Ua&&re(d,"TYPE","init"),this.P?(re(d,"$req",u),re(d,"SID","null"),w.T=!0,Ho(w,d,null)):Ho(w,d,u),this.G=2}}else this.G==3&&(a?Su(this,a):this.i.length==0||au(this.h)||Su(this))};function Su(a,u){var d;u?d=u.l:d=a.U++;const _=dt(a.I);re(_,"SID",a.K),re(_,"RID",d),re(_,"AID",a.T),Vi(a,_),a.m&&a.o&&Yo(_,a.m,a.o),d=new bt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),u&&(a.i=u.D.concat(a.i)),u=bu(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Qo(a.h,d),Ho(d,_,u)}function Vi(a,u){a.H&&de(a.H,function(d,_){re(u,_,d)}),a.l&&hu({},function(d,_){re(u,_,d)})}function bu(a,u,d){d=Math.min(a.i.length,d);var _=a.l?m(a.l.Na,a.l,a):null;e:{var w=a.i;let R=-1;for(;;){const O=["count="+d];R==-1?0<d?(R=w[0].g,O.push("ofs="+R)):R=0:O.push("ofs="+R);let ne=!0;for(let Ae=0;Ae<d;Ae++){let J=w[Ae].g;const Ne=w[Ae].map;if(J-=R,0>J)R=Math.max(0,w[Ae].g-100),ne=!1;else try{Jm(Ne,O,"req"+J+"_")}catch{_&&_(Ne)}}if(ne){_=O.join("&");break e}}}return a=a.i.splice(0,d),u.D=a,_}function Pu(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;vi||Uc(),Ei||(vi(),Ei=!0),No.add(u,a),a.v=0}}function Jo(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ci(m(a.Fa,a),Du(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,ku(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ci(m(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Fe(10),$s(this),ku(this))};function Zo(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function ku(a){a.g=new bt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=dt(a.qa);re(u,"RID","rpc"),re(u,"SID",a.K),re(u,"AID",a.T),re(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&re(u,"TO",a.ja),re(u,"TYPE","xmlhttp"),Vi(a,u),a.m&&a.o&&Yo(u,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Bs(dt(u)),d.m=null,d.P=!0,iu(d,a)}n.Za=function(){this.C!=null&&(this.C=null,$s(this),Jo(this),Fe(19))};function zs(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Nu(a,u){var d=null;if(a.g==u){zs(a),Zo(a),a.g=null;var _=2}else if(Ko(a.h,u))d=u.D,cu(a.h,u),_=1;else return;if(a.G!=0){if(u.o)if(_==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var w=a.B;_=Vs(),Le(_,new Zc(_,d)),Hs(a)}else Pu(a);else if(w=u.s,w==3||w==0&&0<u.X||!(_==1&&ng(a,u)||_==2&&Jo(a)))switch(d&&0<d.length&&(u=a.h,u.i=u.i.concat(d)),w){case 1:un(a,5);break;case 4:un(a,10);break;case 3:un(a,6);break;default:un(a,2)}}}function Du(a,u){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*u}function un(a,u){if(a.j.info("Error code "+u),u==2){var d=m(a.fb,a),_=a.Xa;const w=!_;_=new cn(_||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Fs(_,"https"),Bs(_),w?Qm(_.toString(),d):Ym(_.toString(),d)}else Fe(2);a.G=0,a.l&&a.l.sa(u),Ou(a),Ru(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Fe(2)):(this.j.info("Failed to ping google.com"),Fe(1))};function Ou(a){if(a.G=0,a.ka=[],a.l){const u=uu(a.h);(u.length!=0||a.i.length!=0)&&(k(a.ka,u),k(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function Vu(a,u,d){var _=d instanceof cn?dt(d):new cn(d);if(_.g!="")u&&(_.g=u+"."+_.g),Us(_,_.s);else{var w=l.location;_=w.protocol,u=u?u+"."+w.hostname:w.hostname,w=+w.port;var R=new cn(null);_&&Fs(R,_),u&&(R.g=u),w&&Us(R,w),d&&(R.l=d),_=R}return d=a.D,u=a.ya,d&&u&&re(_,d,u),re(_,"VER",a.la),Vi(a,_),_}function Mu(a,u,d){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new le(new qs({eb:d})):new le(a.pa),u.Ha(a.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function xu(){}n=xu.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Gs(){}Gs.prototype.g=function(a,u){return new He(a,u)};function He(a,u){ke.call(this),this.g=new Cu(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!z(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!z(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new Nn(this)}S(He,ke),He.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){Xo(this.g)},He.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=Uo(a),a=d);u.i.push(new Um(u.Ya++,a)),u.G==3&&Hs(u)},He.prototype.N=function(){this.g.l=null,delete this.j,Xo(this.g),delete this.g,He.aa.N.call(this)};function Lu(a){qo.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const d in u){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}S(Lu,qo);function Fu(){Wo.call(this),this.status=1}S(Fu,Wo);function Nn(a){this.g=a}S(Nn,xu),Nn.prototype.ua=function(){Le(this.g,"a")},Nn.prototype.ta=function(a){Le(this.g,new Lu(a))},Nn.prototype.sa=function(a){Le(this.g,new Fu)},Nn.prototype.ra=function(){Le(this.g,"b")},Gs.prototype.createWebChannel=Gs.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,Hf=function(){return new Gs},$f=function(){return Vs()},jf=an,ba={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ms.NO_ERROR=0,Ms.TIMEOUT=8,Ms.HTTP_ERROR=6,lr=Ms,eu.COMPLETE="complete",Wf=eu,Qc.EventType=wi,wi.OPEN="a",wi.CLOSE="b",wi.ERROR="c",wi.MESSAGE="d",ke.prototype.listen=ke.prototype.K,Ui=Qc,le.prototype.listenOnce=le.prototype.L,le.prototype.getLastError=le.prototype.Ka,le.prototype.getLastErrorCode=le.prototype.Ba,le.prototype.getStatus=le.prototype.Z,le.prototype.getResponseJson=le.prototype.Oa,le.prototype.getResponseText=le.prototype.oa,le.prototype.send=le.prototype.ea,le.prototype.setWithCredentials=le.prototype.Ha,qf=le}).apply(typeof Ys<"u"?Ys:typeof self<"u"?self:typeof window<"u"?window:{});const fh="@firebase/firestore",ph="4.7.10";/**
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
 */class Ve{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ve.UNAUTHENTICATED=new Ve(null),Ve.GOOGLE_CREDENTIALS=new Ve("google-credentials-uid"),Ve.FIRST_PARTY=new Ve("first-party-uid"),Ve.MOCK_USER=new Ve("mock-user");/**
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
 */let ui="11.5.0";/**
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
 */const yn=new Jr("@firebase/firestore");function Vn(){return yn.logLevel}function V(n,...e){if(yn.logLevel<=G.DEBUG){const t=e.map(El);yn.debug(`Firestore (${ui}): ${n}`,...t)}}function wt(n,...e){if(yn.logLevel<=G.ERROR){const t=e.map(El);yn.error(`Firestore (${ui}): ${n}`,...t)}}function Qn(n,...e){if(yn.logLevel<=G.WARN){const t=e.map(El);yn.warn(`Firestore (${ui}): ${n}`,...t)}}function El(n){if(typeof n=="string")return n;try{/**
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
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function F(n="Unexpected state"){const e=`FIRESTORE (${ui}) INTERNAL ASSERTION FAILED: `+n;throw wt(e),new Error(e)}function ee(n,e){n||F()}function q(n,e){return n}/**
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
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Rt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class qt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class zf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class LE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ve.UNAUTHENTICATED))}shutdown(){}}class FE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class UE{constructor(e){this.t=e,this.currentUser=Ve.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){ee(this.o===void 0);let i=this.i;const s=c=>this.i!==i?(i=this.i,t(c)):Promise.resolve();let r=new qt;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new qt,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=r;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new qt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(ee(typeof i.accessToken=="string"),new zf(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return ee(e===null||typeof e=="string"),new Ve(e)}}class BE{constructor(e,t,i){this.l=e,this.h=t,this.P=i,this.type="FirstParty",this.user=Ve.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class qE{constructor(e,t,i){this.l=e,this.h=t,this.P=i}getToken(){return Promise.resolve(new BE(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ve.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class _h{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class WE{constructor(e,t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,Ye(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,t){ee(this.o===void 0);const i=r=>{r.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.R;return this.R=r.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>i(r))};const s=r=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){const r=this.A.getImmediate({optional:!0});r?s(r):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new _h(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(ee(typeof t.token=="string"),this.R=t.token,new _h(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function jE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
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
 */function Gf(){return new TextEncoder}/**
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
 */class Kf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const s=jE(40);for(let r=0;r<s.length;++r)i.length<20&&s[r]<t&&(i+=e.charAt(s[r]%62))}return i}}function W(n,e){return n<e?-1:n>e?1:0}function Pa(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=n.codePointAt(t),s=e.codePointAt(t);if(i!==s){if(i<128&&s<128)return W(i,s);{const r=Gf(),o=$E(r.encode(mh(n,t)),r.encode(mh(e,t)));return o!==0?o:W(i,s)}}t+=i>65535?2:1}return W(n.length,e.length)}function mh(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function $E(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return W(n[t],e[t]);return W(n.length,e.length)}function Yn(n,e,t){return n.length===e.length&&n.every((i,s)=>t(i,e[s]))}/**
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
 */const gh=-62135596800,yh=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*yh);return new ge(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<gh)throw new M(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/yh}_compareTo(e){return this.seconds===e.seconds?W(this.nanoseconds,e.nanoseconds):W(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds-gh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class B{static fromTimestamp(e){return new B(e)}static min(){return new B(new ge(0,0))}static max(){return new B(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */const vh="__name__";class it{constructor(e,t,i){t===void 0?t=0:t>e.length&&F(),i===void 0?i=e.length-t:i>e.length-t&&F(),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return it.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof it?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let s=0;s<i;s++){const r=it.compareSegments(e.get(s),t.get(s));if(r!==0)return r}return W(e.length,t.length)}static compareSegments(e,t){const i=it.isNumericId(e),s=it.isNumericId(t);return i&&!s?-1:!i&&s?1:i&&s?it.extractNumericId(e).compare(it.extractNumericId(t)):Pa(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Bt.fromString(e.substring(4,e.length-2))}}class oe extends it{construct(e,t,i){return new oe(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new M(b.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(s=>s.length>0))}return new oe(t)}static emptyPath(){return new oe([])}}const HE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Re extends it{construct(e,t,i){return new Re(e,t,i)}static isValidIdentifier(e){return HE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Re.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===vh}static keyField(){return new Re([vh])}static fromServerFormat(e){const t=[];let i="",s=0;const r=()=>{if(i.length===0)throw new M(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new M(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new M(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(i+=l,s++):(r(),s++)}if(r(),o)throw new M(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Re(t)}static emptyPath(){return new Re([])}}/**
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
 */class x{constructor(e){this.path=e}static fromPath(e){return new x(oe.fromString(e))}static fromName(e){return new x(oe.fromString(e).popFirst(5))}static empty(){return new x(oe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&oe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return oe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new x(new oe(e.slice()))}}/**
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
 */const ts=-1;function zE(n,e){const t=n.toTimestamp().seconds,i=n.toTimestamp().nanoseconds+1,s=B.fromTimestamp(i===1e9?new ge(t+1,0):new ge(t,i));return new Gt(s,x.empty(),e)}function GE(n){return new Gt(n.readTime,n.key,ts)}class Gt{constructor(e,t,i){this.readTime=e,this.documentKey=t,this.largestBatchId=i}static min(){return new Gt(B.min(),x.empty(),ts)}static max(){return new Gt(B.max(),x.empty(),ts)}}function KE(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=x.comparator(n.documentKey,e.documentKey),t!==0?t:W(n.largestBatchId,e.largestBatchId))}/**
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
 */const QE="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class YE{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function hi(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==QE)throw n;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class P{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new P((i,s)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(i,s)},this.catchCallback=r=>{this.wrapFailure(t,r).next(i,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof P?t:P.resolve(t)}catch(t){return P.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):P.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):P.reject(t)}static resolve(e){return new P((t,i)=>{t(e)})}static reject(e){return new P((t,i)=>{i(e)})}static waitFor(e){return new P((t,i)=>{let s=0,r=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++r,o&&r===s&&t()},c=>i(c))}),o=!0,r===s&&t()})}static or(e){let t=P.resolve(!1);for(const i of e)t=t.next(s=>s?P.resolve(s):i());return t}static forEach(e,t){const i=[];return e.forEach((s,r)=>{i.push(t.call(this,s,r))}),this.waitFor(i)}static mapArray(e,t){return new P((i,s)=>{const r=e.length,o=new Array(r);let l=0;for(let c=0;c<r;c++){const h=c;t(e[h]).next(f=>{o[h]=f,++l,l===r&&i(o)},f=>s(f))}})}static doWhile(e,t){return new P((i,s)=>{const r=()=>{e()===!0?t().next(()=>{r()},s):i()};r()})}}function XE(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function di(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class no{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=i=>this.oe(i),this._e=i=>t.writeSequenceNumber(i))}oe(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this._e&&this._e(e),e}}no.ae=-1;/**
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
 */const Tl=-1;function io(n){return n==null}function Ar(n){return n===0&&1/n==-1/0}function JE(n){return typeof n=="number"&&Number.isInteger(n)&&!Ar(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */const Qf="";function ZE(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Eh(e)),e=eT(n.get(t),e);return Eh(e)}function eT(n,e){let t=e;const i=n.length;for(let s=0;s<i;s++){const r=n.charAt(s);switch(r){case"\0":t+="";break;case Qf:t+="";break;default:t+=r}}return t}function Eh(n){return n+Qf+""}/**
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
 */function Th(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function nn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Yf(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */let me=class ka{constructor(e,t){this.comparator=e,this.root=t||Wt.EMPTY}insert(e,t){return new ka(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Wt.BLACK,null,null))}remove(e){return new ka(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Wt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const i=this.comparator(e,t.key);if(i===0)return t.value;i<0?t=t.left:i>0&&(t=t.right)}return null}indexOf(e){let t=0,i=this.root;for(;!i.isEmpty();){const s=this.comparator(e,i.key);if(s===0)return t+i.left.size;s<0?i=i.left:(t+=i.left.size+1,i=i.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,i)=>(e(t,i),!1))}toString(){const e=[];return this.inorderTraversal((t,i)=>(e.push(`${t}:${i}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Xs(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Xs(this.root,e,this.comparator,!1)}getReverseIterator(){return new Xs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Xs(this.root,e,this.comparator,!0)}},Xs=class{constructor(e,t,i,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?i(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Wt=class pt{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??pt.RED,this.left=s??pt.EMPTY,this.right=r??pt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,i,s,r){return new pt(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return s=r<0?s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp()}removeMin(){if(this.left.isEmpty())return pt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let i,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return pt.EMPTY;i=s.right.min(),s=s.copy(i.key,i.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,pt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,pt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw F();const e=this.left.check();if(e!==this.right.check())throw F();return e+(this.isRed()?0:1)}};Wt.EMPTY=null,Wt.RED=!0,Wt.BLACK=!1;Wt.EMPTY=new class{constructor(){this.size=0}get key(){throw F()}get value(){throw F()}get color(){throw F()}get left(){throw F()}get right(){throw F()}copy(e,t,i,s,r){return this}insert(e,t,i){return new Wt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ye{constructor(e){this.comparator=e,this.data=new me(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,i)=>(e(t),!1))}forEachInRange(e,t){const i=this.data.getIteratorFrom(e[0]);for(;i.hasNext();){const s=i.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let i;for(i=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();i.hasNext();)if(!e(i.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ih(this.data.getIterator())}getIteratorFrom(e){return new Ih(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(i=>{t=t.add(i)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),i=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(this.comparator(s,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class Ih{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class ze{constructor(e){this.fields=e,e.sort(Re.comparator)}static empty(){return new ze([])}unionWith(e){let t=new ye(Re.comparator);for(const i of this.fields)t=t.add(i);for(const i of e)t=t.add(i);return new ze(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Yn(this.fields,e.fields,(t,i)=>t.isEqual(i))}}/**
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
 */class Xf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Se{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new Xf("Invalid base64 string: "+r):r}}(e);return new Se(t)}static fromUint8Array(e){const t=function(s){let r="";for(let o=0;o<s.length;++o)r+=String.fromCharCode(s[o]);return r}(e);return new Se(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return W(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Se.EMPTY_BYTE_STRING=new Se("");const tT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Kt(n){if(ee(!!n),typeof n=="string"){let e=0;const t=tT.exec(n);if(ee(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const i=new Date(n);return{seconds:Math.floor(i.getTime()/1e3),nanos:e}}return{seconds:fe(n.seconds),nanos:fe(n.nanos)}}function fe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Qt(n){return typeof n=="string"?Se.fromBase64String(n):Se.fromUint8Array(n)}/**
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
 */const Jf="server_timestamp",Zf="__type__",ep="__previous_value__",tp="__local_write_time__";function Il(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Zf])===null||t===void 0?void 0:t.stringValue)===Jf}function so(n){const e=n.mapValue.fields[ep];return Il(e)?so(e):e}function ns(n){const e=Kt(n.mapValue.fields[tp].timestampValue);return new ge(e.seconds,e.nanos)}/**
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
 */class nT{constructor(e,t,i,s,r,o,l,c,h){this.databaseId=e,this.appId=t,this.persistenceKey=i,this.host=s,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h}}const Cr="(default)";class is{constructor(e,t){this.projectId=e,this.database=t||Cr}static empty(){return new is("","")}get isDefaultDatabase(){return this.database===Cr}isEqual(e){return e instanceof is&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const np="__type__",iT="__max__",Js={mapValue:{}},ip="__vector__",Rr="value";function Yt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Il(n)?4:rT(n)?9007199254740991:sT(n)?10:11:F()}function ct(n,e){if(n===e)return!0;const t=Yt(n);if(t!==Yt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ns(n).isEqual(ns(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const o=Kt(s.timestampValue),l=Kt(r.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,r){return Qt(s.bytesValue).isEqual(Qt(r.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,r){return fe(s.geoPointValue.latitude)===fe(r.geoPointValue.latitude)&&fe(s.geoPointValue.longitude)===fe(r.geoPointValue.longitude)}(n,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return fe(s.integerValue)===fe(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const o=fe(s.doubleValue),l=fe(r.doubleValue);return o===l?Ar(o)===Ar(l):isNaN(o)&&isNaN(l)}return!1}(n,e);case 9:return Yn(n.arrayValue.values||[],e.arrayValue.values||[],ct);case 10:case 11:return function(s,r){const o=s.mapValue.fields||{},l=r.mapValue.fields||{};if(Th(o)!==Th(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!ct(o[c],l[c])))return!1;return!0}(n,e);default:return F()}}function ss(n,e){return(n.values||[]).find(t=>ct(t,e))!==void 0}function Xn(n,e){if(n===e)return 0;const t=Yt(n),i=Yt(e);if(t!==i)return W(t,i);switch(t){case 0:case 9007199254740991:return 0;case 1:return W(n.booleanValue,e.booleanValue);case 2:return function(r,o){const l=fe(r.integerValue||r.doubleValue),c=fe(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return wh(n.timestampValue,e.timestampValue);case 4:return wh(ns(n),ns(e));case 5:return Pa(n.stringValue,e.stringValue);case 6:return function(r,o){const l=Qt(r),c=Qt(o);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(r,o){const l=r.split("/"),c=o.split("/");for(let h=0;h<l.length&&h<c.length;h++){const f=W(l[h],c[h]);if(f!==0)return f}return W(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(r,o){const l=W(fe(r.latitude),fe(o.latitude));return l!==0?l:W(fe(r.longitude),fe(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ah(n.arrayValue,e.arrayValue);case 10:return function(r,o){var l,c,h,f;const p=r.fields||{},m=o.fields||{},A=(l=p[Rr])===null||l===void 0?void 0:l.arrayValue,S=(c=m[Rr])===null||c===void 0?void 0:c.arrayValue,N=W(((h=A==null?void 0:A.values)===null||h===void 0?void 0:h.length)||0,((f=S==null?void 0:S.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:Ah(A,S)}(n.mapValue,e.mapValue);case 11:return function(r,o){if(r===Js.mapValue&&o===Js.mapValue)return 0;if(r===Js.mapValue)return 1;if(o===Js.mapValue)return-1;const l=r.fields||{},c=Object.keys(l),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const m=Pa(c[p],f[p]);if(m!==0)return m;const A=Xn(l[c[p]],h[f[p]]);if(A!==0)return A}return W(c.length,f.length)}(n.mapValue,e.mapValue);default:throw F()}}function wh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return W(n,e);const t=Kt(n),i=Kt(e),s=W(t.seconds,i.seconds);return s!==0?s:W(t.nanos,i.nanos)}function Ah(n,e){const t=n.values||[],i=e.values||[];for(let s=0;s<t.length&&s<i.length;++s){const r=Xn(t[s],i[s]);if(r)return r}return W(t.length,i.length)}function Jn(n){return Na(n)}function Na(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const i=Kt(t);return`time(${i.seconds},${i.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Qt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return x.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let i="[",s=!0;for(const r of t.values||[])s?s=!1:i+=",",i+=Na(r);return i+"]"}(n.arrayValue):"mapValue"in n?function(t){const i=Object.keys(t.fields||{}).sort();let s="{",r=!0;for(const o of i)r?r=!1:s+=",",s+=`${o}:${Na(t.fields[o])}`;return s+"}"}(n.mapValue):F()}function cr(n){switch(Yt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=so(n);return e?16+cr(e):16;case 5:return 2*n.stringValue.length;case 6:return Qt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(i){return(i.values||[]).reduce((s,r)=>s+cr(r),0)}(n.arrayValue);case 10:case 11:return function(i){let s=0;return nn(i.fields,(r,o)=>{s+=r.length+cr(o)}),s}(n.mapValue);default:throw F()}}function Ch(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Da(n){return!!n&&"integerValue"in n}function wl(n){return!!n&&"arrayValue"in n}function Rh(n){return!!n&&"nullValue"in n}function Sh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ur(n){return!!n&&"mapValue"in n}function sT(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[np])===null||t===void 0?void 0:t.stringValue)===ip}function ji(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return nn(n.mapValue.fields,(t,i)=>e.mapValue.fields[t]=ji(i)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ji(n.arrayValue.values[t]);return e}return Object.assign({},n)}function rT(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===iT}/**
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
 */class qe{constructor(e){this.value=e}static empty(){return new qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let i=0;i<e.length-1;++i)if(t=(t.mapValue.fields||{})[e.get(i)],!ur(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ji(t)}setAll(e){let t=Re.emptyPath(),i={},s=[];e.forEach((o,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,i,s),i={},s=[],t=l.popLast()}o?i[l.lastSegment()]=ji(o):s.push(l.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,i,s)}delete(e){const t=this.field(e.popLast());ur(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let i=0;i<e.length;++i){let s=t.mapValue.fields[e.get(i)];ur(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(i)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,i){nn(t,(s,r)=>e[s]=r);for(const s of i)delete e[s]}clone(){return new qe(ji(this.value))}}function sp(n){const e=[];return nn(n.fields,(t,i)=>{const s=new Re([t]);if(ur(i)){const r=sp(i.mapValue).fields;if(r.length===0)e.push(s);else for(const o of r)e.push(s.child(o))}else e.push(s)}),new ze(e)}/**
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
 */class Me{constructor(e,t,i,s,r,o,l){this.key=e,this.documentType=t,this.version=i,this.readTime=s,this.createTime=r,this.data=o,this.documentState=l}static newInvalidDocument(e){return new Me(e,0,B.min(),B.min(),B.min(),qe.empty(),0)}static newFoundDocument(e,t,i,s){return new Me(e,1,t,B.min(),i,s,0)}static newNoDocument(e,t){return new Me(e,2,t,B.min(),B.min(),qe.empty(),0)}static newUnknownDocument(e,t){return new Me(e,3,t,B.min(),B.min(),qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Sr{constructor(e,t){this.position=e,this.inclusive=t}}function bh(n,e,t){let i=0;for(let s=0;s<n.position.length;s++){const r=e[s],o=n.position[s];if(r.field.isKeyField()?i=x.comparator(x.fromName(o.referenceValue),t.key):i=Xn(o,t.data.field(r.field)),r.dir==="desc"&&(i*=-1),i!==0)break}return i}function Ph(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ct(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class rs{constructor(e,t="asc"){this.field=e,this.dir=t}}function oT(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class rp{}class _e extends rp{constructor(e,t,i){super(),this.field=e,this.op=t,this.value=i}static create(e,t,i){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,i):new lT(e,t,i):t==="array-contains"?new hT(e,i):t==="in"?new dT(e,i):t==="not-in"?new fT(e,i):t==="array-contains-any"?new pT(e,i):new _e(e,t,i)}static createKeyFieldInFilter(e,t,i){return t==="in"?new cT(e,i):new uT(e,i)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Xn(t,this.value)):t!==null&&Yt(this.value)===Yt(t)&&this.matchesComparison(Xn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tt extends rp{constructor(e,t){super(),this.filters=e,this.op=t,this.ce=null}static create(e,t){return new tt(e,t)}matches(e){return op(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ce!==null||(this.ce=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ce}getFilters(){return Object.assign([],this.filters)}}function op(n){return n.op==="and"}function ap(n){return aT(n)&&op(n)}function aT(n){for(const e of n.filters)if(e instanceof tt)return!1;return!0}function Oa(n){if(n instanceof _e)return n.field.canonicalString()+n.op.toString()+Jn(n.value);if(ap(n))return n.filters.map(e=>Oa(e)).join(",");{const e=n.filters.map(t=>Oa(t)).join(",");return`${n.op}(${e})`}}function lp(n,e){return n instanceof _e?function(i,s){return s instanceof _e&&i.op===s.op&&i.field.isEqual(s.field)&&ct(i.value,s.value)}(n,e):n instanceof tt?function(i,s){return s instanceof tt&&i.op===s.op&&i.filters.length===s.filters.length?i.filters.reduce((r,o,l)=>r&&lp(o,s.filters[l]),!0):!1}(n,e):void F()}function cp(n){return n instanceof _e?function(t){return`${t.field.canonicalString()} ${t.op} ${Jn(t.value)}`}(n):n instanceof tt?function(t){return t.op.toString()+" {"+t.getFilters().map(cp).join(" ,")+"}"}(n):"Filter"}class lT extends _e{constructor(e,t,i){super(e,t,i),this.key=x.fromName(i.referenceValue)}matches(e){const t=x.comparator(e.key,this.key);return this.matchesComparison(t)}}class cT extends _e{constructor(e,t){super(e,"in",t),this.keys=up("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class uT extends _e{constructor(e,t){super(e,"not-in",t),this.keys=up("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function up(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(i=>x.fromName(i.referenceValue))}class hT extends _e{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return wl(t)&&ss(t.arrayValue,this.value)}}class dT extends _e{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ss(this.value.arrayValue,t)}}class fT extends _e{constructor(e,t){super(e,"not-in",t)}matches(e){if(ss(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!ss(this.value.arrayValue,t)}}class pT extends _e{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!wl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(i=>ss(this.value.arrayValue,i))}}/**
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
 */class _T{constructor(e,t=null,i=[],s=[],r=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=i,this.filters=s,this.limit=r,this.startAt=o,this.endAt=l,this.le=null}}function kh(n,e=null,t=[],i=[],s=null,r=null,o=null){return new _T(n,e,t,i,s,r,o)}function Al(n){const e=q(n);if(e.le===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(i=>Oa(i)).join(","),t+="|ob:",t+=e.orderBy.map(i=>function(r){return r.field.canonicalString()+r.dir}(i)).join(","),io(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(i=>Jn(i)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(i=>Jn(i)).join(",")),e.le=t}return e.le}function Cl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!oT(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!lp(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Ph(n.startAt,e.startAt)&&Ph(n.endAt,e.endAt)}function Va(n){return x.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class fi{constructor(e,t=null,i=[],s=[],r=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=r,this.limitType=o,this.startAt=l,this.endAt=c,this.he=null,this.Pe=null,this.Te=null,this.startAt,this.endAt}}function mT(n,e,t,i,s,r,o,l){return new fi(n,e,t,i,s,r,o,l)}function hp(n){return new fi(n)}function Nh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function dp(n){return n.collectionGroup!==null}function $i(n){const e=q(n);if(e.he===null){e.he=[];const t=new Set;for(const r of e.explicitOrderBy)e.he.push(r),t.add(r.field.canonicalString());const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ye(Re.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.he.push(new rs(r,i))}),t.has(Re.keyField().canonicalString())||e.he.push(new rs(Re.keyField(),i))}return e.he}function at(n){const e=q(n);return e.Pe||(e.Pe=gT(e,$i(n))),e.Pe}function gT(n,e){if(n.limitType==="F")return kh(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const r=s.dir==="desc"?"asc":"desc";return new rs(s.field,r)});const t=n.endAt?new Sr(n.endAt.position,n.endAt.inclusive):null,i=n.startAt?new Sr(n.startAt.position,n.startAt.inclusive):null;return kh(n.path,n.collectionGroup,e,n.filters,n.limit,t,i)}}function Ma(n,e){const t=n.filters.concat([e]);return new fi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function br(n,e,t){return new fi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function ro(n,e){return Cl(at(n),at(e))&&n.limitType===e.limitType}function fp(n){return`${Al(at(n))}|lt:${n.limitType}`}function Mn(n){return`Query(target=${function(t){let i=t.path.canonicalString();return t.collectionGroup!==null&&(i+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(i+=`, filters: [${t.filters.map(s=>cp(s)).join(", ")}]`),io(t.limit)||(i+=", limit: "+t.limit),t.orderBy.length>0&&(i+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(i+=", startAt: ",i+=t.startAt.inclusive?"b:":"a:",i+=t.startAt.position.map(s=>Jn(s)).join(",")),t.endAt&&(i+=", endAt: ",i+=t.endAt.inclusive?"a:":"b:",i+=t.endAt.position.map(s=>Jn(s)).join(",")),`Target(${i})`}(at(n))}; limitType=${n.limitType})`}function oo(n,e){return e.isFoundDocument()&&function(i,s){const r=s.key.path;return i.collectionGroup!==null?s.key.hasCollectionId(i.collectionGroup)&&i.path.isPrefixOf(r):x.isDocumentKey(i.path)?i.path.isEqual(r):i.path.isImmediateParentOf(r)}(n,e)&&function(i,s){for(const r of $i(i))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(n,e)&&function(i,s){for(const r of i.filters)if(!r.matches(s))return!1;return!0}(n,e)&&function(i,s){return!(i.startAt&&!function(o,l,c){const h=bh(o,l,c);return o.inclusive?h<=0:h<0}(i.startAt,$i(i),s)||i.endAt&&!function(o,l,c){const h=bh(o,l,c);return o.inclusive?h>=0:h>0}(i.endAt,$i(i),s))}(n,e)}function yT(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function pp(n){return(e,t)=>{let i=!1;for(const s of $i(n)){const r=vT(s,e,t);if(r!==0)return r;i=i||s.field.isKeyField()}return 0}}function vT(n,e,t){const i=n.field.isKeyField()?x.comparator(e.key,t.key):function(r,o,l){const c=o.data.field(r),h=l.data.field(r);return c!==null&&h!==null?Xn(c,h):F()}(n.field,e,t);switch(n.dir){case"asc":return i;case"desc":return-1*i;default:return F()}}/**
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
 */class Cn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i!==void 0){for(const[s,r]of i)if(this.equalsFn(s,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const i=this.mapKeyFn(e),s=this.inner[i];if(s===void 0)return this.inner[i]=[[e,t]],void this.innerSize++;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return void(s[r]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),i=this.inner[t];if(i===void 0)return!1;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return i.length===1?delete this.inner[t]:i.splice(s,1),this.innerSize--,!0;return!1}forEach(e){nn(this.inner,(t,i)=>{for(const[s,r]of i)e(s,r)})}isEmpty(){return Yf(this.inner)}size(){return this.innerSize}}/**
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
 */const ET=new me(x.comparator);function At(){return ET}const _p=new me(x.comparator);function Bi(...n){let e=_p;for(const t of n)e=e.insert(t.key,t);return e}function mp(n){let e=_p;return n.forEach((t,i)=>e=e.insert(t,i.overlayedDocument)),e}function fn(){return Hi()}function gp(){return Hi()}function Hi(){return new Cn(n=>n.toString(),(n,e)=>n.isEqual(e))}const TT=new me(x.comparator),IT=new ye(x.comparator);function Y(...n){let e=IT;for(const t of n)e=e.add(t);return e}const wT=new ye(W);function AT(){return wT}/**
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
 */function Rl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ar(e)?"-0":e}}function yp(n){return{integerValue:""+n}}function CT(n,e){return JE(e)?yp(e):Rl(n,e)}/**
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
 */class ao{constructor(){this._=void 0}}function RT(n,e,t){return n instanceof Pr?function(s,r){const o={fields:{[Zf]:{stringValue:Jf},[tp]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&Il(r)&&(r=so(r)),r&&(o.fields[ep]=r),{mapValue:o}}(t,e):n instanceof os?Ep(n,e):n instanceof as?Tp(n,e):function(s,r){const o=vp(s,r),l=Dh(o)+Dh(s.Ie);return Da(o)&&Da(s.Ie)?yp(l):Rl(s.serializer,l)}(n,e)}function ST(n,e,t){return n instanceof os?Ep(n,e):n instanceof as?Tp(n,e):t}function vp(n,e){return n instanceof kr?function(i){return Da(i)||function(r){return!!r&&"doubleValue"in r}(i)}(e)?e:{integerValue:0}:null}class Pr extends ao{}class os extends ao{constructor(e){super(),this.elements=e}}function Ep(n,e){const t=Ip(e);for(const i of n.elements)t.some(s=>ct(s,i))||t.push(i);return{arrayValue:{values:t}}}class as extends ao{constructor(e){super(),this.elements=e}}function Tp(n,e){let t=Ip(e);for(const i of n.elements)t=t.filter(s=>!ct(s,i));return{arrayValue:{values:t}}}class kr extends ao{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function Dh(n){return fe(n.integerValue||n.doubleValue)}function Ip(n){return wl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function bT(n,e){return n.field.isEqual(e.field)&&function(i,s){return i instanceof os&&s instanceof os||i instanceof as&&s instanceof as?Yn(i.elements,s.elements,ct):i instanceof kr&&s instanceof kr?ct(i.Ie,s.Ie):i instanceof Pr&&s instanceof Pr}(n.transform,e.transform)}class PT{constructor(e,t){this.version=e,this.transformResults=t}}class Ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ze}static exists(e){return new Ze(void 0,e)}static updateTime(e){return new Ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function hr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class lo{}function wp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Sl(n.key,Ze.none()):new Es(n.key,n.data,Ze.none());{const t=n.data,i=qe.empty();let s=new ye(Re.comparator);for(let r of e.fields)if(!s.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?i.delete(r):i.set(r,o),s=s.add(r)}return new sn(n.key,i,new ze(s.toArray()),Ze.none())}}function kT(n,e,t){n instanceof Es?function(s,r,o){const l=s.value.clone(),c=Vh(s.fieldTransforms,r,o.transformResults);l.setAll(c),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):n instanceof sn?function(s,r,o){if(!hr(s.precondition,r))return void r.convertToUnknownDocument(o.version);const l=Vh(s.fieldTransforms,r,o.transformResults),c=r.data;c.setAll(Ap(s)),c.setAll(l),r.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):function(s,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function zi(n,e,t,i){return n instanceof Es?function(r,o,l,c){if(!hr(r.precondition,o))return l;const h=r.value.clone(),f=Mh(r.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(n,e,t,i):n instanceof sn?function(r,o,l,c){if(!hr(r.precondition,o))return l;const h=Mh(r.fieldTransforms,c,o),f=o.data;return f.setAll(Ap(r)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(p=>p.field))}(n,e,t,i):function(r,o,l){return hr(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(n,e,t)}function NT(n,e){let t=null;for(const i of n.fieldTransforms){const s=e.data.field(i.field),r=vp(i.transform,s||null);r!=null&&(t===null&&(t=qe.empty()),t.set(i.field,r))}return t||null}function Oh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(i,s){return i===void 0&&s===void 0||!(!i||!s)&&Yn(i,s,(r,o)=>bT(r,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Es extends lo{constructor(e,t,i,s=[]){super(),this.key=e,this.value=t,this.precondition=i,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class sn extends lo{constructor(e,t,i,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=i,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function Ap(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const i=n.data.field(t);e.set(t,i)}}),e}function Vh(n,e,t){const i=new Map;ee(n.length===t.length);for(let s=0;s<t.length;s++){const r=n[s],o=r.transform,l=e.data.field(r.field);i.set(r.field,ST(o,l,t[s]))}return i}function Mh(n,e,t){const i=new Map;for(const s of n){const r=s.transform,o=t.data.field(s.field);i.set(s.field,RT(r,o,e))}return i}class Sl extends lo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class DT extends lo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class OT{constructor(e,t,i,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=i,this.mutations=s}applyToRemoteDocument(e,t){const i=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const r=this.mutations[s];r.key.isEqual(e.key)&&kT(r,e,i[s])}}applyToLocalView(e,t){for(const i of this.baseMutations)i.key.isEqual(e.key)&&(t=zi(i,e,t,this.localWriteTime));for(const i of this.mutations)i.key.isEqual(e.key)&&(t=zi(i,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const i=gp();return this.mutations.forEach(s=>{const r=e.get(s.key),o=r.overlayedDocument;let l=this.applyToLocalView(o,r.mutatedFields);l=t.has(s.key)?null:l;const c=wp(o,l);c!==null&&i.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(B.min())}),i}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Y())}isEqual(e){return this.batchId===e.batchId&&Yn(this.mutations,e.mutations,(t,i)=>Oh(t,i))&&Yn(this.baseMutations,e.baseMutations,(t,i)=>Oh(t,i))}}class bl{constructor(e,t,i,s){this.batch=e,this.commitVersion=t,this.mutationResults=i,this.docVersions=s}static from(e,t,i){ee(e.mutations.length===i.length);let s=function(){return TT}();const r=e.mutations;for(let o=0;o<r.length;o++)s=s.insert(r[o].key,i[o].version);return new bl(e,t,i,s)}}/**
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
 */class VT{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class MT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var pe,X;function xT(n){switch(n){case b.OK:return F();case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return F()}}function Cp(n){if(n===void 0)return wt("GRPC error has no .code"),b.UNKNOWN;switch(n){case pe.OK:return b.OK;case pe.CANCELLED:return b.CANCELLED;case pe.UNKNOWN:return b.UNKNOWN;case pe.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case pe.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case pe.INTERNAL:return b.INTERNAL;case pe.UNAVAILABLE:return b.UNAVAILABLE;case pe.UNAUTHENTICATED:return b.UNAUTHENTICATED;case pe.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case pe.NOT_FOUND:return b.NOT_FOUND;case pe.ALREADY_EXISTS:return b.ALREADY_EXISTS;case pe.PERMISSION_DENIED:return b.PERMISSION_DENIED;case pe.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case pe.ABORTED:return b.ABORTED;case pe.OUT_OF_RANGE:return b.OUT_OF_RANGE;case pe.UNIMPLEMENTED:return b.UNIMPLEMENTED;case pe.DATA_LOSS:return b.DATA_LOSS;default:return F()}}(X=pe||(pe={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const LT=new Bt([4294967295,4294967295],0);function xh(n){const e=Gf().encode(n),t=new Bf;return t.update(e),new Uint8Array(t.digest())}function Lh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),i=e.getUint32(4,!0),s=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new Bt([t,i],0),new Bt([s,r],0)]}class Pl{constructor(e,t,i){if(this.bitmap=e,this.padding=t,this.hashCount=i,t<0||t>=8)throw new qi(`Invalid padding: ${t}`);if(i<0)throw new qi(`Invalid hash count: ${i}`);if(e.length>0&&this.hashCount===0)throw new qi(`Invalid hash count: ${i}`);if(e.length===0&&t!==0)throw new qi(`Invalid padding when bitmap length is 0: ${t}`);this.Ee=8*e.length-t,this.de=Bt.fromNumber(this.Ee)}Ae(e,t,i){let s=e.add(t.multiply(Bt.fromNumber(i)));return s.compare(LT)===1&&(s=new Bt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.de).toNumber()}Re(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.Ee===0)return!1;const t=xh(e),[i,s]=Lh(t);for(let r=0;r<this.hashCount;r++){const o=this.Ae(i,s,r);if(!this.Re(o))return!1}return!0}static create(e,t,i){const s=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new Pl(r,s,t);return i.forEach(l=>o.insert(l)),o}insert(e){if(this.Ee===0)return;const t=xh(e),[i,s]=Lh(t);for(let r=0;r<this.hashCount;r++){const o=this.Ae(i,s,r);this.Ve(o)}}Ve(e){const t=Math.floor(e/8),i=e%8;this.bitmap[t]|=1<<i}}class qi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class co{constructor(e,t,i,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=i,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,i){const s=new Map;return s.set(e,Ts.createSynthesizedTargetChangeForCurrentChange(e,t,i)),new co(B.min(),s,new me(W),At(),Y())}}class Ts{constructor(e,t,i,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=i,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,i){return new Ts(i,t,Y(),Y(),Y())}}/**
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
 */class dr{constructor(e,t,i,s){this.me=e,this.removedTargetIds=t,this.key=i,this.fe=s}}class Rp{constructor(e,t){this.targetId=e,this.ge=t}}class Sp{constructor(e,t,i=Se.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=i,this.cause=s}}class Fh{constructor(){this.pe=0,this.ye=Uh(),this.we=Se.EMPTY_BYTE_STRING,this.Se=!1,this.be=!0}get current(){return this.Se}get resumeToken(){return this.we}get De(){return this.pe!==0}get ve(){return this.be}Ce(e){e.approximateByteSize()>0&&(this.be=!0,this.we=e)}Fe(){let e=Y(),t=Y(),i=Y();return this.ye.forEach((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:i=i.add(s);break;default:F()}}),new Ts(this.we,this.Se,e,t,i)}Me(){this.be=!1,this.ye=Uh()}xe(e,t){this.be=!0,this.ye=this.ye.insert(e,t)}Oe(e){this.be=!0,this.ye=this.ye.remove(e)}Ne(){this.pe+=1}Be(){this.pe-=1,ee(this.pe>=0)}Le(){this.be=!0,this.Se=!0}}class FT{constructor(e){this.ke=e,this.qe=new Map,this.Qe=At(),this.$e=Zs(),this.Ue=Zs(),this.Ke=new me(W)}We(e){for(const t of e.me)e.fe&&e.fe.isFoundDocument()?this.Ge(t,e.fe):this.ze(t,e.key,e.fe);for(const t of e.removedTargetIds)this.ze(t,e.key,e.fe)}je(e){this.forEachTarget(e,t=>{const i=this.He(t);switch(e.state){case 0:this.Je(t)&&i.Ce(e.resumeToken);break;case 1:i.Be(),i.De||i.Me(),i.Ce(e.resumeToken);break;case 2:i.Be(),i.De||this.removeTarget(t);break;case 3:this.Je(t)&&(i.Le(),i.Ce(e.resumeToken));break;case 4:this.Je(t)&&(this.Ye(t),i.Ce(e.resumeToken));break;default:F()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.qe.forEach((i,s)=>{this.Je(s)&&t(s)})}Ze(e){const t=e.targetId,i=e.ge.count,s=this.Xe(t);if(s){const r=s.target;if(Va(r))if(i===0){const o=new x(r.path);this.ze(t,o,Me.newNoDocument(o,B.min()))}else ee(i===1);else{const o=this.et(t);if(o!==i){const l=this.tt(e),c=l?this.nt(l,e,o):1;if(c!==0){this.Ye(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,h)}}}}}tt(e){const t=e.ge.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:i="",padding:s=0},hashCount:r=0}=t;let o,l;try{o=Qt(i).toUint8Array()}catch(c){if(c instanceof Xf)return Qn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Pl(o,s,r)}catch(c){return Qn(c instanceof qi?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ee===0?null:l}nt(e,t,i){return t.ge.count===i-this.st(e,t.targetId)?0:2}st(e,t){const i=this.ke.getRemoteKeysForTarget(t);let s=0;return i.forEach(r=>{const o=this.ke.it(),l=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.ze(t,r,null),s++)}),s}ot(e){const t=new Map;this.qe.forEach((r,o)=>{const l=this.Xe(o);if(l){if(r.current&&Va(l.target)){const c=new x(l.target.path);this._t(c).has(o)||this.ut(o,c)||this.ze(o,c,Me.newNoDocument(c,e))}r.ve&&(t.set(o,r.Fe()),r.Me())}});let i=Y();this.Ue.forEach((r,o)=>{let l=!0;o.forEachWhile(c=>{const h=this.Xe(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(i=i.add(r))}),this.Qe.forEach((r,o)=>o.setReadTime(e));const s=new co(e,t,this.Ke,this.Qe,i);return this.Qe=At(),this.$e=Zs(),this.Ue=Zs(),this.Ke=new me(W),s}Ge(e,t){if(!this.Je(e))return;const i=this.ut(e,t.key)?2:0;this.He(e).xe(t.key,i),this.Qe=this.Qe.insert(t.key,t),this.$e=this.$e.insert(t.key,this._t(t.key).add(e)),this.Ue=this.Ue.insert(t.key,this.ct(t.key).add(e))}ze(e,t,i){if(!this.Je(e))return;const s=this.He(e);this.ut(e,t)?s.xe(t,1):s.Oe(t),this.Ue=this.Ue.insert(t,this.ct(t).delete(e)),this.Ue=this.Ue.insert(t,this.ct(t).add(e)),i&&(this.Qe=this.Qe.insert(t,i))}removeTarget(e){this.qe.delete(e)}et(e){const t=this.He(e).Fe();return this.ke.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ne(e){this.He(e).Ne()}He(e){let t=this.qe.get(e);return t||(t=new Fh,this.qe.set(e,t)),t}ct(e){let t=this.Ue.get(e);return t||(t=new ye(W),this.Ue=this.Ue.insert(e,t)),t}_t(e){let t=this.$e.get(e);return t||(t=new ye(W),this.$e=this.$e.insert(e,t)),t}Je(e){const t=this.Xe(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}Xe(e){const t=this.qe.get(e);return t&&t.De?null:this.ke.lt(e)}Ye(e){this.qe.set(e,new Fh),this.ke.getRemoteKeysForTarget(e).forEach(t=>{this.ze(e,t,null)})}ut(e,t){return this.ke.getRemoteKeysForTarget(e).has(t)}}function Zs(){return new me(x.comparator)}function Uh(){return new me(x.comparator)}const UT={asc:"ASCENDING",desc:"DESCENDING"},BT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},qT={and:"AND",or:"OR"};class WT{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function xa(n,e){return n.useProto3Json||io(e)?e:{value:e}}function Nr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function bp(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function jT(n,e){return Nr(n,e.toTimestamp())}function lt(n){return ee(!!n),B.fromTimestamp(function(t){const i=Kt(t);return new ge(i.seconds,i.nanos)}(n))}function kl(n,e){return La(n,e).canonicalString()}function La(n,e){const t=function(s){return new oe(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Pp(n){const e=oe.fromString(n);return ee(Vp(e)),e}function Fa(n,e){return kl(n.databaseId,e.path)}function la(n,e){const t=Pp(e);if(t.get(1)!==n.databaseId.projectId)throw new M(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new x(Np(t))}function kp(n,e){return kl(n.databaseId,e)}function $T(n){const e=Pp(n);return e.length===4?oe.emptyPath():Np(e)}function Ua(n){return new oe(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Np(n){return ee(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Bh(n,e,t){return{name:Fa(n,e),fields:t.value.mapValue.fields}}function HT(n,e){let t;if("targetChange"in e){e.targetChange;const i=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:F()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],r=function(h,f){return h.useProto3Json?(ee(f===void 0||typeof f=="string"),Se.fromBase64String(f||"")):(ee(f===void 0||f instanceof Buffer||f instanceof Uint8Array),Se.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const f=h.code===void 0?b.UNKNOWN:Cp(h.code);return new M(f,h.message||"")}(o);t=new Sp(i,s,r,l||null)}else if("documentChange"in e){e.documentChange;const i=e.documentChange;i.document,i.document.name,i.document.updateTime;const s=la(n,i.document.name),r=lt(i.document.updateTime),o=i.document.createTime?lt(i.document.createTime):B.min(),l=new qe({mapValue:{fields:i.document.fields}}),c=Me.newFoundDocument(s,r,o,l),h=i.targetIds||[],f=i.removedTargetIds||[];t=new dr(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const i=e.documentDelete;i.document;const s=la(n,i.document),r=i.readTime?lt(i.readTime):B.min(),o=Me.newNoDocument(s,r),l=i.removedTargetIds||[];t=new dr([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const i=e.documentRemove;i.document;const s=la(n,i.document),r=i.removedTargetIds||[];t=new dr([],r,s,null)}else{if(!("filter"in e))return F();{e.filter;const i=e.filter;i.targetId;const{count:s=0,unchangedNames:r}=i,o=new MT(s,r),l=i.targetId;t=new Rp(l,o)}}return t}function zT(n,e){let t;if(e instanceof Es)t={update:Bh(n,e.key,e.value)};else if(e instanceof Sl)t={delete:Fa(n,e.key)};else if(e instanceof sn)t={update:Bh(n,e.key,e.data),updateMask:tI(e.fieldMask)};else{if(!(e instanceof DT))return F();t={verify:Fa(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(i=>function(r,o){const l=o.transform;if(l instanceof Pr)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof os)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof as)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof kr)return{fieldPath:o.field.canonicalString(),increment:l.Ie};throw F()}(0,i))),e.precondition.isNone||(t.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:jT(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:F()}(n,e.precondition)),t}function GT(n,e){return n&&n.length>0?(ee(e!==void 0),n.map(t=>function(s,r){let o=s.updateTime?lt(s.updateTime):lt(r);return o.isEqual(B.min())&&(o=lt(r)),new PT(o,s.transformResults||[])}(t,e))):[]}function KT(n,e){return{documents:[kp(n,e.path)]}}function QT(n,e){const t={structuredQuery:{}},i=e.path;let s;e.collectionGroup!==null?(s=i,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=i.popLast(),t.structuredQuery.from=[{collectionId:i.lastSegment()}]),t.parent=kp(n,s);const r=function(h){if(h.length!==0)return Op(tt.create(h,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const o=function(h){if(h.length!==0)return h.map(f=>function(m){return{field:xn(m.field),direction:JT(m.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=xa(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{ht:t,parent:s}}function YT(n){let e=$T(n.parent);const t=n.structuredQuery,i=t.from?t.from.length:0;let s=null;if(i>0){ee(i===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=function(p){const m=Dp(p);return m instanceof tt&&ap(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(S){return new rs(Ln(S.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,io(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(p){const m=!!p.before,A=p.values||[];return new Sr(A,m)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const m=!p.before,A=p.values||[];return new Sr(A,m)}(t.endAt)),mT(e,s,o,r,l,"F",c,h)}function XT(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Dp(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const i=Ln(t.unaryFilter.field);return _e.create(i,"==",{doubleValue:NaN});case"IS_NULL":const s=Ln(t.unaryFilter.field);return _e.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Ln(t.unaryFilter.field);return _e.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Ln(t.unaryFilter.field);return _e.create(o,"!=",{nullValue:"NULL_VALUE"});default:return F()}}(n):n.fieldFilter!==void 0?function(t){return _e.create(Ln(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return F()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return tt.create(t.compositeFilter.filters.map(i=>Dp(i)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return F()}}(t.compositeFilter.op))}(n):F()}function JT(n){return UT[n]}function ZT(n){return BT[n]}function eI(n){return qT[n]}function xn(n){return{fieldPath:n.canonicalString()}}function Ln(n){return Re.fromServerFormat(n.fieldPath)}function Op(n){return n instanceof _e?function(t){if(t.op==="=="){if(Sh(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NAN"}};if(Rh(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Sh(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NOT_NAN"}};if(Rh(t.value))return{unaryFilter:{field:xn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:xn(t.field),op:ZT(t.op),value:t.value}}}(n):n instanceof tt?function(t){const i=t.getFilters().map(s=>Op(s));return i.length===1?i[0]:{compositeFilter:{op:eI(t.op),filters:i}}}(n):F()}function tI(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Vp(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class xt{constructor(e,t,i,s,r=B.min(),o=B.min(),l=Se.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=i,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new xt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class nI{constructor(e){this.Tt=e}}function iI(n){const e=YT({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?br(e,e.limit,"L"):e}/**
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
 */class sI{constructor(){this.Tn=new rI}addToCollectionParentIndex(e,t){return this.Tn.add(t),P.resolve()}getCollectionParents(e,t){return P.resolve(this.Tn.getEntries(t))}addFieldIndex(e,t){return P.resolve()}deleteFieldIndex(e,t){return P.resolve()}deleteAllFieldIndexes(e){return P.resolve()}createTargetIndexes(e,t){return P.resolve()}getDocumentsMatchingTarget(e,t){return P.resolve(null)}getIndexType(e,t){return P.resolve(0)}getFieldIndexes(e,t){return P.resolve([])}getNextCollectionGroupToUpdate(e){return P.resolve(null)}getMinOffset(e,t){return P.resolve(Gt.min())}getMinOffsetFromCollectionGroup(e,t){return P.resolve(Gt.min())}updateCollectionGroup(e,t,i){return P.resolve()}updateIndexEntries(e,t){return P.resolve()}}class rI{constructor(){this.index={}}add(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t]||new ye(oe.comparator),r=!s.has(i);return this.index[t]=s.add(i),r}has(e){const t=e.lastSegment(),i=e.popLast(),s=this.index[t];return s&&s.has(i)}getEntries(e){return(this.index[e]||new ye(oe.comparator)).toArray()}}/**
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
 */const qh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Mp=41943040;class Be{static withCacheSize(e){return new Be(e,Be.DEFAULT_COLLECTION_PERCENTILE,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,i){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=i}}/**
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
 */Be.DEFAULT_COLLECTION_PERCENTILE=10,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Be.DEFAULT=new Be(Mp,Be.DEFAULT_COLLECTION_PERCENTILE,Be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Be.DISABLED=new Be(-1,0,0);/**
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
 */class Zn{constructor(e){this.$n=e}next(){return this.$n+=2,this.$n}static Un(){return new Zn(0)}static Kn(){return new Zn(-1)}}/**
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
 */const Wh="LruGarbageCollector",oI=1048576;function jh([n,e],[t,i]){const s=W(n,t);return s===0?W(e,i):s}class aI{constructor(e){this.Hn=e,this.buffer=new ye(jh),this.Jn=0}Yn(){return++this.Jn}Zn(e){const t=[e,this.Yn()];if(this.buffer.size<this.Hn)this.buffer=this.buffer.add(t);else{const i=this.buffer.last();jh(t,i)<0&&(this.buffer=this.buffer.delete(i).add(t))}}get maxValue(){return this.buffer.last()[0]}}class lI{constructor(e,t,i){this.garbageCollector=e,this.asyncQueue=t,this.localStore=i,this.Xn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.er(6e4)}stop(){this.Xn&&(this.Xn.cancel(),this.Xn=null)}get started(){return this.Xn!==null}er(e){V(Wh,`Garbage collection scheduled in ${e}ms`),this.Xn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Xn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){di(t)?V(Wh,"Ignoring IndexedDB error during garbage collection: ",t):await hi(t)}await this.er(3e5)})}}class cI{constructor(e,t){this.tr=e,this.params=t}calculateTargetCount(e,t){return this.tr.nr(e).next(i=>Math.floor(t/100*i))}nthSequenceNumber(e,t){if(t===0)return P.resolve(no.ae);const i=new aI(t);return this.tr.forEachTarget(e,s=>i.Zn(s.sequenceNumber)).next(()=>this.tr.rr(e,s=>i.Zn(s))).next(()=>i.maxValue)}removeTargets(e,t,i){return this.tr.removeTargets(e,t,i)}removeOrphanedDocuments(e,t){return this.tr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),P.resolve(qh)):this.getCacheSize(e).next(i=>i<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${i} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),qh):this.ir(e,t))}getCacheSize(e){return this.tr.getCacheSize(e)}ir(e,t){let i,s,r,o,l,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(i=p,l=Date.now(),this.removeTargets(e,i,t))).next(p=>(r=p,c=Date.now(),this.removeOrphanedDocuments(e,i))).next(p=>(h=Date.now(),Vn()<=G.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(l-o)+`ms
	Removed ${r} targets in `+(c-l)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),P.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:r,documentsRemoved:p})))}}function uI(n,e){return new cI(n,e)}/**
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
 */class hI{constructor(){this.changes=new Cn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const i=this.changes.get(t);return i!==void 0?P.resolve(i):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class dI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class fI{constructor(e,t,i,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=i,this.indexManager=s}getDocument(e,t){let i=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(i=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(i!==null&&zi(i.mutation,s,ze.empty(),ge.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.getLocalViewOfDocuments(e,i,Y()).next(()=>i))}getLocalViewOfDocuments(e,t,i=Y()){const s=fn();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,i).next(r=>{let o=Bi();return r.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const i=fn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,Y()))}populateOverlays(e,t,i){const s=[];return i.forEach(r=>{t.has(r)||s.push(r)}),this.documentOverlayCache.getOverlays(e,s).next(r=>{r.forEach((o,l)=>{t.set(o,l)})})}computeViews(e,t,i,s){let r=At();const o=Hi(),l=function(){return Hi()}();return t.forEach((c,h)=>{const f=i.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof sn)?r=r.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),zi(f.mutation,h,f.mutation.getFieldMask(),ge.now())):o.set(h.key,ze.empty())}),this.recalculateAndSaveOverlays(e,r).next(c=>(c.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var p;return l.set(h,new dI(f,(p=o.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const i=Hi();let s=new me((o,l)=>o-l),r=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const l of o)l.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=i.get(c)||ze.empty();f=l.applyToLocalView(h,f),i.set(c,f);const p=(s.get(l.batchId)||Y()).add(c);s=s.insert(l.batchId,p)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,f=c.value,p=gp();f.forEach(m=>{if(!r.has(m)){const A=wp(t.get(m),i.get(m));A!==null&&p.set(m,A),r=r.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return P.waitFor(o)}).next(()=>i)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(i=>this.recalculateAndSaveOverlays(e,i))}getDocumentsMatchingQuery(e,t,i,s){return function(o){return x.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):dp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,i,s):this.getDocumentsMatchingCollectionQuery(e,t,i,s)}getNextDocuments(e,t,i,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,i,s).next(r=>{const o=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,i.largestBatchId,s-r.size):P.resolve(fn());let l=ts,c=r;return o.next(h=>P.forEach(h,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),r.get(f)?P.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{c=c.insert(f,m)}))).next(()=>this.populateOverlays(e,h,r)).next(()=>this.computeViews(e,c,h,Y())).next(f=>({batchId:l,changes:mp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new x(t)).next(i=>{let s=Bi();return i.isFoundDocument()&&(s=s.insert(i.key,i)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,i,s){const r=t.collectionGroup;let o=Bi();return this.indexManager.getCollectionParents(e,r).next(l=>P.forEach(l,c=>{const h=function(p,m){return new fi(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,c.child(r));return this.getDocumentsMatchingCollectionQuery(e,h,i,s).next(f=>{f.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,i,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,i.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,i,r,s))).next(o=>{r.forEach((c,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,Me.newInvalidDocument(f)))});let l=Bi();return o.forEach((c,h)=>{const f=r.get(c);f!==void 0&&zi(f.mutation,h,ze.empty(),ge.now()),oo(t,h)&&(l=l.insert(c,h))}),l})}}/**
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
 */class pI{constructor(e){this.serializer=e,this.dr=new Map,this.Ar=new Map}getBundleMetadata(e,t){return P.resolve(this.dr.get(t))}saveBundleMetadata(e,t){return this.dr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:lt(s.createTime)}}(t)),P.resolve()}getNamedQuery(e,t){return P.resolve(this.Ar.get(t))}saveNamedQuery(e,t){return this.Ar.set(t.name,function(s){return{name:s.name,query:iI(s.bundledQuery),readTime:lt(s.readTime)}}(t)),P.resolve()}}/**
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
 */class _I{constructor(){this.overlays=new me(x.comparator),this.Rr=new Map}getOverlay(e,t){return P.resolve(this.overlays.get(t))}getOverlays(e,t){const i=fn();return P.forEach(t,s=>this.getOverlay(e,s).next(r=>{r!==null&&i.set(s,r)})).next(()=>i)}saveOverlays(e,t,i){return i.forEach((s,r)=>{this.Et(e,t,r)}),P.resolve()}removeOverlaysForBatchId(e,t,i){const s=this.Rr.get(i);return s!==void 0&&(s.forEach(r=>this.overlays=this.overlays.remove(r)),this.Rr.delete(i)),P.resolve()}getOverlaysForCollection(e,t,i){const s=fn(),r=t.length+1,o=new x(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===r&&c.largestBatchId>i&&s.set(c.getKey(),c)}return P.resolve(s)}getOverlaysForCollectionGroup(e,t,i,s){let r=new me((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>i){let f=r.get(h.largestBatchId);f===null&&(f=fn(),r=r.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=fn(),c=r.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=s)););return P.resolve(l)}Et(e,t,i){const s=this.overlays.get(i.key);if(s!==null){const o=this.Rr.get(s.largestBatchId).delete(i.key);this.Rr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(i.key,new VT(t,i));let r=this.Rr.get(t);r===void 0&&(r=Y(),this.Rr.set(t,r)),this.Rr.set(t,r.add(i.key))}}/**
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
 */class mI{constructor(){this.sessionToken=Se.EMPTY_BYTE_STRING}getSessionToken(e){return P.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,P.resolve()}}/**
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
 */class Nl{constructor(){this.Vr=new ye(Ee.mr),this.gr=new ye(Ee.pr)}isEmpty(){return this.Vr.isEmpty()}addReference(e,t){const i=new Ee(e,t);this.Vr=this.Vr.add(i),this.gr=this.gr.add(i)}yr(e,t){e.forEach(i=>this.addReference(i,t))}removeReference(e,t){this.wr(new Ee(e,t))}Sr(e,t){e.forEach(i=>this.removeReference(i,t))}br(e){const t=new x(new oe([])),i=new Ee(t,e),s=new Ee(t,e+1),r=[];return this.gr.forEachInRange([i,s],o=>{this.wr(o),r.push(o.key)}),r}Dr(){this.Vr.forEach(e=>this.wr(e))}wr(e){this.Vr=this.Vr.delete(e),this.gr=this.gr.delete(e)}vr(e){const t=new x(new oe([])),i=new Ee(t,e),s=new Ee(t,e+1);let r=Y();return this.gr.forEachInRange([i,s],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new Ee(e,0),i=this.Vr.firstAfterOrEqual(t);return i!==null&&e.isEqual(i.key)}}class Ee{constructor(e,t){this.key=e,this.Cr=t}static mr(e,t){return x.comparator(e.key,t.key)||W(e.Cr,t.Cr)}static pr(e,t){return W(e.Cr,t.Cr)||x.comparator(e.key,t.key)}}/**
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
 */class gI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Fr=1,this.Mr=new ye(Ee.mr)}checkEmpty(e){return P.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,i,s){const r=this.Fr;this.Fr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new OT(r,t,i,s);this.mutationQueue.push(o);for(const l of s)this.Mr=this.Mr.add(new Ee(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return P.resolve(o)}lookupMutationBatch(e,t){return P.resolve(this.Or(t))}getNextMutationBatchAfterBatchId(e,t){const i=t+1,s=this.Nr(i),r=s<0?0:s;return P.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return P.resolve(this.mutationQueue.length===0?Tl:this.Fr-1)}getAllMutationBatches(e){return P.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const i=new Ee(t,0),s=new Ee(t,Number.POSITIVE_INFINITY),r=[];return this.Mr.forEachInRange([i,s],o=>{const l=this.Or(o.Cr);r.push(l)}),P.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let i=new ye(W);return t.forEach(s=>{const r=new Ee(s,0),o=new Ee(s,Number.POSITIVE_INFINITY);this.Mr.forEachInRange([r,o],l=>{i=i.add(l.Cr)})}),P.resolve(this.Br(i))}getAllMutationBatchesAffectingQuery(e,t){const i=t.path,s=i.length+1;let r=i;x.isDocumentKey(r)||(r=r.child(""));const o=new Ee(new x(r),0);let l=new ye(W);return this.Mr.forEachWhile(c=>{const h=c.key.path;return!!i.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.Cr)),!0)},o),P.resolve(this.Br(l))}Br(e){const t=[];return e.forEach(i=>{const s=this.Or(i);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){ee(this.Lr(t.batchId,"removed")===0),this.mutationQueue.shift();let i=this.Mr;return P.forEach(t.mutations,s=>{const r=new Ee(s.key,t.batchId);return i=i.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Mr=i})}qn(e){}containsKey(e,t){const i=new Ee(t,0),s=this.Mr.firstAfterOrEqual(i);return P.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,P.resolve()}Lr(e,t){return this.Nr(e)}Nr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Or(e){const t=this.Nr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class yI{constructor(e){this.kr=e,this.docs=function(){return new me(x.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const i=t.key,s=this.docs.get(i),r=s?s.size:0,o=this.kr(t);return this.docs=this.docs.insert(i,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,i.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const i=this.docs.get(t);return P.resolve(i?i.document.mutableCopy():Me.newInvalidDocument(t))}getEntries(e,t){let i=At();return t.forEach(s=>{const r=this.docs.get(s);i=i.insert(s,r?r.document.mutableCopy():Me.newInvalidDocument(s))}),P.resolve(i)}getDocumentsMatchingQuery(e,t,i,s){let r=At();const o=t.path,l=new x(o.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||KE(GE(f),i)<=0||(s.has(f.key)||oo(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return P.resolve(r)}getAllFromCollectionGroup(e,t,i,s){F()}qr(e,t){return P.forEach(this.docs,i=>t(i))}newChangeBuffer(e){return new vI(this)}getSize(e){return P.resolve(this.size)}}class vI extends hI{constructor(e){super(),this.Ir=e}applyChanges(e){const t=[];return this.changes.forEach((i,s)=>{s.isValidDocument()?t.push(this.Ir.addEntry(e,s)):this.Ir.removeEntry(i)}),P.waitFor(t)}getFromCache(e,t){return this.Ir.getEntry(e,t)}getAllFromCache(e,t){return this.Ir.getEntries(e,t)}}/**
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
 */class EI{constructor(e){this.persistence=e,this.Qr=new Cn(t=>Al(t),Cl),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.$r=0,this.Ur=new Nl,this.targetCount=0,this.Kr=Zn.Un()}forEachTarget(e,t){return this.Qr.forEach((i,s)=>t(s)),P.resolve()}getLastRemoteSnapshotVersion(e){return P.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return P.resolve(this.$r)}allocateTargetId(e){return this.highestTargetId=this.Kr.next(),P.resolve(this.highestTargetId)}setTargetsMetadata(e,t,i){return i&&(this.lastRemoteSnapshotVersion=i),t>this.$r&&(this.$r=t),P.resolve()}zn(e){this.Qr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Kr=new Zn(t),this.highestTargetId=t),e.sequenceNumber>this.$r&&(this.$r=e.sequenceNumber)}addTargetData(e,t){return this.zn(t),this.targetCount+=1,P.resolve()}updateTargetData(e,t){return this.zn(t),P.resolve()}removeTargetData(e,t){return this.Qr.delete(t.target),this.Ur.br(t.targetId),this.targetCount-=1,P.resolve()}removeTargets(e,t,i){let s=0;const r=[];return this.Qr.forEach((o,l)=>{l.sequenceNumber<=t&&i.get(l.targetId)===null&&(this.Qr.delete(o),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),P.waitFor(r).next(()=>s)}getTargetCount(e){return P.resolve(this.targetCount)}getTargetData(e,t){const i=this.Qr.get(t)||null;return P.resolve(i)}addMatchingKeys(e,t,i){return this.Ur.yr(t,i),P.resolve()}removeMatchingKeys(e,t,i){this.Ur.Sr(t,i);const s=this.persistence.referenceDelegate,r=[];return s&&t.forEach(o=>{r.push(s.markPotentiallyOrphaned(e,o))}),P.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Ur.br(t),P.resolve()}getMatchingKeysForTargetId(e,t){const i=this.Ur.vr(t);return P.resolve(i)}containsKey(e,t){return P.resolve(this.Ur.containsKey(t))}}/**
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
 */class xp{constructor(e,t){this.Wr={},this.overlays={},this.Gr=new no(0),this.zr=!1,this.zr=!0,this.jr=new mI,this.referenceDelegate=e(this),this.Hr=new EI(this),this.indexManager=new sI,this.remoteDocumentCache=function(s){return new yI(s)}(i=>this.referenceDelegate.Jr(i)),this.serializer=new nI(t),this.Yr=new pI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.zr=!1,Promise.resolve()}get started(){return this.zr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new _I,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let i=this.Wr[e.toKey()];return i||(i=new gI(t,this.referenceDelegate),this.Wr[e.toKey()]=i),i}getGlobalsCache(){return this.jr}getTargetCache(){return this.Hr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Yr}runTransaction(e,t,i){V("MemoryPersistence","Starting transaction:",e);const s=new TI(this.Gr.next());return this.referenceDelegate.Zr(),i(s).next(r=>this.referenceDelegate.Xr(s).next(()=>r)).toPromise().then(r=>(s.raiseOnCommittedEvent(),r))}ei(e,t){return P.or(Object.values(this.Wr).map(i=>()=>i.containsKey(e,t)))}}class TI extends YE{constructor(e){super(),this.currentSequenceNumber=e}}class Dl{constructor(e){this.persistence=e,this.ti=new Nl,this.ni=null}static ri(e){return new Dl(e)}get ii(){if(this.ni)return this.ni;throw F()}addReference(e,t,i){return this.ti.addReference(i,t),this.ii.delete(i.toString()),P.resolve()}removeReference(e,t,i){return this.ti.removeReference(i,t),this.ii.add(i.toString()),P.resolve()}markPotentiallyOrphaned(e,t){return this.ii.add(t.toString()),P.resolve()}removeTarget(e,t){this.ti.br(t.targetId).forEach(s=>this.ii.add(s.toString()));const i=this.persistence.getTargetCache();return i.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(r=>this.ii.add(r.toString()))}).next(()=>i.removeTargetData(e,t))}Zr(){this.ni=new Set}Xr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return P.forEach(this.ii,i=>{const s=x.fromPath(i);return this.si(e,s).next(r=>{r||t.removeEntry(s,B.min())})}).next(()=>(this.ni=null,t.apply(e)))}updateLimboDocument(e,t){return this.si(e,t).next(i=>{i?this.ii.delete(t.toString()):this.ii.add(t.toString())})}Jr(e){return 0}si(e,t){return P.or([()=>P.resolve(this.ti.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.ei(e,t)])}}class Dr{constructor(e,t){this.persistence=e,this.oi=new Cn(i=>ZE(i.path),(i,s)=>i.isEqual(s)),this.garbageCollector=uI(this,t)}static ri(e,t){return new Dr(e,t)}Zr(){}Xr(e){return P.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}nr(e){const t=this.sr(e);return this.persistence.getTargetCache().getTargetCount(e).next(i=>t.next(s=>i+s))}sr(e){let t=0;return this.rr(e,i=>{t++}).next(()=>t)}rr(e,t){return P.forEach(this.oi,(i,s)=>this.ar(e,i,s).next(r=>r?P.resolve():t(s)))}removeTargets(e,t,i){return this.persistence.getTargetCache().removeTargets(e,t,i)}removeOrphanedDocuments(e,t){let i=0;const s=this.persistence.getRemoteDocumentCache(),r=s.newChangeBuffer();return s.qr(e,o=>this.ar(e,o,t).next(l=>{l||(i++,r.removeEntry(o,B.min()))})).next(()=>r.apply(e)).next(()=>i)}markPotentiallyOrphaned(e,t){return this.oi.set(t,e.currentSequenceNumber),P.resolve()}removeTarget(e,t){const i=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,i)}addReference(e,t,i){return this.oi.set(i,e.currentSequenceNumber),P.resolve()}removeReference(e,t,i){return this.oi.set(i,e.currentSequenceNumber),P.resolve()}updateLimboDocument(e,t){return this.oi.set(t,e.currentSequenceNumber),P.resolve()}Jr(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=cr(e.data.value)),t}ar(e,t,i){return P.or([()=>this.persistence.ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.oi.get(t);return P.resolve(s!==void 0&&s>i)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class Ol{constructor(e,t,i,s){this.targetId=e,this.fromCache=t,this.Hi=i,this.Ji=s}static Yi(e,t){let i=Y(),s=Y();for(const r of t.docChanges)switch(r.type){case 0:i=i.add(r.doc.key);break;case 1:s=s.add(r.doc.key)}return new Ol(e,t.fromCache,i,s)}}/**
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
 */class II{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class wI{constructor(){this.Zi=!1,this.Xi=!1,this.es=100,this.ts=function(){return gg()?8:XE(xe())>0?6:4}()}initialize(e,t){this.ns=e,this.indexManager=t,this.Zi=!0}getDocumentsMatchingQuery(e,t,i,s){const r={result:null};return this.rs(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.ss(e,t,s,i).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new II;return this._s(e,t,o).next(l=>{if(r.result=l,this.Xi)return this.us(e,t,o,l.size)})}).next(()=>r.result)}us(e,t,i,s){return i.documentReadCount<this.es?(Vn()<=G.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Mn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.es,"documents"),P.resolve()):(Vn()<=G.DEBUG&&V("QueryEngine","Query:",Mn(t),"scans",i.documentReadCount,"local documents and returns",s,"documents as results."),i.documentReadCount>this.ts*s?(Vn()<=G.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Mn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,at(t))):P.resolve())}rs(e,t){if(Nh(t))return P.resolve(null);let i=at(t);return this.indexManager.getIndexType(e,i).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=br(t,null,"F"),i=at(t)),this.indexManager.getDocumentsMatchingTarget(e,i).next(r=>{const o=Y(...r);return this.ns.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,i).next(c=>{const h=this.cs(t,l);return this.ls(t,h,o,c.readTime)?this.rs(e,br(t,null,"F")):this.hs(e,h,t,c)}))})))}ss(e,t,i,s){return Nh(t)||s.isEqual(B.min())?P.resolve(null):this.ns.getDocuments(e,i).next(r=>{const o=this.cs(t,r);return this.ls(t,o,i,s)?P.resolve(null):(Vn()<=G.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Mn(t)),this.hs(e,o,t,zE(s,ts)).next(l=>l))})}cs(e,t){let i=new ye(pp(e));return t.forEach((s,r)=>{oo(e,r)&&(i=i.add(r))}),i}ls(e,t,i,s){if(e.limit===null)return!1;if(i.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}_s(e,t,i){return Vn()<=G.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Mn(t)),this.ns.getDocumentsMatchingQuery(e,t,Gt.min(),i)}hs(e,t,i,s){return this.ns.getDocumentsMatchingQuery(e,i,s).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
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
 */const Vl="LocalStore",AI=3e8;class CI{constructor(e,t,i,s){this.persistence=e,this.Ps=t,this.serializer=s,this.Ts=new me(W),this.Is=new Cn(r=>Al(r),Cl),this.Es=new Map,this.ds=e.getRemoteDocumentCache(),this.Hr=e.getTargetCache(),this.Yr=e.getBundleCache(),this.As(i)}As(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new fI(this.ds,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ds.setIndexManager(this.indexManager),this.Ps.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ts))}}function RI(n,e,t,i){return new CI(n,e,t,i)}async function Lp(n,e){const t=q(n);return await t.persistence.runTransaction("Handle user change","readonly",i=>{let s;return t.mutationQueue.getAllMutationBatches(i).next(r=>(s=r,t.As(e),t.mutationQueue.getAllMutationBatches(i))).next(r=>{const o=[],l=[];let c=Y();for(const h of s){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of r){l.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(i,c).next(h=>({Rs:h,removedBatchIds:o,addedBatchIds:l}))})})}function SI(n,e){const t=q(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",i=>{const s=e.batch.keys(),r=t.ds.newChangeBuffer({trackRemovals:!0});return function(l,c,h,f){const p=h.batch,m=p.keys();let A=P.resolve();return m.forEach(S=>{A=A.next(()=>f.getEntry(c,S)).next(N=>{const k=h.docVersions.get(S);ee(k!==null),N.version.compareTo(k)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),A.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(t,i,e,r).next(()=>r.apply(i)).next(()=>t.mutationQueue.performConsistencyCheck(i)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(i,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(i,function(l){let c=Y();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(i,s))})}function Fp(n){const e=q(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Hr.getLastRemoteSnapshotVersion(t))}function bI(n,e){const t=q(n),i=e.snapshotVersion;let s=t.Ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.ds.newChangeBuffer({trackRemovals:!0});s=t.Ts;const l=[];e.targetChanges.forEach((f,p)=>{const m=s.get(p);if(!m)return;l.push(t.Hr.removeMatchingKeys(r,f.removedDocuments,p).next(()=>t.Hr.addMatchingKeys(r,f.addedDocuments,p)));let A=m.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(p)!==null?A=A.withResumeToken(Se.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(A=A.withResumeToken(f.resumeToken,i)),s=s.insert(p,A),function(N,k,j){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=AI?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0}(m,A,f)&&l.push(t.Hr.updateTargetData(r,A))});let c=At(),h=Y();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))}),l.push(PI(r,o,e.documentUpdates).next(f=>{c=f.Vs,h=f.fs})),!i.isEqual(B.min())){const f=t.Hr.getLastRemoteSnapshotVersion(r).next(p=>t.Hr.setTargetsMetadata(r,r.currentSequenceNumber,i));l.push(f)}return P.waitFor(l).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,c,h)).next(()=>c)}).then(r=>(t.Ts=s,r))}function PI(n,e,t){let i=Y(),s=Y();return t.forEach(r=>i=i.add(r)),e.getEntries(n,i).next(r=>{let o=At();return t.forEach((l,c)=>{const h=r.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(B.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):V(Vl,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Vs:o,fs:s}})}function kI(n,e){const t=q(n);return t.persistence.runTransaction("Get next mutation batch","readonly",i=>(e===void 0&&(e=Tl),t.mutationQueue.getNextMutationBatchAfterBatchId(i,e)))}function NI(n,e){const t=q(n);return t.persistence.runTransaction("Allocate target","readwrite",i=>{let s;return t.Hr.getTargetData(i,e).next(r=>r?(s=r,P.resolve(s)):t.Hr.allocateTargetId(i).next(o=>(s=new xt(e,o,"TargetPurposeListen",i.currentSequenceNumber),t.Hr.addTargetData(i,s).next(()=>s))))}).then(i=>{const s=t.Ts.get(i.targetId);return(s===null||i.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ts=t.Ts.insert(i.targetId,i),t.Is.set(e,i.targetId)),i})}async function Ba(n,e,t){const i=q(n),s=i.Ts.get(e),r=t?"readwrite":"readwrite-primary";try{t||await i.persistence.runTransaction("Release target",r,o=>i.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!di(o))throw o;V(Vl,`Failed to update sequence numbers for target ${e}: ${o}`)}i.Ts=i.Ts.remove(e),i.Is.delete(s.target)}function $h(n,e,t){const i=q(n);let s=B.min(),r=Y();return i.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,f){const p=q(c),m=p.Is.get(f);return m!==void 0?P.resolve(p.Ts.get(m)):p.Hr.getTargetData(h,f)}(i,o,at(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,i.Hr.getMatchingKeysForTargetId(o,l.targetId).next(c=>{r=c})}).next(()=>i.Ps.getDocumentsMatchingQuery(o,e,t?s:B.min(),t?r:Y())).next(l=>(DI(i,yT(e),l),{documents:l,gs:r})))}function DI(n,e,t){let i=n.Es.get(e)||B.min();t.forEach((s,r)=>{r.readTime.compareTo(i)>0&&(i=r.readTime)}),n.Es.set(e,i)}class Hh{constructor(){this.activeTargetIds=AT()}Ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}vs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}bs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class OI{constructor(){this.ho=new Hh,this.Po={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,i){}addLocalQueryTarget(e,t=!0){return t&&this.ho.Ds(e),this.Po[e]||"not-current"}updateQueryState(e,t,i){this.Po[e]=t}removeLocalQueryTarget(e){this.ho.vs(e)}isLocalQueryTarget(e){return this.ho.activeTargetIds.has(e)}clearQueryState(e){delete this.Po[e]}getAllActiveQueryTargets(){return this.ho.activeTargetIds}isActiveQueryTarget(e){return this.ho.activeTargetIds.has(e)}start(){return this.ho=new Hh,Promise.resolve()}handleUserChange(e,t,i){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class VI{To(e){}shutdown(){}}/**
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
 */const zh="ConnectivityMonitor";class Gh{constructor(){this.Io=()=>this.Eo(),this.Ao=()=>this.Ro(),this.Vo=[],this.mo()}To(e){this.Vo.push(e)}shutdown(){window.removeEventListener("online",this.Io),window.removeEventListener("offline",this.Ao)}mo(){window.addEventListener("online",this.Io),window.addEventListener("offline",this.Ao)}Eo(){V(zh,"Network connectivity changed: AVAILABLE");for(const e of this.Vo)e(0)}Ro(){V(zh,"Network connectivity changed: UNAVAILABLE");for(const e of this.Vo)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let er=null;function qa(){return er===null?er=function(){return 268435456+Math.round(2147483648*Math.random())}():er++,"0x"+er.toString(16)}/**
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
 */const ca="RestConnection",MI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class xI{get fo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.po=t+"://"+e.host,this.yo=`projects/${i}/databases/${s}`,this.wo=this.databaseId.database===Cr?`project_id=${i}`:`project_id=${i}&database_id=${s}`}So(e,t,i,s,r){const o=qa(),l=this.bo(e,t.toUriEncodedString());V(ca,`Sending RPC '${e}' ${o}:`,l,i);const c={"google-cloud-resource-prefix":this.yo,"x-goog-request-params":this.wo};return this.Do(c,s,r),this.vo(e,l,c,i).then(h=>(V(ca,`Received RPC '${e}' ${o}: `,h),h),h=>{throw Qn(ca,`RPC '${e}' ${o} failed with error: `,h,"url: ",l,"request:",i),h})}Co(e,t,i,s,r,o){return this.So(e,t,i,s,r)}Do(e,t,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ui}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,r)=>e[r]=s),i&&i.headers.forEach((s,r)=>e[r]=s)}bo(e,t){const i=MI[e];return`${this.po}/v1/${t}:${i}`}terminate(){}}/**
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
 */class LI{constructor(e){this.Fo=e.Fo,this.Mo=e.Mo}xo(e){this.Oo=e}No(e){this.Bo=e}Lo(e){this.ko=e}onMessage(e){this.qo=e}close(){this.Mo()}send(e){this.Fo(e)}Qo(){this.Oo()}$o(){this.Bo()}Uo(e){this.ko(e)}Ko(e){this.qo(e)}}/**
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
 */const Oe="WebChannelConnection";class FI extends xI{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}vo(e,t,i,s){const r=qa();return new Promise((o,l)=>{const c=new qf;c.setWithCredentials(!0),c.listenOnce(Wf.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case lr.NO_ERROR:const f=c.getResponseJson();V(Oe,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(f)),o(f);break;case lr.TIMEOUT:V(Oe,`RPC '${e}' ${r} timed out`),l(new M(b.DEADLINE_EXCEEDED,"Request time out"));break;case lr.HTTP_ERROR:const p=c.getStatus();if(V(Oe,`RPC '${e}' ${r} failed with status:`,p,"response text:",c.getResponseText()),p>0){let m=c.getResponseJson();Array.isArray(m)&&(m=m[0]);const A=m==null?void 0:m.error;if(A&&A.status&&A.message){const S=function(k){const j=k.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(j)>=0?j:b.UNKNOWN}(A.status);l(new M(S,A.message))}else l(new M(b.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new M(b.UNAVAILABLE,"Connection failed."));break;default:F()}}finally{V(Oe,`RPC '${e}' ${r} completed.`)}});const h=JSON.stringify(s);V(Oe,`RPC '${e}' ${r} sending request:`,s),c.send(t,"POST",h,i,15)})}Wo(e,t,i){const s=qa(),r=[this.po,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Hf(),l=$f(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Do(c.initMessageHeaders,t,i),c.encodeInitMessageHeaders=!0;const f=r.join("");V(Oe,`Creating RPC '${e}' stream ${s}: ${f}`,c);const p=o.createWebChannel(f,c);let m=!1,A=!1;const S=new LI({Fo:k=>{A?V(Oe,`Not sending because RPC '${e}' stream ${s} is closed:`,k):(m||(V(Oe,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),V(Oe,`RPC '${e}' stream ${s} sending:`,k),p.send(k))},Mo:()=>p.close()}),N=(k,j,z)=>{k.listen(j,Q=>{try{z(Q)}catch(ae){setTimeout(()=>{throw ae},0)}})};return N(p,Ui.EventType.OPEN,()=>{A||(V(Oe,`RPC '${e}' stream ${s} transport opened.`),S.Qo())}),N(p,Ui.EventType.CLOSE,()=>{A||(A=!0,V(Oe,`RPC '${e}' stream ${s} transport closed`),S.Uo())}),N(p,Ui.EventType.ERROR,k=>{A||(A=!0,Qn(Oe,`RPC '${e}' stream ${s} transport errored:`,k),S.Uo(new M(b.UNAVAILABLE,"The operation could not be completed")))}),N(p,Ui.EventType.MESSAGE,k=>{var j;if(!A){const z=k.data[0];ee(!!z);const Q=z,ae=(Q==null?void 0:Q.error)||((j=Q[0])===null||j===void 0?void 0:j.error);if(ae){V(Oe,`RPC '${e}' stream ${s} received error:`,ae);const Ge=ae.status;let de=function(v){const E=pe[v];if(E!==void 0)return Cp(E)}(Ge),T=ae.message;de===void 0&&(de=b.INTERNAL,T="Unknown error status: "+Ge+" with message "+ae.message),A=!0,S.Uo(new M(de,T)),p.close()}else V(Oe,`RPC '${e}' stream ${s} received:`,z),S.Ko(z)}}),N(l,jf.STAT_EVENT,k=>{k.stat===ba.PROXY?V(Oe,`RPC '${e}' stream ${s} detected buffering proxy`):k.stat===ba.NOPROXY&&V(Oe,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.$o()},0),S}}function ua(){return typeof document<"u"?document:null}/**
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
 */function uo(n){return new WT(n,!0)}/**
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
 */class Up{constructor(e,t,i=1e3,s=1.5,r=6e4){this.Ti=e,this.timerId=t,this.Go=i,this.zo=s,this.jo=r,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const t=Math.floor(this.Ho+this.e_()),i=Math.max(0,Date.now()-this.Yo),s=Math.max(0,t-i);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ho} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,s,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
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
 */const Kh="PersistentStream";class Bp{constructor(e,t,i,s,r,o,l,c){this.Ti=e,this.n_=i,this.r_=s,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.i_=0,this.s_=null,this.o_=null,this.stream=null,this.__=0,this.a_=new Up(e,t)}u_(){return this.state===1||this.state===5||this.c_()}c_(){return this.state===2||this.state===3}start(){this.__=0,this.state!==4?this.auth():this.l_()}async stop(){this.u_()&&await this.close(0)}h_(){this.state=0,this.a_.reset()}P_(){this.c_()&&this.s_===null&&(this.s_=this.Ti.enqueueAfterDelay(this.n_,6e4,()=>this.T_()))}I_(e){this.E_(),this.stream.send(e)}async T_(){if(this.c_())return this.close(0)}E_(){this.s_&&(this.s_.cancel(),this.s_=null)}d_(){this.o_&&(this.o_.cancel(),this.o_=null)}async close(e,t){this.E_(),this.d_(),this.a_.cancel(),this.i_++,e!==4?this.a_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(wt(t.toString()),wt("Using maximum backoff delay to prevent overloading the backend."),this.a_.Zo()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.A_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Lo(t)}A_(){}auth(){this.state=1;const e=this.R_(this.i_),t=this.i_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([i,s])=>{this.i_===t&&this.V_(i,s)},i=>{e(()=>{const s=new M(b.UNKNOWN,"Fetching auth token failed: "+i.message);return this.m_(s)})})}V_(e,t){const i=this.R_(this.i_);this.stream=this.f_(e,t),this.stream.xo(()=>{i(()=>this.listener.xo())}),this.stream.No(()=>{i(()=>(this.state=2,this.o_=this.Ti.enqueueAfterDelay(this.r_,1e4,()=>(this.c_()&&(this.state=3),Promise.resolve())),this.listener.No()))}),this.stream.Lo(s=>{i(()=>this.m_(s))}),this.stream.onMessage(s=>{i(()=>++this.__==1?this.g_(s):this.onNext(s))})}l_(){this.state=5,this.a_.Xo(async()=>{this.state=0,this.start()})}m_(e){return V(Kh,`close with error: ${e}`),this.stream=null,this.close(4,e)}R_(e){return t=>{this.Ti.enqueueAndForget(()=>this.i_===e?t():(V(Kh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class UI extends Bp{constructor(e,t,i,s,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,i,s,o),this.serializer=r}f_(e,t){return this.connection.Wo("Listen",e,t)}g_(e){return this.onNext(e)}onNext(e){this.a_.reset();const t=HT(this.serializer,e),i=function(r){if(!("targetChange"in r))return B.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?B.min():o.readTime?lt(o.readTime):B.min()}(e);return this.listener.p_(t,i)}y_(e){const t={};t.database=Ua(this.serializer),t.addTarget=function(r,o){let l;const c=o.target;if(l=Va(c)?{documents:KT(r,c)}:{query:QT(r,c).ht},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=bp(r,o.resumeToken);const h=xa(r,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(B.min())>0){l.readTime=Nr(r,o.snapshotVersion.toTimestamp());const h=xa(r,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const i=XT(this.serializer,e);i&&(t.labels=i),this.I_(t)}w_(e){const t={};t.database=Ua(this.serializer),t.removeTarget=e,this.I_(t)}}class BI extends Bp{constructor(e,t,i,s,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,i,s,o),this.serializer=r}get S_(){return this.__>0}start(){this.lastStreamToken=void 0,super.start()}A_(){this.S_&&this.b_([])}f_(e,t){return this.connection.Wo("Write",e,t)}g_(e){return ee(!!e.streamToken),this.lastStreamToken=e.streamToken,ee(!e.writeResults||e.writeResults.length===0),this.listener.D_()}onNext(e){ee(!!e.streamToken),this.lastStreamToken=e.streamToken,this.a_.reset();const t=GT(e.writeResults,e.commitTime),i=lt(e.commitTime);return this.listener.v_(i,t)}C_(){const e={};e.database=Ua(this.serializer),this.I_(e)}b_(e){const t={streamToken:this.lastStreamToken,writes:e.map(i=>zT(this.serializer,i))};this.I_(t)}}/**
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
 */class qI{}class WI extends qI{constructor(e,t,i,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=i,this.serializer=s,this.F_=!1}M_(){if(this.F_)throw new M(b.FAILED_PRECONDITION,"The client has already been terminated.")}So(e,t,i,s){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.So(e,La(t,i),s,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new M(b.UNKNOWN,r.toString())})}Co(e,t,i,s,r){return this.M_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Co(e,La(t,i),s,o,l,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new M(b.UNKNOWN,o.toString())})}terminate(){this.F_=!0,this.connection.terminate()}}class jI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.x_=0,this.O_=null,this.N_=!0}B_(){this.x_===0&&(this.L_("Unknown"),this.O_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.O_=null,this.k_("Backend didn't respond within 10 seconds."),this.L_("Offline"),Promise.resolve())))}q_(e){this.state==="Online"?this.L_("Unknown"):(this.x_++,this.x_>=1&&(this.Q_(),this.k_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.L_("Offline")))}set(e){this.Q_(),this.x_=0,e==="Online"&&(this.N_=!1),this.L_(e)}L_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}k_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.N_?(wt(t),this.N_=!1):V("OnlineStateTracker",t)}Q_(){this.O_!==null&&(this.O_.cancel(),this.O_=null)}}/**
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
 */const vn="RemoteStore";class $I{constructor(e,t,i,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=i,this.remoteSyncer={},this.U_=[],this.K_=new Map,this.W_=new Set,this.G_=[],this.z_=r,this.z_.To(o=>{i.enqueueAndForget(async()=>{Rn(this)&&(V(vn,"Restarting streams for network reachability change."),await async function(c){const h=q(c);h.W_.add(4),await Is(h),h.j_.set("Unknown"),h.W_.delete(4),await ho(h)}(this))})}),this.j_=new jI(i,s)}}async function ho(n){if(Rn(n))for(const e of n.G_)await e(!0)}async function Is(n){for(const e of n.G_)await e(!1)}function qp(n,e){const t=q(n);t.K_.has(e.targetId)||(t.K_.set(e.targetId,e),Fl(t)?Ll(t):pi(t).c_()&&xl(t,e))}function Ml(n,e){const t=q(n),i=pi(t);t.K_.delete(e),i.c_()&&Wp(t,e),t.K_.size===0&&(i.c_()?i.P_():Rn(t)&&t.j_.set("Unknown"))}function xl(n,e){if(n.H_.Ne(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}pi(n).y_(e)}function Wp(n,e){n.H_.Ne(e),pi(n).w_(e)}function Ll(n){n.H_=new FT({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),lt:e=>n.K_.get(e)||null,it:()=>n.datastore.serializer.databaseId}),pi(n).start(),n.j_.B_()}function Fl(n){return Rn(n)&&!pi(n).u_()&&n.K_.size>0}function Rn(n){return q(n).W_.size===0}function jp(n){n.H_=void 0}async function HI(n){n.j_.set("Online")}async function zI(n){n.K_.forEach((e,t)=>{xl(n,e)})}async function GI(n,e){jp(n),Fl(n)?(n.j_.q_(e),Ll(n)):n.j_.set("Unknown")}async function KI(n,e,t){if(n.j_.set("Online"),e instanceof Sp&&e.state===2&&e.cause)try{await async function(s,r){const o=r.cause;for(const l of r.targetIds)s.K_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.K_.delete(l),s.H_.removeTarget(l))}(n,e)}catch(i){V(vn,"Failed to remove targets %s: %s ",e.targetIds.join(","),i),await Or(n,i)}else if(e instanceof dr?n.H_.We(e):e instanceof Rp?n.H_.Ze(e):n.H_.je(e),!t.isEqual(B.min()))try{const i=await Fp(n.localStore);t.compareTo(i)>=0&&await function(r,o){const l=r.H_.ot(o);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=r.K_.get(h);f&&r.K_.set(h,f.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,h)=>{const f=r.K_.get(c);if(!f)return;r.K_.set(c,f.withResumeToken(Se.EMPTY_BYTE_STRING,f.snapshotVersion)),Wp(r,c);const p=new xt(f.target,c,h,f.sequenceNumber);xl(r,p)}),r.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(i){V(vn,"Failed to raise snapshot:",i),await Or(n,i)}}async function Or(n,e,t){if(!di(e))throw e;n.W_.add(1),await Is(n),n.j_.set("Offline"),t||(t=()=>Fp(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V(vn,"Retrying IndexedDB access"),await t(),n.W_.delete(1),await ho(n)})}function $p(n,e){return e().catch(t=>Or(n,t,e))}async function fo(n){const e=q(n),t=Xt(e);let i=e.U_.length>0?e.U_[e.U_.length-1].batchId:Tl;for(;QI(e);)try{const s=await kI(e.localStore,i);if(s===null){e.U_.length===0&&t.P_();break}i=s.batchId,YI(e,s)}catch(s){await Or(e,s)}Hp(e)&&zp(e)}function QI(n){return Rn(n)&&n.U_.length<10}function YI(n,e){n.U_.push(e);const t=Xt(n);t.c_()&&t.S_&&t.b_(e.mutations)}function Hp(n){return Rn(n)&&!Xt(n).u_()&&n.U_.length>0}function zp(n){Xt(n).start()}async function XI(n){Xt(n).C_()}async function JI(n){const e=Xt(n);for(const t of n.U_)e.b_(t.mutations)}async function ZI(n,e,t){const i=n.U_.shift(),s=bl.from(i,e,t);await $p(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await fo(n)}async function ew(n,e){e&&Xt(n).S_&&await async function(i,s){if(function(o){return xT(o)&&o!==b.ABORTED}(s.code)){const r=i.U_.shift();Xt(i).h_(),await $p(i,()=>i.remoteSyncer.rejectFailedWrite(r.batchId,s)),await fo(i)}}(n,e),Hp(n)&&zp(n)}async function Qh(n,e){const t=q(n);t.asyncQueue.verifyOperationInProgress(),V(vn,"RemoteStore received new credentials");const i=Rn(t);t.W_.add(3),await Is(t),i&&t.j_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.W_.delete(3),await ho(t)}async function tw(n,e){const t=q(n);e?(t.W_.delete(2),await ho(t)):e||(t.W_.add(2),await Is(t),t.j_.set("Unknown"))}function pi(n){return n.J_||(n.J_=function(t,i,s){const r=q(t);return r.M_(),new UI(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{xo:HI.bind(null,n),No:zI.bind(null,n),Lo:GI.bind(null,n),p_:KI.bind(null,n)}),n.G_.push(async e=>{e?(n.J_.h_(),Fl(n)?Ll(n):n.j_.set("Unknown")):(await n.J_.stop(),jp(n))})),n.J_}function Xt(n){return n.Y_||(n.Y_=function(t,i,s){const r=q(t);return r.M_(),new BI(i,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(n.datastore,n.asyncQueue,{xo:()=>Promise.resolve(),No:XI.bind(null,n),Lo:ew.bind(null,n),D_:JI.bind(null,n),v_:ZI.bind(null,n)}),n.G_.push(async e=>{e?(n.Y_.h_(),await fo(n)):(await n.Y_.stop(),n.U_.length>0&&(V(vn,`Stopping write stream with ${n.U_.length} pending writes`),n.U_=[]))})),n.Y_}/**
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
 */class Ul{constructor(e,t,i,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=r,this.deferred=new qt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,r){const o=Date.now()+i,l=new Ul(e,t,o,s,r);return l.start(i),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Bl(n,e){if(wt("AsyncQueue",`${e}: ${n}`),di(n))return new M(b.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class jn{static emptySet(e){return new jn(e.comparator)}constructor(e){this.comparator=e?(t,i)=>e(t,i)||x.comparator(t.key,i.key):(t,i)=>x.comparator(t.key,i.key),this.keyedMap=Bi(),this.sortedSet=new me(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,i)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof jn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),i=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,r=i.getNext().key;if(!s.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const i=new jn;return i.comparator=this.comparator,i.keyedMap=e,i.sortedSet=t,i}}/**
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
 */class Yh{constructor(){this.Z_=new me(x.comparator)}track(e){const t=e.doc.key,i=this.Z_.get(t);i?e.type!==0&&i.type===3?this.Z_=this.Z_.insert(t,e):e.type===3&&i.type!==1?this.Z_=this.Z_.insert(t,{type:i.type,doc:e.doc}):e.type===2&&i.type===2?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):e.type===2&&i.type===0?this.Z_=this.Z_.insert(t,{type:0,doc:e.doc}):e.type===1&&i.type===0?this.Z_=this.Z_.remove(t):e.type===1&&i.type===2?this.Z_=this.Z_.insert(t,{type:1,doc:i.doc}):e.type===0&&i.type===1?this.Z_=this.Z_.insert(t,{type:2,doc:e.doc}):F():this.Z_=this.Z_.insert(t,e)}X_(){const e=[];return this.Z_.inorderTraversal((t,i)=>{e.push(i)}),e}}class ei{constructor(e,t,i,s,r,o,l,c,h){this.query=e,this.docs=t,this.oldDocs=i,this.docChanges=s,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,i,s,r){const o=[];return t.forEach(l=>{o.push({type:0,doc:l})}),new ei(e,t,jn.emptySet(t),o,i,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ro(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,i=e.docChanges;if(t.length!==i.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==i[s].type||!t[s].doc.isEqual(i[s].doc))return!1;return!0}}/**
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
 */class nw{constructor(){this.ea=void 0,this.ta=[]}na(){return this.ta.some(e=>e.ra())}}class iw{constructor(){this.queries=Xh(),this.onlineState="Unknown",this.ia=new Set}terminate(){(function(t,i){const s=q(t),r=s.queries;s.queries=Xh(),r.forEach((o,l)=>{for(const c of l.ta)c.onError(i)})})(this,new M(b.ABORTED,"Firestore shutting down"))}}function Xh(){return new Cn(n=>fp(n),ro)}async function sw(n,e){const t=q(n);let i=3;const s=e.query;let r=t.queries.get(s);r?!r.na()&&e.ra()&&(i=2):(r=new nw,i=e.ra()?0:1);try{switch(i){case 0:r.ea=await t.onListen(s,!0);break;case 1:r.ea=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const l=Bl(o,`Initialization of query '${Mn(e.query)}' failed`);return void e.onError(l)}t.queries.set(s,r),r.ta.push(e),e.sa(t.onlineState),r.ea&&e.oa(r.ea)&&ql(t)}async function rw(n,e){const t=q(n),i=e.query;let s=3;const r=t.queries.get(i);if(r){const o=r.ta.indexOf(e);o>=0&&(r.ta.splice(o,1),r.ta.length===0?s=e.ra()?0:1:!r.na()&&e.ra()&&(s=2))}switch(s){case 0:return t.queries.delete(i),t.onUnlisten(i,!0);case 1:return t.queries.delete(i),t.onUnlisten(i,!1);case 2:return t.onLastRemoteStoreUnlisten(i);default:return}}function ow(n,e){const t=q(n);let i=!1;for(const s of e){const r=s.query,o=t.queries.get(r);if(o){for(const l of o.ta)l.oa(s)&&(i=!0);o.ea=s}}i&&ql(t)}function aw(n,e,t){const i=q(n),s=i.queries.get(e);if(s)for(const r of s.ta)r.onError(t);i.queries.delete(e)}function ql(n){n.ia.forEach(e=>{e.next()})}var Wa,Jh;(Jh=Wa||(Wa={}))._a="default",Jh.Cache="cache";class lw{constructor(e,t,i){this.query=e,this.aa=t,this.ua=!1,this.ca=null,this.onlineState="Unknown",this.options=i||{}}oa(e){if(!this.options.includeMetadataChanges){const i=[];for(const s of e.docChanges)s.type!==3&&i.push(s);e=new ei(e.query,e.docs,e.oldDocs,i,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.ua?this.la(e)&&(this.aa.next(e),t=!0):this.ha(e,this.onlineState)&&(this.Pa(e),t=!0),this.ca=e,t}onError(e){this.aa.error(e)}sa(e){this.onlineState=e;let t=!1;return this.ca&&!this.ua&&this.ha(this.ca,e)&&(this.Pa(this.ca),t=!0),t}ha(e,t){if(!e.fromCache||!this.ra())return!0;const i=t!=="Offline";return(!this.options.Ta||!i)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}la(e){if(e.docChanges.length>0)return!0;const t=this.ca&&this.ca.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Pa(e){e=ei.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.ua=!0,this.aa.next(e)}ra(){return this.options.source!==Wa.Cache}}/**
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
 */class Gp{constructor(e){this.key=e}}class Kp{constructor(e){this.key=e}}class cw{constructor(e,t){this.query=e,this.fa=t,this.ga=null,this.hasCachedResults=!1,this.current=!1,this.pa=Y(),this.mutatedKeys=Y(),this.ya=pp(e),this.wa=new jn(this.ya)}get Sa(){return this.fa}ba(e,t){const i=t?t.Da:new Yh,s=t?t.wa:this.wa;let r=t?t.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,p)=>{const m=s.get(f),A=oo(this.query,p)?p:null,S=!!m&&this.mutatedKeys.has(m.key),N=!!A&&(A.hasLocalMutations||this.mutatedKeys.has(A.key)&&A.hasCommittedMutations);let k=!1;m&&A?m.data.isEqual(A.data)?S!==N&&(i.track({type:3,doc:A}),k=!0):this.va(m,A)||(i.track({type:2,doc:A}),k=!0,(c&&this.ya(A,c)>0||h&&this.ya(A,h)<0)&&(l=!0)):!m&&A?(i.track({type:0,doc:A}),k=!0):m&&!A&&(i.track({type:1,doc:m}),k=!0,(c||h)&&(l=!0)),k&&(A?(o=o.add(A),r=N?r.add(f):r.delete(f)):(o=o.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),r=r.delete(f.key),i.track({type:1,doc:f})}return{wa:o,Da:i,ls:l,mutatedKeys:r}}va(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,i,s){const r=this.wa;this.wa=e.wa,this.mutatedKeys=e.mutatedKeys;const o=e.Da.X_();o.sort((f,p)=>function(A,S){const N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F()}};return N(A)-N(S)}(f.type,p.type)||this.ya(f.doc,p.doc)),this.Ca(i),s=s!=null&&s;const l=t&&!s?this.Fa():[],c=this.pa.size===0&&this.current&&!s?1:0,h=c!==this.ga;return this.ga=c,o.length!==0||h?{snapshot:new ei(this.query,e.wa,r,o,e.mutatedKeys,c===0,h,!1,!!i&&i.resumeToken.approximateByteSize()>0),Ma:l}:{Ma:l}}sa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({wa:this.wa,Da:new Yh,mutatedKeys:this.mutatedKeys,ls:!1},!1)):{Ma:[]}}xa(e){return!this.fa.has(e)&&!!this.wa.has(e)&&!this.wa.get(e).hasLocalMutations}Ca(e){e&&(e.addedDocuments.forEach(t=>this.fa=this.fa.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.fa=this.fa.delete(t)),this.current=e.current)}Fa(){if(!this.current)return[];const e=this.pa;this.pa=Y(),this.wa.forEach(i=>{this.xa(i.key)&&(this.pa=this.pa.add(i.key))});const t=[];return e.forEach(i=>{this.pa.has(i)||t.push(new Kp(i))}),this.pa.forEach(i=>{e.has(i)||t.push(new Gp(i))}),t}Oa(e){this.fa=e.gs,this.pa=Y();const t=this.ba(e.documents);return this.applyChanges(t,!0)}Na(){return ei.fromInitialDocuments(this.query,this.wa,this.mutatedKeys,this.ga===0,this.hasCachedResults)}}const Wl="SyncEngine";class uw{constructor(e,t,i){this.query=e,this.targetId=t,this.view=i}}class hw{constructor(e){this.key=e,this.Ba=!1}}class dw{constructor(e,t,i,s,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=i,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.La={},this.ka=new Cn(l=>fp(l),ro),this.qa=new Map,this.Qa=new Set,this.$a=new me(x.comparator),this.Ua=new Map,this.Ka=new Nl,this.Wa={},this.Ga=new Map,this.za=Zn.Kn(),this.onlineState="Unknown",this.ja=void 0}get isPrimaryClient(){return this.ja===!0}}async function fw(n,e,t=!0){const i=e_(n);let s;const r=i.ka.get(e);return r?(i.sharedClientState.addLocalQueryTarget(r.targetId),s=r.view.Na()):s=await Qp(i,e,t,!0),s}async function pw(n,e){const t=e_(n);await Qp(t,e,!0,!1)}async function Qp(n,e,t,i){const s=await NI(n.localStore,at(e)),r=s.targetId,o=n.sharedClientState.addLocalQueryTarget(r,t);let l;return i&&(l=await _w(n,e,r,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&qp(n.remoteStore,s),l}async function _w(n,e,t,i,s){n.Ha=(p,m,A)=>async function(N,k,j,z){let Q=k.view.ba(j);Q.ls&&(Q=await $h(N.localStore,k.query,!1).then(({documents:T})=>k.view.ba(T,Q)));const ae=z&&z.targetChanges.get(k.targetId),Ge=z&&z.targetMismatches.get(k.targetId)!=null,de=k.view.applyChanges(Q,N.isPrimaryClient,ae,Ge);return ed(N,k.targetId,de.Ma),de.snapshot}(n,p,m,A);const r=await $h(n.localStore,e,!0),o=new cw(e,r.gs),l=o.ba(r.documents),c=Ts.createSynthesizedTargetChangeForCurrentChange(t,i&&n.onlineState!=="Offline",s),h=o.applyChanges(l,n.isPrimaryClient,c);ed(n,t,h.Ma);const f=new uw(e,t,o);return n.ka.set(e,f),n.qa.has(t)?n.qa.get(t).push(e):n.qa.set(t,[e]),h.snapshot}async function mw(n,e,t){const i=q(n),s=i.ka.get(e),r=i.qa.get(s.targetId);if(r.length>1)return i.qa.set(s.targetId,r.filter(o=>!ro(o,e))),void i.ka.delete(e);i.isPrimaryClient?(i.sharedClientState.removeLocalQueryTarget(s.targetId),i.sharedClientState.isActiveQueryTarget(s.targetId)||await Ba(i.localStore,s.targetId,!1).then(()=>{i.sharedClientState.clearQueryState(s.targetId),t&&Ml(i.remoteStore,s.targetId),ja(i,s.targetId)}).catch(hi)):(ja(i,s.targetId),await Ba(i.localStore,s.targetId,!0))}async function gw(n,e){const t=q(n),i=t.ka.get(e),s=t.qa.get(i.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(i.targetId),Ml(t.remoteStore,i.targetId))}async function yw(n,e,t){const i=Cw(n);try{const s=await function(o,l){const c=q(o),h=ge.now(),f=l.reduce((A,S)=>A.add(S.key),Y());let p,m;return c.persistence.runTransaction("Locally write mutations","readwrite",A=>{let S=At(),N=Y();return c.ds.getEntries(A,f).next(k=>{S=k,S.forEach((j,z)=>{z.isValidDocument()||(N=N.add(j))})}).next(()=>c.localDocuments.getOverlayedDocuments(A,S)).next(k=>{p=k;const j=[];for(const z of l){const Q=NT(z,p.get(z.key).overlayedDocument);Q!=null&&j.push(new sn(z.key,Q,sp(Q.value.mapValue),Ze.exists(!0)))}return c.mutationQueue.addMutationBatch(A,h,j,l)}).next(k=>{m=k;const j=k.applyToLocalDocumentSet(p,N);return c.documentOverlayCache.saveOverlays(A,k.batchId,j)})}).then(()=>({batchId:m.batchId,changes:mp(p)}))}(i.localStore,e);i.sharedClientState.addPendingMutation(s.batchId),function(o,l,c){let h=o.Wa[o.currentUser.toKey()];h||(h=new me(W)),h=h.insert(l,c),o.Wa[o.currentUser.toKey()]=h}(i,s.batchId,t),await ws(i,s.changes),await fo(i.remoteStore)}catch(s){const r=Bl(s,"Failed to persist write");t.reject(r)}}async function Yp(n,e){const t=q(n);try{const i=await bI(t.localStore,e);e.targetChanges.forEach((s,r)=>{const o=t.Ua.get(r);o&&(ee(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ba=!0:s.modifiedDocuments.size>0?ee(o.Ba):s.removedDocuments.size>0&&(ee(o.Ba),o.Ba=!1))}),await ws(t,i,e)}catch(i){await hi(i)}}function Zh(n,e,t){const i=q(n);if(i.isPrimaryClient&&t===0||!i.isPrimaryClient&&t===1){const s=[];i.ka.forEach((r,o)=>{const l=o.view.sa(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const c=q(o);c.onlineState=l;let h=!1;c.queries.forEach((f,p)=>{for(const m of p.ta)m.sa(l)&&(h=!0)}),h&&ql(c)}(i.eventManager,e),s.length&&i.La.p_(s),i.onlineState=e,i.isPrimaryClient&&i.sharedClientState.setOnlineState(e)}}async function vw(n,e,t){const i=q(n);i.sharedClientState.updateQueryState(e,"rejected",t);const s=i.Ua.get(e),r=s&&s.key;if(r){let o=new me(x.comparator);o=o.insert(r,Me.newNoDocument(r,B.min()));const l=Y().add(r),c=new co(B.min(),new Map,new me(W),o,l);await Yp(i,c),i.$a=i.$a.remove(r),i.Ua.delete(e),jl(i)}else await Ba(i.localStore,e,!1).then(()=>ja(i,e,t)).catch(hi)}async function Ew(n,e){const t=q(n),i=e.batch.batchId;try{const s=await SI(t.localStore,e);Jp(t,i,null),Xp(t,i),t.sharedClientState.updateMutationState(i,"acknowledged"),await ws(t,s)}catch(s){await hi(s)}}async function Tw(n,e,t){const i=q(n);try{const s=await function(o,l){const c=q(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,l).next(p=>(ee(p!==null),f=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(i.localStore,e);Jp(i,e,t),Xp(i,e),i.sharedClientState.updateMutationState(e,"rejected",t),await ws(i,s)}catch(s){await hi(s)}}function Xp(n,e){(n.Ga.get(e)||[]).forEach(t=>{t.resolve()}),n.Ga.delete(e)}function Jp(n,e,t){const i=q(n);let s=i.Wa[i.currentUser.toKey()];if(s){const r=s.get(e);r&&(t?r.reject(t):r.resolve(),s=s.remove(e)),i.Wa[i.currentUser.toKey()]=s}}function ja(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const i of n.qa.get(e))n.ka.delete(i),t&&n.La.Ja(i,t);n.qa.delete(e),n.isPrimaryClient&&n.Ka.br(e).forEach(i=>{n.Ka.containsKey(i)||Zp(n,i)})}function Zp(n,e){n.Qa.delete(e.path.canonicalString());const t=n.$a.get(e);t!==null&&(Ml(n.remoteStore,t),n.$a=n.$a.remove(e),n.Ua.delete(t),jl(n))}function ed(n,e,t){for(const i of t)i instanceof Gp?(n.Ka.addReference(i.key,e),Iw(n,i)):i instanceof Kp?(V(Wl,"Document no longer in limbo: "+i.key),n.Ka.removeReference(i.key,e),n.Ka.containsKey(i.key)||Zp(n,i.key)):F()}function Iw(n,e){const t=e.key,i=t.path.canonicalString();n.$a.get(t)||n.Qa.has(i)||(V(Wl,"New document in limbo: "+t),n.Qa.add(i),jl(n))}function jl(n){for(;n.Qa.size>0&&n.$a.size<n.maxConcurrentLimboResolutions;){const e=n.Qa.values().next().value;n.Qa.delete(e);const t=new x(oe.fromString(e)),i=n.za.next();n.Ua.set(i,new hw(t)),n.$a=n.$a.insert(t,i),qp(n.remoteStore,new xt(at(hp(t.path)),i,"TargetPurposeLimboResolution",no.ae))}}async function ws(n,e,t){const i=q(n),s=[],r=[],o=[];i.ka.isEmpty()||(i.ka.forEach((l,c)=>{o.push(i.Ha(c,e,t).then(h=>{var f;if((h||t)&&i.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;i.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=Ol.Yi(c.targetId,h);r.push(p)}}))}),await Promise.all(o),i.La.p_(s),await async function(c,h){const f=q(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>P.forEach(h,m=>P.forEach(m.Hi,A=>f.persistence.referenceDelegate.addReference(p,m.targetId,A)).next(()=>P.forEach(m.Ji,A=>f.persistence.referenceDelegate.removeReference(p,m.targetId,A)))))}catch(p){if(!di(p))throw p;V(Vl,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const A=f.Ts.get(m),S=A.snapshotVersion,N=A.withLastLimboFreeSnapshotVersion(S);f.Ts=f.Ts.insert(m,N)}}}(i.localStore,r))}async function ww(n,e){const t=q(n);if(!t.currentUser.isEqual(e)){V(Wl,"User change. New user:",e.toKey());const i=await Lp(t.localStore,e);t.currentUser=e,function(r,o){r.Ga.forEach(l=>{l.forEach(c=>{c.reject(new M(b.CANCELLED,o))})}),r.Ga.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,i.removedBatchIds,i.addedBatchIds),await ws(t,i.Rs)}}function Aw(n,e){const t=q(n),i=t.Ua.get(e);if(i&&i.Ba)return Y().add(i.key);{let s=Y();const r=t.qa.get(e);if(!r)return s;for(const o of r){const l=t.ka.get(o);s=s.unionWith(l.view.Sa)}return s}}function e_(n){const e=q(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Yp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Aw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=vw.bind(null,e),e.La.p_=ow.bind(null,e.eventManager),e.La.Ja=aw.bind(null,e.eventManager),e}function Cw(n){const e=q(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Ew.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Tw.bind(null,e),e}class Vr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=uo(e.databaseInfo.databaseId),this.sharedClientState=this.Za(e),this.persistence=this.Xa(e),await this.persistence.start(),this.localStore=this.eu(e),this.gcScheduler=this.tu(e,this.localStore),this.indexBackfillerScheduler=this.nu(e,this.localStore)}tu(e,t){return null}nu(e,t){return null}eu(e){return RI(this.persistence,new wI,e.initialUser,this.serializer)}Xa(e){return new xp(Dl.ri,this.serializer)}Za(e){return new OI}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Vr.provider={build:()=>new Vr};class Rw extends Vr{constructor(e){super(),this.cacheSizeBytes=e}tu(e,t){ee(this.persistence.referenceDelegate instanceof Dr);const i=this.persistence.referenceDelegate.garbageCollector;return new lI(i,e.asyncQueue,t)}Xa(e){const t=this.cacheSizeBytes!==void 0?Be.withCacheSize(this.cacheSizeBytes):Be.DEFAULT;return new xp(i=>Dr.ri(i,t),this.serializer)}}class $a{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=i=>Zh(this.syncEngine,i,1),this.remoteStore.remoteSyncer.handleCredentialChange=ww.bind(null,this.syncEngine),await tw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new iw}()}createDatastore(e){const t=uo(e.databaseInfo.databaseId),i=function(r){return new FI(r)}(e.databaseInfo);return function(r,o,l,c){return new WI(r,o,l,c)}(e.authCredentials,e.appCheckCredentials,i,t)}createRemoteStore(e){return function(i,s,r,o,l){return new $I(i,s,r,o,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Zh(this.syncEngine,t,0),function(){return Gh.D()?new Gh:new VI}())}createSyncEngine(e,t){return function(s,r,o,l,c,h,f){const p=new dw(s,r,o,l,c,h);return f&&(p.ja=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const r=q(s);V(vn,"RemoteStore shutting down."),r.W_.add(5),await Is(r),r.z_.shutdown(),r.j_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}$a.provider={build:()=>new $a};/**
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
 */class Sw{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.iu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.iu(this.observer.error,e):wt("Uncaught Error in snapshot listener:",e.toString()))}su(){this.muted=!0}iu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Jt="FirestoreClient";class bw{constructor(e,t,i,s,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=i,this.databaseInfo=s,this.user=Ve.UNAUTHENTICATED,this.clientId=Kf.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(i,async o=>{V(Jt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(i,o=>(V(Jt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new qt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const i=Bl(t,"Failed to shutdown persistence");e.reject(i)}}),e.promise}}async function ha(n,e){n.asyncQueue.verifyOperationInProgress(),V(Jt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let i=t.initialUser;n.setCredentialChangeListener(async s=>{i.isEqual(s)||(await Lp(e.localStore,s),i=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function td(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Pw(n);V(Jt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(i=>Qh(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,s)=>Qh(e.remoteStore,s)),n._onlineComponents=e}async function Pw(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(Jt,"Using user provided OfflineComponentProvider");try{await ha(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===b.FAILED_PRECONDITION||s.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;Qn("Error using user provided cache. Falling back to memory cache: "+t),await ha(n,new Vr)}}else V(Jt,"Using default OfflineComponentProvider"),await ha(n,new Rw(void 0));return n._offlineComponents}async function t_(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(Jt,"Using user provided OnlineComponentProvider"),await td(n,n._uninitializedComponentsProvider._online)):(V(Jt,"Using default OnlineComponentProvider"),await td(n,new $a))),n._onlineComponents}function kw(n){return t_(n).then(e=>e.syncEngine)}async function Nw(n){const e=await t_(n),t=e.eventManager;return t.onListen=fw.bind(null,e.syncEngine),t.onUnlisten=mw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=pw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=gw.bind(null,e.syncEngine),t}function Dw(n,e,t={}){const i=new qt;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,l,c,h){const f=new Sw({next:m=>{f.su(),o.enqueueAndForget(()=>rw(r,p)),m.fromCache&&c.source==="server"?h.reject(new M(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new lw(l,f,{includeMetadataChanges:!0,Ta:!0});return sw(r,p)}(await Nw(n),n.asyncQueue,e,t,i)),i.promise}/**
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
 */function n_(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const nd=new Map;/**
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
 */function i_(n,e,t){if(!t)throw new M(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Ow(n,e,t,i){if(e===!0&&i===!0)throw new M(b.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function id(n){if(!x.isDocumentKey(n))throw new M(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function sd(n){if(x.isDocumentKey(n))throw new M(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function po(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":F()}function Zt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=po(n);throw new M(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Vw(n,e){if(e<=0)throw new M(b.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
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
 */const s_="firestore.googleapis.com",rd=!0;class od{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new M(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=s_,this.ssl=rd}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:rd;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Mp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<oI)throw new M(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Ow("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=n_((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class _o{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new od({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new od(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new LE;switch(i.type){case"firstParty":return new qE(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new M(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=nd.get(t);i&&(V("ComponentProvider","Removing Datastore"),nd.delete(t),i.terminate())}(this),Promise.resolve()}}function Mw(n,e,t,i={}){var s;const r=(n=Zt(n,_o))._getSettings(),o=Object.assign(Object.assign({},r),{emulatorOptions:n._getEmulatorOptions()}),l=`${e}:${t}`;r.host!==s_&&r.host!==l&&Qn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c=Object.assign(Object.assign({},r),{host:l,ssl:!1,emulatorOptions:i});if(!Ht(c,o)&&(n._setSettings(c),i.mockUserToken)){let h,f;if(typeof i.mockUserToken=="string")h=i.mockUserToken,f=Ve.MOCK_USER;else{h=ef(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const p=i.mockUserToken.sub||i.mockUserToken.user_id;if(!p)throw new M(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Ve(p)}n._authCredentials=new FE(new zf(h,f))}}/**
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
 */class rn{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new rn(this.firestore,e,this._query)}}class $e{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new jt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new $e(this.firestore,e,this._key)}}class jt extends rn{constructor(e,t,i){super(e,t,hp(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new $e(this.firestore,null,new x(e))}withConverter(e){return new jt(this.firestore,e,this._path)}}function mS(n,e,...t){if(n=he(n),i_("collection","path",e),n instanceof _o){const i=oe.fromString(e,...t);return sd(i),new jt(n,null,i)}{if(!(n instanceof $e||n instanceof jt))throw new M(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(oe.fromString(e,...t));return sd(i),new jt(n.firestore,null,i)}}function gS(n,e,...t){if(n=he(n),arguments.length===1&&(e=Kf.newId()),i_("doc","path",e),n instanceof _o){const i=oe.fromString(e,...t);return id(i),new $e(n,null,new x(i))}{if(!(n instanceof $e||n instanceof jt))throw new M(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const i=n._path.child(oe.fromString(e,...t));return id(i),new $e(n.firestore,n instanceof jt?n.converter:null,new x(i))}}/**
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
 */const ad="AsyncQueue";class ld{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Up(this,"async_queue_retry"),this.Su=()=>{const i=ua();i&&V(ad,"Visibility state changed to "+i.visibilityState),this.a_.t_()},this.bu=e;const t=ua();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const t=ua();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const t=new qt;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!di(e))throw e;V(ad,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const t=this.bu.then(()=>(this.pu=!0,e().catch(i=>{this.gu=i,this.pu=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(i);throw wt("INTERNAL UNHANDLED ERROR: ",s),i}).then(i=>(this.pu=!1,i))));return this.bu=t,t}enqueueAfterDelay(e,t,i){this.Du(),this.wu.indexOf(e)>-1&&(t=0);const s=Ul.createAndSchedule(this,e,t,i,r=>this.Fu(r));return this.fu.push(s),s}Du(){this.gu&&F()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const t of this.fu)if(t.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.fu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const t=this.fu.indexOf(e);this.fu.splice(t,1)}}class As extends _o{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new ld,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new ld(e),this._firestoreClient=void 0,await e}}}function yS(n,e){const t=typeof n=="object"?n:cl(),i=typeof n=="string"?n:Cr,s=Zr(t,"firestore").getImmediate({identifier:i});if(!s._initialized){const r=Xd("firestore");r&&Mw(s,...r)}return s}function r_(n){if(n._terminated)throw new M(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||xw(n),n._firestoreClient}function xw(n){var e,t,i;const s=n._freezeSettings(),r=function(l,c,h,f){return new nT(l,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,n_(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((i=s.localCache)===null||i===void 0)&&i._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new bw(n._authCredentials,n._appCheckCredentials,n._queue,r,n._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(n._componentsProvider))}/**
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
 */class ti{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ti(Se.fromBase64String(e))}catch(t){throw new M(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ti(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class mo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Re(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class $l{constructor(e){this._methodName=e}}/**
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
 */class Hl{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return W(this._lat,e._lat)||W(this._long,e._long)}}/**
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
 */class zl{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,s){if(i.length!==s.length)return!1;for(let r=0;r<i.length;++r)if(i[r]!==s[r])return!1;return!0}(this._values,e._values)}}/**
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
 */const Lw=/^__.*__$/;class Fw{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return this.fieldMask!==null?new sn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Es(e,this.data,t,this.fieldTransforms)}}class o_{constructor(e,t,i){this.data=e,this.fieldMask=t,this.fieldTransforms=i}toMutation(e,t){return new sn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function a_(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F()}}class Gl{constructor(e,t,i,s,r,o){this.settings=e,this.databaseId=t,this.serializer=i,this.ignoreUndefinedProperties=s,r===void 0&&this.Bu(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Lu(){return this.settings.Lu}ku(e){return new Gl(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}qu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:i,Qu:!1});return s.$u(e),s}Uu(e){var t;const i=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.ku({path:i,Qu:!1});return s.Bu(),s}Ku(e){return this.ku({path:void 0,Qu:!0})}Wu(e){return Mr(e,this.settings.methodName,this.settings.Gu||!1,this.path,this.settings.zu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Bu(){if(this.path)for(let e=0;e<this.path.length;e++)this.$u(this.path.get(e))}$u(e){if(e.length===0)throw this.Wu("Document fields must not be empty");if(a_(this.Lu)&&Lw.test(e))throw this.Wu('Document fields cannot begin and end with "__"')}}class Uw{constructor(e,t,i){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=i||uo(e)}ju(e,t,i,s=!1){return new Gl({Lu:e,methodName:t,zu:i,path:Re.emptyPath(),Qu:!1,Gu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Kl(n){const e=n._freezeSettings(),t=uo(n._databaseId);return new Uw(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Bw(n,e,t,i,s,r={}){const o=n.ju(r.merge||r.mergeFields?2:0,e,t,s);Ql("Data must be an object, but it was:",o,i);const l=l_(i,o);let c,h;if(r.merge)c=new ze(o.fieldMask),h=o.fieldTransforms;else if(r.mergeFields){const f=[];for(const p of r.mergeFields){const m=Ha(e,p,t);if(!o.contains(m))throw new M(b.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);u_(f,m)||f.push(m)}c=new ze(f),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new Fw(new qe(l),c,h)}class go extends $l{_toFieldTransform(e){if(e.Lu!==2)throw e.Lu===1?e.Wu(`${this._methodName}() can only appear at the top level of your update data`):e.Wu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof go}}function qw(n,e,t,i){const s=n.ju(1,e,t);Ql("Data must be an object, but it was:",s,i);const r=[],o=qe.empty();nn(i,(c,h)=>{const f=Yl(e,c,t);h=he(h);const p=s.Uu(f);if(h instanceof go)r.push(f);else{const m=Cs(h,p);m!=null&&(r.push(f),o.set(f,m))}});const l=new ze(r);return new o_(o,l,s.fieldTransforms)}function Ww(n,e,t,i,s,r){const o=n.ju(1,e,t),l=[Ha(e,i,t)],c=[s];if(r.length%2!=0)throw new M(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<r.length;m+=2)l.push(Ha(e,r[m])),c.push(r[m+1]);const h=[],f=qe.empty();for(let m=l.length-1;m>=0;--m)if(!u_(h,l[m])){const A=l[m];let S=c[m];S=he(S);const N=o.Uu(A);if(S instanceof go)h.push(A);else{const k=Cs(S,N);k!=null&&(h.push(A),f.set(A,k))}}const p=new ze(h);return new o_(f,p,o.fieldTransforms)}function jw(n,e,t,i=!1){return Cs(t,n.ju(i?4:3,e))}function Cs(n,e){if(c_(n=he(n)))return Ql("Unsupported field value:",e,n),l_(n,e);if(n instanceof $l)return function(i,s){if(!a_(s.Lu))throw s.Wu(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Wu(`${i._methodName}() is not currently supported inside arrays`);const r=i._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.Qu&&e.Lu!==4)throw e.Wu("Nested arrays are not supported");return function(i,s){const r=[];let o=0;for(const l of i){let c=Cs(l,s.Ku(o));c==null&&(c={nullValue:"NULL_VALUE"}),r.push(c),o++}return{arrayValue:{values:r}}}(n,e)}return function(i,s){if((i=he(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return CT(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){const r=ge.fromDate(i);return{timestampValue:Nr(s.serializer,r)}}if(i instanceof ge){const r=new ge(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:Nr(s.serializer,r)}}if(i instanceof Hl)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof ti)return{bytesValue:bp(s.serializer,i._byteString)};if(i instanceof $e){const r=s.databaseId,o=i.firestore._databaseId;if(!o.isEqual(r))throw s.Wu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:kl(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof zl)return function(o,l){return{mapValue:{fields:{[np]:{stringValue:ip},[Rr]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw l.Wu("VectorValues must only contain numeric values.");return Rl(l.serializer,h)})}}}}}}(i,s);throw s.Wu(`Unsupported field value: ${po(i)}`)}(n,e)}function l_(n,e){const t={};return Yf(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):nn(n,(i,s)=>{const r=Cs(s,e.qu(i));r!=null&&(t[i]=r)}),{mapValue:{fields:t}}}function c_(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof Hl||n instanceof ti||n instanceof $e||n instanceof $l||n instanceof zl)}function Ql(n,e,t){if(!c_(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const i=po(t);throw i==="an object"?e.Wu(n+" a custom object"):e.Wu(n+" "+i)}}function Ha(n,e,t){if((e=he(e))instanceof mo)return e._internalPath;if(typeof e=="string")return Yl(n,e);throw Mr("Field path arguments must be of type string or ",n,!1,void 0,t)}const $w=new RegExp("[~\\*/\\[\\]]");function Yl(n,e,t){if(e.search($w)>=0)throw Mr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new mo(...e.split("."))._internalPath}catch{throw Mr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Mr(n,e,t,i,s){const r=i&&!i.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(r||o)&&(c+=" (found",r&&(c+=` in field ${i}`),o&&(c+=` in document ${s}`),c+=")"),new M(b.INVALID_ARGUMENT,l+n+c)}function u_(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class h_{constructor(e,t,i,s,r){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new $e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Hw(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(yo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Hw extends h_{data(){return super.data()}}function yo(n,e){return typeof e=="string"?Yl(n,e):e instanceof mo?e._internalPath:e._delegate._internalPath}/**
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
 */function zw(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Xl{}class Jl extends Xl{}function vS(n,e,...t){let i=[];e instanceof Xl&&i.push(e),i=i.concat(t),function(r){const o=r.filter(c=>c instanceof Zl).length,l=r.filter(c=>c instanceof vo).length;if(o>1||o>0&&l>0)throw new M(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(i);for(const s of i)n=s._apply(n);return n}class vo extends Jl{constructor(e,t,i){super(),this._field=e,this._op=t,this._value=i,this.type="where"}static _create(e,t,i){return new vo(e,t,i)}_apply(e){const t=this._parse(e);return d_(e._query,t),new rn(e.firestore,e.converter,Ma(e._query,t))}_parse(e){const t=Kl(e.firestore);return function(r,o,l,c,h,f,p){let m;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){ud(p,f);const S=[];for(const N of p)S.push(cd(c,r,N));m={arrayValue:{values:S}}}else m=cd(c,r,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||ud(p,f),m=jw(l,o,p,f==="in"||f==="not-in");return _e.create(h,f,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function ES(n,e,t){const i=e,s=yo("where",n);return vo._create(s,i,t)}class Zl extends Xl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Zl(e,t)}_parse(e){const t=this._queryConstraints.map(i=>i._parse(e)).filter(i=>i.getFilters().length>0);return t.length===1?t[0]:tt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,r){let o=s;const l=r.getFlattenedFilters();for(const c of l)d_(o,c),o=Ma(o,c)}(e._query,t),new rn(e.firestore,e.converter,Ma(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class ec extends Jl{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new ec(e,t)}_apply(e){const t=function(s,r,o){if(s.startAt!==null)throw new M(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new M(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new rs(r,o)}(e._query,this._field,this._direction);return new rn(e.firestore,e.converter,function(s,r){const o=s.explicitOrderBy.concat([r]);return new fi(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function TS(n,e="asc"){const t=e,i=yo("orderBy",n);return ec._create(i,t)}class tc extends Jl{constructor(e,t,i){super(),this.type=e,this._limit=t,this._limitType=i}static _create(e,t,i){return new tc(e,t,i)}_apply(e){return new rn(e.firestore,e.converter,br(e._query,this._limit,this._limitType))}}function IS(n){return Vw("limit",n),tc._create("limit",n,"F")}function cd(n,e,t){if(typeof(t=he(t))=="string"){if(t==="")throw new M(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!dp(e)&&t.indexOf("/")!==-1)throw new M(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const i=e.path.child(oe.fromString(t));if(!x.isDocumentKey(i))throw new M(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${i}' is not because it has an odd number of segments (${i.length}).`);return Ch(n,new x(i))}if(t instanceof $e)return Ch(n,t._key);throw new M(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${po(t)}.`)}function ud(n,e){if(!Array.isArray(n)||n.length===0)throw new M(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function d_(n,e){const t=function(s,r){for(const o of s)for(const l of o.getFlattenedFilters())if(r.indexOf(l.op)>=0)return l.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new M(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Gw{convertValue(e,t="none"){switch(Yt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return fe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Qt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const i={};return nn(e,(s,r)=>{i[s]=this.convertValue(r,t)}),i}convertVectorValue(e){var t,i,s;const r=(s=(i=(t=e.fields)===null||t===void 0?void 0:t[Rr].arrayValue)===null||i===void 0?void 0:i.values)===null||s===void 0?void 0:s.map(o=>fe(o.doubleValue));return new zl(r)}convertGeoPoint(e){return new Hl(fe(e.latitude),fe(e.longitude))}convertArray(e,t){return(e.values||[]).map(i=>this.convertValue(i,t))}convertServerTimestamp(e,t){switch(t){case"previous":const i=so(e);return i==null?null:this.convertValue(i,t);case"estimate":return this.convertTimestamp(ns(e));default:return null}}convertTimestamp(e){const t=Kt(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const i=oe.fromString(e);ee(Vp(i));const s=new is(i.get(1),i.get(3)),r=new x(i.popFirst(5));return s.isEqual(t)||wt(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
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
 */function Kw(n,e,t){let i;return i=n?n.toFirestore(e):e,i}/**
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
 */class tr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Qw extends h_{constructor(e,t,i,s,r,o){super(e,t,i,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new fr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(yo("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}}class fr extends Qw{data(e={}){return super.data(e)}}class Yw{constructor(e,t,i,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new tr(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(i=>{e.call(t,new fr(this._firestore,this._userDataWriter,i.key,i,new tr(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,r){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const c=new fr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new tr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>r||l.type!==3).map(l=>{const c=new fr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new tr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:Xw(l.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Xw(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F()}}class Jw extends Gw{constructor(e){super(),this.firestore=e}convertBytes(e){return new ti(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new $e(this.firestore,null,t)}}function wS(n){n=Zt(n,rn);const e=Zt(n.firestore,As),t=r_(e),i=new Jw(e);return zw(n._query),Dw(t,n._query).then(s=>new Yw(e,i,n,s))}function AS(n,e,t){n=Zt(n,$e);const i=Zt(n.firestore,As),s=Kw(n.converter,e);return nc(i,[Bw(Kl(i),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Ze.none())])}function CS(n,e,t,...i){n=Zt(n,$e);const s=Zt(n.firestore,As),r=Kl(s);let o;return o=typeof(e=he(e))=="string"||e instanceof mo?Ww(r,"updateDoc",n._key,e,t,i):qw(r,"updateDoc",n._key,e),nc(s,[o.toMutation(n._key,Ze.exists(!0))])}function RS(n){return nc(Zt(n.firestore,As),[new Sl(n._key,Ze.none())])}function nc(n,e){return function(i,s){const r=new qt;return i.asyncQueue.enqueueAndForget(async()=>yw(await kw(i),s,r)),r.promise}(r_(n),e)}(function(e,t=!0){(function(s){ui=s})(An),mn(new zt("firestore",(i,{instanceIdentifier:s,options:r})=>{const o=i.getProvider("app").getImmediate(),l=new As(new UE(i.getProvider("auth-internal")),new WE(o,i.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new is(h.options.projectId,f)}(o,s),o);return r=Object.assign({useFetchStreams:t},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),st(fh,ph,e),st(fh,ph,"esm2017")})();var hd={};const dd="@firebase/database",fd="1.0.14";/**
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
 */let f_="";function Zw(n){f_=n}/**
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
 */class eA{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),we(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ji(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class tA{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return ut(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const p_=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new eA(e)}}catch{}return new tA},pn=p_("localStorage"),nA=p_("sessionStorage");/**
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
 */const $n=new Jr("@firebase/database"),iA=function(){let n=1;return function(){return n++}}(),__=function(n){const e=Pg(n),t=new Cg;t.update(e);const i=t.digest();return ol.encodeByteArray(i)},Rs=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Rs.apply(null,i):typeof i=="object"?e+=we(i):e+=i,e+=" "}return e};let Gi=null,pd=!0;const sA=function(n,e){D(!0,"Can't turn on custom loggers persistently."),$n.logLevel=G.VERBOSE,Gi=$n.log.bind($n)},Ce=function(...n){if(pd===!0&&(pd=!1,Gi===null&&nA.get("logging_enabled")===!0&&sA()),Gi){const e=Rs.apply(null,n);Gi(e)}},Ss=function(n){return function(...e){Ce(n,...e)}},za=function(...n){const e="FIREBASE INTERNAL ERROR: "+Rs(...n);$n.error(e)},Ct=function(...n){const e=`FIREBASE FATAL ERROR: ${Rs(...n)}`;throw $n.error(e),new Error(e)},Ue=function(...n){const e="FIREBASE WARNING: "+Rs(...n);$n.warn(e)},rA=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ue("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ic=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},oA=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ni="[MIN_NAME]",En="[MAX_NAME]",Sn=function(n,e){if(n===e)return 0;if(n===ni||e===En)return-1;if(e===ni||n===En)return 1;{const t=_d(n),i=_d(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},aA=function(n,e){return n===e?0:n<e?-1:1},Mi=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+we(e))},sc=function(n){if(typeof n!="object"||n===null)return we(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=we(e[i]),t+=":",t+=sc(n[e[i]]);return t+="}",t},m_=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function be(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const g_=function(n){D(!ic(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,l,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(l=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=l+i,o=Math.round(n*Math.pow(2,t-l)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const h=[];for(c=t;c;c-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)h.push(r%2?1:0),r=Math.floor(r/2);h.push(s?1:0),h.reverse();const f=h.join("");let p="";for(c=0;c<64;c+=8){let m=parseInt(f.substr(c,8),2).toString(16);m.length===1&&(m="0"+m),p=p+m}return p.toLowerCase()},lA=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},cA=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function uA(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const hA=new RegExp("^-?(0*)\\d{1,10}$"),dA=-2147483648,fA=2147483647,_d=function(n){if(hA.test(n)){const e=Number(n);if(e>=dA&&e<=fA)return e}return null},_i=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Ue("Exception was thrown by user callback.",t),e},Math.floor(0))}},pA=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ki=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class _A{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Ye(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){Ue(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class mA{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Ce("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ue(e)}}class pr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}pr.OWNER="owner";/**
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
 */const rc="5",y_="v",v_="s",E_="r",T_="f",I_=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,w_="ls",A_="p",Ga="ac",C_="websocket",R_="long_polling";/**
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
 */class S_{constructor(e,t,i,s,r=!1,o="",l=!1,c=!1,h=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=c,this.emulatorOptions=h,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=pn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&pn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function gA(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function b_(n,e,t){D(typeof e=="string","typeof type must == string"),D(typeof t=="object","typeof params must == object");let i;if(e===C_)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===R_)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);gA(n)&&(t.ns=n.namespace);const s=[];return be(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class yA{constructor(){this.counters_={}}incrementCounter(e,t=1){ut(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return og(this.counters_)}}/**
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
 */const da={},fa={};function oc(n){const e=n.toString();return da[e]||(da[e]=new yA),da[e]}function vA(n,e){const t=n.toString();return fa[t]||(fa[t]=e()),fa[t]}/**
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
 */class EA{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&_i(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const md="start",TA="close",IA="pLPCommand",wA="pRTLPCB",P_="id",k_="pw",N_="ser",AA="cb",CA="seg",RA="ts",SA="d",bA="dframe",D_=1870,O_=30,PA=D_-O_,kA=25e3,NA=3e4;class Un{constructor(e,t,i,s,r,o,l){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ss(e),this.stats_=oc(t),this.urlFn=c=>(this.appCheckToken&&(c[Ga]=this.appCheckToken),b_(t,R_,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new EA(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(NA)),oA(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ac((...r)=>{const[o,l,c,h,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===md)this.id=l,this.password=c;else if(o===TA)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const i={};i[md]="t",i[N_]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[AA]=this.scriptTagHolder.uniqueCallbackIdentifier),i[y_]=rc,this.transportSessionId&&(i[v_]=this.transportSessionId),this.lastSessionId&&(i[w_]=this.lastSessionId),this.applicationId&&(i[A_]=this.applicationId),this.appCheckToken&&(i[Ga]=this.appCheckToken),typeof location<"u"&&location.hostname&&I_.test(location.hostname)&&(i[E_]=T_);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Un.forceAllow_=!0}static forceDisallow(){Un.forceDisallow_=!0}static isAvailable(){return Un.forceAllow_?!0:!Un.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!lA()&&!cA()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=we(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Kd(t),s=m_(i,PA);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[bA]="t",i[P_]=e,i[k_]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=we(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ac{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=iA(),window[IA+this.uniqueCallbackIdentifier]=e,window[wA+this.uniqueCallbackIdentifier]=t,this.myIFrame=ac.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Ce("frame writing exception"),l.stack&&Ce(l.stack),Ce(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Ce("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[P_]=this.myID,e[k_]=this.myPW,e[N_]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+O_+i.length<=D_;){const o=this.pendingSegs.shift();i=i+"&"+CA+s+"="+o.seg+"&"+RA+s+"="+o.ts+"&"+SA+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(kA)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{Ce("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const DA=16384,OA=45e3;let xr=null;typeof MozWebSocket<"u"?xr=MozWebSocket:typeof WebSocket<"u"&&(xr=WebSocket);class Xe{constructor(e,t,i,s,r,o,l){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ss(this.connId),this.stats_=oc(t),this.connURL=Xe.connectionURL_(t,o,l,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[y_]=rc,typeof location<"u"&&location.hostname&&I_.test(location.hostname)&&(o[E_]=T_),t&&(o[v_]=t),i&&(o[w_]=i),s&&(o[Ga]=s),r&&(o[A_]=r),b_(e,C_,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,pn.set("previous_websocket_failure",!0);try{let i;mg(),this.mySock=new xr(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Xe.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&xr!==null&&!Xe.forceDisallow_}static previouslyFailed(){return pn.isInMemoryStorage||pn.get("previous_websocket_failure")===!0}markConnectionHealthy(){pn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Ji(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(D(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=we(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=m_(t,DA);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(OA))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Xe.responsesRequiredToBeHealthy=2;Xe.healthyTimeout=3e4;/**
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
 */class ls{static get ALL_TRANSPORTS(){return[Un,Xe]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Xe&&Xe.isAvailable();let i=t&&!Xe.previouslyFailed();if(e.webSocketOnly&&(t||Ue("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Xe];else{const s=this.transports_=[];for(const r of ls.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);ls.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ls.globalTransportInitialized_=!1;/**
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
 */const VA=6e4,MA=5e3,xA=10*1024,LA=100*1024,pa="t",gd="d",FA="s",yd="r",UA="e",vd="o",Ed="a",Td="n",Id="p",BA="h";class qA{constructor(e,t,i,s,r,o,l,c,h,f){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=c,this.onKill_=h,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ss("c:"+this.id+":"),this.transportManager_=new ls(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Ki(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>LA?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>xA?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(pa in e){const t=e[pa];t===Ed?this.upgradeIfSecondaryHealthy_():t===yd?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===vd&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Mi("t",e),i=Mi("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Id,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ed,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Td,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Mi("t",e),i=Mi("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Mi(pa,e);if(gd in e){const i=e[gd];if(t===BA){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Td){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===FA?this.onConnectionShutdown_(i):t===yd?this.onReset_(i):t===UA?za("Server Error: "+i):t===vd?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):za("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),rc!==i&&Ue("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Ki(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(VA))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ki(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(MA))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Id,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(pn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class V_{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class M_{constructor(e){this.allowedEvents_=e,this.listeners_={},D(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){D(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class Lr extends M_{static getInstance(){return new Lr}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!al()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return D(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const wd=32,Ad=768;class te{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function Z(){return new te("")}function $(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function en(n){return n.pieces_.length-n.pieceNum_}function se(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new te(n.pieces_,e)}function lc(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function WA(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function cs(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function x_(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new te(e,0)}function ce(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof te)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new te(t,0)}function K(n){return n.pieceNum_>=n.pieces_.length}function We(n,e){const t=$(n),i=$(e);if(t===null)return e;if(t===i)return We(se(n),se(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function jA(n,e){const t=cs(n,0),i=cs(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Sn(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function cc(n,e){if(en(n)!==en(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Ke(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(en(n)>en(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class $A{constructor(e,t){this.errorPrefix_=t,this.parts_=cs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Xr(this.parts_[i]);L_(this)}}function HA(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Xr(e),L_(n)}function zA(n){const e=n.parts_.pop();n.byteLength_-=Xr(e),n.parts_.length>0&&(n.byteLength_-=1)}function L_(n){if(n.byteLength_>Ad)throw new Error(n.errorPrefix_+"has a key path longer than "+Ad+" bytes ("+n.byteLength_+").");if(n.parts_.length>wd)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+wd+") or object contains a cycle "+dn(n))}function dn(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class uc extends M_{static getInstance(){return new uc}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return D(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const xi=1e3,GA=60*5*1e3,Cd=30*1e3,KA=1.3,QA=3e4,YA="server_kill",Rd=3;class vt extends V_{constructor(e,t,i,s,r,o,l,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=c,this.id=vt.nextPersistentConnectionId_++,this.log_=Ss("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=xi,this.maxReconnectDelay_=GA,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");uc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Lr.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(we(r)),D(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new _s,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),D(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const c=l.d,h=l.s;vt.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(h,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&ut(e,"w")){const i=Gn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();Ue(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ag(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Cd)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=wg(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+we(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):za("Unrecognized action received from server: "+we(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){D(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=xi,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=xi,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>QA&&(this.reconnectDelay_=xi),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*KA)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+vt.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const c=function(){l?l.close():(o=!0,i())},h=function(p){D(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:c,sendRequest:h};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?Ce("getToken() completed but was canceled"):(Ce("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=m&&m.token,l=new qA(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,A=>{Ue(A+" ("+this.repoInfo_.toString()+")"),this.interrupt(YA)},r))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&Ue(p),c())}}}interrupt(e){Ce("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Ce("Resuming connection for reason: "+e),delete this.interruptReasons_[e],va(this.interruptReasons_)&&(this.reconnectDelay_=xi,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>sc(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new te(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){Ce("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Rd&&(this.reconnectDelay_=Cd,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Ce("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Rd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+f_.replace(/\./g,"-")]=1,al()?e["framework.cordova"]=1:tf()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Lr.getInstance().currentlyOnline();return va(this.interruptReasons_)&&e}}vt.nextPersistentConnectionId_=0;vt.nextConnectionId_=0;/**
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
 */class H{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new H(e,t)}}/**
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
 */class Eo{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new H(ni,e),s=new H(ni,t);return this.compare(i,s)!==0}minPost(){return H.MIN}}/**
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
 */let nr;class F_ extends Eo{static get __EMPTY_NODE(){return nr}static set __EMPTY_NODE(e){nr=e}compare(e,t){return Sn(e.name,t.name)}isDefinedOn(e){throw ai("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return H.MIN}maxPost(){return new H(En,nr)}makePost(e,t){return D(typeof e=="string","KeyIndex indexValue must always be a string."),new H(e,nr)}toString(){return".key"}}const Hn=new F_;/**
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
 */class ir{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Te{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??Te.RED,this.left=s??je.EMPTY_NODE,this.right=r??je.EMPTY_NODE}copy(e,t,i,s,r){return new Te(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return je.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return je.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Te.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Te.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Te.RED=!0;Te.BLACK=!1;class XA{copy(e,t,i,s,r){return this}insert(e,t,i){return new Te(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class je{constructor(e,t=je.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new je(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Te.BLACK,null,null))}remove(e){return new je(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Te.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ir(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ir(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ir(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ir(this.root_,null,this.comparator_,!0,e)}}je.EMPTY_NODE=new XA;/**
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
 */function JA(n,e){return Sn(n.name,e.name)}function hc(n,e){return Sn(n,e)}/**
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
 */let Ka;function ZA(n){Ka=n}const U_=function(n){return typeof n=="number"?"number:"+g_(n):"string:"+n},B_=function(n){if(n.isLeafNode()){const e=n.val();D(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ut(e,".sv"),"Priority must be a string or number.")}else D(n===Ka||n.isEmpty(),"priority of unexpected type.");D(n===Ka||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Sd;class ve{static set __childrenNodeConstructor(e){Sd=e}static get __childrenNodeConstructor(){return Sd}constructor(e,t=ve.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,D(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),B_(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ve(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ve.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return K(e)?this:$(e)===".priority"?this.priorityNode_:ve.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ve.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=$(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(D(i!==".priority"||en(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,ve.__childrenNodeConstructor.EMPTY_NODE.updateChild(se(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+U_(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=g_(this.value_):e+=this.value_,this.lazyHash_=__(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ve.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ve.__childrenNodeConstructor?-1:(D(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=ve.VALUE_TYPE_ORDER.indexOf(t),r=ve.VALUE_TYPE_ORDER.indexOf(i);return D(s>=0,"Unknown leaf type: "+t),D(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ve.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let q_,W_;function eC(n){q_=n}function tC(n){W_=n}class nC extends Eo{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Sn(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return H.MIN}maxPost(){return new H(En,new ve("[PRIORITY-POST]",W_))}makePost(e,t){const i=q_(e);return new H(t,new ve("[PRIORITY-POST]",i))}toString(){return".priority"}}const ue=new nC;/**
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
 */const iC=Math.log(2);class sC{constructor(e){const t=r=>parseInt(Math.log(r)/iC,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Fr=function(n,e,t,i){n.sort(e);const s=function(c,h){const f=h-c;let p,m;if(f===0)return null;if(f===1)return p=n[c],m=t?t(p):p,new Te(m,p.node,Te.BLACK,null,null);{const A=parseInt(f/2,10)+c,S=s(c,A),N=s(A+1,h);return p=n[A],m=t?t(p):p,new Te(m,p.node,Te.BLACK,S,N)}},r=function(c){let h=null,f=null,p=n.length;const m=function(S,N){const k=p-S,j=p;p-=S;const z=s(k+1,j),Q=n[k],ae=t?t(Q):Q;A(new Te(ae,Q.node,N,null,z))},A=function(S){h?(h.left=S,h=S):(f=S,h=S)};for(let S=0;S<c.count;++S){const N=c.nextBitIsOne(),k=Math.pow(2,c.count-(S+1));N?m(k,Te.BLACK):(m(k,Te.BLACK),m(k,Te.RED))}return f},o=new sC(n.length),l=r(o);return new je(i||e,l)};/**
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
 */let _a;const On={};class yt{static get Default(){return D(On&&ue,"ChildrenNode.ts has not been loaded"),_a=_a||new yt({".priority":On},{".priority":ue}),_a}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Gn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof je?t:null}hasIndex(e){return ut(this.indexSet_,e.toString())}addIndex(e,t){D(e!==Hn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(H.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let l;s?l=Fr(i,e.getCompare()):l=On;const c=e.toString(),h=Object.assign({},this.indexSet_);h[c]=e;const f=Object.assign({},this.indexes_);return f[c]=l,new yt(f,h)}addToIndexes(e,t){const i=gr(this.indexes_,(s,r)=>{const o=Gn(this.indexSet_,r);if(D(o,"Missing index implementation for "+r),s===On)if(o.isDefinedOn(e.node)){const l=[],c=t.getIterator(H.Wrap);let h=c.getNext();for(;h;)h.name!==e.name&&l.push(h),h=c.getNext();return l.push(e),Fr(l,o.getCompare())}else return On;else{const l=t.get(e.name);let c=s;return l&&(c=c.remove(new H(e.name,l))),c.insert(e,e.node)}});return new yt(i,this.indexSet_)}removeFromIndexes(e,t){const i=gr(this.indexes_,s=>{if(s===On)return s;{const r=t.get(e.name);return r?s.remove(new H(e.name,r)):s}});return new yt(i,this.indexSet_)}}/**
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
 */let Li;class L{static get EMPTY_NODE(){return Li||(Li=new L(new je(hc),null,yt.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&B_(this.priorityNode_),this.children_.isEmpty()&&D(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Li}updatePriority(e){return this.children_.isEmpty()?this:new L(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Li:t}}getChild(e){const t=$(e);return t===null?this:this.getImmediateChild(t).getChild(se(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(D(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new H(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Li:this.priorityNode_;return new L(s,o,r)}}updateChild(e,t){const i=$(e);if(i===null)return t;{D($(e)!==".priority"||en(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(se(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(ue,(o,l)=>{t[o]=l.val(e),i++,r&&L.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const l in t)o[l]=t[l];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+U_(this.getPriority().val())+":"),this.forEachChild(ue,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":__(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new H(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new H(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new H(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,H.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,H.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===bs?-1:0}withIndex(e){if(e===Hn||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new L(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Hn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(ue),s=t.getIterator(ue);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Hn?null:this.indexMap_.get(e.toString())}}L.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class rC extends L{constructor(){super(new je(hc),L.EMPTY_NODE,yt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return L.EMPTY_NODE}isEmpty(){return!1}}const bs=new rC;Object.defineProperties(H,{MIN:{value:new H(ni,L.EMPTY_NODE)},MAX:{value:new H(En,bs)}});F_.__EMPTY_NODE=L.EMPTY_NODE;ve.__childrenNodeConstructor=L;ZA(bs);tC(bs);/**
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
 */const oC=!0;function Ie(n,e=null){if(n===null)return L.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),D(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ve(t,Ie(e))}if(!(n instanceof Array)&&oC){const t=[];let i=!1;if(be(n,(o,l)=>{if(o.substring(0,1)!=="."){const c=Ie(l);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new H(o,c)))}}),t.length===0)return L.EMPTY_NODE;const r=Fr(t,JA,o=>o.name,hc);if(i){const o=Fr(t,ue.getCompare());return new L(r,Ie(e),new yt({".priority":o},{".priority":ue}))}else return new L(r,Ie(e),yt.Default)}else{let t=L.EMPTY_NODE;return be(n,(i,s)=>{if(ut(n,i)&&i.substring(0,1)!=="."){const r=Ie(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(Ie(e))}}eC(Ie);/**
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
 */class aC extends Eo{constructor(e){super(),this.indexPath_=e,D(!K(e)&&$(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Sn(e.name,t.name):r}makePost(e,t){const i=Ie(e),s=L.EMPTY_NODE.updateChild(this.indexPath_,i);return new H(t,s)}maxPost(){const e=L.EMPTY_NODE.updateChild(this.indexPath_,bs);return new H(En,e)}toString(){return cs(this.indexPath_,0).join("/")}}/**
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
 */class lC extends Eo{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Sn(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return H.MIN}maxPost(){return H.MAX}makePost(e,t){const i=Ie(e);return new H(t,i)}toString(){return".value"}}const cC=new lC;/**
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
 */function j_(n){return{type:"value",snapshotNode:n}}function ii(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function us(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function hs(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function uC(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class dc{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){D(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(s).equals(i.getChild(s))&&l.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(us(t,l)):D(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(ii(t,i)):o.trackChildChange(hs(t,i,l))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(ue,(s,r)=>{t.hasChild(s)||i.trackChildChange(us(s,r))}),t.isLeafNode()||t.forEachChild(ue,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(hs(s,r,o))}else i.trackChildChange(ii(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?L.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class ds{constructor(e){this.indexedFilter_=new dc(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ds.getStartPost_(e),this.endPost_=ds.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new H(t,i))||(i=L.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=L.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(L.EMPTY_NODE);const r=this;return t.forEachChild(ue,(o,l)=>{r.matches(new H(o,l))||(s=s.updateImmediateChild(o,L.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class hC{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new ds(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new H(t,i))||(i=L.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=L.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=L.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(L.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:s=s.updateImmediateChild(l.name,L.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const p=this.index_.getCompare();o=(m,A)=>p(A,m)}else o=this.index_.getCompare();const l=e;D(l.numChildren()===this.limit_,"");const c=new H(t,i),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(c);if(l.hasChild(t)){const p=l.getImmediateChild(t);let m=s.getChildAfterChild(this.index_,h,this.reverse_);for(;m!=null&&(m.name===t||l.hasChild(m.name));)m=s.getChildAfterChild(this.index_,m,this.reverse_);const A=m==null?1:o(m,c);if(f&&!i.isEmpty()&&A>=0)return r!=null&&r.trackChildChange(hs(t,i,p)),l.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(us(t,p));const N=l.updateImmediateChild(t,L.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(r!=null&&r.trackChildChange(ii(m.name,m.node)),N.updateImmediateChild(m.name,m.node)):N}}else return i.isEmpty()?e:f&&o(h,c)>=0?(r!=null&&(r.trackChildChange(us(h.name,h.node)),r.trackChildChange(ii(t,i))),l.updateImmediateChild(t,i).updateImmediateChild(h.name,L.EMPTY_NODE)):e}}/**
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
 */class fc{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ue}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return D(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return D(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ni}hasEnd(){return this.endSet_}getIndexEndValue(){return D(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return D(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:En}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return D(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ue}copy(){const e=new fc;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function dC(n){return n.loadsAllData()?new dc(n.getIndex()):n.hasLimit()?new hC(n):new ds(n)}function bd(n){const e={};if(n.isDefault())return e;let t;if(n.index_===ue?t="$priority":n.index_===cC?t="$value":n.index_===Hn?t="$key":(D(n.index_ instanceof aC,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=we(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=we(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+we(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=we(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+we(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Pd(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==ue&&(e.i=n.index_.toString()),e}/**
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
 */class Ur extends V_{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(D(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Ss("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ur.getListenId_(e,i),l={};this.listens_[o]=l;const c=bd(e._queryParams);this.restRequest_(r+".json",c,(h,f)=>{let p=f;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(r,p,!1,i),Gn(this.listens_,o)===l){let m;h?h===401?m="permission_denied":m="rest_error:"+h:m="ok",s(m,null)}})}unlisten(e,t){const i=Ur.getListenId_(e,t);delete this.listens_[i]}get(e){const t=bd(e._queryParams),i=e._path.toString(),s=new _s;return this.restRequest_(i+".json",t,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(i,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+li(t);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(i&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let c=null;if(l.status>=200&&l.status<300){try{c=Ji(l.responseText)}catch{Ue("Failed to parse JSON response for "+o+": "+l.responseText)}i(null,c)}else l.status!==401&&l.status!==404&&Ue("Got unsuccessful REST response for "+o+" Status: "+l.status),i(l.status);i=null}},l.open("GET",o,!0),l.send()})}}/**
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
 */class fC{constructor(){this.rootNode_=L.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function Br(){return{value:null,children:new Map}}function $_(n,e,t){if(K(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=$(e);n.children.has(i)||n.children.set(i,Br());const s=n.children.get(i);e=se(e),$_(s,e,t)}}function Qa(n,e,t){n.value!==null?t(e,n.value):pC(n,(i,s)=>{const r=new te(e.toString()+"/"+i);Qa(s,r,t)})}function pC(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class _C{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&be(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const kd=10*1e3,mC=30*1e3,gC=5*60*1e3;class yC{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new _C(e);const i=kd+(mC-kd)*Math.random();Ki(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;be(e,(s,r)=>{r>0&&ut(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Ki(this.reportStats_.bind(this),Math.floor(Math.random()*2*gC))}}/**
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
 */var Je;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Je||(Je={}));function pc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function _c(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function mc(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class qr{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Je.ACK_USER_WRITE,this.source=pc()}operationForChild(e){if(K(this.path)){if(this.affectedTree.value!=null)return D(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new te(e));return new qr(Z(),t,this.revert)}}else return D($(this.path)===e,"operationForChild called for unrelated child."),new qr(se(this.path),this.affectedTree,this.revert)}}/**
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
 */class fs{constructor(e,t){this.source=e,this.path=t,this.type=Je.LISTEN_COMPLETE}operationForChild(e){return K(this.path)?new fs(this.source,Z()):new fs(this.source,se(this.path))}}/**
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
 */class Tn{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Je.OVERWRITE}operationForChild(e){return K(this.path)?new Tn(this.source,Z(),this.snap.getImmediateChild(e)):new Tn(this.source,se(this.path),this.snap)}}/**
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
 */class si{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Je.MERGE}operationForChild(e){if(K(this.path)){const t=this.children.subtree(new te(e));return t.isEmpty()?null:t.value?new Tn(this.source,Z(),t.value):new si(this.source,Z(),t)}else return D($(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new si(this.source,se(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class In{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(K(e))return this.isFullyInitialized()&&!this.filtered_;const t=$(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class vC{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function EC(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(uC(o.childName,o.snapshotNode))}),Fi(n,s,"child_removed",e,i,t),Fi(n,s,"child_added",e,i,t),Fi(n,s,"child_moved",r,i,t),Fi(n,s,"child_changed",e,i,t),Fi(n,s,"value",e,i,t),s}function Fi(n,e,t,i,s,r){const o=i.filter(l=>l.type===t);o.sort((l,c)=>IC(n,l,c)),o.forEach(l=>{const c=TC(n,l,r);s.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(c,n.query_))})})}function TC(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function IC(n,e,t){if(e.childName==null||t.childName==null)throw ai("Should only compare child_ events.");const i=new H(e.childName,e.snapshotNode),s=new H(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function To(n,e){return{eventCache:n,serverCache:e}}function Qi(n,e,t,i){return To(new In(e,t,i),n.serverCache)}function H_(n,e,t,i){return To(n.eventCache,new In(e,t,i))}function Ya(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function wn(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let ma;const wC=()=>(ma||(ma=new je(aA)),ma);class ie{static fromObject(e){let t=new ie(null);return be(e,(i,s)=>{t=t.set(new te(i),s)}),t}constructor(e,t=wC()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:Z(),value:this.value};if(K(e))return null;{const i=$(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(se(e),t);return r!=null?{path:ce(new te(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(K(e))return this;{const t=$(e),i=this.children.get(t);return i!==null?i.subtree(se(e)):new ie(null)}}set(e,t){if(K(e))return new ie(t,this.children);{const i=$(e),r=(this.children.get(i)||new ie(null)).set(se(e),t),o=this.children.insert(i,r);return new ie(this.value,o)}}remove(e){if(K(e))return this.children.isEmpty()?new ie(null):new ie(null,this.children);{const t=$(e),i=this.children.get(t);if(i){const s=i.remove(se(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new ie(null):new ie(this.value,r)}else return this}}get(e){if(K(e))return this.value;{const t=$(e),i=this.children.get(t);return i?i.get(se(e)):null}}setTree(e,t){if(K(e))return t;{const i=$(e),r=(this.children.get(i)||new ie(null)).setTree(se(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new ie(this.value,o)}}fold(e){return this.fold_(Z(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(ce(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,Z(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(K(e))return null;{const r=$(e),o=this.children.get(r);return o?o.findOnPath_(se(e),ce(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,Z(),t)}foreachOnPath_(e,t,i){if(K(e))return this;{this.value&&i(t,this.value);const s=$(e),r=this.children.get(s);return r?r.foreachOnPath_(se(e),ce(t,s),i):new ie(null)}}foreach(e){this.foreach_(Z(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(ce(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class et{constructor(e){this.writeTree_=e}static empty(){return new et(new ie(null))}}function Yi(n,e,t){if(K(e))return new et(new ie(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=We(s,e);return r=r.updateChild(o,t),new et(n.writeTree_.set(s,r))}else{const s=new ie(t),r=n.writeTree_.setTree(e,s);return new et(r)}}}function Xa(n,e,t){let i=n;return be(t,(s,r)=>{i=Yi(i,ce(e,s),r)}),i}function Nd(n,e){if(K(e))return et.empty();{const t=n.writeTree_.setTree(e,new ie(null));return new et(t)}}function Ja(n,e){return bn(n,e)!=null}function bn(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(We(t.path,e)):null}function Dd(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(ue,(i,s)=>{e.push(new H(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new H(i,s.value))}),e}function $t(n,e){if(K(e))return n;{const t=bn(n,e);return t!=null?new et(new ie(t)):new et(n.writeTree_.subtree(e))}}function Za(n){return n.writeTree_.isEmpty()}function ri(n,e){return z_(Z(),n.writeTree_,e)}function z_(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(D(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=z_(ce(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(ce(n,".priority"),i)),t}}/**
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
 */function gc(n,e){return Y_(e,n)}function AC(n,e,t,i,s){D(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Yi(n.visibleWrites,e,t)),n.lastWriteId=i}function CC(n,e,t,i){D(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=Xa(n.visibleWrites,e,t),n.lastWriteId=i}function RC(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function SC(n,e){const t=n.allWrites.findIndex(l=>l.writeId===e);D(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const l=n.allWrites[o];l.visible&&(o>=t&&bC(l,i.path)?s=!1:Ke(i.path,l.path)&&(r=!0)),o--}if(s){if(r)return PC(n),!0;if(i.snap)n.visibleWrites=Nd(n.visibleWrites,i.path);else{const l=i.children;be(l,c=>{n.visibleWrites=Nd(n.visibleWrites,ce(i.path,c))})}return!0}else return!1}function bC(n,e){if(n.snap)return Ke(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Ke(ce(n.path,t),e))return!0;return!1}function PC(n){n.visibleWrites=G_(n.allWrites,kC,Z()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function kC(n){return n.visible}function G_(n,e,t){let i=et.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let l;if(r.snap)Ke(t,o)?(l=We(t,o),i=Yi(i,l,r.snap)):Ke(o,t)&&(l=We(o,t),i=Yi(i,Z(),r.snap.getChild(l)));else if(r.children){if(Ke(t,o))l=We(t,o),i=Xa(i,l,r.children);else if(Ke(o,t))if(l=We(o,t),K(l))i=Xa(i,Z(),r.children);else{const c=Gn(r.children,$(l));if(c){const h=c.getChild(se(l));i=Yi(i,Z(),h)}}}else throw ai("WriteRecord should have .snap or .children")}}return i}function K_(n,e,t,i,s){if(!i&&!s){const r=bn(n.visibleWrites,e);if(r!=null)return r;{const o=$t(n.visibleWrites,e);if(Za(o))return t;if(t==null&&!Ja(o,Z()))return null;{const l=t||L.EMPTY_NODE;return ri(o,l)}}}else{const r=$t(n.visibleWrites,e);if(!s&&Za(r))return t;if(!s&&t==null&&!Ja(r,Z()))return null;{const o=function(h){return(h.visible||s)&&(!i||!~i.indexOf(h.writeId))&&(Ke(h.path,e)||Ke(e,h.path))},l=G_(n.allWrites,o,e),c=t||L.EMPTY_NODE;return ri(l,c)}}}function NC(n,e,t){let i=L.EMPTY_NODE;const s=bn(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(ue,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=$t(n.visibleWrites,e);return t.forEachChild(ue,(o,l)=>{const c=ri($t(r,new te(o)),l);i=i.updateImmediateChild(o,c)}),Dd(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=$t(n.visibleWrites,e);return Dd(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function DC(n,e,t,i,s){D(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=ce(e,t);if(Ja(n.visibleWrites,r))return null;{const o=$t(n.visibleWrites,r);return Za(o)?s.getChild(t):ri(o,s.getChild(t))}}function OC(n,e,t,i){const s=ce(e,t),r=bn(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=$t(n.visibleWrites,s);return ri(o,i.getNode().getImmediateChild(t))}else return null}function VC(n,e){return bn(n.visibleWrites,e)}function MC(n,e,t,i,s,r,o){let l;const c=$t(n.visibleWrites,e),h=bn(c,Z());if(h!=null)l=h;else if(t!=null)l=ri(c,t);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const f=[],p=o.getCompare(),m=r?l.getReverseIteratorFrom(i,o):l.getIteratorFrom(i,o);let A=m.getNext();for(;A&&f.length<s;)p(A,i)!==0&&f.push(A),A=m.getNext();return f}else return[]}function xC(){return{visibleWrites:et.empty(),allWrites:[],lastWriteId:-1}}function Wr(n,e,t,i){return K_(n.writeTree,n.treePath,e,t,i)}function yc(n,e){return NC(n.writeTree,n.treePath,e)}function Od(n,e,t,i){return DC(n.writeTree,n.treePath,e,t,i)}function jr(n,e){return VC(n.writeTree,ce(n.treePath,e))}function LC(n,e,t,i,s,r){return MC(n.writeTree,n.treePath,e,t,i,s,r)}function vc(n,e,t){return OC(n.writeTree,n.treePath,e,t)}function Q_(n,e){return Y_(ce(n.treePath,e),n.writeTree)}function Y_(n,e){return{treePath:n,writeTree:e}}/**
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
 */class FC{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;D(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),D(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,hs(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,us(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,ii(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,hs(i,e.snapshotNode,s.oldSnap));else throw ai("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class UC{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const X_=new UC;class Ec{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new In(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return vc(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:wn(this.viewCache_),r=LC(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function BC(n){return{filter:n}}function qC(n,e){D(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),D(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function WC(n,e,t,i,s){const r=new FC;let o,l;if(t.type===Je.OVERWRITE){const h=t;h.source.fromUser?o=el(n,e,h.path,h.snap,i,s,r):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!K(h.path),o=$r(n,e,h.path,h.snap,i,s,l,r))}else if(t.type===Je.MERGE){const h=t;h.source.fromUser?o=$C(n,e,h.path,h.children,i,s,r):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),o=tl(n,e,h.path,h.children,i,s,l,r))}else if(t.type===Je.ACK_USER_WRITE){const h=t;h.revert?o=GC(n,e,h.path,i,s,r):o=HC(n,e,h.path,h.affectedTree,i,s,r)}else if(t.type===Je.LISTEN_COMPLETE)o=zC(n,e,t.path,i,r);else throw ai("Unknown operation type: "+t.type);const c=r.getChanges();return jC(e,o,c),{viewCache:o,changes:c}}function jC(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Ya(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(j_(Ya(e)))}}function J_(n,e,t,i,s,r){const o=e.eventCache;if(jr(i,t)!=null)return e;{let l,c;if(K(t))if(D(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=wn(e),f=h instanceof L?h:L.EMPTY_NODE,p=yc(i,f);l=n.filter.updateFullNode(e.eventCache.getNode(),p,r)}else{const h=Wr(i,wn(e));l=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const h=$(t);if(h===".priority"){D(en(t)===1,"Can't have a priority with additional path components");const f=o.getNode();c=e.serverCache.getNode();const p=Od(i,t,f,c);p!=null?l=n.filter.updatePriority(f,p):l=o.getNode()}else{const f=se(t);let p;if(o.isCompleteForChild(h)){c=e.serverCache.getNode();const m=Od(i,t,o.getNode(),c);m!=null?p=o.getNode().getImmediateChild(h).updateChild(f,m):p=o.getNode().getImmediateChild(h)}else p=vc(i,h,e.serverCache);p!=null?l=n.filter.updateChild(o.getNode(),h,p,f,s,r):l=o.getNode()}}return Qi(e,l,o.isFullyInitialized()||K(t),n.filter.filtersNodes())}}function $r(n,e,t,i,s,r,o,l){const c=e.serverCache;let h;const f=o?n.filter:n.filter.getIndexedFilter();if(K(t))h=f.updateFullNode(c.getNode(),i,null);else if(f.filtersNodes()&&!c.isFiltered()){const A=c.getNode().updateChild(t,i);h=f.updateFullNode(c.getNode(),A,null)}else{const A=$(t);if(!c.isCompleteForPath(t)&&en(t)>1)return e;const S=se(t),k=c.getNode().getImmediateChild(A).updateChild(S,i);A===".priority"?h=f.updatePriority(c.getNode(),k):h=f.updateChild(c.getNode(),A,k,S,X_,null)}const p=H_(e,h,c.isFullyInitialized()||K(t),f.filtersNodes()),m=new Ec(s,p,r);return J_(n,p,t,s,m,l)}function el(n,e,t,i,s,r,o){const l=e.eventCache;let c,h;const f=new Ec(s,e,r);if(K(t))h=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Qi(e,h,!0,n.filter.filtersNodes());else{const p=$(t);if(p===".priority")h=n.filter.updatePriority(e.eventCache.getNode(),i),c=Qi(e,h,l.isFullyInitialized(),l.isFiltered());else{const m=se(t),A=l.getNode().getImmediateChild(p);let S;if(K(m))S=i;else{const N=f.getCompleteChild(p);N!=null?lc(m)===".priority"&&N.getChild(x_(m)).isEmpty()?S=N:S=N.updateChild(m,i):S=L.EMPTY_NODE}if(A.equals(S))c=e;else{const N=n.filter.updateChild(l.getNode(),p,S,m,f,o);c=Qi(e,N,l.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function Vd(n,e){return n.eventCache.isCompleteForChild(e)}function $C(n,e,t,i,s,r,o){let l=e;return i.foreach((c,h)=>{const f=ce(t,c);Vd(e,$(f))&&(l=el(n,l,f,h,s,r,o))}),i.foreach((c,h)=>{const f=ce(t,c);Vd(e,$(f))||(l=el(n,l,f,h,s,r,o))}),l}function Md(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function tl(n,e,t,i,s,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,h;K(t)?h=i:h=new ie(null).setTree(t,i);const f=e.serverCache.getNode();return h.children.inorderTraversal((p,m)=>{if(f.hasChild(p)){const A=e.serverCache.getNode().getImmediateChild(p),S=Md(n,A,m);c=$r(n,c,new te(p),S,s,r,o,l)}}),h.children.inorderTraversal((p,m)=>{const A=!e.serverCache.isCompleteForChild(p)&&m.value===null;if(!f.hasChild(p)&&!A){const S=e.serverCache.getNode().getImmediateChild(p),N=Md(n,S,m);c=$r(n,c,new te(p),N,s,r,o,l)}}),c}function HC(n,e,t,i,s,r,o){if(jr(s,t)!=null)return e;const l=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(K(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return $r(n,e,t,c.getNode().getChild(t),s,r,l,o);if(K(t)){let h=new ie(null);return c.getNode().forEachChild(Hn,(f,p)=>{h=h.set(new te(f),p)}),tl(n,e,t,h,s,r,l,o)}else return e}else{let h=new ie(null);return i.foreach((f,p)=>{const m=ce(t,f);c.isCompleteForPath(m)&&(h=h.set(f,c.getNode().getChild(m)))}),tl(n,e,t,h,s,r,l,o)}}function zC(n,e,t,i,s){const r=e.serverCache,o=H_(e,r.getNode(),r.isFullyInitialized()||K(t),r.isFiltered());return J_(n,o,t,i,X_,s)}function GC(n,e,t,i,s,r){let o;if(jr(i,t)!=null)return e;{const l=new Ec(i,e,s),c=e.eventCache.getNode();let h;if(K(t)||$(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=Wr(i,wn(e));else{const p=e.serverCache.getNode();D(p instanceof L,"serverChildren would be complete if leaf node"),f=yc(i,p)}f=f,h=n.filter.updateFullNode(c,f,r)}else{const f=$(t);let p=vc(i,f,e.serverCache);p==null&&e.serverCache.isCompleteForChild(f)&&(p=c.getImmediateChild(f)),p!=null?h=n.filter.updateChild(c,f,p,se(t),l,r):e.eventCache.getNode().hasChild(f)?h=n.filter.updateChild(c,f,L.EMPTY_NODE,se(t),l,r):h=c,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Wr(i,wn(e)),o.isLeafNode()&&(h=n.filter.updateFullNode(h,o,r)))}return o=e.serverCache.isFullyInitialized()||jr(i,Z())!=null,Qi(e,h,o,n.filter.filtersNodes())}}/**
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
 */class KC{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new dc(i.getIndex()),r=dC(i);this.processor_=BC(r);const o=t.serverCache,l=t.eventCache,c=s.updateFullNode(L.EMPTY_NODE,o.getNode(),null),h=r.updateFullNode(L.EMPTY_NODE,l.getNode(),null),f=new In(c,o.isFullyInitialized(),s.filtersNodes()),p=new In(h,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=To(p,f),this.eventGenerator_=new vC(this.query_)}get query(){return this.query_}}function QC(n){return n.viewCache_.serverCache.getNode()}function YC(n,e){const t=wn(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!K(e)&&!t.getImmediateChild($(e)).isEmpty())?t.getChild(e):null}function xd(n){return n.eventRegistrations_.length===0}function XC(n,e){n.eventRegistrations_.push(e)}function Ld(n,e,t){const i=[];if(t){D(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Fd(n,e,t,i){e.type===Je.MERGE&&e.source.queryId!==null&&(D(wn(n.viewCache_),"We should always have a full cache before handling merges"),D(Ya(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=WC(n.processor_,s,e,t,i);return qC(n.processor_,r.viewCache),D(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Z_(n,r.changes,r.viewCache.eventCache.getNode(),null)}function JC(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(ue,(r,o)=>{i.push(ii(r,o))}),t.isFullyInitialized()&&i.push(j_(t.getNode())),Z_(n,i,t.getNode(),e)}function Z_(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return EC(n.eventGenerator_,e,t,s)}/**
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
 */let Hr;class ZC{constructor(){this.views=new Map}}function eR(n){D(!Hr,"__referenceConstructor has already been defined"),Hr=n}function tR(){return D(Hr,"Reference.ts has not been loaded"),Hr}function nR(n){return n.views.size===0}function Tc(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return D(r!=null,"SyncTree gave us an op for an invalid query."),Fd(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Fd(o,e,t,i));return r}}function iR(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let l=Wr(t,s?i:null),c=!1;l?c=!0:i instanceof L?(l=yc(t,i),c=!1):(l=L.EMPTY_NODE,c=!1);const h=To(new In(l,c,!1),new In(i,s,!1));return new KC(e,h)}return o}function sR(n,e,t,i,s,r){const o=iR(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),XC(o,t),JC(o,t)}function rR(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const l=tn(n);if(s==="default")for(const[c,h]of n.views.entries())o=o.concat(Ld(h,t,i)),xd(h)&&(n.views.delete(c),h.query._queryParams.loadsAllData()||r.push(h.query));else{const c=n.views.get(s);c&&(o=o.concat(Ld(c,t,i)),xd(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return l&&!tn(n)&&r.push(new(tR())(e._repo,e._path)),{removed:r,events:o}}function em(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function zn(n,e){let t=null;for(const i of n.views.values())t=t||YC(i,e);return t}function tm(n,e){if(e._queryParams.loadsAllData())return Io(n);{const i=e._queryIdentifier;return n.views.get(i)}}function nm(n,e){return tm(n,e)!=null}function tn(n){return Io(n)!=null}function Io(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let zr;function oR(n){D(!zr,"__referenceConstructor has already been defined"),zr=n}function aR(){return D(zr,"Reference.ts has not been loaded"),zr}let lR=1;class Ud{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ie(null),this.pendingWriteTree_=xC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function im(n,e,t,i,s){return AC(n.pendingWriteTree_,e,t,i,s),s?mi(n,new Tn(pc(),e,t)):[]}function cR(n,e,t,i){CC(n.pendingWriteTree_,e,t,i);const s=ie.fromObject(t);return mi(n,new si(pc(),e,s))}function Lt(n,e,t=!1){const i=RC(n.pendingWriteTree_,e);if(SC(n.pendingWriteTree_,e)){let r=new ie(null);return i.snap!=null?r=r.set(Z(),!0):be(i.children,o=>{r=r.set(new te(o),!0)}),mi(n,new qr(i.path,r,t))}else return[]}function wo(n,e,t){return mi(n,new Tn(_c(),e,t))}function uR(n,e,t){const i=ie.fromObject(t);return mi(n,new si(_c(),e,i))}function hR(n,e){return mi(n,new fs(_c(),e))}function dR(n,e,t){const i=wc(n,t);if(i){const s=Ac(i),r=s.path,o=s.queryId,l=We(r,e),c=new fs(mc(o),l);return Cc(n,r,c)}else return[]}function nl(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||nm(o,e))){const c=rR(o,e,t,i);nR(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const h=c.removed;if(l=c.events,!s){const f=h.findIndex(m=>m._queryParams.loadsAllData())!==-1,p=n.syncPointTree_.findOnPath(r,(m,A)=>tn(A));if(f&&!p){const m=n.syncPointTree_.subtree(r);if(!m.isEmpty()){const A=_R(m);for(let S=0;S<A.length;++S){const N=A[S],k=N.query,j=om(n,N);n.listenProvider_.startListening(Xi(k),Gr(n,k),j.hashFn,j.onComplete)}}}!p&&h.length>0&&!i&&(f?n.listenProvider_.stopListening(Xi(e),null):h.forEach(m=>{const A=n.queryToTagMap.get(Ao(m));n.listenProvider_.stopListening(Xi(m),A)}))}mR(n,h)}return l}function fR(n,e,t,i){const s=wc(n,i);if(s!=null){const r=Ac(s),o=r.path,l=r.queryId,c=We(o,e),h=new Tn(mc(l),c,t);return Cc(n,o,h)}else return[]}function pR(n,e,t,i){const s=wc(n,i);if(s){const r=Ac(s),o=r.path,l=r.queryId,c=We(o,e),h=ie.fromObject(t),f=new si(mc(l),c,h);return Cc(n,o,f)}else return[]}function Bd(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(m,A)=>{const S=We(m,s);r=r||zn(A,S),o=o||tn(A)});let l=n.syncPointTree_.get(s);l?(o=o||tn(l),r=r||zn(l,Z())):(l=new ZC,n.syncPointTree_=n.syncPointTree_.set(s,l));let c;r!=null?c=!0:(c=!1,r=L.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((A,S)=>{const N=zn(S,Z());N&&(r=r.updateImmediateChild(A,N))}));const h=nm(l,e);if(!h&&!e._queryParams.loadsAllData()){const m=Ao(e);D(!n.queryToTagMap.has(m),"View does not exist, but we have a tag");const A=gR();n.queryToTagMap.set(m,A),n.tagToQueryMap.set(A,m)}const f=gc(n.pendingWriteTree_,s);let p=sR(l,e,t,f,r,c);if(!h&&!o&&!i){const m=tm(l,e);p=p.concat(yR(n,e,m))}return p}function Ic(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,l)=>{const c=We(o,e),h=zn(l,c);if(h)return h});return K_(s,e,r,t,!0)}function mi(n,e){return sm(e,n.syncPointTree_,null,gc(n.pendingWriteTree_,Z()))}function sm(n,e,t,i){if(K(n.path))return rm(n,e,t,i);{const s=e.get(Z());t==null&&s!=null&&(t=zn(s,Z()));let r=[];const o=$(n.path),l=n.operationForChild(o),c=e.children.get(o);if(c&&l){const h=t?t.getImmediateChild(o):null,f=Q_(i,o);r=r.concat(sm(l,c,h,f))}return s&&(r=r.concat(Tc(s,n,i,t))),r}}function rm(n,e,t,i){const s=e.get(Z());t==null&&s!=null&&(t=zn(s,Z()));let r=[];return e.children.inorderTraversal((o,l)=>{const c=t?t.getImmediateChild(o):null,h=Q_(i,o),f=n.operationForChild(o);f&&(r=r.concat(rm(f,l,c,h)))}),s&&(r=r.concat(Tc(s,n,i,t))),r}function om(n,e){const t=e.query,i=Gr(n,t);return{hashFn:()=>(QC(e)||L.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?dR(n,t._path,i):hR(n,t._path);{const r=uA(s,t);return nl(n,t,null,r)}}}}function Gr(n,e){const t=Ao(e);return n.queryToTagMap.get(t)}function Ao(n){return n._path.toString()+"$"+n._queryIdentifier}function wc(n,e){return n.tagToQueryMap.get(e)}function Ac(n){const e=n.indexOf("$");return D(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new te(n.substr(0,e))}}function Cc(n,e,t){const i=n.syncPointTree_.get(e);D(i,"Missing sync point for query tag that we're tracking");const s=gc(n.pendingWriteTree_,e);return Tc(i,t,s,null)}function _R(n){return n.fold((e,t,i)=>{if(t&&tn(t))return[Io(t)];{let s=[];return t&&(s=em(t)),be(i,(r,o)=>{s=s.concat(o)}),s}})}function Xi(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(aR())(n._repo,n._path):n}function mR(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Ao(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function gR(){return lR++}function yR(n,e,t){const i=e._path,s=Gr(n,e),r=om(n,t),o=n.listenProvider_.startListening(Xi(e),s,r.hashFn,r.onComplete),l=n.syncPointTree_.subtree(i);if(s)D(!tn(l.value),"If we're adding a query, it shouldn't be shadowed");else{const c=l.fold((h,f,p)=>{if(!K(h)&&f&&tn(f))return[Io(f).query];{let m=[];return f&&(m=m.concat(em(f).map(A=>A.query))),be(p,(A,S)=>{m=m.concat(S)}),m}});for(let h=0;h<c.length;++h){const f=c[h];n.listenProvider_.stopListening(Xi(f),Gr(n,f))}}return o}/**
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
 */class Rc{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Rc(t)}node(){return this.node_}}class Sc{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=ce(this.path_,e);return new Sc(this.syncTree_,t)}node(){return Ic(this.syncTree_,this.path_)}}const vR=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},qd=function(n,e,t){if(!n||typeof n!="object")return n;if(D(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return ER(n[".sv"],e,t);if(typeof n[".sv"]=="object")return TR(n[".sv"],e);D(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},ER=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:D(!1,"Unexpected server value: "+n)}},TR=function(n,e,t){n.hasOwnProperty("increment")||D(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&D(!1,"Unexpected increment value: "+i);const s=e.node();if(D(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},am=function(n,e,t,i){return bc(e,new Sc(t,n),i)},lm=function(n,e,t){return bc(n,new Rc(e),t)};function bc(n,e,t){const i=n.getPriority().val(),s=qd(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,l=qd(o.getValue(),e,t);return l!==o.getValue()||s!==o.getPriority().val()?new ve(l,Ie(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new ve(s))),o.forEachChild(ue,(l,c)=>{const h=bc(c,e.getImmediateChild(l),t);h!==c&&(r=r.updateImmediateChild(l,h))}),r}}/**
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
 */class Pc{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function kc(n,e){let t=e instanceof te?e:new te(e),i=n,s=$(t);for(;s!==null;){const r=Gn(i.node.children,s)||{children:{},childCount:0};i=new Pc(s,i,r),t=se(t),s=$(t)}return i}function gi(n){return n.node.value}function cm(n,e){n.node.value=e,il(n)}function um(n){return n.node.childCount>0}function IR(n){return gi(n)===void 0&&!um(n)}function Co(n,e){be(n.node.children,(t,i)=>{e(new Pc(t,n,i))})}function hm(n,e,t,i){t&&e(n),Co(n,s=>{hm(s,e,!0)})}function wR(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Ps(n){return new te(n.parent===null?n.name:Ps(n.parent)+"/"+n.name)}function il(n){n.parent!==null&&AR(n.parent,n.name,n)}function AR(n,e,t){const i=IR(t),s=ut(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,il(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,il(n))}/**
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
 */const CR=/[\[\].#$\/\u0000-\u001F\u007F]/,RR=/[\[\].#$\u0000-\u001F\u007F]/,ga=10*1024*1024,Nc=function(n){return typeof n=="string"&&n.length!==0&&!CR.test(n)},dm=function(n){return typeof n=="string"&&n.length!==0&&!RR.test(n)},SR=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),dm(n)},bR=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!ic(n)||n&&typeof n=="object"&&ut(n,".sv")},fm=function(n,e,t,i){i&&e===void 0||Ro(Yr(n,"value"),e,t)},Ro=function(n,e,t){const i=t instanceof te?new $A(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+dn(i));if(typeof e=="function")throw new Error(n+"contains a function "+dn(i)+" with contents = "+e.toString());if(ic(e))throw new Error(n+"contains "+e.toString()+" "+dn(i));if(typeof e=="string"&&e.length>ga/3&&Xr(e)>ga)throw new Error(n+"contains a string greater than "+ga+" utf8 bytes "+dn(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(be(e,(o,l)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Nc(o)))throw new Error(n+" contains an invalid key ("+o+") "+dn(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);HA(i,o),Ro(n,l,i),zA(i)}),s&&r)throw new Error(n+' contains ".value" child '+dn(i)+" in addition to actual children.")}},PR=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=cs(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Nc(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(jA);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&Ke(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},kR=function(n,e,t,i){const s=Yr(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];be(e,(o,l)=>{const c=new te(o);if(Ro(s,l,ce(t,c)),lc(c)===".priority"&&!bR(l))throw new Error(s+"contains an invalid value for '"+c.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(c)}),PR(s,r)},pm=function(n,e,t,i){if(!dm(t))throw new Error(Yr(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},NR=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),pm(n,e,t)},Dc=function(n,e){if($(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},DR=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Nc(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!SR(t))throw new Error(Yr(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class OR{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function So(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!cc(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function _m(n,e,t){So(n,t),mm(n,i=>cc(i,e))}function nt(n,e,t){So(n,t),mm(n,i=>Ke(i,e)||Ke(e,i))}function mm(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(VR(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function VR(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Gi&&Ce("event: "+t.toString()),_i(i)}}}/**
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
 */const MR="repo_interrupt",xR=25;class LR{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new OR,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Br(),this.transactionQueueTree_=new Pc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function FR(n,e,t){if(n.stats_=oc(n.repoInfo_),n.forceRestClient_||pA())n.server_=new Ur(n.repoInfo_,(i,s,r,o)=>{Wd(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>jd(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{we(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new vt(n.repoInfo_,e,(i,s,r,o)=>{Wd(n,i,s,r,o)},i=>{jd(n,i)},i=>{UR(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=vA(n.repoInfo_,()=>new yC(n.stats_,n.server_)),n.infoData_=new fC,n.infoSyncTree_=new Ud({startListening:(i,s,r,o)=>{let l=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(l=wo(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),Oc(n,"connected",!1),n.serverSyncTree_=new Ud({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(l,c)=>{const h=o(l,c);nt(n.eventQueue_,i._path,h)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function gm(n){const t=n.infoData_.getNode(new te(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function bo(n){return vR({timestamp:gm(n)})}function Wd(n,e,t,i,s){n.dataUpdateCount++;const r=new te(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=gr(t,h=>Ie(h));o=pR(n.serverSyncTree_,r,c,s)}else{const c=Ie(t);o=fR(n.serverSyncTree_,r,c,s)}else if(i){const c=gr(t,h=>Ie(h));o=uR(n.serverSyncTree_,r,c)}else{const c=Ie(t);o=wo(n.serverSyncTree_,r,c)}let l=r;o.length>0&&(l=oi(n,r)),nt(n.eventQueue_,l,o)}function jd(n,e){Oc(n,"connected",e),e===!1&&WR(n)}function UR(n,e){be(e,(t,i)=>{Oc(n,t,i)})}function Oc(n,e,t){const i=new te("/.info/"+e),s=Ie(t);n.infoData_.updateSnapshot(i,s);const r=wo(n.infoSyncTree_,i,s);nt(n.eventQueue_,i,r)}function Vc(n){return n.nextWriteId_++}function BR(n,e,t,i,s){Po(n,"set",{path:e.toString(),value:t,priority:i});const r=bo(n),o=Ie(t,i),l=Ic(n.serverSyncTree_,e),c=lm(o,l,r),h=Vc(n),f=im(n.serverSyncTree_,e,c,h,!0);So(n.eventQueue_,f),n.server_.put(e.toString(),o.val(!0),(m,A)=>{const S=m==="ok";S||Ue("set at "+e+" failed: "+m);const N=Lt(n.serverSyncTree_,h,!S);nt(n.eventQueue_,e,N),sl(n,s,m,A)});const p=xc(n,e);oi(n,p),nt(n.eventQueue_,p,[])}function qR(n,e,t,i){Po(n,"update",{path:e.toString(),value:t});let s=!0;const r=bo(n),o={};if(be(t,(l,c)=>{s=!1,o[l]=am(ce(e,l),Ie(c),n.serverSyncTree_,r)}),s)Ce("update() called with empty data.  Don't do anything."),sl(n,i,"ok",void 0);else{const l=Vc(n),c=cR(n.serverSyncTree_,e,o,l);So(n.eventQueue_,c),n.server_.merge(e.toString(),t,(h,f)=>{const p=h==="ok";p||Ue("update at "+e+" failed: "+h);const m=Lt(n.serverSyncTree_,l,!p),A=m.length>0?oi(n,e):e;nt(n.eventQueue_,A,m),sl(n,i,h,f)}),be(t,h=>{const f=xc(n,ce(e,h));oi(n,f)}),nt(n.eventQueue_,e,[])}}function WR(n){Po(n,"onDisconnectEvents");const e=bo(n),t=Br();Qa(n.onDisconnect_,Z(),(s,r)=>{const o=am(s,r,n.serverSyncTree_,e);$_(t,s,o)});let i=[];Qa(t,Z(),(s,r)=>{i=i.concat(wo(n.serverSyncTree_,s,r));const o=xc(n,s);oi(n,o)}),n.onDisconnect_=Br(),nt(n.eventQueue_,Z(),i)}function jR(n,e,t){let i;$(e._path)===".info"?i=Bd(n.infoSyncTree_,e,t):i=Bd(n.serverSyncTree_,e,t),_m(n.eventQueue_,e._path,i)}function $R(n,e,t){let i;$(e._path)===".info"?i=nl(n.infoSyncTree_,e,t):i=nl(n.serverSyncTree_,e,t),_m(n.eventQueue_,e._path,i)}function HR(n){n.persistentConnection_&&n.persistentConnection_.interrupt(MR)}function Po(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Ce(t,...e)}function sl(n,e,t,i){e&&_i(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function ym(n,e,t){return Ic(n.serverSyncTree_,e,t)||L.EMPTY_NODE}function Mc(n,e=n.transactionQueueTree_){if(e||ko(n,e),gi(e)){const t=Em(n,e);D(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&zR(n,Ps(e),t)}else um(e)&&Co(e,t=>{Mc(n,t)})}function zR(n,e,t){const i=t.map(h=>h.currentWriteId),s=ym(n,e,i);let r=s;const o=s.hash();for(let h=0;h<t.length;h++){const f=t[h];D(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const p=We(e,f.path);r=r.updateChild(p,f.currentOutputSnapshotRaw)}const l=r.val(!0),c=e;n.server_.put(c.toString(),l,h=>{Po(n,"transaction put response",{path:c.toString(),status:h});let f=[];if(h==="ok"){const p=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(Lt(n.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&p.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();ko(n,kc(n.transactionQueueTree_,e)),Mc(n,n.transactionQueueTree_),nt(n.eventQueue_,e,f);for(let m=0;m<p.length;m++)_i(p[m])}else{if(h==="datastale")for(let p=0;p<t.length;p++)t[p].status===3?t[p].status=4:t[p].status=0;else{Ue("transaction at "+c.toString()+" failed: "+h);for(let p=0;p<t.length;p++)t[p].status=4,t[p].abortReason=h}oi(n,e)}},o)}function oi(n,e){const t=vm(n,e),i=Ps(t),s=Em(n,t);return GR(n,s,i),i}function GR(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const c=e[l],h=We(t,c.path);let f=!1,p;if(D(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)f=!0,p=c.abortReason,s=s.concat(Lt(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=xR)f=!0,p="maxretry",s=s.concat(Lt(n.serverSyncTree_,c.currentWriteId,!0));else{const m=ym(n,c.path,o);c.currentInputSnapshot=m;const A=e[l].update(m.val());if(A!==void 0){Ro("transaction failed: Data returned ",A,c.path);let S=Ie(A);typeof A=="object"&&A!=null&&ut(A,".priority")||(S=S.updatePriority(m.getPriority()));const k=c.currentWriteId,j=bo(n),z=lm(S,m,j);c.currentOutputSnapshotRaw=S,c.currentOutputSnapshotResolved=z,c.currentWriteId=Vc(n),o.splice(o.indexOf(k),1),s=s.concat(im(n.serverSyncTree_,c.path,z,c.currentWriteId,c.applyLocally)),s=s.concat(Lt(n.serverSyncTree_,k,!0))}else f=!0,p="nodata",s=s.concat(Lt(n.serverSyncTree_,c.currentWriteId,!0))}nt(n.eventQueue_,t,s),s=[],f&&(e[l].status=2,function(m){setTimeout(m,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(p==="nodata"?i.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):i.push(()=>e[l].onComplete(new Error(p),!1,null))))}ko(n,n.transactionQueueTree_);for(let l=0;l<i.length;l++)_i(i[l]);Mc(n,n.transactionQueueTree_)}function vm(n,e){let t,i=n.transactionQueueTree_;for(t=$(e);t!==null&&gi(i)===void 0;)i=kc(i,t),e=se(e),t=$(e);return i}function Em(n,e){const t=[];return Tm(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Tm(n,e,t){const i=gi(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Co(e,s=>{Tm(n,s,t)})}function ko(n,e){const t=gi(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,cm(e,t.length>0?t:void 0)}Co(e,i=>{ko(n,i)})}function xc(n,e){const t=Ps(vm(n,e)),i=kc(n.transactionQueueTree_,e);return wR(i,s=>{ya(n,s)}),ya(n,i),hm(i,s=>{ya(n,s)}),t}function ya(n,e){const t=gi(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(D(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(D(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Lt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?cm(e,void 0):t.length=r+1,nt(n.eventQueue_,Ps(e),s);for(let o=0;o<i.length;o++)_i(i[o])}}/**
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
 */function KR(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function QR(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):Ue(`Invalid query segment '${t}' in query '${n}'`)}return e}const $d=function(n,e){const t=YR(n),i=t.namespace;t.domain==="firebase.com"&&Ct(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&Ct("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||rA();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new S_(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new te(t.pathString)}},YR=function(n){let e="",t="",i="",s="",r="",o=!0,l="https",c=443;if(typeof n=="string"){let h=n.indexOf("//");h>=0&&(l=n.substring(0,h-1),n=n.substring(h+2));let f=n.indexOf("/");f===-1&&(f=n.length);let p=n.indexOf("?");p===-1&&(p=n.length),e=n.substring(0,Math.min(f,p)),f<p&&(s=KR(n.substring(f,p)));const m=QR(n.substring(Math.min(n.length,p)));h=e.indexOf(":"),h>=0?(o=l==="https"||l==="wss",c=parseInt(e.substring(h+1),10)):h=e.length;const A=e.slice(0,h);if(A.toLowerCase()==="localhost")t="localhost";else if(A.split(".").length<=2)t=A;else{const S=e.indexOf(".");i=e.substring(0,S).toLowerCase(),t=e.substring(S+1),r=i}"ns"in m&&(r=m.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:l,pathString:s,namespace:r}};/**
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
 */const Hd="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",XR=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Hd.charAt(t%64),t=Math.floor(t/64);D(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Hd.charAt(e[s]);return D(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class JR{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+we(this.snapshot.exportVal())}}class ZR{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class eS{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return D(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Lc{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return K(this._path)?null:lc(this._path)}get ref(){return new on(this._repo,this._path)}get _queryIdentifier(){const e=Pd(this._queryParams),t=sc(e);return t==="{}"?"default":t}get _queryObject(){return Pd(this._queryParams)}isEqual(e){if(e=he(e),!(e instanceof Lc))return!1;const t=this._repo===e._repo,i=cc(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+WA(this._path)}}class on extends Lc{constructor(e,t){super(e,t,new fc,!1)}get parent(){const e=x_(this._path);return e===null?null:new on(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Kr{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new te(e),i=ps(this.ref,e);return new Kr(this._node.getChild(t),i,ue)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Kr(s,ps(this.ref,i),ue)))}hasChild(e){const t=new te(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function SS(n,e){return n=he(n),n._checkNotDeleted("ref"),e!==void 0?ps(n._root,e):n._root}function ps(n,e){return n=he(n),$(n._path)===null?NR("child","path",e):pm("child","path",e),new on(n._repo,ce(n._path,e))}function bS(n,e){n=he(n),Dc("push",n._path),fm("push",e,n._path,!0);const t=gm(n._repo),i=XR(t),s=ps(n,i),r=ps(n,i);let o;return o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function PS(n){return Dc("remove",n._path),tS(n,null)}function tS(n,e){n=he(n),Dc("set",n._path),fm("set",e,n._path,!1);const t=new _s;return BR(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function kS(n,e){kR("update",e,n._path);const t=new _s;return qR(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}class Fc{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new JR("value",this,new Kr(e.snapshotNode,new on(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new ZR(this,e,t):null}matches(e){return e instanceof Fc?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function nS(n,e,t,i,s){const r=new eS(t,void 0),o=new Fc(r);return jR(n._repo,n,o),()=>$R(n._repo,n,o)}function NS(n,e,t,i){return nS(n,"value",e)}eR(on);oR(on);/**
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
 */const iS="FIREBASE_DATABASE_EMULATOR_HOST",rl={};let sS=!1;function rS(n,e,t,i){n.repoInfo_=new S_(e,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function oS(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||Ct("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Ce("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=$d(r,s),l=o.repoInfo,c;typeof process<"u"&&hd&&(c=hd[iS]),c?(r=`http://${c}?ns=${l.namespace}`,o=$d(r,s),l=o.repoInfo):o.repoInfo.secure;const h=new mA(n.name,n.options,e);DR("Invalid Firebase Database URL",o),K(o.path)||Ct("Database URL must point to the root of a Firebase Database (not including a child path).");const f=lS(l,n,h,new _A(n,t));return new cS(f,n)}function aS(n,e){const t=rl[e];(!t||t[n.key]!==n)&&Ct(`Database ${e}(${n.repoInfo_}) has already been deleted.`),HR(n),delete t[n.key]}function lS(n,e,t,i){let s=rl[e.name];s||(s={},rl[e.name]=s);let r=s[n.toURLString()];return r&&Ct("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new LR(n,sS,t,i),s[n.toURLString()]=r,r}class cS{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(FR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new on(this._repo,Z())),this._rootInternal}_delete(){return this._rootInternal!==null&&(aS(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ct("Cannot call "+e+" on a deleted database.")}}function DS(n=cl(),e){const t=Zr(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Xd("database");i&&uS(t,...i)}return t}function uS(n,e,t,i={}){n=he(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Ht(i,r.repoInfo_.emulatorOptions))return;Ct("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&Ct('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new pr(pr.OWNER);else if(i.mockUserToken){const l=typeof i.mockUserToken=="string"?i.mockUserToken:ef(i.mockUserToken,n.app.options.projectId);o=new pr(l)}rS(r,s,i,o)}/**
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
 */function hS(n){Zw(An),mn(new zt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return oS(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),st(dd,fd,n),st(dd,fd,"esm2017")}vt.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};vt.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};hS();export{ge as T,yS as a,DS as b,mS as c,wS as d,gS as e,RS as f,fS as g,NS as h,by as i,tS as j,PS as k,IS as l,kS as m,dS as n,TS as o,bS as p,vS as q,SS as r,AS as s,CS as u,ES as w};
//# sourceMappingURL=firebase-gxqvVCcn.js.map
