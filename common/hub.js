/* 문화탐방 카드 목록 — 대문(index.html)과 장소별 작은 대문(places/<장소>/index.html)이 함께 씁니다.
 * Hub.render(목록, { layout: 'grid' | 'list', what: '장소' | '이야기' })
 *   grid : 대문 — 2열 장소 카드 (상태 배지 + 이야기 진행 막대)
 *   list : 작은 대문 — 세로 이야기 목록 (번호 + 찾아볼 곳 + 별)
 * 항목: { id, name, sub, icon, color, path, ready, stories? }
 *   stories 가 있으면(대문의 장소 카드) 그 이야기들의 별을 모두 더해 보여 줍니다.
 * 화면 맨 위 #mine 상자에는 '나의 탐방' 요약(별 진행 원)을 그립니다. */
window.Hub = {
  render(list, opt) {
    opt = opt || {};
    const layout = opt.layout || 'grid';
    const box = document.getElementById('cards');
    const mine = document.getElementById('mine');
    const toast = document.getElementById('toast');
    const starsOf = id => { try { return +localStorage.getItem('lftc:stars:' + id) || 0; } catch (e) { return 0; } };
    const esc = s => String(s == null ? '' : s);
    let got = 0, max = 0, doneCount = 0, readyCount = 0, t;

    list.forEach((p, i) => {
      const ids = p.stories || [p.id];
      const each = ids.map(starsOf);
      const s = each.reduce((a, b) => a + b, 0), m = ids.length * 3;
      const played = each.filter(x => x > 0).length;
      if (p.ready) { got += s; max += m; readyCount++; if (played === ids.length) doneCount++; }

      const el = document.createElement(p.ready ? 'a' : 'button');
      el.style.setProperty('--c', p.color);
      if (p.ready) el.href = p.path;

      if (layout === 'list') {
        el.className = 'item' + (p.ready ? '' : ' soon');
        const starTxt = !p.ready ? '<span class="badge">준비 중</span>'
          : s ? `${'★'.repeat(s)}<i>${'★'.repeat(3 - s)}</i>` : '<i>★★★</i>';
        const tag = (i === 0 && !s && p.ready ? '<span class="badge on">여기부터</span>' : '') + (p.level ? `<span class="badge">${p.level}</span>` : '');
        el.innerHTML = `<span class="num">${p.icon}</span><span class="tx"><b>${esc(p.name)}</b><small>${esc(p.sub)}</small>${tag}</span><span class="st">${starTxt}</span>`;
      } else {
        el.className = 'pcard' + (p.ready ? '' : ' soon');
        const badge = !p.ready ? '<span class="badge">준비 중</span>'
          : played === 0 ? '<span class="badge on" style="background:var(--c)">새로 열림</span>'
          : played === ids.length ? '<span class="badge done">✓ 완료</span>'
          : '<span class="badge">탐방 중</span>';
        el.innerHTML = `<span class="ic">${p.icon}</span><b>${esc(p.name)}</b><small>${esc(p.sub)} · 이야기 ${ids.length}개${p.level ? ' · ' + p.level : ''}</small>
          <span class="bar-prog"><i style="width:${(played / ids.length) * 100}%"></i></span>${badge}`;
      }
      if (!p.ready) el.onclick = () => {
        toast.textContent = p.name + '은(는) 곧 열려요!'; toast.hidden = false;
        clearTimeout(t); t = setTimeout(() => { toast.hidden = true; }, 2000);
      };
      box.appendChild(el);
    });

    if (mine) {
      const r = 30, c = 2 * Math.PI * r, f = max ? got / max : 0;
      const what = opt.what || (layout === 'list' ? '이야기' : '장소');
      mine.innerHTML = `<div class="ring"><svg width="76" height="76" viewBox="0 0 76 76" aria-hidden="true">
          <circle cx="38" cy="38" r="${r}" fill="none" stroke="var(--border)" stroke-width="9"/>
          <circle cx="38" cy="38" r="${r}" fill="none" stroke="var(--star)" stroke-width="9" stroke-linecap="round"
            stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - f)}" style="transition:stroke-dashoffset .7s cubic-bezier(.3,1.2,.5,1)"/></svg>
        <b>★</b></div>
        <div><h2>나의 탐방</h2><p>모은 별 <b style="color:var(--star-text)">${got}</b> / ${max}</p>
        <p>${layout === 'list' ? `다 푼 ${what} ` : `다 둘러본 ${what} `}<b>${layout === 'list' ? list.filter(p => p.ready && starsOf(p.id) > 0).length : doneCount}</b> / ${readyCount}</p></div>`;
    }
  }
};
