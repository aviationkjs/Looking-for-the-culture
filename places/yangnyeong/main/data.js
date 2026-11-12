/* 동작구 양녕대군 · 세종대왕의 큰형 (고학년) — 장면 글, 그림, 퀴즈
 * 세자에서 물러난 까닭은 실록 표현을 쉽게 줄여 쓰고, 자세한 사건은 다루지 않아요. */
(() => {
  const { person, text, svg } = window.ART;
  const GOLD = '#8a6400';

  // 궁궐 지붕 건물 (x 가운데, y 바닥, w 너비)
  const hall = (x, y, w, d, cls = 'a-fade') => `<g class="${cls}" style="--d:${d}s">
    <rect x="${x - w / 2 + 10}" y="${y - 50}" width="${w - 20}" height="50" fill="#c9a77a"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${x - w / 2 + 16 + i * (w - 38) / 3}" y="${y - 50}" width="6" height="50" fill="#8a3a2a"/>`).join('')}
    <path d="M${x - w / 2 - 10} ${y - 50} Q${x} ${y - 66} ${x + w / 2 + 10} ${y - 50} L${x + w / 2 - 14} ${y - 78} H${x - w / 2 + 14}Z" fill="#4a4a52"/></g>`;
  // 이름표
  const tag = (x, y, t, fill, d, cls = 'a-pop') => `<g class="${cls}" style="--d:${d}s">
    <rect x="${x - 44}" y="${y - 16}" width="88" height="26" rx="13" fill="${fill}"/>
    <text x="${x}" y="${y + 2}" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">${t}</text></g>`;
  const BG = '<rect width="400" height="240" fill="#f7f3e3"/>';

  // 1. 태종의 세 아들
  const S1 = svg('', `${BG}${hall(200, 140, 220, .2)}<rect y="196" width="400" height="44" fill="#e6dcb8"/>
    ${person(120, 222, '#8a6400', false, 1)}${person(200, 222, '#6b5a2a', false, 1.3)}${person(280, 222, '#6b5a2a', false, 1.6)}
    ${tag(120, 168, '첫째 양녕', GOLD, 1.9)}${tag(200, 168, '둘째 효령', '#6b5a2a', 2.1)}${tag(280, 168, '셋째 충녕', '#6b5a2a', 2.3)}
    ${text(200, 34, '1394년, 태종의 맏아들', 22, GOLD, 'a-pop', 2.7)}`);

  // 2. 1404년 세자
  const S2 = svg('', `${BG}${hall(200, 170, 200, .2)}
    ${person(200, 222, GOLD, true, 1)}
    <g class="a-glow" style="--d:1.4s"><circle cx="200" cy="170" r="40" fill="#f2d36b" opacity=".35"/></g>
    ${tag(200, 66, '1404년 세자', GOLD, 1.8)}
    ${text(200, 34, '임금 자리를 이을 왕자', 22, '#3a3320', 'a-fade', 2.4)}`);

  // 3. 책보다 사냥
  const S3 = svg('', `${BG}
    <g class="a-dim" style="--d:1.6s">${[0, 1, 2].map(i => `<rect x="60" y="${170 - i * 18}" width="90" height="16" rx="3" fill="${['#8a3a2a', '#3a5a8b', '#2f5d50'][i]}"/>`).join('')}
      <text x="105" y="210" text-anchor="middle" font-size="16" font-weight="800" fill="#6b5a2a">공부</text></g>
    <g class="a-pop" style="--d:.6s"><path d="M270 110 Q310 150 270 190" fill="none" stroke="#6b4a3a" stroke-width="5"/>
      <path d="M270 110 V190" stroke="#3a3320" stroke-width="1.5"/><path d="M250 150 H320 M312 144 L322 150 L312 156" fill="none" stroke="#3a3320" stroke-width="3"/>
      <text x="290" y="210" text-anchor="middle" font-size="16" font-weight="800" fill="${GOLD}">사냥·놀이</text></g>
    <g class="a-pop" style="--d:2.2s"><rect x="40" y="22" width="320" height="56" rx="12" fill="#fff" stroke="${GOLD}" stroke-width="2"/>
      <text x="200" y="46" text-anchor="middle" font-size="15" font-weight="800" fill="#3a3320">“학문이 어째서</text>
      <text x="200" y="68" text-anchor="middle" font-size="15" font-weight="800" fill="#3a3320">충녕보다 못하냐” — 태종</text></g>`);

  // 4. 1418년 세자에서 물러남
  const S4 = svg('', `${BG}${hall(200, 180, 200, .1)}
    <g class="a-out" style="--d:1.2s">${person(200, 222, GOLD, false, .2)}</g>
    <g class="a-pop" style="--d:1.6s"><rect x="40" y="22" width="120" height="44" rx="10" fill="#6b5a2a"/>
      <text x="100" y="51" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">1418년</text></g>
    ${text(280, 52, '세자에서 물러나요', 20, '#3a3320', 'a-fade', 2.2)}`);

  // 5. 충녕 → 세종
  const S5 = svg('', `${BG}${hall(200, 170, 200, .2)}
    ${person(200, 222, '#2f5d50', true, .8)}
    ${tag(110, 70, '충녕대군', '#6b5a2a', 1.2)}
    <g class="a-pop" style="--d:1.8s"><path d="M160 66 H230 M222 58 L234 66 L222 74" fill="none" stroke="${GOLD}" stroke-width="4"/></g>
    ${tag(290, 70, '세종', '#2f5d50', 2.2)}
    ${text(200, 32, '셋째가 임금이 되었어요', 22, GOLD, 'a-pop', 2.8)}`);

  // 6. 이천 → 과천 → 서울, 상도동 묘역
  const pin = (x, y, t, d) => `<g class="a-drop" style="--d:${d}s"><circle cx="${x}" cy="${y}" r="9" fill="${GOLD}"/>
    <text x="${x}" y="${y + 28}" text-anchor="middle" font-size="15" font-weight="800" fill="#3a3320">${t}</text></g>`;
  const S6 = svg('', `${BG}
    <path class="a-fade" style="--d:1s" d="M70 100 Q140 60 200 100 T330 100" fill="none" stroke="#c9a77a" stroke-width="4" stroke-dasharray="8 6"/>
    ${pin(70, 100, '이천', .3)}${pin(200, 100, '과천', .6)}${pin(330, 100, '서울', .9)}
    <g class="a-fade" style="--d:1.8s"><ellipse cx="200" cy="206" rx="70" ry="22" fill="#7fa36a"/><ellipse cx="200" cy="200" rx="50" ry="16" fill="#9bbd82"/></g>
    ${text(200, 166, '상도동 묘역 · 1462년', 18, GOLD, 'a-pop', 2.4)}
    ${text(200, 40, '69세에 세상을 떠나요', 22, '#3a3320', 'a-fade', 2.8)}`);

  window.TOUR_DATA = {
    id: 'yangnyeong',
    name: '세종대왕의 큰형',
    theme: { main: GOLD },
    level: '고학년',
    intro: '세종대왕에게는 큰형이 있었어요. 원래 임금이 될 사람이었던 양녕대군을 만나 봐요.',
    cover: S1,
    think: '맏아들이 임금이 되는 것과 가장 뛰어난 사람이 임금이 되는 것, 어느 쪽이 나라에 더 좋을까요? 까닭도 말해 봐요.',

    scenes: [
      { id: 1, title: '태종의 맏아들', sec: 24, art: S1,
        lines: ['양녕대군은 1394년에 태어난', '태종의 맏아들이에요.', '동생으로 효령과 충녕이 있었어요.'] },
      { id: 2, title: '열한 살 세자', sec: 24, art: S2,
        lines: ['1404년 양녕은 세자가 되었어요.', '세자는 다음 임금이 될 왕자예요.', '맏아들이 잇는 것이 원칙이었죠.'] },
      { id: 3, title: '공부보다 사냥', sec: 26, art: S3,
        lines: ['양녕은 공부보다 사냥과', '놀이를 더 좋아했다고 해요.', '태종은 셋째 충녕과 비교하며', '자주 꾸짖었어요.'] },
      { id: 4, title: '1418년의 결정', sec: 26, art: S4,
        lines: ['14년쯤 세자로 지낸 뒤,', '1418년 세자에서 물러났어요.', '실록은 행동이 바르지 못해', '믿음을 잃었다고 적었어요.'] },
      { id: 5, title: '셋째가 임금으로', sec: 24, art: S5,
        lines: ['새 세자는 셋째 충녕대군!', '두 달 뒤 임금이 되었으니', '바로 세종대왕이에요.'] },
      { id: 6, title: '상도동 묘역', sec: 26, art: S6,
        lines: ['양녕은 이천, 과천에서 살다', '서울로 돌아왔어요.', '1462년 69세로 세상을 떠나', '지금의 상도동에 묻혔어요.'] }
    ],

    questions: [
      { id: 'yny-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '양녕대군의 아버지는 누구일까요?',
        options: ['세종', '태조', '태종', '세조'], answer: 2,
        explanation: '양녕대군은 조선 세 번째 임금 태종의 맏아들이에요.' },
      { id: 'yny-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '양녕대군이 세자에서 물러난 해는?',
        options: ['1404년', '1418년', '1392년', '1446년'], answer: 1,
        explanation: '1404년에 세자가 되었고 1418년에 물러났어요.' },
      { id: 'yny-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '태종이 양녕과 비교하며 “학문이 어째서 ○○보다 못하냐”고 한 사람은?',
        options: ['효령대군', '충녕대군', '태조', '세조'], answer: 1,
        explanation: '공부를 잘한 셋째 충녕대군과 자주 비교했어요.' },
      { id: 'yny-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '충녕대군은 임금이 되어 어떤 이름으로 불릴까요?',
        options: ['세종', '세조', '성종', '정조'], answer: 0,
        explanation: '충녕대군이 바로 한글을 만든 세종대왕이에요.' },
      { id: 'yny-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '양녕대군은 14년쯤 세자로 지냈어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '1404년부터 1418년까지, 14년쯤이에요.' },
      { id: 'yny-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '양녕대군 다음으로 세자가 된 사람은?',
        options: ['효령대군', '충녕대군', '양녕의 아들', '태종의 동생'], answer: 1,
        explanation: '둘째 효령이 아니라 셋째 충녕대군이 세자가 되었어요.' },
      { id: 'yny-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '‘세자’는 어떤 사람일까요?',
        options: ['임금의 동생', '나라의 장군', '절의 스님', '임금의 자리를 이을 왕자'], answer: 3,
        explanation: '세자는 다음 임금이 될 왕자예요.' },
      { id: 'yny-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '양녕대군 묘역은 어디에 있을까요?',
        options: ['서울 종로구', '경기 파주', '강원 강릉', '서울 동작구 상도동'], answer: 3,
        explanation: '서울 동작구 상도동, 지덕사와 함께 있어요.' }
    ],

    sources: [
      { title: '양녕대군 — 한국민족문화대백과사전', url: 'https://encykorea.aks.ac.kr/Article/E0054116' },
      { title: '양녕대군 이제 묘역 — 서울특별시 미디어허브', url: 'https://mediahub.seoul.go.kr/archives/1153353' },
      { title: '세자 자리를 물려준 양녕대군 이야기 — 주간경향', url: 'https://weekly.khan.co.kr/article/202204291535111' }
    ]
  };
})();
