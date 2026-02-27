# Responsive Design Implementation Guide

## Overview
This landing page has been optimized for mobile and tablet devices, with special consideration for the Portuguese market and embedding in partner websites like Worten.

## Breakpoints Configuration

The following breakpoints have been implemented based on the most common device resolutions in Portugal:

### Small Mobile: **≤ 360px**
- Target: Smaller smartphones (Samsung Galaxy A-series, older iPhones)
- Common resolutions: 360x640, 360x740

### Mobile: **≤ 480px**
- Target: Standard smartphones
- Common resolutions: 375x667 (iPhone SE), 390x844 (iPhone 12/13), 414x896 (iPhone 11 Pro Max)

### Tablet: **≤ 768px**
- Target: Tablets and large phones
- Common resolutions: 768x1024 (iPad), 810x1080 (iPad Air)

### Large Tablet: **≤ 1024px**
- Target: Large tablets and small laptops
- Common resolutions: 820x1180 (iPad Pro), 1024x768 (iPad landscape)

### Desktop: **> 1024px**
- Target: Desktop and laptop computers
- Max container width: 1200px

## Key Features Implemented

### 1. **Flexible Layout System**
- All sections automatically stack vertically on mobile devices
- Grid layouts adapt: 4 columns → 2 columns → 1 column
- Flexible images that scale proportionally
- Proper spacing adjusted for each breakpoint

### 2. **Typography Scaling**
```
Desktop → Tablet → Mobile → Small Mobile
50px    → 40px   → 28px   → 24px  (Headings)
22px    → 20px   → 18px   → 16px  (Body text)
```

### 3. **Touch-Optimized Interactions**
- All buttons have minimum 44x44px touch targets (iOS guidelines)
- Enhanced tap highlighting with visual feedback
- Active states with scale animation for touch devices
- Buttons expand to full width on mobile (<768px)

### 4. **Embedded/iFrame Ready**
- Prevents horizontal scrolling in any container
- Responsive viewport meta tag configured
- No fixed positioning that breaks in iframes
- Images are fully responsive and won't overflow

### 5. **Mobile-Specific Optimizations**
- Smooth scrolling for better UX
- Font size prevents iOS zoom on input focus (16px minimum)
- Text rendering optimization for better legibility
- Decorative elements (diagonal stripes, blue frames) hidden on mobile to reduce clutter

## Components Responsive Behavior

### Hero Section
- **Desktop**: Horizontal layout with logo, image, and badge
- **Tablet**: Vertical stack with centered content
- **Mobile**: Compact vertical layout, smaller logos and text

### Plans Section
- **Desktop**: Horizontal cards with decorative frames
- **Tablet**: Vertical stack, decorative frames reduced
- **Mobile**: Single column, full-width cards, frames hidden

### How It Works
- **Desktop**: 4-column grid
- **Tablet**: 2-column grid
- **Mobile**: Single column with centered content

### Benefits Section
- **Desktop**: Side-by-side image and text (alternating)
- **Tablet/Mobile**: Vertical stack with centered content

### FAQ Section
- **All devices**: Accordion-style layout that scales typography
- Decorative blue frames hidden on tablet/mobile

## Testing Recommendations

### Browser DevTools Testing
1. Open Chrome/Edge DevTools (F12)
2. Enable Device Toolbar (Ctrl+Shift+M)
3. Test these specific resolutions:

**Portuguese Market Priority:**
- 360 x 740 (Samsung Galaxy A-series) ⭐
- 375 x 667 (iPhone SE) ⭐
- 390 x 844 (iPhone 12/13) ⭐
- 414 x 896 (iPhone 11 Pro Max)
- 768 x 1024 (iPad) ⭐
- 820 x 1180 (iPad Pro)

### Real Device Testing
Test on actual devices available in Portugal:
- **iOS**: iPhone 12/13/14/15 (most common)
- **Android**: Samsung Galaxy A-series, Xiaomi Redmi
- **Tablet**: iPad (various generations)

### Partner Website Testing
Since this will be embedded, test in:
1. **iFrame simulation**: Embed your page in a test HTML file
```html
<iframe src="your-page.html" width="100%" height="800" style="border:none;"></iframe>
```
2. **Worten's environment**: Request a staging/test integration
3. **Different container widths**: Test with containers at 320px, 768px, 1024px

## Performance Optimizations

### Implemented
✅ CSS-only responsive design (no JavaScript required)
✅ Mobile-first media queries (progressive enhancement)
✅ Optimized image loading with max-width
✅ Touch-action optimization for better scroll performance
✅ Reduced decorative elements on mobile

### Recommended
- [ ] Implement lazy loading for images below the fold
- [ ] Consider WebP format for images (save ~30% file size)
- [ ] Test loading speed on 3G networks (common in Portugal)

## Accessibility Features

- Minimum touch targets (44x44px)
- Proper heading hierarchy maintained across breakpoints
- Text remains readable (min 14px on mobile)
- No content is hidden from screen readers
- Sufficient color contrast maintained

## Browser Support

- ✅ Chrome/Edge (Chromium) - 95% Portuguese market
- ✅ Safari (iOS) - Most iPhone users
- ✅ Firefox - Secondary browser
- ✅ Samsung Internet - Popular on Android devices

## Files Modified

1. **src/scss/base/_variables.scss** - Added granular breakpoints
2. **src/scss/base/_responsive.scss** - Complete responsive system
3. **src/scss/base/_reset.scss** - Mobile optimizations
4. **src/scss/components/_buttons.scss** - Touch-friendly buttons
5. **src/scss/components/_container.scss** - Responsive padding

## Quick Test Checklist

Use this checklist when testing:

- [ ] Hero section displays correctly on all breakpoints
- [ ] All text is readable without zooming
- [ ] Buttons are easily tappable (not too small)
- [ ] No horizontal scrolling at any width
- [ ] Images scale properly without distortion
- [ ] Plan cards stack vertically on mobile
- [ ] Footer links are accessible on mobile
- [ ] Page loads quickly on mobile networks
- [ ] Works when embedded in iFrame
- [ ] Tested on actual iOS and Android devices

## Troubleshooting

### Issue: Horizontal scroll appears
**Solution**: Check for fixed width elements. Use `overflow-x: hidden` on parent containers.

### Issue: Text too small on mobile
**Solution**: Verify breakpoints are applied. Check browser zoom level is at 100%.

### Issue: Buttons too small to tap
**Solution**: Minimum 44x44px is implemented. Check if CSS is overriding.

### Issue: Page doesn't scale in iFrame
**Solution**: Ensure viewport meta tag is present in HTML head.

## Next Steps

1. **Test thoroughly** using the checklist above
2. **Gather feedback** from real users on mobile devices
3. **Monitor analytics** to see actual device usage
4. **Iterate** based on user behavior data

## Support

For questions or issues:
- Check browser console for errors
- Verify all changes were compiled: `npm run build`
- Test in incognito mode to avoid cache issues
- Use browser DevTools Performance tab for lag issues

---

**Last Updated**: February 20, 2026
**Version**: 1.0
**Optimized for**: Portuguese Market (Portugal)
