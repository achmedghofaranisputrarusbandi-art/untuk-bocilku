/* ====== EDIT BAGIAN INI ====== */
const CFG={
  name:"Sipa",
  sentence:"Aku sayang banget sama kamu Sipa",
  letter:"Untuk bocilku Sipa yang paling aku sayang,\n\nTerima kasih sudah sabar sama aku, sudah mau jadi tempat cerita, dan sudah bikin hari-hariku lebih berwarna.\n\nAku mungkin bukan yang paling romantis, tapi aku janji satu hal: aku bakal terus berusaha jadi orang yang pantas kamu banggakan.\n\nApa pun yang terjadi nanti, aku pilih kamu. Hari ini, besok, dan seterusnya.\n\nSelalu milikmu 💗"
};
/* ============================= */
const $=s=>document.querySelector(s),R=(a,b)=>a+Math.random()*(b-a),rnd=a=>a[R(0,a.length)|0];
const shuf=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
let T=[],i=0,cleared={};const iv=(f,ms)=>T.push(setInterval(f,ms)),N=CFG.name;
const mt=(el,v)=>{el.querySelector('.meter i').style.width=v+'%';el.querySelector('.sc').textContent=(v|0)+'%'};

/* hati melayang + ledakan */
const c=$('#fx'),x=c.getContext('2d'),E=['💖','💗','💕','💘','🌸','✨'];let W,H,P=[];
function rs(){W=c.width=innerWidth;H=c.height=innerHeight}addEventListener('resize',rs);rs();
function burst(px,py,n){for(let k=0;k<n;k++){const a=R(0,6.28),v=R(3,10);P.push({t:'p',x:px,y:py,s:R(14,30),vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,e:rnd(E),a:1})}}
(function loop(){x.clearRect(0,0,W,H);if(Math.random()<.05)P.push({t:'b',x:R(0,W),y:H+20,s:R(12,30),vy:-R(.4,1.3),ph:R(0,6),e:rnd(E),a:.45});
 P=P.filter(p=>{if(p.t=='b'){p.y+=p.vy;p.x+=Math.sin(p.ph+=.02)*.6}else{p.vy+=.15;p.x+=p.vx;p.y+=p.vy;p.a-=.008}
  x.globalAlpha=Math.max(p.a,0);x.font=p.s+'px serif';x.fillText(p.e,p.x,p.y);return p.y>-30&&p.y<H+60&&p.a>0});
 requestAnimationFrame(loop)})();
addEventListener('pointerdown',e=>burst(e.clientX,e.clientY,6));

/* ---------- pembuat halaman ---------- */
const st=(e,h,p,c)=>({t:'s',e,h,p,c});
const gm=(h,hint,init)=>({t:'g',h,hint,init});
const qz=(q,o,f)=>gm(q,'Pilih satu ya',(el,d)=>{
 el.innerHTML=o.map((v,k)=>`<button class="opt" data-k="${k}">${v}</button>`).join('')+'<p class="fb"></p>';
 el.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{el.querySelector('.fb').textContent=f[b.dataset.k];b.classList.add('on');d()})});
const E6=['💖','🌸','🧸','🍓','🐱','🌙'];

