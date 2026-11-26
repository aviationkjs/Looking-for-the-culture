/* 양녕대군 · 토론 카드 (고학년) — 처음 생각 고르기 → 양쪽 근거 카드 모두 읽기 → 다시 고르기 → 반대쪽에서 가장 그럴듯한 근거 고르기
 * 정답이 없는 토론이라 끝까지 하면 별 3개. 생각이 바뀌어도, 그대로여도 모두 칭찬해요. */
window.Game = (() => {
  const D = {
    id: 'yangnyeong-debate',
    name: '토론 카드',
    theme: { main: '#3a5a8b' },
    think: '토론에서 내 생각과 다른 의견을 끝까지 듣는 것은 왜 중요할까요?',
    sources: [
      { title: '양녕대군 — 한국민족문화대백과사전', url: 'https://encykorea.aks.ac.kr/Article/E0054116' },
      { title: '세자 자리를 물려준 양녕대군 이야기 — 주간경향', url: 'https://weekly.khan.co.kr/article/202204291535111' },
      { title: '지덕사와 양녕대군 — 서울신문', url: 'https://m.seoul.co.kr/news/2022/05/16/20220516030014' }
    ]
  };
  const TOPICS = [
    { q: '임금 자리는 누가 이어야 할까요?',
      A: { t: '맏아들이 잇는다', c: '#3a5a8b', cards: [
        '누가 다음 임금인지 미리 정해져 있으면 형제끼리 자리를 두고 다투는 일을 줄일 수 있어요.',
        '세자는 어릴 때부터 임금이 될 공부를 오래 받을 수 있어요.',
        '‘가장 뛰어난 사람’을 누가, 어떻게 정할지를 두고 또 다툼이 생길 수 있어요.'] },
      B: { t: '가장 뛰어난 사람이 잇는다', c: '#b05a2a', cards: [
        '나라를 다스리는 일은 아주 어려워서 능력이 가장 중요해요.',
        '셋째 충녕은 세종대왕이 되어 훌륭한 정치를 펼쳤어요.',
        '규칙만 따르면 준비가 안 된 사람이 임금이 될 수도 있어요.'] },
      fact: '양녕대군은 1404년 열한 살에 세자가 되었다가 1418년 물러났어요. 새 세자 충녕대군은 두 달 뒤 임금, 세종대왕이 되었어요.' },
    { q: '양녕대군은 동생에게 일부러 양보했을까요?',
      A: { t: '일부러 양보했다', c: '#2f5d50', cards: [
        '정조 임금은 양녕대군 사당에 ‘지극한 덕’이라는 뜻의 ‘지덕사’라는 이름을 붙였어요.',
        '동생에게 자리를 양보한 옛 중국의 태백 이야기와 닮았다고 보았어요.',
        '양보했다는 이야기가 오랫동안 사람들 사이에 전해져 왔어요.'] },
      B: { t: '양보한 것은 아니다', c: '#8a3a3a', cards: [
        '실록에는 행동이 바르지 못해 믿음을 잃었다고 적혀 있어요.',
        '일부러 양보했다는 확실한 기록은 없어요.',
        '훗날 사람들이 좋은 뜻으로 이야기를 덧붙였을 수도 있어요.'] },
      fact: '실록 같은 ‘기록’과 사람들 사이에 ‘전해 오는 이야기’는 달라요. 둘을 나눠 보는 것이 역사 탐구예요.' }
  ];
  const CSS = `
  .db-q{font-size:var(--fs-3);font-weight:900;text-align:center;margin:var(--sp-1) 0;line-height:1.35}
  .db-vote{display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-2)}
  .db-vote .btn{min-height:110px;flex-direction:column;font-size:var(--fs-1);white-space:normal;line-height:1.3;color:#fff;background:var(--c)}
  .db-vote .btn b{font-size:28px}
  .db-card{border-radius:var(--r-box);padding:var(--sp-3);min-height:180px;display:flex;flex-direction:column;gap:var(--sp-1);color:#fff;background:var(--c);
    box-shadow:var(--sh-med);animation:slideL var(--t-med) var(--ease)}
  .db-card small{font-weight:800;opacity:.9}
  .db-card p{margin:0;font-size:var(--fs-2);font-weight:700;line-height:1.45}
  .db-card.fact{background:var(--surface);color:var(--text);border:3px dashed var(--border)}
  .db-pick .btn{justify-content:flex-start;text-align:left;white-space:normal;line-height:1.35;padding:10px var(--sp-2);min-height:var(--tap)}`;

  let P, ti, first, deck, di;

  function start(opt) {
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    P = Play.init(Object.assign({}, D, opt));
    intro();
  }

  function intro() {
    P.screen(`<div class="card pl-card"><h2>🗣️ 토론 카드</h2><p>양녕대군 이야기로 생각을 나눠 봐요. 질문은 2개예요.</p></div>
      <div class="card pl-card"><h2>규칙</h2><p>① 처음 생각 고르기 ② 양쪽 근거 카드를 <b>모두</b> 읽기 ③ 다시 고르기 ④ 반대쪽 근거 중 가장 그럴듯한 것 고르기</p></div>
      <p class="pl-note">정답은 없어요. 생각이 바뀌어도, 그대로여도 다 좋아요!</p>
      <button class="btn ghost small src">📚 어른을 위한 참고 자료</button>`,
      '<button class="btn big go">토론 시작 ▶</button>', 'start');
    P.$('.go').onclick = () => { ti = 0; vote(true); };
    P.$('.src').onclick = P.sources;
  }

  const sides = T => `<div class="db-vote">${['A', 'B'].map(k => `<button class="btn" style="--c:${T[k].c}" data-s="${k}"><b>${k === 'A' ? '🅰' : '🅱'}</b>${T[k].t}</button>`).join('')}</div>`;

  function vote(isFirst) {
    const T = TOPICS[ti];
    P.screen(`<p class="pl-note">질문 ${ti + 1} / ${TOPICS.length} · ${isFirst ? '처음 생각' : '카드를 다 읽은 뒤'}</p>
      <p class="db-q">${T.q}</p>${sides(T)}
      <p class="pl-note">${isFirst ? '지금 떠오르는 생각을 골라요.' : `처음에는 <b>${T[first].t}</b>을(를) 골랐어요. 지금은요?`}</p>`, '', 'db');
    P.speak(T.q);
    P.$$('.db-vote .btn').forEach(b => { b.onclick = () => {
      if (isFirst) { first = b.dataset.s; read(); } else after(b.dataset.s);
    }; });
  }

  // 사실 카드 1장 + 양쪽 카드를 번갈아 (A1 B1 A2 B2 A3 B3)
  function read() {
    const T = TOPICS[ti];
    deck = [{ fact: true, p: T.fact }];
    T.A.cards.forEach((p, i) => { deck.push({ s: 'A', p }); deck.push({ s: 'B', p: T.B.cards[i] }); });
    di = 0; card();
  }
  function card() {
    const T = TOPICS[ti], C = deck[di], last = di === deck.length - 1;
    P.screen(`<div class="pl-prog"><span>근거 카드</span><span class="bar-prog"><i style="width:${(di + 1) / deck.length * 100}%"></i></span><b>${di + 1} / ${deck.length}</b></div>
      <p class="pl-note">${T.q}</p>
      ${C.fact ? `<div class="db-card fact"><small>📜 먼저 알아 둘 사실</small><p>${C.p}</p></div>`
        : `<div class="db-card" style="--c:${T[C.s].c}"><small>${C.s === 'A' ? '🅰' : '🅱'} ${T[C.s].t} 쪽 근거</small><p>${C.p}</p></div>`}`,
      `<button class="btn prev" ${di ? '' : 'disabled'}>◀</button><button class="btn big nx">${last ? '다시 생각하기 ▶' : '다음 카드 ▶'}</button>`, 'db');
    P.speak(C.p);
    P.$('.prev').onclick = () => { di--; card(); };
    P.$('.nx').onclick = () => { if (last) vote(false); else { di++; card(); } };
  }

  // 다시 고른 뒤: 반대쪽 근거 중 가장 그럴듯한 것 고르기
  function after(now) {
    const T = TOPICS[ti], other = now === 'A' ? 'B' : 'A';
    const changed = now !== first;
    P.screen(`<div class="card pl-card"><h2>${changed ? '🔄 생각이 바뀌었어요!' : '✅ 생각을 지켰어요!'}</h2>
        <p>${changed ? '새 근거를 듣고 생각을 바꾸는 것도 멋진 일이에요.' : '양쪽 근거를 다 읽고도 생각을 지켰다면, 그 까닭도 말할 수 있겠죠?'}</p></div>
      <p class="db-q" style="font-size:var(--fs-2)">반대쪽(${T[other].t}) 근거 중<br>가장 그럴듯한 것은?</p>
      <div class="pl-chips db-pick" style="flex-direction:column">${T[other].cards.map((p, i) => `<button class="btn" data-i="${i}">${p}</button>`).join('')}</div>`, '', 'db');
    P.chime(true);
    P.speak((changed ? '생각이 바뀌었어요! ' : '생각을 지켰어요! ') + '반대쪽 근거 중 가장 그럴듯한 것을 골라 봐요.');
    P.$$('.db-pick .btn').forEach(b => { b.onclick = () => {
      P.sheet(`<h3>좋은 토론자예요!</h3><p>반대 의견에서도 좋은 점을 찾았어요. 토론할 때 “그 말도 일리가 있어. 하지만…”처럼 말해 봐요.</p>
        <button class="btn big nx">${ti === TOPICS.length - 1 ? '결과 보기 ▶' : '다음 질문 ▶'}</button>`, 'good');
      P.$('.sheet .nx').onclick = () => { ti++; ti < TOPICS.length ? vote(true) : P.finish(3, '두 질문 모두 끝까지 생각했어요! 멋진 토론자예요!', () => { ti = 0; vote(true); }); };
    }; });
  }
  return { start };
})();
