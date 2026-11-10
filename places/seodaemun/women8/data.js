/* 서대문형무소 · 여옥사 8호 감방 — 장면 글, 그림, 퀴즈 */
(() => {
  const { brick, girl, heart, text, svg } = window.ART;
  const PINK = '#b0456e';

  // 감방 안 배경 (어두운 벽 + 바닥 + 문)
  const cell = (num, d = 0) => `
    <rect width="400" height="240" fill="#3b2f2a"/>
    <rect width="400" height="240" fill="url(#brk)" opacity=".25"/>
    <rect y="190" width="400" height="50" fill="#5a4a40"/>
    <rect x="300" y="60" width="70" height="130" fill="#6b5446" stroke="#2a201b" stroke-width="3"/>
    <rect x="318" y="80" width="34" height="20" fill="#2a201b"/>
    <g class="a-pop" style="--d:${d}s"><circle cx="335" cy="130" r="16" fill="#fffaf1"/>
      <text x="335" y="137" text-anchor="middle" font-size="20" font-weight="800" fill="${PINK}">${num}</text></g>`;

  // 1. 여옥사 건물
  const S1 = svg(brick(), `
    <rect width="400" height="240" fill="#fbeef2"/>
    <rect y="196" width="400" height="44" fill="#d9c49f"/>
    <rect class="a-drop" style="--d:.3s" x="80" y="120" width="240" height="76" fill="url(#brk)"/>
    <polygon class="a-drop" style="--d:.8s" points="70,122 200,92 330,122" fill="#5a3b2e"/>
    ${[100, 140, 236, 276].map((x, i) => `<rect class="a-pop" style="--d:${1.2 + i * .15}s" x="${x}" y="140" width="24" height="18" fill="#3a2a22"/>`).join('')}
    <path class="a-pop" style="--d:1.9s" d="M186 196v-24a14 14 0 0 1 28 0v24z" fill="#3a2a22"/>
    <g class="a-pop" style="--d:2.3s"><rect x="160" y="100" width="80" height="18" rx="4" fill="#fffaf1"/>
      <text x="200" y="114" text-anchor="middle" font-size="13" font-weight="800" fill="#5a3b2e">여옥사</text></g>
    ${girl(60, 200, '#7a4a5a', false, 2.8)}${girl(340, 200, '#7a4a5a', false, 3.1)}
    ${text(200, 56, '여자 감옥', 34, PINK, 'a-pop', 3.4)}`);

  // 2. 8호 감방의 일곱 사람
  const S2 = svg(brick(), `${cell(8, .5)}
    ${[60, 95, 130, 165, 200, 235, 270].map((x, i) => girl(x, 190, '#e8c9b4', false, 1.2 + i * .3)).join('')}
    ${text(150, 60, '일곱 사람', 30, '#ffd76a', 'a-pop', 3.6)}`);

  // 3. 하는 일도 나이도 달랐어요 (책 = 학생, 부채 = 기생, 아기 = 엄마)
  const S3 = svg(brick(), `
    <rect width="400" height="240" fill="#fff5f8"/>
    <rect y="196" width="400" height="44" fill="#ecd7df"/>
    ${girl(90, 200, '#7a4a5a', false, .3)}${girl(200, 200, '#7a4a5a', false, .6)}${girl(310, 200, '#7a4a5a', false, .9)}
    <g class="a-pop" style="--d:1.3s"><rect x="74" y="122" width="32" height="22" rx="2" fill="#4a7bd0"/><path d="M90 122v22" stroke="#fff" stroke-width="2"/></g>
    <g class="a-pop" style="--d:1.7s"><path d="M182 144a18 18 0 0 1 36 0z" fill="#e58bb3"/><path d="M200 144l-14-14M200 144v-18M200 144l14-14" stroke="#fff" stroke-width="1.5"/></g>
    <g class="a-pop" style="--d:2.1s"><ellipse cx="310" cy="134" rx="16" ry="11" fill="#f6e3c6"/><circle cx="298" cy="130" r="7" fill="#f6e3c6"/></g>
    ${text(90, 112, '학생', 16, '#5a3b2e', 'a-fade', 1.4)}${text(200, 112, '기생', 16, '#5a3b2e', 'a-fade', 1.8)}${text(310, 112, '아기 엄마', 16, '#5a3b2e', 'a-fade', 2.2)}
    ${heart(200, 60, 2.6, '#e0457b', 'a-pop', 3)}`);

  // 4. 함께 부른 노래
  const S4 = svg(brick(), `${cell(8)}
    ${[90, 130, 170, 210, 250].map((x, i) => girl(x, 190, '#e8c9b4', false, 0, i % 2 ? 'a-jump' : 'a-jump')).join('')}
    ${['♪', '♫', '♪', '♫', '♪'].map((n, i) => `<text class="a-rise" style="--d:${1 + i * .6}s" x="${80 + i * 45}" y="140" font-size="28" fill="#ffd76a">${n}</text>`).join('')}
    ${text(170, 60, '8호 감방의 노래', 26, '#ffd76a', 'a-pop', 1.5)}`);

  // 5. 1주년에 다시 만세 → 다른 방으로 퍼짐
  const S5 = svg(brick(), `
    <rect width="400" height="240" fill="#2b211c"/>
    <rect x="20" y="70" width="360" height="110" fill="url(#brk)"/>
    ${[50, 120, 190, 260, 330].map((x, i) => `<rect x="${x}" y="100" width="30" height="36" fill="#1a1310"/>
      <rect class="a-fade" style="--d:${1 + Math.abs(i - 2) * .8}s" x="${x}" y="100" width="30" height="36" fill="#ffd76a"/>
      <path d="M${x + 10} 100v36M${x + 20} 100v36" stroke="#5c4a40" stroke-width="3"/>`).join('')}
    ${text(205, 92, '8', 16, '#fffaf1', 'a-pop', .5)}
    ${text(200, 215, '대한독립 만세!', 28, '#ffd76a', 'a-pop', 3.4)}
    ${text(200, 50, '1920년 3월 1일', 22, '#fffaf1', 'a-fade', .2)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-women8',
    name: '여옥사 8호 감방',
    theme: { main: PINK },
    intro: '유관순 열사와 같은 방에 있던 여성 독립운동가들의 이야기예요. 역사관의 여옥사에서 8호 감방을 찾아봐요.',
    cover: S1,

    scenes: [
      { id: 1, title: '여자 감옥, 여옥사', sec: 20, art: S1,
        lines: ['서대문형무소에는', '여자들이 갇힌 감옥도 있었어요.', '이름은 ‘여옥사’예요.'] },
      { id: 2, title: '8호 감방의 일곱 사람', sec: 22, art: S2,
        lines: ['만세를 부른 여성 일곱 명이', '8호 감방에 함께 갇혔어요.', '유관순 열사도 그중 한 명이에요.'] },
      { id: 3, title: '서로 달랐지만', sec: 22, art: S3,
        lines: ['학생도, 기생도, 아기 엄마도 있었어요.', '하는 일은 달라도', '나라를 사랑하는 마음은 같았어요.'] },
      { id: 4, title: '함께 부른 노래', sec: 22, art: S4,
        lines: ['좁은 방에서 서로를 위로하며', '함께 노래를 불렀어요.', '‘8호 감방의 노래’로 전해져요.'] },
      { id: 5, title: '다시 외친 만세', sec: 24, art: S5,
        lines: ['만세운동 1년이 되는 날,', '8호 감방에서 다시 만세가 시작됐어요.', '다른 방 사람들도 함께 외쳤어요.'] }
    ],

    questions: [
      { id: 'sdm8-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '여자들이 갇힌 감옥의 이름은 무엇일까요?',
        options: ['여옥사', '중앙사', '공작사'], answer: 0,
        explanation: '여자들이 갇힌 감옥은 ‘여옥사’예요.' },
      { id: 'sdm8-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '유관순 열사가 갇혔던 감방은 몇 호일까요?',
        options: ['3호', '8호', '10호'], answer: 1,
        explanation: '유관순 열사는 여옥사 8호 감방에 있었어요.' },
      { id: 'sdm8-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '8호 감방 사람들은 모두 같은 일을 하던 사람들이었어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '학생, 기생, 아기 엄마처럼 하는 일이 모두 달랐어요.' },
      { id: 'sdm8-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '좁은 방에서 서로를 위로하려고 함께 한 일은?',
        options: ['그림 그리기', '숨바꼭질', '노래 부르기'], answer: 2,
        explanation: '함께 노래를 부르며 힘을 냈어요.' },
      { id: 'sdm8-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '만세운동 1년이 되는 날, 8호 감방에서 다시 시작된 것은?',
        options: ['잔치', '만세', '운동회'], answer: 1,
        explanation: '1920년 3월 1일, 감옥 안에서 다시 만세를 외쳤어요.' },
      { id: 'sdm8-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '8호 감방 사람들은 서로 힘이 되어 주었어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '서로 달랐지만 함께 위로하고 함께 만세를 불렀어요.' }
    ],

    sources: [
      { title: '100년만에 재현된 8호 감방의 노래 — 뉴시스', url: 'https://www.newsis.com/view/NISX20190813_0000739748' },
      { title: '삼월 하늘 가만히 우러러보며 생각합니다(여옥사 복원) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/185313' },
      { title: '1920년 3월 1일 여옥사 8호 감방 만세 — 프레시안', url: 'https://pressian.com/pages/articles/2021080600253497533' }
    ]
  };
})();
