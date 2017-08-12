'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var GameSchema = new Schema({
  key: {
    type: String,
    Required: 'Key required'
  },
  player: {
    type: String,
    Required: "Player Required"
  },
  rooms: {
    type: String
  }
});

module.exports = mongoose.model('Game', GameSchema);
