import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function nameFormat(cell, row) {
  if (row.previousRank != -1 && row.previousRank < 4) {
    return cell + ' <i class="fa fa-trophy rank-' + row.previousRank + '"></i>';
  }
  return cell;
}

class LeagueTable extends Component {

  constructor(props) {
    super(props);
  }

  trClass(rowData, rowIndex) {
    return rowData.rowClass;
  }

  nameFormat(cell, row) {
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
  }

  render() {
    return (
      <BootstrapTable data={this.props.data} striped={true} hover={true} condensed={true} trClassName={this.trClass}>
        <TableHeaderColumn dataField='rank' dataSort={true}>Rank</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort={true} isKey={true} dataFormat={nameFormat}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField='points' dataSort={true}>Points</TableHeaderColumn>
        <TableHeaderColumn dataField='difference' dataSort={true}>Goal difference</TableHeaderColumn>
        <TableHeaderColumn dataField='win' dataSort={true}>Win %</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default LeagueTable;
