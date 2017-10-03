import React, { Component } from 'react';
import { connect } from 'react-redux';

import { subtractCounter, addCounter, retrieveCards } from '../actions';
import { packGrab, packDrop } from '../../client/soundExports';

let setDragTimer;

class PackList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packName: "",
      expansion: "",
      x_pos: 0,
      y_pos: 0,
    }

    this.onMouseDown = this.onMouseDown.bind(this);
    this.renderPacks = this.renderPacks.bind(this);
  }

  componentDidMount() {
    this.props.packs.map((data) => {
      const displayPack = this.refs[`${data.type}-pack`];
      if (displayPack !== undefined) {
        let packTop = displayPack.getBoundingClientRect().top;
        let packLeft = displayPack.getBoundingClientRect().left;

        displayPack.addEventListener("mousedown", this.onMouseDown);

        (function(currentThis) {
          window.addEventListener("mouseup", function(e) {
            if (e.target.id === data.type && data.amount > 0 && e.which === 1) {
              window.removeEventListener("mousemove", currentThis.movePack);

              currentThis.props.changeOnDrag(false);

              const packList = currentThis.refs["pack-list"];
              const clone = currentThis.refs["clone"];

              displayPack.style.display = "block";

              if (clone) {
                if (parseInt(clone.style.top, 10) > parseInt(currentThis.props.packTop, 10) - 50
                  && parseInt(clone.style.left, 10) > parseInt(currentThis.props.packLeft, 10) - 50
                  && parseInt(clone.style.top, 10) < parseInt(currentThis.props.packTop, 10) + 50
                  && parseInt(clone.style.left, 10) < parseInt(currentThis.props.packLeft, 10) + 50) {
                  // packDrop.volume = .3;
                  // packDrop.play();

                  packList.style.pointerEvents = "none";

                  currentThis.props.retrieveCards(data.type, data.name);
                } else {
                  currentThis.props.packs.map((data) => {
                    if (data.type === e.target.id && data.amount > 0) {
                      currentThis.props.addCounter(e.target.id);
                      packList.style.overflowY = "hidden";
                      clone.style.transition = "all 1s ease 0s";
                    }
                  });
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
            }
          });
        }(this));
      }
      return null;
    });
  }

  // componentDidUpdate() {

  // }

  componentWillUnmount() {
    this.props.packs.map((data) => {
      const displayPack = this.refs[`${data.type}-pack`];

      if (displayPack !== undefined) {
        clearTimeout(setDragTimer);

        displayPack.removeEventListener("mousedown", this.onMouseDown);
      }
    });
  }

  onMouseDown(e) {
    e.preventDefault();
    let draggable = false;
    this.props.packs.map((data) => {
      if (e.target.id === data.type && data.amount > 0) {
        draggable = true;
      }
      return null;
    });
    if (e.which === 1 && draggable) {
      this.props.changeOnDrag(true);
      this.props.subtractCounter(e.target.id);
      const pack = this.refs[`${e.target.id}-pack`];
      const packTop = pack.getBoundingClientRect().top;
      const packLeft = pack.getBoundingClientRect().left;
      // pack.style.display = "none";

      const clone = this.refs["clone"];
      clone.style.display = "block";
      clone.style.top = packTop + "px";
      clone.style.left = packLeft + "px";

      // packGrab.volume = .3;
      // packGrab.play();


      this.setState({ packName: pack.id, expansion: e.target.classList[0] + "-next ", x_pos: e.clientX - clone.offsetLeft, y_pos: e.clientY - clone.offsetTop });

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
        <div id={this.state.packName} ref="clone" className={this.state.expansion + "clone"} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { format: state.app.formatState, packs: state.app.packsState, userId: state.userInfo.userId, draftId: state.userInfo.draftId };
}

export default connect(mapStateToProps, { subtractCounter, addCounter, retrieveCards })(PackList);