var Marionette = require('marionette');

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
    }
});

module.exports = ContactsRouter;