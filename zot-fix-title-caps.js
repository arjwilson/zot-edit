/* RECAPITALIZE TITLES OF SELECTED ZOTERO ITEMS
 * Runs from developer console in Zotero 5 Standalone
 *
 * Quick fix for instances where all-caps titles are not caught by Zotero.
 * Defaults to (very rough) sentence capitalization, which is best practice in Zotero,
 * but will have to recapitalize proper nouns.
 * 
 */

// Get items currently selected in Zotero window
var zp = Zotero.getActiveZoteroPane();
var items = zp.getSelectedItems();

// Handle multiple selections
for (var i = 0; i<items.length; i++) {
  var titleFieldID = Zotero.ItemFields.getID('title');
  var newTitle = Zotero.Utilities.capitalize(items[i].getField(titleFieldID, false, true).toLowerCase())

  items[i].setField(titleFieldID, newTitle);
  await items[i].saveTx();
}
