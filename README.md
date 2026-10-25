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
