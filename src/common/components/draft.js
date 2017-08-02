import React, { Component } from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

class Draft extends Component {
  render() {
    return (
      <div className="draft-nav">
        <button>New Draft</button>
        <Tabs
          renderActiveTabContentOnly={true}>
          <TabLink to="list">List of Drafts</TabLink>
          <TabLink to="current">Current Draft</TabLink>

          <TabContent for="list">Content 1</TabContent>
          <TabContent for="current">Content 2</TabContent>
        </Tabs>
      </div>
    );
  }
}

export default Draft;

// <button>Back button</button>

// for redux
          // name="Drafts"
          // handleSelect={}
          // selectedTab=