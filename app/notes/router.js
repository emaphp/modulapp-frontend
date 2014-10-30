var Marionette = require('marionette');

var NotesRouter = Marionette.AppRouter.extend({
    initialize: function(options) {
        //set controller
        this.controller = options.controller;

        //append routes
        this.processAppRoutes(this.controller, {
            "notes/list": "list",
            "notes/detail/:id": "detail",
            "notes/create": "create",
            "notes/edit/:id": "edit"
        });
    }
});

module.exports = NotesRouter;