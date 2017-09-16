import React, { Component } from 'react';
import { connect } from 'react-redux';

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

              if (true) {
                // grab cards
                packDrop.volume = .3;
                packDrop.play();
              } else {
                if (clone) {
                  packList.style.overflowY = "hidden";
                  clone.style.transition = "all 1s ease 0s";
                  setDragTimer = setTimeout(() => {
                    packList.style.overflowY = "auto";
                    clone.style.display = "none";
                    currentThis.setState({ packName: "" });
                  }, 1000)
                }
              }

              clone.style.zIndex = "102";
              clone.style.top = packTop + "px";
              clone.style.left = packLeft + "px";
            }
          });
        }(this));
      }
    }
  }

  // componentDidUpdate() {
  //   const packList = this.refs["pack-list"];
  //   if (packList.scrollTop > 0) {
  //     for (let index in packNames) {
  //       const displayPack = this.refs[`${packNames[index].type}-pack`];
  //       if (displayPack !== undefined) {
  //         let packTop = displayPack.getBoundingClientRect().top + packList.scrollTop;
  //         let packLeft = displayPack.getBoundingClientRect().left;
  //         console.log(displayPack.getBoundingClientRect().top, packList.scrollTop)

  //         displayPack.addEventListener("mousedown", this.onMouseDown);

  //         (function(currentPack) {
  //           window.addEventListener("mouseup", function(e) {
  //             if (e.target.id === packNames[index].type && e.which === 1) {
  //               window.removeEventListener("mousemove", currentPack.movePack);

  //               displayPack.style.display = "block";

  //               const clone = currentPack.refs["clone"];

  //               if (clone) {
  //                 packList.style.overflowY = "hidden";
  //                 clone.style.zIndex = "102";
  //                 clone.style.top = packTop + "px";
  //                 clone.style.left = packLeft + "px";
  //                 clone.style.transition = "all 1s ease 0s";
  //                 setDragTimer = setTimeout(() => {
  //                   packList.style.overflowY = "auto";
  //                   clone.style.display = "none";
  //                   currentPack.setState({ packName: "" });
  //                 }, 1000)
  //               }
  //             }
  //           });
  //         }(this));
  //       }
  //     }
  //   }
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
    if (e.which === 1) {
      this.props.changeOnDrag(true);
      const pack = this.refs[`${e.target.id}-pack`];
      const packTop = pack.getBoundingClientRect().top;
      const packLeft = pack.getBoundingClientRect().left;
      pack.style.display = "none";

      const clone = this.refs["clone"];
      clone.style.display = "block";
      clone.style.top = packTop + "px";
      clone.style.left = packLeft + "px";

      packGrab.volume = .3;
      packGrab.play();


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

  // componentDidUpdate() {
  //   console.log('classic? update', this.refs["classic-pack"]);
  // }

  // componentDidMount() {
  //   const pack = ReactDOM.findDOMNode(this.refs.pack);
  //   const pack_hole = ReactDOM.findDOMNode(this.refs.pack_hole);
  //   const background = ReactDOM.findDOMNode(this.refs.background);

  //   pack_hole.style.top = "260px";
  //   pack_hole.style.left = "707px";

  //   pack.addEventListener('mouseover', this.onMouseOver);
  //   pack.addEventListener('mouseout', this.onMouseOut);

  //   pack.addEventListener('mousedown', this.onMouseDown);

  //   window.addEventListener('mouseup', () => {
  //     window.removeEventListener('mousemove', this.movePack);
  //     background.style.opacity = 1;
  //     if (parseInt(pack.style.top) > parseInt(pack_hole.style.top) - 10
  //       && parseInt(pack.style.left) > parseInt(pack_hole.style.top) - 10
  //       && parseInt(pack.style.top) < parseInt(pack_hole.style.top) + 10
  //       && parseInt(pack.style.left) < parseInt(pack.style.left) + 10) {
  //       this.props.fetchCardInformation(ReactDOM.findDOMNode(this.refs.select).value);
  //       pack.style.pointerEvents = "none";
  //       // play the pack opening video
  //       ReactDOM.findDOMNode(this.refs.pack_open).style.display = 'block';
  //       this.refs.pack_open.play();
  //       window.setTimeout(this.setVisible, 5000);
  //     } else {
  //       // play unselecting pack video
  //       pack.style.transition = "all 1s ease 0s";
  //     }
  //     pack.style.top = "247px";
  //     pack.style.left = "200px";
  //   });
  // }

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
      <div ref="pack-list" className="pack-list">
        {this.renderPacks()}
        <div id={this.state.packName} ref="clone" className="clone" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { format: state.app.formatState, packs: state.app.packsState };
}

export default connect(mapStateToProps)(PackList);