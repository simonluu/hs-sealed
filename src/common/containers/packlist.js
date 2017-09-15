import React, { Component } from 'react';
import { connect } from 'react-redux';

import Pack from '../components/pack';

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

class PackList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x_pos: 0,
      y_pos: 0,
    }

    this.onMouseDown = this.onMouseDown.bind(this);
    this.renderPacks = this.renderPacks.bind(this);
  }

  componentDidMount() {
    console.log(this.refs)
    const pack = this.refs["classic-pack"];
    pack.draggable()
    // $(`#${pack.id}`).draggable()

    // console.log(pack.style)

    pack.addEventListener("mousedown", this.onMouseDown);

    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", this.movePack);

      pack.style.zIndex = "102";
      pack.style.top = "0px";
      pack.style.left = "0px";
      pack.style.transition = "all 1s ease 0s";
      // pack.style.position = "relative";
    });
  }

  componentWillUnmount() {
    const pack = this.refs["classic-pack"];

    pack.removeEventListener("mousedown", this.onMouseDown);
  }

  onMouseDown(e) {
    e.preventDefault();
    const pack = this.refs["classic-pack"];
    // const background = ReactDOM.findDOMNode(this.refs.background);
    // background.style.opacity = 0;
    // pack_grab.volume = .3;
    // pack_grab.play();
    this.setState({ x_pos: e.clientX - pack.offsetLeft, y_pos: e.clientY - pack.offsetTop });
    // pack.style.position = "fixed";
    pack.style.top = (e.clientY - this.state.y_pos) + "px";
    pack.style.left = (e.clientX - this.state.x_pos) + "px";
    pack.style.zIndex = "103";
    pack.style.transform = "none";
    window.addEventListener("mousemove", this.movePack);
  }

  movePack = (e) => {
    e.preventDefault();
    const pack = this.refs["classic-pack"];
    console.log(pack)
    pack.style.transition = "none";
    pack.style.top = (e.clientY - this.state.y_pos) + "px";
    pack.style.left = (e.clientX - this.state.x_pos) + "px";
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
              {/* <Pack data={data} /> */}
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
      <div className="pack-list">
        {this.renderPacks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { format: state.app.formatState, packs: state.app.packsState };
}

export default connect(mapStateToProps)(PackList);

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

  // componentDidUpdate() {
  //   const pack = ReactDOM.findDOMNode(this.refs.pack);
  //   var pointer_event = "";
  //   if (this.props.visibility.opacity == "0") {
  //     pointer_event = "auto";
  //   } else {
  //     pointer_event = "none";
  //   }
  //   pack.style.pointerEvents = pointer_event;
  // }

  // componentWillUnmount() {
  //   const pack = ReactDOM.findDOMNode(this.refs.pack);
  //   pack.removeEventListener('mousedown', this.onMouseDown);
  //   pack.removeEventListener('mouseover', this.onMouseOver);
  //   pack.removeEventListener('mouseout', this.onMouseOut);
  // }

  // onMouseOver() {
  //   const pack = ReactDOM.findDOMNode(this.refs.pack);
  //   pack.style.transform = "scale(1.1)";
  //   pack.style.transition = "none";
  // }

  // setVisible() {
  //   const pack_open = ReactDOM.findDOMNode(this.refs.pack_open);
  //   pack_open.currentTime = 0;
  //   pack_open.style.display = 'none';
  //   this.props.setVisibility({ "opacity": "1", "visible": "visible" });
  // }

  // onMouseOut() {
  //   const pack = ReactDOM.findDOMNode(this.refs.pack);
  //   pack.style.transform = "none";
  // }

  // onMouseDown(e) {
  //   const pack = ReactDOM.findDOMNode(this.refs.pack);
  //   const background = ReactDOM.findDOMNode(this.refs.background);
  //   background.style.opacity = 0;
  //   pack_grab.volume = .3;
  //   pack_grab.play();
  //   this.setState({ x_pos: e.clientX - pack.offsetLeft, y_pos: e.clientY - pack.offsetTop });
  //   pack.style.transform = "none";
  //   window.addEventListener('mousemove', this.movePack);
  // }

  // movePack = (e) => {
  //   const pack = ReactDOM.findDOMNode(this.refs.pack);
  //   pack.style.transition = "none";
  //   pack.style.top = (e.clientY - this.state.y_pos) + 'px';
  //   pack.style.left = (e.clientX - this.state.x_pos) + 'px';
  // }