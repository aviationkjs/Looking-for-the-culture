/* 서대문형무소 — 장면 글, 그림(SVG), 퀴즈 데이터
 * 형식 설명은 저장소의 README.md 「data.js 형식」을 보세요. */
(() => {
  const { person } = window.ART;
  const BRICK = window.ART.brick();
  const FLAG = window.ART.FLAG;
  const FLOWER = window.ART.FLOWER;

  /* ---------- 장면 그림 (모두 viewBox 0 0 400 240) ---------- */
  const S1 = `<svg viewBox="0 0 400 240"><defs>${BRICK}</defs>
    <rect width="400" height="240" fill="#fdf3e1"/>
    <circle cx="345" cy="48" r="24" fill="#f6c453" class="a-fade"/>
    <rect y="200" width="400" height="40" fill="#d9c49f"/>
    ${[176, 152, 128, 104].map((y, i) => `<rect class="a-drop" style="--d:${.3 + i * .5}s" x="110" y="${y}" width="200" height="24" fill="url(#brk)"/>`).join('')}
    <polygon class="a-drop" style="--d:2.3s" points="102,104 210,80 318,104" fill="#5a3b2e"/>
    <rect class="a-drop" style="--d:2.6s" x="58" y="92" width="34" height="108" fill="url(#brk)"/>
    <polygon class="a-drop" style="--d:2.9s" points="52,94 75,66 98,94" fill="#5a3b2e"/>
    ${[128, 160, 244, 276].map((x, i) => `<path class="a-pop" style="--d:${3.1 + i * .15}s" d="M${x} 150v-14a8 8 0 0 1 16 0v14z" fill="#3a2a22"/>`).join('')}
    <path class="a-pop" style="--d:3.7s" d="M196 200v-22a14 14 0 0 1 28 0v22z" fill="#3a2a22"/>
    <text class="a-pop" style="--d:3.9s" x="200" y="52" text-anchor="middle" font-size="40" font-weight="800" fill="#8b3a2b">1908</text></svg>`;

  const S2 = `<svg viewBox="0 0 400 240"><defs>${BRICK}<clipPath id="gate"><rect x="150" y="120" width="100" height="80"/></clipPath></defs>
    <rect width="400" height="240" fill="#e9eef2"/>
    <circle cx="320" cy="60" r="28" fill="#f6c453"/>
    <g fill="#9aa3ab"><g class="a-drift" style="--d:.5s"><ellipse cx="300" cy="64" rx="62" ry="22"/><ellipse cx="338" cy="50" rx="42" ry="20"/></g></g>
    <rect y="200" width="400" height="40" fill="#cfc2a8"/>
    <rect x="40" y="96" width="320" height="104" fill="url(#brk)"/>
    <rect x="40" y="88" width="320" height="10" fill="#5a3b2e"/>
    <rect x="150" y="120" width="100" height="80" fill="#2f2622"/>
    ${person(178, 196, '#e8d3b0', false, 1.2)}${person(200, 196, '#e8d3b0', false, 1.6)}${person(222, 196, '#e8d3b0', false, 2)}
    <g clip-path="url(#gate)">
      <rect class="a-shutL" style="--d:3.2s" x="150" y="120" width="50" height="80" fill="#5a3b2e" stroke="#3a2a22" stroke-width="2"/>
      <rect class="a-shutR" style="--d:3.2s" x="200" y="120" width="50" height="80" fill="#5a3b2e" stroke="#3a2a22" stroke-width="2"/>
    </g>
    <rect class="a-dim" style="--d:1s" width="400" height="240" fill="#1c1a24"/></svg>`;

  const flagPole = (x, y, d) => `<g transform="translate(${x} ${y})"><rect x="-3" width="4" height="150" fill="#6b4a3a"/>
    <g class="a-pop" style="--d:${d}s"><use href="#tg" width="90" height="60" class="a-wave" style="--d:${d + .6}s"/></g></g>`;
  const S3 = `<svg viewBox="0 0 400 240"><defs>${FLAG}</defs>
    <rect width="400" height="240" fill="#fff6e6"/>
    <rect y="196" width="400" height="44" fill="#e3d2b0"/>
    ${flagPole(50, 40, .4)}${flagPole(165, 22, 1)}${flagPole(280, 40, 1.6)}
    ${[30, 75, 120, 200, 245, 330, 370].map((x, i) => person(x, 200, '#6b4a3a', true, (i % 3) * .3 + 2)).join('')}
    <text class="a-pop" style="--d:2.6s" x="200" y="230" text-anchor="middle" font-size="26" font-weight="800" fill="#8b3a2b">대한독립 만세!</text></svg>`;

  const S4 = `<svg viewBox="0 0 400 240"><defs>${BRICK}<clipPath id="win"><rect x="140" y="40" width="120" height="110" rx="6"/></clipPath></defs>
    <rect width="400" height="240" fill="#2b211c"/>
    <rect width="400" height="240" fill="url(#brk)" opacity=".3"/>
    <g clip-path="url(#win)"><rect x="140" y="40" width="120" height="110" fill="#3b2f28"/>
      <circle class="a-glow" style="--d:1s" cx="200" cy="95" r="70" fill="#ffd76a"/></g>
    ${[160, 180, 200, 220, 240].map(x => `<rect x="${x - 2.5}" y="40" width="5" height="110" fill="#5c4a40"/>`).join('')}
    <rect x="140" y="92" width="120" height="5" fill="#5c4a40"/>
    <text class="a-rise" style="--d:2.4s" x="200" y="200" text-anchor="middle" font-size="26" font-weight="800" fill="#ffd76a">대한독립 만세!</text>
    <text class="a-rise" style="--d:3.9s" x="95" y="200" text-anchor="middle" font-size="18" font-weight="800" fill="#ffd76a">만세!</text>
    <text class="a-rise" style="--d:4.8s" x="310" y="200" text-anchor="middle" font-size="18" font-weight="800" fill="#ffd76a">만세!</text></svg>`;

  const { flower } = window.ART;
  const S5 = `<svg viewBox="0 0 400 240"><defs>${BRICK}${FLOWER}</defs>
    <rect width="400" height="240" fill="#dff0f7"/>
    <circle class="a-pop" style="--d:1.4s" cx="70" cy="56" r="26" fill="#f6c453"/>
    <rect y="196" width="400" height="44" fill="#b9d98c"/>
    <rect x="110" y="112" width="180" height="84" fill="url(#brk)"/>
    <polygon points="102,114 200,90 298,114" fill="#5a3b2e"/>
    <rect x="160" y="124" width="80" height="24" rx="4" fill="#fffaf1"/>
    <text x="200" y="142" text-anchor="middle" font-size="15" font-weight="800" fill="#5a3b2e">역사관</text>
    <path d="M188 196v-22a12 12 0 0 1 24 0v22z" fill="#3a2a22"/>
    ${flower(60, 208, 2, 30)}${flower(104, 222, 2.3, 24)}${flower(300, 218, 2.6, 26)}${flower(344, 206, 2.9, 32)}${flower(250, 228, 3.2, 22)}${flower(150, 230, 3.4, 22)}
    <text class="a-pop" style="--d:3.8s" x="268" y="60" text-anchor="middle" font-size="26" font-weight="800" fill="#8b3a2b">우리가 기억해요</text>
    <rect class="a-bright" style="--d:.3s" width="400" height="240" fill="#2b211c" pointer-events="none"/></svg>`;

  /* ---------- 데이터 ---------- */
  window.TOUR_DATA = {
    id: 'seodaemun',
    name: '서대문형무소',
    theme: { main: '#8b3a2b' },
    intro: '1908년에 지어진 빨간 벽돌 감옥이에요. 나라를 사랑한 사람들의 이야기를 만나 봐요.',
    cover: S1,

    scenes: [
      { id: 1, title: '빨간 벽돌 감옥', sec: 22, art: S1,
        lines: ['아주 오래전 1908년,', '서울에 큰 감옥이 생겼어요.', '빨간 벽돌로 지은 감옥이에요.'] },
      { id: 2, title: '나라를 지키려던 사람들', sec: 22, art: S2,
        lines: ['그때 일본이 우리나라를 빼앗으려 했어요.', '나라를 지키려던 사람들이 여기에 갇혔어요.'] },
      { id: 3, title: '대한독립 만세!', sec: 25, art: S3,
        lines: ['1919년, 사람들이 태극기를 들고', '“대한독립 만세!”를 외쳤어요.', '그래서 아주 많은 사람이 여기에 갇혔어요.'] },
      { id: 4, title: '감옥 안에서도 만세', sec: 22, art: S4,
        lines: ['유관순 열사는 감옥 안에서도', '동무들과 함께 만세를 불렀어요.', '무서워도 포기하지 않았어요.'] },
      { id: 5, title: '기억하는 곳', sec: 22, art: S5,
        lines: ['지금은 감옥이 아니라 역사관이에요.', '우리는 여기서 그분들을 기억해요.'] }
    ],

    // 형식은 family-trip 저장소의 quiz.json 과 같고, scene(근거 장면 번호)만 더 있어요
    questions: [
      { id: 'sdm-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '감옥 건물은 무엇으로 지었을까요?',
        options: ['나무', '빨간 벽돌', '유리'], answer: 1,
        explanation: '빨간 벽돌로 지어서 지금도 빨간 건물이에요.' },
      { id: 'sdm-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '이 감옥을 지은 나라는 어디일까요?',
        options: ['일본', '중국', '미국'], answer: 0,
        explanation: '우리나라를 빼앗으려던 일본이 지었어요.' },
      { id: 'sdm-q3', ageGroup: 'CHILD', difficulty: 'EASY', scene: 3,
        text: '1919년, 사람들이 손에 들고 만세를 부른 것은?',
        options: ['풍선', '꽃', '태극기'], answer: 2,
        explanation: '태극기를 들고 “대한독립 만세!”를 외쳤어요.' },
      { id: 'sdm-q4', ageGroup: 'CHILD', difficulty: 'EASY', scene: 4,
        text: '유관순 열사는 감옥 안에서도 만세를 불렀어요.',
        options: ['O', 'X'], answer: 0,
        explanation: '갇혀서도 포기하지 않고 만세를 불렀어요.' },
      { id: 'sdm-q5', ageGroup: 'CHILD', difficulty: 'EASY', scene: 2,
        text: '여기에 갇힌 사람들은 모두 나쁜 일을 한 사람들이에요.',
        options: ['O', 'X'], answer: 1,
        explanation: '나라를 되찾으려고 애쓴 분들이 많이 갇혔어요.' },
      { id: 'sdm-q6', ageGroup: 'CHILD', difficulty: 'EASY', scene: 5,
        text: '지금 이곳은 무엇이 되었을까요?',
        options: ['놀이공원', '학교', '역사관'], answer: 2,
        explanation: '지금은 역사를 기억하는 서대문형무소역사관이에요.' }
    ],

    // 어른용 참고 자료 (시작 화면 아래에 접혀서 보여요)
    sources: [
      { title: '수난의 현장, 서대문형무소를 찾다 — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2000948' },
      { title: '독립운동가들의 고통 전해져 — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1220148' },
      { title: '우리가 형무소를 가봐야 하는 이유 — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/843398' },
      { title: '유관순 열사 순국 추모제 — 아주경제', url: 'https://www.ajunews.com/view/20140926100054384' }
    ]
  };
})();
