# Mumma First — Website

Premium motherhood brand website. Built with HTML, CSS, and minimal JavaScript. Zero dependencies. Deploys instantly.

## File Structure

```
mumma-first/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── hero.jpg              (Mother + baby, warm outdoor, lifestyle)
    ├── product1.jpg          (Product shot — wearable pump)
    ├── safety.jpg            (Close-up product detail)
    ├── comfort.jpg           (Mother holding baby, serene)
    ├── results.jpg           (Confident mother portrait)
    └── product-exploded.jpg  (Exploded/flat-lay product view)
```

## Image Guidelines

Add your images to an `images/` folder. Recommended specs:

| File                 | Ratio   | Min Width | Style                        |
|----------------------|---------|-----------|------------------------------|
| hero.jpg             | 3:4     | 1200px    | Warm outdoor, lifestyle       |
| product1.jpg         | 4:5     | 900px     | Clean white/nude background   |
| safety.jpg           | 4:5     | 900px     | Detail close-up               |
| comfort.jpg          | 4:5     | 900px     | Warm, emotional               |
| results.jpg          | 4:3     | 800px     | Portrait, confident           |
| product-exploded.jpg | 1:1     | 1000px    | Flat lay / exploded view      |

All images should match the brand palette: warm, soft, muted tones.

## Deploy to Vercel

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import the repository
4. Framework preset: **Other** (static site)
5. Deploy ✓

## Customise

- **Colors** — all defined as CSS variables at the top of `style.css` inside `:root {}`
- **Fonts** — loaded from Google Fonts in the `<head>` of `index.html`
- **Content** — edit text directly inside `index.html`
- **CTA links** — replace `href="#"` on buttons with your shop/checkout URL
