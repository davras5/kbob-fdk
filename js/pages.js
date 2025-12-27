/**
 * KBOB Fachdatenkatalog - Page Renderers
 * Consolidated page rendering functions
 */

// ============================================
// CATALOG PAGE CONFIGURATION
// ============================================

/**
 * Get translated catalog page configuration
 * @param {string} type - Page type key
 * @returns {Object} Configuration object with translated strings
 */
function getCatalogPageConfig(type) {
    const configs = {
        elements: {
            searchInputId: 'catalogSearchInput',
            searchClearId: 'catalogSearchClear',
            contentId: 'catalogContent',
            filterType: 'elements'
        },
        documents: {
            searchInputId: 'documentsSearchInput',
            searchClearId: 'documentsSearchClear',
            contentId: 'documentsContent',
            filterType: 'documents'
        },
        usecases: {
            searchInputId: 'usecasesSearchInput',
            searchClearId: 'usecasesSearchClear',
            contentId: 'usecasesContent',
            filterType: 'usecases',
            hasPhases: true
        },
        models: {
            searchInputId: 'modelsSearchInput',
            searchClearId: 'modelsSearchClear',
            contentId: 'modelsContent',
            filterType: 'models'
        },
        epds: {
            searchInputId: 'epdsSearchInput',
            searchClearId: 'epdsSearchClear',
            contentId: 'epdsContent',
            filterType: 'epds'
        }
    };

    const config = configs[type];
    if (!config) return null;

    // Add translated strings dynamically
    return {
        ...config,
        title: tPage(type, 'title'),
        lead: tPage(type, 'lead'),
        searchPlaceholder: tUI(`search.placeholder${type.charAt(0).toUpperCase() + type.slice(1)}`)
    };
}

// Legacy compatibility: catalogPageConfig as Proxy for backward compatibility
const catalogPageConfig = new Proxy({}, {
    get: (target, prop) => getCatalogPageConfig(prop)
});

// ============================================
// HOME PAGE
// ============================================

function renderHomePage() {
    contentArea.innerHTML = `
        <div class="home-hero-section">
            <h1 class="home-hero__title">${escapeHtml(tUI('home.heroTitle'))}</h1>
            <p class="hero__description">${escapeHtml(tUI('home.heroDescription'))}</p>
            <div class="home-search-container">
                <div class="gallery-filter-wrapper">
                    <input type="text" id="globalSearchInput" class="gallery-filter-input" placeholder="${escapeHtml(tUI('search.placeholderGlobal'))}" autocomplete="off">
                    <button type="button" class="clear-btn search-clear-btn" id="globalSearchClear" aria-label="${escapeHtml(tUI('search.clear'))}"><i data-lucide="x" aria-hidden="true"></i></button>
                    <button class="gallery-filter-btn" aria-label="${escapeHtml(tUI('search.label'))}"><i data-lucide="search" aria-hidden="true"></i></button>
                </div>
                <div id="globalSearchDropdown" class="search-dropdown"></div>
            </div>
        </div>

        <!-- Section 2: Themen - Light Background -->
        <section class="home-themen-section">
            <div class="container home-section">
                <header class="home-section__header">
                    <h2 class="home-section__title">${escapeHtml(tUI('home.topicsTitle'))}</h2>
                    <p class="home-section__subtitle">${escapeHtml(tUI('home.topicsSubtitle'))}</p>
                </header>
                <div class="quick-access-grid">
                    <a href="#${buildHashWithLang('usecases')}" class="quick-card" data-route="usecases">
                        <h3 class="quick-card__title">${escapeHtml(tUI('home.cardUsecases.title'))}</h3>
                        <p class="quick-card__desc">${escapeHtml(tUI('home.cardUsecases.desc'))}</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#${buildHashWithLang('elements')}" class="quick-card" data-route="elements">
                        <h3 class="quick-card__title">${escapeHtml(tUI('home.cardElements.title'))}</h3>
                        <p class="quick-card__desc">${escapeHtml(tUI('home.cardElements.desc'))}</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#${buildHashWithLang('models')}" class="quick-card" data-route="models">
                        <h3 class="quick-card__title">${escapeHtml(tUI('home.cardModels.title'))}</h3>
                        <p class="quick-card__desc">${escapeHtml(tUI('home.cardModels.desc'))}</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#${buildHashWithLang('documents')}" class="quick-card" data-route="documents">
                        <h3 class="quick-card__title">${escapeHtml(tUI('home.cardDocuments.title'))}</h3>
                        <p class="quick-card__desc">${escapeHtml(tUI('home.cardDocuments.desc'))}</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#${buildHashWithLang('epds')}" class="quick-card" data-route="epds">
                        <h3 class="quick-card__title">${escapeHtml(tUI('home.cardEpds.title'))}</h3>
                        <p class="quick-card__desc">${escapeHtml(tUI('home.cardEpds.desc'))}</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                    <a href="#${buildHashWithLang('api-docs')}" class="quick-card" data-route="api-docs">
                        <h3 class="quick-card__title">${escapeHtml(tUI('home.cardApi.title'))}</h3>
                        <p class="quick-card__desc">${escapeHtml(tUI('home.cardApi.desc'))}</p>
                        <span class="arrow-btn quick-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                    </a>
                </div>
            </div>
        </section>`;

    setupGlobalSearch();
    refreshIcons();
    // Quick-card click handlers are managed via event delegation in app.js
}

