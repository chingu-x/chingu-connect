import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import GET_CONNECTIONS from '../queries/GET_CONNECTIONS';

/**
 * Help Board component (Connections Feed)
 * Returns continuous feed of all connection cards created
 */

const HelpBoard = ({ loading, error, data }) => {
  console.log('From helpboard: ', loading, error, data);

  return (
    <div className="helpboard-container">
      <h1>Connect with other users!</h1>
      <Link to="/new" className="button create-button">
        <span><i className="fas fa-plus"></i></span>
        new connection
      </Link>
      {loading && <h2>Loading Connections...</h2>}
      {error && <h2>Error trying to fetch connections!</h2>}
      {
        /**
         * Map through all created connections
         * Create a card for each connection
         * TODO: order the cards by date/time created || ending soonest?
         */
        data.connections &&
        <div className="connections-query-container">
          {data.connections.map((connection, index) => {
            const { title, description, owner, timestamp } = connection;
            const date = new Date(Number(timestamp)).toString();

            return (
              <div key={index} className="connection-card">
                <p>Created: {date}</p>
                <p>By: {owner.username}</p>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="connection-card-button-wrapper">
                  <button className="button">Details</button>
                  <button className="button">Join</button>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

HelpBoard.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.object,
  error: PropTypes.object,
  connection: PropTypes.array,
  map: PropTypes.func,
};

export default graphql(GET_CONNECTIONS)(HelpBoard);
