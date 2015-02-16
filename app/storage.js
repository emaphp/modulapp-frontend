/**
 * storage.js
 * ----------
 * Storage base class
 */

var Marionette = require('marionette');

var Storage = Marionette.Object.extend({
    isReady: function() {
        return typeof(this.data) != 'undefined';
    },

    fetch: function() {
        this.data = new this.collection();
        return this.data.fetch();
    },

    get: function(id) {
        if (this.data) return this.data.get(id);
        return null;
    },

    add: function(model) {
        if (this.data) this.data.add(model);
        return null;
    }
});

module.exports = Storage;