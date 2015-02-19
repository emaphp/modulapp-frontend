/**
 * storage.js
 * ----------
 * Storage base class
 */

var Marionette = require('marionette');
var notify = require('backbone.radio').channel('notify');

var Storage = Marionette.Object.extend({
    isReady: function() {
        return typeof(this.data) != 'undefined';
    },

    fetch: function(callback) {
        var self = this;
        this.trigger('before:fetch');
        this.data = new this.collection();
        return this.data.fetch()
        .then(function() {
            self.trigger('fetch:success', this);
        })
        .catch(function(error) {
            self.trigger('fetch:error', error, this);
        })
        .then(callback)
        .then(function() {
            self.trigger('after:fetch', this);  
        });
    },

    get: function(id) {
        return this.data ? this.data.get(id) : null;
    },

    add: function(model) {
        return this.data? this.data.add(model) : null;
    }
});

module.exports = Storage;