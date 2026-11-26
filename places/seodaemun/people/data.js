/* 서대문형무소 · 이곳을 거쳐 간 사람들 (고학년) — 11·12옥사에서 만나는 독립운동가와 여러 독립운동 방법 */
(() => {
  const { brick, FLAG, person, text, svg } = window.ART;
  const C = '#3f5a7a';
  const CELL = '<rect width="400" height="240" fill="#e9e4da"/><rect y="200" width="400" height="40" fill="#cfc5b3"/>';
  // 인물 카드: 실루엣 + 이름표 + 방법 배지
  const who = (x, name, tag, col, d, up) => `${person(x, 170, col, up, d)}
    <g class="a-pop" style="--d:${d + .5}s"><rect x="${x - 56}" y="176" width="112" height="30" rx="8" fill="${col}"/>
    <text x="${x}" y="197" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">${name}</text></g>
    <g class="a-pop" style="--d:${d + .9}s"><rect x="${x - 50}" y="212" width="100" height="24" rx="12" fill="#fff" stroke="${col}" stroke-width="2"/>
    <text x="${x}" y="229" text-anchor="middle" font-size="15" font-weight="800" fill="${col}">${tag}</text></g>`;

  // 1. 옥사 복도, 양쪽 감방
  const S1 = svg(brick(), `<rect width="400" height="240" fill="#d8cfbf"/>
    <path d="M0 0L150 80V170L0 240Z" fill="url(#brk)" class="a-fade" style="--d:.1s"/><path d="M400 0L250 80V170L400 240Z" fill="url(#brk)" class="a-fade" style="--d:.1s"/>
    ${[0, 1, 2].map(i => `<rect class="a-pop" style="--d:${.4 + i * .3}s" x="${20 + i * 44}" y="${70 + i * 14}" width="${26 - i * 4}" height="${110 - i * 26}" fill="#5a3b2e"/>
      <rect class="a-pop" style="--d:${.4 + i * .3}s" x="${354 - i * 44}" y="${70 + i * 14}" width="${26 - i * 4}" height="${110 - i * 26}" fill="#5a3b2e"/>`).join('')}
    <rect x="150" y="80" width="100" height="90" fill="#f4efe4"/>
    ${person(200, 200, '#3a5a8b', false, 1.4)}${text(200, 40, '11 · 12옥사', 24, C, 'a-pop', 1.8)}`);

  // 2. 의병장 허위
  const S2 = svg('', `${CELL}<path class="a-fade" style="--d:.2s" d="M0 200L80 120L150 170L240 100L330 160L400 120V200Z" fill="#9aa88a"/>
    ${who(200, '허위', '의병', '#4a5a3a', .6, true)}${text(200, 50, '1908년 의병을 이끌다', 20, '#4a5a3a', 'a-pop', 1.8)}`);

  // 3. 민족대표 한용운
  const S3 = svg(FLAG, `${CELL}<g transform="translate(40 40)"><use href="#tg" width="72" height="48" class="a-wave"/></g>
    <g class="a-pop" style="--d:.4s"><rect x="280" y="40" width="80" height="100" rx="4" fill="#f6f1e1" stroke="#a9a293"/>
      ${[0, 1, 2, 3, 4].map(i => `<path d="M292 ${60 + i * 16}H348" stroke="#8a8478" stroke-width="3"/>`).join('')}</g>
    ${who(200, '한용운', '민족대표 33인', '#8a5a2a', .8, false)}${text(320, 160, '독립선언서', 16, '#8a5a2a', 'a-pop', 1.4)}`);

  // 4. 김구와 『백범일지』
  const S4 = svg('', `${CELL}<g transform="translate(290 70)"><g class="a-pop" style="--d:.5s"><rect width="70" height="90" rx="4" fill="#6a4a2a"/>
      <rect x="8" y="10" width="54" height="22" fill="#f3e6c8"/><text x="35" y="27" text-anchor="middle" font-size="13" font-weight="800" fill="#6a4a2a">백범일지</text></g></g>
    ${who(180, '김구', '임시정부', '#3f5a7a', .2, false)}${text(150, 50, '감옥 생활을 글로 남겼어요', 18, C, 'a-pop', 1.8)}`);

  // 5. 65세 강우규
  const S5 = svg('', `${CELL}${who(200, '강우규', '의열 투쟁', '#8a3a3a', .2, false)}
    ${text(200, 70, '65세', 44, '#8a3a3a', 'a-pop', 1.2)}${text(200, 112, '나이는 숫자일 뿐!', 18, '#8a3a3a', 'a-pop', 2)}`);

  // 6. 타벽통보법: 벽을 두드려 소식 전하기
  const S6 = svg(brick(), `<rect width="400" height="240" fill="#e9e4da"/><rect x="186" y="20" width="28" height="200" fill="url(#brk)"/>
    ${person(120, 200, '#3a5a8b', false, .2)}${person(280, 200, '#3a5a8b', false, .4)}
    ${[0, 1, 2].map(i => `<text class="a-rise" style="--d:${.8 + i * .5}s" x="${160 + i * 6}" y="${110 + i * 22}" font-size="18" font-weight="800" fill="#a4473a">똑</text>`).join('')}
    ${[0, 1].map(i => `<text class="a-rise" style="--d:${1.6 + i * .5}s" x="${226 + i * 6}" y="${120 + i * 22}" font-size="18" font-weight="800" fill="#3a5a8b">똑</text>`).join('')}
    ${text(300, 50, '타벽통보법', 22, C, 'a-pop', 2.4)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-people',
    name: '이곳을 거쳐 간 사람들',
    theme: { main: C },
    level: '고학년',
    intro: '11·12옥사 복도에 서서, 이곳에 갇혔던 독립운동가들을 만나 봐요. 저마다 다른 방법으로 나라를 되찾으려 했어요.',
    cover: S1,
    think: '의병, 만세 선언, 의열 투쟁, 기록 남기기… 여러 독립운동 방법 가운데 가장 큰 용기가 필요했던 것은 무엇이라고 생각하나요? 까닭은?',

    scenes: [
      { id: 1, title: '11·12옥사', sec: 22, art: S1,
        lines: ['11·12옥사는 독립운동가들이', '실제로 갇혔던 곳이에요.', '광복 뒤에는 민주화운동을 한', '사람들도 이곳에 갇혔어요.'] },
      { id: 2, title: '의병장 허위', sec: 22, art: S2,
        lines: ['1908년 의병을 이끈 허위도', '이곳에 갇혔어요.', '무기를 들고 나라를 지키려 한', '‘의병’의 대표 인물이에요.'] },
      { id: 3, title: '민족대표 한용운', sec: 24, art: S3,
        lines: ['한용운은 1919년 독립선언서를 읽은', '민족대표 33인 중 한 사람이에요.', '선언서를 읽은 뒤 스스로 붙잡혀', '이곳에 갇혔어요.'] },
      { id: 4, title: '백범 김구', sec: 22, art: S4,
        lines: ['훗날 대한민국 임시정부를 이끈', '백범 김구도 이곳에 갇혔어요.', '그때의 감옥 생활을', '『백범일지』에 적어 남겼어요.'] },
      { id: 5, title: '65세 강우규', sec: 22, art: S5,
        lines: ['강우규는 65세 나이에', '새로 온 조선 총독에게', '폭탄을 던진 독립운동가예요.', '나이가 많아도 포기하지 않았어요.'] },
      { id: 6, title: '벽을 두드리는 소리', sec: 22, art: S6,
        lines: ['갇힌 사람들은 벽을 두드려', '몰래 소식을 주고받았어요.', '이것을 ‘타벽통보법’이라고 해요.', '옥사 안 전시에서 찾아봐요.'] }
    ],

    questions: [
      { id: 'sdmp-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '독립운동가들이 실제로 갇혔던 옥사는?',
        options: ['취사장', '11·12옥사', '창고', '매표소'], answer: 1,
        explanation: '11·12옥사는 독립운동가들이 실제로 갇혔던 곳이에요.' },
      { id: 'sdmp-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '허위처럼 무기를 들고 나라를 지키려 싸운 사람들을 무엇이라 하나요?',
        options: ['의병', '관리', '순사', '간수'], answer: 0,
        explanation: '무기를 들고 일어선 사람들을 ‘의병’이라고 해요.' },
      { id: 'sdmp-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '한용운은 무엇의 한 사람이었나요?',
        options: ['임시정부 대통령', '의병장', '광복군 대장', '민족대표 33인'], answer: 3,
        explanation: '1919년 독립선언서를 읽은 민족대표 33인 중 한 사람이에요.' },
      { id: 'sdmp-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '한용운은 독립선언서를 읽은 뒤 멀리 도망가 숨었어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '선언서를 읽은 뒤 스스로 붙잡혀 감옥에 갇혔어요.' },
      { id: 'sdmp-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '김구가 감옥 생활을 적어 남긴 책은?',
        options: ['난중일기', '백범일지', '열하일기', '동의보감'], answer: 1,
        explanation: '김구의 호가 ‘백범’이라서 『백범일지』예요.' },
      { id: 'sdmp-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '강우규가 총독에게 폭탄을 던질 때 나이는?',
        options: ['16세', '25세', '40세', '65세'], answer: 3,
        explanation: '65세의 나이에도 독립을 위해 나섰어요.' },
      { id: 'sdmp-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '벽을 두드려 소식을 전하던 방법은?',
        options: ['타벽통보법', '봉수', '파발', '전화'], answer: 0,
        explanation: '벽(壁)을 두드려(打) 알리는 ‘타벽통보법’이에요.' },
      { id: 'sdmp-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '광복 뒤 이 옥사에 갇히기도 한 사람들은?',
        options: ['조선의 왕', '외국 대사', '민주화운동가', '아무도 없었어요'], answer: 2,
        explanation: '광복 뒤에는 민주화운동을 한 사람들도 갇혔어요.' }
    ],

    sources: [
      { title: '서대문형무소역사관 상설전시(11·12옥사, 타벽통보법) — 서대문형무소역사관', url: 'https://sphh.sscmc.or.kr/exhibit/exhibit02.php' },
      { title: '광복의 의미를 되새기며(한용운: 선언서 낭독 후 자진 체포) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2015280' },
      { title: '항일운동의 역사와 마주하다(김구 『백범일지』, 강우규) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2000725' },
      { title: '서대문형무소 외국인 해설(65세 강우규) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/149315' },
      { title: '왕산 허위, 서대문형무소에 갇히다 — 매일신문', url: 'https://www.imaeil.com/page/view/2018070311445423407' }
    ]
  };
})();
