/**
 * controller.js
 * -------------
 * Base controller
 */

var Marionette = require('marionette');
var notify = require('backbone.radio').channel('notify');
var debug = require('backbone.radio').channel('debug');

var Controller = Marionette.Controller.extend({
    syncErrorMessage: 'Failed to fetch collection',

    debug: {
        beforeFetch: 'Fetching collection...',
        fetchSuccess: 'Collection loaded correctly',
        fetchError: 'Failed to fetch collection'
    },

    setupListeners: function(storage) {
        var self = this;

        this.listenTo(storage, 'before:fetch', function() {
            notify.command('show:loader');
            debug.command('log', self.debug.beforeFetch);
        });

        this.listenTo(storage, 'fetch:success', function() {
            notify.command('clean');
            debug.command('log', self.debug.fetchSuccess);
        });

        this.listenTo(storage, 'fetch:error', function(response, storage) {
            storage.data = undefined;
            notify.command('show:error', this.syncErrorMessage);
            debug.command('log', self.debug.fetchError);
        });
    },

    sync: function(storage, callback) {
        //check if storage has data
        if (storage.isReady())
            return callback();

        return storage.fetch(callback);
    }
});

module.exports = Controller;