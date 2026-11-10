/* 대문에 보이는 장소 목록 — 새 장소를 만들면 여기에 한 줄 추가하세요.
 * path    : 장소의 작은 대문 (places/<장소>/index.html)
 * stories : 그 장소의 이야기 id 목록 (각 이야기 data.js 의 id) → 대문 카드에 별 합계 표시
 * ready: false 면 '준비 중' 회색 카드 */
window.PLACES = [
  { id: 'seodaemun', name: '서대문형무소', sub: '서울 서대문구', icon: '🧱', color: '#8b3a2b',
    path: 'places/seodaemun/index.html', ready: true,
    stories: ['seodaemun', 'seodaemun-women8', 'seodaemun-building', 'seodaemun-gate'] },
  { id: 'gyeongbokgung', name: '경복궁', sub: '서울 종로구', icon: '👑', color: '#2f5d8a',
    path: 'places/gyeongbokgung/index.html', ready: false }
];
