/**
 * Google Apps Script for Unique Public School Admissions Enquiry Form
 * 
 * Instructions:
 * 1. Go to script.google.com and create a new script.
 * 2. Paste this code.
 * 3. Save it.
 * 4. Click "Deploy" -> "New deployment".
 * 5. Select type "Web app".
 * 6. Set "Execute as" to "Me".
 * 7. Set "Who has access" to "Anyone".
 * 8. Deploy and copy the "Web app URL".
 * 9. Paste the URL into `index.html` line `const url = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL";`
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowData = [];
  
  // Create headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Parent's Name", "Child's Name", "Phone", "Class Applied For", "Message"]);
  }
  
  // Append form data
  rowData.push(new Date());
  rowData.push(e.parameter.parentName || "");
  rowData.push(e.parameter.childName || "");
  rowData.push(e.parameter.phone || "");
  rowData.push(e.parameter.applyClass || "");
  rowData.push(e.parameter.message || "");
  
  sheet.appendRow(rowData);
  
  return ContentService.createTextOutput(JSON.stringify({"result": "success", "data": e.parameter}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Keep this to handle CORS preflight requests
function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return ContentService.createTextOutput("")
    .setHeaders(headers)
    .setMimeType(ContentService.MimeType.JSON);
}
