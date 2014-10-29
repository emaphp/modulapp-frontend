var Marionette = require('marionette');

var ContactsModule = Marionette.Module.extend({
    startWithParent: true,
    initialize: function(name, app, options) {
        console.log("Module 'Contacts' initializing...");

        //create router instance
        var Router = require('./router.js');
        this.router = new Router();

        //controller
        this.controller = require('./controller.js');
    }
});

module.exports = ContactsModule;