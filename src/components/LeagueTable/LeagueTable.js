import React, { PropTypes, Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function nameFormat(cell, row) {
  if (row.previousRank != -1 && row.previousRank < 4) {
    return cell + ' <i class="fa fa-trophy rank-' + row.previousRank + '"></i>';
  }
  return cell;
}

function winFormat(cell, row) {
  return cell + '%';
}

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
        <TableHeaderColumn dataField='rank' dataSort={true}>#</TableHeaderColumn>
        <TableHeaderColumn dataField='name' dataSort={true} isKey={true} dataFormat={nameFormat}>Team</TableHeaderColumn>
        <TableHeaderColumn dataField='difference' dataSort={true}>GD</TableHeaderColumn>
        <TableHeaderColumn dataField='win' dataSort={true} dataFormat={winFormat}>W</TableHeaderColumn>
        <TableHeaderColumn dataField='points' dataSort={true}>PTS</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default LeagueTable;
