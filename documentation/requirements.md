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
| ❌ | Not started / Out of scope |

---

## Functional Requirements

### FR-1: Building Elements Catalog

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-1.1 | Display standardized BIM building elements | Must | ✅ | 80 elements defined |
| FR-1.2 | Browse elements by domain/category | Must | ✅ | Gebäudetechnik, Tragwerk, Architektur, etc. |
| FR-1.3 | Element detail view with full specifications | Must | ✅ | |
| FR-1.4 | Phase-aware geometry requirements | Must | ✅ | Symbol, Länge, Breite, Höhe per phase |
| FR-1.5 | IFC 4.3 class mappings | Must | ✅ | Entity types and predefined types |
| FR-1.6 | Property Set (PSet) specifications | Must | ✅ | IFC property mappings |
| FR-1.7 | Authoring software mappings (Revit) | Should | ✅ | Tool-specific element mappings |
| FR-1.8 | Authoring software mappings (ArchiCAD) | Should | ✅ | Tool-specific element mappings |
| FR-1.9 | Related documents per element | Should | ✅ | Phase-aware document links |
| FR-1.10 | Related EPD data per element | Should | ✅ | Environmental product declarations |
| FR-1.11 | Related classifications per element | Must | ✅ | eBKP-H, DIN 276 codes |
| FR-1.12 | Related use cases (LOIN) per element | Must | ✅ | Bidirectional linking |
| FR-1.13 | Element images/icons | Should | ✅ | Visual identification |
| FR-1.14 | Element versioning | Should | ✅ | Version field + last_change date |

### FR-2: Use Cases Catalog

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-2.1 | Display BIM use cases/processes | Must | ✅ | 30 use cases defined |
| FR-2.2 | Use case detail view | Must | ✅ | |
| FR-2.3 | Goals, inputs, outputs documentation | Must | ✅ | |
| FR-2.4 | Roles and responsibilities | Should | ✅ | |
| FR-2.5 | Prerequisites documentation | Should | ✅ | |
| FR-2.6 | Implementation guidance | Should | ✅ | |
| FR-2.7 | Quality criteria | Should | ✅ | |
| FR-2.8 | BPMN process diagrams | Should | ✅ | Interactive bpmn-js viewer |
| FR-2.9 | Related elements (LOIN) per use case | Must | ✅ | Bidirectional with phase-aware attributes |
| FR-2.10 | Related documents per use case | Should | ✅ | Phase-aware linking |
| FR-2.11 | VDI 2552 compliance | Must | ✅ | Standard classification codes |
| FR-2.12 | Phase applicability | Must | ✅ | 5 lifecycle phases |
| FR-2.13 | Use case versioning | Should | ✅ | Version field + last_change date |

### FR-3: Documents Catalog

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-3.1 | Display project documentation types | Must | ✅ | 130 document types |
| FR-3.2 | KBOB/IPB classification codes | Must | ✅ | O-series format |
| FR-3.3 | Document detail view | Must | ✅ | |
| FR-3.4 | Format specifications | Should | ✅ | PDF-A, Office-Format, etc. |
| FR-3.5 | Retention period requirements | Should | ✅ | Days-based retention |
| FR-3.6 | Phase applicability | Must | ✅ | |
| FR-3.7 | Related elements per document | Should | ✅ | |
| FR-3.8 | Related classifications | Should | ✅ | |
| FR-3.9 | Document versioning | Should | ✅ | |

### FR-4: Discipline Models Catalog

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-4.1 | Display discipline-specific BIM models | Must | ✅ | 10 models defined |
| FR-4.2 | Model codes (m1, m2, m3, etc.) | Must | ✅ | Architektur, Tragwerk, HLKS, Elektro |
| FR-4.3 | Model detail view | Must | ✅ | |
| FR-4.4 | Constituent elements per model | Should | ✅ | Related elements list |
| FR-4.5 | Phase applicability | Must | ✅ | Multi-phase support |
| FR-4.6 | Model versioning | Should | ✅ | |

