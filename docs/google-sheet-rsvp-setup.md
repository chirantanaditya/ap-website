# Send RSVP form submissions to a Google Sheet

Form submissions can be appended to a Google Sheet using a **Google Apps Script** web app. No API keys are required.

## 1. Create the sheet and header row

1. Create a new [Google Sheet](https://sheets.google.com).
2. In the first row, add these column headers (one per cell):

   | A         | B    | C                      | D    | E     | F      | G            | H            | I             | J       | K          |
   |-----------|------|------------------------|------|-------|--------|--------------|--------------|---------------|---------|------------|
   | Timestamp | Team | Joining celebrations?  | Name | Phone | Guests | Arrival Date | Arrival Time | Accommodation | Message | Attending  |

   - Column **C** — **Yes** / **No** (“Will you be joining the celebrations?”), same as payload `joiningCelebrations`.
   - Column **K** — **Yes** / **No** for **attending** (boolean from the app: `true` → Yes, `false` → No).

   > If column **C** stays empty, your Google Apps Script is still an old version. Replace `doPost` below and **Deploy → Manage deployments → Edit → New version → Deploy** so the web app picks up the change.

## 2. Add the Apps Script

1. In the sheet: **Extensions** → **Apps Script**.
2. Delete any sample code and paste the script below.
3. Click **Save** (disk icon), name the project e.g. `RSVP to Sheet`.

```javascript
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Prefer a named tab so you always write to the right sheet (optional: rename "Sheet1" to "RSVPs")
    var sheet = ss.getSheetByName('RSVPs') || ss.getActiveSheet();

    var raw = '';
    if (e.postData) {
      raw = e.postData.contents || (e.postData.getDataAsString && e.postData.getDataAsString()) || '';
    }
    var body = {};
    if (raw) {
      body = JSON.parse(raw);
    }

    var joining =
      body.joiningCelebrations ||
      (body.joining === 'yes' ? 'Yes' : body.joining === 'no' ? 'No' : '') ||
      (body.attending === true ? 'Yes' : body.attending === false ? 'No' : '');

    var attendingYesNo =
      body.attending === true ? 'Yes' : body.attending === false ? 'No' : '';

    var row = [
      body.timestamp || new Date().toISOString(),
      body.team || '',
      joining,
      body.name || '',
      body.phone || '',
      body.guests != null ? body.guests : '',
      body.arrivalDate || '',
      body.arrivalTime || '',
      body.accommodation ? 'Yes' : 'No',
      body.message || '',
      attendingYesNo
    ];
    sheet.appendRow(row);
    SpreadsheetApp.flush();
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err && err.message ? err.message : err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### If rows or “Joining” still don’t appear

1. **Use the exact Web app URL** from **Deploy → Manage deployments** (ends with `/exec`). Paste it into `GOOGLE_SHEET_WEB_APP_URL` (Vercel / `.env.local`) and redeploy the site.
2. **Deploy a new version** of the script after pasting `doPost` (Manage deployments → Edit → **New version** → Deploy). Old URLs keep running old code until you version.
3. **Who has access** must be **Anyone** (or the server cannot POST without a Google login).
4. Check **Executions** (clock icon) in the Apps Script editor after a test RSVP — if nothing runs, the request never reached the script (URL/env). If it runs but errors, the log shows why.
5. **Local test** (replace `YOUR_URL`):

   ```bash
   curl -sS -D - -X POST "YOUR_URL" -H "Content-Type: application/json" -d "{\"joiningCelebrations\":\"Yes\",\"joining\":\"yes\",\"attending\":true,\"team\":\"bride\",\"name\":\"Test\",\"phone\":\"\",\"guests\":1,\"arrivalDate\":\"\",\"arrivalTime\":\"\",\"accommodation\":false,\"message\":\"\"}"
   ```

   You should get HTTP 200 and `{"success":true}` and a new row in the sheet (including **K** = Yes for that test).

4. **Deploy** the web app:
   - Click **Deploy** → **New deployment**.
   - Click the gear icon next to “Select type”, choose **Web app**.
   - **Description:** e.g. `RSVP form`.
   - **Execute as:** Me (your account).
   - **Who has access:** **Anyone** (so your site can POST without login).
   - Click **Deploy**, then **Authorize access** and complete the prompts.
   - Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

Add the header **Attending** in cell **K1** (and redeploy the script after changing `doPost`).

## 3. Configure your app

Add the Web app URL to your environment:

**Local (`.env.local`):**

```env
GOOGLE_SHEET_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Vercel (or other host):**  
Add the same variable in your project’s Environment Variables and redeploy.

After this, every RSVP form submission will be appended as a new row in your sheet. If the URL is not set, submissions still use the existing file-based storage (where supported).
