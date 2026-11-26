/* 서대문형무소 · 따로 떨어진 한센병사 (고학년) — 병과 차별, 그리고 사람을 먼저 보는 마음 */
(() => {
  const { brick, person, girl, heart, text, svg } = window.ART;
  const C = '#4f6b5a';
  const YARD = '<rect width="400" height="240" fill="#eef1e8"/><rect y="196" width="400" height="44" fill="#cfd6c4"/>';
  const house = (x, y, d, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="a-drop" style="--d:${d}s">
    <rect x="-50" y="-60" width="100" height="60" fill="url(#brk)"/><path d="M-60 -60H60L40 -84H-40Z" fill="#5a5a5a"/>
    <rect x="-10" y="-34" width="20" height="34" fill="#3a2a22"/></g></g>`;

  // 1. 옥사에서 떨어진 작은 건물
  const S1 = svg(brick(), `${YARD}<rect x="20" y="70" width="120" height="126" fill="url(#brk)" class="a-fade" style="--d:.1s"/>
    ${house(300, 196, .6)}<path class="a-fade" style="--d:1.2s" d="M150 180H240" stroke="${C}" stroke-width="4" stroke-dasharray="8 6"/>
    ${text(80, 56, '옥사', 18, '#5a3b2e', 'a-fade', .3)}${text(300, 90, '한센병사', 22, C, 'a-pop', 1.6)}${text(300, 230, '1923년 즈음', 17, C, 'a-pop', 2)}`);

  // 2. 따로 가둠: 점선 울타리
  const S2 = svg(brick(), `${YARD}${person(70, 196, '#6a6a6a', false, .2)}${person(110, 196, '#6a6a6a', false, .3)}${person(150, 196, '#6a6a6a', false, .4)}
    <path class="a-fade" style="--d:1s" d="M200 60V200" stroke="#a4473a" stroke-width="5" stroke-dasharray="10 8"/>
    ${person(300, 196, '#4f6b5a', false, 1.4)}${text(300, 120, '따로', 26, C, 'a-pop', 2)}`);

  // 3. 위에서 본 안: 복도 + 작은 방 2 + 큰 방 1
  const S3 = svg('', `<rect width="400" height="240" fill="#eef1e8"/>
    <rect x="60" y="40" width="280" height="160" fill="#e2d6c2" stroke="#5a3b2e" stroke-width="5"/>
    <g class="a-fade" style="--d:.4s"><rect x="60" y="160" width="280" height="40" fill="#cfc2a8"/></g>
    ${text(200, 187, '복도', 16, '#5a3b2e', 'a-fade', .6)}
    <g class="a-pop" style="--d:1s"><rect x="66" y="46" width="60" height="110" fill="#b7c9a8"/></g>
    <g class="a-pop" style="--d:1.4s"><rect x="132" y="46" width="60" height="110" fill="#b7c9a8"/></g>
    <g class="a-pop" style="--d:1.8s"><rect x="198" y="46" width="136" height="110" fill="#9fb890"/></g>
    ${text(96, 108, '작은 방', 14, C, 'a-pop', 1.2)}${text(162, 108, '작은 방', 14, C, 'a-pop', 1.6)}${text(266, 108, '큰 방', 18, C, 'a-pop', 2)}`);

  // 4. 원인은 세균, 1871 노르웨이 의사 한센
  const S4 = svg('', `<rect width="400" height="240" fill="#f1f4f8"/>
    <g class="a-pop" style="--d:.2s"><circle cx="120" cy="120" r="70" fill="#fff" stroke="#3a4a5a" stroke-width="8"/>
      ${[[95, 100, 30], [130, 140, -20], [140, 95, 60], [100, 145, 10]].map(([x, y, a], i) => `<g transform="rotate(${a} ${x} ${y})"><rect class="a-pop" style="--d:${.6 + i * .2}s" x="${x - 14}" y="${y - 4}" width="28" height="8" rx="4" fill="#c0506a"/></g>`).join('')}</g>
    <path d="M168 172L200 210" stroke="#3a4a5a" stroke-width="12" stroke-linecap="round" class="a-pop" style="--d:.2s"/>
    ${person(300, 196, '#3a4a5a', false, 1.4)}${text(300, 70, '1871년', 24, C, 'a-pop', 1.8)}${text(300, 100, '노르웨이 한센', 18, C, 'a-pop', 2.2)}`);

  // 5. 오해와 차별
  const S5 = svg('', `<rect width="400" height="240" fill="#e9e6ea"/><rect y="196" width="400" height="44" fill="#d2cdd4"/>
    ${person(300, 196, '#6a6a6a', false, .2)}
    ${person(80, 196, '#8a8a92', false, .4)}${girl(120, 196, '#8a8a92', false, .5)}${person(160, 196, '#8a8a92', false, .6)}
    <g class="a-pop" style="--d:1.2s"><rect x="40" y="60" width="160" height="50" rx="12" fill="#fff" stroke="#8a8a92" stroke-width="2"/>
      <text x="120" y="92" text-anchor="middle" font-size="17" font-weight="800" fill="#6a6a72">하늘의 벌이래…</text></g>
    ${text(320, 60, '잘못된 생각!', 20, '#a4473a', 'a-pop', 2.2)}`);

  // 6. 지금은 치료할 수 있어요 + 사람을 먼저
  const S6 = svg('', `<rect width="400" height="240" fill="#f3f7ee"/><rect y="196" width="400" height="44" fill="#d6e2c8"/>
    <g class="a-pop" style="--d:.3s"><rect x="40" y="70" width="70" height="30" rx="15" fill="#fff" stroke="${C}" stroke-width="3"/><rect x="40" y="70" width="35" height="30" rx="15" fill="${C}"/></g>
    ${person(180, 196, '#4f6b5a', true, .9)}${girl(230, 196, '#b0456e', true, 1.1)}${person(280, 196, '#3a5a8b', true, 1.3)}
    ${heart(230, 110, 2, '#e06a8a', 'a-pop', 1.8)}${text(200, 40, '병보다 사람을 먼저', 22, C, 'a-pop', 2.2)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-hansen',
    name: '따로 떨어진 한센병사',
    theme: { main: C },
    level: '고학년',
    intro: '옥사에서 조금 떨어진 작은 건물, 한센병사를 찾아봐요. 안을 들여다보며 병과 차별에 대해 생각해 봐요.',
    cover: S1,
    think: '병에 걸린 사람을 치료하려고 떨어져 지내게 하는 것과 차별하는 것은 어떻게 다를까요? 아픈 친구가 있다면 나는 어떻게 대할까요?',

    scenes: [
      { id: 1, title: '작은 붉은 벽돌집', sec: 20, art: S1,
        lines: ['옥사에서 조금 떨어진 곳에', '작은 건물이 하나 있어요.', '1923년 즈음 지은 ‘한센병사’예요.'] },
      { id: 2, title: '따로 가둔 곳', sec: 20, art: S2,
        lines: ['한센병에 걸린 수감자를', '다른 수감자와 떼어 놓으려고', '따로 가두었던 건물이에요.'] },
      { id: 3, title: '안을 들여다보면', sec: 22, art: S3,
        lines: ['앞쪽에 복도가 있고,', '그 뒤로 작은 감방 2개와', '큰 감방 1개가 있어요.', '현장에서 직접 세어 봐요.'] },
      { id: 4, title: '한센병은 어떤 병?', sec: 24, art: S4,
        lines: ['한센병은 세균 때문에 생기는 병이에요.', '1871년 노르웨이 의사 한센이', '병의 원인을 밝혀냈어요.', '그래서 ‘한센병’이라고 불러요.'] },
      { id: 5, title: '오해와 차별', sec: 22, art: S5,
        lines: ['옛날 사람들은 이 병을', '하늘이 내린 벌로 잘못 알았어요.', '그래서 환자들은 오랫동안', '심한 차별을 받았어요.'] },
      { id: 6, title: '사람을 먼저', sec: 22, art: S6,
        lines: ['지금은 약으로 치료할 수 있고,', '약을 먹으면 거의 옮지 않아요.', '병보다 사람을 먼저 보는 마음,', '이 건물이 우리에게 주는 숙제예요.'] }
    ],

    questions: [
      { id: 'sdmn-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '한센병사를 지은 때는 언제쯤일까요?',
        options: ['1987년', '1923년 즈음', '2011년', '1998년'], answer: 1,
        explanation: '한센병사는 1923년 즈음 지어졌어요.' },
      { id: 'sdmn-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '한센병사는 어떤 곳이었나요?',
        options: ['밥 짓던 곳', '간수 숙소', '환자를 따로 가둔 곳', '물건 창고'], answer: 2,
        explanation: '한센병에 걸린 수감자를 따로 가두었던 건물이에요.' },
      { id: 'sdmn-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '한센병사 안에 있는 감방은?',
        options: ['작은 방 2 + 큰 방 1', '작은 방 10개', '큰 방 3개', '감방이 없어요'], answer: 0,
        explanation: '복도 뒤로 작은 감방 2개와 큰 감방 1개가 있어요.' },
      { id: 'sdmn-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '한센병의 원인은 무엇일까요?',
        options: ['날씨', '세균', '음식', '하늘의 벌'], answer: 1,
        explanation: '한센병은 세균 때문에 생기는 병이에요.' },
      { id: 'sdmn-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '한센병의 원인을 밝힌 의사 한센은 어느 나라 사람일까요?',
        options: ['일본', '미국', '노르웨이', '중국'], answer: 2,
        explanation: '1871년 노르웨이 의사 한센이 원인을 밝혔어요.' },
      { id: 'sdmn-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '한센병을 ‘하늘이 내린 벌’이라고 한 옛 생각은 맞는 생각이었어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '세균 때문에 생기는 병이에요. 잘못된 생각이 차별을 낳았어요.' },
      { id: 'sdmn-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '지금 한센병은 약으로 치료할 수 있어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '지금은 약으로 치료할 수 있고, 약을 먹으면 거의 옮지 않아요.' },
      { id: 'sdmn-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '이 건물이 우리에게 주는 숙제로 알맞은 것은?',
        options: ['무조건 피하기', '모른 척하기', '소문내기', '사람을 먼저 보기'], answer: 3,
        explanation: '병보다 사람을 먼저 보는 마음이 필요해요.' }
    ],

    sources: [
      { title: '서대문형무소역사관 야외전시(한센병사: 1923년 즈음, 감방 구성) — 서대문형무소역사관', url: 'https://sphh.sscmc.or.kr/exhibit/exhibit03.php' },
      { title: '서울 구 서대문형무소 — 국가유산포털', url: 'http://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1331103240000' },
      { title: '한센병의 역사(1871년 한센의 발견, 천형이라는 오해) — 방재저널', url: 'https://koreascience.kr/article/JAKO201867551547645.pdf' },
      { title: '한센병, 이제는 치료되는 병 — 세계일보', url: 'https://www.segye.com/newsView/20090218000925' }
    ]
  };
})();
