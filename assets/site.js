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
  let paused = false, previous = 0, resumeAt = 0;
  gallery.addEventListener('pointerenter', () => paused = true);
  gallery.addEventListener('pointerleave', () => paused = false);
  gallery.addEventListener('focusin', () => paused = true);
  gallery.addEventListener('focusout', () => paused = false);
  gallery.addEventListener('touchstart', () => resumeAt = performance.now() + 4000, {passive:true});
  gallery.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      gallery.scrollBy({left: (e.key === 'ArrowRight' ? 1 : -1) * 240, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
    }
  });
  function frame(now) {
    const delta = previous ? Math.min(now - previous, 50) : 0;
    previous = now;
    if (!paused && !reducedMotion.matches && now > resumeAt && !document.hidden) {
      gallery.scrollLeft += delta * 0.035;
      const first = gallery.querySelector('.marquee-set');
      if (first && gallery.scrollLeft >= first.offsetWidth) gallery.scrollLeft -= first.offsetWidth;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
});
