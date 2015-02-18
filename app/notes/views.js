/**
 * view.js
 * -------
 * Views for Notes module
 */

var Marionette = require('marionette');
var Models = require('./models');
var storage = require('./storage');
var navChannel = require('backbone.radio').channel('nav');
var notify = require('backbone.radio').channel('notify');

var NoteView = Marionette.ItemView.extend({
    model: Models.Note,
    tagName: 'div',
    className: "pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 pure-u-lg-1-4",
    
    template: function(model) {
        return require('./templates/_item.html')(model);
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);

        this.listenTo(this.model, 'before:destroy', function() {
            notify.command('show:loader', 'Deleting note...');
        });
    },

    events: {
        "click .delete": "delete"
    },

    delete: function(evnt) {
        evnt.preventDefault();
        this.model.trigger('before:destroy');
        this.model.destroy({wait: true})
        .then(function() {
            notify.command('show:success', 'Note deleted succesfully');
        }, function() {
            notify.command('show:error', 'Failed to delete note');
        });
    }
});

var NoteEmptyListView = Marionette.ItemView.extend({
    tagName: 'div',
    className: "pure-u-1-1",
    template: require('./templates/_empty.html')
});

var NoteListView = Marionette.CompositeView.extend({
    emptyView: NoteEmptyListView,
    childView: NoteView,
    childViewContainer: '#notes-list',
    className: "pure-u-1-1",
    template: require('./templates/list.html')
});

var NoteCreateView = Marionette.ItemView.extend({
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
            notify.command('show:loader', 'Saving note...');
        });

        this.listenTo(this.model, 'sync', function(model) {
            storage.add(model);
        });
    },

    events: {
        "click .save": "save",
    },

    save: function(evnt) {
        evnt.preventDefault();

        this.model.set({
            title: this.$el.find('#title').val(),
            body: this.$el.find('#body').val(),
            createdAt: require('moment')().format()
        });

        var errors = this.model.validate();
        if (errors)
            return notify.command('validation:error', errors);

        this.model.trigger('before:save');
        this.model.save(this.model.attributes, {wait: true})
        .then(function(values) {
            navChannel.command('navigate', 'notes/list');
            notify.command('show:success', 'Note saved succesfully');
        }, function() {
            navChannel.command('navigate', 'notes/list');
            notify.command('show:error', "Couldn't save note");
        });
    }
});

var NoteEditView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',
    
    template: function(model) {
        return require('./templates/edit.html')(model);
    },

    initialize: function(options) {
        this.note = options.model.clone();
        var Validation = require('backbone-validation');
        Validation.bind(this, {
            selector: 'id',
            model: this.note
        });

        this.on('before:destroy', function() {
            Validation.unbind(this);
        });

        this.listenTo(this.model, 'before:save', function() {
            notify.command('show:loader', 'Saving note...');
        });

        this.listenTo(this.model, 'sync', function(model) {
            storage.add(model);
        });
    },

    events: {
        "click .save": "save"
    },

    save: function(evnt) {
        evnt.preventDefault();
        
        this.note.set({
            title: this.$el.find('#title').val(),
            body: this.$el.find('#body').val()
        });

        var errors = this.note.validate();
        if (errors)
            return notify.command('validation:error', errors);
        
        this.model.trigger('before:save');
        this.model.save(this.note.attributes, {wait: true})
        .then(function(values) {
            navChannel.command('navigate', 'notes/list');
            notify.command('show:success', 'Note updated succesfully');
        }, function() {
            navChannel.command('navigate', 'notes/list');
            notify.command('show:error', "Couldn't save note");
        });
    }
});

module.exports = {
    NoteView: NoteView,
    NoteListView: NoteListView,
    NoteCreateView: NoteCreateView,
    NoteEditView: NoteEditView
};