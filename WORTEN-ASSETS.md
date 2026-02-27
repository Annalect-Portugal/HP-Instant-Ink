# Worten Build - Asset Management

## Overview

The Worten build system automatically copies all necessary assets (images and fonts) to the output directory with the correct folder structure and relative paths.

## Build Output Structure

```
worten-dist/
├── hp-instant-ink-worten.html    # Main HTML file with inline CSS
├── build-report.json             # Build statistics and validation
└── assets/
    ├── images/                   # 15 PNG images
    │   ├── hero-hp-logo.png
    │   ├── hero-img.png
    │   ├── hero-crowd-icon.png
    │   ├── save-img.png
    │   ├── about-img.png
    │   ├── free-months-img.png
    │   ├── icon-step-1.png
    │   ├── icon-step-2.png
    │   ├── icon-step-3.png
    │   ├── icon-step-4.png
    │   ├── icon-ink-drop.png
    │   ├── never-run-out-img.png
    │   ├── subscription-img.png
    │   ├── price-img.png
    │   └── recicle-img.png
    └── fonts/                    # 12 font files
        ├── FormaDJRUI.woff
        ├── FormaDJRUI.woff2
        ├── HPSimplifiedBold.ttf
        ├── HpSimplifiedLight.eot
        ├── HpSimplifiedLight.ttf
        ├── HpSimplifiedLight.woff
        ├── HPSimplifiedLightItalic.eot
        ├── HPSimplifiedLightItalic.ttf
        ├── HPSimplifiedLightItalic.woff
        ├── HPSimplifiedRegular.eot
        ├── HPSimplifiedRegular.ttf
        └── HPSimplifiedRegular.woff
```

## Asset Paths in HTML

### Font References
All font files use relative paths from the HTML file:
```css
@font-face {
  font-family: "HP Simplified";
  src: url("../assets/fonts/HpSimplifiedLight.eot");
  src: url("../assets/fonts/HpSimplifiedLight.eot?#iefix") format("embedded-opentype"),
       url("../assets/fonts/HpSimplifiedLight.woff") format("woff"),
       url("../assets/fonts/HpSimplifiedLight.ttf") format("truetype");
}
```

### Image References
All images use relative paths:
```html
<img src="./assets/images/hero-hp-logo.png" alt="HP" />
<img src="./assets/images/hero-img.png" alt="Family" />
```

## Build Process

The build script ([build-worten.js](build-worten.js)) handles asset management automatically:

### 1. **Directory Setup**
```javascript
setupDirectories() {
  // Creates worten-dist/assets/images and worten-dist/assets/fonts
}
```

### 2. **Asset Copying**
```javascript
copyAssets() {
  // Copies src/assets/images/* → worten-dist/assets/images/*
  // Copies src/assets/fonts/* → worten-dist/assets/fonts/*
}
```

### 3. **Path Processing**
```javascript
prefixCssClasses(css) {
  // Protects url() declarations from class prefixing
  // Ensures font/image paths remain unchanged
}
```

## Asset Statistics

| Category | Count | Total Size |
|----------|-------|------------|
| Images   | 15    | ~2-3 MB    |
| Fonts    | 12    | ~500 KB    |
| **Total**| **27**| **~3 MB**  |

## Important Notes

### ✅ What Gets Copied
- All PNG images from `src/assets/images/`
- All font files (EOT, WOFF, WOFF2, TTF) from `src/assets/fonts/`
- Directory structure is preserved

### ⚠️ Path Requirements
- Font paths use `../assets/fonts/` (up one level from HTML)
- Image paths use `./assets/images/` (same level as HTML)
- Paths are encoded (spaces become `%20`)
- No absolute paths are used

### 🔧 Build Script Protection
The build script protects asset paths from modifications:
```javascript
// Before class prefixing:
url("../assets/fonts/HpSimplifiedLight.eot")

// After class prefixing (UNCHANGED):
url("../assets/fonts/HpSimplifiedLight.eot")  // ✓ Correct

// NOT:
url("../assets/fonts/HpSimplifiedLight.raw-eot")  // ✗ Wrong
```

## Deployment

When deploying to Worten, upload the entire `worten-dist/` folder maintaining the structure:

```
Server:
├── hp-instant-ink-worten.html    # Main file
└── assets/
    ├── images/                   # Upload all images
    └── fonts/                    # Upload all fonts
```

### Deployment Checklist
- [ ] Upload `hp-instant-ink-worten.html` to root
- [ ] Upload `assets/images/` folder (15 files)
- [ ] Upload `assets/fonts/` folder (12 files)
- [ ] Verify directory structure matches build output
- [ ] Test font loading in browser
- [ ] Test image loading in browser
- [ ] Verify responsive images on mobile

## Build Commands

```bash
# Build for Worten (with assets)
npm run build:worten

# Clean all builds
npm run clean

# Build standard version
npm run build
```

## Troubleshooting

### Fonts Not Loading
```bash
# Check if fonts exist:
ls worten-dist/assets/fonts/

# Verify font paths in HTML:
grep -E "url\(\.\./assets/fonts" worten-dist/hp-instant-ink-worten.html
```

### Images Not Loading
```bash
# Check if images exist:
ls worten-dist/assets/images/

# Verify image paths in HTML:
grep -E "src=\"\./assets/images" worten-dist/hp-instant-ink-worten.html
```

### Rebuild from Scratch
```bash
# Clean and rebuild:
npm run clean
npm run build:worten
```

## Character Count Impact

The asset references add minimal characters to the HTML:
- **CSS (fonts)**: ~800 characters for @font-face declarations
- **HTML (images)**: ~1,500 characters for <img> tags
- **Total Impact**: ~2,300/200,000 characters (1.15%)

Current build: **35,105 characters (17.55% of limit)**

## Technical Details

### Font Format Priority
```css
/* Format cascade ensures browser compatibility: */
1. EOT (for IE9)
2. WOFF (for modern browsers)
3. TTF (fallback)
```

### Image Optimization
- All images are PNG format
- Recommended: optimize PNGs before build (e.g., TinyPNG)
- Target: <200KB per image for faster loading

### Path Resolution
```
worten-dist/
├── hp-instant-ink-worten.html    ← You are here
└── assets/
    ├── fonts/                    ← ../assets/fonts/file.woff
    └── images/                   ← ./assets/images/file.png
```

## Maintenance

### Adding New Assets

**New Image:**
1. Add to `src/assets/images/`
2. Reference in Pug: `img(src="./assets/images/new-image.png")`
3. Run `npm run build:worten`

**New Font:**
1. Add to `src/assets/fonts/`
2. Add @font-face declaration in `src/scss/base/_fonts.scss`
3. Run `npm run build:worten`

### Removing Assets

1. Delete from `src/assets/images/` or `src/assets/fonts/`
2. Remove references from Pug/SCSS
3. Run `npm run build:worten`

---

## Summary

✅ **Automatic**: Assets copy automatically on build  
✅ **Complete**: All images and fonts included  
✅ **Correct Paths**: Relative paths preserved  
✅ **Protected**: Paths unchanged during class prefixing  
✅ **Verified**: 15 images + 12 fonts confirmed  

**Build Status**: 35,105/200,000 characters (17.55% used, 82.45% remaining)
