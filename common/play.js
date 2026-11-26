/* 문화탐방 체험 틀 — 그림 해설·퀴즈가 아닌 '체험' 이야기(활자 조판, 과거시험, 토론 카드, 인물 대화)가 함께 씁니다.
 * 기본 엔진(tour.js)과 따로 있어서, 체험 페이지에서만 내려받습니다. (README 「11. 용량 원칙」)
 *   const P = Play.init({ id, name, theme:{main}, home:'../index.html', homeLabel:'◀ 장소' });
 *   P.screen(본문HTML, 아래버튼HTML, 'cls')  → 화면 그리기 (위 막대: 돌아가기 · 제목 · 🔊읽기)
 *   P.speak(글, 끝나면)  P.chime(맞음?)  P.sheet(HTML) / P.closeSheet()
 *   P.finish(별 1~3, 한마디, 다시하기함수)  → 가장 좋은 별 저장 + 결과 화면 + 다음 이야기 */
window.Play = (() => {
  const KEY = 'lftc:';
  const store = {
    get(k) { try { return localStorage.getItem(KEY + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(KEY + k, v); } catch (e) { /* 저장 못 해도 계속 */ } }
  };
  const hasTTS = 'speechSynthesis' in window;
  let voice = store.get('voice') !== 'off', koVoice = null, ac = null;

  // 체험 화면에서만 쓰는 모양 (tour.css 의 변수를 그대로 씀)
  const CSS = `
  .pl-card{padding:var(--sp-2) var(--sp-3)}
  .pl-card h2{margin:0 0 4px;font-size:var(--fs-2);color:var(--main)}
  .pl-card p{margin:0;font-size:var(--fs-1)}
  .pl-note{font-size:13px;color:var(--text-2);margin:0;text-align:center}
  .pl-chips{display:flex;flex-wrap:wrap;gap:var(--sp-1)}
  .pl-chips .btn{flex:1 1 auto;min-height:var(--tap-s);font-size:var(--fs-1);white-space:normal;line-height:1.3;padding:6px var(--sp-2)}
  .pl-chips .btn.done{opacity:.45}
  .pl-shake{animation:shake var(--t-med) var(--ease)}
  .pl-pop{animation:pop var(--t-med) var(--ease-pop) both}
  .pl-fade{animation:fade var(--t-med) var(--ease) both}
  .pl-prog{display:flex;align-items:center;gap:var(--sp-2);font-size:14px;color:var(--text-2);font-weight:700}
  .pl-prog .bar-prog{flex:1}`;
  if (!document.getElementById('pl-css')) {
    const st = document.createElement('style'); st.id = 'pl-css'; st.textContent = CSS; document.head.appendChild(st);
  }

  function pickVoice() {
    if (!hasTTS) return;
    const score = v => [[/natural|neural/i, 50], [/premium|enhanced|향상|고품질/i, 40], [/google/i, 30], [/online/i, 20], [/samsung|삼성/i, 15]]
      .reduce((a, [re, n]) => a + (re.test(v.name) ? n : 0), v.localService ? 0 : 5);
    koVoice = speechSynthesis.getVoices().filter(v => /^ko/i.test(v.lang)).sort((a, b) => score(b) - score(a))[0] || null;
  }
  if (hasTTS) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

  function init(D) {
    const app = document.getElementById('app');
    const home = D.home || '../index.html', homeLabel = D.homeLabel || '🏠 대문';
    const homeIcon = homeLabel.split(' ')[0], homeText = homeLabel.replace(/^\S+\s*/, '');
    if (D.theme && D.theme.main) document.body.style.setProperty('--main', D.theme.main);
    const list = window.STORIES || [];
    const idx = list.findIndex(s => s.id === D.id);
    const nextStory = idx >= 0 ? list.slice(idx + 1).find(s => s.ready) : null;
    let run = 0;

    const P = {
      app, D,
      $: s => app.querySelector(s),
      $$: s => app.querySelectorAll(s),
      screen(inner, dock, cls) {
        run++; if (hasTTS) speechSynthesis.cancel();
        app.className = 'screen ' + (cls || '');
        app.innerHTML = `<header class="top"><a class="btn small home" href="${home}" aria-label="${homeText}">${homeIcon}</a>` +
          `<span class="title">${D.name}</span>` + (hasTTS ? '<button class="btn small voice"></button>' : '<span></span>') +
          `</header><main>${inner}</main>` + (dock ? `<nav class="dock">${dock}</nav>` : '') +
          '<div class="scrim"></div><section class="sheet" role="dialog" aria-live="polite"></section>';
        const vb = P.$('.voice');
        if (vb) {
          const paint = () => { vb.textContent = (voice ? '🔊' : '🔇') + ' 읽기'; vb.classList.toggle('off', !voice); vb.setAttribute('aria-pressed', voice); };
          paint();
          vb.onclick = () => { voice = !voice; store.set('voice', voice ? 'on' : 'off'); paint(); if (!voice) speechSynthesis.cancel(); };
        }
        P.$('.scrim').onclick = P.closeSheet;
      },
      speak(text, done) {
        const my = run; let fin = false;
        const end = () => { if (fin || my !== run) return; fin = true; done && done(); };
        if (!voice || !hasTTS) { setTimeout(end, Math.min(2200, 500 + text.length * 45)); return; }
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'ko-KR'; u.rate = 0.92; u.pitch = 1.05; if (koVoice) u.voice = koVoice;
        u.onend = end; u.onerror = end; speechSynthesis.speak(u);
        setTimeout(end, text.length * 320 + 4000);
      },
      chime(ok) {
        try {
          ac = ac || new (window.AudioContext || window.webkitAudioContext)();
          const t = ac.currentTime;
          (ok ? [660, 880] : [330]).forEach((f, i) => {
            const o = ac.createOscillator(), g = ac.createGain(), s = t + i * 0.12;
            o.frequency.value = f; g.gain.setValueAtTime(0.0001, s);
            g.gain.exponentialRampToValueAtTime(0.2, s + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.4);
            o.connect(g); g.connect(ac.destination); o.start(s); o.stop(s + 0.45);
          });
        } catch (e) { /* 소리 못 내도 계속 */ }
      },
      sheet(html, cls) {
        const sh = P.$('.sheet'); sh.className = 'sheet ' + (cls || ''); sh.innerHTML = html;
        requestAnimationFrame(() => { sh.classList.add('show'); P.$('.scrim').classList.add('show'); });
        return sh;
      },
      closeSheet() { const sh = P.$('.sheet'); if (sh) sh.classList.remove('show'); const sc = P.$('.scrim'); if (sc) sc.classList.remove('show'); },
      sources() {
        const li = (D.sources || []).map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join('');
        P.sheet(`<h3>참고 자료</h3><ul>${li}</ul><button class="btn close">닫기</button>`);
        P.$('.sheet .close').onclick = P.closeSheet;
      },
      finish(stars, msg, retry) {
        const best = Math.max(stars, +store.get('stars:' + D.id) || 0);
        store.set('stars:' + D.id, best);
        P.screen(`<div class="stars" aria-label="별 ${stars}개">${[0, 1, 2].map(k => `<span class="${k < stars ? 'on' : ''}" style="animation-delay:${.2 + k * .35}s">★</span>`).join('')}</div>
          <p class="lead" style="font-size:var(--fs-2);font-weight:700">${msg}</p>
          ${D.think ? `<div class="card think"><b>🤔 생각해 볼까요?</b><p>${D.think}</p></div>` : ''}`,
          (nextStory ? `<a class="btn big next-story" href="../${nextStory.path}"><span>다음 이야기 ▶</span><small>${nextStory.name}</small></a>` : '') +
          `<button class="btn retry">🔁 다시 하기</button><a class="btn${nextStory ? '' : ' big'}" href="${home}">${homeIcon} 목록</a>`, 'result');
        P.$('.retry').onclick = retry;
        if (stars === 3) P.chime(true);
        P.speak(msg + (D.think ? ' 생각해 볼까요? ' + D.think : ''));
      }
    };
    return P;
  }
  return { init, store };
})();
