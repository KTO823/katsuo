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

    const normalizeSeries = (title) => {
      let text = title.trim();
      text = text.replace(/(?:\s*[-–—]\s*)?第[0-9０-９]+(?:季|期|部)(?:[:：].*)?$/u, '');
      text = text.replace(/(?:\s*[-–—]\s*)?(?:劇場版|OVA|外傳|外伝)(?:.*)$/u, '');
      text = text.replace(/(?:\s*[-–—]\s*)?劇場版[:：].*$/u, '');
      text = text.replace(/(?:\s*[-–—]\s*)?OVA[:：].*$/u, '');
      text = text.replace(/\s*～.*$/u, '');
      text = text.replace(/\s*【.*】$/u, '');
      text = text.replace(/\s*\(.*\)$/u, '');
      text = text.replace(/\s*：.*$/u, '');
      text = text.replace(/\s*:.*/u, '');
      text = text.replace(/\s*[-–—]\s*[^-–—]*$/u, '');
      return text.trim() || title;
    };

    const getSeries = (el) => normalizeSeries(getStr(el, 'title'));

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
          // 先按系列 Z→A，再按年月份新→舊
          const seriesDiff = collator.compare(getSeries(b), getSeries(a));
          if (seriesDiff !== 0) return seriesDiff;
          const yearDiff = getNum(b, 'year') - getNum(a, 'year');
          if (yearDiff !== 0) return yearDiff;
          return getNum(b, 'month') - getNum(a, 'month');
        }
        // title-asc: 先按系列 A→Z，再按年月份舊→新
        const seriesDiff = collator.compare(getSeries(a), getSeries(b));
        if (seriesDiff !== 0) return seriesDiff;
        const yearDiff = getNum(a, 'year') - getNum(b, 'year');
        if (yearDiff !== 0) return yearDiff;
        return getNum(a, 'month') - getNum(b, 'month');
      });
      render(next);
    }

    watchlistSort.addEventListener('change', (e) => {
      sortBy(e.target.value);
    });

    // Initial sort: year (new -> old)
    watchlistSort.value = 'year-desc';
    sortBy('year-desc');
  }
})();
