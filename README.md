# HP Instant Ink - Landing Page Project

## 📋 Project Overview

Two landing page versions for HP Instant Ink brand page implementation across retail partners.

## 📁 Project Structure

```
instant-ink-fev-2026/
├── index.html              # Standalone version (works anywhere)
├── worten-version.html     # Worten-specific compliant version
├── design/
│   ├── assets/
│   │   └── images/         # Place all images here
│   ├── Instant-ink-brand-page-text.md
│   └── PSD files
└── README.md
```

## 🖼️ Required Images

Place all images in: `design/assets/images/`

### Image List & Specifications

#### Section 1: Hero
- `hero-hp-logo.png` - 213x213px
- `hero-img.png` - 1418x600px
- `hero-crowd-icon.png` - 223x149px

#### Section 2: Save
- `save-img.png` - 1314x600px

#### Section 3: About
- `about-img.png` - 1470x854px

#### Section 4: 3 Months Free
- `free-months-img.png` - 1191x600px

#### Section 5: How It Works
- `icon-step-1.png` - 209x157px
- `icon-step-2.png` - 245x148px
- `icon-step-3.png` - 168x168px
- `icon-step-4.png` - 183x183px

#### Section 6: Plans
- `icon-ink-drop.png` - 107x154px

#### Section 7: Benefits
- `never-run-out-img.png` - 858x749px
- `subsciption-img.png` - 858x749px
- `price-img.png` - 856x750px
- `recicle-img.png` - 858x750px

**Total: 15 images**

## 🔧 Version Details

### 1. Standalone Version (`index.html`)
- Complete HTML document with `<head>` and `<body>`
- Fully functional when opened locally
- All CSS in `<style>` block
- All JavaScript in `<script>` block
- Fully responsive (mobile + desktop)
- Images referenced from `design/assets/images/`

**To test locally:**
1. Place images in `design/assets/images/`
2. Open `index.html` in any browser

### 2. Worten Version (`worten-version.html`)
Compliant with Worten's strict guidelines:

✅ **Compliant Features:**
- ✅ Under 200,000 characters
- ✅ CSS and JS in blocks (inline)
- ✅ No `<head>` or `<body>` tags
- ✅ All classes prefixed with `.raw-`
- ✅ No inline styles (only classes)
- ✅ No z-index above 1
- ✅ Background color compatible with #f6f6f6
- ✅ CSS at the beginning before HTML
- ✅ Wrapped in container div

**Before sending to Worten:**
1. They will replace image URLs with their own paths
2. They will place this code in their HTML placeholder
3. Make sure to send with note about image replacements needed

### 🔗 Links

All links currently point to:
```
https://www.hp.com/pt-pt/printers/instant-ink.html
```

Update these as needed before deployment.

## 🎨 Features

### Responsive Design
- Desktop: Full layout with side-by-side content
- Tablet: Adjusted spacing and flexible columns
- Mobile: Stacked single-column layout

### Interactive Elements
- FAQ accordion (expand/collapse)
- Hover effects on cards and buttons
- Smooth transitions

### Sections Included
1. **Hero** - Main value proposition with CTA
2. **Save Section** - What is Instant Ink explanation
3. **How It Works** - 4-step process
4. **Promo Banner** - 3 months free offer
5. **Plans** - 5 subscription tiers
6. **Benefits** - 4 key benefits with imagery
7. **FAQ** - 4 common questions
8. **CTA** - Final call-to-action

## 📝 Content Source

All text content is structured in:
```
design/Instant-ink-brand-page-text.md
```

## 🚀 Deployment Checklist

### For Standalone Version:
- [ ] Export and place all 15 images
- [ ] Test on desktop browser
- [ ] Test on mobile browser
- [ ] Verify all links work
- [ ] Check responsive breakpoints

### For Worten Version:
- [ ] Send HTML file to Worten
- [ ] Provide image files separately
- [ ] Include image mapping guide (which file = which placeholder)
- [ ] Confirm their background color implementation
- [ ] Note: They handle image URL replacement
5. **Prepare Worten package** with images + HTML

---

**Questions or adjustments needed?** Let me know! 🚀
