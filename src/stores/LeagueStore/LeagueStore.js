import Reflux from 'reflux';
import { LeagueActions } from '../../actions/LeagueActions';

var store = Reflux.createStore({
	listenables: LeagueActions,
	onLoad: function() {
		console.log('store-load');
	},
	onLoadCompleted: function(stuff) {
		console.log('store-loadCompleted')
    this.trigger(stuff);
	},
	onLoadFailed: function() {
		console.log('store-loadFailed');
	}
});

export var LeagueStore = store;
