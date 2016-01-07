import Reflux from 'reflux';
import * as tntfl from './tntfl-games'
import moment from 'moment';
require('babel-polyfill');

var actions = Reflux.createActions({
  "load": {
    children: ["completed", "failed"]
  }
});

function points(score) {
  return score === 0 ? 1 : score > 0 ? 3 : 0;
}

function games(json) {
  let result = json.map(g => {
    let date = moment.unix(g.date);
    let month = date.get('month');
    let year = date.get('year');
    let score = Math.sign(g.blue.score - g.red.score);
    return {
      date: date,
      players: [
        {
          name: g.blue.name,
          goals: {
            scored: g.blue.score,
            conceded: g.red.score
          },
          points: points(score)
        },
        {
          name: g.red.name,
          goals: {
            scored: g.red.score,
            conceded: g.blue.score
          },
          points: points(-score)
        },
      ]
    }
  });
  result.reverse();
  return result;
}

function season(month, playerMap) {
  let table = Array.from(playerMap.entries());
  table = table.map(x => ({
    name: x[0],
    points: x[1].points,
    difference: x[1].goals.scored - x[1].goals.conceded,
    scored: x[1].goals.scored,
    conceded: x[1].goals.conceded,
    win: Math.round(x[1].games.won / x[1].games.played * 100)
  }));
  table.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.difference - a.difference;
  });
  for (let i = 0; i < table.length; i++) {
    table[i].rank = i + 1;
  }
  return {
    month: month,
    table: table
  };
}

function* seasons(json) {
  let current_month = -1;
  let players = new Map();
  for (let x of games(json)) {
    let month = x.date.get('month');
    if (current_month === -1) {
      current_month = month;
    }
    else if (current_month !== month) {
      yield season(current_month, players);
      current_month = month;
      players = new Map();
    }
    x.players.forEach(y => {
      if (!players.has(y.name)) {
        players.set(y.name, {
          points: 0,
          games: {
            played: 0,
            won: 0
          },
          goals: {
            scored: 0,
            conceded: 0
          }
        });
      }
      let stats = players.get(y.name)
      stats.points += y.points;
      stats.games.played += 1;
      stats.games.won += y.goals.scored > y.goals.conceded ? 1 : 0;
      stats.goals.scored += y.goals.scored;
      stats.goals.conceded += y.goals.conceded;
    });
  }
  yield season(current_month, players);
}

actions.load.listen(function() {
  var now = moment();
  var start = moment(now).subtract(2, 'months');
  tntfl.getGames(data => {
    this.completed(Array.from(seasons(data)));
  }, () => {
    console.log('failed');
  }, 0, parseInt(now.format('X')));
});

export var LeagueActions = actions;
