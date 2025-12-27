/**
 * KBOB Fachdatenkatalog - State Management
 * Global state variables and constants
 */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Escape HTML entities to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// DOM reference
const contentArea = document.getElementById('content-area');

// --- GLOBAL DATA STATE ---
let globalElementsData = [];
let globalDocumentsData = [];
let globalUsecasesData = [];
let globalModelsData = [];
let globalEpdsData = [];
let globalClassificationsData = [];
let globalAttributesData = [];
let globalTagsData = [];
let isDataLoaded = false;

// --- TAGS LOOKUP MAP (for resolving tag IDs to i18n objects) ---
const tagsLookupMap = new Map();

// --- DATA INDEX MAPS (for O(1) lookups) ---
const dataIndexMaps = {
    elements: new Map(),
    documents: new Map(),
    usecases: new Map(),
    models: new Map(),
    epds: new Map(),
    classifications: new Map(),
    attributes: new Map(),
    tags: new Map()
};

/**
 * Build index maps for fast O(1) lookups by ID
 * Called after data is loaded
 */
function buildDataIndexMaps() {
    dataIndexMaps.elements.clear();
    dataIndexMaps.documents.clear();
    dataIndexMaps.usecases.clear();
    dataIndexMaps.models.clear();
    dataIndexMaps.epds.clear();
    dataIndexMaps.classifications.clear();
    dataIndexMaps.attributes.clear();
    dataIndexMaps.tags.clear();

    globalElementsData.forEach(item => dataIndexMaps.elements.set(item.id, item));
    globalDocumentsData.forEach(item => dataIndexMaps.documents.set(item.id, item));
    globalUsecasesData.forEach(item => dataIndexMaps.usecases.set(item.id, item));
    globalModelsData.forEach(item => dataIndexMaps.models.set(item.id, item));
    globalEpdsData.forEach(item => dataIndexMaps.epds.set(item.id, item));
    globalClassificationsData.forEach(item => dataIndexMaps.classifications.set(item.id, item));
    globalAttributesData.forEach(item => dataIndexMaps.attributes.set(item.id, item));
    globalTagsData.forEach(item => dataIndexMaps.tags.set(item.id, item));
}

/**
 * Build tags lookup map for resolving tag IDs to i18n name objects
 * Called after data is loaded
 */
function buildTagsLookupMap() {
    tagsLookupMap.clear();
    globalTagsData.forEach(tag => {
        tagsLookupMap.set(tag.id, tag.name);
    });
}

/**
 * Resolve a tag ID to its i18n name object
 * @param {string} tagId - Tag ID (e.g., "tag-koordination")
 * @returns {Object|null} The i18n name object or null if not found
 */
function getTagById(tagId) {
    return tagsLookupMap.get(tagId) || null;
}

/**
 * Resolve an array of related_tags to localized tag strings
 * @param {Array} relatedTags - Array of tag ID strings (e.g., ["tag-koordination", "tag-dokumentation"])
 * @returns {string[]} Array of localized tag strings
 */
function resolveTagsToStrings(relatedTags) {
    if (!relatedTags || !Array.isArray(relatedTags)) {
        return [];
    }
    return relatedTags
        .map(tagId => {
            const tagName = getTagById(tagId);
            return tagName ? t(tagName) : null;
        })
        .filter(Boolean);
}

/**
 * Resolve an array of related_tags to i18n objects (for tTags compatibility)
 * @param {Array} relatedTags - Array of tag ID strings (e.g., ["tag-koordination", "tag-dokumentation"])
 * @returns {Object[]} Array of i18n name objects
 */
function resolveTagsToI18n(relatedTags) {
    if (!relatedTags || !Array.isArray(relatedTags)) {
        return [];
    }
    return relatedTags
        .map(tagId => getTagById(tagId))
        .filter(Boolean);
}

/**
 * Get item by ID using O(1) Map lookup
 * @param {string} type - Data type (elements, documents, usecases, models, epds)
 * @param {string} id - Item ID
 * @returns {Object|undefined} The item or undefined if not found
 */
function getItemById(type, id) {
    return dataIndexMaps[type]?.get(id);
}

// --- FILTER VISIBILITY STATES ---
let elementsFilterVisible = false;
let documentsFilterVisible = false;
let usecasesFilterVisible = false;
let modelsFilterVisible = false;
let epdsFilterVisible = false;

// --- SEARCH STATE ---
let currentSearchQuery = '';
let currentSearchSort = 'relevance';

// --- UI STATE ---
// Track which cards have expanded tags (show all tags)
const expandedCardTags = new Set();

// --- ROUTE MAPPINGS ---
// Route keys for translation lookup
const routeKeys = ['home', 'elements', 'element', 'documents', 'document', 'usecases', 'usecase', 'models', 'model', 'epds', 'epd', 'handbook', 'search', 'api-docs'];

/**
 * Get translated route name
 * @param {string} routeKey - Route key
 * @returns {string} Translated route name
 */
function getRouteName(routeKey) {
    return tRoute(routeKey);
}

// Legacy compatibility: routeNames object that dynamically returns translated values
const routeNames = new Proxy({}, {
    get: (target, prop) => {
        if (routeKeys.includes(prop)) {
            return tRoute(prop);
        }
        return undefined;
    },
    ownKeys: () => routeKeys,
    getOwnPropertyDescriptor: (target, prop) => {
        if (routeKeys.includes(prop)) {
            return { enumerable: true, configurable: true };
        }
        return undefined;
    }
});

// Parent route mappings for detail pages (also used for detail-to-list redirects)
const parentRoutes = {
    'element': 'elements',
    'document': 'documents',
    'usecase': 'usecases',
    'model': 'models',
    'epd': 'epds',
    'api-docs': 'handbook'
};

// Phase keys for translation lookup
const phaseKeys = [1, 2, 3, 4, 5];

/**
 * Get translated phase label
 * @param {number|string} phaseNum - Phase number (1-5)
 * @returns {string} Translated phase label
 */
function getPhaseLabel(phaseNum) {
    return tPhase(phaseNum);
}

// Legacy compatibility: phaseLabels object that dynamically returns translated values
const phaseLabels = new Proxy({}, {
    get: (target, prop) => {
        const num = typeof prop === 'string' ? parseInt(prop, 10) : prop;
        if (phaseKeys.includes(num)) {
            return tPhase(num);
        }
        return undefined;
    },
    ownKeys: () => phaseKeys.map(String),
    getOwnPropertyDescriptor: (target, prop) => {
        const num = parseInt(prop, 10);
        if (phaseKeys.includes(num)) {
            return { enumerable: true, configurable: true };
        }
        return undefined;
    }
});

// Arrow SVG for Swiss CD style cards
const arrowSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
