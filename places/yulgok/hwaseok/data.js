/* 파주 율곡 이이 유적 · 화석정의 비밀 — 장면 글, 그림, 퀴즈
 * 기둥에 기름을 먹였다는 이야기는 '전해 오는 이야기'로, 별 관측은 '연구 결과'로 구분해 씀 */
(() => {
  const { person, text, svg } = window.ART;
  const NAVY = '#2c4a7a';

  // 언덕 위 정자 (밤/낮 색 지정)
  const pavilion = (d = 0, roof = '#3e3e3e', post = '#8a5a3a') => `<g class="a-drop" style="--d:${d}s">
    <rect x="150" y="104" width="100" height="10" fill="${roof}"/>
    <path d="M128 108 Q200 70 272 108 L258 94 Q200 62 142 94Z" fill="${roof}"/>
    ${[160, 186, 214, 240].map(x => `<rect x="${x - 3}" y="114" width="6" height="40" fill="${post}"/>`).join('')}
    <rect x="146" y="152" width="108" height="8" fill="${post}"/></g>`;
  const hill = (c1, c2) => `<path d="M0 160 Q120 120 200 160 T400 150 V240 H0Z" fill="${c1}"/>
    <path d="M0 205 Q200 185 400 210 V240 H0Z" fill="${c2}"/>`;

  // 1. 임진강 언덕 위 정자
  const S1 = svg('', `<rect width="400" height="240" fill="#e6f1f8"/>${hill('#9cc27a', '#6fa3c9')}
    ${pavilion(.3)}
    <g class="a-pop" style="--d:1.4s"><text x="80" y="80" font-size="26">🌸</text><text x="300" y="86" font-size="26">🪨</text></g>
    ${text(200, 40, '화석정 = 꽃(화) + 돌(석)', 20, NAVY, 'a-pop', 2)}
    ${text(330, 228, '임진강', 15, '#fff', 'a-fade', 1)}`);

  // 2. 밤하늘에 나타난 새 별
  const stars = [[40, 40], [90, 70], [130, 30], [300, 40], [350, 80], [250, 60], [60, 110], [330, 120]];
  const S2 = svg('', `<rect width="400" height="240" fill="#1c2540"/>${hill('#2f3f2a', '#22344f')}
    ${pavilion(0, '#151515', '#4a3a2a')}
    ${stars.map(([x, y], i) => `<circle class="a-fade" style="--d:${.2 + i * .1}s" cx="${x}" cy="${y}" r="1.8" fill="#fff"/>`).join('')}
    <circle class="a-glow" style="--d:1.4s" cx="200" cy="40" r="22" fill="#ffe38a"/>
    <circle class="a-pop" style="--d:1.2s" cx="200" cy="40" r="7" fill="#fff"/>
    ${person(200, 150, '#c9b6e8', false, .8)}
    ${text(200, 226, '1572년, 새로 나타난 밝은 별', 16, '#ffe38a', 'a-pop', 2.2)}`);

  // 3. 다른 나라보다 먼저 적었을지도 (날짜 줄 위에 차례로)
  const S3 = svg('', `<rect width="400" height="240" fill="#f3f6fb"/>
    <path class="a-fade" style="--d:.2s" d="M30 140 H370" stroke="#5a5a5a" stroke-width="4" stroke-linecap="round"/>
    ${[['율곡', 70, '#6a4c93', '첫째 날', .6], ['명나라', 190, '#8b3a2b', '2일 뒤', 1.4], ['덴마크', 330, '#3a5a8b', '5일 뒤', 2.2]].map(([n, x, c, t, d]) => `
      <g class="a-pop" style="--d:${d}s"><circle cx="${x}" cy="140" r="14" fill="${c}"/>
      <text x="${x}" y="110" text-anchor="middle" font-size="18" font-weight="800" fill="${c}">${n}</text>
      <text x="${x}" y="178" text-anchor="middle" font-size="15" font-weight="800" fill="#5a5a5a">${t}</text></g>`).join('')}
    <text class="a-pop" style="--d:2.8s" x="70" y="82" text-anchor="middle" font-size="26">⭐</text>
    ${text(200, 40, '누가 먼저 적었을까?', 22, NAVY, 'a-pop', 3)}
    ${text(200, 220, '율곡이 가장 먼저!', 20, '#6a4c93', 'a-pop', 3.4)}`);

  // 4. 전해 오는 이야기: 기둥에 기름칠
  const S4 = svg('', `<rect width="400" height="240" fill="#fff6e8"/>${hill('#c9b48a', '#8fb8d8')}
    ${pavilion(.2)}
    ${[163, 189, 211, 237].map((x, i) => `<rect class="a-fade" style="--d:${.8 + i * .3}s" x="${x - 4}" y="114" width="8" height="40" fill="#e0a830" opacity=".8"/>`).join('')}
    <g class="a-pop" style="--d:2s"><ellipse cx="320" cy="150" rx="18" ry="12" fill="#a0785a"/><rect x="312" y="128" width="16" height="12" fill="#7a5a40"/></g>
    ${text(200, 40, '기둥에 기름을 발라 두었대요', 20, NAVY, 'a-pop', 2.4)}`);

  // 5. 어두운 밤, 길을 밝힌 불빛 (전해 오는 이야기)
  const S5 = svg('', `<rect width="400" height="240" fill="#151b2e"/>${hill('#26301f', '#1b2a44')}
    <circle class="a-glow" style="--d:.3s" cx="200" cy="120" r="80" fill="#ffb347"/>
    ${pavilion(0, '#2a1a10', '#5a3a1a')}
    ${[175, 200, 225].map((x, i) => `<path class="a-jump" style="--d:${.4 + i * .2}s" d="M${x} 100 q-10 -20 0 -40 q10 20 0 40z" fill="#ffcf4a"/>`).join('')}
    <g class="a-fade" style="--d:1.6s"><path d="M60 216 h70 l-10 10 h-50z" fill="#6b4a3a"/>${person(95, 214, '#c9b6e8', false, 1.8)}</g>
    ${text(200, 34, '밤길을 밝혀 강을 건넜대요', 20, '#ffe38a', 'a-pop', 2.4)}`);

  window.TOUR_DATA = {
    id: 'yulgok-hwaseok',
    name: '화석정의 비밀',
    theme: { main: NAVY },
    intro: '임진강이 내려다보이는 언덕 위 정자, 화석정에는 별 이야기와 옛이야기가 숨어 있어요.',
    cover: S1,

    scenes: [
      { id: 1, title: '언덕 위 정자', sec: 20, art: S1,
        lines: ['임진강이 내려다보이는 언덕에', '‘화석정’이라는 정자가 있어요.', '율곡이 자주 머물던 곳이에요.'] },
      { id: 2, title: '새로 나타난 별', sec: 24, art: S2,
        lines: ['1572년 어느 밤,', '율곡은 화석정에서', '새로 나타난 밝은 별을 보고 적었어요.'] },
      { id: 3, title: '가장 먼저 적었을지도', sec: 24, art: S3,
        lines: ['같은 별을 다른 나라에서도 봤는데,', '율곡의 기록이 며칠 더 빨랐다는', '연구가 나왔어요.'] },
      { id: 4, title: '기둥에 바른 기름', sec: 22, art: S4,
        lines: ['전해 오는 이야기가 있어요.', '율곡은 정자 기둥과 마루에', '기름을 발라 두었대요.'] },
      { id: 5, title: '밤길을 밝힌 불빛', sec: 24, art: S5,
        lines: ['훗날 전쟁 때 임금이 밤에 강을 건널 때,', '정자에 불을 붙여 길을 밝혔대요.', '앞날을 내다본 지혜였다고 해요.'] }
    ],

    questions: [
      { id: 'ylgh-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '화석정에서 내려다보이는 강은?',
        options: ['한강', '임진강', '낙동강'], answer: 1,
        explanation: '화석정은 임진강이 보이는 언덕에 있어요.' },
      { id: 'ylgh-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '율곡이 화석정에서 보고 적은 것은?',
        options: ['무지개', '새로 나타난 밝은 별', '큰 배'], answer: 1,
        explanation: '1572년, 새로 나타난 밝은 별을 보고 적었어요.' },
      { id: 'ylgh-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '율곡의 별 기록이 다른 나라보다 빨랐다는 연구가 있어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '다른 나라 기록보다 며칠 빨랐다는 연구가 나왔어요.' },
      { id: 'ylgh-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '전해 오는 이야기에서 율곡이 기둥에 발라 둔 것은?',
        options: ['물감', '꿀', '기름'], answer: 2,
        explanation: '기둥과 마루에 기름을 발라 두었대요.' },
      { id: 'ylgh-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '‘화석정’의 ‘화’와 ‘석’은 무슨 뜻일까요?',
        options: ['꽃과 돌', '불과 물', '해와 달'], answer: 0,
        explanation: '‘화’는 꽃, ‘석’은 돌이라는 뜻이에요.' },
      { id: 'ylgh-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '전해 오는 이야기에서 정자의 불빛은 임금의 밤길을 밝혀 주었어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '불빛 덕분에 어두운 밤에 강을 건넜다고 전해져요.' }
    ],

    sources: [
      { title: '파주 이이 유적과 화석정(8세 시, 기름 이야기) — 고양신문', url: 'https://www.mygoyang.com/news/articleView.html?idxno=91111' },
      { title: '율곡 이이, 유럽보다 먼저 초신성 관측…세계 최초 가능성 — 경기일보', url: 'https://kyeonggi.com/article/20251226580057' },
      { title: '율곡 객성 기록, 명나라·티코 브라헤보다 앞서 — 경기일보', url: 'https://www.kyeonggi.com/article/20260201580293' },
      { title: '화석정 1920년대 원형 복원 논란(6·25 소실, 1966 복원) — 경기일보', url: 'https://kyeonggi.com/article/201801240966421' }
    ]
  };
})();
