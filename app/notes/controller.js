/**
 * controller.js
 * -------------
 * Controller class for Notes module
 */

var Marionette = require('marionette');
var Radio = require('backbone.radio');
var Views = require('./views');
var Models = require('./models');
var Storage = require('./storage');
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
        Radio.channel('layout').command('set:content', view);
    },

    create: function() {
        this._sync();
        var view = new Views.NoteCreateView({model: new Models.Note()});
        Radio.channel('layout').command('set:content', view);
    },

    edit: function(id) {
        this._sync();
        var view = new Views.NoteEditView({model: Storage.get(id)});
        Radio.channel('layout').command('set:content', view);
    }
});

module.exports = NotesController;