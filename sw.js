/* 문화탐방 PWA 서비스 워커
 * - 인터넷이 되면 항상 새 파일을 먼저 받아 옴 (네트워크 우선) → 올린 수정이 바로 반영
 * - 인터넷이 안 되면 저장해 둔 파일로 열림 (유적지 안에서 신호가 약해도 OK)
 * - 새 장소·이야기를 추가하면 아래 FILES 에 경로를 넣고 VERSION 숫자를 올립니다 */
const VERSION = 'lftc-v4';
const FILES = [
  'common/chat.js',
  'common/play.js',
  'places/insadong/typeset/game.js',
  'places/insadong/typeset/index.html',
  'places/insadong/chat/data.js',
  'places/insadong/chat/index.html',
  'places/yulgok/gwageo/game.js',
  'places/yulgok/gwageo/index.html',
  'places/yulgok/chat/data.js',
  'places/yulgok/chat/index.html',
  'places/yangnyeong/debate/game.js',
  'places/yangnyeong/debate/index.html',
  'places/yangnyeong/chat/data.js',
  'places/yangnyeong/chat/index.html',
  'places/seodaemun/chat/data.js',
  'places/seodaemun/chat/index.html',
  './',
  'common/art.js',
  'common/hub.js',
  'common/tour.css',
  'common/pwa.js',
  'common/tour.js',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/maskable-512.png',
  'index.html',
  'manifest.webmanifest',
  'places.js',
  'places/insadong/index.html',
  'places/insadong/main/data.js',
  'places/insadong/main/index.html',
  'places/insadong/munbang/data.js',
  'places/insadong/munbang/index.html',
  'places/insadong/sign/data.js',
  'places/insadong/sign/index.html',
  'places/insadong/stories.js',
  'places/insadong/taehwa/data.js',
  'places/insadong/taehwa/index.html',
  'places/insadong/type/data.js',
  'places/insadong/type/index.html',
  'places/seodaemun/cards/data.js',
  'places/seodaemun/cards/index.html',
  'places/seodaemun/daily/data.js',
  'places/seodaemun/daily/index.html',
  'places/seodaemun/hansen/data.js',
  'places/seodaemun/hansen/index.html',
  'places/seodaemun/history/data.js',
  'places/seodaemun/history/index.html',
  'places/seodaemun/people/data.js',
  'places/seodaemun/people/index.html',
  'places/seodaemun/remember/data.js',
  'places/seodaemun/remember/index.html',
  'places/seodaemun/tree/data.js',
  'places/seodaemun/tree/index.html',
  'places/seodaemun/map.js',
  'places/seodaemun/building/data.js',
  'places/seodaemun/building/index.html',
  'places/seodaemun/gate/data.js',
  'places/seodaemun/gate/index.html',
  'places/seodaemun/index.html',
  'places/seodaemun/main/data.js',
  'places/seodaemun/main/index.html',
  'places/seodaemun/stories.js',
  'places/seodaemun/women8/data.js',
  'places/seodaemun/women8/index.html',
  'places/yangnyeong/hyeonpan/data.js',
  'places/yangnyeong/hyeonpan/index.html',
  'places/yangnyeong/index.html',
  'places/yangnyeong/jideok/data.js',
  'places/yangnyeong/jideok/index.html',
  'places/yangnyeong/main/data.js',
  'places/yangnyeong/main/index.html',
  'places/yangnyeong/mission/data.js',
  'places/yangnyeong/mission/index.html',
  'places/yangnyeong/stories.js',
  'places/yulgok/hwaseok/data.js',
  'places/yulgok/hwaseok/index.html',
  'places/yulgok/index.html',
  'places/yulgok/jangwon/data.js',
  'places/yulgok/jangwon/index.html',
  'places/yulgok/main/data.js',
  'places/yulgok/main/index.html',
  'places/yulgok/seowon/data.js',
  'places/yulgok/seowon/index.html',
  'places/yulgok/stories.js',
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSION).then(c =>
    Promise.all(FILES.map(f => c.add(f).catch(() => {})))));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then(res => {
      if (res.ok) {
        const copy = res.clone();
        const key = req.url.split('?')[0];   // ?v=5 같은 꼬리는 떼고 저장
        caches.open(VERSION).then(c => c.put(key, copy));
      }
      return res;
    }).catch(() =>
      caches.match(req, { ignoreSearch: true }).then(r =>
        r || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
