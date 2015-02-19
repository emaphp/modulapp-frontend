/**
 * init.js
 * -------
 * Initializer for Notes module
 */

var Module = require('../module');
var debug = require('backbone.radio').channel('debug');

var NotesModule = Module.extend({
    onStart: function() {
        debug.command('log', "Notes module is being initialized...");
        var Router = require('./router');
        var Controller = require('./controller');
        var router = new Router(new Controller());   
    }
});

module.exports = function(app) {
    var notes = new NotesModule(app);
};