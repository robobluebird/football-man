var express = require('express');
var router = express.Router();

var FootballMan = require('../models/football-man.js')
var Game = require('../models/game.js')

var footballMan = new FootballMan()

router.route('/:week')
  .get(function(request, response, next) {
    footballMan.games(request.params.week, weekData => {
      let games = weekData.map( gameData => {
        return new Game(gameData).toJSON()
      })

      response.json(games)
    }, (errorCode, errorDescription) => {
      var error = new Error(errorDescription);
      error.status = errorCode
      next(error)
    })
  })

module.exports = router;
