"use strict";(self.webpackChunktask_page=self.webpackChunktask_page||[]).push([[877],{877:(e,s,n)=>{n.r(s),n.d(s,{NewTask:()=>w,default:()=>g});var a=n(216),l=n(43),r=n(110),t=n(125),c=n(124),i=n(919),o=n(535),d=n(890),u=n(459),h=n(197),p=n(925),v=n(509),x=n(758),f=n(612),m=n(232),j=n(579);function w(){var e;const s=(0,a.Zp)(),n=(0,t.Us)(),[w,g]=(0,l.useState)(new f.Y);(0,l.useEffect)((()=>{m.P.getAuth().then((e=>{w.responsibleId=""+(null===e||void 0===e?void 0:e.user_id),g(new f.Y(w))}))}),[]);const N=(0,l.useMemo)((()=>[{value:"-1",label:"-"}].concat(Array.from(n.persons.values()).map((e=>({value:e.ID,label:`${e.LAST_NAME} ${e.NAME}`}))))),[n.persons]);return(0,j.jsxs)("div",{className:"wrapper",children:[(0,j.jsx)("div",{className:"wrapper-header",children:(0,j.jsx)(h.h,{children:"\u041f\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u0434\u0430\u0447\u0443"})}),(0,j.jsx)("div",{className:"wrapper-content",children:(0,j.jsx)(i.m,{children:(0,j.jsxs)(p.e,{className:"newTask",children:[(0,j.jsxs)("div",{className:"ui-form-row",children:[(0,j.jsx)(x.E,{children:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435:"}),(0,j.jsx)(d.f,{className:"report-text",cols:40,rows:3,value:w.title,placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438",onChange:function(e){const s=new f.Y(w);s.title=e.target.value,g(s)}})]}),(0,j.jsxs)("div",{className:"ui-form-row",children:[(0,j.jsx)(x.E,{children:"\u0426\u0435\u043b\u044c:"}),(0,j.jsx)(d.f,{className:"report-text",cols:40,rows:6,value:w.description,placeholder:"\u0426\u0435\u043b\u044c \u0437\u0430\u0434\u0430\u0447\u0438",onChange:function(e){const s=new f.Y(w);s.description=e.target.value,g(s)}})]}),(0,j.jsxs)("div",{className:"ui-form-row",children:[(0,j.jsx)(x.E,{children:"\u0421\u0440\u043e\u043a:"}),(0,j.jsx)(c.B,{value:null===(e=w.deadline)||void 0===e?void 0:e.toISOString().split("T")[0],onChange:function(e){const s=e.target.valueAsDate;if(!s)return;s.setHours(23,30,0,0);const n=new f.Y(w);n.deadline=s,g(n)}})]}),(0,j.jsx)("div",{className:"ui-form-row",children:(0,j.jsx)(o.S,{label:"\u0412\u0430\u0436\u043d\u0430\u044f \u0437\u0430\u0434\u0430\u0447\u0430",checked:w.important,onChange:function(e){const s=new f.Y(w);s.important=e.target.checked,g(s)}})}),(0,j.jsx)("div",{className:"ui-form-row",children:(0,j.jsx)(o.S,{label:"\u0421\u0440\u043e\u0447\u043d\u0430\u044f \u0437\u0430\u0434\u0430\u0447\u0430",checked:w.urgent,onChange:function(e){const s=new f.Y(w);s.urgent=e.target.checked,g(s)}})}),(0,j.jsxs)("div",{className:"ui-form-row",children:[(0,j.jsx)(x.E,{children:"\u041e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439"}),(0,j.jsx)(r.A,{defaultValue:N[0],options:N,onChange:e=>function(e){const s=new f.Y(w);s.responsibleId=e||"-1",g(s)}(null===e||void 0===e?void 0:e.value)})]})]})})}),(0,j.jsx)("div",{className:"wrapper-footer",children:(0,j.jsxs)("div",{className:"footer-btns",children:[(0,j.jsx)(u.$,{className:"active-btn",onClick:function(){w.title?w.description?w.responsibleId&&"-1"!==w.responsibleId?w.deadline?v.R.add(n,w).then((()=>s("/"))).then((()=>v.R.getTasks(n))):alert("\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u0440\u0430\u0439\u043d\u0438\u0439 \u0441\u0440\u043e\u043a"):alert("\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e"):alert("\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u0446\u0435\u043b\u044c \u0437\u0430\u0434\u0430\u0447\u0438"):alert("\u0423\u043a\u0430\u0436\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438")},children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"}),(0,j.jsx)(u.$,{onClick:function(){s("/")},children:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"})]})})]})}const g=w}}]);
//# sourceMappingURL=877.db67c782.chunk.js.map