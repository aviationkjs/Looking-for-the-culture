/* 인사동 · 3·1운동이 시작된 곳 (태화관 터, 탑골공원) — 장면 글, 그림, 퀴즈 */
(() => {
  const { FLAG, person, text, svg } = window.ART;
  const RED = '#8b3a2b';

  // 한옥 건물 (태화관)
  const hanok = (d = 0) => `<g class="a-drop" style="--d:${d}s">
    <rect x="90" y="110" width="220" height="86" fill="#f3e6cf" stroke="#8a6a4a" stroke-width="2"/>
    <path d="M70 116 Q200 70 330 116 L310 100 Q200 60 90 100 Z" fill="#3e3e3e"/>
    ${[110, 160, 240, 290].map(x => `<rect x="${x - 14}" y="130" width="28" height="36" fill="#d9c7a0" stroke="#8a6a4a"/>`).join('')}
    <rect x="186" y="150" width="28" height="46" fill="#8a6a4a"/>
    <rect x="160" y="96" width="80" height="18" rx="3" fill="#fffaf1" stroke="#8a6a4a"/>
    <text x="200" y="110" text-anchor="middle" font-size="12" font-weight="800" fill="#5a3b2e">태화관</text></g>`;

  // 1. 1919년 3월 1일, 태화관에 모인 사람들
  const S1 = svg('', `<rect width="400" height="240" fill="#f4efe6"/><rect y="196" width="400" height="44" fill="#d9cdb6"/>
    ${hanok(.3)}
    ${[60, 340].map((x, i) => person(x, 222, '#3a3a3a', false, 1.2 + i * .3)).join('')}
    ${text(200, 44, '1919년 3월 1일', 28, RED, 'a-pop', 1.8)}`);

  // 2. 독립선언서 읽기 (두루마리)
  const S2 = svg('', `<rect width="400" height="240" fill="#fff8ec"/>
    <g class="a-pop" style="--d:.4s">
      <rect x="70" y="50" width="260" height="140" fill="#fbf3dc" stroke="#b49a6a" stroke-width="2"/>
      <rect x="62" y="44" width="16" height="152" rx="6" fill="#8a6a4a"/><rect x="322" y="44" width="16" height="152" rx="6" fill="#8a6a4a"/>
      <text x="200" y="86" text-anchor="middle" font-size="22" font-weight="800" fill="#3a2a1a">독립선언서</text>
      ${[110, 130, 150, 170].map(y => `<rect x="100" y="${y}" width="200" height="6" rx="3" fill="#c9b99a"/>`).join('')}</g>
    <g class="a-pop" style="--d:1.6s"><rect x="90" y="198" width="220" height="34" rx="17" fill="${RED}"/>
      <text x="200" y="221" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">우리나라는 독립한 나라다!</text></g>`);

  // 3. 탑골공원에서 만세
  const flagUp = (x, y, d) => `<g transform="translate(${x} ${y})"><rect x="-2" width="3" height="60" fill="#6b4a3a"/>
    <g class="a-pop" style="--d:${d}s"><use href="#tg" width="45" height="30" class="a-wave"/></g></g>`;
  const S3 = svg(FLAG, `<rect width="400" height="240" fill="#e7f1ea"/><rect y="196" width="400" height="44" fill="#c9d8b0"/>
    <g class="a-fade" style="--d:.2s"><rect x="150" y="60" width="100" height="70" fill="#e3dccb" stroke="#a49a88"/><path d="M140 64 Q200 34 260 64 L248 54 Q200 30 152 54Z" fill="#3e3e3e"/>
      <rect x="182" y="90" width="36" height="40" fill="#8a7a62"/><text x="200" y="84" text-anchor="middle" font-size="11" font-weight="800" fill="#3a3a3a">탑골공원</text></g>
    ${flagUp(60, 120, 1)}${flagUp(300, 112, 1.3)}
    ${[30, 70, 110, 150, 190, 230, 270, 310, 350].map((x, i) => person(x, 214, i % 2 ? '#6b4a3a' : '#3a5a8b', true, 1 + (i % 3) * .2)).join('')}
    ${text(200, 34, '대한독립 만세!', 26, RED, 'a-pop', 2.2)}`);

  // 4. 전국으로 퍼진 만세 (점이 퍼짐)
  const S4 = svg('', `<rect width="400" height="240" fill="#f6efe2"/>
    <path d="M190 30 Q230 40 236 70 Q260 90 250 120 Q262 150 240 175 Q230 205 205 215 Q180 222 172 200 Q150 185 160 160 Q140 140 155 120 Q150 95 165 75 Q160 45 190 30Z" fill="#d9e7d0" stroke="#9ab48a" stroke-width="2"/>
    <circle cx="190" cy="95" r="8" fill="${RED}"/>
    ${[[175, 60], [220, 80], [170, 130], [230, 140], [200, 170], [180, 195], [215, 205], [245, 115]].map(([x, y], i) =>
      `<circle class="a-pop" style="--d:${.8 + i * .25}s" cx="${x}" cy="${y}" r="6" fill="#e0457b"/>`).join('')}
    <circle class="a-glow" style="--d:.4s" cx="190" cy="95" r="30" fill="#e0457b" opacity=".3"/>
    ${text(320, 80, '전국으로', 22, RED, 'a-pop', 2.6)}${text(320, 108, '퍼졌어요', 22, RED, 'a-pop', 2.8)}
    ${text(80, 200, '서대문형무소에', 15, '#5a3b2e', 'a-fade', 3.2)}${text(80, 220, '갇히기도 했어요', 15, '#5a3b2e', 'a-fade', 3.4)}`);

  // 5. 지금은 3·1독립선언광장 (표지석 + 나무 + 빛)
  const S5 = svg('', `<rect width="400" height="240" fill="#e8f1f6"/>
    <rect x="0" y="120" width="400" height="120" fill="#cfc6b4"/>
    <rect class="a-fade" style="--d:.3s" x="40" y="40" width="160" height="80" fill="#f0ece2" stroke="#b4ab98"/>
    <text x="120" y="86" text-anchor="middle" font-size="13" font-weight="800" fill="#5a5a5a">태화빌딩</text>
    <g class="a-pop" style="--d:1s"><rect x="230" y="120" width="90" height="70" rx="6" fill="#7a7a7a"/>
      <text x="275" y="150" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">3·1독립선언</text>
      <text x="275" y="168" text-anchor="middle" font-size="12" font-weight="800" fill="#fff">유적지</text></g>
    ${[[70, 170], [120, 180], [170, 168]].map(([x, y], i) => `<g class="a-pop" style="--d:${1.6 + i * .2}s"><rect x="${x - 3}" y="${y}" width="6" height="${200 - y}" fill="#6b4a3a"/><circle cx="${x}" cy="${y - 12}" r="18" fill="#3f7a4a"/></g>`).join('')}
    ${[60, 110, 160, 210, 260, 310, 360].map((x, i) => `<circle class="a-glow" style="--d:${2 + i * .15}s" cx="${x}" cy="222" r="5" fill="#ffd76a"/>`).join('')}
    ${text(270, 50, '3·1독립선언광장', 20, RED, 'a-pop', 2.6)}`);

  window.TOUR_DATA = {
    id: 'insadong-taehwa',
    name: '3·1운동이 시작된 곳',
    theme: { main: RED },
    intro: '1919년 3월 1일, 인사동에서 독립선언서를 읽었어요. 3·1독립선언광장의 표지석을 찾아봐요.',
    cover: S1,

    scenes: [
      { id: 1, title: '태화관에 모인 사람들', sec: 20, art: S1,
        lines: ['1919년 3월 1일,', '인사동 ‘태화관’이라는 곳에', '민족대표들이 모였어요.'] },
      { id: 2, title: '독립선언서', sec: 22, art: S2,
        lines: ['“우리나라는 독립한 나라다!”', '이렇게 쓴 독립선언서를', '함께 읽었어요.'] },
      { id: 3, title: '탑골공원의 만세', sec: 22, art: S3,
        lines: ['가까운 탑골공원에서는', '학생과 시민들이', '“대한독립 만세!”를 외쳤어요.'] },
      { id: 4, title: '전국으로 퍼진 만세', sec: 24, art: S4,
        lines: ['만세 소리는 전국으로 퍼졌어요.', '그래서 많은 사람이', '서대문형무소에 갇히기도 했어요.'] },
      { id: 5, title: '지금은 광장', sec: 22, art: S5,
        lines: ['지금 태화관 자리에는', '‘3·1독립선언광장’이 있어요.', '표지석을 꼭 찾아봐요.'] }
    ],

    questions: [
      { id: 'isdh-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '1919년 3월 1일, 민족대표들이 모인 곳은?',
        options: ['태화관', '경복궁', '남대문'], answer: 0,
        explanation: '인사동의 태화관에 모였어요.' },
      { id: 'isdh-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '민족대표들이 함께 읽은 글은?',
        options: ['동화책', '독립선언서', '편지'], answer: 1,
        explanation: '우리나라가 독립한 나라라고 쓴 독립선언서를 읽었어요.' },
      { id: 'isdh-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '같은 날 학생과 시민들이 만세를 부른 공원은?',
        options: ['어린이대공원', '남산공원', '탑골공원'], answer: 2,
        explanation: '인사동 가까운 탑골공원에서 만세를 외쳤어요.' },
      { id: 'isdh-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '만세운동은 서울에서만 일어났어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '만세 소리는 전국으로 퍼졌어요.' },
      { id: 'isdh-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '지금 태화관 자리에는 3·1독립선언광장이 있어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '광장과 표지석이 그날을 기억하게 해 줘요.' },
      { id: 'isdh-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '3·1운동이 일어난 날은?',
        options: ['8월 15일', '3월 1일', '10월 9일'], answer: 1,
        explanation: '이름처럼 3월 1일이에요. 1919년 3월 1일이었어요.' }
    ],

    sources: [
      { title: '빛으로 다시 태어난 3.1독립선언의 현장(태화관터) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1262527' },
      { title: '서울시, 인사동 태화관터에 3·1독립선언광장 조성 — 뉴시스', url: 'https://www.newsis.com/view/NISX20190814_0000740704' },
      { title: '태화관(낭독 후 연행) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1502264' },
      { title: '탑골공원과 3·1운동 — 한국학술지(KoreaScience)', url: 'https://koreascience.kr/article/CFKO201518459287130.pdf' }
    ]
  };
})();
