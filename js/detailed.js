// ---- Course data (hours from the training schedule PDF) ----
const U=[
{h:40,en:"Communicative English",t:["Vocabulary & word meanings","Speaking on a specific situation","Public speaking","Introducing yourself","Describing & narrating events, places, objects","Client–freelancer communication basics","Initial client contact & setting expectations","Effective written communication with clients","Negotiating rates, deadlines & deliverables","Feedback, revisions & conflict resolution","Spoken English: hotel, directions, bus, weather & trips","Spoken English: office conversation & practical job","Spoken English: computers, software & email"]},
{h:16,en:"Microsoft Word 2016",t:["Interface; create, save, open & close documents","Editing text, undo/redo, cut/copy/paste, find & replace","Paragraph formatting","Tables: create, content & structure","Headers, footers & page setup","Graphics, clip art, spelling & AutoCorrect","Printing & exporting documents","Styles, outlines & table design","Shapes, diagrams, sections & columns","Customizing the ribbon & settings","Forms, objects & charts","Table of contents, captions, index & footnotes","Tracking changes & mail merge"]},
{h:16,en:"Microsoft Excel 2016",t:["Spreadsheet terminology & Excel environment","Entering & editing data and formulas","Moving/copying data; absolute & relative references","Functions & AutoSum","Formatting & conditional formatting","Charts, pictures & SmartArt","Printing worksheets","Logical, conditional, financial, text & date functions","Lookup functions & data tables","Data validation & advanced filtering","PivotTables & pivot charts","Import/export data, Goal Seek & scenarios"]},
{h:8,en:"Microsoft PowerPoint 2016",t:["Interface, creating a presentation & working with slides","Formatting text & lists; editing efficiently","Creating & formatting shapes","WordArt, pictures, tables, charts & SmartArt","Slide masters, transitions & timings","Graphics, media clips & animations","Action buttons, equations & embedding content"]},
{h:24,en:"Computer Hardware & Network Troubleshooting",t:["Operating system basics","OS administration: Control Panel, admin tools, disk management","Installing Windows 7 & Windows 10","Troubleshooting core hardware, laptops & networking","Data recovery & backup","Printers: install, maintain & troubleshoot","Networking: TCP/IP, internet connections, ports & tools","Safety & operational procedures (OSH)"]},
{h:64,en:"Professional Graphic Design",t:["Illustrator CC: getting started & vector fundamentals","Creating artwork, color concept, selecting & aligning","Shapes, type & layers","Blending colors & shapes","Project 1: raster to vector, invoice, letterhead, brochure, logo","Project 2: calendar, packaging, certificate, T-shirt, resume","Photoshop CC: fundamentals & color concept","Special effects & typing English/Bangla","Working with images, tools & layers"]},
{h:64,en:"Web Design / WordPress Development",t:["HTML: tags, elements, lists, tables & forms","CSS: selectors, styling, positioning & layouts","Installing XAMPP & WordPress","Installing & modifying themes; child theme","Building a theme: index.php & the WordPress Loop","Displaying posts, comments & templates","Sidebars, widgets, custom templates & contact form","Full website: portfolio, blog, e-commerce; domain, hosting & cPanel"]},
{h:40,en:"Online Earning / Freelancing Marketplaces",t:["Freelancing basics & Fiverr gigs","Upwork: account, proposals & jobs","Freelancer.com: projects & bidding","SEOClerk: service submission","Other platforms: Kwork, PeoplePerHour, LinkedIn, BdJobs, local marketing"]},
{h:256,en:"Digital Marketing for Freelancing",t:["Digital marketing basics & niche selection","Social media marketing & Facebook page","Facebook: Meta Business Suite, Shop & Marketplace","Facebook Ads, pixel, audiences & strategy","Instagram marketing","X (Twitter) marketing","LinkedIn marketing & tools","Pinterest, Quora & Reddit marketing","Lead generation & data entry","Email marketing: tools, campaigns & tracking","SEO basics, keyword research & website audit","Content writing with AI","On-page SEO","Off-page SEO & backlinks","Technical SEO & Google tools","Local SEO","Search engine marketing (Google Ads)","YouTube SEO & video marketing","Blogging, AdSense & affiliate marketing","Freelancing with a smartphone"]},
{h:40,en:"Professional Video Editing",t:["Video editing basics & formats","Premiere Pro workspace & projects","Clips, keyframes, chroma key & trimming","Timeline, sequences & rendering","Audio mixing & effects","Creating titles","Animating clips, effects & exporting","Superimposing, masks & compositing"]},
{h:32,en:"Generic Competency (Soft Skills)",t:["Working in a team","Work values, ethics & professionalism","Housekeeping, health & safety","Personal manner in the workplace"]}
];
const T={
en:{brand:"Freelancing Course Progress – Detailed",home:"Home",units:"Units",about:"About",lang:"বাংলা",v1:"Simple version",overall:"Overall Progress",uDone:"Units completed",hDone:"Hours completed",hLeft:"Hours remaining",next:"Next unit",open:"Open unit",mark:"Mark all topics done",unmark:"Clear all topics",prog:"In progress",report:"Progress Details",hrLog:"Hours studied",modeT:"Topic checklist",modeLabel:"Tracking type",topicsDone:"Topics done",hrsLogged:"Hours logged",total:"Total",print:"Print / Save PDF",tp2:"topics",done:"Completed",todo:"Not completed",hrs:"hours",unit:"Unit",topics:"Key topics",all:"All units",prev:"Previous",nxt:"Next",reset:"Reset all progress",sure:"Click again to confirm: delete all progress",m0:"Start your first unit today!",m1:"Good start. Keep going, every unit counts.",m2:"More than halfway there!",m3:"Congratulations! You have completed the whole course.",allDone:"All units completed",aboutT:"About this course",aboutP:"Course: Freelancing. Duration: 3 months. Implemented by e-Learning & Earning Ltd. for the Department of Youth Development, Bangladesh. Progress % is weighted by unit hours.",save:"Your progress is saved only in this browser on this device.",of:"of"}
};

