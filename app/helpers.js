/**
 * helpers.js
 * ----------
 * Additional helpers for Handlebars and Backbone.Validation
 */
var Handlebars = require('handlebars-template-loader').Handlebars;

Handlebars.registerHelper('contact-name', function() {
    var fullname = this.name;

    if (this.surname) {
        fullname += ' ' + this.surname;
    }

    var link = '<a href="#contacts/detail/' + this.id + '">' + fullname + '</a>';
    return new Handlebars.SafeString(link);
});

Handlebars.registerHelper('contact-twitter', function() {
    if (this.twitter) {
        return '@' + this.twitter;
    }

    return '-';
});

Handlebars.registerHelper('contact-phone', function() {
    if (this.phone) {
        return this.phone;
    }

    return new Handlebars.SafeString('<em>???</em>');
});

Handlebars.registerHelper('contact-email', function() {
    if (this.email) {
        return this.email;
    }

   return new Handlebars.SafeString('<em>???</em>'); 
});

Handlebars.registerHelper('contact-meta', function() {
    var output = '';

    if (this.email) {
        output += '<i class="fa fa-envelope"></i>';
    }

    if (this.twitter) {
        output += '<i class="fa fa-twitter"></i>';
    }

    if  (this.phone) {
        output += '<i class="fa fa-phone"></i>';
    }

    return new Handlebars.SafeString(output);
});

//validation callbacks
var _ = require('underscore');
var Validation = require('backbone-validation');
_.extend(Validation.callbacks, {
    valid: function(view, attr, selector) {
        var select = "[" + selector + "='" + attr + "']";
        view.$el.find(select).removeClass('invalid');
    },
    invalid: function(view, attr, error, selector) {
        var select = "[" + selector + "='" + attr + "']";
        view.$el.find(select).addClass('invalid');
    }
});