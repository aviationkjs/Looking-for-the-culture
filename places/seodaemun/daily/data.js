/* 서대문형무소 · 감옥 안의 하루 (고학년) — 일과·밥·독방·운동·공작사 노역·패통 */
(() => {
  const { brick, person, text, svg } = window.ART;
  const C = '#7a5a2a';
  const IN = '<rect width="400" height="240" fill="#e6dfd2"/><rect y="200" width="400" height="40" fill="#c9bea9"/>';
  // 시계 (h = 시, 0~11)
  const clock = (x, y, h, d, r = 34) => `<g class="a-pop" style="--d:${d}s"><circle cx="${x}" cy="${y}" r="${r}" fill="#fffaf1" stroke="${C}" stroke-width="5"/>
    <path d="M${x} ${y}L${x + r * .5 * Math.sin(h * Math.PI / 6)} ${y - r * .5 * Math.cos(h * Math.PI / 6)}" stroke="${C}" stroke-width="5" stroke-linecap="round"/>
    <path d="M${x} ${y}V${y - r * .78}" stroke="${C}" stroke-width="3" stroke-linecap="round"/></g>`;

  // 1. 아침 6시 ~ 밤 9시
  const S1 = svg('', `<rect width="200" height="240" fill="#fff3d6"/><rect x="200" width="200" height="240" fill="#2f3550"/>
    ${clock(100, 100, 6, .2)}${clock(300, 100, 9, .8)}
    ${text(100, 180, '아침 6시 기상', 20, C, 'a-pop', 1.2)}${text(300, 180, '밤 9시 취침', 20, '#ffe9a8', 'a-pop', 1.6)}
    <circle cx="40" cy="36" r="16" fill="#ffcf3f" class="a-pop" style="--d:.4s"/><path d="M360 26A16 16 0 1 0 372 52A12 12 0 1 1 360 26Z" fill="#ffe9a8" class="a-pop" style="--d:1s"/>`);

  // 2. 콩·보리 덩어리, 소금국, 무장아찌
  const S2 = svg('', `<rect width="400" height="240" fill="#efe6d4"/>
    <g class="a-drop" style="--d:.2s"><ellipse cx="200" cy="170" rx="150" ry="30" fill="#b89a6a"/></g>
    <g class="a-pop" style="--d:.7s"><ellipse cx="120" cy="140" rx="44" ry="30" fill="#d9c48a"/>
      ${[[104, 130], [124, 124], [138, 140], [112, 150], [130, 152], [100, 142]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#8a6a3a"/>`).join('')}</g>
    <g class="a-pop" style="--d:1.2s"><path d="M200 128H264L256 166H208Z" fill="#8a7a6a"/><ellipse cx="232" cy="130" rx="32" ry="7" fill="#d8d0c0"/></g>
    <g class="a-pop" style="--d:1.7s"><rect x="290" y="136" width="18" height="26" rx="4" fill="#e8c86a"/><rect x="312" y="140" width="18" height="22" rx="4" fill="#e8c86a"/></g>
    ${text(120, 100, '콩·보리 덩어리', 17, C, 'a-pop', .9)}${text(232, 100, '소금국', 17, C, 'a-pop', 1.4)}${text(312, 120, '무장아찌', 15, C, 'a-pop', 1.9)}
    ${text(200, 40, '“콩밥 먹는다”', 24, '#a4473a', 'a-pop', 2.4)}`);

  // 3. 한 평도 안 되는 독방, 먹방
  const S3 = svg(brick(), `<rect width="400" height="240" fill="url(#brk)"/>
    <rect x="130" y="40" width="140" height="170" fill="#4a4038" class="a-pop" style="--d:.2s"/>
    ${person(200, 200, '#d8cfbf', false, .8)}
    <rect x="130" y="40" width="140" height="170" fill="#000" class="a-dim" style="--d:1.4s"/>
    <g class="a-pop" style="--d:2.2s"><rect x="120" y="12" width="160" height="28" rx="8" fill="#1e1a18"/></g>
    ${text(200, 33, '먹처럼 깜깜한 방', 18, '#ffe9a8', 'a-pop', 2.3)}`);

  // 4. 하루 10분 운동, 따로따로
  const S4 = svg(brick(), `${IN}${[60, 140, 220, 300].map((x, i) => `<rect x="${x + 70}" y="70" width="8" height="130" fill="url(#brk)"/>
    ${person(x + 34, 196, '#5a6a7a', false, .3 + i * .3)}`).join('')}
    ${clock(200, 44, 0, 1.6, 24)}${text(300, 40, '10분!', 26, '#a4473a', 'a-pop', 2)}${text(90, 40, '말하면 안 돼요', 16, C, 'a-pop', 2.4)}`);

  // 5. 공작사: 감옥 안 공장, 전쟁 물자
  const S5 = svg('', `${IN}<path class="a-fade" style="--d:.1s" d="M30 200V90L100 60V90L170 60V90L240 60V90L310 60V200Z" fill="#c89a6a"/>
    <rect x="320" y="40" width="20" height="160" fill="#8a6a4a" class="a-drop" style="--d:.3s"/>
    ${person(90, 196, '#5a4a3a', false, .8)}${person(160, 196, '#5a4a3a', false, 1)}${person(230, 196, '#5a4a3a', false, 1.2)}
    ${[0, 1, 2].map(i => `<rect class="a-drop" style="--d:${1.6 + i * .3}s" x="${342 + 0}" y="${180 - i * 20}" width="44" height="18" rx="2" fill="#6a7a4a"/>`).join('')}
    ${text(170, 44, '공작사 = 감옥 안 공장', 20, C, 'a-pop', 2)}`);

  // 6. 패통: 문 옆 신호 막대
  const S6 = svg(brick(), `<rect width="400" height="240" fill="url(#brk)"/>
    <rect x="140" y="30" width="110" height="190" fill="#6a4a30" class="a-fade" style="--d:.1s"/>
    <rect x="175" y="70" width="40" height="10" fill="#2a1e16"/>
    <rect x="262" y="60" width="26" height="40" fill="#8a6a4a"/>
    <g class="a-pop" style="--d:1.2s"><rect x="288" y="72" width="60" height="14" rx="3" fill="#e8c86a"/></g>
    ${text(320, 130, '패통', 26, '#ffe9a8', 'a-pop', 1.6)}${text(320, 160, '“간수님!”', 18, '#fff', 'a-pop', 2.2)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-daily',
    name: '감옥 안의 하루',
    theme: { main: C },
    level: '고학년',
    intro: '갇힌 사람들은 하루를 어떻게 보냈을까요? 중앙사의 일과 전시, 12옥사 감방, 공작사를 돌며 감옥 안의 하루를 따라가 봐요.',
    cover: S2,
    think: '하루 10분만 밖에 나가고 친구와 말도 못 한다면 어떤 마음이 들까요? 그런데도 독립운동가들이 희망을 놓지 않은 힘은 무엇이었을까요?',

    scenes: [
      { id: 1, title: '정해진 하루', sec: 22, art: S1,
        lines: ['수감자는 아침 6시에 일어나', '밤 9시에 잠들었어요.', '하루 일과가 모두 정해져 있었어요.', '중앙사에서 그 모습을 볼 수 있어요.'] },
      { id: 2, title: '콩과 보리 덩어리', sec: 24, art: S2,
        lines: ['밥은 콩과 보리를 뭉친 덩어리,', '소금국, 무장아찌 두어 쪽이었어요.', '그래서 ‘콩밥 먹는다’는 말이', '감옥살이를 뜻하게 되었다고 해요.'] },
      { id: 3, title: '한 평도 안 되는 방', sec: 22, art: S3,
        lines: ['독방은 한 평도 안 될 만큼', '좁았어요.', '빛이 거의 들지 않는 독방은', '‘먹방’이라고 불렸어요.'] },
      { id: 4, title: '하루 10분 운동', sec: 22, art: S4,
        lines: ['바깥 운동은 하루 10분뿐이었어요.', '서로 만나지 못하게', '시간을 나눠서 했어요.', '목욕은 닷새에 한 번이었어요.'] },
      { id: 5, title: '공작사의 노동', sec: 24, art: S5,
        lines: ['공작사는 감옥 안의 공장이에요.', '수감자들은 억지로 일하며', '형무소·군부대·관청 물건을 만들었고,', '1930년대 뒤에는 전쟁 물자도 만들었어요.'] },
      { id: 6, title: '패통으로 부르기', sec: 20, art: S6,
        lines: ['급한 일이 생기면 감방 안에서', '‘패통’ 막대를 밀어', '간수를 불렀어요.', '12옥사 감방 문 옆에서 찾아봐요.'] }
    ],

    questions: [
      { id: 'sdmd-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '수감자들이 아침에 일어난 시각은?',
        options: ['아침 6시', '아침 8시', '아침 10시', '낮 12시'], answer: 0,
        explanation: '아침 6시에 일어나 밤 9시에 잠들었어요.' },
      { id: 'sdmd-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '감옥의 밥은 무엇을 뭉친 덩어리였나요?',
        options: ['쌀과 고기', '콩과 보리', '밀가루', '감자'], answer: 1,
        explanation: '콩과 보리를 뭉친 덩어리에 소금국과 무장아찌가 나왔어요.' },
      { id: 'sdmd-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '빛이 거의 들지 않는 독방의 별명은?',
        options: ['꽃방', '책방', '먹방', '해방'], answer: 2,
        explanation: '먹처럼 깜깜하다고 ‘먹방’이라 불렸어요.' },
      { id: 'sdmd-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '하루에 바깥 운동을 할 수 있던 시간은?',
        options: ['1시간', '3시간', '하루 종일', '10분'], answer: 3,
        explanation: '바깥 운동은 하루 10분뿐이었어요.' },
      { id: 'sdmd-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '운동 시간에는 수감자들이 함께 모여 자유롭게 이야기했어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '서로 만나지 못하게 시간을 나눠 운동했어요.' },
      { id: 'sdmd-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '‘공작사’는 어떤 곳이었나요?',
        options: ['감옥 안 공장', '병원', '학교', '식당'], answer: 0,
        explanation: '수감자들이 억지로 일하던 감옥 안 공장이에요.' },
      { id: 'sdmd-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '1930년대 뒤 공작사에서 만든 것은?',
        options: ['장난감', '전쟁 물자', '교과서', '한복'], answer: 1,
        explanation: '일제가 일으킨 전쟁에 쓸 물자도 만들게 했어요.' },
      { id: 'sdmd-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '감방 안에서 간수를 부를 때 쓴 장치는?',
        options: ['종', '호루라기', '전화', '패통'], answer: 3,
        explanation: '막대를 밀어 복도로 튀어나오게 하는 ‘패통’이에요.' }
    ],

    sources: [
      { title: '우리가 형무소를 가봐야 하는 이유(하루 일과·식사·10분 운동·독방) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/843398' },
      { title: '서대문형무소역사관 상설전시(중앙사 일과, 공작사) — 서대문형무소역사관', url: 'https://sphh.sscmc.or.kr/exhibit/exhibit02.php' },
      { title: '[사진] 광복의 시간, 서대문독립공원(먹방) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/1503610' },
      { title: '서울 구 서대문형무소(패통 안내판) — 국가유산포털', url: 'http://www.heritage.go.kr/heri/cul/culSelectDetail.do?ccbaCpno=1331103240000' }
    ]
  };
})();
