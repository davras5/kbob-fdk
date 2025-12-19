/**
 * KBOB Fachdatenkatalog - State Management
 * Global state variables and constants
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Classification mapping (e.g., eBKP-H, DIN 276, Uniformat II)
 * @typedef {Object.<string, string|string[]>} Classifications
 */

/**
 * IFC mapping for elements
 * @typedef {Object} IFCMapping
 * @property {string} element - Element name
 * @property {string} ifc - IFC 4.3 class
 * @property {string} [revit] - Revit category translation
 */

/**
 * Geometry specification for elements
 * @typedef {Object} GeometrySpec
 * @property {string} name - Geometry attribute name
 * @property {string} desc - Description
 * @property {number[]} phases - Applicable phases (1-5)
 */

/**
 * Information/LOI attribute for elements
 * @typedef {Object} InformationSpec
 * @property {string} name - Attribute name
 * @property {string} [desc] - Description
 * @property {string} format - Data format
 * @property {boolean} [list] - Whether attribute is part of standard list
 * @property {string} [ifc] - IFC property mapping
 * @property {number[]} phases - Applicable phases (1-5)
 */

/**
 * Documentation requirement for elements
 * @typedef {Object} DocumentationSpec
 * @property {string} name - Document type name
 * @property {string} desc - Description
 * @property {number[]} phases - Applicable phases (1-5)
 */

/**
 * Element data structure
 * @typedef {Object} Element
 * @property {string} id - Unique identifier (e.g., "e1")
 * @property {string} title - Display title
 * @property {string} [image] - Image path
 * @property {string} category - Category name
 * @property {string} [description] - Element description
 * @property {string[]} [tags] - Array of tags for filtering
 * @property {string} [version] - Data version
 * @property {string} [lastChange] - Last modification date (ISO format)
 * @property {Classifications} [classifications] - Classification mappings
 * @property {IFCMapping[]} [ifcMapping] - IFC class mappings
 * @property {GeometrySpec[]} [geometry] - Geometry specifications
 * @property {InformationSpec[]} [information] - Information/LOI attributes
 * @property {DocumentationSpec[]} [documentation] - Documentation requirements
 */

/**
 * Document data structure
 * @typedef {Object} Document
 * @property {string} id - Unique identifier
 * @property {string} title - Display title
 * @property {string} [image] - Image path
 * @property {string} category - KBOB category (O, K, B, V)
 * @property {string} [description] - Document description
 * @property {string[]} [tags] - Array of tags
 * @property {string} [version] - Data version
 * @property {string} [lastChange] - Last modification date
 * @property {number[]} [phases] - Applicable phases (1-5)
 * @property {string[]} [formats] - Supported file formats
 * @property {string} [retention] - Retention specification
 * @property {Classifications} [classifications] - Classification mappings
 */

/**
 * Use case prerequisites
 * @typedef {Object} Prerequisites
 * @property {string[]} [client] - Client (Auftraggeber) requirements
 * @property {string[]} [contractor] - Contractor (Auftragnehmer) requirements
 */

/**
 * Role definition for use cases
 * @typedef {Object} Role
 * @property {string} actor - Actor/stakeholder name
 * @property {string[]} [responsible] - Responsible (R) activities
 * @property {string[]} [contributing] - Contributing (C) activities
 * @property {string[]} [informed] - Informed (I) activities
 */

/**
 * Practice example for use cases
 * @typedef {Object} PracticeExample
 * @property {string} title - Example title
 * @property {string} [description] - Example description
 * @property {string} [image] - Example image path
 */

/**
 * Use case data structure
 * @typedef {Object} UseCase
 * @property {string} id - Unique identifier (e.g., "uc040")
 * @property {string} title - Display title
 * @property {string} [image] - Image path
 * @property {string} category - Use case category
 * @property {string} [description] - Short description
 * @property {string[]} [tags] - Array of tags
 * @property {string} [version] - Data version
 * @property {string} [lastChange] - Last modification date
 * @property {number[]} phases - Applicable phases (1-5)
 * @property {string} [definition] - Detailed definition
 * @property {string[]} [goals] - Benefits/goals list
 * @property {Prerequisites} [prerequisites] - Prerequisites
 * @property {string[]} [implementation] - Implementation steps
 * @property {string[]} [inputs] - Required inputs
 * @property {string[]} [outputs] - Expected outputs
 * @property {PracticeExample} [practiceExample] - Practice example
 * @property {string[]} [qualityCriteria] - Quality criteria list
 * @property {Role[]} [roles] - Roles and responsibilities
 * @property {string} [process_url] - BPMN process diagram URL
 */

