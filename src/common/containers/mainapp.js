import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topnav from './topnav';
import DraftList from './draftlist';
import Welcome from './welcome';
import DraftSettings from './draftsettings';
import PackDrop from '../components/packdrop';
import PackList from './packlist';
import Statistics from '../components/statistics';

import '../../client/styles/Mainapp.css';

class Mainapp extends Component {
  constructor(props) {
    super(props);
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