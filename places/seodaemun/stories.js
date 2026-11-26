/* 서대문형무소의 이야기 목록 — 작은 대문(index.html)에 카드로, 탐험 지도(map.js)에 번호 핀으로 보여요.
 * 순서 = 실제 관람 순서 (독립문 → 전시관 → 중앙사 → 옥사 → 공작사 → 한센병사 → 사형장 쪽 → 여옥사 → 독립공원)
 * id   : 각 이야기 data.js 의 id 와 같게
 * sub  : 역사관에서 '찾아볼 곳'
 * stop : 탐험 지도 번호 (0 = 가기 전에 보는 이야기, 지도에 핀 없음)
 * x, y : 탐험 지도(viewBox 0 0 400 300) 위 핀 위치
 * level: '고학년' 이면 배지 */
window.STORIES = [
  { id: 'seodaemun', name: '서대문형무소 이야기', sub: '가기 전에 먼저! · 처음 보는 친구용', icon: '🧱',
    color: '#8b3a2b', path: 'main/index.html', ready: true, stop: 0 },
  { id: 'seodaemun-gate', name: '독립문 이야기', sub: '찾아볼 곳: 독립공원 입구', icon: '🏛️',
    color: '#5b6b3a', path: 'gate/index.html', ready: true, stop: 1, x: 352, y: 278 },
  { id: 'seodaemun-history', name: '감옥의 100년', sub: '찾아볼 곳: 전시관 1층 역사실', icon: '🗓️',
    color: '#6b4a3a', path: 'history/index.html', ready: true, stop: 2, x: 222, y: 204, level: '고학년' },
  { id: 'seodaemun-cards', name: '수형기록표가 말해요', sub: '찾아볼 곳: 전시관 2층 민족저항실', icon: '🪪',
    color: '#5a4a6e', path: 'cards/index.html', ready: true, stop: 3, x: 172, y: 204, level: '고학년' },
  { id: 'seodaemun-building', name: '감옥 건물의 비밀', sub: '찾아볼 곳: 중앙사 · 격벽장 · 망루', icon: '🔍',
    color: '#4a5d6e', path: 'building/index.html', ready: true, stop: 4, x: 197, y: 152 },
  { id: 'seodaemun-people', name: '이곳을 거쳐 간 사람들', sub: '찾아볼 곳: 11 · 12옥사', icon: '👤',
    color: '#3f5a7a', path: 'people/index.html', ready: true, stop: 5, x: 197, y: 82, level: '고학년' },
  { id: 'seodaemun-daily', name: '감옥 안의 하루', sub: '찾아볼 곳: 12옥사 감방 · 공작사', icon: '🍚',
    color: '#7a5a2a', path: 'daily/index.html', ready: true, stop: 6, x: 290, y: 118, level: '고학년' },
  { id: 'seodaemun-hansen', name: '따로 떨어진 한센병사', sub: '찾아볼 곳: 한센병사', icon: '🏠',
    color: '#4f6b5a', path: 'hansen/index.html', ready: true, stop: 7, x: 290, y: 52, level: '고학년' },
  { id: 'seodaemun-tree', name: '미루나무 앞에서', sub: '찾아볼 곳: 추모비 · 통곡의 미루나무 · 사형장 앞', icon: '🌳',
    color: '#4a5a3a', path: 'tree/index.html', ready: true, stop: 8, x: 100, y: 52, level: '고학년' },
  { id: 'seodaemun-women8', name: '여옥사 8호 감방', sub: '찾아볼 곳: 여옥사', icon: '🌸',
    color: '#b0456e', path: 'women8/index.html', ready: true, stop: 9, x: 100, y: 186 },
  { id: 'seodaemun-remember', name: '우리가 기억하는 방법', sub: '찾아볼 곳: 독립공원 순국선열추념탑', icon: '🕯️',
    color: '#8a6a2a', path: 'remember/index.html', ready: true, stop: 10, x: 92, y: 272, level: '고학년' }
];
