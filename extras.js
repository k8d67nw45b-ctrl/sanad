const $=id=>document.getElementById(id);
const wait=async f=>{for(let i=0;i<60;i++){const v=f();if(v)return v;await new Promise(r=>setTimeout(r,150))}};
const L={
ar:{dir:"rtl",nav:["الرئيسية","طلب جديد","أثري","عن سند"],sl:"مساعدة لحظية من جيرانك… بكرامة وخصوصية",go:"ابدأ",sos:"طوارئ",ob:[["🤝","اطلب مساعدة بسيطة","سيارة معطلة؟ دواء ناقص؟ اطلب بدون حرج وبهوية مخفية."],["📍","جيرانك يصلهم التنبيه","متطوعون ضمن 1 إلى 2 كم يرون طلبك على الخريطة."],["🌱","اترك أثراً حقيقياً","كل مساعدة تُحسب في أثرك وتفتح لك الأوسمة."]]},
ku:{dir:"rtl",nav:["سەرەکی","داواکاری نوێ","کاریگەریم","دەربارە"],sl:"یارمەتی دەستبەجێ لە دراوسێکانتەوە… بە شکۆمەندی",go:"دەستپێبکە",sos:"فریاکەوتن",ob:[["🤝","داوای یارمەتییەکی سادە بکە","ئۆتۆمبێل خراپ؟ دەرمان؟ بێ شەرم و بە ناسنامەی شاراوە داوا بکە."],["📍","دراوسێکانت ئاگادار دەکرێنەوە","خۆبەخشانی نزیک (١ بۆ ٢ کم) داواکارییەکەت دەبینن."],["🌱","شوێنەوارێکی ڕاستەقینە بەجێبهێڵە","هەر یارمەتییەک لە کاریگەرییەکەتدا دەژمێردرێت."]]},
en:{dir:"ltr",nav:["Home","New request","My impact","About"],sl:"Instant help from your neighbors… with dignity",go:"Start",sos:"Emergency",ob:[["🤝","Ask for simple help","Car broke down? Need medicine? Ask without shame, anonymously."],["📍","Neighbors get alerted","Volunteers within 1-2 km can see your request on the map."],["🌱","Leave real impact","Every help counts toward your impact and unlocks badges."]]}};
function sheet(h,cb){const o=document.createElement("div");o.style.cssText="position:fixed;inset:0;background:#0009;z-index:99;display:flex;align-items:flex-end;justify-content:center";
 o.innerHTML=`<div class="card" style="width:100%;max-width:640px;max-height:80vh;overflow:auto;margin:0;border-radius:20px 20px 0 0;padding-bottom:calc(14px + env(safe-area-inset-bottom))">${h}<button class="s w" style="margin-top:8px" id="xc">إغلاق</button></div>`;
 const close=()=>{o.remove();cb&&cb()};o.onclick=e=>{if(e.target==o)close()};o.querySelector("#xc").onclick=close;document.body.append(o);return o}

/* ===== اللغة + الترحيب + الطوارئ ===== */
const sosB=document.createElement("button");
sosB.style.cssText="position:fixed;z-index:50;bottom:calc(84px + env(safe-area-inset-bottom));inset-inline-start:14px;background:#dc2626;border-radius:99px;box-shadow:0 2px 8px #0005";
document.body.append(sosB);
sosB.onclick=()=>sheet(`<h3>🚨 أرقام الطوارئ في العراق</h3>
<p class="note" style="margin:8px 0">في الخطر الحقيقي اتصل بالجهات الرسمية، وسند للحالات البسيطة فقط. الأرقام قد تختلف حسب المحافظة.</p>
<div class="row"><a href="tel:911"><button class="w" style="background:#dc2626">911 الطوارئ الموحد (بغداد والوسط والجنوب)</button></a></div><br>
<div class="row"><a href="tel:122"><button class="w" style="background:#dc2626">122 الإسعاف / طوارئ إقليم كردستان</button></a></div><br>
<div class="row"><a href="tel:104"><button class="w" style="background:#dc2626">104 الشرطة</button></a></div><br>
<div class="row"><a href="tel:115"><button class="w" style="background:#dc2626">115 الدفاع المدني (الإطفاء)</button></a></div>`);
const hd=document.querySelector("header");hd.style.position="relative";
const lg=document.createElement("select");lg.style.cssText="position:absolute;top:calc(10px + env(safe-area-inset-top));inset-inline-end:14px;width:auto;min-height:34px;font-size:13px;margin:0;padding:4px";
lg.innerHTML='<option value="ar">العربية</option><option value="ku">کوردی</option><option value="en">English</option>';hd.append(lg);
function applyLang(l){const t=L[l];localStorage.sl=l;lg.value=l;document.documentElement.dir=t.dir;document.documentElement.lang=l;
 document.querySelectorAll("nav button").forEach((b,i)=>b.lastChild.textContent=t.nav[i]);
 document.querySelector("header p").textContent=t.sl+(window.CLOUD?" · 🟢":"");sosB.textContent="🚨 "+t.sos}
