/**
 * storage.js
 * ----------
 * Storage base class
 */

var Marionette = require('marionette');
var notify = require('backbone.radio').channel('notify');

var Storage = Marionette.Object.extend({
    errorMessage: 'Failed to load collection',

    initialize: function() {
        //setup event listeners
        this.listenTo(this, 'before:fetch', this.before);
        this.listenTo(this, 'fetch:success', this.success);
        this.listenTo(this, 'fetch:error', this.error);
    },

    before: function() {
        notify.command('show:loader');
    },

    success: function() {
        notify.command('clean');
    },

    error: function() {
        this.data = undefined;
        notify.command('show:error', this.errorMessage);
    },

    isReady: function() {
        return typeof(this.data) != 'undefined';
    },

    fetch: function() {
        this.data = new this.collection();
        return this.data.fetch();
    },

    get: function(id) {
        return this.data ? this.data.get(id) : null;
    },

    add: function(model) {
        return this.data? this.data.add(model) : null;
    }
});

module.exports = Storage;