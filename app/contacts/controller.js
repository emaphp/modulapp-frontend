/**
 * controller.js
 * -------------
 * Controller class for Contacts module
 */

var Controller = require('../controller');
var Views = require('./views');
var Models = require('./models');
var storage = require('./storage');
var layoutChannel = require('backbone.radio').channel('layout');
var debug = require('backbone.radio').channel('debug');

var ContactsController = Controller.extend({
    syncErrorMessage: "Couldn't fetch contacts",
    
    initialize: function() {
        debug.command('log', "Contacts controller is being initialized...");
        this.setupListeners(storage);
    },

    detail: function(id) {
        this.sync(storage, function() {
            var view = new Views.ContactDetailView({model: storage.get(id)});
            layoutChannel.command('set:content', view);
        });
    },

    list: function() {
        this.sync(storage, function() {
            var view = new Views.ContactListView({collection: storage.data});
            layoutChannel.command('set:content', view);
        });
    },

    create: function() {
        this.sync(storage, function() {
            var view = new Views.ContactCreateView({model: new Models.Contact()});
            layoutChannel.command('set:content', view);
        });
    },

    edit: function(id) {
        this.sync(storage, function() {
            var view = new Views.ContactEditView({model: storage.get(id)});
            layoutChannel.command('set:content', view);
        });
    }
});

module.exports = ContactsController;