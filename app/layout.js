/**
 * layout.js
 * ---------
 * Application layout views
 */

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
    },
    
    onBeforeShow: function() {
        this.getRegion("headerRegion").show(new AppHeaderView());
        this.getRegion("contentRegion").show(new AppContentView());
    }
});

var AppHeaderView = Marionette.ItemView.extend({
    template: function() {
        return require('./layout/header.html');
    },
    
    events: {
        "click #option-notes": "selectNotes",
        "click #option-contacts": "selectContacts",
        "click .pure-menu-heading": "mainPage"
    },

    selectNotes: function() {
        this.$el.find('#option-notes').blur().parent().addClass("pure-menu-selected");
        this.$el.find('#option-contacts').parent().removeClass("pure-menu-selected");
    },

    selectContacts: function() {
        this.$el.find('#option-contacts').blur().parent().addClass("pure-menu-selected");
        this.$el.find('#option-notes').parent().removeClass("pure-menu-selected");
    },

    mainPage: function() {
        this.$el.find('#option-notes').parent().removeClass("pure-menu-selected");
        this.$el.find('#option-contacts').parent().removeClass("pure-menu-selected");

        var view = new AppContentView();
        module.exports.getRegion("contentRegion").show(view);
    }
});

var AppContentView = Marionette.ItemView.extend({
    template: function() {
        return require('./layout/content.html');
    }
});

module.exports = new AppLayoutView();