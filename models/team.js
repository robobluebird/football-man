class Team {
  constructor (teamData) {
    this.score = teamData.score.T
    this.abbreviatedName = teamData.abbr

    this.passers = this.unwindObjects(teamData.stats.passing)
    this.topPasser = this.passers.sort((a, b) => { b.yds - a.yds })[0]

    this.rushers = this.unwindObjects(teamData.stats.rushing)
    this.topRusher = this.rushers.sort((a, b) => { b.yds - a.yds })[0]

    this.receivers = this.unwindObjects(teamData.stats.receiving)
    this.topReceiver = this.receivers.sort((a, b) => { b.yds - a.yds })[0]

    this.passYards = teamData.stats.team.pyds
    this.rushYards = teamData.stats.team.ryds
  }

  unwindObjects (keyValuePairs) {
    var ary = []

    for (var key in keyValuePairs) {
      ary.push(keyValuePairs[key])
    }

    return ary
  }
}

module.exports = Team
