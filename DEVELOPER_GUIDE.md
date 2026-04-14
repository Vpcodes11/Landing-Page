# Developer Guide - Tatva Landing Page

## Quick Reference for Developers

### 🚀 Getting Started

1. **First time setup:**
   ```bash
   cd c:\Users\Trade\Landing-Page
   npm install  # Not needed - no dependencies
   npm start    # Starts Python HTTP server on port 8000
   ```

2. **Visit the site:**
   ```
   http://localhost:8000
   ```

### 📁 File Locations

| What | Where |
|------|-------|
| HTML | `index.html` |
| Styles | `css/styles.css` |
| Scripts | `js/script.js` |
| Images | `images/` |

### 🎨 Adding New Sections

1. **Add HTML** in `index.html`
2. **Add CSS** in `css/styles.css` (use existing color variables)
3. **Add JS** in `js/script.js` (follow existing pattern)
4. **Test** in browser and console (F12)

### 🎭 Design System

#### Colors (CSS Variables)
```css
--primary-gold: #D4AF37        /* Main brand color */
--dark-gold: #7A5212           /* Accent */
--luxury-black: #121212        /* Dark backgrounds */
--pearl-white: #F8F5ED         /* Light text */
--emerald: #50C878             /* Accent */
--ruby: #E0115F                /* Accent */
--sapphire: #0F52BA            /* Accent */
```

#### Fonts (CSS Variables)
```css
--font-primary: 'Playfair Display'   /* Headings */
--font-secondary: 'Montserrat'       /* Body text */
--font-mono: 'SF Mono'               /* Code */
```

### 🔧 Common Tasks

#### Adding a Button
```html
<button class="premium-cta">
    <span>BUTTON TEXT</span>
    <i class="fas fa-icon-name"></i>
</button>
```

#### Adding an Image
```html
<img src="./images/filename.jpg" alt="Description" class="your-class">
```

#### Adding CSS
1. Open `css/styles.css`
2. Add new section with clear comments:
```css
/* ===== YOUR SECTION NAME ===== */
.your-class {
    /* Properties */
}
```

#### Adding JavaScript
1. Open `js/script.js`
2. Add function in appropriate section
3. Call from `initializeApp()` function if needed

### 🐛 Debugging

1. **Open DevTools:** Press `F12`
2. **Check Console tab** for errors
3. **Check Network tab** if images don't load
4. **Check Elements tab** to inspect HTML structure

### 📱 Responsive Design

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Use CSS media queries:
```css
@media (max-width: 768px) {
    /* Mobile styles */
}

@media (min-width: 768px) and (max-width: 1024px) {
    /* Tablet styles */
}
```

### 🎬 Adding Animations

#### AOS (Animate on Scroll)
```html
<div data-aos="fade-up" data-aos-delay="200">
    Content animates on scroll
</div>
```

Available animations:
- `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `zoom-in`, `zoom-out`
- `flip-left`, `flip-right`

#### CSS Animations
```css
@keyframes slidein {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

.element {
    animation: slidein 0.5s ease-out;
}
```

### 🔗 External Resources

- **Fonts:** Google Fonts (already loaded)
- **Icons:** Font Awesome (v6.5.0)
- **Animations:** AOS Library (v2.3.1)
- **Ads:** Google AdSense

### 📊 Performance Tips

1. **Images:** Optimize before uploading (~<100KB each)
2. **CSS:** Keep styles organized and reuse classes
3. **JS:** Minimize DOM queries, use event delegation
4. **Animations:** Use GPU-accelerated properties (transform, opacity)

### ✅ Before Committing

```bash
# Check for console errors (F12)
# Check responsive design (F12 → Device Toggle)
# Test all interactive elements
# Test on mobile device
# Verify all images load
# Check git status
git status
git add .
git commit -m "Descriptive message"
git push origin main
```

### 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check path: `./images/filename.jpg` |
| Styles not applying | Check class name, refresh (Ctrl+F5) |
| JavaScript errors | Open console (F12), read error message |
| Server won't start | Make sure port 8000 is free |
| Form not submitting | Check form class and fields |

### 📞 Quick Commands

```bash
# Start server
npm start

# Check file structure
Get-ChildItem -Path "c:\Users\Trade\Landing-Page" -Recurse

# List CSS lines
Get-Content css/styles.css | Measure-Object -Line

# List JS lines
Get-Content js/script.js | Measure-Object -Line
```

### 🎯 Code Style Guidelines

1. **Naming:** Use kebab-case for CSS classes
   ```css
   .property-card /* ✓ Good */
   .propertyCard  /* ✗ Bad */
   ```

2. **Comments:** Add section headers
   ```css
   /* ===== PROPERTY CARDS ===== */
   ```

3. **Organization:** Group related rules together

4. **Indentation:** Use 4 spaces

### 📚 Documentation

- **README.md** - Project overview
- **IMPLEMENTATION_SUMMARY.md** - Detailed changes
- **COMPLETION_REPORT.txt** - Summary of all fixes
- **This file** - Developer reference

### 🔐 Security Notes

- All data submitted via forms should be validated server-side
- Use HTTPS in production
- Don't commit sensitive information
- Keep dependencies updated

### 🚀 Deployment Checklist

- [ ] Test locally (npm start)
- [ ] No console errors
- [ ] All images visible
- [ ] Mobile responsive
- [ ] Form validation works
- [ ] Navigation links work
- [ ] Animations smooth
- [ ] SEO meta tags present
- [ ] sitemap.xml updated
- [ ] Backup before deploying

---

**Questions?** Check the inline code comments or open DevTools to inspect elements.

Good luck! 🎉
