import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const packSource = {
  beginDrag(props) {
    console.log('beginDrag props', props)
    return {
      data: props.data
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Pack extends Component {
  render() {
    const { isDragging, connectDragSource, data } = this.props;
    return connectDragSource(
      <div id={data.type} draggable={true} className={data.expansion + " pack-drag"}></div>
    );
  }
}

Pack.propTypes = {
  data: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource("pack", packSource, collect)(Pack);