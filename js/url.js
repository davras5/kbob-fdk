/**
 * KBOB Fachdatenkatalog - URL Utilities
 * URL parsing and building functions with language support
 */

// --- URL PARSING CACHE ---
// Cache parsed URL params to avoid redundant parsing
let cachedHashParams = null;
let cachedHash = null;

// Supported languages for URL routing
const URL_SUPPORTED_LANGUAGES = ['de', 'fr', 'it', 'en'];

/**
 * Clear the URL parsing cache (called on hash change)
 */
function clearUrlCache() {
    cachedHash = null;
    cachedHashParams = null;
}

// Clear cache when hash changes
window.addEventListener('hashchange', clearUrlCache);

/**
 * Parse the current hash and extract route, id, language, and parameters
 * Supports URL format: #/lang/route/id?params (e.g., #/de/elements?tag=foo)
 * Results are cached until the hash changes
 * @returns {Object} { route, id, lang, tags, phases, searchQuery, category, view }
 */
function parseHashWithParams() {
    const currentHash = window.location.hash;

    // Return cached result if hash hasn't changed
    if (cachedHash === currentHash && cachedHashParams) {
        return cachedHashParams;
    }

    // Remove # and any leading slash (e.g., #/de/elements -> de/elements)
    let fullHash = currentHash.slice(1) || 'home';
    if (fullHash.startsWith('/')) {
        fullHash = fullHash.slice(1);
    }

    // Handle empty hash (Swagger UI sometimes sets #/)
    if (!fullHash || fullHash === '') {
        fullHash = 'home';
    }

    const [hashPart, queryPart] = fullHash.split('?');

    // Parse route, id, and language
    let route = hashPart;
    let id = null;
    let lang = null;

    // Check if first segment is a language code
    const segments = hashPart.split('/');
    if (segments.length >= 1 && URL_SUPPORTED_LANGUAGES.includes(segments[0])) {
        lang = segments[0];
        // Remove language from segments and rebuild route
        segments.shift();
        route = segments.join('/') || 'home';
    }

    // Check for api-docs route
    if (route === 'api-docs' || route.startsWith('api-docs/')) {
        route = 'api-docs';
    } else if (route.startsWith('element/')) {
        id = route.split('/')[1];
        route = 'element';
    } else if (route.startsWith('document/')) {
        id = route.split('/')[1];
        route = 'document';
    } else if (route.startsWith('usecase/')) {
        id = route.split('/')[1];
        route = 'usecase';
    } else if (route.startsWith('model/')) {
        id = route.split('/')[1];
        route = 'model';
    } else if (route.startsWith('epd/')) {
        id = route.split('/')[1];
        route = 'epd';
    }

    // Parse query params
    const tags = [];
    const phases = [];
    let searchQuery = '';
    let category = '';
    let view = 'grid'; // Default view
    if (queryPart) {
        const params = new URLSearchParams(queryPart);
        params.getAll('tag').forEach(tag => {
            if (tag) {
                tags.push(tag);
            }
        });
        params.getAll('phase').forEach(phase => {
            const phaseNum = parseInt(phase, 10);
            if (!isNaN(phaseNum) && phaseNum >= 1 && phaseNum <= 5) {
                phases.push(phaseNum);
            }
        });
        searchQuery = params.get('q') || '';
        category = params.get('category') || '';
        const viewParam = params.get('view');
        if (viewParam === 'list' || viewParam === 'grid') {
            view = viewParam;
        }
    }

    // Cache and return the result
    cachedHashParams = { route, id, lang, tags, phases, searchQuery, category, view };
    cachedHash = currentHash;
    return cachedHashParams;
}

/**
 * Get the language from URL if present
 * @returns {string|null} Language code or null if not in URL
 */
function getLanguageFromURL() {
    return parseHashWithParams().lang;
}

/**
 * Get active tags from the current URL
 * @returns {string[]} Array of tag strings
 */
function getActiveTagsFromURL() {
    return parseHashWithParams().tags;
}

/**
 * Get active category from the current URL
 * @returns {string} Category string or empty string
 */
function getActiveCategoryFromURL() {
    return parseHashWithParams().category;
}

/**
 * Get active view from the current URL
 * @returns {string} View mode ('grid' or 'list'), defaults to 'grid'
 */
function getActiveViewFromURL() {
    return parseHashWithParams().view;
}

/**
 * Get active phases from the current URL
 * @returns {number[]} Array of phase numbers
 */
function getActivePhasesFromURL() {
    return parseHashWithParams().phases || [];
}

/**
 * Build a hash string with language, tags, category, phases, and view
 * @param {string} baseHash - The base hash without params (e.g., 'elements', 'element/123')
 * @param {string[]} tags - Array of tag strings
 * @param {string} category - Optional category string
 * @param {number[]} phases - Optional array of phase numbers
 * @param {string} view - Optional view mode ('grid' or 'list')
 * @param {string} lang - Optional language code (uses current language if not provided)
 * @returns {string} Complete hash string with language prefix and params
 */
