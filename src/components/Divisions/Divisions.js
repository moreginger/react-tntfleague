import React, { PropTypes, Component } from 'react';
import { Row, Panel, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import moment from 'moment';

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
        <MenuItem eventKey={index}>{moment({ year: s.date.year, month: s.date.month}).format('YYYY-MM')}</MenuItem>
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
        <ButtonToolbar>
          <DropdownButton bsStyle='default' title='Season' onSelect={this.handleSelect}>
            {opts}
          </DropdownButton>
        </ButtonToolbar>
        {divs}
      </div>
    );
  }
}

export default Divisions;
