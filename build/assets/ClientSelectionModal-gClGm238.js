import{r as a,j as t}from"./react-rfUEOKBT.js";import{$ as d,q as s}from"./styled-components-BzLUfkZ7.js";import{A as l,m as p}from"./framer-motion-BahAblW5.js";import"./@sentry-C9RpjZZ5.js";import"./hoist-non-react-statics-DzxTubvU.js";import"./react-is-CkhetEIG.js";import"./shallowequal-DAPzeuxg.js";import"./@emotion-CJOp8bw3.js";const m=d`
  .ant-dropdown {
    z-index: 10000001 !important;
  }
`,f=s.div`
  position: fixed;
  top: 2.75em;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: opacity;
  backdrop-filter: blur(2px);
  z-index: 99;
`,u=s(p.div)`
  position: fixed;
  z-index: 100000;
  top: 3em;
  max-width: 700px;
  right: 0;
  overflow: hidden;
  height: calc(100vh - 3.2em);
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  border-radius: 10px;
  width: 100%;
  border: 1px solid #c7c7c7;
  background-color: #fff;
`,x={hidden:{y:"-100%",opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:260,damping:24,mass:.4}},exit:{y:"-100%",opacity:0,transition:{duration:.25}}},E=({isOpen:n,onClose:o,children:c})=>{const e=a.useRef(null);return a.useEffect(()=>{const r=i=>{e.current&&!e.current.contains(i.target)&&(i.target.closest(".ant-input")||i.target.closest(".ant-input-affix-wrapper")||i.target.closest("[data-client-control-input]")||i.target.closest(".ant-btn")||i.target.hasAttribute("data-client-control-input")||o())};return n&&document.addEventListener("mousedown",r),()=>document.removeEventListener("mousedown",r)},[n,o]),t.jsxs(t.Fragment,{children:[t.jsx(m,{}),t.jsx(l,{mode:"wait",initial:!1,children:n&&t.jsxs(t.Fragment,{children:[t.jsx(f,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.18},onClick:o},"ov"),t.jsx(u,{ref:e,variants:x,initial:"hidden",animate:"visible",exit:"exit",children:c})]})})]})};export{E as ClientSelectionModal};
//# sourceMappingURL=ClientSelectionModal-gClGm238.js.map
