var Backbone = require('backbone');
var Marionette = require('marionette');

var AppLayoutView = Marionette.LayoutView.extend({
    tagName: 'div',
    template: function() {
        var tpl = require('./layout/layout.html');
        return tpl({});
    },

    regions: {
        headerRegion: '#header-region',
        contentRegion: '#content-region'
    }
});

var AppHeaderView = Marionette.ItemView.extend({
    template: function() {
        var tpl = require('./layout/header.html');
        return tpl({});
    },
    
    events: {
        "click #option-notes": "initNotes",
        "click #option-contacts": "initContacts"
    },

    initNotes: function() {
        this.$el.find('#option-notes').blur().parent().addClass("pure-menu-selected");
        this.$el.find('#option-contacts').parent().removeClass("pure-menu-selected");
        Backbone.history.navigate("notes/list", true);
    },

    initContacts: function() {
        this.$el.find('#option-contacts').blur().parent().addClass("pure-menu-selected");
        this.$el.find('#option-notes').parent().removeClass("pure-menu-selected");
        Backbone.history.navigate("contacts/list", true);
    }
});

var AppContentView = Marionette.ItemView.extend({
    template: function() {
        var tpl = require('./layout/content.html');
        return tpl({});
    }
});

module.exports = {
    layout: new AppLayoutView(),
    header: new AppHeaderView(),
    content: new AppContentView()
};