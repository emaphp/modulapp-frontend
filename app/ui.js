/**
 * ui.js
 * -----
 * Provides visual notifications through backbone.notifier
 */

var Marionette = require('marionette');
var Notifier = require('backbone.notifier');
var Radio = require('backbone.radio');
var Config = require('./config');

var UI = Marionette.Object.extend({
    initialize: function() {
        Radio.channel('notify').comply('show:success', function(message) {
            this.showSuccess(message);
        }, this);

        Radio.channel('notify').comply('show:error', function(message) {
            this.showError(message);
        }, this);

        Radio.channel('notify').comply('validation:error', function(errors) {
            this.showFormErrors(errors);
        }, this);

        Radio.channel('notify').comply('show:loader', function(message) {
            this.showLoader(message);
        }, this);

        Radio.channel('notify').comply('clean', function(keepLoader) {
            this.clean(keepLoader);
        }, this);
    },

    showFormErrors: function(errors) {
        this.clean();

        var msg = "<strong>Please correct the following errors:</strong>";

        for (var error in errors) {
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
    
    clean: function(keepLoader) {
        if (this.notify) {
            if (keepLoader && this.notify.settings.loader)
                return;
            this.notify.destroy();
        }
    }
});

module.exports = UI;