import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import GET_CONNECTIONS from '../queries/GET_CONNECTIONS';

import ConnectionCard from './ConnectionCard';

/**
 * Help Board component (Connections Feed)
 * Returns continuous feed of all connection cards created
 */

class HelpBoard extends Component {
  componentDidMount() {
    console.log('this got hit');
    this.props.data.refetch();
  }

  render() {
    const { data } = this.props;

    return (
      <div className="helpboard-container">
        <h1>Connect with other users!</h1>
        <Link to="/new" className="button create-button">
          <span><i className="fas fa-plus"></i></span>
          new connection
        </Link>
        {
          /**
           * Map through all created connections
           * Create a card for each connection
           * TODO: order the cards by date/time created || ending soonest?
           */
          data.connections &&
          <div className="connections-query-container">
            {data.connections.map((connection, index) => (
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

HelpBoard.propTypes = {
  data: PropTypes.object,
  connection: PropTypes.array,
  map: PropTypes.func,
};

export default graphql(GET_CONNECTIONS)(HelpBoard);
