/* 서대문형무소 탐험 지도 — 작은 대문 맨 위에 관람 순서대로 번호 핀을 그립니다.
 * stories.js 의 stop(번호)·x·y(핀 위치)를 읽어요. 다 푼 이야기 핀은 금색, 다음에 갈 곳은 반짝여요.
 * 아래 이야기 목록의 동그라미도 아이콘 대신 지도 번호로 바꿔 줍니다.
 * 실제 건물 배치를 쉽게 줄인 '그림 지도'예요. */
window.SdmMap = {
  render(list) {
    const box = document.getElementById('map');
    if (!box) return;
    const starsOf = id => { try { return +localStorage.getItem('lftc:stars:' + id) || 0; } catch (e) { return 0; } };
    const stops = list.filter(s => s.stop);
    const next = stops.find(s => !starsOf(s.id));
    const done = stops.filter(s => starsOf(s.id)).length;
    const T = (x, y, t, a) => `<text x="${x}" y="${y}" text-anchor="${a || 'middle'}" font-size="13" font-weight="800" fill="#5a4a40">${t}</text>`;

    const ground = `
      <rect width="400" height="300" rx="14" fill="#eef1e4"/>
      <rect x="0" y="238" width="400" height="62" fill="#d9e6c5"/>
      <rect x="40" y="18" width="300" height="214" rx="4" fill="#f4eee4" stroke="#a4473a" stroke-width="6"/>
      <rect x="184" y="226" width="28" height="12" fill="#d9e6c5"/>
      <rect x="189" y="218" width="18" height="22" fill="#7a4a3a"/>
      ${[-40, 0, 40].map(a => `<g transform="translate(197 152) rotate(${a})"><rect x="-9" y="-104" width="18" height="86" fill="#c46a55"/></g>`).join('')}
      <circle cx="197" cy="152" r="15" fill="#7a4a3a"/>
      <rect x="148" y="190" width="98" height="28" rx="3" fill="#b05a44"/>
      <rect x="262" y="104" width="54" height="28" rx="3" fill="#c89a6a"/>
      <rect x="272" y="38" width="36" height="26" rx="3" fill="#9aa88a"/>
      <rect x="62" y="32" width="34" height="34" fill="#8a7a6a" stroke="#5a4a40" stroke-width="3"/>
      <circle cx="122" cy="40" r="11" fill="#6f9a52"/><rect x="120" y="48" width="4" height="12" fill="#6a4a30"/>
      <path d="M62 150A38 38 0 0 1 138 150Z" fill="#e2d3bc" stroke="#a4473a" stroke-width="2"/>
      <rect x="76" y="172" width="48" height="26" rx="3" fill="#c46a8a"/>
      <g fill="#8a8a7a"><rect x="342" y="262" width="22" height="20"/><path d="M338 262H368L353 252Z"/></g>
      <rect x="352" y="270" width="2" height="12" fill="#d9e6c5"/>
      <path d="M86 284H98L94 250H90Z" fill="#8a8a7a"/>
      ${T(197, 36, '옥사')}${T(252, 209, '전시관', 'start')}${T(289, 145, '공작사')}${T(290, 78, '한센병사')}
      ${T(79, 82, '사형장')}${T(100, 146, '격벽장')}${T(100, 214, '여옥사')}${T(197, 254, '입구')}
      ${T(326, 296, '독립문', 'end')}${T(130, 290, '추념탑', 'start')}`;

    const pts = [[352, 262], [230, 252], [197, 238]].concat(stops.slice(1).map(s => [s.x, s.y]));
    pts.splice(pts.length - 1, 0, [150, 232], [120, 252]);
    const route = `<path d="M${pts.map(p => p.join(' ')).join('L')}" fill="none" stroke="#3a5a8b" stroke-width="3"
      stroke-dasharray="7 6" stroke-linejoin="round" opacity=".55"/>`;

    const pins = stops.map(s => {
      const ok = starsOf(s.id) > 0, now = next && next.id === s.id;
      return `<a href="${s.path}" aria-label="${s.stop}번 ${s.name}"><g transform="translate(${s.x} ${s.y})">
        ${now ? '<circle r="21" fill="#ffcf3f" class="a-glow"/>' : ''}
        <circle r="22" fill="transparent"/>
        <circle r="13" fill="${ok ? '#e9b400' : s.color}" stroke="#fff" stroke-width="3"/>
        <text y="5" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">${ok ? '✓' : s.stop}</text></g></a>`;
    }).join('');

    box.innerHTML = `<h2>🧭 탐험 지도</h2>
      <p class="map-lead">${next ? `다음은 <b style="color:${next.color}">${next.stop}번 ${next.name}</b>! 번호 순서대로 걸으며 이야기를 열어요.`
        : '모든 장소를 탐험했어요! 🎉'} <span class="map-cnt">${done} / ${stops.length}</span></p>
      <svg viewBox="0 0 400 300" role="img" aria-label="서대문형무소역사관 탐험 지도">${ground}${route}${pins}</svg>
      <p class="map-note">쉽게 그린 그림 지도예요. 현장 안내도와 함께 보세요.</p>`;

    // 목록 동그라미: 아이콘 → 지도 번호
    document.querySelectorAll('#cards .item').forEach((el, i) => {
      const s = list[i], n = el.querySelector('.num');
      if (!s || !n) return;
      if (s.stop == null) return;            // 지도 번호 없는 이야기(인물 대화 등)는 아이콘 그대로
      n.textContent = s.stop ? s.stop : '출발';
      n.style.cssText = `background:${s.color};color:#fff;font-weight:800;font-size:${s.stop ? 18 : 13}px`;
    });
  }
};
