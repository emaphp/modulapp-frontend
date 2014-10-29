var Marionette = require('marionette');

var ContactsController = Marionette.Controller.extend({
    initialize: function() {
        console.log("Controller in module 'Contacts' is starting...");
    },

    list: function() {

    },

    detail: function() {

    },

    create: function() {

    },

    edit: function() {

    }
});

module.exports = new ContactsController();