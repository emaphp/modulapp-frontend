var Backbone = require('backbone');
var Marionette = require('marionette');

//create app
var App = new Marionette.Application();

//add regions
App.addRegions({
    headerRegion: '#header-region',
    contentRegion: '#content-region'
});

//initilize modules
App.addInitializer(function() {
    console.log('Initializing modules...');
    App.module('Notes', require('./notes/notes.js'));
    App.module('Contacts', require('./contacts/contacts.js'));
});

//start event
App.on('start', function() {
    console.log('Application is starting...');
    Backbone.history.start();
});

module.exports = App;