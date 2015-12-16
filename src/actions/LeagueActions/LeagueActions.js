import Reflux from 'reflux';
import * as tntfl from './tntfl-games'
import moment from 'moment';

var actions = Reflux.createActions({
  "load": {
    children: ["completed", "failed"]
  }
});

actions.load.listen(function() {
  var now = moment();
  var start = moment(now).subtract(2, 'months');

  tntfl.getGames(parseInt(start.format('X')), parseInt(now.format('X')), function(data) {
    console.log('something');
  });
  new Promise(function(resolve, reject) {
    resolve([{
      name: 'tmm',
      points: 100
    }, {
      name: 'tlr',
      points: 102
    }]);
  }).then(this.completed).catch(this.failed);
});

export var LeagueActions = actions;
