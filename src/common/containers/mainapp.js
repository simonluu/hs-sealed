import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topnav from './topnav';
import DraftList from './draftlist';
import Welcome from './welcome';
import DraftSettings from './draftsettings';
import PackDrop from '../components/packdrop';
import Statistics from '../components/statistics';

import '../../client/styles/Mainapp.css';

class Mainapp extends Component {
  componentDidUpdate() {
    if (this.props.app.draftState !== "decking") {
      let packs = false;
      this.props.app.packsState.map((data) => {
        if (data.amount === 0) {
          packs = true;
        } else {
          packs = false;
        }
        return null;
      });
      if (packs) {
        // call draftState change
        console.log('change draftState')
      }
    }
  }

  render() {
    let centerApp;
    if (this.props.app.draftState === "drafting") {
      centerApp = <PackDrop />;
    } else if (this.props.app.draftState === "pre-draft") {
      centerApp = <DraftSettings />;
    } else {
      centerApp = <Welcome />;
    }
    return (
      <div className="main-app">
        <Topnav />
        <div className="sealed-app">
          <div className="sealed-main">
            {centerApp}
            <Statistics />
          </div>
          <DraftList />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { app: state.app };
}

export default connect(mapStateToProps)(Mainapp);