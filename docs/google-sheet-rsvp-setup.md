# Send RSVP form submissions to a Google Sheet

Form submissions can be appended to a Google Sheet using a **Google Apps Script** web app. No API keys are required.

## 1. Create the sheet and header row

1. Create a new [Google Sheet](https://sheets.google.com).
2. In the first row, add these column headers (one per cell):

   | A        | B    | C         | D     | E      | F      | G            | H            | I              | J       |
   |----------|------|------------|-------|--------|--------|--------------|--------------|----------------|---------|
   | Timestamp | Team | Attending | Name  | Phone  | Guests | Arrival Date | Arrival Time | Accommodation  | Message |

## 2. Add the Apps Script

1. In the sheet: **Extensions** → **Apps Script**.
2. Delete any sample code and paste the script below.
3. Click **Save** (disk icon), name the project e.g. `RSVP to Sheet`.

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const body = e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const row = [
      body.timestamp || new Date().toISOString(),
      body.team || '',
      body.attending === true ? 'Yes' : 'No',
      body.name || '',
      body.phone || '',
      body.guests ?? '',
      body.arrivalDate || '',
      body.arrivalTime || '',
      body.accommodation ? 'Yes' : 'No',
      body.message || ''
    ];
    sheet.appendRow(row);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. **Deploy** the web app:
   - Click **Deploy** → **New deployment**.
   - Click the gear icon next to “Select type”, choose **Web app**.
   - **Description:** e.g. `RSVP form`.
   - **Execute as:** Me (your account).
   - **Who has access:** **Anyone** (so your site can POST without login).
   - Click **Deploy**, then **Authorize access** and complete the prompts.
   - Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

## 3. Configure your app

Add the Web app URL to your environment:

**Local (`.env.local`):**

```env
GOOGLE_SHEET_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Vercel (or other host):**  
Add the same variable in your project’s Environment Variables and redeploy.

After this, every RSVP form submission will be appended as a new row in your sheet. If the URL is not set, submissions still use the existing file-based storage (where supported).
