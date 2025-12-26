/**
 * KBOB Fachdatenkatalog - Data Utilities
 * Data filtering and extraction helpers
 */

/**
 * Filter data by active tags (AND logic - must match all tags)
 * Supports both legacy string arrays and i18n object arrays
 * @param {Array} data - Array of data items
 * @param {string[]} activeTags - Array of tag strings
 * @returns {Array} Filtered data
 */
function filterDataByTags(data, activeTags) {
    if (!activeTags || activeTags.length === 0) {
        return data;
    }

    return data.filter(item => {
        if (!item.tags || !Array.isArray(item.tags)) return false;
        const itemTags = tTags(item.tags);
        return activeTags.every(tag => itemTags.includes(tag));
    });
}

/**
 * Filter data by active category/domain
 * Supports both legacy 'category' field and new 'domain' i18n field
 * @param {Array} data - Array of data items
 * @param {string} activeCategory - Category string
 * @returns {Array} Filtered data
 */
function filterDataByCategory(data, activeCategory) {
    if (!activeCategory) {
        return data;
    }
    return data.filter(item => {
        // Support both legacy 'category' and new 'domain' field
        const itemCategory = item.domain ? t(item.domain) : item.category;
        return itemCategory === activeCategory;
    });
}

/**
 * Filter data by active phases (OR logic - item must include at least one selected phase)
 * @param {Array} data - Array of data items
 * @param {number[]} activePhases - Array of phase numbers
 * @returns {Array} Filtered data
 */
function filterDataByPhases(data, activePhases) {
    if (!activePhases || activePhases.length === 0) {
        return data;
    }
    return data.filter(item => {
        if (!item.phases || !Array.isArray(item.phases)) return false;
        return activePhases.some(phase => item.phases.includes(phase));
    });
}

/**
 * Check if a specific tag is active
 * @param {string} tag - Tag string
 * @returns {boolean}
 */
function isTagActive(tag) {
    const activeTags = getActiveTagsFromURL();
    return activeTags.includes(tag);
}

/**
 * Extract unique categories/domains from data array
 * Supports both legacy 'category' field and new 'domain' i18n field
 * @param {Array} data - Array of data items
 * @returns {string[]} Sorted array of unique categories
 */
function getUniqueCategories(data) {
    if (!data || !Array.isArray(data)) return [];
    const categories = new Set();
    data.forEach(item => {
        // Support both legacy 'category' and new 'domain' field
        const category = item.domain ? t(item.domain) : item.category;
        if (category) {
            categories.add(category);
        }
    });
    return Array.from(categories).sort();
}

/**
 * Extract unique tags from data array
 * Supports both legacy string arrays and i18n object arrays
 * @param {Array} data - Array of data items
 * @returns {string[]} Sorted array of unique tags
 */
function getUniqueTags(data) {
    if (!data || !Array.isArray(data)) return [];
    const tags = new Set();
    data.forEach(item => {
        if (item.tags && Array.isArray(item.tags)) {
            tTags(item.tags).forEach(tag => tags.add(tag));
        }
    });
    return Array.from(tags).sort();
}

/**
 * Sort data by title/name alphabetically (A-Z)
 * Supports both legacy 'title' field and new 'name' i18n field
 * @param {Array} data - Array of data items
 * @returns {Array} Sorted array
 */
function sortDataByTitle(data) {
    if (!data || !Array.isArray(data)) return [];
    return [...data].sort((a, b) => {
        // Support both legacy 'title' and new 'name' field
        const titleA = (a.name ? t(a.name) : a.title || '').toLowerCase();
        const titleB = (b.name ? t(b.name) : b.title || '').toLowerCase();
        return titleA.localeCompare(titleB, 'de');
    });
}
