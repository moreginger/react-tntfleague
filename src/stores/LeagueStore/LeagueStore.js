import Reflux from 'reflux';
import { LeagueActions } from '../../actions/LeagueActions';

import moment from 'moment';

var store = Reflux.createStore({
	listenables: LeagueActions,
	onLoadCompleted: function(games) {
    this.trigger(games);
	},
	onLoadFailed: function() {
    // Should do something
		console.log('store-loadFailed');
	}
});

export var LeagueStore = store;
