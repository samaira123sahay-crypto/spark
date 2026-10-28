# SparkTG redesign concept (unofficial)

A single-page redesign concept of sparktg.com by Samaira Sahay, a student.
Not made by, endorsed by or connected to SparkTG. Nothing on the page sends data anywhere.

The whole site is one file: `index.html` (inline CSS and JS, no build step).

## View it

Double-click `index.html`. It opens in any browser. (The font loads from Google Fonts when online; offline it falls back to the system sans-serif.)

## Put it online with GitHub Pages

1. Push this repo to GitHub.
2. Repo **Settings > Pages > Build and deployment > Source: GitHub Actions**.
3. Open the **Actions** tab, choose **Deploy to GitHub Pages**, press **Run workflow**.
4. The site appears at `https://<your-username>.github.io/<repo-name>/`. Every later push to the listed branches redeploys it.

If the run says the branch isn't allowed, add it under **Settings > Environments > github-pages > Deployment branches**.

## Editing

All copy is in `index.html`. Jargon definitions are the `data-def` attributes on the underlined terms.

## The menu (flow-chart drawer)

The Menu button opens a drawer that works like a flow chart: Products, Solutions and Resources branch into categories, then items, and each item opens a short page. Every page has its own link (for example `#/products/ivr`), so refresh, Back and shared links all work.

- The menu tree is the plain nested list in `<nav class="sitemap">` near the bottom of `index.html`. It is also the no-JavaScript fallback.
- Page text for each item is in the `DATA` object in the script at the end of the file.
- `SOURCES.md` lists every page, the sparktg.com path it came from, and which items are unverified.
- Not read for this concept (shown as a one-line description plus a link): Account Detail, AI Agents, SparkTG APIs, Zoho Integration, Webinars, the items beyond the confirmed ones in Conversational AI, WABA Solution and Interaction Insights, and the Case Studies index. If you can open sparktg.com, add them with the same level of detail.
