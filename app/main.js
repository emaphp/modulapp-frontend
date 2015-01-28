/**
 * main.js
 * -------
 * Application bootstrap file
 */

//include styles (PureCSS)
require('purecss/pure-min.css');
require('purecss/grids-responsive-min.css');
require('purecss/buttons-min.css');
require('purecss/forms-min.css');

//additional styles
require('../assets/css/styles.css');

//handlebars helpers
require('./helpers');

//backbone.notifier styles
require('backbone.notifier/css/notifier-base.css');
require('backbone.notifier/css/notifier-theme-plastic.css');

//initialize
var $ = require('jquery');

$(document).on('ready', function() {
    require('./app.js').start();
});
