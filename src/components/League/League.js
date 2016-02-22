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
			divisions: [],
			allTime: {
			}
		};
		this.updateFromStore();
	}

  getDivisions = (season) => {
		let divisions = [];
		season.table.forEach(p => {
			while (p.division > divisions.length) {
				divisions.push({
				  name: 'Division ' + (divisions.length + 1),
					table: []
				});
			}
			let table = divisions[p.division - 1].table;
			p.rank = table.length + 1;
			table.push(p);
		});
		return divisions;
	}

	getTotalWins = (seasons, division) => {
		let divisionSize = seasons[1].table.filter(p => p.division === division).length; // TODO this is naughty
		let allTime = new Map();
		seasons.slice(1).forEach(x => {
			let inDivision = x.table.filter(p => p.division === division);
			if (inDivision.length == divisionSize) {
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
		let divisions = this.getDivisions(seasons[0]);
		let table = seasons[0].table;
		table.forEach(x => {
			 let previous = seasons[1].table.find(y => y.name === x.name)
		   x.previousRank = previous === undefined ? -1 : previous.rank;
		});
	  let allTime = this.getTotalWins(seasons, 1);
		this.setState({
			divisions: divisions,
			allTime: {
				value: allTime.reduce((sum, ele) => sum + ele.wins, 0),
				label: 'CFL',
				children: allTime.map(x => ({
					label: x.name + ' - '+ x.wins,
					value: x.wins,
					children: []
				}))
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
		if (this.state.tab === 1) {
			content = <Divisions data={this.state.divisions}/>;
		}
		else {
			content = <AllTime data={this.state.allTime}/>;
		}
		return (
			<Grid fluid>
			  <Row xs={12} sm={8}>
	        <Nav bsStyle='tabs' activeKey={this.state.tab} onSelect={this.handleSelect}>
	          <NavItem eventKey={1}>Current</NavItem>
	          <NavItem eventKey={2}>All Time</NavItem>
	        </Nav>
					{content}
        </Row>
			</Grid>
		);
	}
}

export default League;
