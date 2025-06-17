import{r as o,j as t}from"./react-rfUEOKBT.js";import{q as r}from"./styled-components-BzLUfkZ7.js";import{S as c,M as w}from"./antd-j42DH-28.js";import{A as I,m as a}from"./framer-motion-BahAblW5.js";import{M as k,a_ as C}from"./@ant-design-BOJYnYvx.js";import"./@sentry-C9RpjZZ5.js";import"./hoist-non-react-statics-DzxTubvU.js";import"./react-is-CkhetEIG.js";import"./shallowequal-DAPzeuxg.js";import"./@emotion-CJOp8bw3.js";import"./rc-util-C_kT1Pk-.js";import"./@babel-DQaiFHLa.js";import"./react-dom-CWvG3IXd.js";import"./scheduler-C323NY8X.js";import"./classnames-C28gIRGy.js";import"./rc-resize-observer-CVw_Y2pA.js";import"./resize-observer-polyfill-BlcKtro_.js";import"./rc-pagination-KA8P55Kf.js";import"./rc-picker-DH5JTmAh.js";import"./dayjs-DQ_OJjfb.js";import"./rc-motion-F1MUgz2i.js";import"./@rc-component-DxyG_Y2B.js";import"./rc-overflow-CaWLhvk3.js";import"./scroll-into-view-if-needed-DzP2pgWD.js";import"./compute-scroll-into-view-DX-5lRff.js";import"./rc-notification-D74cTc8r.js";import"./rc-collapse-BI4JetZt.js";import"./rc-dialog-fBSOMSMf.js";import"./rc-field-form-BUHLZMO7.js";import"./rc-select-DqdyuVBS.js";import"./rc-virtual-list-Qta6jkBc.js";import"./rc-tooltip-CG8TVdPc.js";import"./rc-dropdown-CtvU_cpG.js";import"./rc-menu-DuuJLGul.js";import"./rc-checkbox-BWD1hXIW.js";import"./rc-tabs-Cr99MSui.js";import"./rc-cascader-BLh4hl1a.js";import"./rc-tree-iXRYS6u9.js";import"./rc-segmented-BKWhqiCO.js";import"./rc-input-number-C8RExCFJ.js";import"./rc-input-BrplG3Px.js";import"./rc-slider-Cxg2mE7Z.js";import"./rc-drawer-CImWsfBY.js";import"./rc-image-DZmcFfgd.js";import"./rc-textarea-TypTsaWD.js";import"./throttle-debounce-CUWDS_la.js";import"./rc-mentions-B3qlsLWL.js";import"./rc-progress-CqcvTdp4.js";import"./rc-rate-BgFFP8Cu.js";import"./rc-steps-DaZHkSYD.js";import"./rc-switch-BwrdY8B1.js";import"./rc-table-CTaRmOEq.js";import"./rc-tree-select-BHlP8Nzj.js";import"./copy-to-clipboard-U8AMuClB.js";import"./toggle-selection-DGa8lynz.js";import"./rc-upload-BFAmo5YR.js";import"./json2mq-C8mWzkA0.js";import"./string-convert-Bhuo--sE.js";const Bt=({images:p=[],loading:g=!1})=>{const[x,s]=o.useState(!1),[h,f]=o.useState(""),[l,u]=o.useState(""),[y,n]=o.useState({}),m=o.useCallback((e,i)=>{f(e.img),u(`Imagen ${i+1}`),s(!0)},[]),b=o.useCallback(e=>{n(i=>({...i,[e]:!1}))},[]),v=o.useCallback(e=>{n(i=>({...i,[e]:!1}))},[]),j=o.useCallback(e=>{n(i=>({...i,[e]:!0}))},[]);return g?t.jsx(S,{children:t.jsx(c,{size:"large",tip:"Cargando galería..."})}):p.length?t.jsxs(t.Fragment,{children:[t.jsx(T,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.6,ease:"easeOut"},children:t.jsx(I,{children:p.map((e,i)=>t.jsxs(E,{initial:{opacity:0,scale:.8,y:30},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.8,y:-30},transition:{duration:.5,delay:i*.1,ease:"easeOut"},whileHover:{scale:1.03,y:-5,transition:{duration:.2}},whileTap:{scale:.98},children:[t.jsxs(O,{children:[y[i]&&t.jsx(H,{children:t.jsx(c,{size:"small"})}),t.jsx(P,{src:e.img,alt:`Imagen ${i+1} - ${e.title||"Sin título"}`,onLoad:()=>b(i),onError:()=>v(i),onLoadStart:()=>j(i),loading:"lazy"}),t.jsxs($,{initial:{opacity:0},whileHover:{opacity:1},transition:{duration:.2},children:[t.jsx(d,{onClick:()=>m(e,i),whileHover:{scale:1.1},whileTap:{scale:.9},children:t.jsx(k,{})}),t.jsx(d,{onClick:()=>m(e,i),whileHover:{scale:1.1},whileTap:{scale:.9},children:t.jsx(C,{})})]})]}),e.title&&t.jsx(M,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{delay:i*.1+.3},children:e.title})]},i))})}),t.jsx(w,{open:x,title:l,footer:null,onCancel:()=>s(!1),width:"80%",style:{top:20},destroyOnHidden:!0,children:t.jsx(R,{src:h,alt:l})})]}):t.jsx(z,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:t.jsx(L,{children:"No hay imágenes disponibles"})})},S=r.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 2rem;
`,z=r(a.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  margin: 1rem;
`,L=r.p`
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
`,T=r(a.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 12px;
  }
`,E=r(a.div)`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`,O=r.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
`,P=r.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
`,H=r.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 2;
`,$=r(a.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  opacity: 0;
`,d=r(a.button)`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1f2937;
  font-size: 18px;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: var(--color, #1890ff);
  }
`,M=r(a.p)`
  padding: 16px;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
  line-height: 1.4;
`,R=r.img`
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 8px;
`;export{Bt as ImageGallery};
//# sourceMappingURL=ImageGallery-FB0NTUOG.js.map
