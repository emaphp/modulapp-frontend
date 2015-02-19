/**
 * router.js
 * ---------
 * Router class for Notes module
 */

var Marionette = require('marionette');
var contextChannel = require('backbone.radio').channel('context');
var notify = require('backbone.radio').channel('notify');

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
    },

    onRoute: function(name, path) {
        contextChannel.command('set', 'notes');
        notify.command('clean', true);
    }
});

module.exports = NotesRouter;