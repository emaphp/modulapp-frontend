/**
 * module.js
 * ---------
 * Base module
 */

var Marionette = require('marionette');

var Module = Marionette.Object.extend({
    initialize: function(app) {
        this.listenTo(app, 'start', this.onStart);
    }
});

module.exports = Module;