### FR-5: EPD Data Catalog

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-5.1 | Display Environmental Product Declarations | Must | ✅ | 20 EPD records |
| FR-5.2 | EPD detail view | Must | ✅ | |
| FR-5.3 | Global Warming Potential (GWP) | Must | ✅ | EN 15804 compliant |
| FR-5.4 | Umweltbelastungspunkte (UBP) | Should | ✅ | Swiss eco-points |
| FR-5.5 | Primary Energy non-renewable (PENRT) | Should | ✅ | |
| FR-5.6 | Primary Energy renewable (PERT) | Should | ✅ | |
| FR-5.7 | Density values | Should | ✅ | |
| FR-5.8 | Biogenic carbon values | Could | ✅ | |
| FR-5.9 | KBOB/Ecobau compliance | Must | ✅ | |
| FR-5.10 | Unit specifications | Must | ✅ | kg, m2, etc. |

### FR-6: Attributes/Properties Reference

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-6.1 | Display reusable property definitions | Must | ✅ | 64 attributes |
| FR-6.2 | Data type specifications | Must | ✅ | String, numeric, boolean |
| FR-6.3 | Unit definitions | Should | ✅ | |
| FR-6.4 | IFC Property Set mappings | Must | ✅ | PSet names |
| FR-6.5 | IFC property name mappings | Must | ✅ | |
| FR-6.6 | Enumeration values | Could | ✅ | For constrained values |
| FR-6.7 | Attribute descriptions | Should | ✅ | Multilingual |

### FR-7: Classifications Reference

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-7.1 | Display classification codes | Must | ✅ | 344 classification records |
| FR-7.2 | eBKP-H classifications | Must | ✅ | Swiss Building Classification |
| FR-7.3 | DIN 276 classifications | Should | ✅ | German cost grouping |
| FR-7.4 | Hierarchical code structure | Should | ✅ | |
| FR-7.5 | Classification system indicator | Must | ✅ | |
| FR-7.6 | Code descriptions | Should | ✅ | Multilingual |

### FR-8: Tags/Keywords

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-8.1 | Display contextual tags | Must | ✅ | 22 tags defined |
| FR-8.2 | VDI 2552 Blatt 12.2 compliance | Should | ✅ | |
| FR-8.3 | Tag descriptions | Should | ✅ | Multilingual |
| FR-8.4 | Cross-entity tagging | Must | ✅ | Used across all catalogs |

### FR-9: Search & Discovery

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-9.1 | Global search across all catalogs | Must | ✅ | |
| FR-9.2 | Full-text search on name, domain, description | Must | ✅ | |
| FR-9.3 | Search results grouped by entity type | Should | ✅ | |
| FR-9.4 | Real-time search suggestions | Should | ✅ | Search dropdown |
| FR-9.5 | Search result highlighting | Could | ✅ | |
| FR-9.6 | Search within specific catalog | Could | ⏳ | |

### FR-10: Filtering System

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-10.1 | Category/domain filtering | Must | ✅ | |
| FR-10.2 | Multi-select tag filtering | Should | ✅ | |
| FR-10.3 | Active filter badges | Should | ✅ | Visual indicators |
| FR-10.4 | Filter reset functionality | Must | ✅ | |
| FR-10.5 | Count indicators per filter option | Should | ✅ | |
| FR-10.6 | Persistent filter state via URL | Should | ✅ | Hash-based state |
| FR-10.7 | Phase-based filtering | Could | ⏳ | |
| FR-10.8 | Combined filter operations | Should | ✅ | AND logic |

### FR-11: Multilingual Support

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-11.1 | German (DE) language support | Must | ✅ | Primary language |
| FR-11.2 | French (FR) language support | Must | ✅ | |
| FR-11.3 | Italian (IT) language support | Must | ✅ | |
| FR-11.4 | English (EN) language support | Should | ✅ | |
| FR-11.5 | Language switcher in UI | Must | 🔄 | UI present but not functional |
| FR-11.6 | Fallback language system | Should | ✅ | Defaults to German |
| FR-11.7 | All UI text translated | Must | 🔄 | Data content translated; UI chrome hardcoded German |
| FR-11.8 | All content data translated | Must | ✅ | JSONB multilingual storage |

