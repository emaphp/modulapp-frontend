var Marionette = require('marionette');
var NotesController = require('./controller.js');

var NotesRouter = Marionette.AppRouter.extend({
    controller: NotesController,
    appRouter: {
        "notes/list": "list",
        "notes/detail/:id": "detail",
        "notes/create": "create",
        "notes/edit/:id": "edit"
    }
});

return NotesRouter;