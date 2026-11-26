/* 앱 설치(PWA) — 모든 HTML이 불러옵니다. file:// 에서는 아무것도 하지 않습니다.
 * - 매니페스트·아이콘 연결, 서비스 워커(sw.js) 등록
 * - 대문에 <section id="install" hidden> 이 있으면 '앱으로 설치' 카드를 보여 줌
 *   안드로이드 크롬: 버튼 한 번으로 설치 창 / 아이폰 사파리: 공유 → 홈 화면에 추가 안내
 *   이미 앱으로 열었으면 카드를 숨김
 * - 새 버전이 적용되면 화면 아래에 잠깐 알림 */
(function () {
  var me = document.currentScript && document.currentScript.src;
  if (!me || !('serviceWorker' in navigator) || location.protocol === 'file:') return;
  var root = new URL('../', me);
  var head = document.head;
  function add(tag, attrs) { var el = document.createElement(tag); for (var k in attrs) el.setAttribute(k, attrs[k]); head.appendChild(el); }
  if (!document.querySelector('link[rel=manifest]')) {
    add('link', { rel: 'manifest', href: new URL('manifest.webmanifest', root).href });
    add('link', { rel: 'apple-touch-icon', href: new URL('icons/apple-touch-icon.png', root).href });
    add('meta', { name: 'theme-color', content: '#5a6b2a' });
  }
  add('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' });
  add('meta', { name: 'mobile-web-app-capable', content: 'yes' });
  add('meta', { name: 'apple-mobile-web-app-title', content: '문화탐방' });

  var hadSW = !!navigator.serviceWorker.controller;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register(new URL('sw.js', root).href, { scope: root.href }).catch(function () {});
  });
  // 새 서비스 워커가 자리를 잡으면 (= 새 버전) 알림
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (!hadSW) { hadSW = true; return; }
    toast('✨ 새 버전으로 바뀌었어요! 새 이야기를 확인해 봐요.');
  });

  function toast(msg) {
    var t = document.createElement('p');
    t.textContent = msg;
    t.style.cssText = 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:50;margin:0;padding:10px 18px;' +
      'border-radius:999px;background:#2f2f36;color:#fff;font-size:15px;font-weight:700;box-shadow:0 6px 16px rgba(0,0,0,.25);max-width:90%;text-align:center';
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 4000);
  }

  // 설치 안내 카드
  var standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var deferred = null;
  function box() { return document.getElementById('install'); }
  function show(html) {
    var b = box(); if (!b || standalone) return;
    b.innerHTML = '<span class="ic" aria-hidden="true">📲</span><div class="tx"><b>앱으로 설치하기</b><small>' + html + '</small></div>' +
      (deferred ? '<button class="btn small go">설치</button>' : '') + '<button class="btn small x" aria-label="닫기">✕</button>';
    b.hidden = false;
    var go = b.querySelector('.go');
    if (go) go.onclick = function () { deferred.prompt(); deferred.userChoice.then(function () { deferred = null; b.hidden = true; }); };
    b.querySelector('.x').onclick = function () { b.hidden = true; try { sessionStorage.setItem('lftc:noinstall', '1'); } catch (e) {} };
  }
  function closed() { try { return sessionStorage.getItem('lftc:noinstall') === '1'; } catch (e) { return false; } }
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (!closed()) whenReady(function () { show('홈 화면에 아이콘이 생기고, 인터넷이 약한 유적지에서도 열려요.'); });
  });
  window.addEventListener('appinstalled', function () { var b = box(); if (b) b.hidden = true; toast('🎉 설치 완료! 홈 화면에서 열어 봐요.'); });
  if (ios && !standalone && !closed()) whenReady(function () { show('사파리 아래 <b>공유</b> 버튼(□↑) → <b>홈 화면에 추가</b>를 눌러요.'); });
  function whenReady(f) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', f); else f(); }
})();
