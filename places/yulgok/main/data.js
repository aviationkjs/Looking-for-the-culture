/* 파주 율곡 이이 유적 · 지폐 속 엄마와 아들 — 장면 글, 그림, 퀴즈
 * 지폐는 실제 도안(초상)을 그리지 않고 숫자와 실루엣으로만 표현해요. */
(() => {
  const { person, girl, heart, text, svg } = window.ART;
  const PURPLE = '#6a4c93';

  // 지폐 (x, y, 금액, 색, 지연) — 얼굴 대신 둥근 실루엣
  const bill = (x, y, amount, color, d, cls = 'a-pop') => `<g class="${cls}" style="--d:${d}s">
    <rect x="${x}" y="${y}" width="150" height="72" rx="6" fill="${color}" stroke="#5a4a3a" stroke-width="2"/>
    <rect x="${x + 6}" y="${y + 6}" width="138" height="60" rx="4" fill="none" stroke="#fff" stroke-opacity=".6"/>
    <text x="${x + 14}" y="${y + 30}" font-size="18" font-weight="800" fill="#3a2a1a">${amount}</text>
    <circle cx="${x + 112}" cy="${y + 30}" r="12" fill="#fff" fill-opacity=".55"/><rect x="${x + 98}" y="${y + 42}" width="28" height="22" rx="10" fill="#fff" fill-opacity=".55"/></g>`;

  // 1. 지갑 속 지폐
  const S1 = svg('', `<rect width="400" height="240" fill="#f6f1fa"/>
    <g class="a-drop" style="--d:.2s"><rect x="40" y="130" width="320" height="90" rx="14" fill="#8a5a3a"/><rect x="40" y="130" width="320" height="24" rx="10" fill="#6a4228"/></g>
    ${bill(55, 60, '5,000원', '#f2c48a', .8, 'a-drop')}${bill(195, 50, '50,000원', '#f2d36b', 1.2, 'a-drop')}
    ${text(200, 34, '지갑 속 지폐를 볼까요?', 22, PURPLE, 'a-pop', 2)}`);

  // 2. 엄마와 아들
  const S2 = svg('', `<rect width="400" height="240" fill="#f6f1fa"/>
    ${bill(30, 70, '5,000원', '#f2c48a', .2)}${bill(220, 70, '50,000원', '#f2d36b', .5)}
    ${text(105, 168, '율곡 이이', 20, '#3a2a1a', 'a-fade', 1)}${text(295, 168, '신사임당', 20, '#3a2a1a', 'a-fade', 1.3)}
    <g class="a-pop" style="--d:1.8s"><text x="200" y="114" text-anchor="middle" font-size="30" font-weight="800" fill="${PURPLE}">=</text></g>
    ${heart(200, 205, 2, '#e0457b', 'a-pop', 2.4)}
    ${text(200, 40, '아들과 엄마예요!', 26, PURPLE, 'a-pop', 2.8)}`);

  // 3. 밤나무 골짜기 '율곡'
  const tree = (x, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 4}" y="150" width="8" height="46" fill="#6b4a3a"/><circle cx="${x}" cy="138" r="26" fill="#5f8a3f"/>
    ${[[-10, -6], [8, -10], [2, 8]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${138 + dy}" r="5" fill="#8a5a2a"/>`).join('')}</g>`;
  const S3 = svg('', `<rect width="400" height="240" fill="#eef5e8"/>
    <path d="M0 120 Q100 70 200 110 T400 100 V240 H0Z" fill="#c9dcae"/><rect y="196" width="400" height="44" fill="#b9cf94"/>
    ${[60, 130, 270, 340].map((x, i) => tree(x, .3 + i * .3)).join('')}
    <g class="a-pop" style="--d:1.6s"><rect x="150" y="96" width="100" height="64" rx="10" fill="#fffaf1" stroke="${PURPLE}" stroke-width="3"/>
      <text x="200" y="124" text-anchor="middle" font-size="20" font-weight="800" fill="${PURPLE}">율곡</text>
      <text x="200" y="148" text-anchor="middle" font-size="13" font-weight="800" fill="#5a4a3a">밤 + 골짜기</text></g>
    ${text(200, 44, '밤나무 골짜기 마을', 24, PURPLE, 'a-pop', 2.2)}`);

  // 4. 강릉에서 태어나 6살에 파주로
  const S4 = svg('', `<rect width="400" height="240" fill="#f3f7fb"/>
    <g class="a-pop" style="--d:.3s"><circle cx="320" cy="150" r="34" fill="#cfe3ee" stroke="#7a9ab4" stroke-width="2"/><text x="320" y="156" text-anchor="middle" font-size="16" font-weight="800" fill="#3a5a7a">강릉</text></g>
    <g class="a-pop" style="--d:.6s"><circle cx="90" cy="90" r="34" fill="#e3d6f0" stroke="${PURPLE}" stroke-width="2"/><text x="90" y="96" text-anchor="middle" font-size="16" font-weight="800" fill="${PURPLE}">파주</text></g>
    <path class="a-fade" style="--d:1.2s" d="M288 140 Q200 150 124 100" stroke="${PURPLE}" stroke-width="4" stroke-dasharray="8 6" fill="none"/>
    ${person(320, 216, '#6b4a3a', false, .8)}<g transform="translate(160 136)"><g class="a-pop" style="--d:1.8s"><circle cy="-18" r="6" fill="#6b4a3a"/><rect x="-6" y="-12" width="12" height="16" rx="5" fill="#6b4a3a"/></g></g>
    ${text(320, 92, '태어난 곳', 15, '#3a5a7a', 'a-fade', .6)}${text(90, 150, '자란 곳', 15, PURPLE, 'a-fade', .9)}
    ${text(200, 226, '6살에 파주로 이사 왔어요', 18, PURPLE, 'a-pop', 2.4)}`);

  // 5. 파주 율곡 이이 유적 둘러보기
  const S5 = svg('', `<rect width="400" height="240" fill="#f1ecf7"/>
    <path d="M0 150 Q120 90 220 130 T400 120 V240 H0Z" fill="#cbbfdc"/><rect y="200" width="400" height="40" fill="#b8c99a"/>
    ${[[70, '자운서원', .4], [200, '기념관', .8], [320, '가족 묘', 1.2]].map(([x, t, d]) => `<g class="a-drop" style="--d:${d}s">
      <rect x="${x - 46}" y="146" width="92" height="54" fill="#f3e6cf" stroke="#8a6a4a"/>
      <path d="M${x - 56} 150 Q${x} 122 ${x + 56} 150 L${x + 46} 138 Q${x} 114 ${x - 46} 138Z" fill="#3e3e3e"/>
      <text x="${x}" y="182" text-anchor="middle" font-size="14" font-weight="800" fill="#5a3b2e">${t}</text></g>`).join('')}
    ${person(140, 228, '#6b4a3a', true, 1.8)}${girl(260, 228, '#7a4a5a', true, 2)}
    ${text(200, 50, '가족과 함께 찾아봐요', 24, PURPLE, 'a-pop', 2.4)}`);

  window.TOUR_DATA = {
    id: 'yulgok',
    name: '지폐 속 엄마와 아들',
    theme: { main: PURPLE },
    intro: '오천 원과 오만 원 지폐 속 두 사람은 엄마와 아들이에요. 파주 율곡 이이 유적에서 만나 봐요.',
    cover: S2,

    scenes: [
      { id: 1, title: '지갑 속 지폐', sec: 20, art: S1,
        lines: ['지갑 속 오천 원과', '오만 원 지폐를 꺼내 봐요.', '그려진 사람이 누구일까요?'] },
      { id: 2, title: '엄마와 아들', sec: 22, art: S2,
        lines: ['오천 원은 율곡 이이,', '오만 원은 신사임당이에요.', '두 사람은 아들과 엄마예요!'] },
      { id: 3, title: '밤나무 골짜기, 율곡', sec: 22, art: S3,
        lines: ['‘율곡’은 밤나무 골짜기라는 뜻이에요.', '파주의 율곡 마을 이름을', '자기 호(별명)로 썼어요.'] },
      { id: 4, title: '태어난 곳, 자란 곳', sec: 22, art: S4,
        lines: ['율곡 이이는 강릉에서 태어나', '6살에 파주로 왔어요.', '파주에서 자라며 공부했어요.'] },
      { id: 5, title: '파주 율곡 이이 유적', sec: 22, art: S5,
        lines: ['파주에는 자운서원, 율곡기념관,', '가족 묘가 한곳에 모여 있어요.', '이제 이야기를 하나씩 만나 봐요!'] }
    ],

    questions: [
      { id: 'ylg-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '오천 원 지폐에 그려진 사람은?',
        options: ['세종대왕', '율곡 이이', '이순신'], answer: 1,
        explanation: '오천 원 지폐에는 율곡 이이가 있어요.' },
      { id: 'ylg-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '율곡 이이와 신사임당은 어떤 사이일까요?',
        options: ['아들과 엄마', '친구', '선생님과 제자'], answer: 0,
        explanation: '신사임당은 율곡 이이의 엄마예요.' },
      { id: 'ylg-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '‘율곡’은 무슨 뜻일까요?',
        options: ['소나무 숲', '큰 바다', '밤나무 골짜기'], answer: 2,
        explanation: '‘율’은 밤, ‘곡’은 골짜기라는 뜻이에요.' },
      { id: 'ylg-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '율곡 이이는 파주에서 태어났어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '강릉에서 태어나 6살에 파주로 왔어요.' },
      { id: 'ylg-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '오만 원 지폐에 그려진 사람은?',
        options: ['유관순', '신사임당', '김구'], answer: 1,
        explanation: '오만 원 지폐에는 신사임당이 있어요.' },
      { id: 'ylg-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '파주 율곡 이이 유적에는 자운서원과 가족 묘가 함께 있어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '자운서원, 율곡기념관, 가족 묘가 한곳에 있어요.' }
    ],

    sources: [
      { title: '파주 이이 유적과 화석정(율곡=밤골, 강릉 출생·파주 성장) — 고양신문', url: 'https://www.mygoyang.com/news/articleView.html?idxno=91111' },
      { title: '율곡 이이를 만나다, 자운서원 — 경기도 G뉴스', url: 'https://www.gg.go.kr/myggd/vol158/sub3_7.html' },
      { title: '은행권의 변천(오천원권 율곡 이이, 오만원권 신사임당) — 한국은행', url: 'https://www.bok.or.kr/portal/main/contents.do?menuNo=200385' },
      { title: '파주 이이 유적 — 한국민족문화대백과사전', url: 'https://encykorea.aks.ac.kr/Article/E0071267' }
    ]
  };
})();
