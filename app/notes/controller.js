var Marionette = require('marionette');

var NotesController = Marionette.Controller.extend({
    initialize: function() {
        console.log("Controller in module 'Notes' is starting...");
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

module.exports = new NotesController();