/**
 * router.js
 * ---------
 * Router base class
 */

var Marionette = require('marionette');

var Router = Marionette.AppRouter.extend({
    onRoute: function() {
        require('./ui').clean();
    }
});

module.exports = Router;