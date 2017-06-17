import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';

import * as actions from '../actions';

import '../../client/styles/Login.css';

class Login extends Component {
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

  login(e) {
    e.preventDefault();
    if (this.refs.username.value.length >= 6 && this.refs.password.value.length >= 8) {
      this.setState({ error: '' });
      this.props.authenticate(this.refs.username.value, this.refs.password.value);
    } else {
      this.setState({ error: 'Usernames must be 6 characters or more and Passwords must be 8 characters or more.' });
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
      <ReactModal isOpen={true} contentLabel="Login Modal" overlayClassName="login-overlay" className="login">
        <div className="login-container">
          <h1>Hearthstone Sealed Simulator</h1>
          <div className="login-detail">
            Login to continue.
          </div>
          <form onSubmit={(e) => this.login(e)} className="login-form">
            <div>
              <label>Username:</label>
              <input className="login-input" ref="username" type="text" name="username" />
            </div>
            <div>
              <label>Password:</label>
              <input className="login-input" ref="password" type="password" name="password" />
            </div>
            {error}
            <div>
              <input className="submit-button" type="submit" value="Log In" />
            </div>
          </form>
          <div className="to-signup">
            <span>
              Don't have an account? Sign up <Link to="/signup">Here</Link>
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

export default withRouter(connect(mapStateToProps, actions)(Login));