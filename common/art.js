/* 문화탐방 공통 그림 조각 — 여러 장소·이야기의 data.js 가 함께 씁니다.
 * 모든 장면 그림은 viewBox 0 0 400 240 기준입니다.
 * 사용 예: const { brick, FLAG, person } = window.ART; */
window.ART = (() => {
  // 벽돌 무늬 <pattern> (defs 안에 넣고 fill="url(#brk)" 로 사용)
  const brick = (id = 'brk', base = '#a4473a', line = '#e9cdb5') =>
    `<pattern id="${id}" width="20" height="12" patternUnits="userSpaceOnUse">
      <rect width="20" height="12" fill="${base}"/>
      <path d="M0 .5H20M0 6.5H20M5 0V6M15 6V12" stroke="${line}" stroke-width="1"/></pattern>`;

  // 큰 돌(화강암) 무늬 <pattern> (fill="url(#stn)")
  const stone = (id = 'stn', base = '#d9d4c7', line = '#a9a293') =>
    `<pattern id="${id}" width="24" height="14" patternUnits="userSpaceOnUse">
      <rect width="24" height="14" fill="${base}"/>
      <path d="M0 .5H24M0 7.5H24M8 0V7M20 7V14" stroke="${line}" stroke-width="1"/></pattern>`;

  // 태극기 <symbol id="tg"> (가로:세로 3:2). <use href="#tg" width="90" height="60"/>
  const bar = (x, broken) => broken
    ? `<rect x="${x - .83}" y="-5" width="1.67" height="4.4"/><rect x="${x - .83}" y=".6" width="1.67" height="4.4"/>`
    : `<rect x="${x - .83}" y="-5" width="1.67" height="10"/>`;
  const gwae = (cx, cy, a, p) =>
    `<g transform="translate(${cx} ${cy}) rotate(${a})">${[-2.5, 0, 2.5].map((x, i) => bar(x, p[i])).join('')}</g>`;
  const FLAG = `<symbol id="tg" viewBox="0 0 60 40">
    <rect width="60" height="40" fill="#fff" stroke="#bbb" stroke-width=".5"/>
    <g transform="translate(30 20) rotate(33.69)"><circle r="10" fill="#0047a0"/>
      <path d="M-10 0A10 10 0 0 1 10 0A5 5 0 0 0 0 0A5 5 0 0 1 -10 0Z" fill="#cd2e3a"/></g>
    <g fill="#000">${gwae(13.36, 8.91, 33.69, [0, 0, 0])}${gwae(46.64, 31.09, 33.69, [1, 1, 1])}${gwae(46.64, 8.91, -33.69, [1, 0, 1])}${gwae(13.36, 31.09, -33.69, [0, 1, 0])}</g>
  </symbol>`;

  // 무궁화 <symbol id="mg">
  const FLOWER = `<symbol id="mg" viewBox="-12 -12 24 24">
    ${[0, 72, 144, 216, 288].map(r => `<ellipse cy="-6" rx="5" ry="6.5" fill="#f4b3cf" stroke="#e58bb3" stroke-width=".6" transform="rotate(${r})"/>`).join('')}
    <circle r="3.6" fill="#c2185b"/><circle r="1.2" fill="#fff3a0"/></symbol>`;
  // 무궁화 한 송이 피우기 (x, y 중심, d 지연초, s 크기)
  const flower = (x, y, d, s = 26) =>
    `<g transform="translate(${x} ${y})"><use href="#mg" x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" class="a-bloom" style="--d:${d}s"/></g>`;

  // 사람 실루엣 (얼굴 없음). x,y = 발 위치, up = 두 팔 들기, d = 나타나는 지연초
  const person = (x, y, fill, up, d = 0) =>
    `<g transform="translate(${x} ${y})"><g class="${up ? 'a-jump' : 'a-fade'}" style="--d:${d}s" fill="${fill}">
      <circle cy="-30" r="7"/><rect x="-8" y="-22" width="16" height="24" rx="7"/>
      ${up ? `<path d="M-7 -18L-15 -34M7 -18L15 -34" stroke="${fill}" stroke-width="4" stroke-linecap="round"/>` : ''}</g></g>`;

  // 치마 입은 사람 실루엣 (얼굴 없음, 쪽진 머리)
  const girl = (x, y, fill, up, d = 0, cls) =>
    `<g transform="translate(${x} ${y})"><g class="${cls || (up ? 'a-jump' : 'a-fade')}" style="--d:${d}s" fill="${fill}">
      <circle cy="-30" r="7"/><circle cx="6" cy="-30" r="3.5"/><path d="M-11 0L-6 -23H6L11 0Z"/>
      ${up ? `<path d="M-5 -19L-14 -34M5 -19L14 -34" stroke="${fill}" stroke-width="4" stroke-linecap="round"/>` : ''}</g></g>`;

  // 하트
  const heart = (x, y, s, fill, cls, d = 0) =>
    `<g transform="translate(${x} ${y}) scale(${s})"><path class="${cls}" style="--d:${d}s" fill="${fill}" d="M0 6C-10-2-10-12-4-12C-1-12 0-9 0-8C0-9 1-12 4-12C10-12 10-2 0 6Z"/></g>`;

  // 큰 글자 (가운데 정렬)
  const text = (x, y, t, size, fill, cls = 'a-pop', d = 0) =>
    `<text class="${cls}" style="--d:${d}s" x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="800" fill="${fill}">${t}</text>`;

  // <svg> 감싸기
  const svg = (defs, body) => `<svg viewBox="0 0 400 240"><defs>${defs}</defs>${body}</svg>`;

  return { brick, stone, FLAG, FLOWER, flower, person, girl, heart, text, svg };
})();
