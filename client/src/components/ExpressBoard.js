import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import GET_CONNECTIONS from '../queries/GET_CONNECTIONS';
import ConnectionCard from './ConnectionCard';

// TODO: this should only grab the recent connections
// limited by date or number of connections
// we will modify the backend to accept arguments that filter the Connection list returned

// Actions
import { fetchConnections } from '../actions/connections';

/**
 * Express Board component (Connections Feed)
 * Returns continuous feed of all connection cards created
 */

class ExpressBoard extends Component {

  componentWillMount() {
    /**
     * Check if redux store has connections
     * If not, fetch connections through graphql query
     * Dispatch data to redux store
     */

     // get all connections (for displaying)
     // filter and store user created and joined in redux (then their profile page no longer needs a separate call)
      // incrementally building the users data into the redux store as appropriate
    if (!this.props.connections) {
      this.props.client.query({ query: GET_CONNECTIONS })
      .then(({ data }) => this.props.dispatch(fetchConnections(data.connections)));
    }
  }

  render() {
    return (
      <div className="expressboard-container">
        <h1>Connect with other users!</h1>
        <Link to="/new" className="button create-button">
          <span><i className="fas fa-plus"></i></span>
          new connection
        </Link>
        {
          /**
           * Check redux store for connections
           * Map through all created connections
           * Create a card for each connection
           * TODO: order the cards by date/time created || ending soonest?
           */
          this.props.connections &&
          <div className="connections-query-container">
            {this.props.connections.map((connection, index) => (
              <div key={index} className="connection-card-wrapper">
                <ConnectionCard connection={connection} index={index}/>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}

ExpressBoard.propTypes = {
  client: PropTypes.object,
  dispatch: PropTypes.func,
  connections: PropTypes.array,
};

const mapStateToProps = state => ({
  auth: state.auth,
  connections: state.connections,
});

export default connect(mapStateToProps)(withApollo(ExpressBoard));
