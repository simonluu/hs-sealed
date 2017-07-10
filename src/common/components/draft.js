import React, { Component } from 'react';

class Draft extends Component {
  render() {
    return (
      <div className="draft-nav">
        <button>Back button</button>
        <button>New Draft</button>
        <div>List of drafts</div>
        <div>Current draft</div>
      </div>
    );
  }
}

export default Draft;