function buildHashWithTags(baseHash, tags, category = '', phases = [], view = '', lang = null) {
    // Use provided language or get current language
    const language = lang || (typeof getLanguage === 'function' ? getLanguage() : 'de');

    // Build the base path with language prefix
    let hashPath = `${language}/${baseHash}`;

    // Build query params
    const params = [];
    if (tags && tags.length > 0) {
        tags.forEach(tag => params.push(`tag=${encodeURIComponent(tag)}`));
    }
    if (category) {
        params.push(`category=${encodeURIComponent(category)}`);
    }
    if (phases && phases.length > 0) {
        phases.forEach(phase => params.push(`phase=${phase}`));
    }
    if (view && (view === 'grid' || view === 'list')) {
        params.push(`view=${view}`);
    }
    if (params.length === 0) {
        return hashPath;
    }
    return `${hashPath}?${params.join('&')}`;
}

/**
 * Update the URL to use a different language while preserving the current route and params
 * @param {string} newLang - The new language code ('de', 'fr', 'it', 'en')
 */
function updateURLLanguage(newLang) {
    if (!URL_SUPPORTED_LANGUAGES.includes(newLang)) {
        return;
    }

    const { route, id, tags, phases, category, view } = parseHashWithParams();

    // Build the base route (with id if present)
    let baseRoute = route;
    if (id) {
        baseRoute = `${route}/${id}`;
    }

    // Update hash with new language
    window.location.hash = buildHashWithTags(baseRoute, tags, category, phases, view, newLang);
}

/**
 * Toggle a tag in the URL (add if missing, remove if present)
 * @param {string} tag - Tag string
 */
window.toggleTagInURL = function(tag) {
    const { route, id, tags, category, phases, view } = parseHashWithParams();

    const tagIndex = tags.indexOf(tag);
    if (tagIndex > -1) {
        tags.splice(tagIndex, 1);
    } else {
        tags.push(tag);
    }

    // Build base hash - redirect to list view if on detail page
    let baseHash = route;
    if (id) {
        baseHash = parentRoutes[route] || route;
    }

    window.location.hash = buildHashWithTags(baseHash, tags, category, phases, view);
}

/**
 * Toggle a category in the URL (add if not set, remove if same category)
 * @param {string} cat - Category string
 */
window.toggleCategoryInURL = function(cat) {
    const { route, id, tags, category, phases, view } = parseHashWithParams();

    const newCategory = (category === cat) ? '' : cat;

    let baseHash = route;
    if (id) {
        baseHash = parentRoutes[route] || route;
    }

    window.location.hash = buildHashWithTags(baseHash, tags, newCategory, phases, view);
}

/**
 * Toggle a phase in the URL (add if missing, remove if present)
 * @param {number} phase - Phase number (1-5)
 */
window.togglePhaseInURL = function(phase) {
    const { route, id, tags, category, phases, view } = parseHashWithParams();
    const phaseNum = parseInt(phase, 10);

    const phaseIndex = phases.indexOf(phaseNum);
    if (phaseIndex > -1) {
        phases.splice(phaseIndex, 1);
    } else {
        phases.push(phaseNum);
    }

    let baseHash = route;
    if (id) {
        baseHash = parentRoutes[route] || route;
    }

    window.location.hash = buildHashWithTags(baseHash, tags, category, phases, view);
}

/**
 * Clear all tags from URL (preserves language)
 */
window.clearAllTagsFromURL = function() {
    const { route, id } = parseHashWithParams();
    let baseHash = route;
    if (id) {
        baseHash = `${route}/${id}`;
    }
    // Use buildHashWithTags with empty arrays to preserve language
    window.location.hash = buildHashWithTags(baseHash, [], '', [], '');
}

/**
 * Clear all filters (wrapper for toolbar reset button)
 */
window.clearAllFilters = function(type) {
    clearAllTagsFromURL();
}

/**
 * Navigate to a route while preserving current tags, category, phases, and view
 * @param {string} targetRoute - Target route
 */
function navigateWithTags(targetRoute) {
    const tags = getActiveTagsFromURL();
    const category = getActiveCategoryFromURL();
    const phases = getActivePhasesFromURL();
    const view = getActiveViewFromURL();
    window.location.hash = buildHashWithTags(targetRoute, tags, category, phases, view);
}

/**
 * Build a simple hash with just language prefix (no filters)
 * @param {string} path - The route path (e.g., 'home', 'elements', 'element/123')
 * @returns {string} Hash with language prefix
 */
function buildHashWithLang(path) {
    const language = typeof getLanguage === 'function' ? getLanguage() : 'de';
    return `${language}/${path}`;
}

/**
 * Build a search hash with language prefix
 * @param {string} query - Search query
 * @param {string} view - Optional view parameter
 * @returns {string} Search hash with language prefix
 */
function buildSearchHash(query, view = '') {
    const language = typeof getLanguage === 'function' ? getLanguage() : 'de';
    let hash = `${language}/search?q=${encodeURIComponent(query)}`;
    if (view && (view === 'grid' || view === 'list')) {
        hash += `&view=${view}`;
    }
    return hash;
}
