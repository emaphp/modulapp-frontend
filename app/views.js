/**
 * views.js
 * -------------
 * Layout views
 */

var Marionette = require('marionette');
var Radio = require('backbone.radio');

//layout view
var AppLayoutView = Marionette.LayoutView.extend({
    tagName: 'div',
    className: 'pure-u-1-1',

    template: function() {
        return require('./layout/layout.html');
    },
    
    regions: {
        headerRegion: '#header-region',
        contentRegion: '#content-region'
    },
    
    initialize: function() {
        //setup a channel for layout content
        Radio.channel('layout').comply('set:content', function(view) {
            this.getRegion("contentRegion").show(view);
        }, this);
    },

    onBeforeShow: function() {
        this.getRegion("headerRegion").show(new AppHeaderView());
        this.getRegion("contentRegion").show(new AppContentView());
    }
});

//header view
var AppHeaderView = Marionette.ItemView.extend({
    className: 'pure-u-1-1',
    
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
    }
});

//content view
var AppContentView = Marionette.ItemView.extend({
    className: 'pure-u-1-1',

    template: function() {
        return require('./layout/content.html');
    }
});

module.exports = {
    AppLayoutView: AppLayoutView,
    AppHeaderView: AppHeaderView,
    AppContentView: AppContentView
};