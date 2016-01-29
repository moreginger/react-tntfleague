import Reflux from 'reflux';
import * as tntfl from './tntfl-games'

var actions = Reflux.createActions({
  "load": {
    children: ["completed", "failed"]
  }
});

actions.load.listen(function() {
  tntfl.getSeasons(data => {
    this.completed(data);
  }, () => {
    console.log('failed');
  });
});

export var LeagueActions = actions;
