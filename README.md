# Chrome extensions by tuantv — public pages

Static site for **GitHub Pages**: privacy policies and support contact for the Chrome Web Store listings.

| Page | Path |
| :-- | :-- |
| Home | `index.html` |
| Zero-Tab Switching — privacy policy | `zero-tab/privacy-policy.html` |
| WebSurgeon — privacy policy | `websurgeon/privacy-policy.html` |

## Publish

1. Create a **public** repository on GitHub (for example `extensions`) and push this folder to its `main` branch.
2. Repository **Settings › Pages › Source: Deploy from a branch › `main` / `(root)` › Save**.
3. After 1–2 minutes the site is live at `https://<github-user>.github.io/<repo>/`.

Privacy policy URLs for the Chrome Web Store Developer Dashboard:

```
https://<github-user>.github.io/<repo>/zero-tab/privacy-policy.html
https://<github-user>.github.io/<repo>/websurgeon/privacy-policy.html
```

## Update a policy

The pages are generated from each extension's `PRIVACY.md` (`npm run privacy` → `store/privacy-policy.html`).
Copy the new file over the one here, commit and push — the URL stays the same.

`.nojekyll` tells GitHub Pages to serve the files as they are.
