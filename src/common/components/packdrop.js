import React, { Component } from 'react';

import PackList from '../containers/packlist';
import PackSlot from './packslot';

class PackDrop extends Component {
  render() {
    return (
      <div className="main-sealed">
        <PackList />
        <div className="pack-drop">
          <PackSlot />
        </div>
        {false ? <div className="pack-glow"></div> : null}
      </div>
    );
  }
}

export default PackDrop;