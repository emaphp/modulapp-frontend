/**
 * router.js
 * ---------
 * Router class for Notes module
 */
var Marionette = require('marionette');

var NotesRouter = Marionette.AppRouter.extend({
    initialize: function(controller) {
        //set controller
        this.controller = controller;

        //append routes
        this.processAppRoutes(this.controller, {
            "notes/list": "list",
            "notes/create": "create",
            "notes/edit/:id": "edit"
        });
    }
});

module.exports = NotesRouter;