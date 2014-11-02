var Storage = require('../storage.js');
var Models = require('./models.js');

var CollectionsStorage = Storage.extend({
    collection: Models.ContactsCollection,
    
    success: function() {
        console.log("ContactsCollection fetched correctly");
    },
    
    error: function() {
        console.log("Failed to fetch ContactsCollection");
    }
});

module.exports = new CollectionsStorage();