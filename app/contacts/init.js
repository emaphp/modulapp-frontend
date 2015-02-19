/**
 * init.js
 * -------
 * Initializer for Contacts module
 */

var Module = require('../module');
var debug = require('backbone.radio').channel('debug');

var ContactsModule = Module.extend({
    onStart: function() {
        debug.command('log', "Contacts module is being initialized...");
        var Router = require('./router');
        var Controller = require('./controller');
        var router = new Router(new Controller());   
    }
});

module.exports = function(app) {
    var contacts = new ContactsModule(app);
};