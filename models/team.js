class Team {
  constructor (teamData) {

    // nothing fancy here, just reaching into the dataset
    // we could also use teamData['score']['T'] but that's ugly
    this.score = teamData.score.T
    this.abbreviatedName = teamData.abbr

    // we define a helper function in Team but it should really go
    // inside a prototype extension or something
    // basically we want to take { a: 'b', c: 'd'}
    // and turn it into ['b', 'd']
    // because the dataset we are working with has the key/value format
    this.passers = this.unwindObjects(teamData.stats.passing)

    // once we've "unwound" the passers we sort them by descending and take the first
    // aka the top passer by yards
    this.topPasser = this.passers.sort((a, b) => { b.yds - a.yds })[0]

    this.rushers = this.unwindObjects(teamData.stats.rushing)
    this.topRusher = this.rushers.sort((a, b) => { b.yds - a.yds })[0]

    this.receivers = this.unwindObjects(teamData.stats.receiving)
    this.topReceiver = this.receivers.sort((a, b) => { b.yds - a.yds })[0]

    this.passYards = teamData.stats.team.pyds
    this.rushYards = teamData.stats.team.ryds
  }

  topPasserName () {
    return this.topPasser ? this.topPasser.name : null
  }

  topRusherName () {
    return this.topRusher ? this.topRusher.name : null
  }

  topReceiverName () {
    return this.topReceiver ? this.topReceiver.name : null
  }

  unwindObjects (keyValuePairs) {
    var ary = []

    // javascript lets you iterate over objects and get the "keys", neat
    for (var key in keyValuePairs) {
      ary.push(keyValuePairs[key])
    }

    return ary
  }
}

module.exports = Team
