/* RECAPITALIZE CREATORS OF SELECTED ZOTERO ITEMS
 * Runs from developer console in Zotero 5 Standalone
 *
 * Some depositories annoyingly provide all-caps metadata to the Zotero 
 * Connector, which Zotero doesn't catch. 
 *
 */


// Get items currently selected in Zotero window
var zp = Zotero.getActiveZoteroPane();
var items = zp.getSelectedItems();

// Handle multiple selections
for (var i = 0; i<items.length; i++) {
  // Not sure if JSON is necessary here, but simplifies creatorType?
  var creators = items[i].getCreatorsJSON();
  var newCreators = creators;

  // Handle multiple creators
  for (var j = 0; j<creators.length; j++) {
    newCreators[j]['firstName'] = Zotero.Utilities.capitalizeName(creators[j]['firstName']);
    newCreators[j]['lastName'] = Zotero.Utilities.capitalizeName(creators[j]['lastName']);

    // removeCreator reindexes creators each time it runs, so this loops 
    // removal of the top creator
    items[i].removeCreator(0);
  }

  // Feed all creators into item & save
  items[i].setCreators(newCreators);
  await items[i].saveTx();
}
