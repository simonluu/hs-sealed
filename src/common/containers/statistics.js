import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as d3 from 'd3';

var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];

class Statistics extends Component {
  componentDidMount() {
    const svg = d3.select("#bar").append("svg")
                  .attr("height","10vh")
                  .attr("width","50vw");

    svg.selectAll("rect")
        .data(dataArray)
        .enter().append("rect")
          .attr("height",function(d, i) {return (d)})
          .attr("width","40")
          .attr("x",function(d, i) {return (i * 60) + 25})
          .attr("y","50");

    // var svg = d3.select("body").append("svg")
    //       .attr("height","100%")
    //       .attr("width","100%");
  }
  render() {
    // console.log(d3)
    console.log(this.props.cardList)
    return (
      <div className="graph-nav">
        <div id="bar"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cardList: state.app.cardList };
}

export default connect(mapStateToProps, null)(Statistics);

        // <div>Show a bar graph of mana curve of drafted cards</div>
        // <div>Show a pie graph of hero cards, spell cards, quest cards, minion cards</div>
        // <div>Show Social Media stuff on the right side</div>