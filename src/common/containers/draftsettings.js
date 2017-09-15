import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, FormGroup, Radio } from 'react-bootstrap';

import { createDraft, setDraftState, setTabState } from '../actions';

class DraftSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      format: "",
      error: "",
    }

    this.nameChange = this.nameChange.bind(this);
    this.formatChange = this.formatChange.bind(this);
    this.startDraft = this.startDraft.bind(this);
  }

  nameChange(e) {
    this.setState({ name: e.target.value });
  }

  formatChange(state) {
    this.setState({ format: state });
  }

  startDraft() {
    this.setState({ error: "" });
    if (this.state.name.length !== 0 && this.state.format.length !== 0) {
      this.props.createDraft(this.state.name, this.state.format, "drafting", [], this.props.userId);
    } else {
      this.setState({ error: "Please enter a name and set a format" });
    }
  }

  render() {
    return (
      <div className="draft-settings">
        <h2>Create a Draft</h2>
        <div>You will open 80-90 packs from all the different expansions depending on your selections below.</div>
        <form>
          <FormGroup>
            <FormControl type="text" value={this.state.name} placeholder="Draft Name" onChange={(e) => this.nameChange(e)} />
          </FormGroup>
          <FormGroup>
            <Radio name="radioGroup" onChange={() => this.formatChange("Standard")}>
              Standard
            </Radio>
            <Radio name="radioGroup" onChange={() => this.formatChange("Wild")}>
              Wild
            </Radio>
          </FormGroup>
        </form>
        <div className="error">{this.state.error}</div>
        <Button onClick={this.startDraft}>Start Draft</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userId: state.userInfo.userId };
}

export default connect(mapStateToProps, { createDraft, setDraftState, setTabState })(DraftSettings);