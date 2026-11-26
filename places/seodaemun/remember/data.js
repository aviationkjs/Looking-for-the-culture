/* 서대문형무소 · 우리가 기억하는 방법 (고학년) — 독립공원·순국선열추념탑, 그리고 나만의 기억 방법 */
(() => {
  const { FLAG, FLOWER, flower, person, girl, heart, text, svg } = window.ART;
  const C = '#8a6a2a';
  const PARK = '<rect width="400" height="240" fill="#eaf2e2"/><rect y="196" width="400" height="44" fill="#c8dbb4"/>';
  const tower = (x, d) => `<g class="a-drop" style="--d:${d}s"><path d="M${x - 22} 196L${x - 12} 40H${x + 12}L${x + 22} 196Z" fill="#b9b3a5"/>
    <rect x="${x - 40}" y="180" width="80" height="16" fill="#a29b8c"/></g>`;

  // 1. 역사관을 나서면 독립공원
  const S1 = svg(FLAG, `${PARK}${[40, 90, 320, 370].map((x, i) => `<g class="a-fade" style="--d:${.2 + i * .15}s"><rect x="${x - 3}" y="150" width="6" height="46" fill="#6a4a30"/><circle cx="${x}" cy="140" r="22" fill="#6f9a52"/></g>`).join('')}
    ${person(170, 210, '#4a5a7a', false, .8)}${girl(200, 210, '#8a4a5a', false, 1)}${person(230, 210, '#5a6a4a', false, 1.2)}
    <g transform="translate(170 60)"><use href="#tg" width="60" height="40" class="a-wave"/></g>
    ${text(200, 40, '서대문독립공원', 22, C, 'a-pop', 1.6)}${text(200, 130, '1992.8.15', 20, C, 'a-pop', 2)}`);

  // 2. 순국선열과 호국영령
  const S2 = svg(FLOWER, `<rect width="400" height="240" fill="#f6f1e2"/>
    <g class="a-pop" style="--d:.2s"><rect x="24" y="50" width="170" height="140" rx="14" fill="${C}"/>
      <text x="109" y="90" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">순국선열</text>
      <text x="109" y="126" text-anchor="middle" font-size="15" font-weight="800" fill="#fff7dc">나라를 되찾으려다</text>
      <text x="109" y="148" text-anchor="middle" font-size="15" font-weight="800" fill="#fff7dc">목숨을 잃은 분</text></g>
    <g class="a-pop" style="--d:1.2s"><rect x="206" y="50" width="170" height="140" rx="14" fill="#3a5a8b"/>
      <text x="291" y="90" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">호국영령</text>
      <text x="291" y="126" text-anchor="middle" font-size="15" font-weight="800" fill="#e6eefa">전쟁에서 나라를</text>
      <text x="291" y="148" text-anchor="middle" font-size="15" font-weight="800" fill="#e6eefa">지키다 희생된 분</text></g>
    ${flower(200, 214, 2, 24)}`);

  // 3. 순국선열추념탑의 조각
  const S3 = svg('', `${PARK}${tower(200, .2)}
    ${[['의병', 70, 70], ['3·1 만세', 70, 130], ['청산리 전투', 330, 70], ['안중근 의사', 330, 130]].map(([t, x, y], i) => `<g class="a-pop" style="--d:${.9 + i * .4}s">
      <rect x="${x - 58}" y="${y - 20}" width="116" height="34" rx="17" fill="#fff" stroke="${C}" stroke-width="3"/>
      <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="16" font-weight="800" fill="${C}">${t}</text></g>`).join('')}
    ${text(200, 230, '순국선열추념탑', 18, C, 'a-pop', 2.6)}`);

  // 4. 이름 없는 영웅들
  const S4 = svg('', `<rect width="400" height="240" fill="#2f3340"/>
    ${Array.from({ length: 60 }, (_, i) => `<circle class="a-pop" style="--d:${(i % 12) * .12 + Math.floor(i / 12) * .1}s" cx="${24 + (i % 12) * 32}" cy="${120 + Math.floor(i / 12) * 22}" r="7" fill="${i === 27 ? '#ffcf3f' : '#8a8fa8'}"/>`).join('')}
    ${text(200, 50, '약 15만 명', 28, '#ffe9a8', 'a-pop', 1.6)}${text(200, 86, '대부분 이름도 남기지 못했어요', 17, '#e6e6f0', 'a-pop', 2.2)}`);

  // 5. 사적 지정, 해마다 기억하는 행사
  const S5 = svg(FLAG, `<rect width="400" height="240" fill="#f6f1e2"/>
    <g class="a-pop" style="--d:.2s"><rect x="30" y="60" width="150" height="110" rx="8" fill="#fff" stroke="${C}" stroke-width="4"/>
      <text x="105" y="104" text-anchor="middle" font-size="26" font-weight="800" fill="${C}">사적</text>
      <text x="105" y="138" text-anchor="middle" font-size="18" font-weight="800" fill="${C}">1988년</text></g>
    <g class="a-pop" style="--d:1.2s"><rect x="210" y="60" width="160" height="110" rx="8" fill="${C}"/>
      <text x="290" y="100" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">이달의</text>
      <text x="290" y="126" text-anchor="middle" font-size="17" font-weight="800" fill="#fff">독립운동가</text></g>
    <g transform="translate(260 180)"><use href="#tg" width="60" height="40" class="a-wave"/></g>`);

  // 6. 나의 기억 방법: 한 줄 편지
  const S6 = svg(FLOWER, `<rect width="400" height="240" fill="#fbf6e8"/>
    <g class="a-pop" style="--d:.2s"><rect x="90" y="40" width="220" height="150" rx="6" fill="#fff" stroke="#d8c9a8" stroke-width="3"/>
      ${[0, 1, 2, 3].map(i => `<path d="M110 ${82 + i * 26}H290" stroke="#e6dcc4" stroke-width="2"/>`).join('')}
      <path class="a-fade" style="--d:1s" d="M112 76Q150 66 190 78T270 74" stroke="${C}" stroke-width="3" fill="none"/></g>
    <g transform="rotate(30 320 150)"><g class="a-pop" style="--d:1.4s"><rect x="300" y="100" width="12" height="80" rx="3" fill="${C}"/><path d="M300 180L306 194L312 180Z" fill="#3a2a1a"/></g></g>
    ${heart(200, 150, 2, '#e06a8a', 'a-pop', 2)}${flower(60, 200, 2.4, 26)}${flower(340, 60, 2.6, 22)}
    ${text(200, 226, '기억할게요', 20, C, 'a-pop', 2.8)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-remember',
    name: '우리가 기억하는 방법',
    theme: { main: C },
    level: '고학년',
    intro: '탐험의 마지막! 역사관을 나와 독립공원의 순국선열추념탑을 찾아가 봐요. 오늘 만난 사람들을 어떻게 기억할지 정해 봐요.',
    cover: S3,
    think: '오늘 서대문형무소에서 만난 사람 가운데 한 분을 골라, 그분께 하고 싶은 말을 한 줄로 적어 보세요.',

    scenes: [
      { id: 1, title: '서대문독립공원', sec: 20, art: S1,
        lines: ['역사관을 나오면 넓은 공원이 있어요.', '1992년 8월 15일 문을 연', '‘서대문독립공원’이에요.'] },
      { id: 2, title: '순국선열과 호국영령', sec: 24, art: S2,
        lines: ['나라를 되찾으려다 목숨을 잃은 분들을', '‘순국선열’이라고 해요.', '전쟁에서 나라를 지키다 희생된 분들은', '‘호국영령’이라고 불러요.'] },
      { id: 3, title: '추념탑의 조각', sec: 22, art: S3,
        lines: ['순국선열추념탑에는 의병, 3·1 만세,', '청산리 전투, 안중근 의사 같은', '독립운동의 모습이 새겨져 있어요.', '하나씩 찾아봐요!'] },
      { id: 4, title: '이름 없는 영웅들', sec: 22, art: S4,
        lines: ['순국선열은 약 15만 명이라고 해요.', '그런데 대부분은 이름도', '남기지 못하고 돌아가셨어요.', '그래서 함께 기억하는 곳이 필요해요.'] },
      { id: 5, title: '지키고 알리기', sec: 22, art: S5,
        lines: ['1988년 옥사와 사형장은', '나라의 ‘사적’으로 지정되었어요.', '역사관은 이달의 독립운동가를', '알리며 기억을 이어 가요.'] },
      { id: 6, title: '나의 기억 방법', sec: 20, art: S6,
        lines: ['오늘 기억에 남은 한 사람의', '이름을 적어 봐요.', '그분께 한 줄 편지를 쓰는 것도', '훌륭한 기억 방법이에요.'] }
    ],

    questions: [
      { id: 'sdmr-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '서대문독립공원이 문을 연 날은?',
        options: ['1919년 3월 1일', '1945년 8월 15일', '1992년 8월 15일', '2000년 1월 1일'], answer: 2,
        explanation: '광복절인 1992년 8월 15일에 문을 열었어요.' },
      { id: 'sdmr-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '나라를 되찾으려다 목숨을 잃은 분들을 부르는 말은?',
        options: ['호국영령', '순국선열', '민족대표', '의병장'], answer: 1,
        explanation: '독립운동을 하다 돌아가신 분들을 ‘순국선열’이라고 해요.' },
      { id: 'sdmr-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '순국선열과 호국영령은 뜻이 완전히 같아요.',
        options: ['O', 'X'], answer: 1,
        explanation: '호국영령은 전쟁에서 나라를 지키다 희생된 분들이에요.' },
      { id: 'sdmr-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '순국선열추념탑에 새겨진 모습이 아닌 것은?',
        options: ['의병', '3·1 만세', '청산리 전투', '달 착륙'], answer: 3,
        explanation: '추념탑에는 국내외 독립운동의 모습이 새겨져 있어요.' },
      { id: 'sdmr-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '순국선열은 약 몇 명이라고 하나요?',
        options: ['약 1천 명', '약 1만 명', '약 15만 명', '약 100만 명'], answer: 2,
        explanation: '약 15만 명이고, 대부분 이름도 남기지 못했어요.' },
      { id: 'sdmr-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '이름 없이 돌아가신 분이 많아서 함께 기억하는 곳이 필요해요.',
        options: ['O', 'X'], answer: 0,
        explanation: '그래서 추념탑과 역사관 같은 곳이 소중해요.' },
      { id: 'sdmr-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '1988년 옥사와 사형장이 지정된 것은?',
        options: ['세계유산', '국립공원', '놀이공원', '사적'], answer: 3,
        explanation: '나라가 보호하는 ‘사적’으로 지정되었어요.' },
      { id: 'sdmr-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '기억하는 방법으로 알맞지 않은 것은?',
        options: ['이름 적어 보기', '한 줄 편지 쓰기', '벽에 낙서하기', '가족과 이야기하기'], answer: 2,
        explanation: '역사 장소는 아끼고 지켜야 해요. 낙서는 안 돼요.' }
    ],

    sources: [
      { title: '1919, 기미년 그날의 외침이 서려 있는 곳(1992.8.15 독립공원 개원) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2003857' },
      { title: '항일운동의 역사와 마주하다(순국선열추념탑 조각) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2000725' },
      { title: '안다고 생각했는데 잘 몰랐던 서울 역사명소(순국선열·호국영령, 15만 명) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2008154' },
      { title: '“독립운동가들의 고통 전해져”(1988 사적 제324호) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1220148' }
    ]
  };
})();
