/* 서대문형무소 · 수형기록표가 말해요 (고학년) — 전시관 2층 벽을 채운 약 5,000장의 기록 카드 */
(() => {
  const { person, girl, heart, text, svg } = window.ART;
  const C = '#5a4a6e';
  const ROOM = '<rect width="400" height="240" fill="#2f2b36"/><rect y="206" width="400" height="34" fill="#4a4452"/>';
  // 작은 기록 카드 하나 (얼굴 없는 실루엣 + 글줄)
  const card = (x, y, d, s = 1, hi) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="a-pop" style="--d:${d}s">
    <rect width="30" height="38" rx="2" fill="${hi ? '#fff6d8' : '#e8e2d4'}" stroke="${hi ? '#ffcf3f' : 'none'}" stroke-width="2"/>
    <rect x="4" y="4" width="12" height="15" fill="#8a8478"/><circle cx="10" cy="9" r="3.4" fill="#c9c2b2"/>
    <path d="M19 6H27M19 11H27M19 16H25M4 24H26M4 29H26M4 34H18" stroke="#8a8478" stroke-width="1.6"/></g></g>`;
  const wall = (d0 = 0, cols = 11, rows = 4) => Array.from({ length: cols * rows }, (_, i) =>
    card(14 + (i % cols) * 34, 14 + Math.floor(i / cols) * 44, d0 + (i % 7) * .08 + Math.floor(i / cols) * .15)).join('');
  // 확대한 큰 카드 (항목 표시)
  const big = (x, y, d, labels) => `<g class="a-pop" style="--d:${d}s">
    <rect x="${x}" y="${y}" width="190" height="150" rx="6" fill="#f3eee2"/>
    <rect x="${x + 14}" y="${y + 14}" width="60" height="74" fill="#8a8478"/><circle cx="${x + 44}" cy="${y + 40}" r="15" fill="#c9c2b2"/>
    <path d="M${x + 26} ${y + 88}Q${x + 44} ${y + 58} ${x + 62} ${y + 88}Z" fill="#c9c2b2"/>
    ${labels.map((t, i) => `<g class="a-fade" style="--d:${d + .6 + i * .4}s"><rect x="${x + 86}" y="${y + 16 + i * 30}" width="92" height="22" rx="4" fill="${C}"/>
      <text x="${x + 132}" y="${y + 32 + i * 30}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">${t}</text></g>`).join('')}
    <path d="M${x + 14} ${y + 112}H${x + 176}M${x + 14} ${y + 130}H${x + 150}" stroke="#a9a293" stroke-width="3"/></g>`;

  // 1. 벽을 가득 채운 카드
  const S1 = svg('', `${ROOM}${wall(.1)}${person(200, 232, '#d8cfe6', false, 1.6)}
    <g class="a-pop" style="--d:2.2s"><rect x="110" y="188" width="180" height="40" rx="10" fill="${C}"/></g>
    ${text(200, 215, '약 5,000장', 24, '#ffe9a8', 'a-pop', 2.4)}`);

  // 2. 카드에 적힌 것: 사진·이름·나이·주소
  const S2 = svg('', `<rect width="400" height="240" fill="#ece7f2"/>${big(105, 40, .2, ['이름', '나이', '주소'])}
    ${text(200, 222, '붙잡혔을 때 찍은 사진', 17, C, 'a-pop', 2.4)}`);

  // 3. 저마다 다른 사람들
  const who = [['#6a8a5a', '농민'], ['#8a5a4a', '학생'], ['#4a6a8a', '선생님'], ['#8a7a4a', '상인'], ['#7a4a6a', '종교인']];
  const S3 = svg('', `<rect width="400" height="240" fill="#f3f0e8"/><rect y="196" width="400" height="44" fill="#ddd6c8"/>
    ${who.map(([c, t], i) => (i % 2 ? girl : person)(50 + i * 75, 196, c, false, .3 + i * .35)
      + `<text class="a-pop" style="--d:${.6 + i * .35}s" x="${50 + i * 75}" y="222" text-anchor="middle" font-size="16" font-weight="800" fill="${c}">${t}</text>`).join('')}
    ${text(200, 60, '나이도 하는 일도 달라요', 22, C, 'a-pop', 2.4)}`);

  // 4. 같은 카드, 두 가지 눈
  const S4 = svg('', `<rect width="200" height="240" fill="#3a3540"/><rect x="200" width="200" height="240" fill="#f6f0dc"/>
    ${card(84, 92, .2, 1.1)}${card(284, 92, .2, 1.1, true)}
    ${text(100, 60, '일제: 죄인', 22, '#d8cfe6', 'a-pop', .8)}${text(300, 60, '우리: 독립운동가', 20, C, 'a-pop', 1.6)}
    ${heart(300, 180, 1.6, '#e06a8a', 'a-pop', 2.2)}`);

  // 5. 나와 비슷한 나이 찾기
  const S5 = svg('', `${ROOM}${wall(0, 11, 3)}${card(185, 150, .9, 1.3, true)}
    <g class="a-pop" style="--d:1.4s"><circle cx="252" cy="160" r="26" fill="none" stroke="#ffcf3f" stroke-width="6"/><path d="M270 178L292 200" stroke="#ffcf3f" stroke-width="8" stroke-linecap="round"/></g>
    ${text(90, 190, '몇 살?', 22, '#ffe9a8', 'a-pop', 2)}${text(320, 230, '어디 살았지?', 18, '#ffe9a8', 'a-pop', 2.4)}`);

  // 6. 추모의 마음
  const S6 = svg('', `${ROOM}${wall(0, 11, 3)}<rect width="400" height="240" fill="#000" class="a-dim" style="--d:.2s"/>
    ${girl(170, 232, '#d8cfe6', false, .8)}${person(230, 232, '#d8cfe6', false, 1)}
    <g class="a-glow" style="--d:1.2s"><circle cx="200" cy="170" r="10" fill="#ffcf3f"/></g>
    ${text(200, 150, '한 사람 한 사람의 이름', 20, '#ffe9a8', 'a-pop', 1.8)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-cards',
    name: '수형기록표가 말해요',
    theme: { main: C },
    level: '고학년',
    intro: '전시관 2층 벽을 가득 채운 작은 카드들, 무엇이 적혀 있을까요? 카드 한 장을 골라 직접 읽어 봐요.',
    cover: S1,
    think: '같은 카드를 일제는 ‘죄인의 기록’으로, 우리는 ‘독립운동가의 기록’으로 봐요. 같은 자료가 왜 이렇게 다르게 읽힐까요?',

    scenes: [
      { id: 1, title: '벽을 채운 카드', sec: 20, art: S1,
        lines: ['전시관 2층에 올라가면', '벽이 작은 카드로 가득해요.', '약 5,000장의 수형기록표예요.'] },
      { id: 2, title: '카드에 적힌 것', sec: 24, art: S2,
        lines: ['카드마다 붙잡혔을 때 찍은 사진과', '이름, 나이, 주소가 적혀 있어요.', '감옥이 갇힌 사람을 관리하려고', '만든 기록이에요.'] },
      { id: 3, title: '저마다 다른 사람들', sec: 22, art: S3,
        lines: ['카드를 보면 나이도, 하는 일도', '저마다 달라요.', '평범한 사람들이 함께', '독립운동에 나섰다는 뜻이에요.'] },
      { id: 4, title: '두 가지 눈', sec: 24, art: S4,
        lines: ['일제는 이 사람들을', '‘죄인’으로 기록했어요.', '하지만 지금 우리는 이 카드를', '나라를 지킨 사람들의 기록으로 봐요.'] },
      { id: 5, title: '카드 탐구하기', sec: 22, art: S5,
        lines: ['카드 한 장을 골라 읽어 봐요.', '몇 살이었을까? 어디 살았을까?', '나와 나이가 비슷한 사람도', '찾을 수 있을지 몰라요.'] },
      { id: 6, title: '이름을 기억해요', sec: 20, art: S6,
        lines: ['이 방은 독립운동가를', '추모하는 공간이에요.', '사진 속 한 사람 한 사람의', '이름을 기억해 주세요.'] }
    ],

    questions: [
      { id: 'sdmc-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '전시관 벽을 채운 수형기록표는 약 몇 장일까요?',
        options: ['약 50장', '약 500장', '약 5,000장', '약 50만 장'], answer: 2,
        explanation: '약 5,000장의 수형기록표가 벽을 채우고 있어요.' },
      { id: 'sdmc-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '수형기록표를 볼 수 있는 곳은?',
        options: ['전시관 2층', '사형장', '취사장', '망루'], answer: 0,
        explanation: '전시관 2층에 수형기록표가 전시되어 있어요.' },
      { id: 'sdmc-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '수형기록표에 적혀 있지 않은 것은?',
        options: ['사진', '나이', '주소', '좋아하는 음식'], answer: 3,
        explanation: '사진, 이름, 나이, 주소 같은 것이 적혀 있어요.' },
      { id: 'sdmc-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '수형기록표는 독립운동가가 스스로 남기려고 만든 기록이에요.',
        options: ['O', 'X'], answer: 1,
        explanation: '감옥이 갇힌 사람을 관리하려고 만든 기록이에요.' },
      { id: 'sdmc-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '카드 속 사람들에 대해 맞는 말은?',
        options: ['모두 군인이었어요', '모두 같은 마을 사람', '나이와 하는 일이 달라요', '모두 어른 남자예요'], answer: 2,
        explanation: '나이도 하는 일도 다른 평범한 사람들이 함께 나섰어요.' },
      { id: 'sdmc-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '일제는 이 사람들을 무엇으로 기록했나요?',
        options: ['죄인', '영웅', '선생님', '손님'], answer: 0,
        explanation: '일제는 ‘죄인’으로 기록했지만, 우리는 독립운동가로 기억해요.' },
      { id: 'sdmc-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '카드를 탐구할 때 가장 알맞은 질문은?',
        options: ['카드 종이 값은?', '그때 몇 살이었을까?', '카드 무게는?', '무슨 펜으로 썼을까?'], answer: 1,
        explanation: '나이와 사는 곳을 읽으면 그 사람의 삶을 떠올릴 수 있어요.' },
      { id: 'sdmc-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '수형기록표가 있는 방은 독립운동가를 추모하는 공간이에요.',
        options: ['O', 'X'], answer: 0,
        explanation: '한 사람 한 사람을 기억하고 추모하는 공간이에요.' }
    ],

    sources: [
      { title: '임시정부 수립 기념일에 찾은 서대문형무소역사관(민족저항실2, 약 5,000장) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2013973' },
      { title: '서대문형무소…나라 빼앗긴 참담함(수형기록표: 사진·나이·주소) — 주간경향', url: 'https://weekly.khan.co.kr/article/201502171046501' },
      { title: '서대문에 특별한 곳이?(2층 수감자 조사표 전시) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/193561' }
    ]
  };
})();
