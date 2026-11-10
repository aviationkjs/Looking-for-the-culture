/* 인사동 · 한글 간판 찾기 — 장면 글, 그림, 퀴즈 */
(() => {
  const { person, girl, heart, text, svg } = window.ART;
  const BLUE = '#3a5a8b';

  // 가게 (x, 폭, 간판 글자, 간판 색, 지연)
  const shop = (x, w, label, color, d, cls = 'a-drop') => `<g class="${cls}" style="--d:${d}s">
    <rect x="${x}" y="100" width="${w}" height="96" fill="#f6f1e7" stroke="#a49a88"/>
    <rect x="${x + 6}" y="108" width="${w - 12}" height="26" rx="4" fill="${color}"/>
    <text x="${x + w / 2}" y="127" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">${label}</text>
    <rect x="${x + 10}" y="144" width="${w - 20}" height="34" fill="#cfe3ee" stroke="#a49a88"/></g>`;
  const street = `<rect width="400" height="240" fill="#eef4f8"/><rect y="196" width="400" height="44" fill="#d9cdb6"/>`;

  // 1. 간판을 찾아봐요 (돋보기)
  const S1 = svg('', `${street}
    ${shop(10, 120, '찻집', '#2f6f6a', .2)}${shop(140, 120, '옛 그림', '#8b3a2b', .5)}${shop(270, 120, '도자기', '#8a6a2b', .8)}
    <g class="a-pop" style="--d:1.6s"><circle cx="200" cy="60" r="30" fill="#ffffff" fill-opacity=".6" stroke="#3a3a3a" stroke-width="6"/>
      <path d="M222 82 L250 110" stroke="#3a3a3a" stroke-width="10" stroke-linecap="round"/></g>
    ${person(100, 226, '#3a5a8b', false, 2)}${girl(300, 226, '#7a4a5a', false, 2.2)}`);

  // 2. 영어 대신 한글 (영어 간판이 한글로 바뀜)
  const S2 = svg('', `${street}
    <g class="a-out" style="--d:1.8s">${shop(40, 140, 'COFFEE', '#3a3a3a', .2, 'a-fade')}${shop(220, 140, 'BAKERY', '#3a3a3a', .4, 'a-fade')}</g>
    ${shop(40, 140, '커피', '#2f6f6a', 2.6, 'a-pop')}${shop(220, 140, '빵집', '#8a6a2b', 2.8, 'a-pop')}
    ${text(200, 60, '영어 대신 한글로!', 26, BLUE, 'a-pop', 3.4)}`);

  // 3. 세계에서 처음 (2001년, 커피 가게)
  const S3 = svg('', `<rect width="400" height="240" fill="#f4f7fb"/>
    <circle class="a-pop" style="--d:.3s" cx="200" cy="120" r="86" fill="#dbe8f5" stroke="#9ab4cf" stroke-width="3"/>
    <path class="a-fade" style="--d:.5s" d="M114 120 H286 M200 34 V206 M134 70 Q200 100 266 70 M134 170 Q200 140 266 170" stroke="#9ab4cf" stroke-width="2" fill="none"/>
    <g class="a-pop" style="--d:1.4s"><rect x="150" y="92" width="100" height="56" rx="8" fill="#2f6f6a"/>
      <text x="200" y="128" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">커피</text></g>
    <text class="a-pop" style="--d:2s" x="270" y="80" font-size="34">⭐</text>
    ${text(200, 30, '세계에서 처음!', 24, BLUE, 'a-pop', 2.4)}${text(200, 232, '2001년', 22, '#5a4a3a', 'a-pop', 2.8)}`);

  // 4. 왜 한글일까? (가게 사람들이 함께 정함 → 하트)
  const S4 = svg('', `${street}
    ${shop(20, 110, '한지', '#8b3a2b', .2)}${shop(145, 110, '떡집', '#2f6f6a', .3)}${shop(270, 110, '붓 가게', '#4a4a4a', .4)}
    ${[70, 200, 325].map((x, i) => person(x, 226, '#6b4a3a', true, 1 + i * .2)).join('')}
    ${heart(200, 66, 2.2, '#e0457b', 'a-pop', 2)}
    ${text(200, 30, '옛 거리의 멋을 지켜요', 20, BLUE, 'a-pop', 2.4)}`);

  // 5. 간판 찾기 놀이 (체크 표시가 하나씩)
  const S5 = svg('', `${street}
    ${shop(10, 120, '찻집', '#2f6f6a', 0, 'a-fade')}${shop(140, 120, '그림', '#8b3a2b', 0, 'a-fade')}${shop(270, 120, '한복', '#8a6a2b', 0, 'a-fade')}
    ${[70, 200, 330].map((x, i) => `<g class="a-pop" style="--d:${1 + i * .7}s"><circle cx="${x}" cy="88" r="16" fill="#2e7d4f"/>
      <path d="M${x - 7} 88 l5 6 l10 -12" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>`).join('')}
    ${text(200, 40, '몇 개 찾았나요?', 26, BLUE, 'a-pop', 3.2)}`);

  window.TOUR_DATA = {
    id: 'insadong-sign',
    name: '한글 간판 찾기',
    theme: { main: BLUE },
    intro: '인사동 가게 간판에는 비밀이 있어요. 인사동길을 걸으며 한글 간판을 찾아봐요!',
    cover: S1,

    scenes: [
      { id: 1, title: '간판을 찾아봐요', sec: 20, art: S1,
        lines: ['인사동길을 걸으며', '가게 간판을', '하나씩 살펴봐요.'] },
      { id: 2, title: '영어 대신 한글', sec: 22, art: S2,
        lines: ['다른 곳에서는 영어로 쓰는', '가게 이름도', '여기서는 한글로 쓴 곳이 많아요.'] },
      { id: 3, title: '세계에서 처음', sec: 22, art: S3,
        lines: ['2001년, 인사동의 한 커피 가게가', '세계에서 처음으로', '한글 간판을 달았어요.'] },
      { id: 4, title: '왜 한글일까?', sec: 22, art: S4,
        lines: ['옛 거리의 멋을 지키려고', '가게 사람들이', '스스로 한글 간판을 달았어요.'] },
      { id: 5, title: '간판 찾기 놀이', sec: 22, art: S5,
        lines: ['한글 간판을 몇 개 찾았나요?', '가족과 함께', '하나씩 세어 봐요!'] }
    ],

    questions: [
      { id: 'isds-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '인사동 간판에서 많이 볼 수 있는 글자는?',
        options: ['영어', '한글', '숫자'], answer: 1,
        explanation: '인사동에는 한글로 쓴 간판이 많아요.' },
      { id: 'isds-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '세계에서 처음 한글 간판을 단 커피 가게가 있는 곳은?',
        options: ['부산', '제주', '인사동'], answer: 2,
        explanation: '2001년, 인사동의 커피 가게가 처음이었어요.' },
      { id: 'isds-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '인사동 가게들은 스스로 한글 간판을 달았어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '누가 시켜서가 아니라 가게 사람들이 스스로 정했어요.' },
      { id: 'isds-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '한글 간판을 다는 까닭은?',
        options: ['옛 거리의 멋을 지키려고', '글자가 싸서', '비가 와서'], answer: 0,
        explanation: '전통 거리의 멋을 지키려는 마음이에요.' },
      { id: 'isds-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '처음 한글 간판을 단 해는?',
        options: ['1950년', '2001년', '2020년'], answer: 1,
        explanation: '2001년이에요.' },
      { id: 'isds-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '인사동 가게는 모두 영어 간판만 써요.',
        options: ['O', 'X'], answer: 1,
        explanation: '영어 대신 한글로 쓴 간판이 많아요.' }
    ],

    sources: [
      { title: '인사동 한글 간판, 강제 아닌 자율이다(2001년 세계 최초) — 한경비즈니스', url: 'https://magazine.hankyung.com/business/article/201705084307b' },
      { title: '여행하듯 인사동 데이트 즐겨요(프랜차이즈 한글 간판) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2008194' }
    ]
  };
})();