/**
 * Model data structure
 * @typedef {Object} Model
 * @property {string} id - Unique identifier
 * @property {string} title - Display title
 * @property {string} [image] - Image path
 * @property {string} category - Model category
 * @property {string} [description] - Model description
 * @property {string[]} [tags] - Array of tags
 * @property {string} [version] - Data version
 * @property {string} [lastChange] - Last modification date
 * @property {number[]} [phases] - Applicable phases (1-5)
 * @property {Array<{name: string, description: string, phases: number[]}>} [elements] - Model elements
 */

/**
 * EPD (Environmental Product Declaration) data structure
 * @typedef {Object} EPD
 * @property {string} id - Unique identifier
 * @property {string} title - Display title
 * @property {string} [image] - Image path
 * @property {string} category - EPD category
 * @property {string} [subcategory] - EPD subcategory
 * @property {string} [description] - EPD description
 * @property {string[]} [tags] - Array of tags
 * @property {string} [version] - Data version
 * @property {string} [lastChange] - Last modification date
 * @property {string} [uuid] - EPD UUID
 * @property {string} [unit] - Reference unit (m2, m3, etc.)
 * @property {number} [gwp] - Global Warming Potential (kg CO2-eq)
 * @property {number} [ubp] - Environmental Impact Points
 * @property {number} [penrt] - Primary Energy Non-Renewable Total (kWh oil-eq)
 * @property {number} [pert] - Primary Energy Renewable Total (kWh oil-eq)
 * @property {number} [density] - Material density
 * @property {number} [biogenicCarbon] - Biogenic carbon content (kg C)
 */

/**
 * URL state object returned by parseHashWithParams
 * @typedef {Object} URLState
 * @property {string} route - Current route name
 * @property {string|null} id - Item ID for detail pages
 * @property {string[]} tags - Active tag filters
 * @property {number[]} phases - Active phase filters (1-5)
 * @property {string} searchQuery - Search query string
 * @property {string} category - Active category filter
 * @property {'grid'|'list'} view - View mode
 */

/**
 * Error message configuration
 * @typedef {Object} ErrorConfig
 * @property {string} title - Error title
 * @property {string} message - User-friendly error message
 * @property {string} icon - Lucide icon name
 * @property {boolean} recoverable - Whether user can retry
 */

/**
 * Catalog type configuration
 * @typedef {Object} CatalogTypeConfig
 * @property {string} routePrefix - URL route prefix
 * @property {string} cardIdPrefix - Card ID prefix
 * @property {string} icon - Lucide icon name
 * @property {string} subtitleField - Field to use for subtitle
 * @property {string[]} searchFields - Fields to search
 * @property {function(): Array} getData - Function to get data array
 * @property {function(): boolean} getFilterVisible - Get filter visibility
 * @property {function(boolean): void} setFilterVisible - Set filter visibility
 * @property {boolean} [hasPhases] - Whether type supports phase filtering
 */

/**
 * Search data type configuration
 * @typedef {Object} SearchDataType
 * @property {string} key - Data type key
 * @property {string} resultKey - Result grouping key
 * @property {string} label - Display label
 * @property {string} type - Type name for display
 * @property {string} routePrefix - URL route prefix
 * @property {function(): Array} getData - Function to get data array
 * @property {string[]} searchFields - Fields to search
 * @property {string} descriptionField - Field for description fallback
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

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Error type configurations with user-friendly messages
 * @type {Object.<string, {title: string, message: string, icon: string, recoverable: boolean}>}
 */
const ERROR_MESSAGES = {
    dataLoad: {
        title: 'Daten konnten nicht geladen werden',
        message: 'Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
        icon: 'wifi-off',
        recoverable: true
    },
    notFound: {
        title: 'Inhalt nicht gefunden',
        message: 'Der angeforderte Inhalt existiert nicht oder wurde verschoben.',
        icon: 'file-question',
        recoverable: false
    },
    pageError: {
        title: 'Seite konnte nicht angezeigt werden',
        message: 'Beim Laden der Seite ist ein Fehler aufgetreten.',
        icon: 'alert-triangle',
        recoverable: true
    },
    generic: {
        title: 'Ein Fehler ist aufgetreten',
        message: 'Bitte laden Sie die Seite neu oder versuchen Sie es später erneut.',
        icon: 'alert-circle',
        recoverable: true
    }
};

