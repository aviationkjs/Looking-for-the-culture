/* 율곡 · 과거시험 체험 — 준비물 챙기기 → 시권(답안지)에 답 쓰기 → 방(합격자 발표) 확인
 * 아홉 번 장원한 율곡처럼 장원급제에 도전해요. */
window.Game = (() => {
  const D = {
    id: 'yulgok-gwageo',
    name: '과거시험 체험',
    theme: { main: '#6a4c93' },
    think: '율곡은 아홉 번이나 장원을 했어요. 시험 성적 말고, 율곡이 공부를 오래 꾸준히 할 수 있었던 힘은 무엇이었을까요?',
    sources: [
      { title: '성균관대학교 위대한 성균인: 율곡 이이(13세 진사시, 아홉 번 장원) — 성균관대학교', url: 'https://www.skku.edu/skku/about/s620/sub06_02.do' },
      { title: '경쟁률 1만6000 대 1 조선시대 과거시험(시권=답안지) — 주간경향', url: 'https://weekly.khan.co.kr/article/202111221342361' },
      { title: '조선의 출셋길, 장원급제(홍패·어사화) — 서울신문', url: 'https://m.seoul.co.kr/news/2010/04/24/20100424019001' },
      { title: '과거 제도의 분과(문과·무과) — 더위키', url: 'https://thewiki.kr/w/무과' }
    ]
  };
  const ITEMS = [['🖌️', '붓', 1], ['⚫', '먹', 1], ['🪨', '벼루', 1], ['📜', '종이', 1], ['✏️', '연필', 0], ['🧽', '지우개', 0]];
  const QS = [
    { q: '과거는 무엇을 뽑는 시험일까요?', o: ['나랏일 할 사람', '운동선수', '가수', '물건 파는 상인'], a: 0, e: '과거는 나랏일을 할 관리를 뽑는 시험이에요.' },
    { q: '과거에서 1등을 부르는 말은?', o: ['방안', '장원', '진사', '선비'], a: 1, e: '1등은 ‘장원’이에요. 그래서 ‘장원급제’라고 해요.' },
    { q: '활쏘기·말타기 같은 무예 실력을 보는 시험은?', o: ['문과', '잡과', '무과', '소과'], a: 2, e: '무예는 ‘무과’, 글은 ‘문과’, 의술·통역 같은 기술은 ‘잡과’예요.' },
    { q: '율곡은 과거에서 장원을 몇 번 했을까요?', o: ['한 번', '세 번', '다섯 번', '아홉 번'], a: 3, e: '아홉 번이나 장원을 해서 ‘구도장원공’이라 불렸어요.' },
    { q: '과거 시험의 답안지를 부르는 말은?', o: ['시권', '홍패', '족보', '편지'], a: 0, e: '답안지는 ‘시권’이에요. 합격하면 ‘홍패’라는 합격증을 받았어요.' },
    { q: '합격한 사람이 임금에게 받아 머리에 꽂은 꽃은?', o: ['무궁화', '어사화', '연꽃', '매화'], a: 1, e: '합격자는 홍패와 함께 ‘어사화’를 받았어요.' }
  ];
  const CSS = `
  .gw-items{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--sp-1)}
  .gw-item{flex-direction:column;min-height:84px;font-size:var(--fs-1);gap:2px}
  .gw-item span{font-size:30px}
  .gw-item.on{background:var(--main);color:#fff}
  .gw-paper{background:#f6eedb;border-radius:var(--r-box);padding:var(--sp-3);box-shadow:var(--sh-med);border:2px solid #d8c69c;
    background-image:repeating-linear-gradient(90deg,transparent 0 46px,rgba(150,120,70,.18) 46px 47px)}
  .gw-paper .q{font-family:"Nanum Myeongjo","Batang",serif;font-weight:800;margin:0}
  .gw-paper small{color:#8a6a3a;font-weight:800}
  .gw-board{background:#fffdf5;border:4px solid #6a4a2a;border-radius:6px;padding:var(--sp-3);text-align:center;box-shadow:var(--sh-med)}
  .gw-board h2{margin:0;font:900 40px/1.1 "Nanum Myeongjo","Batang",serif;color:#6a4a2a}
  .gw-board p{margin:6px 0 0;font-size:var(--fs-2);font-weight:800}
  .gw-flower{font-size:64px;line-height:1;animation:bloom 1s var(--ease-pop) both}`;

  let P, chosen, prepErr, qi, score;

  function start(opt) {
    const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    P = Play.init(Object.assign({}, D, opt));
    intro();
  }

  function intro() {
    P.screen(`<div class="card pl-card"><h2>📜 과거 시험이 뭐예요?</h2>
        <p>나랏일을 할 사람을 뽑는 조선의 시험이에요. 글을 보는 <b>문과</b>, 무예를 보는 <b>무과</b>, 의술·통역 같은 기술을 보는 <b>잡과</b>가 있었어요.</p></div>
      <div class="card pl-card"><h2>🏆 율곡의 기록</h2><p>율곡은 열세 살에 진사시에 합격했고, 과거에서 아홉 번이나 장원을 했어요.</p></div>
      <p class="pl-note">① 준비물 챙기기 → ② 시권에 답 쓰기 → ③ 방 보기</p>
      <button class="btn ghost small src">📚 어른을 위한 참고 자료</button>`,
      '<button class="btn big go">시험장 들어가기 ▶</button>', 'start');
    P.$('.go').onclick = () => { prepErr = 0; prep(); };
    P.$('.src').onclick = P.sources;
    P.speak('과거는 나랏일을 할 사람을 뽑는 조선의 시험이에요. 율곡처럼 장원급제에 도전해 봐요!');
  }

  // ① 준비물: 문방사우 네 가지 고르기
  function prep() {
    chosen = new Set();
    P.screen(`<div class="card pl-card"><h2>① 준비물 챙기기</h2><p>조선의 시험장에 가져갈 것 <b>네 가지</b>를 골라요.</p></div>
      <div class="gw-items">${ITEMS.map(([ic, n], i) => `<button class="btn gw-item" data-i="${i}" aria-pressed="false"><span>${ic}</span>${n}</button>`).join('')}</div>
      <p class="pl-note">힌트: 인사동 필방 거리의 ‘글방의 네 친구’</p>`,
      '<button class="btn big ok">이대로 가요 ▶</button>', 'gw');
    P.$$('.gw-item').forEach(b => { b.onclick = () => {
      const i = +b.dataset.i; chosen.has(i) ? chosen.delete(i) : chosen.add(i);
      b.classList.toggle('on', chosen.has(i)); b.setAttribute('aria-pressed', chosen.has(i));
    }; });
    P.$('.ok').onclick = () => {
      const right = ITEMS.every(([, , ok], i) => !!ok === chosen.has(i));
      if (right) {
        P.chime(true);
        P.sheet('<h3>문방사우 완벽!</h3><p>붓·먹·벼루·종이, 글방의 네 친구를 모두 챙겼어요. 연필과 지우개는 조선에 없었어요.</p><button class="btn big nx">시험 보러 가기 ▶</button>', 'good');
        P.$('.sheet .nx').onclick = () => { qi = 0; score = 0; exam(); };
        P.speak('문방사우 완벽! 이제 시험을 봐요.');
      } else {
        prepErr++; P.chime(false);
        P.sheet('<h3>다시 골라 볼까요?</h3><p>조선 사람들은 먹을 벼루에 갈아 붓으로 종이에 썼어요. 그때 없던 물건은 빼요.</p><button class="btn big ok2">다시 고르기</button>', 'bad');
        P.$('.sheet .ok2').onclick = P.closeSheet;
      }
    };
  }

  // ② 시권에 답 쓰기 (한 번에 답 하나, 바꿀 수 없음)
  function exam() {
    const Q = QS[qi];
    P.screen(`<div class="pl-prog"><span>② 시권</span><span class="bar-prog"><i style="width:${qi / QS.length * 100}%"></i></span><b>${qi + 1} / ${QS.length}</b></div>
      <div class="gw-paper"><small>제 ${qi + 1} 문</small><p class="q">${Q.q}</p></div>
      <div class="opts">${Q.o.map((t, i) => `<button class="opt btn" data-k="${i}"><span class="k">${i + 1}</span>${t}</button>`).join('')}</div>`, '', 'quiz');
    P.speak(Q.q);
    P.$$('.opt').forEach(b => { b.onclick = () => {
      P.$$('.opt').forEach(x => { x.disabled = true; });
      const ok = +b.dataset.k === Q.a; if (ok) score++;
      b.classList.add(ok ? 'right' : 'miss');
      if (!ok) P.$(`.opt[data-k="${Q.a}"]`).classList.add('right');
      P.chime(ok);
      P.sheet(`<h3>${ok ? '맞았어요!' : '아쉬워요'}</h3><p>${Q.e}</p><button class="btn big nx">${qi === QS.length - 1 ? '방 보러 가기 ▶' : '다음 문제 ▶'}</button>`, ok ? 'good' : 'bad');
      P.$('.sheet .nx').onclick = () => { qi++; qi < QS.length ? exam() : board(); };
    }; });
  }

  // ③ 방: 합격자 발표
  function board() {
    const n = QS.length;
    const rank = score === n ? '장원급제' : score >= n - 2 ? '급제' : '다음 기회에';
    P.screen(`<div class="gw-board pl-pop"><h2>榜</h2><p>${rank === '다음 기회에' ? '이번에는 이름이 없어요…' : `내 이름이 붙었어요! <b style="color:var(--main)">${rank}</b>`}</p>
        <p style="font-size:var(--fs-1);color:var(--text-2)">${n}문제 중 ${score}개 정답</p></div>
      ${rank === '장원급제' ? '<div style="text-align:center"><div class="gw-flower">🏵️</div><p class="lead">임금님께 어사화를 받았어요!</p></div>' : ''}`,
      '<button class="btn big nx">결과 보기 ▶</button>', 'gw');
    P.chime(rank !== '다음 기회에');
    P.speak(rank === '장원급제' ? '축하해요! 장원급제예요!' : rank === '급제' ? '축하해요! 급제예요!' : '율곡도 꾸준히 공부했어요. 다시 도전해 봐요!');
    P.$('.nx').onclick = () => {
      const stars = score === n && prepErr === 0 ? 3 : score >= n - 2 ? 2 : 1;
      P.finish(stars, stars === 3 ? '장원급제! 율곡 못지않아요!' : '조금만 더! 다시 도전하면 장원도 할 수 있어요.', () => { prepErr = 0; prep(); });
    };
  }
  return { start };
})();
