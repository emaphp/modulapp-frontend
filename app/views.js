var Marionette = require('marionette');
var AppLayoutView = Marionette.LayoutView.extend({
    tagName: 'view',
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