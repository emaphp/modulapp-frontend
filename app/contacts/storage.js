/**
 * storage.js
 * ----------
 * Storage for Contacts module
 */

var Storage = require('../storage');
var Models = require('./models');
var notify = require('backbone.radio').channel('notify');

var CollectionsStorage = Storage.extend({
    collection: Models.ContactsCollection,
    errorMessage: "Couldn't fetch contacts"
});

module.exports = new CollectionsStorage();