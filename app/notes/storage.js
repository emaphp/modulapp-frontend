var Storage = require('../storage.js');
var UI = require('../ui.js');
var Models = require('./models.js');

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