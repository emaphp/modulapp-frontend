/**
 * controller.js
 * -------------
 * Controller class for Contacts module
 */

var Marionette = require('marionette');
var Views = require('./views');
var Models = require('./models');
var Layout = require('../layout');
var Storage = require('./storage');
var UI = require('../ui');

var ContactsController = Marionette.Controller.extend({
    initialize: function() {
        console.log("'Contacts' controller is being initialized...");
    },

    _sync: function() {
        if (!Storage.isReady()) {
            UI.showLoader();
            Storage.fetch().then(Storage.success, Storage.error);
        }
    },

    detail: function(id) {
        this._sync();
        var view = new Views.ContactDetailView({model: Storage.get(id)});
        Layout.contentRegion.show(view);
    },

    list: function() {
        this._sync();
        var view = new Views.ContactListView({collection: Storage.data});
        Layout.contentRegion.show(view);
    },

    create: function() {
        this._sync();
        var view = new Views.ContactCreateView({model: new Models.Contact()});
        Layout.contentRegion.show(view);
    },

    edit: function(id) {
        this._sync();
        var view = new Views.ContactEditView({model: Storage.get(id)});
        Layout.contentRegion.show(view);
    }
});

module.exports = ContactsController;