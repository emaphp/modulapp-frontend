modulapp-frontend
=================

A modular app made with MarionetteJS and Webpack

<br/>
###About

Modulapp is a modular demo app made with [MarionetteJS](http://marionettejs.com/ "") using [Webpack](http://webpack.github.io/ ""). It features a small application for managing personal notes and contacts using a modular structure. Modulapp is implemented using the following list of libraries:

 * **Frameworks**
  * [JQuery](http://jquery.com/ "")
  * [Backbone](http://backbonejs.org/ "")
  * [MarionetteJS](http://marionettejs.com/ "")
  * [Underscore](http://underscorejs.org/ "")
  * [Backbone.Validation](https://github.com/thedersen/backbone.validation "")

<br/>
 * **Addons**
  * [Font-Awesome](http://fortawesome.github.io/Font-Awesome/ "")
  * [Handlebars](http://handlebarsjs.com/ "")
  * [Backbone.Notifier](https://github.com/emaphp/backbone.notifier "") (fork)

<br/>
 * **Loaders**
  * [url-loader](https://github.com/webpack/url-loader "")
  * [file-loader](https://github.com/webpack/file-loader "")
  * [css-loader](https://github.com/webpack/css-loader "")
  * [style-loader](https://github.com/webpack/style-loader "")
  * [font-awesome-webpack](https://github.com/gowravshekar/font-awesome-webpack "")
  * [underscore-template-loader](https://github.com/emaphp/underscore-template-loader "")
  * [handlebars-template-loader](https://github.com/emaphp/handlebars-template-loader "")

<br/>
Modulapp requires a backend in order to work. Check the [Backends](#Backends "") section for a list of available backends.

<br/>
###Installation

You'll need both **npm** and **webpack** installed in your system.

<br/>
**Installing dependencies**

```bash
$ npm install
```

**Compiling**

```bash
$ webpack
```

<br/>
###Configuration

You need to edit the configuration file *app/config.js* and set the appropiate end points for your current backend. The default configuration is the following:

```javascript
module.exports = {
    //notes config
    Notes: {
        endPoint: 'http://modulapp.dev/notes'
    },

    //contacts config
    Contacts: {
        endPoint: 'http://modulapp.dev/contacts'
    }
};
```

<br/>
###Backends

<br/>
* **PHP**
 * https://github.com/emaphp/modulapp-backend-php [Slim]

<br/>
###Forks

 * *None yet!*

<br/>
###License

Licensed under the Apache License, Version 2.0.