//include styles (PureCSS)
require('purecss/pure-min.css');
require('purecss/grids-responsive-min.css');
require('purecss/buttons-min.css');

//additional styles
require('../css/styles.css');

//font awesome
require("font-awesome-webpack");

//initialize
var $ = require('jquery');

$(document).on('ready', function() {
    var App = require('./app.js');
    App.start();
});