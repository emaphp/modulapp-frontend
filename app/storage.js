var Marionette = require('marionette');
var UI = require('./ui.js');

var Storage = Marionette.Controller.extend({
    fetch: function() {
        if (typeof(this.data) == 'undefined') {
            this.data = new this.collection();
            UI.showLoader();
            this.data.fetch({
                success: this.success,
                error: this.error
            });
        }

        return this.data;
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