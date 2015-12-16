import React from 'react';
import ReactDOM from 'react-dom';
import { LeagueActions } from './actions/LeagueActions';
import League from './components/League';

LeagueActions.load();
ReactDOM.render(<League />, document.getElementById('league'));
