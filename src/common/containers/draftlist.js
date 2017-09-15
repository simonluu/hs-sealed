import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { setDraftState, setTabState, retrieveDrafts, retrieveDraft, deleteDraft } from '../actions';

// TODO LIST
// WHEN LOG OFF, SET ALL REDUX STORE ASSOCIATED WITH USER TO {} ****DONE POSSIBLY

class Draft extends Component {
  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
    this.viewDraft = this.viewDraft.bind(this);
    this.createNewDraft = this.createNewDraft.bind(this);
    this.draftClick = this.draftClick.bind(this);
    this.deleteDraft = this.deleteDraft.bind(this);
    this.renderListOfDrafts = this.renderListOfDrafts.bind(this);
    this.renderCurrentDraft = this.renderCurrentDraft.bind(this);
  }

  // life cycle methods
  componentDidMount() {
    if (this.props.userId !== null && this.props.drafts.length === 0) {
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

  deleteDraft(draftId) {
    this.props.deleteDraft(draftId, this.props.userId);
  }

  changeTab(selectedTab) {
    this.props.setTabState(selectedTab);
  }

  viewDraft(draftId) {
    this.props.retrieveDraft(this.props.userId, draftId);
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
              <div onClick={() => this.viewDraft(draft.id)}>View</div>
              <div onClick={() => this.deleteDraft(draft.id)}>Delete</div>
            </div>
          </div>
        );
        return null;
      });
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

        <div className="draft-tabs">
          <div onClick={() => this.changeTab(false)}>List of Drafts</div>
          {this.props.draftState === "drafting" ? <div onClick={() => this.changeTab(true)}>Current Draft</div> : null}
        </div>

        {this.props.tabState ? <div>{this.renderCurrentDraft()}</div> : <div>{this.renderListOfDrafts()}</div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userId: state.userInfo.userId, drafts: state.userInfo.drafts, tabState: state.app.tabState, draftState: state.app.draftState };
}

export default connect(mapStateToProps, { setDraftState, setTabState, retrieveDrafts, retrieveDraft, deleteDraft })(Draft);