# PPTX → Web (React) — Presentation Zip

This is a small Vite + React project that renders a 5-slide German conversation presentation using the images and fonts you provided on GitHub (referenced via raw.githubusercontent.com).

## How to run
1. Unzip the folder.
2. In the project folder run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

## Notes
- Fonts and images are referenced directly from your GitHub raw links (not bundled). Make sure they remain public.
- Keyboard behavior:
  - Right Arrow: after animations finish, first press underlines girl's German line, second press underlines boy's German line; if both are already underlined, next Right moves to next slide.
  - Left Arrow: reverses underline steps; if none underlined, Left moves to previous slide.
  - 'Start Presentation' button toggles fullscreen presentation mode.
- If you want me to include downloaded copies of the fonts/images inside the ZIP (instead of referencing raw URLs), provide confirmation and I will bundle them.
