/* 서대문형무소 · 감옥의 100년 (고학년) — 경성감옥에서 역사관까지, 이름과 쓰임이 바뀐 흐름 */
(() => {
  const { brick, person, text, svg } = window.ART;
  const C = '#6b4a3a';
  const SKY = '<rect width="400" height="240" fill="#f1ece3"/><rect y="200" width="400" height="40" fill="#d8ccb6"/>';
  // 연표 막대: 지금까지 지나온 해를 차례로 표시 (n = 몇 번째 칸까지 밝힐지)
  const YEARS = ['1908', '1912', '1923', '1945', '1987', '1998'];
  const line = (n, d = 0) => `<g class="a-fade" style="--d:${d}s">
    <rect x="24" y="214" width="352" height="6" rx="3" fill="#c9b99f"/>
    ${YEARS.map((y, i) => `<circle cx="${40 + i * 64}" cy="217" r="${i === n ? 9 : 6}" fill="${i <= n ? C : '#c9b99f'}"/>
      ${i === n ? `<text x="${40 + i * 64}" y="239" text-anchor="middle" font-size="14" font-weight="800" fill="${C}">${y}</text>` : ''}`).join('')}</g>`;
  // 붉은 벽돌 감옥 한 채
  const jail = (x, y, w, h, d) => `<g class="a-drop" style="--d:${d}s"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#brk)"/>
    ${Array.from({ length: Math.floor(w / 30) }, (_, i) => `<rect x="${x + 10 + i * 30}" y="${y + 14}" width="12" height="18" rx="6" fill="#3a2a22"/>`).join('')}</g>`;
  const sign = (x, y, t, d, fill = C) => `<g class="a-pop" style="--d:${d}s"><rect x="${x - 78}" y="${y - 22}" width="156" height="34" rx="8" fill="${fill}"/>
    <text x="${x}" y="${y + 2}" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">${t}</text></g>`;

  // 1. 1908 경성감옥, 의병을 가두려고
  const S1 = svg(brick(), `${SKY}${jail(150, 110, 150, 90, .2)}${sign(225, 92, '경성감옥', 1)}
    ${person(70, 200, '#4a5a3a', true, 1.5)}${person(100, 200, '#4a5a3a', true, 1.7)}
    ${text(85, 120, '의병', 18, '#4a5a3a', 'a-pop', 1.9)}${line(0, 2.3)}`);

  // 2. 이름이 바뀌어요: 1912 서대문감옥 → 1923 서대문형무소
  const S2 = svg(brick(), `${SKY}${jail(120, 110, 160, 90, .1)}
    ${sign(200, 44, '서대문감옥', .6, '#8a7a6a')}
    <path class="a-pop" style="--d:1.4s" d="M192 62H208L200 76Z" fill="${C}"/>
    ${sign(200, 100, '서대문형무소', 1.8)}${line(2, 2.4)}`);

  // 3. 3·1운동 뒤 500명 → 3,000명
  const S3 = svg(brick(), `${SKY}${jail(40, 140, 60, 60, .2)}${text(70, 130, '500명', 18, C, 'a-pop', .6)}
    <g class="a-fade" style="--d:1s"><path d="M110 170H142" stroke="${C}" stroke-width="5"/><path d="M140 161L154 170L140 179Z" fill="${C}"/></g>
    ${jail(160, 70, 200, 130, 1.4)}${text(260, 58, '3,000명', 24, '#a4473a', 'a-pop', 2.2)}${line(2, 2.6)}`);

  // 4. 광복 뒤에도 감옥 → 서울구치소, 민주화운동가
  const S4 = svg(brick(), `${SKY}${jail(130, 100, 150, 100, .2)}${sign(205, 80, '서울구치소', .8)}
    ${person(60, 200, '#3a5a8b', true, 1.4)}${person(330, 200, '#3a5a8b', true, 1.6)}
    ${text(60, 120, '민주주의!', 16, '#3a5a8b', 'a-rise', 1.8)}${text(330, 120, '자유!', 16, '#3a5a8b', 'a-rise', 2)}${line(3, 2.4)}`);

  // 5. 1987 의왕으로 이사, 80년
  const S5 = svg(brick(), `${SKY}${jail(40, 110, 120, 90, .1)}
    <g class="a-fade" style="--d:.8s"><path d="M175 150H290" stroke="${C}" stroke-width="5" stroke-dasharray="10 7"/><path d="M290 140L306 150L290 160Z" fill="${C}"/></g>
    ${sign(320, 110, '경기도 의왕', 1.4, '#8a7a6a')}${text(100, 80, '80년', 30, '#a4473a', 'a-pop', 2)}${line(4, 2.4)}`);

  // 6. 1998 역사관, 지금 전시관 = 옛 보안과 청사
  const S6 = svg(brick(), `<rect width="400" height="240" fill="#eef3fa"/><rect y="200" width="400" height="40" fill="#d8ccb6"/>
    ${jail(110, 100, 180, 100, .2)}<rect x="110" y="88" width="180" height="14" fill="#5a4a40" class="a-drop" style="--d:.5s"/>
    ${sign(200, 66, '역사관', 1)}${person(80, 200, '#6a5a8a', false, 1.4)}${person(320, 200, '#8a5a4a', false, 1.6)}
    ${text(200, 34, '옛 보안과 청사 = 지금 전시관', 17, C, 'a-pop', 2)}${line(5, 2.4)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-history',
    name: '감옥의 100년',
    theme: { main: C },
    level: '고학년',
    intro: '1908년 경성감옥부터 1998년 역사관까지! 전시관 1층 역사실에서 감옥의 이름과 쓰임이 어떻게 바뀌었는지 따라가 봐요.',
    cover: S1,
    think: '감옥 건물을 모두 허물지 않고 몇 채를 남겨 역사관으로 만들었어요. 내가 결정하는 사람이었다면 남겼을까요, 허물었을까요? 까닭은?',

    scenes: [
      { id: 1, title: '의병을 가두려고', sec: 24, art: S1,
        lines: ['1908년 10월, 서울 현저동에', '‘경성감옥’이 문을 열었어요.', '나라를 지키려 싸운 의병들을', '가두려고 일제가 지은 감옥이에요.'] },
      { id: 2, title: '바뀌는 이름', sec: 24, art: S2,
        lines: ['1912년 마포에 새 감옥이 생기자', '이곳은 ‘서대문감옥’이 되었어요.', '1923년부터는 우리가 아는 이름,', '‘서대문형무소’로 불렸어요.'] },
      { id: 3, title: '3·1운동 뒤 커진 감옥', sec: 24, art: S3,
        lines: ['1919년 3·1운동 뒤', '갇힌 사람이 크게 늘었어요.', '처음 500명쯤 들어가던 감옥을', '3,000명까지 들어가게 넓혔어요.'] },
      { id: 4, title: '광복 뒤에도 감옥', sec: 24, art: S4,
        lines: ['1945년 광복 뒤에도 감옥으로 쓰였어요.', '이름이 여러 번 바뀌었고,', '마지막 이름은 ‘서울구치소’예요.', '민주주의를 외친 사람들도 갇혔어요.'] },
      { id: 5, title: '80년 만의 이사', sec: 22, art: S5,
        lines: ['1987년 11월, 구치소는', '경기도 의왕으로 옮겨 갔어요.', '80년 동안 감옥이었던 이곳에', '중요한 건물 몇 채가 남았어요.'] },
      { id: 6, title: '역사관이 되다', sec: 22, art: S6,
        lines: ['1998년 11월 5일, 이곳은', '‘서대문형무소역사관’이 되었어요.', '지금 서 있는 전시관 건물은', '옛날 ‘보안과 청사’였어요.'] }
    ],

    questions: [
      { id: 'sdmh-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '1908년 처음 문을 열었을 때 이 감옥의 이름은?',
        options: ['서대문형무소', '경성감옥', '서울구치소', '마포감옥'], answer: 1,
        explanation: '처음 이름은 ‘경성감옥’이었어요.' },
      { id: 'sdmh-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '일제가 이 감옥을 처음 지은 까닭은?',
        options: ['의병을 가두려고', '학교로 쓰려고', '왕이 살려고', '물건을 팔려고'], answer: 0,
        explanation: '나라를 지키려 싸운 의병들을 가두려고 지었어요.' },
      { id: 'sdmh-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '‘서대문형무소’라는 이름을 쓰기 시작한 해는?',
        options: ['1908년', '1912년', '1923년', '1987년'], answer: 2,
        explanation: '1912년 서대문감옥을 거쳐 1923년부터 서대문형무소가 되었어요.' },
      { id: 'sdmh-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '3·1운동 뒤 갇힌 사람이 줄어서 감옥을 작게 줄였어요.',
        options: ['O', 'X'], answer: 1,
        explanation: '갇힌 사람이 크게 늘어 500명에서 3,000명 규모로 넓혔어요.' },
      { id: 'sdmh-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '이곳이 감옥으로 쓰일 때 마지막 이름은?',
        options: ['경성감옥', '서대문감옥', '서울감옥', '서울구치소'], answer: 3,
        explanation: '마지막 이름은 ‘서울구치소’예요.' },
      { id: 'sdmh-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '1987년 구치소는 어디로 옮겨 갔을까요?',
        options: ['경기도 의왕', '부산', '인천', '춘천'], answer: 0,
        explanation: '1987년 11월 경기도 의왕으로 옮겨 갔어요.' },
      { id: 'sdmh-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '지금 전시관 건물은 옛날에 무엇이었나요?',
        options: ['취사장', '여옥사', '보안과 청사', '공작사'], answer: 2,
        explanation: '전시관은 옛 ‘보안과 청사’ 건물이에요.' },
      { id: 'sdmh-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '일어난 차례대로 바르게 놓은 것은?',
        options: ['형무소→감옥→역사관→구치소', '경성감옥→형무소→구치소→역사관', '역사관→구치소→경성감옥→형무소', '구치소→경성감옥→형무소→역사관'], answer: 1,
        explanation: '경성감옥(1908) → 서대문형무소(1923) → 서울구치소 → 역사관(1998) 순서예요.' }
    ],

    sources: [
      { title: '수난의 현장, 서대문형무소를 찾다(이름 변천·1987 이전·1998 개관) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2000948' },
      { title: '서울 구 서대문 형무소 — 한국민족문화대백과사전', url: 'https://encykorea.aks.ac.kr/Article/E0005840' },
      { title: '[한일 강제병합 100년] 서대문형무소와 독립공원(500명→3,000명) — 한국일보', url: 'https://www.hankookilbo.com/news/article/201005171259367546' },
      { title: '역사의 울림이 생생하게(1908.10 개소~1987.11, 1998.11.5 개관) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2010425' }
    ]
  };
})();
