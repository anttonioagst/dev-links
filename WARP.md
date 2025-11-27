# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

This repository is a small static website (HTML/CSS/JavaScript) that implements a personal "DevLinks"-style profile page with social links, portfolio link, and a light/dark theme toggle. There is no build system or dependency manager configured (no `package.json`, bundler, or test runner); the site runs directly in the browser from the source files.

Key entry points:
- `index.html` – single-page document structure and external script/style includes.
- `style.css` – layout, theming, and visual styling using CSS custom properties.
- `script.js` – light/dark theme toggle logic and avatar swapping.
- `assets/` – images and background assets used by the page.

## Architecture and structure

### HTML structure (`index.html`)

- `<html lang="pt-br" class="light">` – the root element starts in `light` mode; the `light` class is used by CSS and JavaScript to control theming.
- `#container` – main layout wrapper that constrains content width and centers the page.
- `#profile` – contains the avatar image and username handle (`@anttonioagst`). The avatar source is updated dynamically when the theme changes.
- `#switch` – clickable theme toggle. It wraps:
  - a `<button>` that visually represents the theme thumb and uses a CSS background image based on the current theme.
  - a `<span>` that renders the track behind the thumb.
- Main links (`<ul>` of `<li><a>`): contact, Rocketseat site, portfolio, and Explorer links.
- `#social-links` – icon-only links (GitHub, Instagram, YouTube, LinkedIn) rendered using Ionicons loaded from a CDN.
- `<footer>` – attribution with a small custom tag logo and link to the author’s external portfolio.

External dependencies loaded via CDN:
- Google Fonts (Inter) for typography.
- Ionicons scripts for social media icons.

### Theming and styling (`style.css`)

The visual design is driven by CSS custom properties and a `light` class toggle on the root element:

- Default (dark) theme variables are defined on `:root`, including:
  - `--text-color`
  - `--bg-url` (background image)
  - `--tag-color` (logo image)
  - `--stroke-color`, `--surface-color`, `--surface-color-hover`, `--highlight-color`
  - `--switch-bg-url` (icon inside the theme toggle button)
- The `.light` class overrides these variables to swap to light-theme assets and colors.
- `body` uses `var(--bg-url)` for the full-page background image, with `no-repeat top center/cover` to cover the viewport.
- All text inherits `var(--text-color)` via `body * { font-family: "Inter", sans-serif; color: var(--text-color); }`.
- `#switch` and its children use `--switch-bg-url` and `--surface-color`/`--stroke-color` to ensure the toggle matches the current theme.
- Links and social icons are laid out using flexbox with consistent spacing and glassmorphism-style blur/background via `backdrop-filter`.
- The custom `.tag-logo` element in the footer uses `--tag-color` as a background image to render the author’s logo.

The CSS assumes the `assets` directory contains dark and light variants of key images (backgrounds, logo/tag, avatars) under an `assets` subfolder (e.g. `assets/assets/bg-mobile-main-dark.jpg`).

### Theme toggle behavior (`script.js`)

The only JavaScript in the project is the `toggleMode` function, attached inline via `onclick` on the `#switch` element:

- Obtains a reference to the root `<html>` element: `document.documentElement`.
- Toggles the `light` class on the root: this immediately updates all theme-related custom properties in CSS.
- Selects the profile avatar image via `#profile img`.
- If the `light` class is present after toggling, it sets the avatar source to the light version (`avatar-light.png`); otherwise it restores the default (`Avatar.png`).

This design keeps theme state in the DOM via a single class on `<html>`, and delegates most of the theme differences to CSS variables, with JavaScript responsible only for the class toggle and avatar asset swap.

### Editor configuration (`.vscode`)

VS Code workspace settings and keybindings are provided:
- `settings.json` enables format-on-save and automatic file saving on focus change.
- `keybindings.json` maps `Ctrl+D` to `editor.action.copyLinesDownAction` when the editor has focus and is not read-only.

These are editor conveniences only; they do not affect the runtime behavior of the site.

## Development and run commands

This project has no configured build, lint, or test commands; it is intended to run directly in the browser. There is no `package.json`, so tools like `npm test` or `npm run build` will not work unless you add them yourself.

### Local preview

To preview the site locally:
- Open `index.html` directly in a browser, or
- Serve the repository root as static files using any HTTP server (Python, Node, or your editor’s built-in live server). The document entry point is `index.html` in the repository root.

### Testing and linting

No automated tests or linters are currently defined in this repository. If you introduce a test runner (e.g. Jest, Vitest) or linter (e.g. ESLint, Stylelint), also update this `WARP.md` with the relevant commands so future tools know how to run them.
