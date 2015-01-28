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
    appLayout: '#app-layout'
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
    App.getRegion("appLayout").show(Layout); 

    /**
     * START HISTORY
     */
    
    Backbone.history.start();
});

module.exports = App;