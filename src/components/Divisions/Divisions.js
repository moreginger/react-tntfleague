import React, { PropTypes, Component } from 'react';
import { Row, Panel, ButtonToolbar, DropdownButton, MenuItem, Jumbotron } from 'react-bootstrap';
import moment from 'moment';

import LeagueTable from '../LeagueTable';

class Divisions extends Component {

  constructor(props) {
    super(props);
    var season = props.seasons[0];
    var isCurrent = season.date.month === moment().get('month') && season.date.year === moment().get('year');
    this.state = {
			divisions: isCurrent ? this.getDivisions(season) : []
		};
  }

  getDivisions(season) {
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

  handleSelect(index) {
    this.setState({
      divisions: this.getDivisions(this.props.seasons[index])
    });
  }

  render() {
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
          <DropdownButton bsStyle='default' title='Season' onSelect={(index) => this.handleSelect(index)}>
            {opts}
          </DropdownButton>
        </ButtonToolbar>
        {divs}
        {divs.length === 0 && <Jumbotron>
                                <h1>Oh no!</h1>
                                <p>There are no games this month yet. Do something about it :)</p>
                              </Jumbotron>}
      </div>
    );
  }
}

export default Divisions;
