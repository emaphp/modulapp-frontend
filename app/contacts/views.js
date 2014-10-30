var Backbone = require('backbone');
var Marionette = require('marionette');
var Models = require('./models.js');

var ContactView = Marionette.ItemView.extend({
    model: Models.Contact,
    tagName: 'div',
    
    template: function(model) {
        var tpl = require('./templates/_item.html');
        return tpl(model);
    },

    events: {
        "click .delete": "delete"
    },

    delete: function() {
        this.model.destroy();
    }
});

var ContactListView = Marionette.CompositeView.extend({
    childView: ContactView,
    childViewContainer: '#contacts-list',
    template: function(collection) {
        var tpl = require('./templates/list.html');
        return tpl(collection);
    }
});

var ContactDetailView = Marionette.ItemView.extend({
    tagName: 'div',
    template: function (model) {
        var tpl = require('./templates/detail.html');
        return tpl(model);
    }
});

var ContactCreateView = Marionette.ItemView.extend({
    tagName: 'div',
    template: function(model) {

    },
    
    events: {
        "click .save": "save"
    },

    save: function() {

    }
});

var ContactEditView = Marionette.ItemView.extend({
    tagName: 'div',

    template: function(model) {

    },

    events: {
        "click .save": "save"
    },

    save: function() {

    }
});

module.exports = {
    ContactView: ContactView,
    ContactListView: ContactListView,
    ContactDetailView: ContactDetailView,
    ContactCreateView: ContactCreateView,
    ContactEditView: ContactEditView
};