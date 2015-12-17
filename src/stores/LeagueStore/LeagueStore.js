import Reflux from 'reflux';
import { LeagueActions } from '../../actions/LeagueActions';

import moment from 'moment';

var _seasons = [];

var store = Reflux.createStore({
	listenables: LeagueActions,
	onLoadCompleted: function(seasons) {
    _seasons = seasons;
		this.trigger('UPDATE');
	},
	onLoadFailed: function() {
    // Should do something
		console.log('store-loadFailed');
	},
	getAll: function() {
		return _seasons;
	}
});

export var LeagueStore = store;
