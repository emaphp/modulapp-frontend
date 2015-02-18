/**
 * storage.js
 * ----------
 * Storage instance for Notes module
 */

var Storage = require('../storage');
var Models = require('./models');

var NotesStorage = Storage.extend({
    collection: Models.NotesCollection,
    errorMessage: "Couldn't fetch notes"
});

module.exports = new NotesStorage();