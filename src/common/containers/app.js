import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import requireAuth from '../containers/require_authentication';

import Signup from './signup';
import Login from './login';
import MainApp from './mainapp';

import '../../client/styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={requireAuth(MainApp)} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.authenticated };
}

export default connect(mapStateToProps)(App);