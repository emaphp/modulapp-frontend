var Marionette = require('marionette');

var ContactsController = Marionette.Controller.extend({
    initialize: function() {
        console.log('Im being called...');
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