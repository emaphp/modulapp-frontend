/**
 * init.js
 * -------
 * Initializer for Notes module
 */

module.exports = function(App) {
    App.module("Notes", require('./notes'));
};