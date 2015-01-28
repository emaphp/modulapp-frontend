/**
 * router.js
 * ---------
 * Router class for Contacts module
 */
 
var Router = require('../router');

var ContactsRouter = Router.extend({
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
    }
});

module.exports = ContactsRouter;