// this is an Express Router definition, and it allows us
// to add more routes for logically separate contexts
var express = require('express')
var router = express.Router()

// we defined our models in separate files,
// so require them (those files export the defined classes themselves)
// and that gives us the ability to "new up" a Game, etc
var FootballMan = require('../models/football-man.js')
var Game = require('../models/game.js')

// footballMan is an instance of FootballMan, which is a wrapper
// class for handling http requests to nfl.com
// it knows about url and http stuff, and response with javascript
// objects OR http codes and error strings
var footballMan = new FootballMan()

// similar to how we route in app.js, except now we're
// using an instance of Router rather than the app itself
// Router lets us define routes then append them to the overall handler stack
//
// ALSO router let's us treat urls restfully, which is great
// here we only define a GET request for /games/:week
// but we could also call .put, .delete etc
//
// PS notice how we only write '/:week' and not '/games/:week'?
// that's because we apply the games part 
router.route('/:week')
  .get(function(request, response, next) {
    footballMan.games(request.params.week, weekData => {

      // if our footballMan request succeeds, we hit this function
      // which is the success callback
      // in it, we map the response from our http call
      // and new up instances of Game (defined in models/game.js)
      // but just call toJSON() right away since we don't need the model itself
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

// CommonJS syntax for saying "this is what this file provides"
// so when you do a require() in another file the thing that is returned
// is whatever we set exports to
//
// so in this case, the router we just made
module.exports = router;
