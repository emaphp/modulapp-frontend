var Backbone = require('backbone');
var Marionette = require('marionette');
var Models = require('./models.js');

var NoteView = Marionette.ItemView.extend({
    model: Models.Note,
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

var NoteEmptyListView = Marionette.ItemView.extend({
    tagName: 'div',

    template: function() {
        return require('./templates/_empty.html');
    }
});

var NoteListView = Marionette.CompositeView.extend({
    emptyView: NoteEmptyListView,
    childView: NoteView,
    childViewContainer: '#notes-list',
    template: function(collection) {
        return require('./templates/list.html');
    }
});

var NoteDetailView = Marionette.ItemView.extend({
    tagName: 'div',
    template: function (model) {
        var tpl = require('./templates/detail.html');
        return tpl(model);
    }
});

var NoteCreateView = Marionette.ItemView.extend({
    tagName: 'div',
    template: function(model) {
        var tpl = require('./templates/create.html');
        return tpl(model);
    },
    
    events: {
        "click .save": "save"
    },

    save: function() {

    }
});

var NoteEditView = Marionette.ItemView.extend({
    tagName: 'div',

    template: function(model) {
        var tpl = require('./templates/edit.html');
        return tpl(model);
    },

    events: {
        "click .save": "saveNote"
    },

    saveNote: function() {

    }
});

module.exports = {
    NoteView: NoteView,
    NoteListView: NoteListView,
    NoteDetailView: NoteDetailView,
    NoteCreateView: NoteCreateView,
    NoteEditView: NoteEditView
};