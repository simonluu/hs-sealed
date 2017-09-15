import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const PackDropTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    console.log(item)
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class PackSlot extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // track enter/leave shallowly
    }
  }
  render() {
    const { isOver, canDrop, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="pack-slot"></div>
    );
  }
}

export default DropTarget("pack", PackDropTarget, collect)(PackSlot);