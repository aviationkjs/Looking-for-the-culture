/* 서대문형무소 · 독립문 이야기 — 장면 글, 그림, 퀴즈 */
(() => {
  const { stone, FLAG, FLOWER, flower, person, text, svg } = window.ART;
  const OLIVE = '#5b6b3a';

  // 독립문 (가운데 x=200, 바닥 y=200). d = 쌓이기 시작 지연초, flags = 현판 옆 태극기
  const gate = (d = 0, flags = true) => `
    ${[176, 152, 128, 104, 80].map((y, i) => `<g class="a-drop" style="--d:${d + i * .35}s">
      <rect x="130" y="${y}" width="140" height="24" fill="url(#stn)"/></g>`).join('')}
    <g class="a-drop" style="--d:${d + 1.8}s"><rect x="122" y="64" width="156" height="16" fill="#cfc8b8" stroke="#a9a293"/>
      <rect x="164" y="84" width="72" height="18" fill="#f3efe4" stroke="#a9a293"/>
      <text x="200" y="98" text-anchor="middle" font-size="12" font-weight="800" fill="#3a3a3a">독립문</text>
      ${flags ? `<use href="#tg" x="140" y="86" width="18" height="12"/><use href="#tg" x="242" y="86" width="18" height="12"/>` : ''}</g>
    <path d="M176 200V146a24 24 0 0 1 48 0V200Z" fill="#3a352c"/>`;

  const park = `<rect width="400" height="240" fill="#e4f1f7"/>
    <rect y="196" width="400" height="44" fill="#b9d98c"/>
    ${[[40, 170], [80, 182], [340, 172], [372, 186]].map(([x, y]) => `<rect x="${x - 3}" y="${y}" width="6" height="${200 - y}" fill="#7a5a3a"/><circle cx="${x}" cy="${y - 6}" r="18" fill="#7fb069"/>`).join('')}`;

  // 1. 형무소 옆 큰 돌문
  const S1 = svg(stone() + FLAG, `${park}${gate(.3)}
    ${text(200, 40, '독립문', 34, OLIVE, 'a-pop', 2.8)}`);

  // 2. 영은문 → 기둥 받침돌만 남음
  const S2 = svg('', `
    <rect width="400" height="240" fill="#f4ecdc"/>
    <rect y="196" width="400" height="44" fill="#d9c49f"/>
    <g class="a-out" style="--d:3s">
      <rect x="150" y="96" width="14" height="96" fill="#b8322a"/><rect x="236" y="96" width="14" height="96" fill="#b8322a"/>
      <rect x="140" y="84" width="120" height="14" fill="#2f6b5a"/>
      <path d="M120 86Q200 50 280 86L270 70Q200 44 130 70Z" fill="#3a3a3a"/>
      ${text(200, 40, '영은문', 28, '#8b3a2b', 'a-pop', .4)}</g>
    <rect x="144" y="182" width="26" height="16" fill="#9a9488"/><rect x="230" y="182" width="26" height="16" fill="#9a9488"/>
    ${text(200, 120, '받침돌 두 개만 남았어요', 18, '#5a3b2e', 'a-pop', 4.4)}`);

  // 3. 모두가 돈을 모았어요 (동전이 상자로)
  const S3 = svg('', `
    <rect width="400" height="240" fill="#fff6e6"/>
    <rect y="196" width="400" height="44" fill="#e3d2b0"/>
    <rect x="170" y="150" width="60" height="46" rx="4" fill="#8b5a2b"/><rect x="186" y="150" width="28" height="5" fill="#3a2a22"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<circle class="a-drop" style="--d:${1 + i * .4}s" cx="${188 + (i % 3) * 12}" cy="${140 - Math.floor(i / 3) * 14}" r="7" fill="#f2b705" stroke="#c48a00"/>`).join('')}
    ${[50, 90, 130, 270, 310, 350].map((x, i) => person(x, 200, '#6b4a3a', i % 2 === 0, .3 + i * .2)).join('')}
    ${text(200, 60, '1897년', 34, OLIVE, 'a-pop', 3.6)}`);

  // 4. 파리 개선문을 닮았어요 + 돌 1,800여 개
  const S4 = svg(stone() + FLAG, `<rect width="400" height="240" fill="#e4f1f7"/><rect y="196" width="400" height="44" fill="#b9d98c"/>
    <g class="a-fade" style="--d:.3s"><rect x="40" y="96" width="90" height="100" fill="#e3dccb" stroke="#b4ab98"/>
      <path d="M70 196V140a15 15 0 0 1 30 0V196Z" fill="#8a8170"/><rect x="34" y="88" width="102" height="10" fill="#cfc8b8"/>
      ${text(85, 76, '파리 개선문', 14, '#5a3b2e', 'a-fade', .6)}</g>
    <g transform="translate(110 0)">${gate(1, true)}</g>
    ${text(310, 40, '돌 1,800여 개', 20, OLIVE, 'a-pop', 3.6)}`);

  // 5. 문 위의 태극기 — 스스로 서는 나라
  const S5 = svg(FLAG + FLOWER, `
    <rect width="400" height="240" fill="#e4f1f7"/>
    <circle class="a-pop" style="--d:.3s" cx="330" cy="50" r="26" fill="#f6c453"/>
    <rect x="60" y="80" width="280" height="110" fill="#e3dccb" stroke="#b4ab98"/>
    <rect x="130" y="108" width="140" height="52" fill="#f3efe4" stroke="#a9a293" stroke-width="2"/>
    <text class="a-pop" style="--d:.8s" x="200" y="144" text-anchor="middle" font-size="30" font-weight="800" fill="#3a3a3a">독립문</text>
    <g class="a-pop" style="--d:1.6s"><use href="#tg" x="74" y="112" width="48" height="32"/></g>
    <g class="a-pop" style="--d:1.9s"><use href="#tg" x="278" y="112" width="48" height="32"/></g>
    <rect y="190" width="400" height="50" fill="#b9d98c"/>
    ${flower(60, 214, 2.6, 28)}${flower(140, 224, 2.9, 22)}${flower(260, 222, 3.2, 24)}${flower(340, 212, 3.5, 30)}
    ${text(150, 52, '스스로 서는 나라', 24, OLIVE, 'a-pop', 3.8)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-gate',
    name: '독립문 이야기',
    theme: { main: OLIVE },
    intro: '서대문형무소역사관 가까이에 있는 큰 돌문, 독립문의 이야기예요. 독립공원 입구에서 찾아봐요.',
    cover: S1,

    scenes: [
      { id: 1, title: '형무소 옆 큰 돌문', sec: 20, art: S1,
        lines: ['역사관 가까이에', '커다란 돌문이 있어요.', '이름은 ‘독립문’이에요.'] },
      { id: 2, title: '원래 있던 영은문', sec: 24, art: S2,
        lines: ['옛날 이 자리에는', '중국 사신을 맞이하던 ‘영은문’이 있었어요.', '지금은 받침돌 두 개만 남았어요.'] },
      { id: 3, title: '모두가 돈을 모았어요', sec: 22, art: S3,
        lines: ['서재필과 독립협회가 앞장서고', '많은 사람이 돈을 모았어요.', '그렇게 1897년에 독립문을 지었어요.'] },
      { id: 4, title: '어디서 본 모양?', sec: 22, art: S4,
        lines: ['프랑스 파리의 개선문을 닮았어요.', '돌 1,800여 개를', '차곡차곡 쌓아 만들었어요.'] },
      { id: 5, title: '스스로 서는 나라', sec: 24, art: S5,
        lines: ['문 위에는 ‘독립문’ 글자와', '태극기가 새겨져 있어요.', '스스로 서는 나라가 되자는 뜻이에요.'] }
    ],

    questions: [
      { id: 'sdmg-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '독립문은 무엇으로 지었을까요?',
        options: ['나무', '돌', '쇠'], answer: 1,
        explanation: '단단한 돌을 차곡차곡 쌓아서 지었어요.' },
      { id: 'sdmg-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '독립문과 닮은 프랑스의 문은?',
        options: ['파리 개선문', '남대문', '광화문'], answer: 0,
        explanation: '프랑스 파리의 개선문을 닮았어요.' },
      { id: 'sdmg-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '독립문을 지을 돈은 어떻게 마련했을까요?',
        options: ['한 사람이 다 냈어요', '많은 사람이 모았어요', '다른 나라가 냈어요'], answer: 1,
        explanation: '많은 사람이 조금씩 돈을 모아 지었어요.' },
      { id: 'sdmg-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '독립문 자리에는 원래 ‘영은문’이 있었어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '영은문을 헐고 그 자리에 독립문을 지었어요.' },
      { id: 'sdmg-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '독립문 위, 글자 옆에 새겨진 것은?',
        options: ['무궁화', '호랑이', '태극기'], answer: 2,
        explanation: '‘독립문’ 글자 양옆에 태극기가 새겨져 있어요.' },
      { id: 'sdmg-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '독립문은 일본에서 독립한 것을 기념해 지었어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '독립문은 1897년, 일본에 나라를 빼앗기기 전에 지었어요. 다른 나라에 기대지 않는 나라가 되자는 뜻이에요.' }
    ],

    sources: [
      { title: '1919, 기미년 그날의 외침이 서려 있는 곳(독립문 1897, 영은문) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2003857' },
      { title: '[사진] 광복의 시간, 서대문독립공원(국민 성금, 화강암 1,800여 개, 태극기) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1503610' },
      { title: '두 바퀴로 떠나는 서울여행 (21) 독립문의 역사와 의미 — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/747441' }
    ]
  };
})();
