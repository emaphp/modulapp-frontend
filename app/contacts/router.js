/**
 * router.js
 * ---------
 * Router class for Contacts module
 */
 
var Marionette = require('marionette');
var contextChannel = require('backbone.radio').channel('context');
var notify = require('backbone.radio').channel('notify');

var ContactsRouter = Marionette.AppRouter.extend({
    initialize: function(controller) {
        //set controller
        this.controller = controller;

        //append routes
        this.processAppRoutes(this.controller, {
            "contacts/list": "list",
            "contacts/detail/:id": "detail",
            "contacts/create": "create",
            "contacts/edit/:id": "edit"
        });
    },

    onRoute: function(name, path) {
         contextChannel.command('set', 'contacts');
         notify.command('clean', true);
    }
});

module.exports = ContactsRouter;