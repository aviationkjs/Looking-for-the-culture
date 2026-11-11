/* 파주 율곡 이이 유적 · 자운서원과 가족 묘 — 장면 글, 그림, 퀴즈 */
(() => {
  const { person, text, svg } = window.ART;
  const GREEN = '#4a7a4a';

  // 한옥 한 채 (가운데 x, 아래 y, 폭, 이름, 지연)
  const house = (x, y, w, name, d) => `<g class="a-drop" style="--d:${d}s">
    <rect x="${x - w / 2}" y="${y - 44}" width="${w}" height="44" fill="#f3e6cf" stroke="#8a6a4a"/>
    <path d="M${x - w / 2 - 12} ${y - 40} Q${x} ${y - 68} ${x + w / 2 + 12} ${y - 40} L${x + w / 2} ${y - 52} Q${x} ${y - 76} ${x - w / 2} ${y - 52}Z" fill="#3e3e3e"/>
    ${name ? `<text x="${x}" y="${y - 16}" text-anchor="middle" font-size="13" font-weight="800" fill="#5a3b2e">${name}</text>` : ''}</g>`;
  // 큰 느티나무
  const bigTree = (x, y, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 8}" y="${y - 70}" width="16" height="70" fill="#6b4a3a"/>
    <circle cx="${x}" cy="${y - 88}" r="40" fill="#4f8a3f"/><circle cx="${x - 30}" cy="${y - 70}" r="26" fill="#5f9a4a"/><circle cx="${x + 30}" cy="${y - 72}" r="26" fill="#5f9a4a"/></g>`;

  // 1. 서원은 옛날 학교
  const S1 = svg('', `<rect width="400" height="240" fill="#eef5ea"/><rect y="196" width="400" height="44" fill="#d9cdb6"/>
    ${house(200, 196, 160, '자운서원', .3)}
    ${[110, 150, 250, 290].map((x, i) => person(x, 224, '#5a4a7a', false, 1 + i * .2)).join('')}
    ${text(200, 40, '서원 = 옛날 학교', 26, GREEN, 'a-pop', 2)}`);

  // 2. 1615년, 율곡을 기리며
  const S2 = svg('', `<rect width="400" height="240" fill="#f4efe6"/><rect y="196" width="400" height="44" fill="#d9cdb6"/>
    <rect class="a-drop" style="--d:.3s" x="80" y="136" width="60" height="60" fill="#c9a87a"/>
    <rect class="a-drop" style="--d:.6s" x="80" y="100" width="60" height="36" fill="#d9b88a"/>
    ${house(260, 196, 120, '', 1)}
    ${[60, 160].map((x, i) => person(x, 222, '#6b4a3a', true, 1.4 + i * .2)).join('')}
    ${text(200, 44, '1615년에 세웠어요', 26, GREEN, 'a-pop', 2)}`);

  // 3. 공부방과 기숙사, 500살 느티나무
  const S3 = svg('', `<rect width="400" height="240" fill="#eef5ea"/><rect y="200" width="400" height="40" fill="#d9cdb6"/>
    ${house(70, 200, 90, '동재', .3)}${house(200, 170, 110, '강인당', .6)}${house(330, 200, 90, '서재', .9)}
    ${bigTree(200, 238, 1.6)}
    ${text(70, 130, '기숙사', 14, GREEN, 'a-fade', 1.2)}${text(330, 130, '기숙사', 14, GREEN, 'a-fade', 1.2)}
    ${text(200, 34, '500살 느티나무', 22, GREEN, 'a-pop', 2.4)}`);

  // 4. 아들 묘가 부모 묘보다 위에
  const grave = (x, y, label, d) => `<g class="a-pop" style="--d:${d}s"><path d="M${x - 36} ${y} a36 26 0 0 1 72 0z" fill="#7fae5a" stroke="#5a8a3a"/>
    <rect x="${x - 6}" y="${y - 2}" width="12" height="20" fill="#bdb6a6"/>
    <text x="${x}" y="${y + 36}" text-anchor="middle" font-size="14" font-weight="800" fill="#3a2a1a">${label}</text></g>`;
  const S4 = svg('', `<rect width="400" height="240" fill="#eaf3f7"/>
    <path d="M0 240 L0 200 Q200 40 400 200 L400 240Z" fill="#b9d98c"/>
    ${grave(200, 92, '율곡 이이', 1.4)}${grave(120, 164, '아버지·어머니', .6)}
    <path class="a-fade" style="--d:2s" d="M150 150 Q170 120 186 104" stroke="${GREEN}" stroke-width="3" stroke-dasharray="6 5" fill="none"/>
    ${text(300, 130, '아들이', 20, GREEN, 'a-pop', 2.4)}${text(300, 156, '위에 있어요', 20, GREEN, 'a-pop', 2.6)}`);

  // 5. 율곡기념관에서 만나요
  const S5 = svg('', `<rect width="400" height="240" fill="#f6f1fa"/><rect y="200" width="400" height="40" fill="#d9cdb6"/>
    <rect class="a-drop" style="--d:.3s" x="80" y="90" width="240" height="110" fill="#f0ece2" stroke="#b4ab98" stroke-width="2"/>
    <text x="200" y="118" text-anchor="middle" font-size="16" font-weight="800" fill="#5a4a3a">율곡기념관</text>
    <g class="a-pop" style="--d:1s"><rect x="104" y="130" width="60" height="50" fill="#fffdf6" stroke="#8a6a4a" stroke-width="2"/><circle cx="124" cy="160" r="6" fill="#7a4a8a"/><circle cx="134" cy="152" r="6" fill="#7a4a8a"/><circle cx="144" cy="162" r="6" fill="#7a4a8a"/></g>
    <g class="a-pop" style="--d:1.3s"><rect x="236" y="130" width="60" height="50" fill="#fbf3dc" stroke="#8a6a4a" stroke-width="2"/>${[248, 262, 276].map(x => `<rect x="${x}" y="138" width="4" height="34" fill="#5a4a3a"/>`).join('')}</g>
    ${person(170, 228, '#6b4a3a', false, 1.8)}${person(230, 228, '#3a5a8b', false, 2)}
    ${text(200, 50, '그림과 글을 만나요', 24, GREEN, 'a-pop', 2.4)}`);

  window.TOUR_DATA = {
    id: 'yulgok-seowon',
    name: '자운서원과 가족 묘',
    theme: { main: GREEN },
    intro: '율곡을 기리는 옛날 학교 자운서원과 율곡 가족의 묘를 둘러봐요. 커다란 느티나무도 찾아봐요!',
    cover: S1,

    scenes: [
      { id: 1, title: '서원은 옛날 학교', sec: 20, art: S1,
        lines: ['‘서원’은 옛날 학교예요.', '훌륭한 학자를 기리고', '공부도 하던 곳이에요.'] },
      { id: 2, title: '1615년에 세웠어요', sec: 22, art: S2,
        lines: ['율곡이 세상을 떠난 뒤', '1615년에 사람들이 뜻을 모아', '자운서원을 세웠어요.'] },
      { id: 3, title: '공부방과 기숙사', sec: 24, art: S3,
        lines: ['가운데 강인당에서 공부하고,', '양쪽 동재·서재에서 잠을 잤어요.', '500살 느티나무도 있어요.'] },
      { id: 4, title: '위에 있는 아들의 묘', sec: 22, art: S4,
        lines: ['서원 옆 언덕에 가족 묘가 있어요.', '신기하게도 율곡의 묘가', '부모님 묘보다 위에 있어요.'] },
      { id: 5, title: '율곡기념관', sec: 22, art: S5,
        lines: ['율곡기념관에서는', '율곡과 신사임당의', '글과 그림을 볼 수 있어요.'] }
    ],

    questions: [
      { id: 'ylgs-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '‘서원’은 무엇일까요?',
        options: ['옛날 시장', '옛날 학교', '옛날 병원'], answer: 1,
        explanation: '서원은 학자를 기리고 공부하던 옛날 학교예요.' },
      { id: 'ylgs-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '동재와 서재는 무엇을 하던 곳일까요?',
        options: ['잠을 자던 곳', '밥을 짓던 곳', '물건을 팔던 곳'], answer: 0,
        explanation: '동재와 서재는 공부하는 사람들이 묵던 기숙사예요.' },
      { id: 'ylgs-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '자운서원에 있는 아주 오래된 나무는?',
        options: ['소나무', '은행나무', '느티나무'], answer: 2,
        explanation: '500살쯤 된 커다란 느티나무가 있어요.' },
      { id: 'ylgs-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '율곡의 묘는 부모님 묘보다 위에 있어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '신기하게도 아들 율곡의 묘가 더 위에 있어요.' },
      { id: 'ylgs-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '자운서원은 율곡이 살아 있을 때 세웠어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '율곡이 세상을 떠난 뒤, 1615년에 세웠어요.' },
      { id: 'ylgs-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '율곡과 신사임당의 글과 그림을 볼 수 있는 곳은?',
        options: ['수영장', '율곡기념관', '기차역'], answer: 1,
        explanation: '율곡기념관에서 볼 수 있어요.' }
    ],

    sources: [
      { title: '율곡 이이를 만나다, 자운서원(동재·서재·강인당, 500년 느티나무, 가족묘 배치) — 경기도', url: 'https://www.gg.go.kr/myggd/vol158/sub3_7.html' },
      { title: '자운서원 묘정비(1615년 건립) — 한국민족문화대백과사전', url: 'https://encykorea.aks.ac.kr/Article/E0048008' },
      { title: '자운서원(관람 안내) — 한국관광공사 정보', url: 'https://www.ktriptips.com/kor/tourspot/2708165' }
    ]
  };
})();
