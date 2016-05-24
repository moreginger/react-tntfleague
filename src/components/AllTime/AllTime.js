import React, { PropTypes, Component } from 'react';
import CakeChart from 'cake-chart';

function findParentNode(node, child, parent = null) {
  if (node === child) return parent;
  for (let c of child.children || []) {
    const p = findParentNode(node, c, child);
    if (p) return p;
  }
}

class AllTime extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedNode: this.props.data
    };
  }

  onClick(node) {
    if (node === this.state.selectedNode) {
      /* user clicked on the chart center - rendering parent node */
      this.setState({
        selectedNode: findParentNode(node, this.props.data) || this.props.data
      });
    }
    else {
      this.setState({
        selectedNode: node
      });
    }
  }

  render() {
    return (
      <div>
        <h4>Division 1 winners</h4>
        <CakeChart data={this.state.selectedNode}
                   onClick={this.onClick}
                   coreRadius={200}
                   ringWidth={100}/>
      </div>
    );
  }
}

export default AllTime;
