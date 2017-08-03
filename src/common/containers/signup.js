import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';

import * as actions from '../actions';

import '../../client/styles/Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: this.props.authenticated.error || '',
    }
  }

  componentWillMount() {
    this.props.onUnmount();
    this.setState({ error: '' });
  }

  componentDidMount() {
    if (sessionStorage.authenticated) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.authenticated.auth) {
      this.props.history.push('/');
    }
  }

  signup(e) {
    e.preventDefault();
    if (this.refs.username.value.length > 0 && this.refs.password.value.length > 0 && this.refs.retype.value.length > 0) {
      if (this.refs.username.value.length >= 6 && this.refs.password.value.length >= 8) {
        if (this.refs.password.value === this.refs.retype.value) {
          this.setState({ error: '' });
          this.props.createUser(this.refs.username.value, this.refs.password.value);
        } else {
          this.setState({ error: 'Make sure the passwords match.' });
        }
      } else {
        if (this.refs.username.value.length < 6 && this.refs.password.value.length < 8) {
          this.setState({ error: 'Make sure username has 6 characters or more and password has 8 characters or more.' });
        } else if (this.refs.username.value.length < 6) {
          this.setState({ error: 'Make sure username has 6 characters or more.' });
        } else if (this.refs.password.value.length < 8) {
          this.setState({ error: 'Make sure password has 8 characters or more.' });
        }
      }
    } else {
      this.setState({ error: 'Please enter a Username/Password.' })
    }
  }

  render() {
    let error;
    if (this.state.error.length > 0) {
      error = (
        <div className="error">
          {this.state.error}
        </div>
      );
    } else if (this.props.authenticated.error !== null) {
      error = (
        <div className="error">
          {this.props.authenticated.error}
        </div>
      );
    }
    return (
      <ReactModal isOpen={true} contentLabel="Signup Modal" overlayClassName="signup-overlay" className="signup">
        <div className="signup-container">
          <h1>Hearthstone Sealed Simulator</h1>
          <div className="signup-detail">
            Sign up for an Account. Usernames must be 6 characters or more and Passwords must be 8 characters or more.
          </div>
          <form onSubmit={(e) => this.signup(e)} className="signup-form">
            <div>
              <label>Username:</label>
              <input className="signup-input" ref="username" type="text" name="username" />
            </div>
            <div>
              <label>Password:</label>
              <input className="signup-input" ref="password" type="password" name="password" />
            </div>
            <div>
              <label>Re-enter Password:</label>
              <input className="signup-input" ref="retype" type="password" name="retype" />
            </div>
            {error}
            <div>
              <input className="submit-button" type="submit" value="Sign up" />
            </div>
          </form>
          <div className="to-login">
            <span>
              Already have an account? Login <Link to="/login">Here</Link>
            </span>
          </div>
        </div>
      </ReactModal>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.authenticated };
}

export default withRouter(connect(mapStateToProps, actions)(Signup));