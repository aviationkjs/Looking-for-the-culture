/* 문화탐방 인물 대화 — 역사 인물과 메신저처럼 이야기해요. (common/play.js 다음에 불러요)
 *   Chat.start(window.CHAT_DATA, { home:'../index.html', homeLabel:'◀ 장소' })
 * CHAT_DATA = { id, name, theme:{main}, who:{ name, icon, years, color, role },
 *   hello:[처음 인사 줄…], topics:[{ id, q:'질문 버튼 글', a:['대답 줄', …], after:'먼저 물어야 열리는 질문 id' }],
 *   bye:[마지막 인사 줄…], think, sources }
 * 대답은 기록·연구로 확인된 사실만 1인칭으로 바꿔 쓴 '꾸민 대화'예요. 화면에 그렇게 알려 줘요.
 * 별: 질문을 모두 물으면 ★3, 절반 이상 ★2, 그보다 적으면 ★1 */
window.Chat = (() => {
  const CSS = `
  .chat main{min-height:0;gap:var(--sp-1)}
  .chat.screen{height:100vh;height:100dvh;min-height:0}
  .ch-log{flex:1;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:4px 2px var(--sp-1);scroll-behavior:smooth}
  .ch-row{display:flex;gap:8px;align-items:flex-end;max-width:92%}
  .ch-row.me{align-self:flex-end;flex-direction:row-reverse}
  .ch-av{flex:0 0 36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:20px;background:var(--who);color:#fff}
  .ch-b{padding:10px 14px;border-radius:18px;font-size:var(--fs-1);line-height:1.45;background:var(--surface);box-shadow:var(--sh-low);
    border-bottom-left-radius:6px;animation:pop var(--t-med) var(--ease-pop) both}
  .me .ch-b{background:var(--main);color:#fff;border-bottom-left-radius:18px;border-bottom-right-radius:6px}
  .ch-row.cont .ch-av{visibility:hidden}
  .ch-typing .ch-b{letter-spacing:3px;color:var(--text-2)}
  .ch-ask{flex:0 0 auto;max-height:42%;overflow-y:auto}
  .ch-hero{padding:var(--sp-3);text-align:center}
  .ch-hero .ch-av{width:88px;height:88px;font-size:48px;margin:0 auto var(--sp-1)}
  .ch-hero h1{font-size:var(--fs-3)}
  .ch-hero p{margin:4px 0 0}`;

  function start(D, opt) {
    if (!document.getElementById('ch-css')) {
      const st = document.createElement('style'); st.id = 'ch-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    const P = Play.init(Object.assign({}, D, opt || {}));
    const W = D.who;
    document.body.style.setProperty('--who', W.color || D.theme.main);
    const total = D.topics.length;
    let asked = new Set(), busy = false, last = '';

    const av = `<span class="ch-av" aria-hidden="true">${W.icon}</span>`;
    const note = '<p class="pl-note">📜 기록과 연구를 바탕으로 꾸민 대화예요. 그분이 실제로 이렇게 말한 것은 아니에요.</p>';

    function intro() {
      P.screen(`<div class="card ch-hero">${av}<h1>${W.name}</h1><p class="lead">${W.years} · ${W.role}</p></div>
        <div class="card pl-card"><h2>💬 ${D.name}</h2><p>궁금한 질문 버튼을 눌러 ${W.name}에게 물어봐요. 질문을 모두 하면 별 3개!</p></div>
        ${note}${(D.sources || []).length ? '<button class="btn ghost small src">📚 어른을 위한 참고 자료</button>' : ''}`,
        '<button class="btn big go">대화 시작 ▶</button>', 'start');
      P.$('.go').onclick = chat;
      const sb = P.$('.src'); if (sb) sb.onclick = P.sources;
    }

    function chat() {
      asked = new Set(); busy = false; last = '';
      P.screen(`<div class="ch-log" role="log" aria-live="polite"></div>
        <div class="pl-prog"><span>물어본 질문</span><span class="bar-prog"><i style="width:0"></i></span><b class="cnt">0 / ${total}</b></div>
        <div class="ch-ask pl-chips"></div>`, '', 'chat');
      say(D.hello, chips);
    }

    const log = () => P.$('.ch-log');
    function bubble(who, text) {
      const row = document.createElement('div');
      row.className = 'ch-row ' + who + (who === 'him' && last === 'him' ? ' cont' : '');
      row.innerHTML = (who === 'him' ? av : '') + `<span class="ch-b">${text}</span>`;
      log().appendChild(row); last = who;
      log().scrollTop = log().scrollHeight;
      return row;
    }
    // 인물이 여러 줄을 차례로 말함 (점점점 → 한 줄 → 읽어 주기 → 다음 줄)
    function say(lines, done) {
      busy = true; paintChips();
      let i = 0;
      const next = () => {
        if (i >= lines.length) { busy = false; done && done(); return; }
        const prev = last, t = bubble('him', '···'); t.classList.add('ch-typing');
        setTimeout(() => {
          if (!t.isConnected) return;
          t.remove(); last = prev;
          bubble('him', lines[i]);
          P.speak(lines[i++].replace(/<[^>]+>/g, ''), next);
        }, 650);
      };
      next();
    }

    const open = () => D.topics.filter(t => !asked.has(t.id) && (!t.after || asked.has(t.after)));
    function paintChips() {
      const box = P.$('.ch-ask'); if (!box) return;
      const n = asked.size;
      P.$('.cnt').textContent = `${n} / ${total}`;
      P.$('.pl-prog i').style.width = (n / total * 100) + '%';
      if (busy) { box.querySelectorAll('.btn').forEach(b => { b.disabled = true; }); return; }
      const left = open();
      box.innerHTML = left.map(t => `<button class="btn" data-id="${t.id}">${t.q}</button>`).join('') +
        (!left.length ? '<button class="btn big end">대화 마치기 ★</button>'
          : n >= Math.ceil(total / 2) ? '<button class="btn ghost end">그만 묻고 마치기</button>' : '');
      box.querySelectorAll('[data-id]').forEach(b => { b.onclick = () => ask(b.dataset.id); });
      const e = box.querySelector('.end'); if (e) e.onclick = end;
    }
    function chips() { paintChips(); }

    function ask(id) {
      if (busy) return;
      const t = D.topics.find(x => x.id === id);
      asked.add(id);
      bubble('me', t.q);
      say(t.a, () => {
        if (asked.size === total) say(D.bye, chips); else chips();
      });
    }

    function end() {
      const n = asked.size;
      const stars = n === total ? 3 : n >= Math.ceil(total / 2) ? 2 : 1;
      P.finish(stars, stars === 3 ? `${W.name}에게 모두 물어봤어요! 대화 탐험대장!` : `${total}개 중 ${n}개를 물어봤어요. 남은 질문도 궁금하지 않나요?`, chat);
    }
    intro();
  }
  return { start };
})();
