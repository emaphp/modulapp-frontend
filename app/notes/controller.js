var Marionette = require('marionette');
var Views = require('./views.js');

var NotesController = Marionette.Controller.extend({
    initialize: function(app) {
        console.log("Controller in module 'Notes' is starting...");
        this.app = app;
        this.storage = require('./storage.js');
    },

    list: function() {
        var view = new Views.NoteListView({collection: this.storage.fetch()});
        this.app.contentRegion.show(view);
    },

    create: function() {
        var view = new Views.NoteCreateView();
        this.app.contentRegion.show(view);
    },

    edit: function(id) {
        var view = new Views.NoteEditView({model: this.storage.get(id)});
        this.app.contentRegion.show(view);
    }
});

module.exports = NotesController;