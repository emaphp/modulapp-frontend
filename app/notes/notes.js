var Marionette = require('marionette');

var NotesModule = Marionette.Module.extend({
    startWithParent: true,
    initialize: function(name, app, options) {
        console.log("Module 'Notes' initializing...");

        //initialize controller
        var Controller = require('./controller.js');
        this.controller = new Controller({app: app});

        //initialize router
        var Router = require('./router.js');
        this.router = new Router({controller: this.controller});

        //TODO: call controller method
    }
});

module.exports = NotesModule;