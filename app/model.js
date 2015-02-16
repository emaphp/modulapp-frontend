/**
 * model.js
 * -------------
 * Base model class
 */

var Backbone = require('backbone');
var BackbonePromised = require('backbone-promised');
var Q = require('q');

var Model = Backbone.Model.extend(
    BackbonePromised(Backbone.Model.prototype, Q.Promise)
);

module.exports = Model;