/**
 * Per-build configuration.
 *
 * `inquiryEndpoint` — Google Apps Script Web App URL that receives form
 * submissions. Paste the deployment URL here after running through
 * scripts/google-apps-script/SETUP.md.
 *
 * Empty string keeps the form in "log-only" mode (helpful while developing
 * locally without spamming the live sheet).
 */
export const environment = {
  production: true,

  inquiryEndpoint:
    'https://script.google.com/macros/s/AKfycbzGeDK2mXA4weD99hZCxFV_1hHFU2GjKeF70QTYrQG46mgg5qV35UYBb5LxRA9Ahe0Z/exec',
};