const pages=[
 st('💖',N,'Ada 22 halaman kecil buat bocilku. Ada cerita, ada game, dan ada kejutan di ujungnya. Siap?',1),
 st('🧸','Halo, bocil!','Aku bikin ini khusus buat kamu, jadi jangan dilewatin ya. Tinggal ketuk Lanjut.'),
 gm('Tangkap hatiku','Ketuk 10 hati yang jatuh',(el,d)=>{
  el.innerHTML='<div class="area"></div><p class="sc">0/10</p>';const a=el.firstChild,sc=el.lastChild;let n=0;
  iv(()=>{if(n>=10)return;const h=document.createElement('span');h.className='fall';h.textContent=rnd(['💖','💗','💕']);h.style.left=R(4,88)+'%';h.style.animationDuration=R(2.6,4)+'s';
   h.onpointerdown=e=>{e.stopPropagation();h.remove();n++;sc.textContent=n+'/10';burst(e.clientX,e.clientY,6);if(n>=10)d()};a.append(h);setTimeout(()=>h.remove(),4300)},650)}),
 st('🥺','Kenapa bikin ini?','Soalnya kata-kata aja kadang nggak cukup. Jadi aku bikin yang bisa kamu mainin.'),
 qz('Aku paling gemas kalau kamu…',['Ngambek','Manja','Ketawa'],['Ngambek aja lucu, apalagi pas bibirnya manyun 😆','Manja kamu itu kelemahanku, serius 🥹','Ketawamu bikin hariku langsung terang ☀️']),
 st('😊','Senyummu','Sekali kamu senyum, capekku seharian langsung hilang. Aku nggak tahu gimana caranya, tapi manjur banget.'),
 gm('Isi baterai cinta','Ketuk hatinya terus-terusan!',(el,d)=>{
  el.innerHTML='<button class="hb">💗</button><div class="meter"><i></i></div><p class="sc">0%</p>';let v=0;
  el.firstChild.onclick=e=>{e.currentTarget.animate([{transform:'scale(1.3)'},{transform:'scale(1)'}],150);if(v<100){v=Math.min(100,v+5);mt(el,v);if(v>=100)d()}}}),
 st('🌙','Kamu bikin tenang','Sama kamu aku nggak perlu jadi siapa-siapa. Jadi diri sendiri aja udah cukup.'),
 gm('Panah cinta','Tekan Panah saat 🎯 ada di tengah (3x)',(el,d)=>{
  el.innerHTML='<div class="area"><span class="tg">🎯</span><span class="arrow">💘</span></div><p class="sc">0/3</p><button class="shoot">Panah! 🏹</button>';
  const tg=el.querySelector('.tg'),ar=el.querySelector('.arrow'),sc=el.querySelector('.sc'),b=el.querySelector('.shoot');let t=0,n=0,sp=.035,busy=0,px=50;
  iv(()=>{t+=sp;px=50+38*Math.sin(t);tg.style.left=px+'%'},16);
  b.onclick=()=>{if(busy||n>=3)return;busy=1;ar.style.bottom='200px';setTimeout(()=>{const hit=Math.abs(px-50)<9;
   sc.textContent=hit?(++n)+'/3 Kena! 💘':n+'/3 Meleset 😝';if(hit){sp+=.012;const r=ar.getBoundingClientRect();burst(r.left,r.top,12)}
   if(n>=3)d();ar.style.transition='none';ar.style.bottom='8px';setTimeout(()=>{ar.style.transition='';busy=0},60)},290)}}),
 st('🧸','Tingkah bocilmu','Kamu yang manja, ngambek lucu, dan suka bikin gemas itu hiburan terbaikku tiap hari.'),
 gm('Cari pasangan','Buka dua kartu yang sama',(el,d)=>{
  const em=shuf([...E6,...E6]);el.innerHTML='<div class="grid g4">'+em.map(()=>'<button class="cell">❔</button>').join('')+'</div>';
  const cs=[...el.querySelectorAll('.cell')];let o=[],lock=0,f=0;
  cs.forEach((cl,k)=>cl.onclick=()=>{if(lock||o.includes(k)||cl.disabled)return;cl.textContent=em[k];o.push(k);
   if(o.length==2){const[a,b]=o;if(em[a]==em[b]){[a,b].forEach(z=>{cs[z].disabled=true;cs[z].classList.add('ok')});o=[];if(++f==6)d()}
    else{lock=1;setTimeout(()=>{cs[a].textContent=cs[b].textContent='❔';o=[];lock=0},700)}}})}),
 qz('Kalau kencan, kamu pilih…',['Makan enak','Jalan-jalan','Rebahan bareng'],['Aku traktir. Pilih aja yang paling kamu mau 🍜','Ayo! Aku yang jadi pemandu, kamu yang jadi bintangnya 🌄','Pilihan terbaik. Asal sama kamu, rebahan pun seru 🛋️']),
 st('🏡','Kamu rumahku','Ke mana pun aku pergi, ujung-ujungnya aku tetap pengen pulang ke kamu.'),
 gm('Tangkap bocil','Ketuk 🧸 yang muncul (8x)',(el,d)=>{
  el.innerHTML='<div class="grid g3">'+'<button class="cell"></button>'.repeat(9)+'</div><p class="sc">0/8</p>';
  const cs=[...el.querySelectorAll('.cell')],sc=el.querySelector('.sc');let n=0,cur=-1;
  cs.forEach((cl,k)=>cl.onclick=()=>{if(k!==cur)return;cur=-1;cl.textContent='💥';n++;sc.textContent=n+'/8';if(n>=8)d()});
  iv(()=>{cs.forEach(cl=>cl.textContent='');if(n>=8)return;cur=R(0,9)|0;cs[cur].textContent='🧸'},900)}),
 st('🤞','Janji-janjiku','Aku janji sabar. Aku janji nggak bikin kamu nangis sengaja. Aku janji tetap milih kamu.'),
 gm('Gosok kartunya','Gosok pakai jarimu',(el,d)=>{
  el.innerHTML='<div class="sw"><div class="msg">Kamu hadiah terbaik yang pernah aku dapat 🎁</div><canvas width="300" height="160"></canvas></div>';
  const cv=el.querySelector('canvas'),g2=cv.getContext('2d'),g=g2.createLinearGradient(0,0,300,160);g.addColorStop(0,'#ff8fb8');g.addColorStop(1,'#f2b56b');
  g2.fillStyle=g;g2.fillRect(0,0,300,160);g2.fillStyle='#fff';g2.font='600 18px Nunito,sans-serif';g2.textAlign='center';g2.fillText('✨ gosok di sini ✨',150,86);
  let m=0,dn=0,dr=0;cv.onpointerdown=e=>{dr=1;cv.setPointerCapture(e.pointerId)};cv.onpointerup=()=>dr=0;
  cv.onpointermove=e=>{if(!dr||dn)return;const r=cv.getBoundingClientRect();g2.globalCompositeOperation='destination-out';g2.beginPath();g2.arc((e.clientX-r.left)*300/r.width,(e.clientY-r.top)*160/r.height,20,0,7);g2.fill();
   if(++m%12==0){const a=g2.getImageData(0,0,300,160).data;let z=0;for(let k=3;k<a.length;k+=64)if(!a[k])z++;if(z>a.length/64*.4){dn=1;cv.style.opacity=0;d()}}}}),
 gm('Seberapa sayang kamu?','Geser sampai mentok',(el,d)=>{
  el.innerHTML='<input type="range" min="0" max="100" value="0" style="width:100%;accent-color:var(--acc)"><p class="sc">Geser dulu…</p>';
  const r=el.firstChild,s=el.lastChild;r.oninput=()=>{const v=+r.value;s.textContent=v<30?'Cuma segitu? 🥺':v<70?'Lumayan…':v<100?'Dikit lagi!':'Aku sih lebih dari itu 💖';if(v>=100)d()}}),
 qz('Siapa yang lebih bucin?',['Aku','Kamu','Sama-sama'],['Ngaku juga kamu 😆 Tapi iya, aku bucin banget.','Hmm, boleh dibuktikan? 😏','Berarti kita cocok. Nggak ada yang rugi 💞']),
 gm('Tahan sampai penuh','Tekan dan tahan tombolnya',(el,d)=>{
  el.innerHTML='<div class="meter"><i></i></div><p class="sc">0%</p><button class="hold" style="margin-top:14px">Tahan aku 💞</button>';
  let v=0,h=0,ok=0;const b=el.querySelector('.hold');b.oncontextmenu=e=>e.preventDefault();b.onpointerdown=()=>h=1;
  ['onpointerup','onpointerleave','onpointercancel'].forEach(k=>b[k]=()=>h=0);
  iv(()=>{if(ok)return;v=Math.max(0,Math.min(100,v+(h?1.6:-1.2)));mt(el,v);if(v>=100){ok=1;d()}},30)}),
 gm('Susun kalimatku','Ketuk kata-katanya sesuai urutan',(el,d)=>{
  const w=CFG.sentence.split(' ');let k=0;el.innerHTML='<p class="fb" style="font-size:1.3rem"></p><div class="chips"></div>';
  const sn=el.firstChild,cp=el.lastChild;
  shuf(w.map((v,j)=>[v,j])).forEach(([v,j])=>{const b=document.createElement('button');b.className='chip';b.textContent=v;
   b.onclick=()=>{if(j===k){sn.textContent+=v+' ';b.disabled=true;if(++k===w.length)d()}else{cp.animate([{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'none'}],250);sn.textContent='';k=0;cp.querySelectorAll('.chip').forEach(z=>z.disabled=false)}};cp.append(b)})}),
 gm('Surat buat kamu','Ketuk untuk membuka',(el,d)=>{
  el.innerHTML='<button>Buka surat 💌</button><div class="letter"></div>';const L=el.lastChild,b=el.firstChild;
  b.onclick=()=>{b.remove();let k=0;const L0=CFG.letter;
   const fin=()=>{L.textContent=L0;k=L0.length;d()};L.onclick=fin;
   iv(()=>{if(k>=L0.length)return;L.textContent+=L0[k++];if(k>=L0.length)d()},35);burst(innerWidth/2,innerHeight/2,20)}}),
 gm('Satu pertanyaan terakhir','',(el,d)=>{
  el.innerHTML=`<p style="font-size:1.2rem">Boleh aku sayang kamu terus, ${N}?</p><div class="ask"><button class="yes">Boleh dong 💗</button><button class="ghost no">Nggak</button></div><div class="win"></div>`;
  const no=el.querySelector('.no'),yes=el.querySelector('.yes'),w=el.querySelector('.win'),ln=['Nggak','Yakin?','Coba pikir lagi 🥺','Masa sih?','Klik yang satunya aja 💗'];let n=0;
  const dg=e=>{e.preventDefault();n++;no.style.transform=`translate(${(Math.random()-.5)*Math.min(240,innerWidth-160)}px,${(Math.random()-.5)*110}px)`;no.textContent=ln[Math.min(n,4)];yes.style.transform=`scale(${Math.min(1+n*.14,1.9)})`};
  no.onpointerenter=dg;no.onclick=dg;no.ontouchstart=dg;
  yes.onclick=()=>{el.querySelector('p').remove();el.querySelector('.ask').remove();w.style.display='block';
   w.innerHTML=`Yeay! Aku juga sayang kamu, bocilku ${N} 💖<br><br><button class="rp">Main lagi ↺</button>`;w.querySelector('.rp').onclick=()=>go(0);
   let k=0;iv(()=>{burst(R(0,W),H*.4,30);if(++k>10)T.forEach(clearInterval)},250)}})
];

