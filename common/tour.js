/* 문화탐방 공통 엔진: 시작 화면 → 그림 해설 → 퀴즈 → 결과
 * 이야기 페이지에서  Tour.start(window.TOUR_DATA, { home: '../index.html', homeLabel: '◀ 장소이름' })  로 부릅니다.
 * home = 돌아갈 곳(작은 대문), homeLabel = 돌아가기 버튼 글자.
 * 같은 폴더 위의 stories.js(window.STORIES)가 있으면 '찾아볼 곳'과 '다음 이야기'를 거기서 읽습니다.
 * 이야기마다 바뀌는 내용은 모두 data.js 에 있고, 이 파일은 고칠 필요가 없습니다. */
(() => {
  'use strict';
  const KEY = 'lftc:';
  const store = {
    get(k) { try { return localStorage.getItem(KEY + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(KEY + k, v); } catch (e) { /* 저장 못 해도 계속 */ } }
  };
  const hasTTS = 'speechSynthesis' in window;
  let D, home, homeLabel, homeIcon, homeText, app, me = null, nextStory = null;
  let voice = store.get('voice') !== 'off';
  let run = 0;            // 화면이 바뀔 때마다 1씩 늘어남 → 지난 화면의 타이머·음성 콜백 무시
  let timer = null, sceneIdx = 0, paused = false, backTo = null, dir = 0;
  let qi = 0, score = 0, tries = 0, wrong = [];

  const $ = s => app.querySelector(s);
  const $$ = s => app.querySelectorAll(s);

  /* ---------- 공통 ---------- */
  function stopAll() {
    run++;
    clearTimeout(timer);
    if (hasTTS) speechSynthesis.cancel();
  }

  // 화면 틀: 위 막대(돌아가기·제목·읽기) + 본문 + 아래 고정 버튼(dock)
  function shell(inner, cls, dock) {
    stopAll();
    app.className = 'screen ' + cls;
    app.innerHTML =
      `<header class="top"><a class="btn small home" href="${home}" aria-label="${homeText}">${homeIcon}</a>` +
      `<span class="title">${D.name}</span>` +
      (hasTTS ? `<button class="btn small voice"></button>` : '<span></span>') +
      `</header><main>${inner}</main>` + (dock ? `<nav class="dock">${dock}</nav>` : '') +
      `<div class="scrim"></div><section class="sheet" role="dialog" aria-live="polite"></section>`;
    const vb = $('.voice');
    if (vb) {
      const paint = () => { vb.textContent = (voice ? '🔊' : '🔇') + ' 읽기'; vb.classList.toggle('off', !voice); vb.setAttribute('aria-pressed', voice); vb.setAttribute('aria-label', voice ? '읽어 주기 켜짐' : '읽어 주기 꺼짐'); };
      paint();
      vb.onclick = () => {
        voice = !voice; store.set('voice', voice ? 'on' : 'off'); paint();
        if (app.classList.contains('story') && !paused) playScene(sceneIdx);
        else if (!voice) speechSynthesis.cancel();
      };
    }
    $('.scrim').onclick = closeSheet;
  }

  // 아래에서 올라오는 창
  function openSheet(html, cls, modal) {
    const sh = $('.sheet');
    sh.className = 'sheet ' + (cls || '');
    sh.innerHTML = html;
    requestAnimationFrame(() => { sh.classList.add('show'); if (modal) $('.scrim').classList.add('show'); });
    return sh;
  }
  function closeSheet() {
    const sh = $('.sheet'); if (sh) sh.classList.remove('show');
    const sc = $('.scrim'); if (sc) sc.classList.remove('show');
  }

  // 기기에 있는 한국어 음성 중 가장 자연스러운 목소리를 고름 (점수가 높은 순)
  //  - Natural/Neural/Online : Edge·윈도우의 자연스러운 음성 (예: Microsoft SunHi Online (Natural))
  //  - Enhanced/Premium/향상  : 아이폰·맥의 고품질 음성
  //  - Google                : 안드로이드·크롬의 Google 한국어 음성
  let koVoice = null;
  const VOICE_SCORE = [
    [/natural|neural/i, 50], [/online/i, 20], [/premium|enhanced|향상|고품질/i, 40],
    [/google/i, 30], [/samsung|삼성/i, 15], [/yuna|유나|sunhi|선희|injoon|인준/i, 10]
  ];
  function pickVoice() {
    if (!hasTTS) return;
    const ko = speechSynthesis.getVoices().filter(v => /^ko/i.test(v.lang));
    let best = null, bestScore = -1;
    ko.forEach(v => {
      let sc = VOICE_SCORE.reduce((a, [re, n]) => a + (re.test(v.name) ? n : 0), 0);
      if (!v.localService) sc += 5;          // 인터넷으로 받는 음성이 대체로 더 자연스러움
      if (sc > bestScore) { best = v; bestScore = sc; }
    });
    koVoice = best;
  }

  // 글을 소리 내어 읽고, 다 읽으면 done() 을 부름. 읽어 주기가 꺼져 있으면 바로 done()
  function speak(text, done) {
    const my = run;
    let finished = false;
    const end = () => { if (finished || my !== run) return; finished = true; done && done(); };
    if (!voice || !hasTTS) { end(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR'; u.rate = 0.92; u.pitch = 1.05;   // 아이에게 맞게 조금 천천히, 조금 밝게
    if (koVoice) u.voice = koVoice;
    u.onend = end; u.onerror = end;
    speechSynthesis.speak(u);
    // 일부 브라우저에서 onend 가 안 오는 경우 대비
    setTimeout(end, text.length * 320 + 4000);
  }

  // 효과음 (파일 없이 소리 만들기)
  let ac = null;
  function chime(ok) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const t = ac.currentTime;
      (ok ? [660, 880] : [330]).forEach((f, i) => {
        const o = ac.createOscillator(), g = ac.createGain(), s = t + i * 0.12;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, s);
        g.gain.exponentialRampToValueAtTime(0.2, s + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, s + 0.4);
        o.connect(g); g.connect(ac.destination);
        o.start(s); o.stop(s + 0.45);
      });
    } catch (e) { /* 소리 없이 계속 */ }
  }

  // 받침에 따라 '이에요/예요'
  function ieyo(word) {
    const c = word.charCodeAt(word.length - 1);
    if (c >= 0xac00 && c <= 0xd7a3 && (c - 0xac00) % 28) return word + '이에요';
    return word + '예요';
  }

  /* ---------- 시작 화면 ---------- */
  function startScreen() {
    const spot = me && /^찾아볼 곳/.test(me.sub || '') ? me.sub.replace(/^찾아볼 곳:\s*/, '') : '';
    shell(
      `<div class="art">${D.cover || ''}</div>
       <h1>${D.name}</h1>
       <div class="chips"><span class="badge">⏱ 약 ${Math.max(2, Math.round(D.scenes.reduce((a, x) => a + (x.sec || 20), 0) / 60))}분</span>${D.level ? `<span class="badge on">${D.level}</span>` : ''}<span class="badge">❓ 문제 ${D.questions.length}개</span>${spot ? `<span class="badge">📍 ${spot}</span>` : ''}</div>
       <p class="lead">${D.intro || ''}</p>
       ${(D.sources || []).length ? '<button class="btn ghost small src">📚 어른을 위한 참고 자료</button>' : ''}`,
      'start',
      `<button class="btn quizgo">바로 퀴즈</button><button class="btn big go">▶ 그림 해설 보기</button>`);
    $('.go').onclick = () => story(0);
    $('.quizgo').onclick = quiz;
    const sb = $('.src');
    if (sb) sb.onclick = () => {
      const li = D.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('');
      openSheet(`<h3>참고 자료</h3><ul>${li}</ul><button class="btn close">닫기</button>`, '', true);
      $('.sheet .close').onclick = closeSheet;
    };
  }

  /* ---------- 그림 해설 ---------- */
  // back 을 주면 그 장면 하나만 보여 주고 back() 으로 돌아감 (결과 화면의 '장면 다시 보기')
  function story(i, back) {
    shell(
      `<div class="segs">${D.scenes.map(() => '<span><i></i></span>').join('')}</div>
       <div class="stage"><div class="art" role="img"></div></div>
       <div class="card cap" aria-live="polite"></div>
       <p class="hint">그림을 옆으로 밀면 넘어가요</p>`,
      'story',
      `<button class="btn prev" aria-label="이전 장면">◀</button><button class="btn pause">⏸ 멈춤</button><button class="btn next" aria-label="다음 장면">▶</button>`);
    backTo = back || null;
    paused = false;
    $('.dock').classList.add('ctrl');
    $('.prev').onclick = () => go(sceneIdx - 1);
    $('.next').onclick = () => go(sceneIdx + 1);
    $('.pause').onclick = togglePause;
    swipe($('.stage'));
    playScene(i);
  }

  // 손가락으로 밀어 넘기기 (자동 넘김과 함께 동작)
  function swipe(el) {
    let x0 = null, y0 = 0;
    el.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; });
    el.addEventListener('pointerup', e => {
      if (x0 === null) return;
      const dx = e.clientX - x0, dy = e.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(sceneIdx + (dx < 0 ? 1 : -1));
    });
    el.addEventListener('pointercancel', () => { x0 = null; });
  }

  function playScene(i) {
    stopAll();
    const my = run;
    const s = D.scenes[i];
    const stage = $('.stage');
    stage.classList.remove('slide-l', 'slide-r');
    if (dir) { void stage.offsetWidth; stage.classList.add(dir > 0 ? 'slide-l' : 'slide-r'); }
    dir = 0;
    sceneIdx = i;
    $('.art').innerHTML = s.art;
    $('.art').setAttribute('aria-label', s.title);
    $('.cap').innerHTML = `<h2>${i + 1} / ${D.scenes.length} · ${s.title}</h2>` +
      s.lines.map((l, k) => `<p style="animation-delay:${0.6 + k * 1.2}s">${l}</p>`).join('');
    // 진행 막대: 읽어 주기 시간(대략) 또는 장면 시간만큼 채워짐
    const text = s.lines.join(' ');
    const dur = (voice && hasTTS) ? text.length * 0.2 + 2.6 : (s.sec || 20);
    $$('.segs span').forEach((sp, k) => {
      sp.className = k < i ? 'done' : k === i ? 'now' : '';
      sp.style.setProperty('--dur', dur + 's');
    });
    const next = () => { if (my === run && !paused) timer = setTimeout(() => { dir = 1; go(i + 1); }, 1500); };
    if (voice && hasTTS) timer = setTimeout(() => speak(text, next), 800);
    else timer = setTimeout(() => { dir = 1; go(i + 1); }, (s.sec || 20) * 1000);
  }

  function go(n) {
    if (n < 0) n = 0;
    if (backTo) { const b = backTo; backTo = null; b(); return; }
    if (n >= D.scenes.length) { bridge(); return; }
    if (!dir) dir = n >= sceneIdx ? 1 : -1;
    paused = false;
    app.classList.remove('paused');
    $('.pause').textContent = '⏸ 멈춤';
    playScene(n);
  }

  function togglePause() {
    paused = !paused;
    app.classList.toggle('paused', paused);
    $('.pause').textContent = paused ? '▶ 계속' : '⏸ 멈춤';
    if (paused) stopAll(); else playScene(sceneIdx);
  }

  function bridge() {
    shell(
      `<div class="stars"><span class="on">★</span></div>
       <h1 style="text-align:center">그림 해설 끝!</h1>
       <p class="lead" style="text-align:center">이제 퀴즈를 풀어 볼까요?</p>
       ${D.think ? `<div class="card think"><b>🤔 생각해 볼까요?</b><p>${D.think}</p></div>` : ''}`,
      'result',
      `<button class="btn big qz">퀴즈 풀기 ▶</button><button class="btn again">해설 다시 보기</button>`);
    $('.qz').onclick = quiz;
    $('.again').onclick = () => story(0);
    speak('그림 해설 끝! ' + (D.think ? '생각해 볼까요? ' + D.think + ' ' : '') + '이제 퀴즈를 풀어 볼까요?');
  }

  /* ---------- 퀴즈 ---------- */
  function quiz() { qi = 0; score = 0; wrong = []; showQ(); }

  function showQ() {
    const q = D.questions[qi], n = D.questions.length;
    const ox = q.options.length === 2 && q.options[0] === 'O';
    tries = 0;
    shell(
      `<div class="qhead"><div class="bar-prog"><i style="width:${(qi / n) * 100}%"></i></div><b>${qi + 1} / ${n}</b></div>
       <h2 class="q">${q.text}</h2>
       <div class="opts${ox ? ' ox' : ''}">${q.options.map((o, k) => `<button class="opt" data-k="${k}">${ox ? o : `<span class="k">${k + 1}</span>${o}`}</button>`).join('')}</div>`,
      'quiz');
    $$('.opt').forEach(b => { b.onclick = () => pick(+b.dataset.k, b); });
    speak(q.text + (ox ? ' 맞으면 오, 틀리면 엑스.' : ' ' + q.options.join(', ')));
  }

  function pick(k, b) {
    const q = D.questions[qi];
    tries++;
    const last = qi === D.questions.length - 1;
    const nextBtn = `<button class="btn big nextq">${last ? '결과 보기 ▶' : '다음 문제 ▶'}</button>`;
    if (k === q.answer) {
      if (tries === 1) score++; else wrong.push(qi);
      b.classList.add('right');
      done(`<h3>딩동댕! 맞았어요 🎉</h3><p>${q.explanation}</p>${nextBtn}`, 'good');
      chime(true);
      speak('맞았어요. ' + q.explanation);
    } else if (tries === 1) {
      b.classList.add('miss'); b.disabled = true;
      openSheet('<h3>음… 다시 생각해 볼까요? 🤔</h3><p>한 번 더 골라 보세요.</p>', 'bad');
      const my = run;
      setTimeout(() => { if (my === run && tries === 1) closeSheet(); }, 1800);
      chime(false);
      speak('다시 생각해 볼까요?');
    } else {
      wrong.push(qi);
      b.classList.add('miss');
      $$('.opt')[q.answer].classList.add('right');
      done(`<h3>정답은 ${ieyo(q.options[q.answer])}</h3><p>${q.explanation}</p>${nextBtn}`, '');
      speak('정답은 ' + ieyo(q.options[q.answer]) + '. ' + q.explanation);
    }
  }

  function done(html, cls) {
    $$('.opt').forEach(x => { x.disabled = true; });
    const sh = openSheet(html, cls);
    const nb = sh.querySelector('.nextq');
    nb.onclick = () => { qi++; qi < D.questions.length ? showQ() : result(); };
    setTimeout(() => nb.focus(), 350);
  }

  /* ---------- 결과 ---------- */
  function result() {
    const n = D.questions.length;
    const stars = score === n ? 3 : score >= n - 2 ? 2 : 1;
    const best = Math.max(stars, +store.get('stars:' + D.id) || 0);
    store.set('stars:' + D.id, best);
    const msg = stars === 3 ? '우와! 역사 탐험대장이에요!'
      : stars === 2 ? '잘했어요! 헷갈린 장면만 다시 볼까요?'
      : '그림을 한 번 더 보면 쉬워져요!';
    const scenes = [...new Set(wrong.map(i => D.questions[i].scene).filter(Boolean))];
    shell(
      `<div class="stars" aria-label="별 ${stars}개">${[0, 1, 2].map(k => `<span class="${k < stars ? 'on' : ''}" style="animation-delay:${.2 + k * .35}s">★</span>`).join('')}</div>
       <div class="score">${score}<small> / ${n}</small></div>
       <p class="lead">${msg}</p>
       ${scenes.length ? `<div class="list"><p>다시 보면 좋은 장면</p>${scenes.map(s => `<button class="btn scene" data-s="${s - 1}">🔁 ${D.scenes[s - 1].title}</button>`).join('')}</div>` : ''}`,
      'result',
      (nextStory ? `<a class="btn big next-story" href="../${nextStory.path}"><span>다음 이야기 ▶</span><small>${nextStory.name}</small></a>` : '') +
      `<button class="btn retry">🔁 다시 풀기</button><a class="btn${nextStory ? '' : ' big'}" href="${home}">${homeIcon} 목록</a>`);
    $$('.scene').forEach(b => { b.onclick = () => story(+b.dataset.s, result); });
    $('.retry').onclick = quiz;
    if (stars === 3) chime(true);
    speak(`${n}문제 중 ${score}개 맞았어요. ${msg}`);
  }

  /* ---------- 키보드 ---------- */
  document.addEventListener('keydown', e => {
    if (!app || !app.classList.contains('story')) return;
    if (e.key === 'ArrowRight') go(sceneIdx + 1);
    else if (e.key === 'ArrowLeft') go(sceneIdx - 1);
    else if (e.key === ' ') { e.preventDefault(); togglePause(); }
  });

  /* ---------- 시작 ---------- */
  window.Tour = {
    start(data, opt) {
      D = data;
      home = (opt && opt.home) || '../index.html';
      homeLabel = (opt && opt.homeLabel) || '🏠 대문';
      homeIcon = homeLabel.split(' ')[0];
      homeText = homeLabel.replace(/^\S+\s*/, '');
      app = document.getElementById('app');
      const list = window.STORIES || [];
      const idx = list.findIndex(s => s.id === D.id);
      me = idx >= 0 ? list[idx] : null;
      nextStory = idx >= 0 ? list.slice(idx + 1).find(s => s.ready) || null : null;
      document.documentElement.style.setProperty('--main', (D.theme && D.theme.main) || '#8b3a2b');
      document.title = D.name + ' · 문화탐방';
      if (hasTTS) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
      if (location.hash === '#quiz') quiz(); else startScreen();
    }
  };
})();
