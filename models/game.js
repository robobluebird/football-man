var Team = require('./team.js')

class Game {
  constructor (gameData) {
    this.homeTeam = new Team(gameData.home)
    this.awayTeam = new Team(gameData.away)
    this.overtime = gameData.qtr == 'final overtime'
  }

  finalScore () {
    return `${this.homeTeam.abbreviatedName} ${this.homeTeam.score} - ${this.awayTeam.abbreviatedName} ${this.awayTeam.score}`
  }

  toJSON () {
    return {
      home: {
        score: this.homeTeam.score,
        team_abbrv: this.homeTeam.abbreviatedName,
        top_passer: this.homeTeam.topPasser.name,
        top_receiver: this.homeTeam.topReceiver.name,
        top_rusher: this.homeTeam.topRusher.name,
        yards_passed: this.homeTeam.passYards,
        yards_rushed: this.homeTeam.rushYards
      },
      away: {
        score: this.awayTeam.score,
        team_abbrv: this.awayTeam.abbreviatedName,
        top_passer: this.awayTeam.topPasser.name,
        top_receiver: this.awayTeam.topReceiver.name,
        top_rusher: this.awayTeam.topRusher.name,
        yards_passed: this.awayTeam.passYards,
        yards_rushed: this.awayTeam.rushYards
      },
      overtime: this.overtime,
      finalScore: this.finalScore()
    }
  }
}

module.exports = Game
