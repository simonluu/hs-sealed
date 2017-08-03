import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

import { setDraftState, retrieveDrafts, deleteDraft } from '../actions';

// TODO LIST
// WHEN LOG OFF, SET ALL REDUX STORE ASSOCIATED WITH USER TO {} ****DONE POSSIBLY

class Draft extends Component {
  constructor(props) {
    super(props);

    this.createNewDraft = this.createNewDraft.bind(this);
    this.draftClick = this.draftClick.bind(this);
    this.deleteDraft = this.deleteDraft.bind(this);
    this.renderListOfDrafts = this.renderListOfDrafts.bind(this);
    this.renderCurrentDraft = this.renderCurrentDraft.bind(this);
  }

  // life cycle methods
  componentDidMount() {
    if (this.props.userId !== null) {
      this.props.retrieveDrafts(this.props.userId);
    }
  }

  // on click functions
  createNewDraft() {
    this.props.setDraftState("pre-draft");
  }

  draftClick(id) {
    let draftName = this.refs[`draft-options-${id}`];
    if (draftName.style.display === "block") {
      draftName.style.display = "none";
    } else {
      draftName.style.display = "block";
    }
  }

  deleteDraft(id) {
    this.props.deleteDraft(id, this.props.userId);
  }

  // render functions
  renderListOfDrafts() {
    if (this.props.drafts !== undefined && this.props.drafts !== null) {
      const listOfDrafts = [];
      this.props.drafts.map((draft) => {
        listOfDrafts.push(
          <div key={draft.id}>
            <div onClick={() => this.draftClick(draft.id)}>{draft.name}</div>

            <div ref={`draft-options-${draft.id}`} className="draft-options">
              <div>View</div>
              <div onClick={() => this.deleteDraft(draft.id)}>Delete</div>
            </div>
          </div>
        );
        return null;
      })
      if (listOfDrafts.length !== 0) {
        return listOfDrafts;
      }
    }
  }

  renderCurrentDraft() {
    const currentDraft = [];
    return currentDraft;
  }

  render() {
    return (
      <div className="draft-nav">
        <div className="new-draft-button">
          <Button onClick={this.createNewDraft}>New Draft</Button>
        </div>
        <Tabs
          renderActiveTabContentOnly={true}>
          <div className="draft-tabs">
            <TabLink to="list">List of Drafts</TabLink>
            <TabLink to="current">Current Draft</TabLink>
          </div>

          <TabContent for="list">{this.renderListOfDrafts()}</TabContent>
          <TabContent for="current">{this.renderCurrentDraft()}</TabContent>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userId: state.userInfo.userId, drafts: state.userInfo.drafts };
}

export default connect(mapStateToProps, { setDraftState, retrieveDrafts, deleteDraft })(Draft);

// for redux
          // name="Drafts"
          // handleSelect={}
          // selectedTab=