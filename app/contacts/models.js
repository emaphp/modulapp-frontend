/**
 * models.js
 * ---------
 * Models for Contacts module
 */

var Backbone = require('backbone');
var Config = require('../config');
var Model = require('../model');
var Collection = require('../collection');

var Contact = Model.extend({
    urlRoot: Config.Contacts.endPoint,
    validation: {
        name: {
            required: true
        },
        email: {
            required: false,
            pattern: 'email'
        },
        phone: {
            required: false,
            pattern: 'digits'
        },
        twitter: {
            required: false,
            pattern: /^\w+$/,
            msg: "Invalid twitter account"
        }
    }
});

var ContactsCollection = Collection.extend({
    model: Contact,
    comparator: 'name',
    url: Config.Contacts.endPoint
});

module.exports = {
    Contact: Contact,
    ContactsCollection: ContactsCollection
};