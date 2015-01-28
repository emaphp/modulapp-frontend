/**
 * storage.js
 * ----------
 * Storage for Contacts module
 */

var Storage = require('../storage');
var UI = require('../ui');
var Models = require('./models');

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