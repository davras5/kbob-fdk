# KBOB Fachdatenkatalog Requirements Specification

## Project Overview

**Project Name:** KBOB Fachdatenkatalog (KBOB BIM Data Catalog)

**Purpose:** An open-source, web-based reference catalog for Building Information Modeling (BIM) data requirements in Swiss public construction projects. It defines standardized building element classifications, Level of Information (LOI) requirements per project phase, and IFC mappings to reduce data ambiguity and improve interoperability across federal, cantonal, and municipal construction organizations.

**Target Users:**
- Federal, cantonal, and municipal authorities
- Public and institutional building owners
- Infrastructure operators and portfolio managers
- Architects and planning consultants
- Engineers and contractors
- BIM coordinators
- Software vendors and system integrators

**Current Status:** Production demonstration with comprehensive data model, five integrated catalogs, and static JSON data. Supabase backend and full multilingual UI support planned for future development.

---

## Implementation Status Legend

| Symbol | Status |
|--------|--------|
| ✅ | Implemented |
| 🔄 | Partially implemented |
| ⏳ | Planned |
| ❌ | Not started |

---

## Functional Requirements

### FR-1: Data Catalogs

| Feature | Description | Status |
|---------|-------------|--------|
| **5 browsable catalogs** | Elements (80), Use Cases (30), Documents (130), Models (10), EPDs (20) with list and detail views | ✅ |
| **Reference data** | Attributes (64), Classifications (344), Tags (22) - used in relationships, no standalone UI | ✅ |
| **Detail views** | Full specifications per entity with cross-entity navigation | ✅ |
| **Relationships** | Bidirectional linking between entities with phase metadata | ✅ |
| **Versioning** | Version number and last_change date displayed; no version history | 🔄 |

### FR-2: Search & Discovery

| Feature | Description | Status |
|---------|-------------|--------|
| **Global search** | Full-text search across all catalogs (name, domain, description) with suggestions | ✅ |
| **Filtering** | Category/domain and multi-select tag filtering with URL persistence | ✅ |
| **Phase filtering** | Filter by lifecycle phase | ⏳ |

### FR-3: Multilingual Support

| Feature | Description | Status |
|---------|-------------|--------|
| **4 languages** | German (primary), French, Italian, English | ✅ |
| **Data content** | All catalog data translated via JSONB i18n objects | ✅ |
| **UI text** | Navigation, labels, messages - currently hardcoded German | 🔄 |
| **Language switcher** | Dropdown present but not functional | 🔄 |

### FR-4: BIM Standards

| Feature | Description | Status |
|---------|-------------|--------|
| **IFC 4.3 mappings** | Entity types, predefined types, and Property Set specifications | ✅ |
| **Authoring tools** | Element mappings for Revit and ArchiCAD | ✅ |
| **VDI 2552** | Use case compliance and 5 lifecycle phases per Blatt 12.2 | ✅ |
| **LOIN/LOG** | Phase-specific attribute (LOI) and geometry (LOG) requirements | ✅ |
| **BPMN diagrams** | Interactive process diagrams via bpmn-js viewer | ✅ |

### FR-5: Backend & API

| Feature | Description | Status |
|---------|-------------|--------|
| **Data storage** | Static JSON files in /data folder | ✅ |
| **Supabase backend** | PostgreSQL cloud database | ⏳ |
| **REST API** | OpenAPI 3.0 spec defined (1,313 lines); backend not deployed | 🔄 |
| **API documentation** | Swagger UI for interactive exploration | ✅ |

### FR-6: User Interface

| Feature | Description | Status |
|---------|-------------|--------|
| **CD Bund design** | Swiss Federal Corporate Design compliance | 🔄 |
| **Responsive layout** | Desktop optimized; mobile/tablet needs improvement | 🔄 |
| **Navigation** | Sidebar with 7 routes, breadcrumbs, hash-based SPA routing | ✅ |
| **Views** | Card-based lists, detail pages with sticky nav, handbook section | ✅ |
| **Utilities** | Print, share, deep linking support | ✅ |

### FR-7: Future Integrations

| Feature | Description | Status |
|---------|-------------|--------|
| **IDS export** | Information Delivery Specification checking rules | ⏳ |
| **EIR export** | Exchange Information Requirements as Excel | ⏳ |
| **bSDD** | buildingSMART Data Dictionary linking | ⏳ |
| **Swiss federal data** | TERMDAT, I14Y, LINDAS integration | ⏳ |
| **Authoring templates** | Revit and ArchiCAD project templates | ⏳ |
| **CDE integration** | Common Data Environment connectivity | ⏳ |

---

## Non-Functional Requirements

### NFR-1: Performance & Compatibility

