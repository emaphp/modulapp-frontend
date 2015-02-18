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

var NotesController = Controller.extend({
    initialize: function(app) {
        console.log("'Notes' controller is being initialized...");
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