### FR-12: Phase-Based Requirements

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-12.1 | Display 5 lifecycle phases | Must | ✅ | SIA phase mapping |
| FR-12.2 | Phase 1: Requirements & Planning | Must | ✅ | SIA Phase 1-2 |
| FR-12.3 | Phase 2: Design | Must | ✅ | SIA Phase 2-3 |
| FR-12.4 | Phase 3: Tendering & Procurement | Must | ✅ | SIA Phase 3-4 |
| FR-12.5 | Phase 4: Construction & Execution | Must | ✅ | SIA Phase 4-5 |
| FR-12.6 | Phase 5: Operation & Maintenance | Must | ✅ | SIA Phase 6 |
| FR-12.7 | Phase-specific attribute requirements | Must | ✅ | LOIN per phase |
| FR-12.8 | Phase-specific geometry requirements | Should | ✅ | |
| FR-12.9 | Visual phase indicators | Should | ✅ | In detail views |

### FR-13: Navigation & Routing

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-13.1 | Hash-based URL routing | Must | ✅ | SPA without server |
| FR-13.2 | Main navigation sidebar | Must | ✅ | 7 main routes |
| FR-13.3 | Breadcrumb navigation | Should | ✅ | |
| FR-13.4 | Detail page views | Must | ✅ | Per entity type |
| FR-13.5 | Sidebar navigation for detail sections | Should | ✅ | Sticky navigation |
| FR-13.6 | Related entity linking | Must | ✅ | Cross-catalog navigation |
| FR-13.7 | Deep linking support | Should | ✅ | Direct URL to any view |
| FR-13.8 | Back button support | Must | ✅ | Browser history |

### FR-14: BPMN Process Visualization

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-14.1 | Display BPMN diagrams | Should | ✅ | bpmn-js viewer |
| FR-14.2 | Interactive diagram navigation | Should | ✅ | Pan and zoom |
| FR-14.3 | Embedded viewer on use case pages | Should | ✅ | |
| FR-14.4 | External process URL linking | Could | ✅ | For detailed diagrams |
| FR-14.5 | BPMN 2.0 compliance | Should | ✅ | |

### FR-15: REST API

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-15.1 | RESTful endpoints for all entities | Must | ⏳ | Supabase backend planned |
| FR-15.2 | OpenAPI 3.0 specification | Should | ✅ | 1,313 lines |
| FR-15.3 | Elements endpoint | Must | 🔄 | Spec defined; backend pending |
| FR-15.4 | Use cases endpoint | Must | 🔄 | Spec defined; backend pending |
| FR-15.5 | Documents endpoint | Must | 🔄 | Spec defined; backend pending |
| FR-15.6 | Models endpoint | Must | 🔄 | Spec defined; backend pending |
| FR-15.7 | EPDs endpoint | Should | 🔄 | Spec defined; backend pending |
| FR-15.8 | Attributes endpoint | Should | 🔄 | Spec defined; backend pending |
| FR-15.9 | Classifications endpoint | Should | 🔄 | Spec defined; backend pending |
| FR-15.10 | Tags endpoint | Should | 🔄 | Spec defined; backend pending |
| FR-15.11 | Swagger UI documentation | Should | ✅ | Interactive API docs |

### FR-16: Handbook & Documentation

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-16.1 | Comprehensive handbook section | Must | ✅ | |
| FR-16.2 | Table of contents with navigation | Should | ✅ | Scroll-to-section |
| FR-16.3 | Accordion-style content sections | Should | ✅ | |
| FR-16.4 | Data model explanation | Should | ✅ | |
| FR-16.5 | Usage guidelines | Should | ✅ | |
| FR-16.6 | Phase definitions | Must | ✅ | |
| FR-16.7 | Classification system documentation | Should | ✅ | |
| FR-16.8 | API documentation | Should | ✅ | |

### FR-17: UI Components

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-17.1 | Header with branding and search | Must | ✅ | Swiss Federal branding |
| FR-17.2 | Footer with contact info | Must | ✅ | |
| FR-17.3 | Pagination controls | Must | ✅ | Load more pattern |
| FR-17.4 | Loading states | Must | ✅ | |
| FR-17.5 | Error handling displays | Must | ✅ | |
| FR-17.6 | Empty states | Should | ✅ | |
| FR-17.7 | Print functionality | Could | ✅ | |
| FR-17.8 | Share page functionality | Could | ✅ | |
| FR-17.9 | Scroll-to-top button | Could | ✅ | |
| FR-17.10 | Card-based list views | Must | ✅ | |
| FR-17.11 | Detail page layouts | Must | ✅ | |