| Requirement | Status | Notes |
|-------------|--------|-------|
| Page load < 2s, search < 200ms | ✅ | Static hosting optimized |
| Desktop browsers (Chrome, Firefox, Safari, Edge) | ✅ | Latest 2 versions |
| Mobile browsers | 🔄 | Basic support; UX needs work |
| Static file hosting | ✅ | GitHub Pages compatible |

### NFR-2: Usability & Accessibility

| Requirement | Status | Notes |
|-------------|--------|-------|
| WCAG 2.1 AA | ✅ | Color contrast, ARIA, focus indicators |
| Keyboard navigation | ✅ | Full support |
| Semantic HTML | ✅ | Proper heading hierarchy |
| Print-friendly | ✅ | Optimized print styles |

### NFR-3: Security & Maintainability

| Requirement | Status | Notes |
|-------------|--------|-------|
| HTTPS only | ✅ | GitHub Pages |
| No framework dependency | ✅ | Vanilla JS, no build step |
| Modular architecture | ✅ | 19 JS modules, CSS tokens |
| MIT license | ✅ | Open source |

---

## Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | HTML5, CSS3 (custom properties), Vanilla JS (ES6+) |
| **Libraries** | bpmn-js (diagrams), Swagger UI (API docs), Lucide (icons) |
| **Typography** | Noto Sans (Google Fonts) |
| **Data** | Static JSON (current), Supabase PostgreSQL (planned) |
| **Hosting** | GitHub Pages |

---

## Data Model Summary

| Entity | Count | Description |
|--------|-------|-------------|
| Elements | 80 | Building components with LOG/LOIN, IFC mappings |
| Use Cases | 30 | BIM processes per VDI 2552 with BPMN |
| Documents | 130 | KBOB/IPB document types with retention |
| Models | 10 | Discipline model definitions |
| EPDs | 20 | Environmental product declarations |
| Attributes | 64 | LOI property definitions (reference) |
| Classifications | 344 | eBKP-H and DIN 276 codes (reference) |
| Tags | 22 | Anwendungsfeld keywords (reference) |

**Lifecycle Phases (VDI 2552 Blatt 12.2):** Entwicklung, Planung, Realisierung, Betrieb, Abbruch

> Full documentation: [data-model.md](data-model.md)

---

## Implementation Roadmap

### Phase 1: Core Catalogs (Current)

**Done:** 5 catalog views, detail pages, search/filter, multilingual data, IFC mappings, BPMN viewer, OpenAPI spec

**Pending:** Functional language switcher, UI translations, mobile UX, full CD Bund compliance

### Phase 2: Enhanced Features

- Supabase backend migration and REST API deployment
- Full multilingual UI
- Mobile/responsive improvements
- Full CD Bund compliance
- Phase-based filtering
- Data export (CSV, JSON)

### Phase 3: Data Export & Validation

- IDS checking rules export
- EIR Excel export
- bSDD integration

### Phase 4: Swiss Data Ecosystem

- TERMDAT, I14Y, LINDAS integration
- Authoring software templates (Revit, ArchiCAD)

### Phase 5: Enterprise & Governance

- Content management interface
- User management
- IFC validation engine
- Official KBOB governance framework

---

## Standards Compliance

| Category | Standards | Status |
|----------|-----------|--------|
| **BIM** | ISO 19650, IFC 4.3, EN 17412 (LOIN), VDI 2552, BPMN 2.0 | ✅ |
| **Environmental** | EN 15804 (EPD) | ✅ |
| **Classifications** | eBKP-H, DIN 276 | ✅ |
| **Swiss Federal** | CD Bund | 🔄 |
| **Planned** | bSDD, IDS, TERMDAT, I14Y, LINDAS | ⏳ |

---

## Open Questions

1. Which CDEs should be prioritized for integration?
2. Should authoring templates be developed in-house or via partnerships?
3. How will data versioning and change management work?
4. Is a dedicated mobile app needed beyond responsive web?

---

## References

**Project:** [Live Demo](https://davras5.github.io/kbob-fdk/) | [GitHub](https://github.com/davras5/kbob-fdk) | [Data Model](data-model.md) | [Style Guide](styleguide.md)

**Standards:** [ISO 19650](https://www.iso.org/standard/68078.html) | [IFC](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) | [VDI 2552](https://www.vdi.de/richtlinien/unsere-richtlinien-highlights/vdi-2552) | [CD Bund](https://www.bk.admin.ch/bk/de/home/kommunikation/corporate-design-bund.html)

---

## Metrics

| Metric | Value |
|--------|-------|
| Data Records | ~700 |
| Lines of Code | ~10,900 |
| JS Modules | 19 |
| Languages | 4 |
| Phases | 5 |

---

*Last Updated: January 2026 | Version: 2.1.0*
