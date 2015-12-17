import { LeagueActions } from '../../actions/LeagueActions';
import { LeagueStore } from '../../stores/LeagueStore';

import React, {	PropTypes, Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import LeagueTable from '../LeagueTable';

class League extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			data: []
		};
		this.updateFromStore();
	}

	updateFromStore = () => {
		let data = LeagueStore.getAll();
		if (data.length == 0) {
			return;
		}
		let table = data[0].table;
		let champion = data[1].table[0].name;
		champion = table.filter(x => x.name === champion)[0];
		champion.rowClass = 'champion';
		this.setState({
			data: table
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
		return (
      <div>
        <Nav bsStyle='tabs' activeKey={this.state.tab} onSelect={this.handleSelect}>
          <NavItem eventKey={1}>Current</NavItem>
          <NavItem eventKey={2}>All Time</NavItem>
        </Nav>
        <LeagueTable data={this.state.data}/>
      </div>
		);
	}
}

export default League;
