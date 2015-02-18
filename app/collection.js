/**
 * collection.js
 * -------------
 * Base collection class
 */

var Backbone = require('backbone');
var BackbonePromised = require('backbone-promised');
var Q = require('q');

//append BackbonePromised to regular collections
//fetch() will return a Q.Promise object
var Collection = Backbone.Collection.extend(
    BackbonePromised(Backbone.Collection.prototype, Q.Promise)
);

module.exports = Collection;