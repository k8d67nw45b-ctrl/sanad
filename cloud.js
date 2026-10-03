const cfg=self.firebaseConfig;
if(cfg&&cfg.apiKey&&!cfg.apiKey.startsWith("PASTE")){
 const B="https://www.gstatic.com/firebasejs/10.14.1/";
 const {initializeApp}=await import(B+"firebase-app.js");
 const {getAuth,signInAnonymously}=await import(B+"firebase-auth.js");
 const {getFirestore,collection,addDoc,doc,updateDoc,setDoc,onSnapshot,query,orderBy,limit}=await import(B+"firebase-firestore.js");
 try{
  const app=initializeApp(cfg),db=getFirestore(app);
  const uid=(await signInAnonymously(getAuth(app))).user.uid;
  const col=collection(db,"requests");
  window.CLOUD={
   add:o=>addDoc(col,{...o,uid,t:Date.now(),s:"wait",helperUid:""}),
   act:(id,a)=>updateDoc(doc(db,"requests",id),a=="help"?{s:"taken",helperUid:uid}:{s:"done"}).catch(()=>alert("تعذر تنفيذ العملية، ربما قبل الطلب شخص آخر")),
   report:async id=>{await addDoc(collection(db,"reports"),{rid:id,uid,t:Date.now()});alert("تم إرسال البلاغ للمراجعة")}
  };
  if(cfg.vapidKey){
   const {getMessaging,getToken}=await import(B+"firebase-messaging.js");
   CLOUD.push=async()=>{
    const q=$("fq").value;if(!q)return alert("اختر محافظتك وقضاءك من الفلاتر أولاً");
    const reg=await navigator.serviceWorker.register("sw.js");
    const tk=await getToken(getMessaging(app),{vapidKey:cfg.vapidKey,serviceWorkerRegistration:reg});
    await setDoc(doc(db,"tokens",tk),{uid,g:$("fg").value,q,t:Date.now()});
    alert("تم تفعيل إشعارات قضاء "+q);
   };
  }
  let first=true;
  onSnapshot(query(col,orderBy("t","desc"),limit(300)),snap=>{
   S.reqs=snap.docs.map(d=>{const x=d.data();return{...x,id:d.id,own:x.uid===uid?1:0,helper:x.helperUid?(x.helperUid===uid?"me":"other"):""}});
   if(!first&&"Notification"in window&&Notification.permission=="granted")snap.docChanges().forEach(ch=>{
    const r=ch.doc.data();
    if(ch.type!="added"||r.uid===uid)return;
    const ok=myPos&&r.gps?dist(r.gps)<=2:(!r.gps&&$("fq").value==r.q);
    if(ok)navigator.serviceWorker.ready.then(g=>g.showNotification("سند: شخص قريب يحتاج مساعدة",{body:C[r.c][1]+" – "+r.q,icon:"icon-192.png",vibrate:[200,100,200]}));
   });
   first=false;render();
  });
  $("reset").parentElement.style.display="none";
  document.querySelector("header p").textContent+=" · 🟢 متصل";
 }catch(e){console.error(e);alert("فشل الاتصال بـ Firebase: تأكد من الإعدادات وتفعيل Anonymous")}
}
