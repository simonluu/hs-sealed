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
      this.setState({ onDrag: bool, packTop: packTop, packLeft: packLeft });
    }
  }

  /* BUG
      there is some bug where if you first log in and drag a pack it gives error
  */

  render() {
    let drop, glow;
    if (this.state.onDrag) {
      drop = "invisible";
      glow = "visible";
    } else {
      drop = "visible";
      glow = "invisible";
    }
    return (
      <div className="main-sealed">
        <PackList packTop={this.state.packTop} packLeft={this.state.packLeft} changeOnDrag={this.changeOnDrag} />
        <div className={drop + " pack-drop"}>{this.props.cards.length === 5 ? <CardHolder cards={this.props.cards} /> : null}</div>
        <div className={glow + " pack-glow"}><div ref="pack-slot" className="pack-slot"></div></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cards: state.app.cardState };
}

export default connect(mapStateToProps)(PackDrop);