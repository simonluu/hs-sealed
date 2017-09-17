import React, { Component } from 'react';
import { connect } from 'react-redux';

import PackList from '../containers/packlist';
import CardHolder from './cardholder';

class PackDrop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onDrag: false,
      packTop: "",
      packLeft: ""
    }

    this.changeOnDrag = this.changeOnDrag.bind(this);
  }

  changeOnDrag(bool) {
    const packSlot = this.refs["pack-slot"];
    if (packSlot !== undefined) {
      const packTop = packSlot.getBoundingClientRect().top;
      const packLeft = packSlot.getBoundingClientRect().left;
      this.setState({ packTop: packTop, packLeft: packLeft });
    }
    this.setState({ onDrag: bool });
  }

  /* BUG
      there is some bug where if you first log in and drag a pack it gives error
  */

  render() {
    return (
      <div className="main-sealed">
        {this.state.packTop === "" ? <PackList changeOnDrag={this.changeOnDrag} /> : <PackList packTop={this.state.packTop} packLeft={this.state.packLeft} changeOnDrag={this.changeOnDrag} />}
        {!this.state.onDrag ? <div className="pack-drop">{this.props.cards.length === 5 ? <CardHolder cards={this.props.cards} /> : null}</div> : null}
        {this.state.onDrag ? <div className="pack-glow"><div ref="pack-slot" className="pack-slot"></div></div> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cards: state.app.cardState };
}

export default connect(mapStateToProps)(PackDrop);