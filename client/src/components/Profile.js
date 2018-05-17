import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import GET_USER from '../queries/GET_USER';

import ConnectionCard from './ConnectionCard';

/**
 * User Profile component
 * Displays previously created and joined connection cards
 * @param {Object} Uses props for react-router re-directs and profile ID from URL
 */

const Profile = ({ data: { error, loading, user } }) => {
  const mapCreatedConnections = connections => connections.map((connection, index) => (
    <ConnectionCard key={ index } connection={ connection } index={ index }/>
  ));


  /**
   * Render connections column with different data based on field that's passed
   * Field is either 'created' or 'joined'
   * @param {String} connectionField
   *
   */
  const renderConnections = connectionField => (
    <div className="connections-column">
        <h2>Connections { connectionField === 'created' ? 'Created' : 'Joined'}</h2>
        <label htmlFor="user-created-connections">Sort By:</label>
        <select id="user-created-connections">
          <option defaultValue>Newest</option>
        </select>
        { user[connectionField].length > 0
          ? mapCreatedConnections(user[connectionField])
          : <div>No { connectionField === 'created' ? 'Created' : 'Joined'} Connections</div> }
    </div>
  );


  if (error) return <div>Error Fetching User</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      { user &&
        <div className="user-query-container">
          <p>{ user.username }</p>
          <img src={ user.avatar } alt="user github profile picture" />
        </div>
      }
      <div className="connections-container">
        { user ? renderConnections('created') : null }
        { user ? renderConnections('joined') : null }
      </div>
    </div>
  );
};

Profile.propTypes = {
  props: PropTypes.object,
  data: PropTypes.object,
  username: PropTypes.string,
  avatar: PropTypes.string,
};

export default graphql(GET_USER, {
  options: props => ({ variables: { id: props.props.match.params.id } }),
})(Profile);
