/**
 * KBOB Fachdatenkatalog - UI Utilities
 * Language dropdown and other UI helpers
 */

/**
 * Update all translatable UI elements in the DOM
 * Called after language change to refresh static text
 */
function updateUITranslations() {
    // Update html lang attribute
    document.documentElement.lang = getLanguage();

    // Update page title
    document.title = 'KBOB ' + tUI('header.title');

    // Update navigation links
    const navLinks = document.querySelectorAll('.main-nav .nav-link[data-route]');
    navLinks.forEach(link => {
        const route = link.dataset.route;
        if (route) {
            link.textContent = tNav(route);
        }
    });

    // Update header title
    const headerTitle = document.querySelector('.header__title span:last-child');
    if (headerTitle) {
        headerTitle.textContent = tUI('header.title');
    }

    // Update search button label
    const searchToggle = document.getElementById('headerSearchToggle');
    if (searchToggle) {
        const searchLabel = searchToggle.querySelector('span');
        if (searchLabel) {
            searchLabel.textContent = tUI('search.label');
        }
    }

    // Update search input placeholder
    const searchInput = document.getElementById('headerSearchInput');
    if (searchInput) {
        searchInput.placeholder = tUI('search.placeholder');
    }

    // Update breadcrumb home link
    const breadcrumbHome = document.querySelector('.breadcrumb-nav > a[href="#home"]');
    if (breadcrumbHome) {
        breadcrumbHome.textContent = tRoute('home');
    }

    // Update contact link in header
    const contactLink = document.querySelector('.header__link[href*="kontakt"]');
    if (contactLink) {
        contactLink.textContent = tUI('actions.contact');
    }

    // Update toolbar buttons
    const printBtn = document.querySelector('.toolbar-btn[onclick*="print"]');
    if (printBtn) {
        printBtn.title = tUI('actions.print');
        printBtn.setAttribute('aria-label', tUI('actions.print'));
    }

    const shareBtn = document.querySelector('.toolbar-btn[onclick*="share"]');
    if (shareBtn) {
        shareBtn.title = tUI('actions.share');
        shareBtn.setAttribute('aria-label', tUI('actions.share'));
    }

    // Update scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        scrollTopBtn.title = tUI('actions.scrollToTop');
        scrollTopBtn.setAttribute('aria-label', tUI('actions.scrollToTop'));
    }

    // Update contact section
    const contactHeading = document.querySelector('.contact-section h3');
    if (contactHeading) {
        contactHeading.textContent = tUI('actions.contact');
    }

    // Update footer links
    const footerSourceCode = document.querySelector('.footer-content a[href*="github"]');
    if (footerSourceCode) {
        footerSourceCode.textContent = tUI('footer.sourceCode');
    }

    const footerApi = document.querySelector('.footer-content a[href="#api-docs"]');
    if (footerApi) {
        footerApi.textContent = tUI('footer.api');
    }

    const footerLegal = document.querySelector('.footer-content a[href*="rechtliches"]');
    if (footerLegal) {
        footerLegal.textContent = tUI('footer.legal');
    }

    // Update footer version text
    const footerVersion = document.querySelector('.footer-version');
    if (footerVersion) {
        footerVersion.textContent = `${tUI('footer.version')} 1.0.0 | ${tUI('footer.asOf')}: ${tUI('months.december')} 2024`;
    }
}

/**
 * Initialize language dropdown
 */
function initLanguageDropdown() {
    const dropdown = document.getElementById('langDropdown');
    if (!dropdown) return;

    const toggle = dropdown.querySelector('.lang-dropdown__toggle');
    const menu = dropdown.querySelector('.lang-dropdown__menu');
    const items = dropdown.querySelectorAll('.lang-dropdown__item');
    const currentLangEl = document.getElementById('currentLang');

    // Set initial active state based on current language
    const initialLang = getLanguage();
    currentLangEl.textContent = initialLang.toUpperCase();
    items.forEach(item => {
        if (item.dataset.lang === initialLang) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Toggle dropdown
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Select language
    items.forEach(item => {
        item.addEventListener('click', () => {
            const lang = item.dataset.lang;

            // Close dropdown first
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');

            // Update URL with new language (this will trigger hashchange -> router)
            // The router will handle updating the language state and UI
            if (typeof updateURLLanguage === 'function') {
                updateURLLanguage(lang);
            } else {
                // Fallback if updateURLLanguage not available
                setLanguage(lang);
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                currentLangEl.textContent = lang.toUpperCase();
                updateUITranslations();
                if (typeof router === 'function') {
                    router();
                }
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard support
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}
