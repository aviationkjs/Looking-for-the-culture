/* 새 장소 틀 — 이 폴더를 통째로 복사해서 이름을 바꾼 뒤 내용을 채우세요.
 * 자세한 규칙: 저장소 README.md 「새 장소 추가하기」 */
(() => {
  // 장면 그림: viewBox 0 0 400 240, 움직임은 class="a-drop|a-pop|a-fade|..." + style="--d:1s"
  const S1 = `<svg viewBox="0 0 400 240">
    <rect width="400" height="240" fill="#fdf3e1"/>
    <rect y="200" width="400" height="40" fill="#d9c49f"/>
    <rect class="a-drop" style="--d:.3s" x="140" y="120" width="120" height="80" fill="#8b3a2b"/>
    <text class="a-pop" style="--d:1.2s" x="200" y="60" text-anchor="middle" font-size="36" font-weight="800" fill="#8b3a2b">0000</text></svg>`;

  window.TOUR_DATA = {
    id: 'place-id',                 // 폴더 이름과 같게, 영어 소문자
    name: '장소 이름',
    theme: { main: '#8b3a2b' },     // places.js 의 color 와 같게
    intro: '한두 문장 소개. 해요체로 써요.',
    cover: S1,

    scenes: [
      { id: 1, title: '장면 제목', sec: 22, art: S1,
        lines: ['한 줄에 20자 안팎,', '한 장면에 2~3줄.'] }
      // 장면 5개 권장
    ],

    questions: [
      { id: 'xxx-q1', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: '문제',
        options: ['보기1', '보기2', '보기3'], answer: 0,
        explanation: '한 줄 설명.' },
      { id: 'xxx-q2', ageGroup: 'CHILD', difficulty: 'EASY', scene: 1,
        text: 'O/X 문제 문장이에요.',
        options: ['O', 'X'], answer: 1,
        explanation: '한 줄 설명.' }
      // 6문제 권장: 고르기 4 + O/X 2
    ],

    sources: [
      { title: '참고한 글 제목 — 출처', url: 'https://...' }
    ]
  };
})();