### FR-18: Data Persistence

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-18.1 | JSON file data source | Must | ✅ | Current implementation |
| FR-18.2 | Supabase PostgreSQL backend | Should | ⏳ | Planned for future |
| FR-18.3 | Dual data source support | Should | ⏳ | Planned for future |
| FR-18.4 | Response caching | Should | ✅ | 5-minute cache duration |
| FR-18.5 | Row Level Security (RLS) | Could | ⏳ | Planned with Supabase |

### FR-19: Administration (Future)

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-19.1 | Content management interface | Could | ❌ | Manual JSON/DB editing |
| FR-19.2 | User management | Could | ❌ | |
| FR-19.3 | Role-based access control | Could | ❌ | |
| FR-19.4 | Audit logging | Could | ❌ | |
| FR-19.5 | Data import/export tools | Could | ⏳ | |
| FR-19.6 | Versioning dashboard | Could | ⏳ | |

### FR-20: Integration (Future)

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| FR-20.1 | Authoring software templates (Revit) | Should | ⏳ | Major milestone |
| FR-20.2 | Authoring software templates (ArchiCAD) | Should | ⏳ | Major milestone |
| FR-20.3 | TERMDAT integration | Should | ⏳ | Federal terminology database |
| FR-20.4 | I14Y interoperability platform | Should | ⏳ | Swiss data interoperability |
| FR-20.5 | LINDAS linked data service | Should | ⏳ | Swiss linked open data |
| FR-20.6 | CDE integration (Common Data Environment) | Could | ⏳ | PIM/AIM connectivity |
| FR-20.7 | Quality assurance software hooks | Could | ⏳ | Automated validation |
| FR-20.8 | IFC file validation | Could | ⏳ | Long-term goal |

---

## Non-Functional Requirements

### NFR-1: Performance

| ID | Requirement | Target | Status | Notes |
|----|-------------|--------|--------|-------|
| NFR-1.1 | Initial page load | < 2 seconds | ✅ | Static hosting optimized |
| NFR-1.2 | Catalog list render (100 items) | < 500ms | ✅ | |
| NFR-1.3 | Search response time | < 200ms | ✅ | Client-side indexing |
| NFR-1.4 | Detail page navigation | < 300ms | ✅ | |
| NFR-1.5 | Filter application | < 100ms | ✅ | |
| NFR-1.6 | BPMN diagram render | < 1 second | ✅ | bpmn-js viewer |
| NFR-1.7 | Data caching | 5 minutes | ✅ | Configurable |

### NFR-2: Usability

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-2.1 | Responsive design (desktop, tablet, mobile) | 🔄 | Desktop optimized; mobile needs improvement |
| NFR-2.2 | Keyboard navigable | ✅ | |
| NFR-2.3 | WCAG 2.1 AA accessibility | ✅ | Color contrast, ARIA |
| NFR-2.4 | Swiss Federal Corporate Design (CD Bund) | 🔄 | Partial compliance; full alignment planned |
| NFR-2.5 | Consistent visual language | ✅ | Token-based design system |
| NFR-2.6 | Semantic HTML structure | ✅ | |
| NFR-2.7 | Focus indicators | ✅ | |
| NFR-2.8 | Proper heading hierarchy | ✅ | |
| NFR-2.9 | Print-friendly styles | ✅ | |

### NFR-3: Browser Support

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-3.1 | Chrome (latest 2 versions) | ✅ | Primary target |
| NFR-3.2 | Firefox (latest 2 versions) | ✅ | |
| NFR-3.3 | Safari (latest 2 versions) | ✅ | Desktop + iOS |
| NFR-3.4 | Edge (latest 2 versions) | ✅ | |
| NFR-3.5 | Chrome Mobile (Android) | 🔄 | Basic support; UX needs work |
| NFR-3.6 | Safari Mobile (iOS) | 🔄 | Basic support; UX needs work |
| NFR-3.7 | ES6+ JavaScript support | ✅ | Required |

