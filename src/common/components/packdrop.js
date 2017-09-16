import React, { Component } from 'react';

import PackList from '../containers/packlist';
import PackSlot from './packslot';

class PackDrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onDrag: false
    }

    this.changeOnDrag = this.changeOnDrag.bind(this);
  }

  changeOnDrag(bool) {
    this.setState({ onDrag: bool });
  }

  render() {
    return (
      <div className="main-sealed">
        <PackList changeOnDrag={this.changeOnDrag} />
        {!this.state.onDrag ? <div className="pack-drop" /> : null}
        {this.state.onDrag ? <div className="pack-glow"><PackSlot /></div> : null}
      </div>
    );
  }
}

export default PackDrop;