var Storage = require('../storage.js');
var Models = require('./models.js');

var NotesStorage = Storage.extend({
    collection: Models.NotesCollection,
    
    success: function() {
        console.log("NotesCollection fetched correctly");
    },
    
    error: function() {
        console.log("Failed to fetch NotesCollection");
    }
});

module.exports = new NotesStorage();