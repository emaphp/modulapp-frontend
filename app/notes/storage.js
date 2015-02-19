/**
 * storage.js
 * ----------
 * Storage instance for Notes module
 */

var Storage = require('../storage');
var Models = require('./models');

var NotesStorage = Storage.extend({
    collection: Models.NotesCollection
});

module.exports = new NotesStorage();