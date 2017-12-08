var Team = require('./team.js')

class Game {
  constructor (gameData) {
    this.homeTeam = new Team(gameData.home)
    this.awayTeam = new Team(gameData.away)
    this.overtime = gameData.qtr == 'final overtime'
  }

  // I prefer to let objects be able to answer "what do you look like in JSON format?"
  // rather than using a service object to do so (e.g. GameSerializer etc)
  toJSON () {
    return {
      home: {
        score: this.homeTeam.score,
        team_abbrv: this.homeTeam.abbreviatedName,
        top_passer: this.homeTeam.topPasserName(),
        top_receiver: this.homeTeam.topReceiverName(),
        top_rusher: this.homeTeam.topRusherName(),
        yards_passed: this.homeTeam.passYards,
        yards_rushed: this.homeTeam.rushYards
      },
      away: {
        score: this.awayTeam.score,
        team_abbrv: this.awayTeam.abbreviatedName,
        top_passer: this.awayTeam.topPasserName(),
        top_receiver: this.awayTeam.topReceiverName(),
        top_rusher: this.awayTeam.topRusherName(),
        yards_passed: this.awayTeam.passYards,
        yards_rushed: this.awayTeam.rushYards
      },
      overtime: this.overtime
    }
  }
}

module.exports = Game
