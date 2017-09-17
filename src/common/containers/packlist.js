import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setExpansion, subtractCounter, addCounter, retrieveCards } from '../actions';
import { packGrab, packDrop } from '../../client/soundExports';

const packNames = [
  { type: 'basic', name: 'Basic', expansion: 'pack' },
  { type: 'classic', name: 'Classic', expansion: 'pack' },
  { type: 'naxx', name: 'Naxxramas', expansion: 'adventure' },
  { type: 'gvg', name: 'Goblins vs. Gnomes', expansion: 'pack' },
  { type: 'brm', name: 'Blackrock Mountain', expansion: 'adventure' },
  { type: 'tgt', name: 'The Grand Tournament', expansion: 'pack' },
  { type: 'loe', name: 'League of Explorers', expansion: 'adventure' },
  { type: 'wotog', name: 'Whispers of the Old Gods', expansion: 'pack' },
  { type: 'karazhan', name: 'One Night in Karazhan', expansion: 'adventure' },
  { type: 'msg', name: 'Mean Streets of Gadgetzan', expansion: 'pack' },
  { type: 'jug', name: 'Journey to Un\'Goro', expansion: 'pack' },
  { type: 'kft', name: 'Knights of the Frozen Throne', expansion: 'pack' },
];

let setDragTimer;

class PackList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packName: "",
      x_pos: 0,
      y_pos: 0,
    }

    this.onMouseDown = this.onMouseDown.bind(this);
    this.renderPacks = this.renderPacks.bind(this);
  }

  componentDidMount() {
    for (let index in packNames) {
      const displayPack = this.refs[`${packNames[index].type}-pack`];
      if (displayPack !== undefined) {
        let packTop = displayPack.getBoundingClientRect().top;
        let packLeft = displayPack.getBoundingClientRect().left;

        displayPack.addEventListener("mousedown", this.onMouseDown);

        (function(currentThis) {
          window.addEventListener("mouseup", function(e) {
            if (e.target.id === packNames[index].type && e.which === 1) {
              window.removeEventListener("mousemove", currentThis.movePack);

              currentThis.props.changeOnDrag(false);

              const packList = currentThis.refs["pack-list"];
              const clone = currentThis.refs["clone"];

              displayPack.style.display = "block";

              if (parseInt(clone.style.top, 10) > parseInt(currentThis.props.packTop, 10) - 10
                && parseInt(clone.style.left, 10) > parseInt(currentThis.props.packLeft, 10) - 10
                && parseInt(clone.style.top, 10) < parseInt(currentThis.props.packTop, 10) + 10
                && parseInt(clone.style.left, 10) < parseInt(currentThis.props.packLeft, 10) + 10) {
                // packDrop.volume = .3;
                // packDrop.play();

                packList.style.pointerEvents = "none";

                currentThis.props.setExpansion(packNames[index].type);
                currentThis.props.retrieveCards(packNames[index].name);
              } else {
                if (clone) {
                  currentThis.props.addCounter(e.target.id);
                  packList.style.overflowY = "hidden";
                  clone.style.transition = "all 1s ease 0s";
                }
              }

              clone.style.zIndex = "102";
              clone.style.top = packTop + "px";
              clone.style.left = packLeft + "px";

              setDragTimer = setTimeout(() => {
                packList.style.overflowY = "auto";
                clone.style.display = "none";
                currentThis.setState({ packName: "" });
              }, 1000);
            }
          });
        }(this));
      }
    }
  }

  // componentDidUpdate() {

  // }

  componentWillUnmount() {
    for (let pack of packNames) {
      const displayPack = this.refs[`${pack.type}-pack`];

      if (displayPack !== undefined) {
        clearTimeout(setDragTimer);

        displayPack.removeEventListener("mousedown", this.onMouseDown);
      }
    }
  }

  onMouseDown(e) {
    e.preventDefault();
    let draggable = false;
    this.props.packs.map((data) => {
      if (e.target.id === data.type && data.amount > 0) {
        draggable = true;
      }
      return null;
    })
    if (e.which === 1 && draggable) {
      this.props.changeOnDrag(true);
      this.props.subtractCounter(e.target.id);
      const pack = this.refs[`${e.target.id}-pack`];
      const packTop = pack.getBoundingClientRect().top;
      const packLeft = pack.getBoundingClientRect().left;
      pack.style.display = "none";

      const clone = this.refs["clone"];
      clone.style.display = "block";
      clone.style.top = packTop + "px";
      clone.style.left = packLeft + "px";

      // packGrab.volume = .3;
      // packGrab.play();


      this.setState({ packName: pack.id, x_pos: e.clientX - clone.offsetLeft, y_pos: e.clientY - clone.offsetTop });

      clone.style.top = (e.clientY - this.state.y_pos) + "px";
      clone.style.left = (e.clientX - this.state.x_pos) + "px";
      clone.style.zIndex = "103";
      clone.style.transform = "none";
      window.addEventListener("mousemove", this.movePack);
    }
  }

  movePack = (e) => {
    e.preventDefault();
    // console.log(e)
    // if (e.screenX < 110) {
    //   console.log('OUTSIDE')
    // }
    const clone = this.refs["clone"];
    clone.style.transition = "none";
    clone.style.top = (e.clientY - this.state.y_pos) + "px";
    clone.style.left = (e.clientX - this.state.x_pos) + "px";
  }

  renderPacks() {
    const packList = [];
      this.props.packs.map((data) => {
        packList.push(
          <div key={data.type} className="expansion-wrapper">
            <div className="pack-wrapper">
              <div id={data.type} ref={`${data.type}-pack`} className={data.expansion + " pack-drag"}></div>
              <div id={data.type} className={data.expansion + "-next"}></div>
              <div className="pack-counter">{data.amount}</div>
            </div>
            <div className="pack-name">{data.name}</div>
          </div>
        );
        return null;
      });
    return packList;
  }

  render() {
    return (
      <div ref="pack-list" id="pack-list" className="pack-list">
        {this.renderPacks()}
        <div id={this.state.packName} ref="clone" className="clone" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { format: state.app.formatState, packs: state.app.packsState, userId: state.userInfo.userId, draftId: state.userInfo.draftId };
}

export default connect(mapStateToProps, { setExpansion, subtractCounter, addCounter, retrieveCards })(PackList);