/* 서대문형무소 · 감옥 건물의 비밀 — 장면 글, 그림, 퀴즈 */
(() => {
  const { brick, heart, text, svg } = window.ART;
  const BLUE = '#4a5d6e';

  // 위에서 본 옥사 배치: 가운데 중앙사(200,205) + 부채꼴로 뻗은 옥사 세 채
  const ANG = [-48, 0, 48];
  const fan = (anim, extra = '') => `
    <rect width="400" height="240" fill="#efe6d4"/>
    ${ANG.map((a, i) => `<g transform="translate(200 205) rotate(${a})">
      <g class="${anim ? 'a-drop' : ''}" style="--d:${.4 + i * .5}s">
        <rect x="-24" y="-185" width="48" height="150" fill="url(#brk)" stroke="#5a3b2e" stroke-width="2"/>
        ${[-160, -135, -110, -85, -60].map(y => `<path d="M-24 ${y}H-6M6 ${y}H24" stroke="#5a3b2e" stroke-width="1.5"/>`).join('')}
        <rect x="-5" y="-185" width="10" height="150" fill="#d8c9ad"/>
      </g></g>`).join('')}
    <g class="${anim ? 'a-pop' : ''}" style="--d:2s"><circle cx="200" cy="205" r="30" fill="#5a3b2e"/>
      <text x="200" y="210" text-anchor="middle" font-size="13" font-weight="800" fill="#fffaf1">중앙사</text></g>
    ${extra}`;

  // 1. 부채 모양 감옥
  const S1 = svg(brick(), fan(true, `
    ${text(70, 40, '위에서 본', 18, BLUE, 'a-fade', .2)}${text(70, 64, '모습', 18, BLUE, 'a-fade', .2)}
    ${text(330, 50, '옥사 3채', 22, '#8b3a2b', 'a-pop', 2.6)}`));

  // 2. 가운데서 한눈에 → 눈 + 시선
  const S2 = svg(brick(), fan(false, `
    ${ANG.map((a, i) => `<g transform="translate(200 205) rotate(${a})"><path class="a-fade" style="--d:${1 + i * .5}s" d="M0 -32V-180" stroke="#ffcf3f" stroke-width="4" stroke-dasharray="8 6"/></g>`).join('')}
    <g class="a-pop" style="--d:.4s"><ellipse cx="200" cy="205" rx="22" ry="13" fill="#fffaf1"/><circle cx="200" cy="205" r="8" fill="${BLUE}"/><circle cx="203" cy="202" r="2.5" fill="#fff"/></g>
    ${text(330, 50, '한눈에 다 보여요', 18, BLUE, 'a-pop', 2.8)}`));

  // 3. 격벽장: 부채꼴로 벽을 세운 운동장
  const wallAng = [-90, -60, -30, 0, 30, 60, 90];
  const S3 = svg(brick(), `
    <rect width="400" height="240" fill="#e9eef2"/>
    <path d="M40 215A160 160 0 0 1 360 215Z" fill="#d9ccb3"/>
    ${wallAng.map((a, i) => `<g transform="translate(200 215) rotate(${a})"><path class="a-fade" style="--d:${.3 + i * .2}s" d="M0 -26V-160" stroke="#a4473a" stroke-width="7"/></g>`).join('')}
    <path d="M40 215A160 160 0 0 1 360 215" fill="none" stroke="#a4473a" stroke-width="7"/>
    <circle cx="200" cy="215" r="22" fill="${BLUE}"/>
    ${[-75, -45, -15, 15, 45, 75].map((a, i) => {
      const r = 100, x = 200 + r * Math.sin(a * Math.PI / 180), y = 215 - r * Math.cos(a * Math.PI / 180);
      return `<circle class="a-pop" style="--d:${2 + i * .15}s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#6b4a3a"/>
        <g class="a-pop" style="--d:${3.2 + i * .1}s"><circle cx="${(x + 12).toFixed(1)}" cy="${(y - 18).toFixed(1)}" r="9" fill="#fff"/>
        <text x="${(x + 12).toFixed(1)}" y="${(y - 13).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="800" fill="${BLUE}">?</text></g>`;
    }).join('')}
    ${text(200, 34, '격벽장', 26, '#8b3a2b', 'a-pop', .2)}`);

  // 4. 높은 담장과 망루 (밤, 불빛이 좌우로)
  const S4 = svg(brick(), `
    <rect width="400" height="240" fill="#1f2a3a"/>
    <circle cx="70" cy="50" r="18" fill="#f5edd0"/>
    <rect y="215" width="400" height="25" fill="#3a3a3a"/>
    <rect x="0" y="130" width="400" height="85" fill="url(#brk)"/>
    <rect x="0" y="124" width="400" height="8" fill="#5a3b2e"/>
    <rect class="a-drop" style="--d:.4s" x="282" y="70" width="36" height="145" fill="url(#brk)"/>
    <rect class="a-drop" style="--d:.8s" x="272" y="50" width="56" height="24" fill="#5a3b2e"/>
    <polygon class="a-drop" style="--d:1s" points="266,52 300,28 334,52" fill="#3a2a22"/>
    <rect x="290" y="56" width="20" height="12" fill="#ffd76a"/>
    <polygon class="a-sweep" points="300,66 230,215 370,215" fill="#ffd76a" opacity=".35"/>

    ${text(130, 80, '망루', 30, '#ffd76a', 'a-pop', 1.6)}`);

  // 5. 마음은 가둘 수 없어요
  const S5 = svg(brick(), fan(false, `
    ${ANG.map((a, i) => {
      const x = 200 + 120 * Math.sin(a * Math.PI / 180), y = 205 - 120 * Math.cos(a * Math.PI / 180);
      return [0, 1].map(k => heart(x.toFixed(1), (y - 10).toFixed(1), 1.4, '#e0457b', 'a-rise', 1 + i * .5 + k * 1.5)).join('');
    }).join('')}
    <rect class="a-out" style="--d:.2s" width="400" height="240" fill="#2b211c" opacity=".5"/>
    ${text(320, 40, '마음은', 20, '#8b3a2b', 'a-pop', 2.5)}${text(320, 66, '가둘 수 없어요', 20, '#8b3a2b', 'a-pop', 2.8)}`));

  window.TOUR_DATA = {
    id: 'seodaemun-building',
    name: '감옥 건물의 비밀',
    theme: { main: BLUE },
    intro: '감옥 건물은 왜 이런 모양일까요? 역사관의 중앙사, 격벽장, 망루를 찾아보며 비밀을 풀어 봐요.',
    cover: S1,

    scenes: [
      { id: 1, title: '부채 모양 감옥', sec: 20, art: S1,
        lines: ['하늘에서 내려다보면', '옥사 세 채가', '부채처럼 펼쳐져 있어요.'] },
      { id: 2, title: '가운데 건물, 중앙사', sec: 22, art: S2,
        lines: ['가운데 중앙사에 서면', '세 복도가 한눈에 보여요.', '감시하기 쉽게 지은 거예요.'] },
      { id: 3, title: '벽으로 나눈 운동장', sec: 22, art: S3,
        lines: ['밖에서 운동하는 곳도', '벽으로 잘게 나누었어요.', '서로 이야기하지 못하게 하려고요.'] },
      { id: 4, title: '높은 담장과 망루', sec: 22, art: S4,
        lines: ['높은 담장 위에는', '망루가 있었어요.', '높은 곳에서 감옥을 지켜보았어요.'] },
      { id: 5, title: '마음은 가둘 수 없어요', sec: 22, art: S5,
        lines: ['아무리 지켜보아도', '나라를 사랑하는 마음까지는', '가둘 수 없었어요.'] }
    ],

    questions: [
      { id: 'sdmb-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '하늘에서 보면 옥사들은 어떤 모양으로 놓여 있나요?',
        options: ['동그라미', '부채', '한 줄'], answer: 1,
        explanation: '옥사 세 채가 부채처럼 펼쳐져 있어요.' },
      { id: 'sdmb-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '가운데 건물 ‘중앙사’에서는 무엇을 할 수 있었나요?',
        options: ['세 복도를 한눈에 보기', '밥 짓기', '잠자기'], answer: 0,
        explanation: '가운데에 서면 세 복도가 다 보여서 감시하기 쉬웠어요.' },
      { id: 'sdmb-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '운동하는 곳(격벽장)은 벽으로 나뉘어 있었어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '부채 모양으로 벽을 세워 칸을 나누었어요.' },
      { id: 'sdmb-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '운동장을 벽으로 나눈 까닭은 무엇일까요?',
        options: ['햇볕을 막으려고', '비를 막으려고', '이야기를 못 하게 하려고'], answer: 2,
        explanation: '서로 이야기하지 못하게 하려고 벽을 세웠어요.' },
      { id: 'sdmb-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '높은 곳에서 감옥을 지켜보던 곳은?',
        options: ['다락방', '망루', '지하실'], answer: 1,
        explanation: '담장 위 높은 망루에서 감옥을 지켜보았어요.' },
      { id: 'sdmb-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '감시가 심해서 사람들은 나라 사랑하는 마음을 잊었어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '아무리 지켜보아도 그 마음까지 가둘 수는 없었어요.' }
    ],

    sources: [
      { title: '[사진] 광복의 시간, 서대문독립공원(부채꼴 옥사·격벽장) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1503610' },
      { title: '“독립운동가들의 고통 전해져” 서대문형무소역사관(중앙사·망루) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1220148' },
      { title: '수난의 현장, 서대문형무소를 찾다(격벽장) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2000948' }
    ]
  };
})();
