/* 문화탐방 공통 엔진: 시작 화면 → 그림 해설 → 퀴즈 → 결과
 * 이야기 페이지에서  Tour.start(window.TOUR_DATA, { home: '../index.html', homeLabel: '◀ 장소이름' })  로 부릅니다.
 * home = 돌아갈 곳(작은 대문), homeLabel = 돌아가기 버튼 글자.
 * 장소마다 바뀌는 내용은 모두 data.js 에 있고, 이 파일은 고칠 필요가 없습니다. */
(() => {
  'use strict';
  const KEY = 'lftc:';
  const store = {
    get(k) { try { return localStorage.getItem(KEY + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(KEY + k, v); } catch (e) { /* 저장 못 해도 계속 */ } }
  };
  const hasTTS = 'speechSynthesis' in window;
  let D, home, homeLabel, homeIcon, homeText, app;
  let voice = store.get('voice') !== 'off';
  let run = 0;            // 화면이 바뀔 때마다 1씩 늘어남 → 지난 화면의 타이머·음성 콜백 무시
  let timer = null, sceneIdx = 0, paused = false, backTo = null;
  let qi = 0, score = 0, tries = 0, wrong = [];

  const $ = s => app.querySelector(s);
  const $$ = s => app.querySelectorAll(s);

  /* ---------- 공통 ---------- */
  function stopAll() {
    run++;
    clearTimeout(timer);
    if (hasTTS) speechSynthesis.cancel();
  }

  function shell(inner, cls) {
    stopAll();
    app.className = 'screen ' + cls;
    app.innerHTML =
      `<header class="bar"><a class="btn small home" href="${home}" aria-label="${homeText}">${homeIcon}<span class="lbl">${homeText}</span></a>` +
      `<span class="title">${D.name}</span>` +
      (hasTTS ? `<button class="btn small voice"></button>` : '') +
      `</header><main>${inner}</main>`;
    const vb = $('.voice');
    if (vb) {
      const paint = () => { vb.innerHTML = (voice ? '🔊' : '🔇') + ' 읽기'; vb.classList.toggle('off', !voice); vb.setAttribute('aria-pressed', voice); vb.setAttribute('aria-label', voice ? '읽어 주기 켜짐' : '읽어 주기 꺼짐'); };
      paint();
      vb.onclick = () => {
        voice = !voice; store.set('voice', voice ? 'on' : 'off'); paint();
        if (app.classList.contains('story') && !paused) playScene(sceneIdx);
        else if (!voice) speechSynthesis.cancel();
      };
    }
  }

  let koVoice = null;
  function pickVoice() {
    if (!hasTTS) return;
    koVoice = speechSynthesis.getVoices().find(v => /^ko/i.test(v.lang)) || null;
  }

  // 글을 소리 내어 읽고, 다 읽으면 done() 을 부름. 읽어 주기가 꺼져 있으면 바로 done()
  function speak(text, done) {
    const my = run;
    let finished = false;
    const end = () => { if (finished || my !== run) return; finished = true; done && done(); };
    if (!voice || !hasTTS) { end(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR'; u.rate = 0.9;
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
    const src = (D.sources || []).map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('');
    shell(
      `<div class="hero">${D.cover || ''}</div>
       <h1>${D.name}</h1>
       <p class="lead">${D.intro || ''}</p>
       <div class="row">
         <button class="btn big go">▶ 그림 해설 보기</button>
         <button class="btn quizgo">바로 퀴즈 풀기</button>
       </div>
       ${src ? `<details class="src"><summary>어른을 위한 참고 자료</summary><ul>${src}</ul></details>` : ''}`,
      'start');
    $('.go').onclick = () => story(0);
    $('.quizgo').onclick = quiz;
  }

  /* ---------- 그림 해설 ---------- */
  // back 을 주면 그 장면 하나만 보여 주고 back() 으로 돌아감 (결과 화면의 '장면 다시 보기')
  function story(i, back) {
    shell(
      `<div class="stage"><div class="art" role="img"></div><div class="cap" aria-live="polite"></div></div>
       <nav class="ctrl">
         <button class="btn prev" aria-label="이전 장면">◀</button>
         <button class="btn pause">⏸ 멈춤</button>
         <button class="btn next" aria-label="다음 장면">▶</button>
       </nav>
       <div class="dots">${D.scenes.map(() => '<i></i>').join('')}</div>`,
      'story');
    backTo = back || null;
    paused = false;
    $('.prev').onclick = () => go(sceneIdx - 1);
    $('.next').onclick = () => go(sceneIdx + 1);
    $('.pause').onclick = togglePause;
    playScene(i);
  }

  function playScene(i) {
    stopAll();
    const my = run;
    sceneIdx = i;
    const s = D.scenes[i];
    $('.art').innerHTML = s.art;
    $('.art').setAttribute('aria-label', s.title);
    $('.cap').innerHTML = `<h2>${s.title}</h2>` +
      s.lines.map((l, k) => `<p style="animation-delay:${0.8 + k * 1.4}s">${l}</p>`).join('');
    $$('.dots i').forEach((d, k) => { d.className = k < i ? 'done' : k === i ? 'now' : ''; });
    const next = () => { if (my === run && !paused) timer = setTimeout(() => go(i + 1), 1500); };
    if (voice && hasTTS) timer = setTimeout(() => speak(s.lines.join(' '), next), 800);
    else timer = setTimeout(() => go(i + 1), (s.sec || 20) * 1000);
  }

  function go(n) {
    if (n < 0) n = 0;
    if (backTo) { const b = backTo; backTo = null; b(); return; }
    if (n >= D.scenes.length) { bridge(); return; }
    paused = false;
    $('.stage').classList.remove('paused');
    $('.pause').textContent = '⏸ 멈춤';
    playScene(n);
  }

  function togglePause() {
    paused = !paused;
    $('.stage').classList.toggle('paused', paused);
    $('.pause').textContent = paused ? '▶ 계속' : '⏸ 멈춤';
    if (paused) stopAll(); else playScene(sceneIdx);
  }

  function bridge() {
    shell(
      `<div class="stars">★</div>
       <h1>그림 해설 끝!</h1>
       <p class="lead">이제 퀴즈를 풀어 볼까요?</p>
       <div class="row"><button class="btn big qz">퀴즈 풀기 ▶</button><button class="btn again">해설 다시 보기</button></div>`,
      'bridge');
    $('.qz').onclick = quiz;
    $('.again').onclick = () => story(0);
    speak('그림 해설 끝! 이제 퀴즈를 풀어 볼까요?');
  }

  /* ---------- 퀴즈 ---------- */
  function quiz() { qi = 0; score = 0; wrong = []; showQ(); }

  function showQ() {
    const q = D.questions[qi];
    const ox = q.options.length === 2 && q.options[0] === 'O';
    tries = 0;
    shell(
      `<p class="qnum">${qi + 1} / ${D.questions.length}</p>
       <h2 class="q">${q.text}</h2>
       <div class="opts${ox ? ' ox' : ''}">${q.options.map((o, k) => `<button class="btn opt" data-k="${k}">${o}</button>`).join('')}</div>
       <p class="fb" aria-live="polite"></p>
       <button class="btn big nextq" hidden>${qi === D.questions.length - 1 ? '결과 보기 ▶' : '다음 ▶'}</button>`,
      'quiz');
    $$('.opt').forEach(b => { b.onclick = () => pick(+b.dataset.k, b); });
    $('.nextq').onclick = () => { qi++; qi < D.questions.length ? showQ() : result(); };
    speak(q.text + (ox ? ' 맞으면 오, 틀리면 엑스.' : ' ' + q.options.join(', ')));
  }

  function pick(k, b) {
    const q = D.questions[qi], fb = $('.fb');
    tries++;
    if (k === q.answer) {
      if (tries === 1) score++; else wrong.push(qi);
      b.classList.add('right');
      fb.innerHTML = `<b>딩동댕! 맞았어요.</b> ${q.explanation}`;
      chime(true); reveal();
      speak('맞았어요. ' + q.explanation);
    } else if (tries === 1) {
      b.classList.add('miss'); b.disabled = true;
      fb.textContent = '음… 다시 생각해 볼까요?';
      chime(false);
      speak('다시 생각해 볼까요?');
    } else {
      wrong.push(qi);
      b.classList.add('miss');
      $$('.opt')[q.answer].classList.add('right');
      fb.innerHTML = `정답은 <b>${ieyo(q.options[q.answer])}</b>. ${q.explanation}`;
      reveal();
      speak('정답은 ' + ieyo(q.options[q.answer]) + '. ' + q.explanation);
    }
  }

  function reveal() {
    $$('.opt').forEach(x => { x.disabled = true; });
    const n = $('.nextq'); n.hidden = false; n.focus();
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
      `<div class="stars" aria-label="별 ${stars}개">${'★'.repeat(stars)}<span>${'★'.repeat(3 - stars)}</span></div>
       <h1>${n}문제 중 ${score}개 맞았어요</h1>
       <p class="lead">${msg}</p>
       ${scenes.length ? `<div class="review"><p>다시 보면 좋은 장면</p>${scenes.map(s => `<button class="btn scene" data-s="${s - 1}">${D.scenes[s - 1].title}</button>`).join('')}</div>` : ''}
       <div class="row"><button class="btn retry">다시 풀기</button><a class="btn big" href="${home}">${homeLabel}</a></div>`,
      'result');
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
      homeIcon = homeLabel.split(" ")[0];
      homeText = homeLabel.replace(/^\S+\s*/, "");
      app = document.getElementById('app');
      document.documentElement.style.setProperty('--main', (D.theme && D.theme.main) || '#8b3a2b');
      document.title = D.name + ' · 문화탐방';
      if (hasTTS) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
      if (location.hash === '#quiz') quiz(); else startScreen();
    }
  };
})();
