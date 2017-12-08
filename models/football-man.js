class FootballMan {
  constructor () {
    let requestClient = require('node-rest-client').Client

    // HTTP client
    this.client = new requestClient()

    // xml parser
    this.xml = require('node-xml-lite')
  }

  week (week, successCallback) {

    // using our HTTP client, make an async call to nfl.com for a summary of all
    // the games for a given week. use a callback to process the response
    this.client.get(`http://www.nfl.com/ajax/scorestrip?season=2017&seasonType=REG&week=${week}`, (data, response) => {

      // parse the response xml using the node-xml-lite package
      // and send it to the callback
      successCallback(this.xml.parseString(data.toString()))
    })
  }

  games (week, successCallback, errorCallback) {

    // let javascript figure out if the provided "week" param
    // is a valid number or not
    let weekInt = parseInt(week)

    // if the week param is something un-number-y OR
    // doesn't fit into the football weeks range
    // call our error callback and return so nothing else happens
    if (isNaN(weekInt)) {
      errorCallback(400, `'${week}' is not a valid input`)
      return
    } else if (weekInt < 1 || weekInt > 17) {
      errorCallback(400, 'Requested week is out of range [1-17]')
      return
    }

    this.week(weekInt, weekData => {
      // why promises? see a few lines down
      let promises = weekData['childs'][0]['childs'].map( data => {
        let eid = data['attrib']['eid']

        // Promises allow us to execute an asynchronous block of code
        // and then do something with it whenever it finishes
        return new Promise((resolve, reject) => {
          this.client.get(`http://www.nfl.com/liveupdate/game-center/${eid}/${eid}_gtd.json`, (data, response) => {

            // the nfl.com json endpoint might return a 404 (no game)
            // OR a 200 (but no data if the "week" has started but no games have been played")
            // OR a 200 and data
            if (response.statusCode == 200 && data && data[eid]) {
              resolve(data[eid])
            } else {

              // if a promise "rejects" then Promise.all will fail fast (see Promise.all down there a few lines)
              // we don't care if some of these fail since we want to get partial weeks too
              // so, "resolve" but with null
              resolve(null)
            }
          })
        })
      })

      // this .all() method says "take all these promises, and run them all at once,
      // when all promises are resolved then call this callback"
      Promise.all(promises).then( games => {
        // collapse the result array into unique values
        // any week that doesn't have data will be null
        // SO 1 game and the rest nulls (a partial week) will NOT have a unique length of 1
        // neither will a full week
        // the only time that collapsing the result into uniques will have a length of 1
        // is if every item is null, and this means that no game data is available
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
