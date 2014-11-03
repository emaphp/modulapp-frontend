var Backbone = require('backbone');
var Marionette = require('marionette');
var Models = require('./models.js');
var debounce = require('debounce');

var ContactView = Marionette.ItemView.extend({
    model: Models.Contact,
    tagName: 'div',
    className: "pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 pure-u-lg-1-4",
    
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    template: function(model) {
        var tpl = require('./templates/_item.hbs');
        return tpl(model);
    },

    events: {
        "click .delete": "delete"
    },

    delete: function() {
        this.model.destroy();
    }
});

var ContactEmptyView = Marionette.ItemView.extend({
    tagName: 'div',

    template: function() {
        return require('./templates/_empty.html');
    }
});

var ContactListView = Marionette.CompositeView.extend({
    emptyView: ContactEmptyView,
    childView: ContactView,
    childViewContainer: '#contacts-list',

    initialize: function(options) {
        this.filtered = options.collection;
        this.applyFilter = debounce(this.filterList, 225);
    },

    events: {
        "keyup #filter": "applyFilter"
    },

    filterList: function(evnt) {
        var filter = this.$el.find('#filter').val();

        if (filter != "") {
            var regex = new RegExp(filter.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"), 'i');
            var filtered = this.filtered.filter(function(contact) {
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
            this.collection = this.filtered.clone();
        }
        
        this._renderChildren();
    },

    template: function() {
        return require('./templates/list.html');
    }
});

var ContactCreateView = Marionette.ItemView.extend({
    tagName: 'div',
    template: function() {
        return require('./templates/create.html');
    },
    
    events: {
        "click .save": "save"
    },

    save: function(evnt) {
        evnt.preventDefault();

        var contact = new Models.Contact({
            name: this.$el.find('#name').val(),
            surname: this.$el.find('#surname').val(),
            email: this.$el.find('#email').val(),
            phone: this.$el.find('#phone').val(),
            twitter: this.$el.find('#twitter').val()
        });

        contact.save(contact.attributes, {
            success: function() {
                require('./storage.js').add(contact);
                Backbone.history.navigate("contacts/list", true);
            }
        });
    }
});

var ContactEditView = Marionette.ItemView.extend({
    tagName: 'div',

    template: function(model) {
        var tpl = require('./templates/edit.html');
        return tpl(model);
    },

    events: {
        "click .save": "save"
    },

    save: function() {
        evnt.preventDefault();

        var contact = this.model;
        contact.set({
            surnname: this.$el.find('#surname').val(),
            email: this.$el.find('#email').val(),
            phone: this.$el.find('#phone').val(),
            twitter: this.$el.find('#twitter').val()
        });
        contact.save();
        Backbone.history.navigate("contacts/list", true);
    }
});

module.exports = {
    ContactView: ContactView,
    ContactListView: ContactListView,
    ContactCreateView: ContactCreateView,
    ContactEditView: ContactEditView
};