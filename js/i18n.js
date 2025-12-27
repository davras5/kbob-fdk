/**
 * KBOB Fachdatenkatalog - Internationalization (i18n) Helpers
 * Provides utilities for accessing localized strings from i18n objects
 */

// ============================================
// LANGUAGE CONFIGURATION
// ============================================

/**
 * Supported languages
 */
const SUPPORTED_LANGUAGES = ['de', 'fr', 'it', 'en'];

/**
 * Current display language
 * Supported: 'de', 'fr', 'it', 'en'
 */
let currentLang = 'de';

/**
 * UI translations loaded from data/translations/ui.json
 */
let uiTranslations = null;

/**
 * Flag to track if UI translations are loaded
 */
let uiTranslationsLoaded = false;

/**
 * Set the current display language
 * @param {string} lang - Language code ('de', 'fr', 'it', 'en')
 * @param {boolean} [persist=true] - Whether to save to localStorage
 */
function setLanguage(lang, persist = true) {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
        currentLang = lang;
        if (persist) {
            try {
                localStorage.setItem('kbob-lang', lang);
            } catch (e) {
                // localStorage not available (e.g., private browsing)
            }
        }
    }
}

/**
 * Get the current display language
 * @returns {string} Current language code
 */
function getLanguage() {
    return currentLang;
}

/**
 * Initialize language from URL, localStorage, or browser preference
 * Priority: URL > localStorage > browser language > default (de)
 * @param {string} [urlLang] - Language from URL (if present)
 * @returns {string} The initialized language code
 */
function initLanguage(urlLang) {
    let lang = 'de'; // Default

    // Priority 1: URL language parameter
    if (urlLang && SUPPORTED_LANGUAGES.includes(urlLang)) {
        lang = urlLang;
    }
    // Priority 2: localStorage
    else {
        try {
            const storedLang = localStorage.getItem('kbob-lang');
            if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
                lang = storedLang;
            }
        } catch (e) {
            // localStorage not available
        }
    }

    setLanguage(lang, true);
    return lang;
}

/**
 * Load UI translations from JSON file
 * @returns {Promise<Object>} The loaded translations object
 */
async function loadUITranslations() {
    if (uiTranslationsLoaded && uiTranslations) {
        return uiTranslations;
    }

    try {
        const response = await fetch('data/translations/ui.json');
        if (!response.ok) {
            throw new Error(`Failed to load translations: ${response.status}`);
        }
        uiTranslations = await response.json();
        uiTranslationsLoaded = true;
        return uiTranslations;
    } catch (error) {
        console.error('Error loading UI translations:', error);
        uiTranslations = {};
        uiTranslationsLoaded = true;
        return uiTranslations;
    }
}

// ============================================
// TRANSLATION HELPERS
// ============================================

/**
 * Get localized string from an i18n object
 *
 * @param {Object} i18nObj - i18n object like {"de": "...", "fr": "..."}
 * @param {string} [fallbackLang='de'] - Fallback language if current language has no value
 * @returns {string} The localized string, or empty string if not found
 *
 * @example
 * t({"de": "Wand", "fr": "Mur", "it": "Parete", "en": "Wall"}) // Returns "Wand" (if currentLang is 'de')
 * t(null) // Returns ""
 */
function t(i18nObj, fallbackLang = 'de') {
    if (i18nObj === null || i18nObj === undefined) {
        return '';
    }

    // Handle plain string (defensive)
    if (typeof i18nObj === 'string') {
        return i18nObj;
    }

    // Handle i18n object
    if (typeof i18nObj === 'object') {
        // Try current language first
        if (i18nObj[currentLang]) {
            return i18nObj[currentLang];
        }
        // Fall back to specified fallback language (default: German)
        if (i18nObj[fallbackLang]) {
            return i18nObj[fallbackLang];
        }
        // Last resort: return first non-empty value
        for (const lang of ['de', 'fr', 'it', 'en']) {
            if (i18nObj[lang]) {
                return i18nObj[lang];
            }
        }
    }

    return '';
}

/**
 * Get localized strings from an array of i18n objects (tags)
 *
 * @param {Array<Object>} tagsArray - Array of i18n objects
 * @returns {string[]} Array of localized strings
 *
 * @example
 * tTags([{"de": "Betrieb", "fr": "Exploitation"}, {"de": "Koordination", "fr": "Coordination"}])
 * // Returns ["Betrieb", "Koordination"] (if currentLang is 'de')
 */