// ---- State (browser only) ----
const PAGE="detailed",LEGACY_KEY="fcp2";
let S={lang:"en",tp:CourseProgressSync.load(PAGE,["fcp2","fcp"])};
function save(){CourseProgressSync.save(PAGE,S.tp,LEGACY_KEY)}
function syncUnit(i,v){CourseProgressSync.setUnitComplete(PAGE,i,v,S.tp,LEGACY_KEY)}
const L=()=>T[S.lang];
const n=x=>String(x);
const nm=i=>U[i].en;
const TOTAL=U.reduce((a,u)=>a+u.h,0);
const done=i=>U[i].t.filter((x,j)=>S.tp[i+"-"+j]).length;
const ft=i=>done(i)/U[i].t.length;
const fr=i=>ft(i);
const up=i=>Math.round(fr(i)*100);
function stats(){let c=0,h=0;U.forEach((u,i)=>{if(fr(i)===1)c++;h+=u.h*fr(i)});h=Math.round(h*10)/10;return{c,h,p:Math.round(h/TOTAL*100)}}
function tog(k){
  const i=Number(k.split("-")[0]);
  const wasComplete=U[i].t.every((x,j)=>S.tp[i+"-"+j]);
  S.tp[k]=!S.tp[k];
  const isComplete=U[i].t.every((x,j)=>S.tp[i+"-"+j]);
  if(isComplete || wasComplete) syncUnit(i,isComplete);
  else save();
  render();
}
function all(i,v){U[i].t.forEach((x,j)=>{S.tp[i+"-"+j]=v});syncUnit(i,v);render()}
let arm=false;
function resetAll(){if(!arm){arm=true;render();return}arm=false;S.tp={};save();render()}

