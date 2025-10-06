# Testing Guide - Windhoek Virtual Tour

## Quick Start
```bash
npm run dev
```
Open http://localhost:3000 in your browser

---

## Test Checklist

### ✅ Dark Mode Toggle
**Steps to Test:**
1. Open the homepage
2. Look at the header - you should see a moon icon (in light mode) or sun icon (in dark mode)
3. Click the toggle button
4. **Expected Result**: 
   - Theme should switch immediately with smooth 0.3s transition
   - Icon should switch (moon ↔ sun)
   - Background and text colors should change
   - Theme should persist when you refresh the page

**How to Verify It's Working:**
- Background changes from light wheat to dark slate
- Text color inverts appropriately
- Toggle icon reflects current theme
- Refresh page - theme should remain the same
- Check browser localStorage in DevTools - should see `theme: "dark"` or `theme: "light"`

---

### ✅ 3D Model Size
**Steps to Test:**
1. Navigate to any landmark page (e.g., `/landmarks/christuskirche`)
2. Scroll down to the "Interactive 3D Exterior" section
3. **Expected Result**:
   - 3D viewer should be LARGE and prominent
   - On desktop: Should take up approximately 85% of viewport height
   - On mobile: Should be at least 500px tall
   - Model should be clearly visible and detailed

**Viewport Heights by Device:**
- Mobile: 70vh minimum
- Tablet: 75vh
- Desktop: 85vh
- Max height: 1100px

**Interactive Features to Test:**
- Drag to rotate the model
- Scroll/pinch to zoom
- Click "front", "side", "top" buttons to change camera angle
- Auto-rotation should be smooth

---

### ✅ No Console Errors
**Steps to Test:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Navigate through the site
4. **Expected Result**: No errors or warnings

**Previously Fixed:**
- ❌ Hydration mismatch warning → ✅ FIXED
- ❌ Theme toggle errors → ✅ FIXED

---

### ✅ Responsive Design
**Steps to Test:**
1. Resize browser window from wide to narrow
2. Or use DevTools device emulation
3. Test these breakpoints:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1280px

**Expected Results:**
- Navigation collapses appropriately
- 3D viewer scales correctly
- Content remains readable
- No horizontal scrolling
- Touch controls work on mobile

---

### ✅ 360° Tours
**Steps to Test:**
1. Go to any landmark page
2. Scroll to "360° interior tour" section
3. **Expected Result**:
   - Panoee iframe loads
   - You can navigate the 360° view
   - Fullscreen button works
   - On mobile: Device motion controls work (for museum)

---

### ✅ Production Build
**Steps to Test:**
```bash
npm run build
```

**Expected Output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (8/8)
```

**Should NOT see:**
- Any compilation errors
- TypeScript errors
- ESLint warnings
- Build failures

---

## Browser Compatibility Testing

### Recommended Browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

### Features to Test Per Browser:
1. Dark mode toggle
2. 3D model rendering
3. WebGL support
4. localStorage persistence
5. Touch gestures (mobile)

---

## Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Key Metrics to Check:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Cumulative Layout Shift (CLS)

---

## Common Issues & Solutions

### Issue: Theme Toggle Not Working
**Solution**: Clear browser cache and localStorage
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

### Issue: 3D Model Not Loading
**Check:**
1. Network tab - is the .glb file loading?
2. Console - any WebGL errors?
3. Browser supports WebGL?

### Issue: Dark Mode Flickers on Load
**Status**: Should be FIXED now
- Theme script runs before React hydration
- suppressHydrationWarning prevents React errors

---

## Deployment Testing

### After Deploying to Vercel/Netlify:
1. Test all landmarks load correctly
2. Verify 3D models load from CDN
3. Check theme toggle works on production
4. Test on multiple devices
5. Verify SEO metadata (View Page Source)
6. Test Open Graph tags (share on social media preview)

---

## Acceptance Criteria ✅

Your project is ready if:
- [x] Dark mode toggle works perfectly
- [x] 3D models are large and impressive
- [x] No console errors
- [x] Production build succeeds
- [x] All pages load quickly
- [x] Responsive on all devices
- [x] Theme persists across sessions
- [x] 360° tours embed correctly
- [x] Navigation is smooth
- [x] Professional appearance

---

## Report Issues

If you find any issues during testing:
1. Note the browser and device
2. Take screenshots
3. Check browser console for errors
4. Document steps to reproduce

---

**Last Updated**: January 2025  
**Status**: All Tests Passing ✅
