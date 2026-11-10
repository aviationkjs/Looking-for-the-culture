/* 인사동 · 붓·먹·종이·벼루 (문방사우, 도화서, 필방) — 장면 글, 그림, 퀴즈 */
(() => {
  const { person, text, svg } = window.ART;
  const INK = '#4a4a4a';

  // 문방사우 그림 조각
  const paper = (x, y, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 34}" y="${y - 44}" width="68" height="88" fill="#fffdf6" stroke="#c9b99a" stroke-width="2"/>
    <path d="M${x - 24} ${y - 30}h48M${x - 24} ${y - 18}h48" stroke="#eee3cc" stroke-width="2"/></g>`;
  const brush = (x, y, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 5}" y="${y - 50}" width="10" height="70" rx="4" fill="#8a6a4a"/>
    <path d="M${x - 7} ${y + 20} Q${x} ${y + 52} ${x + 7} ${y + 20} Z" fill="#2a2a2a"/></g>`;
  const ink = (x, y, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 12}" y="${y - 40}" width="24" height="80" rx="4" fill="#2a2a2a"/>
    <rect x="${x - 8}" y="${y - 30}" width="16" height="20" fill="#c9a24a"/></g>`;
  const stone = (x, y, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 40}" y="${y - 22}" width="80" height="44" rx="10" fill="#5a5a5a"/>
    <ellipse cx="${x}" cy="${y + 2}" rx="26" ry="12" fill="#2a2a2a"/></g>`;
  const label = (x, y, t, d) => `<text class="a-fade" style="--d:${d}s" x="${x}" y="${y}" text-anchor="middle" font-size="18" font-weight="800" fill="#3a2a1a">${t}</text>`;

  // 1. 그림 그리던 관청, 도화서
  const S1 = svg('', `<rect width="400" height="240" fill="#f6f0e2"/><rect y="196" width="400" height="44" fill="#d9cdb6"/>
    <g class="a-drop" style="--d:.3s"><rect x="40" y="110" width="200" height="86" fill="#f3e6cf" stroke="#8a6a4a" stroke-width="2"/>
      <path d="M20 116 Q140 72 260 116 L240 100 Q140 62 40 100 Z" fill="#3e3e3e"/>
      <rect x="100" y="96" width="80" height="18" rx="3" fill="#fffaf1" stroke="#8a6a4a"/>
      <text x="140" y="110" text-anchor="middle" font-size="12" font-weight="800" fill="#5a3b2e">도화서</text></g>
    <g class="a-pop" style="--d:1.2s"><rect x="270" y="70" width="100" height="120" fill="#fffdf6" stroke="#8a6a4a" stroke-width="3"/>
      <path d="M282 160 L305 120 L322 145 L338 112 L358 160 Z" fill="#7a9a7a"/><circle cx="345" cy="95" r="9" fill="#e07a5f"/></g>
    ${person(110, 222, '#5a5a5a', false, 1.6)}${person(170, 222, '#5a5a5a', false, 1.9)}
    ${text(200, 44, '나라의 그림을 그리던 곳', 22, INK, 'a-pop', 2.4)}`);

  // 2. 네 친구, 문방사우
  const S2 = svg('', `<rect width="400" height="240" fill="#fffaf0"/>
    ${paper(60, 120, .3)}${brush(150, 110, .7)}${ink(240, 120, 1.1)}${stone(330, 130, 1.5)}
    ${label(60, 200, '종이', .5)}${label(150, 200, '붓', .9)}${label(240, 200, '먹', 1.3)}${label(330, 200, '벼루', 1.7)}
    ${text(200, 40, '문방사우 = 네 친구', 26, INK, 'a-pop', 2.3)}`);

  // 3. 하나라도 없으면 (벼루가 사라지면 ?)
  const S3 = svg('', `<rect width="400" height="240" fill="#fffaf0"/>
    ${paper(60, 120, 0)}${brush(150, 110, 0)}${ink(240, 120, 0)}
    <g class="a-out" style="--d:.8s">${stone(330, 130, 0)}</g>
    <text class="a-pop" style="--d:2s" x="330" y="146" text-anchor="middle" font-size="44" font-weight="800" fill="#c0392b">?</text>
    ${text(200, 40, '하나라도 없으면…', 26, INK, 'a-pop', 2.6)}
    ${text(200, 218, '글씨를 쓸 수 없어요', 20, '#c0392b', 'a-pop', 3.2)}`);

  // 4. 필방 거리
  const S4 = svg('', `<rect width="400" height="240" fill="#eef4f2"/><rect y="196" width="400" height="44" fill="#d9cdb6"/>
    <g class="a-drop" style="--d:.3s"><rect x="80" y="90" width="240" height="106" fill="#f3e6cf" stroke="#8a6a4a" stroke-width="2"/>
      <path d="M60 96 Q200 52 340 96 L320 80 Q200 42 80 80 Z" fill="#3e3e3e"/>
      <rect x="150" y="98" width="100" height="26" rx="4" fill="#5a3b2e"/>
      <text x="200" y="117" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">필방</text></g>
    ${[110, 130, 150, 170].map((x, i) => `<g class="a-pop" style="--d:${1 + i * .15}s"><rect x="${x - 3}" y="136" width="6" height="40" fill="#8a6a4a"/><path d="M${x - 4} 176 Q${x} 192 ${x + 4} 176Z" fill="#2a2a2a"/></g>`).join('')}
    <g class="a-pop" style="--d:1.8s"><rect x="230" y="140" width="70" height="50" fill="#fffdf6" stroke="#c9b99a"/><rect x="236" y="146" width="58" height="38" fill="#f6efe0"/></g>
    ${text(200, 40, '100년 넘은 가게도 있어요', 20, INK, 'a-pop', 2.4)}`);

  // 5. 내 이름을 써 볼까? (붓으로 글씨가 써짐)
  const S5 = svg('', `<rect width="400" height="240" fill="#fbf6ea"/>
    <rect x="70" y="40" width="260" height="170" fill="#fffdf6" stroke="#c9b99a" stroke-width="2"/>
    <text class="a-fade" style="--d:.6s" x="190" y="150" text-anchor="middle" font-size="72" font-weight="900" fill="#1a1a1a" font-family="'Nanum Brush Script','Batang','serif'">이름</text>
    <g transform="translate(300 160) rotate(30)"><g class="a-pop" style="--d:2s"><rect x="-5" y="-60" width="10" height="70" rx="4" fill="#8a6a4a"/><path d="M-7 10 Q0 40 7 10Z" fill="#2a2a2a"/></g></g>
    ${text(200, 232, '내 이름을 써 봐요', 20, INK, 'a-pop', 2.6)}`);

  window.TOUR_DATA = {
    id: 'insadong-munbang',
    name: '붓·먹·종이·벼루',
    theme: { main: INK },
    intro: '옛날 사람들이 글씨를 쓰고 그림을 그리던 네 친구를 만나요. 인사동 필방 거리에서 찾아봐요.',
    cover: S2,

    scenes: [
      { id: 1, title: '그림 그리던 관청', sec: 22, art: S1,
        lines: ['조선 시대 인사동 근처에는', '나라의 그림을 그리던', '‘도화서’가 있었어요.'] },
      { id: 2, title: '네 친구, 문방사우', sec: 24, art: S2,
        lines: ['종이, 붓, 먹, 벼루를', '‘문방사우’라고 불렀어요.', '글방의 네 친구라는 뜻이에요.'] },
      { id: 3, title: '하나라도 없으면', sec: 22, art: S3,
        lines: ['먹은 벼루에 갈아서 써요.', '넷 중 하나라도 없으면', '글씨를 쓸 수 없어요.'] },
      { id: 4, title: '필방 거리', sec: 22, art: S4,
        lines: ['지금도 인사동에는', '붓과 먹을 파는 ‘필방’이 많아요.', '100년이 넘은 가게도 있어요.'] },
      { id: 5, title: '내 이름을 써 볼까?', sec: 22, art: S5,
        lines: ['먹을 갈고 붓에 묻혀서', '내 이름을 천천히', '써 보면 어떨까요?'] }
    ],

    questions: [
      { id: 'isdm-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '문방사우가 아닌 것은?',
        options: ['붓', '연필', '벼루'], answer: 1,
        explanation: '문방사우는 종이, 붓, 먹, 벼루예요.' },
      { id: 'isdm-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '먹을 갈 때 쓰는 돌은?',
        options: ['벼루', '종이', '붓'], answer: 0,
        explanation: '먹은 벼루에 물을 붓고 갈아서 써요.' },
      { id: 'isdm-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '조선 시대 나라의 그림을 그리던 곳은?',
        options: ['우체국', '소방서', '도화서'], answer: 2,
        explanation: '그림을 맡은 관청, 도화서가 인사동 근처에 있었어요.' },
      { id: 'isdm-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '네 친구 중 하나가 없어도 글씨를 잘 쓸 수 있어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '하나라도 없으면 글씨를 쓸 수 없어요.' },
      { id: 'isdm-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '붓과 먹을 파는 가게를 무엇이라고 할까요?',
        options: ['필방', '빵집', '꽃집'], answer: 0,
        explanation: '붓과 먹, 종이를 파는 가게는 ‘필방’이에요.' },
      { id: 'isdm-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '인사동에는 100년이 넘은 필방도 있어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '오래된 필방이 지금도 문을 열고 있어요.' }
    ],

    sources: [
      { title: '골목골목 구경하는 재미가 쏠쏠한 인사동길(도화서) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1175926' },
      { title: '[사진으로 본 전통의 숨결] 문방사우 — 서울신문', url: 'https://www.seoul.co.kr/news/2005/10/11/20051011020001' },
      { title: '여전히 건재한 최초의 필방, 구하산방 — ELLE DECOR', url: 'https://www.elle.co.kr/article/1870327' }
    ]
  };
})();
