'use strict';
// Progressive enhancement: all copy, links and images are present in the HTML.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const intro = document.querySelector('.f-intro');
if (intro) setTimeout(() => intro.remove(), reducedMotion.matches ? 0 : 2600);
const button = document.querySelector('[aria-controls="site-menu"]');
const menu = document.getElementById('site-menu');
if (button && menu) {
  const setOpen = (open) => {
    button.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };
  setOpen(false);
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.querySelector('.f-header .atriagate-brand').addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', e => {
    if (button.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') { setOpen(false); button.focus(); }
    if (e.key === 'Tab') {
      const items = [button, ...menu.querySelectorAll('a')];
      const current = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(current + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  });
}
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
    document.querySelectorAll('.f-dots a').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
  }
}, {threshold: 0.55});
document.querySelectorAll('[data-index]').forEach(section => observer.observe(section));
document.querySelectorAll('.marquee-window').forEach(gallery => {
  let hovered = false, previous = 0, resumeAt = 0;
  let position = gallery.scrollLeft, lastApplied = position;
  const pointers = new Set();
  // Touch creates pointer/focus events too, but must not leave a sticky hover pause.
  gallery.addEventListener('pointerenter', e => {
    if (e.pointerType === 'mouse') hovered = true;
  });
  gallery.addEventListener('pointerleave', e => {
    if (e.pointerType === 'mouse') hovered = false;
  });
  gallery.addEventListener('pointerdown', e => pointers.add(e.pointerId));
  const release = e => {
    if (pointers.delete(e.pointerId)) resumeAt = performance.now() + 4000;
  };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  window.addEventListener('blur', () => { pointers.clear(); hovered = false; });
  gallery.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      gallery.scrollBy({left: (e.key === 'ArrowRight' ? 1 : -1) * 240, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    }
  });
  function frame(now) {
    const delta = previous ? Math.min(now - previous, 50) : 0;
    previous = now;
    const focused = document.activeElement;
    const keyboardFocus = focused && gallery.contains(focused) && focused.matches(':focus-visible');
    if (!hovered && !pointers.size && !keyboardFocus && !reducedMotion.matches && now > resumeAt && !document.hidden) {
      // Keep fractional progress: high-refresh-rate phones can round subpixel writes to zero.
      if (gallery.scrollLeft !== lastApplied) position = gallery.scrollLeft;
      position += delta * 0.035;
      const first = gallery.querySelector('.marquee-set');
      if (first && first.offsetWidth > 0) position %= first.offsetWidth;
      gallery.scrollLeft = position;
      lastApplied = gallery.scrollLeft;
    } else {
      position = lastApplied = gallery.scrollLeft;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
});
