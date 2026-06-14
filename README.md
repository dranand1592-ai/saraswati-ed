# Saraswati ED — PWA Setup Guide

## What's in this folder

| File | Purpose |
|------|---------|
| `index.html` | Main app (the full discharge card) |
| `manifest.json` | Makes it installable as an app |
| `sw.js` | Service worker — enables offline use |
| `icons/` | App icons for all screen sizes |
| `.github/workflows/deploy.yml` | Auto-deploys to GitHub Pages on every push |

---

## Step-by-step: Go Live in 10 Minutes

### 1. Create a GitHub account (if you don't have one)
Go to https://github.com and sign up. Free account is enough.

### 2. Create a new repository
- Click the **+** button → **New repository**
- Name it: `saraswati-ed`
- Set to **Public** (required for free GitHub Pages)
- Do NOT add README or .gitignore (we'll upload our files)
- Click **Create repository**

### 3. Upload the files
On the new empty repository page:
- Click **uploading an existing file**
- Drag and drop ALL files and folders from this folder:
  - `index.html`
  - `manifest.json`
  - `sw.js`
  - `icons/` folder (with all 8 PNG files inside)
  - `.github/` folder (with `workflows/deploy.yml` inside)
- Scroll down → click **Commit changes**

### 4. Enable GitHub Pages
- Go to repository **Settings** → **Pages** (left sidebar)
- Under **Source** → select **GitHub Actions**
- Click **Save**

### 5. Wait ~2 minutes
GitHub will automatically build and deploy the app.
You'll see a green checkmark under **Actions** tab when done.

### 6. Your app URL
It will be:
```
https://YOUR-GITHUB-USERNAME.github.io/saraswati-ed/
```

Share this URL with all ED staff. They can open it in Chrome (Android) or Safari (iOS) and install it.

---

## Installing on Android
1. Open Chrome → go to the URL above
2. Tap the **Install** banner that appears at the bottom
3. OR tap ⋮ menu → **Add to Home screen**
4. App icon appears on home screen — tap to open like any app

## Installing on iPhone/iPad
1. Open Safari → go to the URL above
2. Tap the **Share** button (box with arrow)
3. Scroll down → tap **Add to Home Screen**
4. Tap **Add** — icon appears on home screen

---

## Updating the App
Whenever you upload a new `index.html` to GitHub:
1. GitHub auto-deploys within 2 minutes
2. Next time staff open the app, they see the update banner
3. Tap **Update** — app refreshes with new version
4. All saved feedback data is preserved

---

## Data Storage
- **Feedback records** are saved in IndexedDB (native browser database)
- Data is stored on the device — not sent anywhere
- Data persists even when app is closed or phone restarted
- Data is NOT shared between devices (each phone has its own records)
- Export CSV to collect data across devices

---

## Offline Use
After first load, the app works 100% offline:
- No internet needed in the ED
- All features work (entry, discharge card, print, feedback save)
- Only the initial load requires internet

---

## Troubleshooting

**"Install" button not showing on Android**
- Must be opened in Chrome (not Samsung Browser or Firefox)
- App must be served over HTTPS (GitHub Pages handles this automatically)

**App not updating after you upload new files**
- Tap the Update banner if it appears
- Or: open app → tap ⋮ → Reload

**Data disappeared**
- Clearing browser data/cache also clears IndexedDB
- Tell staff NOT to use "Clear all data" for Chrome in phone settings
- Export CSV regularly as backup
