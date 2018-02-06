/**
 * Get's an array of objects that has the conditon value at the key.
 * @param data (object): full database, containing objects with arrays of objects
 * @param table (string): name of the object within the database, you wish to search in
 * @param key (string): key within the an element of a table
 * @param value (primitive type): condition value of the key
 * @return array of objects
 */
function getObjectListByKeyValue(data, table, key, value) {
    var tableArray = data[table];
    var resultArray = [];
    for (var element of tableArray){
        if (element[key] === value) {
            resultArray.push(element);
        }
    }
    return resultArray;
}

/**
 * Generates a new ID for the new item in the given table
 * @param data: database
 * @param table: tablename
 * @returns {number}
 */
function getNewId(data, table) {
    var cards = data[table];
    var card_ids = new Array();

    for (let card of cards) {
        card_ids.push(card.id);
    }

    var maximumID = Math.max(...card_ids);
    maximumID += 1;
    return maximumID;
}