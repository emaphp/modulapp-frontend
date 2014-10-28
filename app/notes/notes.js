var Marionette = require('marionette');

var NotesModule = Marionette.Module.extend({
    startWithParent: true,
    initialize: function(name, app, options) {
        console.log("Module 'Notes' initializing...");

        //router
        var Router = require('./router.js');
        this.router = new Router();

        //controller
        this.controller = require('./controller.js');

        //TODO: call controller method
    }
});

module.exports = NotesModule;