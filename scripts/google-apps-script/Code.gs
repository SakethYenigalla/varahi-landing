/**
 * Varahi inquiry pipeline — Google Apps Script
 * --------------------------------------------
 *  1. The deployed Web App URL accepts POST requests from the public site.
 *  2. Each submission is appended as a row to the configured Sheet.
 *  3. A time-driven trigger runs `sendDigest` every 6 hours, builds a CSV of
 *     new (un-sent) submissions, emails it as an attachment, and stamps the
 *     rows so they aren't re-sent.
 *
 * SETUP — see SETUP.md alongside this file. Quick recap:
 *   • Paste the SHEET_ID + DIGEST_RECIPIENTS below.
 *   • Run `setupHeaders` once (it writes column headers).
 *   • Run `installDigestTrigger` once (it schedules sendDigest every 6h).
 *   • Deploy as Web App: Execute as = Me, Access = Anyone. Copy URL into
 *     varahi-landing/src/environments/environment.ts.
 */

// =============== CONFIG ===============
const SHEET_ID = '1rcSRBDJBWmvNFHvb8mixW09Tj5Fp4TPeiV7nKbZRFMI';
const TAB_NAME = 'Inquiries';
const DIGEST_RECIPIENTS = ['sakethsaiy@gmail.com'];   // add more emails if you like
const DIGEST_INTERVAL_HOURS = 6;
const TIMEZONE = 'Asia/Kolkata';
// =======================================

const HEADERS = [
  'Submitted At',
  'Service',
  'Name',
  'Phone',
  'Event Date',
  'Guests',
  'Message',
  'Page URL',
  'User Agent',
  'Sent in Digest?'
];

// ===================== ENTRY POINTS =====================

/** Invoked on every form POST from the website. */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = openSheet_();
    sheet.appendRow([
      new Date(),
      data.service   || '',
      data.name      || '',
      data.phone     || '',
      data.eventDate || '',
      data.guests    || '',
      data.message   || '',
      data.pageUrl   || '',
      data.userAgent || '',
      ''                    // marked when included in a digest
    ]);
    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

/** Optional: lets you visit the URL in a browser to confirm it's live. */
function doGet() {
  return ContentService
    .createTextOutput('Varahi inquiry endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ===================== DIGEST =====================

/** Run every 6h via time-driven trigger. */
function sendDigest() {
  const sheet = openSheet_();
  const data  = sheet.getDataRange().getValues();
  if (data.length < 2) return;   // headers only

  const sentColIdx = HEADERS.length - 1;   // 0-based: last column

  // Collect rows that haven't been emailed yet.
  const newRows = [];
  const newRowSheetIndices = [];   // 1-based, for sheet writes
  for (let i = 1; i < data.length; i++) {
    if (!data[i][sentColIdx]) {
      newRows.push(data[i].slice(0, sentColIdx));
      newRowSheetIndices.push(i + 1);
    }
  }
  if (newRows.length === 0) {
    Logger.log('No new submissions; skipping digest.');
    return;
  }

  // Build CSV.
  const csvRows = [HEADERS.slice(0, sentColIdx).map(csvEscape_).join(',')];
  newRows.forEach(r => csvRows.push(r.map(csvEscape_).join(',')));
  const csv = csvRows.join('\n');

  const stamp    = formatStamp_(new Date());
  const filename = `varahi-inquiries-${stamp}.csv`;
  const blob     = Utilities.newBlob(csv, 'text/csv', filename);

  // Compose email.
  const subject = `Varahi inquiries — ${newRows.length} new submission${newRows.length === 1 ? '' : 's'}`;
  const previewLines = newRows.slice(-5).map(r => {
    const [submittedAt, service, name, phone] = r;
    return `· ${name || '(no name)'} · ${service} · ${phone}`;
  }).join('\n');

  const body =
    `Hi,\n\n` +
    `${newRows.length} new inquiry${newRows.length === 1 ? '' : ' submissions'} since the last digest.\n\n` +
    `Latest:\n${previewLines}\n\n` +
    `Full CSV attached.\n\n` +
    `— Varahi auto-digest`;

  MailApp.sendEmail({
    to: DIGEST_RECIPIENTS.join(','),
    subject: subject,
    body: body,
    attachments: [blob]
  });

  // Stamp these rows so the next digest skips them.
  const now = new Date();
  newRowSheetIndices.forEach(rowNum => {
    sheet.getRange(rowNum, sentColIdx + 1).setValue(now);
  });

  Logger.log(`Sent digest with ${newRows.length} rows.`);
}

// ===================== ONE-TIME SETUP =====================

/** Run once after pasting this script. Writes column headers. */
function setupHeaders() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(TAB_NAME);
  if (!sheet) sheet = ss.insertSheet(TAB_NAME);

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  sheet.autoResizeColumns(1, HEADERS.length);

  Logger.log('Headers written to ' + TAB_NAME);
}

/** Run once. Schedules sendDigest to run every DIGEST_INTERVAL_HOURS. */
function installDigestTrigger() {
  // Clear any existing triggers for sendDigest.
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'sendDigest')
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('sendDigest')
    .timeBased()
    .everyHours(DIGEST_INTERVAL_HOURS)
    .create();

  Logger.log(`Digest trigger installed: every ${DIGEST_INTERVAL_HOURS}h`);
}

/** Optional helper — runs the digest right now to verify your setup. */
function runDigestNow() {
  sendDigest();
}

// ===================== HELPERS =====================

function openSheet_() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB_NAME);
  if (!sheet) throw new Error(`Sheet tab "${TAB_NAME}" not found. Run setupHeaders() first.`);
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function csvEscape_(v) {
  if (v instanceof Date) {
    return Utilities.formatDate(v, TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
  }
  const s = (v == null) ? '' : String(v);
  if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function formatStamp_(d) {
  return Utilities.formatDate(d, TIMEZONE, 'yyyy-MM-dd-HHmm');
}
