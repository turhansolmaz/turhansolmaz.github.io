/* PhishGuard paper — math rendering and table-of-contents highlight.
   Kept in a file (no inline scripts) so the Content Security Policy can forbid inline code.
   Loaded with "defer" after KaTeX, so renderMathInElement is available here. */
(function () {
  if (typeof window.renderMathInElement === 'function') {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ]
    });
  }

  const links = document.querySelectorAll('.toc-list a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.remove('active'));
      const id = entry.target.id || entry.target.closest('section')?.id;
      if (!id) return;
      const active = document.querySelector(`.toc-list a[href="#${CSS.escape(id)}"]`);
      if (active) active.classList.add('active');
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
})();
