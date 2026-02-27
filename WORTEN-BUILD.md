# Worten Build System

Complete build automation for HP Instant Ink Worten integration.

---

## 🎯 Worten Requirements

| Requirement | Status | Details |
|-------------|--------|---------|
| Character Limit | ✅ | 35,046 / 200,000 (17.52%) |
| Inline CSS | ✅ | All CSS in `<style>` block |
| Class Prefix | ✅ | All classes use `.hpi-` prefix |
| No External Files | ✅ | Assets copied to `./assets/` |
| Z-index ≤ 1 | ✅ | 12 instances fixed automatically |
| Background Color | ✅ | #fff → #f6f6f6 (transparent images required) |
| HTML Structure | ✅ | Complete DOCTYPE + html/head/body |
| Wrapper Class | ✅ | `.hpi-hp-instant-ink` for scoped styles |

---

## 🚀 Quick Build

```bash
npm run build:worten
```

**Output:** `worten-dist/hp-instant-ink-worten.html`

---

## 📁 Build Output Structure

```
worten-dist/
├── hp-instant-ink-worten.html    # Main integration file (35KB)
├── build-report.json              # Build statistics
└── assets/
    ├── fonts/                     # 12 font files
    │   ├── HpSimplifiedLight.*
    │   ├── HPSimplifiedRegular.*
    │   ├── HPSimplifiedBold.ttf
    │   └── FormaDJRUI.*
    └── images/                    # 15 PNG images
        ├── hero-*.png
        ├── save-img.png
        ├── about-img.png
        ├── free-months-img.png
        ├── icon-*.png
        ├── never-run-out-img.png
        ├── subscription-img.png
        ├── price-img.png
        └── recicle-img.png
```

---

## 🔧 Build Process Steps

The `build-worten.js` script performs:

### 1. Setup Directories
- Clears previous `worten-dist/`
- Creates `assets/fonts/` and `assets/images/`

### 2. Copy Assets
- **15 images** from `src/assets/images/` → `worten-dist/assets/images/`
- **12 fonts** from `src/assets/fonts/` → `worten-dist/assets/fonts/`

### 3. Compile Templates
- Compiles `src/index-worten.pug` (Worten-specific template)
- Uses Pug 3.0.2 with basedir for includes

### 4. Compile Styles
- Compiles `src/scss/main-worten.scss`
- Uses compressed output
- Original: 20,851 chars

### 5. CSS Transformations

#### Fix Z-Index
Ensures all z-index values ≤ 1:
```javascript
z-index: 10 → z-index: 1  // Fixed: 12 instances
```

#### Fix Font Paths
Changes relative paths for file:// compatibility:
```javascript
url("../assets/fonts/X") → url("./assets/fonts/X")
```

#### Adjust Background Colors
Replaces white backgrounds with Worten gray:
```javascript
background-color: #fff → background-color: #f6f6f6
background: #fff → background: #f6f6f6
```

⚠️ **Note:** Images must have transparent backgrounds (not solid white) for proper display.

#### Check Element Selectors
Warns about element selectors (body, p, h1, etc.):
```
⚠ Warning: Found element selectors: body, span, p, h1, h2, h3, h4, h6
```
These are scoped within `.hpi-hp-instant-ink` wrapper, so safe for integration.

### 6. Extract Body Content
Removes `<html>`, `<head>`, `<body>` tags, keeps only content.

### 7. Create Final HTML
Wraps in complete HTML5 structure:
```html
<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HP Instant Ink - Poupe até 70% em tinteiros</title>
  <style>
    /* Inline CSS here */
  </style>
</head>
<body>
  <div class="hpi-hp-instant-ink">
    <!-- Content here -->
  </div>
</body>
</html>
```

### 8. Save & Report
- Saves to `worten-dist/hp-instant-ink-worten.html`
- Generates `build-report.json` with statistics

---

## 📊 Build Statistics

### Current Build (Latest)
```
CSS: 20,862 chars
HTML: 13,782 chars
Total: 35,046 chars

Character Usage: 17.52% of 200K limit
Remaining: 164,954 chars

Assets: 27 files (15 images + 12 fonts)
Build Time: ~1s
```

### Transformations Applied
- ✅ Z-index fixes: 12 instances
- ✅ Font path adjustments: All @font-face declarations
- ✅ Background color changes: All white backgrounds → #f6f6f6

