import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class LeagueTable extends Component {

  constructor(props) {
    super(props);
  }

  trClass(rowData, rowIndex) {
    return rowData.rowClass;
  }

  render() {
    return (
      <BootstrapTable data={this.props.data} striped={true} hover={true} condensed={true} trClassName={this.trClass}>
        <TableHeaderColumn dataField='rank' dataSort={true}>Rank</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort={true} isKey={true}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='points' dataSort={true}>Points</TableHeaderColumn>
        <TableHeaderColumn dataField='difference' dataSort={true}>Goal difference</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default LeagueTable;
