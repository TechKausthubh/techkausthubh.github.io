(() => {
    /* ---------- Theme toggle ---------- */
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const STORAGE_KEY = 'theme-preference';
    const ORDER = ['light', 'dark', 'system'];

    const systemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

    const applyTheme = (pref) => {
        const resolved = pref === 'system' ? (systemDark() ? 'dark' : 'light') : pref;
        root.setAttribute('data-theme', resolved);
        root.setAttribute('data-resolved', pref);
        toggle?.setAttribute('aria-label', `Theme: ${pref}. Click to change.`);
        toggle?.setAttribute('title', `Theme: ${pref}`);
    };

    applyTheme(root.getAttribute('data-resolved') || 'system');

    toggle?.addEventListener('click', () => {
        const current = root.getAttribute('data-resolved') || 'system';
        const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if ((localStorage.getItem(STORAGE_KEY) || 'system') === 'system') applyTheme('system');
    });

    /* ---------- Year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Scroll reveal ---------- */
    const targets = document.querySelectorAll('.section, .hero-grid');
    targets.forEach((el) => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
        targets.forEach((el) => io.observe(el));
    } else {
        targets.forEach((el) => el.classList.add('is-visible'));
    }
})();
