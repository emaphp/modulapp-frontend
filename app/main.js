//include styles (PureCSS)
require('purecss/pure-min.css');
require('purecss/grids-responsive-min.css');
require('purecss/buttons-min.css');
require('purecss/forms-min.css');

//additional styles
require('../css/styles.css');

//font awesome
require("font-awesome-webpack");

//handlebars helpers
require('./helpers.js');

//backbone.notifier styles
require('backbone.notifier/css/notifier-base.css');
require('backbone.notifier/css/notifier-theme-plastic.css');

//initialize
var $ = require('jquery');

$(document).on('ready', function() {
    require('./app.js').start();
});
