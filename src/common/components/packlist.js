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
          <div id="classic" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div id="naxx" className="adventure">
            <div className="pack-counter">0</div>
          </div>
          <div id="gvg" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div id="brm" className="adventure">
            <div className="pack-counter">0</div>
          </div>
          <div id="tgt" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div id="loe" className="adventure">
            <div className="pack-counter">0</div>
          </div>
          <div id="wotog" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div id="karazhan" className="adventure">
            <div className="pack-counter">0</div>
          </div>
          <div id="msg" className="pack">
            <div className="pack-counter">0</div>
          </div>
          <div id="jug" className="pack">
            <div className="pack-counter">0</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PackList;