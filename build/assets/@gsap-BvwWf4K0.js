import{r as o}from"./react-rfUEOKBT.js";import{g as x}from"./gsap-THuJE7GK.js";/*!
 * @gsap/react 2.1.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/let c=typeof document<"u"?o.useLayoutEffect:o.useEffect,p=e=>e&&!Array.isArray(e)&&typeof e=="object",u=[],S={},a=x;const m=(e,t=u)=>{let r=S;p(e)?(r=e,e=null,t="dependencies"in r?r.dependencies:u):p(t)&&(r=t,t="dependencies"in r?r.dependencies:u),e&&typeof e!="function"&&console.warn("First parameter must be a function or config object");const{scope:f,revertOnUpdate:g}=r,s=o.useRef(!1),n=o.useRef(a.context(()=>{},f)),y=o.useRef(d=>n.current.add(null,d)),i=t&&t.length&&!g;return i&&c(()=>(s.current=!0,()=>n.current.revert()),u),c(()=>{if(e&&n.current.add(e,f),!i||!s.current)return()=>n.current.revert()},t),{context:n.current,contextSafe:y.current}};m.register=e=>{a=e};m.headless=!0;export{m as u};
//# sourceMappingURL=@gsap-BvwWf4K0.js.map
