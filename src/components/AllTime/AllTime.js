import React, { PropTypes, Component } from 'react';
import CakeChart from 'cake-chart';

class AllTime extends Component {

  constructor(props) {
    super(props);
  }

  onClick() {
  }

  render() {
    return (
      <CakeChart data={this.props.data}
                 onClick={this.onClick}
                 coreRadius={120}
                 ringWidth={80}/>
    );
  }
}

export default AllTime;
