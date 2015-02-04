/**
 * app.js
 * ------
 * Application startup
 */

var Backbone = require('backbone');
var Marionette = require('marionette');

//create app
var App = new Marionette.Application();

App.addRegions({
    body: 'body'
});    

//load modules
require('./notes/init')(App);
require('./contacts/init')(App);

//start event
App.on('start', function() {
    console.log("Application is starting...");

    /*
     * INITIALIZE LAYOUT
     */
    
    var Layout = require('./layout');
    App.getRegion("body").show(Layout); 

    /**
     * SETUP MAIN ROUTER
     */
    
    var Router = Marionette.AppRouter.extend({
        appRoutes: {
            "": 'showMain'
        },

        controller: {
            showMain: function() {
                var Views = require('./views');
                Layout.getRegion("contentRegion").show(new Views.AppContentView());
            }
        },
    });

    var router = new Router();

    /**
     * START HISTORY
     */
    
    Backbone.history.start();
});

module.exports = App;