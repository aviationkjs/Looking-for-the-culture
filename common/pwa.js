/* 앱 설치(PWA) — 모든 HTML이 불러옵니다. file:// 에서는 아무것도 하지 않습니다. */
(function () {
  var me = document.currentScript && document.currentScript.src;
  if (!me || !('serviceWorker' in navigator) || location.protocol === 'file:') return;
  var root = new URL('../', me);
  var head = document.head;
  function add(tag, attrs) { var el = document.createElement(tag); for (var k in attrs) el.setAttribute(k, attrs[k]); head.appendChild(el); }
  add('link', { rel: 'manifest', href: new URL('manifest.webmanifest', root).href });
  add('link', { rel: 'apple-touch-icon', href: new URL('icons/apple-touch-icon.png', root).href });
  add('meta', { name: 'theme-color', content: '#5a6b2a' });
  add('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' });
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(new URL('sw.js', root).href, { scope: root.href }).catch(function () {});
  });
})();
