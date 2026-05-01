# Inquiry pipeline — Google Apps Script setup

How form submissions on the public site end up in your Gmail every 6 hours.

## Architecture

```
 Browser (varahi-landing on GitHub Pages)
        │  POST JSON
        ▼
 Apps Script Web App   ──►  Google Sheet  ◄── you can browse anytime
        │                        ▲
        │                        │  every 6h
        ▼                        │
   sendDigest() ────────────► CSV email to DIGEST_RECIPIENTS
```

You'll set this up once. Total time: ~10 minutes.

---

## Step 1 — Create the Sheet

1. Open <https://sheets.new>.
2. Rename the file to `Varahi Inquiries`.
3. Copy the **sheet ID** from the URL — it's the long random part:
   `https://docs.google.com/spreadsheets/d/<THIS_PART>/edit`
4. Hold onto it for the next step.

## Step 2 — Open the Apps Script editor

1. In the same Sheet, top menu → **Extensions → Apps Script**.
2. Delete the default `function myFunction()` boilerplate.
3. Open `Code.gs` from this folder, copy its contents, paste into the editor.
4. Top of the script, fill in:
   - `SHEET_ID = '<paste the ID from step 1>'`
   - `DIGEST_RECIPIENTS = ['sakethsaiy@gmail.com']` (add more emails if you like)
   - `TIMEZONE = 'Asia/Kolkata'` (or your zone)
5. Click the **floppy-disk save icon** (or Cmd-S).

## Step 3 — Initialize the Sheet headers (run once)

In the script editor:

1. From the function dropdown (next to the ▶ Run button) pick **`setupHeaders`**.
2. Click **Run**.
3. The first time, Google asks for permission to access your sheet — click
   **Review permissions** → pick your account → "Advanced" → "Go to (project)
   (unsafe)" → **Allow**. (It's "unsafe" only because it's your own unverified
   script, not Google-reviewed.)
4. Switch to your sheet — you should see a row of bold headers.

## Step 4 — Schedule the digest (run once)

Back in the script editor:

1. Function dropdown → pick **`installDigestTrigger`**.
2. Click **Run**.
3. Approve permissions if prompted.
4. Verify: left sidebar → **Triggers** (clock icon). You should see one row:
   `sendDigest · Time-driven · Every 6 hours`.

## Step 5 — Deploy as a Web App

1. Top right → **Deploy → New deployment**.
2. Click the ⚙ icon next to "Select type" → **Web app**.
3. Settings:
   - **Description:** `Varahi inquiry receiver`
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone**  ← this just means "any URL hit can POST",
     not "anyone can read your sheet". The sheet stays private to you.
4. **Deploy**.
5. Approve permissions.
6. Copy the **Web app URL** that ends in `/exec`.

## Step 6 — Wire the URL into the frontend

Edit `varahi-landing/src/environments/environment.ts`:

```ts
inquiryEndpoint: 'https://script.google.com/macros/s/<YOUR_DEPLOYMENT_ID>/exec',
```

Commit and push:

```bash
git add src/environments/environment.ts
git commit -m "Wire inquiry form to Apps Script endpoint"
git push
```

GitHub Actions redeploys; the form is live.

## Step 7 — Test the round-trip

1. Open the site, fill in the inquiry form, submit.
2. Check the Sheet — a new row should appear within seconds.
3. To send a digest immediately (instead of waiting 6 hours), in Apps Script
   pick `runDigestNow` from the function dropdown and click ▶ Run. You should
   get a CSV email within a minute.

## Updating the script later

If you change `Code.gs`:

1. Save in the editor.
2. **Deploy → Manage deployments → ✏ pencil → Version: New version → Deploy**.
3. The URL stays the same — no need to update the frontend.

## Common gotchas

- **No data hits the sheet** — Apps Script's `doPost` only fires if the request
  reaches the `/exec` URL with `Access: Anyone`. If you set Access to
  "Anyone with Google account" the browser POST fails silently.
- **Email isn't arriving** — check spam. Apps Script emails come from your own
  Gmail address; Gmail sometimes filters digests to spam during the first run.
- **Quota** — `MailApp.sendEmail` is capped at 100 recipients/day on free
  Google accounts. With 4 digests per day, that's 96 sends — way under the cap
  even with multiple recipients.
- **Empty digest** — if no new rows came in during the 6h window, the script
  logs "No new submissions" and skips sending. Not an error.

## Bonus — Switch to a daily digest later

Edit `DIGEST_INTERVAL_HOURS = 24` in `Code.gs`, save, then re-run
`installDigestTrigger`. It clears the old trigger and installs a new one.