---

## 🔍 Build Report (build-report.json)

```json
{
  "timestamp": "2026-02-25T...",
  "stats": {
    "css": 20862,
    "html": 13782,
    "total": 35046,
    "limit": 200000,
    "percentage": "17.52%",
    "remaining": 164954
  },
  "files": {
    "images": 15,
    "fonts": 12
  }
}
```

---

## 🎨 Template Differences

### Standard Template (`index.pug`)
```pug
doctype html
html(lang="pt-PT")
  head
    link(rel="stylesheet" href="./scss/main.scss")
  body
    include pug/sections/hero.pug
    // ... more sections
```

### Worten Template (`index-worten.pug`)
```pug
.hpi-hp-instant-ink
  include pug/sections/hero.pug
  // ... more sections
```

**Key Difference:** Worten template uses wrapper class for scoped styles.

---

## 🎯 SCSS Differences

### Standard SCSS (`main.scss`)
```scss
@use 'base/reset';  // Global reset
@use 'base/fonts';
// ... imports
```

### Worten SCSS (`main-worten.scss`)
```scss
@use 'base/fonts';
// ... imports (no reset)

.hpi-hp-instant-ink {
  // Scoped reset
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  // Scoped base styles
  font-family: $font-primary;
  overflow-x: hidden;
  // ...
}
```

**Key Difference:** Worten SCSS has scoped resets within wrapper to avoid conflicts with Worten's site styles.

---

## 🚨 Important Notes

### 1. Image Backgrounds
Images must have **transparent backgrounds** (not solid white):
- Hero images with diagonal elements
- Product photos
- Icons

If images have white backgrounds, they will show gray rectangles on Worten's #f6f6f6 background.

### 2. Element Selectors Warning
The build shows a warning about element selectors (body, p, h1, etc.). This is **safe** because:
- All styles are scoped within `.hpi-hp-instant-ink`
- Won't affect Worten's site styles
- Worten's styles won't affect our content

### 3. File Paths
Assets use relative paths:
```html
<img src="./assets/images/hero-img.png">
<style>url("./assets/fonts/FormaDJRUI.woff2")</style>
```

Works with:
- ✅ `file://` protocol (local testing)
- ✅ Worten's server (same directory structure)

### 4. Character Budget
Current usage: **17.52%** of 200K limit

Plenty of room for:
- Additional content sections
- More detailed legal text
- Extra styling
- JavaScript functionality (if needed)

---

## 🛠️ Troubleshooting

### Build Fails
```bash
npm run clean:worten    # Clean Worten artifacts
npm install             # Reinstall dependencies
npm run build:worten    # Try again
```

### Assets Missing
Check that all files exist in:
- `src/assets/images/` (15 PNG files)
- `src/assets/fonts/` (12 font files)

### Character Limit Exceeded
If build exceeds 200K:
1. Check `build-report.json` for breakdown
2. Optimize CSS (remove unused styles)
3. Compress HTML (remove whitespace)
4. Minify further if needed

### Images Show White Boxes
Images have solid white backgrounds instead of transparent:
1. Open images in image editor
2. Remove white background
3. Save as PNG with transparency
4. Rebuild: `npm run build:worten`

---

## 📚 Related Documentation

- **[WORTEN-DEPLOYMENT.md](WORTEN-DEPLOYMENT.md)** - Deployment process to Worten
- **[WORTEN-SUMMARY.md](WORTEN-SUMMARY.md)** - Quick reference summary
- **[README.md](README.md)** - General project overview

---

## ✅ Pre-Deployment Checklist

Before sending to Worten:

- [ ] Run `npm run build:worten` successfully
- [ ] Check `build-report.json` - under 200K
- [ ] Test `worten-dist/hp-instant-ink-worten.html` in browser
- [ ] Verify all images load correctly
- [ ] Verify all fonts load correctly
- [ ] Check responsive behavior (mobile/tablet/desktop)
- [ ] Verify no white boxes around images (transparent backgrounds)
- [ ] Check all links work
- [ ] Review legal text accuracy
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Package: `hp-instant-ink-worten.html` + `assets/` folder
- [ ] Document any special instructions for Worten team

---

© 2026 HP Inc. All rights reserved.
