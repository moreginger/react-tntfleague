import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class LeagueTable extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BootstrapTable data={this.props.data} striped={true} hover={true}>
        <TableHeaderColumn dataField='name' dataSort={true} isKey={true}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='points' dataSort={true}>Points</TableHeaderColumn>
        <TableHeaderColumn dataField='difference' dataSort={true}>Goal difference</TableHeaderColumn>
        <TableHeaderColumn dataField='scored' dataSort={true}>Scored</TableHeaderColumn>
        <TableHeaderColumn dataField='conceded' dataSort={true}>Conceded</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default LeagueTable;
