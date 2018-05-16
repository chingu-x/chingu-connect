import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import GET_USER from '../queries/GET_USER';

/**
 * User Profile component
 * Displays previously created and joined connection cards
 * @param {Object} Uses props for react-router re-directs and profile ID from URL
 */

const Profile = props => (
  <div>
    {props.data.user &&
    <div className="user-query-container">
      <p>{props.data.user.username}</p>
      <img src={props.data.user.avatar} alt="user github profile picture"/>
    </div>}
    <h1>Profile Page</h1>
  </div>
);

Profile.propTypes = {
  props: PropTypes.object,
  data: PropTypes.object,
  username: PropTypes.string,
  avatar: PropTypes.string,
};

export default graphql(GET_USER, {
  options: props => ({ variables: { id: props.props.match.params.id } }),
})(Profile);
