/* Country Life + Vocabulary Trainer */
(function(){
'use strict';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function shuffle(a){ a = a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

/* ---------- Vokabeln Lesson 1 ---------- */
/* en, de, Erklärung (einfach), falsche Übersetzungen (DE→EN), falsche Schreibweisen */
const V1 = [
 {en:'countryside', de:'Landschaft, Natur auf dem Land', ex:'The land outside towns and cities, with fields, hills and farms.', conf:['village','mountains','farmyard'], sp:['contryside','countrysaid','countryseid']},
 {en:'hills', de:'Hügel', ex:'Land that is higher than the land around it, but not as high as mountains.', conf:['mountains','fields','valleys'], sp:['hils','hilles','hiels']},
 {en:'farm house', de:'Bauernhaus', ex:'The house on a farm where the farmer lives.', conf:['farmer','barn','cottage'], sp:['farm hous','farm howse','fahrm house']},
 {en:'farmer', de:'Landwirt/in, Bauer/Bäuerin', ex:'A person who works on a farm and looks after the animals.', conf:['farm','fisher','gardener'], sp:['farma','farmar','farrmer']},
 {en:'straw', de:'Stroh', ex:'Dry yellow plants. Animals can sleep on it.', conf:['strawberry','stone','grass'], sp:['strow','strau','stroh']},
 {en:'track', de:'Pfad, (Feld-)Weg', ex:'A narrow path or a small road in the countryside.', conf:['truck','trick','road'], sp:['trak','tracc','trakk']},
 {en:'gate', de:'Tor, Gatter', ex:'A kind of door in a fence. You open it to go through.', conf:['goat','date','wall'], sp:['gait','geit','gaet']},
 {en:'in the middle of nowhere', de:'mitten im Nirgendwo, am Ende der Welt', ex:'A place that is very far away from towns and people.', conf:['in the middle of the city','at the top of the hill','in the middle of the night'], sp:['in the midle of nowhere','in the middle of nowere','in the middel of nowhere']},
 {en:'block of flats', de:'Wohnblock, Häuserblock', ex:'A tall building with many homes inside.', conf:['office building','shopping centre','block of wood'], sp:['blok of flats','block of flatts','block off flats']},
 {en:'sound', de:'klingen, sich anhören', ex:'You use this word when you hear a plan and like it: “That ___ great!”', conf:['sand','round','soup'], sp:['saund','sownd','soond']},
 {en:'deep', de:'tief', ex:'Going down a long way from the top. A hole or a lake can be this.', conf:['high','deer','dirty'], sp:['dep','deeb','diep']},
 {en:'heavy', de:'schwer (Gewicht)', ex:'Not light. A big stone is this, and it is hard to carry.', conf:['light','happy','hairy'], sp:['hevy','heavvy','hevvy']},
 {en:'probably', de:'wahrscheinlich', ex:'Almost sure, but not 100 percent. “It will ___ rain tomorrow.”', conf:['possibly','perhaps','properly'], sp:['probaply','probabley','propably']},
 {en:'fence', de:'Zaun', ex:'It is made of wood or wire and goes around a field. It keeps animals in.', conf:['wall','fancy','finch'], sp:['fense','fance','fenze']},
 {en:'chase sb./sth.', de:'jn./etwas jagen, hinterherrennen', ex:'To run after someone or something to catch it. Dogs do this with cats.', conf:['chair','cheese','case'], sp:['chace','chas','chayse']}
];

/* ---------- Vokabeln Lesson 2 ---------- */
const V2 = [
 {en:'business', de:'Geschäft, Firma', ex:'A company or a shop. People work there to earn money.', conf:['busy','bush','bus stop'], sp:['bisness','busness','buisness']},
 {en:'van', de:'Transporter, Lieferwagen', ex:'A big car that carries things, for example food or boxes.', conf:['fan','vase','tram'], sp:['vann','vaan','wan']},
 {en:'install', de:'installieren, einrichten', ex:'To put a new machine or camera in the right place so that it works.', conf:['instead','insult','inspect'], sp:['instol','inestall','instaall']},
 {en:'CCTV camera', de:'Überwachungskamera', ex:'A camera that films a place all day. You can see who comes in.', conf:['TV camera','photo camera','video game'], sp:['CCTV camara','CTTV camera','CCTV kamera']},
 {en:'It sucks!', de:'Es nervt! / Es ist Mist! (umgangssprachlich)', ex:'You say this when something is really bad. “No wifi? ___!”', conf:['It rocks!','It sounds!','It sticks!'], sp:['It socks!','It suks!','It sucs!']},
 {en:'lead', de:'(Hunde-)Leine', ex:'A long strap that you put on a dog so that it cannot run away.', conf:['leaf','lend','lean'], sp:['leed','leaad','lede']},
 {en:'hero', de:'Held/in (Mehrzahl: heroes)', ex:'A person who does something very brave and helps other people.', conf:['hair','here','hello'], sp:['hiro','heero','herro']},
 {en:'save', de:'retten (auch: sparen)', ex:'To help somebody who is in danger, so that he or she is safe again.', conf:['safe','sail','serve'], sp:['saive','sayve','seive']},
 {en:'brave', de:'mutig', ex:'Not afraid of danger. A firefighter has to be this.', conf:['brown','bread','brief'], sp:['braive','brayve','breve']},
 {en:'drown', de:'ertrinken', ex:'To go under the water and not be able to breathe. This is very dangerous.', conf:['drive','down','drop'], sp:['drowen','droun','draun']},
 {en:'get out (of sth.)', de:'(aus etwas) herauskommen', ex:'To leave a place, for example a car or the water.', conf:['get on','get up','get over'], sp:['get aut','git out','get owt']},
 {en:'react', de:'reagieren', ex:'To do something because something has happened, for example when you hear a loud noise.', conf:['reach','read','rest'], sp:['riact','reakt','reackt']},
 {en:'recently', de:'in letzter Zeit; vor Kurzem', ex:'A short time ago. Not long before now.', conf:['recipe','really','regularly'], sp:['resently','recentely','recentlly']},
 {en:'clear', de:'klar, deutlich, eindeutig', ex:'You can see through it, or it is easy to understand. Clean water is this.', conf:['clean','clever','cloudy'], sp:['cleer','klear','cleare']},
 {en:'among', de:'zwischen, unter (mehreren)', ex:'In the middle of many people or things: a sheep ___ the other sheep.', conf:['along','around','amount'], sp:['amung','ammong','amoung']}
];
const TIPS2 = [
 ['Read the headline and look at the picture first.','Sie verraten dir schon, worum es geht.'],
 ['Read the tasks before you read the text.','So weißt du, wonach du suchen musst.'],
 ['Read the text once quickly.','Du musst nicht jedes Wort verstehen. Verschaffe dir erst einen Überblick.'],
 ['Underline the key words in the question.','Suche sie dann im Text. Oft stehen die Antworten direkt daneben.'],
 ['The tasks are in the same order as the text.','Aufgabe 2 steht im Text nach Aufgabe 1.'],
 ['“Not in the text” means: the text says nothing about it.','Auch wenn es stimmen könnte, zählt nur, was im Text steht.'],
 ['False? Find the sentence that shows it is wrong.','Unterstreiche diese Stelle im Text.'],
 ['The text often uses other words than the question.','Suche nach Wörtern mit der gleichen Bedeutung.'],
 ['Do not know a word? Read the sentence before and after it.','Oft kannst du die Bedeutung erraten. Wenn nicht, lass das Wort aus.'],
 ['Check at the end: is there an answer for every task?','Lies noch einmal kurz über deine Antworten.']
];

/* Bei der Wahl der Antwort zählt nur der erste Teil bei chase: Anzeige "chase" */
const label = w => w.en;

/* ---------- Vokabel-Tabelle ---------- */
(function(){
  const t = $('#cl-vocab-table'); if(!t) return;
  t.innerHTML = '<tr><th>English</th><th>Deutsch</th></tr>' + V1.map(w => '<tr><td>'+esc(w.en)+'</td><td>'+esc(w.de)+'</td></tr>').join('');
})();

(function(){
  const t = $('#cl-vocab-table2'); if(!t) return;
  t.innerHTML = '<tr><th>English</th><th>Deutsch</th></tr>' + V2.map(w => '<tr><td>'+esc(w.en)+'</td><td>'+esc(w.de)+'</td></tr>').join('');
})();

/* ---------- Listening Tips ---------- */
const TIPS = [
 ['Read the tasks before you listen.','Lies zuerst alle Aufgaben, dann weißt du, worauf du achten musst.'],
 ['Look at the title and the pictures.','Sie verraten dir das Thema und die Situation.'],
 ['Underline the key words in the questions.','Markiere die wichtigsten Wörter in jeder Aufgabe.'],
 ['The tasks are in the same order as the text.','Du hörst die Antwort auf Aufgabe 2 nach der Antwort auf Aufgabe 1.'],
 ['You do not have to understand every word.','Bleib ruhig, wenn ein Wort fehlt. Hör weiter auf das Wichtige.'],
 ['Listen for names, numbers, days and times.','Diese Wörter sind oft die Lösung.'],
 ['Watch out! The speaker can change his or her mind.','„Friday … no, Saturday!“ – die zweite Aussage zählt.'],
 ['Write short answers.','Ein Wort reicht oft. Achte auf die richtige Schreibung.'],
 ['Do not stay on one task.','Verpasst? Lass die Aufgabe offen und konzentriere dich auf die nächste.'],
 ['Never leave a gap empty.','Ein Tipp ist besser als nichts. Kreuze beim zweiten Hören noch einmal nach.']
];
(function(){
  const l = $('#cl-tips-list'); if(!l) return;
  l.innerHTML = TIPS.map(t => '<li><b>'+esc(t[0])+'</b><span>'+esc(t[1])+'</span></li>').join('');
})();

(function(){
  const l = $('#cl-tips-list2'); if(!l) return;
  l.innerHTML = TIPS2.map(t => '<li><b>'+esc(t[0])+'</b><span>'+esc(t[1])+'</span></li>').join('');
})();

/* ---------- Feedback-Overlay ---------- */
const BULB = '<svg viewBox="0 0 120 150" aria-hidden="true"><defs><radialGradient id="glow" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#fff7b0"/><stop offset="1" stop-color="#ffc400"/></radialGradient></defs><g stroke="#f2b100" stroke-width="5" stroke-linecap="round"><path d="M60 6v12M15 28l9 8M105 28l-9 8M4 70h12M104 70h12"/></g><path d="M60 24c-22 0-38 16-38 37 0 13 6 21 13 29 5 6 8 11 8 19h34c0-8 3-13 8-19 7-8 13-16 13-29 0-21-16-37-38-37z" fill="url(#glow)" stroke="#e6a800" stroke-width="4"/><rect x="42" y="112" width="36" height="9" rx="4" fill="#9aa3a0"/><rect x="46" y="124" width="28" height="9" rx="4" fill="#7f8985"/><path d="M50 62c4 6 8 6 10 0 2 6 6 6 10 0" fill="none" stroke="#e6a800" stroke-width="4" stroke-linecap="round"/></svg>';
const CROSS = '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" fill="#fdecea" stroke="#d64533" stroke-width="5"/><path d="M38 38l44 44M82 38L38 82" stroke="#d64533" stroke-width="14" stroke-linecap="round"/></svg>';
let ovTimer;
function feedback(ok, cb){
  const o = $('#cl-overlay'); o.className = 'cl-overlay ' + (ok ? 'ok' : 'no');
  o.innerHTML = '<div>' + (ok ? BULB + '<b>great</b>' : CROSS + '<b>try again</b>') + '</div>';
  o.hidden = false; clearTimeout(ovTimer);
  const close = () => { clearTimeout(ovTimer); o.hidden = true; o.onclick = null; cb && cb(); };
  o.onclick = close; ovTimer = setTimeout(close, ok ? 1200 : 1000);
}

/* ---------- Quiz-Motor ---------- */
function runQuiz(box, makeQuestions, opts){
  opts = opts || {};
  let qs, idx, score, firstTry;
  function start(){ qs = makeQuestions(); idx = 0; score = 0; show(); }
  function show(){
    if(idx >= qs.length){
      const n = qs.length;
      const msg = score === n ? 'Perfect! All correct.' : score >= n*0.7 ? 'Great job! That is already good.' : 'Keep practising. You will get there!';
      box.innerHTML = '<div class="q-card q-end"><h3>'+score+' / '+n+' right at the first try</h3><p>'+msg+'</p><button class="ka-btn small q-again">Play again</button></div>';
      box.querySelector('.q-again').addEventListener('click', start);
      return;
    }
    const q = qs[idx]; firstTry = true;
    box.innerHTML = '<div class="q-card"><div class="cl-prog"><i style="width:'+(idx/qs.length*100)+'%"></i></div><div class="q-count">'+(idx+1)+' / '+qs.length+'</div>' +
      '<p class="q-prompt'+(q.big?' big':'')+'">'+esc(q.prompt)+'</p>' +
      '<div class="q-opts'+(q.options.length>=5?' five':'')+'">' + q.options.map((o,i) => '<button class="q-opt" data-i="'+i+'">'+esc(o)+'</button>').join('') + '</div></div>';
    box.querySelectorAll('.q-opt').forEach(b => b.addEventListener('click', () => {
      const ok = q.options[+b.dataset.i] === q.answer;
      if(ok){ if(firstTry) score++; feedback(true, () => { idx++; show(); window.scrollTo({top:0}); }); }
      else { firstTry = false; b.classList.add('gone'); feedback(false); }
    }));
  }
  start();
}

/* Bewegungsquiz: Beschreibung + 5 Kacheln */
function qExplanations(V){ V = V || V1;
  return shuffle(V).map(w => {
    const others = shuffle(V.filter(x => x !== w)).slice(0,4);
    return {prompt:w.ex, options:shuffle([w].concat(others)).map(label), answer:label(w)};
  });
}
/* Deutsch → Englisch: 4 Kacheln, 3 ähnliche falsche */
function qDeEn(V){ V = V || V1;
  return shuffle(V).map(w => ({prompt:w.de, big:true, options:shuffle([label(w)].concat(w.conf)), answer:label(w)}));
}
/* Schreibweise: Deutsch + 3 Schreibvarianten (1 richtig, 2 falsch) */
function qSpell(V){ V = V || V1;
  return shuffle(V).map(w => ({prompt:w.de, big:true, options:shuffle([w.en].concat(shuffle(w.sp).slice(0,2))), answer:w.en}));
}

function hook(id, fn){ const el = $(id); if(!el) return; let started = false;
  const panel = el.closest('section.panel');
  const go = () => { if(panel.classList.contains('active') && !started){ started = true; fn(el); } };
  new MutationObserver(go).observe(panel, {attributes:true, attributeFilter:['class']}); go(); }
hook('#cl-move-quiz', el => runQuiz(el, qExplanations));
hook('#vt-quiz-de-en', el => runQuiz(el, qDeEn));
hook('#vt-quiz-spell', el => runQuiz(el, qSpell));
hook('#vt-quiz-expl', el => runQuiz(el, qExplanations));
hook('#cl-move-quiz2', el => runQuiz(el, () => qExplanations(V2)));
hook('#vt-quiz-de-en2', el => runQuiz(el, () => qDeEn(V2)));
hook('#vt-quiz-spell2', el => runQuiz(el, () => qSpell(V2)));
hook('#vt-quiz-expl2', el => runQuiz(el, () => qExplanations(V2)));

/* ---------- Warm-up: Who am I? + Schild + Einstiegsbild ---------- */
const KIDS = [
 {id:'amir', name:'Amir'}, {id:'chloe', name:'Chloe'}, {id:'jayden', name:'Jayden'}, {id:'freya', name:'Freya'}
];
const BUBBLES = [
 ['amir','I live in Tower Hamlets in East London. I take the tube to school, and it takes about 20 minutes.'],
 ['amir','After school I help my mum in her shop. On Saturdays I play football for my school team.'],
 ['chloe','I live in Brixton in South London. My school is only five minutes away, so I walk.'],
 ['chloe','My favourite thing about London is the parks. They are huge!'],
 ['jayden','I am from Camden in North London. There are lots of street markets and live music.'],
 ['jayden','I take the bus to school because it is too far to walk. At the weekend I hang out near the canal.'],
 ['freya','I live in Kensington in West London. My neighbourhood is very posh, with big white houses.'],
 ['freya','My favourite place is the Natural History Museum. And I have to practise the violin every day!']
];
/* Hotspots im Einstiegsbild: x/y in Prozent. Wird nach dem fertigen Bild feinjustiert. */
const HOTS = [
 {en:'hills', de:'Hügel', x:57.0, y:27.0},
 {en:'farm house', de:'Bauernhaus', x:30.0, y:36.5},
 {en:'field', de:'Feld, Acker, Weide', x:17.2, y:69.9},
 {en:'sheep', de:'Schaf(e)', x:40.9, y:62.5},
 {en:'track', de:'Pfad, (Feld-)Weg', x:59.0, y:68.9},
 {en:'straw', de:'Stroh', x:66.9, y:50.7},
 {en:'tractor', de:'Traktor', x:80.5, y:50.0},
 {en:'gate', de:'Tor, Gatter', x:59.0, y:84.1}
];
function orderBubbles(){
  let arr = shuffle(BUBBLES), tries = 0;
  while(tries++ < 50){ let bad = false; for(let i=1;i<arr.length;i++) if(arr[i][0] === arr[i-1][0]) bad = true; if(!bad) break; arr = shuffle(BUBBLES); }
  return arr;
}
function warmup(box){
  let list = orderBubbles(), i = 0, done = {};
  function game(){
    if(i >= list.length) return sign();
    const b = list[i];
    box.innerHTML = '<p class="panel-sub" style="margin-top:6px">Who am I? Read the speech bubble and choose the right child.</p>' +
      '<div class="cl-prog"><i style="width:'+(i/list.length*100)+'%"></i></div>' +
      '<div class="cl-bubble">“'+esc(b[1])+'”</div>' +
      '<div class="cl-who">Who is speaking?</div>' +
      '<div class="cl-kids">' + KIDS.map(k => '<button class="cl-kid'+(done[k.id]===2?' done':'')+'" data-k="'+k.id+'"><div class="ph">'+k.name[0]+'<img src="img/cl-'+k.id+'.png" alt="" onerror="this.remove()"></div><b>'+k.name+'</b></button>').join('') + '</div>';
    box.querySelectorAll('.cl-kid').forEach(el => el.addEventListener('click', () => {
      if(el.dataset.k === b[0]){ done[b[0]] = (done[b[0]]||0) + 1; feedback(true, () => { i++; game(); }); }
      else { el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 450); feedback(false); }
    }));
  }
  function sign(){
    box.innerHTML = '<div class="cl-sign">Welcome to Country Life!<small>Chapter 2 · Let’s leave the city for a weekend.</small></div>' +
      '<img class="cl-full" src="img/cl-einstieg.png" alt="Four friends dream of the countryside" onerror="this.remove()">' +
      '<p class="panel-sub" style="margin:18px 0 8px">Tap the green dots to learn the words.</p>' +
      '<div class="cl-scene" id="cl-scene"><img src="img/cl-einstieg-blase.png" alt="The dream of the countryside" onerror="this.remove()">' +
      HOTS.map((h,n) => '<button class="cl-hot" data-n="'+n+'" style="left:'+h.x+'%;top:'+h.y+'%" aria-label="'+esc(h.en)+'">?</button>').join('') + '</div>' +
      '<div class="cl-word" id="cl-word"><span>Tap a dot in the picture or a word below.</span></div>' +
      '<div class="cl-chips">' + HOTS.map((h,n) => '<button class="cl-chip" data-n="'+n+'">'+esc(h.en)+'</button>').join('') + '</div>' +
      '<button class="ka-btn small" id="cl-replay" style="margin-top:16px">Play “Who am I?” again</button>';
    const scene = $('#cl-scene'), img = scene.querySelector('img');
    const hide = () => scene.querySelectorAll('.cl-hot').forEach(h => h.style.display = (img && img.isConnected && img.complete && img.naturalWidth) ? '' : 'none');
    hide(); if(img) img.addEventListener('load', hide); if(img) img.addEventListener('error', hide);
    box.querySelectorAll('[data-n]').forEach(el => el.addEventListener('click', () => {
      const h = HOTS[+el.dataset.n]; $('#cl-word').innerHTML = '<b>'+esc(h.en)+'</b><span>'+esc(h.de)+'</span>';
    }));
    $('#cl-replay').addEventListener('click', () => { list = orderBubbles(); i = 0; done = {}; game(); });
  }
  game();
}
hook('#cl-start-box', warmup);

/* =====================  Lesson 3: Grammar 1 (Adverbs)  ===================== */
const V3 = [
 {en:'daughter', de:'Tochter', ex:'A girl or a woman who is the child of a mother and a father.', conf:['doctor','dirty','dancer'], sp:['dauter','doughter','daugther']},
 {en:'son', de:'Sohn', ex:'A boy or a man who is the child of a mother and a father.', conf:['sun','soon','sign'], sp:['sonn','sone','soan']},
 {en:'anything', de:'(irgend)etwas; nichts (verneint)', ex:'You use this word in questions and with “not”. “I haven’t got ___.”', conf:['anywhere','another','everything'], sp:['anithing','enything','anyting']},
 {en:'… or something', de:'… oder so was', ex:'You say this when you are not sure. “He is a teacher ___.”', conf:['… or somewhere','… and something','… or someone'], sp:['… or somthing','… or sumthing','… or somethink']},
 {en:'right now', de:'jetzt gerade, im Augenblick', ex:'At this moment. Not later and not yesterday.', conf:['right side','last night','at night'], sp:['rite now','right nou','rigth now']},
 {en:'the other day', de:'neulich', ex:'A few days ago. You do not say which day.', conf:['the other way','every day','the next day'], sp:['the other dai','the uther day','the otter day']},
 {en:'ring, rang, rung', de:'anrufen (auch: klingeln)', ex:'To call someone on the phone. A bell does this, too.', conf:['sing, sang, sung','run, ran, run','ride, rode, ridden'], sp:['ring, rang, rong','ring, ran, rung','rink, rang, rung']},
 {en:'rude', de:'unhöflich, frech', ex:'Not polite. For example, you do not say please or thank you.', conf:['ride','road','red'], sp:['rood','rewd','ruud']},
 {en:'calm', de:'ruhig, still', ex:'Quiet and relaxed. Not angry and not nervous.', conf:['clam','claim','camp'], sp:['carm','kalm','calme']},
 {en:'impatient', de:'ungeduldig', ex:'You cannot wait. You want things to happen now.', conf:['important','impossible','independent'], sp:['impatiant','impashent','inpatient']},
 {en:'smile', de:'lächeln', ex:'The corners of your mouth go up. You do this when you are happy.', conf:['small','smell','smoke'], sp:['smyle','smiel','smille']},
 {en:'cottage', de:'Ferienhaus; kleines Landhaus', ex:'A small old house in the countryside.', conf:['cabbage','message','garage'], sp:['cotage','cottege','cotttage']}
];
(function(){
  const t = $('#cl-vocab-table3'); if(!t) return;
  t.innerHTML = '<tr><th>English</th><th>Deutsch</th></tr>' + V3.map(w => '<tr><td>'+esc(w.en)+'</td><td>'+esc(w.de)+'</td></tr>').join('');
})();
hook('#vt-quiz-de-en3', el => runQuiz(el, () => qDeEn(V3)));
hook('#vt-quiz-spell3', el => runQuiz(el, () => qSpell(V3)));
hook('#vt-quiz-expl3', el => runQuiz(el, () => qExplanations(V3)));

/* Einstieg: Satzpaare nacheinander */
const PAIRS = [
 ['Grandad is slow.','Grandad walks slowly.'],
 ['Bella is brave.','Bella jumped bravely into the water.'],
 ['Grandma is careful.','Grandma carries the eggs carefully.'],
 ['Jayden is loud.','Jayden sings loudly.'],
 ['The fence is easy to climb.','Amir climbs the fence easily.'],
 ['Freya is happy.','Freya waves happily.']
];
(function(){
  const box = $('#cl-pairs'), btn = $('#cl-pairs-btn'); if(!box || !btn) return;
  let n = 0;
  function add(){
    if(n >= PAIRS.length) return;
    const p = PAIRS[n++];
    const row = document.createElement('div');
    row.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:8px 0;border-top:1px solid var(--border)';
    row.innerHTML = '<span>'+esc(p[0])+'</span><span style="color:var(--accent-deep);font-weight:600">'+esc(p[1])+'</span>';
    box.appendChild(row);
    if(n >= PAIRS.length) btn.style.display = 'none';
  }
  btn.addEventListener('click', add); add();
})();

/* ---------- Grammar Practice ---------- */
function pick(arr, n){ return shuffle(arr).slice(0, n); }
/* Reihenfolge ohne drei gleiche Arten hintereinander und ohne ABAB */
function mixKinds(items, key){
  let arr = shuffle(items), tries = 0;
  while(tries++ < 80){
    let bad = false;
    for(let i=2;i<arr.length;i++) if(arr[i][key] === arr[i-1][key] && arr[i][key] === arr[i-2][key]) bad = true;
    for(let i=3;i<arr.length;i++) if(arr[i][key] === arr[i-2][key] && arr[i-1][key] === arr[i-3][key] && arr[i][key] !== arr[i-1][key]) bad = true;
    if(!bad) break; arr = shuffle(items);
  }
  return arr;
}
/* 1 Adjective or adverb? */
const M1 = [
 {s:'Grandad walks ___ to the gate.', adj:'slow', adv:'slowly', k:'adv'},
 {s:'Bella is a ___ dog.', adj:'brave', adv:'bravely', k:'adj'},
 {s:'Ben ran ___ to the field.', adj:'quick', adv:'quickly', k:'adv'},
 {s:'Grandma is very ___ with the eggs.', adj:'careful', adv:'carefully', k:'adj'},
 {s:'Jayden sings ___ with his headphones.', adj:'loud', adv:'loudly', k:'adv'},
 {s:'The farm gate is ___.', adj:'heavy', adv:'heavily', k:'adj'},
 {s:'Freya waved ___.', adj:'happy', adv:'happily', k:'adv'},
 {s:'Amir climbed the fence ___.', adj:'easy', adv:'easily', k:'adv'},
 {s:'The water in the brook is ___.', adj:'clear', adv:'clearly', k:'adj'},
 {s:'Chloe talks ___.', adj:'quiet', adv:'quietly', k:'adv'},
 {s:'The tractor is old and ___.', adj:'slow', adv:'slowly', k:'adj'},
 {s:'Jayden spoke ___ to Grandma.', adj:'rude', adv:'rudely', k:'adv'},
 {s:'Bella is very ___.', adj:'calm', adv:'calmly', k:'adj'},
 {s:'Bella waited ___ at the gate.', adj:'calm', adv:'calmly', k:'adv'},
 {s:'Jayden is ___ because dinner is late.', adj:'impatient', adv:'impatiently', k:'adj'},
 {s:'Grandma smiled ___ at everybody.', adj:'happy', adv:'happily', k:'adv'}
];
function qAdjAdv(){
  return mixKinds(M1,'k').slice(0,10).map(q => ({prompt:q.s, options:shuffle([q.adj,q.adv]), answer:q[q.k]}));
}
/* 2 Make the adverb */
const M2 = [
 ['quick','quickly',['quickley','quikly']],['slow','slowly',['slowley','slowy']],['brave','bravely',['bravly','bravley']],
 ['careful','carefully',['carefuly','carefulley']],['loud','loudly',['loudley','loudy']],['happy','happily',['happyly','happiely']],
 ['easy','easily',['easyly','easiely']],['terrible','terribly',['terriblely','terribley']],['gentle','gently',['gentlely','gentley']],
 ['good','well',['goodly','gooder']],['fast','fast',['fastly','faster']],['hard','hard',['hardly','harder']],
 ['quiet','quietly',['quietley','quitely']],['angry','angrily',['angryly','angriely']],['noisy','noisily',['noisyly','noisiely']],
 ['impatient','impatiently',['impatientely','impatiantly']],['calm','calmly',['calmley','calmy']],['rude','rudely',['rudly','rudey']]
];
function qMake(){ return pick(M2,10).map(q => ({prompt:q[0]+'  →  ?', big:true, options:shuffle([q[1]].concat(q[2])), answer:q[1]})); }
/* 3 Fill the gap */
const M3 = [
 ['Grandma smiled ___ at Jayden. (happy)','happily','happy','happyly'],
 ['“Where is my tea?” Jayden asked ___. (impatient)','impatiently','impatient','impatiantly'],
 ['Grandad answered ___. (calm)','calmly','calm','calmley'],
 ['Ben works ___ on the farm. (hard)','hard','hardly','harder'],
 ['Bella listens ___ to Grandad. (good)','well','good','goodly'],
 ['Amir opened the gate ___. (careful)','carefully','careful','carefuly'],
 ['The bridge broke ___. (sudden)','suddenly','sudden','suddenley'],
 ['Chloe plays the guitar ___. (beautiful)','beautifully','beautiful','beautifuly'],
 ['The sheep ran ___ across the field. (fast)','fast','fastly','faster'],
 ['Freya laughed ___. (loud)','loudly','loud','loudley'],
 ['Jayden spoke ___ to Grandma. (rude)','rudely','rude','rudly'],
 ['The friends walked ___ along the brook. (quiet)','quietly','quiet','quietley']
];
function qGap(){ return pick(M3,10).map(q => ({prompt:q[0], options:shuffle([q[1],q[2],q[3]]), answer:q[1]})); }
/* 4 Which sentence is right? (Manner) */
const M4 = [
 ['Bella runs quickly.','Bella runs quick.','Bella runs quickley.'],
 ['Grandma cooks very well.','Grandma cooks very good.','Grandma cooks very goodly.'],
 ['Ben works hard on the farm.','Ben works hardly on the farm.','Ben work hard on the farm.'],
 ['Chloe talks quietly.','Chloe talks quiet.','Chloe talk quietly.'],
 ['The sheep are running fast.','The sheep are running fastly.','The sheep are running fasty.'],
 ['Amir climbed the fence easily.','Amir climbed the fence easy.','Amir climbed the fence easyly.'],
 ['Grandad closed the gate carefully.','Grandad closed the gate careful.','Grandad closed the gate carefuly.'],
 ['Jayden sings terribly.','Jayden sings terrible.','Jayden sings terribley.'],
 ['Grandma smiled happily.','Grandma smiled happy.','Grandma smiled happyly.'],
 ['Bella jumped bravely into the water.','Bella jumped brave into the water.','Bella jumped bravly into the water.']
];
function qRight(list){ return pick(list,Math.min(10,list.length)).map(q => ({prompt:'Which sentence is right?', options:shuffle(q.slice()), answer:q[0]})); }
/* Frequency 1: Where does it go? */
const F1 = [
 {w:['Freya','is','friendly'], a:'always', k:1, t:'be'},
 {w:['The','wifi','is','slow'], a:'sometimes', k:2, t:'be'},
 {w:['Grandad','is','tired','in','the','evening'], a:'often', k:1, t:'be'},
 {w:['Jayden','is','late','for','dinner'], a:'never', k:1, t:'be'},
 {w:['Bella','chases','rabbits'], a:'often', k:1, t:'full'},
 {w:['Grandma','makes','apple','pie','on','Saturdays'], a:'usually', k:1, t:'full'},
 {w:['Grandad','feeds','the','sheep','before','breakfast'], a:'always', k:1, t:'full'},
 {w:['Jayden','gets','up','early'], a:'never', k:1, t:'full'},
 {w:['Chloe','plays','the','guitar','after','school'], a:'sometimes', k:1, t:'full'},
 {w:['Jayden','doesn’t','help','in','the','kitchen'], a:'usually', k:2, t:'aux'},
 {w:['Ben','can','find','the','sheep'], a:'always', k:2, t:'aux'},
 {w:['We','don’t','go','to','the','cinema'], a:'often', k:2, t:'aux'},
 {w:['Grandad','can','find','his','glasses'], a:'never', k:2, t:'aux'},
 {w:['They','don’t','watch','TV','on','the','farm'], a:'usually', k:2, t:'aux'}
];
function insertAt(q, p){ const w = q.w.slice(); w.splice(p,0,q.a); let s = w.join(' ') + '.'; return s; }
function qWhere(){
  return mixKinds(F1,'t').slice(0,10).map(q => {
    const gaps = []; for(let p=1;p<q.w.length;p++) if(p !== q.k) gaps.push(p);
    const wrong = pick(gaps, 3).map(p => insertAt(q,p)), right = insertAt(q,q.k);
    return {prompt:'Where does “'+q.a+'” go?', options:shuffle([right].concat(wrong)), answer:right};
  });
}
/* Frequency 2: How often? */
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const ACTS = ['Grandad feeds the sheep','Bella chases rabbits','Grandma makes apple pie','Jayden helps in the kitchen','Ben visits the farm','Chloe plays the guitar','Amir does his homework','Freya walks in the hills'];
const RANGE = {always:[7,7], usually:[5,6], often:[3,4], sometimes:[1,2], never:[0,0]};
function qOften(){
  const advs = Object.keys(RANGE); const out = [];
  const order = shuffle(advs.concat(pick(advs,5)));
  const acts = shuffle(ACTS);
  order.forEach((a,i) => {
    const r = RANGE[a], cnt = r[0] + Math.floor(Math.random()*(r[1]-r[0]+1));
    const days = shuffle([0,1,2,3,4,5,6]).slice(0,cnt);
    const line = DAYS.map((d,n) => d+' '+(days.indexOf(n)>-1?'✓':'✗')).join('  ·  ');
    out.push({prompt:acts[i%acts.length]+' …\n'+line, options:shuffle(advs.slice()), answer:a});
  });
  return out;
}
/* Frequency 3: How or how often? */
const F3 = [
 ['Grandad usually walks slowly.','usually','often'],['Grandad usually walks slowly.','slowly','how'],
 ['Bella never leaves Grandad’s side.','never','often'],['Jayden sings loudly.','loudly','how'],
 ['Ben works hard.','hard','how'],['We don’t often go to the cinema.','often','often'],
 ['Grandma always cooks carefully.','carefully','how'],['Grandma always cooks carefully.','always','often'],
 ['Chloe plays the guitar well.','well','how'],['Freya is sometimes late.','sometimes','often'],
 ['Amir climbed the fence easily.','easily','how'],['Jayden is always hungry.','always','often']
];
function qHow(){ return pick(F3,10).map(q => {
  const ans = q[2]==='how' ? 'How? (manner)' : 'How often? (frequency)';
  return {prompt:q[0]+'\nWhat does “'+q[1]+'” tell you?', options:shuffle(['How? (manner)','How often? (frequency)']), answer:ans}; }); }
/* Frequency 4: Which sentence is right? */
const F4 = [
 ['Freya is always friendly.','Freya always is friendly.','Freya is friendly always.'],
 ['Bella usually runs quickly.','Bella runs usually quickly.','Bella usually runs quick.'],
 ['Ben can always find the sheep.','Ben always can find the sheep.','Ben can find always the sheep.'],
 ['Grandad often walks slowly.','Grandad walks often slowly.','Grandad often walks slow.'],
 ['Jayden never sings well.','Jayden sings never well.','Jayden never sings good.'],
 ['We don’t often go to the cinema.','We don’t go often to the cinema.'],
 ['Grandma always cooks carefully.','Grandma cooks always carefully.','Grandma always cooks careful.'],
 ['Chloe is sometimes impatient.','Chloe sometimes is impatient.'],
 ['Bella always listens well.','Bella listens always well.','Bella always listens good.'],
 ['Jayden never gets up early.','Jayden gets never up early.','Jayden gets up never early.']
];
hook('#cl-move-quiz3', el => runQuiz(el, qAdjAdv));
hook('#gp-m1-quiz', el => runQuiz(el, qAdjAdv));
hook('#gp-m2-quiz', el => runQuiz(el, qMake));
hook('#gp-m3-quiz', el => runQuiz(el, qGap));
hook('#gp-m4-quiz', el => runQuiz(el, () => qRight(M4)));
hook('#gp-f1-quiz', el => runQuiz(el, qWhere));
hook('#gp-f2-quiz', el => runQuiz(el, qOften));
hook('#gp-f3-quiz', el => runQuiz(el, qHow));
hook('#gp-f4-quiz', el => runQuiz(el, () => qRight(F4)));

})();
