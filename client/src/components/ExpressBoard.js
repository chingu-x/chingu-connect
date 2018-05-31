import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import ConnectionCard from './ConnectionCard';

// Actions
import { fetchConnections } from '../actions/connections';

// Queries
import GET_CONNECTIONS from '../queries/GET_CONNECTIONS';

/**
 * Express Board component (Connections Feed)
 * Returns continuous feed of all connection cards created
 */

class ExpressBoard extends Component {
  componentDidMount() {
    /**
     * Check if redux store has connections
     * If not, fetch connections through graphql query
     * Dispatch data to redux store
     */
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
