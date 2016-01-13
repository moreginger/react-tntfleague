import { LeagueActions } from '../../actions/LeagueActions';
import { LeagueStore } from '../../stores/LeagueStore';

import React, {	PropTypes, Component } from 'react';
import { Nav, NavItem, Grid, Row } from 'react-bootstrap';
import LeagueTable from '../LeagueTable';
import AllTime from '../AllTime';

class League extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			table: [],
			allTime: {
			}
		};
		this.updateFromStore();
	}

	updateFromStore = () => {
		let seasons = LeagueStore.getAll();
		if (seasons.length == 0) {
			return;
		}
		let table = seasons[0].table;
		table.forEach(x => {
			 let previous = seasons[1].table.find(y => y.name === x.name)
		   x.previousRank = previous === undefined ? -1 : previous.rank;
		});

		let allTime = new Map();
    seasons.slice(1).map(x => x.table[0].name).forEach(x => allTime.set(x, (allTime.has(x) ? allTime.get(x) + 1 : 1)));
		allTime = Array.from(allTime.entries()).map(x => ({
			label: x[0] + ' - '+ x[1],
			value: x[1],
			children: []
		}));
		allTime.sort((a, b) => b.value - a.value);
		allTime = {
			value: allTime.reduce((sum, ele) => sum + ele.value, 0),
			label: 'CFL',
			children: allTime
		};

		this.setState({
			table: table,
			allTime: allTime
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
			content = <LeagueTable data={this.state.table}/>;
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
