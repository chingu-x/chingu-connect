import React from 'react';
import PropTypes from 'prop-types';


const ConnectionCard = ({ connection, index }) => {
  const { title, description, owner, timestamp } = connection;
  const date = new Date(Number(timestamp)).toString();

  return (
    <div key={ index } className="connection-card">
      <p>Created: { date }</p>
      <p>By: { owner.username }</p>
      <h3>{ title }</h3>
      <p>{ description }</p>
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
