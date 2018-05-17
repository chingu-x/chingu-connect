import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import GET_CONNECTIONS from '../queries/GET_CONNECTIONS';

import ConnectionCard from './ConnectionCard';

/**
 * Help Board component (Connections Feed)
 * Returns continuous feed of all connection cards created
 */

const HelpBoard = (props) => {
  console.log('From helpboard: ', props);

  return (
    <div className="helpboard-container">
      <h2>Connections Feed goes here</h2>
      {
        /**
         * Map through all created connections
         * Create a card for each connection
         * TODO: order the cards by date/time created
         */
        props.data.connections &&
        <div className="connections-query-container">
          {props.data.connections.map((connection, index) => (
            <ConnectionCard key={ index } connection={ connection } index={ index }/>
          ))}
        </div>
      }
    </div>
  );
};

HelpBoard.propTypes = {
  props: PropTypes.object,
  data: PropTypes.object,
  connection: PropTypes.array,
  map: PropTypes.func,
};

export default graphql(GET_CONNECTIONS)(HelpBoard);
