import React, { PropTypes, Component } from 'react';

import LeagueTable from '../LeagueTable';

class Divisions extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let divs = this.props.data.map(d => {
      return (
        <div>
          <span>{d.name}</span>
          <LeagueTable data={d.table}/>
        </div>
      );
    });
    {console.log(divs)}
    return (
      <div>
        {divs}
      </div>
    );
  }
}

export default Divisions;
