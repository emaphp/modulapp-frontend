var Backbone = require('backbone');
var Marionette = require('marionette');
var Models = require('./models.js');

var NoteView = Marionette.ItemView.extend({
    model: Models.Note,
    tagName: 'div',
    className: "pure-u-1-1 pure-u-sm-1-1 pure-u-md-1-2 pure-u-lg-1-4",
    
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

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

    template: function() {
        return require('./templates/list.html');
    }
});

var NoteCreateView = Marionette.ItemView.extend({
    tagName: 'div',
    template: function() {
        return require('./templates/create.html');
    },
    
    events: {
        "click .save": "save",
    },

    save: function(evnt) {
        evnt.preventDefault();

        var note = new Models.Note({
            title: this.$el.find('#title').val(),
            body: this.$el.find('#body').val(),
            createdAt: require('moment')().format()
        });

        note.save(note.attributes, {
            success: function() {
                require('./storage.js').add(note);
                Backbone.history.navigate("notes/list", true);
            }
        });
    }
});

var NoteEditView = Marionette.ItemView.extend({
    tagName: 'div',

    template: function(model) {
        var tpl = require('./templates/edit.html');
        return tpl(model);
    },

    events: {
        "click .save": "save"
    },

    save: function(evnt) {
        evnt.preventDefault();
        var note = this.model;
        note.set({
            title: this.$el.find('#title').val(),
            body: this.$el.find('#body').val()
        });
        note.save();
        Backbone.history.navigate("notes/list", true);
    }
});

module.exports = {
    NoteView: NoteView,
    NoteListView: NoteListView,
    NoteCreateView: NoteCreateView,
    NoteEditView: NoteEditView
};