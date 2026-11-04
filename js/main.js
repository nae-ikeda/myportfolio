'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ===== メニューの開閉（スマホ・タブレット） =====
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('global-nav');

  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('is-menu-open', open);
  };

  menuBtn.addEventListener('click', () => {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  // PC幅（2画面レイアウト）になったら閉じた状態に戻す
  window.matchMedia('(min-width: 1000px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  // ===== スクロールで要素をふわっと表示 =====
  if (!document.documentElement.classList.contains('js-anim')) return;

  const targets = document.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target); // 一度出たら戻さない
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el) => observer.observe(el));
});
