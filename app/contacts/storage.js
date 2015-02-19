/**
 * storage.js
 * ----------
 * Storage for Contacts module
 */

var Storage = require('../storage');
var Models = require('./models');

var CollectionsStorage = Storage.extend({
    collection: Models.ContactsCollection
});

module.exports = new CollectionsStorage();