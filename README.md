# Meeple Klub Website (Svelte 5 + Vite)

## Getting Started
    npm install
    npm run dev      # Start the development server
    npm run build    # Build the production site in the dist/ directory

## GitHub Pages
- The `main` branch is deployed automatically to GitHub Pages by `.github/workflows/deploy.yml`.
- In the repository settings, open **Pages** and select **GitHub Actions** as the build and deployment source.
- After the first successful workflow run, the site is available at `https://meepleklub.github.io/`.

## Editing Content
- Text, club events, gallery, and contact details: `src/lib/data.js`
- Custom images: copy them into `public/gallery/`, then update their paths in `data.js`.
- Logo: replace `public/logo.png`; it is used in the header, home page, and favicon.
- Colors and sizes: `src/app.css`
