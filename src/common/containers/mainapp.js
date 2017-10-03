import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topnav from './topnav';
import DraftList from './draftlist';
import Welcome from './welcome';
import DraftSettings from './draftsettings';
import PackDrop from './packdrop';
import Statistics from './statistics';

import '../../client/styles/Mainapp.css';

class Mainapp extends Component {
  componentDidUpdate() {
    if (this.props.app.draftState !== "decking") {
      let packs = [];
      this.props.app.packsState.map((data) => {
        if (data.amount === 0) {
          packs.push(true);
        }
        return null;
      });
      if (packs.length === this.props.app.packsState.length && packs.length !== 0) {
        // call draftState change
        // this.props.updateDraftState()
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
            {this.props.app.draftState === "drafting" ? <Statistics /> : null}
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