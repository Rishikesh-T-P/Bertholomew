# Bartholomew Richard — Portfolio

A distinctive, editorial-style single-page portfolio site. Dark aesthetic, refined typography (Fraunces + Instrument Sans), molten-amber accents.

## Files

```
portfolio/
├── index.html      ← structure + content
├── style.css       ← all styling
├── script.js       ← interactions
└── README.md       ← this file
```

## Add your photo

Open `index.html` and find the block marked:

```html
<!--
  ╔══════════════════════════════════════════════════════╗
  ║  REPLACE THE DIV BELOW WITH YOUR PHOTO:              ║
  ╚══════════════════════════════════════════════════════╝
-->
```

Replace the `<div class="image-placeholder">...</div>` block with:

```html
<img src="profile.jpg" alt="Bartholomew Richard" />
```

Drop your photo as `profile.jpg` beside `index.html`. Recommended: **portrait orientation, ~800×1000px, JPG or WebP**.

## Add your CV PDF (optional)

Find the "Download CV" button in `index.html`:

```html
<a href="#contact" class="btn btn--primary" ...>
  <span>Download CV</span>
```

Change `href="#contact"` to `href="Bartholomew_Richard_CV.pdf"` and add the PDF file to the folder.

## Deploy to GitHub Pages

1. **Create a repository** on GitHub (e.g. `bartholomew-richard.github.io` for a root-level site, or any name for a project site).

2. **Push these files** to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. **Enable Pages**:
   - Go to repo → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / folder: **/ (root)**
   - Save.

4. Your site will be live at:
   - `https://YOUR-USERNAME.github.io/` (if repo is `YOUR-USERNAME.github.io`)
   - `https://YOUR-USERNAME.github.io/YOUR-REPO/` (otherwise)

Give it 1–2 minutes after pushing.

## Customisation

| Want to change... | Where |
|---|---|
| Colours / accent | `style.css` → `:root` variables at the top |
| Fonts | `index.html` `<head>` (Google Fonts link) + `style.css` `--font-*` vars |
| Content | `index.html` |
| Navigation items | `index.html` `<nav class="nav__links">` |
| Section order | Re-order `<section>` blocks in `index.html` |

### Change the accent colour

In `style.css`, swap:

```css
--accent: #E8753B;  /* molten orange — replace me */
```

Try `#C6E14A` (acid green), `#7FB8C4` (pale cyan), or `#D4AF37` (champagne gold) for different moods.

## Features included

- Scroll-progress indicator
- Custom cursor (desktop, auto-disabled on touch)
- Magnetic buttons
- Intersection-observer reveals
- Animated stat counters
- Active-section nav highlighting
- Responsive mobile menu
- Infinite topic marquee
- Grain / noise texture overlay
- Reduced-motion support
- Semantic HTML + accessible contrast

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge — latest 2 versions). `backdrop-filter` is used on the nav; falls back gracefully.

---

Built for Bartholomew Richard · Research Assistant, IIT Palakkad.
