import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Landing from './Landing';
import HelpBoard from './HelpBoard';
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
    this.state = { id: null };
    this.handleId = this.handleId.bind(this);
  }

  handleId(id) {
    if (!this.state.id) {
      /** Set user ID in state for the navbar profile link path */
      this.setState({ id });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar id={this.state.id}/>
          <div className="app-container">
            <Switch>
              <Route exact path="/" component={() => <Landing />}/>
              <Route exact path="/helpboard" component={() => <HelpBoard />}/>
              <Route
                path="/:id"
                component={
                  props => <Profile props={props} handleId={this.handleId}/>
                }
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
  id: PropTypes.string,
};

export default App;