/**
 * Show user-friendly error message
 * Logs technical details to console but shows friendly message to user
 * @param {string} errorType - Key from ERROR_MESSAGES
 * @param {Error|string|null} technicalError - Technical error for logging
 * @param {HTMLElement|null} [container] - Container to render error in (defaults to contentArea)
 */
function showUserError(errorType, technicalError = null, container = null) {
    // Log technical details for debugging
    if (technicalError) {
        console.error(`[${errorType}]`, technicalError);
    }

    const config = ERROR_MESSAGES[errorType] || ERROR_MESSAGES.generic;
    const targetContainer = container || document.getElementById('content-area');

    if (!targetContainer) {
        console.error('Error container not found');
        return;
    }

    const retryButton = config.recoverable
        ? `<button class="error-state__retry" onclick="location.reload()">
               <i data-lucide="refresh-cw" aria-hidden="true"></i>
               Seite neu laden
           </button>`
        : `<a href="#home" class="error-state__home">
               <i data-lucide="home" aria-hidden="true"></i>
               Zur Startseite
           </a>`;

    targetContainer.innerHTML = `
        <div class="container error-state">
            <i data-lucide="${config.icon}" class="error-state__icon" aria-hidden="true"></i>
            <h2 class="error-state__title">${escapeHtml(config.title)}</h2>
            <p class="error-state__message">${escapeHtml(config.message)}</p>
            ${retryButton}
        </div>
    `;

    // Initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ============================================
// GLOBAL STATE
// ============================================

/** @type {HTMLElement|null} Main content area DOM reference */
const contentArea = document.getElementById('content-area');

// --- GLOBAL DATA STATE ---
/** @type {Element[]} */
let globalElementsData = [];
/** @type {Document[]} */
let globalDocumentsData = [];
/** @type {UseCase[]} */
let globalUsecasesData = [];
/** @type {Model[]} */
let globalModelsData = [];
/** @type {EPD[]} */
let globalEpdsData = [];
/** @type {boolean} */
let isDataLoaded = false;

// --- FILTER VISIBILITY STATES ---
/** @type {boolean} */
let elementsFilterVisible = false;
/** @type {boolean} */
let documentsFilterVisible = false;
/** @type {boolean} */
let usecasesFilterVisible = false;
/** @type {boolean} */
let modelsFilterVisible = false;
/** @type {boolean} */
let epdsFilterVisible = false;

// --- SEARCH STATE ---
/** @type {string} */
let currentSearchQuery = '';
/** @type {'date-desc'|'date-asc'} */
let currentSearchSort = 'date-desc';

// --- UI STATE ---
/**
 * Track which cards have expanded tags (show all tags)
 * @type {Set<string>}
 */
const expandedCardTags = new Set();

// --- ROUTE MAPPINGS ---
/**
 * Human-readable route names for breadcrumbs and navigation
 * @type {Object.<string, string>}
 */
const routeNames = {
    'home': 'Startseite',
    'elements': 'Elemente',
    'element': 'Element',
    'documents': 'Dokumente',
    'document': 'Dokument',
    'usecases': 'Anwendungsfälle',
    'usecase': 'Anwendungsfall',
    'models': 'Fachmodelle',
    'model': 'Fachmodell',
    'epds': 'Ökobilanzdaten',
    'epd': 'Ökobilanzdaten',
    'handbook': 'Handbuch & Downloads',
    'search': 'Suchergebnisse'
};

/**
 * Parent route mappings for detail pages (used for detail-to-list redirects)
 * @type {Object.<string, string>}
 */
const parentRoutes = {
    'element': 'elements',
    'document': 'documents',
    'usecase': 'usecases',
    'model': 'models',
    'epd': 'epds'
};

/**
 * Phase labels for display (VDI 2552 lifecycle phases)
 * @type {Object.<number, string>}
 */
const phaseLabels = {
    1: 'Entwicklung',
    2: 'Planung',
    3: 'Ausführung',
    4: 'Betrieb',
    5: 'Rückbau'
};

/**
 * Arrow SVG for Swiss CD style cards
 * @type {string}
 */
const arrowSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
