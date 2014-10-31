var Marionette = require('marionette');
var Views = require('./views.js');

var NotesController = Marionette.Controller.extend({
    initialize: function(app) {
        console.log("Controller in module 'Notes' is starting...");
        this.app = app;
        this.storage = require('./storage.js');
    },

    list: function() {
        var NoteListView = Views.NoteListView;
        var view = new NoteListView({collection: this.storage.fetch()});
        this.app.contentRegion.show(view);
    },

    detail: function(id) {
        var NoteDetailView = Views.NoteDetailView;
        var view = new NoteDetailView({model: this.storage.get(id)});
        this.app.contentRegion.show(view);
    },

    create: function() {
        var NoteCreateView = Views.NoteCreateView;
        var view = new NoteCreateView();
        this.app.contentRegion.show(view);
    },

    edit: function(id) {
        var NoteEditView = Views.NoteEditView;
        var view = new NoteEditView({model: this.storage.get(id)});
        this.app.contentRegion.show(view);
    }
});

module.exports = NotesController;