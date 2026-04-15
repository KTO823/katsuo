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
})();