// ============================================
// SEARCH RESULTS PAGE
// ============================================

function renderSearchResultsPage(query) {
    currentSearchQuery = query || '';
    const results = performFullSearch(currentSearchQuery);
    const resultCount = results.length;

    let resultsHtml = '';
    if (resultCount === 0 && currentSearchQuery.length >= 2) {
        resultsHtml = `
            <div class="search-results__empty">
                <div class="search-results__empty-icon"><i data-lucide="search-x" aria-hidden="true"></i></div>
                <h3 class="search-results__empty-title">${escapeHtml(tUI('search.noResults'))}</h3>
                <p class="search-results__empty-text">${escapeHtml(tUI('search.tryOtherTerms'))}</p>
            </div>
        `;
    } else if (getActiveViewFromURL() === 'list') {
        resultsHtml = `<div class="search-results__list">`;
        results.forEach(item => {
            const dateStr = formatSearchDate(item.date);
            const safeTitle = escapeHtml(item.title || '');
            const safeDesc = escapeHtml(item.description || '');
            const safeType = escapeHtml(item.type || '');
            const safeId = escapeHtml(item.id || '');
            const safeCat = escapeHtml(item.category || '');
            const itemHref = buildHashWithLang(`${safeCat}/${safeId}`);
            resultsHtml += `
                <a href="#${itemHref}" class="search-result-item">
                    <div class="search-result-item__meta">
                        <span class="search-result-item__type">${safeType}</span>
                        ${dateStr ? `<span class="search-result-item__date">${dateStr}</span>` : ''}
                    </div>
                    <h3 class="search-result-item__title">${safeTitle}</h3>
                    <p class="search-result-item__desc">${safeDesc}</p>
                </a>
            `;
        });
        resultsHtml += `</div>`;
    } else {
        resultsHtml = `<div class="search-results__grid">`;
        results.forEach(item => {
            const dateStr = formatSearchDate(item.date);
            const safeTitle = escapeHtml(item.title || '');
            const safeDesc = escapeHtml(item.description || '');
            const safeType = escapeHtml(item.type || '');
            const safeId = escapeHtml(item.id || '');
            const safeCat = escapeHtml(item.category || '');
            const itemHref = buildHashWithLang(`${safeCat}/${safeId}`);
            resultsHtml += `
                <a href="#${itemHref}" class="search-result-card">
                    <div class="search-result-card__meta">
                        <span class="search-result-card__type">${safeType}</span>
                        ${dateStr ? `<span class="search-result-card__date">${dateStr}</span>` : ''}
                    </div>
                    <h3 class="search-result-card__title">${safeTitle}</h3>
                    <p class="search-result-card__desc">${safeDesc}</p>
                    <span class="arrow-btn search-result-card__arrow-btn" aria-hidden="true"><i data-lucide="arrow-right"></i></span>
                </a>
            `;
        });
        resultsHtml += `</div>`;
    }

    const safeSearchQuery = escapeHtml(currentSearchQuery);
    const sortLabels = {
        'relevance': tUI('sort.byRelevance'),
        'date-desc': tUI('sort.byDateDesc'),
        'date-asc': tUI('sort.byDateAsc')
    };
    contentArea.innerHTML = `
        <div class="search-hero">
            <div class="container">
                <h1 class="search-hero__title">${escapeHtml(tUI('search.label'))}</h1>
                <form class="search-hero__form" id="searchPageForm" role="search">
                    <div class="search-hero__input-wrapper">
                        <input type="search" id="searchPageInput" class="search-hero__input" value="${safeSearchQuery}" placeholder="${escapeHtml(tUI('search.placeholderInput'))}" autocomplete="off">
                        <button type="button" class="clear-btn search-hero__clear ${currentSearchQuery ? 'visible' : ''}" id="searchPageClear" aria-label="${escapeHtml(tUI('search.clear'))}">
                            <i data-lucide="x" aria-hidden="true"></i>
                        </button>
                        <button type="submit" class="search-hero__submit" aria-label="${escapeHtml(tUI('search.label'))}">
                            <i data-lucide="search" aria-hidden="true"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="search-results">
            <div class="container">
                ${currentSearchQuery.length >= 2 ? `
                <div class="search-results__header">
                    <span class="search-results__count">${resultCount} ${escapeHtml(tUI('search.results'))}</span>
                    <div class="search-results__controls">
                        <div class="sort-dropdown-container">
                            <button class="search-results__sort" data-action="toggle-sort-dropdown">
                                <span>${escapeHtml(sortLabels[currentSearchSort] || sortLabels['relevance'])}</span>
                                <i data-lucide="chevron-down" aria-hidden="true"></i>
                            </button>
                            <div class="sort-dropdown">
                                <button class="sort-dropdown__item ${currentSearchSort === 'relevance' ? 'active' : ''}" data-action="set-search-sort" data-sort="relevance">${escapeHtml(tUI('sort.byRelevance'))}</button>
                                <button class="sort-dropdown__item ${currentSearchSort === 'date-desc' ? 'active' : ''}" data-action="set-search-sort" data-sort="date-desc">${escapeHtml(tUI('sort.byDateDesc'))}</button>
                                <button class="sort-dropdown__item ${currentSearchSort === 'date-asc' ? 'active' : ''}" data-action="set-search-sort" data-sort="date-asc">${escapeHtml(tUI('sort.byDateAsc'))}</button>
                            </div>
                        </div>
                        <div class="view-switcher toolbar-control">
                            <button class="view-btn ${getActiveViewFromURL() === 'list' ? 'active' : ''}" data-action="switch-search-view" data-view="list" title="${escapeHtml(tUI('view.list'))}" aria-label="${escapeHtml(tUI('view.list'))}">
                                <i data-lucide="list" aria-hidden="true"></i>
                            </button>
                            <button class="view-btn ${getActiveViewFromURL() === 'grid' ? 'active' : ''}" data-action="switch-search-view" data-view="grid" title="${escapeHtml(tUI('view.grid'))}" aria-label="${escapeHtml(tUI('view.grid'))}">
                                <i data-lucide="layout-grid" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
                ` : ''}
                ${resultsHtml}
            </div>
        </div>
    `;

    const searchForm = document.getElementById('searchPageForm');
    const searchInput = document.getElementById('searchPageInput');
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newQuery = searchInput.value.trim();
            if (newQuery.length >= 2) {
                const view = getActiveViewFromURL();
                window.location.hash = buildSearchHash(newQuery, view !== 'grid' ? view : '');
            }
        });
    }

    refreshIcons();
    setupSearchClearButton('searchPageInput', 'searchPageClear');
}

