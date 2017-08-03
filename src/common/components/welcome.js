import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome-sealed">
        <h2>Welcome to the Hearthstone Sealed Simulator!</h2>
        <div>You have no drafts, click New Draft at the top right to create a new draft.</div>
      </div>
    );
  }
}

export default Welcome;

        // <div>When you selected a draft in process</div>
        // <div>Should go to where the draft left off. i.e opening packs, listing all cards drafted</div>
        // <div>When you just clicked New Draft</div>
        // <div>Checkbox for Standard/Wild</div>
        // <div>Checkbox for certain expansions</div>
        // <button>Start Draft</button>