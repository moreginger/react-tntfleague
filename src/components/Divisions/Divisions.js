import React, { PropTypes, Component } from 'react';
import { Panel } from 'react-bootstrap';

import LeagueTable from '../LeagueTable';

class Divisions extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let divs = this.props.data.map(d => {
      return (
        <Panel header={d.name}>
          <LeagueTable data={d.table}/>
        </Panel>
      );
    });
    return (
      <div>
        {divs}
      </div>
    );
  }
}

export default Divisions;