// ---- Views ----
function ring(p){return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="none" stroke="#d3e5da" stroke-width="12"/><circle cx="60" cy="60" r="54" fill="none" stroke="#0e7a3d" stroke-width="12" stroke-linecap="round" stroke-dasharray="${p*3.393} 339.3" transform="rotate(-90 60 60)"/><text x="60" y="69" text-anchor="middle" font-size="26" font-weight="700" fill="#095c2d">${n(p)}%</text></svg>`}
function home(){
  const s=stats(),l=L();
  const msg=s.p===100?l.m3:s.p>=50?l.m2:s.p>0?l.m1:l.m0;
  const ni=U.findIndex((u,i)=>up(i)<100);
  const next=ni<0?`<div class="card ok"><h3>🎉 ${l.allDone}</h3></div>`:`<div class="card"><span class="tag">${l.next}</span><h3>${l.unit} ${n(ni+1)}: ${nm(ni)}</h3><div>${n(U[ni].h)} ${l.hrs} · ${n(up(ni))}%</div><div class="pbar"><i style="width:${up(ni)}%"></i></div><div style="margin-top:12px"><a class="btn" href="#u${ni+1}">${l.open}</a></div></div>`;
  return `<section class="hero"><div class="ring">${ring(s.p)}</div><div><h1>${l.overall}</h1><p>${msg}</p><a class="btn" href="#report">${l.report}</a> <a class="btn alt" href="#units">${l.units} →</a></div></section>
  <div class="stats"><div class="stat"><b>${n(s.c)} ${l.of} ${n(U.length)}</b>${l.uDone}</div><div class="stat"><b>${n(s.h)} ${l.of} ${n(TOTAL)}</b>${l.hDone}</div><div class="stat"><b>${n(TOTAL-s.h)}</b>${l.hLeft}</div></div>${next}<section class="card danger-zone"><h2>Danger zone</h2><p>Reset saved progress for this version only.</p><button type="button" class="btn red" data-reset>${arm?l.sure:l.reset}</button></section>`;
}
function units(){
  const l=L();
  return `<h1>${l.units}</h1><div class="grid">`+U.map((u,i)=>{const p=up(i);const d=" · "+n(done(i))+" / "+n(u.t.length)+" "+l.tp2;return `<div class="card ${p===100?"ok":""}"><h3>${n(i+1)}. ${nm(i)}</h3><div>${n(u.h)} ${l.hrs}${d}</div><div class="pbar"><i style="width:${p}%"></i></div><span class="tag">${p===100?l.done:p>0?l.prog+" · "+n(p)+"%":l.todo}</span><a class="more" href="#u${i+1}">${l.open} →</a></div>`}).join("")+`</div>`;
}
function unit(i){
  const u=U[i],l=L(),p=up(i);
  const body=`<b style="margin-top:10px">${l.topics}</b><ul class="tl">${u.t.map((x,j)=>`<li><label><input class="chk" type="checkbox" data-tog="${i}-${j}" ${S.tp[i+"-"+j]?"checked":""}> ${x}</label></li>`).join("")}</ul><div class="row"><button type="button" class="btn" data-all="${i}" data-v="1">${l.mark}</button><button type="button" class="btn alt" data-all="${i}" data-v="0">${l.unmark}</button></div>`;
  return `<a class="more" href="#units">← ${l.all}</a><div style="height:12px"></div><div class="card ${p===100?"ok":""}"><span class="tag">${l.unit} ${n(i+1)} · ${n(u.h)} ${l.hrs}</span><h1>${nm(i)}</h1><b>${n(p)}% ${l.done}</b><div class="pbar"><i style="width:${p}%"></i></div>${body}</div>
  <div class="nav2">${i>0?`<a class="btn alt" href="#u${i}">← ${l.prev}</a>`:"<span></span>"}${i<U.length-1?`<a class="btn alt" href="#u${i+2}">${l.nxt} →</a>`:`<a class="btn" href="#home">Done</a>`}</div>`;
}
function report(){
  const l=L(),s=stats();
  let th=0,td=0,tn=0;
  const rows=U.map((u,i)=>{const c=done(i),k=u.t.length,pt=Math.round(ft(i)*100);th+=u.h*ft(i);td+=c;tn+=k;
    return `<tr><td>${n(i+1)}</td><td><a class="more" href="#u${i+1}">${nm(i)}</a></td><td>${n(u.h)}</td><td>${n(c)} / ${n(k)}<div class="pbar"><i style="width:${pt}%"></i></div>${n(pt)}%</td></tr>`}).join("");
  const det=U.map((u,i)=>`<details><summary>${n(i+1)}. ${nm(i)} · ${n(Math.round(ft(i)*100))}%</summary><ul class="tl">${u.t.map((x,j)=>`<li>${S.tp[i+"-"+j]?"✅":"⬜"} ${x}</li>`).join("")}</ul></details>`).join("");
  return `<h1>${l.report}</h1><div class="stats"><div class="stat"><b>${n(s.p)}%</b>${l.overall}</div><div class="stat"><b>${n(s.c)} ${l.of} ${n(U.length)}</b>${l.uDone}</div><div class="stat"><b>${n(s.h)} ${l.of} ${n(TOTAL)}</b>${l.hDone}</div></div>
  <div class="tw"><table><thead><tr><th>#</th><th>${l.unit}</th><th>${l.hrs}</th><th>${l.topicsDone}</th></tr></thead><tbody>${rows}</tbody><tfoot><tr><th></th><th>${l.total}</th><th>${n(TOTAL)}</th><th>${n(td)} / ${n(tn)}<br>${n(Math.round(th/TOTAL*100))}%</th></tr></tfoot></table></div>
  <p class="noprint"><button type="button" class="btn alt" data-print>${l.print}</button></p><h3>${l.topics}</h3>${det}`;
}
function about(){const l=L();return `<h1>${l.aboutT}</h1><div class="card"><p>${l.aboutP}</p><p>${l.save}</p></div>`}

// ---- Router ----
let route=location.hash.slice(1)||"home";
function render(go){
  const h=route,l=L(),m=h.match(/^u(\d+)$/);
  let v;
  if(m&&U[m[1]-1])v=unit(m[1]-1);else if(h==="units")v=units();else if(h==="report")v=report();else if(h==="about")v=about();else v=home();
  const cur=m?"units":(h==="units"||h==="about"||h==="report")?h:"home";
  document.documentElement.lang="en";
  document.title=l.brand;
  document.getElementById("brand").textContent=l.brand;
  document.getElementById("v1").textContent=l.v1;
  document.getElementById("foot").textContent=l.save;
  document.getElementById("nav").innerHTML=["home","units","report","about"].map(k=>`<a href="#${k}" class="${cur===k?"on":""}">${l[k]}</a>`).join("");
  document.getElementById("app").innerHTML=v;
  if(go)window.scrollTo(0,0);
}
function sync(){route=location.hash.slice(1)||"home";arm=false;render(true)}
window.addEventListener("hashchange",sync);
window.addEventListener("popstate",sync);
document.addEventListener("click",e=>{
  const a=e.target.closest("a[href^='#']");
  if(a){e.preventDefault();route=a.getAttribute("href").slice(1)||"home";arm=false;try{history.pushState(null,"","#"+route)}catch(x){}render(true);return}
  if(e.target.closest("[data-print]")){window.print();return}
  const A=e.target.closest("[data-all]");
  if(A){all(+A.dataset.all,A.dataset.v==="1");return}
  const t=e.target.closest("[data-tog]");
  if(t&&t.tagName!=="INPUT"){tog(t.dataset.tog);return}
  if(e.target.closest("[data-reset]")){resetAll();return}
});
document.addEventListener("change",e=>{const t=e.target.closest("input[data-tog]");if(t)tog(t.dataset.tog)});
render();
