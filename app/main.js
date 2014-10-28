//include styles
require('purecss/pure-min.css');
require('purecss/grids-responsive-min.css');
require('purecss/buttons-min.css');

//font awesome
require("font-awesome-webpack");

//initialize
var $ = require('jquery');

$(document).on('ready', function() {
    var App = require('./app.js');
    App.start();
});