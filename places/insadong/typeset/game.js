/* 인사동 · 활자 조판 체험 — 좌우가 뒤집힌 금속활자를 골라 판에 놓고, 먹을 발라 찍어 봐요.
 * 배우는 것: ① 활자는 글자를 좌우 반대로 새긴다 ② 판에서는 순서도 반대(오른쪽부터) ③ 찍으면 바르게 나온다 */
window.Game = (() => {
  const D = {
    id: 'insadong-typeset',
    name: '활자 조판 체험',
    theme: { main: '#7a5a2a' },
    think: '금속활자가 없던 때에는 책 한 권을 어떻게 만들었을까요? 활자가 생기고 무엇이 좋아졌을까요?',
    sources: [
      { title: '인사동 땅 속에서 세종 때 한글 금속활자 무더기 발굴 — 뉴스토마토', url: 'https://newstomato.com/ReadNews.aspx?no=1055248' },
      { title: '인사동 땅속에서 깨어난 조선의 골목, 인사도시유적전시관 — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2018802' }
    ]
  };
  // 라운드: 찍을 낱말, 함께 섞을 '안 뒤집힌'(잘못된) 활자 수
  const ROUNDS = [{ word: '한글', decoy: 2 }, { word: '인사동', decoy: 2 }, { word: '훈민정음', decoy: 3 }];
  const CSS = `
  .ts-frame{display:flex;gap:6px;justify-content:center;padding:12px;border-radius:var(--r-box);background:#5a4a3a;box-shadow:inset 0 3px 8px rgba(0,0,0,.4)}
  .ts-slot{width:58px;height:58px;border-radius:8px;border:2px dashed #b9a88a;display:grid;place-items:center;position:relative}
  .ts-slot.next{border-color:#ffcf3f;box-shadow:0 0 0 3px rgba(255,207,63,.35)}
  .ts-slot small{position:absolute;bottom:-20px;font-size:12px;color:#e8dcc4;font-weight:800}
  .ts-tray{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
  .ts-type{width:58px;height:58px;border:0;border-radius:8px;cursor:pointer;display:grid;place-items:center;font:900 32px/1 "Nanum Myeongjo","Batang",serif;
    color:#3a3020;background:linear-gradient(145deg,#d9cdb2,#9a8a6a);box-shadow:0 3px 0 #6a5a3a,var(--sh-low)}
  .ts-type span{display:inline-block}
  .ts-type .m{transform:scaleX(-1)}
  .ts-type:disabled{opacity:.25}
  .ts-slot .ts-type{box-shadow:none;cursor:default}
  .ts-paper{min-height:86px;border-radius:var(--r-el);background:#fbf6e8;box-shadow:var(--sh-low);display:grid;place-items:center;
    font:900 46px/1 "Nanum Myeongjo","Batang",serif;color:#1e1a16;letter-spacing:6px}
  .ts-paper.blank{color:transparent}
  .ts-press{animation:press .9s var(--ease) both}
  @keyframes press{0%{transform:translateY(-30px);opacity:0}50%{transform:translateY(4px);opacity:1}100%{transform:none}}
  .ts-step{display:flex;justify-content:center;gap:6px}
  .ts-step i{width:28px;height:6px;border-radius:9px;background:var(--border)}
  .ts-step i.on{background:var(--main)}
  .ts-ex{display:flex;align-items:center;justify-content:center;gap:var(--sp-2);font-weight:800}
  .ts-ex .ts-type{cursor:default}`;

  let P, round, slots, errs, pool;
  const mirror = c => `<span class="m">${c}</span>`;
  const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function start(opt) {
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    P = Play.init(Object.assign({}, D, opt));
    intro();
  }

  function intro() {
    P.screen(`<div class="card pl-card"><h2>🏺 땅속에서 나온 활자</h2>
        <p>2021년 인사동 땅속 항아리에서 금속활자가 1,600여 개나 나왔어요. 세종대왕 때 한글 활자도 있었어요.</p></div>
      <div class="card pl-card"><h2>🔍 활자의 비밀</h2>
        <p>금속활자는 쇠로 만든 글자 도장이에요. 찍으면 좌우가 바뀌니까, 글자를 <b>거꾸로</b> 새겨요!</p></div>
      <div class="ts-ex"><button class="ts-type" disabled style="opacity:1">${mirror('가')}</button> 꾹 → <span class="ts-paper" style="min-height:58px;width:58px;font-size:32px;letter-spacing:0">가</span></div>
      <p class="pl-note">거꾸로 된 활자를 골라 판에 놓고 찍어 봐요. 모두 3판!</p>
      <button class="btn ghost small src">📚 어른을 위한 참고 자료</button>`,
      '<button class="btn big go">조판 시작 ▶</button>', 'start');
    P.$('.go').onclick = () => { round = 0; errs = 0; play(); };
    P.$('.src').onclick = P.sources;
    P.speak('금속활자는 쇠로 만든 글자 도장이에요. 찍으면 좌우가 바뀌니까 글자를 거꾸로 새겨요!');
  }

  function play() {
    const R = ROUNDS[round], w = [...R.word];
    slots = Array(w.length).fill(null);
    // 진짜 활자(뒤집힘) + 안 뒤집힌 가짜 활자
    pool = shuffle(w.map((c, i) => ({ c, m: true, k: 'r' + i })).concat(shuffle(w.slice()).slice(0, R.decoy).map((c, i) => ({ c, m: false, k: 'd' + i }))));
    P.screen(`<div class="ts-step">${ROUNDS.map((_, i) => `<i class="${i <= round ? 'on' : ''}"></i>`).join('')}</div>
      <div class="card pl-card" style="text-align:center"><p>찍고 싶은 낱말</p><h2 style="font-size:var(--fs-4);margin:4px 0 0">${R.word}</h2></div>
      <div class="ts-frame" aria-label="활자 판">${slots.map((_, i) => `<div class="ts-slot" data-i="${i}"></div>`).join('')}</div>
      <p class="pl-note" style="margin-top:12px">판에는 <b>오른쪽 칸부터</b> 첫 글자를 놓아요 ←</p>
      <div class="ts-tray">${pool.map(t => `<button class="ts-type" data-k="${t.k}" aria-label="${t.c} 활자${t.m ? '' : '(안 뒤집힘)'}">${t.m ? mirror(t.c) : `<span>${t.c}</span>`}</button>`).join('')}</div>
      <div class="ts-paper blank" aria-hidden="true">${R.word}</div>`,
      '<button class="btn big press" disabled>🖌️ 먹 바르고 꾹 찍기</button>', 'typeset');
    paint();
    P.$$('.ts-tray .ts-type').forEach(b => { b.onclick = () => pick(b); });
    P.$('.press').onclick = press;
  }

  const nextSlot = () => slots.length - 1 - slots.filter(Boolean).length;   // 오른쪽부터 채움
  function paint() {
    const n = nextSlot();
    P.$$('.ts-slot').forEach((s, i) => s.classList.toggle('next', i === n));
  }

  function pick(btn) {
    const t = pool.find(x => x.k === btn.dataset.k);
    const word = ROUNDS[round].word, n = nextSlot(), want = [...word][slots.length - 1 - n];
    if (!t.m) return miss(btn, '이 활자로 찍으면 글자가 거꾸로 나와요! 뒤집힌 활자를 골라요.');
    if (t.c !== want) return miss(btn, `판에는 오른쪽부터 놓아요. 지금은 ‘${want}’ 차례예요.`);
    slots[n] = t; btn.disabled = true; P.chime(true);
    const slot = P.$(`.ts-slot[data-i="${n}"]`);
    slot.innerHTML = `<span class="ts-type pl-pop">${mirror(t.c)}</span>`;
    if (slots.every(Boolean)) { P.$('.press').disabled = false; P.$$('.ts-slot').forEach(s => s.classList.remove('next')); P.speak('판이 다 찼어요! 먹을 바르고 찍어 봐요.'); }
    else paint();
  }
  function miss(btn, msg) {
    errs++; P.chime(false);
    btn.classList.remove('pl-shake'); void btn.offsetWidth; btn.classList.add('pl-shake');
    P.sheet(`<h3>다시 생각해 볼까요?</h3><p>${msg}</p><button class="btn big ok">알았어요</button>`, 'bad');
    P.$('.sheet .ok').onclick = P.closeSheet;
    P.speak(msg);
  }

  function press() {
    const paper = P.$('.ts-paper');
    paper.classList.remove('blank'); paper.classList.add('ts-press');
    P.$('.press').disabled = true; P.chime(true);
    const last = round === ROUNDS.length - 1;
    P.speak(`짠! 종이에는 ${ROUNDS[round].word}, 바르게 찍혔어요!`, () => {
      P.sheet(`<h3>짠! 바르게 찍혔어요</h3><p>거꾸로 새긴 활자를 오른쪽부터 놓으니, 종이에는 ‘${ROUNDS[round].word}’가 바르게 나왔어요.</p>
        <button class="btn big nx">${last ? '결과 보기 ▶' : '다음 판 ▶'}</button>`, 'good');
      P.$('.sheet .nx').onclick = () => { round++; last ? done() : play(); };
    });
  }

  function done() {
    const stars = errs <= 1 ? 3 : errs <= 4 ? 2 : 1;
    P.finish(stars, stars === 3 ? '척척 조판 장인이에요!' : `실수 ${errs}번! 거꾸로 생각하기, 다시 도전해 볼까요?`, () => { round = 0; errs = 0; play(); });
  }
  return { start };
})();
