/* 동작구 양녕대군 · 지덕사, 양보를 기리는 집 (고학년) — 장면 글, 그림, 퀴즈
 * ‘미친 척 양보했다’는 이야기는 훨씬 뒤에 나온 것이라 전해 오는 이야기로 다뤄요. */
(() => {
  const { person, text, svg } = window.ART;
  const GREEN = '#2f5d50';
  const BG = '<rect width="400" height="240" fill="#f7f3e3"/>';

  // 사당 (3칸 기와집)
  const shrine = (x, y, d, cls = 'a-fade') => `<g class="${cls}" style="--d:${d}s">
    <rect x="${x - 80}" y="${y - 10}" width="160" height="10" fill="#c9bfa5"/>
    <rect x="${x - 70}" y="${y - 60}" width="140" height="50" fill="#e8dcc0"/>
    ${[0, 1, 2].map(i => `<rect x="${x - 62 + i * 44}" y="${y - 54}" width="36" height="40" fill="#b5543a" opacity=".85"/>`).join('')}
    <path d="M${x - 95} ${y - 60} Q${x} ${y - 74} ${x + 95} ${y - 60} L${x + 60} ${y - 92} H${x - 60}Z" fill="#4a4a52"/></g>`;
  // 위패
  const tablet = (x, y, t, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 14}" y="${y}" width="28" height="70" rx="12" fill="#3a3320"/>
    <text x="${x}" y="${y + 92}" text-anchor="middle" font-size="13" font-weight="800" fill="#3a3320">${t}</text></g>`;

  // 1. 사당과 위패
  const S1 = svg('', `${BG}${shrine(200, 230, .2)}
    <g class="a-pop" style="--d:1.2s"><rect x="40" y="40" width="320" height="100" rx="14" fill="#fff" stroke="${GREEN}" stroke-width="2"/></g>
    ${tablet(160, 52, '양녕대군', 1.6)}${tablet(240, 52, '부인 광산 김씨', 1.9)}
    ${text(200, 30, '사당 = 조상의 위패를 모신 집', 17, GREEN, 'a-pop', 2.4)}`);

  // 2. 1675년 허목의 건의
  const S2 = svg('', `${BG}
    ${person(130, 210, '#6b5a2a', false, .3)}
    <g class="a-pop" style="--d:.9s"><rect x="150" y="100" width="70" height="44" rx="4" fill="#fffaf1" stroke="#c9a77a" stroke-width="2"/>
      <path d="M160 114 H210 M160 124 H205 M160 134 H200" stroke="#6b5a2a" stroke-width="2"/></g>
    <path class="a-fade" style="--d:1.4s" d="M226 122 H270 M262 114 L274 122 L262 130" fill="none" stroke="${GREEN}" stroke-width="4"/>
    ${person(300, 210, GREEN, false, 1.8)}
    ${text(130, 236, '허목', 15, '#3a3320', 'a-fade', 2)}${text(300, 236, '숙종', 15, GREEN, 'a-fade', 2.2)}
    ${text(200, 46, '1675년, 사당을 세워요', 22, GREEN, 'a-pop', 2.6)}`);

  // 3·4. 도저동 → 상도동
  const map = (move, d) => `<g class="a-fade" style="--d:.1s">
    <path d="M40 80 Q200 30 360 80" fill="none" stroke="#c9bfa5" stroke-width="3"/>
    <path d="M0 150 Q100 130 200 150 T400 145" fill="none" stroke="#7fb2d6" stroke-width="10"/>
    <text x="330" y="140" font-size="13" font-weight="800" fill="#3a6a8a">한강</text></g>
    <g class="a-pop" style="--d:.5s"><circle cx="140" cy="100" r="10" fill="${move ? '#c9bfa5' : GREEN}"/>
      <text x="140" y="128" text-anchor="middle" font-size="14" font-weight="800" fill="#3a3320">도저동(남대문 밖)</text></g>
    ${move ? `<path class="a-fade" style="--d:${d}s" d="M150 136 Q180 170 220 192" fill="none" stroke="${GREEN}" stroke-width="4" stroke-dasharray="7 5"/>
    <g class="a-drop" style="--d:${d + .6}s"><circle cx="226" cy="200" r="10" fill="${GREEN}"/>
      <text x="226" y="228" text-anchor="middle" font-size="14" font-weight="800" fill="#3a3320">상도동</text></g>` : ''}`;
  const S3 = svg('', `${BG}${map(false)}<g transform="translate(140 90) scale(.4)">${shrine(0, 0, 1, 'a-pop')}</g>
    ${text(200, 210, '처음 자리는 남대문 밖', 20, GREEN, 'a-pop', 1.8)}`);
  const S4 = svg('', `${BG}${map(true, .9)}
    <g class="a-pop" style="--d:2.2s"><rect x="250" y="20" width="130" height="40" rx="10" fill="${GREEN}"/>
      <text x="315" y="46" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">1912년</text></g>`);

  // 5. 정조가 지은 이름 ‘지덕’
  const S5 = svg('', `${BG}
    <g class="a-pop" style="--d:.3s"><rect x="120" y="40" width="160" height="56" rx="6" fill="#2a2420" stroke="#c9a77a" stroke-width="4"/>
      <text x="200" y="78" text-anchor="middle" font-size="28" font-weight="800" fill="#f2d36b">至德祠</text></g>
    ${person(150, 200, '#6b5a2a', false, 1.2)}
    <g class="a-pop" style="--d:1.6s"><path d="M168 170 H222 M214 162 L226 170 L214 178" fill="none" stroke="${GREEN}" stroke-width="4"/></g>
    ${person(250, 200, GREEN, true, 2)}
    ${text(150, 228, '형 태백', 14, '#3a3320', 'a-fade', 1.4)}${text(250, 228, '동생', 14, '#3a3320', 'a-fade', 2.2)}
    ${text(200, 128, '지덕 = 지극한 덕', 18, GREEN, 'a-fade', 2.6)}`);

  // 6. 지덕사에서 볼 것
  const item = (x, y, ic, t, d) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 56}" y="${y}" width="112" height="96" rx="12" fill="#fff" stroke="${GREEN}" stroke-width="2"/>
    <text x="${x}" y="${y + 44}" text-anchor="middle" font-size="30">${ic}</text>
    <text x="${x}" y="${y + 78}" text-anchor="middle" font-size="13" font-weight="800" fill="#3a3320">${t}</text></g>`;
  const S6 = svg('', `${BG}${item(80, 90, '🪧', '현판 탁본', .3)}${item(200, 90, '📜', '정조의 지덕사기', .7)}${item(320, 90, '🪷', '연못', 1.1)}
    ${text(200, 50, '지덕사에서 찾아봐요', 22, GREEN, 'a-pop', 1.6)}`);

  window.TOUR_DATA = {
    id: 'yangnyeong-jideok',
    name: '지덕사, 양보를 기리는 집',
    theme: { main: GREEN },
    level: '고학년',
    intro: '양녕대군을 모신 사당, 지덕사. 이름에 담긴 ‘양보’의 뜻과 사당이 옮겨 온 길을 따라가 봐요.',
    cover: S5,
    think: '양녕대군이 일부러 양보했다는 이야기는 사실인지 확실하지 않아요. 그런데도 정조는 왜 ‘양보’를 기리는 이름을 붙였을까요?',

    scenes: [
      { id: 1, title: '사당이란?', sec: 24, art: S1,
        lines: ['지덕사는 양녕대군의 사당이에요.', '사당은 조상의 위패를 모시고', '제사를 지내는 집이에요.', '부인 광산 김씨도 함께 모셨어요.'] },
      { id: 2, title: '1675년, 허목의 건의', sec: 24, art: S2,
        lines: ['1675년 숙종 임금 때,', '양녕대군의 외손 허목이', '사당을 세우자고 건의했어요.'] },
      { id: 3, title: '처음 자리', sec: 20, art: S3,
        lines: ['처음 지덕사는 남대문 밖', '도저동에 있었어요.'] },
      { id: 4, title: '1912년, 상도동으로', sec: 22, art: S4,
        lines: ['일제강점기인 1912년,', '지금의 상도동으로 옮겨져', '양녕대군 묘역 곁에 섰어요.'] },
      { id: 5, title: '지극한 덕, 지덕', sec: 30, art: S5,
        lines: ['‘지덕’이란 이름은 정조가 지었어요.', '옛 중국의 태백은 동생에게', '자리를 양보해 ‘지극한 덕’이란', '칭찬을 들었대요.', '효령대군 사당은 청권사예요.'] },
      { id: 6, title: '지덕사에서 볼 것', sec: 24, art: S6,
        lines: ['숭례문 현판 탁본,', '정조가 쓴 지덕사기,', '사당 옆 연못을 찾아봐요.'] }
    ],

    questions: [
      { id: 'ynj-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '‘사당’은 무엇을 하는 곳일까요?',
        options: ['조상의 위패를 모시고 제사 지내는 곳', '왕이 일하는 곳', '아이들이 공부하는 학교', '군사가 지키는 성'], answer: 0,
        explanation: '사당은 조상의 위패를 모시고 제사를 지내는 집이에요.' },
      { id: 'ynj-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '지덕사가 처음 세워진 해는?',
        options: ['1418년', '1592년', '1675년', '1912년'], answer: 2,
        explanation: '1675년 숙종 임금 때 세워졌어요.' },
      { id: 'ynj-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '사당을 세우자고 건의한 양녕대군의 외손은?',
        options: ['이이', '정약용', '허목', '김구'], answer: 2,
        explanation: '외손 허목이 숙종에게 건의했어요.' },
      { id: 'ynj-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '지덕사가 처음 있던 곳은?',
        options: ['남대문 밖 도저동', '경복궁 안', '파주 율곡리', '강화도'], answer: 0,
        explanation: '처음에는 남대문 밖 도저동에 있었어요.' },
      { id: 'ynj-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '지덕사는 1912년 지금의 상도동으로 옮겨졌어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '일제강점기인 1912년에 옮겨졌어요.' },
      { id: 'ynj-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '‘지덕사’라는 이름을 지은 임금은?',
        options: ['세종', '숙종', '정조', '고종'], answer: 2,
        explanation: '정조가 이름을 짓고 지덕사기도 썼어요.' },
      { id: 'ynj-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '‘지덕’이라는 이름에 담긴 옛이야기는?',
        options: ['나라를 지킨 장군 이야기', '글씨를 잘 쓴 선비 이야기', '효도한 아들 이야기', '동생에게 자리를 양보한 형 이야기'], answer: 3,
        explanation: '태백이 동생에게 자리를 양보한 이야기에서 왔어요.' },
      { id: 'ynj-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '둘째 효령대군을 모신 사당의 이름은?',
        options: ['지덕사', '종묘', '자운서원', '청권사'], answer: 3,
        explanation: '효령대군의 사당은 청권사예요.' }
    ],

    sources: [
      { title: '양녕대군(지덕사) — 한국민족문화대백과사전', url: 'https://encykorea.aks.ac.kr/Article/E0054116' },
      { title: '양녕대군 이제 묘역과 지덕사 — 서울특별시 미디어허브', url: 'https://mediahub.seoul.go.kr/archives/1211951' },
      { title: '지덕사와 양녕대군 — 서울신문', url: 'https://m.seoul.co.kr/news/2022/05/16/20220516030014' }
    ]
  };
})();
