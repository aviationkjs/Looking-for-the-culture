/* 인사동 · 인사동 이야기 (이름의 비밀, 쌈지길) — 장면 글, 그림, 퀴즈 */
(() => {
  const { person, girl, text, svg } = window.ART;
  const TEAL = '#2f6f6a';

  // 한옥 가게 한 채 (x 왼쪽, w 폭, 간판 글자, 색, 나타나는 지연)
  const shop = (x, w, label, color, d) => `<g class="a-drop" style="--d:${d}s">
    <rect x="${x}" y="120" width="${w}" height="76" fill="#f3e6cf" stroke="#8a6a4a"/>
    <path d="M${x - 10} 124 Q${x + w / 2} 100 ${x + w + 10} 124 L${x + w} 112 Q${x + w / 2} 92 ${x} 112 Z" fill="#4a4a4a"/>
    <rect x="${x + 8}" y="128" width="${w - 16}" height="20" rx="3" fill="${color}"/>
    <text x="${x + w / 2}" y="143" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">${label}</text>
    <rect x="${x + w / 2 - 12}" y="160" width="24" height="36" fill="#8a6a4a"/></g>`;

  const street = `<rect width="400" height="240" fill="#eaf3f1"/><rect y="196" width="400" height="44" fill="#d9cdb6"/>`;

  // 1. 옛 물건과 그림이 가득한 거리
  const S1 = svg('', `${street}
    ${shop(20, 110, '옛 물건', '#8b3a2b', .3)}${shop(145, 110, '그림', TEAL, .7)}${shop(270, 110, '찻집', '#8a6a2b', 1.1)}
    ${person(110, 220, '#6b4a3a', false, 1.8)}${girl(250, 222, '#7a4a5a', false, 2.1)}
    ${text(200, 56, '인사동', 38, TEAL, 'a-pop', 2.6)}`);

  // 2. 이름의 비밀: 관인방의 '인' + 대사동의 '사'
  const tag = (x, a, b, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 66}" y="70" width="132" height="54" rx="10" fill="#fffaf1" stroke="#c9b99a" stroke-width="2"/>
    <text x="${x}" y="105" text-anchor="middle" font-size="22" font-weight="800" fill="#5a4a3a">${a}<tspan fill="#c0392b" font-size="26">${b[0]}</tspan>${b.slice(1)}</text></g>`;
  const S2 = svg('', `<rect width="400" height="240" fill="#fff8ec"/>
    ${tag(105, '관', '인방', .3)}${tag(295, '대', '사동', .9)}
    <path class="a-fade" style="--d:1.8s" d="M120 128 Q160 170 186 182M280 128 Q240 170 214 182" stroke="#c0392b" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g class="a-pop" style="--d:2.6s"><rect x="128" y="176" width="144" height="52" rx="12" fill="${TEAL}"/>
      <text x="200" y="212" text-anchor="middle" font-size="28" font-weight="800" fill="#fff">인사동</text></g>`);

  // 3. 오래된 물건들 (도자기, 부채, 족자)
  const S3 = svg('', `<rect width="400" height="240" fill="#f6eedd"/>
    <rect x="30" y="170" width="340" height="14" fill="#8a6a4a"/><rect x="30" y="100" width="340" height="10" fill="#8a6a4a"/>
    <g class="a-pop" style="--d:.4s"><path d="M70 170 Q50 140 72 124 L68 112 H92 L88 124 Q110 140 90 170 Z" fill="#7fa7c9" stroke="#4a6a8a" stroke-width="2"/></g>
    <g class="a-pop" style="--d:.9s"><path d="M150 168 l-34 -40 a52 52 0 0 1 68 0 Z" fill="#e58bb3" stroke="#a04a6a"/></g>
    <g class="a-pop" style="--d:1.4s"><rect x="230" y="112" width="40" height="56" fill="#fffaf1" stroke="#8a6a4a" stroke-width="2"/><rect x="226" y="110" width="48" height="5" fill="#5a4a3a"/>
      <path d="M240 150 q10 -24 20 -6" stroke="#4a4a4a" stroke-width="2" fill="none"/></g>
    <g class="a-pop" style="--d:1.9s"><rect x="300" y="132" width="50" height="36" rx="4" fill="#a4473a"/><rect x="306" y="140" width="38" height="4" fill="#f2b705"/></g>
    ${text(200, 60, '오래된 물건 구경', 26, TEAL, 'a-pop', 2.6)}`);

  // 4. 쌈지길: 빙글빙글 올라가는 길
  const S4 = svg('', `<rect width="400" height="240" fill="#eaf3f1"/>
    <rect x="90" y="40" width="220" height="170" fill="#d8cbb6" stroke="#8a7a62" stroke-width="2"/>
    <rect x="130" y="80" width="140" height="100" fill="#eaf3f1"/>
    <path class="a-fade" style="--d:.4s" d="M110 200 H290 L290 170" stroke="#c0392b" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path class="a-fade" style="--d:1.0s" d="M290 170 V160 H110 V125" stroke="#c0392b" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path class="a-fade" style="--d:1.6s" d="M110 125 V115 H290 V80" stroke="#c0392b" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path class="a-fade" style="--d:2.2s" d="M290 80 V68 H160" stroke="#c0392b" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${[200, 160, 115, 68].map((y, i) => `<text x="${i % 2 ? 330 : 70}" y="${y + 5}" text-anchor="middle" font-size="16" font-weight="800" fill="#5a4a3a" class="a-fade" style="--d:${.4 + i * .6}s">${i + 1}층</text>`).join('')}
    ${person(140, 198, '#2f6f6a', false, .6)}
    ${text(200, 30, '쌈지 = 주머니', 22, TEAL, 'a-pop', 2.8)}`);

  // 5. 꼭대기 하늘정원에서 내려다보기
  const S5 = svg('', `<rect width="400" height="240" fill="#cfe8f3"/>
    <circle class="a-pop" style="--d:.3s" cx="330" cy="50" r="24" fill="#f6c453"/>
    ${[[20, 150, 60], [90, 140, 70], [170, 155, 50], [230, 135, 80], [320, 150, 70]].map(([x, y, w], i) =>
      `<g class="a-fade" style="--d:${.4 + i * .2}s"><rect x="${x}" y="${y}" width="${w}" height="${240 - y}" fill="#f3e6cf" stroke="#8a6a4a"/>
       <path d="M${x - 6} ${y + 4} Q${x + w / 2} ${y - 16} ${x + w + 6} ${y + 4}" fill="#4a4a4a"/></g>`).join('')}
    <rect x="0" y="200" width="400" height="40" fill="#7fb069" opacity=".9"/>
    ${person(150, 214, '#6b4a3a', true, 1.6)}${girl(180, 214, '#7a4a5a', true, 1.8)}${person(210, 214, '#3a5a8b', true, 2)}
    ${text(150, 70, '하늘정원', 30, TEAL, 'a-pop', 2.4)}`);

  window.TOUR_DATA = {
    id: 'insadong',
    name: '인사동 이야기',
    theme: { main: TEAL },
    intro: '옛 물건과 그림이 가득한 서울의 거리, 인사동이에요. 이름의 비밀과 빙글빙글 쌈지길을 알아봐요.',
    cover: S1,

    scenes: [
      { id: 1, title: '옛것이 가득한 거리', sec: 20, art: S1,
        lines: ['서울 한가운데 인사동에는', '옛 물건과 그림 가게,', '전통 찻집이 줄지어 있어요.'] },
      { id: 2, title: '이름의 비밀', sec: 24, art: S2,
        lines: ['옛날 두 동네 이름', '‘관인방’과 ‘대사동’에서', '한 글자씩 따서 ‘인사동’이 됐어요.'] },
      { id: 3, title: '오래된 물건 구경', sec: 20, art: S3,
        lines: ['도자기, 부채, 옛 그림처럼', '오래된 물건을 파는 가게가 많아요.', '눈으로만 조심조심 구경해요.'] },
      { id: 4, title: '빙글빙글 쌈지길', sec: 24, art: S4,
        lines: ['‘쌈지’는 주머니라는 뜻의 우리말이에요.', '쌈지길은 계단 대신', '빙글빙글 길을 따라 올라가요.'] },
      { id: 5, title: '꼭대기 하늘정원', sec: 22, art: S5,
        lines: ['꼭대기 하늘정원에 서면', '인사동이 한눈에 보여요.', '이제 인사동 이야기를 하나씩 만나 봐요!'] }
    ],

    questions: [
      { id: 'isd-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '‘인사동’이라는 이름은 어디서 왔을까요?',
        options: ['두 동네 이름에서 한 글자씩', '사람 이름', '산 이름'], answer: 0,
        explanation: '‘관인방’의 ‘인’과 ‘대사동’의 ‘사’를 따서 지었어요.' },
      { id: 'isd-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '‘쌈지’는 무슨 뜻일까요?',
        options: ['모자', '주머니', '신발'], answer: 1,
        explanation: '쌈지는 주머니라는 뜻의 우리말이에요.' },
      { id: 'isd-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '쌈지길은 계단 대신 빙글빙글 길을 따라 올라가요.',
        options: ['O', 'X'], answer: 0,
        explanation: '1층부터 꼭대기까지 길로 이어져 있어요.' },
      { id: 'isd-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '쌈지길 꼭대기에 있는 곳은?',
        options: ['수영장', '지하철역', '하늘정원'], answer: 2,
        explanation: '꼭대기 하늘정원에서 인사동이 한눈에 보여요.' },
      { id: 'isd-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '인사동에 특히 많은 가게는?',
        options: ['자동차 가게', '옛 물건·그림 가게', '놀이기구 가게'], answer: 1,
        explanation: '옛 물건과 그림 가게, 전통 찻집이 많아요.' },
      { id: 'isd-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '오래된 물건은 함부로 만지지 않고 눈으로 구경해요.',
        options: ['O', 'X'], answer: 0,
        explanation: '오래된 물건은 깨지기 쉬워서 조심조심 구경해요.' }
    ],

    sources: [
      { title: '조선의 골목에서 현재의 문화 거리까지, 인사동에서 시간 여행 — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2019402' },
      { title: '골목골목 구경하는 재미가 쏠쏠한 인사동길(쌈지 = 주머니) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1175926' },
      { title: '인사동 쌈지길과 하늘정원 — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2009280' },
      { title: '옛것이 살아있는 전통 문화의 거리(쌈지길 1~4층 길) — 이코노미스트', url: 'https://economist.co.kr/article/view/ecn201608060014' }
    ]
  };
})();
