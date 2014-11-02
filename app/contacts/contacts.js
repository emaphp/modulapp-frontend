var Marionette = require('marionette');

var ContactsModule = Marionette.Module.extend({
    startWithParent: true,
    initialize: function(name, app, options) {
        console.log("Module 'Contacts' initializing...");

        //initialize controller
        var Controller = require('./controller.js');
        this.controller = new Controller(app);

        //create router instance
        var Router = require('./router.js');
        this.router = new Router(this.controller);
    }
});

module.exports = ContactsModule;