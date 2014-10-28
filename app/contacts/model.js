var Backbone = require('backbone');
var Config = require('../config.js');

var Contact = Backbone.Model.extend({
    urlRoot: Config.Contacts.endPoint
});

var ContactCollection = Backbone.Collection.extend({
    model: Contact,
    url: Config.Contacts.endPoint
});

module.exports = {
    Contact: Contact,
    ContactCollection: ContactCollection
};