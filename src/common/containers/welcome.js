import React, { Component } from 'react';
import { connect } from 'react-redux';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome-sealed">
        <h2>Welcome to the Hearthstone Sealed Simulator!</h2>
        {this.props.drafts.length > 0
          ? <div>Check out your Drafts on the right nav, or create a new Draft.</div>
          : <div>You have no drafts, click New Draft at the top right to create a new Draft.</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { drafts: state.userInfo.drafts };
}

export default connect(mapStateToProps)(Welcome);