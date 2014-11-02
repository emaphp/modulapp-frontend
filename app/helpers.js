var Handlebars = require('handlebars-template-loader').Handlebars;

Handlebars.registerHelper('contact-name', function() {
    var fullname = this.name;

    if (this.surname) {
        fullname += ' ' + this.surname;
    }

    var link = '<a href="#contacts/detail/'
    + this.id
    + '">'
    + fullname
    + '</a>';

    return new Handlebars.SafeString(link);
});

Handlebars.registerHelper('contact-twitter', function() {
    if (this.twitter) {
        return '@' + this.twitter;
    }

    return '';
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