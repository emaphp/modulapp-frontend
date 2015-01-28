/**
 * controller.js
 * -------------
 * Controller class for Notes module
 */

var Marionette = require('marionette');
var Views = require('./views');
var Models = require('./models');
var Storage = require('./storage');
var Layout = require('../layout');

var NotesController = Marionette.Controller.extend({
    initialize: function(app) {
        console.log("'Notes' controller is being initialized...");
    },

    list: function() {
        var view = new Views.NoteListView({collection: Storage.fetch()});
        Layout.contentRegion.show(view);
    },

    create: function() {
        var view = new Views.NoteCreateView({model: new Models.Note()});
        Layout.contentRegion.show(view);
    },

    edit: function(id) {
        var view = new Views.NoteEditView({model: Storage.get(id)});
        Layout.contentRegion.show(view);
    }
});

module.exports = NotesController;