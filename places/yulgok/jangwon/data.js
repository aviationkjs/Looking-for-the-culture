/* 파주 율곡 이이 유적 · 아홉 번 장원급제 — 장면 글, 그림, 퀴즈 */
(() => {
  const { person, text, svg } = window.ART;
  const ORANGE = '#b5651d';

  // 꼬마 율곡 (작은 실루엣, 갓 없이)
  const kid = (x, y, d, cls = 'a-pop') => `<g transform="translate(${x} ${y})"><g class="${cls}" style="--d:${d}s" fill="#5a4a7a">
    <circle cy="-24" r="6"/><rect x="-6" y="-18" width="12" height="18" rx="5"/></g></g>`;
  // 두루마리 종이
  const scroll = (x, y, w, h, d, lines = 3) => `<g class="a-pop" style="--d:${d}s"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fbf3dc" stroke="#b49a6a" stroke-width="2"/>
    ${Array.from({ length: lines }, (_, i) => `<rect x="${x + w / 2 - 3 + (i - (lines - 1) / 2) * 16}" y="${y + 10}" width="5" height="${h - 20}" rx="2" fill="#5a4a3a"/>`).join('')}</g>`;

  // 1. 여덟 살에 지은 시
  const S1 = svg('', `<rect width="400" height="240" fill="#fdf2e4"/>
    <path d="M0 170 Q120 130 240 160 T400 150 V240 H0Z" fill="#e8c08a"/>
    <path d="M0 200 Q200 180 400 205 V240 H0Z" fill="#8fb8d8"/>
    <g class="a-drop" style="--d:.3s"><rect x="60" y="120" width="70" height="50" fill="none" stroke="#8a5a3a" stroke-width="4"/>
      <path d="M44 124 Q95 96 146 124 L134 112 Q95 90 56 112Z" fill="#5a3b2e"/></g>
    ${kid(95, 168, .8)}
    ${scroll(200, 70, 110, 90, 1.4, 5)}
    ${text(255, 54, '8살에 지은 시', 22, ORANGE, 'a-pop', 2)}
    ${['🍁', '🍂', '🍁'].map((e, i) => `<text class="a-rise" style="--d:${1 + i * .8}s" x="${170 + i * 60}" y="210" font-size="20">${e}</text>`).join('')}`);

  // 2. 13살에 첫 시험 합격
  const S2 = svg('', `<rect width="400" height="240" fill="#fff8ec"/>
    ${kid(120, 180, .3)}
    <g class="a-pop" style="--d:.8s"><rect x="80" y="70" width="80" height="60" rx="6" fill="#fffef8" stroke="#c9b99a" stroke-width="2"/>
      <path d="M94 88h52M94 100h52M94 112h36" stroke="#5a4a3a" stroke-width="3"/></g>
    <g class="a-pop" style="--d:1.6s"><circle cx="270" cy="110" r="50" fill="#f2b705"/><circle cx="270" cy="110" r="40" fill="#ffd34d"/>
      <text x="270" y="120" text-anchor="middle" font-size="28" font-weight="900" fill="#8a5a00">합격</text></g>
    ${text(200, 40, '13살, 첫 시험 합격!', 24, ORANGE, 'a-pop', 2.2)}`);

  // 3. 과거시험이란?
  const S3 = svg('', `<rect width="400" height="240" fill="#f6efe2"/><rect y="190" width="400" height="50" fill="#d9c7a0"/>
    <g class="a-fade" style="--d:.2s"><rect x="120" y="60" width="160" height="40" fill="#5a3b2e"/><text x="200" y="87" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">과거 시험장</text></g>
    ${[50, 110, 170, 230, 290, 350].map((x, i) => `${person(x, 186, '#6b4a3a', false, .6 + i * .15)}
      <rect class="a-fade" style="--d:${1 + i * .15}s" x="${x - 14}" y="186" width="28" height="10" fill="#fbf3dc" stroke="#b49a6a"/>`).join('')}
    ${text(200, 140, '나랏일 할 사람을 뽑는 시험', 20, ORANGE, 'a-pop', 2)}`);

  // 4. 아홉 번 1등! (트로피 아홉 개가 차례로)
  const cup = (x, y, d) => `<g class="a-pop" style="--d:${d}s"><path d="M${x - 12} ${y} h24 v10 a12 12 0 0 1 -24 0 Z" fill="#f2b705" stroke="#a07400" stroke-width="1.5"/>
    <rect x="${x - 3}" y="${y + 21}" width="6" height="8" fill="#a07400"/><rect x="${x - 9}" y="${y + 29}" width="18" height="5" fill="#a07400"/></g>`;
  const S4 = svg('', `<rect width="400" height="240" fill="#fff6e8"/>
    ${Array.from({ length: 9 }, (_, i) => cup(60 + (i % 5) * 70, 80 + Math.floor(i / 5) * 60, .3 + i * .3)).join('')}
    ${text(330, 180, '9번!', 40, ORANGE, 'a-pop', 3.2)}
    ${text(200, 44, '아홉 번이나 1등', 26, ORANGE, 'a-pop', 3.6)}`);

  // 5. 구도장원공 — 꾸준히 공부한 사람
  const S5 = svg('', `<rect width="400" height="240" fill="#f6f1fa"/>
    <g class="a-pop" style="--d:.3s"><rect x="110" y="70" width="180" height="56" rx="10" fill="${ORANGE}"/>
      <text x="200" y="106" text-anchor="middle" font-size="26" font-weight="900" fill="#fff">구도장원공</text></g>
    ${text(200, 150, '아홉 번 장원한 어른', 18, '#5a3b2e', 'a-fade', 1)}
    ${[0, 1, 2].map(i => `<g class="a-pop" style="--d:${1.6 + i * .3}s"><rect x="${120 + i * 56}" y="${180 - i * 10}" width="48" height="${12 + i * 10}" fill="${['#c97a3a', '#d98c4a', '#e9a05a'][i]}" stroke="#8a5a2a"/></g>`).join('')}
    ${kid(320, 200, 2.4, 'a-jump')}
    ${text(200, 44, '꾸준히 공부했어요', 24, ORANGE, 'a-pop', 2.8)}`);

  window.TOUR_DATA = {
    id: 'yulgok-jangwon',
    name: '아홉 번 장원급제',
    theme: { main: ORANGE },
    intro: '율곡 이이는 시험에서 아홉 번이나 1등을 했어요. 율곡기념관에서 율곡의 이야기를 찾아봐요.',
    cover: S4,

    scenes: [
      { id: 1, title: '여덟 살에 지은 시', sec: 22, art: S1,
        lines: ['율곡은 여덟 살 때', '화석정에 올라', '가을 풍경을 보고 시를 지었어요.'] },
      { id: 2, title: '열세 살, 첫 합격', sec: 20, art: S2,
        lines: ['열세 살에는', '어른들이 보는 시험에', '합격했어요.'] },
      { id: 3, title: '과거 시험이 뭐예요?', sec: 22, art: S3,
        lines: ['과거는 나랏일을 할 사람을', '뽑는 시험이에요.', '1등을 ‘장원’이라고 했어요.'] },
      { id: 4, title: '아홉 번이나 1등', sec: 22, art: S4,
        lines: ['율곡은 스물아홉 살까지', '시험에서 아홉 번이나', '장원(1등)을 했어요.'] },
      { id: 5, title: '구도장원공', sec: 22, art: S5,
        lines: ['그래서 ‘아홉 번 장원한 어른’,', '구도장원공이라고 불렸어요.', '꾸준히 공부한 덕분이에요.'] }
    ],

    questions: [
      { id: 'ylgj-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '율곡이 시를 지은 나이는?',
        options: ['여덟 살', '스무 살', '쉰 살'], answer: 0,
        explanation: '여덟 살 때 화석정에서 시를 지었어요.' },
      { id: 'ylgj-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '과거 시험에서 1등을 부르는 말은?',
        options: ['반장', '장원', '대장'], answer: 1,
        explanation: '과거 시험 1등을 ‘장원’이라고 했어요.' },
      { id: 'ylgj-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '율곡이 장원을 한 횟수는?',
        options: ['한 번', '세 번', '아홉 번'], answer: 2,
        explanation: '아홉 번이나 장원을 했어요.' },
      { id: 'ylgj-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '과거는 나랏일을 할 사람을 뽑는 시험이에요.',
        options: ['O', 'X'], answer: 0,
        explanation: '과거에 합격하면 나랏일을 맡았어요.' },
      { id: 'ylgj-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '율곡의 별명 ‘구도장원공’은 무슨 뜻일까요?',
        options: ['아홉 개의 집', '아홉 번 장원한 어른', '아홉 살 꼬마'], answer: 1,
        explanation: '‘구도’는 아홉 번, ‘장원’은 1등이라는 뜻이에요.' },
      { id: 'ylgj-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '율곡은 어른이 되어서야 처음 시험에 합격했어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '열세 살에 벌써 시험에 합격했어요.' }
    ],

    sources: [
      { title: '율곡정신문화진흥원에 거는 기대(8세 화석정 시, 29세까지 아홉 번 장원) — 경기일보', url: 'https://kyeonggi.com/article/20240905580304' },
      { title: '율곡 구도장원공 행차 재현을 기대하며 — 경기일보', url: 'https://kyeonggi.com/article/20250715580257' },
      { title: '성균관대학교 역사(이이: 8세 화석정 시, 13세 진사시 합격) — 성균관대학교', url: 'https://www.skku.edu/skku/about/s620/sub06_02.do' }
    ]
  };
})();
