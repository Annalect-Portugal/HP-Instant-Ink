# 📱 Responsive Breakpoints - Quick Reference

## Breakpoint Variables

```scss
$breakpoint-mobile-small: 360px;   // Small phones
$breakpoint-mobile: 480px;          // Standard mobile
$breakpoint-tablet: 768px;          // Tablets
$breakpoint-tablet-large: 1024px;   // Large tablets
$breakpoint-desktop: 1280px;        // Desktop
```

## Usage in SCSS

```scss
// Mobile-first approach (recommended)
.element {
  // Base styles (mobile)
  font-size: 16px;
  
  // Tablet and up
  @media (min-width: $breakpoint-tablet) {
    font-size: 18px;
  }
  
  // Desktop and up
  @media (min-width: $breakpoint-desktop) {
    font-size: 20px;
  }
}

// Desktop-first approach (current implementation)
.element {
  // Base styles (desktop)
  font-size: 20px;
  
  // Tablet and down
  @media (max-width: $breakpoint-tablet) {
    font-size: 18px;
  }
  
  // Mobile and down
  @media (max-width: $breakpoint-mobile) {
    font-size: 16px;
  }
}
```

## Typography Scale

| Element | Desktop | Tablet | Mobile | Small Mobile |
|---------|---------|--------|--------|--------------|
| H1/H2 (Hero) | 50px | 40px | 28px | 24px |
| H2 (Sections) | 50px | 36px | 28px | 24px |
| H3 (Cards) | 32px | 28px | 20px | 18px |
| Body Text | 22px | 20px | 18px | 16px |
| Small Text | 18px | 16px | 14px | 13px |
| Buttons | 22px | 20px | 18px | 18px |

## Layout Patterns

### Grid Systems
```
How It Works Section:
Desktop: 4 columns
Tablet:  2 columns
Mobile:  1 column

Benefits Section:
Desktop: 2 columns (side by side)
Tablet:  1 column (stacked)
Mobile:  1 column (stacked)

Footer:
Desktop: 4 columns
Tablet:  2 columns
Mobile:  1 column
```

### Container Padding
```
Desktop:     20px (default)
Tablet:      20px
Mobile:      16px
Small Mobile: 12px
```

## Common Patterns

### Hide Elements on Mobile
```scss
.decorative-element {
  @media (max-width: $breakpoint-tablet) {
    display: none;
  }
}
```

### Full Width on Mobile
```scss
.button {
  @media (max-width: $breakpoint-mobile) {
    width: 100%;
    max-width: 100%;
  }
}
```

### Stack Flex Items
```scss
.flex-container {
  display: flex;
  
  @media (max-width: $breakpoint-tablet) {
    flex-direction: column;
  }
}
```

### Responsive Images
```scss
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

## Touch Targets

Minimum sizes for touch-friendly elements:
- **Buttons**: 44x44px (iOS standard)
- **Links**: 44x44px (tap area)
- **Icons**: 32x32px minimum

## Testing Quick Commands

```bash
# Build project
npm run build

# Start dev server
npm run dev

# Clean build cache
npm run clean
```

## Browser DevTools Shortcuts

- **Toggle Device Toolbar**: `Ctrl + Shift + M` (Windows) / `Cmd + Shift + M` (Mac)
- **Responsive Mode**: `Ctrl + Shift + M`
- **Reload**: `Ctrl + R` or `F5`
- **Hard Reload**: `Ctrl + Shift + R` or `Ctrl + F5`

## Common Device Sizes (Portugal)

| Device | Width | Height | Breakpoint |
|--------|-------|--------|------------|
| iPhone SE | 375px | 667px | Mobile |
| iPhone 12/13 | 390px | 844px | Mobile |
| iPhone 11 Pro Max | 414px | 896px | Mobile |
| Samsung Galaxy A | 360px | 740px | Small Mobile |
| iPad | 768px | 1024px | Tablet |
| iPad Pro | 820px | 1180px | Tablet |
| Desktop | 1366px+ | - | Desktop |

## Performance Tips

1. **Use CSS transforms instead of position changes** for animations
2. **Minimize media query complexity** - group related rules
3. **Lazy load images** below the fold
4. **Use WebP format** where supported (save ~30% file size)
5. **Test on real devices** - emulators don't show real performance

## Accessibility Checklist

- ✅ Minimum touch target: 44x44px
- ✅ Text remains readable: minimum 14px on mobile
- ✅ Sufficient contrast ratios maintained
- ✅ No horizontal scrolling required
- ✅ Content hierarchy preserved across breakpoints
- ✅ Images have proper alt attributes (check HTML)

## Common Issues & Solutions

### Issue: Horizontal scroll
```scss
body {
  overflow-x: hidden;
  width: 100%;
}
```

### Issue: Fixed elements breaking layout
```scss
// Avoid fixed positioning on mobile
@media (max-width: $breakpoint-tablet) {
  .fixed-element {
    position: relative;
  }
}
```

### Issue: Text too small on mobile
```scss
// Ensure minimum readability
@media (max-width: $breakpoint-mobile) {
  body {
    font-size: 16px; // Prevents iOS zoom
  }
}
```

## Files to Check

When debugging responsive issues:
1. `src/scss/base/_variables.scss` - Breakpoint definitions
2. `src/scss/base/_responsive.scss` - Main responsive rules
3. `src/scss/base/_reset.scss` - Base mobile optimizations
4. `src/scss/components/_container.scss` - Container padding
5. `src/scss/components/_buttons.scss` - Button responsive behavior

## Quick Visual Test

Open `test-responsive.html` in browser to:
- Test different device sizes
- Simulate iframe embedding
- Use keyboard shortcuts (Alt + 1-5)
- See active breakpoints in real-time

---

**Last Updated**: February 20, 2026  
**Project**: HP Instant Ink Landing Page  
**Market**: Portugal