/* ---------- navigasi ---------- */
const back=$('#back'),next=$('#next'),stage=$('#stage');
function go(n){T.forEach(clearInterval);T=[];i=n;const tok=n,p=pages[n],d=document.createElement('div');d.className='pg';
 d.innerHTML=p.t=='s'?`<div class="big">${p.e}</div>${p.c?`<h1>${p.h}</h1>`:`<h2>${p.h}</h2>`}<p>${p.p}</p>`:`<h2>${p.h}</h2><p class="hint">${p.hint||''}</p><div class="play"></div>`;
 stage.replaceChildren(d);stage.scrollTop=0;
 $('#fill').style.width=(n+1)/pages.length*100+'%';$('#cnt').textContent=(n+1)+' / '+pages.length;
 back.style.visibility=n?'visible':'hidden';next.style.visibility=n==pages.length-1?'hidden':'visible';
 next.classList.remove('pulse');next.disabled=p.t=='g'&&!cleared[n];
 if(p.t=='g')p.init(d.querySelector('.play'),()=>{if(i!==tok)return;cleared[tok]=1;next.disabled=false;next.classList.add('pulse');burst(innerWidth/2,innerHeight*.6,18)})}
next.onclick=()=>i<pages.length-1&&go(i+1);back.onclick=()=>i>0&&go(i-1);
go(0);
