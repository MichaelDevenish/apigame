'use strict';


var mongoose = require('mongoose'),
  Game = mongoose.model('Game');

exports.list_test = function(req, res) {
  Game.find({}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};
exports.save_test = function(req, res) {
  var new_game = new Game(req.body);
  new_game.save(function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};