// ============================================
// GENERIC CATALOG PAGE RENDERER
// ============================================

/**
 * Generic catalog page renderer with lazy loading support
 * @param {string} type - Catalog type key (elements, documents, usecases, models, epds)
 * @param {string[]} activeTags - Active tag filters
 * @param {string} activeCategory - Active category filter
 */
function renderGenericCatalogPage(type, activeTags = [], activeCategory = '') {
    const pageConfig = catalogPageConfig[type];
    const typeConfig = catalogTypeConfig[type];

    if (!pageConfig || !typeConfig) {
        contentArea.innerHTML = `<div class="container error-state">${escapeHtml(tUI('status.pageNotFound'))}</div>`;
        return;
    }

    // Get active phases for usecases
    const activePhases = typeConfig.hasPhases ? getActivePhasesFromURL() : [];

    // Apply filters (data is pre-sorted at load time for performance)
    let filteredData = filterDataByCategory(typeConfig.getData(), activeCategory);
    filteredData = filterDataByTags(filteredData, activeTags);
    if (typeConfig.hasPhases) {
        filteredData = filterDataByPhases(filteredData, activePhases);
    }

    // Initialize pagination with filtered data
    const initialBatch = initPagination(type, filteredData);

    const filterPanelClass = typeConfig.getFilterVisible() ? '' : 'closed';
    const currentView = getActiveViewFromURL();
    const gridActive = currentView === 'grid' ? 'active' : '';
    const listActive = currentView === 'list' ? 'active' : '';
    const activeFiltersCount = activeTags.length + (activeCategory ? 1 : 0) + activePhases.length;

    // Render initial items
    const initialItemsHtml = currentView === 'grid'
        ? renderGenericGridItems(type, initialBatch.items, activeTags, activeCategory)
        : renderGenericListItems(type, initialBatch.items, activeTags, activeCategory);

    // Add sentinel if there are more items
    const sentinelHtml = initialBatch.hasMore
        ? renderLoadingSentinel(type)
        : (initialBatch.totalCount > 0 ? renderEndOfResults(initialBatch.loadedCount, initialBatch.totalCount) : '');

    // Render page
    contentArea.innerHTML = `
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">${pageConfig.title}</h1>
                <p class="page-lead">${pageConfig.lead}</p>
            </div>
            <div class="gallery-filter-container">
                <div class="gallery-filter-left">
                    <div class="gallery-filter-wrapper">
                        <input type="text" id="${pageConfig.searchInputId}" class="gallery-filter-input" placeholder="${escapeHtml(pageConfig.searchPlaceholder)}">
                        <button type="button" class="clear-btn search-clear-btn" id="${pageConfig.searchClearId}" aria-label="${escapeHtml(tUI('search.clear'))}"><i data-lucide="x" aria-hidden="true"></i></button>
                        <button class="gallery-filter-btn" aria-label="${escapeHtml(tUI('search.label'))}"><i data-lucide="search" aria-hidden="true"></i></button>
                    </div>
                    ${renderFilterButton(pageConfig.filterType, typeConfig.getFilterVisible(), activeFiltersCount)}
                </div>
                <div class="search-results__controls">
                    <span class="results-count" id="${type}ResultsCount">${initialBatch.loadedCount} ${escapeHtml(tUI('pagination.of'))} ${initialBatch.totalCount}</span>
                    <button class="search-results__sort">
                        <span>${escapeHtml(tUI('sort.byTitleAZ'))}</span>
                        <i data-lucide="chevron-down" aria-hidden="true"></i>
                    </button>
                    <div class="view-switcher toolbar-control">
                        <button class="view-btn ${listActive}" data-action="switch-view" data-view="list" aria-label="${escapeHtml(tUI('view.list'))}"><i data-lucide="list" aria-hidden="true"></i></button>
                        <button class="view-btn ${gridActive}" data-action="switch-view" data-view="grid" aria-label="${escapeHtml(tUI('view.grid'))}"><i data-lucide="layout-grid" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>

            ${renderFilterBar({
                data: typeConfig.getData(),
                activeTags: activeTags,
                activeCategory: activeCategory,
                activePhases: activePhases,
                showPhases: typeConfig.hasPhases || false,
                filterPanelClass: filterPanelClass
            })}

            <div id="${pageConfig.contentId}" class="catalog-content">
                ${currentView === 'grid'
                    ? `<div class="element-grid">${initialItemsHtml}${sentinelHtml}</div>`
                    : renderListContentWithSentinel(type, initialBatch.items, activeTags, activeCategory, sentinelHtml)
                }
            </div>
        </div>`;

    // Setup lazy loading if more items available
    if (initialBatch.hasMore) {
        setupCatalogLazyLoading(type, pageConfig.contentId, activeTags, activeCategory, currentView);
    }

    // Setup search input handler with debouncing for performance
    setupCatalogSearch(type, pageConfig, typeConfig, activeTags, activeCategory, activePhases);

    refreshIcons();
    setupSearchClearButton(pageConfig.searchInputId, pageConfig.searchClearId);

    // Fit card tags to single row in grid view
    if (getActiveViewFromURL() === 'grid' && typeof fitAllCardTagsToSingleRow === 'function') {
        fitAllCardTagsToSingleRow();
    }
}

