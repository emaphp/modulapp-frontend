/**
 * controller.js
 * -------------
 * Base controller
 */

var Marionette = require('marionette');

var Controller = Marionette.Controller.extend({
    sync: function(storage, callback) {
        //check if storage has data
        if (storage.isReady())
            return callback();

        //fetch data
        storage.trigger('before:fetch'); //notifies UI

        storage.fetch() //returns a Promise
        .then(function() {
            storage.trigger('fetch:success');
        })
        .catch(function(error) {
            storage.trigger('fetch:error', error);
        })
        .then(function() {
            callback();
            storage.trigger('after:fetch');
        });
    }
});

module.exports = Controller;