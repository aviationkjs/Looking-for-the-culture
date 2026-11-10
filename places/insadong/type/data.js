/* 인사동 · 땅속 보물 금속활자 — 장면 글, 그림, 퀴즈 */
(() => {
  const { person, text, svg } = window.ART;
  const GOLD = '#8a6a2b';

  const soil = `<rect width="400" height="240" fill="#e9f2f6"/>
    <rect y="90" width="400" height="150" fill="#b48a5a"/>
    <path d="M0 90 Q100 80 200 92 T400 88 V100 H0Z" fill="#9a7348"/>
    ${[[40, 140], [120, 200], [300, 130], [350, 210], [210, 225]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="5" fill="#8a6440"/>`).join('')}`;

  // 항아리
  const jar = (x, y, d, open) => `<g class="a-pop" style="--d:${d}s">
    <path d="M${x - 30} ${y} Q${x - 46} ${y - 40} ${x - 18} ${y - 62} H${x + 18} Q${x + 46} ${y - 40} ${x + 30} ${y} Z" fill="#a0785a" stroke="#6a4a30" stroke-width="2"/>
    <rect x="${x - 20}" y="${y - 70}" width="40" height="10" rx="3" fill="#7a5a40"/>
    ${open ? '' : ''}</g>`;

  // 금속활자 하나 (작은 네모 + 글자)
  const piece = (x, y, ch, d, cls = 'a-pop') => `<g class="${cls}" style="--d:${d}s"><rect x="${x - 13}" y="${y - 13}" width="26" height="26" rx="3" fill="#8f8a6e" stroke="#5a5640" stroke-width="2"/>
    <text x="${x}" y="${y + 7}" text-anchor="middle" font-size="17" font-weight="800" fill="#2e2c22">${ch}</text></g>`;

  // 1. 땅을 파 보니
  const S1 = svg('', `${soil}
    <rect class="a-drop" style="--d:.3s" x="290" y="40" width="70" height="50" fill="#f2b705" stroke="#8a6a00"/>
    <rect class="a-drop" style="--d:.3s" x="300" y="48" width="24" height="18" fill="#cfe8f3"/>
    <path class="a-drop" style="--d:.5s" d="M290 70 L220 110 L232 118 L296 82Z" fill="#f2b705" stroke="#8a6a00"/>
    ${person(80, 90, '#3a5a8b', false, 1)}${person(130, 90, '#3a5a8b', false, 1.3)}
    ${text(200, 40, '2021년, 땅을 파다가…', 22, GOLD, 'a-pop', 1.8)}
    <text class="a-pop" style="--d:2.6s" x="200" y="190" text-anchor="middle" font-size="40">❓</text>`);

  // 2. 항아리 속 보물
  const S2 = svg('', `${soil}
    <circle class="a-glow" style="--d:1.2s" cx="200" cy="170" r="70" fill="#ffe08a"/>
    ${jar(200, 220, .4)}
    ${[[150, 120], [180, 105], [215, 112], [248, 124], [168, 140], [232, 142]].map(([x, y], i) => piece(x, y, '字한글자활'[i % 5], 1.4 + i * .2)).join('')}
    ${text(200, 50, '금속활자 1,600여 개!', 26, GOLD, 'a-pop', 2.8)}`);

  // 3. 금속활자가 뭐예요? (활자 → 먹 → 종이에 찍힘)
  const S3 = svg('', `<rect width="400" height="240" fill="#fff8ec"/>
    ${piece(80, 120, '가', .3)}${piece(110, 120, '나', .5)}${piece(140, 120, '다', .7)}
    <text x="110" y="170" text-anchor="middle" font-size="15" font-weight="800" fill="#5a4a3a">쇠로 만든 글자</text>
    <path class="a-fade" style="--d:1.2s" d="M170 120 H215" stroke="#5a4a3a" stroke-width="4" marker-end="none"/><polygon class="a-fade" style="--d:1.2s" points="215,112 230,120 215,128" fill="#5a4a3a"/>
    <g class="a-pop" style="--d:1.6s"><rect x="250" y="70" width="120" height="110" fill="#fffef8" stroke="#c9b99a" stroke-width="2"/>
      <text x="310" y="136" text-anchor="middle" font-size="30" font-weight="800" fill="#1a1a1a">가나다</text></g>
    <text x="310" y="200" text-anchor="middle" font-size="15" font-weight="800" fill="#5a4a3a" class="a-fade" style="--d:1.8s">먹을 묻혀 꾹 찍으면 책!</text>`);

  // 4. 세종대왕 때 한글 활자
  const S4 = svg('', `<rect width="400" height="240" fill="#f3efe4"/>
    <g class="a-pop" style="--d:.3s"><rect x="40" y="50" width="130" height="150" rx="6" fill="#e8dcc0" stroke="#a08a60" stroke-width="2"/>
      <text x="105" y="110" text-anchor="middle" font-size="22" font-weight="800" fill="#5a4a3a">훈민정음</text>
      <text x="105" y="150" text-anchor="middle" font-size="16" fill="#5a4a3a">ㄱ ㄴ ㄷ ㅏ ㅓ</text></g>
    ${['ㄱ', '가', '나', '한', '글'].map((c, i) => piece(220 + (i % 3) * 40, 100 + Math.floor(i / 3) * 44, c, 1 + i * .3)).join('')}
    ${text(280, 210, '한글 금속활자', 20, GOLD, 'a-pop', 2.8)}`);

  // 5. 땅속 옛 골목 전시관
  const S5 = svg('', `<rect width="400" height="240" fill="#e9f2f6"/>
    <rect x="20" y="40" width="360" height="40" fill="#5a6a7a"/><text x="200" y="66" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">인사도시유적전시관</text>
    <rect x="20" y="80" width="360" height="140" fill="#cdb48a"/>
    <rect class="a-fade" style="--d:.4s" x="20" y="80" width="360" height="140" fill="#9ec6dc" opacity=".35"/>
    <g class="a-fade" style="--d:.8s" fill="#9a8a70">${[[50, 110, 90, 20], [50, 130, 20, 70], [180, 110, 120, 20], [280, 130, 20, 70]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`).join('')}</g>
    <g class="a-pop" style="--d:1.4s"><circle cx="210" cy="175" r="22" fill="#6a5a44"/><circle cx="210" cy="175" r="14" fill="#2c3e50"/></g>
    <text class="a-fade" style="--d:1.8s" x="210" y="214" text-anchor="middle" font-size="14" font-weight="800" fill="#3a2a1a">옛 우물</text>
    ${person(100, 236, '#2f6f6a', false, 2.2)}${person(330, 236, '#8b3a2b', false, 2.4)}`);

  window.TOUR_DATA = {
    id: 'insadong-type',
    name: '땅속 보물 금속활자',
    theme: { main: GOLD },
    intro: '인사동 땅속에서 항아리 속 보물이 나왔어요! 인사도시유적전시관에서 옛 골목을 찾아봐요.',
    cover: S2,

    scenes: [
      { id: 1, title: '땅을 파 보니', sec: 20, art: S1,
        lines: ['2021년, 인사동에서', '새 건물을 지으려고', '땅을 파고 있었어요.'] },
      { id: 2, title: '항아리 속 보물', sec: 22, art: S2,
        lines: ['땅속 항아리 안에서', '금속활자가 1,600여 개나', '쏟아져 나왔어요!'] },
      { id: 3, title: '금속활자가 뭐예요?', sec: 24, art: S3,
        lines: ['글자 하나하나를 쇠로 만든 거예요.', '먹을 묻혀 종이에 꾹 찍으면', '책을 만들 수 있어요.'] },
      { id: 4, title: '세종대왕 때 한글 활자', sec: 22, art: S4,
        lines: ['세종대왕이 훈민정음을 만들던 무렵의', '한글 활자도 함께 나왔어요.', '아주 귀한 보물이에요.'] },
      { id: 5, title: '땅속 옛 골목', sec: 22, art: S5,
        lines: ['보물이 나온 곳 가까이에', '옛 골목과 우물을 볼 수 있는', '전시관이 생겼어요.'] }
    ],

    questions: [
      { id: 'isdt-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '금속활자가 담겨 있던 것은 무엇일까요?',
        options: ['항아리', '상자', '가방'], answer: 0,
        explanation: '땅속 항아리 안에 금속활자가 가득 들어 있었어요.' },
      { id: 'isdt-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '나온 금속활자는 몇 개쯤일까요?',
        options: ['16개', '160개', '1,600여 개'], answer: 2,
        explanation: '무려 1,600여 개가 나왔어요.' },
      { id: 'isdt-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '금속활자에 먹을 묻혀 찍으면 글자가 찍혀요.',
        options: ['O', 'X'], answer: 0,
        explanation: '먹을 묻혀 종이에 찍으면 책을 만들 수 있어요.' },
      { id: 'isdt-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '훈민정음을 만든 임금은 누구일까요?',
        options: ['태조', '세종대왕', '정조'], answer: 1,
        explanation: '세종대왕이 훈민정음(한글)을 만들었어요.' },
      { id: 'isdt-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '금속활자는 무엇으로 만들었을까요?',
        options: ['금속(쇠붙이)', '나무', '종이'], answer: 0,
        explanation: '이름처럼 금속으로 만든 글자예요.' },
      { id: 'isdt-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '보물이 나온 곳 가까이에는 지금 아무것도 없어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '옛 골목과 우물을 볼 수 있는 전시관이 생겼어요.' }
    ],

    sources: [
      { title: '인사동 땅 속에서 세종 때 한글 금속활자 무더기 발굴 — 뉴스토마토', url: 'https://newstomato.com/ReadNews.aspx?no=1055248' },
      { title: '인사동 땅속에서 깨어난 조선의 골목, 인사도시유적전시관 — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2018802' },
      { title: '조선의 골목에서 현재의 문화 거리까지(공동 우물) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2019402' }
    ]
  };
})();