/**
 * Setup lazy loading observer for catalog page
 * @param {string} type - Catalog type key
 * @param {string} contentId - Content container ID
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 * @param {string} viewMode - Current view mode ('grid' or 'list')
 */
function setupCatalogLazyLoading(type, contentId, activeTags, activeCategory, viewMode) {
    const container = document.getElementById(contentId);
    if (!container) return;

    const sentinel = container.querySelector('.lazy-load-sentinel');
    if (!sentinel) return;

    // Named function so we can reference it for recursive observer setup
    function handleLoadMore(batch) {
        // Append new items based on view mode
        if (viewMode === 'grid') {
            appendGridItems(type, container, batch.items, activeTags, activeCategory);
            const grid = container.querySelector('.element-grid');
            updateGridSentinel(grid, type, batch.hasMore, batch.loadedCount, batch.totalCount);
        } else {
            appendListItems(type, container, batch.items, activeTags, activeCategory);
            const listContainer = container.querySelector('.element-list-container');
            updateListSentinel(listContainer, type, batch.hasMore, batch.loadedCount, batch.totalCount);
        }

        // Update results count
        const resultsCount = document.getElementById(`${type}ResultsCount`);
        if (resultsCount) {
            resultsCount.textContent = `${batch.loadedCount} von ${batch.totalCount}`;
        }

        // Setup observer for new sentinel if more items available
        if (batch.hasMore) {
            const newSentinel = container.querySelector('.lazy-load-sentinel');
            if (newSentinel) {
                setupLazyLoadObserver(type, newSentinel, handleLoadMore);
            }
        }
    }

    setupLazyLoadObserver(type, sentinel, handleLoadMore);
}

