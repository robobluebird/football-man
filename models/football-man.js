class FootballMan {
  constructor () {
    let requestClient = require('node-rest-client').Client

    this.client = new requestClient()
    this.xml = require('node-xml-lite')
    this.weeks = {}
  }

  week (week, successCallback) {
    if (typeof this.weeks[week] == "undefined" || this.weeks[week] == null) {
      this.client.get(`http://www.nfl.com/ajax/scorestrip?season=2017&seasonType=REG&week=${week}`, (data, response) => {
        this.weeks[week] = this.xml.parseString(data.toString())

        successCallback(this.weeks[week])
      })
    } else {
      successCallback(this.weeks[week])
    }
  }

  games (week, successCallback, errorCallback) {
    let weekInt = parseInt(week)

    if (isNaN(weekInt) || weekInt < 1 || weekInt > 17) {
      errorCallback(400, 'Requested week is out of range [1-17]')
      return
    }

    this.week(weekInt, weekData => {
      let promises = weekData['childs'][0]['childs'].map( data => {
        let eid = data['attrib']['eid']

        return new Promise((resolve, reject) => {
          this.client.get(`http://www.nfl.com/liveupdate/game-center/${eid}/${eid}_gtd.json`, (data, response) => {
            if (response.statusCode == 200 && data) {
              resolve(data[eid])
            } else {
              resolve(null)
            }
          })
        })
      })

      Promise.all(promises).then( games => {
        if ([...new Set(games)].length == 1) {
          errorCallback(404, `No game data available for week ${weekInt}`)
          return
        } else {
          games = games.filter( elem => elem != null )
        }

        successCallback(games)
      }).catch( reason => {
        errorCallback(reason)
      })
    })
  }
}

module.exports = FootballMan
