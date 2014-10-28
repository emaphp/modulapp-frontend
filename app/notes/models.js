var Backbone = require('backbone');
var Config = require('../config.js');

var Note = Backbone.Model.extend({
    urlRoot: Config.Notes.endPoint
});

var NoteCollection = Backbone.Collection.extend({
    model: Note,
    url: Config.Notes.endPoint
});

module.exports = {
    Note: Note,
    NoteCollection: NoteCollection
};