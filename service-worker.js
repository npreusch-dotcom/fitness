# Momentum Coach 2.0.1 — Repair Build

This deployment-safe build places the complete interface and application logic inside `index.html`.
That prevents a missing, stale, or separately cached `app.js`/`styles.css` file from producing a blank Home Screen app.

## Upload

1. Extract the ZIP.
2. Upload all extracted files and the `icons` folder to the root of the existing GitHub repository.
3. Commit the changes and wait for GitHub Pages to redeploy.
4. Open the Pages URL in Safari and refresh once.
5. Fully close the Home Screen copy of Momentum and reopen it.

Existing workout and nutrition records are preserved because the browser storage key is unchanged.
