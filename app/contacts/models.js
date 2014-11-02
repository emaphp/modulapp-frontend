var Backbone = require('backbone');
var Config = require('../config.js');

var Contact = Backbone.Model.extend({
    urlRoot: Config.Contacts.endPoint
});

var ContactsCollection = Backbone.Collection.extend({
    model: Contact,
    comparator: 'name',
    url: Config.Contacts.endPoint
});

module.exports = {
    Contact: Contact,
    ContactsCollection: ContactsCollection
};