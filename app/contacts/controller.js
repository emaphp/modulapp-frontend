var Marionette = require('marionette');
var Views = require('./views.js');
var Models = require('./models.js');

var ContactsController = Marionette.Controller.extend({
    initialize: function(app) {
        console.log("'Contacts' controller is being initialized...");
        this.app = app;
        this.storage = require('./storage.js');
    },

    detail: function(id) {
        var view = new Views.ContactDetailView({model: this.storage.get(id)});
        this.app.contentRegion.show(view);
    },

    list: function() {
        var view = new Views.ContactListView({collection: this.storage.fetch()});
        this.app.contentRegion.show(view);
    },

    create: function() {
        var view = new Views.ContactCreateView({model: new Models.Contact()});
        this.app.contentRegion.show(view);
    },

    edit: function(id) {
        var view = new Views.ContactEditView({model: this.storage.get(id)});
        this.app.contentRegion.show(view);
    }
});

module.exports = ContactsController;