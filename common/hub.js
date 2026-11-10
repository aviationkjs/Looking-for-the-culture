/* 문화탐방 카드 목록 — 대문(index.html)과 장소별 작은 대문(places/<장소>/index.html)이 함께 씁니다.
 * Hub.render(목록) : 목록의 각 항목을 카드로 그리고, 받은 별을 보여 줍니다.
 * 항목: { id, name, sub, icon, color, path, ready, stories? }
 *   stories 가 있으면(대문의 장소 카드) 그 이야기들의 별을 모두 더해 보여 줍니다. */
window.Hub = {
  render(list) {
    const box = document.getElementById('cards');
    const toast = document.getElementById('toast');
    const total = document.getElementById('total');
    const starsOf = id => { try { return +localStorage.getItem('lftc:stars:' + id) || 0; } catch (e) { return 0; } };
    let got = 0, max = 0, t;
    list.forEach(p => {
      const ids = p.stories || [p.id];
      const s = ids.reduce((a, id) => a + starsOf(id), 0);
      const m = ids.length * 3;
      if (p.ready) { got += s; max += m; }
      const card = document.createElement(p.ready ? 'a' : 'button');
      card.className = 'card' + (p.ready ? '' : ' soon');
      card.style.setProperty('--c', p.color);
      if (p.ready) card.href = p.path;
      let st;
      if (!p.ready) st = '<span class="st">준비 중</span>';
      else if (!s) st = `<span class="st new">${p.stories ? `이야기 ${ids.length}개` : '새로 열렸어요!'}</span>`;
      else if (p.stories) st = `<span class="st sum"><span style="color:var(--star)">★</span> ${s} / ${m}</span>`;
      else st = `<span class="st">${'★'.repeat(s)}<i>${'★'.repeat(3 - s)}</i></span>`;
      card.innerHTML = `<span class="ic">${p.icon}</span><b>${p.name}</b><small>${p.sub || ''}</small>${st}`;
      if (!p.ready) card.onclick = () => {
        toast.textContent = p.name + '은(는) 곧 열려요!'; toast.hidden = false;
        clearTimeout(t); t = setTimeout(() => { toast.hidden = true; }, 2000);
      };
      box.appendChild(card);
    });
    if (total) total.textContent = `모은 별 ★ ${got} / ${max}`;
  }
};
