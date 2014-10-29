var Backbone = require('backbone');
var Marionette = require('marionette');

//create app
var App = new Marionette.Application();

//initilize modules
App.addInitializer(function() {
    console.log('Initializing modules...');
    App.module('Notes', require('./notes/notes.js'));
    App.module('Contacts', require('./contacts/contacts.js'));
});

//add regions
App.addRegions({
    appLayout: '#app-layout'
});

//start event
App.on('start', function() {
    console.log('Application is starting...');
    
    //get layout views
    var views = require('./views.js');

    //render layout
    var layout = views.layout;
    App.appLayout.show(layout);

    //render layout regions
    layout.headerRegion.show(views.header);
    layout.contentRegion.show(views.content);

    //update app regions
    App.headerRegion = layout.headerRegion;
    App.contentRegion = layout.contentRegion;

    Backbone.history.start();
});

module.exports = App;