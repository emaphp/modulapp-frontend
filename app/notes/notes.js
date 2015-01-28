/**
 * notes.js
 * --------
 * Notes module
 */

var Marionette = require('marionette');

var NotesModule = Marionette.Module.extend({
    startWithParent: true,

    initialize: function(name, app, options) {
        console.log("Module 'Notes' initializing...");

        //initialize router
        var Router = require('./router.js');
        var Controller = require('./controller.js');
        this.router = new Router(new Controller);
    }
});

module.exports = NotesModule;