### NFR-4: Security

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-4.1 | HTTPS only | ✅ | GitHub Pages |
| NFR-4.2 | No sensitive data exposure | ✅ | Public catalog |
| NFR-4.3 | Row Level Security (Supabase) | ⏳ | Planned with Supabase migration |
| NFR-4.4 | API key protection | ✅ | Anon key only |
| NFR-4.5 | CORS compliance | ✅ | |

### NFR-5: Maintainability

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-5.1 | No framework dependency | ✅ | Vanilla JS |
| NFR-5.2 | No build step required | ✅ | Direct HTML/CSS/JS |
| NFR-5.3 | Modular JavaScript architecture | ✅ | 19 modules |
| NFR-5.4 | CSS design tokens | ✅ | tokens.css |
| NFR-5.5 | JSON-first data format | ✅ | Version controllable |
| NFR-5.6 | Comprehensive documentation | ✅ | DATABASE.md, DESIGNGUIDE.md |
| NFR-5.7 | MIT license | ✅ | Open source |

### NFR-6: Scalability

| ID | Requirement | Status | Notes |
|----|-------------|--------|-------|
| NFR-6.1 | Support 1000+ elements | 🔄 | Currently 80 (demo data) |
| NFR-6.2 | Support 1000+ use cases | 🔄 | Currently 30 (demo data) |
| NFR-6.3 | Pagination for large datasets | ✅ | Intersection Observer |
| NFR-6.4 | Static file hosting compatible | ✅ | GitHub Pages |
| NFR-6.5 | CDN-ready assets | ✅ | |

---

## Technology Stack

### Frontend

| Technology | Purpose | Notes |
|------------|---------|-------|
| HTML5 | Structure | Semantic markup |
| CSS3 | Styling | Custom properties, Grid, Flexbox |
| Vanilla JavaScript (ES6+) | Application logic | No framework dependencies |
| Lucide Icons | Iconography | SVG, MIT licensed |
| Noto Sans | Typography | Google Fonts |
| bpmn-js | BPMN visualization | Process diagrams |
| Swagger UI | API documentation | Interactive docs |

### Design System

| Token Category | Implementation | Notes |
|----------------|----------------|-------|
| Colors | CSS custom properties | Swiss Federal palette |
| Typography | Noto Sans family | 400, 500, 600, 700 weights |
| Spacing | 4px base unit | Consistent scale |
| Breakpoints | 640px, 768px, 1024px, 1280px | Responsive design |
| Components | Custom CSS classes | Modular styling |

### Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |

### Backend / Data Layer

