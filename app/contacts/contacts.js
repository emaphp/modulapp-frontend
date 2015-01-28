/**
 * contacts.js
 * -----------
 * Contacnts module class
 */

var Marionette = require('marionette');

var ContactsModule = Marionette.Module.extend({
    startWithParent: true,
    
    initialize: function(name, app, options) {
        console.log("Module 'Contacts' initializing...");

        //initialize router
        var Router = require('./router');
        var Controller = require('./controller');
        this.router = new Router(new Controller);
    }
});

module.exports = ContactsModule;