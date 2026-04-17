# Developer Guide - Tatva Landing Page

## Quick start

1. Install dependencies (optional for this static site):
   - npm install
2. Start local server (Python HTTP server on port 8000):
   - npm start
3. Open:
   - http://localhost:8000

## Project structure

| What | Where |
|------|-------|
| HTML | index.html |
| Styles | css/styles.css |
| Scripts | js/script.js |
| Images | images/ |

## Images

- `images/logo.png`: site/logo (used in header and social preview metadata)
- `images/Resort Images/`: resort photos (currently `1.jpg` … `15.jpg`)
- `images/Villa Images/`: villa images (currently `1.png` … `3.png`, plus named PNGs)

Note: folder names contain spaces. In HTML/CSS/JS URLs, prefer encoding spaces as `%20` (example: `./images/Resort%20Images/1.jpg`) to avoid edge-case path issues.

## Pages (modules)

- Home: `index.html`
- Properties: `properties.html`
- Club Resort: `club-resort.html`
- Amenities: `amenities.html`
- Gallery: `gallery.html`
- Contact: `contact.html`

## Adding a section

1. Add markup in index.html
2. Add styles in css/styles.css (reuse CSS variables)
3. Add behavior in js/script.js (follow existing init patterns)
4. Test in the browser (DevTools: F12)

## Design system

### Colors (CSS variables)
```css
--primary-gold: #D4AF37;
--dark-gold: #7A5212;
--luxury-black: #121212;
--pearl-white: #F8F5ED;
--emerald: #50C878;
--ruby: #E0115F;
--sapphire: #0F52BA;
```

### Fonts (CSS variables)
```css
--font-primary: 'Playfair Display';
--font-secondary: 'Montserrat';
--font-mono: 'SF Mono';
```

## Common snippets

### Button
```html
<button class="premium-cta">
  <span>BUTTON TEXT</span>
  <i class="fas fa-icon-name"></i>
</button>
```

### Image
```html
<img src="./images/Resort%20Images/1.jpg" alt="Description" class="your-class">
```

### CSS section header
```css
/* ===== YOUR SECTION NAME ===== */
.your-class {
  /* Properties */
}
```

## Debugging checklist

1. Open DevTools (F12)
2. Console: check JS errors/warnings
3. Network: check missing assets (404s)
4. Elements: verify expected class names and IDs

## Responsive breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

```css
@media (max-width: 768px) {
  /* Mobile styles */
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* Tablet styles */
}
```

## Animations

### AOS (Animate on Scroll)
```html
<div data-aos="fade-up" data-aos-delay="200">
  Content animates on scroll
</div>
```

## Before pushing changes

- Verify no console errors on load
- Check mobile layout (DevTools device toolbar)
- Click-test navigation, forms, modals, floating buttons
- Confirm all images load

```bash
git status
git add .
git commit -m "Describe the change"
git push origin main
```

## Quick PowerShell commands

```powershell
# Start server
npm start

# Show files
Get-ChildItem -Recurse

# Count lines
Get-Content css/styles.css | Measure-Object -Line
Get-Content js/script.js | Measure-Object -Line
```
