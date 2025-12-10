# Style Guide

**Webguidelines Bund V04.00 Adaptation**  
Version 2.0 | Fachanwendung

---

## Table of Contents

1. [Compliance Context](#compliance-context)
2. [Design Philosophy](#design-philosophy)
3. [Brand Elements](#brand-elements)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Spacing & Layout](#spacing--layout)
7. [Components](#components)
8. [Icons](#icons)
9. [Accessibility](#accessibility)
10. [Naming Conventions](#naming-conventions)
11. [CSS Variables Reference](#css-variables-reference)

---

## Compliance Context

This style guide implements the **Webguidelines Bund V04.00** (Regelwerk vom 06.03.2024) for a Fachanwendung (specialized application) context. It adapts the official Swiss Federal Design System without importing CSS directly.

### Application Type: Fachanwendung

Per Regelwerk Section 1.3.1.3, this application:
- Operates outside the Standard-Dienst Webauftritte
- SHOULD adopt WGL Bund UI components at minimum in look & feel
- CAN use blue for interaction/status colors (instead of red)
- Must report new component developments to BK (support@bk.admin.ch)

### Compliance Deadline

Fachanwendungen must adopt WGL Bund V04.00 appearance by **31.07.2027**.

### Reference Implementation

See [swisstopo.admin.ch](https://www.swisstopo.admin.ch/en) for a live example of the modern CD Bund.

---

## Design Philosophy

This application follows design principles from the Webguidelines Bund V04.00, reflecting the official Markenwerte (brand values) of the Swiss Federal Administration.

### Core Principles

**Clarity over decoration** (Klar)  
Every design element serves a purpose. Simple layouts, structured typography, clear hierarchy, and intuitive navigation guide users to information efficiently.

**Consistency creates trust** (Qualitativ)  
Consistent use of colors, typography, and spacing signals professionalism and reliability—essential for government applications.

**Content first** (Diskret/Zurückhaltend)  
Design supports content, not the other way around. Subtle colors, no "blinking" effects, no frills. The opposite of attention-grabbing commercial design.

**Accessible by default** (Qualitativ)  
All design decisions consider accessibility. Color contrast, font sizes, and interactive elements meet WCAG 2.1 AA standards per eCH-0059.

**Efficient navigation** (Effizient)  
Users should reach their goal in 1-3 clicks. Content is concise and to the point ("auf den Punkt gebracht").

**Timeless design** (Zeitlos/Klassisch)  
Not following every trend. A design that ages well—visually and technically—and still works after years.

### Swiss Design Characteristics

- **Grid-based layouts**: Structured, aligned content
- **Sans-serif typography**: Clean, readable text (Noto Sans)
- **Generous whitespace**: Breathing room improves comprehension
- **Restrained color palette**: Limited colors applied purposefully
- **Functional minimalism**: Every element earns its place
- **Light appearance**: Standard websites are "eher hell" (rather light)

---

## Brand Elements

Per Regelwerk Section 2, these elements are mandatory for all *.admin.ch websites.

### Bundeslogo + Bereichszusatz

The federal logo must always be present on admin.ch websites.

| Requirement | Implementation |
|-------------|----------------|
| Logo always present | Required |
| White background | Required (except dark mode) |
| Fully visible at ≥1024px | Desktop: full logo with Bereichszusatz |
| Can minimize at <1024px | Mobile: coat of arms only acceptable |
| Can hide on scroll | Allowed |
| Placement | Top-left (SHOULD for Fachanwendungen) |

```css
/* Logo container */
.logo-container {
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

/* Responsive logo behavior */
@media (max-width: 1023px) {
  .logo--full { display: none; }
  .logo--minimal { display: block; }
}

@media (min-width: 1024px) {
  .logo--full { display: block; }
  .logo--minimal { display: none; }
}
```

### Favicon

All websites must use the official Bundes-Favicon.

```html
<link rel="icon" type="image/x-icon" href="/assets/favicon-bund.ico">
<link rel="icon" type="image/svg+xml" href="/assets/favicon-bund.svg">
```

### Required Footer Content

Per Regelwerk Section 3, organization websites must include:

- Legal information page (Rechtliches)
- Privacy policy (Datenschutz)
- Accessibility statement (Barrierefreiheit)
- Terms of use (Nutzungsbestimmungen)
- Cookie notice (if cookies are used)

```html
<footer class="footer">
  <div class="footer__legal">
    <a href="/legal">Rechtliches</a>
    <a href="/privacy">Datenschutz</a>
    <a href="/accessibility">Barrierefreiheit</a>
    <a href="/terms">Nutzungsbestimmungen</a>
  </div>
</footer>
```

### TopDrawer Element

Standard websites require the "Alle Schweizer Bundesbehörden" top drawer. For Fachanwendungen, justified exceptions are possible.

---

## Color System

The color palette implements the official Swiss Federal Corporate Design colors per WGL Bund V04.00.

### Primary Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Confederation Red** | `#DC0018` | `--color-primary` | Logo banner, favicon, selected states |
| **Accent Red** | `#F7001D` | `--color-primary-light` | Hover states, highlights |
| **Interactive Blue** | `#006699` | `--color-interactive` | Links, buttons, interactive elements |
| **Focus Blue** | `#66AFE9` | `--color-focus` | Focus states, input highlights |

### Fachanwendung Color Option

Per Regelwerk Section 2, Fachanwendungen CAN use blue for interaction and status elements instead of red:

```css
/* Standard Website Bund: Red interactions */
--color-interaction: var(--color-primary);      /* #DC0018 */

/* Fachanwendung/Intranet: Blue interactions (optional) */
--color-interaction: var(--color-interactive);  /* #006699 */
```

### Neutral Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Black** | `#000000` | `--color-black` | Reserved for logo elements only |
| **Text Primary** | `#333333` | `--color-text-primary` | Headings, primary text |
| **Text Secondary** | `#454545` | `--color-text-secondary` | Body text, paragraphs |
| **Text Muted** | `#757575` | `--color-text-muted` | Captions, helper text, metadata |
| **Border** | `#CCCCCC` | `--color-border` | Borders, dividers |
| **Border Light** | `#D5D5D5` | `--color-border-light` | Subtle separators |
| **Background Alt** | `#E5E5E5` | `--color-bg-alt` | Alternate backgrounds, disabled states |
| **Background Light** | `#F5F5F5` | `--color-bg-light` | Page background, cards |
| **White** | `#FFFFFF` | `--color-white` | Content areas, inputs |

### Semantic Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Surface** | `#F2F7F9` | `--color-surface` | Card backgrounds, panels |
| **Surface Alt** | `#E7EDEF` | `--color-surface-alt` | Alternate surface, hover states |
| **Surface Blue** | `#D8E8EF` | `--color-surface-blue` | Info panels, highlighted sections |
| **Highlight** | `#FFFAB2` | `--color-highlight` | Warnings, highlighted content |

### Status Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Success** | `#3C763D` | `--color-success` | Success messages, valid states |
| **Warning** | `#8A6D3B` | `--color-warning` | Warnings, cautions |
| **Error** | `#A94442` | `--color-error` | Errors, invalid states |
| **Info** | `#31708F` | `--color-info` | Informational messages |

### Color Application Rules

**Red (`--color-primary`)**
- Logo banner and favicon
- Selected navigation items (Standard Website Bund)
- Active/selected states
- Important call-to-action buttons
- Do NOT use for large background areas

**Blue (`--color-interactive`)**
- All hyperlinks
- Interactive buttons
- Interactive icons
- Form focus states
- Clickable elements
- Interaction/status elements (Fachanwendungen)

**Grays**
- Use darker grays for text hierarchy
- Lighter grays for backgrounds and borders
- Never use pure black (`#000000`) for text

### Contrast Requirements

All text must meet WCAG 2.1 AA contrast ratios per eCH-0059:
- Normal text (< 18pt): 4.5:1 minimum
- Large text (≥ 18pt or 14pt bold): 3:1 minimum
- UI components and graphics: 3:1 minimum

| Text Color | Background | Ratio | Pass |
|------------|------------|-------|------|
| `#333333` | `#FFFFFF` | 12.6:1 | ✓ |
| `#454545` | `#FFFFFF` | 9.7:1 | ✓ |
| `#757575` | `#FFFFFF` | 4.6:1 | ✓ |
| `#006699` | `#FFFFFF` | 5.9:1 | ✓ |
| `#DC0018` | `#FFFFFF` | 5.5:1 | ✓ |

---

## Typography

### Font Stack

Per Regelwerk Section 2, **Noto Sans** is the required web font. Frutiger may only be used until 31.07.2027.

**Primary Font (UI & Text)**
```css
--font-family-primary: 'Noto Sans', 'Helvetica Neue', 'Arial', sans-serif;
```

**Monospace (Code & Data)**
```css
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

**Font Import**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

Use a consistent type scale based on a 1.25 ratio (Major Third):

| Name | Size | Line Height | Weight | CSS Variable |
|------|------|-------------|--------|--------------|
| **Display** | 36px / 2.25rem | 1.2 | 600 | `--text-display` |
| **H1** | 28px / 1.75rem | 1.3 | 600 | `--text-h1` |
| **H2** | 24px / 1.5rem | 1.3 | 600 | `--text-h2` |
| **H3** | 20px / 1.25rem | 1.4 | 600 | `--text-h3` |
| **H4** | 18px / 1.125rem | 1.4 | 600 | `--text-h4` |
| **Body** | 16px / 1rem | 1.5 | 400 | `--text-body` |
| **Body Small** | 14px / 0.875rem | 1.5 | 400 | `--text-body-sm` |
| **Caption** | 12px / 0.75rem | 1.4 | 400 | `--text-caption` |
| **Label** | 14px / 0.875rem | 1.3 | 500 | `--text-label` |

### Typography Rules

**Headings**
- Use `--color-text-primary` (#333333)
- Font weight: 600 (Semi-bold)
- Avoid all-caps except for short labels (per Markenwerte: "keine Caps")
- Maximum 70-80 characters per line

**Body Text**
- Use `--color-text-secondary` (#454545)
- Font weight: 400 (Regular)
- Optimal line length: 50-75 characters
- Paragraph spacing: 1em between paragraphs

**Links**
- Color: `--color-interactive` (#006699)
- Underlined by default
- Hover: `--color-primary` (#DC0018), underline
- Visited: can remain same as default

**Emphasis**
- Bold (`font-weight: 600`) for important text
- Avoid italics for long passages
- Never use underline for emphasis (reserved for links)

---

## Spacing & Layout

### Spacing Scale

Use a consistent 4px base unit for all spacing:

| Token | Value | CSS Variable | Usage |
|-------|-------|--------------|-------|
| **xs** | 4px | `--space-xs` | Tight spacing, icon padding |
| **sm** | 8px | `--space-sm` | Related elements, compact lists |
| **md** | 16px | `--space-md` | Default spacing, card padding |
| **lg** | 24px | `--space-lg` | Section spacing, larger gaps |
| **xl** | 32px | `--space-xl` | Section separation |
| **2xl** | 48px | `--space-2xl` | Major sections |
| **3xl** | 64px | `--space-3xl` | Page-level spacing |

### Grid System

Use a 12-column grid with consistent gutters:

```css
--grid-columns: 12;
--grid-gutter: 24px;
--container-max-width: 1200px;
--container-padding: 16px;
```

**Breakpoints**

| Name | Width | CSS Variable | Notes |
|------|-------|--------------|-------|
| **sm** | 576px | `--breakpoint-sm` | Small devices |
| **md** | 768px | `--breakpoint-md` | Tablets |
| **lg** | 992px | `--breakpoint-lg` | Desktops |
| **xl** | 1200px | `--breakpoint-xl` | Large screens |
| **logo** | 1024px | `--breakpoint-logo` | Logo full/minimal switch |

### Layout Principles

**Container**
- Maximum width: 1200px
- Centered with auto margins
- Horizontal padding: 16px (mobile), 24px (desktop)

**Cards & Panels**
- Border radius: 4px (subtle rounding)
- Padding: 16px–24px
- Background: `--color-white` or `--color-surface`
- Shadow (optional): `0 1px 3px rgba(0, 0, 0, 0.1)`

**Content Sections**
- Vertical spacing between sections: 32px–48px
- Group related content visually
- Use horizontal rules sparingly

---

## Components

### Buttons

All buttons use the `.btn` base class with BEM modifiers for variants.

**Primary Button (Confederation Red)**
```css
.btn--primary {
  background-color: var(--color-primary);      /* #DC0018 */
  color: var(--color-white);
  border: 1px solid var(--color-primary);
  padding: var(--space-sm) var(--space-md);    /* 8px 16px */
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.btn--primary:hover:not(:disabled) {
  background-color: var(--color-primary-dark); /* #B00014 */
  border-color: var(--color-primary-dark);
}

.btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Secondary Button (Interactive Blue)**
```css
.btn--secondary {
  background-color: var(--color-interactive);   /* #006699 */
  color: var(--color-white);
  border: 1px solid var(--color-interactive);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.btn--secondary:hover:not(:disabled) {
  background-color: var(--color-interactive-hover); /* #005580 */
  border-color: var(--color-interactive-hover);
}
```

**Outline Button**
```css
.btn--outline {
  background-color: transparent;
  color: var(--color-interactive);
  border: 1px solid var(--color-interactive);
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn--outline:hover:not(:disabled) {
  background-color: var(--color-interactive);
  color: var(--color-white);
}
```

**Ghost Button**
```css
.btn--ghost {
  background-color: transparent;
  color: var(--color-interactive);
  border: 1px solid transparent;
  padding: var(--space-sm) var(--space-md);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-medium);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.btn--ghost:hover:not(:disabled) {
  background-color: var(--color-surface);
}
```

**Button Sizes**
```css
.btn--sm { padding: var(--space-xs) var(--space-sm); font-size: var(--text-body-sm); }
.btn--lg { padding: var(--space-md) var(--space-lg); font-size: var(--text-h4); }
```

### Form Elements

**Input Fields**
```css
.form-input {
  border: 1px solid var(--color-border);        /* #CCCCCC */
  border-radius: var(--border-radius);
  padding: var(--space-sm) var(--space-md);     /* 8px 16px */
  font-family: var(--font-family-primary);
  font-size: var(--text-body);
  background-color: var(--color-white);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input:focus {
  border-color: var(--color-focus);             /* #66AFE9 */
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 175, 233, 0.25);
}

.form-input:invalid {
  border-color: var(--color-error);
}
```

**Labels**
```css
.form-label {
  font-family: var(--font-family-primary);
  font-size: var(--text-label);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
  display: block;
}

.form-label--required::after {
  content: " *";
  color: var(--color-error);
}
```

**Select Dropdowns**
- Same styling as inputs
- Include chevron icon on right
- Use native select for accessibility

### Cards

Cards use BEM naming convention with `__` for elements.

```css
.card {
  background-color: var(--color-white);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-interactive);
}

.card__image {
  height: 180px;
  background: var(--color-bg-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--color-border-light);
  overflow: hidden;
  position: relative;
}

.card__body {
  padding: var(--space-md);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card__title {
  font-family: var(--font-family-primary);
  font-size: var(--text-h4);
  font-weight: var(--font-weight-bold);
  color: var(--color-interactive);
  margin: 0 0 var(--space-xs) 0;
  line-height: var(--line-height-snug);
}

.card__subtitle {
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-md) 0;
}

.card__tags {
  margin-top: auto;
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}
```

### Tables

```css
.table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-family-primary);
}

.table th {
  background-color: var(--color-surface);       /* #F2F7F9 */
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  text-align: left;
  padding: var(--space-sm) var(--space-md);
  border-bottom: 2px solid var(--color-border);
}

.table td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  color: var(--color-text-secondary);
}

.table tr:hover {
  background-color: var(--color-surface);
}
```

### Navigation

**Header**
```css
.header {
  background-color: var(--color-white);
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 0 var(--space-md);
}

@media (min-width: 1024px) {
  .header {
    min-height: 80px;
    padding: 0 var(--space-lg);
  }
}
```

**Navigation Links**
```css
.nav-link {
  font-family: var(--font-family-primary);
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-sm) var(--space-md);
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-interactive);
}

.nav-link.active {
  color: var(--color-interactive);
  font-weight: var(--font-weight-semibold);
}
```

### Alerts & Messages

Alerts use BEM naming with `--` for modifiers.

```css
.alert {
  font-family: var(--font-family-primary);
  padding: var(--space-md);
  border-radius: var(--border-radius);
  border-left: 4px solid;
  margin-bottom: var(--space-md);
}

.alert--info {
  background-color: var(--color-info-bg);
  border-left-color: var(--color-info);
  color: var(--color-info);
}

.alert--success {
  background-color: var(--color-success-bg);
  border-left-color: var(--color-success);
  color: var(--color-success);
}

.alert--warning {
  background-color: var(--color-warning-bg);
  border-left-color: var(--color-warning);
  color: var(--color-warning);
}

.alert--error {
  background-color: var(--color-error-bg);
  border-left-color: var(--color-error);
  color: var(--color-error);
}
```

---

## Icons

### Icon Style Requirements (WGL Bund V04.00)

Per Regelwerk Section 2, icons must follow this style:

| Requirement | Description |
|-------------|-------------|
| **Line-based** (linienartig) | Outline style, not filled |
| **Single-color** (einfarbig) | One color only, inherit or explicit |
| **Angular** (eher eckig als rund) | Prefer squared corners over rounded |
| **Reduced** (reduziert) | Minimal detail |
| **Flat** (flat) | No shadows or depth effects |
| **No 3D** (kein 3d) | No three-dimensional appearance |
| **No gradients** (ohne Verläufe) | Solid colors only |

The WGL Bund V04.00 uses icons from the Oblique library.

### Icon Sizing

| Context | Size | Usage |
|---------|------|-------|
| Inline | 16px | Within text |
| Default | 20px | Buttons, navigation |
| Large | 24px | Standalone, headers |

### Icon Colors

```css
.icon {
  /* Inherit text color by default */
  color: currentColor;
}

.icon--interactive {
  color: var(--color-interactive);
}

.icon--muted {
  color: var(--color-text-muted);
}
```

### Recommended Icon Libraries

1. **Lucide Icons** (recommended): Clean, consistent, matches WGL Bund style
2. **Feather Icons**: Simple and minimal
3. **Heroicons (outline)**: Good for UI elements

### Icon Usage

```html
<!-- Decorative icon (hidden from screen readers) -->
<span class="icon icon--pdf" aria-hidden="true"></span>

<!-- Interactive icon (needs label) -->
<button aria-label="Download PDF">
  <span class="icon icon--download" aria-hidden="true"></span>
</button>

<!-- Icon with text -->
<a href="/document.pdf" class="icon-link">
  <span class="icon icon--pdf" aria-hidden="true"></span>
  <span>Download Document</span>
</a>
```

---

## Accessibility

Per Regelwerk Section 5.2 and eCH-0059, websites must meet **WCAG 2.1 Level AA**.

### Checklist

- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 for text)
- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are clearly visible
- [ ] Images have alt text
- [ ] Form inputs have associated labels
- [ ] Error messages are descriptive
- [ ] Language is declared (`lang` attribute)
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Skip link provided for main content

### Language Declaration

```html
<!-- German -->
<html lang="de">

<!-- French -->
<html lang="fr">

<!-- Italian -->
<html lang="it">

<!-- English -->
<html lang="en">
```

### Focus States

All focusable elements must have visible focus indicators:

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Remove default outline only when custom focus is applied */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Skip Link

A skip link allows keyboard users to bypass navigation and jump directly to main content. Place it as the first focusable element in `<body>`:

```html
<body>
  <a href="#main-content" class="sr-only sr-only--focusable">
    Zum Hauptinhalt springen
  </a>
  <header>...</header>
  <main id="main-content">...</main>
</body>
```

The skip link is visually hidden until focused:

```css
.sr-only--focusable:focus,
.sr-only--focusable:active {
  position: fixed;
  top: var(--space-sm);
  left: var(--space-sm);
  width: auto;
  height: auto;
  padding: var(--space-sm) var(--space-md);
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  background-color: var(--color-white);
  color: var(--color-interactive);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  z-index: calc(var(--z-tooltip) + 1);
  text-decoration: none;
}
```

---

## Naming Conventions

### CSS Classes

Use BEM (Block Element Modifier) methodology:

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__title { }
.card__body { }
.card__footer { }

/* Modifier */
.card--highlighted { }
.card--compact { }
```

### CSS Variables

Use semantic naming with kebab-case:

```css
/* Color */
--color-{category}-{variant}
--color-primary
--color-text-secondary
--color-bg-light

/* Spacing */
--space-{size}
--space-md
--space-lg

/* Typography */
--text-{element}
--font-family-{type}
```

### File Naming

- Components: `ComponentName.js` (PascalCase)
- Styles: `component-name.css` (kebab-case)
- Utilities: `_utilities.css` (prefixed with underscore)
- Images: `icon-name.svg`, `image-description.png` (kebab-case)

---

## CSS Variables Reference

Complete CSS custom properties for copy-paste implementation:

```css
:root {
  /* =====================
     COLOR SYSTEM
     ===================== */
  
  /* Primary */
  --color-primary: #DC0018;
  --color-primary-light: #F7001D;
  --color-primary-dark: #B00014;
  
  /* Interactive */
  --color-interactive: #006699;
  --color-interactive-hover: #005580;
  --color-focus: #66AFE9;
  
  /* Neutrals */
  --color-black: #000000;
  --color-text-primary: #333333;
  --color-text-secondary: #454545;
  --color-text-muted: #757575;
  --color-border: #CCCCCC;
  --color-border-light: #D5D5D5;
  --color-bg-alt: #E5E5E5;
  --color-bg-light: #F5F5F5;
  --color-white: #FFFFFF;
  
  /* Surfaces */
  --color-surface: #F2F7F9;
  --color-surface-alt: #E7EDEF;
  --color-surface-blue: #D8E8EF;
  --color-highlight: #FFFAB2;

  /* Dark UI (footer, contact sections) */
  --color-surface-dark: #3d4f5f;
  --color-surface-darker: #2d3a44;

  /* Status */
  --color-success: #3C763D;
  --color-success-bg: #DFF0D8;
  --color-warning: #8A6D3B;
  --color-warning-bg: #FCF8E3;
  --color-error: #A94442;
  --color-error-bg: #F2DEDE;
  --color-info: #31708F;
  --color-info-bg: #D9EDF7;
  
  /* =====================
     TYPOGRAPHY
     ===================== */
  
  /* WGL Bund V04.00: Noto Sans required */
  --font-family-primary: 'Noto Sans', 'Helvetica Neue', 'Arial', sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  
  --text-display: 2.25rem;    /* 36px */
  --text-h1: 1.75rem;         /* 28px */
  --text-h2: 1.5rem;          /* 24px */
  --text-h3: 1.25rem;         /* 20px */
  --text-h4: 1.125rem;        /* 18px */
  --text-body: 1rem;          /* 16px */
  --text-body-sm: 0.875rem;   /* 14px */
  --text-caption: 0.75rem;    /* 12px */
  --text-label: 0.875rem;     /* 14px */
  
  --line-height-tight: 1.2;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* =====================
     SPACING
     ===================== */
  
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* =====================
     LAYOUT
     ===================== */
  
  --container-max-width: 1200px;
  --container-padding: 16px;
  --grid-gutter: 24px;
  
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-logo: 1024px;  /* Logo full/minimal switch */
  
  /* =====================
     BORDERS & SHADOWS
     ===================== */
  
  --border-radius-sm: 2px;
  --border-radius: 4px;
  --border-radius-lg: 8px;
  --border-radius-full: 9999px;
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* =====================
     TRANSITIONS
     ===================== */
  
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* =====================
     Z-INDEX SCALE
     ===================== */
  
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal-backdrop: 300;
  --z-modal: 400;
  --z-tooltip: 500;
}
```

---

## Quick Reference Card

### Essential Colors

| Purpose | Variable | Hex |
|---------|----------|-----|
| Primary brand | `--color-primary` | #DC0018 |
| Links & buttons | `--color-interactive` | #006699 |
| Body text | `--color-text-secondary` | #454545 |
| Borders | `--color-border` | #CCCCCC |
| Page background | `--color-bg-light` | #F5F5F5 |
| Card background | `--color-white` | #FFFFFF |

### Essential Spacing

| Size | Variable | Value |
|------|----------|-------|
| Small | `--space-sm` | 8px |
| Medium | `--space-md` | 16px |
| Large | `--space-lg` | 24px |

### Essential Typography

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Heading 1 | 28px | 600 | Noto Sans |
| Heading 2 | 24px | 600 | Noto Sans |
| Body | 16px | 400 | Noto Sans |
| Label | 14px | 500 | Noto Sans |

---

## References

### Official Documentation

- [WGL Bund V04.00 Storybook](https://swiss.github.io/designsystem/?path=/docs/get-started--docs) — Code library
- [GitHub Repository](https://github.com/swiss/designsystem) — Source code
- [Figma Library](https://www.figma.com/design/3UYgqxmcJbG0hpWuti3y8U/) — Design System Core Library
- [BK CD Bund Page](https://www.bk.admin.ch/bk/de/home/dokumentation/cd-bund/das-erscheinungsbild-der-schweizerischen-bundesverwaltung-im-int.html) — Official guidelines

### Reference Implementation

- [swisstopo.admin.ch](https://www.swisstopo.admin.ch/en) — Modern CD Bund example

### Standards

- [eCH-0059 Accessibility](https://www.ech.ch/de/ech/ech-0059/3.0) — Swiss accessibility standard
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) — Web accessibility

### Legacy (Unsupported)

- ~~[swiss.github.io/styleguide](https://swiss.github.io/styleguide/en/)~~ — Old design system, no longer maintained

### Contact

- **New component developments**: support@bk.admin.ch
- **General WGL Bund questions**: webforum@bk.admin.ch

---

*This style guide implements Webguidelines Bund V04.00 (Regelwerk vom 06.03.2024) for Fachanwendung development. For Standard Website Bund applications using the Standard-Dienst Webauftritte, use the official Storybook components directly.*
