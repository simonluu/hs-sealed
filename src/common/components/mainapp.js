import React, { Component } from 'react';

import Topnav from './topnav';
import Draft from './draft';
import Welcome from './welcome';
import DraftSettings from './draftsettings';
import PackDrop from './packdrop';
import PackList from './packlist';
import Statistics from './statistics';

import '../../client/styles/Mainapp.css';

class Mainapp extends Component {
  render() {
    return (
      <div className="main-app">
        <Topnav />
        <div className="sealed-nav">
          <PackList />
          <div className="sealed-app">
            <div className="main-sealed">
              <PackDrop />
            </div>
            <Statistics />
          </div>
          <Draft />
        </div>
      </div>
    );
  }
}

export default Mainapp;