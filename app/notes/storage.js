/**
 * storage.js
 * ----------
 * Storage instance for Notes module
 */

var Storage = require('../storage');
var UI = require('../ui');
var Models = require('./models');

var NotesStorage = Storage.extend({
    collection: Models.NotesCollection,
    
    success: function() {
        console.log("NotesCollection fetched correctly");
    },
    
    error: function() {
        console.log("Failed to fetch NotesCollection");
        UI.showError("Error: Couldn't fetch notes");
    }
});

module.exports = new NotesStorage();