# HP Instant Ink Landing Page - Development Setup

## Overview
Modern development environment using Pug templates and SCSS with live reload.

## Technologies
- **Pug**: Template engine for modular HTML
- **SCSS**: CSS preprocessor with variables and nesting
- **Parcel**: Zero-config bundler with hot module replacement

## Project Structure
```
src/
├── index.pug                 # Main entry file
├── pug/
│   └── sections/            # Individual section templates
│       ├── hero.pug
│       ├── hero-black.pug
│       ├── what-is.pug
│       ├── never-run-out.pug
│       ├── promo.pug
│       ├── how-it-works.pug
│       ├── plans.pug
│       ├── benefits.pug
│       ├── faq.pug
│       └── footer.pug
├── scss/
│   ├── main.scss            # Main SCSS file (imports all partials)
│   ├── base/                # Base styles
│   │   ├── _reset.scss
│   │   ├── _variables.scss
│   │   ├── _typography.scss
│   │   └── _responsive.scss
│   ├── components/          # Reusable components
│   │   ├── _buttons.scss
│   │   └── _container.scss
│   └── sections/            # Section-specific styles
│       ├── _hero.scss
│       ├── _hero-black.scss
│       ├── _what-is.scss
│       ├── _never-run-out.scss
│       ├── _promo.scss
│       ├── _how-it-works.scss
│       ├── _plans.scss
│       ├── _benefits.scss
│       ├── _faq.scss
│       └── _footer.scss
└── assets/
    └── images/              # Image files

dist/                        # Built files (generated)
```

## Getting Started

### 1. Install Dependencies
```powershell
npm install
```

### 2. Development Mode (with auto-reload)
```powershell
npm run dev
```
- Opens browser automatically
- Watches for changes in Pug, SCSS, and asset files
- Hot reload on file save
- Development server at http://localhost:1234

### 3. Build for Production
```powershell
npm run build
```
- Compiles all Pug templates to single HTML file
- Processes and minifies SCSS to CSS
- Optimizes and copies images
- Output in `dist/` folder

### 4. Clean Build Cache
```powershell
npm run clean
```

## Development Workflow

### Editing Sections
1. Open the section file in `src/pug/sections/`
2. Edit the Pug markup
3. Save - browser auto-refreshes

### Styling Sections
1. Open the corresponding SCSS file in `src/scss/sections/`
2. Edit styles using SCSS syntax
3. Save - styles update instantly

### Adding New Sections
1. Create new `.pug` file in `src/pug/sections/`
2. Create new `_section-name.scss` in `src/scss/sections/`
3. Import in `src/scss/main.scss`: `@import 'sections/section-name';`
4. Include in `src/index.pug`: `include pug/sections/section-name.pug`

### Working with Assets
- Place images in `src/assets/images/`
- Reference in Pug: `img(src="../assets/images/filename.png")`
- Parcel handles optimization and path resolution

## Pug Syntax Overview

### Basic HTML
```pug
div.class-name
  h1 Heading Text
  p Paragraph text
```

### Attributes
```pug
img.hero-logo(src="path/to/image.png" alt="Description")
a.btn-primary(href="https://example.com") Click Me
```

### Nesting
```pug
section.hero-section
  .container
    .hero-content
      h1 Title
      p Description
```

### Comments
```pug
//- This is a Pug comment (not in output)
// This is an HTML comment (in output)
```

## SCSS Features

### Variables
```scss
$primary-blue: #0096D6;
color: $primary-blue;
```

### Nesting
```scss
.hero-section {
  background: white;
  
  .hero-content {
    display: flex;
  }
}
```

### Mixins & Functions
```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported

## Troubleshooting

### Port already in use
Parcel uses port 1234 by default. If it's in use, it will automatically try the next available port.

### Build errors
Run `npm run clean` to clear cache, then try again.

### SCSS import errors
Make sure partial files start with `_` and imports don't include the underscore or extension.

## Production Deployment
After running `npm run build`, deploy the contents of the `dist/` folder to your web server.
