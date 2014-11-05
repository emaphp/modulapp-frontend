var Storage = require('../storage.js');
var UI = require('../ui.js');
var Models = require('./models.js');

var CollectionsStorage = Storage.extend({
    collection: Models.ContactsCollection,
    
    success: function() {
        console.log("ContactsCollection fetched correctly");
    },
    
    error: function() {
        console.log("Failed to fetch ContactsCollection");
        UI.showError("Error: Couldn't fetch contacts");
    }
});

module.exports = new CollectionsStorage();