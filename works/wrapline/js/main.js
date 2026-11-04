'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ===== スマホ用メニューの開閉 =====
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

  // メニュー内のリンクを押したら閉じる
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Escキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  // PC幅に戻ったら閉じた状態にリセット
  window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  // ===== お問い合わせフォームの入力チェック =====
  const form = document.getElementById('contact-form');
  const done = document.getElementById('form-done');

  const rules = [
    { id: 'f-company', message: '会社名を入力してください。' },
    { id: 'f-name', message: 'ご担当者名を入力してください。' },
    { id: 'f-mail', message: 'メールアドレスを入力してください。', email: true },
  ];

  const validate = (rule) => {
    const input = document.getElementById(rule.id);
    const error = document.getElementById(`${rule.id}-error`);
    const value = input.value.trim();
    let message = '';

    if (!value) {
      message = rule.message;
    } else if (rule.email && !input.checkValidity()) {
      message = 'メールアドレスの形式で入力してください。';
    }

    error.textContent = message;
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', error.id);
    } else {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
    return !message;
  };

  // 入力し直したらその場でエラーを消す
  rules.forEach((rule) => {
    const input = document.getElementById(rule.id);
    input.addEventListener('blur', () => {
      if (input.hasAttribute('aria-invalid')) validate(rule);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const results = rules.map(validate);
    const firstInvalid = rules.find((_, i) => !results[i]);

    if (firstInvalid) {
      done.hidden = true;
      document.getElementById(firstInvalid.id).focus();
      return;
    }

    // デモサイトのため実際には送信しない
    done.hidden = false;
  });

  // ===== 追従CTA（スマホ） =====
  // ヘッダーのCTAが画面外（スクロールで隠れている）間だけ表示し、
  // Contactセクション（実際のフォーム）に着いたら隠して二重表示を避ける。
  const floatCta = document.getElementById('float-cta');
  const heroEl = document.querySelector('.hero');
  const contactEl = document.getElementById('contact');

  if (floatCta && heroEl && contactEl && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let contactVisible = false;
    const updateFloatCta = () => {
      floatCta.classList.toggle('is-visible', !heroVisible && !contactVisible);
    };

    new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      updateFloatCta();
    }).observe(heroEl);

    new IntersectionObserver(([entry]) => {
      contactVisible = entry.isIntersecting;
      updateFloatCta();
    }).observe(contactEl);
  }

  // ===== 動き（慣性スクロール・パララックス・スクロールで現れる演出） =====
  // <head>のインラインスクリプトが prefers-reduced-motion でないときだけ
  // 先に .js-anim を付けている。付いていなければここでは何もしない
  // （JS無効時と同じく、要素は最初から表示されたまま）。
  if (!document.documentElement.classList.contains('js-anim')) return;

  // Lenis: ホイール/トラックパッドの慣性スクロールだけ滑らかにする
  // （タッチはネイティブのスクロール感を優先、アンカー移動は既存のCSSに任せる）
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  // Rellax: ヒーローのイラストとContactの背景文字だけに控えめなパララックス
  if (window.Rellax) {
    window.addEventListener('load', () => new Rellax('.rellax'));
  }

  // スクロールで読み進めた要素をふわっと表示（一度現れたら元に戻さない）
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-revealed'));
  }
});
