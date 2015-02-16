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
var UI = require('../ui');

var NotesController = Marionette.Controller.extend({
    initialize: function(app) {
        console.log("'Notes' controller is being initialized...");
    },

    _sync: function() {
        if (!Storage.isReady()) {
            UI.showLoader();
            Storage.fetch().then(Storage.success, Storage.error);
        }
    },

    list: function() {
        this._sync();
        var view = new Views.NoteListView({collection: Storage.data});
        Layout.contentRegion.show(view);
    },

    create: function() {
        this._sync();
        var view = new Views.NoteCreateView({model: new Models.Note()});
        Layout.contentRegion.show(view);
    },

    edit: function(id) {
        this._sync();
        var view = new Views.NoteEditView({model: Storage.get(id)});
        Layout.contentRegion.show(view);
    }
});

module.exports = NotesController;