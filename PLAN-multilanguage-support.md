# Multi-Language Support Implementation Plan

## Overview
Implement full multi-language support (DE, FR, IT, EN) for the KBOB BIM Fachdatenkatalog application.

**Approach:** Machine translation → UI strings first → Data files next
**Fallback:** German (DE)
**URL Strategy:** Language parameter in URL for sharing (e.g., `#/de/elements`, `#/en/elements`)

---

## Phase 1: UI String Extraction & Translation

### Step 1.1: Create UI translations file
Create `/data/translations/ui.json` with all static UI strings organized by category:
- Navigation labels
- Search & filter text
- Action buttons
- Phase labels
- Route names
- Error messages
- Handbook content
- Metadata labels

### Step 1.2: Update i18n.js
- Add function to load UI translations
- Add `tUI(key)` helper for accessing UI strings by path (e.g., `tUI('nav.elements')`)
- Ensure German fallback is maintained

### Step 1.3: Refactor state.js
Convert hardcoded constants to use i18n:
- `phaseLabels` → use translations
- `routeNames` → use translations

### Step 1.4: Refactor UI components
Update files to use `tUI()` instead of hardcoded strings:
- `pages.js` - page titles, headers
- `filters.js` - filter labels, placeholders
- `details.js` - sidebar labels
- `handbook.js` - handbook content
- `search.js` - search placeholder, no results message
- `breadcrumb.js` - breadcrumb labels

### Step 1.5: Update index.html
Replace hardcoded German text with dynamic content or data attributes.

---

## Phase 2: URL-based Language Routing

### Step 2.1: Update router.js
Modify hash routing to support language prefix:
- Current: `#/elements`, `#/elements/123`
- New: `#/de/elements`, `#/en/elements/123`
- Parse language from URL on page load
- Default to `de` if no language specified

### Step 2.2: Update URL generation
Modify `url.js` and all link generators to include language prefix:
- Navigation links
- Breadcrumb links
- Card/item links
- Share URLs

### Step 2.3: Language switching behavior
When user changes language:
- Update URL with new language prefix
- Store preference in localStorage
- Re-render current page with new language

### Step 2.4: Initial language detection
Priority order:
1. Language from URL (for shared links)
2. Language from localStorage (returning user)
3. Browser language if supported (optional)
4. Default to German

---

## Phase 3: Language Persistence

### Step 3.1: localStorage integration
- Save language preference when user switches
- Load preference on app initialization
- Sync URL and localStorage

---

## Phase 4: Data File Translations

### Step 4.1: models.json (~20 entries)
- Machine translate name, description fields
- Smallest file, good pilot for process

### Step 4.2: epds.json (~50 entries)
- Machine translate name, description, domain fields

### Step 4.3: tags.json
- Already complete ✓

### Step 4.4: documents.json (~200 entries)
- Machine translate name, description fields

### Step 4.5: usecases.json (~100 entries)
- Machine translate name, description, goals fields

### Step 4.6: elements.json (~1000 entries)
- Largest file, do last
- Machine translate name, description, domain fields

---

## Phase 5: Testing & Polish

### Step 5.1: Functional testing
- All 4 languages render correctly
- Language switching works
- URL sharing works
- Fallback to German works

### Step 5.2: UI polish
- Check for text overflow/truncation
- Verify special characters display correctly
- Test responsive layouts with longer text

---

## Implementation Order

| Step | Description | Files Affected |
|------|-------------|----------------|
| 1.1 | Create ui.json translations | `data/translations/ui.json` (new) |
| 1.2 | Update i18n.js | `js/i18n.js` |
| 1.3 | Refactor state.js | `js/state.js` |
| 1.4 | Refactor UI components | `js/pages.js`, `js/filters.js`, `js/details.js`, etc. |
| 1.5 | Update index.html | `index.html` |
| 2.1 | URL routing with language | `js/router.js` |
| 2.2 | URL generation | `js/url.js`, various |
| 2.3 | Language switching | `js/i18n.js`, `js/app.js` |
| 2.4 | Initial language detection | `js/app.js` |
| 3.1 | localStorage persistence | `js/i18n.js` |
| 4.x | Data translations | `data/*.json` |
| 5.x | Testing | - |

---

## Notes

- Each step should be committed separately for easy rollback
- Machine translations will be added using DeepL or similar
- Technical terms may need manual review after machine translation
- The existing `t()` function for data remains unchanged
- New `tUI()` function for UI strings keeps concerns separated
