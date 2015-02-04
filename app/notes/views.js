/**
 * view.js
 * -------
 * Views for Notes module
 */

var Backbone = require('backbone');
var Marionette = require('marionette');
var Models = require('./models');
var UI = require('../ui');

var NoteView = Marionette.ItemView.extend({
    model: Models.Note,
    tagName: 'div',
    className: "pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 pure-u-lg-1-4",
    
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    template: function(model) {
        return require('./templates/_item.html')(model);
    },

    events: {
        "click .delete": "delete"
    },

    delete: function(evnt) {
        evnt.preventDefault();
        UI.showLoader("Deleting note...");
        this.model.destroy({
            success: function() {
                UI.showSuccess('Note deleted succesfully');
            },
            error: function() {
                UI.showError("Error: Failed to delete note");
            },
            wait: true,
        });
    }
});

var NoteEmptyListView = Marionette.ItemView.extend({
    tagName: 'div',
    className: "pure-u-1-1",

    template: function() {
        return require('./templates/_empty.html');
    }
});

var NoteListView = Marionette.CompositeView.extend({
    emptyView: NoteEmptyListView,
    childView: NoteView,
    childViewContainer: '#notes-list',
    className: "pure-u-1-1",

    template: function() {
        return require('./templates/list.html');
    }
});

var NoteCreateView = Marionette.ItemView.extend({
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
        if (errors) {
            UI.showFormErrors(errors);
            return;
        }

        UI.showLoader("Saving note...");
        
        this.model.save(this.model.attributes, {
            wait: true,
            success: function(model) {
                require('./storage.js').add(model);
                Backbone.history.navigate("notes/list", true);
                UI.showSuccess('Note saved succesfully');
            },
            error: function() {
                Backbone.history.navigate("notes/list", true);
                UI.showError("Error: Couldn't save note");
            }
        });
    },
    
    remove: function() {
        var Validation = require('backbone-validation');
        Validation.unbind(this);
    }
});

var NoteEditView = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',
    
    initialize: function(options) {
        this.note = options.model.clone();
        var Validation = require('backbone-validation');
        Validation.bind(this, {
            selector: 'id',
            model: this.note
        });
    },

    template: function(model) {
        var tpl = require('./templates/edit.html');
        return tpl(model);
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
        if (errors) {
            UI.showFormErrors(errors);
            return;
        }
        
        UI.showLoader("Saving note...");

        this.model.save(this.note.attributes, {
            wait: true,
            success: function(model) {
                require('./storage.js').add(model);
                Backbone.history.navigate("notes/list", true);
                UI.showSuccess('Note updated succesfully');
            },
            error: function() {
                Backbone.history.navigate("notes/list", true);
                UI.showError("Error: Couldn't save note");
            }
        });
    },

    remove: function() {
        var Validation = require('backbone-validation');
        Validation.unbind(this);
    }
});

module.exports = {
    NoteView: NoteView,
    NoteListView: NoteListView,
    NoteCreateView: NoteCreateView,
    NoteEditView: NoteEditView
};