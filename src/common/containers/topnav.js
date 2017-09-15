import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import * as actions from '../actions';

class Topnav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logOut();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div className="top-nav">
        <div className="title">
          <h1>
            Hearthstone Sealed Simulator
          </h1>
        </div>
        <div className="account">
          <DropdownButton id="account" title={<span><i className="fa fa-cog" aria-hidden="true"></i> Account</span>}>
            <MenuItem eventKey="1" onClick={this.logout}>Log out</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(Topnav));