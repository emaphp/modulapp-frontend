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

var ContactsController = Marionette.Controller.extend({
    initialize: function() {
        console.log("'Contacts' controller is being initialized...");
    },

    detail: function(id) {
        var view = new Views.ContactDetailView({model: Storage.get(id)});
        Layout.contentRegion.show(view);
    },

    list: function() {
        var view = new Views.ContactListView({collection: Storage.fetch()});
        Layout.contentRegion.show(view);
    },

    create: function() {
        var view = new Views.ContactCreateView({model: new Models.Contact()});
        Layout.contentRegion.show(view);
    },

    edit: function(id) {
        var view = new Views.ContactEditView({model: Storage.get(id)});
        Layout.contentRegion.show(view);
    }
});

module.exports = ContactsController;