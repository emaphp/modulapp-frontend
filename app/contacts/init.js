/**
 * init.js
 * -------
 * Initializer for Contacts module
 */

module.exports = function(App) {
    App.module("Contacts", require('./contacts'));
};