/**
 * Setup search input with lazy loading reset
 * @param {string} type - Catalog type key
 * @param {Object} pageConfig - Page configuration
 * @param {Object} typeConfig - Type configuration
 * @param {string[]} activeTags - Currently active tags
 * @param {string} activeCategory - Currently active category
 * @param {number[]} activePhases - Currently active phases
 */
function setupCatalogSearch(type, pageConfig, typeConfig, activeTags, activeCategory, activePhases) {
    const searchInput = document.getElementById(pageConfig.searchInputId);
    if (!searchInput) return;

    let searchDebounceTimer = null;

    searchInput.addEventListener('input', (e) => {
        // Clear previous debounce timer
        clearTimeout(searchDebounceTimer);

        // Debounce search for 200ms to avoid excessive re-renders
        searchDebounceTimer = setTimeout(() => {
            document.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
            const searchTerm = e.target.value.toLowerCase();

            // Apply all filters plus search term
            let searchFilteredData = filterDataByCategory(typeConfig.getData(), activeCategory);
            searchFilteredData = filterDataByTags(searchFilteredData, activeTags);
            if (typeConfig.hasPhases) {
                searchFilteredData = filterDataByPhases(searchFilteredData, activePhases);
            }

            // Filter by search term using configured search fields (i18n-aware)
            if (searchTerm) {
                searchFilteredData = searchFilteredData.filter(item =>
                    typeConfig.searchFields.some(field => {
                        const value = getSearchableValue(item, field);
                        return value && value.toLowerCase().includes(searchTerm);
                    })
                );
            }

            // Re-initialize pagination with new filtered data
            const batch = initPagination(type, searchFilteredData);

            const container = document.getElementById(pageConfig.contentId);
            const isGridView = getActiveViewFromURL() === 'grid';

            const itemsHtml = isGridView
                ? renderGenericGridItems(type, batch.items, activeTags, activeCategory)
                : renderGenericListItems(type, batch.items, activeTags, activeCategory);

            const sentinelHtml = batch.hasMore
                ? renderLoadingSentinel(type)
                : (batch.totalCount > 0 ? renderEndOfResults(batch.loadedCount, batch.totalCount) : '');

            container.innerHTML = isGridView
                ? `<div class="element-grid">${itemsHtml}${sentinelHtml}</div>`
                : renderListContentWithSentinel(type, batch.items, activeTags, activeCategory, sentinelHtml);

            // Update count
            const resultsCount = document.getElementById(`${type}ResultsCount`);
            if (resultsCount) {
                resultsCount.textContent = `${batch.loadedCount} von ${batch.totalCount}`;
            }

            refreshIcons(container);

            if (isGridView && typeof fitAllCardTagsToSingleRow === 'function') {
                fitAllCardTagsToSingleRow();
            }

            // Setup lazy loading for filtered results
            if (batch.hasMore) {
                setupCatalogLazyLoading(type, pageConfig.contentId, activeTags, activeCategory, isGridView ? 'grid' : 'list');
            }
        }, 200);
    });
}

// ============================================
// BACKWARD COMPATIBLE CATALOG PAGE WRAPPERS
// ============================================

function renderCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('elements', activeTags, activeCategory);
}

function renderDocumentsCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('documents', activeTags, activeCategory);
}

function renderUsecasesCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('usecases', activeTags, activeCategory);
}

function renderModelsCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('models', activeTags, activeCategory);
}

function renderEpdsCatalogPage(activeTags = [], activeCategory = '') {
    renderGenericCatalogPage('epds', activeTags, activeCategory);
}
