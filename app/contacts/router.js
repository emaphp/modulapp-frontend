var Marionette = require('marionette');
var ContactsController = require('./controller.js');

var ContactsRouter = Marionette.AppRouter.extend({
    controller: ContactsController,
    appRouter: {
        "contacts/list": "list",
        "contacts/detail/:id": "detail",
        "contacts/create": "create",
        "contacts/edit/:id": "edit"
    }
});

return ContactsRouter;