| Technology | Purpose | Notes |
|------------|---------|-------|
| JSON files | Primary data source | /data/*.json (current) |
| Supabase | Cloud PostgreSQL | Planned for future |
| OpenAPI 3.0 | API specification | Schema defined |
| Edge Functions | Supabase API | Planned for future |

### Development Tools

| Technology | Purpose | Notes |
|------------|---------|-------|
| Git/GitHub | Version control | |
| GitHub Pages | Static hosting | Production deployment |
| Python | Image optimization | tools/optimize_images.py |
| VS Code Live Server | Local development | |

---

## Data Model

### Core Entities (Phase-Aware)

| Entity | Records | Key Fields | Relationships |
|--------|---------|------------|---------------|
| **Elements** | 80 | id, name, domain, phases, geometry, tool_elements | → Documents, EPDs, Classifications, Use Cases (LOIN), Tags |
| **Use Cases** | 30 | id, code, name, domain, phases, goals, inputs, outputs, roles | → Elements (LOIN), Documents, Tags |
| **Documents** | 130 | id, code, name, domain, phases, formats, retention | → Elements, Classifications, Tags |
| **Models** | 10 | id, code, name, domain, phases | → Elements, Tags |

### Reference Entities (Phase-Neutral)

| Entity | Records | Key Fields | Usage |
|--------|---------|------------|-------|
| **Attributes** | 64 | id, name, data_type, unit, ifc_pset, ifc_property | LOIN specifications |
| **Classifications** | 344 | id, system, code, name | eBKP-H, DIN 276 |
| **EPDs** | 20 | id, code, name, gwp, ubp, penrt, pert | Environmental data |
| **Tags** | 22 | id, name, description | Cross-entity categorization |

### Lifecycle Phases

| Phase | Name | SIA Mapping |
|-------|------|-------------|
| 1 | Requirements & Planning | SIA Phase 1-2 |
| 2 | Design | SIA Phase 2-3 |
| 3 | Tendering & Procurement | SIA Phase 3-4 |
| 4 | Construction & Execution | SIA Phase 4-5 |
| 5 | Operation & Maintenance | SIA Phase 6 |

### LOIN (Level of Information) Structure

```json
{
  "related_loin": [
    {
      "element_id": "uuid",
      "attributes": [
        {"id": "attr-id", "phases": [2, 3, 4]}
      ]
    }
  ]
}
```

### Data Volume

| Metric | Value |
|--------|-------|
| Total JSON lines | ~54,700 |
| Total data records | ~700 |
| Estimated size | ~1.5 MB |

---

## JSON Data Structure

```
/data
├── elements.json        # 80 building elements (23,792 lines)
├── usecases.json        # 30 BIM use cases (15,931 lines)
├── documents.json       # 130 document types
├── models.json          # 10 discipline models
├── epds.json            # 20 environmental product declarations
├── attributes.json      # 64 reusable properties (1,281 lines)
├── classifications.json # 344 classification codes
├── tags.json            # 22 contextual tags
└── openapi.json         # OpenAPI 3.0 specification (1,313 lines)
```

---

## Implementation Phases

### Phase 1: Core Catalogs (Completed)

**Data:**
- [x] JSON data files for all entities
- [x] 80 building elements with full specifications (demo data)
- [x] 30 use cases with BPMN references (demo data)
- [x] 130 document types with KBOB/IPB codes
- [x] 10 discipline models
- [x] 20 EPD records with environmental metrics

**Views:**
- [x] Elements catalog with browse/search/filter
- [x] Use cases catalog with BPMN viewer
- [x] Documents catalog
- [x] Models catalog
- [x] EPD data catalog
- [x] Detail views for all entity types
- [x] Navigation sidebar and breadcrumbs
- [x] Responsive design (desktop; mobile needs improvement)

**Features:**
- [x] Global search across all catalogs
- [x] Category and tag filtering
- [x] Multilingual data content (DE, FR, IT, EN)
- [ ] Multilingual UI (currently hardcoded German)
- [x] IFC mappings and classifications
- [x] OpenAPI specification defined
- [ ] REST API backend (Supabase migration pending)

### Phase 2: Enhanced Features (Planned)

- [ ] Supabase PostgreSQL backend migration
- [ ] Functional language switcher with full UI translations
- [ ] Improved mobile/responsive design
- [ ] Full Swiss Federal Corporate Design (CD Bund) compliance
- [ ] Phase-based filtering in catalog views
- [ ] Advanced search within specific catalogs
- [ ] Comparison view for elements
- [ ] Data export functionality (CSV, JSON)
- [ ] Stronger authoring software integration
- [ ] CDE connectivity (PIM/AIM)
- [ ] Community of Practice features
- [ ] Data standard versioning

### Phase 3: Swiss Data Ecosystem Integration (Major Milestone)

- [ ] TERMDAT integration (Federal terminology database)
- [ ] I14Y interoperability platform linking
- [ ] LINDAS linked data service connection
- [ ] Authoring software templates (Revit, ArchiCAD)

### Phase 4: Enterprise & Governance (Planned)

- [ ] Content management interface
- [ ] User management and access control
- [ ] Audit logging
- [ ] Quality assurance software integration
- [ ] IFC file validation engine
- [ ] Advanced analytics and reporting
- [ ] Official KBOB governance framework

---

## Standards Compliance

### Building & BIM Standards

| Standard | Purpose | Status |
|----------|---------|--------|
| ISO 19650 | Information Management in BIM | ✅ Aligned |
| IFC 4.3 | Industry Foundation Classes | ✅ Mapped |
| EN 17412 | LOIN Framework | ✅ Implemented |
| EN 15804 | EPD Standard | ✅ Compliant |
| VDI 2552 | BIM Use Cases | ✅ Compliant |
| BPMN 2.0 | Process Modeling | ✅ Implemented |
| SIA Phases | Swiss Engineering Phases | ✅ Mapped |

### Swiss Federal Standards

| Standard | Purpose | Status |
|----------|---------|--------|
| CD Bund | Swiss Federal Corporate Design | 🔄 Partial compliance |
| TERMDAT | Federal terminology database | ⏳ Planned (major milestone) |
| I14Y | Interoperability platform | ⏳ Planned (major milestone) |
| LINDAS | Linked data service | ⏳ Planned (major milestone) |
| DCAT-AP CH | Data Catalog Vocabulary | ⏳ Planned |
| eCH-0279 | Architecture Vision 2050 | ⏳ Aligned |
| eCH-0122 | E-Government Architecture | ⏳ Aligned |

### Classification Systems

| System | Purpose | Records |
|--------|---------|---------|
| eBKP-H | Swiss Building Classification | Included |
| DIN 276 | German Cost Grouping | Included |

---

## Open Questions

1. **CDE Integration:** Which Common Data Environments should be prioritized for integration?
2. **Authoring Software:** Should Revit/ArchiCAD plugins be developed in-house or via partnerships?
3. **Governance:** How will the data standard versioning and change management process work?
4. **Community Features:** What level of community contribution should be enabled?
5. **Validation Engine:** Should IFC validation be embedded or linked to external tools?
6. **Mobile App:** Is a dedicated mobile application needed beyond responsive web?
7. **Offline Support:** Should the catalog support offline browsing via service workers?
8. **API Rate Limiting:** What usage limits should apply to the REST API?
9. **Data Updates:** What is the process for updating element/use case definitions?
10. **Multi-tenant:** Should the platform support multiple organizations with separate catalogs?

---

## References

### Project Resources
- [Live Demo](https://davras5.github.io/kbob-fdk/) - Production deployment
- [GitHub Repository](https://github.com/davras5/kbob-fdk) - Source code
- [Data Model Documentation](documentation/data-model.md) - Schema details
- [Style Guide](documentation/styleguide.md) - Design system
- [Vision Document](documentation/vision.md) - Strategic roadmap

### BIM & Construction Standards
- [ISO 19650](https://www.iso.org/standard/68078.html) - Information management using BIM
- [buildingSMART IFC](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) - IFC specification
- [SIA Phases](https://www.sia.ch) - Swiss engineering phase model
- [KBOB](https://www.kbob.admin.ch) - Coordination Conference of Building Organs
- [VDI 2552](https://www.vdi.de/richtlinien/unsere-richtlinien-highlights/vdi-2552) - BIM guidelines

### Swiss Federal Resources
- [CD Bund](https://www.bk.admin.ch/bk/de/home/kommunikation/corporate-design-bund.html) - Federal design guidelines
- [eIAM Swiss Federal IAM](https://www.eiam.swiss) - Identity management
- [Swiss Data Ecosystem](https://www.bfs.admin.ch) - Data standards

### Technology Documentation
- [Supabase](https://supabase.com/docs) - Backend platform
- [bpmn-js](https://bpmn.io/toolkit/bpmn-js/) - BPMN viewer
- [Lucide Icons](https://lucide.dev) - Icon library
- [OpenAPI 3.0](https://spec.openapis.org/oas/v3.0.0) - API specification

---

## Metrics & Statistics

| Metric | Value |
|--------|-------|
| **Total Lines of Code** | ~10,900 (JS + CSS) |
| **JavaScript Modules** | 19 |
| **CSS Files** | 2 (tokens + styles) |
| **Total Data Records** | 700 |
| **Building Elements** | 80 |
| **Use Cases** | 30 |
| **Documents** | 130 |
| **Classifications** | 344 |
| **Attributes** | 64 |
| **Discipline Models** | 10 |
| **EPD Records** | 20 |
| **Tags/Keywords** | 22 |
| **Supported Languages** | 4 (DE, FR, IT, EN) |
| **Lifecycle Phases** | 5 |

---

*Last Updated: January 2026*
*Version: 1.0.0*
