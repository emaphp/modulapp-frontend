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
    template: require('./layout/layout.html'),
    
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
    template: require('./layout/header.html'),
    
    events: {
        "click .pure-menu-heading": "mainPage"
    },

    initialize: function() {
        //setup context channel
        Radio.channel('context').comply('set', function(context) {
            this.$el.find('.option').parent().removeClass("pure-menu-selected");    

            if (context) {
                this.$el.find('#option-' + context).blur().parent().addClass("pure-menu-selected");
            }
        }, this);
    },

    mainPage: function() {
        console.log("main");
    }
});

//content view
var AppContentView = Marionette.ItemView.extend({
    className: 'pure-u-1-1',
    template: require('./layout/content.html')
});

module.exports = {
    AppLayoutView: AppLayoutView,
    AppHeaderView: AppHeaderView,
    AppContentView: AppContentView
};