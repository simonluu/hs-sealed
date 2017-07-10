import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="main-sealed">
        <div>When you have no drafts and/or just created new User</div>
        <div>Should be blank</div>
        <div>When you selected a draft in process</div>
        <div>Should go to where the draft left off. i.e opening packs, listing all cards drafted</div>
        <div>When you just clicked New Draft</div>
        <div>Checkbox for Standard/Wild</div>
        <div>Checkbox for certain expansions</div>
        <button>Start Draft</button>
      </div>
    );
  }
}

export default Welcome;