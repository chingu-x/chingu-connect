import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

// Components
import Navbar from './Navbar';
import Landing from './Landing';
import ExpressBoard from './ExpressBoard';
import CreateConnection from './CreateConnection';
import Profile from './Profile';
import NotFound from './NotFound';

// Actions
import { fetchUser } from '../actions/auth';

/**
 * Main JS file for application
 * Returns react-router wrapper for all components
 * Each route has designed paths with corresponding components that are rendered
 */

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    /**
     * GitHub auth callback re-directs to homepage
     * Check if signed in first
     * Get credentials from express route
     * Pass credentials to redux store
     */
    // TODO: GQL call User --> with no arguments
      // gql`user(input: {}){ id, username, githubId, avatar }`
    if (!this.props.auth.creds.signedIn) {
      axios.get('http://localhost:8008/user', { withCredentials: true })
      .then((res) => {
        if (res.data._id) { this.props.dispatch(fetchUser(res.data)); }
      })
      .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <div className="app-container">
            <Switch>
              <Route
                exact path="/"
                component={() => <Landing/>}
              />
              <Route
                exact path="/expressboard"
                component={props => <ExpressBoard props={props} />}
              />
              <Route
                exact path="/new"
                component={props => <CreateConnection props={props}/>}
              />
              <Route
                path="/user/:id"
                component={props => <Profile props={props}/>}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  props: PropTypes.object,
  setState: PropTypes.func,
  signedIn: PropTypes.bool,
  data: PropTypes.object,
  dispatch: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default (connect(mapStateToProps)(App));
