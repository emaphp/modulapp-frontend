var Marionette = require('marionette');

var NotesController = Marionette.Controller.extend({
    initialize: function(options) {
        console.log("Controller in module 'Notes' is starting...");
        this.app = options.app;
    },

    getCollection: function() {
        if (typeof(this.collection) == 'undefined') {
            var NoteCollection = require('./models.js').NoteCollection;
            this.collection = new NoteCollection();
            this.collection.fetch({
                success: function() {
                    console.log('Notes collection has been fetched');
                },
                error: function() {
                    console.log('Notes collection failed to initialize');
                }
            });
        }

        return this.collection;
    },

    list: function() {
        var NoteListView = require('./views.js').NoteListView;
        var view = new NoteListView({collection: this.getCollection()});
        this.app.contentRegion.show(view);
    },

    detail: function(id) {
        var NoteDetailView = require('./views.js').NoteDetailView;
        var view = new NoteDetailView({model: this.collection.get(id)});
        this.app.contentRegion.show(view);
    },

    create: function() {
        var NoteCreateView = require('./views.js').NoteCreateView;
        var view = new NoteCreateView();
        this.app.contentRegion.show(view);
    },

    edit: function() {
        var NoteEditView = require('./views.js').NoteEditView;
        var view = new NoteEditView({model: this.collection.get(id)});
        this.app.contentRegion.show(view);
    }
});

module.exports = NotesController;