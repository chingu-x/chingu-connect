import React from 'react';
import PropTypes from 'prop-types';


const ConnectionCard = ({ connection, index }) => {
  const { title, description, owner, timestamp } = connection;

  return (
    <div key={index} className="connection-card">
      <p>Created: {timestamp}</p>
      <p>By: {owner.username}</p>
      <h3>{title}</h3>
      <p>
        { /** Truncate description string to 200 characters */
          description.length > 200 ?
          `${description.substring(0, 200)}...` :
          description
        }
      </p>
      <div className="connection-card-button-wrapper">
        <button className="button">Details</button>
        <button className="button">Join</button>
      </div>
    </div>
  );
};

ConnectionCard.propTypes = {
  connection: PropTypes.object,
  index: PropTypes.number,
};

export default ConnectionCard;