lg.onchange=()=>applyLang(lg.value);applyLang(localStorage.sl||"ar");
if(!localStorage.ob){let i=0;const o=document.createElement("div");
 o.style.cssText="position:fixed;inset:0;z-index:120;background:linear-gradient(135deg,#0f766e,#115e59);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px";
 const draw=()=>{const t=L[localStorage.sl||"ar"],s=t.ob[i];
  o.innerHTML=`<div style="font-size:72px">${s[0]}</div><h2 style="margin:14px 0 8px">${s[1]}</h2><p style="opacity:.9;line-height:1.8">${s[2]}</p><div style="margin:18px 0">${t.ob.map((_,k)=>k==i?"●":"○").join(" ")}</div><button id="nx" style="background:#fff;color:#0f766e;min-width:160px">${i<2?"›":t.go}</button><div style="margin-top:16px;font-size:14px"><a>العربية</a> · <a>کوردی</a> · <a>English</a></div>`;
  o.querySelectorAll("a").forEach((a,k)=>a.onclick=()=>{applyLang(["ar","ku","en"][k]);draw()});
  o.querySelector("#nx").onclick=()=>{if(i<2){i++;draw()}else{localStorage.ob=1;o.remove()}}};
 draw();document.body.append(o)}

/* ===== الخريطة الحقيقية ===== */
let LM=null,LG=null,centered=false;
const mc=document.createElement("div");mc.className="card";mc.innerHTML='<b>📍 الطلبات على الخريطة</b><div id="lm" style="height:260px;border-radius:12px;margin-top:8px"></div>';
$("map").closest(".card").before(mc);
const lk=document.createElement("link");lk.rel="stylesheet";lk.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";document.head.append(lk);
const ls=document.createElement("script");ls.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
ls.onload=()=>{const Lf=window.L;LM=Lf.map("lm").setView([33.2,43.7],6);
 Lf.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:"© OpenStreetMap"}).addTo(LM);LG=Lf.layerGroup().addTo(LM);drawMap()};
document.head.append(ls);
function drawMap(){if(!LM)return;const Lf=window.L;LG.clearLayers();LM.invalidateSize();
 S.reqs.filter(r=>r.gps&&!r.hidden).forEach(r=>{const[a,b]=r.gps.split(",").map(Number);
  Lf.circleMarker([a,b],{radius:10,color:"#fff",weight:2,fillColor:ST[r.s][0],fillOpacity:.95}).addTo(LG).bindPopup(`${C[r.c][0]} ${C[r.c][1]}<br>${ST[r.s][1]}`)});
 if(myPos){Lf.circleMarker(myPos,{radius:7,color:"#fff",weight:2,fillColor:"#2563eb",fillOpacity:1}).addTo(LG).bindPopup("موقعي");if(!centered){LM.setView(myPos,13);centered=true}}}

/* ===== المشاركة ===== */
function share(r){const t=encodeURIComponent(`سند: ${C[r.c][1]} في ${r.g} › ${r.q}. ساعد جارك 💚`),u=encodeURIComponent(location.origin);
 sheet(`<h3>📤 مشاركة الطلب</h3><div class="row" style="margin-top:8px"><a href="https://wa.me/?text=${t}%20${u}"><button class="w" style="background:#16a34a">واتساب</button></a><a href="https://t.me/share/url?url=${u}&text=${t}"><button class="w" style="background:#2563eb">تيليغرام</button></a></div>`)}

/* ===== البطاقات + لوحة الشرف ===== */
let cloud=null,adminF=false,rep={},rated=new Set(),myRate=[0,0];
const blocked=()=>JSON.parse(localStorage.sb||"[]");
const lb=document.createElement("div");lb.className="card";$("v-me").prepend(lb);
function drawLB(){const g=$("fg").value,now=new Date(),m={};
 S.reqs.filter(r=>r.s=="done"&&r.helperUid&&new Date(r.t).getMonth()==now.getMonth()&&(!g||r.g==g)).forEach(r=>m[r.helperUid]=(m[r.helperUid]||0)+1);
 const top=Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,5);
 lb.innerHTML=`<h3>🏆 لوحة الشرف – هذا الشهر${g?" ("+g+")":""}</h3>`+(top.length?top.map(([u,n],i)=>`<p>${["🥇","🥈","🥉","4️⃣","5️⃣"][i]} ${cloud&&u==cloud.uid?"أنت":"متطوع ••"+u.slice(-4)} – ${n} مساعدة</p>`).join(""):'<p class="note">كن أول من يظهر هنا 💚</p>')}
