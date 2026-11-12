/* 동작구 양녕대군 · 숭례문 글씨의 주인 (고학년) — 장면 글, 그림, 퀴즈
 * ‘양녕대군 글씨’는 많이 알려진 설이고, 빛나는 도랑 이야기는 전해 오는 이야기로 구분해 써요. */
(() => {
  const { text, svg } = window.ART;
  const BROWN = '#6b3e26';
  const BG = '<rect width="400" height="240" fill="#f7f3e3"/>';

  // 세로 현판 (x 가운데, y 위)
  const board = (x, y, d, cls = 'a-pop', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="${cls}" style="--d:${d}s">
    <rect x="-24" y="0" width="48" height="110" rx="4" fill="#2a2420" stroke="#c9a77a" stroke-width="4"/>
    ${['崇', '禮', '門'].map((c, i) => `<text x="0" y="${32 + i * 32}" text-anchor="middle" font-size="24" font-weight="800" fill="#f2d36b">${c}</text>`).join('')}</g></g>`;
  // 숭례문 (x 가운데, y 바닥)
  const gate = (x, y, d) => `<g class="a-fade" style="--d:${d}s">
    <rect x="${x - 120}" y="${y - 50}" width="240" height="50" fill="#d9d4c7"/><path d="M${x - 26} ${y} V${y - 30} Q${x} ${y - 50} ${x + 26} ${y - 30} V${y}Z" fill="#5a4a3a"/>
    <rect x="${x - 90}" y="${y - 90}" width="180" height="40" fill="#b5543a"/>
    <path d="M${x - 115} ${y - 90} Q${x} ${y - 104} ${x + 115} ${y - 90} L${x + 80} ${y - 116} H${x - 80}Z" fill="#4a4a52"/>
    <path d="M${x - 95} ${y - 116} Q${x} ${y - 128} ${x + 95} ${y - 116} L${x + 64} ${y - 140} H${x - 64}Z" fill="#4a4a52"/></g>`;

  // 1. 명필
  const S1 = svg('', `${BG}
    <g class="a-drop" style="--d:.3s"><rect x="60" y="80" width="280" height="130" rx="6" fill="#fffaf1" stroke="#e6dcb8" stroke-width="2"/></g>
    <path class="a-fade" style="--d:1s" d="M110 120 Q160 100 200 140 T290 130" fill="none" stroke="#2a2420" stroke-width="10" stroke-linecap="round"/>
    <g class="a-pop" style="--d:1.6s"><rect x="300" y="60" width="10" height="80" rx="4" fill="#8a5a3a" transform="rotate(30 305 100)"/></g>
    ${text(200, 190, '명필 = 글씨를 아주 잘 쓰는 사람', 16, BROWN, 'a-fade', 2.2)}
    ${text(200, 44, '양녕대군은 명필이었어요', 22, BROWN, 'a-pop', 2.6)}`);

  // 2. 숭례문과 현판
  const S2 = svg('', `<rect width="400" height="240" fill="#e8f0f5"/>${gate(200, 230, .2)}${board(200, 26, 1.2, 'a-drop', .62)}
    <g class="a-pop" style="--d:2s"><rect x="250" y="40" width="130" height="50" rx="10" fill="#fff" stroke="${BROWN}" stroke-width="2"/>
      <text x="315" y="62" text-anchor="middle" font-size="14" font-weight="800" fill="${BROWN}">현판 = 건물 이름을</text>
      <text x="315" y="80" text-anchor="middle" font-size="14" font-weight="800" fill="${BROWN}">써 건 널빤지</text></g>`);

  // 3. 많이 알려진 설, 확실한 증거는 없음
  const S3 = svg('', `${BG}${board(120, 60, .2)}
    <g class="a-pop" style="--d:1s"><rect x="190" y="70" width="180" height="40" rx="20" fill="${BROWN}"/>
      <text x="280" y="96" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">양녕대군이 썼다?</text></g>
    <g class="a-wave" style="--d:1.6s"><text x="280" y="160" text-anchor="middle" font-size="44" font-weight="800" fill="#c9a77a">? ?</text></g>
    ${text(280, 205, '확실한 증거는 없어요', 16, '#3a3320', 'a-fade', 2.2)}
    ${text(200, 40, '가장 많이 알려진 설', 22, BROWN, 'a-pop', 2.6)}`);

  // 4. 전해 오는 이야기: 밤마다 빛나는 도랑
  const S4 = svg('', `<rect width="400" height="240" fill="#1f2a44"/>
    <circle class="a-fade" style="--d:.3s" cx="330" cy="50" r="18" fill="#f6e7a8"/>
    <path d="M0 190 Q100 170 200 190 T400 185 V240 H0Z" fill="#2c3a5c"/>
    <g class="a-glow" style="--d:1.2s"><ellipse cx="200" cy="196" rx="60" ry="16" fill="#f2d36b" opacity=".7"/></g>
    <g class="a-fade" style="--d:2s">${board(200, 110, 0, 'a-fade', .6)}</g>
    <g class="a-pop" style="--d:2.6s"><rect x="110" y="20" width="180" height="34" rx="17" fill="#f2d36b"/>
      <text x="200" y="43" text-anchor="middle" font-size="15" font-weight="800" fill="#3a3320">전해 오는 이야기</text></g>`);

  // 5. 2008년 화재
  const flame = (x, d) => `<path class="a-wave" style="--d:${d}s" d="M${x} 110 Q${x - 14} 86 ${x} 62 Q${x + 14} 86 ${x} 110Z" fill="#e8743b"/>`;
  const S5 = svg('', `<rect width="400" height="240" fill="#f3e9e2"/>${gate(200, 230, .1)}
    ${[150, 200, 250].map((x, i) => flame(x, .8 + i * .2)).join('')}
    <g class="a-pop" style="--d:1.8s"><rect x="20" y="20" width="110" height="44" rx="10" fill="${BROWN}"/>
      <text x="75" y="49" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">2008년</text></g>
    ${text(270, 46, '불이 나 크게 부서졌어요', 17, '#3a3320', 'a-fade', 2.2)}`);

  // 6. 지덕사 탁본으로 복원
  const S6 = svg('', `${BG}
    <g class="a-pop" style="--d:.2s"><rect x="50" y="60" width="120" height="150" fill="#fffaf1" stroke="#e6dcb8" stroke-width="2"/>
      ${['崇', '禮', '門'].map((c, i) => `<text x="110" y="${108 + i * 40}" text-anchor="middle" font-size="30" font-weight="800" fill="#fffaf1" stroke="#2a2420" stroke-width="1">${c}</text>`).join('')}</g>
    <g class="a-jump" style="--d:1s"><circle cx="200" cy="110" r="16" fill="#2a2420"/><rect x="196" y="70" width="8" height="30" fill="#8a5a3a"/></g>
    <path class="a-fade" style="--d:1.6s" d="M215 140 H270 M262 132 L274 140 L262 148" fill="none" stroke="${BROWN}" stroke-width="4"/>
    ${board(320, 70, 2.2, 'a-pop', .9)}
    ${text(200, 36, '탁본을 보고 다시 만들었어요', 20, BROWN, 'a-pop', 2.8)}
    ${text(110, 228, '지덕사의 탁본', 14, '#3a3320', 'a-fade', 1.2)}`);

  window.TOUR_DATA = {
    id: 'yangnyeong-hyeonpan',
    name: '숭례문 글씨의 주인',
    theme: { main: BROWN },
    level: '고학년',
    intro: '숭례문에 걸린 ‘崇禮門’ 세 글자는 누가 썼을까요? 사실과 전해 오는 이야기를 나누어 살펴봐요.',
    cover: S2,
    think: '확실하지 않은 이야기를 친구에게 전할 때는 어떻게 말하면 좋을까요? “~라고 전해져” 처럼 말해 봐요.',

    scenes: [
      { id: 1, title: '명필 양녕대군', sec: 22, art: S1,
        lines: ['양녕대군은 글씨를 아주 잘 쓴', '명필로 이름났어요.', '시도 잘 지었다고 해요.'] },
      { id: 2, title: '숭례문의 현판', sec: 24, art: S2,
        lines: ['숭례문은 서울의 남쪽 큰 문,', '남대문이에요.', '현판은 건물 이름을 써서', '걸어 둔 널빤지예요.'] },
      { id: 3, title: '누가 썼을까?', sec: 26, art: S3,
        lines: ['숭례문 글씨는 양녕대군이', '썼다는 설이 가장 유명해요.', '하지만 확실한 증거는 없고', '다른 사람이라는 의견도 있어요.'] },
      { id: 4, title: '빛나는 도랑', sec: 28, art: S4,
        lines: ['전해 오는 이야기예요.', '임진왜란 때 현판을 잃었는데,', '광해군 때 도랑에서 밤마다', '빛이 나 파 보니 현판이었대요.'] },
      { id: 5, title: '2008년의 불', sec: 24, art: S5,
        lines: ['2008년 숭례문에 불이 나', '크게 부서졌어요.', '현판도 떨어져 망가졌어요.'] },
      { id: 6, title: '탁본으로 되살리기', sec: 28, art: S6,
        lines: ['탁본은 종이를 대고 먹으로', '두드려 글씨를 본뜬 거예요.', '지덕사에 있던 탁본을 참고해', '현판을 다시 만들었어요.'] }
    ],

    questions: [
      { id: 'ynh-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '‘명필’은 어떤 사람을 말할까요?',
        options: ['글씨를 아주 잘 쓰는 사람', '그림을 잘 그리는 사람', '노래를 잘 부르는 사람', '활을 잘 쏘는 사람'], answer: 0,
        explanation: '명필은 글씨를 아주 잘 쓰는 사람이에요.' },
      { id: 'ynh-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '‘현판’은 무엇일까요?',
        options: ['궁궐의 지붕', '건물 이름을 써서 건 널빤지', '임금의 도장', '성문의 자물쇠'], answer: 1,
        explanation: '현판에는 건물의 이름이 쓰여 있어요.' },
      { id: 'ynh-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '“도랑에서 밤마다 빛이 나 파 보니 현판이 나왔다.” 이 이야기는?',
        options: ['기록으로 확인된 사실', '전해지는 이야기'], answer: 1,
        explanation: '사람들 사이에 전해 오는 이야기(전설)예요.' },
      { id: 'ynh-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '숭례문 글씨를 양녕대군이 쓴 것은 100% 확실해요.',
        options: ['O', 'X'], answer: 1,
        explanation: '가장 널리 알려진 설이지만 확실한 증거는 없어요.' },
      { id: 'ynh-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '숭례문에 큰불이 난 해는?',
        options: ['1950년', '1995년', '2008년', '2020년'], answer: 2,
        explanation: '2008년 불이 나 숭례문이 크게 부서졌어요.' },
      { id: 'ynh-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '탁본은 어떻게 만들까요?',
        options: ['사진을 찍어서', '종이를 대고 먹으로 두드려서', '돌에 다시 새겨서', '눈으로 보고 따라 써서'], answer: 1,
        explanation: '종이를 대고 먹을 두드려 글씨 모양을 본떠요.' },
      { id: 'ynh-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '현판을 되살릴 때 참고한 탁본은 어디에 있었을까요?',
        options: ['경복궁', '국립중앙박물관', '지덕사', '서대문형무소'], answer: 2,
        explanation: '양녕대군의 사당인 지덕사에 탁본이 있었어요.' },
      { id: 'ynh-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '“2008년 숭례문에 불이 났다.” 이 문장은?',
        options: ['기록으로 확인된 사실', '전해지는 이야기'], answer: 0,
        explanation: '뉴스와 기록으로 남아 있는 사실이에요.' }
    ],

    sources: [
      { title: '숭례문 현판과 지덕사 탁본 — 서울신문', url: 'https://m.go.seoul.co.kr/news/2018/04/27/20180427019014' },
      { title: '양녕대군과 숭례문 현판 이야기 — 경향신문', url: 'https://www.khan.co.kr/article/201804261556011' },
      { title: '양녕대군 이제 묘역 — 서울특별시 미디어허브', url: 'https://mediahub.seoul.go.kr/archives/1158105' }
    ]
  };
})();
