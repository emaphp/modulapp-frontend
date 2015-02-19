/**
 * controller.js
 * -------------
 * Controller class for Notes module
 */

var Controller = require('../controller');
var Views = require('./views');
var Models = require('./models');
var storage = require('./storage');
var layoutChannel = require('backbone.radio').channel('layout');
var debug = require('backbone.radio').channel('debug');

var NotesController = Controller.extend({
    syncErrorMessage: "Couldn't fetch notes",

    initialize: function() {
        debug.command('log', "Notes controller is being initialized...");
        this.setupListeners(storage);
    },

    list: function() {
        this.sync(storage, function() {
            var view = new Views.NoteListView({collection: storage.data});
            layoutChannel.command('set:content', view);
        });
    },

    create: function() {
        this.sync(storage, function() {
            var view = new Views.NoteCreateView({model: new Models.Note()});
            layoutChannel.command('set:content', view);
        });
    },

    edit: function(id) {
        this.sync(storage, function() {
            var view = new Views.NoteEditView({model: storage.get(id)});
            layoutChannel.command('set:content', view);
        });
    }
});

module.exports = NotesController;