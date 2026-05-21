(() => {
  const menuBtn = document.querySelector('[data-menu-btn]');
  const panel = document.querySelector('[data-mobile-panel]');
  const closeOnClick = (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    setOpen(false);
  };

  function setOpen(isOpen) {
    if (!menuBtn || !panel) return;
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    panel.dataset.open = String(isOpen);
    document.body.dataset.menuOpen = String(isOpen);
  }

  if (menuBtn && panel) {
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });
    panel.addEventListener('click', closeOnClick);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Active nav highlight (works for both desktop + mobile)
  const path = location.pathname.replace(/\/+$/, '');
  const links = document.querySelectorAll('a[data-nav]');
  links.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    // Handle relative links for GitHub Pages subpaths
    const resolved = new URL(href, location.href).pathname.replace(/\/+$/, '');
    if (resolved === path) a.setAttribute('aria-current', 'page');
  });

  // assets/main.js
  const gameDetails = document.querySelectorAll('details.icon-item');
  if (gameDetails.length > 0) {
    gameDetails.forEach((detail) => {
      detail.addEventListener('toggle', () => {
        if (!detail.open) {
          // [新增] 當收起時，稍微觸發頁面重繪，防止手機端殘留陰影或區塊
          detail.style.display = 'none';
          detail.offsetHeight; // 觸發 reflow
          detail.style.display = '';
          return;
        }
        gameDetails.forEach((other) => {
          if (other !== detail) other.removeAttribute('open');
        });
      });
    });
  }

  // Watchlist sorting (client-only)
  const watchlistGrid = document.querySelector('[data-watchlist-grid]');
  const watchlistSort = document.querySelector('[data-watchlist-sort]');
  if (watchlistGrid && watchlistSort) {
    const cards = Array.from(watchlistGrid.querySelectorAll('article.card'));
    const originalOrder = cards.slice();

    const getNum = (el, key) => {
      const raw = el.getAttribute(`data-${key}`);
      const n = Number(raw);
      return Number.isFinite(n) ? n : 0;
    };
    const getStr = (el, key) => (el.getAttribute(`data-${key}`) || '').trim();
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    const strokeCollator = new Intl.Collator('zh-Hant-u-co-stroke', { numeric: true, sensitivity: 'base' });

    const getTitleKey = (el) => {
      const title = getStr(el, 'title');
      const cleaned = title.replace(/^[\s「『《〈【]+/, '');
      const chars = Array.from(cleaned).filter((ch) => ch.trim() !== '');
      return chars.slice(0, 3).join('');
    };

    function render(order) {
      const frag = document.createDocumentFragment();
      order.forEach((el) => frag.appendChild(el));
      watchlistGrid.appendChild(frag);
    }

    function sortBy(mode) {
      if (mode === 'default') return render(originalOrder);

      const next = cards.slice();
      next.sort((a, b) => {
        if (mode === 'year-desc') {
          const yearDiff = getNum(b, 'year') - getNum(a, 'year');
          if (yearDiff !== 0) return yearDiff;
          return getNum(b, 'month') - getNum(a, 'month');
        }
        if (mode === 'year-asc') {
          const yearDiff = getNum(a, 'year') - getNum(b, 'year');
          if (yearDiff !== 0) return yearDiff;
          return getNum(a, 'month') - getNum(b, 'month');
        }
        if (mode === 'strokes-asc') return getNum(a, 'strokes') - getNum(b, 'strokes');
        if (mode === 'strokes-desc') return getNum(b, 'strokes') - getNum(a, 'strokes');
        if (mode === 'title-desc') {
          // 先按前三個字的筆畫排序 Z→A，再按年月份新→舊
          const titleDiff = strokeCollator.compare(getTitleKey(b), getTitleKey(a));
          if (titleDiff !== 0) return titleDiff;
          const yearDiff = getNum(b, 'year') - getNum(a, 'year');
          if (yearDiff !== 0) return yearDiff;
          return getNum(b, 'month') - getNum(a, 'month');
        }
        // title-asc: 先按前三個字的筆畫排序 A→Z，再按年月份舊→新
        const titleDiff = strokeCollator.compare(getTitleKey(a), getTitleKey(b));
        if (titleDiff !== 0) return titleDiff;
        const yearDiff = getNum(a, 'year') - getNum(b, 'year');
        if (yearDiff !== 0) return yearDiff;
        return getNum(a, 'month') - getNum(b, 'month');
      });
      render(next);
    }

    watchlistSort.addEventListener('change', (e) => {
      sortBy(e.target.value);
    });

    watchlistSort.value = 'year-desc';
    sortBy('year-desc');
  }

  // === [新增] 彈窗（Modal）控制邏輯 ===
  const openButtons = document.querySelectorAll('[data-modal-target]');
  const closeButtons = document.querySelectorAll('.modal-close-btn');
  const overlays = document.querySelectorAll('.modal-overlay');

  // 開啟彈窗
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      if (modal) modal.setAttribute('aria-hidden', 'false');
    });
  });

  // 點擊 ✕ 按鈕關閉
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.setAttribute('aria-hidden', 'true');
    });
  });

  // 點擊彈窗外部半透明處關閉
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
  });
})();
