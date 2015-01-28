/**
 * router.js
 * ---------
 * Router class for Notes module
 */
 
var Router = require('../router.js');

var NotesRouter = Router.extend({
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