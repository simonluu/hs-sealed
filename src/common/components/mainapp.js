import React, { Component } from 'react';

import Topnav from './topnav';

import '../../client/styles/Mainapp.css';

class Mainapp extends Component {
  render() {
    return (
      <div className="main-app">
        <Topnav />
        <div className="sealed-nav">
          <div className="side-nav">
            LeftNav
          </div>
          <div className="sealed-app">
            <div className="main-sealed">
              Middle
            </div>
            <div className="graph-nav">
              BottomNav
            </div>
          </div>
          <div className="draft-nav">
            RightNav
          </div>
        </div>
      </div>
    );
  }
}

export default Mainapp;