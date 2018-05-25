import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Landing from './Landing';
import ExpressBoard from './ExpressBoard';
import CreateConnection from './CreateConnection';
import Profile from './Profile';
import NotFound from './NotFound';

/**
 * Main JS file for application
 * Returns react-router wrapper for all components
 * Each route has designed paths with corresponding components that are rendered
 */

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      data: {},
    };
  }

  componentDidMount() {
    /**
     * GitHub auth callback re-directs to homepage
     * Get credentials from express route
     * Save credentials to state
     */
    axios.get('http://localhost:8008/user', { withCredentials: true })
      .then((res) => {
        if (res.data._id) { this.setState({ signedIn: true, data: res.data }); }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar props={this.state}/>
          <div className="app-container">
            <Switch>
              <Route
                exact path="/"
                component={() => <Landing signedIn={this.state.signedIn} />}
              />
              <Route
                exact path="/expressboard"
                component={props => <ExpressBoard props={props} />}
              />
              <Route
                exact path="/new"
                component={props => <CreateConnection id={this.state.data._id} props={props}/>}
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
};

export default App;