function tTags(tagsArray) {
    if (!tagsArray || !Array.isArray(tagsArray)) {
        return [];
    }

    return tagsArray.map(tag => t(tag));
}

/**
 * Check if a value is an i18n object (has language keys)
 * @param {*} value - Value to check
 * @returns {boolean} True if value is an i18n object
 */
function isI18nObject(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }
    // Check if it has at least one language key
    return ['de', 'fr', 'it', 'en'].some(lang => lang in value);
}

/**
 * Create an i18n object with German value and empty placeholders for other languages
 *
 * @param {string} germanValue - The German text value
 * @returns {Object} i18n object with German value and empty placeholders
 *
 * @example
 * createI18n("Wand") // Returns {"de": "Wand", "fr": "", "it": "", "en": ""}
 */
function createI18n(germanValue) {
    return {
        de: germanValue || '',
        fr: '',
        it: '',
        en: ''
    };
}

/**
 * Create an array of i18n objects from an array of German strings
 *
 * @param {string[]} germanArray - Array of German strings
 * @returns {Object[]} Array of i18n objects
 *
 * @example
 * createI18nArray(["Betrieb", "Koordination"])
 * // Returns [{"de": "Betrieb", "fr": "", "it": "", "en": ""}, {"de": "Koordination", "fr": "", "it": "", "en": ""}]
 */
function createI18nArray(germanArray) {
    if (!Array.isArray(germanArray)) {
        return [];
    }
    return germanArray.map(value => createI18n(value));
}

// ============================================
// UI TRANSLATION HELPERS
// ============================================

/**
 * Get a UI translation by dot-notation path
 *
 * @param {string} path - Dot-notation path to the translation (e.g., 'nav.elements', 'search.placeholder')
 * @param {Object} [replacements] - Optional object with placeholder replacements (e.g., {count: 5})
 * @returns {string} The translated string for the current language, or the path if not found
 *
 * @example
 * tUI('nav.elements') // Returns "Elemente" (if currentLang is 'de')
 * tUI('search.resultCount', {count: 42}) // Returns "42 Suchergebnisse"
 * tUI('nonexistent.path') // Returns "nonexistent.path" (fallback)
 */
function tUI(path, replacements = null) {
    if (!uiTranslations || !path) {
        return path || '';
    }

    // Navigate to the translation using dot notation
    const keys = path.split('.');
    let value = uiTranslations;

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            // Path not found, return the path as fallback
            return path;
        }
    }

    // If we reached an i18n object, get the current language value
    if (value && typeof value === 'object') {
        let result = value[currentLang] || value['de'] || path;

        // Apply replacements if provided
        if (replacements && typeof result === 'string') {
            for (const [key, val] of Object.entries(replacements)) {
                result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), val);
            }
        }

        return result;
    }

    return path;
}

/**
 * Get phase label by phase number
 * @param {number|string} phaseNum - Phase number (1-5)
 * @returns {string} Translated phase label
 */
function tPhase(phaseNum) {
    return tUI(`phases.${phaseNum}`);
}

/**
 * Get route name translation
 * @param {string} routeKey - Route key (e.g., 'home', 'elements', 'usecases')
 * @returns {string} Translated route name
 */
function tRoute(routeKey) {
    return tUI(`routes.${routeKey}`);
}

/**
 * Get navigation label translation
 * @param {string} navKey - Navigation key (e.g., 'home', 'elements', 'usecases')
 * @returns {string} Translated navigation label
 */
function tNav(navKey) {
    return tUI(`nav.${navKey}`);
}

/**
 * Get entity type translation
 * @param {string} entityKey - Entity key (e.g., 'element', 'document', 'usecase')
 * @returns {string} Translated entity type
 */
function tEntity(entityKey) {
    return tUI(`entityTypes.${entityKey}`);
}

/**
 * Get page configuration translation
 * @param {string} pageKey - Page key (e.g., 'elements', 'documents')
 * @param {string} field - Field name ('title' or 'lead')
 * @returns {string} Translated page text
 */
function tPage(pageKey, field) {
    return tUI(`pages.${pageKey}.${field}`);
}

/**
 * Check if UI translations are loaded
 * @returns {boolean} True if translations are loaded
 */
function isUITranslationsLoaded() {
    return uiTranslationsLoaded;
}
