# HP Instant Ink - Landing Page

**Responsive landing page for HP Instant Ink subscription service**  
Portuguese market | Worten integration ready | Mobile & Desktop optimized

---

## 🚀 Quick Start

### Development
```bash
npm install
npm start           # Start dev server with hot reload (localhost:1234)
```

### Production Builds
```bash
npm run build:standalone    # Standard version → dist-standalone/
npm run build:worten       # Worten integration → worten-dist/
```

---

## 📁 Project Structure

```
instant-ink-fev-2026/
├── src/
│   ├── index.pug              # Standard template
│   ├── index-worten.pug       # Worten template (with wrapper)
│   ├── pug/sections/          # Page sections (hero, plans, etc.)
│   ├── scss/
│   │   ├── main.scss          # Standard styles
│   │   ├── main-worten.scss   # Worten styles (scoped)
│   │   ├── base/              # Typography, fonts, variables
│   │   ├── components/        # Buttons, containers
│   │   └── sections/          # Section-specific styles
│   └── assets/
│       ├── fonts/             # HP Simplified, Forma DJRUI
│       └── images/            # 15 PNGs (logos, icons, photos)
├── dist-standalone/           # Standard build output
│   ├── index.html             # Complete HTML with inline CSS
│   └── assets/                # Fonts + images
├── worten-dist/               # Worten build output
│   ├── hp-instant-ink-worten.html
│   └── assets/
├── build-standard.js          # Standard build script
├── build-worten.js            # Worten build script
└── package.json
```

---

## 🔨 Build Scripts

| Command | Output | Description |
|---------|--------|-------------|
| `npm start` | `localhost:1234` | Dev server with hot reload (Parcel) |
| `npm run build` | `dist/` | Parcel production build (hashed assets) |
| `npm run build:standalone` | `dist-standalone/` | Standard standalone (inline CSS, fixed assets) |
| `npm run build:worten` | `worten-dist/` | Worten compliant version |
| `npm run clean` | - | Clean all build directories |
| `npm run clean:standalone` | - | Clean only dist-standalone |
| `npm run clean:worten` | - | Clean only worten-dist |

---

## 📦 Build Outputs

### Standard Standalone (`dist-standalone/`)
- **File:** `index.html` (~34.6 KB)
- **CSS:** Inline, 20,643 chars
- **HTML Structure:** Complete with DOCTYPE, head, body
- **Assets:** `./assets/fonts/`, `./assets/images/`
- **Use Case:** General deployment, file:// compatible

### Worten Integration (`worten-dist/`)
- **File:** `hp-instant-ink-worten.html` (~35.0 KB)
- **CSS:** Inline, 20,862 chars (with transformations)
- **Character Limit:** 35,019 / 200,000 (17.51%)
- **Wrapper:** `.hpi-hp-instant-ink` (scoped styles)
- **Transformations:**
  - Z-index ≤ 1 (12 fixes)
  - Background #fff → #f6f6f6
  - Font paths: `./assets/fonts/`
- **Use Case:** Worten website integration

---

## 🎨 Assets

### Images (15 files)
All images copied to build output during build process.

**Hero Section:**
- `hero-hp-logo.png` (80x80px) - HP logo
- `hero-img.png` (550x auto) - Family photo
- `hero-crowd-icon.png` (90x auto) - Subscribers icon

**Content Sections:**
- `save-img.png` - Savings illustration
- `about-img.png` - Product image
- `free-months-img.png` - Promo image
- `icon-step-1.png` to `icon-step-4.png` - How it works icons
- `icon-ink-drop.png` - Subscription icon
- `never-run-out-img.png` - Benefit image
- `subscription-img.png` - Flexibility image
- `price-img.png` - Pricing image
- `recicle-img.png` - Recycling image

### Fonts (12 files)
- **HP Simplified:** Light (300), Regular (400), Bold (700) + Italic variants
- **Forma DJRUI:** Regular (400) - Used for headings

---

## 🎯 Features

### Responsive Design
- 5 breakpoints: 1440px, 1024px, 768px, 480px, 360px
- Mobile-first approach
- Touch-optimized (min 44x44px targets)
- Flexible images and typography

### Class Naming
All classes prefixed with `.hpi-` (HP Instant Ink) for:
- Namespace isolation
- Worten integration compatibility
- No style conflicts

### Sections
1. **Hero** - Brand + call to action
2. **Savings** - Up to 70% savings message
3. **What Is** - Service explanation + video
4. **Promo** - 3 months free offer
5. **How It Works** - 4-step process
6. **CTA** - Purchase call to action
7. **Plans** - 5 pricing tiers
8. **Benefits** - 4 key advantages
9. **FAQ** - Common questions
10. **Legal** - Terms and disclaimers

---

## 📝 Documentation

- **[WORTEN-BUILD.md](WORTEN-BUILD.md)** - Worten build process details
- **[WORTEN-DEPLOYMENT.md](WORTEN-DEPLOYMENT.md)** - Deployment instructions
- **[RESPONSIVE-GUIDE.md](RESPONSIVE-GUIDE.md)** - Responsive design system
- **[DEV-README.md](DEV-README.md)** - Development workflow

---

## ⚙️ Technical Stack

- **Templates:** Pug 3.0.2
- **Styles:** Sass 1.70.0
- **Build:** Node.js custom scripts
- **Dev Server:** Parcel 2.12.0
- **Package Manager:** npm

---

## 🔍 Build Statistics

### Standard Standalone
```
CSS: 20,643 chars
HTML: 13,710 chars
Total: 34,598 chars
Assets: 27 files (15 images + 12 fonts)
```

### Worten Version
```
CSS: 20,862 chars (with transformations)
HTML: 13,782 chars (with wrapper)
Total: 35,046 chars (17.52% of 200K limit)
Remaining: 164,954 chars
Assets: 27 files (15 images + 12 fonts)
```

---

## 📄 License

© 2026 HP Inc. All rights reserved.
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
