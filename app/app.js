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

//setup radio
var Config = require('./config');
Radio.DEBUG = Config.debug;

//setup debug channel
Radio.channel('debug').comply('log', function(message) {
    if (Config.debug)
        console.log(message);
});

//load modules
require('./notes/init')(App);
require('./contacts/init')(App);

//start event
App.on('start', function() {
    /**
     * SETUP MAIN ROUTER
     */
    
    var Router = Marionette.AppRouter.extend({
        routes: {
            "": false
        },

        //onRoute hack
        onRoute: function(name, path) {
            Radio.channel('context').command('set', '');
            Radio.channel('layout').command('set:content', new Views.AppContentView());
            Radio.channel('notify').command('clean', true);
        }
    });

    var router = new Router();

    /*
     * INITIALIZE LAYOUT
     */

    App.getRegion("body").show(new Views.AppLayoutView()); 

    /**
     * ENABLE NOTIFICATIONS
     */
    
    var UI = require('./ui');
    ui = new UI();
    
    /**
     * START HISTORY
     */
    
    Backbone.history.start();

    //setup nav channel
    Radio.channel('nav').comply('navigate', function(route) {
        Backbone.history.navigate(route, true);

    });

    Radio.channel('debug').command('log', "Application is starting...");
});

module.exports = App;