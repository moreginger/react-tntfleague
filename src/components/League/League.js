import { LeagueActions } from '../../actions/LeagueActions';
import { LeagueStore } from '../../stores/LeagueStore';

import React, {	PropTypes, Component } from 'react';
import { Nav, NavItem, Grid, Row } from 'react-bootstrap';
import Divisions from '../Divisions';
import AllTime from '../AllTime';

class League extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			data: null
		};
		this.updateFromStore();
	}

	getTotalWins = (seasons, division) => {
		let allTime = new Map();
		seasons.slice(1).forEach(x => {
			let inDivision = x.table.filter(p => p.division === division);
			if (inDivision.length >= 10) { // Arbitrary. This code should move to the data service.
				let winner = inDivision[0].name;
				let r = allTime.has(winner) ? allTime.get(winner) : { name: winner, wins: 0};
				r.wins += 1;
				r.lastWin = x.date.year * 12 + x.date.month;
				allTime.set(winner, r);
			}
		});
		allTime = Array.from(allTime.values());
		allTime.sort((a, b) => {
			let winsDiff = b.wins - a.wins;
			if (winsDiff !== 0) {
				return winsDiff;
			}
			return b.lastWin - a.lastWin;
		});
		return allTime;
	}

	updateFromStore = () => {
		let seasons = LeagueStore.getAll();
		if (seasons.length == 0) {
			return;
		}
		seasons.reduce((newer, older) => {
			newer.table.forEach(p => {
				// TODO: Good enough for top 3 ranks. Not really correct because of divisions.
				let previous = older.table.findIndex(y => y.name === p.name)
				p.previousRank = previous !== -1 ? previous + 1 : -1;
			});
			return older;
		});

	  let allTime = this.getTotalWins(seasons, 1);
		this.setState({
			data: {
				seasons: seasons,
				allTime: {
					value: allTime.reduce((sum, ele) => sum + ele.wins, 0),
					label: 'CFL',
					children: allTime.map(x => ({
						label: x.name + ' - '+ x.wins,
						value: x.wins,
						children: []
					}))
				}
			}
		});
	}

  onStoreChange = (evt) => {
		this.updateFromStore();
  }

  componentDidMount = () => {
    this.unsubscribe = LeagueStore.listen(this.onStoreChange);
  }

  componentWillUnmount = () => {
  	this.unsubscribe();
  }

  handleSelect = (selectedKey) => {
  	this.setState({
  		tab: selectedKey
  	});
  }

	render = () => {
		var content;
		if (this.state.data === null) {
			content = <span>Loading...</span>
		}
		else if (this.state.tab === 1) {
			content = <Divisions seasons={this.state.data.seasons} />;
		}
		else {
			content = <AllTime data={this.state.data.allTime}/>;
		}
		return (
		  <Row>
        <Nav bsStyle='tabs' activeKey={this.state.tab} onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Table</NavItem>
          <NavItem eventKey={2}>All Time</NavItem>
        </Nav>
				{content}
      </Row>
		);
	}
}

export default League;
