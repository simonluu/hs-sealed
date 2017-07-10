import React, { Component } from 'react';

class Statistics extends Component {
  render() {
    return (
      <div className="graph-nav">
        <div>Only show if they are drafting</div>
        <div>Show a bar graph of mana curve of drafted cards</div>
        <div>Show a pie graph of hero cards, spell cards, quest cards, minion cards</div>
        <div>Show Social Media stuff on the right side</div>
      </div>
    );
  }
}

export default Statistics;