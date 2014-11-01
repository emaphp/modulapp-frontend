var Backbone = require('backbone');
var Marionette = require('marionette');

var AppLayoutView = Marionette.LayoutView.extend({
    tagName: 'div',
    template: function() {
        return require('./layout/layout.html');
    },

    regions: {
        headerRegion: '#header-region',
        contentRegion: '#content-region'
    }
});

var AppHeaderView = Marionette.ItemView.extend({
    template: function() {
        return require('./layout/header.html');
    },
    
    events: {
        "click #option-notes": "initNotes",
        "click #option-contacts": "initContacts",
        "click .pure-menu-heading": "mainPage"
    },

    initNotes: function() {
        this.$el.find('#option-notes').blur().parent().addClass("pure-menu-selected");
        this.$el.find('#option-contacts').parent().removeClass("pure-menu-selected");
    },

    initContacts: function() {
        this.$el.find('#option-contacts').blur().parent().addClass("pure-menu-selected");
        this.$el.find('#option-notes').parent().removeClass("pure-menu-selected");
    },

    mainPage: function() {
        this.$el.find('#option-notes').parent().removeClass("pure-menu-selected");
        this.$el.find('#option-contacts').parent().removeClass("pure-menu-selected");

        var view = new AppContentView();
        require('./app.js').contentRegion.show(view);
    }
});

var AppContentView = Marionette.ItemView.extend({
    template: function() {
        return require('./layout/content.html');
    }
});

module.exports = {
    layout: new AppLayoutView(),
    header: new AppHeaderView(),
    content: new AppContentView()
};