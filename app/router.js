var Marionette = require('marionette');

var Router = Marionette.AppRouter.extend({
    onRoute: function() {
        var UI = require('./ui.js');
        UI.clean();
    }
});

module.exports = Router;