function aug(){
 document.querySelectorAll("#list .req,#mine .req").forEach(el=>{
  if(el.dataset.x)return;el.dataset.x=1;
  const id=(el.innerHTML.match(/report\('([^']+)'\)/)||[])[1],r=S.reqs.find(x=>x.id==id);if(!r)return;
  if(cloud&&!adminF&&!r.own&&(blocked().includes(r.uid)||(rep[r.id]||0)>=3||r.hidden))return el.remove();
  const row=el.querySelector(".row"),tag=el.querySelector(".tag"),
   add=(t,f)=>{const b=document.createElement("button");b.className="s";b.textContent=t;b.onclick=f;row.append(b)};
  if(r.ver)tag.insertAdjacentHTML("afterend",' <span class="tag" style="background:#0f766e">✅ موثّق</span>');
  if(r.hv&&r.s!="wait")tag.insertAdjacentHTML("afterend",' <span class="tag" style="background:#7c3aed">🙋 متطوع موثّق</span>');
  add("📤 مشاركة",()=>share(r));
  if(!cloud)return;
  if((r.own||r.helper=="me")&&r.s!="wait")add("💬 محادثة",()=>cloud.chat(r));
  if(r.helper=="me"&&r.s=="taken")add("🧾 إرفاق إيصال",()=>cloud.proof(r));
  if(r.s=="done"&&(r.own||r.helper=="me"))add("🧾 عرض الإيصال",()=>cloud.viewProof(r));
  if(r.own&&r.s=="done"&&r.helperUid&&!rated.has(r.id))add("⭐ قيّم المتطوع",()=>cloud.rate(r));
  if(!r.own&&r.uid)add("🚫 حظر",()=>{if(confirm("حظر هذا المستخدم وإخفاء طلباته؟")){const b=blocked();b.push(r.uid);localStorage.sb=JSON.stringify(b);render()}});
 });drawMap();drawLB()}
["list","mine"].forEach(i=>new MutationObserver(aug).observe($(i),{childList:true}));aug();

/* ===== ميزات تحتاج Firebase ===== */
if(await wait(()=>window.CLOUD)){
 const B="https://www.gstatic.com/firebasejs/10.14.1/";
 const {getApp}=await import(B+"firebase-app.js");
 const {getAuth,RecaptchaVerifier,linkWithPhoneNumber}=await import(B+"firebase-auth.js");
 const F=await import(B+"firebase-firestore.js");
 const app=getApp(),auth=getAuth(app),db=F.getFirestore(app),uid=auth.currentUser.uid,ver=()=>!!auth.currentUser.phoneNumber;
 cloud={uid};
 CLOUD.add=o=>F.addDoc(F.collection(db,"requests"),{...o,uid,t:Date.now(),s:"wait",helperUid:"",ver:ver()});
 CLOUD.act=(id,a)=>F.updateDoc(F.doc(db,"requests",id),a=="help"?{s:"taken",helperUid:uid,hv:ver()}:{s:"done"}).catch(()=>alert("تعذر تنفيذ العملية، ربما قبل الطلب شخص آخر"));
 CLOUD.report=async id=>{await F.setDoc(F.doc(db,"reports",id+"_"+uid),{rid:id,uid,t:Date.now()});alert("تم إرسال البلاغ، شكراً لك")};
 document.querySelector("header p").textContent=L[localStorage.sl||"ar"].sl+" · 🟢";
 document.body.insertAdjacentHTML("beforeend",'<div id="rc"></div>');
 cloud.chat=r=>{const o=sheet('<h3>💬 المحادثة</h3><p class="note">بدون كشف الأرقام. لا تشارك معلومات حساسة.</p><div id="cm" style="min-height:120px;margin:8px 0"></div><div class="row"><input id="ci" maxlength="300" placeholder="اكتب رسالة"><button id="cs">إرسال</button></div>',()=>un());
  const cm=o.querySelector("#cm"),un=F.onSnapshot(F.query(F.collection(db,"requests",r.id,"msgs"),F.orderBy("t")),s=>{cm.textContent="";
   s.forEach(d=>{const x=d.data(),p=document.createElement("p");p.style.margin="6px 0";p.textContent=(x.uid==uid?"أنا: ":"الطرف الآخر: ")+x.text;cm.append(p)})});
  o.querySelector("#cs").onclick=async()=>{const i=o.querySelector("#ci"),t=i.value.trim();if(!t)return;i.value="";
   await F.addDoc(F.collection(db,"requests",r.id,"msgs"),{uid,text:t,t:Date.now()})}};
 const shrink=f=>new Promise(res=>{const i=new Image();i.onload=()=>{const k=Math.min(1,640/Math.max(i.width,i.height)),c=document.createElement("canvas");c.width=i.width*k;c.height=i.height*k;c.getContext("2d").drawImage(i,0,0,c.width,c.height);res(c.toDataURL("image/jpeg",.6))};i.src=URL.createObjectURL(f)});
 cloud.proof=r=>{const f=document.createElement("input");f.type="file";f.accept="image/*";
  f.onchange=async()=>{if(!f.files[0])return;try{await F.setDoc(F.doc(db,"proofs",r.id),{uid,img:await shrink(f.files[0]),t:Date.now()});alert("تم إرفاق الإيصال ✅")}catch(e){alert("تعذر الرفع")}};f.click()};
 cloud.viewProof=async r=>{try{const d=await F.getDoc(F.doc(db,"proofs",r.id));d.exists()?sheet(`<img src="${d.data().img}" style="width:100%;border-radius:12px">`):alert("لا يوجد إيصال")}catch(e){alert("لا تملك صلاحية العرض")}};
 cloud.rate=r=>{const o=sheet('<h3>⭐ كيف كانت المساعدة؟</h3><div class="row" id="st" style="margin-top:8px"></div>');
  [1,2,3,4,5].forEach(v=>{const b=document.createElement("button");b.className="s";b.textContent="⭐".repeat(v);b.onclick=async()=>{try{await F.setDoc(F.doc(db,"ratings",r.id),{rid:r.id,from:uid,to:r.helperUid,v,t:Date.now()});o.remove()}catch(e){alert("تعذر التقييم")}};o.querySelector("#st").append(b)})};
 const me=document.createElement("div");me.className="card";$("v-me").prepend(me);
 const drawMe=()=>{me.innerHTML=`<h3>👤 حسابي</h3><p class="note">${ver()?"✅ حسابك موثّق برقم الهاتف":"حسابك غير موثّق. التوثيق يعطي طلباتك ومساعداتك شارة ثقة."}</p><p class="note">⭐ تقييمي: ${myRate[1]?(myRate[0]/myRate[1]).toFixed(1)+" ("+myRate[1]+")":"لا توجد تقييمات"}</p>${ver()?"":'<button class="w" id="vf">✅ وثّق رقم هاتفي</button>'}`;
  const b=me.querySelector("#vf");if(b)b.onclick=async()=>{const ph=prompt("اكتب رقمك بصيغة دولية مثل +9647XXXXXXXXX");if(!ph)return;
   try{window.rv=window.rv||new RecaptchaVerifier(auth,"rc",{size:"invisible"});const cr=await linkWithPhoneNumber(auth.currentUser,ph.trim(),window.rv);
    const c=prompt("أدخل رمز التحقق المرسل لهاتفك");if(!c)return;await cr.confirm(c.trim());await auth.currentUser.getIdToken(true);alert("تم التوثيق ✅");drawMe()}
   catch(e){alert("فشل التوثيق: "+(e.code||e.message));window.rv=null}}};
 drawMe();
 F.onSnapshot(F.collection(db,"ratings"),s=>{rated=new Set();myRate=[0,0];s.forEach(d=>{const x=d.data();if(x.from==uid)rated.add(x.rid);if(x.to==uid){myRate[0]+=x.v;myRate[1]++}});drawMe();render()});
 F.onSnapshot(F.collection(db,"reports"),s=>{rep={};s.forEach(d=>{const x=d.data();rep[x.rid]=(rep[x.rid]||0)+1});render();drawAdmin()});
 const ab=document.createElement("div");ab.className="card";$("v-about").append(ab);
 function drawAdmin(){ab.innerHTML=`<h3>🛠 الإشراف</h3><p class="note">معرّف حسابك: <b style="user-select:all">${uid}</b></p>`;
  if(!adminF)return;const bad=S.reqs.filter(r=>rep[r.id]||r.hidden);
  ab.insertAdjacentHTML("beforeend",bad.length?"":'<p class="note">لا توجد بلاغات.</p>');
  bad.forEach(r=>{const d=document.createElement("div");d.style.cssText="border-top:1px solid var(--bd);padding:8px 0";d.innerHTML=`<p class="note">${C[r.c][1]} – ${String(r.d).slice(0,60).replace(/</g,"&lt;")}<br>بلاغات: ${rep[r.id]||0} ${r.hidden?"(مخفي)":""}</p>`;
   const h=document.createElement("button");h.className="s";h.textContent=r.hidden?"إظهار":"إخفاء";h.onclick=()=>F.updateDoc(F.doc(db,"requests",r.id),{hidden:!r.hidden});
   const x=document.createElement("button");x.className="s";x.textContent="🗑 حذف";x.onclick=()=>confirm("حذف نهائي؟")&&F.deleteDoc(F.doc(db,"requests",r.id));
   d.append(h," ",x);ab.append(d)})}
 try{adminF=(await F.getDoc(F.doc(db,"admins",uid))).exists()}catch(e){}
 drawAdmin();render();
}
