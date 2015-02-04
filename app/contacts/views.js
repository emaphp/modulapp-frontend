/**
 * views.js
 * --------
 * Views for Contacts module
 */

var Backbone = require('backbone');
var Marionette = require('marionette');
var Models = require('./models');
var _ = require('underscore');
var UI = require('../ui');

var ContactView = Marionette.ItemView.extend({
    model: Models.Contact,
    tagName: 'div',
    className: "pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 pure-u-lg-1-4",
    
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    template: function(model) {
        return require('./templates/_item.hbs')(model);
    },

    events: {
        "click .delete": "delete"
    },

    delete: function(evnt) {
        evnt.preventDefault();
        UI.showLoader("Deleting contact...");
        this.model.destroy({
            success: function() {
                UI.showSuccess('Contact deleted succesfully');
            },
            error: function() {
                UI.showError("Error: Failed to delete contact");
            },
            wait: true,
        });
    }
});

var ContactEmptyView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',

    template: function() {
        return require('./templates/_empty.html');
    }
});

var ContactListView = Marionette.CompositeView.extend({
    emptyView: ContactEmptyView,
    childView: ContactView,
    childViewContainer: '#contacts-list',
    className: 'pure-u-1-1',

    initialize: function initialize(options) {
        this.contacts = options.collection;
        this.applyFilter = _.debounce(this.filterList, 225);
    },

    events: {
        "keyup #filter": "applyFilter"
    },

    filterList: function(evnt) {
        var filter = this.$el.find('#filter').val();

        if (filter != "") {
            var regex = new RegExp(filter.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"), 'i');
            var filtered = this.contacts.filter(function(contact) {
                if (contact.get('name').match(regex)) {
                    return true;
                }

                var surname = contact.get('surname');
                if (surname && surname.match(regex)) {
                    return true;
                }

                var twitter = contact.get('twitter');
                if (twitter && twitter.match(regex)) {
                    return true;
                }

                return false;
            });
            this.collection = new Models.ContactsCollection(filtered);
        }
        else {
            this.collection = this.contacts.clone();
        }
        
        this._renderChildren();
    },

    template: function() {
        return require('./templates/list.html');
    }
});

var ContactDetailView = Marionette.ItemView.extend({
    tagName: 'div',
    className: "pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 pure-u-lg-1-4",
    
    template: function(model) {
        return require('./templates/detail.hbs')(model);
    }
});

var ContactCreateView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',

    initialize: function() {
        var Validation = require('backbone-validation');
        Validation.bind(this, {
            selector: 'id'
        });
    },

    template: function() {
        return require('./templates/create.html');
    },
    
    events: {
        "click .save": "save"
    },

    save: function(evnt) {
        evnt.preventDefault();

        this.model.set({
            name: this.$el.find('#name').val(),
            surname: this.$el.find('#surname').val(),
            email: this.$el.find('#email').val(),
            phone: this.$el.find('#phone').val(),
            twitter: this.$el.find('#twitter').val()
        });

        var errors = this.model.validate();
        if (errors) {
            UI.showFormErrors(errors);
            return;
        }

        UI.showLoader("Saving contact...");

        this.model.save(this.model.attributes, {
            wait: true,
            success: function(model) {
                require('./storage').add(model);
                Backbone.history.navigate("contacts/list", true);
                UI.showSuccess('Contact saved succesfully');
            },
            error: function() {
                Backbone.history.navigate("contacts/list", true);
                UI.showError("Error: Couldn't save contact");
            }
        });
    },

    remove: function() {
        var Validation = require('backbone-validation');
        Validation.unbind(this);
    }
});

var ContactEditView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',
    
    initialize: function(options) {
        this.contact = options.model.clone();
        var Validation = require('backbone-validation');
        Validation.bind(this, {
            selector: 'id',
            model: this.contact
        });
    },

    template: function(model) {
        var tpl = require('./templates/edit.hbs');
        return tpl(model);
    },

    events: {
        "click .save": "save"
    },

    save: function(evnt) {
        evnt.preventDefault();

        this.contact.set({
            name: this.$el.find('#name').val(),
            surname: this.$el.find('#surname').val(),
            email: this.$el.find('#email').val(),
            phone: this.$el.find('#phone').val(),
            twitter: this.$el.find('#twitter').val()
        });

        var errors = this.contact.validate();
        if (errors) {
            UI.showFormErrors(errors);
            return;
        }

        UI.showLoader("Saving contact...");

        this.model.save(this.contact.attributes, {
            wait: true,
            success: function(model) {
                require('./storage.js').add(model);
                Backbone.history.navigate("contacts/list", true);
                UI.showSuccess('Contact updated succesfully');
            },
            error: function() {
                Backbone.history.navigate("contacts/list", true);
                UI.showError("Error: Couldn't save contact");
            }
        });
    },

    remove: function() {
        var Validation = require('backbone-validation');
        Validation.unbind(this);
    }
});

module.exports = {
    ContactView: ContactView,
    ContactListView: ContactListView,
    ContactDetailView: ContactDetailView,
    ContactCreateView: ContactCreateView,
    ContactEditView: ContactEditView
};