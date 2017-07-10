import React, { Component } from 'react';

class PackList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="side-nav">
        <div className="pack-list">
          <div id="basic" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">Basic</div>
          <div id="classic" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">Classic</div>
          <div id="naxx" className="adventure">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">Naxxramas</div>
          <div id="gvg" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">Goblins vs. Gnomes</div>
          <div id="brm" className="adventure">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">Blackrock Mountain</div>
          <div id="tgt" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">The Grand Tournament</div>
          <div id="loe" className="adventure">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">League of Explorers</div>
          <div id="wotog" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">Whispers of the Old Gods</div>
          <div id="karazhan" className="adventure">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">One Night in Karazhan</div>
          <div id="msg" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">Mean Streets of Gadgetzan</div>
          <div id="jug" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div className="pack-name">Journey to Un'Goro</div>
        </div>
      </div>
    );
  }
}

export default PackList;