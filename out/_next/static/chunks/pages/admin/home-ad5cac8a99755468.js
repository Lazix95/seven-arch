(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[794],{8364:function(e,n,t){"use strict";var r=t(4836);n.Z=void 0;var a=r(t(4938)),l=t(5893),i=(0,a.default)((0,l.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12 1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}),"DeleteForever");n.Z=i},8014:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/home",function(){return t(3429)}])},5601:function(e,n,t){"use strict";t.d(n,{p:function(){return a}});var r=t(9658);async function a(){let e=await (0,r.SX)({folder:"sliderImages"});return{sliderImages:e}}},4349:function(e,n,t){"use strict";t.d(n,{c:function(){return l}});var r=t(5893),a=t(5861);function l(e){let{level:n,text:t,children:l,color:i="text.primary",...s}=e;return(0,r.jsx)(a.Z,{variant:"h".concat(n),color:i,...s,children:l||t})}},5922:function(e,n,t){"use strict";t.d(n,{t:function(){return g}});var r=t(5893),a=t(7294),l=t(7258),i=t.n(l),s=t(6886),o=t(7091);let c=e=>new Promise((n,t)=>{let r=new FileReader;r.onloadend=()=>{n(r.result)},r.onerror=t,r.readAsDataURL(e)});function d(){return(0,r.jsx)("div",{style:{width:"100%"}})}var u=t(3321);function h(e){let{label:n="Upload",onChange:t}=e;async function a(e){var n;let r=null===(n=e.target.files)||void 0===n?void 0:n[0];if(r){let e=await c(r);return null==t?void 0:t(r,e)}}return(0,r.jsxs)(u.Z,{variant:"outlined",component:"label",children:[(0,r.jsx)("span",{children:n}),(0,r.jsx)("input",{onChange:a,type:"file",hidden:!0})]})}var f=t(6093),p=t(8364),x=t(6345);let g=e=>{let{onChange:n,previewUrl:t,name:l,label:u,noPreview:g}=e,[y,v]=(0,a.useState)(null);(0,a.useEffect)(()=>{v(null!=t?t:null)},[t]);let m=async e=>{var t;e.preventDefault();let r=null===(t=e.dataTransfer)||void 0===t?void 0:t.files[0];null==n||n(null!=l?l:"",r),g||v(await c(r))};async function _(e,t){null==n||n(null!=l?l:"",e),g||v(t)}return(0,r.jsx)(f.q,{style:{aspectRatio:"16/9",width:"100%",height:"100%",marginBottom:"20px"},centerText:!0,label:u,children:(0,r.jsx)("div",{className:i().dropzone,children:(0,r.jsx)("div",{onDrop:m,onDragOver:e=>{e.preventDefault()},onDragLeave:e=>{e.preventDefault()},style:{aspectRatio:"16/9",width:"100%",height:"100%"},children:(0,r.jsx)(s.ZP,{style:{height:"100%"},container:!0,alignContent:"center",children:(0,r.jsxs)(s.ZP,{style:{height:y?"100%":"auto"},item:!0,xs:12,children:[(0,r.jsxs)(o.A,{RIf:!!y,children:[(0,r.jsx)("img",{src:y,alt:"Uploaded",className:i().image}),(0,r.jsx)("div",{className:i().overlay,children:(0,r.jsx)(x.g,{onClick:()=>{v(null)},btnType:"Icon",children:(0,r.jsx)(p.Z,{style:{fontSize:"30px"}})})})]}),(0,r.jsxs)(o.A,{RIf:!y,children:[(0,r.jsx)("span",{children:"Drag and drop an image here"}),(0,r.jsx)(d,{}),(0,r.jsx)("span",{children:"or"}),(0,r.jsx)(d,{}),(0,r.jsx)(h,{onChange:_})]})]})})})})})}},5429:function(e,n,t){"use strict";t.d(n,{L:function(){return d}});var r=t(5893),a=t(7294),l=t(7690),i=t(7091),s=t(6886),o=t(8456);function c(){return(0,r.jsx)("div",{style:{width:"100%",height:"100%",display:"flex",flex:"auto",flexDirection:"column",justifyContent:"center"},children:(0,r.jsx)(s.ZP,{alignSelf:"center",item:!0,children:(0,r.jsx)(o.Z,{})})})}function d(e){let{children:n,validation:t=!0,grid:s=!0,isLoading:o,spacing:d=3,onSubmit:u}=e,h=(0,a.useRef)(null);return o?(0,r.jsx)(c,{}):(0,r.jsx)("form",{ref:h,onSubmit:function(e){e.preventDefault(),(!t||!h.current||h.current.checkValidity())&&(new FormData(e.currentTarget),null==u||u())},children:(0,r.jsx)(i.A,{RIf:s,Fallback:()=>(0,r.jsx)(r.Fragment,{children:n}),children:(0,r.jsx)(l.e,{style:{width:"100%"},centerX:!0,column:!0,spacing:d,mt:0,mb:5,children:n})})})}},6093:function(e,n,t){"use strict";t.d(n,{q:function(){return o}});var r=t(5893),a=t(3758),l=t(7294),i=t(1362);let s=l.forwardRef((e,n)=>(0,r.jsx)("div",{...e,ref:n})),o=e=>{let{children:n,label:t,...l}=e;return(0,r.jsx)(i.z,{centerText:!0,...l,children:(0,r.jsx)(a.Z,{fullWidth:!0,variant:"outlined",label:t,multiline:!0,InputLabelProps:{component:"span",shrink:!0},InputProps:{inputComponent:s},inputProps:{children:n}})})}},5911:function(e,n,t){"use strict";t.d(n,{C:function(){return l}});var r=t(7294);function a(e,n){switch(n.type){case"SET_DATA":return{...n.payload};case"UPDATE_DATA":return{...e,...n.payload};case"CLEAR":return{};case"ADD_TO_ARRAY":var t;let r=n.payload.key,a=null===(t=n.payload)||void 0===t?void 0:t.item,l=e[r];return{...e,[r]:[...l,a]};case"DELETE_ITEM_FROM_ARRAY":let i=n.payload.key,s=n.payload.idKey,o=n.payload.idValue,c=e[i].filter(e=>e[s]!==o);return{...e,[i]:c};default:return{...e}}}function l(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],[t,l]=(0,r.useReducer)(a,e),[i,s]=(0,r.useState)(!1);function o(e){l({type:"SET_DATA",payload:e})}return(0,r.useEffect)(()=>{async function e(){try{s(!0);let e=n.map(e=>e());await new Promise(e=>setInterval(e,4e3));let t=await Promise.all(e),r=t.reduce((e,n)=>({...e,...n}),{});o(r)}finally{s(!1)}}n&&n.length>0&&e()},[]),{state:t,initialLoading:i,setState:o,updateState:function(e){l({type:"UPDATE_DATA",payload:e})},clearState:function(){l({type:"CLEAR"})},addToArrayInState:function(e,n){l({type:"ADD_TO_ARRAY",payload:{key:e,item:n}})},deleteFromArrayInState:function(e,n,t){l({type:"DELETE_ITEM_FROM_ARRAY",payload:{key:e,idKey:n,idValue:t}})}}}},3429:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return D},default:function(){return P}});var r=t(5893),a=t(8328),l=t(3619),i=t(6886),s=t(8456),o=t(6093),c=t(6345),d=t(8364),u=t(938),h=t.n(u),f=t(7091);function p(e){let{loading:n,images:t=[],onRemoveImage:a}=e;return(0,r.jsx)(o.q,{className:h()["shared-galery"],label:"Slider Images",style:{marginBottom:"20px"},children:(0,r.jsxs)(i.ZP,{container:!0,spacing:4,children:[t.map(e=>(0,r.jsx)(i.ZP,{item:!0,xs:3,style:{height:"150px"},children:(0,r.jsxs)("div",{className:h()["shared-galery__hover-zone"],style:{height:"100%"},children:[(0,r.jsx)("div",{className:h()["shared-galery__overlay"],children:(0,r.jsx)(c.g,{onClick:()=>{null==a||a(e)},btnType:"Icon",children:(0,r.jsx)(d.Z,{style:{fontSize:"30px"}})})}),(0,r.jsx)("div",{style:{height:"100%",width:"100%",backgroundImage:"url(".concat(e.url,")"),backgroundPosition:"center",backgroundSize:"cover"}})]})},e.dbPath)),(0,r.jsx)(f.A,{RIf:n,children:(0,r.jsx)(i.ZP,{item:!0,xs:3,style:{height:"150px"},children:(0,r.jsx)(s.Z,{style:{marginTop:"30px"}})})})]})})}var x=t(5922),g=t(5429),y=t(4349),v=t(1362);function m(e){let{text:n,children:t,...a}=e;return(0,r.jsx)(v.z,{centerText:!0,children:(0,r.jsx)(y.c,{...a,children:null!=t?t:n})})}function _(e){let{images:n,isUploadLoading:t,isLoading:a,onUploadImage:l,onRemoveImage:i}=e;return(0,r.jsxs)(g.L,{isLoading:a,children:[(0,r.jsx)(m,{level:4,text:"Home Page"}),(0,r.jsx)(p,{loading:t,onRemoveImage:function(e){i(e)},images:n}),(0,r.jsx)(x.t,{label:"Add Slider Image",noPreview:!0,onChange:function(e,n){l(n)}})]})}var j=t(5601),A=t(5911),w=t(9658),I=t(6650),S=t(3724);async function R(e){let n=e?(0,I.iH)(S.IG,e):null;if(!n)throw Error("Storage Reference do not exist");await (0,I.oq)(n)}let T=[a.T,j.p];(0,l.M)(T);var D=!0,P=function(e){var n;let{sliderImages:t}=e,{state:a,addToArrayInState:l,updateState:i,deleteFromArrayInState:s,initialLoading:o}=(0,A.C)({sliderImages:null!=t?t:[]},T);async function c(e){try{i({isSaveLoading:!0});let n=await (0,w.r3)({folder:"sliderImages",image:e});l("sliderImages",n)}finally{i({isSaveLoading:!1})}}async function d(e){try{i({isDeleteLoading:!0}),await R(e.dbPath),s("sliderImages","dbPath",e.dbPath)}finally{i({isDeleteLoading:!1})}}return(0,r.jsx)(_,{isLoading:o,isUploadLoading:null!==(n=a.isSaveLoading)&&void 0!==n&&n,onUploadImage:c,onRemoveImage:d,images:a.sliderImages})}},938:function(e){e.exports={"shared-galery__hover-zone":"SharedGalery_shared-galery__hover-zone__S__2x","shared-galery__overlay":"SharedGalery_shared-galery__overlay__w6sHa"}},7258:function(e){e.exports={overlay:"SharedImageUpload_overlay__BkReM",dropzone:"SharedImageUpload_dropzone__HCM79",image:"SharedImageUpload_image__lMATb"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8014)}),_N_E=e.O()}]);