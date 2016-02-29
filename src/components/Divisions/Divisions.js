import React, { PropTypes, Component } from 'react';
import { Row, Panel } from 'react-bootstrap';

import LeagueTable from '../LeagueTable';

class Divisions extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let divs = this.props.data.divisions.map(d => {
      return (
        <Row>
          <Panel header={d.name}>
            <LeagueTable data={d.table}/>
          </Panel>
        </Row>
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
