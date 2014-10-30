var Marionette = require('marionette');

var NotesController = Marionette.Controller.extend({
    initialize: function(options) {
        console.log("Controller in module 'Notes' is starting...");
        this.app = options.app;
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

module.exports = NotesController;