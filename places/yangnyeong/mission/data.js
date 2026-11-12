/* 동작구 양녕대군 · 묘역 탐구 미션 (고학년) — 현장에서 직접 찾아보는 순서대로 */
(() => {
  const { person, girl, text, svg } = window.ART;
  const BLUE = '#3a5a8b';
  const BG = '<rect width="400" height="240" fill="#f7f3e3"/>';
  const badge = (x, y, n, d) => `<g class="a-pop" style="--d:${d}s"><circle cx="${x}" cy="${y}" r="16" fill="${BLUE}"/>
    <text x="${x}" y="${y + 6}" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">${n}</text></g>`;

  // 1. 상도역에서 출발
  const S1 = svg('', `<rect width="400" height="240" fill="#eef2f7"/>
    <g class="a-drop" style="--d:.2s"><rect x="60" y="70" width="140" height="56" rx="10" fill="#7a6a9a"/>
      <text x="130" y="105" text-anchor="middle" font-size="20" font-weight="800" fill="#fff">7 상도역</text></g>
    <path class="a-fade" style="--d:1s" d="M200 98 Q270 98 300 150" fill="none" stroke="${BLUE}" stroke-width="5" stroke-dasharray="9 6"/>
    ${person(150, 226, '#6b5a2a', false, 1.4)}${girl(180, 226, '#8a4a5a', false, 1.6)}
    <g class="a-pop" style="--d:2s"><text x="310" y="196" text-anchor="middle" font-size="40">🏯</text></g>
    ${text(200, 40, '묘역 탐구 출발!', 24, BLUE, 'a-pop', 2.4)}`);

  // 2. 국사봉터널 방향 입구
  const S2 = svg('', `${BG}
    <path d="M220 200 V120 A60 60 0 0 1 340 120 V200Z" fill="#5a5a62" class="a-fade" style="--d:.2s"/>
    <text x="280" y="226" text-anchor="middle" font-size="14" font-weight="800" fill="#3a3320" class="a-fade" style="--d:.6s">국사봉터널 쪽</text>
    <g class="a-pop" style="--d:1s"><rect x="40" y="110" width="130" height="50" rx="8" fill="${BLUE}"/>
      <text x="105" y="141" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">양녕대군 묘역 →</text></g>
    ${text(200, 44, '입구를 찾아요', 22, BLUE, 'a-pop', 1.8)}`);

  // 3. 앞뜰 조형물 5개, 첫째는 검은 돌 숭례문 현판
  const S3 = svg('', `${BG}<rect y="190" width="400" height="50" fill="#d9cfa8"/>
    <g class="a-pop" style="--d:.3s"><rect x="40" y="100" width="44" height="90" rx="4" fill="#1e1e22"/>
      ${['崇', '禮', '門'].map((c, i) => `<text x="62" y="${126 + i * 24}" text-anchor="middle" font-size="18" font-weight="800" fill="#c9a77a">${c}</text>`).join('')}</g>
    ${[130, 200, 270, 340].map((x, i) => `<g class="a-pop" style="--d:${.7 + i * .3}s"><rect x="${x - 18}" y="140" width="36" height="50" rx="6" fill="#b9b3a5"/></g>`).join('')}
    ${[62, 130, 200, 270, 340].map((x, i) => badge(x, 76, i + 1, 2 + i * .15)).join('')}
    ${text(200, 34, '앞뜰 조형물은 몇 개?', 22, BLUE, 'a-pop', 2.9)}`);

  // 4. 삼문 → 3칸 사당, 좌우 서고·제기고
  const S4 = svg('', `${BG}
    <g class="a-fade" style="--d:.2s"><rect x="150" y="170" width="100" height="40" fill="#b5543a"/>
      ${[0, 1, 2].map(i => `<rect x="${158 + i * 30}" y="178" width="24" height="32" fill="#5a3a2a"/>`).join('')}
      <path d="M140 170 H260 L246 156 H154Z" fill="#4a4a52"/></g>
    <text x="200" y="230" text-anchor="middle" font-size="14" font-weight="800" fill="#3a3320" class="a-fade" style="--d:.6s">삼문</text>
    <g class="a-fade" style="--d:1s"><rect x="130" y="70" width="140" height="44" fill="#e8dcc0"/>
      ${[0, 1, 2].map(i => `<rect x="${138 + i * 44}" y="76" width="36" height="38" fill="#b5543a" opacity=".85"/>`).join('')}
      <path d="M115 70 Q200 58 285 70 L254 44 H146Z" fill="#4a4a52"/></g>
    ${[0, 1, 2].map(i => badge(156 + i * 44, 136, i + 1, 1.6 + i * .2)).join('')}
    <g class="a-pop" style="--d:2.4s"><rect x="20" y="96" width="70" height="40" fill="#d9cfa8"/><text x="55" y="152" text-anchor="middle" font-size="13" font-weight="800" fill="#3a3320">서고</text>
      <rect x="310" y="96" width="70" height="40" fill="#d9cfa8"/><text x="345" y="152" text-anchor="middle" font-size="13" font-weight="800" fill="#3a3320">제기고</text></g>`);

  // 5. 동쪽 연못과 뒤편 무덤
  const S5 = svg('', `${BG}
    <g class="a-fade" style="--d:.2s"><ellipse cx="200" cy="70" rx="80" ry="22" fill="#7fa36a"/><ellipse cx="200" cy="64" rx="56" ry="15" fill="#9bbd82"/></g>
    <text x="200" y="36" text-anchor="middle" font-size="14" font-weight="800" fill="#3a3320" class="a-fade" style="--d:.6s">뒤편 언덕: 무덤</text>
    <g class="a-fade" style="--d:.9s"><rect x="150" y="130" width="100" height="36" fill="#e8dcc0"/><path d="M138 130 Q200 120 262 130 L240 110 H160Z" fill="#4a4a52"/></g>
    <text x="200" y="186" text-anchor="middle" font-size="14" font-weight="800" fill="#3a3320" class="a-fade" style="--d:1.2s">사당</text>
    <g class="a-pop" style="--d:1.6s"><ellipse cx="330" cy="160" rx="52" ry="26" fill="#7fb2d6"/><text x="330" y="166" text-anchor="middle" font-size="14" font-weight="800" fill="#1f4a6a">연못</text></g>
    <g class="a-pop" style="--d:2.2s"><text x="40" y="226" font-size="16" font-weight="800" fill="${BLUE}">서 ←</text><text x="360" y="226" text-anchor="end" font-size="16" font-weight="800" fill="${BLUE}">→ 동</text></g>`);

  // 6. 3.3km 둘레길
  const S6 = svg('', `<rect width="400" height="240" fill="#eef5e8"/>
    <path d="M0 200 L120 90 L180 140 L260 60 L400 200Z" fill="#9bbd82" class="a-fade" style="--d:.2s"/>
    <path class="a-fade" style="--d:.9s" d="M40 196 Q120 120 180 150 T260 70 T380 190" fill="none" stroke="${BLUE}" stroke-width="4" stroke-dasharray="8 6"/>
    <g class="a-pop" style="--d:1.6s"><circle cx="260" cy="66" r="9" fill="${BLUE}"/><text x="260" y="46" text-anchor="middle" font-size="14" font-weight="800" fill="#3a3320">국사봉</text></g>
    ${person(70, 200, '#6b5a2a', true, 2)}${girl(96, 200, '#8a4a5a', true, 2.2)}
    ${text(200, 230, '역사 테마 둘레길 3.3km', 18, BLUE, 'a-pop', 2.6)}`);

  window.TOUR_DATA = {
    id: 'yangnyeong-mission',
    name: '묘역 탐구 미션',
    theme: { main: BLUE },
    level: '고학년',
    intro: '상도역에서 출발해 양녕대군 묘역을 한 바퀴! 현장에서 직접 세고, 찾고, 방향을 확인해 봐요.',
    cover: S3,
    think: '묘역을 다 둘러봤다면, 다른 친구에게 꼭 보라고 추천하고 싶은 한 곳은 어디인가요? 그 까닭은?',

    scenes: [
      { id: 1, title: '상도역에서 출발', sec: 20, art: S1,
        lines: ['지하철 7호선 상도역에서', '걸어서 갈 수 있어요.', '가족과 함께 출발!'] },
      { id: 2, title: '입구 찾기', sec: 20, art: S2,
        lines: ['국사봉터널 쪽으로 가면', '묘역 입구가 나와요.', '안내판을 잘 살펴봐요.'] },
      { id: 3, title: '앞뜰의 조형물', sec: 24, art: S3,
        lines: ['앞뜰에는 조형물이 5개 있어요.', '첫째는 검은 돌(오석)에 새긴', '숭례문 현판이에요.', '하나씩 세어 봐요.'] },
      { id: 4, title: '삼문과 사당', sec: 26, art: S4,
        lines: ['문 세 개가 나란한 삼문을 지나면', '세 칸짜리 사당이 있어요.', '마당 양옆에는 서고와', '제기고가 있어요.'] },
      { id: 5, title: '연못과 무덤', sec: 24, art: S5,
        lines: ['사당 동쪽에는 연못이 있어요.', '다리를 건너 언덕에 오르면', '사당 뒤편에 무덤이 있어요.'] },
      { id: 6, title: '둘레길 걷기', sec: 22, art: S6,
        lines: ['묘역에서 국사봉을 지나', '상도근린공원까지 이어지는', '3.3km 역사 테마 둘레길도', '걸어 봐요.'] }
    ],

    questions: [
      { id: 'ynm-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '앞뜰에 있는 조형물은 모두 몇 개일까요?',
        options: ['3개', '7개', '10개', '5개'], answer: 3,
        explanation: '앞뜰에는 조형물이 5개 있어요.' },
      { id: 'ynm-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '첫째 조형물, 검은 돌에 새긴 것은?',
        options: ['세종대왕 동상', '거북선', '숭례문 현판', '해시계'], answer: 2,
        explanation: '검은 오석에 숭례문 현판 글씨를 새겼어요.' },
      { id: 'ynm-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '지덕사 사당은 몇 칸짜리 건물일까요?',
        options: ['1칸', '3칸', '5칸', '9칸'], answer: 1,
        explanation: '세 칸짜리 사당이에요.' },
      { id: 'ynm-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '연못은 사당의 어느 쪽에 있을까요?',
        options: ['서쪽', '남쪽', '동쪽', '북쪽'], answer: 2,
        explanation: '사당 동쪽에 연못이 있어요.' },
      { id: 'ynm-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '양녕대군의 무덤은 사당 앞쪽에 있어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '무덤은 사당 뒤편 언덕에 있어요.' },
      { id: 'ynm-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '역사 테마 둘레길의 길이는?',
        options: ['1km', '2km', '3.3km', '10km'], answer: 2,
        explanation: '묘역에서 상도근린공원까지 3.3km예요.' },
      { id: 'ynm-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '둘레길에서 지나는 봉우리 이름은?',
        options: ['남산', '국사봉', '북한산', '관악산'], answer: 1,
        explanation: '묘역 뒤 국사봉을 지나요.' },
      { id: 'ynm-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '문 세 개가 나란히 있는 사당 앞 문의 이름은?',
        options: ['홍살문', '대문', '광화문', '삼문'], answer: 3,
        explanation: '문이 세 개라서 삼문이라고 해요.' }
    ],

    sources: [
      { title: '양녕대군 이제 묘역 둘러보기 — 서울특별시 미디어허브', url: 'https://mediahub.seoul.go.kr/archives/1211951' },
      { title: '양녕대군 이제 묘역 — 서울특별시 미디어허브', url: 'https://mediahub.seoul.go.kr/archives/1153353' },
      { title: '동작구 역사 테마 둘레길 — 서울신문', url: 'https://m.seoul.co.kr/news/2022/05/16/20220516030014' }
    ]
  };
})();
