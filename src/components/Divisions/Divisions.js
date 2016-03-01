import React, { PropTypes, Component } from 'react';
import { Row, Panel, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

import LeagueTable from '../LeagueTable';

class Divisions extends Component {

  constructor(props) {
    super(props);
    this.state = {
			divisions: this.getDivisions(props.seasons[0])
		};
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

  handleSelect = (evt, index) => {
    this.setState({
      divisions: this.getDivisions(this.props.seasons[index])
    });
  }

  render = () => {
    let opts = this.props.seasons.map((s, index) => {
      return (
        <MenuItem eventKey={index}>{s.date.month + '-' + s.date.year}</MenuItem>
      );
    });
    let divs = this.state.divisions.map(d => {
      return (
        <Panel header={d.name}>
          <LeagueTable data={d.table}/>
        </Panel>
      );
    });
    return (
      <div>
        <Panel>
          <ButtonToolbar>
            <DropdownButton bsStyle='primary' title='Season' onSelect={this.handleSelect}>
              {opts}
            </DropdownButton>
          </ButtonToolbar>
        </Panel>
        {divs}
      </div>
    );
  }
}

export default Divisions;
