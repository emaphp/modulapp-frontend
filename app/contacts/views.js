/**
 * views.js
 * --------
 * Views for Contacts module
 */

var Marionette = require('marionette');
var Models = require('./models');
var _ = require('underscore');
var Config = require('../config');
var storage = require('./storage');
var navChannel = require('backbone.radio').channel('nav');
var notify = require('backbone.radio').channel('notify');
var debug = require('backbone.radio').channel('debug');

var ContactView = Marionette.ItemView.extend({
    model: Models.Contact,
    tagName: 'div',
    className: "contact-item pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 pure-u-lg-1-4",
    
    template: function(model) {
        return require('./templates/_item.hbs')(model);
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);

        this.listenTo(this.model, 'before:destroy', function() {
            notify.command('show:loader', 'Deleting contact...');
            debug.command('log', 'Deleting contact with ID ' + this.model.id + '...');

            this.debugString = (function(id) {
                return function(msg1, msg2) {
                    if (msg2)
                        return msg1 + ' with ID ' + id + ' ' + msg2;
                    return msg1 + ' with ID ' + id;
                };
            }(this.model.id));
        });
    },

    events: {
        "click .delete": "delete"
    },

    delete: function(evnt) {
        evnt.preventDefault();
        
        this.model.trigger('before:destroy');
        var debugString = this.debugString;
        this.model.destroy({wait: true})
        .then(function() {
            notify.command('show:success', 'Contact deleted succesfully');
            debug.command('log', debugString('Contact', 'has been deleted'));
        }, function() {
            notify.command('show:error', 'Failed to delete contact');
            debug.command('log', debugString('Failed to delete contact'));
        });
    }
});

var ContactEmptyView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',
    template: require('./templates/_empty.html')
});

var ContactListView = Marionette.CompositeView.extend({
    emptyView: ContactEmptyView,
    childView: ContactView,
    childViewContainer: '#contacts-list',
    className: 'pure-u-1-1',
    template: require('./templates/list.html'),

    initialize: function (options) {
        this.contacts = options.collection;
        this.applyFilter = _.debounce(this.filterList, Config.Contacts.filterDelay);
    },

    events: {
        "keyup #filter": "applyFilter"
    },

    filterList: function(evnt) {
        var filter = this.$el.find('#filter').val();

        if (filter !== "") {
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
    }
});

var ContactDetailView = Marionette.ItemView.extend({
    tagName: 'div',
    className: "pure-u-1-1",
    
    template: function(model) {
        return require('./templates/detail.hbs')(model);
    }
});

var ContactCreateView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',
    template: require('./templates/create.html'),

    initialize: function() {
        var Validation = require('backbone-validation');
        Validation.bind(this, {
            selector: 'id'
        });

        this.on('before:destroy', function() {
            Validation.unbind(this);
        });

        this.listenTo(this.model, 'before:save', function() {
            notify.command('show:loader', 'Saving contact...');
            debug.command('log', 'Saving new contact...');
        });

        this.listenTo(this.model, 'sync', function(model) {
            storage.add(model);
            debug.command('log', 'New contact saved with ID ' + model.get('id'));
        });
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
        if (errors)
            return notify.command('validation:error', errors);

        this.model.trigger('before:save');
        this.model.save(this.model.attributes, {wait: true})
        .then(function(values) {
            navChannel.command('navigate', 'contacts/list');
            notify.command('show:success', 'Contact saved succesfully');
        }, function() {
            navChannel.command('navigate', 'contacts/list');
            notify.command('show:error', "Couldn't save contact");
        });
    }
});

var ContactEditView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',

    template: function(model) {
        return require('./templates/edit.hbs')(model);
    },
    
    initialize: function(options) {
        this.contact = options.model.clone();
        var Validation = require('backbone-validation');
        Validation.bind(this, {
            selector: 'id',
            model: this.contact
        });

        this.on('before:destroy', function() {
            Validation.unbind(this);
        });

        this.listenTo(this.model, 'before:save', function() {
            notify.command('show:loader', 'Saving contact...');
            debug.command('log', 'Updating contact with ID ' + this.model.get('id') + '...');
        });

        this.listenTo(this.model, 'sync', function() {
            debug.command('log', 'Contact with ID ' + this.model.get('id') + ' has been updated');
        });
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
        if (errors)
            return notify.command('validation:error', errors);

        this.model.trigger('before:save');
        this.model.save(this.contact.attributes, {wait: true}).
        then(function(values) {
            navChannel.command('navigate', 'contacts/list');
            notify.command('show:success', 'Contact updated succesfully');
        }, function() {
            navChannel.command('navigate', 'contacts/list');
            notify.command('show:error', "Couldn't save contact");
        });
    }
});

module.exports = {
    ContactView: ContactView,
    ContactListView: ContactListView,
    ContactDetailView: ContactDetailView,
    ContactCreateView: ContactCreateView,
    ContactEditView: ContactEditView
};