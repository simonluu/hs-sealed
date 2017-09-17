import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

import { resetCardState, addRevealedCards, resetRevealedCards } from '../actions';
import cardBack from '../../client/images/classic.png';

class CardHolder extends Component {
  handleClick(e, card, cardId, glowId) {
    const doneButton = this.refs["done"];
    document.getElementById(glowId).style.boxShadow = "none";
    document.getElementById(`${e.target.id}`).className += " flipped";

    // sound stuff

    document.getElementById(cardId).style.boxShadow = "none";
    this.props.addRevealedCards();
    if (this.props.revealed === 4) {
      doneButton.style.display = "block";
      doneButton.className += " visible";
      // done sounds
    }
  }

  handleDoneClick() {
    const doneButton = this.refs["done"];
    doneButton.style.display = "none";
    doneButton.className = doneButton.className.replace( /(?:^|\s)visible(?!\S)/g , '' );
    // play done sounds

    const cardList = document.getElementsByClassName("card");
    for (let i = 0; i < 5; i++) {
      cardList[i].className = "card";
    }
    document.getElementById("pack-list").style.pointerEvents = "auto";
    this.props.resetRevealedCards();
    this.props.resetCardState();
  }

  cardHover(rarity, cardId, glowId) {
    const glow = document.getElementById(glowId);
    // const sound = mouse_over.cloneNode(true);

    if (!document.getElementById(cardId.split("card")[1]).classList.contains("flipped")) {
      // sound.volume = .2;
      // sound.play();
      if (rarity === "Rare") {
        glow.style.boxShadow = "0px 0px 100px #0066FF";
      } else if (rarity === "Epic") {
        glow.style.boxShadow = "0px 0px 100px #CC33FF";
      } else if (rarity === "Legendary") {
        glow.style.boxShadow = "0px 0px 100px #FF8000";
      }
    }
  }

  cardHoverOut(cardId, glowId) {
    // const sound = mouse_away.cloneNode(true);
    if (!document.getElementById(cardId.split("card")[1]).classList.contains("flipped")) {
      // sound.volume = .2;
      // sound.play();
    }
    document.getElementById(glowId).style.boxShadow = "none";
  }

  renderCards() {
    const cards = [];
    this.props.cards.map((card, i) => {
      cards.push(
        <div key={i} id={`card${i}`} className="cardContainer"
          onMouseOver={() => {this.cardHover(card.rarity, `card${i}` , `glow${i}`)}}
          onMouseOut={() => {this.cardHoverOut(`card${i}` , `glow${i}`)}}>
          <div className="cardGlow" id={`glow${i}`} />
          <div className="card" id={`${i}`}>
            <Image draggable="false" className="back" src={card.img} width="200px" height="307px" />
            <Image draggable="false" className="front" id={`${i}`} src={cardBack} onClick={(e) => {this.handleClick(e, card, `card${i}`, `glow${i}`)}} width="200px" height="307px" />
          </div>
        </div>
      );
      return null;
    });
    return cards;
  }

  render() {
    return (
      <div className="card-holder">
        {this.renderCards()}
        <div ref="done" className="done" onClick={() => {this.handleDoneClick()}} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { revealed: state.app.revealed };
}

export default connect(mapStateToProps, { resetCardState, addRevealedCards, resetRevealedCards })(CardHolder);