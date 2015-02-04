/**
 * ui.js
 * -----
 * Provides visual notifications through backbone.notifier
 */

var Marionette = require('marionette');
var Notifier = require('backbone.notifier');
var Config = require('./config');

var UI = Marionette.Object.extend({
    showFormErrors: function(errors) {
        this.clean();

        var msg = "<strong>Please correct the following errors:</strong>";

        for (error in errors) {
            msg += "<br/>" + errors[error];
        }
        
        var notifier = new Notifier();
        this.notify = notifier.notify({
            message: msg,
            type: 'error',
            position: Config.Notifier.position,
            ms: 5000
        });
    },

    showError: function(err) {
        this.clean();
        var notifier = new Notifier();
        this.notify = notifier.notify({
            message: err,
            type: 'error',
            position: Config.Notifier.position,
            ms: 5000
        });
    },

    showInfo: function(info) {
        this.clean();
        var notifier = new Notifier();
        this.notify = notifier.notify({
            message: info,
            type: 'info',
            position: Config.Notifier.position,
            ms: 3000
        });
    },

    showSuccess: function(success) {
        this.clean();
        var notifier = new Notifier();
        this.notify = notifier.notify({
            message: success,
            type: 'success',
            position: Config.Notifier.position,
            ms: 3000
        });
    },

    showLoader: function(message) {
        this.clean();
        var msg = message || "Loading...";

        var notifier = new Notifier();
        this.notify = notifier.notify({
            message: msg,
            position: 'center',
            fadeInMs: 0,
            fadeOutMs: 0,
            ms: false,
            modal: true,
            loader: true
        });
    },
    
    clean: function() {
        if (this.notify) {
            this.notify.destroy();
            delete this.notify;
        }
    }
});

module.exports = new UI();