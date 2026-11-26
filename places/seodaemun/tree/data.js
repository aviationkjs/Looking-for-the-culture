/* 서대문형무소 · 미루나무 앞에서 (고학년) — 추모비·사형장 담장·통곡의 미루나무·시구문
 * 아픈 장소라 사형 장면은 그리지 않고 '조용히 기억하기'와 '사실 / 전해 오는 이야기 구분하기'에 초점을 둡니다. */
(() => {
  const { brick, FLOWER, flower, person, girl, text, svg } = window.ART;
  const C = '#4a5a3a';
  const CALM = '<rect width="400" height="240" fill="#eef0ea"/><rect y="198" width="400" height="42" fill="#d3d8c8"/>';
  const poplar = (x, base, h, w, d, thin) => `<g class="a-fade" style="--d:${d}s">
    <rect x="${x - (thin ? 2 : 5)}" y="${base - h * .35}" width="${thin ? 4 : 10}" height="${h * .35}" fill="#6a4a30"/>
    <ellipse cx="${x}" cy="${base - h * .62}" rx="${w}" ry="${h * .4}" fill="${thin ? '#a9b48a' : '#5f8a45'}"/></g>`;
  const wall = (d = 0) => `<rect x="150" y="70" width="100" height="128" fill="url(#brk)" class="a-fade" style="--d:${d}s"/>`;

  // 1. 조용히 걷는 길
  const S1 = svg(FLOWER, `${CALM}<path d="M0 220Q200 180 400 220" fill="none" stroke="#bfc6b0" stroke-width="18"/>
    ${person(150, 210, '#5a6a5a', false, .3)}${girl(190, 210, '#7a5a6a', false, .5)}${person(230, 212, '#4a5a7a', false, .7)}
    ${flower(320, 170, 1.2)}${flower(346, 186, 1.5, 20)}${text(200, 60, '쉿, 조용히 걸어요', 22, C, 'a-pop', 1.8)}`);

  // 2. 추모비와 새겨진 이름
  const S2 = svg(FLOWER, `${CALM}<g class="a-drop" style="--d:.2s"><rect x="140" y="50" width="120" height="148" rx="6" fill="#6a6a62"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M156 ${76 + i * 18}H244" stroke="#c9c6b8" stroke-width="4"/>`).join('')}</g>
    ${flower(130, 196, 1, 22)}${flower(270, 196, 1.2, 22)}${girl(330, 210, '#7a5a6a', false, 1.6)}
    ${text(200, 34, '새겨진 이름들', 20, C, 'a-pop', 2)}`);

  // 3. 높이 5m 담장 (안은 그리지 않음)
  const S3 = svg(brick(), `${CALM}<rect x="80" y="40" width="240" height="158" fill="url(#brk)" class="a-drop" style="--d:.2s"/>
    <path d="M340 40V198M332 40H348M332 198H348" stroke="${C}" stroke-width="3" class="a-fade" style="--d:1s"/>
    ${text(364, 126, '5m', 22, C, 'a-pop', 1.2)}${person(50, 210, '#5a6a5a', false, 1.4)}
    ${text(200, 120, '1916년 무렵', 22, '#fff', 'a-pop', 1.8)}`);

  // 4. 담 밖과 담 안, 두 그루
  const S4 = svg(brick(), `${CALM}${wall(.1)}${poplar(100, 198, 170, 34, .6)}${poplar(200, 198, 80, 12, 1.2, true)}
    ${text(100, 230, '담 밖', 17, C, 'a-pop', 1.6)}${text(200, 230, '담 안', 17, C, 'a-pop', 1.8)}
    ${text(320, 80, '같은 때', 20, C, 'a-pop', 2.2)}${text(320, 106, '심은 나무', 20, C, 'a-pop', 2.4)}`);

  // 5. 기록 / 전해 오는 이야기
  const S5 = svg(brick(), `${CALM}${wall(0)}${poplar(100, 198, 170, 34, 0)}${poplar(200, 198, 80, 12, 0, true)}
    <g class="a-pop" style="--d:.6s"><rect x="268" y="40" width="120" height="50" rx="10" fill="${C}"/>
      <text x="328" y="60" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">이름의 까닭</text>
      <text x="328" y="80" text-anchor="middle" font-size="14" font-weight="800" fill="#fff">통곡의 미루나무</text></g>
    <g class="a-pop" style="--d:1.6s"><rect x="268" y="110" width="120" height="50" rx="10" fill="#fff" stroke="#a4473a" stroke-width="3" stroke-dasharray="6 4"/>
      <text x="328" y="132" text-anchor="middle" font-size="14" font-weight="800" fill="#a4473a">전해 오는</text>
      <text x="328" y="150" text-anchor="middle" font-size="14" font-weight="800" fill="#a4473a">이야기</text></g>`);

  // 6. 시구문 40m 복원, 그리고 기억
  const S6 = svg(FLOWER, `${CALM}<g class="a-fade" style="--d:.2s"><path d="M40 198V150A30 30 0 0 1 100 150V198Z" fill="#4a4038"/></g>
    <path class="a-fade" style="--d:.8s" d="M100 180H330" stroke="#8a7a6a" stroke-width="10" stroke-dasharray="14 8"/>
    ${text(220, 166, '40m 복원 (1992년)', 18, C, 'a-pop', 1.4)}
    ${flower(80, 120, 2, 22)}${flower(200, 110, 2.3, 22)}${flower(320, 120, 2.6, 22)}
    ${text(200, 50, '숨긴 역사도 기억해요', 22, C, 'a-pop', 2.8)}`);

  window.TOUR_DATA = {
    id: 'seodaemun-tree',
    name: '미루나무 앞에서',
    theme: { main: C },
    level: '고학년',
    intro: '추모비, 사형장 담장, 통곡의 미루나무, 시구문이 있는 곳이에요. 슬픈 장소이니 조용히 걸으며, 기록과 전해 오는 이야기를 나눠 봐요.',
    cover: S4,
    think: '‘통곡의 미루나무’ 이야기에서 기록으로 확인된 사실과 전해 오는 이야기를 나눠 보세요. 전해 오는 이야기가 오래 남는 까닭은 무엇일까요?',

    scenes: [
      { id: 1, title: '조용히 걷는 길', sec: 18, art: S1,
        lines: ['이곳은 슬픈 역사가 있는 곳이라', '모두 조용히 걸어요.', '잠시 마음을 모아 봐요.'] },
      { id: 2, title: '추모비', sec: 20, art: S2,
        lines: ['추모비에는 이곳에서', '목숨을 잃은 분들의', '이름이 새겨져 있어요.', '이름 하나를 골라 읽어 봐요.'] },
      { id: 3, title: '높은 담장', sec: 22, art: S3,
        lines: ['높이 5m 담장 안의 나무 건물이', '사형장이에요.', '1916년 무렵 지었고,', '형무소 안에서도 보이지 않게 막았어요.'] },
      { id: 4, title: '두 그루의 미루나무', sec: 22, art: S4,
        lines: ['사형장을 지을 때', '담 밖과 담 안에', '미루나무를 한 그루씩 심었어요.', '담 밖의 나무는 크게 자랐어요.'] },
      { id: 5, title: '사실과 전해 오는 이야기', sec: 26, art: S5,
        lines: ['끌려가던 분들이 밖의 나무를 붙잡고', '울었다 해서 ‘통곡의 미루나무’예요.', '안의 나무가 한이 서려 못 자랐다는 말은', '전해 오는 이야기예요.'] },
      { id: 6, title: '시구문', sec: 22, art: S6,
        lines: ['사형장 뒤 ‘시구문’은 돌아가신 분을', '몰래 바깥으로 내보내던 통로예요.', '1992년 발굴해 40m를 복원했어요.', '숨긴 역사도 우리는 기억해요.'] }
    ],

    questions: [
      { id: 'sdmt-q1', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 1,
        text: '이곳을 둘러볼 때 알맞은 태도는?',
        options: ['뛰어다니기', '큰 소리로 노래', '조용히 추모하기', '나무에 오르기'], answer: 2,
        explanation: '슬픈 역사가 있는 곳이라 조용히 마음을 모아요.' },
      { id: 'sdmt-q2', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 2,
        text: '추모비에 새겨진 것은?',
        options: ['가게 이름', '돌아가신 분들의 이름', '날씨', '노래 가사'], answer: 1,
        explanation: '이곳에서 목숨을 잃은 분들의 이름이 새겨져 있어요.' },
      { id: 'sdmt-q3', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 3,
        text: '사형장을 둘러싼 담장의 높이는?',
        options: ['1m', '2m', '50m', '5m'], answer: 3,
        explanation: '높이 5m 담장으로 둘러싸 형무소 안에서도 보이지 않게 했어요.' },
      { id: 'sdmt-q4', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '사형장을 지을 때 미루나무를 몇 그루 심었나요?',
        options: ['3그루', '10그루', '2그루', '1그루'], answer: 2,
        explanation: '담 밖과 담 안에 한 그루씩, 두 그루를 심었어요.' },
      { id: 'sdmt-q5', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '“담 안의 나무는 한이 서려 잘 자라지 못했다.” 이것은?',
        options: ['기록으로 확인된 사실', '전해지는 이야기'], answer: 1,
        explanation: '사람들 사이에 전해 오는 이야기(일화)예요.' },
      { id: 'sdmt-q6', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 4,
        text: '“사형장을 지을 때 담 안팎에 미루나무를 심었다.” 이것은?',
        options: ['기록으로 확인된 사실', '전해지는 이야기'], answer: 0,
        explanation: '역사관과 여러 기록에서 확인되는 사실이에요.' },
      { id: 'sdmt-q7', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 6,
        text: '시구문을 발굴해 40m를 복원한 해는?',
        options: ['1908년', '1945년', '2020년', '1992년'], answer: 3,
        explanation: '1992년 독립공원을 만들 때 발굴해 40m를 복원했어요.' },
      { id: 'sdmt-q8', ageGroup: 'CHILD', difficulty: 'MEDIUM', scene: 5,
        text: '‘통곡의 미루나무’라는 이름이 붙은 까닭은?',
        options: ['붙잡고 울던 분들이 있어서', '바람에 우는 소리가 나서', '심은 사람 이름이라서', '열매가 슬퍼 보여서'], answer: 0,
        explanation: '끌려가던 분들이 나무를 붙잡고 울었다고 해서 붙은 이름이에요.' }
    ],

    sources: [
      { title: '서대문형무소역사관 야외전시(사형장 1916년 무렵·5m 담장, 시구문 40m 복원) — 서대문형무소역사관', url: 'https://sphh.sscmc.or.kr/exhibit/exhibit03.php' },
      { title: '서대문형무소…나라 빼앗긴 참담함(통곡의 미루나무, 일화) — 주간경향', url: 'https://weekly.khan.co.kr/article/201502171046501' },
      { title: '독립투사·민주투사 마지막을 지켜본 사형장 ‘통곡의 나무’(1916년 두 그루) — 프레시안', url: 'https://pressian.com/pages/articles/2021080600253497533' },
      { title: '서대문형무소역사관에서 만난 우리의 영웅들(추모 이름판) — 내 손안에 서울', url: 'https://mediahub.seoul.go.kr/archives/2002507' }
    ]
  };
})();
