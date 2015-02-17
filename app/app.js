/**
 * app.js
 * ------
 * Application startup
 */

var Backbone = require('backbone');
var Marionette = require('marionette');
var Radio = require('backbone.radio');
var Views = require('./views');

//create app
var App = new Marionette.Application();

//define a default region where layout will be rendered
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
    
    var Layout = Views.AppLayoutView;
    App.getRegion("body").show(new Layout()); 

    /**
     * SETUP MAIN ROUTER
     */
    
    var Router = Marionette.AppRouter.extend({
        routes: {
            "": 'showContent'
        },

        controller: {
            //renders default view in content region
            showContent: function() {
                Radio.channel('layout').command('set:content', new Views.AppContentView());
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