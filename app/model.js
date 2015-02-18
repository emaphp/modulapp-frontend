/**
 * model.js
 * -------------
 * Base model class
 */

var Backbone = require('backbone');
var BackbonePromised = require('backbone-promised');
var Q = require('q');

//appends BackbonePromised to existing Model
//fetch(), save(), destroy() will return a Q.Promise object
var Model = Backbone.Model.extend(
    BackbonePromised(Backbone.Model.prototype, Q.Promise)
);

module.exports = Model;